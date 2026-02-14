import { useState, useRef, useEffect, useCallback } from 'react';

// ============================================
// TYPES
// ============================================

type ToolType = 'brush' | 'stamp';
type StampType = 'handprint' | 'bison' | 'deer' | 'horse' | 'hunter' | 'spiral' | 'dots';

interface GalleryItem {
  id: string;
  name: string;
  location: string;
  age: string;
  description: string;
  imageUrl: string;
}

// ============================================
// CONSTANTS
// ============================================

const PREHISTORIC_COLORS = [
  { name: 'Red Ochre', color: '#8B2500', description: 'Made from iron-rich clay' },
  { name: 'Charcoal', color: '#1C1C1C', description: 'From burnt wood' },
  { name: 'White', color: '#E8E4D9', description: 'From limestone or bone' },
  { name: 'Brown Ochre', color: '#704214', description: 'From natural earth' },
  { name: 'Yellow Ochre', color: '#CC7722', description: 'From clay minerals' },
  { name: 'Dark Red', color: '#5C0000', description: 'Heated red ochre' },
];

const BRUSH_SIZES = [
  { size: 4, label: 'Fine' },
  { size: 8, label: 'Small' },
  { size: 16, label: 'Medium' },
  { size: 28, label: 'Large' },
  { size: 44, label: 'Extra Large' },
];

const STAMPS: { type: StampType; label: string; emoji: string }[] = [
  { type: 'handprint', label: 'Handprint', emoji: '🖐️' },
  { type: 'bison', label: 'Bison', emoji: '🦬' },
  { type: 'deer', label: 'Deer', emoji: '🦌' },
  { type: 'horse', label: 'Horse', emoji: '🐴' },
  { type: 'hunter', label: 'Hunter', emoji: '🏹' },
  { type: 'spiral', label: 'Spiral', emoji: '🌀' },
  { type: 'dots', label: 'Dots', emoji: '⚫' },
];

const GALLERY: GalleryItem[] = [
  {
    id: 'lascaux',
    name: 'Lascaux Cave',
    location: 'France',
    age: '17,000 years old',
    description: 'Famous for its realistic animal paintings, including bulls, horses, and deer.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Lascaux_painting.jpg/800px-Lascaux_painting.jpg',
  },
  {
    id: 'altamira',
    name: 'Altamira Cave',
    location: 'Spain',
    age: '36,000 years old',
    description: 'Known as the "Sistine Chapel of Paleolithic Art" for its stunning bison paintings.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Altamira_Bison.jpg/800px-Altamira_Bison.jpg',
  },
  {
    id: 'chauvet',
    name: 'Chauvet Cave',
    location: 'France',
    age: '30,000-32,000 years old',
    description: 'Contains some of the oldest known cave paintings, including lions and rhinos.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Chauvethorses.jpg/800px-Chauvethorses.jpg',
  },
  {
    id: 'cueva',
    name: 'Cueva de las Manos',
    location: 'Argentina',
    age: '9,000-13,000 years old',
    description: 'Famous for its hundreds of stenciled handprints in multiple colors.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/SantaCruz-CuijseDeLasManos-P2210651b.jpg/800px-SantaCruz-CuijseDeLasManos-P2210651b.jpg',
  },
];

// ============================================
// STAMP DRAWING FUNCTIONS
// ============================================

