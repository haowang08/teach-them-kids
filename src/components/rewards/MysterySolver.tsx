import { useState, useCallback, useEffect, useMemo } from 'react';

// ============================================
// TYPES
// ============================================

type GamePhase = 'intro' | 'playing' | 'checking' | 'round-complete' | 'game-complete';
type PuzzleType = 'pattern' | 'logic-grid' | 'whodunit';
type Difficulty = 'easy' | 'medium' | 'hard';

interface Clue {
  id: string;
  text: string;
  isKey: boolean; // Key clues are essential to solve
}

interface PatternPuzzle {
  type: 'pattern';
  sequence: (number | string)[];
  answer: number | string;
  hint: string;
  clues: Clue[];
}

interface LogicGridPuzzle {
  type: 'logic-grid';
  scenario: string;
  categories: { name: string; items: string[] }[];
  clues: Clue[];
  answer: Record<string, string>; // person -> item mapping
  question: string;
}

interface WhodunitPuzzle {
  type: 'whodunit';
  scenario: string;
  suspects: { name: string; alibi: string }[];
  clues: Clue[];
  answer: string;
  question: string;
}

type Puzzle = PatternPuzzle | LogicGridPuzzle | WhodunitPuzzle;

interface Round {
  puzzle: Puzzle;
  difficulty: Difficulty;
  points: number;
}

// Notepad entry type - reserved for future notepad feature
// interface NotepadEntry { id: string; clueId: string; note: string; isMarkedImportant: boolean; }

// ============================================
// PUZZLE DATA
// ============================================

const PATTERN_PUZZLES: PatternPuzzle[] = [
  {
    type: 'pattern',
    sequence: [2, 4, 6, 8, '?'],
    answer: 10,
    hint: 'What happens to each number as you move right?',
    clues: [
      { id: 'p1c1', text: 'Each number increases by the same amount', isKey: true },
      { id: 'p1c2', text: 'The pattern involves even numbers', isKey: false },
      { id: 'p1c3', text: 'Add 2 to get the next number', isKey: true },
    ],
  },
  {
    type: 'pattern',
    sequence: [1, 4, 9, 16, '?'],
    answer: 25,
    hint: 'Think about multiplication with the same number...',
    clues: [
      { id: 'p2c1', text: 'These are special numbers called squares', isKey: true },
      { id: 'p2c2', text: '1=1x1, 4=2x2, 9=3x3, 16=4x4', isKey: true },
      { id: 'p2c3', text: 'What is 5 times 5?', isKey: false },
    ],
  },
  {
    type: 'pattern',
    sequence: [1, 1, 2, 3, 5, '?'],
    answer: 8,
    hint: 'Look at how each number relates to the two before it',
    clues: [
      { id: 'p3c1', text: 'Add the previous two numbers together', isKey: true },
      { id: 'p3c2', text: 'This famous sequence appears in nature', isKey: false },
      { id: 'p3c3', text: '1+1=2, 1+2=3, 2+3=5, so 3+5=?', isKey: true },
    ],
  },
  {
    type: 'pattern',
    sequence: ['A', 'C', 'E', 'G', '?'],
    answer: 'I',
    hint: 'Think about the alphabet and skipping',
    clues: [
      { id: 'p4c1', text: 'We skip one letter each time', isKey: true },
      { id: 'p4c2', text: 'A, skip B, C, skip D, E, skip F, G, skip H, ?', isKey: true },
      { id: 'p4c3', text: 'These are odd-positioned letters in the alphabet', isKey: false },
    ],
  },
  {
    type: 'pattern',
    sequence: [3, 6, 12, 24, '?'],
    answer: 48,
    hint: 'Each number grows in a multiplicative way',
    clues: [
      { id: 'p5c1', text: 'Each number is double the previous', isKey: true },
      { id: 'p5c2', text: 'Multiply by 2 each time', isKey: true },
      { id: 'p5c3', text: '24 x 2 = ?', isKey: false },
    ],
  },
];

