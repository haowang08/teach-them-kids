import { useState, useCallback, useEffect, useRef } from "react";

// ============================================
// TYPES
// ============================================

type GameMode = "explore" | "build" | "gallery" | "quiz";
type IllusionCategory = "impossible" | "motion" | "size" | "color";

interface IllusionType {
  id: string;
  name: string;
  category: IllusionCategory;
  description: string;
  explanation: string;
  funFact: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  illusionType: string;
}

interface BuildBlock {
  id: string;
  type: "line" | "circle" | "triangle" | "square";
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
}

// ============================================
// CONSTANTS
// ============================================

const ILLUSIONS: IllusionType[] = [
  {
    id: "penrose-triangle",
    name: "Penrose Triangle",
    category: "impossible",
    description: "A triangle that seems to exist in 3D but is actually impossible!",
    explanation: "Each corner looks correct, but following the edges reveals they connect in an impossible way. Our brain tries to interpret flat 2D images as 3D objects, leading to this paradox.",
    funFact: "The Penrose Triangle was first created by Swedish artist Oscar Reutersward in 1934, but made famous by mathematician Roger Penrose in 1958.",
  },
  {
    id: "impossible-cube",
    name: "Necker Cube",
    category: "impossible",
    description: "A cube that can be seen from two different angles at once!",
    explanation: "Your brain flips between two valid 3D interpretations of this 2D drawing. This is called 'bistable perception' - your brain can't decide which way the cube faces!",
    funFact: "Swiss crystallographer Louis Albert Necker discovered this illusion in 1832 while looking at crystal drawings.",
  },
  {
    id: "rotating-snakes",
    name: "Rotating Snakes",
    category: "motion",
    description: "These circles appear to rotate, but they're completely still!",
    explanation: "The illusion works because of high color contrast and the specific arrangement of colors. Your eye movements and the way your brain processes edges of different contrasts creates the motion effect.",
    funFact: "Created by Professor Akiyoshi Kitaoka in 2003, this is one of the most powerful motion illusions ever discovered!",
  },
  {
    id: "muller-lyer",
    name: "Muller-Lyer Arrows",
    category: "size",
    description: "Two lines of equal length that look completely different!",
    explanation: "The arrow endings trick your brain into perceiving depth. Arrows pointing outward suggest a corner coming toward you, making the line seem longer. Arrows pointing inward suggest a corner going away.",
    funFact: "Named after German psychiatrist Franz Carl Muller-Lyer who described it in 1889. Some cultures who don't live in buildings with corners are less fooled by this illusion!",
  },
  {
    id: "ebbinghaus",
    name: "Ebbinghaus Circles",
    category: "size",
    description: "Two identical circles that look different sizes!",
    explanation: "Our brain judges size by comparing objects to their surroundings. A circle surrounded by small circles looks bigger than the same circle surrounded by large circles.",
    funFact: "This illusion was discovered by German psychologist Hermann Ebbinghaus. It shows that we don't see absolute size - we always compare!",
  },
  {
    id: "hermann-grid",
    name: "Hermann Grid",
    category: "color",
    description: "Ghost dots appear at the intersections - but they're not really there!",
    explanation: "Your retina has cells that respond to edges. At intersections, there's more white around than at the lines, so your brain darkens the intersections. But when you look directly at one, it disappears!",
    funFact: "Discovered by physiologist Ludimar Hermann in 1870. It proves that what we see isn't always what's really there!",
  },
  {
    id: "cafe-wall",
    name: "Cafe Wall",
    category: "motion",
    description: "These perfectly parallel lines appear to be tilted!",
    explanation: "The offset between the black and white tiles and the gray mortar lines confuses your brain's edge detection. Different parts of each line appear to be at different heights.",
    funFact: "First noticed on the tiles of a cafe in Bristol, England in 1979. The baristas probably got dizzy looking at it!",
  },
  {
    id: "checker-shadow",
    name: "Checker Shadow",
    category: "color",
    description: "Square A and B are the exact same color!",
    explanation: "Your brain automatically adjusts for shadows. It 'knows' B is in shadow, so it compensates by making you perceive it as lighter than it really is. This helps us recognize objects in different lighting.",
    funFact: "Created by Edward Adelson at MIT. Cover the shadow with your finger - the squares still look different because your brain is so good at this trick!",
  },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "Which horizontal line is longer?",
    options: ["Top line (arrows pointing in)", "Bottom line (arrows pointing out)", "They are exactly the same length"],
    correctIndex: 2,
    explanation: "The Muller-Lyer illusion tricks us! Both lines are identical, but the arrow directions affect our depth perception.",
    illusionType: "muller-lyer",
  },
  {
    id: "q2",
    question: "Look at the orange circles. Which one is bigger?",
    options: ["The one surrounded by small circles", "The one surrounded by big circles", "They are the same size"],
    correctIndex: 2,
    explanation: "This is the Ebbinghaus illusion. We judge size by comparison, so the same circle looks different depending on what surrounds it.",
    illusionType: "ebbinghaus",
  },
  {
    id: "q3",
    question: "What do you see at the white line intersections?",
    options: ["Nothing special", "Faint gray dots", "Bright white spots"],
    correctIndex: 1,
    explanation: "The Hermann Grid illusion causes ghost gray dots to appear at intersections. Your retina's edge detection creates this phantom effect!",
    illusionType: "hermann-grid",
  },
  {
    id: "q4",
    question: "Are the horizontal lines in the cafe wall pattern straight?",
    options: ["No, they're tilted alternating left and right", "No, they're wavy", "Yes, they are perfectly parallel"],
    correctIndex: 2,
    explanation: "The Cafe Wall illusion! Despite looking tilted, every horizontal line is perfectly straight and parallel.",
    illusionType: "cafe-wall",
  },
  {
    id: "q5",
    question: "In the checker shadow illusion, are squares A and B the same color?",
    options: ["No, A is darker", "No, B is darker", "Yes, they are identical"],
    correctIndex: 2,
    explanation: "Your brain compensates for the shadow, making B appear lighter. But they're the exact same shade of gray!",
    illusionType: "checker-shadow",
  },
];