function drawHandprint(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, scale: number = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;

  // Palm
  ctx.beginPath();
  ctx.ellipse(0, 10, 25, 30, 0, 0, Math.PI * 2);
  ctx.fill();

  // Fingers
  const fingerAngles = [-0.4, -0.2, 0, 0.2, 0.5];
  const fingerLengths = [35, 45, 50, 45, 30];
  const fingerWidths = [8, 8, 8, 8, 7];

  fingerAngles.forEach((angle, i) => {
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.ellipse(0, -25 - fingerLengths[i] / 2, fingerWidths[i], fingerLengths[i] / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  ctx.restore();
}

function drawBison(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, scale: number = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';

  // Body - simple prehistoric style
  ctx.beginPath();
  ctx.ellipse(0, 0, 40, 25, 0, 0, Math.PI * 2);
  ctx.fill();

  // Hump
  ctx.beginPath();
  ctx.ellipse(-15, -20, 20, 15, 0, 0, Math.PI * 2);
  ctx.fill();

  // Head
  ctx.beginPath();
  ctx.ellipse(-45, -5, 15, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  // Horns
  ctx.beginPath();
  ctx.moveTo(-50, -15);
  ctx.quadraticCurveTo(-60, -30, -50, -35);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-40, -15);
  ctx.quadraticCurveTo(-35, -30, -45, -35);
  ctx.stroke();

  // Legs
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-20, 20);
  ctx.lineTo(-25, 45);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-5, 20);
  ctx.lineTo(-5, 45);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(15, 20);
  ctx.lineTo(12, 45);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(30, 20);
  ctx.lineTo(35, 45);
  ctx.stroke();

  // Tail
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(40, 0);
  ctx.quadraticCurveTo(55, 10, 50, 25);
  ctx.stroke();

  ctx.restore();
}

function drawDeer(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, scale: number = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';

  // Body
  ctx.beginPath();
  ctx.ellipse(0, 0, 35, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  // Neck
  ctx.beginPath();
  ctx.moveTo(-25, -10);
  ctx.quadraticCurveTo(-40, -25, -35, -40);
  ctx.lineWidth = 10;
  ctx.stroke();

  // Head
  ctx.beginPath();
  ctx.ellipse(-35, -48, 10, 8, -0.3, 0, Math.PI * 2);
  ctx.fill();

  // Antlers
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-38, -55);
  ctx.lineTo(-45, -75);
  ctx.lineTo(-55, -70);
  ctx.moveTo(-45, -75);
  ctx.lineTo(-40, -85);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-32, -55);
  ctx.lineTo(-25, -75);
  ctx.lineTo(-15, -70);
  ctx.moveTo(-25, -75);
  ctx.lineTo(-30, -85);
  ctx.stroke();

  // Legs
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-15, 15);
  ctx.lineTo(-18, 40);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, 15);
  ctx.lineTo(0, 40);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(15, 15);
  ctx.lineTo(12, 40);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(28, 15);
  ctx.lineTo(30, 40);
  ctx.stroke();

  ctx.restore();
}

function drawHorse(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, scale: number = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';

  // Body
  ctx.beginPath();
  ctx.ellipse(0, 0, 40, 20, 0, 0, Math.PI * 2);
  ctx.fill();

  // Neck
  ctx.beginPath();
  ctx.moveTo(-30, -10);
  ctx.quadraticCurveTo(-50, -30, -45, -50);
  ctx.lineWidth = 12;
  ctx.stroke();

  // Head
  ctx.beginPath();
  ctx.ellipse(-45, -60, 12, 8, -0.5, 0, Math.PI * 2);
  ctx.fill();

  // Mane
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-35, -15);
  ctx.quadraticCurveTo(-45, -25, -40, -45);
  ctx.stroke();

  // Ear
  ctx.beginPath();
  ctx.moveTo(-48, -65);
  ctx.lineTo(-52, -75);
  ctx.lineTo(-45, -68);
  ctx.fill();

  // Legs
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-20, 15);
  ctx.lineTo(-25, 45);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-5, 15);
  ctx.lineTo(-5, 45);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(15, 15);
  ctx.lineTo(12, 45);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(30, 15);
  ctx.lineTo(35, 45);
  ctx.stroke();

  // Tail
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(40, 0);
  ctx.quadraticCurveTo(60, 15, 55, 35);
  ctx.stroke();

  ctx.restore();
}

function drawHunter(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, scale: number = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';

  // Head
  ctx.beginPath();
  ctx.arc(0, -40, 10, 0, Math.PI * 2);
  ctx.fill();

  // Body
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, -30);
  ctx.lineTo(0, 10);
  ctx.stroke();

  // Arms holding spear
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, -15);
  ctx.lineTo(-25, -25);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, -15);
  ctx.lineTo(30, -30);
  ctx.stroke();

  // Spear
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-30, -15);
  ctx.lineTo(50, -35);
  ctx.stroke();
  // Spear tip
  ctx.beginPath();
  ctx.moveTo(50, -35);
  ctx.lineTo(60, -38);
  ctx.lineTo(55, -32);
  ctx.closePath();
  ctx.fill();

  // Legs
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 10);
  ctx.lineTo(-15, 40);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, 10);
  ctx.lineTo(15, 40);
  ctx.stroke();

  ctx.restore();
}

