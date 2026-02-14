import { useState, useEffect, useCallback } from "react";

// ============================================
// TYPES
// ============================================

interface ArtDetectiveProps {
  onComplete?: () => void;
}

interface Difference {
  id: string;
  x: number; // percentage position
  y: number;
  radius: number; // click detection radius in percentage
  found: boolean;
  description: string;
}

interface Painting {
  title: string;
  artist: string;
  year: string;
  description: string;
  differences: Omit<Difference, "found">[];
}

type GamePhase = "ready" | "playing" | "roundComplete" | "finished";

// ============================================
// PAINTING DATA - SVG-based abstract representations
// ============================================

const PAINTINGS: Painting[] = [
  {
    title: "Starry Night",
    artist: "Vincent van Gogh",
    year: "1889",
    description: "Swirling night sky over a village",
    differences: [
      { id: "star1", x: 25, y: 17, radius: 10, description: "Missing star" },
      { id: "moon", x: 78, y: 15, radius: 10, description: "Moon color changed" },
      { id: "cypress", x: 15, y: 33, radius: 14, description: "Cypress tree shorter" },
      { id: "village", x: 64, y: 53, radius: 14, description: "Church spire missing" },
    ],
  },
  {
    title: "The Scream",
    artist: "Edvard Munch",
    year: "1893",
    description: "A figure on a bridge against a fiery sky",
    differences: [
      { id: "sky1", x: 30, y: 12, radius: 12, description: "Sky swirl different color" },
      { id: "figure", x: 50, y: 55, radius: 10, description: "Figure's mouth shape changed" },
      { id: "railing", x: 20, y: 77, radius: 14, description: "Bridge railing section missing" },
      { id: "water", x: 75, y: 55, radius: 12, description: "Water color altered" },
      { id: "person", x: 80, y: 52, radius: 10, description: "Background figure missing" },
    ],
  },
  {
    title: "Composition VIII",
    artist: "Wassily Kandinsky",
    year: "1923",
    description: "Abstract geometric shapes and colors",
    differences: [
      { id: "circle1", x: 22, y: 28, radius: 12, description: "Circle color changed" },
      { id: "triangle", x: 65, y: 32, radius: 12, description: "Triangle rotated" },
      { id: "lines", x: 42, y: 67, radius: 10, description: "Line pattern different" },
      { id: "square", x: 84, y: 75, radius: 10, description: "Square missing" },
    ],
  },
];

const POINTS_PER_DIFFERENCE = 100;
const TIME_BONUS_THRESHOLD = 30; // seconds
const TIME_BONUS_POINTS = 50;

// ============================================
// STYLES
// ============================================

const colors = {
  primary: "#6B4C9A",
  primaryLight: "#9B7BC7",
  accent: "#E8B84A",
  accentLight: "#FCE8B2",
  background: "#1A1A2E",
  cardBg: "#16213E",
  text: "#E8E8E8",
  textMuted: "#A0A0B0",
  success: "#4CAF50",
  danger: "#E53935",
  gold: "#FFD700",
};

