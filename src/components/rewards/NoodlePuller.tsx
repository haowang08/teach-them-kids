import { useState, useRef, useCallback, useEffect, useMemo } from 'react';

// ============================================
// TYPES
// ============================================

type GamePhase = 'intro' | 'selecting' | 'pulling' | 'folding' | 'complete' | 'failed';

interface NoodleType {
  id: string;
  name: string;
  origin: string;
  targetStrands: number;
  targetPulls: number;
  description: string;
  color: string;
  thickness: number;
  emoji: string;
  fact: string;
}

interface PullStats {
  totalPulls: number;
  perfectPulls: number;
  avgTechnique: number;
  timeElapsed: number;
}

// ============================================
// CONSTANTS
// ============================================

const NOODLE_TYPES: NoodleType[] = [
  {
    id: 'lamian',
    name: 'La Mian',
    origin: 'China',
    targetStrands: 64,
    targetPulls: 6,
    description: 'Traditional hand-pulled Chinese noodles. Masters can pull thousands of strands!',
    color: '#F5DEB3',
    thickness: 3,
    emoji: '🍜',
    fact: 'La Mian masters in Lanzhou can pull a single piece of dough into over 16,000 strands!'
  },
  {
    id: 'udon',
    name: 'Udon',
    origin: 'Japan',
    targetStrands: 8,
    targetPulls: 3,
    description: 'Thick, chewy Japanese wheat noodles. Fewer strands but thicker!',
    color: '#FFFEF0',
    thickness: 6,
    emoji: '🥢',
    fact: 'Traditional udon is made by kneading the dough with your feet while it\'s in a bag!'
  },
  {
    id: 'somen',
    name: 'Somen',
    origin: 'Japan',
    targetStrands: 128,
    targetPulls: 7,
    description: 'Very thin Japanese wheat noodles. Requires many pulls!',
    color: '#FFFFFF',
    thickness: 1.5,
    emoji: '🍝',
    fact: 'Somen noodles are so thin they\'re often eaten cold in summer, sliding down bamboo chutes!'
  },
  {
    id: 'biang',
    name: 'Biang Biang',
    origin: 'China (Shaanxi)',
    targetStrands: 4,
    targetPulls: 2,
    description: 'Wide belt-like noodles from Xi\'an. Just a few thick strands!',
    color: '#F0E68C',
    thickness: 12,
    emoji: '🥡',
    fact: 'The character for "biang" has 58 strokes - one of the most complex Chinese characters!'
  },
  {
    id: 'ramen',
    name: 'Ramen',
    origin: 'Japan/China',
    targetStrands: 32,
    targetPulls: 5,
    description: 'Alkaline wheat noodles with that distinctive yellow color and springy texture.',
    color: '#FFE4B5',
    thickness: 2.5,
    emoji: '🍜',
    fact: 'Ramen noodles get their yellow color and chewy texture from kansui, an alkaline mineral water!'
  }
];

const MIN_PULL_DISTANCE = 80;
const MAX_PULL_DISTANCE = 300;
const PERFECT_PULL_MIN = 0.7;
const PERFECT_PULL_MAX = 0.9;
const TIME_LIMIT = 60;

// ============================================
// SVG COMPONENTS
// ============================================

interface DoughSVGProps {
  stretchAmount: number;
  strands: number;
  noodleType: NoodleType;
  phase: GamePhase;
  isDragging: boolean;
}

