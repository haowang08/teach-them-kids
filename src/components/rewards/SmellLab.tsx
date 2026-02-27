import { useState, useCallback } from 'react';

// ============================================
// TYPES
// ============================================

type GamePhase = 'intro' | 'mixing' | 'result' | 'complete';

interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

interface TargetSmell {
  id: string;
  name: string;
  emoji: string;
  ingredients: string[]; // ingredient IDs
  fact: string;
  hint: string;
}

// ============================================
// CONSTANTS
// ============================================

const INGREDIENTS: Ingredient[] = [
  { id: 'hydrogen-sulfide', name: 'Hydrogen Sulfide', emoji: '\u{1F95A}', color: '#c8e650' },
  { id: 'linalool', name: 'Linalool', emoji: '\u{1F33F}', color: '#c8a0e8' },
  { id: 'butyric-acid', name: 'Butyric Acid', emoji: '\u{1F9C0}', color: '#f5d76e' },
  { id: 'geraniol', name: 'Geraniol', emoji: '\u{1F339}', color: '#f7a0b5' },
  { id: 'dimethyl-trisulfide', name: 'Dimethyl Trisulfide', emoji: '\u{1F9E6}', color: '#9ab87a' },
  { id: 'methyl-ketones', name: 'Methyl Ketones', emoji: '\u{1F9C0}', color: '#7ec8d0' },
  { id: 'limonene', name: 'Limonene', emoji: '\u{1F34B}', color: '#ffe066' },
  { id: 'vanillin', name: 'Vanillin', emoji: '\u{1FAD8}', color: '#f5e6c8' },
];

const TARGETS: TargetSmell[] = [
  {
    id: 'rotten-eggs',
    name: 'Rotten Eggs',
    emoji: '\u{1F95A}',
    ingredients: ['hydrogen-sulfide'],
    fact: 'Hydrogen sulfide is the same chemical that makes farts smell! Your gut bacteria produce it when they break down sulfur-rich foods like eggs and broccoli.',
    hint: 'Think about what chemical gives rotten eggs their stink...',
  },
  {
    id: 'rose-bouquet',
    name: 'Rose Bouquet',
    emoji: '\u{1F339}',
    ingredients: ['geraniol', 'linalool'],
    fact: 'A real rose produces over 400 different chemical compounds! Geraniol and linalool are two of the most important ones that give roses their signature sweet scent.',
    hint: 'Roses need two floral compounds to smell right...',
  },
  {
    id: 'limburger-cheese',
    name: 'Limburger Cheese',
    emoji: '\u{1F9C0}',
    ingredients: ['butyric-acid', 'dimethyl-trisulfide'],
    fact: 'Limburger cheese is made by Brevibacterium linens -- the exact same bacteria that causes foot odor! A study found mosquitoes were equally attracted to Limburger cheese and smelly feet.',
    hint: 'Stinky cheese needs both an acid and a sulfur compound...',
  },
  {
    id: 'fresh-cookies',
    name: 'Fresh Cookies',
    emoji: '\u{1F36A}',
    ingredients: ['vanillin', 'butyric-acid'],
    fact: 'Butyric acid in small amounts gives butter its rich flavor! The same chemical that smells like vomit in high concentrations creates a delicious buttery aroma when diluted. Context is everything in smell science!',
    hint: 'Cookies need vanilla and a buttery compound...',
  },
  {
    id: 'corpse-flower',
    name: 'Corpse Flower',
    emoji: '\u{1F940}',
    ingredients: ['dimethyl-trisulfide', 'hydrogen-sulfide'],
    fact: 'The corpse flower heats itself to body temperature (36\u00b0C) to waft its death-stench further through the jungle! It only blooms once every 7-10 years and each bloom lasts just 24-48 hours.',
    hint: 'This flower smells like death -- you need two sulfur-based compounds...',
  },
];

