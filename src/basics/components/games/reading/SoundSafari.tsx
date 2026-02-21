import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import type { BasicsGameProps } from '../../../types';
import type { PhonemeEntry, PhonemeWord } from '../../../data/readingContent';
import { useGameState } from '../../../hooks/useGameState';
import { useGameTTS } from '../../../hooks/useGameTTS';
import { useGameAudio } from '../../../hooks/useGameAudio';
import { PHONEMES } from '../../../data/readingContent';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TOTAL_ROUNDS = 8;
const CHOICES_PER_ROUND = 4;
const FONT = "'Fredoka', 'Nunito', system-ui, sans-serif";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

type RoundData = {
  phoneme: string;
  correctIndex: number;
  choices: (PhonemeWord & { isCorrect: boolean })[];
};

// ---------------------------------------------------------------------------
// Level → phoneme pool mapping (12 levels)
// ---------------------------------------------------------------------------

function getPhonemePool(level: number): PhonemeEntry[] {
  const consonants1 = PHONEMES.filter((p) =>
    ['b', 'c', 'd', 'f', 'g', 'h', 'j'].includes(p.phoneme),
  );
  const consonants2 = PHONEMES.filter((p) =>
    ['k', 'l', 'm', 'n', 'p', 'r', 's'].includes(p.phoneme),
  );
  const consonants3 = PHONEMES.filter((p) =>
    ['t', 'v', 'w', 'x', 'y', 'z', 'q'].includes(p.phoneme),
  );
  const allConsonants = [...consonants1, ...consonants2, ...consonants3];

  const digraphs1 = PHONEMES.filter((p) =>
    ['sh', 'ch', 'th'].includes(p.phoneme),
  );
  const digraphs2 = PHONEMES.filter((p) =>
    ['wh', 'ck', 'ng', 'ph'].includes(p.phoneme),
  );
  const allDigraphs = [...digraphs1, ...digraphs2];

  const blends1 = PHONEMES.filter((p) =>
    ['bl', 'cr', 'st', 'gr'].includes(p.phoneme),
  );
  const blends2 = PHONEMES.filter((p) =>
    ['tr', 'pl', 'fl', 'br', 'dr'].includes(p.phoneme),
  );
  const allBlends = [...blends1, ...blends2];

  switch (level) {
    case 0: return consonants1;
    case 1: return consonants2;
    case 2: return consonants3;
    case 3: return allConsonants;
    case 4: return digraphs1;
    case 5: return digraphs2;
    case 6: return allDigraphs;
    case 7: return blends1;
    case 8: return blends2;
    case 9: return allBlends;
    case 10: return [...allConsonants, ...allDigraphs];
    case 11: return [...allConsonants, ...allDigraphs, ...allBlends];
    default: return consonants1;
  }
}

function generateRounds(level: number): RoundData[] {
  const pool = getPhonemePool(level);
  const rounds: RoundData[] = [];
  const shuffled = shuffle(pool);

  for (let i = 0; i < TOTAL_ROUNDS; i++) {
    const entry = shuffled[i % shuffled.length];
    const correctWord = pickRandom(entry.words);

    // Build distractors from other phonemes + entry's own distractors
    const otherWords: PhonemeWord[] = [];
    for (const other of pool) {
      if (other.phoneme !== entry.phoneme) {
        otherWords.push(...other.words);
      }
    }
    otherWords.push(...entry.distractors);

    // Deduplicate by word
    const seen = new Set<string>([correctWord.word]);
    const uniqueOthers: PhonemeWord[] = [];
    for (const item of shuffle(otherWords)) {
      if (!seen.has(item.word)) {
        seen.add(item.word);
        uniqueOthers.push(item);
      }
    }

    const distractors = uniqueOthers.slice(0, CHOICES_PER_ROUND - 1);
    const choices = shuffle([
      { ...correctWord, isCorrect: true },
      ...distractors.map((d) => ({ ...d, isCorrect: false })),
    ]);
    const correctIndex = choices.findIndex((c) => c.isCorrect);

    rounds.push({ phoneme: entry.phoneme, correctIndex, choices });
  }

  return rounds;
}

