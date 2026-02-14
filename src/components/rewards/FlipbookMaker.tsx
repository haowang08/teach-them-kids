import { useState, useRef, useCallback, useEffect } from 'react';

// ============================================
// TYPES
// ============================================

type Tool = 'pencil' | 'eraser';
type GamePhase = 'menu' | 'drawing' | 'playing';

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  color: string;
  width: number;
  isEraser: boolean;
}

interface Frame {
  id: number;
  strokes: Stroke[];
}

interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  frames: Frame[];
}

// ============================================
// CONSTANTS
// ============================================

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;
const MIN_FRAMES = 6;
const MAX_FRAMES = 12;
const DEFAULT_FRAMES = 8;

const COLORS = [
  { name: 'Black', value: '#1a1a1a' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#ec4899' },
];

const BRUSH_SIZES = [
  { name: 'Small', value: 3 },
  { name: 'Medium', value: 6 },
  { name: 'Large', value: 12 },
];

const PLAYBACK_SPEEDS = [
  { name: 'Slow', fps: 4, label: '4 fps' },
  { name: 'Medium', fps: 8, label: '8 fps' },
  { name: 'Fast', fps: 12, label: '12 fps' },
  { name: 'Very Fast', fps: 16, label: '16 fps' },
];

const ANIMATION_TIPS = [
  'Animation works by showing many slightly different pictures very fast!',
  'The first animations were drawn on cave walls - people drew animals with multiple legs to show movement!',
  'Walt Disney made the first full-length animated movie, Snow White, in 1937!',
  'It takes about 24 drawings for just ONE second of smooth animation!',
  'Flipbooks were invented in 1868 and are still used by animators today to plan their work!',
  'The word "animation" comes from the Latin word "anima" which means soul or life!',
  'Stop-motion animation uses real objects that are moved tiny amounts between photos!',
  'Japanese anime artists often draw at 12 frames per second to save time!',
];

// ============================================
// TEMPLATE DATA
// ============================================

function createEmptyFrames(count: number): Frame[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    strokes: [],
  }));
}

// Simple bouncing ball template
function createBouncingBallTemplate(): Frame[] {
  const frames: Frame[] = [];
  const positions = [
    { y: 50, squash: 1 },
    { y: 80, squash: 1 },
    { y: 120, squash: 1 },
    { y: 160, squash: 1 },
    { y: 200, squash: 1 },
    { y: 230, squash: 0.7 },  // squash at bottom
    { y: 200, squash: 1 },
    { y: 160, squash: 1 },
  ];

  positions.forEach((pos, i) => {
    const strokes: Stroke[] = [];
    // Draw a simple circle approximation
    const cx = 200;
    const cy = pos.y;
    const rx = 25;
    const ry = 25 * pos.squash;

    // Create circle with multiple points
    const circlePoints: Point[] = [];
    for (let angle = 0; angle <= Math.PI * 2; angle += 0.2) {
      circlePoints.push({
        x: cx + Math.cos(angle) * rx,
        y: cy + Math.sin(angle) * ry,
      });
    }
    circlePoints.push(circlePoints[0]); // close the circle

    strokes.push({
      points: circlePoints,
      color: '#ef4444',
      width: 4,
      isEraser: false,
    });

    frames.push({ id: i, strokes });
  });

  return frames;
}

// Simple stick figure waving template
function createWavingTemplate(): Frame[] {
  const frames: Frame[] = [];
  const armAngles = [0, 15, 30, 45, 30, 15, 0, -15]; // degrees

  armAngles.forEach((angle, i) => {
    const strokes: Stroke[] = [];
    const cx = 200;
    const headY = 80;

    // Head (circle approximation)
    const headPoints: Point[] = [];
    for (let a = 0; a <= Math.PI * 2; a += 0.3) {
      headPoints.push({
        x: cx + Math.cos(a) * 20,
        y: headY + Math.sin(a) * 20,
      });
    }
    headPoints.push(headPoints[0]);
    strokes.push({ points: headPoints, color: '#1a1a1a', width: 3, isEraser: false });

    // Body
    strokes.push({
      points: [{ x: cx, y: headY + 20 }, { x: cx, y: headY + 80 }],
      color: '#1a1a1a',
      width: 3,
      isEraser: false,
    });

    // Left arm (waving)
    const armRad = (angle * Math.PI) / 180;
    const armEndX = cx - 30 - Math.sin(armRad) * 20;
    const armEndY = headY + 40 - Math.cos(armRad) * 20;
    strokes.push({
      points: [{ x: cx, y: headY + 40 }, { x: cx - 30, y: headY + 40 }, { x: armEndX, y: armEndY }],
      color: '#1a1a1a',
      width: 3,
      isEraser: false,
    });

    // Right arm (static)
    strokes.push({
      points: [{ x: cx, y: headY + 40 }, { x: cx + 40, y: headY + 60 }],
      color: '#1a1a1a',
      width: 3,
      isEraser: false,
    });

    // Legs
    strokes.push({
      points: [{ x: cx, y: headY + 80 }, { x: cx - 25, y: headY + 130 }],
      color: '#1a1a1a',
      width: 3,
      isEraser: false,
    });
    strokes.push({
      points: [{ x: cx, y: headY + 80 }, { x: cx + 25, y: headY + 130 }],
      color: '#1a1a1a',
      width: 3,
      isEraser: false,
    });

    frames.push({ id: i, strokes });
  });

  return frames;
}

