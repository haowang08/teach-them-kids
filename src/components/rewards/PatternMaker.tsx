import { useState, useCallback, useMemo } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type CultureId = "african" | "native-american" | "celtic" | "japanese" | "islamic";
type GamePhase = "menu" | "creating" | "gallery" | "viewing";
type ToolMode = "stamp" | "mirror-h" | "mirror-v" | "repeat-h" | "repeat-v" | "erase";

interface PlacedStamp {
  id: string;
  stampId: string;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
}

interface SavedPattern {
  id: string;
  name: string;
  cultureId: CultureId;
  stamps: PlacedStamp[];
  createdAt: number;
}

interface CultureData {
  id: CultureId;
  name: string;
  region: string;
  description: string;
  colors: { name: string; value: string }[];
  stamps: StampData[];
  meanings: { symbol: string; meaning: string }[];
  inspirationImages: { name: string; description: string }[];
}

interface StampData {
  id: string;
  name: string;
  svgPath: string;
  viewBox: string;
}

/* ------------------------------------------------------------------ */
/*  Cultural Data                                                      */
/* ------------------------------------------------------------------ */

const CULTURES: CultureData[] = [
  {
    id: "african",
    name: "African Kente",
    region: "West Africa (Ghana)",
    description:
      "Kente cloth is a traditional fabric made by the Akan people. Each pattern and color has special meaning, often worn during celebrations and ceremonies.",
    colors: [
      { name: "Gold (Royalty)", value: "#DAA520" },
      { name: "Green (Growth)", value: "#228B22" },
      { name: "Red (Sacrifice)", value: "#B22222" },
      { name: "Black (Maturity)", value: "#1a1a1a" },
      { name: "Orange (Vitality)", value: "#FF8C00" },
      { name: "Blue (Peace)", value: "#1E90FF" },
    ],
    stamps: [
      {
        id: "af-zigzag",
        name: "Zigzag",
        svgPath: "M0,10 L10,0 L20,10 L30,0 L40,10 L40,20 L30,30 L20,20 L10,30 L0,20 Z",
        viewBox: "0 0 40 30",
      },
      {
        id: "af-diamond",
        name: "Diamond",
        svgPath: "M20,0 L40,20 L20,40 L0,20 Z",
        viewBox: "0 0 40 40",
      },
      {
        id: "af-cross",
        name: "Adinkra Cross",
        svgPath: "M15,0 L25,0 L25,15 L40,15 L40,25 L25,25 L25,40 L15,40 L15,25 L0,25 L0,15 L15,15 Z",
        viewBox: "0 0 40 40",
      },
      {
        id: "af-spiral",
        name: "Sankofa Spiral",
        svgPath: "M20,5 A15,15 0 1,1 5,20 A10,10 0 1,0 20,10 A5,5 0 1,1 25,15",
        viewBox: "0 0 40 40",
      },
      {
        id: "af-triangle",
        name: "Triangle Strip",
        svgPath: "M0,30 L15,0 L30,30 Z M10,30 L25,0 L40,30 Z",
        viewBox: "0 0 40 30",
      },
      {
        id: "af-square",
        name: "Nested Square",
        svgPath: "M0,0 L40,0 L40,40 L0,40 Z M5,5 L5,35 L35,35 L35,5 Z M10,10 L30,10 L30,30 L10,30 Z",
        viewBox: "0 0 40 40",
      },
    ],
    meanings: [
      { symbol: "Zigzag", meaning: "Life's journey with ups and downs" },
      { symbol: "Spiral", meaning: "Learning from the past (Sankofa)" },
      { symbol: "Diamond", meaning: "Wealth and royalty" },
      { symbol: "Cross", meaning: "Unity and human relations" },
    ],
    inspirationImages: [
      { name: "Royal Kente", description: "Worn by Ashanti kings during ceremonies" },
      { name: "Festival Cloth", description: "Bright patterns for celebrations" },
      { name: "Adinkra Symbols", description: "Visual proverbs with deep meanings" },
    ],
  },
  {
    id: "native-american",
    name: "Native American",
    region: "North America (Navajo, Lakota)",
    description:
      "Native American patterns often represent nature, spirituality, and tribal identity. Geometric designs are common in textiles, pottery, and beadwork.",
    colors: [
      { name: "Turquoise (Sky)", value: "#40E0D0" },
      { name: "Terracotta (Earth)", value: "#E2725B" },
      { name: "Sand (Desert)", value: "#C2B280" },
      { name: "Black (Night)", value: "#1a1a1a" },
      { name: "White (Snow)", value: "#F5F5F5" },
      { name: "Red (Life)", value: "#8B0000" },
    ],
    stamps: [
      {
        id: "na-arrow",
        name: "Arrow",
        svgPath: "M20,0 L40,15 L30,15 L30,40 L10,40 L10,15 L0,15 Z",
        viewBox: "0 0 40 40",
      },
      {
        id: "na-thunderbird",
        name: "Thunderbird",
        svgPath: "M20,0 L5,15 L15,15 L10,25 L0,40 L20,30 L40,40 L30,25 L25,15 L35,15 Z",
        viewBox: "0 0 40 40",
      },
      {
        id: "na-step",
        name: "Step Pattern",
        svgPath: "M0,40 L0,30 L10,30 L10,20 L20,20 L20,10 L30,10 L30,0 L40,0 L40,40 Z",
        viewBox: "0 0 40 40",
      },
      {
        id: "na-star",
        name: "Morning Star",
        svgPath: "M20,0 L24,14 L40,14 L27,23 L32,40 L20,30 L8,40 L13,23 L0,14 L16,14 Z",
        viewBox: "0 0 40 40",
      },
      {
        id: "na-feather",
        name: "Feather",
        svgPath: "M20,0 L22,20 L35,15 L22,22 L30,40 L20,25 L10,40 L18,22 L5,15 L18,20 Z",
        viewBox: "0 0 40 40",
      },
      {
        id: "na-wave",
        name: "Water Wave",
        svgPath: "M0,20 Q10,10 20,20 Q30,30 40,20 L40,40 L0,40 Z",
        viewBox: "0 0 40 40",
      },
    ],
    meanings: [
      { symbol: "Arrow", meaning: "Protection and direction" },
      { symbol: "Thunderbird", meaning: "Power and strength" },
      { symbol: "Morning Star", meaning: "Hope and guidance" },
      { symbol: "Step Pattern", meaning: "Mountains or clouds" },
    ],
    inspirationImages: [
      { name: "Navajo Blanket", description: "Geometric woven patterns" },
      { name: "Beadwork Belt", description: "Intricate beaded designs" },
      { name: "Pottery Design", description: "Earth-toned vessel patterns" },
    ],
  },
  {
    id: "celtic",
    name: "Celtic Knots",
    region: "Ireland, Scotland, Wales",
    description:
      "Celtic patterns feature intricate interlacing knots with no beginning or end, symbolizing eternity and the interconnectedness of life.",
    colors: [
      { name: "Forest Green", value: "#228B22" },
      { name: "Deep Blue", value: "#00008B" },
      { name: "Gold", value: "#FFD700" },
      { name: "Bronze", value: "#CD7F32" },
      { name: "Silver", value: "#C0C0C0" },
      { name: "Deep Red", value: "#8B0000" },
    ],
    stamps: [
      {
        id: "ce-triquetra",
        name: "Triquetra",
        svgPath: "M20,5 Q35,20 20,35 Q5,20 20,5 M20,5 Q5,5 10,20 Q5,35 20,35 M20,5 Q35,5 30,20 Q35,35 20,35",
        viewBox: "0 0 40 40",
      },
      {
        id: "ce-spiral",
        name: "Triple Spiral",
        svgPath: "M20,20 A8,8 0 1,1 12,20 M20,20 A8,8 0 1,1 28,20 M20,20 A8,8 0 1,1 20,28",
        viewBox: "0 0 40 40",
      },
      {
        id: "ce-knot",
        name: "Square Knot",
        svgPath: "M5,5 L35,5 L35,35 L5,35 Z M10,10 L10,30 L30,30 L30,10 Z M15,0 L15,40 M25,0 L25,40 M0,15 L40,15 M0,25 L40,25",
        viewBox: "0 0 40 40",
      },
      {
        id: "ce-cross",
        name: "Celtic Cross",
        svgPath: "M15,0 L25,0 L25,15 L40,15 L40,25 L25,25 L25,40 L15,40 L15,25 L0,25 L0,15 L15,15 Z M20,20 m-12,0 a12,12 0 1,0 24,0 a12,12 0 1,0 -24,0",
        viewBox: "0 0 40 40",
      },
      {
        id: "ce-heart",
        name: "Celtic Heart",
        svgPath: "M20,35 L5,20 Q5,5 20,10 Q35,5 35,20 Z M20,30 L10,20 Q10,10 20,14 Q30,10 30,20 Z",
        viewBox: "0 0 40 40",
      },
      {
        id: "ce-border",
        name: "Border Knot",
        svgPath: "M0,10 Q10,0 20,10 Q30,20 40,10 M0,20 Q10,30 20,20 Q30,10 40,20 M0,30 Q10,20 20,30 Q30,40 40,30",
        viewBox: "0 0 40 40",
      },
    ],
    meanings: [
      { symbol: "Triquetra", meaning: "Trinity: earth, sea, and sky" },
      { symbol: "Triple Spiral", meaning: "Continuous cycle of life" },
      { symbol: "Celtic Cross", meaning: "Faith and eternity" },
      { symbol: "Knots", meaning: "Interconnection of all things" },
    ],
    inspirationImages: [
      { name: "Book of Kells", description: "Illuminated manuscript borders" },
      { name: "Stone Carvings", description: "Ancient standing stones" },
      { name: "Jewelry Design", description: "Silver and gold Celtic rings" },
    ],
  },
  {
    id: "japanese",
    name: "Japanese Patterns",
    region: "Japan",
    description:
      "Traditional Japanese patterns (wagara) appear on kimono, ceramics, and art. Each design has seasonal or symbolic meaning rooted in nature.",
    colors: [
      { name: "Indigo (Ai)", value: "#3F51B5" },
      { name: "Cherry (Sakura)", value: "#FFB7C5" },
      { name: "White (Purity)", value: "#FFFFF0" },
      { name: "Red (Joy)", value: "#DC143C" },
      { name: "Gold (Wealth)", value: "#FFD700" },
      { name: "Black (Formality)", value: "#1a1a1a" },
    ],
    stamps: [
      {
        id: "jp-sakura",
        name: "Sakura (Cherry)",
        svgPath: "M20,0 L23,14 L36,8 L27,18 L40,25 L27,25 L32,40 L20,30 L8,40 L13,25 L0,25 L13,18 L4,8 L17,14 Z",
        viewBox: "0 0 40 40",
      },
      {
        id: "jp-wave",
        name: "Seigaiha (Wave)",
        svgPath: "M0,40 Q10,20 20,40 Q30,20 40,40 M-10,30 Q0,10 10,30 Q20,10 30,30 Q40,10 50,30",
        viewBox: "0 0 40 40",
      },
      {
        id: "jp-hexagon",
        name: "Asanoha (Hemp)",
        svgPath: "M20,0 L40,10 L40,30 L20,40 L0,30 L0,10 Z M20,0 L20,40 M0,10 L40,30 M40,10 L0,30",
        viewBox: "0 0 40 40",
      },
      {
        id: "jp-circle",
        name: "Shippo (Circles)",
        svgPath: "M20,20 m-18,0 a18,18 0 1,0 36,0 a18,18 0 1,0 -36,0 M20,20 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0",
        viewBox: "0 0 40 40",
      },
      {
        id: "jp-diamond",
        name: "Yagasuri (Arrow)",
        svgPath: "M0,20 L20,0 L40,20 L20,40 Z M10,20 L20,10 L30,20 L20,30 Z",
        viewBox: "0 0 40 40",
      },
      {
        id: "jp-cloud",
        name: "Kumo (Cloud)",
        svgPath: "M10,25 Q5,20 10,15 Q10,5 20,10 Q30,5 30,15 Q35,20 30,25 Q30,35 20,30 Q10,35 10,25",
        viewBox: "0 0 40 40",
      },
    ],
    meanings: [
      { symbol: "Sakura", meaning: "Beauty and the fleeting nature of life" },
      { symbol: "Seigaiha", meaning: "Peaceful seas and good fortune" },
      { symbol: "Asanoha", meaning: "Growth and good health" },
      { symbol: "Shippo", meaning: "Seven treasures, endless connections" },
    ],
    inspirationImages: [
      { name: "Kimono Fabric", description: "Elegant seasonal patterns" },
      { name: "Ceramic Bowl", description: "Blue and white pottery designs" },
      { name: "Furoshiki Cloth", description: "Traditional wrapping cloth" },
    ],
  },
  {
    id: "islamic",
    name: "Islamic Geometric",
    region: "Middle East, North Africa, Spain",
    description:
      "Islamic geometric patterns represent the infinite nature of Allah. Complex mathematical designs create stunning symmetry in mosques and palaces.",
    colors: [
      { name: "Lapis Blue", value: "#1A237E" },
      { name: "Turquoise", value: "#00BCD4" },
      { name: "Gold", value: "#FFD700" },
      { name: "Emerald", value: "#50C878" },
      { name: "White", value: "#FAFAFA" },
      { name: "Deep Red", value: "#C62828" },
    ],
    stamps: [
      {
        id: "is-star8",
        name: "8-Point Star",
        svgPath: "M20,0 L25,15 L40,15 L28,23 L33,40 L20,30 L7,40 L12,23 L0,15 L15,15 Z",
        viewBox: "0 0 40 40",
      },
      {
        id: "is-star6",
        name: "6-Point Star",
        svgPath: "M20,0 L27,15 L40,20 L27,25 L20,40 L13,25 L0,20 L13,15 Z",
        viewBox: "0 0 40 40",
      },
      {
        id: "is-octagon",
        name: "Octagon",
        svgPath: "M12,0 L28,0 L40,12 L40,28 L28,40 L12,40 L0,28 L0,12 Z",
        viewBox: "0 0 40 40",
      },
      {
        id: "is-interlace",
        name: "Interlace",
        svgPath: "M0,20 L20,0 L40,20 L20,40 Z M5,20 L20,5 L35,20 L20,35 Z M10,20 L20,10 L30,20 L20,30 Z",
        viewBox: "0 0 40 40",
      },
      {
        id: "is-rosette",
        name: "Rosette",
        svgPath: "M20,2 L24,10 L32,8 L28,16 L36,20 L28,24 L32,32 L24,30 L20,38 L16,30 L8,32 L12,24 L4,20 L12,16 L8,8 L16,10 Z",
        viewBox: "0 0 40 40",
      },
      {
        id: "is-arabesque",
        name: "Arabesque",
        svgPath: "M20,0 Q30,10 40,10 Q30,20 30,30 Q20,20 10,30 Q10,20 0,10 Q10,10 20,0",
        viewBox: "0 0 40 40",
      },
    ],
    meanings: [
      { symbol: "8-Point Star", meaning: "The eight directions, completeness" },
      { symbol: "Geometric Patterns", meaning: "The infinite nature of creation" },
      { symbol: "Interlacing", meaning: "Unity and interconnection" },
      { symbol: "Rosette", meaning: "Divine perfection" },
    ],
    inspirationImages: [
      { name: "Alhambra Palace", description: "Intricate tile work in Spain" },
      { name: "Mosque Dome", description: "Stunning ceiling patterns" },
      { name: "Ceramic Tiles", description: "Zellige tilework from Morocco" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const CANVAS_SIZE = 400;
const GRID_SIZE = 50;

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function snapToGrid(value: number): number {
  return Math.round(value / GRID_SIZE) * GRID_SIZE;
}

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

function StampPreview({
  stamp,
  color,
  size = 32,
  selected = false,
  onClick,
}: {
  stamp: StampData;
  color: string;
  size?: number;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg border-2 transition-all cursor-pointer ${
        selected
          ? "border-indigo-500 bg-indigo-50 scale-105 shadow-md"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
      }`}
      title={stamp.name}
    >
      <svg
        width={size}
        height={size}
        viewBox={stamp.viewBox}
        className="block"
      >
        <path d={stamp.svgPath} fill={color} stroke={color} strokeWidth="1" />
      </svg>
    </button>
  );
}

function PatternCanvas({
  stamps,
  culture,
  gridEnabled,
  onCanvasClick,
  onStampClick,
}: {
  stamps: PlacedStamp[];
  culture: CultureData;
  gridEnabled: boolean;
  onCanvasClick: (x: number, y: number) => void;
  onStampClick: (id: string) => void;
}) {
  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * CANVAS_SIZE;
    const y = ((e.clientY - rect.top) / rect.height) * CANVAS_SIZE;
    onCanvasClick(x, y);
  };

  return (
    <svg
      viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`}
      className="w-full h-full cursor-crosshair bg-white rounded-lg"
      onClick={handleClick}
      style={{ maxHeight: "400px" }}
    >
      {/* Grid overlay */}
      {gridEnabled && (
        <g className="pointer-events-none">
          {Array.from({ length: CANVAS_SIZE / GRID_SIZE + 1 }).map((_, i) => (
            <g key={i}>
              <line
                x1={i * GRID_SIZE}
                y1={0}
                x2={i * GRID_SIZE}
                y2={CANVAS_SIZE}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
              <line
                x1={0}
                y1={i * GRID_SIZE}
                x2={CANVAS_SIZE}
                y2={i * GRID_SIZE}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
            </g>
          ))}
        </g>
      )}

      {/* Placed stamps */}
      {stamps.map((stamp) => {
        const stampData = culture.stamps.find((s) => s.id === stamp.stampId);
        if (!stampData) return null;

        return (
          <g
            key={stamp.id}
            transform={`translate(${stamp.x}, ${stamp.y}) rotate(${stamp.rotation}) scale(${stamp.scale})`}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onStampClick(stamp.id);
            }}
          >
            <svg
              viewBox={stampData.viewBox}
              width="40"
              height="40"
              x="-20"
              y="-20"
            >
              <path
                d={stampData.svgPath}
                fill={stamp.color}
                stroke={stamp.color}
                strokeWidth="1"
              />
            </svg>
          </g>
        );
      })}

      {/* Empty state message */}
      {stamps.length === 0 && (
        <text
          x={CANVAS_SIZE / 2}
          y={CANVAS_SIZE / 2}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="14"
          className="pointer-events-none"
        >
          Click to place stamps
        </text>
      )}
    </svg>
  );
}

function CultureCard({
  culture,
  onClick,
}: {
  culture: CultureData;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="p-4 rounded-xl border-2 border-slate-200 bg-white hover:border-indigo-300 hover:shadow-lg transition-all text-left cursor-pointer w-full"
    >
      <div className="flex gap-2 mb-2">
        {culture.colors.slice(0, 4).map((color) => (
          <div
            key={color.value}
            className="w-6 h-6 rounded-full border border-slate-200"
            style={{ backgroundColor: color.value }}
            title={color.name}
          />
        ))}
      </div>
      <h3 className="font-bold text-slate-800 text-base mb-1">{culture.name}</h3>
      <p className="text-xs text-slate-500">{culture.region}</p>
    </button>
  );
}

function GalleryPatternCard({
  pattern,
  culture,
  onView,
  onDelete,
}: {
  pattern: SavedPattern;
  culture: CultureData;
  onView: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-slate-50 p-2">
        <svg viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`} className="w-full h-full">
          {pattern.stamps.map((stamp) => {
            const stampData = culture.stamps.find((s) => s.id === stamp.stampId);
            if (!stampData) return null;
            return (
              <g
                key={stamp.id}
                transform={`translate(${stamp.x}, ${stamp.y}) rotate(${stamp.rotation}) scale(${stamp.scale})`}
              >
                <svg viewBox={stampData.viewBox} width="40" height="40" x="-20" y="-20">
                  <path d={stampData.svgPath} fill={stamp.color} stroke={stamp.color} strokeWidth="1" />
                </svg>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="p-3">
        <h4 className="font-semibold text-slate-800 text-sm truncate">{pattern.name}</h4>
        <p className="text-xs text-slate-500">{culture.name}</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={onView}
            className="flex-1 px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 cursor-pointer transition-colors"
          >
            View
          </button>
          <button
            onClick={onDelete}
            className="px-2 py-1 text-xs font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 cursor-pointer transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function InspirationGallery({ culture }: { culture: CultureData }) {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
      <h4 className="font-bold text-amber-800 text-sm mb-3">Inspiration Gallery</h4>
      <div className="space-y-2">
        {culture.inspirationImages.map((img, idx) => (
          <div key={idx} className="bg-white/70 rounded-lg p-2">
            <p className="font-semibold text-amber-700 text-xs">{img.name}</p>
            <p className="text-xs text-amber-600">{img.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PatternMeanings({ culture }: { culture: CultureData }) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
      <h4 className="font-bold text-purple-800 text-sm mb-3">Symbol Meanings</h4>
      <div className="space-y-2">
        {culture.meanings.map((item, idx) => (
          <div key={idx} className="flex gap-2 text-xs">
            <span className="font-semibold text-purple-700 whitespace-nowrap">{item.symbol}:</span>
            <span className="text-purple-600">{item.meaning}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function PatternMaker() {
  const [phase, setPhase] = useState<GamePhase>("menu");
  const [selectedCulture, setSelectedCulture] = useState<CultureData | null>(null);
  const [placedStamps, setPlacedStamps] = useState<PlacedStamp[]>([]);
  const [selectedStamp, setSelectedStamp] = useState<StampData | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [toolMode, setToolMode] = useState<ToolMode>("stamp");
  const [savedPatterns, setSavedPatterns] = useState<SavedPattern[]>([]);
  const [viewingPattern, setViewingPattern] = useState<SavedPattern | null>(null);
  const [patternName, setPatternName] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [gridEnabled, setGridEnabled] = useState(true);
  const [stampScale, setStampScale] = useState(1);
  const [stampRotation, setStampRotation] = useState(0);

  // Start creating with a culture
  const startCreating = useCallback((culture: CultureData) => {
    setSelectedCulture(culture);
    setSelectedStamp(culture.stamps[0]);
    setSelectedColor(culture.colors[0].value);
    setPlacedStamps([]);
    setToolMode("stamp");
    setStampScale(1);
    setStampRotation(0);
    setPhase("creating");
  }, []);

  // Handle canvas click
  const handleCanvasClick = useCallback(
    (x: number, y: number) => {
      if (!selectedCulture || !selectedStamp) return;

      const snappedX = gridEnabled ? snapToGrid(x) : x;
      const snappedY = gridEnabled ? snapToGrid(y) : y;

      if (toolMode === "stamp") {
        const newStamp: PlacedStamp = {
          id: generateId(),
          stampId: selectedStamp.id,
          x: snappedX,
          y: snappedY,
          color: selectedColor,
          rotation: stampRotation,
          scale: stampScale,
        };
        setPlacedStamps((prev) => [...prev, newStamp]);
      } else if (toolMode === "mirror-h") {
        // Mirror horizontally
        const newStamps: PlacedStamp[] = [
          {
            id: generateId(),
            stampId: selectedStamp.id,
            x: snappedX,
            y: snappedY,
            color: selectedColor,
            rotation: stampRotation,
            scale: stampScale,
          },
          {
            id: generateId(),
            stampId: selectedStamp.id,
            x: CANVAS_SIZE - snappedX,
            y: snappedY,
            color: selectedColor,
            rotation: -stampRotation,
            scale: stampScale,
          },
        ];
        setPlacedStamps((prev) => [...prev, ...newStamps]);
      } else if (toolMode === "mirror-v") {
        // Mirror vertically
        const newStamps: PlacedStamp[] = [
          {
            id: generateId(),
            stampId: selectedStamp.id,
            x: snappedX,
            y: snappedY,
            color: selectedColor,
            rotation: stampRotation,
            scale: stampScale,
          },
          {
            id: generateId(),
            stampId: selectedStamp.id,
            x: snappedX,
            y: CANVAS_SIZE - snappedY,
            color: selectedColor,
            rotation: -stampRotation,
            scale: stampScale,
          },
        ];
        setPlacedStamps((prev) => [...prev, ...newStamps]);
      } else if (toolMode === "repeat-h") {
        // Repeat horizontally
        const newStamps: PlacedStamp[] = [];
        for (let rx = snappedX; rx < CANVAS_SIZE; rx += GRID_SIZE * 2) {
          newStamps.push({
            id: generateId(),
            stampId: selectedStamp.id,
            x: rx,
            y: snappedY,
            color: selectedColor,
            rotation: stampRotation,
            scale: stampScale,
          });
        }
        setPlacedStamps((prev) => [...prev, ...newStamps]);
      } else if (toolMode === "repeat-v") {
        // Repeat vertically
        const newStamps: PlacedStamp[] = [];
        for (let ry = snappedY; ry < CANVAS_SIZE; ry += GRID_SIZE * 2) {
          newStamps.push({
            id: generateId(),
            stampId: selectedStamp.id,
            x: snappedX,
            y: ry,
            color: selectedColor,
            rotation: stampRotation,
            scale: stampScale,
          });
        }
        setPlacedStamps((prev) => [...prev, ...newStamps]);
      }
    },
    [selectedCulture, selectedStamp, selectedColor, toolMode, gridEnabled, stampScale, stampRotation]
  );

  // Handle stamp click for erase mode
  const handleStampClick = useCallback(
    (id: string) => {
      if (toolMode === "erase") {
        setPlacedStamps((prev) => prev.filter((s) => s.id !== id));
      }
    },
    [toolMode]
  );

  // Clear canvas
  const clearCanvas = useCallback(() => {
    setPlacedStamps([]);
  }, []);

  // Undo last stamp
  const undoLast = useCallback(() => {
    setPlacedStamps((prev) => prev.slice(0, -1));
  }, []);

  // Save pattern
  const savePattern = useCallback(() => {
    if (!selectedCulture || !patternName.trim() || placedStamps.length === 0) return;

    const newPattern: SavedPattern = {
      id: generateId(),
      name: patternName.trim(),
      cultureId: selectedCulture.id,
      stamps: [...placedStamps],
      createdAt: Date.now(),
    };

    setSavedPatterns((prev) => [...prev, newPattern]);
    setPatternName("");
    setShowSaveDialog(false);
  }, [selectedCulture, patternName, placedStamps]);

  // Delete pattern
  const deletePattern = useCallback((id: string) => {
    setSavedPatterns((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // View saved pattern
  const viewPattern = useCallback((pattern: SavedPattern) => {
    const culture = CULTURES.find((c) => c.id === pattern.cultureId);
    if (culture) {
      setSelectedCulture(culture);
      setViewingPattern(pattern);
      setPhase("viewing");
    }
  }, []);

  // Get patterns for gallery
  const patternsByCulture = useMemo(() => {
    const grouped: Record<CultureId, SavedPattern[]> = {
      african: [],
      "native-american": [],
      celtic: [],
      japanese: [],
      islamic: [],
    };
    savedPatterns.forEach((p) => {
      grouped[p.cultureId].push(p);
    });
    return grouped;
  }, [savedPatterns]);

  /* ---- Menu Screen ---- */
  if (phase === "menu") {
    return (
      <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 p-6 max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-800 mb-2">Pattern Maker</h2>
          <p className="text-sm text-indigo-600">
            Create beautiful patterns inspired by cultures around the world!
          </p>
        </div>

        {/* Culture selection */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-700 mb-3">Choose a Culture</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CULTURES.map((culture) => (
              <CultureCard
                key={culture.id}
                culture={culture}
                onClick={() => startCreating(culture)}
              />
            ))}
          </div>
        </div>

        {/* Gallery button */}
        {savedPatterns.length > 0 && (
          <div className="text-center">
            <button
              onClick={() => setPhase("gallery")}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors cursor-pointer"
            >
              View My Patterns ({savedPatterns.length})
            </button>
          </div>
        )}

        {/* Educational info */}
        <div className="mt-6 bg-white/70 rounded-xl p-4 border border-indigo-200">
          <h3 className="font-bold text-indigo-700 text-sm mb-2">About Cultural Patterns</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Patterns have been used by cultures throughout history to tell stories, represent beliefs,
            and create beauty. Each culture developed unique designs using shapes, colors, and symbols
            that held special meaning to their people. By creating these patterns, you're connecting
            with art traditions that are thousands of years old!
          </p>
        </div>
      </div>
    );
  }

  /* ---- Gallery Screen ---- */
  if (phase === "gallery") {
    return (
      <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 p-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-indigo-800">My Pattern Gallery</h2>
          <button
            onClick={() => setPhase("menu")}
            className="px-4 py-2 text-sm font-semibold text-indigo-600 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-50 cursor-pointer transition-colors"
          >
            Back to Menu
          </button>
        </div>

        {savedPatterns.length === 0 ? (
          <div className="text-center py-12 bg-white/50 rounded-xl">
            <p className="text-slate-500">No patterns saved yet.</p>
            <p className="text-sm text-slate-400 mt-1">Create some patterns to see them here!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {CULTURES.map((culture) => {
              const patterns = patternsByCulture[culture.id];
              if (patterns.length === 0) return null;

              return (
                <div key={culture.id}>
                  <h3 className="font-semibold text-slate-700 mb-3">{culture.name}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {patterns.map((pattern) => (
                      <GalleryPatternCard
                        key={pattern.id}
                        pattern={pattern}
                        culture={culture}
                        onView={() => viewPattern(pattern)}
                        onDelete={() => deletePattern(pattern.id)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  /* ---- Viewing Saved Pattern ---- */
  if (phase === "viewing" && viewingPattern && selectedCulture) {
    return (
      <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 p-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-indigo-800">{viewingPattern.name}</h2>
            <p className="text-sm text-slate-500">{selectedCulture.name}</p>
          </div>
          <button
            onClick={() => {
              setViewingPattern(null);
              setPhase("gallery");
            }}
            className="px-4 py-2 text-sm font-semibold text-indigo-600 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-50 cursor-pointer transition-colors"
          >
            Back to Gallery
          </button>
        </div>

        <div className="bg-white rounded-xl border-2 border-slate-200 p-4 mb-4">
          <svg viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`} className="w-full max-h-[400px]">
            {viewingPattern.stamps.map((stamp) => {
              const stampData = selectedCulture.stamps.find((s) => s.id === stamp.stampId);
              if (!stampData) return null;
              return (
                <g
                  key={stamp.id}
                  transform={`translate(${stamp.x}, ${stamp.y}) rotate(${stamp.rotation}) scale(${stamp.scale})`}
                >
                  <svg viewBox={stampData.viewBox} width="40" height="40" x="-20" y="-20">
                    <path d={stampData.svgPath} fill={stamp.color} stroke={stamp.color} strokeWidth="1" />
                  </svg>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => {
              setPlacedStamps([...viewingPattern.stamps]);
              setViewingPattern(null);
              setSelectedStamp(selectedCulture.stamps[0]);
              setSelectedColor(selectedCulture.colors[0].value);
              setPhase("creating");
            }}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors cursor-pointer"
          >
            Edit This Pattern
          </button>
        </div>
      </div>
    );
  }

  /* ---- Creating Screen ---- */
  if (phase === "creating" && selectedCulture) {
    return (
      <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-slate-100 p-4 sm:p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-lg font-bold text-indigo-800">{selectedCulture.name}</h2>
            <p className="text-xs text-slate-500">{selectedCulture.region}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowSaveDialog(true)}
              disabled={placedStamps.length === 0}
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                placedStamps.length === 0
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              Save Pattern
            </button>
            <button
              onClick={() => setPhase("menu")}
              className="px-3 py-1.5 text-sm font-semibold text-slate-600 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
            >
              Back
            </button>
          </div>
        </div>

        {/* Culture description */}
        <p className="text-xs text-slate-600 mb-4 bg-white/70 p-3 rounded-lg border border-slate-200">
          {selectedCulture.description}
        </p>

        {/* Main layout */}
        <div className="flex flex-wrap gap-4">
          {/* Left: Tools panel */}
          <div className="w-full sm:w-48 space-y-4 order-2 sm:order-1">
            {/* Stamps */}
            <div className="bg-white rounded-xl p-3 border border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                Stamps
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {selectedCulture.stamps.map((stamp) => (
                  <StampPreview
                    key={stamp.id}
                    stamp={stamp}
                    color={selectedColor}
                    selected={selectedStamp?.id === stamp.id}
                    onClick={() => setSelectedStamp(stamp)}
                  />
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="bg-white rounded-xl p-3 border border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                Colors
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {selectedCulture.colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-full aspect-square rounded-lg border-2 transition-all cursor-pointer ${
                      selectedColor === color.value
                        ? "border-slate-800 scale-105 shadow-md"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-2 text-center">
                {selectedCulture.colors.find((c) => c.value === selectedColor)?.name}
              </p>
            </div>

            {/* Tools */}
            <div className="bg-white rounded-xl p-3 border border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                Tools
              </h3>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { mode: "stamp" as ToolMode, label: "Stamp", icon: "+" },
                  { mode: "erase" as ToolMode, label: "Erase", icon: "x" },
                  { mode: "mirror-h" as ToolMode, label: "Mirror H", icon: "|" },
                  { mode: "mirror-v" as ToolMode, label: "Mirror V", icon: "-" },
                  { mode: "repeat-h" as ToolMode, label: "Repeat H", icon: ">>>" },
                  { mode: "repeat-v" as ToolMode, label: "Repeat V", icon: "vvv" },
                ].map((tool) => (
                  <button
                    key={tool.mode}
                    onClick={() => setToolMode(tool.mode)}
                    className={`p-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      toolMode === tool.mode
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {tool.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stamp controls */}
            <div className="bg-white rounded-xl p-3 border border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                Stamp Size & Rotation
              </h3>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-slate-500">Size: {stampScale.toFixed(1)}x</label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={stampScale}
                    onChange={(e) => setStampScale(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500">Rotation: {stampRotation}deg</label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="15"
                    value={stampRotation}
                    onChange={(e) => setStampRotation(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={undoLast}
                disabled={placedStamps.length === 0}
                className="flex-1 px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                Undo
              </button>
              <button
                onClick={clearCanvas}
                disabled={placedStamps.length === 0}
                className="flex-1 px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Center: Canvas */}
          <div className="flex-1 min-w-[280px] order-1 sm:order-2">
            <div className="bg-white border-2 border-indigo-200 rounded-xl p-2 shadow-inner">
              <PatternCanvas
                stamps={placedStamps}
                culture={selectedCulture}
                gridEnabled={gridEnabled}
                onCanvasClick={handleCanvasClick}
                onStampClick={handleStampClick}
              />
            </div>

            {/* Canvas controls */}
            <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
              <span>{placedStamps.length} stamps placed</span>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={gridEnabled}
                  onChange={(e) => setGridEnabled(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-slate-300"
                />
                Show grid
              </label>
            </div>

            {/* Tool hint */}
            <div className="mt-3 bg-indigo-50 rounded-lg p-2 text-xs text-indigo-700">
              <span className="font-semibold">Current tool:</span>{" "}
              {toolMode === "stamp" && "Click to place a stamp"}
              {toolMode === "erase" && "Click on stamps to remove them"}
              {toolMode === "mirror-h" && "Places stamp and its horizontal mirror"}
              {toolMode === "mirror-v" && "Places stamp and its vertical mirror"}
              {toolMode === "repeat-h" && "Repeats stamp across horizontally"}
              {toolMode === "repeat-v" && "Repeats stamp down vertically"}
            </div>
          </div>

          {/* Right: Info panels */}
          <div className="w-full sm:w-48 space-y-4 order-3">
            <PatternMeanings culture={selectedCulture} />
            <InspirationGallery culture={selectedCulture} />
          </div>
        </div>

        {/* Save dialog */}
        {showSaveDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Save Your Pattern</h3>
              <input
                type="text"
                value={patternName}
                onChange={(e) => setPatternName(e.target.value)}
                placeholder="Enter pattern name..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSaveDialog(false)}
                  className="flex-1 px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={savePattern}
                  disabled={!patternName.trim()}
                  className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Fallback
  return (
    <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 text-center">
      <p className="text-slate-600">Loading...</p>
    </div>
  );
}