const styles = {
  wrapper: {
    background: `linear-gradient(145deg, ${colors.background} 0%, #0F0F1A 100%)`,
    borderRadius: 16,
    padding: "20px",
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
    color: colors.text,
    minHeight: 500,
  } as React.CSSProperties,

  header: {
    textAlign: "center" as const,
    marginBottom: 16,
  } as React.CSSProperties,

  title: {
    fontSize: 24,
    fontWeight: 800,
    color: colors.accent,
    margin: "8px 0",
    textShadow: "0 2px 8px rgba(232, 184, 74, 0.3)",
  } as React.CSSProperties,

  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
  } as React.CSSProperties,

  statsBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 16px",
    background: colors.cardBg,
    borderRadius: 12,
    marginBottom: 16,
  } as React.CSSProperties,

  statItem: {
    textAlign: "center" as const,
  } as React.CSSProperties,

  statLabel: {
    fontSize: 11,
    color: colors.textMuted,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  } as React.CSSProperties,

  statValue: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.accent,
  } as React.CSSProperties,

  paintingContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginBottom: 16,
  } as React.CSSProperties,

  paintingFrame: {
    background: "#2A2A4A",
    borderRadius: 12,
    padding: 8,
    border: "3px solid #3A3A5A",
    boxShadow: "inset 0 2px 10px rgba(0,0,0,0.3)",
  } as React.CSSProperties,

  paintingLabel: {
    textAlign: "center" as const,
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 6,
    fontWeight: 600,
  } as React.CSSProperties,

  svgContainer: {
    position: "relative" as const,
    width: "100%",
    paddingBottom: "75%", // 4:3 aspect ratio
    overflow: "hidden",
    borderRadius: 8,
    cursor: "crosshair",
  } as React.CSSProperties,

  svgWrapper: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  } as React.CSSProperties,

  foundMarker: {
    position: "absolute" as const,
    borderRadius: "50%",
    border: `3px solid ${colors.success}`,
    background: "rgba(76, 175, 80, 0.2)",
    pointerEvents: "none" as const,
    animation: "pulse 1s ease-out",
  } as React.CSSProperties,

  progressBar: {
    display: "flex",
    gap: 6,
    justifyContent: "center",
    marginBottom: 12,
  } as React.CSSProperties,

  progressDot: (found: boolean) =>
    ({
      width: 12,
      height: 12,
      borderRadius: "50%",
      background: found ? colors.success : "#3A3A5A",
      border: `2px solid ${found ? colors.success : "#5A5A7A"}`,
      transition: "all 0.3s ease",
    }) as React.CSSProperties,

  infoCard: {
    background: colors.cardBg,
    borderRadius: 12,
    padding: "14px 16px",
    marginBottom: 16,
    border: "1px solid #2A2A4A",
  } as React.CSSProperties,

  paintingTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.text,
    marginBottom: 4,
  } as React.CSSProperties,

  paintingArtist: {
    fontSize: 13,
    color: colors.primaryLight,
  } as React.CSSProperties,

  button: {
    padding: "12px 28px",
    borderRadius: 24,
    border: "none",
    background: `linear-gradient(145deg, ${colors.accent} 0%, #C9982A 100%)`,
    color: colors.background,
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    transition: "transform 0.15s, box-shadow 0.15s",
    boxShadow: "0 4px 12px rgba(232, 184, 74, 0.3)",
  } as React.CSSProperties,

  buttonSecondary: {
    padding: "10px 20px",
    borderRadius: 20,
    border: `2px solid ${colors.primaryLight}`,
    background: "transparent",
    color: colors.primaryLight,
    fontWeight: 600,
    fontSize: 13,
    cursor: "pointer",
    transition: "all 0.2s",
  } as React.CSSProperties,

  overlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(10, 10, 20, 0.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  } as React.CSSProperties,

  modal: {
    background: colors.cardBg,
    borderRadius: 20,
    padding: "32px 28px",
    textAlign: "center" as const,
    maxWidth: 400,
    border: `2px solid ${colors.accent}`,
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
  } as React.CSSProperties,

  celebration: {
    fontSize: 48,
    marginBottom: 16,
  } as React.CSSProperties,

  hintText: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 12,
    fontStyle: "italic" as const,
  } as React.CSSProperties,
};

// ============================================
// SVG PAINTING COMPONENTS
// ============================================

