import { useState, useCallback, useEffect, useMemo } from 'react';

// ============================================
// TYPES
// ============================================

interface PizzaPartyProps {
  onComplete?: () => void;
}

type GamePhase = 'intro' | 'playing' | 'checking' | 'celebration' | 'complete';

interface Friend {
  id: number;
  name: string;
  emoji: string;
  slices: number;
}

interface Round {
  totalSlices: number;
  numFriends: number;
  correctAnswer: number;
  friendEmojis: string[];
}

type FeedbackState = 'none' | 'correct' | 'incorrect';

// ============================================
// CONSTANTS
// ============================================

const FRIEND_EMOJIS = ['👧', '👦', '🧒', '👶', '🧑', '👱', '🧔', '👩'];
const FRIEND_NAMES = ['Emma', 'Liam', 'Sofia', 'Noah', 'Mia', 'Oliver', 'Ava', 'Lucas'];
const TOTAL_ROUNDS = 5;
const POINTS_PER_CORRECT = 10;

// Pizza toppings used in visual rendering (pepperoni, mushroom, olive)

// ============================================
// ROUND GENERATION
// ============================================

function generateRounds(): Round[] {
  const rounds: Round[] = [];
  const usedCombos = new Set<string>();

  // Ensure nice division problems: dividend / divisor = whole number
  const possibilities = [
    { slices: 6, friends: 2 },   // 3 each
    { slices: 6, friends: 3 },   // 2 each
    { slices: 8, friends: 2 },   // 4 each
    { slices: 8, friends: 4 },   // 2 each
    { slices: 10, friends: 2 },  // 5 each
    { slices: 10, friends: 5 },  // 2 each
    { slices: 12, friends: 2 },  // 6 each
    { slices: 12, friends: 3 },  // 4 each
    { slices: 12, friends: 4 },  // 3 each
    { slices: 12, friends: 6 },  // 2 each
    { slices: 15, friends: 3 },  // 5 each
    { slices: 15, friends: 5 },  // 3 each
    { slices: 16, friends: 2 },  // 8 each
    { slices: 16, friends: 4 },  // 4 each
    { slices: 16, friends: 8 },  // 2 each
    { slices: 18, friends: 2 },  // 9 each
    { slices: 18, friends: 3 },  // 6 each
    { slices: 18, friends: 6 },  // 3 each
    { slices: 20, friends: 4 },  // 5 each
    { slices: 20, friends: 5 },  // 4 each
    { slices: 24, friends: 4 },  // 6 each
    { slices: 24, friends: 6 },  // 4 each
    { slices: 24, friends: 8 },  // 3 each
  ];

  // Shuffle possibilities
  const shuffled = [...possibilities].sort(() => Math.random() - 0.5);

  for (const p of shuffled) {
    if (rounds.length >= TOTAL_ROUNDS) break;
    const key = `${p.slices}-${p.friends}`;
    if (usedCombos.has(key)) continue;
    usedCombos.add(key);

    const friendEmojis: string[] = [];
    const usedEmojis = new Set<number>();
    for (let i = 0; i < p.friends; i++) {
      let idx = Math.floor(Math.random() * FRIEND_EMOJIS.length);
      while (usedEmojis.has(idx)) {
        idx = (idx + 1) % FRIEND_EMOJIS.length;
      }
      usedEmojis.add(idx);
      friendEmojis.push(FRIEND_EMOJIS[idx]);
    }

    rounds.push({
      totalSlices: p.slices,
      numFriends: p.friends,
      correctAnswer: p.slices / p.friends,
      friendEmojis,
    });
  }

  // Sort by difficulty (smaller numbers first)
  rounds.sort((a, b) => (a.totalSlices + a.numFriends) - (b.totalSlices + b.numFriends));

  return rounds.slice(0, TOTAL_ROUNDS);
}

// ============================================
// SVG PIZZA COMPONENT
// ============================================

