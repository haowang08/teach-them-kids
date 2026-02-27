import { useState, useCallback, useEffect } from 'react';

// ============================================
// TYPES
// ============================================

type GamePhase = 'intro' | 'playing' | 'answering' | 'marching' | 'complete';

interface StopData {
  id: number;
  type: 'quote' | 'number' | 'match';
  question: string;
  options: string[];
  correctIndex: number;
  fact: string;
  era: string;
}

// ============================================
// CONSTANTS
// ============================================

const STOPS: StopData[] = [
  {
    id: 0,
    type: 'quote',
    question: 'Who said: "If you are neutral in situations of injustice, you have chosen the side of the oppressor"?',
    options: ['Martin Luther King Jr.', 'Desmond Tutu', 'Nelson Mandela'],
    correctIndex: 1,
    fact: 'Archbishop Desmond Tutu used his moral authority to fight apartheid in South Africa.',
    era: 'Segregation Era',
  },
  {
    id: 1,
    type: 'number',
    question: 'How long did the Montgomery Bus Boycott last?',
    options: ['81 days', '381 days', '38 days'],
    correctIndex: 1,
    fact: 'The boycott lasted over a year! African Americans walked, carpooled, and biked instead of riding buses.',
    era: 'Civil Rights Movement',
  },
  {
    id: 2,
    type: 'match',
    question: 'Who was the 6-year-old who bravely walked into an all-white school in 1960?',
    options: ['Ruby Bridges', 'Rosa Parks', 'Harriet Tubman'],
    correctIndex: 0,
    fact: 'Ruby Bridges needed federal marshals to escort her. She was the only student in her class because white parents pulled their children out.',
    era: 'School Integration',
  },
  {
    id: 3,
    type: 'match',
    question: 'Who is known as the "Father of the Disability Rights Movement"?',
    options: ['Martin Luther King Jr.', 'Ed Roberts', 'Cesar Chavez'],
    correctIndex: 1,
    fact: 'Ed Roberts, who used a wheelchair due to polio, fought for disabled people\'s right to live independently.',
    era: 'Disability Rights',
  },
  {
    id: 4,
    type: 'number',
    question: 'How many years did Nelson Mandela spend in prison before becoming South Africa\'s president?',
    options: ['7 years', '17 years', '27 years'],
    correctIndex: 2,
    fact: 'Mandela spent 27 years in prison, mostly on Robben Island, yet emerged without bitterness to lead South Africa.',
    era: 'Anti-Apartheid',
  },
  {
    id: 5,
    type: 'match',
    question: 'The Standing Rock protests were about protecting what?',
    options: ['Voting rights', 'Water and sacred lands', 'School integration'],
    correctIndex: 1,
    fact: 'The Standing Rock Sioux Tribe protested the Dakota Access Pipeline to protect their water supply and sacred lands.',
    era: 'Indigenous Rights',
  },
];

const MARCHER_COLORS = [
  '#8B4513', '#A0522D', '#D2691E', '#CD853F', '#DEB887',
  '#F4A460', '#D2B48C', '#FFDEAD', '#FFE4B5', '#FFEFD5',
  '#6B4423', '#8B6914', '#9C661F', '#B8860B', '#C49102',
];

const SIGN_ICONS = ['\u270A', '\u262E\uFE0F', '\u2764\uFE0F', '\u2696\uFE0F', '\u{1F91D}', '\u2B50'];

// ============================================
// MAIN COMPONENT
// ============================================

