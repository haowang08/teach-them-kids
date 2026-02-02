import React, { useRef, useEffect, useCallback, useState } from 'react';

// ============================================
// TYPES
// ============================================

interface GoldCaravanProps {
  onComplete?: () => void;
}

type GamePhase = 'ready' | 'traveling' | 'oasis' | 'sandstorm' | 'arrived';

interface Camel {
  x: number;
  y: number;
  offsetX: number; // lateral offset behind leader
  offsetY: number;
}

interface Oasis {
  y: number;          // world-y position (distance from start)
  name: string;
  goldToSaltRate: number;  // how many salt per 1 gold
  saltToGoldRate: number;  // how many gold per 1 salt
  visited: boolean;
  palmTrees: { x: number; size: number }[];
}

interface Sandstorm {
  x: number;
  y: number;        // world-y
  radius: number;
  angle: number;
  speed: number;
}

interface WaterDrop {
  x: number;
  y: number;        // world-y
  collected: boolean;
}

interface SandParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  alpha: number;
}

interface Dune {
  x: number;
  y: number;        // world-y
  rx: number;
  ry: number;
  color: string;
}

interface GameState {
  phase: GamePhase;
  caravanX: number;
  worldY: number;         // how far we've traveled (increases)
  speed: number;
  baseSpeed: number;
  gold: number;
  salt: number;
  water: number;          // 0-100
  maxWater: number;
  totalDistance: number;
  camels: Camel[];
  oases: Oasis[];
  sandstorms: Sandstorm[];
  waterDrops: WaterDrop[];
  sandParticles: SandParticle[];
  dunes: Dune[];
  steeringLeft: boolean;
  steeringRight: boolean;
  frameCount: number;
  currentOasisIndex: number;
  slowTimer: number;
  flashTimer: number;     // for collection flash
}

// ============================================
// CONSTANTS
// ============================================

const TOTAL_DISTANCE = 3000;
const CARAVAN_BASE_SPEED = 1.8;
const STEER_SPEED = 3.5;
const WATER_DRAIN_RATE = 0.04;  // per frame
const LOW_WATER_SPEED_MULT = 0.35;
const SANDSTORM_SLOW_FRAMES = 40;

const SAND_BG = '#F4E6C8';
const SAND_DARK = '#DEB887';
const SAND_BROWN = '#CD853F';
const GOLD_COLOR = '#FFD700';
const OASIS_GREEN = '#3A7D44';
const PALM_GREEN = '#2D6A2E';
const PALM_TRUNK = '#8B6914';
const WATER_BLUE = '#4FC3F7';
const CAMEL_BROWN = '#7B5B3A';
const CAMEL_DARK = '#5C3D1E';

const OASIS_DATA = [
  { name: 'Oasis of Walata', distFrac: 0.18, goldToSalt: 3.0, saltToGold: 0.25 },
  { name: 'Oasis of Kumbi', distFrac: 0.40, goldToSalt: 2.0, saltToGold: 0.45 },
  { name: 'Oasis of Djenne', distFrac: 0.65, goldToSalt: 1.2, saltToGold: 0.70 },
  { name: 'Oasis of Gao',   distFrac: 0.85, goldToSalt: 0.6, saltToGold: 1.50 },
];

// ============================================
// COMPONENT
// ============================================