// ---------------------------------------------------------------------------
// Preload images for upcoming round
// ---------------------------------------------------------------------------

function usePreloadImages(urls: (string | undefined)[]) {
  useEffect(() => {
    urls.forEach((url) => {
      if (url) {
        const img = new Image();
        img.src = url;
      }
    });
  }, [urls.join(',')]); // eslint-disable-line react-hooks/exhaustive-deps
}

// ---------------------------------------------------------------------------
// Inject CSS keyframes (once on mount)
// ---------------------------------------------------------------------------

const KEYFRAMES_ID = 'safari-keyframes';
const KEYFRAMES_CSS = `
@keyframes safari-shake {
  0%, 100% { transform: translateX(0); }
  15% { transform: translateX(-8px) rotate(-2deg); }
  30% { transform: translateX(7px) rotate(2deg); }
  45% { transform: translateX(-6px) rotate(-1deg); }
  60% { transform: translateX(5px) rotate(1deg); }
  75% { transform: translateX(-3px); }
}
@keyframes safari-bounce {
  0% { transform: scale(1); }
  30% { transform: scale(1.15); }
  50% { transform: scale(0.95); }
  70% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
@keyframes safari-confetti-fall {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(60vh) rotate(720deg); opacity: 0; }
}
@keyframes safari-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
`;

function useInjectKeyframes() {
  useEffect(() => {
    if (document.getElementById(KEYFRAMES_ID)) return;
    const style = document.createElement('style');
    style.id = KEYFRAMES_ID;
    style.textContent = KEYFRAMES_CSS;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById(KEYFRAMES_ID);
      if (el) el.remove();
    };
  }, []);
}

// ---------------------------------------------------------------------------
// Safari Background
// ---------------------------------------------------------------------------

function SafariBackground() {
  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      pointerEvents: 'none', userSelect: 'none',
    }}>
      {/* Sky → ground gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, #87CEEB 0%, #B0E0F0 50%, #6DBE45 50%, #3B7A2A 100%)',
      }} />

      {/* Sun */}
      <img src="/kenney/bg/sun.png" alt="" style={{
        position: 'absolute', top: '4%', right: '6%', width: 'clamp(50px, 8vw, 90px)',
        opacity: 0.9, animation: 'safari-float 4s ease-in-out infinite',
      }} />

      {/* Clouds */}
      <img src="/kenney/bg/cloud1.png" alt="" style={{
        position: 'absolute', top: '6%', left: '5%', width: 'clamp(70px, 12vw, 130px)', opacity: 0.7,
        animation: 'safari-float 5s ease-in-out infinite',
      }} />
      <img src="/kenney/bg/cloud2.png" alt="" style={{
        position: 'absolute', top: '12%', left: '40%', width: 'clamp(60px, 10vw, 110px)', opacity: 0.5,
        animation: 'safari-float 6s ease-in-out infinite 1s',
      }} />
      <img src="/kenney/bg/cloud3.png" alt="" style={{
        position: 'absolute', top: '3%', right: '30%', width: 'clamp(50px, 9vw, 100px)', opacity: 0.6,
        animation: 'safari-float 5.5s ease-in-out infinite 0.5s',
      }} />

      {/* Trees along horizon */}
      <img src="/kenney/bg/tree.png" alt="" style={{
        position: 'absolute', bottom: '46%', left: '2%', width: 'clamp(40px, 7vw, 80px)',
      }} />
      <img src="/kenney/bg/treePine.png" alt="" style={{
        position: 'absolute', bottom: '46%', left: '15%', width: 'clamp(35px, 6vw, 70px)',
      }} />
      <img src="/kenney/bg/treePalm.png" alt="" style={{
        position: 'absolute', bottom: '46%', right: '12%', width: 'clamp(40px, 7vw, 80px)',
      }} />
      <img src="/kenney/bg/tree.png" alt="" style={{
        position: 'absolute', bottom: '46%', right: '2%', width: 'clamp(35px, 6vw, 65px)',
      }} />

      {/* Bushes on ground */}
      <img src="/kenney/bg/bush1.png" alt="" style={{
        position: 'absolute', bottom: '38%', left: '8%', width: 'clamp(30px, 5vw, 55px)',
      }} />
      <img src="/kenney/bg/bushAlt1.png" alt="" style={{
        position: 'absolute', bottom: '38%', right: '8%', width: 'clamp(28px, 5vw, 50px)',
      }} />
      <img src="/kenney/bg/bush2.png" alt="" style={{
        position: 'absolute', bottom: '36%', left: '50%', width: 'clamp(25px, 4vw, 45px)',
        transform: 'translateX(-50%)',
      }} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// CSS Confetti
