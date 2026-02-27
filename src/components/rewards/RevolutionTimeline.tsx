import { useState, useCallback, useEffect } from 'react';

// ============================================
// TYPES
// ============================================

type GamePhase = 'intro' | 'playing' | 'flipping' | 'complete';

interface RevolutionData {
  id: string;
  revolution: string;
  accentColor: string;
  accentLight: string;
  year: string;
  cause: string;
  turningPoint: string;
  triumph: string;
  complication: string;
}

// ============================================
// CONSTANTS
// ============================================

const REVOLUTIONS: RevolutionData[] = [
  {
    id: 'haiti',
    revolution: 'Haitian Revolution',
    accentColor: '#1e3a8a',
    accentLight: '#93c5fd',
    year: '1791\u20131804',
    cause: 'Enslaved people in Haiti suffered brutal conditions under French colonial rule.',
    turningPoint: 'Toussaint Louverture led a massive uprising of enslaved people against their masters.',
    triumph: 'Haiti became the first free Black republic and the first successful slave revolution in history.',
    complication: 'France forced Haiti to pay $21 billion in "reparations" to former slave owners, crippling the nation for over a century.',
  },
  {
    id: 'bolivar',
    revolution: 'Bol\u00edvar\'s Liberation',
    accentColor: '#065f46',
    accentLight: '#6ee7b7',
    year: '1810s\u20131830',
    cause: 'South American colonies were controlled by Spain, with no self-governance for the people.',
    turningPoint: 'Sim\u00f3n Bol\u00edvar crossed the Andes with his army and won stunning victories against the Spanish.',
    triumph: 'Bol\u00edvar liberated Venezuela, Colombia, Ecuador, Peru, and Bolivia from Spanish rule.',
    complication: 'His dream of a united South America ("Gran Colombia") fell apart due to political infighting.',
  },
  {
    id: 'india',
    revolution: 'Indian Independence',
    accentColor: '#b45309',
    accentLight: '#fcd34d',
    year: '1930\u20131947',
    cause: 'Britain taxed salt, making it unaffordable for millions of Indians living under colonial rule.',
    turningPoint: 'Gandhi led the 240-mile Salt March to the sea, inspiring millions to join the resistance.',
    triumph: 'India won independence from Britain in 1947 after decades of nonviolent struggle.',
    complication: 'Partition displaced 10-20 million people and caused the deaths of hundreds of thousands.',
  },
  {
    id: 'stonewall',
    revolution: 'Stonewall Uprising',
    accentColor: '#7c3aed',
    accentLight: '#c4b5fd',
    year: '1969',
    cause: 'LGBTQ+ people faced constant police raids, discrimination, and harassment with no legal protections.',
    turningPoint: 'Patrons of the Stonewall Inn in New York City fought back against a police raid, sparking days of protests.',
    triumph: 'Stonewall launched the modern LGBTQ+ rights movement, leading to Pride marches worldwide.',
    complication: 'Full equality took decades more. Same-sex marriage wasn\'t legal nationwide in the US until 2015.',
  },
  {
    id: 'solidarity',
    revolution: 'Solidarity Movement',
    accentColor: '#dc2626',
    accentLight: '#fca5a5',
    year: '1980\u20131989',
    cause: 'Polish workers suffered low wages, food shortages, and no freedom of speech under Communist rule.',
    turningPoint: 'Lech Wa\u0142\u0119sa led shipyard workers in Gda\u0144sk to form Solidarity, the first independent trade union in a Communist country.',
    triumph: 'Solidarity\'s success triggered a domino effect that brought down Communist governments across Eastern Europe.',
    complication: 'The transition to capitalism brought economic hardship and inequality for many ordinary workers.',
  },
];

const CARD_LABELS = ['CAUSE', 'TURNING POINT', 'CONSEQUENCE'] as const;

// ============================================
// MAIN COMPONENT
// ============================================

