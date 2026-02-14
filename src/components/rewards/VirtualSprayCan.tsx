import { useRef, useEffect, useState, useCallback } from 'react';

// ============================================
// TYPES
// ============================================

interface SprayParticle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  color: string;
}

interface Drip {
  x: number;
  y: number;
  length: number;
  maxLength: number;
  width: number;
  color: string;
  speed: number;
}

type StencilType = 'star' | 'heart' | 'lightning' | 'crown' | 'peace' | 'letter-a' | 'letter-b' | 'letter-c' | 'arrow' | 'skull';
type SpraySize = 'small' | 'medium' | 'large';

interface SprayColor {
  name: string;
  hex: string;
  glow: string;
}

interface FamousArt {
  id: number;
  title: string;
  artist: string;
  year: string;
  location: string;
  description: string;
  style: string;
  emoji: string;
}

// ============================================
// CONSTANTS
// ============================================

const SPRAY_COLORS: SprayColor[] = [
  { name: 'Neon Pink', hex: '#ff10f0', glow: 'rgba(255, 16, 240, 0.5)' },
  { name: 'Electric Blue', hex: '#00d4ff', glow: 'rgba(0, 212, 255, 0.5)' },
  { name: 'Lime Green', hex: '#39ff14', glow: 'rgba(57, 255, 20, 0.5)' },
  { name: 'Hot Orange', hex: '#ff6600', glow: 'rgba(255, 102, 0, 0.5)' },
  { name: 'Purple Haze', hex: '#bf00ff', glow: 'rgba(191, 0, 255, 0.5)' },
  { name: 'Golden Yellow', hex: '#ffea00', glow: 'rgba(255, 234, 0, 0.5)' },
  { name: 'Cherry Red', hex: '#ff073a', glow: 'rgba(255, 7, 58, 0.5)' },
  { name: 'Mint Teal', hex: '#00ffc8', glow: 'rgba(0, 255, 200, 0.5)' },
  { name: 'Pure White', hex: '#ffffff', glow: 'rgba(255, 255, 255, 0.5)' },
  { name: 'Jet Black', hex: '#1a1a1a', glow: 'rgba(0, 0, 0, 0.3)' },
];

const SPRAY_SIZES: { id: SpraySize; label: string; radius: number; density: number }[] = [
  { id: 'small', label: 'Fine', radius: 15, density: 8 },
  { id: 'medium', label: 'Normal', radius: 30, density: 15 },
  { id: 'large', label: 'Wide', radius: 50, density: 25 },
];

const STENCILS: { id: StencilType; label: string; icon: string }[] = [
  { id: 'star', label: 'Star', icon: '\u2605' },
  { id: 'heart', label: 'Heart', icon: '\u2665' },
  { id: 'lightning', label: 'Bolt', icon: '\u26A1' },
  { id: 'crown', label: 'Crown', icon: '\uD83D\uDC51' },
  { id: 'peace', label: 'Peace', icon: '\u262E' },
  { id: 'letter-a', label: 'A', icon: 'A' },
  { id: 'letter-b', label: 'B', icon: 'B' },
  { id: 'letter-c', label: 'C', icon: 'C' },
  { id: 'arrow', label: 'Arrow', icon: '\u27A4' },
  { id: 'skull', label: 'Skull', icon: '\uD83D\uDC80' },
];

const FAMOUS_STREET_ART: FamousArt[] = [
  {
    id: 1,
    title: 'Girl with Balloon',
    artist: 'Banksy',
    year: '2002',
    location: 'London, UK',
    description: 'A girl reaching for a heart-shaped balloon. Symbolizes hope and innocence lost.',
    style: 'Stencil Art',
    emoji: '\uD83C\uDF88',
  },
  {
    id: 2,
    title: 'The Kiss',
    artist: 'Eduardo Kobra',
    year: '2012',
    location: 'New York, USA',
    description: 'A colorful mural recreating the famous VJ Day kiss photo in Times Square.',
    style: 'Photorealistic Mural',
    emoji: '\uD83D\uDC8B',
  },
  {
    id: 3,
    title: 'Crack is Wack',
    artist: 'Keith Haring',
    year: '1986',
    location: 'Harlem, NY',
    description: 'Bold anti-drug mural featuring Haring\'s signature dancing figures.',
    style: 'Pop Art Graffiti',
    emoji: '\uD83C\uDFA8',
  },
  {
    id: 4,
    title: 'Flower Thrower',
    artist: 'Banksy',
    year: '2003',
    location: 'Jerusalem',
    description: 'A masked protester throwing a bouquet instead of a weapon - peace over violence.',
    style: 'Stencil Art',
    emoji: '\uD83C\uDF3B',
  },
  {
    id: 5,
    title: 'The Giant of Boston',
    artist: 'Os Gemeos',
    year: '2012',
    location: 'Boston, USA',
    description: 'A 70-foot tall yellow figure, one of the largest murals in Boston.',
    style: 'Brazilian Street Art',
    emoji: '\uD83D\uDC9B',
  },
  {
    id: 6,
    title: 'Wynwood Walls',
    artist: 'Various Artists',
    year: '2009-Present',
    location: 'Miami, FL',
    description: 'An outdoor museum with murals by world-famous street artists.',
    style: 'Mixed Styles',
    emoji: '\uD83C\uDF06',
  },
];