const LOGIC_GRID_PUZZLES: LogicGridPuzzle[] = [
  {
    type: 'logic-grid',
    scenario: 'Three friends (Alex, Blake, Casey) each have a different pet (dog, cat, fish). Figure out who has what!',
    categories: [
      { name: 'Person', items: ['Alex', 'Blake', 'Casey'] },
      { name: 'Pet', items: ['Dog', 'Cat', 'Fish'] },
    ],
    clues: [
      { id: 'lg1c1', text: 'Alex is allergic to fur, so no dogs or cats for Alex', isKey: true },
      { id: 'lg1c2', text: 'Blake walks their pet every morning', isKey: true },
      { id: 'lg1c3', text: 'Casey does not have a fish', isKey: false },
    ],
    answer: { 'Alex': 'Fish', 'Blake': 'Dog', 'Casey': 'Cat' },
    question: 'What pet does Blake have?',
  },
  {
    type: 'logic-grid',
    scenario: 'Three students (Dana, Evan, Fiona) finished a race in 1st, 2nd, and 3rd place. Who won?',
    categories: [
      { name: 'Runner', items: ['Dana', 'Evan', 'Fiona'] },
      { name: 'Place', items: ['1st', '2nd', '3rd'] },
    ],
    clues: [
      { id: 'lg2c1', text: 'Evan did not finish last', isKey: false },
      { id: 'lg2c2', text: 'Dana finished right after Fiona', isKey: true },
      { id: 'lg2c3', text: 'Fiona did not win the race', isKey: true },
    ],
    answer: { 'Dana': '3rd', 'Evan': '1st', 'Fiona': '2nd' },
    question: 'Who finished in 1st place?',
  },
  {
    type: 'logic-grid',
    scenario: 'Three houses (Red, Blue, Green) are in a row. Three people (Gina, Hank, Iris) each live in one. Who lives where?',
    categories: [
      { name: 'Person', items: ['Gina', 'Hank', 'Iris'] },
      { name: 'House', items: ['Red', 'Blue', 'Green'] },
    ],
    clues: [
      { id: 'lg3c1', text: 'Gina lives in the house at one end, not the middle', isKey: false },
      { id: 'lg3c2', text: 'The Blue house is in the middle', isKey: true },
      { id: 'lg3c3', text: 'Hank lives in the Blue house', isKey: true },
      { id: 'lg3c4', text: 'Iris does not live in the Red house', isKey: true },
    ],
    answer: { 'Gina': 'Red', 'Hank': 'Blue', 'Iris': 'Green' },
    question: 'Which house does Iris live in?',
  },
];

