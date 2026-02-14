import { useRef, useEffect, useState, useCallback } from 'react';

// ============================================
// TYPES
// ============================================

type FractalType = 'tree' | 'sierpinski' | 'koch' | 'spiral';

interface FractalTab {
  id: FractalType;
  label: string;
  icon: string;
  funFact: string;
  mathRule: string;
  nature: string;
}

interface TreeParams {
  angle: number;
  depth: number;
  ratio: number;
}

interface SierpinskiParams {
  depth: number;
}

interface KochParams {
  depth: number;
}

// No adjustable params for spiral beyond animate

interface DrawCommand {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

// ============================================
// CONSTANTS
// ============================================

const TABS: FractalTab[] = [
  {
    id: 'tree',
    label: 'Fractal Tree',
    icon: '\u{1F333}',
    funFact:
      'Real trees branch this way to maximize sunlight! Oak, maple, and cherry trees all follow fractal branching patterns.',
    mathRule: 'Each branch splits into 2 smaller branches at angle \u03B8, shrinking by a ratio r.',
    nature: 'Trees, ferns, river deltas, lightning bolts, blood vessels',
  },
  {
    id: 'sierpinski',
    label: 'Sierpinski Triangle',
    icon: '\u{1F4D0}',
    funFact:
      'Each triangle contains 3 smaller copies of itself! This pattern appears in Pascal\'s triangle when you color the odd numbers.',
    mathRule: 'Remove the middle triangle, then repeat for each remaining triangle.',
    nature: 'Romanesco broccoli, mountain ranges, crystal growth',
  },
  {
    id: 'koch',
    label: 'Koch Snowflake',
    icon: '\u{2744}\u{FE0F}',
    funFact:
      'The perimeter is infinite but the area is finite! Each step makes the border 4/3 times longer, forever.',
    mathRule: 'Replace the middle third of each line segment with a triangular bump.',
    nature: 'Snowflakes, coastlines, frost patterns on windows',
  },
  {
    id: 'spiral',
    label: 'Golden Spiral',
    icon: '\u{1F41A}',
    funFact:
      'This spiral appears in sunflowers, nautilus shells, hurricanes, and even galaxies! The golden ratio \u03C6 \u2248 1.618 is everywhere.',
    mathRule:
      'Subdivide a golden rectangle (ratio \u03C6) and draw quarter-circle arcs in each square.',
    nature: 'Sunflower seeds, nautilus shells, hurricanes, galaxies, pinecones',
  },
];

const DEPTH_COLORS = [
  'hsl(0, 85%, 60%)',
  'hsl(30, 85%, 55%)',
  'hsl(60, 85%, 50%)',
  'hsl(120, 70%, 45%)',
  'hsl(180, 70%, 50%)',
  'hsl(220, 75%, 55%)',
  'hsl(270, 70%, 60%)',
  'hsl(310, 70%, 55%)',
  'hsl(340, 80%, 55%)',
  'hsl(20, 90%, 50%)',
];

function depthColor(d: number): string {
  return DEPTH_COLORS[d % DEPTH_COLORS.length];
}

// ============================================
// FRACTAL DRAWING HELPERS
// ============================================

function buildTreeCommands(
  params: TreeParams,
  canvasW: number,
  canvasH: number
): DrawCommand[] {
  const commands: DrawCommand[] = [];
  const startX = canvasW / 2;
  const startY = canvasH - 20;
  const trunkLen = Math.min(canvasH * 0.28, 140);
  const angleRad = (params.angle * Math.PI) / 180;

  // Iterative stack-based tree drawing
  interface BranchItem {
    x: number;
    y: number;
    len: number;
    angle: number;
    depth: number;
  }

  const stack: BranchItem[] = [
    { x: startX, y: startY, len: trunkLen, angle: -Math.PI / 2, depth: 0 },
  ];

  while (stack.length > 0) {
    const item = stack.pop()!;
    const endX = item.x + Math.cos(item.angle) * item.len;
    const endY = item.y + Math.sin(item.angle) * item.len;

    const isLeaf = item.depth >= params.depth;
    const thickness = Math.max(1, (params.depth - item.depth) * 1.5);

    if (isLeaf) {
      // Draw leaf
      commands.push({
        type: 'leaf',
        data: { x: endX, y: endY, depth: item.depth },
      });
    }

    // Trunk/branch color: brown gradient
    const brown = item.depth <= 1 ? '#6B4226' : '#8B6914';
    commands.push({
      type: 'line',
      data: {
        x1: item.x,
        y1: item.y,
        x2: endX,
        y2: endY,
        color: isLeaf ? '#2D8B2D' : brown,
        width: thickness,
        depth: item.depth,
      },
    });

    if (!isLeaf) {
      const newLen = item.len * params.ratio;
      stack.push({
        x: endX,
        y: endY,
        len: newLen,
        angle: item.angle - angleRad,
        depth: item.depth + 1,
      });
      stack.push({
        x: endX,
        y: endY,
        len: newLen,
        angle: item.angle + angleRad,
        depth: item.depth + 1,
      });
    }
  }

  return commands;
}

function buildSierpinskiCommands(
  params: SierpinskiParams,
  canvasW: number,
  canvasH: number
): DrawCommand[] {
  const commands: DrawCommand[] = [];
  const margin = 30;
  const side = Math.min(canvasW - margin * 2, canvasH - margin * 2);
  const h = (side * Math.sqrt(3)) / 2;
  const cx = canvasW / 2;
  const baseY = canvasH / 2 + h / 2;

  // Three vertices of outer triangle
  const A = { x: cx, y: baseY - h };
  const B = { x: cx - side / 2, y: baseY };
  const C = { x: cx + side / 2, y: baseY };

  interface TriItem {
    ax: number;
    ay: number;
    bx: number;
    by: number;
    cx: number;
    cy: number;
    depth: number;
  }

  const stack: TriItem[] = [
    { ax: A.x, ay: A.y, bx: B.x, by: B.y, cx: C.x, cy: C.y, depth: 0 },
  ];

  while (stack.length > 0) {
    const tri = stack.pop()!;
    if (tri.depth >= params.depth) {
      // Draw filled triangle
      commands.push({
        type: 'triangle',
        data: {
          ax: tri.ax,
          ay: tri.ay,
          bx: tri.bx,
          by: tri.by,
          cx: tri.cx,
          cy: tri.cy,
          color: depthColor(tri.depth),
          depth: tri.depth,
        },
      });
    } else {
      // Subdivide into 3 triangles (skip middle)
      const abx = (tri.ax + tri.bx) / 2;
      const aby = (tri.ay + tri.by) / 2;
      const bcx = (tri.bx + tri.cx) / 2;
      const bcy = (tri.by + tri.cy) / 2;
      const acx = (tri.ax + tri.cx) / 2;
      const acy = (tri.ay + tri.cy) / 2;

      stack.push({
        ax: tri.ax,
        ay: tri.ay,
        bx: abx,
        by: aby,
        cx: acx,
        cy: acy,
        depth: tri.depth + 1,
      });
      stack.push({
        ax: abx,
        ay: aby,
        bx: tri.bx,
        by: tri.by,
        cx: bcx,
        cy: bcy,
        depth: tri.depth + 1,
      });
      stack.push({
        ax: acx,
        ay: acy,
        bx: bcx,
        by: bcy,
        cx: tri.cx,
        cy: tri.cy,
        depth: tri.depth + 1,
      });
    }
  }

  return commands;
}

function buildKochCommands(
  params: KochParams,
  canvasW: number,
  canvasH: number
): DrawCommand[] {
  const commands: DrawCommand[] = [];
  const margin = 40;
  const side = Math.min(canvasW - margin * 2, (canvasH - margin * 2) / 0.9);
  const h = (side * Math.sqrt(3)) / 2;
  const cx = canvasW / 2;
  const cy = canvasH / 2 + h * 0.15;

  // Equilateral triangle vertices (pointing up)
  const vertices = [
    { x: cx - side / 2, y: cy + h / 3 },
    { x: cx + side / 2, y: cy + h / 3 },
    { x: cx, y: cy - (2 * h) / 3 },
  ];

  // Koch subdivision of a line segment
  function subdivide(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    depth: number
  ): { x: number; y: number }[] {
    if (depth === 0) {
      return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
    }
    const dx = x2 - x1;
    const dy = y2 - y1;
    const ax = x1 + dx / 3;
    const ay = y1 + dy / 3;
    const bx = x1 + (2 * dx) / 3;
    const by = y1 + (2 * dy) / 3;
    // Peak point
    const px = (ax + bx) / 2 - (Math.sqrt(3) / 6) * (y2 - y1);
    const py = (ay + by) / 2 + (Math.sqrt(3) / 6) * (x2 - x1);

    const seg1 = subdivide(x1, y1, ax, ay, depth - 1);
    const seg2 = subdivide(ax, ay, px, py, depth - 1);
    const seg3 = subdivide(px, py, bx, by, depth - 1);
    const seg4 = subdivide(bx, by, x2, y2, depth - 1);

    // Merge, removing duplicate junction points
    return [
      ...seg1,
      ...seg2.slice(1),
      ...seg3.slice(1),
      ...seg4.slice(1),
    ];
  }

  // Build all three sides
  for (let i = 0; i < 3; i++) {
    const v1 = vertices[i];
    const v2 = vertices[(i + 1) % 3];
    const points = subdivide(v1.x, v1.y, v2.x, v2.y, params.depth);

    for (let j = 0; j < points.length - 1; j++) {
      const hue = (220 + (j * 60) / points.length) % 360;
      commands.push({
        type: 'line',
        data: {
          x1: points[j].x,
          y1: points[j].y,
          x2: points[j + 1].x,
          y2: points[j + 1].y,
          color: `hsl(${hue}, 80%, 70%)`,
          width: 2,
          depth: 0,
        },
      });
    }
  }

  return commands;
}

function buildSpiralCommands(
  canvasW: number,
  canvasH: number
): DrawCommand[] {
  const commands: DrawCommand[] = [];
  const phi = (1 + Math.sqrt(5)) / 2; // golden ratio
  const numSteps = 12;

  // Start with a rectangle that fits the canvas
  const maxDim = Math.min(canvasW, canvasH) * 0.85;
  let w = maxDim;
  let h = w / phi;

  // Center it
  let x = (canvasW - w) / 2;
  let y = (canvasH - h) / 2;

  // Draw golden rectangles and spiral arcs
  // Direction cycles: right, down, left, up
  const directions = ['right', 'down', 'left', 'up'] as const;

  // Draw the initial rectangle
  commands.push({
    type: 'rect',
    data: { x, y, w, h, color: 'rgba(255, 215, 0, 0.3)', depth: 0 },
  });

  for (let i = 0; i < numSteps; i++) {
    const dir = directions[i % 4];
    const s = Math.min(w, h);

    let sx = x;
    let sy = y;
    let arcCx = x;
    let arcCy = y;
    let arcStart = 0;

    switch (dir) {
      case 'right':
        sx = x;
        sy = y;
        arcCx = x + s;
        arcCy = y + s;
        arcStart = Math.PI;
        x = x + s;
        w = w - s;
        break;
      case 'down':
        sx = x + w - s;
        sy = y;
        arcCx = x + w - s;
        arcCy = y + s;
        arcStart = -Math.PI / 2;
        y = y + s;
        h = h - s;
        break;
      case 'left':
        sx = x + w - s;
        sy = y + h - s;
        arcCx = x + w - s;
        arcCy = y + h - s;
        arcStart = 0;
        w = w - s;
        break;
      case 'up':
        sx = x;
        sy = y + h - s;
        arcCx = x + s;
        arcCy = y + h - s;
        arcStart = Math.PI / 2;
        h = h - s;
        break;
    }

    const hue = (40 + i * 25) % 360;
    commands.push({
      type: 'square',
      data: {
        x: sx,
        y: sy,
        size: s,
        color: `hsla(${hue}, 70%, 60%, 0.25)`,
        borderColor: `hsl(${hue}, 70%, 50%)`,
        depth: i,
      },
    });

    commands.push({
      type: 'arc',
      data: {
        cx: arcCx,
        cy: arcCy,
        r: s,
        startAngle: arcStart,
        endAngle: arcStart + Math.PI / 2,
        color: `hsl(${hue}, 85%, 65%)`,
        width: Math.max(2, 4 - i * 0.2),
        depth: i,
      },
    });

    if (s < 2) break;
  }

  return commands;
}

// ============================================
// RENDER COMMANDS TO CANVAS
// ============================================

function renderCommands(
  ctx: CanvasRenderingContext2D,
  commands: DrawCommand[],
  upTo?: number
) {
  const count = upTo !== undefined ? Math.min(upTo, commands.length) : commands.length;

  for (let i = 0; i < count; i++) {
    const cmd = commands[i];
    switch (cmd.type) {
      case 'line': {
        const d = cmd.data;
        ctx.strokeStyle = d.color;
        ctx.lineWidth = d.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(d.x1, d.y1);
        ctx.lineTo(d.x2, d.y2);
        ctx.stroke();
        break;
      }
      case 'leaf': {
        const d = cmd.data;
        ctx.fillStyle = `hsl(${100 + Math.random() * 40}, 70%, ${40 + Math.random() * 20}%)`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 3, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case 'triangle': {
        const d = cmd.data;
        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.moveTo(d.ax, d.ay);
        ctx.lineTo(d.bx, d.by);
        ctx.lineTo(d.cx, d.cy);
        ctx.closePath();
        ctx.fill();
        break;
      }
      case 'rect': {
        const d = cmd.data;
        ctx.fillStyle = d.color;
        ctx.fillRect(d.x, d.y, d.w, d.h);
        ctx.strokeStyle = 'rgba(255,215,0,0.5)';
        ctx.lineWidth = 1;
        ctx.strokeRect(d.x, d.y, d.w, d.h);
        break;
      }
      case 'square': {
        const d = cmd.data;
        ctx.fillStyle = d.color;
        ctx.fillRect(d.x, d.y, d.size, d.size);
        ctx.strokeStyle = d.borderColor;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(d.x, d.y, d.size, d.size);
        break;
      }
      case 'arc': {
        const d = cmd.data;
        ctx.strokeStyle = d.color;
        ctx.lineWidth = d.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(d.cx, d.cy, d.r, d.startAngle, d.endAngle);
        ctx.stroke();
        break;
      }
    }
  }
}

// ============================================
// COMPONENT
// ============================================

export default function FractalExplorer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);