// ============================================
// DRAWING HELPERS
// ============================================

function drawBrickWall(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  // Base wall color
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(0, 0, width, height);

  const brickWidth = 60;
  const brickHeight = 25;
  const mortarWidth = 3;

  // Draw bricks
  let rowOffset = 0;
  for (let y = 0; y < height; y += brickHeight + mortarWidth) {
    rowOffset = rowOffset === 0 ? brickWidth / 2 : 0;
    for (let x = -rowOffset; x < width; x += brickWidth + mortarWidth) {
      // Vary brick color slightly
      const colorVariation = Math.random() * 30 - 15;
      const r = Math.min(255, Math.max(0, 139 + colorVariation));
      const g = Math.min(255, Math.max(0, 69 + colorVariation * 0.5));
      const b = Math.min(255, Math.max(0, 19 + colorVariation * 0.3));
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

      // Draw brick with slight texture
      ctx.fillRect(x, y, brickWidth, brickHeight);

      // Add subtle highlights and shadows
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(x, y, brickWidth, 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(x, y + brickHeight - 2, brickWidth, 2);
    }
  }

  // Draw mortar lines
  ctx.fillStyle = '#6B6B6B';
  for (let y = brickHeight; y < height; y += brickHeight + mortarWidth) {
    ctx.fillRect(0, y, width, mortarWidth);
  }

  // Add some texture/grain
  for (let i = 0; i < 2000; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.1})`;
    ctx.fillRect(x, y, 1, 1);
  }
}

function generateSprayParticles(
  x: number,
  y: number,
  color: string,
  size: { radius: number; density: number }
): SprayParticle[] {
  const particles: SprayParticle[] = [];
  for (let i = 0; i < size.density; i++) {
    // Use Gaussian-like distribution for more realistic spray pattern
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * Math.random() * size.radius; // Squared for center bias
    const px = x + Math.cos(angle) * distance;
    const py = y + Math.sin(angle) * distance;
    const particleRadius = Math.random() * 3 + 0.5;
    const opacity = 0.3 + Math.random() * 0.5;
    particles.push({ x: px, y: py, radius: particleRadius, opacity, color });
  }
  return particles;
}

function drawSprayParticles(ctx: CanvasRenderingContext2D, particles: SprayParticle[]): void {
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.opacity;
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

function getStencilPath(type: StencilType, x: number, y: number, scale: number): Path2D {
  const path = new Path2D();

  switch (type) {
    case 'star': {
      const spikes = 5;
      const outerRadius = 50 * scale;
      const innerRadius = 25 * scale;
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / spikes - Math.PI / 2;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        if (i === 0) path.moveTo(px, py);
        else path.lineTo(px, py);
      }
      path.closePath();
      break;
    }
    case 'heart': {
      const s = 40 * scale;
      path.moveTo(x, y + s * 0.3);
      path.bezierCurveTo(x - s, y - s * 0.5, x - s * 1.2, y + s * 0.3, x, y + s);
      path.bezierCurveTo(x + s * 1.2, y + s * 0.3, x + s, y - s * 0.5, x, y + s * 0.3);
      break;
    }
    case 'lightning': {
      const s = 50 * scale;
      path.moveTo(x + s * 0.3, y - s);
      path.lineTo(x - s * 0.2, y);
      path.lineTo(x + s * 0.1, y);
      path.lineTo(x - s * 0.3, y + s);
      path.lineTo(x + s * 0.2, y);
      path.lineTo(x - s * 0.1, y);
      path.closePath();
      break;
    }
    case 'crown': {
      const s = 50 * scale;
      path.moveTo(x - s, y + s * 0.5);
      path.lineTo(x - s * 0.7, y - s * 0.3);
      path.lineTo(x - s * 0.35, y + s * 0.2);
      path.lineTo(x, y - s * 0.5);
      path.lineTo(x + s * 0.35, y + s * 0.2);
      path.lineTo(x + s * 0.7, y - s * 0.3);
      path.lineTo(x + s, y + s * 0.5);
      path.closePath();
      break;
    }
    case 'peace': {
      const r = 45 * scale;
      path.arc(x, y, r, 0, Math.PI * 2);
      path.moveTo(x, y - r);
      path.lineTo(x, y + r);
      path.moveTo(x, y);
      path.lineTo(x - r * 0.7, y + r * 0.7);
      path.moveTo(x, y);
      path.lineTo(x + r * 0.7, y + r * 0.7);
      break;
    }
    case 'letter-a': {
      const s = 50 * scale;
      path.moveTo(x, y - s);
      path.lineTo(x - s * 0.6, y + s);
      path.lineTo(x - s * 0.35, y + s);
      path.lineTo(x - s * 0.2, y + s * 0.3);
      path.lineTo(x + s * 0.2, y + s * 0.3);
      path.lineTo(x + s * 0.35, y + s);
      path.lineTo(x + s * 0.6, y + s);
      path.closePath();
      // Inner triangle
      path.moveTo(x, y - s * 0.3);
      path.lineTo(x - s * 0.15, y + s * 0.1);
      path.lineTo(x + s * 0.15, y + s * 0.1);
      path.closePath();
      break;
    }
    case 'letter-b': {
      const s = 50 * scale;
      path.moveTo(x - s * 0.4, y - s);
      path.lineTo(x - s * 0.4, y + s);
      path.lineTo(x + s * 0.2, y + s);
      path.quadraticCurveTo(x + s * 0.6, y + s * 0.5, x + s * 0.2, y);
      path.quadraticCurveTo(x + s * 0.5, y - s * 0.5, x + s * 0.1, y - s);
      path.closePath();
      break;
    }
    case 'letter-c': {
      const s = 50 * scale;
      path.arc(x, y, s, -Math.PI * 0.3, Math.PI * 0.3, true);
      path.arc(x, y, s * 0.6, Math.PI * 0.3, -Math.PI * 0.3, false);
      path.closePath();
      break;
    }
    case 'arrow': {
      const s = 50 * scale;
      path.moveTo(x + s, y);
      path.lineTo(x + s * 0.3, y - s * 0.5);
      path.lineTo(x + s * 0.3, y - s * 0.2);
      path.lineTo(x - s, y - s * 0.2);
      path.lineTo(x - s, y + s * 0.2);
      path.lineTo(x + s * 0.3, y + s * 0.2);
      path.lineTo(x + s * 0.3, y + s * 0.5);
      path.closePath();
      break;
    }
    case 'skull': {
      const s = 45 * scale;
      // Head
      path.arc(x, y - s * 0.2, s * 0.8, Math.PI, 0, false);
      path.lineTo(x + s * 0.7, y + s * 0.3);
      path.quadraticCurveTo(x + s * 0.5, y + s * 0.6, x + s * 0.3, y + s * 0.8);
      path.lineTo(x + s * 0.1, y + s * 0.6);
      path.lineTo(x, y + s * 0.8);
      path.lineTo(x - s * 0.1, y + s * 0.6);
      path.lineTo(x - s * 0.3, y + s * 0.8);
      path.quadraticCurveTo(x - s * 0.5, y + s * 0.6, x - s * 0.7, y + s * 0.3);
      path.closePath();
      break;
    }
  }

  return path;
}

function drawStencil(
  ctx: CanvasRenderingContext2D,
  type: StencilType,
  x: number,
  y: number,
  color: string,
  glow: string,
  scale: number = 1
): void {
  const path = getStencilPath(type, x, y, scale);

  // Glow effect
  ctx.shadowColor = glow;
  ctx.shadowBlur = 20;
  ctx.fillStyle = color;
  ctx.fill(path);

  // Reset shadow
  ctx.shadowBlur = 0;

  // Add spray texture over stencil
  ctx.save();
  ctx.clip(path);
  for (let i = 0; i < 200; i++) {
    const px = x + (Math.random() - 0.5) * 120 * scale;
    const py = y + (Math.random() - 0.5) * 120 * scale;
    ctx.beginPath();
    ctx.arc(px, py, Math.random() * 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.15})`;
    ctx.fill();
  }
  ctx.restore();
}

