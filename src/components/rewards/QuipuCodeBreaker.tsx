import React, { useState, useCallback, useEffect, useRef } from 'react';

// ============================================
// TYPES
// ============================================

interface QuipuCodeBreakerProps {
  onComplete?: () => void;
}

type GamePhase = 'intro' | 'playing' | 'checking' | 'complete';

interface KnotGroup {
  position: 'top' | 'middle' | 'bottom'; // hundreds, tens, ones
  count: number; // 1-9 knots
}

interface PendantString {
  color: string;
  knots: KnotGroup[];
  value: number; // the decoded number
}

interface Round {
  strings: PendantString[];
  hint: string;
  isLetterRound: boolean; // if true, numbers map to letters
}

type FeedbackState = 'none' | 'correct' | 'incorrect';

// ============================================
// CONSTANTS
// ============================================

const INCA_COLORS = ['#C0392B', '#F1C40F', '#2980B9', '#27AE60', '#8B4513'];
const CORD_COLOR = '#8B4513';
const BG_COLOR = '#FFF8E7';
const BORDER_COLOR = '#D4A574';

// ============================================
// ROUND GENERATION
// ============================================

function generateRounds(): Round[] {
  const rounds: Round[] = [];

  // Round 1: Single string, single knot (ones place only, 1-5)
  const r1val = Math.floor(Math.random() * 5) + 1;
  rounds.push({
    strings: [{
      color: INCA_COLORS[0],
      knots: [{ position: 'bottom', count: r1val }],
      value: r1val,
    }],
    hint: 'Decode this single string. Knots at the bottom represent ones.',
    isLetterRound: false,
  });

  // Round 2: Single string, two knot groups (tens + ones)
  const r2tens = Math.floor(Math.random() * 4) + 1;
  const r2ones = Math.floor(Math.random() * 5) + 1;
  rounds.push({
    strings: [{
      color: INCA_COLORS[1],
      knots: [
        { position: 'middle', count: r2tens },
        { position: 'bottom', count: r2ones },
      ],
      value: r2tens * 10 + r2ones,
    }],
    hint: 'Middle knots = tens, bottom knots = ones.',
    isLetterRound: false,
  });

  // Round 3: Two strings to decode
  const r3a = Math.floor(Math.random() * 3) + 1;
  const r3bTens = Math.floor(Math.random() * 3) + 1;
  const r3bOnes = Math.floor(Math.random() * 5) + 1;
  rounds.push({
    strings: [
      {
        color: INCA_COLORS[2],
        knots: [{ position: 'bottom', count: r3a }],
        value: r3a,
      },
      {
        color: INCA_COLORS[3],
        knots: [
          { position: 'middle', count: r3bTens },
          { position: 'bottom', count: r3bOnes },
        ],
        value: r3bTens * 10 + r3bOnes,
      },
    ],
    hint: 'Decode both strings! Each string is its own number.',
    isLetterRound: false,
  });

  // Round 4: Three strings that spell a word (numbers = letters: 1=A, 2=B...)
  const words = [
    [19, 21, 14], // S U N
    [19, 11, 25], // S K Y
    [7, 15, 12, 4], // G O L D — use 3 for simplicity
  ];
  const wordIdx = Math.floor(Math.random() * 2); // only SUN or SKY (3 letters)
  const word = words[wordIdx];
  const wordStrings: PendantString[] = word.map((val, i) => {
    const knots: KnotGroup[] = [];
    const hundreds = Math.floor(val / 100);
    const tens = Math.floor((val % 100) / 10);
    const ones = val % 10;
    if (hundreds > 0) knots.push({ position: 'top', count: hundreds });
    if (tens > 0) knots.push({ position: 'middle', count: tens });
    if (ones > 0) knots.push({ position: 'bottom', count: ones });
    return { color: INCA_COLORS[i % INCA_COLORS.length], knots, value: val };
  });
  rounds.push({
    strings: wordStrings,
    hint: 'These numbers are letters! 1=A, 2=B, 3=C... What word do they spell?',
    isLetterRound: true,
  });

  // Round 5: Full message decode (3 strings, letter round)
  const messages = [
    [9, 14, 3, 1],   // I N C A
    [12, 12, 1, 13],  // L L A M A — use 4 for INCA
  ];
  const msgWord = messages[0]; // INCA
  const msgStrings: PendantString[] = msgWord.map((val, i) => {
    const knots: KnotGroup[] = [];
    const tens = Math.floor(val / 10);
    const ones = val % 10;
    if (tens > 0) knots.push({ position: 'middle', count: tens });
    if (ones > 0) knots.push({ position: 'bottom', count: ones });
    return { color: INCA_COLORS[i % INCA_COLORS.length], knots, value: val };
  });
  rounds.push({
    strings: msgStrings,
    hint: 'Decode all four strings. Numbers become letters (1=A, 2=B...). What empire is this?',
    isLetterRound: true,
  });

  return rounds;
}