const GALLERY_ARTISTS = [
  { name: "M.C. Escher", years: "1898-1972", famous: "Impossible buildings, tessellations", contribution: "Master of impossible architecture and mathematical art" },
  { name: "Bridget Riley", years: "1931-present", famous: "Op Art movement", contribution: "Creates intense visual vibrations with simple patterns" },
  { name: "Victor Vasarely", years: "1906-1997", famous: "Father of Op Art", contribution: "Pioneered geometric abstract art that tricks the eye" },
  { name: "Salvador Dali", years: "1904-1989", famous: "Surrealist illusions", contribution: "Painted dreams with optical tricks like hidden images" },
];

const BLOCK_COLORS = [
  "#EF4444", "#F97316", "#EAB308", "#22C55E", "#06B6D4", "#3B82F6", "#8B5CF6", "#EC4899", "#1F2937"
];

// ============================================
// SVG ILLUSION COMPONENTS
// ============================================

const PenroseTriangle = ({ animate }: { animate: boolean }) => (
  <svg viewBox="0 0 200 180" className="w-full h-full">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="grad3" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#93C5FD" />
        <stop offset="100%" stopColor="#60A5FA" />
      </linearGradient>
    </defs>

    {/* Impossible triangle - drawn with overlapping sections */}
    <g className={animate ? "animate-pulse" : ""}>
      {/* Bottom bar */}
      <polygon points="30,150 85,150 85,130 60,130 120,40 100,40" fill="url(#grad1)" />
      {/* Right bar */}
      <polygon points="100,40 120,40 170,130 170,150 155,150 115,75" fill="url(#grad2)" />
      {/* Top-left bar - overlaps to create impossible effect */}
      <polygon points="30,150 30,130 100,20 120,20 60,115 45,115" fill="url(#grad3)" />
      {/* Override section for the impossible connection */}
      <polygon points="100,40 100,20 120,20 120,40" fill="url(#grad3)" />
      <polygon points="155,150 170,150 170,130 155,130" fill="url(#grad1)" />
    </g>
  </svg>
);

const NeckerCube = ({ flipped }: { flipped: boolean }) => {
  const frontFace = flipped ? "#93C5FD" : "#3B82F6";
  const backFace = flipped ? "#3B82F6" : "#93C5FD";

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Back face */}
      <polygon
        points="70,40 130,40 130,100 70,100"
        fill="none"
        stroke={backFace}
        strokeWidth="3"
        className="transition-all duration-500"
      />
      {/* Front face */}
      <polygon
        points="40,70 100,70 100,130 40,130"
        fill="none"
        stroke={frontFace}
        strokeWidth="3"
        className="transition-all duration-500"
      />
      {/* Connecting edges */}
      <line x1="40" y1="70" x2="70" y2="40" stroke="#6B7280" strokeWidth="2" />
      <line x1="100" y1="70" x2="130" y2="40" stroke="#6B7280" strokeWidth="2" />
      <line x1="100" y1="130" x2="130" y2="100" stroke="#6B7280" strokeWidth="2" />
      <line x1="40" y1="130" x2="70" y2="100" stroke="#6B7280" strokeWidth="2" />

      {/* Labels */}
      <text x="100" y="180" textAnchor="middle" fill="#9CA3AF" fontSize="12">
        Click to flip perspective
      </text>
    </svg>
  );
};