// ============================================
// COMPONENT
// ============================================

export default function VirtualSprayCan() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const isSprayingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  const [selectedColor, setSelectedColor] = useState<SprayColor>(SPRAY_COLORS[0]);
  const [spraySize, setSpraySize] = useState<SpraySize>('medium');
  const [selectedStencil, setSelectedStencil] = useState<StencilType | null>(null);
  const [dripEnabled, setDripEnabled] = useState(false);
  const [drips, setDrips] = useState<Drip[]>([]);
  const [canvasSize, setCanvasSize] = useState({ w: 800, h: 500 });
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isToolbarOpen, setIsToolbarOpen] = useState(true);
  const [stencilScale, setStencilScale] = useState(1);

  // Initialize brick wall background
  useEffect(() => {
    const bgCanvas = backgroundRef.current;
    if (!bgCanvas) return;

    const ctx = bgCanvas.getContext('2d');
    if (!ctx) return;

    bgCanvas.width = canvasSize.w;
    bgCanvas.height = canvasSize.h;
    drawBrickWall(ctx, canvasSize.w, canvasSize.h);
  }, [canvasSize]);

  // Resize handler
  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const w = Math.floor(Math.min(rect.width, 900));
        const h = Math.floor(Math.min(500, w * 0.6));
        setCanvasSize({ w, h });
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvasSize.w;
    canvas.height = canvasSize.h;
  }, [canvasSize]);

  // Drip animation
  useEffect(() => {
    if (!dripEnabled || drips.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      let hasActiveDrips = false;

      setDrips((prevDrips) => {
        const updatedDrips = prevDrips.map((drip) => {
          if (drip.length < drip.maxLength) {
            hasActiveDrips = true;
            // Draw the drip extension
            ctx.beginPath();
            ctx.moveTo(drip.x, drip.y + drip.length);
            ctx.lineTo(drip.x, drip.y + drip.length + drip.speed);
            ctx.strokeStyle = drip.color;
            ctx.lineWidth = drip.width;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Draw drip end
            ctx.beginPath();
            ctx.arc(drip.x, drip.y + drip.length + drip.speed, drip.width / 2, 0, Math.PI * 2);
            ctx.fillStyle = drip.color;
            ctx.fill();

            return { ...drip, length: drip.length + drip.speed };
          }
          return drip;
        }).filter((drip) => drip.length < drip.maxLength);

        return updatedDrips;
      });

      if (hasActiveDrips) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [dripEnabled, drips.length]);

  // Get canvas coordinates from mouse/touch event
  const getCanvasCoords = useCallback((e: React.MouseEvent | React.TouchEvent): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;

    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }, []);

  // Spray paint handler
  const handleSpray = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const sizeConfig = SPRAY_SIZES.find((s) => s.id === spraySize) || SPRAY_SIZES[1];
    const particles = generateSprayParticles(x, y, selectedColor.hex, sizeConfig);
    drawSprayParticles(ctx, particles);

    // Create drips randomly when spraying
    if (dripEnabled && Math.random() < 0.02) {
      const newDrip: Drip = {
        x: x + (Math.random() - 0.5) * sizeConfig.radius,
        y,
        length: 0,
        maxLength: 30 + Math.random() * 70,
        width: 2 + Math.random() * 3,
        color: selectedColor.hex,
        speed: 0.5 + Math.random() * 1.5,
      };
      setDrips((prev) => [...prev, newDrip]);
    }
  }, [selectedColor, spraySize, dripEnabled]);

  // Apply stencil
  const applyStencil = useCallback((x: number, y: number) => {
    if (!selectedStencil) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawStencil(ctx, selectedStencil, x, y, selectedColor.hex, selectedColor.glow, stencilScale);
    setSelectedStencil(null);
  }, [selectedStencil, selectedColor, stencilScale]);

  // Mouse/touch handlers
  const handlePointerDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const coords = getCanvasCoords(e);
    if (!coords) return;

    if (selectedStencil) {
      applyStencil(coords.x, coords.y);
    } else {
      isSprayingRef.current = true;
      lastPosRef.current = coords;
      handleSpray(coords.x, coords.y);
    }
  }, [getCanvasCoords, selectedStencil, applyStencil, handleSpray]);

  const handlePointerMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isSprayingRef.current) return;

    const coords = getCanvasCoords(e);
    if (!coords) return;

    // Interpolate between last position and current for smoother spray
    if (lastPosRef.current) {
      const dx = coords.x - lastPosRef.current.x;
      const dy = coords.y - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.max(1, Math.floor(dist / 5));

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = lastPosRef.current.x + dx * t;
        const y = lastPosRef.current.y + dy * t;
        handleSpray(x, y);
      }
    }

    lastPosRef.current = coords;
  }, [getCanvasCoords, handleSpray]);

  const handlePointerUp = useCallback(() => {
    isSprayingRef.current = false;
    lastPosRef.current = null;
  }, []);

  // Clear canvas
  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDrips([]);
  }, []);

  // Save artwork
  const saveArtwork = useCallback(() => {
    const bgCanvas = backgroundRef.current;
    const artCanvas = canvasRef.current;
    if (!bgCanvas || !artCanvas) return;

    // Create combined canvas
    const combinedCanvas = document.createElement('canvas');
    combinedCanvas.width = canvasSize.w;
    combinedCanvas.height = canvasSize.h;
    const ctx = combinedCanvas.getContext('2d');
    if (!ctx) return;

    // Draw background then art
    ctx.drawImage(bgCanvas, 0, 0);
    ctx.drawImage(artCanvas, 0, 0);

    // Download
    const link = document.createElement('a');
    link.download = 'street-art.png';
    link.href = combinedCanvas.toDataURL('image/png');
    link.click();
  }, [canvasSize]);

  const currentArt = FAMOUS_STREET_ART[galleryIndex];

  return (
    <div className="rounded-xl bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Virtual Spray Can
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Create your own street art masterpiece
        </p>
      </div>

      {/* Toolbar Toggle (Mobile) */}
      <button
        onClick={() => setIsToolbarOpen((prev) => !prev)}
        className="sm:hidden w-full mb-3 bg-purple-800/50 hover:bg-purple-700/50 text-white rounded-lg py-2 text-sm font-medium flex items-center justify-center gap-2 cursor-pointer"
      >
        {isToolbarOpen ? 'Hide' : 'Show'} Tools
        <span className={`transition-transform ${isToolbarOpen ? 'rotate-180' : ''}`}>
          {'\u25BC'}
        </span>
      </button>

      {/* Toolbar */}
      {isToolbarOpen && (
        <div className="bg-black/40 rounded-xl p-4 mb-4 space-y-4">
          {/* Color Selection */}
          <div>
            <label className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2 block">
              Spray Colors
            </label>
            <div className="flex flex-wrap gap-2">
              {SPRAY_COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer hover:scale-110 ${
                    selectedColor.name === color.name
                      ? 'border-white scale-110 shadow-lg'
                      : 'border-gray-600'
                  }`}
                  style={{
                    backgroundColor: color.hex,
                    boxShadow: selectedColor.name === color.name ? `0 0 15px ${color.glow}` : 'none',
                  }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Spray Size */}
          <div>
            <label className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2 block">
              Spray Size
            </label>
            <div className="flex gap-2">
              {SPRAY_SIZES.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSpraySize(size.id)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    spraySize === size.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stencils */}
          <div>
            <label className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2 block">
              Stencils (Click to place)
            </label>
            <div className="flex flex-wrap gap-2">
              {STENCILS.map((stencil) => (
                <button
                  key={stencil.id}
                  onClick={() => setSelectedStencil(selectedStencil === stencil.id ? null : stencil.id)}
                  className={`w-10 h-10 rounded-lg text-xl transition-all cursor-pointer flex items-center justify-center ${
                    selectedStencil === stencil.id
                      ? 'bg-cyan-600 text-white scale-110 ring-2 ring-cyan-400'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  title={stencil.label}
                >
                  {stencil.icon}
                </button>
              ))}
            </div>
            {selectedStencil && (
              <div className="mt-2 flex items-center gap-3">
                <span className="text-xs text-cyan-300">Scale:</span>
                <input
                  type="range"
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={stencilScale}
                  onChange={(e) => setStencilScale(Number(e.target.value))}
                  className="flex-1 accent-cyan-400"
                />
                <span className="text-xs text-cyan-300 w-8">{stencilScale.toFixed(1)}x</span>
              </div>
            )}
          </div>

          {/* Effects & Actions */}
          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={() => setDripEnabled((prev) => !prev)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                dripEnabled
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {'\uD83D\uDCA7'} Drip Effect: {dripEnabled ? 'ON' : 'OFF'}
            </button>

            <button
              onClick={() => setShowGallery(true)}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              {'\uD83D\uDDBC\uFE0F'} Gallery
            </button>

            <div className="flex-1" />

            <button
              onClick={clearCanvas}
              className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              {'\uD83D\uDDD1\uFE0F'} Clear
            </button>

            <button
              onClick={saveArtwork}
              className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              {'\uD83D\uDCBE'} Save
            </button>
          </div>
        </div>
      )}

      {/* Canvas Area */}
      <div
        ref={containerRef}
        className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-gray-700"
        style={{ touchAction: 'none' }}
      >
        {/* Brick wall background */}
        <canvas
          ref={backgroundRef}
          className="absolute inset-0 w-full h-full"
          style={{ imageRendering: 'pixelated' }}
        />

        {/* Drawing canvas */}
        <canvas
          ref={canvasRef}
          className={`relative w-full h-full ${selectedStencil ? 'cursor-crosshair' : 'cursor-none'}`}
          style={{ height: canvasSize.h }}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        />

        {/* Spray cursor indicator */}
        {!selectedStencil && (
          <div
            className="pointer-events-none absolute rounded-full border-2 border-white/50 transition-colors"
            style={{
              width: (SPRAY_SIZES.find((s) => s.id === spraySize)?.radius || 30) * 2,
              height: (SPRAY_SIZES.find((s) => s.id === spraySize)?.radius || 30) * 2,
              backgroundColor: `${selectedColor.hex}20`,
              boxShadow: `0 0 20px ${selectedColor.glow}`,
              display: 'none',
            }}
          />
        )}

        {/* Stencil preview hint */}
        {selectedStencil && (
          <div className="absolute bottom-2 left-2 bg-black/70 text-cyan-300 text-xs px-3 py-1.5 rounded-lg">
            Click to place {STENCILS.find((s) => s.id === selectedStencil)?.label} stencil
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-4 bg-black/30 rounded-lg p-3 text-center">
        <p className="text-sm text-gray-400">
          <span className="text-purple-400 font-medium">Drag</span> to spray paint
          {' '} <span className="text-gray-500">|</span> {' '}
          <span className="text-cyan-400 font-medium">Select stencil</span> then click to place
          {' '} <span className="text-gray-500">|</span> {' '}
          <span className="text-pink-400 font-medium">Drip effect</span> adds realistic paint drips
        </p>
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 to-purple-950 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">
                {'\uD83C\uDFA8'} Famous Street Art
              </h3>
              <button
                onClick={() => setShowGallery(false)}
                className="text-gray-400 hover:text-white text-2xl cursor-pointer"
              >
                {'\u2715'}
              </button>
            </div>

            {/* Art Card */}
            <div className="bg-black/40 rounded-xl p-5 mb-4">
              <div className="text-6xl text-center mb-4">{currentArt.emoji}</div>
              <h4 className="text-lg font-bold text-white text-center mb-1">
                {currentArt.title}
              </h4>
              <p className="text-sm text-purple-300 text-center mb-3">
                by {currentArt.artist} ({currentArt.year})
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  <span className="text-cyan-400 font-medium">Location:</span> {currentArt.location}
                </p>
                <p className="text-gray-300">
                  <span className="text-cyan-400 font-medium">Style:</span> {currentArt.style}
                </p>
                <p className="text-gray-400 mt-2">{currentArt.description}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setGalleryIndex((prev) => (prev - 1 + FAMOUS_STREET_ART.length) % FAMOUS_STREET_ART.length)}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg font-medium cursor-pointer"
              >
                {'\u2190'} Previous
              </button>
              <span className="text-gray-400 text-sm">
                {galleryIndex + 1} / {FAMOUS_STREET_ART.length}
              </span>
              <button
                onClick={() => setGalleryIndex((prev) => (prev + 1) % FAMOUS_STREET_ART.length)}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg font-medium cursor-pointer"
              >
                Next {'\u2192'}
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {FAMOUS_STREET_ART.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setGalleryIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    i === galleryIndex ? 'bg-purple-400 scale-125' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowGallery(false)}
              className="w-full mt-4 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-lg font-bold transition-all cursor-pointer"
            >
              Back to Creating
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
