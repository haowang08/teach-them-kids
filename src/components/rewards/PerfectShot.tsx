import React, { useRef, useEffect, useCallback, useState } from 'react';

// ============================================
// TYPES
// ============================================

interface PerfectShotProps {
  onComplete?: () => void;
}

type Sport = 'basketball' | 'soccer' | 'golf';
type SpinType = 'backspin' | 'none' | 'topspin';
type GamePhase = 'aiming' | 'flying' | 'result';

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  spin: number; // -1 to 1 for Magnus effect
  rotation: number; // visual rotation
}

interface Target {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'hoop' | 'goal' | 'hole';
}

interface Round {
  sport: Sport;
  distance: number; // base distance multiplier
  targetHeight: number; // 0-1 relative position
  wind: number; // wind effect (-1 to 1)
  description: string;
}

interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
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

// ============================================
// CONSTANTS
// ============================================

const GRAVITY = 0.4;
const AIR_RESISTANCE = 0.995;
const MAGNUS_COEFFICIENT = 0.015;

const SPORTS_CONFIG: Record<Sport, {
  name: string;
  emoji: string;
  ballColor: string;
  ballAccent: string;
  targetColor: string;
  bgGradient: string[];
  groundColor: string;
  hitRadius: number;
}> = {
  basketball: {
    name: 'Basketball',
    emoji: '🏀',
    ballColor: '#FF6B35',
    ballAccent: '#8B3E1F',
    targetColor: '#E85D04',
    bgGradient: ['#87CEEB', '#E0F0FF'],
    groundColor: '#8B6914',
    hitRadius: 20,
  },
  soccer: {
    name: 'Soccer',
    emoji: '⚽',
    ballColor: '#FFFFFF',
    ballAccent: '#1A1A1A',
    targetColor: '#FFFFFF',
    bgGradient: ['#87CEEB', '#C8E6C9'],
    groundColor: '#2E7D32',
    hitRadius: 30,
  },
  golf: {
    name: 'Golf',
    emoji: '⛳',
    ballColor: '#FFFFFF',
    ballAccent: '#CCCCCC',
    targetColor: '#FF4444',
    bgGradient: ['#87CEEB', '#90EE90'],
    groundColor: '#228B22',
    hitRadius: 15,
  },
};

const ROUNDS: Round[] = [
  { sport: 'basketball', distance: 0.8, targetHeight: 0.4, wind: 0, description: 'Free throw shot - find the perfect arc!' },
  { sport: 'soccer', distance: 0.7, targetHeight: 0.6, wind: 0, description: 'Penalty kick - aim for the corner!' },
  { sport: 'golf', distance: 0.9, targetHeight: 0.85, wind: 0.3, description: 'Chip shot - land it on the green!' },
  { sport: 'basketball', distance: 1.0, targetHeight: 0.35, wind: 0.2, description: 'Three-pointer - adjust for distance!' },
  { sport: 'soccer', distance: 1.1, targetHeight: 0.5, wind: -0.3, description: 'Free kick with wind - curve it in!' },
  { sport: 'golf', distance: 1.2, targetHeight: 0.9, wind: 0.5, description: 'Long drive - power and precision!' },
];

// ============================================
// COMPONENT
// ============================================

