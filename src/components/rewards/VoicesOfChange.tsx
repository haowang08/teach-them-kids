import { useState, useCallback, useEffect } from 'react';

// ============================================
// TYPES
// ============================================

type GamePhase = 'intro' | 'playing' | 'complete';

interface PhraseOption {
  text: string;
  strength: 'strong' | 'good' | 'weak';
  attribution: string;
  crowdBoost: number;
}

interface SpeechRound {
  topic: string;
  topicIcon: string;
  options: PhraseOption[];
}

// ============================================
// CONSTANTS
// ============================================

const ROUNDS: SpeechRound[] = [
  {
    topic: 'Education Rights',
    topicIcon: '\u{1F4DA}',
    options: [
      {
        text: '"One child, one teacher, one book, one pen can change the world."',
        strength: 'strong',
        attribution: 'Malala Yousafzai',
        crowdBoost: 20,
      },
      {
        text: '"Everyone deserves a chance to learn and grow."',
        strength: 'good',
        attribution: 'Your words',
        crowdBoost: 10,
      },
      {
        text: '"School is okay, I guess."',
        strength: 'weak',
        attribution: 'Your words',
        crowdBoost: 3,
      },
    ],
  },
  {
    topic: 'The Right to Vote',
    topicIcon: '\u{1F5F3}\uFE0F',
    options: [
      {
        text: '"Deeds, not words! We demand the right to be heard!"',
        strength: 'strong',
        attribution: 'Emmeline Pankhurst',
        crowdBoost: 20,
      },
      {
        text: '"Voting matters for everyone, not just some people."',
        strength: 'good',
        attribution: 'Your words',
        crowdBoost: 10,
      },
      {
        text: '"It would be nice if people could vote."',
        strength: 'weak',
        attribution: 'Your words',
        crowdBoost: 3,
      },
    ],
  },
  {
    topic: 'Equal Rights for All',
    topicIcon: '\u2696\uFE0F',
    options: [
      {
        text: '"Ain\'t I a woman? I could work as much and eat as much as any man!"',
        strength: 'strong',
        attribution: 'Sojourner Truth',
        crowdBoost: 20,
      },
      {
        text: '"Men and women should have equal opportunities in life."',
        strength: 'good',
        attribution: 'Your words',
        crowdBoost: 10,
      },
      {
        text: '"Things are mostly fine the way they are."',
        strength: 'weak',
        attribution: 'Your words',
        crowdBoost: 3,
      },
    ],
  },
  {
    topic: 'Courage to Lead',
    topicIcon: '\u{1F31F}',
    options: [
      {
        text: '"I thought I was fighting for my right to be treated as an equal. I was standing up for the rights of women everywhere."',
        strength: 'strong',
        attribution: 'Billie Jean King',
        crowdBoost: 20,
      },
      {
        text: '"True leaders stand up for what is right, even when it\'s hard."',
        strength: 'good',
        attribution: 'Your words',
        crowdBoost: 10,
      },
      {
        text: '"Being a leader sounds like a lot of work."',
        strength: 'weak',
        attribution: 'Your words',
        crowdBoost: 3,
      },
    ],
  },
];

const CROWD_COLORS = [
  '#8b5cf6', '#a78bfa', '#7c3aed', '#6d28d9', '#c084fc',
  '#f472b6', '#ec4899', '#db2777', '#e879f9', '#d946ef',
  '#60a5fa', '#3b82f6', '#2563eb', '#38bdf8', '#0ea5e9',
  '#34d399', '#10b981', '#059669', '#fbbf24', '#f59e0b',
];

// ============================================
// MAIN COMPONENT
// ============================================