// Growing flower template
function createFlowerTemplate(): Frame[] {
  const frames: Frame[] = [];
  const heights = [20, 40, 60, 80, 100, 120, 120, 120];
  const petalSizes = [0, 0, 0, 5, 10, 15, 20, 25];

  heights.forEach((height, i) => {
    const strokes: Stroke[] = [];
    const cx = 200;
    const groundY = 250;

    // Stem
    if (height > 0) {
      strokes.push({
        points: [{ x: cx, y: groundY }, { x: cx, y: groundY - height }],
        color: '#22c55e',
        width: 4,
        isEraser: false,
      });
    }

    // Flower petals
    if (petalSizes[i] > 0) {
      const flowerY = groundY - height;
      const petalSize = petalSizes[i];

      // Center
      const centerPoints: Point[] = [];
      for (let a = 0; a <= Math.PI * 2; a += 0.3) {
        centerPoints.push({
          x: cx + Math.cos(a) * (petalSize * 0.4),
          y: flowerY + Math.sin(a) * (petalSize * 0.4),
        });
      }
      centerPoints.push(centerPoints[0]);
      strokes.push({ points: centerPoints, color: '#eab308', width: 6, isEraser: false });

      // Petals
      for (let p = 0; p < 5; p++) {
        const petalAngle = (p * Math.PI * 2) / 5 - Math.PI / 2;
        const petalPoints: Point[] = [];
        for (let a = 0; a <= Math.PI * 2; a += 0.3) {
          petalPoints.push({
            x: cx + Math.cos(petalAngle) * petalSize + Math.cos(a) * (petalSize * 0.5),
            y: flowerY + Math.sin(petalAngle) * petalSize + Math.sin(a) * (petalSize * 0.4),
          });
        }
        petalPoints.push(petalPoints[0]);
        strokes.push({ points: petalPoints, color: '#ec4899', width: 3, isEraser: false });
      }
    }

    // Ground line
    strokes.push({
      points: [{ x: 100, y: groundY }, { x: 300, y: groundY }],
      color: '#8b5cf6',
      width: 2,
      isEraser: false,
    });

    frames.push({ id: i, strokes });
  });

  return frames;
}

const TEMPLATES: Template[] = [
  {
    id: 'blank',
    name: 'Blank Canvas',
    description: 'Start with empty frames',
    icon: '📄',
    frames: createEmptyFrames(DEFAULT_FRAMES),
  },
  {
    id: 'bouncing-ball',
    name: 'Bouncing Ball',
    description: 'A simple bouncing ball animation',
    icon: '🏀',
    frames: createBouncingBallTemplate(),
  },
  {
    id: 'waving',
    name: 'Waving Figure',
    description: 'A stick figure waving hello',
    icon: '👋',
    frames: createWavingTemplate(),
  },
  {
    id: 'flower',
    name: 'Growing Flower',
    description: 'Watch a flower bloom',
    icon: '🌸',
    frames: createFlowerTemplate(),
  },
];

// ============================================
// HELPERS
// ============================================

function getRandomTip(): string {
  return ANIMATION_TIPS[Math.floor(Math.random() * ANIMATION_TIPS.length)];
}

function drawStroke(
  ctx: CanvasRenderingContext2D,
  stroke: Stroke,
  alpha: number = 1
) {
  if (stroke.points.length < 2) return;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = stroke.width;

  if (stroke.isEraser) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.strokeStyle = 'rgba(0,0,0,1)';
  } else {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = stroke.color;
  }

  ctx.beginPath();
  ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

  for (let i = 1; i < stroke.points.length; i++) {
    ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
  }

  ctx.stroke();
  ctx.restore();
}