const GoldCaravan: React.FC<GoldCaravanProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const gameStateRef = useRef<GameState | null>(null);
  const [phase, setPhase] = useState<GamePhase>('ready');
  const [isMobile, setIsMobile] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [tradeGold, setTradeGold] = useState(0);
  const [tradeSalt, setTradeSalt] = useState(0);
  const [finalWealth, setFinalWealth] = useState(0);

  // ----------------------------------------
  // INIT GAME STATE
  // ----------------------------------------

  const generateDunes = useCallback((): Dune[] => {
    const dunes: Dune[] = [];
    const colors = ['#E8D5A8', '#DCCB94', '#D4BE82', '#C9B270', SAND_DARK];
    for (let i = 0; i < 120; i++) {
      dunes.push({
        x: Math.random() * 900 - 50,
        y: Math.random() * (TOTAL_DISTANCE + 600),
        rx: 30 + Math.random() * 80,
        ry: 10 + Math.random() * 25,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return dunes;
  }, []);

  const generateWaterDrops = useCallback((): WaterDrop[] => {
    const drops: WaterDrop[] = [];
    for (let i = 0; i < 40; i++) {
      drops.push({
        x: 80 + Math.random() * 640,
        y: 200 + Math.random() * (TOTAL_DISTANCE - 400),
        collected: false,
      });
    }
    return drops;
  }, []);

  const generateSandstorms = useCallback((): Sandstorm[] => {
    const storms: Sandstorm[] = [];
    for (let i = 0; i < 12; i++) {
      const y = 300 + Math.random() * (TOTAL_DISTANCE - 600);
      // Avoid placing storms right on top of oases
      const tooCloseToOasis = OASIS_DATA.some(o =>
        Math.abs(y - o.distFrac * TOTAL_DISTANCE) < 120
      );
      if (tooCloseToOasis) continue;
      storms.push({
        x: 100 + Math.random() * 600,
        y,
        radius: 40 + Math.random() * 50,
        angle: Math.random() * Math.PI * 2,
        speed: 0.03 + Math.random() * 0.03,
      });
    }
    return storms;
  }, []);

  const initGameState = useCallback((): GameState => {
    const oases: Oasis[] = OASIS_DATA.map(o => ({
      y: o.distFrac * TOTAL_DISTANCE,
      name: o.name,
      goldToSaltRate: o.goldToSalt,
      saltToGoldRate: o.saltToGold,
      visited: false,
      palmTrees: Array.from({ length: 3 + Math.floor(Math.random() * 3) }, () => ({
        x: -40 + Math.random() * 80,
        size: 0.7 + Math.random() * 0.5,
      })),
    }));

    return {
      phase: 'ready',
      caravanX: 400,
      worldY: 0,
      speed: 0,
      baseSpeed: CARAVAN_BASE_SPEED,
      gold: 10,
      salt: 0,
      water: 100,
      maxWater: 100,
      totalDistance: TOTAL_DISTANCE,
      camels: [
        { x: 0, y: 0, offsetX: 0, offsetY: 0 },
        { x: -6, y: 28, offsetX: -6, offsetY: 28 },
        { x: 4, y: 56, offsetX: 4, offsetY: 56 },
      ],
      oases,
      sandstorms: generateSandstorms(),
      waterDrops: generateWaterDrops(),
      sandParticles: [],
      dunes: generateDunes(),
      steeringLeft: false,
      steeringRight: false,
      frameCount: 0,
      currentOasisIndex: -1,
      slowTimer: 0,
      flashTimer: 0,
    };
  }, [generateDunes, generateWaterDrops, generateSandstorms]);

  // ----------------------------------------
  // DRAWING HELPERS
  // ----------------------------------------

  const drawCamel = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number, y: number, scale: number,
  ) => {
    ctx.save();
    ctx.translate(x, y);
    const s = scale;

    // Body
    ctx.fillStyle = CAMEL_BROWN;
    ctx.beginPath();
    ctx.ellipse(0, 0, 10 * s, 6 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hump
    ctx.fillStyle = CAMEL_DARK;
    ctx.beginPath();
    ctx.ellipse(-2 * s, -6 * s, 5 * s, 4 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = CAMEL_BROWN;
    ctx.beginPath();
    ctx.ellipse(0, -12 * s, 3 * s, 4 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    // Legs
    ctx.strokeStyle = CAMEL_DARK;
    ctx.lineWidth = 2 * s;
    const legPositions = [-5, 5];
    for (const lx of legPositions) {
      ctx.beginPath();
      ctx.moveTo(lx * s, 5 * s);
      ctx.lineTo(lx * s, 12 * s);
      ctx.stroke();
    }

    // Cargo/Gold sack
    ctx.fillStyle = GOLD_COLOR;
    ctx.fillRect(-4 * s, -3 * s, 8 * s, 4 * s);
    ctx.strokeStyle = '#B8860B';
    ctx.lineWidth = 0.8 * s;
    ctx.strokeRect(-4 * s, -3 * s, 8 * s, 4 * s);

    ctx.restore();
  }, []);

  const drawPalmTree = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number, y: number, size: number,
  ) => {
    const s = size;
    // Trunk
    ctx.strokeStyle = PALM_TRUNK;
    ctx.lineWidth = 3 * s;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x + 3 * s, y - 15 * s, x + 1 * s, y - 28 * s);
    ctx.stroke();

    // Fronds
    ctx.fillStyle = PALM_GREEN;
    const topX = x + 1 * s;
    const topY = y - 28 * s;
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      ctx.beginPath();
      ctx.ellipse(
        topX + Math.cos(angle) * 10 * s,
        topY + Math.sin(angle) * 5 * s,
        8 * s, 3 * s,
        angle, 0, Math.PI * 2
      );
      ctx.fill();
    }
  }, []);

  const drawOasis = useCallback((
    ctx: CanvasRenderingContext2D,
    oasis: Oasis,
    screenX: number, screenY: number, w: number,
  ) => {
    // Water pool
    ctx.fillStyle = 'rgba(79, 195, 247, 0.5)';
    ctx.beginPath();
    ctx.ellipse(screenX, screenY, w * 0.12, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    // Green grass around
    ctx.fillStyle = OASIS_GREEN;
    ctx.beginPath();
    ctx.ellipse(screenX, screenY, w * 0.16, 30, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(79, 195, 247, 0.6)';
    ctx.beginPath();
    ctx.ellipse(screenX, screenY, w * 0.10, 16, 0, 0, Math.PI * 2);
    ctx.fill();

    // Palm trees
    for (const tree of oasis.palmTrees) {
      drawPalmTree(ctx, screenX + tree.x, screenY - 15, tree.size);
    }

    // Name label
    ctx.fillStyle = '#FFF8DC';
    ctx.font = `bold ${Math.floor(w * 0.02)}px Georgia, serif`;
    ctx.textAlign = 'center';
    ctx.fillText(oasis.name, screenX, screenY + 38);
  }, [drawPalmTree]);

  const drawSandstorm = useCallback((
    ctx: CanvasRenderingContext2D,
    storm: Sandstorm,
    screenX: number, screenY: number, frame: number,
  ) => {
    ctx.save();
    ctx.translate(screenX, screenY);
    ctx.rotate(storm.angle + frame * storm.speed);

    // Swirling sand
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 + frame * 0.02;
      const dist = storm.radius * (0.3 + 0.5 * (i / 5));
      ctx.fillStyle = `rgba(139, 115, 85, ${0.3 - i * 0.04})`;
      ctx.beginPath();
      ctx.arc(Math.cos(a) * dist, Math.sin(a) * dist, storm.radius * 0.35, 0, Math.PI * 2);
      ctx.fill();
    }

    // Central dark area
    ctx.fillStyle = 'rgba(101, 80, 50, 0.4)';
    ctx.beginPath();
    ctx.arc(0, 0, storm.radius * 0.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }, []);

  const drawDesertBackground = useCallback((
    ctx: CanvasRenderingContext2D,
    w: number, h: number, _worldY: number,
  ) => {
    // Base sand
    ctx.fillStyle = SAND_BG;
    ctx.fillRect(0, 0, w, h);
  }, []);

  const drawDunes = useCallback((
    ctx: CanvasRenderingContext2D,
    dunes: Dune[], w: number, h: number, worldY: number,
  ) => {
    for (const dune of dunes) {
      const screenY = h - (dune.y - worldY);
      if (screenY < -dune.ry * 2 || screenY > h + dune.ry * 2) continue;
      const screenX = dune.x * (w / 800);
      ctx.fillStyle = dune.color;
      ctx.beginPath();
      ctx.ellipse(screenX, screenY, dune.rx * (w / 800), dune.ry, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  const drawHUD = useCallback((
    ctx: CanvasRenderingContext2D,
    state: GameState, w: number, _h: number,
  ) => {
    const panelW = Math.min(220, w * 0.3);
    const panelH = 100;
    const px = 8;
    const py = 8;
    const fs = Math.floor(Math.max(11, w * 0.018));

    // Panel background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    ctx.beginPath();
    ctx.roundRect(px, py, panelW, panelH, 8);
    ctx.fill();

    ctx.font = `bold ${fs}px Georgia, serif`;
    ctx.textAlign = 'left';

    // Gold
    ctx.fillStyle = GOLD_COLOR;
    ctx.fillText(`Gold: ${state.gold.toFixed(1)}`, px + 10, py + 20);

    // Salt
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`Salt: ${state.salt.toFixed(1)}`, px + 10, py + 40);

    // Water bar
    ctx.fillStyle = '#AAA';
    ctx.fillText('Water:', px + 10, py + 60);
    const barX = px + 10 + fs * 3.8;
    const barW = panelW - barX + px - 12;
    const barH = 10;
    ctx.fillStyle = '#333';
    ctx.fillRect(barX, py + 51, barW, barH);
    const waterFrac = state.water / state.maxWater;
    ctx.fillStyle = waterFrac > 0.3 ? WATER_BLUE : '#FF4444';
    ctx.fillRect(barX, py + 51, barW * waterFrac, barH);

    // Distance progress bar
    const progBarY = py + 75;
    ctx.fillStyle = '#AAA';
    ctx.fillText('Timbuktu:', px + 10, progBarY + 9);
    const progBarX = px + 10 + fs * 5.5;
    const progBarW = panelW - progBarX + px - 12;
    ctx.fillStyle = '#333';
    ctx.fillRect(progBarX, progBarY, progBarW, barH);
    const distFrac = Math.min(state.worldY / state.totalDistance, 1);
    ctx.fillStyle = GOLD_COLOR;
    ctx.fillRect(progBarX, progBarY, progBarW * distFrac, barH);

    // Caravan marker on progress
    const markerX = progBarX + progBarW * distFrac;
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.arc(markerX, progBarY + barH / 2, 4, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const drawWaterDrop = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number, y: number, frame: number,
  ) => {
    const bob = Math.sin(frame * 0.08) * 3;
    ctx.fillStyle = WATER_BLUE;
    ctx.beginPath();
    ctx.moveTo(x, y - 8 + bob);
    ctx.quadraticCurveTo(x + 6, y + bob, x, y + 6 + bob);
    ctx.quadraticCurveTo(x - 6, y + bob, x, y - 8 + bob);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.beginPath();
    ctx.arc(x - 1.5, y - 2 + bob, 1.8, 0, Math.PI * 2);
    ctx.fill();
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

    state.frameCount++;

    // ---- UPDATE ----
    if (state.phase === 'traveling') {
      // Steering
      if (state.steeringLeft) {
        state.caravanX -= STEER_SPEED * (w / 800);
      }
      if (state.steeringRight) {
        state.caravanX += STEER_SPEED * (w / 800);
      }
      state.caravanX = Math.max(30, Math.min(w - 30, state.caravanX));

      // Speed calculation
      let speed = state.baseSpeed;
      if (state.water <= 0) {
        speed *= LOW_WATER_SPEED_MULT;
      }
      if (state.slowTimer > 0) {
        speed *= 0.4;
        state.slowTimer--;
      }
      state.speed = speed;

      // Move forward
      state.worldY += speed;

      // Drain water
      state.water = Math.max(0, state.water - WATER_DRAIN_RATE);

      // Check water drop collection
      const camelScreenY = h * 0.7;
      for (const drop of state.waterDrops) {
        if (drop.collected) continue;
        const dropScreenY = h - (drop.y - state.worldY);
        const dropScreenX = drop.x * (w / 800);
        const dx = dropScreenX - state.caravanX;
        const dy = dropScreenY - camelScreenY;
        if (Math.abs(dx) < 25 && Math.abs(dy) < 25) {
          drop.collected = true;
          state.water = Math.min(state.maxWater, state.water + 15);
          state.flashTimer = 10;
        }
      }

      // Check sandstorm collision
      for (const storm of state.sandstorms) {
        const stormScreenY = h - (storm.y - state.worldY);
        const stormScreenX = storm.x * (w / 800);
        const dx = stormScreenX - state.caravanX;
        const dy = stormScreenY - camelScreenY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < storm.radius * 0.8) {
          state.slowTimer = Math.max(state.slowTimer, SANDSTORM_SLOW_FRAMES);
        }
      }

      // Check oasis proximity
      for (let i = 0; i < state.oases.length; i++) {
        const oasis = state.oases[i];
        if (oasis.visited) continue;
        const diff = Math.abs(state.worldY - oasis.y);
        if (diff < 30) {
          // Snap to oasis and enter trading
          oasis.visited = true;
          state.currentOasisIndex = i;
          state.phase = 'oasis';
          setPhase('oasis');
          setTradeGold(0);
          setTradeSalt(0);
          break;
        }
      }

      // Check arrival
      if (state.worldY >= state.totalDistance) {
        state.phase = 'arrived';
        setPhase('arrived');
        // Calculate final wealth: gold + salt * final rate (salt is very valuable at Timbuktu)
        const wealth = state.gold + state.salt * 2.0;
        setFinalWealth(Math.round(wealth * 10) / 10);
        if (onComplete) onComplete();
      }

      // Spawn sand particles blowing across screen
      if (state.frameCount % 3 === 0) {
        state.sandParticles.push({
          x: -10,
          y: Math.random() * h,
          vx: 2 + Math.random() * 3,
          vy: -0.5 + Math.random() * 1,
          life: 80 + Math.random() * 40,
          maxLife: 120,
          size: 1 + Math.random() * 2,
          alpha: 0.2 + Math.random() * 0.3,
        });
      }
    }

    // Update sand particles
    state.sandParticles = state.sandParticles
      .map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        life: p.life - 1,
      }))
      .filter(p => p.life > 0 && p.x < w + 20);

    if (state.flashTimer > 0) state.flashTimer--;

    // ---- DRAW ----
    ctx.clearRect(0, 0, w, h);

    // Desert background
    drawDesertBackground(ctx, w, h, state.worldY);

    // Dunes
    drawDunes(ctx, state.dunes, w, h, state.worldY);

    // Water drops
    for (const drop of state.waterDrops) {
      if (drop.collected) continue;
      const screenY = h - (drop.y - state.worldY);
      if (screenY < -20 || screenY > h + 20) continue;
      const screenX = drop.x * (w / 800);
      drawWaterDrop(ctx, screenX, screenY, state.frameCount);
    }

    // Sandstorms
    for (const storm of state.sandstorms) {
      const screenY = h - (storm.y - state.worldY);
      if (screenY < -storm.radius * 2 || screenY > h + storm.radius * 2) continue;
      const screenX = storm.x * (w / 800);
      drawSandstorm(ctx, storm, screenX, screenY, state.frameCount);
    }

    // Oases
    for (const oasis of state.oases) {
      const screenY = h - (oasis.y - state.worldY);
      if (screenY < -80 || screenY > h + 80) continue;
      drawOasis(ctx, oasis, w / 2, screenY, w);
    }

    // Caravan
    const camelScale = Math.min(w, h) / 550;
    const camelBaseY = h * 0.7;
    for (let i = state.camels.length - 1; i >= 0; i--) {
      const camel = state.camels[i];
      const cx = state.caravanX + camel.offsetX * camelScale;
      const cy = camelBaseY + camel.offsetY * camelScale;
      drawCamel(ctx, cx, cy, camelScale);
    }

    // Flash effect for collection
    if (state.flashTimer > 0) {
      ctx.fillStyle = `rgba(79, 195, 247, ${state.flashTimer * 0.03})`;
      ctx.fillRect(0, 0, w, h);
    }

    // Sand particles
    for (const p of state.sandParticles) {
      ctx.globalAlpha = (p.life / p.maxLife) * p.alpha;
      ctx.fillStyle = SAND_BROWN;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }
    ctx.globalAlpha = 1;

    // HUD
    if (state.phase === 'traveling' || state.phase === 'oasis') {
      drawHUD(ctx, state, w, h);
    }

    // Schedule next frame
    animFrameRef.current = requestAnimationFrame(gameLoop);
  }, [
    drawDesertBackground, drawDunes, drawCamel, drawOasis,
    drawSandstorm, drawWaterDrop, drawHUD, onComplete,
  ]);

  // ----------------------------------------
  // START / RESTART
  // ----------------------------------------

  const startJourney = useCallback(() => {
    const state = initGameState();
    state.phase = 'traveling';
    gameStateRef.current = state;
    setPhase('traveling');

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(gameLoop);
  }, [initGameState, gameLoop]);

  const restartJourney = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setPhase('ready');
    setFinalWealth(0);

    const state = initGameState();
    gameStateRef.current = state;

    // Draw initial frame
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawDesertBackground(ctx, canvas.width, canvas.height, 0);
        drawDunes(ctx, state.dunes, canvas.width, canvas.height, 0);
        const camelScale = Math.min(canvas.width, canvas.height) / 550;
        const camelBaseY = canvas.height * 0.7;
        for (let i = state.camels.length - 1; i >= 0; i--) {
          const camel = state.camels[i];
          drawCamel(ctx, canvas.width / 2 + camel.offsetX * camelScale, camelBaseY + camel.offsetY * camelScale, camelScale);
        }
      }
    }
  }, [initGameState, drawDesertBackground, drawDunes, drawCamel]);

  // Trade actions
  const handleBuySalt = useCallback(() => {
    const state = gameStateRef.current;
    if (!state || state.currentOasisIndex < 0) return;
    const oasis = state.oases[state.currentOasisIndex];
    const amount = tradeGold;
    if (amount <= 0 || amount > state.gold) return;
    state.gold -= amount;
    state.salt += amount * oasis.goldToSaltRate;
    setTradeGold(0);
  }, [tradeGold]);

  const handleBuyGold = useCallback(() => {
    const state = gameStateRef.current;
    if (!state || state.currentOasisIndex < 0) return;
    const oasis = state.oases[state.currentOasisIndex];
    const amount = tradeSalt;
    if (amount <= 0 || amount > state.salt) return;
    state.salt -= amount;
    state.gold += amount * oasis.saltToGoldRate;
    setTradeSalt(0);
  }, [tradeSalt]);

  const handleContinueJourney = useCallback(() => {
    const state = gameStateRef.current;
    if (!state) return;
    // Refill some water at oasis
    state.water = Math.min(state.maxWater, state.water + 40);
    state.phase = 'traveling';
    setPhase('traveling');
  }, []);

  // ----------------------------------------
  // INPUT HANDLING
  // ----------------------------------------

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const state = gameStateRef.current;
      if (!state) return;

      if (e.code === 'Space' && state.phase === 'ready') {
        e.preventDefault();
        startJourney();
        return;
      }

      if (state.phase !== 'traveling') return;

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
  }, [startJourney]);

  // Touch handling
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const state = gameStateRef.current;
    if (!state) return;

    if (state.phase === 'ready') {
      startJourney();
      return;
    }
    if (state.phase !== 'traveling') return;

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
  }, [startJourney]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const state = gameStateRef.current;
    if (!state) return;

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
      const h = Math.floor(w * 3 / 4);
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
      drawDesertBackground(ctx, canvas.width, canvas.height, 0);
      drawDunes(ctx, state.dunes, canvas.width, canvas.height, 0);
      const camelScale = Math.min(canvas.width, canvas.height) / 550;
      const camelBaseY = canvas.height * 0.7;
      for (let i = state.camels.length - 1; i >= 0; i--) {
        const camel = state.camels[i];
        drawCamel(ctx, canvas.width / 2 + camel.offsetX * camelScale, camelBaseY + camel.offsetY * camelScale, camelScale);
      }
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

  const currentOasis = gameStateRef.current?.currentOasisIndex != null && gameStateRef.current.currentOasisIndex >= 0
    ? gameStateRef.current.oases[gameStateRef.current.currentOasisIndex]
    : null;

  const buttonStyle: React.CSSProperties = {
    padding: '10px 28px',
    fontSize: 'clamp(14px, 2.2vw, 20px)',
    fontWeight: 'bold',
    fontFamily: '"Georgia", serif',
    color: '#FFF8DC',
    background: 'linear-gradient(180deg, #8B6914 0%, #5C4400 100%)',
    border: '2px solid #FFD700',
    borderRadius: '8px',
    cursor: 'pointer',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
    transition: 'transform 0.1s',
  };

  const tradeButtonStyle: React.CSSProperties = {
    padding: '6px 16px',
    fontSize: 'clamp(12px, 1.8vw, 16px)',
    fontWeight: 'bold',
    fontFamily: '"Georgia", serif',
    color: '#FFF8DC',
    background: 'linear-gradient(180deg, #6B5300 0%, #3E3000 100%)',
    border: '1px solid #FFD700',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'transform 0.1s',
  };

  const inputStyle: React.CSSProperties = {
    width: '60px',
    padding: '4px 8px',
    fontSize: 'clamp(12px, 1.6vw, 16px)',
    fontFamily: '"Georgia", serif',
    background: '#2A1F00',
    color: '#FFD700',
    border: '1px solid #8B6914',
    borderRadius: '4px',
    textAlign: 'center' as const,
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
          border: '3px solid #8B6914',
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
          background: 'rgba(30, 20, 0, 0.6)',
          borderRadius: '8px',
        }}>
          <div style={{
            fontSize: 'clamp(24px, 4vw, 42px)',
            fontWeight: 'bold',
            color: GOLD_COLOR,
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            marginBottom: '8px',
          }}>
            GOLD CARAVAN
          </div>
          <div style={{
            fontSize: 'clamp(12px, 1.8vw, 16px)',
            color: '#F5DEB3',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            marginBottom: '4px',
            textAlign: 'center',
            maxWidth: '80%',
          }}>
            Guide your camel caravan across the Sahara to Timbuktu.
          </div>
          <div style={{
            fontSize: 'clamp(11px, 1.5vw, 14px)',
            color: '#DEB887',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            marginBottom: '4px',
            textAlign: 'center',
            maxWidth: '80%',
          }}>
            Trade gold for salt at southern oases, then sell salt for gold in the north.
          </div>
          <div style={{
            fontSize: 'clamp(10px, 1.3vw, 13px)',
            color: '#B8A88A',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            marginBottom: '4px',
            textAlign: 'center',
            maxWidth: '80%',
          }}>
            Collect water drops to stay fast. Dodge sandstorms!
          </div>
          <div style={{
            fontSize: 'clamp(10px, 1.3vw, 13px)',
            color: '#CD853F',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            marginBottom: '18px',
          }}>
            {isMobile ? 'Tap left/right side to steer' : 'Use Left/Right arrow keys to steer'}
          </div>
          <button
            onClick={startJourney}
            style={buttonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Begin Journey
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

      {/* Oasis trading overlay */}
      {phase === 'oasis' && currentOasis && (
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
          background: 'rgba(20, 40, 10, 0.75)',
          borderRadius: '8px',
        }}>
          <div style={{
            background: 'rgba(30, 20, 0, 0.9)',
            border: '2px solid #8B6914',
            borderRadius: '12px',
            padding: 'clamp(12px, 3vw, 28px)',
            maxWidth: '90%',
            width: 'clamp(280px, 60vw, 420px)',
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: 'clamp(18px, 3vw, 28px)',
              fontWeight: 'bold',
              color: OASIS_GREEN,
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              marginBottom: '6px',
            }}>
              {currentOasis.name}
            </div>
            <div style={{
              fontSize: 'clamp(11px, 1.5vw, 14px)',
              color: '#DEB887',
              marginBottom: '4px',
            }}>
              Water replenished! Time to trade.
            </div>

            {/* Current holdings */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              margin: '10px 0',
              fontSize: 'clamp(13px, 1.8vw, 17px)',
            }}>
              <span style={{ color: GOLD_COLOR }}>Gold: {gameStateRef.current?.gold.toFixed(1)}</span>
              <span style={{ color: '#FFF' }}>Salt: {gameStateRef.current?.salt.toFixed(1)}</span>
            </div>

            {/* Exchange rates */}
            <div style={{
              fontSize: 'clamp(10px, 1.3vw, 13px)',
              color: '#B8A88A',
              marginBottom: '12px',
            }}>
              Rate: 1 Gold = {currentOasis.goldToSaltRate.toFixed(1)} Salt | 1 Salt = {currentOasis.saltToGoldRate.toFixed(2)} Gold
            </div>

            {/* Buy Salt */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '8px',
              flexWrap: 'wrap',
            }}>
              <span style={{ color: GOLD_COLOR, fontSize: 'clamp(11px, 1.4vw, 14px)' }}>
                Spend Gold:
              </span>
              <input
                type="number"
                min={0}
                max={gameStateRef.current?.gold || 0}
                step={0.5}
                value={tradeGold}
                onChange={(e) => setTradeGold(Math.max(0, Math.min(gameStateRef.current?.gold || 0, parseFloat(e.target.value) || 0)))}
                style={inputStyle}
              />
              <button
                onClick={handleBuySalt}
                style={tradeButtonStyle}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                Buy Salt
              </button>
              <button
                onClick={() => { setTradeGold(gameStateRef.current?.gold || 0); }}
                style={{ ...tradeButtonStyle, padding: '6px 10px', fontSize: 'clamp(10px, 1.2vw, 12px)' }}
              >
                All
              </button>
            </div>

            {/* Buy Gold */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '16px',
              flexWrap: 'wrap',
            }}>
              <span style={{ color: '#FFF', fontSize: 'clamp(11px, 1.4vw, 14px)' }}>
                Spend Salt:
              </span>
              <input
                type="number"
                min={0}
                max={gameStateRef.current?.salt || 0}
                step={0.5}
                value={tradeSalt}
                onChange={(e) => setTradeSalt(Math.max(0, Math.min(gameStateRef.current?.salt || 0, parseFloat(e.target.value) || 0)))}
                style={inputStyle}
              />
              <button
                onClick={handleBuyGold}
                style={tradeButtonStyle}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                Buy Gold
              </button>
              <button
                onClick={() => { setTradeSalt(gameStateRef.current?.salt || 0); }}
                style={{ ...tradeButtonStyle, padding: '6px 10px', fontSize: 'clamp(10px, 1.2vw, 12px)' }}
              >
                All
              </button>
            </div>

            <button
              onClick={handleContinueJourney}
              style={buttonStyle}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Continue Journey
            </button>
          </div>
        </div>
      )}

      {/* Arrived overlay */}
      {phase === 'arrived' && (
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
          background: 'radial-gradient(ellipse at center, rgba(139, 105, 20, 0.7) 0%, rgba(0, 0, 0, 0.8) 100%)',
          borderRadius: '8px',
        }}>
          <div style={{
            fontSize: 'clamp(28px, 4.5vw, 48px)',
            fontWeight: 'bold',
            color: GOLD_COLOR,
            textShadow: '0 0 20px rgba(255, 215, 0, 0.6), 2px 2px 4px rgba(0,0,0,0.8)',
            marginBottom: '8px',
            letterSpacing: '3px',
            animation: 'caravan-bounce 0.6s ease-out',
          }}>
            TIMBUKTU!
          </div>
          <div style={{
            fontSize: 'clamp(14px, 2vw, 20px)',
            color: '#F5DEB3',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            marginBottom: '6px',
          }}>
            Your caravan has arrived at the great city!
          </div>
          <div style={{
            fontSize: 'clamp(12px, 1.6vw, 16px)',
            color: '#DEB887',
            marginBottom: '4px',
          }}>
            Gold: {gameStateRef.current?.gold.toFixed(1)} | Salt: {gameStateRef.current?.salt.toFixed(1)}
          </div>
          <div style={{
            fontSize: 'clamp(20px, 3.5vw, 36px)',
            fontWeight: 'bold',
            color: GOLD_COLOR,
            textShadow: '0 0 10px rgba(255, 215, 0, 0.4)',
            marginBottom: '6px',
          }}>
            Total Wealth: {finalWealth}
          </div>
          <div style={{
            fontSize: 'clamp(11px, 1.4vw, 14px)',
            color: '#B8A88A',
            marginBottom: '20px',
          }}>
            {finalWealth >= 40 ? 'A legendary merchant! The Mansa himself is impressed!'
              : finalWealth >= 25 ? 'A prosperous journey! Your name is known across Mali.'
              : finalWealth >= 15 ? 'A decent trade route. You covered your costs well.'
              : 'A humble journey. Better trading next time!'}
          </div>
          <button
            onClick={restartJourney}
            style={buttonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Journey Again
          </button>
        </div>
      )}

      {/* Traveling HUD hint */}
      {phase === 'traveling' && (
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
        @keyframes caravan-bounce {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default GoldCaravan;