// ============================================
// SVG QUIPU DRAWING
// ============================================

const QuipuVisualization: React.FC<{ strings: PendantString[] }> = ({ strings }) => {
  const stringCount = strings.length;
  const svgWidth = Math.max(300, stringCount * 120 + 60);
  const svgHeight = 280;
  const cordSpacing = (svgWidth - 60) / Math.max(stringCount, 1);
  const startX = 30 + cordSpacing / 2;

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      style={{ width: '100%', maxWidth: `${svgWidth}px`, height: 'auto' }}
    >
      {/* Main horizontal cord */}
      <line
        x1="10" y1="30" x2={svgWidth - 10} y2="30"
        stroke={CORD_COLOR} strokeWidth="6" strokeLinecap="round"
      />
      {/* Cord tassels */}
      <circle cx="10" cy="30" r="5" fill={CORD_COLOR} />
      <circle cx={svgWidth - 10} cy="30" r="5" fill={CORD_COLOR} />

      {/* Pendant strings */}
      {strings.map((s, idx) => {
        const x = startX + idx * cordSpacing;
        const stringTop = 30;
        const stringBottom = 260;

        // Knot positions on the string
        const positionY = { top: 70, middle: 140, bottom: 210 };

        return (
          <g key={idx}>
            {/* The hanging string */}
            <line
              x1={x} y1={stringTop} x2={x} y2={stringBottom}
              stroke={s.color} strokeWidth="3" strokeLinecap="round"
            />
            {/* Small tie at top */}
            <circle cx={x} cy={stringTop + 2} r="4" fill={s.color} />

            {/* Position labels (subtle) */}
            <text x={x + 14} y={positionY.top} fontSize="8" fill="#B8A88A"
              fontFamily="Georgia, serif" dominantBaseline="middle">100s</text>
            <text x={x + 14} y={positionY.middle} fontSize="8" fill="#B8A88A"
              fontFamily="Georgia, serif" dominantBaseline="middle">10s</text>
            <text x={x + 14} y={positionY.bottom} fontSize="8" fill="#B8A88A"
              fontFamily="Georgia, serif" dominantBaseline="middle">1s</text>

            {/* Knots */}
            {s.knots.map((knot, ki) => {
              const cy = positionY[knot.position];
              const knotElements = [];
              for (let k = 0; k < knot.count; k++) {
                const ky = cy - ((knot.count - 1) * 10) / 2 + k * 10;
                knotElements.push(
                  <ellipse
                    key={`${ki}-${k}`}
                    cx={x} cy={ky}
                    rx="6" ry="4"
                    fill={s.color}
                    stroke="#5D3A1A"
                    strokeWidth="1"
                  />
                );
              }
              return <g key={ki}>{knotElements}</g>;
            })}

            {/* String number label */}
            <text x={x} y={stringBottom + 14} fontSize="11" fill="#8B7355"
              fontFamily="Georgia, serif" textAnchor="middle">
              String {idx + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ============================================
// COMPONENT
// ============================================

const QuipuCodeBreaker: React.FC<QuipuCodeBreakerProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [rounds] = useState<Round[]>(() => generateRounds());
  const [currentRound, setCurrentRound] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<FeedbackState[]>([]);
  const [overallFeedback, setOverallFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');
  const [score, setScore] = useState(0);
  const [shakeIndex, setShakeIndex] = useState<number>(-1);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const round = rounds[currentRound];

  // Reset answers when round changes
  useEffect(() => {
    if (phase === 'playing' && round) {
      const count = round.isLetterRound ? 1 : round.strings.length;
      setAnswers(new Array(count).fill(''));
      setFeedback(new Array(count).fill('none'));
      setOverallFeedback('none');
      setShakeIndex(-1);
      // Focus first input after a tick
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [currentRound, phase, round]);

  const handleStart = useCallback(() => {
    setPhase('playing');
    setCurrentRound(0);
    setScore(0);
  }, []);

  const handleAnswerChange = useCallback((index: number, value: string) => {
    setAnswers(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  const checkAnswers = useCallback(() => {
    if (!round) return;
    setPhase('checking');

    if (round.isLetterRound) {
      // For letter rounds, the answer is a word
      const correctWord = round.strings
        .map(s => String.fromCharCode(64 + s.value))
        .join('');
      const userAnswer = answers[0]?.trim().toUpperCase() || '';

      if (userAnswer === correctWord) {
        setFeedback(['correct']);
        setOverallFeedback('correct');
        setScore(prev => prev + 1);
        setTimeout(() => advanceRound(), 1500);
      } else {
        setFeedback(['incorrect']);
        setOverallFeedback('incorrect');
        setShakeIndex(0);
        setTimeout(() => {
          setPhase('playing');
          setOverallFeedback('none');
          setFeedback(['none']);
          setShakeIndex(-1);
        }, 1200);
      }
    } else {
      // Number rounds: check each string independently
      const newFeedback: FeedbackState[] = [];
      let allCorrect = true;
      let firstWrong = -1;

      round.strings.forEach((s, i) => {
        const userVal = parseInt(answers[i], 10);
        if (userVal === s.value) {
          newFeedback.push('correct');
        } else {
          newFeedback.push('incorrect');
          allCorrect = false;
          if (firstWrong === -1) firstWrong = i;
        }
      });

      setFeedback(newFeedback);

      if (allCorrect) {
        setOverallFeedback('correct');
        setScore(prev => prev + 1);
        setTimeout(() => advanceRound(), 1500);
      } else {
        setOverallFeedback('incorrect');
        setShakeIndex(firstWrong);
        setTimeout(() => {
          setPhase('playing');
          setOverallFeedback('none');
          setFeedback(new Array(round.strings.length).fill('none'));
          setShakeIndex(-1);
          if (firstWrong >= 0) inputRefs.current[firstWrong]?.focus();
        }, 1200);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, answers, currentRound]);

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
    if (e.key === 'Enter' && phase === 'playing') {
      checkAnswers();
    }
  }, [checkAnswers, phase]);

  const handleRestart = useCallback(() => {
    setPhase('intro');
    setCurrentRound(0);
    setScore(0);
  }, []);

  // ============================================
  // RENDER
  // ============================================

  const containerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '700px',
    margin: '0 auto',
    fontFamily: '"Georgia", "Times New Roman", serif',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    background: BG_COLOR,
    borderRadius: '12px',
    border: `3px solid ${BORDER_COLOR}`,
    overflow: 'hidden',
  };

  const incaBorderStyle: React.CSSProperties = {
    height: '12px',
    background: `repeating-linear-gradient(
      90deg,
      #C0392B 0px, #C0392B 12px,
      #F1C40F 12px, #F1C40F 24px,
      #2980B9 24px, #2980B9 36px,
      #27AE60 36px, #27AE60 48px
    )`,
  };

  // --- INTRO SCREEN ---
  if (phase === 'intro') {
    return (
      <div style={containerStyle}>
        <div style={incaBorderStyle} />
        <div style={{ padding: 'clamp(16px, 4vw, 32px)', textAlign: 'center' }}>
          <div style={{
            fontSize: 'clamp(22px, 4vw, 36px)',
            fontWeight: 'bold',
            color: '#5D3A1A',
            marginBottom: '12px',
          }}>
            QUIPU CODE BREAKER
          </div>
          <div style={{
            fontSize: 'clamp(13px, 2vw, 17px)',
            color: '#7A5C3A',
            lineHeight: 1.7,
            maxWidth: '520px',
            margin: '0 auto 20px',
            textAlign: 'left',
          }}>
            The <strong>quipu</strong> (khee-poo) was the Inca Empire's recording system.
            Instead of writing, the Inca used <strong>knotted strings</strong> to record
            numbers and messages. Officials called <strong>quipucamayocs</strong> were
            trained to read and create these knotted records.
            <br /><br />
            <strong>How to read a quipu:</strong>
            <br />
            Each hanging string represents a number. The <em>position</em> of knots on
            the string tells you the digit place:
            <br />
            &bull; <strong>Top knots</strong> = hundreds
            <br />
            &bull; <strong>Middle knots</strong> = tens
            <br />
            &bull; <strong>Bottom knots</strong> = ones
            <br />
            The <em>number of knots</em> at each position is the digit value.
            <br /><br />
            For example: 2 knots in the middle + 3 knots at the bottom = <strong>23</strong>
          </div>
          <button
            onClick={handleStart}
            style={{
              padding: '12px 36px',
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              fontWeight: 'bold',
              fontFamily: '"Georgia", serif',
              color: '#FFF8DC',
              background: 'linear-gradient(180deg, #8B4513 0%, #5D3A1A 100%)',
              border: '2px solid #F1C40F',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              transition: 'transform 0.1s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Begin Decoding
          </button>
        </div>
        <div style={incaBorderStyle} />
      </div>
    );
  }

  // --- COMPLETE SCREEN ---
  if (phase === 'complete') {
    return (
      <div style={containerStyle}>
        <div style={incaBorderStyle} />
        <div style={{
          padding: 'clamp(24px, 4vw, 40px)',
          textAlign: 'center',
          background: 'radial-gradient(ellipse at center, #FFF8E7 0%, #F5E6C8 100%)',
        }}>
          <div style={{
            fontSize: 'clamp(36px, 6vw, 56px)',
            marginBottom: '8px',
          }}>
            &#x1F31F;
          </div>
          <div style={{
            fontSize: 'clamp(24px, 4vw, 38px)',
            fontWeight: 'bold',
            color: '#5D3A1A',
            marginBottom: '8px',
            letterSpacing: '2px',
          }}>
            MASTER QUIPUCAMAYOC!
          </div>
          <div style={{
            fontSize: 'clamp(14px, 2vw, 18px)',
            color: '#7A5C3A',
            marginBottom: '6px',
          }}>
            You decoded all {rounds.length} quipu messages!
          </div>
          <div style={{
            fontSize: 'clamp(13px, 1.8vw, 16px)',
            color: '#A0845C',
            marginBottom: '24px',
          }}>
            Score: {score}/{rounds.length} rounds solved on first try
          </div>
          <div style={{
            fontSize: 'clamp(12px, 1.6vw, 15px)',
            color: '#8B7355',
            lineHeight: 1.7,
            maxWidth: '460px',
            margin: '0 auto 24px',
          }}>
            You have earned the title of <strong>Quipucamayoc</strong> -- an official keeper
            of the quipu. In the Inca Empire, you would have been trusted with recording
            taxes, census data, and important messages across the vast Inca road network.
          </div>
          <button
            onClick={handleRestart}
            style={{
              padding: '12px 36px',
              fontSize: 'clamp(14px, 2vw, 18px)',
              fontWeight: 'bold',
              fontFamily: '"Georgia", serif',
              color: '#FFF8DC',
              background: 'linear-gradient(180deg, #8B4513 0%, #5D3A1A 100%)',
              border: '2px solid #F1C40F',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              transition: 'transform 0.1s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Play Again
          </button>
        </div>
        <div style={incaBorderStyle} />

        <style>{`
          @keyframes quipu-glow {
            0%, 100% { box-shadow: 0 0 8px rgba(241, 196, 15, 0.4); }
            50% { box-shadow: 0 0 20px rgba(241, 196, 15, 0.8); }
          }
        `}</style>
      </div>
    );
  }

  // --- PLAYING / CHECKING SCREEN ---
  return (
    <div style={containerStyle}>
      <div style={incaBorderStyle} />

      {/* Header */}
      <div style={{
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${BORDER_COLOR}`,
      }}>
        <div style={{ fontSize: 'clamp(14px, 2vw, 18px)', fontWeight: 'bold', color: '#5D3A1A' }}>
          Round {currentRound + 1} of {rounds.length}
        </div>
        <div style={{
          display: 'flex',
          gap: '6px',
        }}>
          {rounds.map((_, i) => (
            <div key={i} style={{
              width: 'clamp(10px, 1.5vw, 14px)',
              height: 'clamp(10px, 1.5vw, 14px)',
              borderRadius: '50%',
              background: i < currentRound ? '#27AE60'
                : i === currentRound ? '#F1C40F'
                : '#D4C5A9',
              border: '1px solid #8B7355',
            }} />
          ))}
        </div>
      </div>

      {/* Hint */}
      <div style={{
        padding: '10px 20px',
        fontSize: 'clamp(12px, 1.8vw, 15px)',
        color: '#7A5C3A',
        background: '#FDF2D6',
        borderBottom: `1px solid ${BORDER_COLOR}`,
        textAlign: 'center',
      }}>
        {round.hint}
      </div>

      {/* Quipu visualization */}
      <div style={{
        padding: '16px 12px 8px',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <QuipuVisualization strings={round.strings} />
      </div>

      {/* Letter reference for letter rounds */}
      {round.isLetterRound && (
        <div style={{
          padding: '4px 20px 8px',
          fontSize: 'clamp(10px, 1.4vw, 13px)',
          color: '#A0845C',
          textAlign: 'center',
          letterSpacing: '1px',
        }}>
          1=A &nbsp; 2=B &nbsp; 3=C &nbsp; 4=D &nbsp; 5=E &nbsp; 6=F &nbsp; 7=G &nbsp; 8=H &nbsp; 9=I &nbsp;
          10=J &nbsp; 11=K &nbsp; 12=L &nbsp; 13=M &nbsp; 14=N &nbsp; 15=O &nbsp; ... &nbsp; 26=Z
        </div>
      )}

      {/* Answer inputs */}
      <div style={{
        padding: '12px 20px 8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
      }}>
        {round.isLetterRound ? (
          <div style={{ textAlign: 'center' }}>
            <label style={{
              display: 'block',
              fontSize: 'clamp(12px, 1.6vw, 15px)',
              color: '#5D3A1A',
              marginBottom: '6px',
              fontWeight: 'bold',
            }}>
              What word do the strings spell?
            </label>
            <input
              ref={(el) => { inputRefs.current[0] = el; }}
              type="text"
              value={answers[0] || ''}
              onChange={(e) => handleAnswerChange(0, e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={phase === 'checking'}
              maxLength={round.strings.length + 2}
              style={{
                width: `${Math.max(120, round.strings.length * 32)}px`,
                padding: '8px 12px',
                fontSize: 'clamp(16px, 2.5vw, 22px)',
                fontFamily: '"Georgia", serif',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '4px',
                border: `2px solid ${
                  feedback[0] === 'correct' ? '#27AE60'
                  : feedback[0] === 'incorrect' ? '#C0392B'
                  : BORDER_COLOR
                }`,
                borderRadius: '6px',
                background: feedback[0] === 'correct' ? '#E8F8E8' : '#FFF',
                outline: 'none',
                transition: 'border-color 0.3s, background 0.3s',
                animation: shakeIndex === 0 ? 'quipu-shake 0.4s ease-in-out' : 'none',
              }}
            />
          </div>
        ) : (
          <div style={{
            display: 'flex',
            gap: 'clamp(12px, 3vw, 32px)',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {round.strings.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <label style={{
                  display: 'block',
                  fontSize: 'clamp(11px, 1.4vw, 14px)',
                  color: s.color,
                  marginBottom: '4px',
                  fontWeight: 'bold',
                }}>
                  String {i + 1}
                </label>
                <input
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="number"
                  min={0}
                  max={999}
                  value={answers[i] || ''}
                  onChange={(e) => handleAnswerChange(i, e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={phase === 'checking'}
                  style={{
                    width: '80px',
                    padding: '8px',
                    fontSize: 'clamp(16px, 2.5vw, 22px)',
                    fontFamily: '"Georgia", serif',
                    textAlign: 'center',
                    border: `2px solid ${
                      feedback[i] === 'correct' ? '#27AE60'
                      : feedback[i] === 'incorrect' ? '#C0392B'
                      : BORDER_COLOR
                    }`,
                    borderRadius: '6px',
                    background: feedback[i] === 'correct' ? '#E8F8E8' : '#FFF',
                    outline: 'none',
                    transition: 'border-color 0.3s, background 0.3s',
                    animation: shakeIndex === i ? 'quipu-shake 0.4s ease-in-out' : 'none',
                    MozAppearance: 'textfield',
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Feedback message */}
      <div style={{
        minHeight: '28px',
        textAlign: 'center',
        padding: '4px 20px',
        fontSize: 'clamp(13px, 1.8vw, 16px)',
        fontWeight: 'bold',
        color: overallFeedback === 'correct' ? '#27AE60'
          : overallFeedback === 'incorrect' ? '#C0392B'
          : 'transparent',
        transition: 'color 0.3s',
      }}>
        {overallFeedback === 'correct' && 'Correct! Well decoded!'}
        {overallFeedback === 'incorrect' && 'Not quite -- count the knots carefully and try again!'}
      </div>

      {/* Submit button */}
      <div style={{ padding: '4px 20px 16px', textAlign: 'center' }}>
        <button
          onClick={checkAnswers}
          disabled={phase === 'checking' || answers.some(a => a.trim() === '')}
          style={{
            padding: '10px 32px',
            fontSize: 'clamp(14px, 2vw, 18px)',
            fontWeight: 'bold',
            fontFamily: '"Georgia", serif',
            color: '#FFF8DC',
            background: phase === 'checking' || answers.some(a => a.trim() === '')
              ? '#B8A88A'
              : 'linear-gradient(180deg, #8B4513 0%, #5D3A1A 100%)',
            border: '2px solid #F1C40F',
            borderRadius: '8px',
            cursor: phase === 'checking' || answers.some(a => a.trim() === '')
              ? 'not-allowed' : 'pointer',
            boxShadow: '0 3px 8px rgba(0,0,0,0.2)',
            transition: 'transform 0.1s',
          }}
          onMouseEnter={(e) => {
            if (!e.currentTarget.disabled) e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Check Answer
        </button>
      </div>

      <div style={incaBorderStyle} />

      {/* Animations */}
      <style>{`
        @keyframes quipu-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default QuipuCodeBreaker;