// Starry Night - Original
const StarryNightOriginal = () => (
  <svg viewBox="0 0 200 150" style={{ width: "100%", height: "100%" }}>
    {/* Night sky background */}
    <rect width="200" height="150" fill="#1a237e" />

    {/* Swirling sky patterns */}
    <ellipse cx="60" cy="30" rx="35" ry="12" fill="none" stroke="#5c6bc0" strokeWidth="3" />
    <ellipse cx="60" cy="30" rx="25" ry="8" fill="none" stroke="#7986cb" strokeWidth="2" />
    <ellipse cx="120" cy="45" rx="40" ry="14" fill="none" stroke="#5c6bc0" strokeWidth="3" />
    <ellipse cx="120" cy="45" rx="28" ry="9" fill="none" stroke="#7986cb" strokeWidth="2" />

    {/* Stars */}
    <circle cx="50" cy="25" r="5" fill="#FFD700" /> {/* Star 1 - will be missing */}
    <circle cx="90" cy="18" r="4" fill="#FFF59D" />
    <circle cx="140" cy="22" r="4" fill="#FFF59D" />
    <circle cx="30" cy="40" r="3" fill="#FFEB3B" />
    <circle cx="170" cy="35" r="3" fill="#FFEB3B" />

    {/* Moon */}
    <circle cx="155" cy="22" r="12" fill="#FFD54F" /> {/* Moon - color will change */}
    <circle cx="150" cy="20" r="10" fill="#1a237e" />

    {/* Cypress tree */}
    <path d="M25 60 Q30 35 35 60 Q30 38 25 60" fill="#1b5e20" /> {/* Full height */}
    <path d="M28 60 L28 95" stroke="#33691e" strokeWidth="3" />

    {/* Hills/village */}
    <path d="M0 100 Q50 80 100 95 Q150 85 200 100 L200 150 L0 150 Z" fill="#2e7d32" />

    {/* Village buildings */}
    <rect x="70" y="95" width="15" height="20" fill="#5d4037" />
    <polygon points="70,95 77.5,85 85,95" fill="#6d4c41" />
    <rect x="95" y="100" width="12" height="15" fill="#4e342e" />
    <polygon points="95,100 101,90 107,100" fill="#5d4037" />

    {/* Church with spire */}
    <rect x="120" y="90" width="18" height="25" fill="#5d4037" />
    <polygon points="120,90 129,70 138,90" fill="#6d4c41" /> {/* Spire - will be missing */}

    <rect x="150" y="98" width="14" height="17" fill="#4e342e" />
    <polygon points="150,98 157,88 164,98" fill="#5d4037" />
  </svg>
);

// Starry Night - Modified (with differences)
const StarryNightModified = () => (
  <svg viewBox="0 0 200 150" style={{ width: "100%", height: "100%" }}>
    {/* Night sky background */}
    <rect width="200" height="150" fill="#1a237e" />

    {/* Swirling sky patterns */}
    <ellipse cx="60" cy="30" rx="35" ry="12" fill="none" stroke="#5c6bc0" strokeWidth="3" />
    <ellipse cx="60" cy="30" rx="25" ry="8" fill="none" stroke="#7986cb" strokeWidth="2" />
    <ellipse cx="120" cy="45" rx="40" ry="14" fill="none" stroke="#5c6bc0" strokeWidth="3" />
    <ellipse cx="120" cy="45" rx="28" ry="9" fill="none" stroke="#7986cb" strokeWidth="2" />

    {/* Stars - DIFFERENCE: star1 missing */}
    {/* <circle cx="50" cy="25" r="5" fill="#FFD700" /> */}
    <circle cx="90" cy="18" r="4" fill="#FFF59D" />
    <circle cx="140" cy="22" r="4" fill="#FFF59D" />
    <circle cx="30" cy="40" r="3" fill="#FFEB3B" />
    <circle cx="170" cy="35" r="3" fill="#FFEB3B" />

    {/* Moon - DIFFERENCE: color changed to orange/red */}
    <circle cx="155" cy="22" r="12" fill="#FF7043" />
    <circle cx="150" cy="20" r="10" fill="#1a237e" />

    {/* Cypress tree - DIFFERENCE: shorter */}
    <path d="M25 70 Q30 50 35 70 Q30 52 25 70" fill="#1b5e20" />
    <path d="M28 70 L28 95" stroke="#33691e" strokeWidth="3" />

    {/* Hills/village */}
    <path d="M0 100 Q50 80 100 95 Q150 85 200 100 L200 150 L0 150 Z" fill="#2e7d32" />

    {/* Village buildings */}
    <rect x="70" y="95" width="15" height="20" fill="#5d4037" />
    <polygon points="70,95 77.5,85 85,95" fill="#6d4c41" />
    <rect x="95" y="100" width="12" height="15" fill="#4e342e" />
    <polygon points="95,100 101,90 107,100" fill="#5d4037" />

    {/* Church - DIFFERENCE: spire missing */}
    <rect x="120" y="90" width="18" height="25" fill="#5d4037" />
    {/* No spire polygon */}

    <rect x="150" y="98" width="14" height="17" fill="#4e342e" />
    <polygon points="150,98 157,88 164,98" fill="#5d4037" />
  </svg>
);