// ---------------------------------------------------------------------------

const CONFETTI_COLORS = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#C084FC', '#FF9F43', '#2ECC71'];

function CssConfetti({ active }: { active: boolean }) {
  const pieces = useMemo(() => {
    if (!active) return [];
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: `${Math.random() * 0.5}s`,
      duration: `${1.2 + Math.random() * 1}s`,
      size: 6 + Math.random() * 6,
    }));
  }, [active]);

  if (!active) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 30 }}>
      {pieces.map((p) => (
        <div key={p.id} style={{
          position: 'absolute',
          top: '-10px',
          left: p.left,
          width: p.size,
          height: p.size,
          borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          background: p.color,
          animation: `safari-confetti-fall ${p.duration} ease-in ${p.delay} forwards`,
        }} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Choice Card
// ---------------------------------------------------------------------------

type CardState = 'idle' | 'correct' | 'wrong';

function ChoiceCard({
  choice,
  state,
  onTap,
}: {
  choice: PhonemeWord & { isCorrect: boolean };
  state: CardState;
  onTap: () => void;
}) {
  const animation =
    state === 'wrong'
      ? 'safari-shake 0.45s ease-in-out'
      : state === 'correct'
        ? 'safari-bounce 0.5s ease-out'
        : 'none';

  const bgColor =
    state === 'correct'
      ? 'rgba(255, 215, 0, 0.35)'
      : state === 'wrong'
        ? 'rgba(255, 80, 80, 0.2)'
        : 'rgba(255, 255, 255, 0.18)';

  const borderColor =
    state === 'correct'
      ? '#FFD700'
      : state === 'wrong'
        ? '#FF5050'
        : 'rgba(255, 255, 255, 0.25)';

  return (
    <button
      onClick={onTap}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(4px, 1vw, 8px)',
        background: bgColor,
        border: `3px solid ${borderColor}`,
        borderRadius: 'clamp(12px, 2vw, 20px)',
        padding: 'clamp(10px, 2vw, 20px)',
        cursor: 'pointer',
        animation,
        transition: 'background 0.2s, border-color 0.2s, transform 0.15s',
        backdropFilter: 'blur(8px)',
        boxShadow: state === 'correct'
          ? '0 0 20px rgba(255, 215, 0, 0.4)'
          : '0 4px 12px rgba(0,0,0,0.15)',
        fontFamily: FONT,
        minHeight: 'clamp(100px, 18vh, 160px)',
        width: '100%',
      }}
      onPointerEnter={(e) => {
        if (state === 'idle') e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onPointerLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {choice.asset ? (
        <img
          src={choice.asset}
          alt={choice.word}
          draggable={false}
          style={{
            width: 'clamp(60px, 14vw, 110px)',
            height: 'clamp(60px, 14vw, 110px)',
            objectFit: 'contain',
          }}
        />
      ) : (
        <span style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', lineHeight: 1 }}>
          {choice.image}
        </span>
      )}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function SoundSafari(props: BasicsGameProps) {
  const { level, onComplete, onBack } = props;
  const { phase, round, score, accuracy, totalRounds, startGame, submitAnswer, nextRound } =
    useGameState(TOTAL_ROUNDS);
  const tts = useGameTTS();
  const audio = useGameAudio();

  useInjectKeyframes();

  // Generate rounds on mount / level change
  const rounds = useMemo(() => generateRounds(level), [level]);
  const currentRound = rounds[round - 1] ?? rounds[0];

  // Preload next round's images
  const nextRoundAssets = useMemo(() => {
    const next = rounds[round] ?? rounds[0];
    return next.choices.map((c) => c.asset);
  }, [rounds, round]);
  usePreloadImages(nextRoundAssets);

  // Card states for animation
  const [cardStates, setCardStates] = useState<CardState[]>(
    Array(CHOICES_PER_ROUND).fill('idle'),
  );
  const [showCelebration, setShowCelebration] = useState(false);
  const [roundLocked, setRoundLocked] = useState(false);
  const celebrationKey = useRef(0);

  // Reset on new round
  useEffect(() => {
    setCardStates(Array(CHOICES_PER_ROUND).fill('idle'));
    setShowCelebration(false);
    setRoundLocked(false);
  }, [round]);

  // Speak prompt when round starts
  useEffect(() => {
    if (phase === 'playing' && currentRound) {
      const timer = setTimeout(() => {
        tts.saySentence(
          `Find the picture that starts with ${currentRound.phoneme}`,
        );
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [phase, round]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle game complete
  useEffect(() => {
    if (phase === 'complete') {
      onComplete(accuracy);
    }
  }, [phase, accuracy, onComplete]);

  // Handle card tap
  const handleCardTap = useCallback(
    (index: number) => {
      if (phase !== 'playing' || roundLocked) return;

      const isCorrect = currentRound.choices[index].isCorrect;

      if (isCorrect) {
        setRoundLocked(true);
        const newStates = Array(CHOICES_PER_ROUND).fill('idle') as CardState[];
        newStates[index] = 'correct';
        setCardStates(newStates);
        celebrationKey.current += 1;
        setShowCelebration(true);
        audio.playChime();
        tts.sayEncouragement();
        submitAnswer(true);
        setTimeout(() => nextRound(), 2000);
      } else {
        audio.playBuzz();
        const newStates = [...cardStates] as CardState[];
        newStates[index] = 'wrong';
        setCardStates(newStates);
        tts.sayRedirect();
        setTimeout(() => {
          setCardStates((prev) => {
            const reset = [...prev] as CardState[];
            reset[index] = 'idle';
            return reset;
          });
        }, 500);
      }
    },
    [phase, roundLocked, currentRound, cardStates, audio, tts, submitAnswer, nextRound],
  );

  // Replay prompt
  const handleReplay = useCallback(() => {
    if (currentRound) {
      tts.saySentence(
        `Find the picture that starts with ${currentRound.phoneme}`,
      );
    }
  }, [currentRound, tts]);

  // ── Intro screen ──────────────────────────────────────────────────────

  if (phase === 'intro') {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #388E3C 100%)',
        color: '#FFFFFF', fontFamily: FONT,
      }}>
        <div style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', marginBottom: '0.5rem' }}>
          {'\uD83E\uDD81'}
        </div>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          margin: '0 0 0.5rem 0', textAlign: 'center',
        }}>
          Sound Safari
        </h1>
        <p style={{
          fontSize: 'clamp(1rem, 3vw, 1.5rem)',
          margin: '0 0 2rem 0', opacity: 0.9,
          textAlign: 'center', padding: '0 1rem',
        }}>
          Listen for the sound, then tap the matching picture!
        </p>
        <button
          onClick={() => { audio.playClick(); startGame(); }}
          style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            padding: '0.8rem 2.5rem', borderRadius: '2rem',
            border: 'none',
            background: 'linear-gradient(135deg, #FFD700, #FFA000)',
            color: '#1B5E20', fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)',
            fontFamily: FONT,
          }}
        >
          Start!
        </button>
        <button
          onClick={onBack}
          style={{
            marginTop: '1rem',
            fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
            padding: '0.5rem 1.5rem', borderRadius: '1rem',
            border: '2px solid rgba(255,255,255,0.3)',
            background: 'transparent', color: '#FFFFFF',
            cursor: 'pointer', fontFamily: FONT,
          }}
        >
          Back
        </button>
      </div>
    );
  }

  // ── Complete screen ───────────────────────────────────────────────────

  if (phase === 'complete') {
    const stars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : accuracy >= 50 ? 1 : 0;
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #388E3C 100%)',
        color: '#FFFFFF', fontFamily: FONT,
      }}>
        <div style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', marginBottom: '0.5rem' }}>
          {'\uD83C\uDF89'}
        </div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', margin: '0 0 0.5rem 0' }}>
          Safari Complete!
        </h1>
        <p style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', margin: '0.5rem 0' }}>
          {'\u2B50'.repeat(stars)}{'\u2606'.repeat(3 - stars)}
        </p>
        <p style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', margin: '0 0 0.5rem 0', opacity: 0.8 }}>
          {score} / {totalRounds} sounds matched
        </p>
        <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', margin: '0 0 2rem 0', opacity: 0.6 }}>
          Accuracy: {accuracy}%
        </p>
        <button
          onClick={onBack}
          style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            padding: '0.8rem 2.5rem', borderRadius: '2rem',
            border: 'none',
            background: 'linear-gradient(135deg, #FFD700, #FFA000)',
            color: '#1B5E20', fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)',
            fontFamily: FONT,
          }}
        >
          Done
        </button>
      </div>
    );
  }

  // ── Playing / Feedback ────────────────────────────────────────────────

  return (
    <div style={{
      width: '100%', height: '100%',
      position: 'relative', fontFamily: FONT,
      overflow: 'hidden',
    }}>
      {/* Background scene */}
      <SafariBackground />

      {/* Confetti */}
      <CssConfetti key={celebrationKey.current} active={showCelebration} />

      {/* HUD strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 'clamp(2.8rem, 6vh, 3.5rem)',
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(8px, 2vw, 16px)',
        zIndex: 20, color: '#FFFFFF',
      }}>
        <button
          onClick={onBack}
          style={{
            fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
            padding: '0.25rem 0.6rem', borderRadius: '0.5rem',
            border: '1px solid rgba(255,255,255,0.3)',
            background: 'transparent', color: '#FFFFFF',
            cursor: 'pointer', fontFamily: FONT, fontWeight: 600,
          }}
        >
          {'\u2190'} Back
        </button>

        <div style={{
          display: 'flex', alignItems: 'center',
          gap: 'clamp(6px, 1.5vw, 12px)',
          fontSize: 'clamp(0.9rem, 2.5vw, 1.3rem)',
          fontWeight: 700,
        }}>
          <span style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '0.15rem 0.5rem', borderRadius: '0.4rem',
          }}>
            &ldquo;{currentRound.phoneme}&rdquo;
          </span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span>{round}/{totalRounds}</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span>Score: {score}</span>
        </div>

        <button
          onClick={handleReplay}
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            padding: '0.2rem 0.5rem', borderRadius: '0.5rem',
            border: '1px solid rgba(255,255,255,0.3)',
            background: 'transparent', cursor: 'pointer',
            fontFamily: FONT,
          }}
          title="Hear sound again"
        >
          {'\uD83D\uDD0A'}
        </button>
      </div>

      {/* Phoneme prompt badge */}
      <div style={{
        position: 'absolute',
        top: 'clamp(3.5rem, 8vh, 5rem)',
        left: '50%', transform: 'translateX(-50%)',
        zIndex: 15,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(6px)',
        borderRadius: '2rem',
        padding: 'clamp(6px, 1.5vw, 12px) clamp(16px, 3vw, 28px)',
        color: '#FFFFFF',
        fontSize: 'clamp(1rem, 3vw, 1.5rem)',
        fontWeight: 700,
        textAlign: 'center',
        whiteSpace: 'nowrap',
      }}>
        Find the picture that starts with{' '}
        <span style={{
          background: 'rgba(255, 215, 0, 0.3)',
          padding: '2px 8px', borderRadius: '6px',
          color: '#FFD700',
        }}>
          {currentRound.phoneme}
        </span>
      </div>

      {/* Choice cards — 2x2 grid */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(16px, 4vh, 40px)',
        left: '50%', transform: 'translateX(-50%)',
        width: 'clamp(280px, 75vw, 500px)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(8px, 2vw, 16px)',
        zIndex: 15,
      }}>
        {currentRound.choices.map((choice, i) => (
          <ChoiceCard
            key={`${round}-${i}`}
            choice={choice}
            state={cardStates[i]}
            onTap={() => handleCardTap(i)}
          />
        ))}
      </div>
    </div>
  );
}