// ============================================
// STYLES
// ============================================

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    maxWidth: 700,
    margin: '0 auto',
    padding: 16,
    position: 'relative',
  },
  introCard: {
    background: 'linear-gradient(135deg, #f0e6d3, #e8d5b7)',
    borderRadius: 16,
    padding: 32,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 800,
    color: '#4a3728',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b5744',
    marginBottom: 24,
  },
  btn: {
    background: 'linear-gradient(135deg, #6cb35b, #4a9140)',
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    padding: '14px 32px',
    fontSize: 18,
    fontWeight: 700,
    cursor: 'pointer',
  },
  labBench: {
    background: 'linear-gradient(180deg, #f5f0e8, #e8dcc8)',
    borderRadius: 16,
    padding: 20,
    minHeight: 400,
  },
  progressBar: {
    display: 'flex',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 16,
  },
  progressDot: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
  },
  targetCard: {
    background: '#fff',
    borderRadius: 12,
    padding: 16,
    textAlign: 'center',
    marginBottom: 16,
    border: '2px solid #e0d5c5',
  },
  targetName: {
    fontSize: 20,
    fontWeight: 700,
    color: '#4a3728',
  },
  beaker: {
    width: 120,
    margin: '0 auto',
    background: '#e0ecf5',
    borderRadius: '0 0 20px 20px',
    border: '3px solid #8ab0d0',
    borderTop: 'none',
    position: 'relative',
    overflow: 'hidden',
    minHeight: 120,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  beakerTop: {
    width: 140,
    height: 8,
    margin: '0 auto',
    background: '#8ab0d0',
    borderRadius: '4px 4px 0 0',
  },
  liquidLayer: {
    transition: 'height 0.4s ease',
    borderRadius: '0 0 17px 17px',
  },
  shelfTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#6b5744',
    marginBottom: 8,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
  },
  ingredientGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: 8,
  },
  ingredientBtn: {
    background: '#fff',
    border: '2px solid #d5cbb8',
    borderRadius: 10,
    padding: '10px 8px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s',
    fontSize: 13,
    fontWeight: 600,
  },
  smellMeter: {
    height: 12,
    background: '#e0d5c5',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 16,
  },
  smellFill: {
    height: '100%',
    borderRadius: 6,
    transition: 'width 0.4s, background-color 0.4s',
  },
  hintBox: {
    background: '#fff8e0',
    border: '1px solid #f0d060',
    borderRadius: 8,
    padding: '8px 12px',
    fontSize: 13,
    color: '#8a6e20',
    textAlign: 'center',
    marginTop: 8,
  },
  factBox: {
    background: 'linear-gradient(135deg, #e8f5e0, #d0ebc0)',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  factText: {
    fontSize: 14,
    color: '#3a5530',
    lineHeight: 1.6,
  },
  completeCard: {
    background: 'linear-gradient(135deg, #f0e6d3, #e8d5b7)',
    borderRadius: 16,
    padding: 32,
    textAlign: 'center',
  },
  selectedList: {
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 8,
  },
  selectedTag: {
    background: '#e0ecf5',
    borderRadius: 20,
    padding: '4px 10px',
    fontSize: 12,
    fontWeight: 600,
    color: '#4a6a8a',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function SmellLab() {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [targetIndex, setTargetIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [completedTargets, setCompletedTargets] = useState<Set<number>>(new Set());

  const currentTarget = TARGETS[targetIndex];

  const getMatchPercent = useCallback((): number => {
    if (!currentTarget || selected.length === 0) return 0;
    const needed = currentTarget.ingredients;
    const correctCount = selected.filter(s => needed.includes(s)).length;
    const wrongCount = selected.filter(s => !needed.includes(s)).length;
    if (wrongCount > 0) return Math.max(0, (correctCount / needed.length) * 100 - wrongCount * 30);
    return (correctCount / needed.length) * 100;
  }, [currentTarget, selected]);

  const isCorrect = useCallback((): boolean => {
    if (!currentTarget) return false;
    const needed = new Set(currentTarget.ingredients);
    const sel = new Set(selected);
    if (sel.size !== needed.size) return false;
    for (const id of needed) {
      if (!sel.has(id)) return false;
    }
    return true;
  }, [currentTarget, selected]);

  const handleAddIngredient = useCallback((id: string) => {
    if (showResult) return;
    if (selected.includes(id)) {
      setSelected(prev => prev.filter(s => s !== id));
    } else if (selected.length < 3) {
      const newSelected = [...selected, id];
      setSelected(newSelected);

      // Auto-check if we have enough ingredients
      if (currentTarget) {
        const needed = new Set(currentTarget.ingredients);
        const sel = new Set(newSelected);
        if (sel.size === needed.size) {
          let allCorrect = true;
          for (const n of needed) {
            if (!sel.has(n)) { allCorrect = false; break; }
          }
          if (allCorrect) {
            setShowResult(true);
          }
        }
      }
    }
  }, [selected, showResult, currentTarget]);

  const handleMixCheck = useCallback(() => {
    if (isCorrect()) {
      setShowResult(true);
    } else {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 3000);
    }
  }, [isCorrect]);

  const handleNext = useCallback(() => {
    setCompletedTargets(prev => new Set([...prev, targetIndex]));
    if (targetIndex < TARGETS.length - 1) {
      setTargetIndex(targetIndex + 1);
      setSelected([]);
      setShowResult(false);
      setShowHint(false);
    } else {
      setPhase('complete');
    }
  }, [targetIndex]);

  const matchPercent = getMatchPercent();
  const meterColor = matchPercent >= 100 ? '#4caf50' : matchPercent >= 50 ? '#ffa000' : '#e0d5c5';

  // --- INTRO ---
  if (phase === 'intro') {
    return (
      <div style={styles.container}>
        <div style={styles.introCard}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{'\u{1F9EA}'}</div>
          <h2 style={styles.title}>Smell Laboratory</h2>
          <p style={styles.subtitle}>
            Welcome, Smell Scientist! Mix molecular ingredients to recreate 5 famous smells.
            Select the right chemical compounds for each target scent.
          </p>
          <button style={styles.btn} onClick={() => setPhase('mixing')}>
            Enter the Lab
          </button>
        </div>
      </div>
    );
  }

  // --- COMPLETE ---
  if (phase === 'complete') {
    return (
      <div style={styles.container}>
        <div style={styles.completeCard}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{'\u{1F3C6}'}</div>
          <h2 style={styles.title}>Lab Complete!</h2>
          <p style={styles.subtitle}>
            You recreated all 5 famous smells! You now know that complex scents
            are made from combinations of simpler chemical compounds.
            From rotten eggs to roses -- it is all chemistry!
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16 }}>
            {TARGETS.map((t) => (
              <span key={t.id} style={{ fontSize: 32 }}>{t.emoji}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- MIXING ---
  return (
    <div style={styles.container}>
      <div style={styles.labBench}>
        {/* Progress */}
        <div style={styles.progressBar}>
          {TARGETS.map((t, i) => (
            <div
              key={t.id}
              style={{
                ...styles.progressDot,
                background: completedTargets.has(i) ? '#4caf50' : i === targetIndex ? '#ffa000' : '#e0d5c5',
                color: completedTargets.has(i) || i === targetIndex ? '#fff' : '#999',
              }}
            >
              {completedTargets.has(i) ? '\u2713' : t.emoji}
            </div>
          ))}
        </div>

        {/* Target */}
        <div style={styles.targetCard}>
          <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>TARGET SMELL</div>
          <div style={{ fontSize: 32 }}>{currentTarget.emoji}</div>
          <div style={styles.targetName}>{currentTarget.name}</div>
          <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>
            Select {currentTarget.ingredients.length} ingredient{currentTarget.ingredients.length > 1 ? 's' : ''}
          </div>
        </div>

        {/* Smell-O-Meter */}
        <div style={{ marginBottom: 4, fontSize: 12, fontWeight: 600, color: '#6b5744' }}>
          Smell-O-Meter
        </div>
        <div style={styles.smellMeter}>
          <div style={{ ...styles.smellFill, width: `${matchPercent}%`, backgroundColor: meterColor }} />
        </div>

        {/* Beaker & Selected */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <div>
            <div style={styles.beakerTop} />
            <div style={styles.beaker}>
              {selected.length === 0 && (
                <div style={{ textAlign: 'center', padding: 16, color: '#aaa', fontSize: 13 }}>Empty</div>
              )}
              {selected.map((id) => {
                const ing = INGREDIENTS.find(i => i.id === id);
                if (!ing) return null;
                return (
                  <div key={id} style={{ ...styles.liquidLayer, height: 30, backgroundColor: ing.color, opacity: 0.7 }} />
                );
              })}
            </div>
            {selected.length > 0 && (
              <div style={{ ...styles.selectedList, marginTop: 8 }}>
                {selected.map(id => {
                  const ing = INGREDIENTS.find(i => i.id === id);
                  return ing ? (
                    <span key={id} style={styles.selectedTag}>
                      {ing.emoji} {ing.name}
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </div>
        </div>

        {/* Result */}
        {showResult && (
          <div style={styles.factBox}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{'\u2728'} {currentTarget.emoji}</div>
            <div style={{ fontWeight: 700, color: '#2e6b1e', marginBottom: 8, fontSize: 16 }}>
              Perfect mix! You recreated {currentTarget.name}!
            </div>
            <p style={styles.factText}>{currentTarget.fact}</p>
            <button
              style={{ ...styles.btn, marginTop: 12, fontSize: 15, padding: '10px 24px' }}
              onClick={handleNext}
            >
              {targetIndex < TARGETS.length - 1 ? 'Next Smell \u2192' : 'Finish!'}
            </button>
          </div>
        )}

        {/* Ingredients shelf */}
        {!showResult && (
          <>
            <div style={styles.shelfTitle}>Molecular Ingredients</div>
            <div style={styles.ingredientGrid}>
              {INGREDIENTS.map((ing) => {
                const isSelected = selected.includes(ing.id);
                return (
                  <button
                    key={ing.id}
                    style={{
                      ...styles.ingredientBtn,
                      background: isSelected ? ing.color + '30' : '#fff',
                      borderColor: isSelected ? ing.color : '#d5cbb8',
                      transform: isSelected ? 'scale(0.96)' : 'scale(1)',
                    }}
                    onClick={() => handleAddIngredient(ing.id)}
                  >
                    <div style={{ fontSize: 22, marginBottom: 2 }}>{ing.emoji}</div>
                    {ing.name}
                  </button>
                );
              })}
            </div>

            {selected.length > 0 && !showResult && (
              <div style={{ textAlign: 'center', marginTop: 12 }}>
                <button
                  style={{ ...styles.btn, fontSize: 15, padding: '10px 24px' }}
                  onClick={handleMixCheck}
                >
                  Mix It! {'\u{1F9EA}'}
                </button>
              </div>
            )}

            {showHint && (
              <div style={styles.hintBox}>
                {'\u{1F4A1}'} {currentTarget.hint}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
