import { useState, useCallback, useEffect, useMemo } from 'react';

// ============================================
// TYPES
// ============================================

type GamePhase = 'intro' | 'mode-select' | 'playing' | 'checking' | 'round-complete' | 'game-complete';
type GameMode = 'encode' | 'decode';
type CipherType = 'caesar' | 'substitution';
type Difficulty = 'easy' | 'medium' | 'hard';

interface Round {
  cipherType: CipherType;
  difficulty: Difficulty;
  originalMessage: string;
  encodedMessage: string;
  key: number | Record<string, string>; // Caesar shift or substitution map
  hint: string;
  points: number;
}

// ============================================
// CONSTANTS
// ============================================

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const SECRET_MESSAGES = {
  easy: [
    'HELLO SPY',
    'TOP SECRET',
    'MISSION GO',
    'CODE RED',
    'AGENT ZERO',
    'SAFE HOUSE',
    'DROP ZONE',
  ],
  medium: [
    'MEET AT NOON',
    'THE EAGLE HAS LANDED',
    'TRUST NO ONE',
    'UNDER COVER',
    'DEAD DROP READY',
    'ABORT MISSION',
  ],
  hard: [
    'RENDEZVOUS AT MIDNIGHT',
    'THE PACKAGE IS SECURED',
    'ENEMY APPROACHING FAST',
    'EXTRACT THE INFORMANT',
    'HEADQUARTERS CONFIRMED',
  ],
};

const SPY_CODENAMES = [
  'Shadow', 'Phoenix', 'Ghost', 'Falcon', 'Cipher', 'Raven', 'Storm', 'Viper'
];

// ============================================
// CIPHER FUNCTIONS
// ============================================

function caesarEncode(text: string, shift: number): string {
  return text
    .toUpperCase()
    .split('')
    .map((char) => {
      if (char >= 'A' && char <= 'Z') {
        const index = char.charCodeAt(0) - 65;
        const newIndex = (index + shift + 26) % 26;
        return String.fromCharCode(newIndex + 65);
      }
      return char;
    })
    .join('');
}

function generateSubstitutionKey(): Record<string, string> {
  const shuffled = ALPHABET.split('').sort(() => Math.random() - 0.5);
  const key: Record<string, string> = {};
  for (let i = 0; i < 26; i++) {
    key[ALPHABET[i]] = shuffled[i];
  }
  return key;
}

function substitutionEncode(text: string, key: Record<string, string>): string {
  return text
    .toUpperCase()
    .split('')
    .map((char) => {
      if (key[char]) return key[char];
      return char;
    })
    .join('');
}

// ============================================
// ROUND GENERATION
// ============================================