interface PizzaSVGProps {
  totalSlices: number;
  highlightedSlices?: number[];
  distributedSlices?: number;
  size?: number;
}

function PizzaSVG({ totalSlices, highlightedSlices = [], distributedSlices = 0, size = 240 }: PizzaSVGProps) {
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.42;
  const crustWidth = size * 0.06;

  const slices = useMemo(() => {
    const result = [];
    const anglePerSlice = (2 * Math.PI) / totalSlices;

    for (let i = 0; i < totalSlices; i++) {
      const startAngle = i * anglePerSlice - Math.PI / 2;
      const endAngle = (i + 1) * anglePerSlice - Math.PI / 2;

      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);
      const x2 = centerX + radius * Math.cos(endAngle);
      const y2 = centerY + radius * Math.sin(endAngle);

      const largeArc = anglePerSlice > Math.PI ? 1 : 0;

      const pathD = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

      const isDistributed = i < distributedSlices;
      const isHighlighted = highlightedSlices.includes(i);

      // Topping position (middle of slice)
      const midAngle = (startAngle + endAngle) / 2;
      const toppingRadius = radius * 0.55;
      const toppingX = centerX + toppingRadius * Math.cos(midAngle);
      const toppingY = centerY + toppingRadius * Math.sin(midAngle);

      result.push({
        id: i,
        pathD,
        isDistributed,
        isHighlighted,
        toppingX,
        toppingY,
        midAngle,
      });
    }
    return result;
  }, [totalSlices, centerX, centerY, radius, distributedSlices, highlightedSlices]);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      style={{ width: '100%', maxWidth: `${size}px`, height: 'auto' }}
    >
      {/* Pizza base shadow */}
      <circle
        cx={centerX + 3}
        cy={centerY + 3}
        r={radius + crustWidth}
        fill="rgba(0,0,0,0.15)"
      />

      {/* Crust */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius + crustWidth}
        fill="#D4A25A"
        stroke="#B8893D"
        strokeWidth={2}
      />

      {/* Cheese base */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="#FFD93D"
      />

      {/* Slices */}
      {slices.map((slice) => (
        <g key={slice.id}>
          <path
            d={slice.pathD}
            fill={slice.isDistributed ? '#AAAAAA' : slice.isHighlighted ? '#FFE066' : '#FFD93D'}
            stroke="#D4A25A"
            strokeWidth={1.5}
            style={{
              opacity: slice.isDistributed ? 0.3 : 1,
              transition: 'opacity 0.3s, fill 0.2s',
            }}
          />
          {/* Pepperoni topping */}
          {!slice.isDistributed && (
            <>
              <circle
                cx={slice.toppingX}
                cy={slice.toppingY}
                r={size * 0.035}
                fill="#C0392B"
                stroke="#922B21"
                strokeWidth={0.5}
              />
              {/* Small highlight on pepperoni */}
              <circle
                cx={slice.toppingX - size * 0.01}
                cy={slice.toppingY - size * 0.01}
                r={size * 0.008}
                fill="rgba(255,255,255,0.3)"
              />
            </>
          )}
        </g>
      ))}

      {/* Center dot */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.02}
        fill="#B8893D"
      />

      {/* Slice count label */}
      <text
        x={centerX}
        y={size * 0.92}
        textAnchor="middle"
        fontSize={size * 0.055}
        fontWeight="bold"
        fill="#8B4513"
        fontFamily="Georgia, serif"
      >
        {totalSlices - distributedSlices} slices left
      </text>
    </svg>
  );
}

// ============================================
// FRIEND PLATE COMPONENT
// ============================================

interface FriendPlateProps {
  friend: Friend;
  targetSlices: number;
  isCorrect: boolean | null;
}