export default function MarchForJustice() {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [currentStop, setCurrentStop] = useState(0);
  const [marchSize, setMarchSize] = useState(8);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    function check() { setIsSmall(window.innerWidth < 640); }
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleStart = useCallback(() => {
    setPhase('answering');
    setCurrentStop(0);
    setMarchSize(8);
    setAnswers({});
    setSelectedAnswer(null);
    setShowResult(false);
  }, []);

  const handleAnswer = useCallback((answerIndex: number) => {
    if (selectedAnswer !== null) return;
    const stop = STOPS[currentStop];
    const isCorrect = answerIndex === stop.correctIndex;
    setSelectedAnswer(answerIndex);
    setAnswers(prev => ({ ...prev, [currentStop]: isCorrect }));
    setMarchSize(prev => prev + (isCorrect ? 10 : 3));
    setShowResult(true);

    setTimeout(() => {
      setPhase('marching');
      setTimeout(() => {
        setShowResult(false);
        setSelectedAnswer(null);
        if (currentStop >= STOPS.length - 1) {
          setPhase('complete');
        } else {
          setCurrentStop(prev => prev + 1);
          setPhase('answering');
        }
      }, 1200);
    }, 2500);
  }, [selectedAnswer, currentStop]);

  const handleRestart = useCallback(() => {
    setPhase('intro');
    setCurrentStop(0);
    setMarchSize(8);
    setAnswers({});
    setSelectedAnswer(null);
    setShowResult(false);
  }, []);

  // ============================================
  // STYLES
  // ============================================

  const progressPercent = ((currentStop + (phase === 'marching' || phase === 'complete' ? 1 : 0)) / STOPS.length) * 100;

  const containerStyle: React.CSSProperties = {
    background: 'linear-gradient(180deg, #fef3c7, #fde68a, #fbbf24)',
    borderRadius: 16,
    padding: isSmall ? 12 : 24,
    minHeight: 400,
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    position: 'relative',
    overflow: 'hidden',
    border: '2px solid #92400e',
    boxShadow: '0 0 20px rgba(146, 64, 14, 0.2)',
  };

  const buttonStyle: React.CSSProperties = {
    padding: isSmall ? '10px 28px' : '14px 48px',
    borderRadius: 8,
    border: '2px solid #92400e',
    background: 'linear-gradient(180deg, #92400e 0%, #78350f 100%)',
    color: '#fef3c7',
    fontWeight: 800,
    fontSize: isSmall ? 14 : 18,
    cursor: 'pointer',
    boxShadow: '0 0 15px rgba(146, 64, 14, 0.3)',
    transition: 'all 0.2s ease',
    letterSpacing: 1,
  };

  // Marcher rendering
  const renderMarchers = (count: number, animated: boolean = false) => {
    const display = Math.min(count, 60);
    return Array.from({ length: display }).map((_, i) => {
      const color = MARCHER_COLORS[i % MARCHER_COLORS.length];
      const sign = i % 5 === 0 ? SIGN_ICONS[i % SIGN_ICONS.length] : null;
      return (
        <div key={i} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: animated && i >= display - 10 ? `marchIn 0.5s ease-out ${i * 0.03}s both` : 'none',
        }}>
          {sign && (
            <div style={{ fontSize: isSmall ? 8 : 10, marginBottom: 1 }}>{sign}</div>
          )}
          <div style={{
            width: isSmall ? 8 : 10,
            height: isSmall ? 8 : 10,
            borderRadius: '50%',
            background: color,
          }} />
          <div style={{
            width: isSmall ? 5 : 6,
            height: isSmall ? 10 : 13,
            background: color,
            borderRadius: '2px 2px 0 0',
            marginTop: 1,
            opacity: 0.8,
          }} />
        </div>
      );
    });
  };

  // ============================================
  // INTRO
  // ============================================

  if (phase === 'intro') {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: isSmall ? 48 : 64, marginBottom: 8 }}>{'\u270A'}</div>
          <h2 style={{
            fontSize: isSmall ? 22 : 30,
            fontWeight: 800,
            color: '#78350f',
            margin: '0 0 8px',
            letterSpacing: 2,
          }}>
            MARCH FOR JUSTICE
          </h2>
          <div style={{
            background: 'rgba(255,255,255,0.5)',
            borderRadius: 12,
            padding: isSmall ? 16 : 20,
            maxWidth: 520,
            margin: '0 auto 20px',
            textAlign: 'left',
            border: '1px solid rgba(146, 64, 14, 0.2)',
          }}>
            <p style={{ color: '#78350f', fontSize: isSmall ? 13 : 15, lineHeight: 1.7, margin: 0 }}>
              Great movements start with a single step. Lead a march for justice through the city,
              gathering supporters along the way! At each of <strong>{STOPS.length} stops</strong>,
              answer a civil rights question to rally more marchers to your cause.
              <br /><br />
              Correct answers bring <strong style={{ color: '#059669' }}>+10 marchers</strong>,
              and even wrong answers still bring <strong>+3</strong> because everyone is welcome!
            </p>
          </div>
          <button
            onClick={handleStart}
            style={buttonStyle}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            START MARCHING
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // COMPLETE
  // ============================================

  if (phase === 'complete') {
    const correctCount = Object.values(answers).filter(Boolean).length;
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: isSmall ? 48 : 64, marginBottom: 8 }}>{'\u{1F389}'}</div>
          <h2 style={{
            fontSize: isSmall ? 22 : 28,
            fontWeight: 800,
            color: '#78350f',
            margin: '0 0 8px',
          }}>
            RALLY COMPLETE!
          </h2>

          {/* March display */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: isSmall ? 3 : 4,
            maxWidth: 500,
            margin: '0 auto 16px',
            padding: 12,
            background: 'rgba(255,255,255,0.4)',
            borderRadius: 12,
            border: '1px solid rgba(146, 64, 14, 0.2)',
          }}>
            {renderMarchers(marchSize)}
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.5)',
            borderRadius: 12,
            padding: isSmall ? 12 : 20,
            maxWidth: 500,
            margin: '0 auto 16px',
            border: '1px solid rgba(146, 64, 14, 0.2)',
          }}>
            <p style={{
              color: '#78350f',
              fontSize: isSmall ? 18 : 22,
              fontWeight: 'bold',
              margin: '0 0 8px',
            }}>
              Your march gathered {marchSize} supporters!
            </p>
            <p style={{
              color: '#92400e',
              fontSize: isSmall ? 13 : 15,
              margin: '0 0 8px',
            }}>
              {correctCount}/{STOPS.length} questions answered correctly
            </p>
            <p style={{
              color: '#92400e',
              fontSize: isSmall ? 13 : 15,
              margin: 0,
              lineHeight: 1.6,
            }}>
              Together, we are unstoppable! Every person who stands up for what's right
              makes the world a better place.
            </p>
          </div>

          <button
            onClick={handleRestart}
            style={buttonStyle}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            MARCH AGAIN
          </button>
        </div>

        <style>{`
          @keyframes marchIn {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}</style>
      </div>
    );
  }

  // ============================================
  // PLAYING (ANSWERING + MARCHING)
  // ============================================

  const stop = STOPS[currentStop];

  return (
    <div style={containerStyle}>
      {/* Progress bar / road */}
      <div style={{
        marginBottom: 12,
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 6,
        }}>
          <span style={{ color: '#78350f', fontWeight: 700, fontSize: isSmall ? 12 : 14 }}>
            STOP {currentStop + 1} / {STOPS.length}
          </span>
          <span style={{ color: '#78350f', fontWeight: 700, fontSize: isSmall ? 12 : 14 }}>
            {'\u{1F465}'} {marchSize} marchers
          </span>
        </div>

        {/* Road */}
        <div style={{
          position: 'relative',
          height: 28,
          background: '#6b4423',
          borderRadius: 14,
          overflow: 'hidden',
        }}>
          {/* Road markings */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: 2,
            background: 'repeating-linear-gradient(90deg, #fbbf24 0px, #fbbf24 12px, transparent 12px, transparent 24px)',
            transform: 'translateY(-50%)',
          }} />
          {/* Progress fill */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #059669, #10b981)',
            borderRadius: 14,
            transition: 'width 0.8s ease',
          }} />
          {/* Stop markers */}
          {STOPS.map((s, i) => (
            <div key={s.id} style={{
              position: 'absolute',
              left: `${((i + 1) / STOPS.length) * 100}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: i < currentStop ? '#059669'
                : i === currentStop ? '#fbbf24'
                : 'rgba(255,255,255,0.3)',
              border: '2px solid #fff',
              zIndex: 2,
            }} />
          ))}
        </div>
      </div>

      {/* Cityscape */}
      <div style={{
        position: 'relative',
        height: isSmall ? 80 : 100,
        marginBottom: 10,
        overflow: 'hidden',
        borderRadius: 10,
        background: 'linear-gradient(180deg, #bae6fd 0%, #e0f2fe 60%, #d1d5db 60%, #9ca3af 100%)',
      }}>
        {/* Buildings */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 4,
          padding: '0 8px',
          transform: `translateX(${-(currentStop * 8)}%)`,
          transition: 'transform 1s ease',
        }}>
          {Array.from({ length: 14 }).map((_, i) => {
            const height = 30 + (i % 3) * 15 + (i % 5) * 8;
            const hue = 20 + i * 8;
            return (
              <div key={i} style={{
                width: isSmall ? 20 : 28,
                height: height,
                background: `hsl(${hue}, 20%, ${45 + i * 2}%)`,
                borderRadius: '3px 3px 0 0',
                flexShrink: 0,
                position: 'relative',
              }}>
                {/* Windows */}
                {Array.from({ length: Math.floor(height / 20) }).map((_, w) => (
                  <div key={w} style={{
                    position: 'absolute',
                    left: '25%',
                    right: '25%',
                    top: 6 + w * 18,
                    height: 6,
                    background: w % 2 === 0 ? 'rgba(255,230,150,0.6)' : 'rgba(200,200,200,0.3)',
                    borderRadius: 1,
                  }} />
                ))}
              </div>
            );
          })}
        </div>

        {/* Era label */}
        <div style={{
          position: 'absolute',
          top: 6,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.5)',
          color: '#fff',
          padding: '3px 12px',
          borderRadius: 10,
          fontSize: isSmall ? 10 : 12,
          fontWeight: 'bold',
          zIndex: 5,
        }}>
          {stop.era}
        </div>

        {/* Marchers walking */}
        <div style={{
          position: 'absolute',
          bottom: 4,
          left: isSmall ? 8 : 16,
          display: 'flex',
          gap: isSmall ? 2 : 3,
          animation: phase === 'marching' ? 'walkBounce 0.6s ease-in-out infinite' : 'none',
        }}>
          {renderMarchers(Math.min(marchSize, 20), phase === 'marching')}
        </div>
      </div>

      {/* Question card */}
      {phase === 'answering' && (
        <div style={{
          background: 'rgba(255,255,255,0.7)',
          borderRadius: 12,
          padding: isSmall ? 12 : 20,
          border: '2px solid rgba(146, 64, 14, 0.3)',
          animation: 'slideUp 0.4s ease-out',
        }}>
          <p style={{
            color: '#78350f',
            fontSize: isSmall ? 14 : 17,
            fontWeight: 'bold',
            margin: '0 0 12px',
            lineHeight: 1.5,
          }}>
            {stop.question}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {stop.options.map((option, i) => {
              const isSelected = selectedAnswer === i;
              const isCorrect = i === stop.correctIndex;
              const showState = showResult;

              let borderColor = 'rgba(146, 64, 14, 0.3)';
              let bgColor = 'rgba(255,255,255,0.5)';
              if (showState && isCorrect) {
                borderColor = '#059669';
                bgColor = 'rgba(5, 150, 105, 0.15)';
              } else if (showState && isSelected && !isCorrect) {
                borderColor = '#dc2626';
                bgColor = 'rgba(220, 38, 38, 0.1)';
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selectedAnswer !== null}
                  style={{
                    padding: isSmall ? '10px 12px' : '12px 16px',
                    borderRadius: 8,
                    border: `2px solid ${borderColor}`,
                    background: bgColor,
                    color: '#78350f',
                    fontSize: isSmall ? 13 : 15,
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: selectedAnswer !== null ? 'default' : 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    if (selectedAnswer === null) {
                      e.currentTarget.style.background = 'rgba(146, 64, 14, 0.1)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (selectedAnswer === null) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.5)';
                    }
                  }}
                >
                  {showState && isCorrect && '\u2705 '}
                  {showState && isSelected && !isCorrect && '\u274C '}
                  {option}
                </button>
              );
            })}
          </div>

          {/* Fact display after answering */}
          {showResult && (
            <div style={{
              marginTop: 10,
              padding: isSmall ? 8 : 12,
              background: 'rgba(5, 150, 105, 0.1)',
              borderRadius: 8,
              border: '1px solid rgba(5, 150, 105, 0.3)',
              animation: 'fadeIn 0.3s ease-out',
            }}>
              <p style={{
                color: '#065f46',
                fontSize: isSmall ? 12 : 14,
                margin: 0,
                lineHeight: 1.5,
              }}>
                {'\u{1F4A1}'} {stop.fact}
              </p>
              <p style={{
                color: '#059669',
                fontSize: isSmall ? 11 : 13,
                fontWeight: 'bold',
                margin: '6px 0 0',
              }}>
                +{answers[currentStop] ? '10' : '3'} marchers join your cause!
              </p>
            </div>
          )}
        </div>
      )}

      {phase === 'marching' && (
        <div style={{
          textAlign: 'center',
          padding: 20,
          color: '#78350f',
          fontSize: isSmall ? 16 : 20,
          fontWeight: 'bold',
          animation: 'fadeIn 0.3s',
        }}>
          {'\u{1F6B6}'} Marching to the next stop...
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes walkBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes marchIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
