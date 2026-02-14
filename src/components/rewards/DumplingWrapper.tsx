import { useState, useCallback, useEffect, useRef } from 'react';

// ============================================
// TYPES
// ============================================

type GamePhase = 'menu' | 'learning' | 'folding' | 'rating' | 'challenge' | 'complete';

type DumplingType = 'jiaozi' | 'ravioli' | 'pierogi' | 'gyoza';

interface FoldStep {
  instruction: string;
  targetZone: { x: number; y: number; width: number; height: number };
  foldType: 'center' | 'left' | 'right' | 'crimp' | 'seal';
}

interface DumplingStyle {
  id: DumplingType;
  name: string;
  origin: string;
  flag: string;
  emoji: string;
  color: string;
  accentColor: string;
  filling: string;
  steps: FoldStep[];
  funFact: string;
  history: string;
}

interface FoldProgress {
  stepIndex: number;
  completed: boolean[];
  quality: number; // 0-100
}

interface DumplingStats {
  jiaozi: number;
  ravioli: number;
  pierogi: number;
  gyoza: number;
}

// ============================================
// CONSTANTS
// ============================================

const DUMPLING_STYLES: DumplingStyle[] = [
  {
    id: 'jiaozi',
    name: 'Jiaozi',
    origin: 'China',
    flag: '\u{1F1E8}\u{1F1F3}',
    emoji: '\u{1F95F}',
    color: '#f5e6d3',
    accentColor: '#d4a574',
    filling: 'Pork & Cabbage',
    steps: [
      { instruction: 'Place filling in the center of the wrapper', targetZone: { x: 140, y: 120, width: 80, height: 60 }, foldType: 'center' },
      { instruction: 'Fold the wrapper in half to form a half-moon', targetZone: { x: 100, y: 80, width: 160, height: 40 }, foldType: 'center' },
      { instruction: 'Pinch the left edge to start sealing', targetZone: { x: 80, y: 100, width: 40, height: 60 }, foldType: 'left' },
      { instruction: 'Create pleats along the top edge', targetZone: { x: 120, y: 80, width: 120, height: 30 }, foldType: 'crimp' },
      { instruction: 'Pinch the right edge to finish sealing', targetZone: { x: 240, y: 100, width: 40, height: 60 }, foldType: 'right' },
    ],
    funFact: 'Jiaozi are traditionally eaten during Chinese New Year because their shape resembles ancient Chinese gold ingots, symbolizing wealth and prosperity!',
    history: 'Jiaozi were invented over 1,800 years ago by Zhang Zhongjing, a famous Chinese doctor who used them to deliver medicine to patients with frostbitten ears.',
  },
  {
    id: 'ravioli',
    name: 'Ravioli',
    origin: 'Italy',
    flag: '\u{1F1EE}\u{1F1F9}',
    emoji: '\u{1F35D}',
    color: '#fff4d6',
    accentColor: '#e8c170',
    filling: 'Ricotta & Spinach',
    steps: [
      { instruction: 'Place a spoonful of filling in the center', targetZone: { x: 140, y: 120, width: 80, height: 60 }, foldType: 'center' },
      { instruction: 'Fold corner to corner to make a triangle', targetZone: { x: 100, y: 60, width: 160, height: 80 }, foldType: 'center' },
      { instruction: 'Press edges firmly to seal the left side', targetZone: { x: 80, y: 80, width: 50, height: 80 }, foldType: 'left' },
      { instruction: 'Press edges firmly to seal the right side', targetZone: { x: 230, y: 80, width: 50, height: 80 }, foldType: 'right' },
      { instruction: 'Use a fork to crimp the edges beautifully', targetZone: { x: 90, y: 70, width: 180, height: 30 }, foldType: 'seal' },
    ],
    funFact: 'The word "ravioli" comes from the Italian word "riavvolgere" meaning "to wrap"! Ancient Romans ate similar stuffed pasta nearly 2,000 years ago.',
    history: 'Ravioli first appeared in 14th century Italian manuscripts. In Genoa, they were so beloved that the city even created laws regulating their ingredients!',
  },
  {
    id: 'pierogi',
    name: 'Pierogi',
    origin: 'Poland',
    flag: '\u{1F1F5}\u{1F1F1}',
    emoji: '\u{1F95F}',
    color: '#f0e4d7',
    accentColor: '#c9a66b',
    filling: 'Potato & Cheese',
    steps: [
      { instruction: 'Add potato and cheese filling to center', targetZone: { x: 140, y: 120, width: 80, height: 60 }, foldType: 'center' },
      { instruction: 'Fold the dough in half over the filling', targetZone: { x: 100, y: 90, width: 160, height: 50 }, foldType: 'center' },
      { instruction: 'Press the left edge together firmly', targetZone: { x: 70, y: 100, width: 50, height: 70 }, foldType: 'left' },
      { instruction: 'Press the right edge together firmly', targetZone: { x: 240, y: 100, width: 50, height: 70 }, foldType: 'right' },
      { instruction: 'Crimp the edge with your fingers or a fork', targetZone: { x: 80, y: 90, width: 200, height: 25 }, foldType: 'crimp' },
    ],
    funFact: 'Pierogi are such an important part of Polish culture that there is a Pierogi Festival held every August in Krakow with pierogi-making competitions!',
    history: 'Legend says pierogi came to Poland from the Far East via trade routes. Saint Hyacinth supposedly brought them to Poland in the 13th century!',
  },
  {
    id: 'gyoza',
    name: 'Gyoza',
    origin: 'Japan',
    flag: '\u{1F1EF}\u{1F1F5}',
    emoji: '\u{1F95F}',
    color: '#faf5ef',
    accentColor: '#d4b896',
    filling: 'Pork & Garlic Chives',
    steps: [
      { instruction: 'Place filling in the center of the wrapper', targetZone: { x: 140, y: 120, width: 80, height: 60 }, foldType: 'center' },
      { instruction: 'Wet the edges with water using your finger', targetZone: { x: 80, y: 100, width: 200, height: 20 }, foldType: 'seal' },
      { instruction: 'Fold in half and pinch the center first', targetZone: { x: 160, y: 90, width: 40, height: 50 }, foldType: 'center' },
      { instruction: 'Create 3-4 pleats on the left side', targetZone: { x: 90, y: 80, width: 70, height: 40 }, foldType: 'left' },
      { instruction: 'Create 3-4 pleats on the right side to match', targetZone: { x: 200, y: 80, width: 70, height: 40 }, foldType: 'right' },
    ],
    funFact: 'Gyoza became popular in Japan after World War II when Japanese soldiers returned from China. The distinctive pleated crescent shape makes one side flat for pan-frying!',
    history: 'While inspired by Chinese jiaozi, Japanese gyoza have thinner wrappers and more garlic. They are almost always pan-fried to get a crispy bottom!',
  },
];