function generateRounds(mode: GameMode): Round[] {
  const rounds: Round[] = [];

  // Round 1: Easy Caesar (shift 1-3)
  const easyShift = Math.floor(Math.random() * 3) + 1;
  const easyMsg = SECRET_MESSAGES.easy[Math.floor(Math.random() * SECRET_MESSAGES.easy.length)];
  rounds.push({
    cipherType: 'caesar',
    difficulty: 'easy',
    originalMessage: easyMsg,
    encodedMessage: caesarEncode(easyMsg, easyShift),
    key: easyShift,
    hint: mode === 'decode'
      ? `This is a Caesar cipher. Each letter is shifted by ${easyShift} position${easyShift > 1 ? 's' : ''} in the alphabet.`
      : `Shift each letter forward by ${easyShift} position${easyShift > 1 ? 's' : ''} in the alphabet.`,
    points: 10,
  });

  // Round 2: Medium Caesar (shift 4-8)
  const medShift = Math.floor(Math.random() * 5) + 4;
  const medMsg = SECRET_MESSAGES.easy[Math.floor(Math.random() * SECRET_MESSAGES.easy.length)];
  rounds.push({
    cipherType: 'caesar',
    difficulty: 'medium',
    originalMessage: medMsg,
    encodedMessage: caesarEncode(medMsg, medShift),
    key: medShift,
    hint: mode === 'decode'
      ? `Caesar cipher with a larger shift. Look at how far 'A' has moved in the cipher wheel.`
      : `Use the cipher wheel! Shift = ${medShift}`,
    points: 20,
  });

  // Round 3: Hard Caesar (shift 9-15)
  const hardShift = Math.floor(Math.random() * 7) + 9;
  const hardMsg = SECRET_MESSAGES.medium[Math.floor(Math.random() * SECRET_MESSAGES.medium.length)];
  rounds.push({
    cipherType: 'caesar',
    difficulty: 'medium',
    originalMessage: hardMsg,
    encodedMessage: caesarEncode(hardMsg, hardShift),
    key: hardShift,
    hint: mode === 'decode'
      ? `The shift is between 9 and 15. Try matching a common letter like 'E' or 'T'.`
      : `Big shift ahead! Shift = ${hardShift}. Use the wheel carefully.`,
    points: 30,
  });

  // Round 4: Simple Substitution (partial key revealed)
  const subKey1 = generateSubstitutionKey();
  const subMsg1 = SECRET_MESSAGES.medium[Math.floor(Math.random() * SECRET_MESSAGES.medium.length)];
  rounds.push({
    cipherType: 'substitution',
    difficulty: 'medium',
    originalMessage: subMsg1,
    encodedMessage: substitutionEncode(subMsg1, subKey1),
    key: subKey1,
    hint: mode === 'decode'
      ? `This is a substitution cipher. Each letter is replaced with a different letter. The full key is shown below!`
      : `Use the substitution table to encode each letter.`,
    points: 40,
  });

  // Round 5: Challenge substitution
  const subKey2 = generateSubstitutionKey();
  const subMsg2 = SECRET_MESSAGES.hard[Math.floor(Math.random() * SECRET_MESSAGES.hard.length)];
  rounds.push({
    cipherType: 'substitution',
    difficulty: 'hard',
    originalMessage: subMsg2,
    encodedMessage: substitutionEncode(subMsg2, subKey2),
    key: subKey2,
    hint: mode === 'decode'
      ? `Final challenge! Use the substitution key carefully. Double-check each letter.`
      : `Master encoder! Convert every letter using the key below.`,
    points: 50,
  });

  return rounds;
}

// ============================================
// COMPONENTS
// ============================================

interface CaesarWheelProps {
  shift: number;
  isSmall?: boolean;
}

