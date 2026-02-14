import { useState, useEffect, useRef, useCallback } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  hit: boolean;
  platformIndex: number;
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

interface TrailPoint {
  x: number;
  y: number;
}

interface BallState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: boolean;
  bounced: boolean;
}

interface HitText {
  x: number;
  y: number;
  opacity: number;
  offsetY: number;
}

// ── Constants ──────────────────────────────────────────────────────────────

const GRAVITY = 9.8;
const TIME_SCALE = 2.8;
const MAX_POWER_VELOCITY = 520;
const BALL_RADIUS = 8;
const STAR_RADIUS = 14;
const BOUNCE_ENERGY_LOSS = 0.5;
const BASE_WIDTH = 960;
const BASE_HEIGHT = 540;

// ── Helper: draw a 5-point star ────────────────────────────────────────────

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  color: string,
  glow: boolean,
) {
  ctx.save();
  if (glow) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
  }
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = (Math.PI / 2) * -1 + (i * 2 * Math.PI) / 5;
    const outerX = cx + r * Math.cos(angle);
    const outerY = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(outerX, outerY);
    else ctx.lineTo(outerX, outerY);

    const innerAngle = angle + Math.PI / 5;
    const innerR = r * 0.4;
    ctx.lineTo(cx + innerR * Math.cos(innerAngle), cy + innerR * Math.sin(innerAngle));
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// ── Platform layout (normalised to BASE_WIDTH x BASE_HEIGHT) ───────────────

function createPlatforms(): Platform[] {
  return [
    { x: 300, y: 400, width: 100, height: 14 },
    { x: 440, y: 320, width: 110, height: 14 },
    { x: 600, y: 370, width: 100, height: 14 },
    { x: 720, y: 260, width: 120, height: 14 },
    { x: 830, y: 340, width: 100, height: 14 },
  ];
}

function createStars(platforms: Platform[]): Star[] {
  return platforms.map((p, i) => ({
    x: p.x + p.width / 2,
    y: p.y - STAR_RADIUS - 4,
    radius: STAR_RADIUS,
    hit: false,
    platformIndex: i,
  }));
}

// ── Component ──────────────────────────────────────────────────────────────