// The Scream - Original
const ScreamOriginal = () => (
  <svg viewBox="0 0 200 150" style={{ width: "100%", height: "100%" }}>
    {/* Fiery sky */}
    <rect width="200" height="60" fill="#ff7043" />
    <path d="M0 10 Q50 25 100 10 Q150 0 200 15" stroke="#ffab91" strokeWidth="4" fill="none" />
    <path d="M0 25 Q60 40 120 20 Q180 10 200 30" stroke="#ff8a65" strokeWidth="3" fill="none" />
    <path d="M0 40 Q40 50 100 35 Q160 25 200 45" stroke="#ffccbc" strokeWidth="3" fill="none" />

    {/* Swirl in sky */}
    <ellipse cx="60" cy="18" rx="25" ry="10" fill="none" stroke="#FFE082" strokeWidth="3" />

    {/* Water/fjord */}
    <rect y="60" width="200" height="90" fill="#1565c0" />
    <path d="M0 80 Q100 70 200 85" stroke="#1976d2" strokeWidth="2" fill="none" />
    <path d="M0 95 Q100 85 200 100" stroke="#1976d2" strokeWidth="2" fill="none" />

    {/* Bridge/railing */}
    <rect x="20" y="100" width="180" height="50" fill="#6d4c41" />
    <line x1="20" y1="115" x2="200" y2="115" stroke="#5d4037" strokeWidth="2" />

    {/* Railing posts */}
    <line x1="40" y1="100" x2="40" y2="130" stroke="#8d6e63" strokeWidth="3" />
    <line x1="70" y1="100" x2="70" y2="130" stroke="#8d6e63" strokeWidth="3" />
    <line x1="100" y1="100" x2="100" y2="130" stroke="#8d6e63" strokeWidth="3" />
    <line x1="130" y1="100" x2="130" y2="130" stroke="#8d6e63" strokeWidth="3" />
    <line x1="160" y1="100" x2="160" y2="130" stroke="#8d6e63" strokeWidth="3" />

    {/* Main figure */}
    <ellipse cx="100" cy="70" rx="12" ry="16" fill="#FFE0B2" />
    <ellipse cx="100" cy="82" rx="7" ry="10" fill="none" stroke="#5d4037" strokeWidth="2" /> {/* Open mouth */}
    <circle cx="94" cy="65" r="3" fill="#1a1a1a" />
    <circle cx="106" cy="65" r="3" fill="#1a1a1a" />
    <path d="M85 90 Q100 105 115 90" stroke="#5d4037" strokeWidth="8" fill="none" />

    {/* Background figure */}
    <ellipse cx="160" cy="75" rx="5" ry="8" fill="#4e342e" />
    <line x1="160" y1="83" x2="160" y2="100" stroke="#4e342e" strokeWidth="3" />
  </svg>
);

// The Scream - Modified
const ScreamModified = () => (
  <svg viewBox="0 0 200 150" style={{ width: "100%", height: "100%" }}>
    {/* Fiery sky */}
    <rect width="200" height="60" fill="#ff7043" />
    <path d="M0 10 Q50 25 100 10 Q150 0 200 15" stroke="#ffab91" strokeWidth="4" fill="none" />
    <path d="M0 25 Q60 40 120 20 Q180 10 200 30" stroke="#ff8a65" strokeWidth="3" fill="none" />
    <path d="M0 40 Q40 50 100 35 Q160 25 200 45" stroke="#ffccbc" strokeWidth="3" fill="none" />

    {/* Swirl in sky - DIFFERENCE: different color (green instead of yellow) */}
    <ellipse cx="60" cy="18" rx="25" ry="10" fill="none" stroke="#81C784" strokeWidth="3" />

    {/* Water/fjord - DIFFERENCE: color altered (purple) */}
    <rect y="60" width="200" height="90" fill="#7B1FA2" />
    <path d="M0 80 Q100 70 200 85" stroke="#8E24AA" strokeWidth="2" fill="none" />
    <path d="M0 95 Q100 85 200 100" stroke="#8E24AA" strokeWidth="2" fill="none" />

    {/* Bridge/railing */}
    <rect x="20" y="100" width="180" height="50" fill="#6d4c41" />
    <line x1="20" y1="115" x2="200" y2="115" stroke="#5d4037" strokeWidth="2" />

    {/* Railing posts - DIFFERENCE: one missing at x=40 */}
    {/* <line x1="40" y1="100" x2="40" y2="130" stroke="#8d6e63" strokeWidth="3" /> */}
    <line x1="70" y1="100" x2="70" y2="130" stroke="#8d6e63" strokeWidth="3" />
    <line x1="100" y1="100" x2="100" y2="130" stroke="#8d6e63" strokeWidth="3" />
    <line x1="130" y1="100" x2="130" y2="130" stroke="#8d6e63" strokeWidth="3" />
    <line x1="160" y1="100" x2="160" y2="130" stroke="#8d6e63" strokeWidth="3" />

    {/* Main figure - DIFFERENCE: mouth closed/different shape */}
    <ellipse cx="100" cy="70" rx="12" ry="16" fill="#FFE0B2" />
    <ellipse cx="100" cy="82" rx="5" ry="5" fill="none" stroke="#5d4037" strokeWidth="2" /> {/* Smaller, rounder mouth */}
    <circle cx="94" cy="65" r="3" fill="#1a1a1a" />
    <circle cx="106" cy="65" r="3" fill="#1a1a1a" />
    <path d="M85 90 Q100 105 115 90" stroke="#5d4037" strokeWidth="8" fill="none" />

    {/* Background figure - DIFFERENCE: missing */}
    {/* No figure at x=160 */}
  </svg>
);