function DoughSVG({ stretchAmount, strands, noodleType, phase, isDragging }: DoughSVGProps) {
  const width = 400;
  const height = 300;
  const centerY = height / 2;

  // Calculate stretched width based on stretch amount
  const baseWidth = 80;
  const stretchedWidth = baseWidth + stretchAmount * 2;
  const leftX = width / 2 - stretchedWidth / 2;
  const rightX = width / 2 + stretchedWidth / 2;

  // Generate noodle strands
  const noodleStrands = useMemo(() => {
    const strandsArray = [];
    const visibleStrands = Math.min(strands, 32); // Limit visual strands for performance
    const spacing = 60 / Math.max(visibleStrands, 1);
    const startY = centerY - (visibleStrands - 1) * spacing / 2;

    for (let i = 0; i < visibleStrands; i++) {
      const y = startY + i * spacing;
      // Add slight wave to make it look more natural
      const wave = Math.sin(i * 0.5 + stretchAmount * 0.01) * 3;
      strandsArray.push({
        id: i,
        y: y + wave,
        thickness: noodleType.thickness / Math.sqrt(strands / 2 + 1)
      });
    }
    return strandsArray;
  }, [strands, centerY, stretchAmount, noodleType.thickness]);

  // Dough ball appearance changes based on phase
  const isDoughBall = phase === 'pulling' || phase === 'selecting';
  const showStrands = stretchAmount > 20 || phase === 'folding';

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full max-w-[400px] mx-auto"
      style={{ touchAction: 'none' }}
    >
      {/* Background - wooden table */}
      <defs>
        <linearGradient id="tableGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DEB887" />
          <stop offset="50%" stopColor="#D2B48C" />
          <stop offset="100%" stopColor="#C4A06A" />
        </linearGradient>
        <linearGradient id="doughGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={noodleType.color} />
          <stop offset="100%" stopColor="#E8D5B0" />
        </linearGradient>
        <filter id="doughShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3" />
        </filter>
      </defs>

      <rect x="0" y="0" width={width} height={height} fill="url(#tableGrad)" />

      {/* Wood grain lines */}
      {[40, 80, 120, 160, 200, 240].map((y, i) => (
        <line
          key={i}
          x1="0"
          y1={y}
          x2={width}
          y2={y + 5}
          stroke="#C4A06A"
          strokeWidth="1"
          opacity="0.3"
        />
      ))}

      {/* Flour dust */}
      {[...Array(20)].map((_, i) => (
        <circle
          key={i}
          cx={50 + Math.random() * 300}
          cy={50 + Math.random() * 200}
          r={1 + Math.random() * 2}
          fill="white"
          opacity={0.3 + Math.random() * 0.3}
        />
      ))}

      {/* Left hand indicator */}
      {isDragging && (
        <g transform={`translate(${leftX - 30}, ${centerY - 20})`}>
          <text fontSize="30" fill="#333">👋</text>
        </g>
      )}

      {/* Right hand indicator */}
      {isDragging && (
        <g transform={`translate(${rightX + 5}, ${centerY - 20})`}>
          <text fontSize="30" fill="#333" style={{ transform: 'scaleX(-1)' }}>👋</text>
        </g>
      )}

      {/* Dough/Noodles */}
      <g filter="url(#doughShadow)">
        {isDoughBall && !showStrands ? (
          // Initial dough ball
          <ellipse
            cx={width / 2}
            cy={centerY}
            rx={baseWidth / 2 + stretchAmount / 4}
            ry={40 - stretchAmount / 10}
            fill="url(#doughGrad)"
            stroke="#D4B896"
            strokeWidth="2"
          />
        ) : (
          // Stretched noodles
          <>
            {/* Left dough blob */}
            <ellipse
              cx={leftX}
              cy={centerY}
              rx={20}
              ry={25 + strands * 0.5}
              fill="url(#doughGrad)"
              stroke="#D4B896"
              strokeWidth="1.5"
            />

            {/* Noodle strands */}
            {noodleStrands.map((strand) => (
              <line
                key={strand.id}
                x1={leftX}
                y1={strand.y}
                x2={rightX}
                y2={strand.y + Math.sin(strand.id) * 2}
                stroke={noodleType.color}
                strokeWidth={strand.thickness}
                strokeLinecap="round"
                style={{
                  filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.2))'
                }}
              />
            ))}

            {/* Right dough blob */}
            <ellipse
              cx={rightX}
              cy={centerY}
              rx={20}
              ry={25 + strands * 0.5}
              fill="url(#doughGrad)"
              stroke="#D4B896"
              strokeWidth="1.5"
            />
          </>
        )}
      </g>

      {/* Strand count indicator */}
      {strands > 1 && (
        <g>
          <rect
            x={width / 2 - 35}
            y={20}
            width={70}
            height={30}
            rx={15}
            fill="rgba(0,0,0,0.7)"
          />
          <text
            x={width / 2}
            y={42}
            textAnchor="middle"
            fontSize="16"
            fontWeight="bold"
            fill="white"
          >
            {strands} strands
          </text>
        </g>
      )}

      {/* Pull progress indicator */}
      {isDragging && stretchAmount > 0 && (
        <g>
          <rect
            x={width / 2 - 50}
            y={height - 50}
            width={100}
            height={10}
            rx={5}
            fill="rgba(0,0,0,0.3)"
          />
          <rect
            x={width / 2 - 50}
            y={height - 50}
            width={Math.min(100, (stretchAmount / MAX_PULL_DISTANCE) * 100)}
            height={10}
            rx={5}
            fill={
              stretchAmount / MAX_PULL_DISTANCE >= PERFECT_PULL_MIN &&
              stretchAmount / MAX_PULL_DISTANCE <= PERFECT_PULL_MAX
                ? '#4CAF50'
                : stretchAmount / MAX_PULL_DISTANCE > PERFECT_PULL_MAX
                ? '#f44336'
                : '#FFC107'
            }
          />
          {/* Perfect zone markers */}
          <line
            x1={width / 2 - 50 + PERFECT_PULL_MIN * 100}
            y1={height - 52}
            x2={width / 2 - 50 + PERFECT_PULL_MIN * 100}
            y2={height - 38}
            stroke="#4CAF50"
            strokeWidth="2"
          />
          <line
            x1={width / 2 - 50 + PERFECT_PULL_MAX * 100}
            y1={height - 52}
            x2={width / 2 - 50 + PERFECT_PULL_MAX * 100}
            y2={height - 38}
            stroke="#4CAF50"
            strokeWidth="2"
          />
          <text
            x={width / 2}
            y={height - 25}
            textAnchor="middle"
            fontSize="11"
            fill="#333"
          >
            {stretchAmount / MAX_PULL_DISTANCE >= PERFECT_PULL_MIN &&
            stretchAmount / MAX_PULL_DISTANCE <= PERFECT_PULL_MAX
              ? 'Perfect! Release now!'
              : stretchAmount / MAX_PULL_DISTANCE > PERFECT_PULL_MAX
              ? 'Too far! Noodles breaking!'
              : 'Keep pulling...'}
          </text>
        </g>
      )}

      {/* Folding animation hint */}
      {phase === 'folding' && (
        <g>
          <rect
            x={width / 2 - 80}
            y={height - 45}
            width={160}
            height={35}
            rx={8}
            fill="rgba(33, 150, 243, 0.9)"
          />
          <text
            x={width / 2}
            y={height - 22}
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill="white"
          >
            Click to Fold & Double!
          </text>
        </g>
      )}
    </svg>
  );
}