  const [activeFractal, setActiveFractal] = useState<FractalType>('tree');
  const [treeParams, setTreeParams] = useState<TreeParams>({
    angle: 30,
    depth: 6,
    ratio: 0.67,
  });
  const [sierpinskiParams, setSierpinskiParams] = useState<SierpinskiParams>({
    depth: 4,
  });
  const [kochParams, setKochParams] = useState<KochParams>({ depth: 3 });

  const [isAnimating, setIsAnimating] = useState(false);
  const [animStep, setAnimStep] = useState(-1); // -1 = show all
  const [canvasSize, setCanvasSize] = useState({ w: 600, h: 450 });

  // Resize handler
  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const w = Math.floor(rect.width);
        const h = Math.min(450, Math.floor(w * 0.7));
        setCanvasSize({ w, h });
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Build commands
  const getCommands = useCallback((): DrawCommand[] => {
    const { w, h } = canvasSize;
    switch (activeFractal) {
      case 'tree':
        return buildTreeCommands(treeParams, w, h);
      case 'sierpinski':
        return buildSierpinskiCommands(sierpinskiParams, w, h);
      case 'koch':
        return buildKochCommands(kochParams, w, h);
      case 'spiral':
        return buildSpiralCommands(w, h);
      default:
        return [];
    }
  }, [activeFractal, treeParams, sierpinskiParams, kochParams, canvasSize]);