function CaesarWheel({ shift, isSmall = false }: CaesarWheelProps) {
  const size = isSmall ? 180 : 260;
  const outerRadius = size / 2 - 10;
  const innerRadius = outerRadius - (isSmall ? 25 : 35);
  const center = size / 2;

  return (
    <svg width={size} height={size} style={{ display: 'block', margin: '0 auto' }}>
      {/* Outer ring (original) */}
      <circle
        cx={center}
        cy={center}
        r={outerRadius}
        fill="#1a1a2e"
        stroke="#4a4a6a"
        strokeWidth="2"
      />
      {/* Inner ring (shifted) */}
      <circle
        cx={center}
        cy={center}
        r={innerRadius}
        fill="#16213e"
        stroke="#e94560"
        strokeWidth="2"
      />
      {/* Center */}
      <circle cx={center} cy={center} r={isSmall ? 15 : 20} fill="#e94560" />
      <text
        x={center}
        y={center}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#fff"
        fontSize={isSmall ? 10 : 12}
        fontWeight="bold"
      >
        +{shift}
      </text>

      {/* Letters */}
      {ALPHABET.split('').map((letter, i) => {
        const angle = (i * 360) / 26 - 90;
        const rad = (angle * Math.PI) / 180;
        const ox = center + Math.cos(rad) * (outerRadius - (isSmall ? 12 : 16));
        const oy = center + Math.sin(rad) * (outerRadius - (isSmall ? 12 : 16));
        const ix = center + Math.cos(rad) * (innerRadius - (isSmall ? 10 : 14));
        const iy = center + Math.sin(rad) * (innerRadius - (isSmall ? 10 : 14));
        const shiftedLetter = ALPHABET[(i + shift) % 26];

        return (
          <g key={letter}>
            <text
              x={ox}
              y={oy}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#a0a0c0"
              fontSize={isSmall ? 9 : 12}
              fontFamily="monospace"
              fontWeight="bold"
            >
              {letter}
            </text>
            <text
              x={ix}
              y={iy}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#e94560"
              fontSize={isSmall ? 9 : 12}
              fontFamily="monospace"
              fontWeight="bold"
            >
              {shiftedLetter}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

interface SubstitutionTableProps {
  keyMap: Record<string, string>;
  isSmall?: boolean;
}

function SubstitutionTable({ keyMap, isSmall = false }: SubstitutionTableProps) {
  const rows = isSmall ? [ALPHABET.slice(0, 13), ALPHABET.slice(13)] : [ALPHABET];

  return (
    <div style={{ overflowX: 'auto', padding: '8px 0' }}>
      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: isSmall ? 2 : 4,
            marginBottom: rowIdx === 0 && rows.length > 1 ? 8 : 0,
          }}
        >
          {row.split('').map((letter) => (
            <div
              key={letter}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: '#1a1a2e',
                borderRadius: 4,
                padding: isSmall ? '4px 3px' : '6px 4px',
                minWidth: isSmall ? 20 : 28,
              }}
            >
              <span
                style={{
                  color: '#a0a0c0',
                  fontSize: isSmall ? 10 : 12,
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                }}
              >
                {letter}
              </span>
              <span style={{ color: '#4a4a6a', fontSize: 8 }}>↓</span>
              <span
                style={{
                  color: '#e94560',
                  fontSize: isSmall ? 10 : 12,
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                }}
              >
                {keyMap[letter]}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function CipherMachine() {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [mode, setMode] = useState<GameMode>('decode');
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');
  const [codename] = useState(() => SPY_CODENAMES[Math.floor(Math.random() * SPY_CODENAMES.length)]);
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

  const handleSelectMode = useCallback((selectedMode: GameMode) => {
    setMode(selectedMode);
    const newRounds = generateRounds(selectedMode);
    setRounds(newRounds);
    setCurrentRound(0);
    setScore(0);
    setAttempts(0);
    setUserInput('');
    setShowHint(false);
    setFeedback('none');
    setPhase('playing');
  }, []);

  const handleStart = useCallback(() => {
    setPhase('mode-select');
  }, []);

  const normalizeText = useCallback((text: string): string => {
    return text.toUpperCase().replace(/[^A-Z]/g, '');
  }, []);

  const checkAnswer = useCallback(() => {
    if (!round) return;

    setPhase('checking');
    const normalizedInput = normalizeText(userInput);
    const expectedAnswer = mode === 'encode'
      ? normalizeText(round.encodedMessage)
      : normalizeText(round.originalMessage);

    if (normalizedInput === expectedAnswer) {
      setFeedback('correct');
      // Calculate bonus for fewer attempts
      const attemptBonus = Math.max(0, 3 - attempts) * 5;
      const hintPenalty = showHint ? 5 : 0;
      const earnedPoints = Math.max(round.points - hintPenalty + attemptBonus, round.points / 2);

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
  }, [round, userInput, mode, attempts, showHint, normalizeText]);

  const handleNextRound = useCallback(() => {
    if (currentRound >= rounds.length - 1) {
      setPhase('game-complete');
    } else {
      setCurrentRound(prev => prev + 1);
      setUserInput('');
      setShowHint(false);
      setFeedback('none');
      setAttempts(0);
      setPhase('playing');
    }
  }, [currentRound, rounds.length]);

  const handleRestart = useCallback(() => {
    setPhase('intro');
    setRounds([]);
    setCurrentRound(0);
    setScore(0);
    setAttempts(0);
    setUserInput('');
    setShowHint(false);
    setFeedback('none');
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && phase === 'playing' && userInput.trim()) {
      checkAnswer();
    }
  }, [phase, userInput, checkAnswer]);

  // Calculate max possible score
  const maxScore = useMemo(() => {
    return rounds.reduce((sum, r) => sum + r.points + 15, 0); // points + max attempt bonus
  }, [rounds]);

  // ============================================
  // RENDER
  // ============================================

  const containerStyle: React.CSSProperties = {
    background: 'linear-gradient(145deg, #0f0f1a, #1a1a2e, #16213e)',
    borderRadius: 16,
    padding: isSmall ? 16 : 24,
    minHeight: 400,
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    position: 'relative',
    overflow: 'hidden',
    border: '2px solid #e94560',
    boxShadow: '0 0 30px rgba(233, 69, 96, 0.3)',
  };

  const scanlineStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
    pointerEvents: 'none',
    zIndex: 1,
  };

  // --- INTRO SCREEN ---
  if (phase === 'intro') {
    return (
      <div style={containerStyle}>
        <div style={scanlineStyle} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={{ fontSize: isSmall ? 48 : 64, marginBottom: 8 }}>🕵️</div>
          <h2 style={{
            fontSize: isSmall ? 24 : 32,
            fontWeight: 800,
            color: '#e94560',
            textShadow: '0 0 10px rgba(233, 69, 96, 0.5)',
            margin: '0 0 8px 0',
            letterSpacing: 2,
          }}>
            CIPHER MACHINE
          </h2>
          <p style={{
            color: '#00ff88',
            fontSize: isSmall ? 12 : 14,
            fontFamily: 'monospace',
            marginBottom: 16,
          }}>
            WELCOME, AGENT {codename.toUpperCase()}
          </p>
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 12,
            padding: isSmall ? 16 : 20,
            maxWidth: 500,
            margin: '0 auto 20px',
            textAlign: 'left',
            border: '1px solid #4a4a6a',
          }}>
            <p style={{ color: '#a0a0c0', fontSize: isSmall ? 13 : 15, lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: '#e94560' }}>MISSION BRIEFING:</strong>
              <br /><br />
              Your mission, should you choose to accept it, is to master the art of
              secret codes. You will learn two cipher techniques used by real spies:
              <br /><br />
              <span style={{ color: '#00ff88' }}>1. Caesar Cipher</span> - Shift letters by a secret number
              <br />
              <span style={{ color: '#00ff88' }}>2. Substitution Cipher</span> - Replace each letter with another
              <br /><br />
              Complete 5 increasingly difficult missions to earn your title as a
              <strong style={{ color: '#ffd700' }}> Master Cryptographer</strong>!
            </p>
          </div>
          <button
            onClick={handleStart}
            style={{
              padding: isSmall ? '12px 32px' : '14px 48px',
              borderRadius: 8,
              border: '2px solid #e94560',
              background: 'linear-gradient(180deg, #e94560 0%, #b91c3c 100%)',
              color: '#fff',
              fontWeight: 800,
              fontSize: isSmall ? 16 : 18,
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(233, 69, 96, 0.5)',
              transition: 'all 0.2s ease',
              letterSpacing: 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(233, 69, 96, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(233, 69, 96, 0.5)';
            }}
          >
            ACCEPT MISSION
          </button>
        </div>
      </div>
    );
  }

  // --- MODE SELECT SCREEN ---
  if (phase === 'mode-select') {
    return (
      <div style={containerStyle}>
        <div style={scanlineStyle} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <h2 style={{
            fontSize: isSmall ? 20 : 26,
            fontWeight: 800,
            color: '#e94560',
            textShadow: '0 0 10px rgba(233, 69, 96, 0.5)',
            margin: '0 0 8px 0',
          }}>
            SELECT OPERATION MODE
          </h2>
          <p style={{ color: '#a0a0c0', fontSize: isSmall ? 13 : 15, marginBottom: 24 }}>
            Choose your spy specialty, Agent {codename}
          </p>

          <div style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {/* Decode Mode */}
            <button
              onClick={() => handleSelectMode('decode')}
              style={{
                padding: isSmall ? 16 : 24,
                borderRadius: 12,
                border: '2px solid #00ff88',
                background: 'rgba(0, 255, 136, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minWidth: isSmall ? 140 : 180,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 255, 136, 0.2)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 255, 136, 0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div style={{ fontSize: isSmall ? 36 : 48, marginBottom: 8 }}>🔓</div>
              <div style={{
                color: '#00ff88',
                fontSize: isSmall ? 16 : 20,
                fontWeight: 800,
                marginBottom: 4,
              }}>
                DECODER
              </div>
              <p style={{
                color: '#a0a0c0',
                fontSize: isSmall ? 11 : 13,
                margin: 0,
              }}>
                Crack secret messages
              </p>
            </button>

            {/* Encode Mode */}
            <button
              onClick={() => handleSelectMode('encode')}
              style={{
                padding: isSmall ? 16 : 24,
                borderRadius: 12,
                border: '2px solid #ffd700',
                background: 'rgba(255, 215, 0, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minWidth: isSmall ? 140 : 180,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 215, 0, 0.2)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 215, 0, 0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div style={{ fontSize: isSmall ? 36 : 48, marginBottom: 8 }}>🔐</div>
              <div style={{
                color: '#ffd700',
                fontSize: isSmall ? 16 : 20,
                fontWeight: 800,
                marginBottom: 4,
              }}>
                ENCODER
              </div>
              <p style={{
                color: '#a0a0c0',
                fontSize: isSmall ? 11 : 13,
                margin: 0,
              }}>
                Create secret messages
              </p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- GAME COMPLETE SCREEN ---
  if (phase === 'game-complete') {
    const percentage = Math.round((score / maxScore) * 100);
    const rank = percentage >= 90 ? 'MASTER CRYPTOGRAPHER'
      : percentage >= 70 ? 'SENIOR AGENT'
      : percentage >= 50 ? 'FIELD OPERATIVE'
      : 'TRAINEE';

    return (
      <div style={containerStyle}>
        <div style={scanlineStyle} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={{ fontSize: isSmall ? 48 : 64, marginBottom: 8 }}>🏆</div>
          <h2 style={{
            fontSize: isSmall ? 22 : 30,
            fontWeight: 800,
            color: '#ffd700',
            textShadow: '0 0 15px rgba(255, 215, 0, 0.5)',
            margin: '0 0 4px 0',
          }}>
            MISSION COMPLETE
          </h2>
          <p style={{
            color: '#00ff88',
            fontSize: isSmall ? 14 : 16,
            fontFamily: 'monospace',
            marginBottom: 16,
          }}>
            RANK: {rank}
          </p>

          <div style={{
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 12,
            padding: isSmall ? 16 : 24,
            maxWidth: 400,
            margin: '0 auto 20px',
            border: '1px solid #4a4a6a',
          }}>
            <div style={{
              fontSize: isSmall ? 36 : 48,
              fontWeight: 800,
              color: '#e94560',
              marginBottom: 4,
            }}>
              {score}
            </div>
            <div style={{ color: '#a0a0c0', fontSize: isSmall ? 12 : 14, marginBottom: 16 }}>
              TOTAL POINTS
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 24,
              marginTop: 16,
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#00ff88', fontSize: isSmall ? 20 : 24, fontWeight: 'bold' }}>
                  {rounds.length}
                </div>
                <div style={{ color: '#a0a0c0', fontSize: isSmall ? 10 : 12 }}>
                  MISSIONS
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#00ff88', fontSize: isSmall ? 20 : 24, fontWeight: 'bold' }}>
                  {mode === 'decode' ? 'DECODER' : 'ENCODER'}
                </div>
                <div style={{ color: '#a0a0c0', fontSize: isSmall ? 10 : 12 }}>
                  SPECIALTY
                </div>
              </div>
            </div>
          </div>

          <p style={{
            color: '#a0a0c0',
            fontSize: isSmall ? 12 : 14,
            maxWidth: 400,
            margin: '0 auto 20px',
            lineHeight: 1.6,
          }}>
            Excellent work, Agent {codename}! You have proven yourself skilled in the
            art of {mode === 'decode' ? 'decryption' : 'encryption'}. The agency is proud of you.
          </p>

          <button
            onClick={handleRestart}
            style={{
              padding: isSmall ? '12px 32px' : '14px 48px',
              borderRadius: 8,
              border: '2px solid #e94560',
              background: 'linear-gradient(180deg, #e94560 0%, #b91c3c 100%)',
              color: '#fff',
              fontWeight: 800,
              fontSize: isSmall ? 14 : 16,
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(233, 69, 96, 0.5)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            NEW MISSION
          </button>
        </div>
      </div>
    );
  }

  // --- ROUND COMPLETE SCREEN ---
  if (phase === 'round-complete' && round) {
    return (
      <div style={containerStyle}>
        <div style={scanlineStyle} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={{ fontSize: isSmall ? 48 : 64, marginBottom: 8 }}>✅</div>
          <h2 style={{
            fontSize: isSmall ? 20 : 26,
            fontWeight: 800,
            color: '#00ff88',
            textShadow: '0 0 10px rgba(0, 255, 136, 0.5)',
            margin: '0 0 8px 0',
          }}>
            MESSAGE {mode === 'decode' ? 'DECODED' : 'ENCODED'}!
          </h2>

          <div style={{
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 12,
            padding: isSmall ? 16 : 20,
            maxWidth: 500,
            margin: '0 auto 20px',
            border: '1px solid #00ff88',
          }}>
            <p style={{ color: '#a0a0c0', fontSize: isSmall ? 11 : 13, margin: '0 0 8px 0' }}>
              {mode === 'decode' ? 'DECODED MESSAGE:' : 'ENCODED MESSAGE:'}
            </p>
            <p style={{
              color: '#00ff88',
              fontSize: isSmall ? 16 : 20,
              fontFamily: 'monospace',
              fontWeight: 'bold',
              letterSpacing: 2,
              margin: 0,
            }}>
              {mode === 'decode' ? round.originalMessage : round.encodedMessage}
            </p>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 24,
            marginBottom: 20,
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#ffd700', fontSize: isSmall ? 24 : 32, fontWeight: 'bold' }}>
                {score}
              </div>
              <div style={{ color: '#a0a0c0', fontSize: isSmall ? 10 : 12 }}>
                TOTAL SCORE
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#e94560', fontSize: isSmall ? 24 : 32, fontWeight: 'bold' }}>
                {currentRound + 1}/{rounds.length}
              </div>
              <div style={{ color: '#a0a0c0', fontSize: isSmall ? 10 : 12 }}>
                MISSIONS
              </div>
            </div>
          </div>

          <button
            onClick={handleNextRound}
            style={{
              padding: isSmall ? '12px 32px' : '14px 48px',
              borderRadius: 8,
              border: '2px solid #00ff88',
              background: 'linear-gradient(180deg, #00ff88 0%, #00cc6a 100%)',
              color: '#0f0f1a',
              fontWeight: 800,
              fontSize: isSmall ? 14 : 16,
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {currentRound >= rounds.length - 1 ? 'VIEW RESULTS' : 'NEXT MISSION'}
          </button>
        </div>
      </div>
    );
  }

  // --- PLAYING / CHECKING SCREEN ---
  if (!round) return null;

  return (
    <div style={containerStyle}>
      <div style={scanlineStyle} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
          flexWrap: 'wrap',
          gap: 8,
        }}>
          <div style={{
            background: 'rgba(233, 69, 96, 0.2)',
            border: '1px solid #e94560',
            borderRadius: 20,
            padding: '4px 14px',
            color: '#e94560',
            fontWeight: 700,
            fontSize: isSmall ? 11 : 13,
          }}>
            MISSION {currentRound + 1} / {rounds.length}
          </div>
          <div style={{
            background: 'rgba(0, 255, 136, 0.2)',
            border: '1px solid #00ff88',
            borderRadius: 20,
            padding: '4px 14px',
            color: '#00ff88',
            fontWeight: 700,
            fontSize: isSmall ? 11 : 13,
          }}>
            SCORE: {score}
          </div>
        </div>

        {/* Progress dots */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 6,
          marginBottom: 16,
        }}>
          {rounds.map((_, i) => (
            <div
              key={i}
              style={{
                width: isSmall ? 10 : 12,
                height: isSmall ? 10 : 12,
                borderRadius: '50%',
                background: i < currentRound ? '#00ff88'
                  : i === currentRound ? '#e94560'
                  : '#4a4a6a',
                boxShadow: i === currentRound ? '0 0 8px #e94560' : 'none',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Cipher info badge */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          marginBottom: 16,
          flexWrap: 'wrap',
        }}>
          <span style={{
            background: '#1a1a2e',
            border: '1px solid #4a4a6a',
            borderRadius: 4,
            padding: '4px 10px',
            color: '#ffd700',
            fontSize: isSmall ? 10 : 12,
            fontFamily: 'monospace',
          }}>
            {round.cipherType === 'caesar' ? 'CAESAR CIPHER' : 'SUBSTITUTION CIPHER'}
          </span>
          <span style={{
            background: '#1a1a2e',
            border: '1px solid #4a4a6a',
            borderRadius: 4,
            padding: '4px 10px',
            color: round.difficulty === 'easy' ? '#00ff88'
              : round.difficulty === 'medium' ? '#ffd700'
              : '#e94560',
            fontSize: isSmall ? 10 : 12,
            fontFamily: 'monospace',
          }}>
            {round.difficulty.toUpperCase()}
          </span>
          <span style={{
            background: '#1a1a2e',
            border: '1px solid #4a4a6a',
            borderRadius: 4,
            padding: '4px 10px',
            color: '#a0a0c0',
            fontSize: isSmall ? 10 : 12,
            fontFamily: 'monospace',
          }}>
            +{round.points} PTS
          </span>
        </div>

        {/* Message to encode/decode */}
        <div style={{
          background: 'rgba(0,0,0,0.4)',
          borderRadius: 8,
          padding: isSmall ? 12 : 16,
          marginBottom: 16,
          textAlign: 'center',
          border: '1px solid #4a4a6a',
        }}>
          <p style={{ color: '#a0a0c0', fontSize: isSmall ? 11 : 13, margin: '0 0 8px 0' }}>
            {mode === 'decode' ? 'INTERCEPTED MESSAGE:' : 'MESSAGE TO ENCODE:'}
          </p>
          <p style={{
            color: '#e94560',
            fontSize: isSmall ? 18 : 24,
            fontFamily: 'monospace',
            fontWeight: 'bold',
            letterSpacing: isSmall ? 2 : 4,
            margin: 0,
            wordBreak: 'break-all',
          }}>
            {mode === 'decode' ? round.encodedMessage : round.originalMessage}
          </p>
        </div>

        {/* Cipher Key Visualization */}
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          borderRadius: 8,
          padding: isSmall ? 8 : 12,
          marginBottom: 16,
          border: '1px solid #4a4a6a',
        }}>
          <p style={{
            color: '#ffd700',
            fontSize: isSmall ? 10 : 12,
            textAlign: 'center',
            margin: '0 0 8px 0',
            fontWeight: 'bold',
          }}>
            {round.cipherType === 'caesar' ? 'CIPHER WHEEL' : 'SUBSTITUTION KEY'}
          </p>
          {round.cipherType === 'caesar' ? (
            <CaesarWheel shift={round.key as number} isSmall={isSmall} />
          ) : (
            <SubstitutionTable keyMap={round.key as Record<string, string>} isSmall={isSmall} />
          )}
        </div>

        {/* Hint button and hint display */}
        <div style={{ marginBottom: 16, textAlign: 'center' }}>
          {!showHint ? (
            <button
              onClick={() => setShowHint(true)}
              style={{
                padding: '6px 16px',
                borderRadius: 4,
                border: '1px solid #4a4a6a',
                background: 'transparent',
                color: '#a0a0c0',
                fontSize: isSmall ? 11 : 13,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#ffd700';
                e.currentTarget.style.color = '#ffd700';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#4a4a6a';
                e.currentTarget.style.color = '#a0a0c0';
              }}
            >
              💡 NEED A HINT? (-5 points)
            </button>
          ) : (
            <div style={{
              background: 'rgba(255, 215, 0, 0.1)',
              border: '1px solid #ffd700',
              borderRadius: 8,
              padding: isSmall ? 10 : 12,
              maxWidth: 500,
              margin: '0 auto',
            }}>
              <p style={{
                color: '#ffd700',
                fontSize: isSmall ? 12 : 14,
                margin: 0,
              }}>
                💡 {round.hint}
              </p>
            </div>
          )}
        </div>

        {/* Answer input */}
        <div style={{ marginBottom: 12 }}>
          <label style={{
            display: 'block',
            color: '#a0a0c0',
            fontSize: isSmall ? 11 : 13,
            marginBottom: 6,
            textAlign: 'center',
          }}>
            {mode === 'decode' ? 'ENTER DECODED MESSAGE:' : 'ENTER ENCODED MESSAGE:'}
          </label>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value.toUpperCase())}
            onKeyDown={handleKeyDown}
            disabled={phase === 'checking'}
            placeholder={mode === 'decode' ? 'Type the secret message...' : 'Type the encoded message...'}
            style={{
              width: '100%',
              padding: isSmall ? '10px 12px' : '14px 16px',
              fontSize: isSmall ? 16 : 20,
              fontFamily: 'monospace',
              textAlign: 'center',
              letterSpacing: 2,
              textTransform: 'uppercase',
              background: '#1a1a2e',
              border: `2px solid ${
                feedback === 'correct' ? '#00ff88'
                : feedback === 'incorrect' ? '#e94560'
                : '#4a4a6a'
              }`,
              borderRadius: 8,
              color: '#fff',
              outline: 'none',
              transition: 'all 0.3s ease',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Attempt counter */}
        {attempts > 0 && (
          <div style={{
            textAlign: 'center',
            marginBottom: 12,
          }}>
            <span style={{
              color: '#e94560',
              fontSize: isSmall ? 11 : 13,
            }}>
              Attempts: {attempts} {attempts >= 3 && '(Try using the cipher key!)'}
            </span>
          </div>
        )}

        {/* Feedback message */}
        <div style={{
          minHeight: 28,
          textAlign: 'center',
          marginBottom: 12,
        }}>
          {feedback === 'correct' && (
            <span style={{
              color: '#00ff88',
              fontSize: isSmall ? 14 : 16,
              fontWeight: 'bold',
            }}>
              ✓ CORRECT! Message {mode === 'decode' ? 'decoded' : 'encoded'}!
            </span>
          )}
          {feedback === 'incorrect' && (
            <span style={{
              color: '#e94560',
              fontSize: isSmall ? 14 : 16,
              fontWeight: 'bold',
              animation: 'shake 0.4s ease-in-out',
            }}>
              ✗ Not quite! Check the cipher key and try again.
            </span>
          )}
        </div>

        {/* Submit button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={checkAnswer}
            disabled={phase === 'checking' || !userInput.trim()}
            style={{
              padding: isSmall ? '12px 32px' : '14px 48px',
              borderRadius: 8,
              border: '2px solid #e94560',
              background: phase === 'checking' || !userInput.trim()
                ? '#4a4a6a'
                : 'linear-gradient(180deg, #e94560 0%, #b91c3c 100%)',
              color: '#fff',
              fontWeight: 800,
              fontSize: isSmall ? 14 : 16,
              cursor: phase === 'checking' || !userInput.trim() ? 'not-allowed' : 'pointer',
              boxShadow: phase === 'checking' || !userInput.trim()
                ? 'none'
                : '0 0 20px rgba(233, 69, 96, 0.5)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {mode === 'decode' ? 'DECODE' : 'ENCODE'}
          </button>
        </div>
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
      `}</style>
    </div>
  );
}