// Kandinsky Composition - Original
const KandinskyOriginal = () => (
  <svg viewBox="0 0 200 150" style={{ width: "100%", height: "100%" }}>
    {/* Cream background */}
    <rect width="200" height="150" fill="#FFF8E1" />

    {/* Large circles */}
    <circle cx="45" cy="42" r="22" fill="#E53935" /> {/* Red circle - will change color */}
    <circle cx="150" cy="35" r="18" fill="#1E88E5" />
    <circle cx="120" cy="110" r="25" fill="#43A047" />

    {/* Triangles */}
    <polygon points="130,25 150,70 110,70" fill="#FDD835" /> {/* Will be rotated */}
    <polygon points="40,100 70,100 55,70" fill="#7B1FA2" />

    {/* Lines pattern */}
    <line x1="70" y1="90" x2="90" y2="110" stroke="#1a1a1a" strokeWidth="2" />
    <line x1="75" y1="90" x2="95" y2="110" stroke="#1a1a1a" strokeWidth="2" />
    <line x1="80" y1="90" x2="100" y2="110" stroke="#1a1a1a" strokeWidth="2" />

    {/* Small shapes */}
    <rect x="160" y="105" width="15" height="15" fill="#FF7043" /> {/* Square - will be missing */}
    <circle cx="170" cy="80" r="8" fill="#26A69A" />
    <rect x="20" y="110" width="12" height="12" fill="#5C6BC0" transform="rotate(45 26 116)" />

    {/* Curved lines */}
    <path d="M10 60 Q60 30 110 60" stroke="#F57C00" strokeWidth="3" fill="none" />
    <path d="M90 130 Q130 100 180 140" stroke="#D81B60" strokeWidth="2" fill="none" />

    {/* Small accents */}
    <circle cx="100" cy="40" r="4" fill="#1a1a1a" />
    <circle cx="30" cy="85" r="3" fill="#1a1a1a" />
    <circle cx="175" cy="55" r="5" fill="#FDD835" />
  </svg>
);