// ============================================
// EXPONENTIAL GROWTH VISUALIZATION
// ============================================

interface ExponentialChartProps {
  currentPulls: number;
  currentStrands: number;
  targetPulls: number;
}

function ExponentialChart({ currentPulls, currentStrands, targetPulls }: ExponentialChartProps) {
  const width = 280;
  const height = 120;
  const padding = { top: 20, right: 30, bottom: 30, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxPulls = targetPulls + 1;
  const maxStrands = Math.pow(2, targetPulls);

  // Generate points for the exponential curve
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= maxPulls; i++) {
      const x = padding.left + (i / maxPulls) * chartWidth;
      const strands = Math.pow(2, i);
      const y = padding.top + chartHeight - (strands / maxStrands) * chartHeight;
      pts.push({ x, y, pulls: i, strands });
    }
    return pts;
  }, [maxPulls, maxStrands, chartWidth, chartHeight, padding.left, padding.top]);

  // Create path for the line
  const linePath = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[280px]">
      {/* Background */}
      <rect x="0" y="0" width={width} height={height} fill="#f8f9fa" rx="8" />

      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
        <line
          key={i}
          x1={padding.left}
          y1={padding.top + chartHeight * (1 - t)}
          x2={padding.left + chartWidth}
          y2={padding.top + chartHeight * (1 - t)}
          stroke="#ddd"
          strokeWidth="1"
        />
      ))}

      {/* Exponential curve */}
      <path
        d={linePath}
        fill="none"
        stroke="#2196F3"
        strokeWidth="2"
        strokeDasharray={currentPulls < maxPulls ? "5,5" : "0"}
      />

      {/* Completed points */}
      {points.slice(0, currentPulls + 1).map((p, i) => (
        <g key={i}>
          <circle
            cx={p.x}
            cy={p.y}
            r={i === currentPulls ? 6 : 4}
            fill={i === currentPulls ? '#4CAF50' : '#2196F3'}
            stroke="white"
            strokeWidth="2"
          />
          {/* Label for current */}
          {i === currentPulls && (
            <text
              x={p.x}
              y={p.y - 10}
              textAnchor="middle"
              fontSize="10"
              fontWeight="bold"
              fill="#4CAF50"
            >
              {p.strands}
            </text>
          )}
        </g>
      ))}

      {/* X-axis label */}
      <text
        x={padding.left + chartWidth / 2}
        y={height - 5}
        textAnchor="middle"
        fontSize="10"
        fill="#666"
      >
        Pulls (2^n)
      </text>

      {/* Y-axis label */}
      <text
        x={10}
        y={padding.top + chartHeight / 2}
        textAnchor="middle"
        fontSize="10"
        fill="#666"
        transform={`rotate(-90, 10, ${padding.top + chartHeight / 2})`}
      >
        Strands
      </text>

      {/* Formula */}
      <text
        x={width - 5}
        y={15}
        textAnchor="end"
        fontSize="11"
        fontWeight="bold"
        fill="#2196F3"
      >
        2^{currentPulls} = {currentStrands}
      </text>
    </svg>
  );
}

