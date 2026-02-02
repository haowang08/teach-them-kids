import React, { useRef, useEffect, useCallback, useState } from 'react';

// ============================================
// TYPES
// ============================================

interface RoyalRoadMessengerProps {
  onComplete?: () => void;
}

type GamePhase = 'ready' | 'playing' | 'won' | 'lost';

interface Obstacle {
  x: number;       // world x position
  lane: number;    // 0, 1, or 2
  type: 'rock' | 'puddle' | 'log';
  width: number;
  passed: boolean;
}

interface RelayStation {
  x: number;        // world x position
  triggered: boolean;
}

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

interface TextPopup {
  text: string;
  x: number;
  y: number;
  life: number;
  maxLife: number;
  color: string;
}

interface GameState {
  phase: GamePhase;
  distance: number;         // how far the player has traveled
  totalDistance: number;     // total road length
  speed: number;            // current speed
  baseSpeed: number;        // normal speed
  boostSpeed: number;       // speed after relay station boost
  boostTimer: number;       // frames of boost remaining
  lane: number;             // 0 = top, 1 = middle, 2 = bottom
  targetLane: number;       // lane we're transitioning to
  laneProgress: number;     // 0-1 transition progress
  sprintMeter: number;      // 0-100
  sprinting: boolean;
  timer: number;            // seconds remaining (float)
  obstacles: Obstacle[];
  relayStations: RelayStation[];
  dustParticles: DustParticle[];
  textPopups: TextPopup[];
  frameCount: number;
  horseAnimFrame: number;   // for galloping animation
  scrollX: number;          // camera scroll position
  hitCooldown: number;      // frames of invulnerability after hit
  moveUp: boolean;
  moveDown: boolean;
  sprintKey: boolean;
}

// ============================================
// CONSTANTS
// ============================================

const TOTAL_DISTANCE = 5000;
const GAME_TIME = 60;           // seconds
const BASE_SPEED = 4;
const SPRINT_SPEED = 6.5;
const BOOST_SPEED = 7;
const BOOST_DURATION = 90;      // frames
const SPRINT_DRAIN = 0.8;       // per frame
const SPRINT_REFILL_RATE = 0.2; // per frame when not sprinting
const HIT_SLOWDOWN = 0.3;       // multiplier when hitting obstacle
const HIT_COOLDOWN_FRAMES = 30;
const LANE_SWITCH_SPEED = 0.12;
const NUM_RELAY_STATIONS = 5;
const OBSTACLE_DENSITY = 0.015; // probability per world-unit chunk

const SAND_LIGHT = '#F5DEB3';
const SAND_DARK = '#DEB887';
const PERSIAN_GREEN = '#1A4731';
const PERSIAN_GOLD = '#C9A227';
const SKY_TOP = '#87CEEB';
const SKY_BOTTOM = '#E8D8B8';
const ROAD_COLOR = '#C4A67D';
const ROAD_EDGE = '#8B7355';

// ============================================
// COMPONENT
// ============================================