const CHALLENGE_TIME_SECONDS = 60;

// ============================================
// HELPERS
// ============================================

function calculateFoldQuality(clickX: number, clickY: number, targetZone: { x: number; y: number; width: number; height: number }): number {
  const centerX = targetZone.x + targetZone.width / 2;
  const centerY = targetZone.y + targetZone.height / 2;
  const maxDist = Math.sqrt(Math.pow(targetZone.width / 2, 2) + Math.pow(targetZone.height / 2, 2));
  const dist = Math.sqrt(Math.pow(clickX - centerX, 2) + Math.pow(clickY - centerY, 2));
  const quality = Math.max(0, Math.min(100, 100 - (dist / maxDist) * 50));
  return Math.round(quality);
}

function isInZone(x: number, y: number, zone: { x: number; y: number; width: number; height: number }): boolean {
  return x >= zone.x && x <= zone.x + zone.width && y >= zone.y && y <= zone.y + zone.height;
}

function getQualityLabel(quality: number): { label: string; color: string } {
  if (quality >= 90) return { label: 'Perfect!', color: '#22c55e' };
  if (quality >= 70) return { label: 'Great!', color: '#84cc16' };
  if (quality >= 50) return { label: 'Good!', color: '#eab308' };
  return { label: 'Try Again', color: '#f97316' };
}

