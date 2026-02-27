import { useState, useCallback } from 'react';

// ============================================
// TYPES
// ============================================

type GamePhase = 'intro' | 'matching' | 'design' | 'complete';

interface Scientist {
  id: string;
  name: string;
  emoji: string;
  cards: FactCard[];
  quote: string;
}

interface FactCard {
  id: string;
  text: string;
  category: 'discovery' | 'date' | 'obstacle';
}

// ============================================
// CONSTANTS
// ============================================

const SCIENTISTS: Scientist[] = [
  {
    id: 'hypatia',
    name: 'Hypatia',
    emoji: '\u{1F3DB}\uFE0F',
    quote: '"Knowledge should be open to all."',
    cards: [
      { id: 'h1', text: 'Improved the astrolabe for star navigation', category: 'discovery' },
      { id: 'h2', text: '400 CE, Alexandria, Egypt', category: 'date' },
      { id: 'h3', text: 'Murdered by a mob for teaching philosophy', category: 'obstacle' },
    ],
  },
  {
    id: 'curie',
    name: 'Marie Curie',
    emoji: '\u2622\uFE0F',
    quote: '"Nothing in life is to be feared, it is only to be understood."',
    cards: [
      { id: 'c1', text: 'Discovered radioactivity, polonium, and radium', category: 'discovery' },
      { id: 'c2', text: '1903 & 1911 Nobel Prizes', category: 'date' },
      { id: 'c3', text: 'Initially excluded from her own Nobel nomination', category: 'obstacle' },
    ],
  },
  {
    id: 'franklin',
    name: 'Rosalind Franklin',
    emoji: '\u{1F9EC}',
    quote: '"Science and everyday life cannot and should not be separated."',
    cards: [
      { id: 'f1', text: 'Photo 51 revealed DNA\'s double helix structure', category: 'discovery' },
      { id: 'f2', text: '1952, King\'s College London', category: 'date' },
      { id: 'f3', text: 'Credit taken by Watson & Crick without consent', category: 'obstacle' },
    ],
  },
  {
    id: 'johnson',
    name: 'Katherine Johnson',
    emoji: '\u{1F680}',
    quote: '"I counted everything. I counted the steps to the road."',
    cards: [
      { id: 'j1', text: 'Calculated Moon landing trajectory for Apollo 11', category: 'discovery' },
      { id: 'j2', text: '1962, NASA orbital flight calculations', category: 'date' },
      { id: 'j3', text: 'Forced to use segregated facilities at NASA', category: 'obstacle' },
    ],
  },
  {
    id: 'tu',
    name: 'Tu Youyou',
    emoji: '\u{1F33F}',
    quote: '"Every scientist dreams of doing something that can help the world."',
    cards: [
      { id: 't1', text: 'Discovered artemisinin, saving millions from malaria', category: 'discovery' },
      { id: 't2', text: '2015 Nobel Prize in Physiology or Medicine', category: 'date' },
      { id: 't3', text: 'No PhD, no foreign experience, largely overlooked', category: 'obstacle' },
    ],
  },
  {
    id: 'lamarr',
    name: 'Hedy Lamarr',
    emoji: '\u{1F3AC}',
    quote: '"All creative people want to do the unexpected."',
    cards: [
      { id: 'l1', text: 'Invented frequency-hopping, basis for Bluetooth & Wi-Fi', category: 'discovery' },
      { id: 'l2', text: '1942, patent dismissed by U.S. Navy', category: 'date' },
      { id: 'l3', text: 'Dismissed as "just" a pretty actress for decades', category: 'obstacle' },
    ],
  },
];

const ALL_CARDS = SCIENTISTS.flatMap(s => s.cards.map(c => ({ ...c, scientistId: s.id })));

const CATEGORY_COLORS: Record<string, string> = {
  discovery: '#4caf50',
  date: '#2196f3',
  obstacle: '#f44336',
};

const CATEGORY_LABELS: Record<string, string> = {
  discovery: 'Discovery',
  date: 'Date/Era',
  obstacle: 'Obstacle',
};