const RotatingSnakes = ({ speed }: { speed: number }) => {
  const segments = 12;
  const rings = 3;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {Array.from({ length: rings }).map((_, ringIndex) => {
        const radius = 30 + ringIndex * 25;
        return Array.from({ length: segments }).map((_, i) => {
          const angle = (i * 360 / segments) * Math.PI / 180;
          const x = 100 + Math.cos(angle) * radius;
          const y = 100 + Math.sin(angle) * radius;
          const colors = ["#000000", "#FBBF24", "#FFFFFF", "#3B82F6"];
          const colorIndex = (i + ringIndex) % 4;

          return (
            <circle
              key={`${ringIndex}-${i}`}
              cx={x}
              cy={y}
              r={8}
              fill={colors[colorIndex]}
              style={{
                animation: speed > 0 ? `pulse ${2 / speed}s ease-in-out infinite` : "none",
                animationDelay: `${i * 0.05}s`,
              }}
            />
          );
        });
      })}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </svg>
  );
};

const MullerLyer = ({ revealed }: { revealed: boolean }) => (
  <svg viewBox="0 0 300 150" className="w-full h-full">
    {/* Top line with inward arrows */}
    <g>
      <line x1="50" y1="50" x2="250" y2="50" stroke="#3B82F6" strokeWidth="4" />
      {/* Left arrow pointing in */}
      <line x1="50" y1="50" x2="80" y2="30" stroke="#3B82F6" strokeWidth="3" />
      <line x1="50" y1="50" x2="80" y2="70" stroke="#3B82F6" strokeWidth="3" />
      {/* Right arrow pointing in */}
      <line x1="250" y1="50" x2="220" y2="30" stroke="#3B82F6" strokeWidth="3" />
      <line x1="250" y1="50" x2="220" y2="70" stroke="#3B82F6" strokeWidth="3" />
    </g>

    {/* Bottom line with outward arrows */}
    <g>
      <line x1="50" y1="100" x2="250" y2="100" stroke="#EF4444" strokeWidth="4" />
      {/* Left arrow pointing out */}
      <line x1="50" y1="100" x2="20" y2="80" stroke="#EF4444" strokeWidth="3" />
      <line x1="50" y1="100" x2="20" y2="120" stroke="#EF4444" strokeWidth="3" />
      {/* Right arrow pointing out */}
      <line x1="250" y1="100" x2="280" y2="80" stroke="#EF4444" strokeWidth="3" />
      <line x1="250" y1="100" x2="280" y2="120" stroke="#EF4444" strokeWidth="3" />
    </g>

    {/* Reveal lines showing equality */}
    {revealed && (
      <g>
        <line x1="50" y1="40" x2="50" y2="110" stroke="#22C55E" strokeWidth="2" strokeDasharray="4" />
        <line x1="250" y1="40" x2="250" y2="110" stroke="#22C55E" strokeWidth="2" strokeDasharray="4" />
        <text x="150" y="140" textAnchor="middle" fill="#22C55E" fontSize="14" fontWeight="bold">
          Both lines are 200px!
        </text>
      </g>
    )}
  </svg>
);

const EbbinghausCircles = ({ revealed }: { revealed: boolean }) => (
  <svg viewBox="0 0 300 150" className="w-full h-full">
    {/* Left group - small surrounding circles */}
    <g>
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60) * Math.PI / 180;
        const x = 75 + Math.cos(angle) * 35;
        const y = 75 + Math.sin(angle) * 35;
        return <circle key={`small-${i}`} cx={x} cy={y} r="12" fill="#6B7280" />;
      })}
      <circle cx="75" cy="75" r="20" fill="#F97316" />
    </g>

    {/* Right group - large surrounding circles */}
    <g>
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60) * Math.PI / 180;
        const x = 225 + Math.cos(angle) * 45;
        const y = 75 + Math.sin(angle) * 45;
        return <circle key={`large-${i}`} cx={x} cy={y} r="25" fill="#6B7280" />;
      })}
      <circle cx="225" cy="75" r="20" fill="#F97316" />
    </g>

    {/* Reveal indicator */}
    {revealed && (
      <g>
        <line x1="75" y1="75" x2="225" y2="75" stroke="#22C55E" strokeWidth="2" strokeDasharray="4" />
        <text x="150" y="140" textAnchor="middle" fill="#22C55E" fontSize="12" fontWeight="bold">
          Both orange circles: r=20
        </text>
      </g>
    )}
  </svg>
);

