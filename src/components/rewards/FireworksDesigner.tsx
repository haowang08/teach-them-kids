import React, { useRef, useEffect, useCallback, useState } from 'react';

// ============================================
// TYPES
// ============================================

interface FireworksDesignerProps {
  onComplete?: () => void;
}

type GamePhase = 'ready' | 'mixing' | 'launching' | 'exploding' | 'finale' | 'done';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  trail?: boolean;
}

interface Star {
  x: number;
  y: number;
  size: number;
  phase: number;
  speed: number;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  speed: number;
  active: boolean;
  mix: number[]; // [blue, yellow, red] counts
}

interface FireworkRecord {
  mix: number[];
  x: number;
  score: number;
}

interface GameState {
  phase: GamePhase;
  frameCount: number;
  stars: Star[];
  particles: Particle[];
  currentMix: number[]; // [blue, yellow, red]
  rocket: Rocket | null;
  launches: FireworkRecord[];
  totalScore: number;
  finaleTimer: number;
  finaleRockets: Rocket[];
}

// ============================================
// CONSTANTS
// ============================================

const MAX_LAUNCHES = 5;
const MAX_INGREDIENTS = 5;
const MIN_INGREDIENTS = 3;
const WORKSHOP_HEIGHT_RATIO = 0.28;
const STAR_COUNT = 80;

const INGREDIENT_COLORS = ['#4488FF', '#FFD700', '#FF4444'];
const INGREDIENT_NAMES = ['Saltpeter', 'Sulfur', 'Charcoal'];
const INGREDIENT_BG = ['#224488', '#886600', '#882222'];

const EXPLOSION_PALETTE = [
  '#FFD700', '#FF4500', '#00FF88', '#4488FF', '#FFFFFF',
  '#FF69B4', '#DA70D6', '#00FFFF', '#FF6347', '#7CFC00',
];

// ============================================
// COMPONENT
// ============================================