const FRAME_STYLES = ['ornate-gold', 'modern-silver', 'ancient-stone'] as const;
const FRAME_COLORS: Record<string, string> = {
  'ornate-gold': '#d4a843',
  'modern-silver': '#a0a8b0',
  'ancient-stone': '#8a7a6a',
};

const BG_COLORS = ['#1a1a3e', '#2a1a2e', '#0a2a2e', '#2a2a1e', '#1a2a1e'];

// ============================================
// STYLES
// ============================================

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    maxWidth: 700,
    margin: '0 auto',
    padding: 16,
  },
  introCard: {
    background: 'linear-gradient(135deg, #1a1a3e, #2a1a4e)',
    borderRadius: 16,
    padding: 32,
    textAlign: 'center',
    color: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 800,
    color: '#d4a843',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#ccc',
    marginBottom: 24,
    lineHeight: 1.5,
  },
  btn: {
    background: 'linear-gradient(135deg, #d4a843, #b8922e)',
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    padding: '14px 32px',
    fontSize: 18,
    fontWeight: 700,
    cursor: 'pointer',
  },
  gallery: {
    background: 'linear-gradient(180deg, #1a1a3e, #0e0e28)',
    borderRadius: 16,
    padding: 20,
    minHeight: 400,
  },
  framesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: 12,
    marginBottom: 16,
  },
  frame: {
    border: '3px solid',
    borderRadius: 12,
    padding: 12,
    textAlign: 'center',
    minHeight: 140,
    transition: 'all 0.3s',
    position: 'relative',
  },
  frameName: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 6,
  },
  frameEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  cardSlot: {
    fontSize: 11,
    padding: '3px 6px',
    borderRadius: 4,
    marginBottom: 3,
    background: 'rgba(255,255,255,0.1)',
    color: '#aaa',
  },
  filledSlot: {
    background: 'rgba(255,255,255,0.15)',
    color: '#fff',
    fontSize: 11,
    padding: '3px 6px',
    borderRadius: 4,
    marginBottom: 3,
  },
  cardsPile: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 12,
  },
  cardsPileTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: '#d4a843',
    marginBottom: 8,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
  },
  factCard: {
    background: '#f5f0e5',
    border: '2px solid',
    borderRadius: 8,
    padding: '8px 10px',
    cursor: 'pointer',
    fontSize: 12,
    color: '#333',
    transition: 'all 0.2s',
    textAlign: 'left',
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: 8,
  },
  feedback: {
    textAlign: 'center',
    padding: '8px 12px',
    borderRadius: 8,
    fontSize: 13,
    marginTop: 8,
  },
  designPanel: {
    background: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 20,
    textAlign: 'center',
  },
  designOption: {
    display: 'inline-block',
    margin: 6,
    padding: '8px 16px',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,
    border: '2px solid',
    transition: 'all 0.2s',
  },
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function ScienceHallOfFame() {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [placements, setPlacements] = useState<Record<string, string[]>>({});
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | ''>('');
  const [completedScientists, setCompletedScientists] = useState<Set<string>>(new Set());
  const [favoriteScientist, setFavoriteScientist] = useState<string>('');
  const [frameStyle, setFrameStyle] = useState<string>('ornate-gold');
  const [bgColor, setBgColor] = useState<string>(BG_COLORS[0]);

  const placedCardIds = new Set(Object.values(placements).flat());
  const remainingCards = ALL_CARDS.filter(c => !placedCardIds.has(c.id));

  // Shuffle remaining cards deterministically (just sort by id for simplicity)
  const shuffledCards = [...remainingCards].sort((a, b) => {
    const hash = (s: string) => s.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return hash(a.id) - hash(b.id);
  });

  const handleCardClick = useCallback((cardId: string) => {
    setSelectedCard(prev => prev === cardId ? null : cardId);
    setFeedback('');
    setFeedbackType('');
  }, []);

  const handleFrameClick = useCallback((scientistId: string) => {
    if (!selectedCard || completedScientists.has(scientistId)) return;

    const card = ALL_CARDS.find(c => c.id === selectedCard);
    if (!card) return;

    if (card.scientistId === scientistId) {
      const newPlacements = { ...placements };
      if (!newPlacements[scientistId]) newPlacements[scientistId] = [];
      newPlacements[scientistId].push(card.id);
      setPlacements(newPlacements);
      setSelectedCard(null);
      setFeedback('Correct!');
      setFeedbackType('success');

      const scientist = SCIENTISTS.find(s => s.id === scientistId);
      if (scientist && newPlacements[scientistId].length === scientist.cards.length) {
        setCompletedScientists(prev => new Set([...prev, scientistId]));
        setFeedback(`${scientist.name}'s exhibit is complete! "${scientist.quote}"`);
      }

      // Check if all done
      if (completedScientists.size + 1 === SCIENTISTS.length) {
        setFavoriteScientist(SCIENTISTS[0].id);
        setTimeout(() => setPhase('design'), 1500);
      }
    } else {
      setFeedback('Not quite! Try a different frame.');
      setFeedbackType('error');
    }
  }, [selectedCard, placements, completedScientists]);

  const allComplete = completedScientists.size === SCIENTISTS.length;

  // --- INTRO ---
  if (phase === 'intro') {
    return (
      <div style={styles.container}>
        <div style={styles.introCard}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{'\u{1F3DB}\uFE0F'}</div>
          <h2 style={styles.title}>Science Hall of Fame</h2>
          <p style={styles.subtitle}>
            Welcome to the museum! Match discoveries, dates, and obstacles to each scientist
            to complete their exhibit. Then design a special display for your favorite!
          </p>
          <button style={styles.btn} onClick={() => setPhase('matching')}>
            Enter the Gallery
          </button>
        </div>
      </div>
    );
  }

  // --- COMPLETE ---
  if (phase === 'complete') {
    const fav = SCIENTISTS.find(s => s.id === favoriteScientist);
    return (
      <div style={styles.container}>
        <div style={{ ...styles.introCard, background: bgColor }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{'\u{1F3C6}'}</div>
          <h2 style={styles.title}>Museum Complete!</h2>
          {fav && (
            <div style={{
              border: `4px solid ${FRAME_COLORS[frameStyle]}`,
              borderRadius: 16,
              padding: 24,
              margin: '16px auto',
              maxWidth: 300,
              background: 'rgba(255,255,255,0.08)',
            }}>
              <div style={{ fontSize: 48 }}>{fav.emoji}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: FRAME_COLORS[frameStyle], marginTop: 8 }}>{fav.name}</div>
              <div style={{ fontSize: 13, color: '#ccc', marginTop: 8, fontStyle: 'italic' }}>{fav.quote}</div>
            </div>
          )}
          <p style={{ ...styles.subtitle, marginTop: 16 }}>
            Every scientist in this hall was once overlooked. Their brilliance reminds us
            to look beyond the surface and recognize genius wherever it appears.
          </p>
        </div>
      </div>
    );
  }

  // --- DESIGN ---
  if (phase === 'design') {
    return (
      <div style={styles.container}>
        <div style={styles.gallery}>
          <h2 style={{ ...styles.title, textAlign: 'center', marginBottom: 16 }}>Design Your Exhibit</h2>
          <p style={{ ...styles.subtitle, textAlign: 'center', color: '#ccc' }}>
            Pick your favorite scientist and customize their exhibit!
          </p>

          <div style={styles.designPanel}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#d4a843', marginBottom: 8 }}>
                CHOOSE YOUR FAVORITE SCIENTIST
              </div>
              {SCIENTISTS.map(s => (
                <button
                  key={s.id}
                  onClick={() => setFavoriteScientist(s.id)}
                  style={{
                    ...styles.designOption,
                    borderColor: favoriteScientist === s.id ? '#d4a843' : '#555',
                    background: favoriteScientist === s.id ? 'rgba(212,168,67,0.2)' : 'transparent',
                    color: '#fff',
                  }}
                >
                  {s.emoji} {s.name}
                </button>
              ))}
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#d4a843', marginBottom: 8 }}>
                FRAME STYLE
              </div>
              {FRAME_STYLES.map(fs => (
                <button
                  key={fs}
                  onClick={() => setFrameStyle(fs)}
                  style={{
                    ...styles.designOption,
                    borderColor: frameStyle === fs ? FRAME_COLORS[fs] : '#555',
                    background: frameStyle === fs ? FRAME_COLORS[fs] + '30' : 'transparent',
                    color: '#fff',
                  }}
                >
                  {fs.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </button>
              ))}
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#d4a843', marginBottom: 8 }}>
                BACKGROUND COLOR
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                {BG_COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => setBgColor(c)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: c,
                      border: bgColor === c ? '3px solid #d4a843' : '3px solid #555',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </div>

            {favoriteScientist && (
              <button
                style={{ ...styles.btn, marginTop: 8 }}
                onClick={() => setPhase('complete')}
              >
                Unveil My Exhibit! {'\u2728'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- MATCHING ---
  return (
    <div style={styles.container}>
      <div style={styles.gallery}>
        <h2 style={{ ...styles.title, textAlign: 'center', marginBottom: 4 }}>Gallery Wall</h2>
        <p style={{ textAlign: 'center', color: '#aaa', fontSize: 13, marginBottom: 16 }}>
          {allComplete ? 'All exhibits complete!' : 'Select a card below, then click a frame to place it.'}
        </p>

        {/* Frames */}
        <div style={styles.framesGrid}>
          {SCIENTISTS.map(s => {
            const isComplete = completedScientists.has(s.id);
            const placed = placements[s.id] || [];
            return (
              <div
                key={s.id}
                style={{
                  ...styles.frame,
                  borderColor: isComplete ? '#d4a843' : '#555',
                  background: isComplete ? 'rgba(212,168,67,0.1)' : 'rgba(255,255,255,0.03)',
                  cursor: selectedCard && !isComplete ? 'pointer' : 'default',
                  boxShadow: isComplete ? '0 0 20px rgba(212,168,67,0.3)' : 'none',
                }}
                onClick={() => handleFrameClick(s.id)}
              >
                <div style={styles.frameEmoji}>{s.emoji}</div>
                <div style={{ ...styles.frameName, color: isComplete ? '#d4a843' : '#ccc' }}>{s.name}</div>
                {s.cards.map(card => {
                  const isPlaced = placed.includes(card.id);
                  return (
                    <div
                      key={card.id}
                      style={isPlaced ? {
                        ...styles.filledSlot,
                        borderLeft: `3px solid ${CATEGORY_COLORS[card.category]}`,
                      } : styles.cardSlot}
                    >
                      {isPlaced ? card.text.slice(0, 35) + (card.text.length > 35 ? '...' : '') : `${CATEGORY_LABELS[card.category]} needed`}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Feedback */}
        {feedback && (
          <div style={{
            ...styles.feedback,
            background: feedbackType === 'success' ? 'rgba(76,175,80,0.2)' : 'rgba(244,67,54,0.2)',
            color: feedbackType === 'success' ? '#8bc34a' : '#ef9a9a',
          }}>
            {feedback}
          </div>
        )}

        {/* Card Pile */}
        {shuffledCards.length > 0 && (
          <div style={styles.cardsPile}>
            <div style={styles.cardsPileTitle}>Exhibit Cards ({shuffledCards.length} remaining)</div>
            <div style={styles.cardsGrid}>
              {shuffledCards.map(card => (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  style={{
                    ...styles.factCard,
                    borderColor: selectedCard === card.id ? CATEGORY_COLORS[card.category] : '#d5cbb8',
                    transform: selectedCard === card.id ? 'scale(1.03)' : 'scale(1)',
                    boxShadow: selectedCard === card.id ? `0 0 10px ${CATEGORY_COLORS[card.category]}40` : 'none',
                  }}
                >
                  <span style={{
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: CATEGORY_COLORS[card.category],
                    marginRight: 6,
                  }} />
                  <span style={{ fontSize: 10, color: '#888', marginRight: 4 }}>
                    {CATEGORY_LABELS[card.category]}:
                  </span>
                  {card.text}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