// Kandinsky Composition - Modified
const KandinskyModified = () => (
  <svg viewBox="0 0 200 150" style={{ width: "100%", height: "100%" }}>
    {/* Cream background */}
    <rect width="200" height="150" fill="#FFF8E1" />

    {/* Large circles - DIFFERENCE: first circle is blue instead of red */}
    <circle cx="45" cy="42" r="22" fill="#1E88E5" />
    <circle cx="150" cy="35" r="18" fill="#1E88E5" />
    <circle cx="120" cy="110" r="25" fill="#43A047" />

    {/* Triangles - DIFFERENCE: first triangle rotated/flipped */}
    <polygon points="130,70 150,25 110,25" fill="#FDD835" />
    <polygon points="40,100 70,100 55,70" fill="#7B1FA2" />

    {/* Lines pattern - DIFFERENCE: diagonal direction reversed */}
    <line x1="90" y1="90" x2="70" y2="110" stroke="#1a1a1a" strokeWidth="2" />
    <line x1="95" y1="90" x2="75" y2="110" stroke="#1a1a1a" strokeWidth="2" />
    <line x1="100" y1="90" x2="80" y2="110" stroke="#1a1a1a" strokeWidth="2" />

    {/* Small shapes - DIFFERENCE: square missing */}
    {/* <rect x="160" y="105" width="15" height="15" fill="#FF7043" /> */}
    <circle cx="170" cy="80" r="8" fill="#26A69A" />
    <rect x="20" y="110" width="12" height="12" fill="#5C6BC0" transform="rotate(45 26 116)" />

    {/* Curved lines */}
    <path d="M10 60 Q60 30 110 60" stroke="#F57C00" strokeWidth="3" fill="none" />
    <path d="M90 130 Q130 100 180 140" stroke="#D81B60" strokeWidth="2" fill="none" />

    {/* Small accents */}
    <circle cx="100" cy="40" r="4" fill="#1a1a1a" />
    <circle cx="30" cy="85" r="3" fill="#1a1a1a" />
    <circle cx="175" cy="55" r="5" fill="#FDD835" />
  </svg>
);

// Map painting index to components
const PAINTING_COMPONENTS = [
  { original: StarryNightOriginal, modified: StarryNightModified },
  { original: ScreamOriginal, modified: ScreamModified },
  { original: KandinskyOriginal, modified: KandinskyModified },
];

// ============================================
// COMPONENT
// ============================================