function FriendPlate({ friend, targetSlices, isCorrect }: FriendPlateProps) {
  const plateSlices = [];
  for (let i = 0; i < friend.slices; i++) {
    plateSlices.push(
      <span
        key={i}
        className="inline-block text-lg sm:text-xl"
        style={{
          animation: `pizzaSliceBounce 0.3s ease-out ${i * 0.1}s both`,
        }}
      >
        🍕
      </span>
    );
  }

  return (
    <div
      className={`relative bg-white rounded-xl p-2 sm:p-3 border-2 transition-all duration-300 ${
        isCorrect === true
          ? 'border-green-400 bg-green-50 shadow-lg shadow-green-200'
          : isCorrect === false
          ? 'border-red-400 bg-red-50'
          : 'border-amber-200 hover:border-amber-300'
      }`}
      style={{ minWidth: '80px' }}
    >
      {/* Friend emoji */}
      <div className="text-2xl sm:text-3xl text-center mb-1">{friend.emoji}</div>

      {/* Plate area */}
      <div
        className="bg-gray-100 rounded-full p-1 sm:p-2 min-h-[36px] sm:min-h-[44px] flex items-center justify-center flex-wrap gap-0.5"
        style={{
          border: '2px dashed #ccc',
          minWidth: '60px',
        }}
      >
        {plateSlices.length > 0 ? (
          plateSlices
        ) : (
          <span className="text-gray-400 text-xs">plate</span>
        )}
      </div>

      {/* Slice count */}
      <div className="text-center mt-1 text-xs sm:text-sm font-semibold text-gray-600">
        {friend.slices}/{targetSlices}
      </div>

      {/* Correct checkmark */}
      {isCorrect === true && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow">
          ✓
        </div>
      )}
    </div>
  );
}

// ============================================
// CONFETTI COMPONENT
// ============================================