const HermannGrid = ({ gridSize }: { gridSize: number }) => {
  const cellSize = 180 / gridSize;
  const lineWidth = cellSize * 0.15;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <rect width="200" height="200" fill="#FFFFFF" />
      {Array.from({ length: gridSize }).map((_, row) =>
        Array.from({ length: gridSize }).map((_, col) => (
          <rect
            key={`${row}-${col}`}
            x={10 + col * cellSize + lineWidth / 2}
            y={10 + row * cellSize + lineWidth / 2}
            width={cellSize - lineWidth}
            height={cellSize - lineWidth}
            fill="#1F2937"
          />
        ))
      )}
      <text x="100" y="195" textAnchor="middle" fill="#6B7280" fontSize="10">
        See ghost dots at intersections?
      </text>
    </svg>
  );
};

const CafeWall = ({ offset }: { offset: number }) => {
  const rows = 8;
  const cols = 10;
  const cellWidth = 20;
  const cellHeight = 18;

  return (
    <svg viewBox="0 0 220 160" className="w-full h-full">
      <rect width="220" height="160" fill="#9CA3AF" />
      {Array.from({ length: rows }).map((_, row) => (
        <g key={row}>
          {Array.from({ length: cols }).map((_, col) => {
            const isBlack = (col + row) % 2 === 0;
            const xOffset = (row % 2 === 0 ? offset : 0);
            return (
              <rect
                key={col}
                x={10 + col * cellWidth + xOffset}
                y={10 + row * cellHeight}
                width={cellWidth}
                height={cellHeight - 2}
                fill={isBlack ? "#1F2937" : "#FFFFFF"}
              />
            );
          })}
        </g>
      ))}
      <text x="110" y="155" textAnchor="middle" fill="#374151" fontSize="10">
        Lines are perfectly parallel!
      </text>
    </svg>
  );
};

const CheckerShadow = ({ revealed }: { revealed: boolean }) => (
  <svg viewBox="0 0 200 180" className="w-full h-full">
    <defs>
      <linearGradient id="shadow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(0,0,0,0)" />
        <stop offset="50%" stopColor="rgba(0,0,0,0.4)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
      </linearGradient>
    </defs>

    {/* Checkerboard */}
    {Array.from({ length: 6 }).map((_, row) =>
      Array.from({ length: 6 }).map((_, col) => {
        const isLight = (row + col) % 2 === 0;
        const baseColor = isLight ? "#E5E7EB" : "#6B7280";
        return (
          <rect
            key={`${row}-${col}`}
            x={20 + col * 26}
            y={20 + row * 22}
            width="26"
            height="22"
            fill={baseColor}
          />
        );
      })
    )}

    {/* Shadow overlay */}
    <ellipse cx="140" cy="90" rx="60" ry="70" fill="url(#shadow)" />

    {/* Square A marker */}
    <rect x="46" y="64" width="26" height="22" fill="none" stroke="#EF4444" strokeWidth="2" />
    <text x="59" y="80" textAnchor="middle" fill="#EF4444" fontSize="14" fontWeight="bold">A</text>

    {/* Square B marker */}
    <rect x="98" y="108" width="26" height="22" fill="none" stroke="#3B82F6" strokeWidth="2" />
    <text x="111" y="124" textAnchor="middle" fill="#3B82F6" fontSize="14" fontWeight="bold">B</text>

    {/* Reveal connector */}
    {revealed && (
      <g>
        <line x1="72" y1="75" x2="98" y2="119" stroke="#22C55E" strokeWidth="3" />
        <text x="100" y="165" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="bold">
          Same color: #787878
        </text>
      </g>
    )}
  </svg>
);

// ============================================
// QUIZ ILLUSION RENDERS
// ============================================

const QuizIllusion = ({ type }: { type: string }) => {
  switch (type) {
    case "muller-lyer":
      return <MullerLyer revealed={false} />;
    case "ebbinghaus":
      return <EbbinghausCircles revealed={false} />;
    case "hermann-grid":
      return <HermannGrid gridSize={4} />;
    case "cafe-wall":
      return <CafeWall offset={5} />;
    case "checker-shadow":
      return <CheckerShadow revealed={false} />;
    default:
      return null;
  }
};

// ============================================
// BUILD MODE CANVAS
// ============================================