function renderFrame(
  ctx: CanvasRenderingContext2D,
  frame: Frame,
  alpha: number = 1
) {
  frame.strokes.forEach((stroke) => {
    drawStroke(ctx, stroke, alpha);
  });
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function FlipbookMaker() {
  const [phase, setPhase] = useState<GamePhase>('menu');
  const [frames, setFrames] = useState<Frame[]>(createEmptyFrames(DEFAULT_FRAMES));
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [selectedTool, setSelectedTool] = useState<Tool>('pencil');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [brushSize, setBrushSize] = useState(BRUSH_SIZES[1]);
  const [playbackSpeed, setPlaybackSpeed] = useState(PLAYBACK_SPEEDS[1]);
  const [onionSkinning, setOnionSkinning] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tip, setTip] = useState(getRandomTip());

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playIntervalRef = useRef<number | null>(null);

  // Redraw canvas when frame changes or stroke is added
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw onion skin (previous frame) if enabled and not playing
    if (onionSkinning && !isPlaying && currentFrameIndex > 0) {
      const prevFrame = frames[currentFrameIndex - 1];
      if (prevFrame) {
        renderFrame(ctx, prevFrame, 0.25);
      }
    }

    // Draw current frame
    const currentFrame = frames[currentFrameIndex];
    if (currentFrame) {
      renderFrame(ctx, currentFrame, 1);
    }

    // Draw current stroke being drawn
    if (currentStroke) {
      drawStroke(ctx, currentStroke, 1);
    }
  }, [frames, currentFrameIndex, onionSkinning, isPlaying, currentStroke]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // Animation playback
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = 1000 / playbackSpeed.fps;
      playIntervalRef.current = window.setInterval(() => {
        setCurrentFrameIndex((prev) => (prev + 1) % frames.length);
      }, intervalMs);
    } else {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
        playIntervalRef.current = null;
      }
    }

    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    };
  }, [isPlaying, playbackSpeed.fps, frames.length]);

  // Drawing handlers
  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement>): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPlaying) return;

    const point = getCanvasCoordinates(e);
    if (!point) return;

    setIsDrawing(true);
    setCurrentStroke({
      points: [point],
      color: selectedColor.value,
      width: brushSize.value,
      isEraser: selectedTool === 'eraser',
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStroke || isPlaying) return;

    const point = getCanvasCoordinates(e);
    if (!point) return;

    setCurrentStroke((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        points: [...prev.points, point],
      };
    });
  };

  const handleMouseUp = () => {
    if (!isDrawing || !currentStroke) return;

    // Add stroke to current frame using functional update
    setFrames((prevFrames) => {
      const newFrames = [...prevFrames];
      const frameToUpdate = { ...newFrames[currentFrameIndex] };
      frameToUpdate.strokes = [...frameToUpdate.strokes, currentStroke];
      newFrames[currentFrameIndex] = frameToUpdate;
      return newFrames;
    });

    setIsDrawing(false);
    setCurrentStroke(null);
  };

  const handleMouseLeave = () => {
    if (isDrawing && currentStroke) {
      handleMouseUp();
    }
  };

  // Frame management
  const addFrame = () => {
    if (frames.length >= MAX_FRAMES) return;

    setFrames((prev) => [
      ...prev,
      { id: prev.length, strokes: [] },
    ]);
  };

  const removeFrame = () => {
    if (frames.length <= MIN_FRAMES) return;

    setFrames((prev) => {
      const newFrames = prev.slice(0, -1);
      return newFrames;
    });

    setCurrentFrameIndex((prev) => Math.min(prev, frames.length - 2));
  };

  const clearCurrentFrame = () => {
    setFrames((prevFrames) => {
      const newFrames = [...prevFrames];
      newFrames[currentFrameIndex] = {
        ...newFrames[currentFrameIndex],
        strokes: [],
      };
      return newFrames;
    });
  };

  const copyPreviousFrame = () => {
    if (currentFrameIndex === 0) return;

    setFrames((prevFrames) => {
      const newFrames = [...prevFrames];
      const prevFrameStrokes = prevFrames[currentFrameIndex - 1].strokes;
      newFrames[currentFrameIndex] = {
        ...newFrames[currentFrameIndex],
        strokes: [...prevFrameStrokes],
      };
      return newFrames;
    });
  };

  // Template selection
  const selectTemplate = (template: Template) => {
    // Deep copy the template frames to avoid mutation
    const newFrames = template.frames.map((frame, index) => ({
      id: index,
      strokes: frame.strokes.map((stroke) => ({
        ...stroke,
        points: stroke.points.map((p) => ({ ...p })),
      })),
    }));

    setFrames(newFrames);
    setCurrentFrameIndex(0);
    setPhase('drawing');
    setTip(getRandomTip());
  };

  // Playback controls
  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const goToFrame = (index: number) => {
    setIsPlaying(false);
    setCurrentFrameIndex(index);
  };

  // ============================================
  // MENU PHASE
  // ============================================
  if (phase === 'menu') {
    return (
      <div className="rounded-xl bg-gradient-to-br from-purple-50 to-indigo-100 p-6 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🎬</div>
          <h2 className="text-2xl font-bold text-indigo-800 mb-2">Flipbook Maker</h2>
          <p className="text-sm text-indigo-600">
            Create your own animations frame by frame!
          </p>
        </div>

        <div className="bg-white/50 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-bold text-indigo-700 mb-1">Did you know?</h3>
          <p className="text-sm text-indigo-600">{tip}</p>
        </div>

        <h3 className="text-lg font-bold text-indigo-800 mb-3">Choose a template:</h3>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => selectTemplate(template)}
              className="bg-white hover:bg-indigo-50 border-2 border-indigo-200 hover:border-indigo-400
                         rounded-xl p-4 text-left transition-all cursor-pointer"
            >
              <div className="text-3xl mb-2">{template.icon}</div>
              <div className="font-bold text-indigo-800 text-sm">{template.name}</div>
              <div className="text-xs text-indigo-600">{template.description}</div>
            </button>
          ))}
        </div>

        <div className="bg-indigo-100 rounded-lg p-4 text-center">
          <p className="text-xs text-indigo-700">
            Animation Nation teaches the magic of motion pictures!
            Draw on each frame, then watch your creation come to life!
          </p>
        </div>
      </div>
    );
  }

  // ============================================
  // DRAWING PHASE
  // ============================================
  return (
    <div className="rounded-xl bg-gradient-to-br from-purple-50 to-indigo-100 p-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎬</span>
          <h2 className="text-lg font-bold text-indigo-800">Flipbook Maker</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPhase('menu')}
            className="px-3 py-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800
                       bg-white hover:bg-indigo-50 border border-indigo-200 rounded-lg cursor-pointer"
          >
            Back to Menu
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Tools Panel */}
        <div className="w-full sm:w-44 space-y-3">
          {/* Drawing Tools */}
          <div className="bg-white rounded-lg p-3 border border-indigo-200">
            <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wide mb-2">
              Tools
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedTool('pencil')}
                className={`flex-1 p-2 rounded-lg border-2 transition-all cursor-pointer text-center
                  ${selectedTool === 'pencil'
                    ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
              >
                <span className="text-lg">✏️</span>
                <div className="text-xs font-semibold">Pencil</div>
              </button>
              <button
                onClick={() => setSelectedTool('eraser')}
                className={`flex-1 p-2 rounded-lg border-2 transition-all cursor-pointer text-center
                  ${selectedTool === 'eraser'
                    ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
              >
                <span className="text-lg">🧽</span>
                <div className="text-xs font-semibold">Eraser</div>
              </button>
            </div>
          </div>

          {/* Colors */}
          <div className="bg-white rounded-lg p-3 border border-indigo-200">
            <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wide mb-2">
              Colors
            </h3>
            <div className="grid grid-cols-4 gap-1.5">
              {COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color)}
                  title={color.name}
                  className={`w-8 h-8 rounded-lg border-2 transition-all cursor-pointer
                    ${selectedColor.value === color.value
                      ? 'border-indigo-600 scale-110 shadow-md'
                      : 'border-gray-200 hover:scale-105'
                    }`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          </div>

          {/* Brush Size */}
          <div className="bg-white rounded-lg p-3 border border-indigo-200">
            <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wide mb-2">
              Brush Size
            </h3>
            <div className="flex gap-2">
              {BRUSH_SIZES.map((size) => (
                <button
                  key={size.value}
                  onClick={() => setBrushSize(size)}
                  className={`flex-1 p-1.5 rounded-lg border-2 transition-all cursor-pointer
                    ${brushSize.value === size.value
                      ? 'bg-indigo-100 border-indigo-500'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <div
                    className="mx-auto rounded-full bg-current"
                    style={{
                      width: size.value * 2,
                      height: size.value * 2,
                      backgroundColor: selectedColor.value,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Frame Actions */}
          <div className="bg-white rounded-lg p-3 border border-indigo-200">
            <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wide mb-2">
              Frame Actions
            </h3>
            <div className="space-y-1.5">
              <button
                onClick={clearCurrentFrame}
                disabled={isPlaying}
                className="w-full px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50
                           hover:bg-red-100 border border-red-200 rounded-lg cursor-pointer
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear Frame
              </button>
              <button
                onClick={copyPreviousFrame}
                disabled={isPlaying || currentFrameIndex === 0}
                className="w-full px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50
                           hover:bg-indigo-100 border border-indigo-200 rounded-lg cursor-pointer
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Copy Previous
              </button>
            </div>
          </div>

          {/* Onion Skinning Toggle */}
          <div className="bg-white rounded-lg p-3 border border-indigo-200">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onionSkinning}
                onChange={(e) => setOnionSkinning(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span className="text-xs font-semibold text-indigo-700">
                Onion Skinning
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-1">
              See the previous frame faintly
            </p>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 min-w-0">
          {/* Canvas */}
          <div className="bg-white border-2 border-indigo-300 rounded-xl p-2 shadow-inner mb-3">
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              className="w-full rounded-lg cursor-crosshair"
              style={{
                maxHeight: '300px',
                aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}`,
              }}
            />
          </div>

          {/* Frame indicator */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-indigo-700">
              Frame {currentFrameIndex + 1} of {frames.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={removeFrame}
                disabled={frames.length <= MIN_FRAMES || isPlaying}
                className="px-2 py-1 text-xs font-semibold text-gray-600 bg-gray-100
                           hover:bg-gray-200 rounded cursor-pointer
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                - Frame
              </button>
              <button
                onClick={addFrame}
                disabled={frames.length >= MAX_FRAMES || isPlaying}
                className="px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100
                           hover:bg-indigo-200 rounded cursor-pointer
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                + Frame
              </button>
            </div>
          </div>

          {/* Frame Timeline */}
          <div className="bg-white rounded-lg p-3 border border-indigo-200 mb-3">
            <div className="flex gap-1.5 overflow-x-auto pb-2">
              {frames.map((frame, index) => (
                <button
                  key={frame.id}
                  onClick={() => goToFrame(index)}
                  className={`flex-shrink-0 w-12 h-10 rounded border-2 transition-all cursor-pointer
                    ${index === currentFrameIndex
                      ? 'border-indigo-500 bg-indigo-100'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                    }
                    ${isPlaying && index === currentFrameIndex ? 'ring-2 ring-indigo-400' : ''}
                  `}
                >
                  <div className="text-xs font-semibold text-gray-600">{index + 1}</div>
                  {frame.strokes.length > 0 && (
                    <div className="w-2 h-2 mx-auto rounded-full bg-indigo-400 mt-0.5" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Playback Controls */}
          <div className="bg-white rounded-lg p-3 border border-indigo-200">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToFrame(0)}
                  disabled={isPlaying}
                  className="p-2 text-lg hover:bg-gray-100 rounded cursor-pointer
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ⏮️
                </button>
                <button
                  onClick={() => goToFrame(Math.max(0, currentFrameIndex - 1))}
                  disabled={isPlaying}
                  className="p-2 text-lg hover:bg-gray-100 rounded cursor-pointer
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ◀️
                </button>
                <button
                  onClick={togglePlay}
                  className={`p-3 text-2xl rounded-full transition-all cursor-pointer
                    ${isPlaying
                      ? 'bg-red-100 hover:bg-red-200'
                      : 'bg-green-100 hover:bg-green-200'
                    }`}
                >
                  {isPlaying ? '⏹️' : '▶️'}
                </button>
                <button
                  onClick={() => goToFrame(Math.min(frames.length - 1, currentFrameIndex + 1))}
                  disabled={isPlaying}
                  className="p-2 text-lg hover:bg-gray-100 rounded cursor-pointer
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ▶️
                </button>
                <button
                  onClick={() => goToFrame(frames.length - 1)}
                  disabled={isPlaying}
                  className="p-2 text-lg hover:bg-gray-100 rounded cursor-pointer
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ⏭️
                </button>
              </div>

              {/* Speed Control */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-600">Speed:</span>
                <select
                  value={playbackSpeed.fps}
                  onChange={(e) => {
                    const speed = PLAYBACK_SPEEDS.find((s) => s.fps === parseInt(e.target.value));
                    if (speed) setPlaybackSpeed(speed);
                  }}
                  className="text-sm border border-gray-200 rounded px-2 py-1 cursor-pointer"
                >
                  {PLAYBACK_SPEEDS.map((speed) => (
                    <option key={speed.fps} value={speed.fps}>
                      {speed.name} ({speed.label})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tip Section */}
      <div className="mt-4 bg-indigo-100 rounded-lg p-3 flex items-start gap-2">
        <span className="text-lg">💡</span>
        <div>
          <span className="text-xs font-bold text-indigo-700">Animation Tip: </span>
          <span className="text-xs text-indigo-600">{tip}</span>
        </div>
      </div>
    </div>
  );
}