export default function RevolutionTimeline() {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [currentRound, setCurrentRound] = useState(0);
  // Slots: 3 positions, each can hold a card index or null
  const [slots, setSlots] = useState<(number | null)[]>([null, null, null]);
  // The shuffled order of cards for the current round
  const [shuffledOrder, setShuffledOrder] = useState<number[]>([0, 1, 2]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState<boolean[]>([]);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    function check() { setIsSmall(window.innerWidth < 640); }
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const shuffleCards = useCallback(() => {
    const order = [0, 1, 2];
    // Fisher-Yates shuffle
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    setShuffledOrder(order);
  }, []);

  const handleStart = useCallback(() => {
    setPhase('playing');
    setCurrentRound(0);
    setSlots([null, null, null]);
    setSelectedCard(null);
    setIsFlipped(false);
    setIsCorrect(false);
    setShowFeedback(false);
    setCompleted([]);
    shuffleCards();
  }, [shuffleCards]);

  const handleCardClick = useCallback((cardIndex: number) => {
    if (phase !== 'playing') return;
    // If card is already placed in a slot, remove it
    const existingSlot = slots.indexOf(cardIndex);
    if (existingSlot !== -1) {
      setSlots(prev => {
        const next = [...prev];
        next[existingSlot] = null;
        return next;
      });
      setSelectedCard(null);
      return;
    }
    setSelectedCard(cardIndex);
  }, [phase, slots]);

  const handleSlotClick = useCallback((slotIndex: number) => {
    if (phase !== 'playing' || selectedCard === null) return;

    // If slot is already occupied, swap
    setSlots(prev => {
      const next = [...prev];
      // Remove selectedCard from any existing slot
      const existingSlot = next.indexOf(selectedCard);
      if (existingSlot !== -1) {
        next[existingSlot] = null;
      }
      // If this slot was occupied, that card becomes available again
      next[slotIndex] = selectedCard;
      return next;
    });
    setSelectedCard(null);

    // Check if all slots filled after this placement
    setTimeout(() => {
      setSlots(current => {
        if (current.every(s => s !== null)) {
          // Check order: should be [0, 1, 2] (cause, turning point, consequence)
          const correct = current[0] === 0 && current[1] === 1 && current[2] === 2;
          setIsCorrect(correct);
          setShowFeedback(true);

          if (correct) {
            setTimeout(() => {
              setPhase('flipping');
              setShowFeedback(false);
            }, 1500);
          } else {
            // Reset after showing wrong feedback
            setTimeout(() => {
              setShowFeedback(false);
              setSlots([null, null, null]);
            }, 1800);
          }
        }
        return current;
      });
    }, 100);
  }, [phase, selectedCard]);

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  const handleNextRound = useCallback(() => {
    setCompleted(prev => [...prev, true]);
    if (currentRound >= REVOLUTIONS.length - 1) {
      setPhase('complete');
    } else {
      setCurrentRound(prev => prev + 1);
      setSlots([null, null, null]);
      setSelectedCard(null);
      setIsFlipped(false);
      setIsCorrect(false);
      setShowFeedback(false);
      shuffleCards();
      setPhase('playing');
    }
  }, [currentRound, shuffleCards]);

  const handleRestart = useCallback(() => {
    setPhase('intro');
    setCurrentRound(0);
    setSlots([null, null, null]);
    setSelectedCard(null);
    setIsFlipped(false);
    setIsCorrect(false);
    setShowFeedback(false);
    setCompleted([]);
  }, []);

  // ============================================
  // HELPERS
  // ============================================

  const rev = REVOLUTIONS[currentRound];
  const cardTexts = rev ? [rev.cause, rev.turningPoint, rev.triumph] : [];

  const containerStyle: React.CSSProperties = {
    background: `linear-gradient(145deg, ${rev?.accentColor || '#1a1a2e'}dd, ${rev?.accentColor || '#1a1a2e'}99, #1a1a2e)`,
    borderRadius: 16,
    padding: isSmall ? 12 : 24,
    minHeight: 400,
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    position: 'relative',
    overflow: 'hidden',
    border: `2px solid ${rev?.accentLight || '#a0a0c0'}`,
    boxShadow: `0 0 20px ${rev?.accentColor || '#1a1a2e'}66`,
    transition: 'background 0.5s, border-color 0.5s',
  };

  const buttonStyle: React.CSSProperties = {
    padding: isSmall ? '10px 28px' : '14px 48px',
    borderRadius: 8,
    border: `2px solid ${rev?.accentLight || '#ffd700'}`,
    background: `linear-gradient(180deg, ${rev?.accentLight || '#ffd700'} 0%, ${rev?.accentColor || '#b8860b'} 100%)`,
    color: '#1a1a2e',
    fontWeight: 800,
    fontSize: isSmall ? 14 : 18,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    letterSpacing: 1,
  };

  // ============================================
  // INTRO
  // ============================================

  if (phase === 'intro') {
    return (
      <div style={{
        ...containerStyle,
        background: 'linear-gradient(145deg, #1a1a2e, #2d1b4e, #1a1a2e)',
        borderColor: '#a78bfa',
      }}>
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: isSmall ? 48 : 64, marginBottom: 8 }}>{'\u{1F4DC}'}</div>
          <h2 style={{
            fontSize: isSmall ? 22 : 30,
            fontWeight: 800,
            color: '#fbbf24',
            textShadow: '0 0 10px rgba(251, 191, 36, 0.4)',
            margin: '0 0 8px',
            letterSpacing: 2,
          }}>
            REVOLUTION TIMELINE
          </h2>
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 12,
            padding: isSmall ? 16 : 20,
            maxWidth: 520,
            margin: '0 auto 20px',
            textAlign: 'left',
            border: '1px solid rgba(251, 191, 36, 0.3)',
          }}>
            <p style={{ color: '#e9d5ff', fontSize: isSmall ? 13 : 15, lineHeight: 1.7, margin: 0 }}>
              Every revolution has a <strong style={{ color: '#fca5a5' }}>cause</strong>,
              a <strong style={{ color: '#fbbf24' }}>turning point</strong>,
              and <strong style={{ color: '#6ee7b7' }}>consequences</strong> -- some good, some complicated.
              <br /><br />
              For each of <strong>{REVOLUTIONS.length} revolutions</strong>, arrange the event cards in the correct order.
              Then flip the consequence card to discover the complicated truth that every revolution brings.
            </p>
          </div>
          <button
            onClick={handleStart}
            style={{
              ...buttonStyle,
              borderColor: '#fbbf24',
              background: 'linear-gradient(180deg, #fbbf24, #d97706)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            BEGIN
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
      <div style={{
        ...containerStyle,
        background: 'linear-gradient(145deg, #1a1a2e, #2d1b4e, #0f172a)',
        borderColor: '#fbbf24',
      }}>
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: isSmall ? 48 : 64, marginBottom: 8 }}>{'\u{1F3C6}'}</div>
          <h2 style={{
            fontSize: isSmall ? 20 : 26,
            fontWeight: 800,
            color: '#fbbf24',
            margin: '0 0 12px',
          }}>
            TIMELINE COMPLETE!
          </h2>

          {/* Full timeline */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isSmall ? 4 : 8,
            flexWrap: 'wrap',
            marginBottom: 16,
            padding: 12,
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 12,
          }}>
            {REVOLUTIONS.map((r, i) => (
              <div key={r.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: isSmall ? 4 : 8,
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  animation: `popIn 0.4s ease-out ${i * 0.15}s both`,
                }}>
                  <div style={{
                    width: isSmall ? 18 : 24,
                    height: isSmall ? 18 : 24,
                    borderRadius: '50%',
                    background: r.accentLight,
                    border: `2px solid ${r.accentColor}`,
                    boxShadow: `0 0 8px ${r.accentLight}66`,
                  }} />
                  <span style={{
                    color: r.accentLight,
                    fontSize: isSmall ? 8 : 10,
                    fontWeight: 'bold',
                    marginTop: 4,
                    textAlign: 'center',
                    maxWidth: isSmall ? 50 : 70,
                    lineHeight: 1.2,
                  }}>
                    {r.year}
                  </span>
                  <span style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: isSmall ? 7 : 9,
                    textAlign: 'center',
                    maxWidth: isSmall ? 50 : 70,
                    lineHeight: 1.2,
                  }}>
                    {r.revolution}
                  </span>
                </div>
                {i < REVOLUTIONS.length - 1 && (
                  <div style={{
                    width: isSmall ? 12 : 20,
                    height: 2,
                    background: 'rgba(255,255,255,0.3)',
                  }} />
                )}
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 12,
            padding: isSmall ? 12 : 16,
            maxWidth: 500,
            margin: '0 auto 16px',
            border: '1px solid rgba(251, 191, 36, 0.3)',
          }}>
            <p style={{
              color: '#fbbf24',
              fontSize: isSmall ? 14 : 16,
              fontWeight: 'bold',
              margin: '0 0 8px',
            }}>
              You're a true historian!
            </p>
            <p style={{
              color: '#e9d5ff',
              fontSize: isSmall ? 13 : 15,
              margin: 0,
              lineHeight: 1.6,
            }}>
              History is complicated. Every revolution brought freedom AND new challenges.
              Understanding both sides is what makes you wise.
            </p>
          </div>

          <button
            onClick={handleRestart}
            style={{
              ...buttonStyle,
              borderColor: '#fbbf24',
              background: 'linear-gradient(180deg, #fbbf24, #d97706)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            PLAY AGAIN
          </button>
        </div>

        <style>{`
          @keyframes popIn {
            from { opacity: 0; transform: scale(0); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    );
  }

  // ============================================
  // FLIPPING
  // ============================================

  if (phase === 'flipping') {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <h3 style={{
            color: rev.accentLight,
            fontSize: isSmall ? 18 : 22,
            fontWeight: 800,
            margin: '0 0 4px',
          }}>
            {rev.revolution} ({rev.year})
          </h3>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: isSmall ? 12 : 14,
            margin: 0,
          }}>
            Tap the consequence card to see both sides
          </p>
        </div>

        {/* Ordered cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
          {/* Cause */}
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: 10,
            padding: isSmall ? 10 : 14,
          }}>
            <span style={{ color: '#fca5a5', fontSize: isSmall ? 10 : 12, fontWeight: 'bold' }}>CAUSE</span>
            <p style={{ color: '#fde8e8', fontSize: isSmall ? 13 : 15, margin: '4px 0 0', lineHeight: 1.5 }}>
              {rev.cause}
            </p>
          </div>

          {/* Turning Point */}
          <div style={{
            background: 'rgba(251, 191, 36, 0.15)',
            border: '1px solid rgba(251, 191, 36, 0.4)',
            borderRadius: 10,
            padding: isSmall ? 10 : 14,
          }}>
            <span style={{ color: '#fbbf24', fontSize: isSmall ? 10 : 12, fontWeight: 'bold' }}>TURNING POINT</span>
            <p style={{ color: '#fef3c7', fontSize: isSmall ? 13 : 15, margin: '4px 0 0', lineHeight: 1.5 }}>
              {rev.turningPoint}
            </p>
          </div>

          {/* Consequence - Flippable */}
          <div
            onClick={handleFlip}
            style={{
              perspective: '1000px',
              cursor: 'pointer',
            }}
          >
            <div style={{
              position: 'relative',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.6s',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}>
              {/* Front - Triumph */}
              <div style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '2px solid rgba(16, 185, 129, 0.5)',
                borderRadius: 10,
                padding: isSmall ? 10 : 14,
                backfaceVisibility: 'hidden',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6ee7b7', fontSize: isSmall ? 10 : 12, fontWeight: 'bold' }}>
                    {'\u2728'} TRIUMPH
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: isSmall ? 9 : 11 }}>
                    tap to flip {'\u{1F504}'}
                  </span>
                </div>
                <p style={{ color: '#d1fae5', fontSize: isSmall ? 13 : 15, margin: '4px 0 0', lineHeight: 1.5 }}>
                  {rev.triumph}
                </p>
              </div>

              {/* Back - Complication */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(107, 114, 128, 0.25)',
                border: '2px solid rgba(156, 163, 175, 0.5)',
                borderRadius: 10,
                padding: isSmall ? 10 : 14,
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                overflow: 'auto',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#d1d5db', fontSize: isSmall ? 10 : 12, fontWeight: 'bold' }}>
                    {'\u{1F4AD}'} COMPLICATION
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: isSmall ? 9 : 11 }}>
                    tap to flip {'\u{1F504}'}
                  </span>
                </div>
                <p style={{ color: '#e5e7eb', fontSize: isSmall ? 13 : 15, margin: '4px 0 0', lineHeight: 1.5 }}>
                  {rev.complication}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reflection */}
        <div style={{
          textAlign: 'center',
          padding: isSmall ? 8 : 12,
          background: 'rgba(0,0,0,0.2)',
          borderRadius: 8,
          marginBottom: 12,
        }}>
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: isSmall ? 12 : 14,
            fontStyle: 'italic',
            margin: 0,
          }}>
            "Even victories can have painful costs."
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleNextRound}
            style={buttonStyle}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            {currentRound >= REVOLUTIONS.length - 1 ? 'VIEW FULL TIMELINE' : 'NEXT REVOLUTION'}
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // PLAYING
  // ============================================

  const placedCards = new Set(slots.filter(s => s !== null) as number[]);
  const availableCards = shuffledOrder.filter(i => !placedCards.has(i));

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        flexWrap: 'wrap',
        gap: 6,
      }}>
        <span style={{
          color: rev.accentLight,
          fontWeight: 700,
          fontSize: isSmall ? 12 : 14,
        }}>
          REVOLUTION {currentRound + 1}/{REVOLUTIONS.length}
        </span>
        <span style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: isSmall ? 11 : 13,
        }}>
          Completed: {completed.length}/{REVOLUTIONS.length}
        </span>
      </div>

      {/* Progress dots */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 6,
        marginBottom: 12,
      }}>
        {REVOLUTIONS.map((r, i) => (
          <div key={r.id} style={{
            width: isSmall ? 10 : 12,
            height: isSmall ? 10 : 12,
            borderRadius: '50%',
            background: i < currentRound ? r.accentLight
              : i === currentRound ? '#fff'
              : 'rgba(255,255,255,0.2)',
            border: `2px solid ${r.accentColor}`,
            transition: 'all 0.3s',
          }} />
        ))}
      </div>

      {/* Revolution name */}
      <h3 style={{
        textAlign: 'center',
        color: rev.accentLight,
        fontSize: isSmall ? 18 : 24,
        fontWeight: 800,
        margin: '0 0 4px',
      }}>
        {rev.revolution}
      </h3>
      <p style={{
        textAlign: 'center',
        color: 'rgba(255,255,255,0.5)',
        fontSize: isSmall ? 12 : 14,
        margin: '0 0 12px',
      }}>
        {rev.year}
      </p>

      {/* Instructions */}
      <p style={{
        textAlign: 'center',
        color: 'rgba(255,255,255,0.6)',
        fontSize: isSmall ? 11 : 13,
        margin: '0 0 10px',
      }}>
        Tap a card below, then tap a slot to place it in the correct order.
      </p>

      {/* Slots (target positions) */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        marginBottom: 16,
      }}>
        {CARD_LABELS.map((label, slotIdx) => {
          const placedCard = slots[slotIdx];
          const labelColors = [
            { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)', text: '#fca5a5' },
            { bg: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251, 191, 36, 0.3)', text: '#fbbf24' },
            { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.3)', text: '#6ee7b7' },
          ];
          const colors = labelColors[slotIdx];

          return (
            <div
              key={slotIdx}
              onClick={() => handleSlotClick(slotIdx)}
              style={{
                background: colors.bg,
                border: `2px dashed ${selectedCard !== null ? colors.text : colors.border}`,
                borderRadius: 10,
                padding: isSmall ? '8px 10px' : '10px 14px',
                minHeight: isSmall ? 50 : 60,
                cursor: selectedCard !== null ? 'pointer' : 'default',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{
                color: colors.text,
                fontSize: isSmall ? 9 : 11,
                fontWeight: 'bold',
                minWidth: isSmall ? 55 : 80,
                textTransform: 'uppercase',
              }}>
                {label}
              </span>
              {placedCard !== null ? (
                <span style={{
                  color: '#e5e7eb',
                  fontSize: isSmall ? 12 : 14,
                  lineHeight: 1.4,
                  flex: 1,
                }}>
                  {cardTexts[placedCard]}
                </span>
              ) : (
                <span style={{
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: isSmall ? 11 : 13,
                  fontStyle: 'italic',
                }}>
                  {selectedCard !== null ? 'Tap here to place' : 'Empty slot'}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div style={{
          textAlign: 'center',
          marginBottom: 12,
          padding: 10,
          borderRadius: 8,
          background: isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
          border: `1px solid ${isCorrect ? '#6ee7b7' : '#fca5a5'}`,
          animation: 'fadeIn 0.3s ease-out',
        }}>
          <p style={{
            color: isCorrect ? '#6ee7b7' : '#fca5a5',
            fontSize: isSmall ? 14 : 16,
            fontWeight: 'bold',
            margin: 0,
          }}>
            {isCorrect ? '\u2705 Correct order! Well done!' : '\u274C Not quite! Try a different arrangement.'}
          </p>
        </div>
      )}

      {/* Available cards to place */}
      {availableCards.length > 0 && (
        <div>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: isSmall ? 11 : 13,
            margin: '0 0 6px',
            textAlign: 'center',
          }}>
            Available cards -- tap to select:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {availableCards.map(cardIdx => (
              <button
                key={cardIdx}
                onClick={() => handleCardClick(cardIdx)}
                style={{
                  padding: isSmall ? '8px 10px' : '10px 14px',
                  borderRadius: 8,
                  border: `2px solid ${selectedCard === cardIdx ? rev.accentLight : 'rgba(255,255,255,0.2)'}`,
                  background: selectedCard === cardIdx ? `${rev.accentColor}44` : 'rgba(0,0,0,0.2)',
                  color: '#e5e7eb',
                  fontSize: isSmall ? 12 : 14,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  lineHeight: 1.5,
                  transform: selectedCard === cardIdx ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: selectedCard === cardIdx ? `0 0 10px ${rev.accentColor}66` : 'none',
                }}
              >
                {cardTexts[cardIdx]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