const WHODUNIT_PUZZLES: WhodunitPuzzle[] = [
  {
    type: 'whodunit',
    scenario: 'The school trophy has gone missing from the display case! It was there at 3:00 PM but gone by 4:00 PM.',
    suspects: [
      { name: 'Ms. Chen', alibi: 'I was teaching class from 2:30 to 4:30 PM. My students can confirm.' },
      { name: 'Mr. Davis', alibi: 'I left school at 2:45 PM for a dentist appointment. I have a receipt.' },
      { name: 'Student Sam', alibi: 'I was at soccer practice on the field from 3:15 to 5:00 PM.' },
      { name: 'Janitor Joe', alibi: 'I was cleaning the gym from 2:00 to 3:30 PM, then took my break.' },
    ],
    clues: [
      { id: 'w1c1', text: 'The display case key was found in the janitor supply closet', isKey: true },
      { id: 'w1c2', text: 'Security footage shows someone near the case at 3:35 PM', isKey: true },
      { id: 'w1c3', text: 'Janitor Joe has access to all keys in the school', isKey: true },
      { id: 'w1c4', text: 'The trophy was heavy and would need to be hidden nearby', isKey: false },
    ],
    answer: 'Janitor Joe',
    question: 'Who took the trophy?',
  },
  {
    type: 'whodunit',
    scenario: 'Someone ate the last slice of birthday cake from the fridge between 7 PM and 9 PM!',
    suspects: [
      { name: 'Mom', alibi: 'I was reading in my room all evening with the door open.' },
      { name: 'Dad', alibi: 'I was in the garage fixing my car. My hands were covered in oil.' },
      { name: 'Sister Lily', alibi: 'I was video-calling my friend from 6:30 to 9:30 PM.' },
      { name: 'Brother Max', alibi: 'I was playing video games in the living room the whole time.' },
    ],
    clues: [
      { id: 'w2c1', text: 'A trail of chocolate crumbs leads from the kitchen to the living room', isKey: true },
      { id: 'w2c2', text: 'The cake had chocolate frosting', isKey: true },
      { id: 'w2c3', text: 'Dad would have needed to wash his hands to eat cake', isKey: false },
      { id: 'w2c4', text: 'The video call app shows Lily was online the whole time', isKey: false },
    ],
    answer: 'Brother Max',
    question: 'Who ate the cake?',
  },
  {
    type: 'whodunit',
    scenario: 'The class hamster escaped its cage during lunch break! Who accidentally left the cage door open?',
    suspects: [
      { name: 'Teacher Ms. Park', alibi: 'I went to the teachers lounge for lunch and did not return until class.' },
      { name: 'Emma', alibi: 'I stayed in class to finish homework. I did not go near the hamster.' },
      { name: 'Lucas', alibi: 'I went to play basketball with friends the entire lunch.' },
      { name: 'Noah', alibi: 'I fed the hamster before lunch, then went to the cafeteria.' },
    ],
    clues: [
      { id: 'w3c1', text: 'The hamster food container was left open near the cage', isKey: true },
      { id: 'w3c2', text: 'Only students assigned to feed the hamster this week have the cage key', isKey: true },
      { id: 'w3c3', text: 'Noah is on hamster duty this week', isKey: true },
      { id: 'w3c4', text: 'The basketball court has cameras showing Lucas playing', isKey: false },
    ],
    answer: 'Noah',
    question: 'Who left the cage open?',
  },
];

// ============================================
// ROUND GENERATION
// ============================================

function generateRounds(): Round[] {
  const rounds: Round[] = [];

  // Round 1: Easy pattern
  const patternEasy = PATTERN_PUZZLES[Math.floor(Math.random() * 2)]; // First 2 are easier
  rounds.push({ puzzle: patternEasy, difficulty: 'easy', points: 100 });

  // Round 2: Medium pattern
  const patternMed = PATTERN_PUZZLES[2 + Math.floor(Math.random() * 3)];
  rounds.push({ puzzle: patternMed, difficulty: 'medium', points: 150 });

  // Round 3: Easy logic grid
  const gridEasy = LOGIC_GRID_PUZZLES[0];
  rounds.push({ puzzle: gridEasy, difficulty: 'easy', points: 200 });

  // Round 4: Medium logic grid
  const gridMed = LOGIC_GRID_PUZZLES[1 + Math.floor(Math.random() * 2)];
  rounds.push({ puzzle: gridMed, difficulty: 'medium', points: 250 });

  // Round 5: Whodunit
  const whodunit = WHODUNIT_PUZZLES[Math.floor(Math.random() * WHODUNIT_PUZZLES.length)];
  rounds.push({ puzzle: whodunit, difficulty: 'hard', points: 300 });

  return rounds;
}

// ============================================
// COMPONENTS
// ============================================

interface ClueCardProps {
  clue: Clue;
  isRevealed: boolean;
  isMarkedImportant: boolean;
  onReveal: () => void;
  onToggleImportant: () => void;
}

function ClueCard({ clue, isRevealed, isMarkedImportant, onReveal, onToggleImportant }: ClueCardProps) {
  return (
    <div
      className={`relative rounded-lg border-2 transition-all duration-300 ${
        isRevealed
          ? isMarkedImportant
            ? 'bg-amber-900/40 border-amber-500'
            : 'bg-slate-800/60 border-slate-600'
          : 'bg-slate-900/80 border-slate-700 cursor-pointer hover:border-indigo-500'
      }`}
      onClick={() => !isRevealed && onReveal()}
    >
      <div className="p-3">
        {isRevealed ? (
          <>
            <p className="text-slate-200 text-sm leading-relaxed">{clue.text}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleImportant();
              }}
              className={`mt-2 text-xs px-2 py-1 rounded transition-colors ${
                isMarkedImportant
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
              }`}
            >
              {isMarkedImportant ? '* Key Clue' : 'Mark as Key'}
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center h-12">
            <span className="text-indigo-400 text-sm font-medium">Click to reveal clue</span>
          </div>
        )}
      </div>
    </div>
  );
}

