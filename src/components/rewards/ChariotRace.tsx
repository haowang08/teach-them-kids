import React, { useRef, useEffect, useCallback, useState } from 'react';

// ============================================
// TYPES
// ============================================

interface ChariotRaceProps {
  onComplete?: () => void;
}

type GamePhase = 'ready' | 'countdown' | 'racing' | 'finished';

interface Vec2 {
  x: number;
  y: number;
}

interface Chariot {
  angle: number;        // position along the oval (0 to 2*PI)
  laneOffset: number;   // lateral offset from center of track (-1 to 1, normalized)
  speed: number;        // angular speed (radians per frame)
  baseSpeed: number;
  color: string;
  accentColor: string;
  laps: number;
  lastAngle: number;    // for lap detection
  slowTimer: number;    // frames of slowdown remaining
  wobblePhase: number;  // for AI wobble
  wobbleSpeed: number;
  finished: boolean;
  finishOrder: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface GameState {
  phase: GamePhase;
  player: Chariot;
  opponents: Chariot[];
  countdownValue: number;
  countdownTimer: number;
  frameCount: number;
  finishCount: number;
  particles: Particle[];
  steeringLeft: boolean;
  steeringRight: boolean;
}

// ============================================
// CONSTANTS
// ============================================

const TOTAL_LAPS = 3;
const TRACK_COLOR = '#F5DEB3';
const WALL_COLOR = '#8B7355';
const GRASS_COLOR = '#556B2F';
const PLAYER_COLOR = '#8B0000';
const PLAYER_ACCENT = '#CD5C5C';
const OPP1_COLOR = '#1B3F8B';
const OPP1_ACCENT = '#4169E1';
const OPP2_COLOR = '#2E5E1E';
const OPP2_ACCENT = '#3CB371';
const LANE_DASH_COLOR = 'rgba(255, 255, 255, 0.4)';
const START_LINE_COLOR = '#FFFFFF';

const PLAYER_BASE_SPEED = 0.018;
const STEER_SPEED = 0.035;
const LANE_CLAMP = 0.85;
const WALL_SLOW_FRAMES = 20;
const WALL_SLOW_FACTOR = 0.5;
const OFF_CENTER_SLOW = 0.15; // max speed reduction at edge

const COUNTDOWN_FRAMES = 60; // frames per countdown number

// ============================================
// COMPONENT
// ============================================

const ChariotRace: React.FC<ChariotRaceProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const gameStateRef = useRef<GameState | null>(null);
  const [phase, setPhase] = useState<GamePhase>('ready');
  const [, setPlayerPosition] = useState(1);
  const [, setPlayerLaps] = useState(0);
  const [, setCountdownDisplay] = useState(3);
  const [playerWon, setPlayerWon] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  // ----------------------------------------
  // TRACK GEOMETRY HELPERS
  // ----------------------------------------

  const getTrackParams = useCallback((w: number, h: number) => {
    const cx = w / 2;
    const cy = h / 2;
    const rx = w * 0.38; // outer semi-axis x
    const ry = h * 0.38; // outer semi-axis y
    const trackWidth = Math.min(w, h) * 0.16;
    return { cx, cy, rx, ry, trackWidth };
  }, []);

  const getTrackPoint = useCallback((angle: number, laneOffset: number, w: number, h: number): Vec2 => {
    const { cx, cy, rx, ry, trackWidth } = getTrackParams(w, h);
    // laneOffset: -1 = inner edge, 0 = center, 1 = outer edge
    const midR_x = rx;
    const midR_y = ry;
    const offsetPx = laneOffset * (trackWidth / 2) * 0.85;
    // direction outward at this angle
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    // point on center ellipse
    const px = cx + midR_x * cos;
    const py = cy + midR_y * sin;
    // normal direction (outward) for an ellipse
    const nx = cos / rx;
    const ny = sin / ry;
    const nLen = Math.sqrt(nx * nx + ny * ny);
    return {
      x: px + (nx / nLen) * offsetPx,
      y: py + (ny / nLen) * offsetPx,
    };
  }, [getTrackParams]);