function getOverallRating(quality: number): { stars: number; message: string } {
  if (quality >= 90) return { stars: 5, message: 'Master Dumpling Chef!' };
  if (quality >= 75) return { stars: 4, message: 'Excellent Folding!' };
  if (quality >= 60) return { stars: 3, message: 'Good Work!' };
  if (quality >= 40) return { stars: 2, message: 'Keep Practicing!' };
  return { stars: 1, message: 'Nice Try!' };
}

// ============================================
// DUMPLING SVG COMPONENT
// ============================================

interface DumplingVisualizerProps {
  type: DumplingType;
  progress: FoldProgress;
  style: DumplingStyle;
  showTargetZone: boolean;
  currentTargetZone?: { x: number; y: number; width: number; height: number };
  onClick: (x: number, y: number) => void;
}

function DumplingVisualizer({ type, progress, style, showTargetZone, currentTargetZone, onClick }: DumplingVisualizerProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const completedSteps = progress.completed.filter(Boolean).length;

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 360;
    const y = ((e.clientY - rect.top) / rect.height) * 280;
    onClick(x, y);
  };

  // Render different dumpling states based on progress
  const renderDumplingState = () => {
    const baseWrapper = (
      <ellipse
        cx="180"
        cy="140"
        rx="120"
        ry="100"
        fill={style.color}
        stroke={style.accentColor}
        strokeWidth="3"
      />
    );

    const filling = completedSteps >= 1 ? (
      <ellipse
        cx="180"
        cy="145"
        rx="50"
        ry="35"
        fill="#8b6914"
        opacity="0.8"
      />
    ) : null;

    // Half-folded state (after step 2)
    const halfFold = completedSteps >= 2 ? (
      <path
        d={type === 'ravioli'
          ? "M 100 200 L 180 80 L 260 200 Z"
          : "M 60 150 Q 180 60 300 150 L 300 160 Q 180 100 60 160 Z"
        }
        fill={style.color}
        stroke={style.accentColor}
        strokeWidth="3"
      />
    ) : null;

    // Left seal (after step 3)
    const leftSeal = completedSteps >= 3 ? (
      <path
        d="M 80 140 Q 60 150 80 170"
        fill="none"
        stroke={style.accentColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
    ) : null;

    // Crimps (after step 4)
    const crimps = completedSteps >= 4 ? (
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M ${120 + i * 30} 95 Q ${125 + i * 30} 80 ${130 + i * 30} 95`}
            fill="none"
            stroke={style.accentColor}
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
      </g>
    ) : null;

    // Right seal (after step 5)
    const rightSeal = completedSteps >= 5 ? (
      <path
        d="M 280 140 Q 300 150 280 170"
        fill="none"
        stroke={style.accentColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
    ) : null;

    // Show appropriate state
    if (completedSteps === 0) {
      return baseWrapper;
    } else if (completedSteps === 1) {
      return (
        <g>
          {baseWrapper}
          {filling}
        </g>
      );
    } else {
      return (
        <g>
          {halfFold}
          {leftSeal}
          {crimps}
          {rightSeal}
          {/* Add shading for 3D effect */}
          <ellipse
            cx="180"
            cy="155"
            rx="80"
            ry="20"
            fill="rgba(0,0,0,0.05)"
          />
        </g>
      );
    }
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 360 280"
      style={{ width: '100%', maxWidth: '400px', cursor: 'pointer' }}
      onClick={handleClick}
    >
      {/* Background - wooden cutting board */}
      <rect x="0" y="0" width="360" height="280" rx="12" fill="#deb887" />
      <rect x="10" y="10" width="340" height="260" rx="8" fill="#d4a76a" />
      {/* Wood grain lines */}
      {[30, 70, 110, 150, 190, 230].map((y) => (
        <line key={y} x1="20" y1={y} x2="340" y2={y} stroke="#c49a6c" strokeWidth="1" opacity="0.5" />
      ))}

      {/* Dumpling visualization */}
      {renderDumplingState()}

      {/* Target zone indicator */}
      {showTargetZone && currentTargetZone && (
        <rect
          x={currentTargetZone.x}
          y={currentTargetZone.y}
          width={currentTargetZone.width}
          height={currentTargetZone.height}
          fill="rgba(34, 197, 94, 0.3)"
          stroke="#22c55e"
          strokeWidth="2"
          strokeDasharray="8,4"
          rx="8"
        >
          <animate
            attributeName="opacity"
            values="0.3;0.6;0.3"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </rect>
      )}

      {/* Click indicator arrows */}
      {showTargetZone && currentTargetZone && (
        <g>
          <path
            d={`M ${currentTargetZone.x + currentTargetZone.width / 2} ${currentTargetZone.y - 20}
                L ${currentTargetZone.x + currentTargetZone.width / 2} ${currentTargetZone.y - 5}`}
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
            markerEnd="url(#arrowhead)"
          >
            <animate
              attributeName="opacity"
              values="0.5;1;0.5"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
            </marker>
          </defs>
        </g>
      )}

      {/* Progress indicator */}
      <g>
        {style.steps.map((_, i) => (
          <circle
            key={i}
            cx={130 + i * 25}
            cy="260"
            r="8"
            fill={progress.completed[i] ? '#22c55e' : '#e5e7eb'}
            stroke={i === progress.stepIndex ? '#3b82f6' : 'transparent'}
            strokeWidth="3"
          />
        ))}
      </g>
    </svg>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function DumplingWrapper() {
  const [phase, setPhase] = useState<GamePhase>('menu');
  const [selectedType, setSelectedType] = useState<DumplingType>('jiaozi');
  const [foldProgress, setFoldProgress] = useState<FoldProgress>({
    stepIndex: 0,
    completed: [false, false, false, false, false],
    quality: 0,
  });
  const [stepQualities, setStepQualities] = useState<number[]>([]);
  const [stats, setStats] = useState<DumplingStats>({
    jiaozi: 0,
    ravioli: 0,
    pierogi: 0,
    gyoza: 0,
  });
  const [showFact, setShowFact] = useState(false);
  const [feedback, setFeedback] = useState<{ show: boolean; quality: number; x: number; y: number }>({ show: false, quality: 0, x: 0, y: 0 });

  // Challenge mode state
  const [challengeTime, setChallengeTime] = useState(CHALLENGE_TIME_SECONDS);
  const [challengeDumplings, setChallengeDumplings] = useState(0);
  const [challengeRunning, setChallengeRunning] = useState(false);

  const currentStyle = DUMPLING_STYLES.find((d) => d.id === selectedType)!;

  // Challenge timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (challengeRunning && challengeTime > 0) {
      interval = setInterval(() => {
        setChallengeTime((prev) => {
          if (prev <= 1) {
            setChallengeRunning(false);
            setPhase('complete');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [challengeRunning, challengeTime]);

  // Clear feedback after delay
  useEffect(() => {
    if (feedback.show) {
      const timer = setTimeout(() => setFeedback((prev) => ({ ...prev, show: false })), 1000);
      return () => clearTimeout(timer);
    }
  }, [feedback.show]);

  const handleSelectDumpling = useCallback((type: DumplingType) => {
    setSelectedType(type);
    setPhase('learning');
    setShowFact(false);
  }, []);

  const handleStartFolding = useCallback(() => {
    setFoldProgress({
      stepIndex: 0,
      completed: [false, false, false, false, false],
      quality: 0,
    });
    setStepQualities([]);
    setPhase('folding');
  }, []);

  const handleStartChallenge = useCallback(() => {
    setChallengeTime(CHALLENGE_TIME_SECONDS);
    setChallengeDumplings(0);
    setFoldProgress({
      stepIndex: 0,
      completed: [false, false, false, false, false],
      quality: 0,
    });
    setStepQualities([]);
    setChallengeRunning(true);
    setPhase('challenge');
  }, []);

  const handleFoldClick = useCallback((x: number, y: number) => {
    const currentStep = currentStyle.steps[foldProgress.stepIndex];
    if (!currentStep) return;

    const inZone = isInZone(x, y, currentStep.targetZone);
    if (!inZone) {
      setFeedback({ show: true, quality: 0, x, y });
      return;
    }

    const quality = calculateFoldQuality(x, y, currentStep.targetZone);
    setFeedback({ show: true, quality, x, y });

    setStepQualities((prev) => [...prev, quality]);

    setFoldProgress((prev) => {
      const newCompleted = [...prev.completed];
      newCompleted[prev.stepIndex] = true;
      const newStepIndex = prev.stepIndex + 1;

      // Calculate average quality so far
      const avgQuality = Math.round([...stepQualities, quality].reduce((a, b) => a + b, 0) / ([...stepQualities, quality].length));

      // Check if dumpling is complete
      if (newStepIndex >= currentStyle.steps.length) {
        // Update stats using functional update
        setStats((prevStats) => ({
          ...prevStats,
          [selectedType]: prevStats[selectedType] + 1,
        }));

        // In challenge mode, start a new dumpling
        if (phase === 'challenge') {
          setChallengeDumplings((prev) => prev + 1);
          setTimeout(() => {
            setFoldProgress({
              stepIndex: 0,
              completed: [false, false, false, false, false],
              quality: 0,
            });
            setStepQualities([]);
          }, 500);
          return {
            stepIndex: newStepIndex,
            completed: newCompleted,
            quality: avgQuality,
          };
        }

        // Regular mode - go to rating
        setTimeout(() => setPhase('rating'), 800);
        return {
          stepIndex: newStepIndex,
          completed: newCompleted,
          quality: avgQuality,
        };
      }

      return {
        stepIndex: newStepIndex,
        completed: newCompleted,
        quality: avgQuality,
      };
    });
  }, [currentStyle.steps, foldProgress.stepIndex, stepQualities, selectedType, phase]);

  const handleBackToMenu = useCallback(() => {
    setPhase('menu');
    setChallengeRunning(false);
    setFoldProgress({
      stepIndex: 0,
      completed: [false, false, false, false, false],
      quality: 0,
    });
    setStepQualities([]);
  }, []);

  const handleTryAgain = useCallback(() => {
    setFoldProgress({
      stepIndex: 0,
      completed: [false, false, false, false, false],
      quality: 0,
    });
    setStepQualities([]);
    setPhase('folding');
  }, []);

  const totalDumplings = stats.jiaozi + stats.ravioli + stats.pierogi + stats.gyoza;

  // ============================================
  // RENDER: MENU PHASE
  // ============================================
  if (phase === 'menu') {
    return (
      <div className="max-w-2xl mx-auto font-sans">
        <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 overflow-hidden shadow-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 py-4 px-6">
            <h2 className="text-2xl font-bold text-white text-center drop-shadow">
              {'\u{1F95F}'} Dumplings Around the World {'\u{1F30D}'}
            </h2>
            <p className="text-amber-100 text-center text-sm mt-1">
              Learn to fold dumplings from different cultures!
            </p>
          </div>

          {/* Stats Bar */}
          <div className="bg-white/60 px-4 py-3 border-b border-amber-200">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div className="text-amber-800 font-semibold text-sm">
                {'\u{1F3C6}'} Total Made: {totalDumplings}
              </div>
              <div className="flex gap-3 text-sm">
                {DUMPLING_STYLES.map((d) => (
                  <span key={d.id} className="text-amber-700">
                    {d.flag} {stats[d.id]}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Dumpling Selection Grid */}
          <div className="p-6">
            <h3 className="text-lg font-bold text-amber-800 mb-4 text-center">
              Choose a Dumpling to Learn
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {DUMPLING_STYLES.map((d) => (
                <button
                  key={d.id}
                  onClick={() => handleSelectDumpling(d.id)}
                  className="p-4 rounded-xl bg-white border-2 border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{d.emoji}</span>
                    <div>
                      <div className="font-bold text-amber-900">{d.name}</div>
                      <div className="text-sm text-amber-600">{d.flag} {d.origin}</div>
                    </div>
                  </div>
                  <div className="text-xs text-amber-700 bg-amber-50 rounded-lg px-2 py-1">
                    Filling: {d.filling}
                  </div>
                  <div className="mt-2 text-xs text-amber-500">
                    Made: {stats[d.id]} {'\u{2713}'}
                  </div>
                </button>
              ))}
            </div>

            {/* Challenge Mode Button */}
            <div className="mt-6 text-center">
              <button
                onClick={handleStartChallenge}
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600
                         text-white font-bold rounded-xl px-6 py-3 text-lg shadow-lg
                         transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                {'\u{23F1}'} Challenge Mode - 60 Seconds!
              </button>
              <p className="text-sm text-amber-600 mt-2">
                How many dumplings can you fold in one minute?
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER: LEARNING PHASE
  // ============================================
  if (phase === 'learning') {
    return (
      <div className="max-w-2xl mx-auto font-sans">
        <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 overflow-hidden shadow-lg">
          {/* Header */}
          <div className="py-3 px-4 flex items-center justify-between" style={{ background: `linear-gradient(to right, ${currentStyle.accentColor}, ${currentStyle.color})` }}>
            <button
              onClick={handleBackToMenu}
              className="text-white/80 hover:text-white font-semibold text-sm cursor-pointer"
            >
              {'\u{2190}'} Back
            </button>
            <h2 className="text-xl font-bold text-white drop-shadow">
              {currentStyle.flag} {currentStyle.name}
            </h2>
            <div className="text-2xl">{currentStyle.emoji}</div>
          </div>

          <div className="p-6">
            {/* Origin Info */}
            <div className="bg-white rounded-xl p-4 mb-4 border border-amber-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-4xl">{currentStyle.emoji}</div>
                <div>
                  <h3 className="font-bold text-amber-900 text-lg">{currentStyle.name}</h3>
                  <p className="text-amber-600">From {currentStyle.origin} {currentStyle.flag}</p>
                  <p className="text-sm text-amber-500">Traditional filling: {currentStyle.filling}</p>
                </div>
              </div>
            </div>

            {/* History */}
            <div className="bg-amber-100 rounded-xl p-4 mb-4 border border-amber-200">
              <h4 className="font-bold text-amber-800 mb-2">{'\u{1F4DC}'} History</h4>
              <p className="text-sm text-amber-700 leading-relaxed">{currentStyle.history}</p>
            </div>

            {/* Folding Steps Preview */}
            <div className="bg-white rounded-xl p-4 mb-4 border border-amber-200">
              <h4 className="font-bold text-amber-800 mb-3">{'\u{1F44B}'} Folding Steps</h4>
              <div className="space-y-2">
                {currentStyle.steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-amber-400 text-white flex items-center justify-center font-bold text-xs">
                      {i + 1}
                    </div>
                    <span className="text-amber-700">{step.instruction}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fun Fact Toggle */}
            <button
              onClick={() => setShowFact(!showFact)}
              className="w-full bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-3 mb-4 border border-purple-200 text-left cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-purple-800">{'\u{1F4A1}'} Fun Fact</span>
                <span className="text-purple-600">{showFact ? '\u{25B2}' : '\u{25BC}'}</span>
              </div>
              {showFact && (
                <p className="text-sm text-purple-700 mt-2 leading-relaxed">{currentStyle.funFact}</p>
              )}
            </button>

            {/* Start Button */}
            <button
              onClick={handleStartFolding}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600
                       text-white font-bold rounded-xl py-4 text-lg shadow-lg
                       transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Start Folding! {'\u{1F44B}'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER: FOLDING PHASE
  // ============================================
  if (phase === 'folding' || phase === 'challenge') {
    const currentStep = currentStyle.steps[foldProgress.stepIndex];
    const isComplete = foldProgress.stepIndex >= currentStyle.steps.length;

    return (
      <div className="max-w-2xl mx-auto font-sans">
        <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 overflow-hidden shadow-lg">
          {/* Header */}
          <div className="py-2 px-4 flex items-center justify-between bg-gradient-to-r from-amber-400 to-orange-400">
            <button
              onClick={handleBackToMenu}
              className="text-white/80 hover:text-white font-semibold text-sm cursor-pointer"
            >
              {'\u{2190}'} Menu
            </button>
            <div className="text-white font-bold">
              {currentStyle.flag} {currentStyle.name}
            </div>
            {phase === 'challenge' && (
              <div className="text-white font-bold text-lg">
                {'\u{23F1}'} {challengeTime}s | {'\u{1F95F}'} {challengeDumplings}
              </div>
            )}
            {phase === 'folding' && (
              <div className="text-white font-semibold text-sm">
                Step {Math.min(foldProgress.stepIndex + 1, currentStyle.steps.length)}/{currentStyle.steps.length}
              </div>
            )}
          </div>

          <div className="p-4">
            {/* Instruction */}
            {!isComplete && currentStep && (
              <div className="bg-white rounded-xl p-3 mb-4 border-2 border-green-200 shadow-sm">
                <div className="flex items-center gap-2 text-green-700 font-semibold">
                  <span className="text-lg">{'\u{1F449}'}</span>
                  <span>{currentStep.instruction}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Click on the highlighted area!</p>
              </div>
            )}

            {/* Dumpling Visualization */}
            <div className="relative">
              <DumplingVisualizer
                type={selectedType}
                progress={foldProgress}
                style={currentStyle}
                showTargetZone={!isComplete && !!currentStep}
                currentTargetZone={currentStep?.targetZone}
                onClick={handleFoldClick}
              />

              {/* Feedback popup */}
              {feedback.show && (
                <div
                  className="absolute pointer-events-none animate-bounce"
                  style={{
                    left: `${(feedback.x / 360) * 100}%`,
                    top: `${(feedback.y / 280) * 100}%`,
                    transform: 'translate(-50%, -100%)',
                  }}
                >
                  <div
                    className="px-3 py-1 rounded-full font-bold text-white text-sm shadow-lg"
                    style={{ backgroundColor: getQualityLabel(feedback.quality).color }}
                  >
                    {feedback.quality > 0 ? `${feedback.quality}% - ${getQualityLabel(feedback.quality).label}` : 'Miss! Try the green area'}
                  </div>
                </div>
              )}
            </div>

            {/* Quality meter */}
            {stepQualities.length > 0 && (
              <div className="mt-4 bg-white rounded-lg p-3 border border-amber-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-amber-700">Folding Quality</span>
                  <span className="text-sm font-bold text-amber-900">
                    {Math.round(stepQualities.reduce((a, b) => a + b, 0) / stepQualities.length)}%
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 transition-all duration-300"
                    style={{ width: `${stepQualities.reduce((a, b) => a + b, 0) / stepQualities.length}%` }}
                  />
                </div>
              </div>
            )}

            {/* Challenge mode quick restart */}
            {phase === 'challenge' && isComplete && (
              <div className="mt-4 text-center text-green-600 font-bold animate-pulse">
                Dumpling Complete! Starting next one...
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER: RATING PHASE
  // ============================================
  if (phase === 'rating') {
    const rating = getOverallRating(foldProgress.quality);

    return (
      <div className="max-w-2xl mx-auto font-sans">
        <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 py-4 px-6">
            <h2 className="text-2xl font-bold text-white text-center drop-shadow">
              {'\u{1F389}'} Dumpling Complete! {'\u{1F389}'}
            </h2>
          </div>

          <div className="p-6 text-center">
            {/* Dumpling Display */}
            <div className="text-6xl mb-4">{currentStyle.emoji}</div>

            {/* Stars */}
            <div className="text-4xl mb-2">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={i < rating.stars ? 'text-yellow-400' : 'text-gray-300'}
                >
                  {'\u{2B50}'}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-bold text-amber-800 mb-1">{rating.message}</h3>
            <p className="text-amber-600 mb-4">
              Folding Quality: <span className="font-bold">{foldProgress.quality}%</span>
            </p>

            {/* Step-by-step breakdown */}
            <div className="bg-white rounded-xl p-4 mb-4 border border-amber-200 text-left">
              <h4 className="font-semibold text-amber-800 mb-2">Step Quality:</h4>
              <div className="space-y-2">
                {stepQualities.map((q, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all"
                        style={{
                          width: `${q}%`,
                          backgroundColor: getQualityLabel(q).color,
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold" style={{ color: getQualityLabel(q).color }}>
                      {q}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fun Fact */}
            <div className="bg-purple-50 rounded-xl p-4 mb-4 border border-purple-200 text-left">
              <h4 className="font-semibold text-purple-800 mb-1">{'\u{1F4A1}'} Did you know?</h4>
              <p className="text-sm text-purple-700">{currentStyle.funFact}</p>
            </div>

            {/* Updated Stats */}
            <div className="bg-amber-100 rounded-xl p-3 mb-4">
              <p className="text-amber-800 font-semibold">
                You have now made {stats[selectedType]} {currentStyle.name}!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={handleTryAgain}
                className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500
                         text-white font-bold rounded-xl px-6 py-3 shadow-lg
                         transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Make Another {currentStyle.emoji}
              </button>
              <button
                onClick={handleBackToMenu}
                className="bg-white border-2 border-amber-300 hover:border-amber-400
                         text-amber-700 font-bold rounded-xl px-6 py-3
                         transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Try Different Dumpling
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER: COMPLETE PHASE (Challenge Results)
  // ============================================
  if (phase === 'complete') {
    const avgQuality = stepQualities.length > 0
      ? Math.round(stepQualities.reduce((a, b) => a + b, 0) / stepQualities.length)
      : 0;

    return (
      <div className="max-w-2xl mx-auto font-sans">
        <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 py-4 px-6">
            <h2 className="text-2xl font-bold text-white text-center drop-shadow">
              {'\u{23F0}'} Time is Up! {'\u{23F0}'}
            </h2>
          </div>

          <div className="p-6 text-center">
            <div className="text-6xl mb-4">{'\u{1F3C6}'}</div>

            <h3 className="text-3xl font-bold text-amber-800 mb-2">
              {challengeDumplings} Dumplings!
            </h3>

            <p className="text-amber-600 mb-4">
              {challengeDumplings >= 5 && 'Incredible speed! You are a dumpling master!'}
              {challengeDumplings >= 3 && challengeDumplings < 5 && 'Great job! You are getting faster!'}
              {challengeDumplings >= 1 && challengeDumplings < 3 && 'Nice effort! Practice makes perfect!'}
              {challengeDumplings === 0 && 'Keep practicing, you will get there!'}
            </p>

            {/* Stats Breakdown */}
            <div className="bg-white rounded-xl p-4 mb-4 border border-amber-200">
              <h4 className="font-bold text-amber-800 mb-3">Challenge Stats</h4>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-sm text-amber-600">Dumplings Completed</p>
                  <p className="text-2xl font-bold text-amber-900">{challengeDumplings}</p>
                </div>
                <div>
                  <p className="text-sm text-amber-600">Average Quality</p>
                  <p className="text-2xl font-bold text-amber-900">{avgQuality}%</p>
                </div>
              </div>
            </div>

            {/* Total Stats */}
            <div className="bg-amber-100 rounded-xl p-4 mb-4">
              <h4 className="font-bold text-amber-800 mb-2">All-Time Stats</h4>
              <div className="flex justify-center gap-4 flex-wrap">
                {DUMPLING_STYLES.map((d) => (
                  <div key={d.id} className="text-center">
                    <div className="text-2xl">{d.emoji}</div>
                    <div className="text-sm font-bold text-amber-700">{stats[d.id]}</div>
                    <div className="text-xs text-amber-600">{d.flag}</div>
                  </div>
                ))}
              </div>
              <p className="text-amber-800 font-semibold mt-3">
                Total: {totalDumplings} dumplings made!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={handleStartChallenge}
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600
                         text-white font-bold rounded-xl px-6 py-3 shadow-lg
                         transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                {'\u{1F504}'} Try Again!
              </button>
              <button
                onClick={handleBackToMenu}
                className="bg-white border-2 border-amber-300 hover:border-amber-400
                         text-amber-700 font-bold rounded-xl px-6 py-3
                         transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