const RoyalRoadMessenger: React.FC<RoyalRoadMessengerProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const gameStateRef = useRef<GameState | null>(null);
  const [phase, setPhase] = useState<GamePhase>('ready');
  const [isMobile, setIsMobile] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 450 });

  // ----------------------------------------
  // GENERATE WORLD
  // ----------------------------------------

  const generateObstacles = useCallback((totalDist: number, stations: RelayStation[]): Obstacle[] => {
    const obstacles: Obstacle[] = [];
    const types: Array<'rock' | 'puddle' | 'log'> = ['rock', 'puddle', 'log'];
    // Generate obstacles in chunks, avoiding relay station zones
    for (let x = 300; x < totalDist - 200; x += 20) {
      const nearStation = stations.some(s => Math.abs(s.x - x) < 150);
      if (nearStation) continue;
      if (Math.random() < OBSTACLE_DENSITY) {
        obstacles.push({
          x,
          lane: Math.floor(Math.random() * 3),
          type: types[Math.floor(Math.random() * types.length)],
          width: 30 + Math.random() * 20,
          passed: false,
        });
      }
    }
    return obstacles;
  }, []);

  const generateRelayStations = useCallback((totalDist: number): RelayStation[] => {
    const stations: RelayStation[] = [];
    for (let i = 1; i <= NUM_RELAY_STATIONS; i++) {
      stations.push({
        x: (totalDist / (NUM_RELAY_STATIONS + 1)) * i,
        triggered: false,
      });
    }
    return stations;
  }, []);

  // ----------------------------------------
  // INIT GAME STATE
  // ----------------------------------------

  const initGameState = useCallback((): GameState => {
    const stations = generateRelayStations(TOTAL_DISTANCE);
    const obstacles = generateObstacles(TOTAL_DISTANCE, stations);
    return {
      phase: 'ready',
      distance: 0,
      totalDistance: TOTAL_DISTANCE,
      speed: BASE_SPEED,
      baseSpeed: BASE_SPEED,
      boostSpeed: BOOST_SPEED,
      boostTimer: 0,
      lane: 1,
      targetLane: 1,
      laneProgress: 1,
      sprintMeter: 100,
      sprinting: false,
      timer: GAME_TIME,
      obstacles,
      relayStations: stations,
      dustParticles: [],
      textPopups: [],
      frameCount: 0,
      horseAnimFrame: 0,
      scrollX: 0,
      hitCooldown: 0,
      moveUp: false,
      moveDown: false,
      sprintKey: false,
    };
  }, [generateObstacles, generateRelayStations]);

  // ----------------------------------------
  // DRAWING HELPERS
  // ----------------------------------------

  const getLaneY = useCallback((lane: number, roadTop: number, laneHeight: number): number => {
    return roadTop + laneHeight * (lane + 0.5);
  }, []);

  const drawSky = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const skyHeight = h * 0.35;
    const grad = ctx.createLinearGradient(0, 0, 0, skyHeight);
    grad.addColorStop(0, SKY_TOP);
    grad.addColorStop(1, SKY_BOTTOM);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, skyHeight);
  }, []);

  const drawBackground = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, scrollX: number) => {
    const skyHeight = h * 0.35;

    // Desert ground above and below road
    ctx.fillStyle = SAND_LIGHT;
    ctx.fillRect(0, skyHeight, w, h - skyHeight);

    // Distant mountains/dunes
    ctx.fillStyle = SAND_DARK;
    ctx.beginPath();
    ctx.moveTo(0, skyHeight);
    for (let x = 0; x <= w; x += 40) {
      const duneH = Math.sin((x + scrollX * 0.1) * 0.008) * 25 +
                     Math.sin((x + scrollX * 0.1) * 0.015) * 15;
      ctx.lineTo(x, skyHeight - duneH);
    }
    ctx.lineTo(w, skyHeight + 30);
    ctx.lineTo(0, skyHeight + 30);
    ctx.closePath();
    ctx.fill();

    // Scattered bushes/trees along the road sides
    const bushInterval = 120;
    const roadTop = h * 0.4;
    const roadBottom = h * 0.85;
    for (let wx = -bushInterval; wx < w + bushInterval; wx += bushInterval) {
      const worldX = wx + (scrollX * 0.8) % bushInterval;
      const adjustedX = ((worldX % bushInterval) + bushInterval) % bushInterval - bushInterval / 2 + wx;

      // Top bushes
      const treeY = roadTop - 15 - Math.sin(adjustedX * 0.05) * 10;
      ctx.fillStyle = PERSIAN_GREEN;
      ctx.beginPath();
      ctx.arc(adjustedX, treeY, 12 + Math.sin(adjustedX * 0.1) * 4, 0, Math.PI * 2);
      ctx.fill();
      // Trunk
      ctx.fillStyle = '#5C4033';
      ctx.fillRect(adjustedX - 2, treeY + 8, 4, 10);

      // Bottom bushes
      const bushY = roadBottom + 20 + Math.cos(adjustedX * 0.07) * 8;
      ctx.fillStyle = '#2D5A27';
      ctx.beginPath();
      ctx.arc(adjustedX + 30, bushY, 10 + Math.cos(adjustedX * 0.08) * 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  const drawRoad = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, scrollX: number) => {
    const roadTop = h * 0.4;
    const roadBottom = h * 0.85;
    const roadHeight = roadBottom - roadTop;

    // Road surface
    ctx.fillStyle = ROAD_COLOR;
    ctx.fillRect(0, roadTop, w, roadHeight);

    // Road edges
    ctx.fillStyle = ROAD_EDGE;
    ctx.fillRect(0, roadTop, w, 4);
    ctx.fillRect(0, roadBottom - 4, w, 4);

    // Lane dividers (dashed)
    const laneHeight = roadHeight / 3;
    ctx.setLineDash([20, 20]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    for (let i = 1; i < 3; i++) {
      const y = roadTop + laneHeight * i;
      ctx.beginPath();
      const offset = scrollX % 40;
      ctx.moveTo(-offset, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Road texture (small pebbles)
    const pebbleInterval = 60;
    for (let px = 0; px < w; px += pebbleInterval) {
      const worldPx = px + scrollX;
      const seed = Math.sin(worldPx * 127.1) * 43758.5453;
      const frac = seed - Math.floor(seed);
      const py = roadTop + frac * roadHeight;
      ctx.fillStyle = 'rgba(139, 119, 101, 0.3)';
      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  const drawHorseAndRider = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number, y: number,
    animFrame: number,
    scale: number,
    hitCooldown: number,
    sprinting: boolean,
  ) => {
    ctx.save();

    // Flash when hit
    if (hitCooldown > 0 && Math.floor(hitCooldown / 4) % 2 === 0) {
      ctx.globalAlpha = 0.4;
    }

    const s = scale;
    const gallop = Math.sin(animFrame * 0.3) * 4 * s;
    const legPhase = animFrame * 0.3;

    // Horse body
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.ellipse(x, y + gallop, 28 * s, 14 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    // Horse head
    ctx.fillStyle = '#7A3B10';
    ctx.beginPath();
    ctx.ellipse(x + 28 * s, y - 10 * s + gallop, 10 * s, 8 * s, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Horse ear
    ctx.beginPath();
    ctx.moveTo(x + 34 * s, y - 18 * s + gallop);
    ctx.lineTo(x + 37 * s, y - 26 * s + gallop);
    ctx.lineTo(x + 40 * s, y - 18 * s + gallop);
    ctx.fillStyle = '#7A3B10';
    ctx.fill();

    // Horse eye
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(x + 34 * s, y - 12 * s + gallop, 2 * s, 0, Math.PI * 2);
    ctx.fill();

    // Horse legs (animated)
    ctx.strokeStyle = '#6B3410';
    ctx.lineWidth = 3 * s;
    const legOffsets = [
      { dx: -16, phase: 0 },
      { dx: -8, phase: Math.PI * 0.5 },
      { dx: 8, phase: Math.PI },
      { dx: 16, phase: Math.PI * 1.5 },
    ];
    for (const leg of legOffsets) {
      const legKick = Math.sin(legPhase + leg.phase) * 8 * s;
      ctx.beginPath();
      ctx.moveTo(x + leg.dx * s, y + 12 * s + gallop);
      ctx.lineTo(x + (leg.dx + legKick * 0.5) * s, y + 26 * s + gallop);
      ctx.stroke();
    }

    // Horse tail
    ctx.strokeStyle = '#5C2D0E';
    ctx.lineWidth = 3 * s;
    const tailWave = Math.sin(animFrame * 0.2) * 6 * s;
    ctx.beginPath();
    ctx.moveTo(x - 28 * s, y + gallop);
    ctx.quadraticCurveTo(x - 38 * s, y - 5 * s + tailWave + gallop, x - 42 * s, y + 5 * s + gallop);
    ctx.stroke();

    // Horse mane
    ctx.strokeStyle = '#5C2D0E';
    ctx.lineWidth = 2 * s;
    for (let i = 0; i < 4; i++) {
      const mx = x + (15 - i * 6) * s;
      const maneWave = Math.sin(animFrame * 0.25 + i * 0.5) * 3 * s;
      ctx.beginPath();
      ctx.moveTo(mx, y - 12 * s + gallop);
      ctx.lineTo(mx - 3 * s, y - 20 * s + maneWave + gallop);
      ctx.stroke();
    }

    // Rider body
    ctx.fillStyle = PERSIAN_GREEN;
    ctx.beginPath();
    ctx.ellipse(x + 2 * s, y - 20 * s + gallop, 8 * s, 12 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    // Rider head
    ctx.fillStyle = '#D2A679';
    ctx.beginPath();
    ctx.arc(x + 2 * s, y - 34 * s + gallop, 6 * s, 0, Math.PI * 2);
    ctx.fill();

    // Rider hat/turban
    ctx.fillStyle = PERSIAN_GOLD;
    ctx.beginPath();
    ctx.arc(x + 2 * s, y - 37 * s + gallop, 5 * s, Math.PI, 0);
    ctx.fill();

    // Message scroll (satchel)
    ctx.fillStyle = '#F5DEB3';
    ctx.fillRect(x - 8 * s, y - 14 * s + gallop, 8 * s, 5 * s);
    ctx.strokeStyle = PERSIAN_GOLD;
    ctx.lineWidth = 1 * s;
    ctx.strokeRect(x - 8 * s, y - 14 * s + gallop, 8 * s, 5 * s);

    // Sprint effect
    if (sprinting) {
      ctx.strokeStyle = 'rgba(255, 200, 50, 0.6)';
      ctx.lineWidth = 2 * s;
      for (let i = 0; i < 3; i++) {
        const lx = x - 35 * s - i * 12 * s;
        const ly = y + gallop + (i - 1) * 8 * s;
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.lineTo(lx - 10 * s, ly);
        ctx.stroke();
      }
    }

    ctx.restore();
  }, []);

  const drawObstacle = useCallback((
    ctx: CanvasRenderingContext2D,
    screenX: number, laneY: number,
    type: 'rock' | 'puddle' | 'log',
    scale: number,
  ) => {
    const s = scale;
    if (type === 'rock') {
      ctx.fillStyle = '#808080';
      ctx.beginPath();
      ctx.moveTo(screenX - 12 * s, laneY + 8 * s);
      ctx.lineTo(screenX - 8 * s, laneY - 10 * s);
      ctx.lineTo(screenX + 4 * s, laneY - 12 * s);
      ctx.lineTo(screenX + 14 * s, laneY - 4 * s);
      ctx.lineTo(screenX + 12 * s, laneY + 8 * s);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#696969';
      ctx.beginPath();
      ctx.arc(screenX + 2 * s, laneY - 2 * s, 6 * s, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'puddle') {
      ctx.fillStyle = 'rgba(70, 130, 180, 0.5)';
      ctx.beginPath();
      ctx.ellipse(screenX, laneY, 18 * s, 8 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(100, 160, 210, 0.6)';
      ctx.lineWidth = 1.5 * s;
      ctx.beginPath();
      ctx.ellipse(screenX + 4 * s, laneY - 2 * s, 8 * s, 3 * s, 0.2, 0, Math.PI * 2);
      ctx.stroke();
    } else if (type === 'log') {
      ctx.fillStyle = '#5C4033';
      ctx.fillRect(screenX - 20 * s, laneY - 5 * s, 40 * s, 10 * s);
      // Wood grain
      ctx.strokeStyle = '#4A3228';
      ctx.lineWidth = 1 * s;
      for (let i = 0; i < 3; i++) {
        const lx = screenX - 15 * s + i * 12 * s;
        ctx.beginPath();
        ctx.moveTo(lx, laneY - 4 * s);
        ctx.lineTo(lx, laneY + 4 * s);
        ctx.stroke();
      }
      // End circles
      ctx.fillStyle = '#7A5C4F';
      ctx.beginPath();
      ctx.ellipse(screenX - 20 * s, laneY, 5 * s, 5 * s, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  const drawRelayStation = useCallback((
    ctx: CanvasRenderingContext2D,
    screenX: number,
    roadTop: number,
    roadBottom: number,
    triggered: boolean,
    scale: number,
  ) => {
    const s = scale;
    const midY = (roadTop + roadBottom) / 2;

    // Station canopy posts
    ctx.fillStyle = triggered ? '#888' : PERSIAN_GOLD;
    ctx.fillRect(screenX - 25 * s, roadTop - 30 * s, 4 * s, 30 * s + (roadBottom - roadTop));
    ctx.fillRect(screenX + 21 * s, roadTop - 30 * s, 4 * s, 30 * s + (roadBottom - roadTop));

    // Canopy roof
    ctx.fillStyle = triggered ? '#666' : PERSIAN_GREEN;
    ctx.beginPath();
    ctx.moveTo(screenX - 30 * s, roadTop - 25 * s);
    ctx.lineTo(screenX, roadTop - 45 * s);
    ctx.lineTo(screenX + 30 * s, roadTop - 25 * s);
    ctx.closePath();
    ctx.fill();

    // Gold trim
    ctx.strokeStyle = PERSIAN_GOLD;
    ctx.lineWidth = 2 * s;
    ctx.beginPath();
    ctx.moveTo(screenX - 30 * s, roadTop - 25 * s);
    ctx.lineTo(screenX, roadTop - 45 * s);
    ctx.lineTo(screenX + 30 * s, roadTop - 25 * s);
    ctx.stroke();

    // Horse icon inside station
    if (!triggered) {
      ctx.fillStyle = '#8B4513';
      ctx.beginPath();
      ctx.ellipse(screenX, midY, 15 * s, 8 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      // "RELAY" text
      ctx.fillStyle = PERSIAN_GOLD;
      ctx.font = `bold ${Math.floor(10 * s)}px serif`;
      ctx.textAlign = 'center';
      ctx.fillText('RELAY', screenX, roadTop - 30 * s);
    } else {
      ctx.fillStyle = '#999';
      ctx.font = `${Math.floor(9 * s)}px serif`;
      ctx.textAlign = 'center';
      ctx.fillText('visited', screenX, midY + 4 * s);
    }
  }, []);

  const drawProgressBar = useCallback((
    ctx: CanvasRenderingContext2D,
    w: number,
    distance: number,
    totalDistance: number,
    stations: RelayStation[],
  ) => {
    const barX = 20;
    const barY = 12;
    const barW = w - 40;
    const barH = 18;

    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.roundRect(barX - 4, barY - 4, barW + 8, barH + 8, 6);
    ctx.fill();

    // Track
    ctx.fillStyle = '#5C4033';
    ctx.fillRect(barX, barY, barW, barH);

    // Progress fill
    const progress = Math.min(distance / totalDistance, 1);
    const grad = ctx.createLinearGradient(barX, 0, barX + barW * progress, 0);
    grad.addColorStop(0, PERSIAN_GREEN);
    grad.addColorStop(1, '#2D8B57');
    ctx.fillStyle = grad;
    ctx.fillRect(barX, barY, barW * progress, barH);

    // Station markers
    for (const station of stations) {
      const sx = barX + (station.x / totalDistance) * barW;
      ctx.fillStyle = station.triggered ? '#888' : PERSIAN_GOLD;
      ctx.fillRect(sx - 2, barY - 2, 4, barH + 4);
      // Small diamond
      ctx.beginPath();
      ctx.moveTo(sx, barY - 6);
      ctx.lineTo(sx + 4, barY - 2);
      ctx.lineTo(sx, barY + 2);
      ctx.lineTo(sx - 4, barY - 2);
      ctx.closePath();
      ctx.fill();
    }

    // Sardis label
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 10px serif';
    ctx.textAlign = 'left';
    ctx.fillText('Sardis', barX, barY + barH + 14);

    // Susa label
    ctx.textAlign = 'right';
    ctx.fillText('Susa', barX + barW, barY + barH + 14);

    // Horse marker on progress bar
    const horseX = barX + progress * barW;
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.moveTo(horseX, barY + barH + 2);
    ctx.lineTo(horseX - 4, barY + barH + 8);
    ctx.lineTo(horseX + 4, barY + barH + 8);
    ctx.closePath();
    ctx.fill();
  }, []);

  const drawHUD = useCallback((
    ctx: CanvasRenderingContext2D,
    w: number, h: number,
    timer: number,
    sprintMeter: number,
    boostTimer: number,
  ) => {
    const fontSize = Math.max(18, Math.floor(w * 0.03));

    // Timer
    const timeColor = timer < 15 ? '#FF4444' : timer < 30 ? '#FFD700' : '#FFF';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.roundRect(w / 2 - 50, 42, 100, 34, 6);
    ctx.fill();
    ctx.fillStyle = timeColor;
    ctx.font = `bold ${fontSize}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${Math.ceil(timer)}s`, w / 2, 59);

    // Flash timer when low
    if (timer < 10 && Math.floor(timer * 3) % 2 === 0) {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.15)';
      ctx.fillRect(0, 0, w, h);
    }

    // Sprint meter
    const smX = 20;
    const smY = h - 30;
    const smW = 120;
    const smH = 14;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.roundRect(smX - 4, smY - 4, smW + 8, smH + 8, 4);
    ctx.fill();
    ctx.fillStyle = '#333';
    ctx.fillRect(smX, smY, smW, smH);
    const sprintColor = sprintMeter > 30 ? PERSIAN_GOLD : '#AA4444';
    ctx.fillStyle = sprintColor;
    ctx.fillRect(smX, smY, smW * (sprintMeter / 100), smH);
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 10px serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('SPRINT', smX + 4, smY + smH / 2 + 1);

    // Boost indicator
    if (boostTimer > 0) {
      ctx.fillStyle = PERSIAN_GOLD;
      ctx.font = `bold ${Math.floor(fontSize * 0.8)}px serif`;
      ctx.textAlign = 'center';
      ctx.fillText('FRESH HORSE!', w / 2, h - 24);
    }
  }, []);

  const drawDustParticles = useCallback((ctx: CanvasRenderingContext2D, particles: DustParticle[]) => {
    for (const p of particles) {
      const alpha = (p.life / p.maxLife) * 0.6;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = SAND_DARK;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, []);

  const drawTextPopups = useCallback((ctx: CanvasRenderingContext2D, popups: TextPopup[]) => {
    for (const p of popups) {
      const progress = 1 - p.life / p.maxLife;
      const alpha = 1 - progress;
      const yOff = progress * -40;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.font = `bold ${18 + progress * 8}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeStyle = 'rgba(0,0,0,0.6)';
      ctx.lineWidth = 3;
      ctx.strokeText(p.text, p.x, p.y + yOff);
      ctx.fillText(p.text, p.x, p.y + yOff);
    }
    ctx.globalAlpha = 1;
  }, []);

  // ----------------------------------------
  // GAME LOOP
  // ----------------------------------------

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    const state = gameStateRef.current;
    if (!canvas || !state) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const scale = Math.min(w / 800, h / 450);
    const roadTop = h * 0.4;
    const roadBottom = h * 0.85;
    const roadHeight = roadBottom - roadTop;
    const laneHeight = roadHeight / 3;

    state.frameCount++;

    // ---- UPDATE ----
    if (state.phase === 'playing') {
      // Timer
      state.timer -= 1 / 60;
      if (state.timer <= 0) {
        state.timer = 0;
        state.phase = 'lost';
        setPhase('lost');
      }

      // Lane switching
      if (state.moveUp && state.targetLane > 0 && state.laneProgress >= 1) {
        state.targetLane--;
        state.laneProgress = 0;
      }
      if (state.moveDown && state.targetLane < 2 && state.laneProgress >= 1) {
        state.targetLane++;
        state.laneProgress = 0;
      }
      // Reset move flags (they act as one-shot triggers for keyboard, held for touch)
      state.moveUp = false;
      state.moveDown = false;

      if (state.laneProgress < 1) {
        state.laneProgress = Math.min(state.laneProgress + LANE_SWITCH_SPEED, 1);
        state.lane = state.lane + (state.targetLane - state.lane) * LANE_SWITCH_SPEED;
      } else {
        state.lane = state.targetLane;
      }

      // Sprint
      state.sprinting = state.sprintKey && state.sprintMeter > 0;
      if (state.sprinting) {
        state.sprintMeter = Math.max(0, state.sprintMeter - SPRINT_DRAIN);
      } else if (state.sprintMeter < 100) {
        state.sprintMeter = Math.min(100, state.sprintMeter + SPRINT_REFILL_RATE);
      }

      // Speed calculation
      let currentSpeed = state.baseSpeed;
      if (state.boostTimer > 0) {
        currentSpeed = state.boostSpeed;
        state.boostTimer--;
      }
      if (state.sprinting) {
        currentSpeed = Math.max(currentSpeed, SPRINT_SPEED);
      }
      if (state.hitCooldown > 0) {
        if (state.hitCooldown > HIT_COOLDOWN_FRAMES - 10) {
          currentSpeed *= HIT_SLOWDOWN;
        }
        state.hitCooldown--;
      }
      state.speed = currentSpeed;

      // Move forward
      state.distance += state.speed;
      state.scrollX = state.distance;

      // Horse animation
      state.horseAnimFrame += state.speed * 0.5;

      // Check relay stations
      for (const station of state.relayStations) {
        if (!station.triggered && state.distance >= station.x - 20 && state.distance <= station.x + 40) {
          station.triggered = true;
          state.boostTimer = BOOST_DURATION;
          state.sprintMeter = 100; // refill sprint
          state.textPopups.push({
            text: 'Fresh Horse!',
            x: w * 0.5,
            y: h * 0.35,
            life: 80,
            maxLife: 80,
            color: PERSIAN_GOLD,
          });
        }
      }

      // Check obstacle collisions
      const playerWorldX = state.distance;
      const playerLane = Math.round(state.lane);
      for (const obs of state.obstacles) {
        if (obs.passed) continue;
        if (playerWorldX > obs.x + obs.width) {
          obs.passed = true;
          continue;
        }
        if (state.hitCooldown > 0) continue;
        const hitRange = 40;
        if (Math.abs(playerWorldX - obs.x) < hitRange && obs.lane === playerLane) {
          state.hitCooldown = HIT_COOLDOWN_FRAMES;
          obs.passed = true;
          const typeText = obs.type === 'rock' ? 'Ouch!' : obs.type === 'puddle' ? 'Splash!' : 'Thud!';
          state.textPopups.push({
            text: typeText,
            x: w * 0.35,
            y: getLaneY(playerLane, roadTop, laneHeight),
            life: 40,
            maxLife: 40,
            color: '#FF6347',
          });
        }
      }

      // Spawn dust particles
      if (state.frameCount % 3 === 0) {
        const horseScreenX = w * 0.25;
        const horseY = getLaneY(state.lane, roadTop, laneHeight);
        state.dustParticles.push({
          x: horseScreenX - 30 * scale,
          y: horseY + 15 * scale + Math.random() * 6,
          vx: -1.5 - Math.random() * 2,
          vy: (Math.random() - 0.5) * 1.5,
          life: 20 + Math.random() * 10,
          maxLife: 30,
          size: 2 + Math.random() * 4,
        });
      }

      // Win check
      if (state.distance >= state.totalDistance) {
        state.phase = 'won';
        setPhase('won');
        if (onComplete) onComplete();
      }
    }

    // Update particles
    state.dustParticles = state.dustParticles
      .map(p => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, life: p.life - 1 }))
      .filter(p => p.life > 0);

    // Update text popups
    state.textPopups = state.textPopups
      .map(p => ({ ...p, life: p.life - 1 }))
      .filter(p => p.life > 0);

    // ---- DRAW ----
    ctx.clearRect(0, 0, w, h);

    // Sky
    drawSky(ctx, w, h);

    // Background (desert, trees)
    drawBackground(ctx, w, h, state.scrollX);

    // Road
    drawRoad(ctx, w, h, state.scrollX);

    // Relay stations (draw those visible on screen)
    for (const station of state.relayStations) {
      const screenX = (station.x - state.distance) + w * 0.25;
      if (screenX > -100 && screenX < w + 100) {
        drawRelayStation(ctx, screenX, roadTop, roadBottom, station.triggered, scale);
      }
    }

    // Obstacles
    for (const obs of state.obstacles) {
      if (obs.passed) continue;
      const screenX = (obs.x - state.distance) + w * 0.25;
      if (screenX > -60 && screenX < w + 60) {
        const laneY = getLaneY(obs.lane, roadTop, laneHeight);
        drawObstacle(ctx, screenX, laneY, obs.type, scale);
      }
    }

    // Dust particles
    drawDustParticles(ctx, state.dustParticles);

    // Horse + rider
    const horseScreenX = w * 0.25;
    const currentLaneY = getLaneY(state.lane, roadTop, laneHeight);
    drawHorseAndRider(ctx, horseScreenX, currentLaneY, state.horseAnimFrame, scale, state.hitCooldown, state.sprinting);

    // Text popups
    drawTextPopups(ctx, state.textPopups);

    // HUD
    if (state.phase === 'playing') {
      drawProgressBar(ctx, w, state.distance, state.totalDistance, state.relayStations);
      drawHUD(ctx, w, h, state.timer, state.sprintMeter, state.boostTimer);
    }

    // Finish line animation when won
    if (state.phase === 'won') {
      // Confetti-like effect
      if (state.frameCount % 2 === 0) {
        for (let i = 0; i < 4; i++) {
          state.dustParticles.push({
            x: Math.random() * w,
            y: -5,
            vx: (Math.random() - 0.5) * 3,
            vy: Math.random() * 3 + 1,
            life: 80 + Math.random() * 40,
            maxLife: 120,
            size: 4 + Math.random() * 6,
          });
        }
      }
      // Keep drawing particles as confetti
      for (const p of state.dustParticles) {
        const alpha = p.life / p.maxLife;
        const colors = [PERSIAN_GOLD, PERSIAN_GREEN, '#FFD700', '#FF6347', '#4169E1'];
        ctx.globalAlpha = alpha;
        ctx.fillStyle = colors[Math.floor(Math.abs(Math.sin(p.x * 10)) * colors.length)];
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      }
      ctx.globalAlpha = 1;
    }

    // Schedule next frame
    animFrameRef.current = requestAnimationFrame(gameLoop);
  }, [
    drawSky, drawBackground, drawRoad, drawRelayStation, drawObstacle,
    drawHorseAndRider, drawDustParticles, drawTextPopups, drawProgressBar,
    drawHUD, getLaneY, onComplete,
  ]);

  // ----------------------------------------
  // START / RESTART
  // ----------------------------------------

  const startGame = useCallback(() => {
    const state = initGameState();
    state.phase = 'playing';
    gameStateRef.current = state;
    setPhase('playing');

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(gameLoop);
  }, [initGameState, gameLoop]);

  const restartGame = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setPhase('ready');

    const state = initGameState();
    gameStateRef.current = state;

    // Draw initial frame
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawSky(ctx, canvas.width, canvas.height);
        drawBackground(ctx, canvas.width, canvas.height, 0);
        drawRoad(ctx, canvas.width, canvas.height, 0);
        const scale = Math.min(canvas.width / 800, canvas.height / 450);
        const roadTop = canvas.height * 0.4;
        const laneHeight = (canvas.height * 0.85 - roadTop) / 3;
        drawHorseAndRider(ctx, canvas.width * 0.25, getLaneY(1, roadTop, laneHeight), 0, scale, 0, false);
      }
    }
  }, [initGameState, drawSky, drawBackground, drawRoad, drawHorseAndRider, getLaneY]);

  // ----------------------------------------
  // INPUT HANDLING
  // ----------------------------------------

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const state = gameStateRef.current;
      if (!state) return;

      if (e.code === 'Space' && state.phase === 'ready') {
        e.preventDefault();
        startGame();
        return;
      }

      if (state.phase !== 'playing') return;

      if (e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        state.moveUp = true;
      }
      if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        e.preventDefault();
        state.moveDown = true;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        state.sprintKey = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const state = gameStateRef.current;
      if (!state) return;

      if (e.code === 'Space') {
        state.sprintKey = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [startGame]);

  // Touch handling
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const state = gameStateRef.current;
    if (!state) return;

    if (state.phase === 'ready') {
      startGame();
      return;
    }
    if (state.phase !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches[i];
      const x = touch.clientX - rect.left;
      const relX = x / rect.width;

      if (relX < 0.33) {
        // Left third = move up
        state.moveUp = true;
      } else if (relX > 0.66) {
        // Right third = move down
        state.moveDown = true;
      } else {
        // Center = sprint
        state.sprintKey = true;
      }
    }
  }, [startGame]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const state = gameStateRef.current;
    if (!state) return;

    state.sprintKey = false;

    // Re-check remaining touches
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches[i];
      const x = touch.clientX - rect.left;
      const relX = x / rect.width;
      if (relX >= 0.33 && relX <= 0.66) {
        state.sprintKey = true;
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
      const h = Math.floor(w * 9 / 16); // 16:9 aspect ratio
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

    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      drawSky(ctx, canvas.width, canvas.height);
      drawBackground(ctx, canvas.width, canvas.height, 0);
      drawRoad(ctx, canvas.width, canvas.height, 0);
      const scale = Math.min(canvas.width / 800, canvas.height / 450);
      const roadTop = canvas.height * 0.4;
      const laneHeight = (canvas.height * 0.85 - roadTop) / 3;
      drawHorseAndRider(ctx, canvas.width * 0.25, getLaneY(1, roadTop, laneHeight), 0, scale, 0, false);
    }, 50);

    return () => {
      clearTimeout(timer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasSize]);

  // ----------------------------------------
  // RENDER
  // ----------------------------------------

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
          border: `3px solid ${ROAD_EDGE}`,
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
            fontSize: 'clamp(22px, 4vw, 40px)',
            fontWeight: 'bold',
            color: PERSIAN_GOLD,
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            marginBottom: '8px',
          }}>
            ROYAL ROAD MESSENGER
          </div>
          <div style={{
            fontSize: 'clamp(12px, 1.8vw, 16px)',
            color: '#F5DEB3',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            marginBottom: '4px',
            textAlign: 'center',
            maxWidth: '80%',
          }}>
            Deliver the King's message from Sardis to Susa before time runs out!
          </div>
          <div style={{
            fontSize: 'clamp(11px, 1.4vw, 14px)',
            color: '#D2B48C',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            marginBottom: '4px',
            textAlign: 'center',
            maxWidth: '80%',
          }}>
            Dodge obstacles and stop at relay stations for a fresh horse!
          </div>
          <div style={{
            fontSize: 'clamp(10px, 1.3vw, 13px)',
            color: '#B8A88A',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            marginBottom: '16px',
            textAlign: 'center',
          }}>
            {isMobile
              ? 'Tap left/right sides to change lanes, center to sprint'
              : 'Up/Down (or W/S) to dodge, SPACE to sprint'}
          </div>
          <button
            onClick={startGame}
            style={{
              padding: '12px 32px',
              fontSize: 'clamp(16px, 2.5vw, 22px)',
              fontWeight: 'bold',
              fontFamily: '"Georgia", serif',
              color: '#FFF8DC',
              background: `linear-gradient(180deg, ${PERSIAN_GREEN} 0%, #0F2E1F 100%)`,
              border: `2px solid ${PERSIAN_GOLD}`,
              borderRadius: '8px',
              cursor: 'pointer',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              transition: 'transform 0.1s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Start Ride!
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

      {/* Won overlay */}
      {phase === 'won' && (
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
          background: `radial-gradient(ellipse at center, rgba(26, 71, 49, 0.7) 0%, rgba(0, 0, 0, 0.8) 100%)`,
          borderRadius: '8px',
        }}>
          <div style={{
            fontSize: 'clamp(36px, 6vw, 64px)',
            lineHeight: 1,
            marginBottom: '4px',
            animation: 'messenger-bounce 0.6s ease-out',
          }}>
            {'\u{1F3C7}'}
          </div>
          <div style={{
            fontSize: 'clamp(26px, 4.5vw, 46px)',
            fontWeight: 'bold',
            color: PERSIAN_GOLD,
            textShadow: `0 0 20px rgba(201, 162, 39, 0.6), 2px 2px 4px rgba(0,0,0,0.8)`,
            marginBottom: '8px',
            letterSpacing: '3px',
          }}>
            MESSAGE DELIVERED!
          </div>
          <div style={{
            fontSize: 'clamp(14px, 2vw, 20px)',
            color: '#F5DEB3',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            marginBottom: '4px',
            textAlign: 'center',
          }}>
            The King's message reached Susa!
          </div>
          <div style={{
            fontSize: 'clamp(12px, 1.5vw, 16px)',
            color: '#D2B48C',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            marginBottom: '20px',
            textAlign: 'center',
          }}>
            Time remaining: {Math.ceil(gameStateRef.current?.timer || 0)}s
          </div>
          <button
            onClick={restartGame}
            style={{
              padding: '12px 32px',
              fontSize: 'clamp(16px, 2.5vw, 22px)',
              fontWeight: 'bold',
              fontFamily: '"Georgia", serif',
              color: '#FFF8DC',
              background: `linear-gradient(180deg, ${PERSIAN_GREEN} 0%, #0F2E1F 100%)`,
              border: `2px solid ${PERSIAN_GOLD}`,
              borderRadius: '8px',
              cursor: 'pointer',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              transition: 'transform 0.1s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Play Again
          </button>
        </div>
      )}

      {/* Lost overlay */}
      {phase === 'lost' && (
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
          background: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '8px',
        }}>
          <div style={{
            fontSize: 'clamp(24px, 4vw, 40px)',
            fontWeight: 'bold',
            color: '#F5DEB3',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            marginBottom: '8px',
          }}>
            Time's Up!
          </div>
          <div style={{
            fontSize: 'clamp(13px, 1.8vw, 18px)',
            color: '#D2B48C',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            marginBottom: '4px',
            textAlign: 'center',
          }}>
            You traveled {Math.floor((gameStateRef.current?.distance || 0) / TOTAL_DISTANCE * 100)}% of the Royal Road.
          </div>
          <div style={{
            fontSize: 'clamp(11px, 1.4vw, 15px)',
            color: '#B8A88A',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            marginBottom: '20px',
            textAlign: 'center',
          }}>
            The fastest messengers never gave up. Try again!
          </div>
          <button
            onClick={restartGame}
            style={{
              padding: '12px 32px',
              fontSize: 'clamp(16px, 2.5vw, 22px)',
              fontWeight: 'bold',
              fontFamily: '"Georgia", serif',
              color: '#FFF8DC',
              background: `linear-gradient(180deg, ${PERSIAN_GREEN} 0%, #0F2E1F 100%)`,
              border: `2px solid ${PERSIAN_GOLD}`,
              borderRadius: '8px',
              cursor: 'pointer',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              transition: 'transform 0.1s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Play Again
          </button>
        </div>
      )}

      {/* Playing HUD hint */}
      {phase === 'playing' && (
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
          {isMobile ? 'Tap left/right to dodge, center to sprint' : 'Up/Down to dodge, SPACE to sprint'}
        </div>
      )}

      {/* Keyframe animation */}
      <style>{`
        @keyframes messenger-bounce {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default RoyalRoadMessenger;