  const getTrackTangentAngle = useCallback((angle: number, w: number, h: number): number => {
    const { rx, ry } = getTrackParams(w, h);
    // derivative of ellipse parameterization
    const dx = -rx * Math.sin(angle);
    const dy = ry * Math.cos(angle);
    return Math.atan2(dy, dx);
  }, [getTrackParams]);

  // ----------------------------------------
  // INIT GAME STATE
  // ----------------------------------------

  const createChariot = useCallback((
    startAngle: number,
    laneOffset: number,
    baseSpeed: number,
    color: string,
    accentColor: string,
  ): Chariot => ({
    angle: startAngle,
    laneOffset,
    speed: 0,
    baseSpeed,
    color,
    accentColor,
    laps: 0,
    lastAngle: startAngle,
    slowTimer: 0,
    wobblePhase: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.02 + Math.random() * 0.02,
    finished: false,
    finishOrder: 0,
  }), []);

  const initGameState = useCallback((): GameState => {
    const player = createChariot(0, 0, PLAYER_BASE_SPEED, PLAYER_COLOR, PLAYER_ACCENT);
    const opp1 = createChariot(-0.05, -0.35, PLAYER_BASE_SPEED * 1.04, OPP1_COLOR, OPP1_ACCENT);
    const opp2 = createChariot(-0.1, 0.35, PLAYER_BASE_SPEED * 0.95, OPP2_COLOR, OPP2_ACCENT);

    return {
      phase: 'ready',
      player,
      opponents: [opp1, opp2],
      countdownValue: 3,
      countdownTimer: 0,
      frameCount: 0,
      finishCount: 0,
      particles: [],
      steeringLeft: false,
      steeringRight: false,
    };
  }, [createChariot]);

  // ----------------------------------------
  // DRAWING
  // ----------------------------------------