function PartyConfetti({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<Array<{
    id: number;
    left: number;
    delay: number;
    color: string;
    size: number;
    rotation: number;
  }>>([]);

  useEffect(() => {
    if (!active) {
      setPieces([]);
      return;
    }

    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#9B59B6', '#3498DB', '#E74C3C', '#2ECC71'];
    const newPieces = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 500,
      color: colors[i % colors.length],
      size: 8 + Math.random() * 8,
      rotation: Math.random() * 360,
    }));
    setPieces(newPieces);
  }, [active]);

  if (!active || pieces.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.left}%`,
            top: '-20px',
            width: piece.size,
            height: piece.size * 1.2,
            backgroundColor: piece.color,
            borderRadius: '2px',
            transform: `rotate(${piece.rotation}deg)`,
            animation: `confettiFall 1.5s ease-out ${piece.delay}ms forwards`,
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function PizzaParty({ onComplete }: PizzaPartyProps) {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [rounds] = useState<Round[]>(() => generateRounds());
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<FeedbackState>('none');
  const [showConfetti, setShowConfetti] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [distributedCount, setDistributedCount] = useState(0);
  const [shake, setShake] = useState(false);
  const [inputMode, setInputMode] = useState<'distribute' | 'answer'>('answer');

  const round = rounds[currentRound];

  // Initialize friends for current round
  useEffect(() => {
    if (phase === 'playing' && round) {
      const newFriends: Friend[] = round.friendEmojis.map((emoji, i) => ({
        id: i,
        name: FRIEND_NAMES[i % FRIEND_NAMES.length],
        emoji,
        slices: 0,
      }));
      setFriends(newFriends);
      setDistributedCount(0);
      setAnswer('');
      setFeedback('none');
      setShake(false);
    }
  }, [currentRound, phase, round]);

  const handleStart = useCallback(() => {
    setPhase('playing');
    setCurrentRound(0);
    setScore(0);
  }, []);

  const handleAnswerChange = useCallback((value: string) => {
    // Only allow numbers
    const numValue = value.replace(/[^0-9]/g, '');
    setAnswer(numValue);
  }, []);

  const handleDistribute = useCallback(() => {
    if (!round) return;

    // Give one slice to each friend in order
    if (distributedCount < round.totalSlices) {
      const friendIndex = distributedCount % round.numFriends;
      setFriends(prev => prev.map((f, i) =>
        i === friendIndex ? { ...f, slices: f.slices + 1 } : f
      ));
      setDistributedCount(prev => prev + 1);
    }
  }, [round, distributedCount]);

  const handleAutoDistribute = useCallback(() => {
    if (!round) return;

    // Distribute all slices evenly
    const slicesEach = round.correctAnswer;
    setFriends(prev => prev.map(f => ({ ...f, slices: slicesEach })));
    setDistributedCount(round.totalSlices);
  }, [round]);

  const checkAnswer = useCallback(() => {
    if (!round) return;
    setPhase('checking');

    let isCorrect = false;

    if (inputMode === 'answer') {
      const userAnswer = parseInt(answer, 10);
      isCorrect = userAnswer === round.correctAnswer;
    } else {
      // Check if all friends have the correct number of slices
      isCorrect = friends.every(f => f.slices === round.correctAnswer);
    }

    if (isCorrect) {
      setFeedback('correct');
      setScore(prev => prev + POINTS_PER_CORRECT);
      setShowConfetti(true);
      setPhase('celebration');

      // Auto-distribute to show the visual
      if (inputMode === 'answer') {
        handleAutoDistribute();
      }

      setTimeout(() => {
        setShowConfetti(false);
        advanceRound();
      }, 2000);
    } else {
      setFeedback('incorrect');
      setShake(true);
      setTimeout(() => {
        setPhase('playing');
        setFeedback('none');
        setShake(false);
      }, 1200);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, answer, friends, inputMode]);

  const advanceRound = useCallback(() => {
    if (currentRound >= rounds.length - 1) {
      setPhase('complete');
      if (onComplete) onComplete();
    } else {
      setCurrentRound(prev => prev + 1);
      setPhase('playing');
    }
  }, [currentRound, rounds.length, onComplete]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && phase === 'playing' && answer.trim()) {
      checkAnswer();
    }
  }, [checkAnswer, phase, answer]);

  const handleRestart = useCallback(() => {
    setPhase('intro');
    setCurrentRound(0);
    setScore(0);
  }, []);

  const toggleMode = useCallback(() => {
    setInputMode(prev => prev === 'answer' ? 'distribute' : 'answer');
    setAnswer('');
    setDistributedCount(0);
    if (round) {
      setFriends(prev => prev.map(f => ({ ...f, slices: 0 })));
    }
  }, [round]);

  // ============================================
  // RENDER
  // ============================================

  const containerStyle = "w-full max-w-2xl mx-auto font-sans select-none";

  // --- INTRO SCREEN ---
  if (phase === 'intro') {
    return (
      <div className={containerStyle}>
        <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 border-4 border-amber-300 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 py-3 px-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center drop-shadow-md">
              🍕 Pizza Party! 🎉
            </h2>
          </div>

          <div className="p-4 sm:p-6 text-center">
            <div className="text-6xl mb-4">🍕</div>
            <p className="text-base sm:text-lg text-amber-900 mb-4 leading-relaxed">
              Welcome to the Pizza Party! Help your friends share pizza slices fairly.
            </p>
            <p className="text-sm sm:text-base text-amber-800 mb-2">
              <strong>How to play:</strong>
            </p>
            <ul className="text-sm text-amber-700 text-left max-w-md mx-auto space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">1.</span>
                See how many pizza slices there are and how many friends want to share
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">2.</span>
                Figure out how many slices each friend should get
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">3.</span>
                Type your answer or click to distribute slices to plates!
              </li>
            </ul>
            <p className="text-sm text-amber-600 mb-6">
              Use <strong>division</strong> to split the pizza fairly!
            </p>

            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600
                         text-white font-bold rounded-xl px-8 py-3 text-lg shadow-lg
                         transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Start the Party!
            </button>
          </div>
        </div>

        <style>{`
          @keyframes confettiFall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
          @keyframes pizzaSliceBounce {
            0% { transform: scale(0) rotate(-180deg); opacity: 0; }
            60% { transform: scale(1.2) rotate(10deg); }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  // --- COMPLETE SCREEN ---
  if (phase === 'complete') {
    const maxScore = TOTAL_ROUNDS * POINTS_PER_CORRECT;
    const percentage = Math.round((score / maxScore) * 100);
    let message = '';
    let emoji = '';

    if (percentage === 100) {
      message = 'Perfect! You are a Pizza Party Pro!';
      emoji = '🏆';
    } else if (percentage >= 80) {
      message = 'Excellent! Everyone got their fair share!';
      emoji = '🌟';
    } else if (percentage >= 60) {
      message = 'Good job! Keep practicing your division!';
      emoji = '👍';
    } else {
      message = 'Nice try! Practice makes perfect!';
      emoji = '💪';
    }

    return (
      <div className={containerStyle}>
        <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 border-4 border-amber-300 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 py-3 px-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center drop-shadow-md">
              🎉 Party Complete! 🎉
            </h2>
          </div>

          <div className="p-6 sm:p-8 text-center">
            <div className="text-6xl sm:text-7xl mb-4">{emoji}</div>
            <h3 className="text-xl sm:text-2xl font-bold text-amber-900 mb-2">{message}</h3>
            <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-4">
              {score} / {maxScore} points
            </div>
            <p className="text-sm text-amber-700 mb-6">
              You completed {TOTAL_ROUNDS} pizza sharing challenges!
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {rounds.map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold shadow"
                >
                  ✓
                </div>
              ))}
            </div>

            <button
              onClick={handleRestart}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600
                         text-white font-bold rounded-xl px-8 py-3 text-lg shadow-lg
                         transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Play Again
            </button>
          </div>
        </div>

        <style>{`
          @keyframes confettiFall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
          @keyframes pizzaSliceBounce {
            0% { transform: scale(0) rotate(-180deg); opacity: 0; }
            60% { transform: scale(1.2) rotate(10deg); }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  // --- PLAYING / CHECKING / CELEBRATION SCREENS ---
  const isCelebrating = phase === 'celebration';
  const isChecking = phase === 'checking';
  const allDistributed = distributedCount >= (round?.totalSlices || 0);

  return (
    <div className={containerStyle}>
      <PartyConfetti active={showConfetti} />

      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 border-4 border-amber-300 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 py-2 px-4 flex items-center justify-between">
          <div className="text-white font-bold text-sm sm:text-base">
            Round {currentRound + 1}/{TOTAL_ROUNDS}
          </div>
          <div className="flex gap-2">
            {rounds.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all ${
                  i < currentRound
                    ? 'bg-green-400'
                    : i === currentRound
                    ? 'bg-yellow-300 scale-125'
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          <div className="text-white font-bold text-sm sm:text-base">
            ⭐ {score}
          </div>
        </div>

        {/* Problem statement */}
        <div className="bg-white/60 px-4 py-3 border-b-2 border-amber-200 text-center">
          <p className="text-base sm:text-lg text-amber-900 font-semibold">
            {round.totalSlices} pizza slices ÷ {round.numFriends} friends = ?
          </p>
          <p className="text-sm text-amber-700 mt-1">
            How many slices should each friend get?
          </p>
        </div>

        {/* Main game area */}
        <div className="p-4 sm:p-6">
          {/* Mode toggle */}
          <div className="flex justify-center mb-4">
            <button
              onClick={toggleMode}
              disabled={isChecking || isCelebrating}
              className={`text-xs sm:text-sm px-3 py-1 rounded-full border-2 transition-all cursor-pointer
                ${inputMode === 'answer'
                  ? 'bg-amber-100 border-amber-400 text-amber-800'
                  : 'bg-blue-100 border-blue-400 text-blue-800'
                }
                ${(isChecking || isCelebrating) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
              `}
            >
              Mode: {inputMode === 'answer' ? '📝 Type Answer' : '🖱️ Distribute Slices'}
            </button>
          </div>

          {/* Pizza and friends layout */}
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            {/* Pizza */}
            <div className="flex-shrink-0">
              <PizzaSVG
                totalSlices={round.totalSlices}
                distributedSlices={distributedCount}
                size={200}
              />
              {inputMode === 'distribute' && !allDistributed && !isCelebrating && (
                <button
                  onClick={handleDistribute}
                  disabled={isChecking}
                  className="mt-2 w-full bg-amber-400 hover:bg-amber-500 text-amber-900 font-bold
                             rounded-lg px-4 py-2 text-sm transition-all cursor-pointer
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Give a slice 🍕
                </button>
              )}
            </div>

            {/* Arrow */}
            <div className="text-3xl text-amber-400 rotate-90 lg:rotate-0">➜</div>

            {/* Friends */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {friends.map((friend) => (
                <FriendPlate
                  key={friend.id}
                  friend={friend}
                  targetSlices={round.correctAnswer}
                  isCorrect={
                    isCelebrating
                      ? true
                      : feedback === 'incorrect' && inputMode === 'distribute'
                      ? friend.slices !== round.correctAnswer
                      : null
                  }
                />
              ))}
            </div>
          </div>

          {/* Answer input (only in answer mode) */}
          {inputMode === 'answer' && (
            <div className="mt-6 text-center">
              <label className="block text-sm font-semibold text-amber-800 mb-2">
                Each friend gets how many slices?
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={answer}
                onChange={(e) => handleAnswerChange(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isChecking || isCelebrating}
                placeholder="?"
                className={`w-24 sm:w-28 px-4 py-3 text-2xl sm:text-3xl text-center font-bold rounded-xl
                  border-3 outline-none transition-all
                  ${feedback === 'correct'
                    ? 'border-green-400 bg-green-50'
                    : feedback === 'incorrect'
                    ? 'border-red-400 bg-red-50'
                    : 'border-amber-300 focus:border-amber-500 bg-white'
                  }
                  ${shake ? 'animate-shake' : ''}
                `}
                style={{
                  borderWidth: '3px',
                }}
                maxLength={3}
              />
            </div>
          )}

          {/* Feedback message */}
          <div className="mt-4 text-center min-h-[32px]">
            {feedback === 'correct' && (
              <p className="text-lg font-bold text-green-600 animate-bounce">
                🎉 Correct! {round.totalSlices} ÷ {round.numFriends} = {round.correctAnswer}!
              </p>
            )}
            {feedback === 'incorrect' && (
              <p className="text-base font-bold text-red-600">
                Not quite! Try again. Think: {round.totalSlices} ÷ {round.numFriends} = ?
              </p>
            )}
          </div>

          {/* Check button */}
          <div className="mt-4 text-center">
            <button
              onClick={checkAnswer}
              disabled={
                isChecking ||
                isCelebrating ||
                (inputMode === 'answer' && !answer.trim()) ||
                (inputMode === 'distribute' && !allDistributed)
              }
              className={`font-bold rounded-xl px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg shadow-lg
                transition-all cursor-pointer
                ${isChecking || isCelebrating ||
                  (inputMode === 'answer' && !answer.trim()) ||
                  (inputMode === 'distribute' && !allDistributed)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:scale-105 active:scale-95'
                }
              `}
            >
              {inputMode === 'distribute' && !allDistributed
                ? `Distribute all slices first (${round.totalSlices - distributedCount} left)`
                : 'Check Answer!'
              }
            </button>
          </div>

          {/* Hint */}
          <div className="mt-4 text-center">
            <p className="text-xs sm:text-sm text-amber-600">
              💡 Hint: Division means splitting fairly into equal groups!
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes pizzaSliceBounce {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          60% { transform: scale(1.2) rotate(10deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