  // Draw fractal
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvasSize.w;
    canvas.height = canvasSize.h;

    const commands = getCommands();

    if (!isAnimating || animStep < 0) {
      // Draw all at once
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      renderCommands(ctx, commands);
    }
  }, [getCommands, canvasSize, isAnimating, animStep]);

  // Animation loop
  useEffect(() => {
    if (!isAnimating || animStep < 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const commands = getCommands();
    if (animStep >= commands.length) {
      setIsAnimating(false);
      setAnimStep(-1);
      return;
    }

    // Draw up to animStep
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    renderCommands(ctx, commands, animStep);

    const speed = Math.max(1, Math.ceil(commands.length / 200));
    animFrameRef.current = requestAnimationFrame(() => {
      setAnimStep((s) => s + speed);
    });

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAnimating, animStep, getCommands]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
    setAnimStep(1);
  }, []);

  const stopAnimation = useCallback(() => {
    setIsAnimating(false);
    setAnimStep(-1);
  }, []);

  const activeTab = TABS.find((t) => t.id === activeFractal)!;

  return (
    <div className="rounded-xl bg-gradient-to-br from-gray-900 to-indigo-950 p-4 sm:p-6 text-white max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
          Fractal Explorer
        </h2>
        <p className="text-sm text-gray-300 mt-1">
          Discover how simple math rules create nature's most beautiful patterns
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1.5 mb-4 justify-center">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveFractal(tab.id);
              stopAnimation();
            }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeFractal === tab.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span className="mr-1">{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">
              {tab.label.split(' ').pop()}
            </span>
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div ref={containerRef} className="rounded-lg overflow-hidden mb-4 bg-[#1a1a2e]">
        <canvas
          ref={canvasRef}
          width={canvasSize.w}
          height={canvasSize.h}
          style={{ width: '100%', height: canvasSize.h, display: 'block' }}
        />
      </div>

      {/* Controls */}
      <div className="bg-gray-800/60 rounded-lg p-4 mb-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Tree controls */}
          {activeFractal === 'tree' && (
            <>
              <label className="flex flex-col text-xs text-gray-300 flex-1 min-w-[140px]">
                <span>
                  Branch Angle: <strong className="text-cyan-300">{treeParams.angle}&deg;</strong>
                </span>
                <input
                  type="range"
                  min={15}
                  max={60}
                  step={1}
                  value={treeParams.angle}
                  onChange={(e) =>
                    setTreeParams((p) => ({ ...p, angle: Number(e.target.value) }))
                  }
                  className="mt-1 accent-cyan-400"
                />
              </label>
              <label className="flex flex-col text-xs text-gray-300 flex-1 min-w-[140px]">
                <span>
                  Depth: <strong className="text-cyan-300">{treeParams.depth}</strong>
                </span>
                <input
                  type="range"
                  min={3}
                  max={10}
                  step={1}
                  value={treeParams.depth}
                  onChange={(e) =>
                    setTreeParams((p) => ({ ...p, depth: Number(e.target.value) }))
                  }
                  className="mt-1 accent-cyan-400"
                />
              </label>
              <label className="flex flex-col text-xs text-gray-300 flex-1 min-w-[140px]">
                <span>
                  Branch Ratio:{' '}
                  <strong className="text-cyan-300">{treeParams.ratio.toFixed(2)}</strong>
                </span>
                <input
                  type="range"
                  min={50}
                  max={80}
                  step={1}
                  value={Math.round(treeParams.ratio * 100)}
                  onChange={(e) =>
                    setTreeParams((p) => ({ ...p, ratio: Number(e.target.value) / 100 }))
                  }
                  className="mt-1 accent-cyan-400"
                />
              </label>
            </>
          )}

          {/* Sierpinski controls */}
          {activeFractal === 'sierpinski' && (
            <label className="flex flex-col text-xs text-gray-300 flex-1 min-w-[200px]">
              <span>
                Depth: <strong className="text-cyan-300">{sierpinskiParams.depth}</strong>
              </span>
              <input
                type="range"
                min={1}
                max={7}
                step={1}
                value={sierpinskiParams.depth}
                onChange={(e) =>
                  setSierpinskiParams({ depth: Number(e.target.value) })
                }
                className="mt-1 accent-cyan-400"
              />
            </label>
          )}

          {/* Koch controls */}
          {activeFractal === 'koch' && (
            <label className="flex flex-col text-xs text-gray-300 flex-1 min-w-[200px]">
              <span>
                Depth: <strong className="text-cyan-300">{kochParams.depth}</strong>
              </span>
              <input
                type="range"
                min={0}
                max={5}
                step={1}
                value={kochParams.depth}
                onChange={(e) => setKochParams({ depth: Number(e.target.value) })}
                className="mt-1 accent-cyan-400"
              />
            </label>
          )}

          {/* Spiral has no sliders */}
          {activeFractal === 'spiral' && (
            <p className="text-xs text-gray-400 flex-1">
              The golden ratio <strong className="text-yellow-300">&phi; = 1.618...</strong> creates
              this self-similar spiral. Click Animate to watch it build!
            </p>
          )}

          {/* Animate button */}
          <button
            onClick={isAnimating ? stopAnimation : startAnimation}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              isAnimating
                ? 'bg-red-600 hover:bg-red-500 text-white'
                : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white shadow-lg shadow-emerald-500/20'
            }`}
          >
            {isAnimating ? 'Stop' : 'Animate'}
          </button>
        </div>
      </div>

      {/* Info Panel */}
      <div className="grid sm:grid-cols-2 gap-3">
        {/* Fun Fact */}
        <div className="bg-indigo-900/40 border border-indigo-700/30 rounded-lg p-3">
          <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">
            Fun Fact
          </h4>
          <p className="text-sm text-gray-200 leading-relaxed">{activeTab.funFact}</p>
        </div>

        {/* Math Rule */}
        <div className="bg-purple-900/40 border border-purple-700/30 rounded-lg p-3">
          <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-1">
            The Math Rule
          </h4>
          <p className="text-sm text-gray-200 leading-relaxed">{activeTab.mathRule}</p>
        </div>

        {/* Found in Nature */}
        <div className="sm:col-span-2 bg-emerald-900/30 border border-emerald-700/30 rounded-lg p-3">
          <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">
            Found in Nature
          </h4>
          <p className="text-sm text-gray-200">{activeTab.nature}</p>
        </div>
      </div>
    </div>
  );
}