  const drawEllipse = useCallback((
    ctx: CanvasRenderingContext2D,
    cx: number, cy: number,
    rx: number, ry: number,
    fill?: string, stroke?: string, lineWidth?: number,
  ) => {
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lineWidth || 2; ctx.stroke(); }
  }, []);

  const drawDashedEllipse = useCallback((
    ctx: CanvasRenderingContext2D,
    cx: number, cy: number,
    rx: number, ry: number,
    color: string, lineWidth: number,
  ) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.setLineDash([12, 12]);
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }, []);

  const drawChariot = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number, y: number,
    rotation: number,
    bodyColor: string,
    accentColor: string,
    scale: number,
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    const bw = 10 * scale; // body width
    const bh = 18 * scale; // body height
    const triH = 8 * scale; // triangle height
    const wheelW = 3 * scale;
    const wheelH = 7 * scale;

    // Wheels
    ctx.fillStyle = '#3E2723';
    ctx.fillRect(-bw / 2 - wheelW - 1, -bh / 4, wheelW, wheelH);
    ctx.fillRect(bw / 2 + 1, -bh / 4, wheelW, wheelH);

    // Body
    ctx.fillStyle = bodyColor;
    ctx.fillRect(-bw / 2, -bh / 2, bw, bh);

    // Accent stripe
    ctx.fillStyle = accentColor;
    ctx.fillRect(-bw / 2, -bh / 2, bw, 4 * scale);

    // Triangle front
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.moveTo(-bw / 2, -bh / 2);
    ctx.lineTo(bw / 2, -bh / 2);
    ctx.lineTo(0, -bh / 2 - triH);
    ctx.closePath();
    ctx.fill();

    // Triangle accent edge
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 1.5 * scale;
    ctx.beginPath();
    ctx.moveTo(-bw / 2, -bh / 2);
    ctx.lineTo(0, -bh / 2 - triH);
    ctx.lineTo(bw / 2, -bh / 2);
    ctx.stroke();

    ctx.restore();
  }, []);

  const drawTrack = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const { cx, cy, rx, ry, trackWidth } = getTrackParams(w, h);

    // Background — grass
    ctx.fillStyle = GRASS_COLOR;
    ctx.fillRect(0, 0, w, h);

    // Spectator dots (simple crowd effect)
    const rng = (seed: number) => {
      const s = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
      return s - Math.floor(s);
    };
    for (let i = 0; i < 200; i++) {
      const a = rng(i) * Math.PI * 2;
      const dist = (rx + trackWidth / 2 + 15) + rng(i + 500) * 60;
      const distY = (ry + trackWidth / 2 + 15) + rng(i + 500) * 60;
      const sx = cx + Math.cos(a) * dist;
      const sy = cy + Math.sin(a) * distY;
      if (sx < 0 || sx > w || sy < 0 || sy > h) continue;
      const colors = ['#8B4513', '#A0522D', '#D2691E', '#CD853F', '#DEB887', '#F5F5DC'];
      ctx.fillStyle = colors[Math.floor(rng(i + 1000) * colors.length)];
      ctx.beginPath();
      ctx.arc(sx, sy, 2 + rng(i + 200) * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Outer wall
    drawEllipse(ctx, cx, cy, rx + trackWidth / 2 + 4, ry + trackWidth / 2 + 4, WALL_COLOR);

    // Track surface
    drawEllipse(ctx, cx, cy, rx + trackWidth / 2, ry + trackWidth / 2, TRACK_COLOR);

    // Inner wall
    drawEllipse(ctx, cx, cy, rx - trackWidth / 2, ry - trackWidth / 2, WALL_COLOR);

    // Inner grass
    drawEllipse(ctx, cx, cy, rx - trackWidth / 2 - 4, ry - trackWidth / 2 - 4, '#4A5E2A');

    // Spina (central divider in Circus Maximus style)
    const spinaW = rx * 0.6;
    const spinaH = 6;
    ctx.fillStyle = '#7A6B52';
    ctx.fillRect(cx - spinaW / 2, cy - spinaH / 2, spinaW, spinaH);
    // Obelisk markers on spina
    for (let i = -1; i <= 1; i++) {
      ctx.fillStyle = '#5E503F';
      ctx.beginPath();
      ctx.arc(cx + i * spinaW * 0.3, cy, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Lane markers (dashed ellipses at 1/3 and 2/3 of track width)
    const laneOffsets = [-0.33, 0.33];
    for (const lo of laneOffsets) {
      const offset = lo * trackWidth / 2;
      drawDashedEllipse(ctx, cx, cy, rx + offset, ry + offset, LANE_DASH_COLOR, 1.5);
    }

    // Start/finish line
    const startInner = getTrackPoint(0, -1, w, h);
    const startOuter = getTrackPoint(0, 1, w, h);
    ctx.strokeStyle = START_LINE_COLOR;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(startInner.x, startInner.y);
    ctx.lineTo(startOuter.x, startOuter.y);
    ctx.stroke();

    // Checkered pattern on start line
    const dx = startOuter.x - startInner.x;
    const dy = startOuter.y - startInner.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const segments = 8;
    for (let i = 0; i < segments; i++) {
      if (i % 2 === 0) {
        const t1 = i / segments;
        ctx.fillStyle = '#000000';
        ctx.fillRect(
          startInner.x + dx * t1 - 2,
          startInner.y + dy * t1,
          (len / segments),
          3,
        );
      }
    }
  }, [getTrackParams, getTrackPoint, drawEllipse, drawDashedEllipse]);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    for (const p of particles) {
      const alpha = p.life / p.maxLife;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
    }
    ctx.globalAlpha = 1;
  }, []);

  // ----------------------------------------
  // GAME LOOP
  // ----------------------------------------

  const updateChariot = useCallback((
    chariot: Chariot,
    isPlayer: boolean,
    state: GameState,
    _w: number,
    _h: number,
  ) => {
    if (chariot.finished) return;

    // Steering (player)
    if (isPlayer) {
      if (state.steeringLeft) {
        chariot.laneOffset -= STEER_SPEED;
      }
      if (state.steeringRight) {
        chariot.laneOffset += STEER_SPEED;
      }
    } else {
      // AI: wobble around a lane with some variation
      chariot.wobblePhase += chariot.wobbleSpeed;
      const targetLane = chariot.laneOffset > 0 ? 0.2 : -0.2;
      const wobble = Math.sin(chariot.wobblePhase) * 0.3;
      const desired = targetLane + wobble;
      chariot.laneOffset += (desired - chariot.laneOffset) * 0.03;

      // AI slight speed variation
      const speedWobble = 1 + Math.sin(chariot.wobblePhase * 0.7) * 0.03;
      chariot.speed = chariot.baseSpeed * speedWobble;
    }

    // Clamp lane offset
    if (chariot.laneOffset > LANE_CLAMP) {
      chariot.laneOffset = LANE_CLAMP;
      if (isPlayer) chariot.slowTimer = WALL_SLOW_FRAMES;
    }
    if (chariot.laneOffset < -LANE_CLAMP) {
      chariot.laneOffset = -LANE_CLAMP;
      if (isPlayer) chariot.slowTimer = WALL_SLOW_FRAMES;
    }

    // Calculate speed
    if (isPlayer) {
      const offCenterPenalty = Math.abs(chariot.laneOffset) * OFF_CENTER_SLOW;
      let speed = chariot.baseSpeed * (1 - offCenterPenalty);
      if (chariot.slowTimer > 0) {
        speed *= WALL_SLOW_FACTOR;
        chariot.slowTimer--;
      }
      chariot.speed = speed;
    }

    // Move forward
    chariot.lastAngle = chariot.angle;
    chariot.angle += chariot.speed;

    // Lap detection: crossing from < 2*PI back to 0
    if (chariot.angle >= Math.PI * 2) {
      chariot.angle -= Math.PI * 2;
      chariot.laps++;

      if (chariot.laps >= TOTAL_LAPS) {
        chariot.finished = true;
        state.finishCount++;
        chariot.finishOrder = state.finishCount;
      }
    }
  }, []);

  const spawnConfetti = useCallback((state: GameState, w: number, _h: number) => {
    const colors = ['#FFD700', '#FF6347', '#4169E1', '#32CD32', '#FF69B4', '#FFA500'];
    for (let i = 0; i < 8; i++) {
      state.particles.push({
        x: Math.random() * w,
        y: -10,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 1,
        life: 120 + Math.random() * 60,
        maxLife: 180,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 6,
      });
    }
  }, []);

  const updateParticles = useCallback((particles: Particle[]): Particle[] => {
    return particles
      .map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        vy: p.vy + 0.02,
        vx: p.vx * 0.99,
        life: p.life - 1,
      }))
      .filter(p => p.life > 0);
  }, []);

  const getPositions = useCallback((state: GameState): number[] => {
    // Returns [playerPos, opp1Pos, opp2Pos] where 1 = first, 2 = second, 3 = third
    const all = [
      { progress: state.player.laps * Math.PI * 2 + state.player.angle, idx: 0 },
      ...state.opponents.map((o, i) => ({
        progress: o.laps * Math.PI * 2 + o.angle,
        idx: i + 1,
      })),
    ];
    all.sort((a, b) => b.progress - a.progress);
    const positions = [0, 0, 0];
    all.forEach((item, rank) => {
      positions[item.idx] = rank + 1;
    });
    return positions;
  }, []);

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    const state = gameStateRef.current;
    if (!canvas || !state) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    state.frameCount++;

    // ---- UPDATE ----
    if (state.phase === 'countdown') {
      state.countdownTimer++;
      if (state.countdownTimer >= COUNTDOWN_FRAMES) {
        state.countdownTimer = 0;
        state.countdownValue--;
        if (state.countdownValue <= 0) {
          state.phase = 'racing';
          setPhase('racing');
        }
        setCountdownDisplay(Math.max(state.countdownValue, 0));
      }
    }

    if (state.phase === 'racing') {
      updateChariot(state.player, true, state, w, h);
      for (const opp of state.opponents) {
        updateChariot(opp, false, state, w, h);
      }

      // Update UI state
      const positions = getPositions(state);
      setPlayerPosition(positions[0]);
      setPlayerLaps(Math.min(state.player.laps, TOTAL_LAPS));

      // Check if race is over
      if (state.player.finished || state.opponents.every(o => o.finished)) {
        // If player hasn't finished but all opponents have, player is last
        if (!state.player.finished) {
          state.player.finished = true;
          state.finishCount++;
          state.player.finishOrder = state.finishCount;
        }
        state.phase = 'finished';
        setPhase('finished');
        const won = state.player.finishOrder === 1;
        setPlayerWon(won);
        if (won && onComplete) {
          onComplete();
        }
      }
    }

    if (state.phase === 'finished' && playerWon) {
      if (state.frameCount % 3 === 0) {
        spawnConfetti(state, w, h);
      }
    }
    state.particles = updateParticles(state.particles);

    // ---- DRAW ----
    ctx.clearRect(0, 0, w, h);

    // Draw track
    drawTrack(ctx, w, h);

    // Draw chariots (opponents first, player on top)
    const allChariots = [...state.opponents, state.player];
    const chariotScale = Math.min(w, h) / 500;

    for (const chariot of allChariots) {
      const pos = getTrackPoint(chariot.angle, chariot.laneOffset, w, h);
      const tangent = getTrackTangentAngle(chariot.angle, w, h);
      drawChariot(ctx, pos.x, pos.y, tangent - Math.PI / 2, chariot.color, chariot.accentColor, chariotScale);
    }

    // Draw dust particles behind player when racing
    if (state.phase === 'racing') {
      const pPos = getTrackPoint(state.player.angle, state.player.laneOffset, w, h);
      const tang = getTrackTangentAngle(state.player.angle, w, h);
      // Small dust puffs behind chariot
      if (state.frameCount % 4 === 0) {
        const behindX = pPos.x - Math.cos(tang) * 15 * chariotScale;
        const behindY = pPos.y - Math.sin(tang) * 15 * chariotScale;
        state.particles.push({
          x: behindX + (Math.random() - 0.5) * 6,
          y: behindY + (Math.random() - 0.5) * 6,
          vx: -Math.cos(tang) * 0.5 + (Math.random() - 0.5) * 0.5,
          vy: -Math.sin(tang) * 0.5 + (Math.random() - 0.5) * 0.5,
          life: 20,
          maxLife: 20,
          color: '#D2B48C',
          size: 3 + Math.random() * 3,
        });
      }
    }

    // Draw particles
    drawParticles(ctx, state.particles);

    // ---- OVERLAYS (drawn on canvas for sharpness) ----

    // Countdown
    if (state.phase === 'countdown') {
      const text = state.countdownValue > 0 ? String(state.countdownValue) : 'GO!';
      const progress = state.countdownTimer / COUNTDOWN_FRAMES;
      const scale = 1 + progress * 0.5;
      const alpha = 1 - progress * 0.3;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font = `bold ${Math.floor(80 * scale * (w / 800))}px serif`;
      ctx.fillStyle = '#FFD700';
      ctx.strokeStyle = '#8B0000';
      ctx.lineWidth = 4 * (w / 800);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeText(text, w / 2, h / 2);
      ctx.fillText(text, w / 2, h / 2);
      ctx.restore();
    }

    // Lap counter and position (during racing)
    if (state.phase === 'racing') {
      const fontSize = Math.floor(18 * (w / 800));
      ctx.save();

      // Background panel
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      const panelW = 200 * (w / 800);
      const panelH = 55 * (w / 800);
      const panelX = w - panelW - 10;
      const panelY = 10;
      ctx.beginPath();
      ctx.roundRect(panelX, panelY, panelW, panelH, 8);
      ctx.fill();

      ctx.font = `bold ${fontSize}px serif`;
      ctx.fillStyle = '#FFD700';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';

      const lapText = `Lap ${Math.min(state.player.laps + 1, TOTAL_LAPS)}/${TOTAL_LAPS}`;
      ctx.fillText(lapText, w - 20, 18);

      const positions = getPositions(state);
      const posNames = ['1st', '2nd', '3rd'];
      const posColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
      ctx.fillStyle = posColors[positions[0] - 1];
      ctx.fillText(posNames[positions[0] - 1], w - 20, 18 + fontSize + 4);

      ctx.restore();
    }

    // Schedule next frame
    animFrameRef.current = requestAnimationFrame(gameLoop);
  }, [
    drawTrack, drawChariot, drawParticles, getTrackPoint, getTrackTangentAngle,
    updateChariot, getPositions, spawnConfetti, updateParticles, onComplete, playerWon,
  ]);

  // ----------------------------------------
  // START / RESTART
  // ----------------------------------------

  const startRace = useCallback(() => {
    const state = initGameState();
    state.phase = 'countdown';
    state.countdownValue = 3;
    gameStateRef.current = state;
    setPhase('countdown');
    setCountdownDisplay(3);
    setPlayerLaps(0);
    setPlayerPosition(1);

    // Start game loop
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(gameLoop);
  }, [initGameState, gameLoop]);

  const restartRace = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setPhase('ready');
    setPlayerWon(false);

    const state = initGameState();
    gameStateRef.current = state;

    // Draw initial frame
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawTrack(ctx, canvas.width, canvas.height);
        const chariotScale = Math.min(canvas.width, canvas.height) / 500;
        const allChariots = [state.player, ...state.opponents];
        for (const chariot of allChariots) {
          const pos = getTrackPoint(chariot.angle, chariot.laneOffset, canvas.width, canvas.height);
          const tangent = getTrackTangentAngle(chariot.angle, canvas.width, canvas.height);
          drawChariot(ctx, pos.x, pos.y, tangent - Math.PI / 2, chariot.color, chariot.accentColor, chariotScale);
        }
      }
    }
  }, [initGameState, drawTrack, drawChariot, getTrackPoint, getTrackTangentAngle]);

  // ----------------------------------------
  // INPUT HANDLING
  // ----------------------------------------

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const state = gameStateRef.current;
      if (!state) return;

      if (e.code === 'Space' && state.phase === 'ready') {
        e.preventDefault();
        startRace();
        return;
      }

      if (state.phase !== 'racing') return;

      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        e.preventDefault();
        state.steeringLeft = true;
      }
      if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        e.preventDefault();
        state.steeringRight = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const state = gameStateRef.current;
      if (!state) return;

      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        state.steeringLeft = false;
      }
      if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        state.steeringRight = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [startRace]);

  // Touch handling
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const state = gameStateRef.current;
    if (!state) return;

    if (state.phase === 'ready') {
      startRace();
      return;
    }
    if (state.phase !== 'racing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches[i];
      const x = touch.clientX - rect.left;
      if (x < rect.width / 2) {
        state.steeringLeft = true;
      } else {
        state.steeringRight = true;
      }
    }
  }, [startRace]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const state = gameStateRef.current;
    if (!state) return;

    // Reset both, then re-check remaining touches
    state.steeringLeft = false;
    state.steeringRight = false;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches[i];
      const x = touch.clientX - rect.left;
      if (x < rect.width / 2) {
        state.steeringLeft = true;
      } else {
        state.steeringRight = true;
      }
    }
  }, []);

  // ----------------------------------------
  // RESIZE
  // ----------------------------------------

  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;
      const w = container.clientWidth;
      const h = Math.floor(w * 3 / 4); // 4:3 aspect ratio
      setCanvasSize({ width: w, height: h });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Detect mobile
  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // ----------------------------------------
  // INITIAL DRAW + CLEANUP
  // ----------------------------------------

  useEffect(() => {
    const state = initGameState();
    gameStateRef.current = state;

    // Draw initial scene after a brief delay for canvas to mount
    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      drawTrack(ctx, canvas.width, canvas.height);
      const chariotScale = Math.min(canvas.width, canvas.height) / 500;
      const allChariots = [state.player, ...state.opponents];
      for (const chariot of allChariots) {
        const pos = getTrackPoint(chariot.angle, chariot.laneOffset, canvas.width, canvas.height);
        const tangent = getTrackTangentAngle(chariot.angle, canvas.width, canvas.height);
        drawChariot(ctx, pos.x, pos.y, tangent - Math.PI / 2, chariot.color, chariot.accentColor, chariotScale);
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  // We only want this to run once on mount + when canvas size changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasSize]);

  // ----------------------------------------
  // RENDER
  // ----------------------------------------

  const positionLabel = (pos: number) => {
    if (pos === 1) return '1st';
    if (pos === 2) return '2nd';
    return '3rd';
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        position: 'relative',
        fontFamily: '"Georgia", "Times New Roman", serif',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          borderRadius: '8px',
          border: '3px solid #8B7355',
        }}
      />

      {/* Ready overlay */}
      {phase === 'ready' && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '8px',
        }}>
          <div style={{
            fontSize: 'clamp(24px, 4vw, 42px)',
            fontWeight: 'bold',
            color: '#FFD700',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            marginBottom: '8px',
          }}>
            CHARIOT RACE
          </div>
          <div style={{
            fontSize: 'clamp(13px, 2vw, 18px)',
            color: '#F5DEB3',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            marginBottom: '4px',
          }}>
            Complete {TOTAL_LAPS} laps around the Circus Maximus!
          </div>
          <div style={{
            fontSize: 'clamp(11px, 1.5vw, 14px)',
            color: '#D2B48C',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            marginBottom: '20px',
          }}>
            {isMobile ? 'Tap left/right side of screen to steer' : 'Use Left/Right arrow keys (or A/D) to steer'}
          </div>
          <button
            onClick={startRace}
            style={{
              padding: '12px 32px',
              fontSize: 'clamp(16px, 2.5vw, 22px)',
              fontWeight: 'bold',
              fontFamily: '"Georgia", serif',
              color: '#FFF8DC',
              background: 'linear-gradient(180deg, #8B0000 0%, #5C0000 100%)',
              border: '2px solid #FFD700',
              borderRadius: '8px',
              cursor: 'pointer',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              transition: 'transform 0.1s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Start Race!
          </button>
          {!isMobile && (
            <div style={{
              marginTop: '10px',
              fontSize: 'clamp(10px, 1.2vw, 13px)',
              color: '#B8A88A',
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            }}>
              or press SPACE
            </div>
          )}
        </div>
      )}

      {/* Finished overlay */}
      {phase === 'finished' && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: playerWon
            ? 'radial-gradient(ellipse at center, rgba(139, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.8) 100%)'
            : 'rgba(0, 0, 0, 0.7)',
          borderRadius: '8px',
        }}>
          {playerWon ? (
            <>
              {/* Laurel wreath */}
              <div style={{
                fontSize: 'clamp(40px, 6vw, 70px)',
                lineHeight: 1,
                marginBottom: '4px',
                animation: 'chariot-bounce 0.6s ease-out',
              }}>
                🏛️
              </div>
              <div style={{
                fontSize: 'clamp(28px, 4.5vw, 48px)',
                fontWeight: 'bold',
                color: '#FFD700',
                textShadow: '0 0 20px rgba(255, 215, 0, 0.6), 2px 2px 4px rgba(0,0,0,0.8)',
                marginBottom: '8px',
                letterSpacing: '3px',
              }}>
                AVE, CHAMPION!
              </div>
              <div style={{
                fontSize: 'clamp(14px, 2vw, 20px)',
                color: '#F5DEB3',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                marginBottom: '20px',
              }}>
                You won the chariot race! The crowd cheers your name!
              </div>
            </>
          ) : (
            <>
              <div style={{
                fontSize: 'clamp(24px, 4vw, 40px)',
                fontWeight: 'bold',
                color: '#F5DEB3',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                marginBottom: '8px',
              }}>
                Good Race!
              </div>
              <div style={{
                fontSize: 'clamp(14px, 2vw, 20px)',
                color: '#D2B48C',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                marginBottom: '4px',
              }}>
                You finished {positionLabel(gameStateRef.current?.player.finishOrder || 3)}!
              </div>
              <div style={{
                fontSize: 'clamp(12px, 1.5vw, 16px)',
                color: '#B8A88A',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                marginBottom: '20px',
              }}>
                Even the greatest charioteers needed practice. Try again!
              </div>
            </>
          )}
          <button
            onClick={restartRace}
            style={{
              padding: '12px 32px',
              fontSize: 'clamp(16px, 2.5vw, 22px)',
              fontWeight: 'bold',
              fontFamily: '"Georgia", serif',
              color: '#FFF8DC',
              background: 'linear-gradient(180deg, #8B0000 0%, #5C0000 100%)',
              border: '2px solid #FFD700',
              borderRadius: '8px',
              cursor: 'pointer',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              transition: 'transform 0.1s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Race Again
          </button>
        </div>
      )}

      {/* Racing HUD — control hint */}
      {phase === 'racing' && (
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 'clamp(10px, 1.3vw, 13px)',
          color: 'rgba(255, 255, 255, 0.5)',
          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
          pointerEvents: 'none',
        }}>
          {isMobile ? 'Tap left/right to steer' : 'Arrow keys to steer'}
        </div>
      )}

      {/* Inject keyframe animation */}
      <style>{`
        @keyframes chariot-bounce {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ChariotRace;
