import React, { useState, useCallback, useEffect, useRef } from 'react';

// ============================================
// TYPES
// ============================================

interface TreasureChestProps {
  onComplete?: () => void;
}

type GamePhase = 'intro' | 'playing' | 'celebration' | 'complete';

interface Problem {
  a: number;
  b: number;
  answer: number;
}

interface Chest {
  id: number;
  problems: Problem[];
  goldReward: number;
  unlocked: boolean;
  currentProblemIndex: number;
  solvedProblems: boolean[];
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
}

// ============================================
// CONSTANTS
// ============================================

const CHEST_COLORS = ['#B8860B', '#CD853F', '#8B4513', '#DAA520'];
const GOLD_COLOR = '#FFD700';
const LOCK_COLOR = '#4A4A4A';
const CHEST_BG_GRADIENT = 'linear-gradient(180deg, #8B4513 0%, #5D2E0C 100%)';

// Generate multiplication problems with increasing difficulty
function generateProblems(chestIndex: number): Problem[] {
  const problems: Problem[] = [];
  const count = chestIndex === 0 ? 3 : 4; // First chest has 3, rest have 4

  // Difficulty ranges based on chest index
  const ranges = [
    { minA: 2, maxA: 5, minB: 2, maxB: 5 },   // Chest 1: easy (2-5)
    { minA: 3, maxA: 6, minB: 3, maxB: 6 },   // Chest 2: medium (3-6)
    { minA: 4, maxA: 7, minB: 4, maxB: 7 },   // Chest 3: harder (4-7)
    { minA: 5, maxA: 9, minB: 5, maxB: 9 },   // Chest 4: hardest (5-9)
  ];

  const range = ranges[chestIndex] || ranges[3];
  const usedPairs = new Set<string>();

  while (problems.length < count) {
    const a = Math.floor(Math.random() * (range.maxA - range.minA + 1)) + range.minA;
    const b = Math.floor(Math.random() * (range.maxB - range.minB + 1)) + range.minB;
    const pairKey = `${Math.min(a, b)}-${Math.max(a, b)}`;

    if (!usedPairs.has(pairKey)) {
      usedPairs.add(pairKey);
      problems.push({ a, b, answer: a * b });
    }
  }

  return problems;
}

function generateChests(): Chest[] {
  const goldRewards = [25, 50, 75, 100];
  return Array.from({ length: 4 }, (_, i) => ({
    id: i,
    problems: generateProblems(i),
    goldReward: goldRewards[i],
    unlocked: false,
    currentProblemIndex: 0,
    solvedProblems: [],
  }));
}

// ============================================
// SVG Components
// ============================================

const LockIcon: React.FC<{ unlocked: boolean; glowing: boolean }> = ({ unlocked, glowing }) => (
  <svg viewBox="0 0 40 50" className="w-8 h-10">
    <defs>
      {glowing && (
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      )}
    </defs>
    {/* Lock shackle */}
    <path
      d={unlocked
        ? "M 10 22 L 10 12 C 10 5 16 0 20 0 C 24 0 30 5 30 12 L 30 14"
        : "M 10 22 L 10 12 C 10 5 16 0 20 0 C 24 0 30 5 30 12 L 30 22"
      }
      fill="none"
      stroke={unlocked ? GOLD_COLOR : LOCK_COLOR}
      strokeWidth="4"
      strokeLinecap="round"
      filter={glowing ? "url(#glow)" : undefined}
      style={{
        transition: 'all 0.3s ease',
        transform: unlocked ? 'rotate(-15deg)' : 'rotate(0deg)',
        transformOrigin: '30px 22px',
      }}
    />
    {/* Lock body */}
    <rect
      x="5"
      y="22"
      width="30"
      height="24"
      rx="3"
      fill={unlocked ? GOLD_COLOR : LOCK_COLOR}
      filter={glowing ? "url(#glow)" : undefined}
      style={{ transition: 'fill 0.3s ease' }}
    />
    {/* Keyhole */}
    <circle cx="20" cy="32" r="4" fill={unlocked ? '#B8860B' : '#2A2A2A'} />
    <rect x="18" y="32" width="4" height="8" fill={unlocked ? '#B8860B' : '#2A2A2A'} />
  </svg>
);