export default function VoicesOfChange() {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [round, setRound] = useState(0);
  const [selectedPhrases, setSelectedPhrases] = useState<Array<{ text: string; attribution: string }>>([]);
  const [crowdSize, setCrowdSize] = useState(12);
  const [showBubble, setShowBubble] = useState(false);
  const [lastSelected, setLastSelected] = useState<PhraseOption | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    function check() { setIsSmall(window.innerWidth < 640); }
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleStart = useCallback(() => {
    setPhase('playing');
    setRound(0);
    setSelectedPhrases([]);
    setCrowdSize(12);
    setShowBubble(false);
    setLastSelected(null);
    setTransitioning(false);
  }, []);

  const handleSelectPhrase = useCallback((option: PhraseOption) => {
    if (transitioning) return;
    setLastSelected(option);
    setSelectedPhrases(prev => [...prev, { text: option.text, attribution: option.attribution }]);
    setCrowdSize(prev => prev + option.crowdBoost);
    setShowBubble(true);
    setTransitioning(true);

    setTimeout(() => {
      setShowBubble(false);
      setTimeout(() => {
        if (round >= ROUNDS.length - 1) {
          setPhase('complete');
        } else {
          setRound(prev => prev + 1);
          setTransitioning(false);
        }
      }, 400);
    }, 2500);
  }, [round, transitioning]);

  const handleRestart = useCallback(() => {
    setPhase('intro');
    setRound(0);
    setSelectedPhrases([]);
    setCrowdSize(12);
    setShowBubble(false);
    setLastSelected(null);
    setTransitioning(false);
  }, []);

  // ============================================
  // STYLES
  // ============================================

  const containerStyle: React.CSSProperties = {
    background: 'linear-gradient(180deg, #4c1d95, #6d28d9, #7c3aed)',
    borderRadius: 16,
    padding: isSmall ? 12 : 24,
    minHeight: 400,
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    position: 'relative',
    overflow: 'hidden',
    border: '2px solid #a78bfa',
    boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)',
  };

  const buttonStyle: React.CSSProperties = {
    padding: isSmall ? '10px 28px' : '14px 48px',
    borderRadius: 8,
    border: '2px solid #fbbf24',
    background: 'linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%)',
    color: '#4c1d95',
    fontWeight: 800,
    fontSize: isSmall ? 14 : 18,
    cursor: 'pointer',
    boxShadow: '0 0 15px rgba(251, 191, 36, 0.4)',
    transition: 'all 0.2s ease',
    letterSpacing: 1,
  };

  // Crowd rendering helper
  const renderCrowd = (count: number, maxDisplay: number = 80) => {
    const display = Math.min(count, maxDisplay);
    const figures: React.ReactNode[] = [];
    for (let i = 0; i < display; i++) {
      const color = CROWD_COLORS[i % CROWD_COLORS.length];
      const delay = i * 0.02;
      const isRaised = i % 3 === 0;
      figures.push(
        <div
          key={i}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animation: i >= display - 20 ? `crowdAppear 0.5s ease-out ${delay}s both` : 'none',
          }}
        >
          {/* Head */}
          <div style={{
            width: isSmall ? 8 : 10,
            height: isSmall ? 8 : 10,
            borderRadius: '50%',
            background: color,
            marginBottom: 1,
            position: 'relative',
            top: isRaised ? -3 : 0,
          }} />
          {/* Arm */}
          {isRaised && (
            <div style={{
              width: 2,
              height: isSmall ? 5 : 7,
              background: color,
              position: 'relative',
              top: isRaised ? -4 : 0,
              transform: 'rotate(-20deg)',
              transformOrigin: 'bottom center',
            }} />
          )}
        </div>
      );
    }
    return figures;
  };

  // ============================================
  // INTRO
  // ============================================

  if (phase === 'intro') {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: isSmall ? 48 : 64, marginBottom: 8 }}>{'\u{1F3A4}'}</div>
          <h2 style={{
            fontSize: isSmall ? 22 : 30,
            fontWeight: 800,
            color: '#fbbf24',
            textShadow: '0 0 10px rgba(251, 191, 36, 0.5)',
            margin: '0 0 8px',
            letterSpacing: 2,
          }}>
            VOICES OF CHANGE
          </h2>
          <div style={{
            background: 'rgba(0,0,0,0.25)',
            borderRadius: 12,
            padding: isSmall ? 16 : 20,
            maxWidth: 520,
            margin: '0 auto 20px',
            textAlign: 'left',
            border: '1px solid rgba(251, 191, 36, 0.3)',
          }}>
            <p style={{ color: '#e9d5ff', fontSize: isSmall ? 13 : 15, lineHeight: 1.7, margin: 0 }}>
              Throughout history, brave women changed the world with their words.
              Now it's <strong style={{ color: '#fbbf24' }}>YOUR</strong> turn!
              Build a speech that inspires a crowd. Choose the most powerful phrases
              across {ROUNDS.length} topics and watch your audience grow.
              Every choice builds something -- but the strongest words inspire the most people!
            </p>
          </div>
          <button
            onClick={handleStart}
            style={buttonStyle}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            TAKE THE PODIUM
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // COMPLETE
  // ============================================

  if (phase === 'complete') {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: isSmall ? 48 : 64, marginBottom: 8 }}>{'\u{1F389}'}</div>
          <h2 style={{
            fontSize: isSmall ? 22 : 28,
            fontWeight: 800,
            color: '#fbbf24',
            textShadow: '0 0 15px rgba(251, 191, 36, 0.5)',
            margin: '0 0 8px',
          }}>
            STANDING OVATION!
          </h2>

          {/* Crowd */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: isSmall ? 3 : 4,
            maxWidth: 500,
            margin: '0 auto 16px',
            padding: 12,
            background: 'rgba(0,0,0,0.2)',
            borderRadius: 12,
          }}>
            {renderCrowd(crowdSize)}
          </div>

          <p style={{
            color: '#fbbf24',
            fontSize: isSmall ? 16 : 20,
            fontWeight: 'bold',
            margin: '0 0 16px',
          }}>
            Your speech inspired {crowdSize} people!
          </p>

          {/* The speech they built */}
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 12,
            padding: isSmall ? 12 : 16,
            maxWidth: 500,
            margin: '0 auto 16px',
            textAlign: 'left',
            border: '1px solid rgba(251, 191, 36, 0.3)',
          }}>
            <p style={{ color: '#fbbf24', fontSize: isSmall ? 11 : 13, fontWeight: 'bold', margin: '0 0 8px' }}>
              YOUR SPEECH:
            </p>
            {selectedPhrases.map((phrase, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <p style={{
                  color: '#e9d5ff',
                  fontSize: isSmall ? 13 : 15,
                  fontStyle: 'italic',
                  margin: '0 0 2px',
                  lineHeight: 1.5,
                }}>
                  {phrase.text}
                </p>
                <p style={{
                  color: 'rgba(233, 213, 255, 0.5)',
                  fontSize: isSmall ? 10 : 11,
                  margin: 0,
                }}>
                  -- {phrase.attribution}
                </p>
              </div>
            ))}
          </div>

          <p style={{
            color: '#e9d5ff',
            fontSize: isSmall ? 13 : 15,
            margin: '0 auto 16px',
            maxWidth: 450,
            lineHeight: 1.6,
          }}>
            The best leaders know that words can change the world. Keep speaking up!
          </p>

          <button
            onClick={handleRestart}
            style={buttonStyle}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            SPEAK AGAIN
          </button>
        </div>

        {/* Confetti */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: '-5%',
              fontSize: isSmall ? 16 : 20,
              animation: `confettiFall ${2 + Math.random() * 3}s linear ${Math.random() * 2}s infinite`,
            }}>
              {['\u270A', '\u2B50', '\u{1F49C}', '\u{1F49A}', '\u{1F90D}'][i % 5]}
            </div>
          ))}
        </div>

        <style>{`
          @keyframes confettiFall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(500px) rotate(360deg); opacity: 0; }
          }
          @keyframes crowdAppear {
            from { opacity: 0; transform: scale(0) translateY(10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  // ============================================
  // PLAYING
  // ============================================

  const currentRound = ROUNDS[round];

  return (
    <div style={containerStyle}>
      {/* Progress */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        flexWrap: 'wrap',
        gap: 8,
      }}>
        <div style={{
          color: '#fbbf24',
          fontWeight: 700,
          fontSize: isSmall ? 12 : 14,
        }}>
          TOPIC {round + 1} / {ROUNDS.length}
        </div>
        <div style={{
          color: '#e9d5ff',
          fontWeight: 700,
          fontSize: isSmall ? 12 : 14,
        }}>
          {'\u{1F465}'} CROWD: {crowdSize}
        </div>
      </div>

      {/* Progress dots */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 6,
        marginBottom: 12,
      }}>
        {ROUNDS.map((_, i) => (
          <div
            key={i}
            style={{
              width: isSmall ? 10 : 12,
              height: isSmall ? 10 : 12,
              borderRadius: '50%',
              background: i < round ? '#fbbf24' : i === round ? '#e9d5ff' : 'rgba(255,255,255,0.2)',
              boxShadow: i === round ? '0 0 8px rgba(233,213,255,0.6)' : 'none',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>

      {/* Podium scene - top half */}
      <div style={{
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%)',
        borderRadius: 12,
        padding: isSmall ? 10 : 16,
        marginBottom: 12,
        minHeight: isSmall ? 100 : 140,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}>
        {/* Speech bubble */}
        {showBubble && lastSelected && (
          <div style={{
            position: 'absolute',
            top: isSmall ? 8 : 12,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255,255,255,0.95)',
            color: '#4c1d95',
            borderRadius: 12,
            padding: isSmall ? '8px 12px' : '10px 16px',
            maxWidth: '85%',
            fontSize: isSmall ? 12 : 14,
            fontStyle: 'italic',
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            animation: 'bubbleIn 0.4s ease-out',
            zIndex: 5,
            textAlign: 'center',
            lineHeight: 1.5,
          }}>
            {lastSelected.text}
            <div style={{
              position: 'absolute',
              bottom: -6,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 12,
              height: 12,
              background: 'rgba(255,255,255,0.95)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }} />
          </div>
        )}

        {/* Speaker silhouette */}
        <div style={{
          width: isSmall ? 24 : 32,
          height: isSmall ? 24 : 32,
          borderRadius: '50%',
          background: '#e9d5ff',
          marginBottom: 4,
          zIndex: 2,
        }} />
        {/* Podium */}
        <div style={{
          width: isSmall ? 40 : 50,
          height: isSmall ? 20 : 28,
          background: 'linear-gradient(180deg, #7c3aed, #5b21b6)',
          borderRadius: '4px 4px 0 0',
          zIndex: 2,
        }} />

        {/* Crowd */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: isSmall ? 2 : 3,
          marginTop: 6,
          maxWidth: '100%',
          zIndex: 1,
        }}>
          {renderCrowd(crowdSize, 60)}
        </div>
      </div>

      {/* Topic header */}
      <div style={{
        textAlign: 'center',
        marginBottom: 10,
      }}>
        <span style={{ fontSize: isSmall ? 20 : 26, marginRight: 6 }}>{currentRound.topicIcon}</span>
        <span style={{
          color: '#fbbf24',
          fontSize: isSmall ? 16 : 20,
          fontWeight: 800,
        }}>
          {currentRound.topic}
        </span>
      </div>

      {/* Phrase options */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}>
        {currentRound.options.map((option, i) => {
          const borderColor = option.strength === 'strong' ? '#fbbf24'
            : option.strength === 'good' ? '#a78bfa'
            : 'rgba(255,255,255,0.2)';
          return (
            <button
              key={i}
              onClick={() => handleSelectPhrase(option)}
              disabled={transitioning}
              style={{
                padding: isSmall ? '10px 12px' : '14px 16px',
                borderRadius: 10,
                border: `2px solid ${borderColor}`,
                background: 'rgba(0,0,0,0.25)',
                color: '#e9d5ff',
                fontSize: isSmall ? 13 : 15,
                textAlign: 'left',
                cursor: transitioning ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                lineHeight: 1.5,
                opacity: transitioning ? 0.5 : 1,
              }}
              onMouseEnter={e => {
                if (!transitioning) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.25)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <span style={{ fontStyle: 'italic' }}>{option.text}</span>
              {option.attribution !== 'Your words' && (
                <span style={{
                  display: 'block',
                  color: 'rgba(233, 213, 255, 0.5)',
                  fontSize: isSmall ? 10 : 11,
                  marginTop: 4,
                }}>
                  -- {option.attribution}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes bubbleIn {
          from { opacity: 0; transform: translateX(-50%) translateY(10px) scale(0.8); }
          to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
        @keyframes crowdAppear {
          from { opacity: 0; transform: scale(0) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