interface NotepadProps {
  notes: string;
  onNotesChange: (notes: string) => void;
}

function Notepad({ notes, onNotesChange }: NotepadProps) {
  return (
    <div className="bg-amber-100 rounded-lg p-3 shadow-inner">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">📝</span>
        <span className="text-amber-900 font-bold text-sm">Detective Notepad</span>
      </div>
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="Jot down your thoughts and deductions here..."
        className="w-full h-24 bg-amber-50 border border-amber-300 rounded p-2 text-amber-900 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
    </div>
  );
}

interface PatternDisplayProps {
  puzzle: PatternPuzzle;
}

function PatternDisplay({ puzzle }: PatternDisplayProps) {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {puzzle.sequence.map((item, idx) => (
        <div
          key={idx}
          className={`w-14 h-14 flex items-center justify-center rounded-lg text-xl font-bold ${
            item === '?'
              ? 'bg-indigo-600 text-indigo-200 border-2 border-indigo-400 animate-pulse'
              : 'bg-slate-700 text-white border border-slate-600'
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

interface LogicGridDisplayProps {
  puzzle: LogicGridPuzzle;
}

function LogicGridDisplay({ puzzle }: LogicGridDisplayProps) {
  return (
    <div className="space-y-3">
      <p className="text-slate-300 text-sm leading-relaxed">{puzzle.scenario}</p>
      <div className="flex flex-wrap gap-4 justify-center">
        {puzzle.categories.map((cat, idx) => (
          <div key={idx} className="bg-slate-800/60 rounded-lg p-3">
            <div className="text-indigo-400 font-bold text-sm mb-2">{cat.name}</div>
            <div className="flex flex-wrap gap-1">
              {cat.items.map((item, i) => (
                <span
                  key={i}
                  className="bg-slate-700 text-slate-200 px-2 py-1 rounded text-xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface WhodunitDisplayProps {
  puzzle: WhodunitPuzzle;
}

function WhodunitDisplay({ puzzle }: WhodunitDisplayProps) {
  const [expandedSuspect, setExpandedSuspect] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <p className="text-slate-300 text-sm leading-relaxed">{puzzle.scenario}</p>
      <div className="grid grid-cols-2 gap-2">
        {puzzle.suspects.map((suspect) => (
          <div
            key={suspect.name}
            className={`bg-slate-800/60 rounded-lg p-3 cursor-pointer transition-all ${
              expandedSuspect === suspect.name ? 'ring-2 ring-indigo-500' : ''
            }`}
            onClick={() => setExpandedSuspect(expandedSuspect === suspect.name ? null : suspect.name)}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🔍</span>
              <span className="text-indigo-300 font-bold text-sm">{suspect.name}</span>
            </div>
            {expandedSuspect === suspect.name && (
              <p className="text-slate-400 text-xs mt-2 italic">"{suspect.alibi}"</p>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 text-center">Click a suspect to see their alibi</p>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function MysterySolver() {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');
  const [revealedClues, setRevealedClues] = useState<Set<string>>(new Set());
  const [importantClues, setImportantClues] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  // Responsive check
  useEffect(() => {
    function check() {
      setIsSmall(window.innerWidth < 640);
    }
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const round = rounds[currentRound];

  // Get possible answers for current puzzle
  const possibleAnswers = useMemo(() => {
    if (!round) return [];
    const puzzle = round.puzzle;

    if (puzzle.type === 'pattern') {
      return [];
    } else if (puzzle.type === 'logic-grid') {
      // Return items from the second category (what we're matching)
      return puzzle.categories[1].items;
    } else if (puzzle.type === 'whodunit') {
      return puzzle.suspects.map(s => s.name);
    }
    return [];
  }, [round]);

  const handleStart = useCallback(() => {
    const newRounds = generateRounds();
    setRounds(newRounds);
    setCurrentRound(0);
    setScore(0);
    setUserAnswer('');
    setFeedback('none');
    setRevealedClues(new Set());
    setImportantClues(new Set());
    setNotes('');
    setAttempts(0);
    setShowHint(false);
    setPhase('playing');
  }, []);

  const handleRevealClue = useCallback((clueId: string) => {
    setRevealedClues(prev => new Set([...prev, clueId]));
  }, []);

  const handleToggleImportant = useCallback((clueId: string) => {
    setImportantClues(prev => {
      const newSet = new Set(prev);
      if (newSet.has(clueId)) {
        newSet.delete(clueId);
      } else {
        newSet.add(clueId);
      }
      return newSet;
    });
  }, []);

  const checkAnswer = useCallback(() => {
    if (!round || !userAnswer.trim()) return;

    setPhase('checking');
    const puzzle = round.puzzle;
    let isCorrect = false;

    if (puzzle.type === 'pattern') {
      const normalizedAnswer = userAnswer.trim().toUpperCase();
      const correctAnswer = String(puzzle.answer).toUpperCase();
      isCorrect = normalizedAnswer === correctAnswer;
    } else if (puzzle.type === 'logic-grid') {
      // The answer is a mapping, we check the specific question's answer
      const questionKey = puzzle.question.includes('Blake') ? 'Blake'
        : puzzle.question.includes('1st') ? 'Evan'
        : 'Iris';
      const correctAnswer = puzzle.answer[questionKey];
      isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
    } else if (puzzle.type === 'whodunit') {
      isCorrect = userAnswer.toLowerCase() === puzzle.answer.toLowerCase();
    }

    if (isCorrect) {
      setFeedback('correct');
      // Calculate points with bonus for fewer attempts
      const attemptBonus = Math.max(0, 3 - attempts) * 25;
      const clueBonus = revealedClues.size < puzzle.clues.length ? 50 : 0;
      const earnedPoints = round.points + attemptBonus + clueBonus;

      // CRITICAL: Use functional state update for score
      setScore(prev => prev + earnedPoints);

      setTimeout(() => {
        setPhase('round-complete');
      }, 1500);
    } else {
      setFeedback('incorrect');
      // CRITICAL: Use functional state update for attempts
      setAttempts(prev => prev + 1);

      setTimeout(() => {
        setFeedback('none');
        setPhase('playing');
      }, 1200);
    }
  }, [round, userAnswer, attempts, revealedClues]);

  const handleNextRound = useCallback(() => {
    if (currentRound >= rounds.length - 1) {
      setPhase('game-complete');
    } else {
      setCurrentRound(prev => prev + 1);
      setUserAnswer('');
      setFeedback('none');
      setRevealedClues(new Set());
      setImportantClues(new Set());
      setNotes('');
      setAttempts(0);
      setShowHint(false);
      setPhase('playing');
    }
  }, [currentRound, rounds.length]);

  const handleRestart = useCallback(() => {
    setPhase('intro');
    setRounds([]);
    setCurrentRound(0);
    setScore(0);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && phase === 'playing' && userAnswer.trim()) {
      checkAnswer();
    }
  }, [phase, userAnswer, checkAnswer]);

  // Calculate max possible score
  const maxScore = useMemo(() => {
    return rounds.reduce((sum, r) => sum + r.points + 75 + 50, 0); // points + max attempt bonus + clue bonus
  }, [rounds]);

  // Get puzzle type display name
  const getPuzzleTypeName = (type: PuzzleType): string => {
    switch (type) {
      case 'pattern': return 'Pattern Sequence';
      case 'logic-grid': return 'Logic Grid';
      case 'whodunit': return 'Who Done It?';
    }
  };

  // ============================================
  // RENDER
  // ============================================

  // --- INTRO SCREEN ---
  if (phase === 'intro') {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 min-h-[400px] font-sans border-2 border-indigo-800 shadow-xl shadow-indigo-900/30">
        <div className="text-center">
          <div className={`${isSmall ? 'text-5xl' : 'text-6xl'} mb-4`}>🔍</div>
          <h2 className={`${isSmall ? 'text-2xl' : 'text-3xl'} font-extrabold text-indigo-300 mb-2`} style={{ textShadow: '0 0 20px rgba(99, 102, 241, 0.5)' }}>
            MYSTERY SOLVER
          </h2>
          <p className="text-emerald-400 text-sm font-mono mb-6">DETECTIVE TRAINING PROGRAM</p>

          <div className="bg-slate-800/60 rounded-xl p-5 max-w-lg mx-auto mb-6 text-left border border-slate-700">
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              <strong className="text-indigo-400">WELCOME, DETECTIVE!</strong>
              <br /><br />
              You have been selected to join the Mystery Solver Division. Your mission is to
              solve a series of challenging logic puzzles using your powers of deduction.
            </p>
            <div className="space-y-2 text-slate-400 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-amber-400">1.</span>
                <span><strong className="text-amber-400">Pattern Sequences</strong> - Find the missing piece</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400">2.</span>
                <span><strong className="text-amber-400">Logic Grids</strong> - Match clues to solve puzzles</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400">3.</span>
                <span><strong className="text-amber-400">Who Done It</strong> - Identify the culprit</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-900/30 rounded-lg p-3 max-w-md mx-auto mb-6 border border-amber-700">
            <p className="text-amber-300 text-xs">
              Use the clue board to gather evidence. Mark important clues and take notes in your detective notepad!
            </p>
          </div>

          <button
            onClick={handleStart}
            className={`${isSmall ? 'px-8 py-3 text-base' : 'px-10 py-4 text-lg'} rounded-xl border-2 border-indigo-500 bg-gradient-to-b from-indigo-600 to-indigo-800 text-white font-bold cursor-pointer shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:scale-105 hover:shadow-indigo-500/50`}
          >
            BEGIN INVESTIGATION
          </button>
        </div>
      </div>
    );
  }

  // --- GAME COMPLETE SCREEN ---
  if (phase === 'game-complete') {
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    const rank = percentage >= 90 ? 'MASTER DETECTIVE'
      : percentage >= 70 ? 'SENIOR INVESTIGATOR'
      : percentage >= 50 ? 'JUNIOR DETECTIVE'
      : 'TRAINEE';

    return (
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 min-h-[400px] font-sans border-2 border-indigo-800">
        <div className="text-center">
          <div className={`${isSmall ? 'text-5xl' : 'text-6xl'} mb-4`}>🏆</div>
          <h2 className={`${isSmall ? 'text-2xl' : 'text-3xl'} font-extrabold text-amber-400 mb-2`} style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}>
            CASE CLOSED!
          </h2>
          <p className="text-emerald-400 text-base font-mono mb-6">
            RANK: {rank}
          </p>

          <div className="bg-slate-800/60 rounded-xl p-5 max-w-sm mx-auto mb-6 border border-slate-700">
            <div className={`${isSmall ? 'text-4xl' : 'text-5xl'} font-extrabold text-indigo-400 mb-2`}>
              {score}
            </div>
            <div className="text-slate-400 text-sm mb-4">TOTAL POINTS</div>

            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-emerald-400 text-2xl font-bold">{rounds.length}</div>
                <div className="text-slate-500 text-xs">CASES SOLVED</div>
              </div>
              <div className="text-center">
                <div className="text-amber-400 text-2xl font-bold">{percentage}%</div>
                <div className="text-slate-500 text-xs">EFFICIENCY</div>
              </div>
            </div>
          </div>

          <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
            Excellent work, Detective! You have proven your deductive skills across multiple
            puzzle types. The Mystery Solver Division is proud to have you on the team.
          </p>

          <button
            onClick={handleRestart}
            className="px-8 py-3 rounded-xl border-2 border-indigo-500 bg-gradient-to-b from-indigo-600 to-indigo-800 text-white font-bold cursor-pointer shadow-lg shadow-indigo-500/30 transition-all hover:scale-105"
          >
            NEW CASE FILE
          </button>
        </div>
      </div>
    );
  }

  // --- ROUND COMPLETE SCREEN ---
  if (phase === 'round-complete' && round) {
    const isLastRound = currentRound >= rounds.length - 1;

    return (
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 min-h-[400px] font-sans border-2 border-indigo-800">
        <div className="text-center">
          <div className={`${isSmall ? 'text-5xl' : 'text-6xl'} mb-4`}>✅</div>
          <h2 className={`${isSmall ? 'text-xl' : 'text-2xl'} font-extrabold text-emerald-400 mb-2`} style={{ textShadow: '0 0 15px rgba(52, 211, 153, 0.5)' }}>
            MYSTERY SOLVED!
          </h2>

          <div className="bg-slate-800/60 rounded-xl p-4 max-w-sm mx-auto mb-6 border border-emerald-600">
            <p className="text-slate-400 text-sm mb-2">
              Case #{currentRound + 1}: {getPuzzleTypeName(round.puzzle.type)}
            </p>
            <p className="text-emerald-400 text-xl font-mono font-bold">
              {round.puzzle.type === 'pattern' ? round.puzzle.answer : userAnswer}
            </p>
          </div>

          <div className="flex justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-amber-400 text-3xl font-bold">{score}</div>
              <div className="text-slate-500 text-xs">TOTAL SCORE</div>
            </div>
            <div className="text-center">
              <div className="text-indigo-400 text-3xl font-bold">{currentRound + 1}/{rounds.length}</div>
              <div className="text-slate-500 text-xs">CASES</div>
            </div>
          </div>

          <button
            onClick={handleNextRound}
            className="px-8 py-3 rounded-xl border-2 border-emerald-500 bg-gradient-to-b from-emerald-600 to-emerald-800 text-white font-bold cursor-pointer shadow-lg shadow-emerald-500/30 transition-all hover:scale-105"
          >
            {isLastRound ? 'VIEW RESULTS' : 'NEXT CASE'}
          </button>
        </div>
      </div>
    );
  }

  // --- PLAYING / CHECKING SCREEN ---
  if (!round) return null;

  const puzzle = round.puzzle;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-4 md:p-6 font-sans border-2 border-indigo-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <div className="bg-indigo-900/50 border border-indigo-600 rounded-full px-4 py-1">
          <span className="text-indigo-300 font-bold text-sm">
            CASE {currentRound + 1} / {rounds.length}
          </span>
        </div>
        <div className="flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            round.difficulty === 'easy' ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-600' :
            round.difficulty === 'medium' ? 'bg-amber-900/50 text-amber-400 border border-amber-600' :
            'bg-red-900/50 text-red-400 border border-red-600'
          }`}>
            {round.difficulty.toUpperCase()}
          </span>
          <div className="bg-amber-900/50 border border-amber-600 rounded-full px-4 py-1">
            <span className="text-amber-300 font-bold text-sm">SCORE: {score}</span>
          </div>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-4">
        {rounds.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i < currentRound ? 'bg-emerald-500' :
              i === currentRound ? 'bg-indigo-500 shadow-lg shadow-indigo-500/50' :
              'bg-slate-700'
            }`}
          />
        ))}
      </div>

      {/* Puzzle type badge */}
      <div className="text-center mb-4">
        <span className="bg-slate-800 border border-slate-600 rounded px-3 py-1 text-amber-400 text-xs font-mono">
          {getPuzzleTypeName(puzzle.type)} | +{round.points} pts
        </span>
      </div>

      {/* Puzzle display */}
      <div className="bg-slate-800/40 rounded-xl p-4 mb-4 border border-slate-700">
        {puzzle.type === 'pattern' && <PatternDisplay puzzle={puzzle} />}
        {puzzle.type === 'logic-grid' && <LogicGridDisplay puzzle={puzzle} />}
        {puzzle.type === 'whodunit' && <WhodunitDisplay puzzle={puzzle} />}
      </div>

      {/* Clue Board */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">📋</span>
          <span className="text-indigo-300 font-bold text-sm">CLUE BOARD</span>
          <span className="text-slate-500 text-xs">({revealedClues.size}/{puzzle.clues.length} revealed)</span>
        </div>
        <div className={`grid ${isSmall ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}>
          {puzzle.clues.map((clue) => (
            <ClueCard
              key={clue.id}
              clue={clue}
              isRevealed={revealedClues.has(clue.id)}
              isMarkedImportant={importantClues.has(clue.id)}
              onReveal={() => handleRevealClue(clue.id)}
              onToggleImportant={() => handleToggleImportant(clue.id)}
            />
          ))}
        </div>
      </div>

      {/* Notepad */}
      <div className="mb-4">
        <Notepad notes={notes} onNotesChange={setNotes} />
      </div>

      {/* Hint button */}
      <div className="mb-4 text-center">
        {!showHint ? (
          <button
            onClick={() => setShowHint(true)}
            className="px-4 py-2 border border-slate-600 bg-transparent text-slate-400 text-sm rounded-lg transition-colors hover:border-amber-500 hover:text-amber-400"
          >
            Need a Hint?
          </button>
        ) : (
          <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-3 max-w-md mx-auto">
            <p className="text-amber-300 text-sm">
              {puzzle.type === 'pattern' ? puzzle.hint :
               puzzle.type === 'logic-grid' ? 'Use the clues to eliminate impossible combinations. Start with the most definitive clues.' :
               'Check each alibi carefully against the clues. Look for contradictions or impossible timelines.'}
            </p>
          </div>
        )}
      </div>

      {/* Question and Answer input */}
      <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
        <label className="block text-indigo-300 font-bold text-sm mb-3 text-center">
          {puzzle.type === 'pattern' ? 'What number/letter comes next?' :
           puzzle.type === 'logic-grid' ? puzzle.question :
           puzzle.question}
        </label>

        {puzzle.type === 'pattern' ? (
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value.toUpperCase())}
            onKeyDown={handleKeyDown}
            disabled={phase === 'checking'}
            placeholder="Enter your answer..."
            className={`w-full p-3 text-xl font-mono text-center uppercase bg-slate-900 border-2 rounded-lg text-white outline-none transition-all ${
              feedback === 'correct' ? 'border-emerald-500 bg-emerald-900/30' :
              feedback === 'incorrect' ? 'border-red-500 bg-red-900/30 animate-shake' :
              'border-slate-600 focus:border-indigo-500'
            }`}
          />
        ) : (
          <div className="flex flex-wrap gap-2 justify-center">
            {possibleAnswers.map((answer) => (
              <button
                key={answer}
                onClick={() => setUserAnswer(answer)}
                disabled={phase === 'checking'}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  userAnswer === answer
                    ? feedback === 'correct'
                      ? 'bg-emerald-600 text-white border-2 border-emerald-400'
                      : feedback === 'incorrect'
                      ? 'bg-red-600 text-white border-2 border-red-400 animate-shake'
                      : 'bg-indigo-600 text-white border-2 border-indigo-400'
                    : 'bg-slate-700 text-slate-300 border-2 border-slate-600 hover:border-indigo-500'
                }`}
              >
                {answer}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Attempt counter */}
      {attempts > 0 && (
        <div className="text-center mt-3">
          <span className="text-red-400 text-sm">
            Attempts: {attempts} {attempts >= 3 && '- Review the clues carefully!'}
          </span>
        </div>
      )}

      {/* Feedback message */}
      <div className="min-h-[28px] text-center mt-3">
        {feedback === 'correct' && (
          <span className="text-emerald-400 text-base font-bold">
            Correct! Mystery solved!
          </span>
        )}
        {feedback === 'incorrect' && (
          <span className="text-red-400 text-base font-bold">
            Not quite... Check the clues again!
          </span>
        )}
      </div>

      {/* Submit button */}
      <div className="text-center mt-4">
        <button
          onClick={checkAnswer}
          disabled={phase === 'checking' || !userAnswer.trim()}
          className={`px-8 py-3 rounded-xl border-2 font-bold text-base transition-all ${
            phase === 'checking' || !userAnswer.trim()
              ? 'bg-slate-700 border-slate-600 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-b from-indigo-600 to-indigo-800 border-indigo-500 text-white cursor-pointer shadow-lg shadow-indigo-500/30 hover:scale-105'
          }`}
        >
          SUBMIT ANSWER
        </button>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}