export default function ArtDetective({ onComplete }: ArtDetectiveProps) {
  const [phase, setPhase] = useState<GamePhase>("ready");
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [differences, setDifferences] = useState<Difference[]>([]);
  const [timer, setTimer] = useState(0);
  const [roundStartTime, setRoundStartTime] = useState(0);
  const [lastFound, setLastFound] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  // Initialize differences for current round
  const initRound = useCallback((roundIndex: number) => {
    const painting = PAINTINGS[roundIndex];
    setDifferences(
      painting.differences.map((d) => ({ ...d, found: false }))
    );
    setRoundStartTime(Date.now());
    setShowHint(false);
    setLastFound(null);
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (phase === "playing") {
      interval = setInterval(() => {
        setTimer(Math.floor((Date.now() - roundStartTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phase, roundStartTime]);

  // Check if round is complete
  useEffect(() => {
    if (phase === "playing" && differences.length > 0) {
      const allFound = differences.every((d) => d.found);
      if (allFound) {
        // Award time bonus
        const elapsed = Math.floor((Date.now() - roundStartTime) / 1000);
        if (elapsed <= TIME_BONUS_THRESHOLD) {
          setScore((prev) => prev + TIME_BONUS_POINTS);
        }
        setPhase("roundComplete");
      }
    }
  }, [differences, phase, roundStartTime]);

  // Start the game
  const startGame = () => {
    setPhase("playing");
    setCurrentRound(0);
    setScore(0);
    setTimer(0);
    initRound(0);
  };

  // Handle click/touch on painting
  const handlePaintingClick = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    _isModified: boolean
  ) => {
    if (phase !== "playing") return;

    const rect = e.currentTarget.getBoundingClientRect();

    // Get coordinates from either mouse or touch event
    let clientX: number, clientY: number;
    if ('touches' in e) {
      // Touch event - use first touch point
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      e.preventDefault(); // Prevent double-firing with click
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    // Use larger hit radius on touch devices for easier tapping
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const hitRadiusMultiplier = isTouchDevice ? 1.8 : 1.0;

    // Check if click is near any unfound difference
    setDifferences((prev) => {
      const newDiffs = [...prev];
      let foundAny = false;

      for (let i = 0; i < newDiffs.length; i++) {
        const diff = newDiffs[i];
        if (diff.found) continue;

        const distance = Math.sqrt(
          Math.pow(x - diff.x, 2) + Math.pow(y - diff.y, 2)
        );

        // Apply larger hit radius for touch
        const effectiveRadius = diff.radius * hitRadiusMultiplier;
        if (distance <= effectiveRadius) {
          newDiffs[i] = { ...diff, found: true };
          foundAny = true;
          setLastFound(diff.description);
          setScore((prev) => prev + POINTS_PER_DIFFERENCE);
          break;
        }
      }

      return foundAny ? newDiffs : prev;
    });
  };

  // Next round
  const nextRound = () => {
    if (currentRound < PAINTINGS.length - 1) {
      const nextIndex = currentRound + 1;
      setCurrentRound(nextIndex);
      initRound(nextIndex);
      setPhase("playing");
    } else {
      setPhase("finished");
      if (onComplete) {
        onComplete();
      }
    }
  };

  // Restart game
  const restartGame = () => {
    setPhase("ready");
    setCurrentRound(0);
    setScore(0);
    setTimer(0);
    setDifferences([]);
  };

  // Get current painting components
  const getCurrentPainting = () => PAINTING_COMPONENTS[currentRound];
  const painting = PAINTINGS[currentRound];

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Render found markers
  const renderFoundMarkers = () => {
    return differences
      .filter((d) => d.found)
      .map((d) => (
        <div
          key={d.id}
          style={{
            ...styles.foundMarker,
            left: `${d.x - d.radius}%`,
            top: `${d.y - d.radius}%`,
            width: `${d.radius * 2}%`,
            height: `${d.radius * 2}%`,
          }}
        />
      ));
  };

  // Ready screen
  if (phase === "ready") {
    return (
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <div style={{ fontSize: 48 }}>🔍🎨</div>
          <h2 style={styles.title}>Art Detective</h2>
          <p style={styles.subtitle}>
            Spot the differences between famous paintings!
          </p>
        </div>

        <div style={styles.infoCard}>
          <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
            Two versions of each painting are shown side by side. One is the original,
            the other has been subtly changed. Can you spot all the differences?
          </p>
          <p style={{ fontSize: 13, color: colors.textMuted }}>
            Click or tap on the differences you find in either image.
            Find them quickly for bonus points!
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button
            style={styles.button}
            onClick={startGame}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Start Investigation
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <p style={{ fontSize: 12, color: colors.textMuted }}>
            {PAINTINGS.length} mysterious paintings await...
          </p>
        </div>
      </div>
    );
  }

  // Game finished screen
  if (phase === "finished") {
    const maxScore = PAINTINGS.reduce(
      (sum, p) => sum + p.differences.length * POINTS_PER_DIFFERENCE + TIME_BONUS_POINTS,
      0
    );
    const percentage = Math.round((score / maxScore) * 100);

    return (
      <div style={styles.wrapper}>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={styles.celebration}>🎉🕵️🏆</div>
          <h2 style={{ ...styles.title, fontSize: 28, marginBottom: 12 }}>
            Case Closed!
          </h2>
          <p style={{ fontSize: 16, color: colors.text, marginBottom: 8 }}>
            You&apos;ve solved all the mysteries!
          </p>

          <div
            style={{
              ...styles.infoCard,
              background: `linear-gradient(145deg, ${colors.cardBg} 0%, #1A1A3E 100%)`,
              marginTop: 20,
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 800, color: colors.gold }}>
              {score} points
            </div>
            <p style={{ fontSize: 13, color: colors.textMuted, marginTop: 4 }}>
              {percentage}% of maximum score
            </p>
          </div>

          <div style={styles.infoCard}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
              Art Facts You Discovered:
            </h3>
            {PAINTINGS.map((p, i) => (
              <p
                key={i}
                style={{ fontSize: 12, color: colors.textMuted, marginBottom: 4 }}
              >
                <strong style={{ color: colors.primaryLight }}>{p.title}</strong> by {p.artist} ({p.year})
              </p>
            ))}
          </div>

          <div style={{ marginTop: 20 }}>
            <button
              style={styles.button}
              onClick={restartGame}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Round complete overlay
  if (phase === "roundComplete") {
    const isLastRound = currentRound >= PAINTINGS.length - 1;
    const elapsed = Math.floor((Date.now() - roundStartTime) / 1000);
    const gotTimeBonus = elapsed <= TIME_BONUS_THRESHOLD;

    return (
      <div style={styles.wrapper}>
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.celebration}>🎨✨</div>
            <h2 style={{ ...styles.title, marginBottom: 8 }}>
              All Differences Found!
            </h2>
            <p style={{ fontSize: 15, color: colors.text, marginBottom: 4 }}>
              {painting.title}
            </p>
            <p style={{ fontSize: 13, color: colors.textMuted, marginBottom: 16 }}>
              by {painting.artist}, {painting.year}
            </p>

            {gotTimeBonus && (
              <div
                style={{
                  background: colors.accentLight,
                  borderRadius: 8,
                  padding: "8px 12px",
                  marginBottom: 16,
                }}
              >
                <span style={{ color: colors.background, fontWeight: 700 }}>
                  +{TIME_BONUS_POINTS} Time Bonus!
                </span>
              </div>
            )}

            <p style={{ fontSize: 13, color: colors.textMuted, marginBottom: 20 }}>
              Time: {formatTime(elapsed)}
            </p>

            <button
              style={styles.button}
              onClick={nextRound}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {isLastRound ? "See Results" : "Next Painting"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing phase
  const PaintingOriginal = getCurrentPainting().original;
  const PaintingModified = getCurrentPainting().modified;
  const foundCount = differences.filter((d) => d.found).length;
  const totalDiffs = differences.length;

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={{ ...styles.title, fontSize: 20, margin: "4px 0" }}>
          🔍 Art Detective
        </h2>
      </div>

      {/* Stats bar */}
      <div style={styles.statsBar}>
        <div style={styles.statItem}>
          <div style={styles.statLabel}>Round</div>
          <div style={styles.statValue}>{currentRound + 1}/{PAINTINGS.length}</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statLabel}>Found</div>
          <div style={styles.statValue}>{foundCount}/{totalDiffs}</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statLabel}>Time</div>
          <div style={{ ...styles.statValue, color: timer > TIME_BONUS_THRESHOLD ? colors.textMuted : colors.success }}>
            {formatTime(timer)}
          </div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statLabel}>Score</div>
          <div style={{ ...styles.statValue, color: colors.gold }}>{score}</div>
        </div>
      </div>

      {/* Progress dots */}
      <div style={styles.progressBar}>
        {differences.map((d, i) => (
          <div key={i} style={styles.progressDot(d.found)} />
        ))}
      </div>

      {/* Painting info */}
      <div style={styles.infoCard}>
        <div style={styles.paintingTitle}>{painting.title}</div>
        <div style={styles.paintingArtist}>
          {painting.artist}, {painting.year}
        </div>
      </div>

      {/* Paintings side by side */}
      <div style={styles.paintingContainer}>
        <div style={styles.paintingFrame}>
          <div style={styles.paintingLabel}>ORIGINAL</div>
          <div
            style={styles.svgContainer}
            onClick={(e) => handlePaintingClick(e, false)}
            onTouchStart={(e) => handlePaintingClick(e, false)}
          >
            <div style={styles.svgWrapper}>
              <PaintingOriginal />
            </div>
            {renderFoundMarkers()}
          </div>
        </div>

        <div style={styles.paintingFrame}>
          <div style={styles.paintingLabel}>COPY</div>
          <div
            style={styles.svgContainer}
            onClick={(e) => handlePaintingClick(e, true)}
            onTouchStart={(e) => handlePaintingClick(e, true)}
          >
            <div style={styles.svgWrapper}>
              <PaintingModified />
            </div>
            {renderFoundMarkers()}
          </div>
        </div>
      </div>

      {/* Last found message */}
      {lastFound && (
        <div
          style={{
            textAlign: "center",
            padding: "8px 12px",
            background: "rgba(76, 175, 80, 0.2)",
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          <span style={{ color: colors.success, fontWeight: 600, fontSize: 13 }}>
            Found: {lastFound}
          </span>
        </div>
      )}

      {/* Hint button */}
      <div style={{ textAlign: "center" }}>
        <button
          style={styles.buttonSecondary}
          onClick={() => setShowHint(!showHint)}
        >
          {showHint ? "Hide Hints" : "Need a Hint?"}
        </button>

        {showHint && (
          <div style={styles.hintText}>
            Look for: missing objects, color changes, size differences, or rotated shapes.
            <br />
            Remaining: {differences.filter(d => !d.found).map(d => d.description).join(", ")}
          </div>
        )}
      </div>

      {/* Keyframe animation */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