// ============================================
// TIMER COMPONENT
// ============================================

interface TimerProps {
  timeRemaining: number;
  isActive: boolean;
}

function Timer({ timeRemaining, isActive }: TimerProps) {
  const percentage = (timeRemaining / TIME_LIMIT) * 100;
  const isLow = timeRemaining <= 10;

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-16 h-16">
        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="3"
          />
          {/* Progress circle */}
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="none"
            stroke={isLow ? '#f44336' : '#4CAF50'}
            strokeWidth="3"
            strokeDasharray={`${percentage} 100`}
            strokeLinecap="round"
            className={isActive && isLow ? 'animate-pulse' : ''}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-sm font-bold ${isLow ? 'text-red-600' : 'text-gray-700'}`}>
            {timeRemaining}s
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================
// SCORE DISPLAY
// ============================================

interface ScoreDisplayProps {
  stats: PullStats;
  noodleType: NoodleType | null;
}

function ScoreDisplay({ stats, noodleType }: ScoreDisplayProps) {
  const techniqueScore = Math.round(stats.avgTechnique * 100);
  const speedBonus = Math.max(0, TIME_LIMIT - stats.timeElapsed);
  const perfectBonus = stats.perfectPulls * 10;
  const totalScore = techniqueScore + speedBonus + perfectBonus;

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h4 className="font-bold text-gray-800 mb-3 text-center">Final Score</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Technique:</span>
          <span className="font-semibold">{techniqueScore} pts</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Speed Bonus:</span>
          <span className="font-semibold text-blue-600">+{speedBonus} pts</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Perfect Pulls ({stats.perfectPulls}):</span>
          <span className="font-semibold text-green-600">+{perfectBonus} pts</span>
        </div>
        <div className="border-t pt-2 flex justify-between text-base">
          <span className="font-bold text-gray-800">Total:</span>
          <span className="font-bold text-amber-600">{totalScore} pts</span>
        </div>
      </div>
      {noodleType && (
        <div className="mt-3 p-2 bg-amber-50 rounded-lg text-xs text-amber-800">
          <strong>Fun Fact:</strong> {noodleType.fact}
        </div>
      )}
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function NoodlePuller() {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [selectedNoodle, setSelectedNoodle] = useState<NoodleType | null>(null);
  const [strands, setStrands] = useState(1);
  const [pullCount, setPullCount] = useState(0);
  const [stretchAmount, setStretchAmount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(TIME_LIMIT);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [pullStats, setPullStats] = useState<PullStats>({
    totalPulls: 0,
    perfectPulls: 0,
    avgTechnique: 0,
    timeElapsed: 0
  });
  const [techniqueScores, setTechniqueScores] = useState<number[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(0);

  // Timer effect
  useEffect(() => {
    if (!isTimerActive || phase !== 'pulling' && phase !== 'folding') return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsTimerActive(false);
          setPhase('failed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerActive, phase]);

  // Check for completion
  useEffect(() => {
    if (selectedNoodle && strands >= selectedNoodle.targetStrands && phase !== 'complete') {
      setIsTimerActive(false);
      setPullStats(prev => ({
        ...prev,
        timeElapsed: TIME_LIMIT - timeRemaining,
        avgTechnique: techniqueScores.length > 0
          ? techniqueScores.reduce((a, b) => a + b, 0) / techniqueScores.length
          : 0
      }));
      setPhase('complete');
    }
  }, [strands, selectedNoodle, phase, timeRemaining, techniqueScores]);

  const handleSelectNoodle = useCallback((noodle: NoodleType) => {
    setSelectedNoodle(noodle);
    setStrands(1);
    setPullCount(0);
    setStretchAmount(0);
    setTimeRemaining(TIME_LIMIT);
    setTechniqueScores([]);
    setPullStats({
      totalPulls: 0,
      perfectPulls: 0,
      avgTechnique: 0,
      timeElapsed: 0
    });
    setPhase('pulling');
    setIsTimerActive(true);
    startTimeRef.current = Date.now();
  }, []);

  const handleDragStart = useCallback((clientX: number) => {
    if (phase !== 'pulling') return;
    setIsDragging(true);
    setDragStartX(clientX);
    setStretchAmount(0);
  }, [phase]);

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging) return;
    const delta = Math.abs(clientX - dragStartX);
    setStretchAmount(Math.min(delta, MAX_PULL_DISTANCE));
  }, [isDragging, dragStartX]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging || phase !== 'pulling') return;
    setIsDragging(false);

    const pullRatio = stretchAmount / MAX_PULL_DISTANCE;

    if (stretchAmount >= MIN_PULL_DISTANCE) {
      // Calculate technique score
      let technique = 0;
      if (pullRatio >= PERFECT_PULL_MIN && pullRatio <= PERFECT_PULL_MAX) {
        technique = 1.0;
        setPullStats(prev => ({ ...prev, perfectPulls: prev.perfectPulls + 1 }));
      } else if (pullRatio > PERFECT_PULL_MAX) {
        // Over-stretched: penalty
        technique = Math.max(0.3, 1 - (pullRatio - PERFECT_PULL_MAX) * 2);
      } else {
        // Under-stretched
        technique = pullRatio / PERFECT_PULL_MIN;
      }

      setTechniqueScores(prev => [...prev, technique]);
      setPullStats(prev => ({ ...prev, totalPulls: prev.totalPulls + 1 }));
      setPullCount(prev => prev + 1);

      // Transition to folding phase
      setPhase('folding');
    }

    setStretchAmount(0);
  }, [isDragging, phase, stretchAmount]);

  const handleFold = useCallback(() => {
    if (phase !== 'folding') return;

    // Double the strands using functional update
    setStrands(prev => prev * 2);
    setPhase('pulling');
  }, [phase]);

  const handleRestart = useCallback(() => {
    setPhase('selecting');
    setSelectedNoodle(null);
    setStrands(1);
    setPullCount(0);
    setStretchAmount(0);
    setTimeRemaining(TIME_LIMIT);
    setIsTimerActive(false);
    setTechniqueScores([]);
    setPullStats({
      totalPulls: 0,
      perfectPulls: 0,
      avgTechnique: 0,
      timeElapsed: 0
    });
  }, []);

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleDragStart(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleDragMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Click handler for folding
  const handleClick = () => {
    if (phase === 'folding') {
      handleFold();
    }
  };

  // ============================================
  // RENDER
  // ============================================

  const containerStyle = "w-full max-w-2xl mx-auto font-sans select-none";

  // --- INTRO SCREEN ---
  if (phase === 'intro') {
    return (
      <div className={containerStyle}>
        <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 border-4 border-amber-300 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-600 to-orange-500 py-3 px-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center drop-shadow-md">
              Noodle Puller
            </h2>
          </div>

          <div className="p-4 sm:p-6 text-center">
            <div className="text-6xl mb-4">🍜</div>
            <p className="text-base sm:text-lg text-amber-900 mb-4 leading-relaxed">
              Learn the ancient art of hand-pulling noodles!
            </p>
            <p className="text-sm sm:text-base text-amber-800 mb-4">
              <strong>How it works:</strong>
            </p>
            <ul className="text-sm text-amber-700 text-left max-w-md mx-auto space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">1.</span>
                Drag to stretch the dough (aim for the green zone!)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">2.</span>
                Click to fold - this doubles your strands!
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">3.</span>
                Repeat: 1 strand becomes 2, then 4, 8, 16...
              </li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 text-sm text-blue-800">
              <strong>Math Connection:</strong> This is exponential growth! Each pull doubles the strands: 2^n where n = number of pulls.
            </div>

            <button
              onClick={() => setPhase('selecting')}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600
                         text-white font-bold rounded-xl px-8 py-3 text-lg shadow-lg
                         transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Start Pulling!
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- NOODLE SELECTION SCREEN ---
  if (phase === 'selecting') {
    return (
      <div className={containerStyle}>
        <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 border-4 border-amber-300 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-600 to-orange-500 py-3 px-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center drop-shadow-md">
              Choose Your Noodle
            </h2>
          </div>

          <div className="p-4 sm:p-6">
            <p className="text-sm text-amber-800 text-center mb-4">
              Different noodles require different numbers of pulls!
            </p>

            <div className="grid gap-3">
              {NOODLE_TYPES.map((noodle) => (
                <button
                  key={noodle.id}
                  onClick={() => handleSelectNoodle(noodle)}
                  className="bg-white hover:bg-amber-50 rounded-xl p-3 sm:p-4 border-2 border-amber-200
                             hover:border-amber-400 transition-all cursor-pointer text-left
                             hover:shadow-md active:scale-[0.99]"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{noodle.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-amber-900">{noodle.name}</h3>
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                          {noodle.origin}
                        </span>
                      </div>
                      <p className="text-xs text-amber-700 mt-1">{noodle.description}</p>
                      <div className="flex gap-4 mt-2 text-xs">
                        <span className="text-blue-600 font-semibold">
                          Target: {noodle.targetStrands} strands
                        </span>
                        <span className="text-green-600 font-semibold">
                          Pulls needed: {noodle.targetPulls}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-800">
              <strong>Exponential Math:</strong> To get 64 strands, you need 2^6 = 64, so 6 pulls!
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- FAILED SCREEN ---
  if (phase === 'failed') {
    return (
      <div className={containerStyle}>
        <div className="rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-gray-300 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-600 to-gray-500 py-3 px-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center drop-shadow-md">
              Time's Up!
            </h2>
          </div>

          <div className="p-6 text-center">
            <div className="text-6xl mb-4">😅</div>
            <p className="text-lg text-gray-800 mb-2">
              You made <span className="font-bold text-amber-600">{strands} strands</span>
            </p>
            <p className="text-sm text-gray-600 mb-4">
              {selectedNoodle && `Target was ${selectedNoodle.targetStrands} strands for ${selectedNoodle.name}`}
            </p>
            <p className="text-sm text-gray-600 mb-6">
              Practice makes perfect! Real noodle masters train for years.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => selectedNoodle && handleSelectNoodle(selectedNoodle)}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl px-6 py-2
                           transition-all cursor-pointer"
              >
                Try Again
              </button>
              <button
                onClick={handleRestart}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-xl px-6 py-2
                           transition-all cursor-pointer"
              >
                Different Noodle
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- COMPLETE SCREEN ---
  if (phase === 'complete') {
    const stars = pullStats.avgTechnique >= 0.9 ? 3 : pullStats.avgTechnique >= 0.7 ? 2 : 1;

    return (
      <div className={containerStyle}>
        <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-100 border-4 border-amber-400 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 py-3 px-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center drop-shadow-md">
              {selectedNoodle?.name} Complete!
            </h2>
          </div>

          <div className="p-4 sm:p-6">
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">{selectedNoodle?.emoji}</div>
              <div className="text-3xl mb-2">
                {Array(stars).fill(null).map((_, i) => (
                  <span key={i} className="text-yellow-500">★</span>
                ))}
                {Array(3 - stars).fill(null).map((_, i) => (
                  <span key={i} className="text-gray-300">★</span>
                ))}
              </div>
              <p className="text-lg font-bold text-amber-900">
                {strands} strands in {pullStats.totalPulls} pulls!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <ScoreDisplay stats={pullStats} noodleType={selectedNoodle} />

              <div className="bg-white rounded-lg p-4 shadow-md">
                <h4 className="font-bold text-gray-800 mb-3 text-center">Exponential Growth</h4>
                <ExponentialChart
                  currentPulls={pullStats.totalPulls}
                  currentStrands={strands}
                  targetPulls={selectedNoodle?.targetPulls || 6}
                />
                <p className="text-xs text-center text-gray-600 mt-2">
                  2^{pullStats.totalPulls} = {strands} strands
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => selectedNoodle && handleSelectNoodle(selectedNoodle)}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl px-6 py-2
                           transition-all cursor-pointer"
              >
                Pull Again
              </button>
              <button
                onClick={handleRestart}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl px-6 py-2
                           transition-all cursor-pointer"
              >
                Try Different Noodle
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- PLAYING SCREEN (pulling / folding) ---
  return (
    <div className={containerStyle}>
      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 border-4 border-amber-300 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-500 py-2 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{selectedNoodle?.emoji}</span>
            <span className="text-white font-bold text-sm sm:text-base">{selectedNoodle?.name}</span>
          </div>
          <Timer timeRemaining={timeRemaining} isActive={isTimerActive} />
        </div>

        {/* Progress bar */}
        <div className="bg-white/50 px-4 py-2 border-b border-amber-200">
          <div className="flex justify-between text-xs text-amber-800 mb-1">
            <span>Progress: {strands} / {selectedNoodle?.targetStrands} strands</span>
            <span>Pulls: {pullCount} / {selectedNoodle?.targetPulls}</span>
          </div>
          <div className="h-3 bg-amber-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (strands / (selectedNoodle?.targetStrands || 1)) * 100)}%`
              }}
            />
          </div>
        </div>

        {/* Game area */}
        <div
          ref={containerRef}
          className="p-4 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleClick}
        >
          <DoughSVG
            stretchAmount={stretchAmount}
            strands={strands}
            noodleType={selectedNoodle!}
            phase={phase}
            isDragging={isDragging}
          />
        </div>

        {/* Instructions */}
        <div className="px-4 pb-4">
          <div className={`rounded-lg p-3 text-center text-sm font-medium transition-colors ${
            phase === 'pulling'
              ? 'bg-amber-100 text-amber-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {phase === 'pulling' ? (
              <span>Drag horizontally to stretch the dough! Aim for the green zone.</span>
            ) : (
              <span>Click anywhere to fold and double your strands!</span>
            )}
          </div>

          {/* Exponential growth chart */}
          <div className="mt-4 bg-white rounded-lg p-3 shadow-sm">
            <h4 className="text-xs font-bold text-gray-700 mb-2 text-center">Exponential Growth: 2^n</h4>
            <ExponentialChart
              currentPulls={pullCount}
              currentStrands={strands}
              targetPulls={selectedNoodle?.targetPulls || 6}
            />
          </div>

          {/* Stats row */}
          <div className="mt-3 flex justify-around text-center">
            <div>
              <div className="text-2xl font-bold text-amber-600">{strands}</div>
              <div className="text-xs text-gray-600">Strands</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{pullStats.perfectPulls}</div>
              <div className="text-xs text-gray-600">Perfect Pulls</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">2^{pullCount}</div>
              <div className="text-xs text-gray-600">Formula</div>
            </div>
          </div>
        </div>

        {/* Cancel button */}
        <div className="px-4 pb-4">
          <button
            onClick={handleRestart}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg py-2
                       transition-all cursor-pointer text-sm"
          >
            Choose Different Noodle
          </button>
        </div>
      </div>
    </div>
  );
}