const PerfectShot: React.FC<PerfectShotProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);

  const [canvasSize, setCanvasSize] = useState({ width: 700, height: 450 });
  const [angle, setAngle] = useState(45);
  const [power, setPower] = useState(50);
  const [spin, setSpin] = useState<SpinType>('none');
  const [phase, setPhase] = useState<GamePhase>('aiming');
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [roundResult, setRoundResult] = useState<'hit' | 'miss' | null>(null);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showPreview, setShowPreview] = useState(true);

  const ballRef = useRef<Ball | null>(null);
  const targetRef = useRef<Target | null>(null);

  // ----------------------------------------
  // HELPERS
  // ----------------------------------------

  const getSpinValue = useCallback((spinType: SpinType): number => {
    switch (spinType) {
      case 'backspin': return -0.8;
      case 'topspin': return 0.8;
      default: return 0;
    }
  }, []);

  const getCurrentRoundConfig = useCallback((): Round => {
    return ROUNDS[currentRound % ROUNDS.length];
  }, [currentRound]);

  const calculateTarget = useCallback((w: number, h: number): Target => {
    const round = getCurrentRoundConfig();
    const groundY = h * 0.85;

    const baseX = w * 0.75 * round.distance;
    const baseY = groundY - (groundY * 0.3 * (1 - round.targetHeight));

    let width = 40;
    let height = 40;

    if (round.sport === 'basketball') {
      width = 50;
      height = 10;
    } else if (round.sport === 'soccer') {
      width = 80;
      height = 60;
    } else if (round.sport === 'golf') {
      width = 30;
      height = 30;
    }

    return {
      x: Math.min(baseX, w - 60),
      y: Math.min(baseY, groundY - height),
      width,
      height,
      type: round.sport === 'basketball' ? 'hoop' : round.sport === 'soccer' ? 'goal' : 'hole',
    };
  }, [getCurrentRoundConfig]);

  const calculateInitialVelocity = useCallback((angleD: number, powerP: number) => {
    const angleRad = (angleD * Math.PI) / 180;
    const velocityMag = (powerP / 100) * 18 + 5;
    return {
      vx: Math.cos(angleRad) * velocityMag,
      vy: -Math.sin(angleRad) * velocityMag,
    };
  }, []);

  // ----------------------------------------
  // TRAJECTORY PREVIEW
  // ----------------------------------------

  const calculateTrajectoryPreview = useCallback((w: number, h: number): { x: number; y: number }[] => {
    const groundY = h * 0.85;
    const startX = 60;
    const startY = groundY - 20;
    const round = getCurrentRoundConfig();

    const { vx, vy } = calculateInitialVelocity(angle, power);
    const spinValue = getSpinValue(spin);

    const points: { x: number; y: number }[] = [];
    let x = startX;
    let y = startY;
    let velX = vx;
    let velY = vy;

    for (let i = 0; i < 80; i++) {
      points.push({ x, y });

      // Apply physics
      velY += GRAVITY;
      velX += round.wind * 0.02;
      velX += spinValue * MAGNUS_COEFFICIENT * velY;
      velY -= spinValue * MAGNUS_COEFFICIENT * velX * 0.3;
      velX *= AIR_RESISTANCE;
      velY *= AIR_RESISTANCE;

      x += velX;
      y += velY;

      if (y >= groundY || x > w || x < 0) break;
    }

    return points;
  }, [angle, power, spin, getCurrentRoundConfig, calculateInitialVelocity, getSpinValue]);

  // ----------------------------------------
  // SHOOTING
  // ----------------------------------------

  const shoot = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = canvas.width;
    const h = canvas.height;
    const groundY = h * 0.85;

    const { vx, vy } = calculateInitialVelocity(angle, power);

    ballRef.current = {
      x: 60,
      y: groundY - 20,
      vx,
      vy,
      spin: getSpinValue(spin),
      rotation: 0,
    };

    targetRef.current = calculateTarget(w, h);
    setTrail([]);
    setPhase('flying');
    setRoundResult(null);
  }, [angle, power, spin, calculateInitialVelocity, getSpinValue, calculateTarget]);

  // ----------------------------------------
  // DRAWING
  // ----------------------------------------

  const drawBall = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    rotation: number,
    config: typeof SPORTS_CONFIG[Sport],
    sport: Sport,
    radius: number = 15
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    // Ball base
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = config.ballColor;
    ctx.fill();
    ctx.strokeStyle = config.ballAccent;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Sport-specific details
    if (sport === 'basketball') {
      ctx.strokeStyle = config.ballAccent;
      ctx.lineWidth = 2;
      // Horizontal line
      ctx.beginPath();
      ctx.moveTo(-radius, 0);
      ctx.lineTo(radius, 0);
      ctx.stroke();
      // Vertical line
      ctx.beginPath();
      ctx.moveTo(0, -radius);
      ctx.lineTo(0, radius);
      ctx.stroke();
      // Curved lines
      ctx.beginPath();
      ctx.arc(-radius * 0.5, 0, radius * 0.7, -Math.PI * 0.5, Math.PI * 0.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(radius * 0.5, 0, radius * 0.7, Math.PI * 0.5, -Math.PI * 0.5);
      ctx.stroke();
    } else if (sport === 'soccer') {
      // Pentagon pattern
      ctx.fillStyle = config.ballAccent;
      for (let i = 0; i < 5; i++) {
        const pAngle = (i * Math.PI * 2) / 5 - Math.PI / 2;
        const px = Math.cos(pAngle) * radius * 0.5;
        const py = Math.sin(pAngle) * radius * 0.5;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (sport === 'golf') {
      // Dimple pattern
      ctx.fillStyle = '#E8E8E8';
      for (let i = 0; i < 8; i++) {
        const dAngle = (i * Math.PI * 2) / 8;
        const dx = Math.cos(dAngle) * radius * 0.55;
        const dy = Math.sin(dAngle) * radius * 0.55;
        ctx.beginPath();
        ctx.arc(dx, dy, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }, []);

  const drawTarget = useCallback((
    ctx: CanvasRenderingContext2D,
    target: Target,
    sport: Sport,
    groundY: number
  ) => {
    const config = SPORTS_CONFIG[sport];

    if (sport === 'basketball') {
      // Backboard
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 2;
      ctx.fillRect(target.x + target.width - 5, target.y - 40, 6, 50);
      ctx.strokeRect(target.x + target.width - 5, target.y - 40, 6, 50);

      // Backboard square
      ctx.strokeStyle = config.targetColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(target.x + target.width - 4, target.y - 25, 4, 20);

      // Pole
      ctx.fillStyle = '#666666';
      ctx.fillRect(target.x + target.width, target.y - 40, 4, groundY - target.y + 40);

      // Rim
      ctx.strokeStyle = config.targetColor;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(target.x, target.y);
      ctx.lineTo(target.x + target.width - 5, target.y);
      ctx.stroke();

      // Net (simple representation)
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const nx = target.x + (i * target.width) / 6;
        ctx.beginPath();
        ctx.moveTo(nx, target.y);
        ctx.lineTo(nx + 5, target.y + 25);
        ctx.stroke();
      }
    } else if (sport === 'soccer') {
      // Goal posts
      ctx.strokeStyle = config.targetColor;
      ctx.lineWidth = 6;
      // Left post
      ctx.beginPath();
      ctx.moveTo(target.x, groundY);
      ctx.lineTo(target.x, target.y);
      ctx.stroke();
      // Right post
      ctx.beginPath();
      ctx.moveTo(target.x + target.width, groundY);
      ctx.lineTo(target.x + target.width, target.y);
      ctx.stroke();
      // Crossbar
      ctx.beginPath();
      ctx.moveTo(target.x, target.y);
      ctx.lineTo(target.x + target.width, target.y);
      ctx.stroke();

      // Net pattern
      ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 8; i++) {
        const nx = target.x + (i * target.width) / 8;
        ctx.beginPath();
        ctx.moveTo(nx, target.y);
        ctx.lineTo(nx + 10, groundY);
        ctx.stroke();
      }
      for (let j = 0; j <= 4; j++) {
        const ny = target.y + (j * (groundY - target.y)) / 4;
        ctx.beginPath();
        ctx.moveTo(target.x, ny);
        ctx.lineTo(target.x + target.width + 10, ny + 5);
        ctx.stroke();
      }
    } else if (sport === 'golf') {
      // Green area
      ctx.fillStyle = '#90EE90';
      ctx.beginPath();
      ctx.ellipse(target.x + target.width / 2, groundY, target.width * 1.5, 15, 0, 0, Math.PI * 2);
      ctx.fill();

      // Hole
      ctx.fillStyle = '#1A1A1A';
      ctx.beginPath();
      ctx.ellipse(target.x + target.width / 2, groundY - 2, 12, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Flag pole
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(target.x + target.width / 2, groundY - 5);
      ctx.lineTo(target.x + target.width / 2, groundY - 60);
      ctx.stroke();

      // Flag
      ctx.fillStyle = config.targetColor;
      ctx.beginPath();
      ctx.moveTo(target.x + target.width / 2, groundY - 60);
      ctx.lineTo(target.x + target.width / 2 + 20, groundY - 50);
      ctx.lineTo(target.x + target.width / 2, groundY - 40);
      ctx.closePath();
      ctx.fill();
    }
  }, []);

  const drawScene = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const round = getCurrentRoundConfig();
    const config = SPORTS_CONFIG[round.sport];
    const groundY = h * 0.85;

    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, groundY);
    skyGrad.addColorStop(0, config.bgGradient[0]);
    skyGrad.addColorStop(1, config.bgGradient[1]);
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, groundY);

    // Ground
    ctx.fillStyle = config.groundColor;
    ctx.fillRect(0, groundY, w, h - groundY);

    // Ground texture lines
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 10; i++) {
      const gx = (i * w) / 10;
      ctx.beginPath();
      ctx.moveTo(gx, groundY);
      ctx.lineTo(gx + 30, h);
      ctx.stroke();
    }

    // Wind indicator
    if (round.wind !== 0) {
      const windX = w - 80;
      const windY = 40;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.roundRect(windX - 35, windY - 20, 70, 40, 8);
      ctx.fill();

      ctx.fillStyle = '#333';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Wind', windX, windY - 5);

      // Wind arrow
      const arrowLen = Math.abs(round.wind) * 25;
      const arrowDir = round.wind > 0 ? 1 : -1;
      ctx.strokeStyle = '#4A90D9';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(windX - arrowLen * arrowDir, windY + 10);
      ctx.lineTo(windX + arrowLen * arrowDir, windY + 10);
      ctx.stroke();

      // Arrow head
      ctx.beginPath();
      ctx.moveTo(windX + arrowLen * arrowDir, windY + 10);
      ctx.lineTo(windX + (arrowLen - 8) * arrowDir, windY + 5);
      ctx.lineTo(windX + (arrowLen - 8) * arrowDir, windY + 15);
      ctx.closePath();
      ctx.fillStyle = '#4A90D9';
      ctx.fill();
    }

    // Player silhouette
    ctx.fillStyle = '#333';
    ctx.beginPath();
    // Body
    ctx.ellipse(40, groundY - 45, 12, 25, 0, 0, Math.PI * 2);
    ctx.fill();
    // Head
    ctx.beginPath();
    ctx.arc(40, groundY - 80, 10, 0, Math.PI * 2);
    ctx.fill();
    // Legs
    ctx.beginPath();
    ctx.moveTo(35, groundY - 25);
    ctx.lineTo(30, groundY);
    ctx.lineTo(35, groundY);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(45, groundY - 25);
    ctx.lineTo(50, groundY);
    ctx.lineTo(45, groundY);
    ctx.closePath();
    ctx.fill();
  }, [getCurrentRoundConfig]);

  const drawTrail = useCallback((ctx: CanvasRenderingContext2D, trailPoints: TrailPoint[]) => {
    const round = getCurrentRoundConfig();
    const config = SPORTS_CONFIG[round.sport];

    for (let i = 1; i < trailPoints.length; i++) {
      const p = trailPoints[i];
      const prev = trailPoints[i - 1];
      ctx.globalAlpha = p.alpha * 0.5;
      ctx.strokeStyle = config.ballColor;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }, [getCurrentRoundConfig]);

  const drawPreview = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const points = calculateTrajectoryPreview(w, h);

    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      if (i === 0) {
        ctx.moveTo(p.x, p.y);
      } else {
        ctx.lineTo(p.x, p.y);
      }
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Dots along the path
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < points.length; i += 5) {
      const p = points[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [calculateTrajectoryPreview]);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, particleList: Particle[]) => {
    for (const p of particleList) {
      ctx.globalAlpha = p.life / p.maxLife;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, []);

  // ----------------------------------------
  // GAME LOOP
  // ----------------------------------------

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const groundY = h * 0.85;
    const round = getCurrentRoundConfig();
    const config = SPORTS_CONFIG[round.sport];
    const target = targetRef.current || calculateTarget(w, h);

    // Clear and draw scene
    ctx.clearRect(0, 0, w, h);
    drawScene(ctx, w, h);

    // Draw target
    drawTarget(ctx, target, round.sport, groundY);

    // Update and draw trail
    if (trail.length > 0) {
      drawTrail(ctx, trail);
    }

    // Draw trajectory preview in aiming phase
    if (phase === 'aiming' && showPreview) {
      drawPreview(ctx, w, h);
    }

    // Update ball physics
    if (phase === 'flying' && ballRef.current) {
      const ball = ballRef.current;

      // Apply physics
      ball.vy += GRAVITY;
      ball.vx += round.wind * 0.02;
      ball.vx += ball.spin * MAGNUS_COEFFICIENT * ball.vy;
      ball.vy -= ball.spin * MAGNUS_COEFFICIENT * ball.vx * 0.3;
      ball.vx *= AIR_RESISTANCE;
      ball.vy *= AIR_RESISTANCE;

      ball.x += ball.vx;
      ball.y += ball.vy;
      ball.rotation += ball.spin * 0.2 + ball.vx * 0.05;

      // Add trail point
      setTrail(prev => {
        const newTrail = [...prev, { x: ball.x, y: ball.y, alpha: 1 }];
        return newTrail.slice(-30).map((p, i, arr) => ({
          ...p,
          alpha: (i + 1) / arr.length,
        }));
      });

      // Check for hit
      let hit = false;
      if (round.sport === 'basketball') {
        // Ball must pass through the hoop from above
        if (
          ball.x >= target.x &&
          ball.x <= target.x + target.width - 5 &&
          ball.y >= target.y - 10 &&
          ball.y <= target.y + 15 &&
          ball.vy > 0
        ) {
          hit = true;
        }
      } else if (round.sport === 'soccer') {
        // Ball must enter the goal area
        if (
          ball.x >= target.x &&
          ball.x <= target.x + target.width &&
          ball.y >= target.y &&
          ball.y <= groundY
        ) {
          hit = true;
        }
      } else if (round.sport === 'golf') {
        // Ball must land near the hole
        const dist = Math.sqrt(
          Math.pow(ball.x - (target.x + target.width / 2), 2) +
          Math.pow(ball.y - groundY, 2)
        );
        if (dist < config.hitRadius && ball.y >= groundY - 10) {
          hit = true;
        }
      }

      if (hit) {
        setPhase('result');
        setRoundResult('hit');
        setScore(prev => prev + 100);

        // Spawn celebration particles
        const celebrationParticles: Particle[] = [];
        const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#9B59B6', '#2ECC71'];
        for (let i = 0; i < 30; i++) {
          celebrationParticles.push({
            x: ball.x,
            y: ball.y,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8 - 3,
            life: 60 + Math.random() * 40,
            maxLife: 100,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: 4 + Math.random() * 4,
          });
        }
        setParticles(celebrationParticles);
        ballRef.current = null;

        // Check completion
        if (currentRound >= ROUNDS.length - 1 && onComplete) {
          setTimeout(onComplete, 1500);
        }
      }

      // Check for miss (out of bounds or hit ground)
      if (ball.y >= groundY || ball.x > w || ball.x < 0) {
        if (!hit) {
          setPhase('result');
          setRoundResult('miss');
          ballRef.current = null;
        }
      }
    }

    // Draw ball
    if (phase === 'aiming') {
      // Draw ball at start position
      drawBall(ctx, 60, groundY - 20, 0, config, round.sport);
    } else if (phase === 'flying' && ballRef.current) {
      drawBall(ctx, ballRef.current.x, ballRef.current.y, ballRef.current.rotation, config, round.sport);
    }

    // Update and draw particles
    if (particles.length > 0) {
      const updatedParticles = particles
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.15,
          life: p.life - 1,
        }))
        .filter(p => p.life > 0);
      setParticles(updatedParticles);
      drawParticles(ctx, updatedParticles);
    }

    // Continue animation
    if (phase === 'flying' || particles.length > 0) {
      animFrameRef.current = requestAnimationFrame(gameLoop);
    }
  }, [
    phase, trail, particles, showPreview, currentRound, onComplete,
    getCurrentRoundConfig, calculateTarget, drawScene, drawTarget,
    drawTrail, drawPreview, drawBall, drawParticles,
  ]);

  // Start game loop when phase changes
  useEffect(() => {
    if (phase === 'flying') {
      animFrameRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [phase, gameLoop]);

  // Initial draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const groundY = h * 0.85;
    const round = getCurrentRoundConfig();
    const config = SPORTS_CONFIG[round.sport];
    const target = calculateTarget(w, h);
    targetRef.current = target;

    drawScene(ctx, w, h);
    drawTarget(ctx, target, round.sport, groundY);
    drawBall(ctx, 60, groundY - 20, 0, config, round.sport);

    if (showPreview && phase === 'aiming') {
      drawPreview(ctx, w, h);
    }
  }, [
    canvasSize, currentRound, angle, power, spin, phase, showPreview,
    getCurrentRoundConfig, calculateTarget, drawScene, drawTarget, drawBall, drawPreview,
  ]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;
      const w = Math.min(container.clientWidth, 700);
      const h = Math.floor(w * 0.65);
      setCanvasSize({ width: w, height: h });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ----------------------------------------
  // HANDLERS
  // ----------------------------------------

  const handleNextRound = useCallback(() => {
    setCurrentRound(prev => prev + 1);
    setPhase('aiming');
    setRoundResult(null);
    setTrail([]);
    setParticles([]);
    setAngle(45);
    setPower(50);
    setSpin('none');
  }, []);

  const handleRetry = useCallback(() => {
    setPhase('aiming');
    setRoundResult(null);
    setTrail([]);
    setParticles([]);
  }, []);

  const handleReset = useCallback(() => {
    setCurrentRound(0);
    setScore(0);
    setPhase('aiming');
    setRoundResult(null);
    setTrail([]);
    setParticles([]);
    setAngle(45);
    setPower(50);
    setSpin('none');
  }, []);

  // ----------------------------------------
  // RENDER
  // ----------------------------------------

  const round = getCurrentRoundConfig();
  const config = SPORTS_CONFIG[round.sport];
  const isLastRound = currentRound >= ROUNDS.length - 1;

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[720px] mx-auto bg-gradient-to-br from-slate-100 to-blue-50 rounded-xl p-4 sm:p-6"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{config.emoji}</span>
          <h2 className="text-xl font-bold text-slate-800">Perfect Shot</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-500 bg-white rounded-full px-3 py-1 border border-slate-200">
            Round {currentRound + 1} / {ROUNDS.length}
          </span>
          <span className="text-sm font-bold text-amber-600 bg-amber-100 rounded-full px-3 py-1 border border-amber-200">
            Score: {score}
          </span>
        </div>
      </div>

      {/* Round description */}
      <p className="text-sm text-slate-600 mb-3">{round.description}</p>

      {/* Canvas */}
      <div className="relative mb-4">
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className="w-full rounded-lg border-2 border-slate-200 shadow-inner"
        />

        {/* Result overlay */}
        {phase === 'result' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
            <div className="text-center">
              {roundResult === 'hit' ? (
                <>
                  <div className="text-5xl mb-2">🎯</div>
                  <div className="text-2xl font-bold text-green-400 mb-1">Perfect Shot!</div>
                  <div className="text-lg text-white">+100 points</div>
                </>
              ) : (
                <>
                  <div className="text-5xl mb-2">❌</div>
                  <div className="text-2xl font-bold text-red-400 mb-1">Missed!</div>
                  <div className="text-lg text-white/80">Try adjusting your angle or power</div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      {phase === 'aiming' && (
        <div className="space-y-4">
          {/* Angle slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-bold text-slate-700">
                Angle: {angle}°
              </label>
              <span className="text-xs text-slate-500">
                {angle < 30 ? 'Low arc' : angle > 60 ? 'High arc' : 'Medium arc'}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Power slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-bold text-slate-700">
                Power: {power}%
              </label>
              <span className="text-xs text-slate-500">
                {power < 35 ? 'Soft' : power > 70 ? 'Strong' : 'Medium'}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={power}
              onChange={(e) => setPower(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          {/* Spin selection */}
          <div>
            <label className="text-sm font-bold text-slate-700 block mb-2">
              Spin:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['backspin', 'none', 'topspin'] as SpinType[]).map((spinType) => (
                <button
                  key={spinType}
                  onClick={() => setSpin(spinType)}
                  className={`py-2 px-3 rounded-lg border-2 font-semibold text-sm transition-all cursor-pointer
                    ${spin === spinType
                      ? 'bg-purple-500 text-white border-purple-500 shadow-md'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300'
                    }`}
                >
                  {spinType === 'backspin' ? '↺ Backspin' : spinType === 'topspin' ? '↻ Topspin' : '○ None'}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {spin === 'backspin'
                ? 'Ball curves upward - good for lofted shots'
                : spin === 'topspin'
                  ? 'Ball curves downward - good for distance'
                  : 'No curve effect'}
            </p>
          </div>

          {/* Preview toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="preview"
              checked={showPreview}
              onChange={(e) => setShowPreview(e.target.checked)}
              className="w-4 h-4 accent-blue-500 cursor-pointer"
            />
            <label htmlFor="preview" className="text-sm text-slate-600 cursor-pointer">
              Show trajectory preview
            </label>
          </div>

          {/* Shoot button */}
          <button
            onClick={shoot}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all cursor-pointer active:scale-98"
          >
            🎯 Shoot!
          </button>
        </div>
      )}

      {/* Result buttons */}
      {phase === 'result' && (
        <div className="flex gap-3 flex-wrap">
          {roundResult === 'miss' && (
            <button
              onClick={handleRetry}
              className="flex-1 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
            >
              🔄 Retry
            </button>
          )}
          {roundResult === 'hit' && !isLastRound && (
            <button
              onClick={handleNextRound}
              className="flex-1 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
            >
              ➡️ Next Round
            </button>
          )}
          {roundResult === 'hit' && isLastRound && (
            <button
              onClick={handleReset}
              className="flex-1 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors cursor-pointer"
            >
              🏆 Play Again (Score: {score})
            </button>
          )}
          <button
            onClick={handleReset}
            className="py-3 px-4 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors cursor-pointer"
          >
            Start Over
          </button>
        </div>
      )}

      {/* Math tip */}
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-800">
          <span className="font-bold">Math in Sports:</span>{' '}
          {round.sport === 'basketball'
            ? 'A 45° angle gives maximum range, but adjusting for the hoop height requires steeper angles!'
            : round.sport === 'soccer'
              ? 'Backspin makes the ball "float" longer - the Magnus effect creates lift!'
              : 'Golf clubs are angled (loft) to control trajectory. A 9-iron has ~45° loft!'}
        </p>
      </div>
    </div>
  );
};

export default PerfectShot;