const ChestSVG: React.FC<{ open: boolean; glowing: boolean; color: string }> = ({ open, glowing, color }) => (
  <svg viewBox="0 0 120 100" className="w-full h-full">
    <defs>
      {glowing && (
        <filter id="chestGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      )}
      <linearGradient id={`chestGrad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#3D1F0D" />
      </linearGradient>
    </defs>

    {/* Chest base */}
    <rect
      x="10"
      y="50"
      width="100"
      height="45"
      rx="5"
      fill={`url(#chestGrad-${color})`}
      stroke="#2A1506"
      strokeWidth="2"
      filter={glowing ? "url(#chestGlow)" : undefined}
    />

    {/* Metal bands on base */}
    <rect x="10" y="55" width="100" height="4" fill="#4A4A4A" opacity="0.7" />
    <rect x="10" y="75" width="100" height="4" fill="#4A4A4A" opacity="0.7" />

    {/* Chest lid */}
    <g style={{
      transformOrigin: '60px 50px',
      transform: open ? 'rotateX(-70deg) translateY(-20px)' : 'rotateX(0deg)',
      transition: 'transform 0.5s ease-out',
    }}>
      <path
        d="M 10 50 L 10 30 Q 60 10 110 30 L 110 50 Z"
        fill={`url(#chestGrad-${color})`}
        stroke="#2A1506"
        strokeWidth="2"
        filter={glowing ? "url(#chestGlow)" : undefined}
      />
      {/* Metal band on lid */}
      <path
        d="M 10 40 Q 60 20 110 40"
        fill="none"
        stroke="#4A4A4A"
        strokeWidth="4"
        opacity="0.7"
      />
    </g>

    {/* Gold coins inside (visible when open) */}
    {open && (
      <g>
        <circle cx="40" cy="60" r="8" fill={GOLD_COLOR} opacity="0.9" />
        <circle cx="60" cy="55" r="8" fill={GOLD_COLOR} opacity="0.9" />
        <circle cx="80" cy="60" r="8" fill={GOLD_COLOR} opacity="0.9" />
        <circle cx="50" cy="65" r="7" fill="#FFC800" opacity="0.8" />
        <circle cx="70" cy="65" r="7" fill="#FFC800" opacity="0.8" />
      </g>
    )}

    {/* Lock clasp area */}
    <rect x="50" y="45" width="20" height="15" rx="2" fill="#4A4A4A" />
  </svg>
);

const GoldCoinSVG: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <circle cx="12" cy="12" r="10" fill={GOLD_COLOR} />
    <circle cx="12" cy="12" r="8" fill="#FFC800" />
    <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#B8860B">$</text>
  </svg>
);

// ============================================
// COMPONENT
// ============================================

const TreasureChest: React.FC<TreasureChestProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [chests, setChests] = useState<Chest[]>(() => generateChests());
  const [currentChestIndex, setCurrentChestIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');
  const [totalGold, setTotalGold] = useState(0);
  const [_lockClicks, setLockClicks] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const particleIdRef = useRef(0);

  const currentChest = chests[currentChestIndex];
  const currentProblem = currentChest?.problems[currentChest.currentProblemIndex];
  const allChestsUnlocked = chests.every(c => c.unlocked);

  // Focus input when playing
  useEffect(() => {
    if (phase === 'playing' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase, currentChestIndex, currentChest?.currentProblemIndex]);

  // Spawn celebration particles
  const spawnParticles = useCallback((count: number, centerX: number, centerY: number) => {
    const colors = [GOLD_COLOR, '#FFC800', '#FFE066', '#B8860B', '#FF6B00'];
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const speed = 3 + Math.random() * 4;
      newParticles.push({
        id: particleIdRef.current++,
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 6,
        life: 60 + Math.random() * 30,
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  // Animate particles
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles(prev => prev
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.15, // gravity
          life: p.life - 1,
        }))
        .filter(p => p.life > 0)
      );
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [particles.length]);

  const handleStart = useCallback(() => {
    setPhase('playing');
    setChests(generateChests());
    setCurrentChestIndex(0);
    setTotalGold(0);
    setUserAnswer('');
    setFeedback('none');
    setLockClicks(0);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!currentProblem || userAnswer.trim() === '') return;

    const numAnswer = parseInt(userAnswer, 10);

    if (numAnswer === currentProblem.answer) {
      // Correct answer!
      setFeedback('correct');
      setLockClicks(prev => prev + 1);

      // Update chest state
      setChests(prev => {
        const newChests = [...prev];
        const chest = { ...newChests[currentChestIndex] };
        chest.solvedProblems = [...chest.solvedProblems, true];
        chest.currentProblemIndex = chest.currentProblemIndex + 1;

        // Check if all problems are solved
        if (chest.currentProblemIndex >= chest.problems.length) {
          chest.unlocked = true;
          // Add gold reward using functional update
          setTotalGold(prevGold => prevGold + chest.goldReward);
          // Spawn celebration particles
          spawnParticles(30, 150, 100);
          setPhase('celebration');
        }

        newChests[currentChestIndex] = chest;
        return newChests;
      });

      setUserAnswer('');

      setTimeout(() => {
        setFeedback('none');
      }, 500);
    } else {
      // Incorrect answer
      setFeedback('incorrect');
      setShake(true);

      setTimeout(() => {
        setFeedback('none');
        setShake(false);
        setUserAnswer('');
        inputRef.current?.focus();
      }, 800);
    }
  }, [currentProblem, userAnswer, currentChestIndex, spawnParticles]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && phase === 'playing') {
      handleSubmit();
    }
  }, [handleSubmit, phase]);

  const handleContinue = useCallback(() => {
    if (currentChestIndex >= chests.length - 1) {
      // All chests done
      setPhase('complete');
      if (onComplete) onComplete();
    } else {
      // Move to next chest
      setCurrentChestIndex(prev => prev + 1);
      setPhase('playing');
      setUserAnswer('');
      setFeedback('none');
      setLockClicks(0);
    }
  }, [currentChestIndex, chests.length, onComplete]);

  const handleRestart = useCallback(() => {
    setPhase('intro');
    setChests(generateChests());
    setCurrentChestIndex(0);
    setTotalGold(0);
    setUserAnswer('');
    setFeedback('none');
    setLockClicks(0);
    setParticles([]);
  }, []);

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="w-full max-w-xl mx-auto font-serif select-none">
      {/* Particle layer */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: p.life / 90,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* INTRO SCREEN */}
      {phase === 'intro' && (
        <div
          className="rounded-xl p-6 text-center"
          style={{ background: CHEST_BG_GRADIENT, border: '3px solid #DAA520' }}
        >
          <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-4 drop-shadow-lg">
            TREASURE CHEST
          </div>
          <div className="text-yellow-200 text-sm sm:text-base mb-4 max-w-md mx-auto">
            Unlock 4 treasure chests by solving multiplication problems!
            Each chest has a combination lock that opens when you answer correctly.
          </div>
          <div className="flex justify-center gap-4 mb-6">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="w-12 h-12 opacity-70">
                <ChestSVG open={false} glowing={false} color={CHEST_COLORS[i]} />
              </div>
            ))}
          </div>
          <div className="text-yellow-300 text-xs sm:text-sm mb-6">
            Solve multiplication problems like 7 x 8 = ? to crack the codes!
          </div>
          <button
            onClick={handleStart}
            className="px-8 py-3 text-lg font-bold text-amber-900 rounded-lg transition-transform hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(180deg, #FFD700 0%, #B8860B 100%)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              border: '2px solid #8B6914',
            }}
          >
            Start Unlocking!
          </button>
        </div>
      )}

      {/* PLAYING SCREEN */}
      {phase === 'playing' && currentChest && currentProblem && (
        <div
          className="rounded-xl p-4 sm:p-6"
          style={{ background: CHEST_BG_GRADIENT, border: '3px solid #DAA520' }}
        >
          {/* Progress header */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-yellow-400 text-sm font-bold">
              Chest {currentChestIndex + 1} of 4
            </div>
            <div className="flex items-center gap-2 text-yellow-400">
              <GoldCoinSVG size={20} />
              <span className="font-bold">{totalGold}</span>
            </div>
          </div>

          {/* Chest progress indicators */}
          <div className="flex justify-center gap-2 mb-4">
            {chests.map((chest, i) => (
              <div
                key={chest.id}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  chest.unlocked
                    ? 'bg-yellow-500 text-amber-900'
                    : i === currentChestIndex
                    ? 'bg-yellow-600 text-white ring-2 ring-yellow-300'
                    : 'bg-gray-600 text-gray-400'
                }`}
              >
                {chest.unlocked ? '!' : i + 1}
              </div>
            ))}
          </div>

          {/* Current chest display */}
          <div className="flex flex-col items-center mb-4">
            <div
              className={`w-32 h-28 relative transition-all duration-300 ${
                feedback === 'correct' ? 'scale-105' : ''
              }`}
            >
              <ChestSVG
                open={false}
                glowing={feedback === 'correct'}
                color={CHEST_COLORS[currentChestIndex]}
              />
            </div>

            {/* Lock with progress */}
            <div className="flex items-center gap-2 mt-2">
              <LockIcon unlocked={false} glowing={feedback === 'correct'} />
              <div className="flex gap-1">
                {currentChest.problems.map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i < currentChest.currentProblemIndex
                        ? 'bg-green-500'
                        : i === currentChest.currentProblemIndex
                        ? 'bg-yellow-400 animate-pulse'
                        : 'bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="text-yellow-300 text-xs mt-1">
              {currentChest.currentProblemIndex} / {currentChest.problems.length} locks opened
            </div>
          </div>

          {/* Gold reward preview */}
          <div className="text-center mb-4">
            <span className="text-yellow-200 text-sm">Reward: </span>
            <span className="text-yellow-400 font-bold">{currentChest.goldReward} gold coins</span>
          </div>

          {/* Problem display */}
          <div
            className={`bg-black/40 rounded-xl p-4 mb-4 transition-transform ${
              shake ? 'animate-shake' : ''
            }`}
          >
            <div className="text-center">
              <div className="text-yellow-300 text-sm mb-2">
                Solve to unlock:
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {currentProblem.a} <span className="text-yellow-400">x</span> {currentProblem.b} = <span className="text-yellow-400">?</span>
              </div>

              {/* Answer input */}
              <div className="flex justify-center items-center gap-3">
                <input
                  ref={inputRef}
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`w-24 sm:w-32 p-3 text-2xl text-center font-bold rounded-lg outline-none transition-all ${
                    feedback === 'correct'
                      ? 'bg-green-500 text-white border-green-400'
                      : feedback === 'incorrect'
                      ? 'bg-red-500 text-white border-red-400'
                      : 'bg-amber-100 text-amber-900 border-amber-400'
                  }`}
                  style={{ border: '3px solid' }}
                  placeholder="?"
                  min={0}
                  max={99}
                />
                <button
                  onClick={handleSubmit}
                  disabled={!userAnswer.trim()}
                  className={`px-6 py-3 font-bold rounded-lg transition-all ${
                    userAnswer.trim()
                      ? 'bg-yellow-500 hover:bg-yellow-400 text-amber-900'
                      : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  Check
                </button>
              </div>
            </div>
          </div>

          {/* Feedback message */}
          <div className="h-8 text-center">
            {feedback === 'correct' && (
              <div className="text-green-400 font-bold animate-bounce">
                Click! Lock opened!
              </div>
            )}
            {feedback === 'incorrect' && (
              <div className="text-red-400 font-bold">
                Try again!
              </div>
            )}
          </div>
        </div>
      )}

      {/* CELEBRATION SCREEN */}
      {phase === 'celebration' && (
        <div
          className="rounded-xl p-6 text-center"
          style={{ background: CHEST_BG_GRADIENT, border: '3px solid #DAA520' }}
        >
          <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-4 animate-bounce">
            CHEST UNLOCKED!
          </div>

          {/* Opened chest */}
          <div className="w-40 h-36 mx-auto mb-4">
            <ChestSVG open={true} glowing={true} color={CHEST_COLORS[currentChestIndex]} />
          </div>

          {/* Gold earned */}
          <div className="flex justify-center items-center gap-3 mb-4">
            <GoldCoinSVG size={40} />
            <span className="text-3xl font-bold text-yellow-400">
              +{chests[currentChestIndex].goldReward}
            </span>
          </div>

          <div className="text-yellow-200 mb-2">
            Total gold: <span className="text-yellow-400 font-bold">{totalGold}</span>
          </div>

          <div className="text-yellow-300 text-sm mb-6">
            {allChestsUnlocked
              ? 'All chests unlocked! You are a master treasure hunter!'
              : `${4 - currentChestIndex - 1} more chest${4 - currentChestIndex - 1 !== 1 ? 's' : ''} to go!`}
          </div>

          <button
            onClick={handleContinue}
            className="px-8 py-3 text-lg font-bold text-amber-900 rounded-lg transition-transform hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(180deg, #FFD700 0%, #B8860B 100%)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              border: '2px solid #8B6914',
            }}
          >
            {allChestsUnlocked ? 'See Results' : 'Next Chest'}
          </button>
        </div>
      )}

      {/* COMPLETE SCREEN */}
      {phase === 'complete' && (
        <div
          className="rounded-xl p-6 text-center"
          style={{
            background: 'radial-gradient(ellipse at center, #5D2E0C 0%, #2A1506 100%)',
            border: '3px solid #DAA520',
          }}
        >
          <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2 drop-shadow-lg">
            TREASURE MASTER!
          </div>

          <div className="text-yellow-200 mb-4">
            You unlocked all 4 chests!
          </div>

          {/* All chests opened */}
          <div className="flex justify-center gap-3 mb-6">
            {chests.map((chest, i) => (
              <div key={chest.id} className="w-16 h-14">
                <ChestSVG open={true} glowing={false} color={CHEST_COLORS[i]} />
              </div>
            ))}
          </div>

          {/* Total gold display */}
          <div className="bg-black/40 rounded-xl p-4 mb-6 inline-block">
            <div className="text-yellow-300 text-sm mb-2">Total Treasure Collected</div>
            <div className="flex justify-center items-center gap-3">
              <GoldCoinSVG size={48} />
              <span className="text-4xl sm:text-5xl font-bold text-yellow-400">{totalGold}</span>
            </div>
          </div>

          <div className="text-yellow-200 text-sm mb-6">
            {totalGold >= 250
              ? 'Perfect! You solved every problem correctly!'
              : 'Great job unlocking all the treasure!'}
          </div>

          <button
            onClick={handleRestart}
            className="px-8 py-3 text-lg font-bold text-amber-900 rounded-lg transition-transform hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(180deg, #FFD700 0%, #B8860B 100%)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              border: '2px solid #8B6914',
            }}
          >
            Play Again
          </button>
        </div>
      )}

      {/* Inject CSS animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default TreasureChest;