export default function GamePhysicsSandbox() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const [angle, setAngle] = useState(45);
  const [power, setPower] = useState(60);
  const [score, setScore] = useState(0);
  const [launched, setLaunched] = useState(false);
  const [celebrateVisible, setCelebrateVisible] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ w: BASE_WIDTH, h: BASE_HEIGHT });

  // Mutable game state refs (avoid re-renders during animation)
  const ballRef = useRef<BallState>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    active: false,
    bounced: false,
  });
  const trailRef = useRef<TrailPoint[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const hitTextsRef = useRef<HitText[]>([]);
  const starsRef = useRef<Star[]>(createStars(createPlatforms()));
  const platformsRef = useRef<Platform[]>(createPlatforms());
  const scoreRef = useRef(0);
  const launchedRef = useRef(false);

  // ── Sizing ───────────────────────────────────────────────────────────────

  const updateSize = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cw = container.clientWidth;
    const ch = Math.round(cw * (9 / 16));
    setCanvasSize({ w: cw, h: ch });
  }, []);

  useEffect(() => {
    updateSize();
    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [updateSize]);

  // ── Launcher geometry ────────────────────────────────────────────────────

  const launcherBaseX = 80;
  const launcherBaseY = BASE_HEIGHT - 60; // ground is at BASE_HEIGHT - 40
  const launcherLength = 60;

  const launcherTipX = launcherBaseX + launcherLength * Math.cos((-angle * Math.PI) / 180);
  const launcherTipY = launcherBaseY + launcherLength * Math.sin((-angle * Math.PI) / 180);

  // ── Launch logic ─────────────────────────────────────────────────────────

  const handleLaunch = useCallback(() => {
    if (launchedRef.current) return;
    const v0 = (power / 100) * MAX_POWER_VELOCITY;
    const rad = (angle * Math.PI) / 180;
    ballRef.current = {
      x: launcherTipX,
      y: launcherTipY,
      vx: v0 * Math.cos(rad),
      vy: -v0 * Math.sin(rad),
      active: true,
      bounced: false,
    };
    trailRef.current = [{ x: launcherTipX, y: launcherTipY }];
    launchedRef.current = true;
    setLaunched(true);
  }, [angle, power, launcherTipX, launcherTipY]);

  // ── Reset logic ──────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    ballRef.current = { x: 0, y: 0, vx: 0, vy: 0, active: false, bounced: false };
    trailRef.current = [];
    particlesRef.current = [];
    hitTextsRef.current = [];
    starsRef.current = createStars(createPlatforms());
    platformsRef.current = createPlatforms();
    scoreRef.current = 0;
    launchedRef.current = false;
    setScore(0);
    setLaunched(false);
    setCelebrateVisible(false);
  }, []);

  // ── Spawn particles ──────────────────────────────────────────────────────

  const spawnParticles = useCallback((cx: number, cy: number) => {
    const colors = ["#FFD700", "#FFA500", "#FF6347", "#FFE066", "#FFF"];
    for (let i = 0; i < 24; i++) {
      const a = Math.random() * Math.PI * 2;
      const speed = 60 + Math.random() * 140;
      particlesRef.current.push({
        x: cx,
        y: cy,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed,
        life: 1,
        maxLife: 0.6 + Math.random() * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2 + Math.random() * 4,
      });
    }
  }, []);

  // ── Main game loop ───────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const groundY = BASE_HEIGHT - 40;

    function tick(timestamp: number) {
      if (!ctx) return;
      const rawDt = lastTimeRef.current === 0 ? 0.016 : (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;
      const dt = Math.min(rawDt, 0.05); // clamp large gaps

      const sX = canvasSize.w / BASE_WIDTH;
      const sY = canvasSize.h / BASE_HEIGHT;

      // ── Update ball ────────────────────────────────────────────────────
      const ball = ballRef.current;
      if (ball.active) {
        ball.vy += GRAVITY * TIME_SCALE * TIME_SCALE * dt * 40;
        ball.x += ball.vx * dt * TIME_SCALE;
        ball.y += ball.vy * dt * TIME_SCALE;

        // trail
        const last = trailRef.current[trailRef.current.length - 1];
        if (!last || Math.hypot(ball.x - last.x, ball.y - last.y) > 6) {
          trailRef.current.push({ x: ball.x, y: ball.y });
        }

        // platform collision
        let onPlatform = false;
        for (const plat of platformsRef.current) {
          if (
            ball.vy > 0 &&
            ball.x >= plat.x &&
            ball.x <= plat.x + plat.width &&
            ball.y + BALL_RADIUS >= plat.y &&
            ball.y + BALL_RADIUS <= plat.y + plat.height + 10
          ) {
            onPlatform = true;
            if (!ball.bounced) {
              ball.y = plat.y - BALL_RADIUS;
              ball.vy = -ball.vy * BOUNCE_ENERGY_LOSS;
              ball.vx = ball.vx * 0.85;
              ball.bounced = true;
            }
          }
        }
        // Reset bounced flag when ball is moving upward or not touching any platform
        if (ball.vy < 0 || !onPlatform) {
          ball.bounced = false;
        }

        // star collision
        for (const star of starsRef.current) {
          if (star.hit) continue;
          const dist = Math.hypot(ball.x - star.x, ball.y - star.y);
          if (dist < BALL_RADIUS + star.radius) {
            star.hit = true;
            scoreRef.current += 1;
            setScore(scoreRef.current);
            spawnParticles(star.x, star.y);
            hitTextsRef.current.push({
              x: star.x,
              y: star.y - 20,
              opacity: 1,
              offsetY: 0,
            });
            if (scoreRef.current >= starsRef.current.length) {
              setCelebrateVisible(true);
            }
          }
        }

        // ground collision / out of bounds
        if (ball.y > groundY) {
          ball.active = false;
        }
        if (ball.x > BASE_WIDTH + 40 || ball.x < -40) {
          ball.active = false;
        }
      }

      // ── Update particles ───────────────────────────────────────────────
      particlesRef.current = particlesRef.current.filter((p) => {
        p.life -= dt / p.maxLife;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 120 * dt;
        return p.life > 0;
      });

      // ── Update hit texts ───────────────────────────────────────────────
      hitTextsRef.current = hitTextsRef.current.filter((h) => {
        h.opacity -= dt * 1.2;
        h.offsetY -= 40 * dt;
        return h.opacity > 0;
      });

      // ── Draw ───────────────────────────────────────────────────────────
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvasSize.w, canvasSize.h);
      ctx.scale(sX, sY);

      // sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, BASE_HEIGHT);
      skyGrad.addColorStop(0, "#4FC3F7");
      skyGrad.addColorStop(0.7, "#B3E5FC");
      skyGrad.addColorStop(1, "#E1F5FE");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, BASE_WIDTH, BASE_HEIGHT);

      // ground
      const groundGrad = ctx.createLinearGradient(0, groundY, 0, BASE_HEIGHT);
      groundGrad.addColorStop(0, "#66BB6A");
      groundGrad.addColorStop(1, "#388E3C");
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, groundY, BASE_WIDTH, BASE_HEIGHT - groundY);

      // ground line
      ctx.strokeStyle = "#43A047";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(BASE_WIDTH, groundY);
      ctx.stroke();

      // platforms
      for (const plat of platformsRef.current) {
        const platGrad = ctx.createLinearGradient(plat.x, plat.y, plat.x, plat.y + plat.height);
        platGrad.addColorStop(0, "#8D6E63");
        platGrad.addColorStop(1, "#5D4037");
        ctx.fillStyle = platGrad;
        ctx.beginPath();
        ctx.roundRect(plat.x, plat.y, plat.width, plat.height, 4);
        ctx.fill();
        // platform shadow
        ctx.fillStyle = "rgba(0,0,0,0.10)";
        ctx.fillRect(plat.x + 4, plat.y + plat.height, plat.width, 4);
      }

      // stars
      for (const star of starsRef.current) {
        if (!star.hit) {
          drawStar(ctx, star.x, star.y, star.radius, "#FFD700", true);
          // inner highlight
          drawStar(ctx, star.x, star.y, star.radius * 0.55, "#FFF176", false);
        }
      }

      // launcher base
      ctx.fillStyle = "#E65100";
      ctx.beginPath();
      ctx.arc(launcherBaseX, launcherBaseY, 18, 0, Math.PI * 2);
      ctx.fill();

      // launcher wheel details
      ctx.fillStyle = "#BF360C";
      ctx.beginPath();
      ctx.arc(launcherBaseX, launcherBaseY, 10, 0, Math.PI * 2);
      ctx.fill();

      // launcher barrel
      ctx.strokeStyle = "#D84315";
      ctx.lineWidth = 14;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(launcherBaseX, launcherBaseY);
      ctx.lineTo(launcherTipX, launcherTipY);
      ctx.stroke();

      // barrel outline
      ctx.strokeStyle = "#BF360C";
      ctx.lineWidth = 16;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.moveTo(launcherBaseX, launcherBaseY);
      ctx.lineTo(launcherTipX, launcherTipY);
      ctx.stroke();
      ctx.globalAlpha = 1;

      // barrel inner
      ctx.strokeStyle = "#FF6D00";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(launcherBaseX, launcherBaseY);
      ctx.lineTo(launcherTipX, launcherTipY);
      ctx.stroke();

      // launcher stand
      ctx.fillStyle = "#5D4037";
      ctx.beginPath();
      ctx.moveTo(launcherBaseX - 22, launcherBaseY + 18);
      ctx.lineTo(launcherBaseX + 22, launcherBaseY + 18);
      ctx.lineTo(launcherBaseX + 16, groundY);
      ctx.lineTo(launcherBaseX - 16, groundY);
      ctx.closePath();
      ctx.fill();

      // trajectory trail
      if (trailRef.current.length > 1) {
        ctx.setLineDash([4, 6]);
        ctx.strokeStyle = "rgba(255,255,255,0.75)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(trailRef.current[0].x, trailRef.current[0].y);
        for (let i = 1; i < trailRef.current.length; i++) {
          ctx.lineTo(trailRef.current[i].x, trailRef.current[i].y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // ball
      if (ball.active) {
        ctx.save();
        ctx.shadowColor = "#7B1FA2";
        ctx.shadowBlur = 10;
        ctx.fillStyle = "#9C27B0";
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        // highlight
        ctx.fillStyle = "rgba(255,255,255,0.45)";
        ctx.beginPath();
        ctx.arc(ball.x - 2, ball.y - 2, BALL_RADIUS * 0.45, 0, Math.PI * 2);
        ctx.fill();
      }

      // particles
      for (const p of particlesRef.current) {
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // hit texts
      for (const h of hitTextsRef.current) {
        ctx.globalAlpha = Math.max(0, h.opacity);
        ctx.fillStyle = "#FF6D00";
        ctx.font = "bold 22px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Hit!", h.x, h.y + h.offsetY);
      }
      ctx.globalAlpha = 1;

      // angle arc indicator
      if (!launchedRef.current) {
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(launcherBaseX, launcherBaseY, 36, 0, (-angle * Math.PI) / 180, true);
        ctx.stroke();
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.font = "bold 13px sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(
          `${angle}\u00B0`,
          launcherBaseX + 40,
          launcherBaseY - 8,
        );
      }

      ctx.restore();

      animFrameRef.current = requestAnimationFrame(tick);
    }

    lastTimeRef.current = 0;
    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [canvasSize, launcherBaseX, launcherBaseY, launcherTipX, launcherTipY, angle, spawnParticles]);

  // ── Derived display values ───────────────────────────────────────────────

  const v0Display = ((power / 100) * MAX_POWER_VELOCITY).toFixed(0);
  const totalStars = 5;

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="rounded-xl bg-slate-900 p-3 sm:p-4 shadow-lg w-full max-w-4xl mx-auto">
      {/* Canvas */}
      <div ref={containerRef} className="w-full relative">
        <canvas
          ref={canvasRef}
          width={canvasSize.w}
          height={canvasSize.h}
          className="rounded-lg w-full block"
          style={{ imageRendering: "auto" }}
        />
        {/* Celebration overlay */}
        {celebrateVisible && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-lg">
            <p className="text-4xl sm:text-5xl font-extrabold text-yellow-300 drop-shadow-lg mb-2 animate-bounce">
              All Stars Hit!
            </p>
            <p className="text-lg sm:text-xl text-white/90 mb-4">
              Amazing job! You mastered projectile motion!
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-yellow-400 text-slate-900 rounded-full font-bold text-lg hover:bg-yellow-300 transition-colors cursor-pointer"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* Physics equation display */}
      <div className="mt-3 bg-slate-800 rounded-lg p-3 text-center">
        <p className="text-xs sm:text-sm text-sky-300 font-mono">
          x = {v0Display} cos({angle}) t &nbsp;&nbsp;|&nbsp;&nbsp; y = {v0Display}{" "}
          sin({angle}) t - 0.5(9.8)t
          <sup>2</sup>
        </p>
      </div>

      {/* Controls panel */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
        {/* Angle slider */}
        <label className="block">
          <span className="text-sm font-semibold text-slate-300">
            Angle: <span className="text-yellow-300">{angle}</span>
          </span>
          <input
            type="range"
            min={10}
            max={80}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            disabled={launched}
            className="w-full mt-1 accent-yellow-400"
          />
          <span className="flex justify-between text-xs text-slate-500">
            <span>10</span>
            <span>80</span>
          </span>
        </label>

        {/* Power slider */}
        <label className="block">
          <span className="text-sm font-semibold text-slate-300">
            Power: <span className="text-orange-300">{power}%</span>
          </span>
          <input
            type="range"
            min={10}
            max={100}
            value={power}
            onChange={(e) => setPower(Number(e.target.value))}
            disabled={launched}
            className="w-full mt-1 accent-orange-400"
          />
          <span className="flex justify-between text-xs text-slate-500">
            <span>10%</span>
            <span>100%</span>
          </span>
        </label>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleLaunch}
            disabled={launched}
            className="px-5 py-2 rounded-lg font-bold text-white bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Launch!
          </button>
          <button
            onClick={handleReset}
            className="px-5 py-2 rounded-lg font-bold text-slate-200 bg-slate-700 hover:bg-slate-600 transition-colors cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Score display */}
      <div className="mt-3 flex items-center justify-between bg-slate-800 rounded-lg px-4 py-2">
        <span className="text-sm font-semibold text-slate-300">
          Score:{" "}
          <span className="text-yellow-300 text-lg">
            {score}/{totalStars}
          </span>{" "}
          stars
        </span>
        <span className="text-xs text-slate-500">
          v&#8320; = {v0Display} &middot; {angle} &middot; g = 9.8
        </span>
      </div>
    </div>
  );
}