const FireworksDesigner: React.FC<FireworksDesignerProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const gameStateRef = useRef<GameState | null>(null);
  const [phase, setPhase] = useState<GamePhase>('ready');
  const [isMobile, setIsMobile] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [, setScore] = useState(0);
  const [, setLaunchCount] = useState(0);

  // ----------------------------------------
  // HELPERS
  // ----------------------------------------

  const createStars = useCallback((w: number, h: number): Star[] => {
    const stars: Star[] = [];
    const skyH = h * (1 - WORKSHOP_HEIGHT_RATIO);
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * skyH,
        size: 0.5 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.04,
      });
    }
    return stars;
  }, []);

  const initGameState = useCallback((): GameState => {
    return {
      phase: 'ready',
      frameCount: 0,
      stars: createStars(canvasSize.width, canvasSize.height),
      particles: [],
      currentMix: [0, 0, 0],
      rocket: null,
      launches: [],
      totalScore: 0,
      finaleTimer: 0,
      finaleRockets: [],
    };
  }, [createStars, canvasSize]);

  const getMixTotal = (mix: number[]) => mix[0] + mix[1] + mix[2];

  const calcScore = (mix: number[]): number => {
    const total = getMixTotal(mix);
    if (total < MIN_INGREDIENTS) return 0;
    // Variety bonus: more diverse = higher score
    const nonZero = mix.filter(v => v > 0).length;
    const varietyBonus = nonZero * 15;
    // Size bonus from total
    const sizeBonus = total * 10;
    // Balance bonus: closer to equal = more bonus
    const avg = total / 3;
    const deviation = mix.reduce((s, v) => s + Math.abs(v - avg), 0);
    const balanceBonus = Math.max(0, 30 - deviation * 10);
    return Math.floor(sizeBonus + varietyBonus + balanceBonus + Math.random() * 10);
  };

  const getExplosionPattern = (mix: number[]): string => {
    const maxIdx = mix.indexOf(Math.max(...mix));
    const total = getMixTotal(mix);
    if (total >= 5 && mix[0] >= 2 && mix[1] >= 2) return 'double-ring';
    if (total >= 4 && mix[2] >= 2 && mix[0] >= 1) return 'star';
    if (mix[1] >= 3) return 'cascade';
    if (mix[0] >= 3) return 'spiral';
    if (maxIdx === 2) return 'circle';
    return 'circle';
  };

  // ----------------------------------------
  // EXPLOSION SPAWNERS
  // ----------------------------------------

  const spawnExplosion = useCallback((
    particles: Particle[], x: number, y: number, mix: number[],
  ) => {
    const pattern = getExplosionPattern(mix);
    const radius = 40 + mix[0] * 20;
    const sparkCount = 30 + mix[1] * 15;
    const colorCount = 2 + mix[2] * 2;

    const colors: string[] = [];
    for (let i = 0; i < colorCount; i++) {
      colors.push(EXPLOSION_PALETTE[i % EXPLOSION_PALETTE.length]);
    }

    const spawnParticle = (px: number, py: number, vx: number, vy: number, col: string, life?: number) => {
      particles.push({
        x: px, y: py, vx, vy,
        life: life || (60 + Math.random() * 40),
        maxLife: life || 100,
        color: col,
        size: 2 + Math.random() * 3,
      });
    };

    if (pattern === 'circle') {
      for (let i = 0; i < sparkCount; i++) {
        const angle = (i / sparkCount) * Math.PI * 2 + Math.random() * 0.2;
        const speed = (radius / 30) * (0.6 + Math.random() * 0.8);
        const col = colors[Math.floor(Math.random() * colors.length)];
        spawnParticle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, col);
      }
    } else if (pattern === 'spiral') {
      for (let i = 0; i < sparkCount * 1.5; i++) {
        const t = i / sparkCount;
        const angle = t * Math.PI * 6;
        const r = t * radius / 20;
        const col = colors[Math.floor(Math.random() * colors.length)];
        spawnParticle(x, y, Math.cos(angle) * r, Math.sin(angle) * r, col, 80 + t * 40);
      }
    } else if (pattern === 'double-ring') {
      for (let ring = 0; ring < 2; ring++) {
        const ringR = (ring + 1) * radius / 40;
        const count = sparkCount * (ring + 1) / 2;
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2;
          const col = colors[(ring + i) % colors.length];
          spawnParticle(x, y, Math.cos(angle) * ringR, Math.sin(angle) * ringR, col, 70 + ring * 30);
        }
      }
    } else if (pattern === 'cascade') {
      for (let i = 0; i < sparkCount; i++) {
        const angle = (i / sparkCount) * Math.PI * 2;
        const speed = (radius / 35) * (0.5 + Math.random() * 0.5);
        const col = colors[Math.floor(Math.random() * colors.length)];
        spawnParticle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed - 0.5, col, 100 + Math.random() * 50);
      }
      // Extra trailing sparks
      for (let i = 0; i < 20; i++) {
        const col = '#FFD700';
        spawnParticle(x, y, (Math.random() - 0.5) * 2, Math.random() * 2 + 1, col, 120);
      }
    } else if (pattern === 'star') {
      const points = 5;
      for (let p = 0; p < points; p++) {
        const baseAngle = (p / points) * Math.PI * 2 - Math.PI / 2;
        for (let i = 0; i < sparkCount / points; i++) {
          const spread = (Math.random() - 0.5) * 0.3;
          const speed = (radius / 25) * (0.4 + Math.random() * 0.8);
          const col = colors[Math.floor(Math.random() * colors.length)];
          spawnParticle(x, y,
            Math.cos(baseAngle + spread) * speed,
            Math.sin(baseAngle + spread) * speed, col);
        }
      }
    }

    // Central flash
    for (let i = 0; i < 10; i++) {
      spawnParticle(x, y,
        (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 1.5,
        '#FFFFFF', 15);
    }
  }, []);

  // ----------------------------------------
  // DRAWING
  // ----------------------------------------

  const drawSky = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, _frame: number) => {
    const skyH = h * (1 - WORKSHOP_HEIGHT_RATIO);
    const grad = ctx.createLinearGradient(0, 0, 0, skyH);
    grad.addColorStop(0, '#0a0a2e');
    grad.addColorStop(1, '#1a1a3e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, skyH);
  }, []);

  const drawStars = useCallback((ctx: CanvasRenderingContext2D, stars: Star[], frame: number) => {
    for (const s of stars) {
      const alpha = 0.3 + 0.7 * Math.abs(Math.sin(s.phase + frame * s.speed));
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, []);

  const drawWorkshop = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, state: GameState) => {
    const workshopY = h * (1 - WORKSHOP_HEIGHT_RATIO);
    const workshopH = h * WORKSHOP_HEIGHT_RATIO;

    // Wood background
    const grad = ctx.createLinearGradient(0, workshopY, 0, h);
    grad.addColorStop(0, '#5C3A1E');
    grad.addColorStop(0.3, '#6B4226');
    grad.addColorStop(1, '#4A2E14');
    ctx.fillStyle = grad;
    ctx.fillRect(0, workshopY, w, workshopH);

    // Top border with Chinese red/gold
    ctx.fillStyle = '#CC0000';
    ctx.fillRect(0, workshopY, w, 4);
    ctx.fillStyle = '#DAA520';
    ctx.fillRect(0, workshopY + 4, w, 2);

    // Ingredient buttons
    const btnSize = Math.min(w * 0.12, 60);
    const btnY = workshopY + workshopH * 0.3;
    const startX = w * 0.1;
    const spacing = Math.min(w * 0.18, 90);
    const mixTotal = getMixTotal(state.currentMix);
    const canAdd = state.phase === 'mixing' && mixTotal < MAX_INGREDIENTS;

    for (let i = 0; i < 3; i++) {
      const bx = startX + i * spacing;
      // Button circle
      ctx.beginPath();
      ctx.arc(bx, btnY, btnSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = canAdd ? INGREDIENT_BG[i] : '#333333';
      ctx.fill();
      ctx.strokeStyle = INGREDIENT_COLORS[i];
      ctx.lineWidth = 3;
      ctx.stroke();

      // Count badge
      if (state.currentMix[i] > 0) {
        ctx.beginPath();
        ctx.arc(bx + btnSize / 2 - 4, btnY - btnSize / 2 + 4, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#CC0000';
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `bold ${Math.floor(12 * w / 800)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(state.currentMix[i]), bx + btnSize / 2 - 4, btnY - btnSize / 2 + 4);
      }

      // Label
      ctx.fillStyle = INGREDIENT_COLORS[i];
      ctx.font = `bold ${Math.floor(11 * w / 800)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(INGREDIENT_NAMES[i], bx, btnY + btnSize / 2 + 4);
    }

    // Mixing bowl
    const bowlX = w * 0.6;
    const bowlY = btnY;
    const bowlW = btnSize * 1.4;
    const bowlH = btnSize * 0.9;

    // Bowl shape
    ctx.beginPath();
    ctx.ellipse(bowlX, bowlY + bowlH * 0.2, bowlW / 2, bowlH / 2, 0, 0, Math.PI);
    ctx.fillStyle = '#3A3A3A';
    ctx.fill();
    ctx.strokeStyle = '#888888';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Fill level
    if (mixTotal > 0) {
      const fillRatio = mixTotal / MAX_INGREDIENTS;
      const fillH = bowlH * 0.4 * fillRatio;
      const mixColor = `rgb(${Math.floor(100 + state.currentMix[2] * 30)}, ${Math.floor(80 + state.currentMix[1] * 30)}, ${Math.floor(100 + state.currentMix[0] * 30)})`;
      ctx.beginPath();
      ctx.ellipse(bowlX, bowlY + bowlH * 0.2, (bowlW / 2) * fillRatio * 0.8, fillH, 0, 0, Math.PI);
      ctx.fillStyle = mixColor;
      ctx.fill();
    }

    // Bowl label
    ctx.fillStyle = '#DAA520';
    ctx.font = `bold ${Math.floor(12 * w / 800)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(`Mix: ${mixTotal}/${MAX_INGREDIENTS}`, bowlX, bowlY + bowlH * 0.2 + bowlH / 2 + 8);

    // Launch button
    const canLaunch = state.phase === 'mixing' && mixTotal >= MIN_INGREDIENTS;
    const launchBtnX = w * 0.83;
    const launchBtnY = btnY;
    const launchBtnW = Math.min(w * 0.14, 80);
    const launchBtnH = btnSize * 0.8;

    ctx.beginPath();
    ctx.roundRect(launchBtnX - launchBtnW / 2, launchBtnY - launchBtnH / 2, launchBtnW, launchBtnH, 8);
    ctx.fillStyle = canLaunch
      ? 'linear-gradient(#CC0000, #880000)' // fallback below
      : '#444444';
    // Canvas doesn't support CSS gradient in fillStyle, so:
    if (canLaunch) {
      const btnGrad = ctx.createLinearGradient(0, launchBtnY - launchBtnH / 2, 0, launchBtnY + launchBtnH / 2);
      btnGrad.addColorStop(0, '#CC0000');
      btnGrad.addColorStop(1, '#880000');
      ctx.fillStyle = btnGrad;
    }
    ctx.fill();
    ctx.strokeStyle = '#DAA520';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = canLaunch ? '#FFD700' : '#666666';
    ctx.font = `bold ${Math.floor(14 * w / 800)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Launch!', launchBtnX, launchBtnY);

    // Score display
    ctx.fillStyle = '#DAA520';
    ctx.font = `bold ${Math.floor(14 * w / 800)}px sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Show Score: ${state.totalScore}`, 10, workshopY + 12);

    ctx.textAlign = 'right';
    ctx.fillText(`Fireworks: ${state.launches.length}/${MAX_LAUNCHES}`, w - 10, workshopY + 12);
  }, []);

  const drawRocket = useCallback((ctx: CanvasRenderingContext2D, rocket: Rocket, frame: number) => {
    if (!rocket.active) return;

    // Rocket body
    ctx.fillStyle = '#CC0000';
    ctx.beginPath();
    ctx.moveTo(rocket.x, rocket.y - 10);
    ctx.lineTo(rocket.x - 4, rocket.y + 6);
    ctx.lineTo(rocket.x + 4, rocket.y + 6);
    ctx.closePath();
    ctx.fill();

    // Stick
    ctx.strokeStyle = '#8B6914';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(rocket.x, rocket.y + 6);
    ctx.lineTo(rocket.x, rocket.y + 20);
    ctx.stroke();

    // Flame
    const flicker = Math.sin(frame * 0.5) * 3;
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.moveTo(rocket.x - 3, rocket.y + 20);
    ctx.lineTo(rocket.x + 3, rocket.y + 20);
    ctx.lineTo(rocket.x + flicker * 0.3, rocket.y + 28 + flicker);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#FF6600';
    ctx.beginPath();
    ctx.moveTo(rocket.x - 2, rocket.y + 20);
    ctx.lineTo(rocket.x + 2, rocket.y + 20);
    ctx.lineTo(rocket.x, rocket.y + 24 + flicker * 0.5);
    ctx.closePath();
    ctx.fill();
  }, []);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    for (const p of particles) {
      const alpha = Math.max(0, p.life / p.maxLife);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
      ctx.fill();
      // Glow effect for brighter particles
      if (p.size > 2) {
        ctx.globalAlpha = alpha * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha * 2, 0, Math.PI * 2);
        ctx.fill();
      }
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

    state.frameCount++;

    // ---- UPDATE ----

    // Update rocket
    if (state.phase === 'launching' && state.rocket && state.rocket.active) {
      state.rocket.y -= state.rocket.speed;
      // Spawn trail particles
      if (state.frameCount % 2 === 0) {
        state.particles.push({
          x: state.rocket.x + (Math.random() - 0.5) * 4,
          y: state.rocket.y + 20,
          vx: (Math.random() - 0.5) * 0.5,
          vy: Math.random() * 1.5 + 0.5,
          life: 25,
          maxLife: 25,
          color: Math.random() > 0.5 ? '#FFD700' : '#FF6600',
          size: 2 + Math.random() * 2,
          trail: true,
        });
      }
      // Reached target
      if (state.rocket.y <= state.rocket.targetY) {
        state.rocket.active = false;
        state.phase = 'exploding';
        setPhase('exploding');
        spawnExplosion(state.particles, state.rocket.x, state.rocket.y, state.rocket.mix);
        const score = calcScore(state.rocket.mix);
        state.launches.push({
          mix: [...state.rocket.mix],
          x: state.rocket.x,
          score,
        });
        state.totalScore += score;
        setScore(state.totalScore);
        setLaunchCount(state.launches.length);
      }
    }

    // After explosion settles
    if (state.phase === 'exploding') {
      const hasExplosionParticles = state.particles.some(p => !p.trail && p.life > 0);
      if (!hasExplosionParticles) {
        if (state.launches.length >= MAX_LAUNCHES) {
          state.phase = 'finale';
          setPhase('finale');
          state.finaleTimer = 0;
        } else {
          state.phase = 'mixing';
          setPhase('mixing');
          state.currentMix = [0, 0, 0];
          state.rocket = null;
        }
      }
    }

    // Finale: replay all fireworks rapidly
    if (state.phase === 'finale') {
      state.finaleTimer++;
      const interval = 30;
      for (let i = 0; i < state.launches.length; i++) {
        if (state.finaleTimer === i * interval + 1) {
          const rec = state.launches[i];
          const fx = w * 0.15 + (i / (MAX_LAUNCHES - 1)) * w * 0.7;
          const fy = h * 0.15 + Math.random() * h * 0.25;
          spawnExplosion(state.particles, fx, fy, rec.mix);
        }
      }
      if (state.finaleTimer > (state.launches.length) * interval + 80) {
        // All done, check if no particles remain
        if (state.particles.length < 5) {
          state.phase = 'done';
          setPhase('done');
          if (onComplete) onComplete();
        }
      }
    }

    // Update particles
    state.particles = state.particles
      .map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        vy: p.vy + 0.03,
        vx: p.vx * 0.98,
        life: p.life - 1,
      }))
      .filter(p => p.life > 0);

    // ---- DRAW ----
    ctx.clearRect(0, 0, w, h);

    drawSky(ctx, w, h, state.frameCount);
    drawStars(ctx, state.stars, state.frameCount);

    // Draw particles (behind workshop)
    drawParticles(ctx, state.particles);

    // Draw rocket
    if (state.rocket && state.rocket.active) {
      drawRocket(ctx, state.rocket, state.frameCount);
    }

    // Draw workshop area
    drawWorkshop(ctx, w, h, state);

    // Finale text
    if (state.phase === 'finale') {
      ctx.save();
      const pulse = 1 + Math.sin(state.frameCount * 0.08) * 0.05;
      ctx.font = `bold ${Math.floor(28 * pulse * w / 800)}px sans-serif`;
      ctx.fillStyle = '#FFD700';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = '#FFD700';
      ctx.shadowBlur = 15;
      ctx.fillText('GRAND FINALE!', w / 2, h * 0.08);
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    // Schedule next frame
    animFrameRef.current = requestAnimationFrame(gameLoop);
  }, [
    drawSky, drawStars, drawParticles, drawRocket, drawWorkshop,
    spawnExplosion, onComplete,
  ]);

  // ----------------------------------------
  // INPUT HANDLING
  // ----------------------------------------

  const getClickTarget = useCallback((
    cx: number, cy: number, w: number, h: number, _state: GameState,
  ): { type: 'ingredient'; index: number } | { type: 'launch' } | null => {
    const workshopY = h * (1 - WORKSHOP_HEIGHT_RATIO);
    const workshopH = h * WORKSHOP_HEIGHT_RATIO;
    const btnSize = Math.min(w * 0.12, 60);
    const btnY = workshopY + workshopH * 0.3;
    const startX = w * 0.1;
    const spacing = Math.min(w * 0.18, 90);

    // Check ingredient buttons
    for (let i = 0; i < 3; i++) {
      const bx = startX + i * spacing;
      const dx = cx - bx;
      const dy = cy - btnY;
      if (dx * dx + dy * dy < (btnSize / 2 + 8) * (btnSize / 2 + 8)) {
        return { type: 'ingredient', index: i };
      }
    }

    // Check launch button
    const launchBtnX = w * 0.83;
    const launchBtnY = btnY;
    const launchBtnW = Math.min(w * 0.14, 80);
    const launchBtnH = btnSize * 0.8;
    if (
      cx >= launchBtnX - launchBtnW / 2 - 8 &&
      cx <= launchBtnX + launchBtnW / 2 + 8 &&
      cy >= launchBtnY - launchBtnH / 2 - 8 &&
      cy <= launchBtnY + launchBtnH / 2 + 8
    ) {
      return { type: 'launch' };
    }

    return null;
  }, []);

  const handleInteraction = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const state = gameStateRef.current;
    if (!canvas || !state) return;
    if (state.phase !== 'mixing') return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const cx = (clientX - rect.left) * scaleX;
    const cy = (clientY - rect.top) * scaleY;

    const target = getClickTarget(cx, cy, canvas.width, canvas.height, state);
    if (!target) return;

    if (target.type === 'ingredient') {
      const mixTotal = getMixTotal(state.currentMix);
      if (mixTotal < MAX_INGREDIENTS) {
        state.currentMix[target.index]++;
      }
    } else if (target.type === 'launch') {
      const mixTotal = getMixTotal(state.currentMix);
      if (mixTotal >= MIN_INGREDIENTS) {
        // Launch!
        const w = canvas.width;
        const h = canvas.height;
        const skyH = h * (1 - WORKSHOP_HEIGHT_RATIO);
        state.rocket = {
          x: w / 2 + (Math.random() - 0.5) * w * 0.3,
          y: skyH,
          targetY: skyH * 0.15 + Math.random() * skyH * 0.25,
          speed: 4 + Math.random() * 2,
          active: true,
          mix: [...state.currentMix],
        };
        state.phase = 'launching';
        setPhase('launching');
      }
    }
  }, [getClickTarget]);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    handleInteraction(e.clientX, e.clientY);
  }, [handleInteraction]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const state = gameStateRef.current;
    if (!state) return;

    if (state.phase === 'ready') {
      // Start the game via touch
      return;
    }

    if (e.touches.length > 0) {
      handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [handleInteraction]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const state = gameStateRef.current;
      if (!state) return;

      if (e.code === 'Space' && state.phase === 'ready') {
        e.preventDefault();
        startGame();
        return;
      }

      if (state.phase !== 'mixing') return;

      const mixTotal = getMixTotal(state.currentMix);
      if (e.code === 'Digit1' || e.code === 'Numpad1') {
        if (mixTotal < MAX_INGREDIENTS) state.currentMix[0]++;
      } else if (e.code === 'Digit2' || e.code === 'Numpad2') {
        if (mixTotal < MAX_INGREDIENTS) state.currentMix[1]++;
      } else if (e.code === 'Digit3' || e.code === 'Numpad3') {
        if (mixTotal < MAX_INGREDIENTS) state.currentMix[2]++;
      } else if (e.code === 'Enter') {
        if (mixTotal >= MIN_INGREDIENTS) {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const w = canvas.width;
          const h = canvas.height;
          const skyH = h * (1 - WORKSHOP_HEIGHT_RATIO);
          state.rocket = {
            x: w / 2 + (Math.random() - 0.5) * w * 0.3,
            y: skyH,
            targetY: skyH * 0.15 + Math.random() * skyH * 0.25,
            speed: 4 + Math.random() * 2,
            active: true,
            mix: [...state.currentMix],
          };
          state.phase = 'launching';
          setPhase('launching');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------
  // START / RESTART
  // ----------------------------------------

  const startGame = useCallback(() => {
    const state = gameStateRef.current;
    if (!state) return;
    state.phase = 'mixing';
    state.currentMix = [0, 0, 0];
    state.launches = [];
    state.totalScore = 0;
    state.particles = [];
    state.rocket = null;
    setPhase('mixing');
    setScore(0);
    setLaunchCount(0);

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(gameLoop);
  }, [gameLoop]);

  const restartGame = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const state = initGameState();
    state.phase = 'mixing';
    gameStateRef.current = state;
    setPhase('mixing');
    setScore(0);
    setLaunchCount(0);

    animFrameRef.current = requestAnimationFrame(gameLoop);
  }, [initGameState, gameLoop]);

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
      drawSky(ctx, canvas.width, canvas.height, 0);
      drawStars(ctx, state.stars, 0);
      drawWorkshop(ctx, canvas.width, canvas.height, state);
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
        onClick={handleCanvasClick}
        onTouchStart={handleTouchStart}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          borderRadius: '8px',
          border: '3px solid #DAA520',
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
          background: 'rgba(10, 10, 46, 0.85)',
          borderRadius: '8px',
        }}>
          <div style={{
            fontSize: 'clamp(24px, 4vw, 42px)',
            fontWeight: 'bold',
            color: '#FFD700',
            textShadow: '0 0 20px rgba(255, 215, 0, 0.5), 2px 2px 4px rgba(0,0,0,0.8)',
            marginBottom: '8px',
          }}>
            FIREWORKS DESIGNER
          </div>
          <div style={{
            fontSize: 'clamp(12px, 1.8vw, 16px)',
            color: '#F5DEB3',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            marginBottom: '4px',
            textAlign: 'center',
            maxWidth: '80%',
          }}>
            Mix ancient Chinese ingredients to create spectacular fireworks!
          </div>
          <div style={{
            fontSize: 'clamp(11px, 1.4vw, 14px)',
            color: '#B8A88A',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            marginBottom: '4px',
            textAlign: 'center',
            maxWidth: '80%',
          }}>
            Saltpeter (blue) = bigger blasts | Sulfur (yellow) = more sparks | Charcoal (red) = more colors
          </div>
          <div style={{
            fontSize: 'clamp(11px, 1.4vw, 14px)',
            color: '#B8A88A',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            marginBottom: '20px',
            textAlign: 'center',
          }}>
            {isMobile
              ? 'Tap ingredients to mix, then tap Launch!'
              : 'Click ingredients or press 1/2/3, then Enter or click Launch!'}
          </div>
          <button
            onClick={startGame}
            style={{
              padding: '12px 32px',
              fontSize: 'clamp(16px, 2.5vw, 22px)',
              fontWeight: 'bold',
              fontFamily: '"Georgia", serif',
              color: '#FFF8DC',
              background: 'linear-gradient(180deg, #CC0000 0%, #880000 100%)',
              border: '2px solid #DAA520',
              borderRadius: '8px',
              cursor: 'pointer',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              transition: 'transform 0.1s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Start Show!
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

      {/* Done overlay */}
      {phase === 'done' && (
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
          background: 'radial-gradient(ellipse at center, rgba(139, 0, 0, 0.7) 0%, rgba(10, 10, 46, 0.9) 100%)',
          borderRadius: '8px',
        }}>
          <div style={{
            fontSize: 'clamp(28px, 4.5vw, 48px)',
            fontWeight: 'bold',
            color: '#FFD700',
            textShadow: '0 0 20px rgba(255, 215, 0, 0.6), 2px 2px 4px rgba(0,0,0,0.8)',
            marginBottom: '8px',
            letterSpacing: '3px',
            animation: 'fireworks-bounce 0.6s ease-out',
          }}>
            MAGNIFICENT SHOW!
          </div>
          <div style={{
            fontSize: 'clamp(18px, 3vw, 30px)',
            color: '#FFD700',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            marginBottom: '4px',
          }}>
            Final Score: {gameStateRef.current?.totalScore || 0}
          </div>
          <div style={{
            fontSize: 'clamp(12px, 1.8vw, 16px)',
            color: '#F5DEB3',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            marginBottom: '20px',
          }}>
            Your fireworks lit up the night sky!
          </div>
          <button
            onClick={restartGame}
            style={{
              padding: '12px 32px',
              fontSize: 'clamp(16px, 2.5vw, 22px)',
              fontWeight: 'bold',
              fontFamily: '"Georgia", serif',
              color: '#FFF8DC',
              background: 'linear-gradient(180deg, #CC0000 0%, #880000 100%)',
              border: '2px solid #DAA520',
              borderRadius: '8px',
              cursor: 'pointer',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              transition: 'transform 0.1s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            New Show
          </button>
        </div>
      )}

      {/* Mixing phase hint */}
      {phase === 'mixing' && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 'clamp(10px, 1.3vw, 13px)',
          color: 'rgba(255, 255, 255, 0.6)',
          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
          pointerEvents: 'none',
        }}>
          {isMobile ? 'Tap ingredients below to mix your firework' : 'Click ingredients or press 1/2/3 to mix'}
        </div>
      )}

      {/* Inject keyframe animation */}
      <style>{`
        @keyframes fireworks-bounce {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default FireworksDesigner;