const BuildCanvas = ({
  blocks,
  selectedBlock,
  onBlockSelect,
  onBlockMove
}: {
  blocks: BuildBlock[];
  selectedBlock: string | null;
  onBlockSelect: (id: string | null) => void;
  onBlockMove: (id: string, x: number, y: number) => void;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onBlockSelect(id);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedBlock || !svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 300;
    const y = ((e.clientY - rect.top) / rect.height) * 200;
    onBlockMove(selectedBlock, Math.max(20, Math.min(280, x)), Math.max(20, Math.min(180, y)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const renderBlock = (block: BuildBlock) => {
    const isSelected = block.id === selectedBlock;
    const transform = `translate(${block.x}, ${block.y}) rotate(${block.rotation}) scale(${block.scale})`;

    const commonProps = {
      transform,
      fill: block.color,
      stroke: isSelected ? "#FBBF24" : "none",
      strokeWidth: isSelected ? 2 : 0,
      style: { cursor: "move" },
      onMouseDown: (e: React.MouseEvent) => handleMouseDown(block.id, e),
    };

    switch (block.type) {
      case "line":
        return <rect {...commonProps} x="-30" y="-3" width="60" height="6" rx="2" />;
      case "circle":
        return <circle {...commonProps} r="20" />;
      case "triangle":
        return <polygon {...commonProps} points="0,-20 -17,15 17,15" />;
      case "square":
        return <rect {...commonProps} x="-15" y="-15" width="30" height="30" />;
      default:
        return null;
    }
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 300 200"
      className="w-full h-full bg-gray-800 rounded-lg cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={() => onBlockSelect(null)}
    >
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="300" height="200" fill="url(#grid)" />
      {blocks.map(block => (
        <g key={block.id}>{renderBlock(block)}</g>
      ))}
      {blocks.length === 0 && (
        <text x="150" y="100" textAnchor="middle" fill="#6B7280" fontSize="14">
          Add shapes to create your illusion!
        </text>
      )}
    </svg>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function IllusionBuilder() {
  const [mode, setMode] = useState<GameMode>("explore");
  const [selectedIllusion, setSelectedIllusion] = useState<IllusionType>(ILLUSIONS[0]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);

  // Explore mode parameters
  const [cubeFlipped, setCubeFlipped] = useState(false);
  const [motionSpeed, setMotionSpeed] = useState(1);
  const [gridSize, setGridSize] = useState(4);
  const [cafeOffset, setCafeOffset] = useState(5);

  // Quiz mode
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Build mode
  const [blocks, setBlocks] = useState<BuildBlock[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [nextBlockId, setNextBlockId] = useState(1);

  // Responsive
  const [_isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsSmall(window.innerWidth < 640);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const handleQuizAnswer = useCallback((answerIndex: number) => {
    if (quizAnswered) return;

    const question = QUIZ_QUESTIONS[quizIndex];
    const isCorrect = answerIndex === question.correctIndex;

    setQuizAnswered(true);
    setQuizCorrect(isCorrect);

    if (isCorrect) {
      setScore(prev => prev + 100);
    }
  }, [quizIndex, quizAnswered]);

  const nextQuestion = useCallback(() => {
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex(prev => prev + 1);
      setQuizAnswered(false);
      setQuizCorrect(false);
    } else {
      setQuizCompleted(true);
    }
  }, [quizIndex]);

  const restartQuiz = useCallback(() => {
    setQuizIndex(0);
    setQuizAnswered(false);
    setQuizCorrect(false);
    setQuizCompleted(false);
    setScore(0);
  }, []);

  const addBlock = useCallback((type: BuildBlock["type"]) => {
    const newBlock: BuildBlock = {
      id: `block-${nextBlockId}`,
      type,
      x: 150,
      y: 100,
      rotation: 0,
      scale: 1,
      color: BLOCK_COLORS[Math.floor(Math.random() * BLOCK_COLORS.length)],
    };
    setBlocks(prev => [...prev, newBlock]);
    setSelectedBlock(newBlock.id);
    setNextBlockId(prev => prev + 1);
    setScore(prev => prev + 10);
  }, [nextBlockId]);

  const updateBlock = useCallback((property: "rotation" | "scale" | "color", value: number | string) => {
    if (!selectedBlock) return;
    setBlocks(prev => prev.map(b =>
      b.id === selectedBlock ? { ...b, [property]: value } : b
    ));
  }, [selectedBlock]);

  const moveBlock = useCallback((id: string, x: number, y: number) => {
    setBlocks(prev => prev.map(b =>
      b.id === id ? { ...b, x, y } : b
    ));
  }, []);

  const deleteBlock = useCallback(() => {
    if (!selectedBlock) return;
    setBlocks(prev => prev.filter(b => b.id !== selectedBlock));
    setSelectedBlock(null);
  }, [selectedBlock]);

  const clearCanvas = useCallback(() => {
    setBlocks([]);
    setSelectedBlock(null);
  }, []);

  const renderIllusion = () => {
    switch (selectedIllusion.id) {
      case "penrose-triangle":
        return <PenroseTriangle animate={showExplanation} />;
      case "impossible-cube":
        return (
          <div onClick={() => setCubeFlipped(f => !f)} className="cursor-pointer">
            <NeckerCube flipped={cubeFlipped} />
          </div>
        );
      case "rotating-snakes":
        return <RotatingSnakes speed={motionSpeed} />;
      case "muller-lyer":
        return <MullerLyer revealed={revealed} />;
      case "ebbinghaus":
        return <EbbinghausCircles revealed={revealed} />;
      case "hermann-grid":
        return <HermannGrid gridSize={gridSize} />;
      case "cafe-wall":
        return <CafeWall offset={cafeOffset} />;
      case "checker-shadow":
        return <CheckerShadow revealed={revealed} />;
      default:
        return null;
    }
  };

  const renderControls = () => {
    switch (selectedIllusion.id) {
      case "rotating-snakes":
        return (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-300">Speed:</span>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={motionSpeed}
              onChange={(e) => setMotionSpeed(parseFloat(e.target.value))}
              className="flex-1 accent-purple-500"
            />
            <span className="text-sm text-purple-300 w-8">{motionSpeed.toFixed(1)}x</span>
          </div>
        );
      case "hermann-grid":
        return (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-300">Grid Size:</span>
            <input
              type="range"
              min="3"
              max="6"
              step="1"
              value={gridSize}
              onChange={(e) => setGridSize(parseInt(e.target.value))}
              className="flex-1 accent-purple-500"
            />
            <span className="text-sm text-purple-300 w-8">{gridSize}x{gridSize}</span>
          </div>
        );
      case "cafe-wall":
        return (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-300">Offset:</span>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={cafeOffset}
              onChange={(e) => setCafeOffset(parseInt(e.target.value))}
              className="flex-1 accent-purple-500"
            />
            <span className="text-sm text-purple-300 w-8">{cafeOffset}px</span>
          </div>
        );
      case "muller-lyer":
      case "ebbinghaus":
      case "checker-shadow":
        return (
          <button
            onClick={() => setRevealed(r => !r)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              revealed
                ? "bg-green-600 text-white"
                : "bg-purple-600 hover:bg-purple-500 text-white"
            }`}
          >
            {revealed ? "Hide Truth" : "Reveal Truth"}
          </button>
        );
      default:
        return null;
    }
  };

  const currentBlock = blocks.find(b => b.id === selectedBlock);

  return (
    <div className="rounded-xl bg-gradient-to-br from-gray-900 via-purple-950 to-indigo-950 p-4 sm:p-6 text-white max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
          Illusion Builder
        </h2>
        <p className="text-sm text-gray-300 mt-1">
          Discover how your eyes can be tricked!
        </p>
        {score > 0 && (
          <div className="mt-2 inline-block bg-yellow-500/20 border border-yellow-500/40 rounded-full px-4 py-1">
            <span className="text-yellow-300 font-bold">Score: {score}</span>
          </div>
        )}
      </div>

      {/* Mode Tabs */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {[
          { id: "explore", label: "Explore", icon: "🔍" },
          { id: "build", label: "Build", icon: "🎨" },
          { id: "gallery", label: "Gallery", icon: "🖼️" },
          { id: "quiz", label: "Quiz", icon: "❓" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setMode(tab.id as GameMode);
              setShowExplanation(false);
              setRevealed(false);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              mode === tab.id
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            <span className="mr-1">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* EXPLORE MODE */}
      {mode === "explore" && (
        <>
          {/* Illusion Type Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {ILLUSIONS.map((illusion) => (
              <button
                key={illusion.id}
                onClick={() => {
                  setSelectedIllusion(illusion);
                  setShowExplanation(false);
                  setRevealed(false);
                  setScore(prev => prev + 5);
                }}
                className={`p-2 rounded-lg text-xs font-medium transition-all ${
                  selectedIllusion.id === illusion.id
                    ? "bg-purple-600 text-white ring-2 ring-purple-400"
                    : "bg-gray-800/60 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {illusion.name}
              </button>
            ))}
          </div>

          {/* Illusion Display */}
          <div className="bg-gray-800/60 rounded-xl p-4 mb-4">
            <div className="aspect-[4/3] sm:aspect-[16/9] max-h-64 mx-auto mb-4">
              {renderIllusion()}
            </div>

            {/* Controls */}
            <div className="max-w-md mx-auto">
              {renderControls()}
            </div>
          </div>

          {/* Description */}
          <div className="bg-purple-900/40 border border-purple-700/30 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-bold text-purple-200 mb-2">{selectedIllusion.name}</h3>
            <p className="text-sm text-gray-200">{selectedIllusion.description}</p>

            <button
              onClick={() => {
                setShowExplanation(s => !s);
                if (!showExplanation) setScore(prev => prev + 15);
              }}
              className="mt-3 text-sm text-purple-300 hover:text-purple-200 underline"
            >
              {showExplanation ? "Hide explanation" : "How does it work?"}
            </button>

            {showExplanation && (
              <div className="mt-3 p-3 bg-indigo-900/40 rounded-lg border border-indigo-700/30">
                <h4 className="text-sm font-bold text-indigo-300 mb-1">The Science:</h4>
                <p className="text-sm text-gray-200 mb-3">{selectedIllusion.explanation}</p>
                <h4 className="text-sm font-bold text-yellow-300 mb-1">Fun Fact:</h4>
                <p className="text-sm text-gray-200">{selectedIllusion.funFact}</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* BUILD MODE */}
      {mode === "build" && (
        <>
          <div className="bg-gray-800/60 rounded-xl p-4 mb-4">
            <div className="aspect-[3/2] mb-4">
              <BuildCanvas
                blocks={blocks}
                selectedBlock={selectedBlock}
                onBlockSelect={setSelectedBlock}
                onBlockMove={moveBlock}
              />
            </div>

            {/* Shape Palette */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              <span className="text-sm text-gray-400 w-full text-center mb-1">Add Shapes:</span>
              {[
                { type: "line" as const, label: "Line", icon: "―" },
                { type: "circle" as const, label: "Circle", icon: "○" },
                { type: "triangle" as const, label: "Triangle", icon: "△" },
                { type: "square" as const, label: "Square", icon: "□" },
              ].map((shape) => (
                <button
                  key={shape.type}
                  onClick={() => addBlock(shape.type)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-all"
                >
                  <span className="mr-1">{shape.icon}</span>
                  {shape.label}
                </button>
              ))}
            </div>

            {/* Block Controls */}
            {currentBlock && (
              <div className="bg-gray-700/60 rounded-lg p-3 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-300 w-16">Rotation:</span>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={currentBlock.rotation}
                    onChange={(e) => updateBlock("rotation", parseInt(e.target.value))}
                    className="flex-1 accent-purple-500"
                  />
                  <span className="text-sm text-purple-300 w-12">{currentBlock.rotation}°</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-300 w-16">Scale:</span>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={currentBlock.scale}
                    onChange={(e) => updateBlock("scale", parseFloat(e.target.value))}
                    className="flex-1 accent-purple-500"
                  />
                  <span className="text-sm text-purple-300 w-12">{currentBlock.scale.toFixed(1)}x</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-300 w-16">Color:</span>
                  <div className="flex gap-1 flex-wrap">
                    {BLOCK_COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => updateBlock("color", color)}
                        className={`w-6 h-6 rounded-full transition-all ${
                          currentBlock.color === color ? "ring-2 ring-white ring-offset-2 ring-offset-gray-800" : ""
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <button
                  onClick={deleteBlock}
                  className="w-full py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-medium"
                >
                  Delete Shape
                </button>
              </div>
            )}

            {blocks.length > 0 && (
              <button
                onClick={clearCanvas}
                className="mt-3 w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 font-medium"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="bg-indigo-900/40 border border-indigo-700/30 rounded-lg p-4">
            <h4 className="text-sm font-bold text-indigo-300 mb-2">Tips for Creating Illusions:</h4>
            <ul className="text-sm text-gray-200 space-y-1 list-disc list-inside">
              <li>Use repeating patterns to create motion effects</li>
              <li>Overlapping shapes can create impossible objects</li>
              <li>High contrast colors make effects stronger</li>
              <li>Try rotating shapes at different angles</li>
            </ul>
          </div>
        </>
      )}

      {/* GALLERY MODE */}
      {mode === "gallery" && (
        <>
          <div className="bg-gray-800/60 rounded-xl p-4 mb-4">
            <h3 className="text-lg font-bold text-center text-purple-200 mb-4">Masters of Optical Illusion</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              {GALLERY_ARTISTS.map((artist, _index) => (
                <div
                  key={artist.name}
                  className="bg-gray-700/60 rounded-lg p-4 border border-gray-600/30"
                  onClick={() => setScore(prev => prev + 10)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold">
                      {artist.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white">{artist.name}</h4>
                      <p className="text-xs text-gray-400">{artist.years}</p>
                      <p className="text-sm text-purple-300 mt-1">{artist.famous}</p>
                      <p className="text-xs text-gray-300 mt-2">{artist.contribution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-purple-900/40 border border-purple-700/30 rounded-lg p-4">
            <h4 className="text-sm font-bold text-purple-300 mb-2">Types of Optical Illusions:</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-800/60 rounded-lg p-3">
                <span className="font-bold text-red-300">Impossible Objects</span>
                <p className="text-xs text-gray-300 mt-1">Shapes that look 3D but couldn't exist in reality</p>
              </div>
              <div className="bg-gray-800/60 rounded-lg p-3">
                <span className="font-bold text-blue-300">Motion Illusions</span>
                <p className="text-xs text-gray-300 mt-1">Still images that appear to move</p>
              </div>
              <div className="bg-gray-800/60 rounded-lg p-3">
                <span className="font-bold text-green-300">Size Illusions</span>
                <p className="text-xs text-gray-300 mt-1">Objects that appear different sizes than they are</p>
              </div>
              <div className="bg-gray-800/60 rounded-lg p-3">
                <span className="font-bold text-yellow-300">Color Illusions</span>
                <p className="text-xs text-gray-300 mt-1">Colors that appear different based on surroundings</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* QUIZ MODE */}
      {mode === "quiz" && (
        <>
          {!quizCompleted ? (
            <>
              <div className="bg-gray-800/60 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-400">
                    Question {quizIndex + 1} of {QUIZ_QUESTIONS.length}
                  </span>
                  <span className="text-sm text-yellow-300 font-bold">
                    Score: {score}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2 bg-gray-700 rounded-full mb-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                    style={{ width: `${((quizIndex + (quizAnswered ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>

                {/* Illusion */}
                <div className="aspect-[3/2] max-h-48 mx-auto mb-4">
                  <QuizIllusion type={QUIZ_QUESTIONS[quizIndex].illusionType} />
                </div>

                {/* Question */}
                <h3 className="text-lg font-bold text-white text-center mb-4">
                  {QUIZ_QUESTIONS[quizIndex].question}
                </h3>

                {/* Options */}
                <div className="space-y-2">
                  {QUIZ_QUESTIONS[quizIndex].options.map((option, index) => {
                    const isCorrect = index === QUIZ_QUESTIONS[quizIndex].correctIndex;
                    let buttonClass = "bg-gray-700 hover:bg-gray-600 text-white";
                    if (quizAnswered) {
                      if (isCorrect) {
                        buttonClass = "bg-green-600 text-white";
                      } else if (!isCorrect && !quizCorrect) {
                        buttonClass = "bg-red-600/50 text-gray-300";
                      } else {
                        buttonClass = "bg-gray-700/50 text-gray-400";
                      }
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        disabled={quizAnswered}
                        className={`w-full p-3 rounded-lg text-left font-medium transition-all ${buttonClass}`}
                      >
                        <span className="mr-2 inline-block w-6 h-6 rounded-full bg-gray-600 text-center text-sm leading-6">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback */}
                {quizAnswered && (
                  <div className={`mt-4 p-4 rounded-lg ${quizCorrect ? "bg-green-900/40 border border-green-700/30" : "bg-red-900/40 border border-red-700/30"}`}>
                    <p className={`font-bold mb-2 ${quizCorrect ? "text-green-300" : "text-red-300"}`}>
                      {quizCorrect ? "Correct! +100 points" : "Not quite!"}
                    </p>
                    <p className="text-sm text-gray-200">
                      {QUIZ_QUESTIONS[quizIndex].explanation}
                    </p>
                    <button
                      onClick={nextQuestion}
                      className="mt-3 px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white font-semibold"
                    >
                      {quizIndex < QUIZ_QUESTIONS.length - 1 ? "Next Question" : "See Results"}
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-gray-800/60 rounded-xl p-6 text-center">
              <div className="text-5xl mb-4">
                {score >= 400 ? "🏆" : score >= 200 ? "🌟" : "👁️"}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h3>
              <p className="text-4xl font-bold text-yellow-300 mb-4">{score} points</p>
              <p className="text-gray-300 mb-6">
                {score >= 400
                  ? "Amazing! You're an illusion expert!"
                  : score >= 200
                    ? "Great job! You understand how illusions work."
                    : "Keep exploring - illusions are tricky!"}
              </p>
              <button
                onClick={restartQuiz}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl text-white font-bold shadow-lg"
              >
                Try Again
              </button>
            </div>
          )}
        </>
      )}

      {/* Footer tip */}
      <div className="mt-4 text-center text-xs text-gray-500">
        Optical illusions work because your brain makes shortcuts when interpreting what you see!
      </div>
    </div>
  );
}