function drawSpiral(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, scale: number = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';

  ctx.beginPath();
  for (let i = 0; i < 720; i++) {
    const angle = (i * Math.PI) / 180;
    const radius = 2 + i / 20;
    const px = Math.cos(angle) * radius;
    const py = Math.sin(angle) * radius;
    if (i === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.stroke();

  ctx.restore();
}

function drawDots(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, scale: number = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;

  const positions = [
    [0, 0], [-15, -10], [15, -10], [-20, 10], [20, 10],
    [0, -25], [-10, 20], [10, 20], [-25, 0], [25, 0]
  ];

  positions.forEach(([dx, dy]) => {
    ctx.beginPath();
    ctx.arc(dx, dy, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

function drawStamp(ctx: CanvasRenderingContext2D, type: StampType, x: number, y: number, color: string, scale: number = 1) {
  switch (type) {
    case 'handprint':
      drawHandprint(ctx, x, y, color, scale);
      break;
    case 'bison':
      drawBison(ctx, x, y, color, scale);
      break;
    case 'deer':
      drawDeer(ctx, x, y, color, scale);
      break;
    case 'horse':
      drawHorse(ctx, x, y, color, scale);
      break;
    case 'hunter':
      drawHunter(ctx, x, y, color, scale);
      break;
    case 'spiral':
      drawSpiral(ctx, x, y, color, scale);
      break;
    case 'dots':
      drawDots(ctx, x, y, color, scale);
      break;
  }
}

// ============================================
// CAVE WALL TEXTURE
// ============================================

function drawCaveWallTexture(ctx: CanvasRenderingContext2D, width: number, height: number) {
  // Base rock color
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#8B7355');
  gradient.addColorStop(0.3, '#6B5344');
  gradient.addColorStop(0.6, '#7A6352');
  gradient.addColorStop(1, '#5D4E3C');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add rocky texture with random spots
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 20 + 5;
    const alpha = Math.random() * 0.15 + 0.05;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = Math.random() > 0.5
      ? `rgba(0, 0, 0, ${alpha})`
      : `rgba(139, 115, 85, ${alpha})`;
    ctx.fill();
  }

  // Add some cracks
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 15; i++) {
    const startX = Math.random() * width;
    const startY = Math.random() * height;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    let x = startX;
    let y = startY;
    for (let j = 0; j < 5; j++) {
      x += (Math.random() - 0.5) * 60;
      y += (Math.random() - 0.5) * 60;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Add some lighter spots (mineral deposits)
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 8 + 2;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 180, 160, ${Math.random() * 0.2})`;
    ctx.fill();
  }
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function CavePainter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [canvasSize, setCanvasSize] = useState({ width: 700, height: 450 });
  const [tool, setTool] = useState<ToolType>('brush');
  const [selectedColor, setSelectedColor] = useState(PREHISTORIC_COLORS[0].color);
  const [brushSize, setBrushSize] = useState(BRUSH_SIZES[2].size);
  const [selectedStamp, setSelectedStamp] = useState<StampType>('handprint');
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [savedImage, setSavedImage] = useState<string | null>(null);

  // Initialize canvas with cave wall texture
  const initializeCanvas = useCallback(() => {
    const bgCanvas = backgroundCanvasRef.current;
    const canvas = canvasRef.current;
    if (!bgCanvas || !canvas) return;

    const bgCtx = bgCanvas.getContext('2d');
    const ctx = canvas.getContext('2d');
    if (!bgCtx || !ctx) return;

    bgCanvas.width = canvasSize.width;
    bgCanvas.height = canvasSize.height;
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    // Draw cave wall texture on background canvas
    drawCaveWallTexture(bgCtx, canvasSize.width, canvasSize.height);

    // Clear main canvas (transparent)
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  }, [canvasSize]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;
      const w = Math.min(container.clientWidth - 32, 700);
      const h = Math.floor(w * 0.65);
      setCanvasSize({ width: w, height: h });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize canvas when size changes
  useEffect(() => {
    initializeCanvas();
  }, [initializeCanvas]);

  // Get canvas coordinates from mouse/touch event
  const getCanvasCoords = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX: number, clientY: number;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }, []);

  // Draw brush stroke
  const drawBrushStroke = useCallback((ctx: CanvasRenderingContext2D, from: { x: number; y: number }, to: { x: number; y: number }) => {
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Add texture by using multiple slightly offset strokes
    for (let i = 0; i < 3; i++) {
      const offsetX = (Math.random() - 0.5) * (brushSize / 4);
      const offsetY = (Math.random() - 0.5) * (brushSize / 4);

      ctx.globalAlpha = 0.5 + Math.random() * 0.3;
      ctx.beginPath();
      ctx.moveTo(from.x + offsetX, from.y + offsetY);
      ctx.lineTo(to.x + offsetX, to.y + offsetY);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }, [selectedColor, brushSize]);

  // Handle mouse/touch down
  const handlePointerDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const coords = getCanvasCoords(e);
    if (!coords) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    if (tool === 'stamp') {
      const stampScale = brushSize / 16; // Scale stamp based on brush size
      drawStamp(ctx, selectedStamp, coords.x, coords.y, selectedColor, stampScale);
    } else {
      setIsDrawing(true);
      setLastPos(coords);
    }
  }, [getCanvasCoords, tool, selectedStamp, selectedColor, brushSize]);

  // Handle mouse/touch move
  const handlePointerMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const coords = getCanvasCoords(e);
    if (coords) {
      setCursorPos(coords);
    }

    if (!isDrawing || !lastPos || !coords) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    if (tool === 'brush') {
      drawBrushStroke(ctx, lastPos, coords);
      setLastPos(coords);
    }
  }, [getCanvasCoords, isDrawing, lastPos, tool, drawBrushStroke]);

  // Handle mouse/touch up
  const handlePointerUp = useCallback(() => {
    setIsDrawing(false);
    setLastPos(null);
  }, []);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setCursorPos(null);
    setIsDrawing(false);
    setLastPos(null);
  }, []);

  // Clear canvas
  const handleClear = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  }, [canvasSize]);

  // Save/view creation
  const handleSave = useCallback(() => {
    const bgCanvas = backgroundCanvasRef.current;
    const canvas = canvasRef.current;
    if (!bgCanvas || !canvas) return;

    // Create a combined canvas
    const combinedCanvas = document.createElement('canvas');
    combinedCanvas.width = canvasSize.width;
    combinedCanvas.height = canvasSize.height;
    const ctx = combinedCanvas.getContext('2d');
    if (!ctx) return;

    // Draw background first, then artwork
    ctx.drawImage(bgCanvas, 0, 0);
    ctx.drawImage(canvas, 0, 0);

    const dataUrl = combinedCanvas.toDataURL('image/png');
    setSavedImage(dataUrl);
    setShowSaveModal(true);
  }, [canvasSize]);

  // Download image
  const handleDownload = useCallback(() => {
    if (!savedImage) return;
    const link = document.createElement('a');
    link.download = 'cave-painting.png';
    link.href = savedImage;
    link.click();
  }, [savedImage]);

  return (
    <div className="rounded-xl bg-gradient-to-br from-stone-800 to-stone-900 p-4 sm:p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🦬</span>
          <h2 className="text-xl font-bold text-amber-100">Cave Painter</h2>
        </div>
        <button
          onClick={() => setShowGallery(true)}
          className="text-sm font-semibold text-amber-200 bg-stone-700 hover:bg-stone-600 rounded-lg px-3 py-1.5 transition-colors cursor-pointer"
        >
          View Gallery
        </button>
      </div>

      <p className="text-sm text-stone-300 mb-4">
        Create your own prehistoric cave art using ancient pigments and symbols!
      </p>

      {/* Canvas Container */}
      <div ref={containerRef} className="relative mb-4">
        <div
          className="relative rounded-lg overflow-hidden border-4 border-stone-600 shadow-inner"
          style={{ cursor: 'none' }}
        >
          {/* Background canvas (cave wall) */}
          <canvas
            ref={backgroundCanvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            className="absolute inset-0 w-full h-full"
            style={{ display: 'block' }}
          />

          {/* Drawing canvas */}
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            className="relative w-full h-full touch-none"
            style={{ display: 'block' }}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
          />

          {/* Torch/firelight effect overlay */}
          {cursorPos && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox={`0 0 ${canvasSize.width} ${canvasSize.height}`}
              preserveAspectRatio="none"
            >
              <defs>
                <radialGradient id="torchGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255, 180, 50, 0.35)" />
                  <stop offset="40%" stopColor="rgba(255, 140, 30, 0.15)" />
                  <stop offset="100%" stopColor="rgba(255, 100, 0, 0)" />
                </radialGradient>
              </defs>
              <circle
                cx={cursorPos.x}
                cy={cursorPos.y}
                r={100}
                fill="url(#torchGlow)"
                style={{
                  filter: 'blur(10px)',
                  animation: 'flicker 0.5s ease-in-out infinite alternate',
                }}
              />
              {/* Custom cursor */}
              <circle
                cx={cursorPos.x}
                cy={cursorPos.y}
                r={tool === 'brush' ? brushSize / 2 : 20}
                fill="none"
                stroke="rgba(255, 200, 100, 0.8)"
                strokeWidth={2}
                strokeDasharray={tool === 'stamp' ? '4,4' : 'none'}
              />
            </svg>
          )}
        </div>

        <style>{`
          @keyframes flicker {
            0% { opacity: 0.9; transform: scale(1); }
            100% { opacity: 1; transform: scale(1.05); }
          }
        `}</style>
      </div>

      {/* Tools Panel */}
      <div className="space-y-4">
        {/* Tool Selection */}
        <div className="flex gap-2">
          <button
            onClick={() => setTool('brush')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all cursor-pointer ${
              tool === 'brush'
                ? 'bg-amber-600 text-white shadow-lg'
                : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
            }`}
          >
            Brush
          </button>
          <button
            onClick={() => setTool('stamp')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all cursor-pointer ${
              tool === 'stamp'
                ? 'bg-amber-600 text-white shadow-lg'
                : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
            }`}
          >
            Stamps
          </button>
        </div>

        {/* Color Palette */}
        <div>
          <h3 className="text-sm font-bold text-amber-200 mb-2">Prehistoric Pigments</h3>
          <div className="grid grid-cols-6 gap-2">
            {PREHISTORIC_COLORS.map((c) => (
              <button
                key={c.color}
                onClick={() => setSelectedColor(c.color)}
                title={`${c.name}: ${c.description}`}
                className={`aspect-square rounded-lg border-2 transition-all cursor-pointer ${
                  selectedColor === c.color
                    ? 'border-amber-400 scale-110 shadow-lg'
                    : 'border-stone-600 hover:border-stone-500'
                }`}
                style={{ backgroundColor: c.color }}
              />
            ))}
          </div>
          <p className="text-xs text-stone-400 mt-1">
            {PREHISTORIC_COLORS.find((c) => c.color === selectedColor)?.description}
          </p>
        </div>

        {/* Brush Size */}
        <div>
          <h3 className="text-sm font-bold text-amber-200 mb-2">
            {tool === 'brush' ? 'Brush Size' : 'Stamp Size'}
          </h3>
          <div className="flex gap-2">
            {BRUSH_SIZES.map((b) => (
              <button
                key={b.size}
                onClick={() => setBrushSize(b.size)}
                className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  brushSize === b.size
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stamps (shown when stamp tool is selected) */}
        {tool === 'stamp' && (
          <div>
            <h3 className="text-sm font-bold text-amber-200 mb-2">Cave Art Symbols</h3>
            <div className="grid grid-cols-7 gap-2">
              {STAMPS.map((s) => (
                <button
                  key={s.type}
                  onClick={() => setSelectedStamp(s.type)}
                  title={s.label}
                  className={`aspect-square rounded-lg border-2 text-xl transition-all cursor-pointer flex items-center justify-center ${
                    selectedStamp === s.type
                      ? 'bg-amber-600 border-amber-400 scale-110 shadow-lg'
                      : 'bg-stone-700 border-stone-600 hover:bg-stone-600'
                  }`}
                >
                  {s.emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleClear}
            className="flex-1 py-2 px-4 bg-stone-700 hover:bg-stone-600 text-stone-300 font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Clear
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 px-4 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Save / View
          </button>
        </div>
      </div>

      {/* Educational Tip */}
      <div className="mt-4 bg-stone-700/50 border border-stone-600 rounded-lg p-3">
        <p className="text-xs text-stone-300">
          <span className="font-bold text-amber-200">Did you know?</span> Cave paintings were made using natural materials.
          Red and yellow ochre came from iron-rich clay, charcoal from burnt wood, and white from limestone or bone ash.
          Some paints were mixed with animal fat or blood to help them stick to the cave walls!
        </p>
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-stone-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-stone-800 p-4 border-b border-stone-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-amber-100">Real Cave Art Gallery</h3>
              <button
                onClick={() => setShowGallery(false)}
                className="text-stone-400 hover:text-white text-2xl cursor-pointer"
              >
                x
              </button>
            </div>
            <div className="p-4 space-y-6">
              {GALLERY.map((item) => (
                <div key={item.id} className="bg-stone-700/50 rounded-lg overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-bold text-amber-200">{item.name}</h4>
                    <p className="text-sm text-stone-400">{item.location} - {item.age}</p>
                    <p className="text-sm text-stone-300 mt-2">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Save Modal */}
      {showSaveModal && savedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-stone-800 rounded-xl max-w-lg w-full">
            <div className="p-4 border-b border-stone-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-amber-100">Your Cave Painting</h3>
              <button
                onClick={() => setShowSaveModal(false)}
                className="text-stone-400 hover:text-white text-2xl cursor-pointer"
              >
                x
              </button>
            </div>
            <div className="p-4">
              <img
                src={savedImage}
                alt="Your cave painting"
                className="w-full rounded-lg border-2 border-stone-600"
              />
              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleDownload}
                  className="flex-1 py-2 px-4 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Download
                </button>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="flex-1 py-2 px-4 bg-stone-700 hover:bg-stone-600 text-stone-300 font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
