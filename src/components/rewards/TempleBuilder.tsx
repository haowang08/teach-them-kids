import { useState, useCallback } from 'react';

// ============================================
// TYPES
// ============================================

interface TempleBuilderProps {
  onComplete?: () => void;
}

type GamePhase = 'intro' | 'foundation' | 'towers' | 'decorations' | 'water' | 'complete';

interface PlacedBlock {
  id: string;
  row: number;
  col: number;
}

interface Tower {
  id: string;
  position: number; // 0-4
  height: number;   // 1-3
}

interface Decoration {
  id: string;
  wall: number;
  type: string;
  label: string;
}

interface Canal {
  id: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

// ============================================
// CONSTANTS
// ============================================

const FOUNDATION_ROWS = 5;
const FOUNDATION_COLS = 7;
const TOWER_POSITIONS = [
  { label: 'Left', targetHeight: 2 },
  { label: 'Front-Left', targetHeight: 2 },
  { label: 'Center', targetHeight: 3 },
  { label: 'Front-Right', targetHeight: 2 },
  { label: 'Right', targetHeight: 2 },
];

const DECORATION_OPTIONS = [
  { type: 'battle', label: 'Battle Scene', emoji: '⚔️' },
  { type: 'vishnu', label: 'Vishnu Dancing', emoji: '🙏' },
  { type: 'apsara', label: 'Apsara Dancer', emoji: '💃' },
  { type: 'elephant', label: 'Elephant Procession', emoji: '🐘' },
  { type: 'lotus', label: 'Lotus Garden', emoji: '🪷' },
  { type: 'naga', label: 'Naga Serpent', emoji: '🐍' },
];

// ============================================
// STYLES
// ============================================

const colors = {
  stone: '#C9A87C',
  stoneLight: '#E8D5B7',
  stoneDark: '#8B7355',
  jungle: '#2E5339',
  jungleLight: '#4A8B5C',
  water: '#4FC3F7',
  waterDark: '#0288D1',
  gold: '#C9A227',
  goldLight: '#F5E6A3',
  bg: '#1A2E1F',
  cardBg: '#1E3D26',
  text: '#E8E8E8',
  textMuted: '#A0B0A5',
};

const styles = {
  wrapper: {
    background: `linear-gradient(145deg, ${colors.bg} 0%, #0F1F14 100%)`,
    borderRadius: 16,
    padding: '20px',
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
    color: colors.text,
    minHeight: 500,
  } as React.CSSProperties,

  title: {
    fontSize: 24,
    fontWeight: 800,
    color: colors.gold,
    margin: '8px 0',
    textAlign: 'center' as const,
    textShadow: '0 2px 8px rgba(201, 162, 39, 0.3)',
  } as React.CSSProperties,

  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center' as const,
    marginBottom: 16,
  } as React.CSSProperties,

  phaseLabel: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.jungleLight,
    textAlign: 'center' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    marginBottom: 12,
  } as React.CSSProperties,

  grid: {
    display: 'grid',
    gap: 4,
    justifyContent: 'center',
    marginBottom: 16,
  } as React.CSSProperties,

  block: (placed: boolean) => ({
    width: 40,
    height: 28,
    borderRadius: 4,
    border: placed ? `2px solid ${colors.stoneDark}` : '2px dashed #3A5A3F',
    background: placed
      ? `linear-gradient(135deg, ${colors.stoneLight} 0%, ${colors.stone} 100%)`
      : 'rgba(46, 83, 57, 0.2)',
    cursor: placed ? 'default' : 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10,
    color: colors.stoneDark,
  }) as React.CSSProperties,

  towerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 12,
    marginBottom: 16,
    minHeight: 180,
  } as React.CSSProperties,

  tower: (height: number, isCenter: boolean) => ({
    width: isCenter ? 48 : 36,
    height: height * 50,
    background: `linear-gradient(180deg, ${colors.goldLight} 0%, ${colors.stone} 30%, ${colors.stoneDark} 100%)`,
    borderRadius: '8px 8px 0 0',
    border: `2px solid ${colors.stoneDark}`,
    position: 'relative' as const,
    cursor: 'pointer',
    transition: 'height 0.5s ease',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 4,
  }) as React.CSSProperties,

  towerPeak: {
    width: 0,
    height: 0,
    borderLeft: '20px solid transparent',
    borderRight: '20px solid transparent',
    borderBottom: `20px solid ${colors.stone}`,
    marginBottom: -2,
  } as React.CSSProperties,

  button: {
    padding: '12px 28px',
    borderRadius: 24,
    border: 'none',
    background: `linear-gradient(145deg, ${colors.gold} 0%, #9A7A1A 100%)`,
    color: colors.bg,
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    transition: 'transform 0.15s, box-shadow 0.15s',
    boxShadow: '0 4px 12px rgba(201, 162, 39, 0.3)',
  } as React.CSSProperties,

  decorationGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 8,
    marginBottom: 16,
  } as React.CSSProperties,

  decorationCard: (selected: boolean) => ({
    padding: '12px 8px',
    borderRadius: 12,
    border: selected ? `2px solid ${colors.gold}` : '2px solid #3A5A3F',
    background: selected ? 'rgba(201, 162, 39, 0.15)' : colors.cardBg,
    cursor: 'pointer',
    textAlign: 'center' as const,
    transition: 'all 0.2s',
  }) as React.CSSProperties,

  canalArea: {
    background: colors.cardBg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    position: 'relative' as const,
    minHeight: 200,
    overflow: 'hidden',
  } as React.CSSProperties,

  progressBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  } as React.CSSProperties,

  progressStep: (active: boolean, completed: boolean) => ({
    width: 32,
    height: 32,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 700,
    background: completed ? colors.jungleLight : active ? colors.gold : '#2A4A30',
    color: completed || active ? '#fff' : colors.textMuted,
    border: active ? `2px solid ${colors.goldLight}` : '2px solid transparent',
    transition: 'all 0.3s',
  }) as React.CSSProperties,

  infoCard: {
    background: colors.cardBg,
    borderRadius: 12,
    padding: '14px 16px',
    marginBottom: 16,
    border: '1px solid #2A4A30',
  } as React.CSSProperties,
};

// ============================================
// COMPONENT
// ============================================

export default function TempleBuilder({ onComplete }: TempleBuilderProps) {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [blocks, setBlocks] = useState<PlacedBlock[]>([]);
  const [towers, setTowers] = useState<Tower[]>([]);
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [canals, setCanals] = useState<Canal[]>([]);
  const [selectedDecoration, setSelectedDecoration] = useState<string | null>(null);
  const [waterFlowing, setWaterFlowing] = useState(false);

  const phaseIndex = ['intro', 'foundation', 'towers', 'decorations', 'water', 'complete'].indexOf(phase);

  const placeBlock = useCallback((row: number, col: number) => {
    if (blocks.find(b => b.row === row && b.col === col)) return;
    const id = `block-${row}-${col}`;
    setBlocks(prev => [...prev, { id, row, col }]);
  }, [blocks]);

  const addTowerLevel = useCallback((position: number) => {
    setTowers(prev => {
      const existing = prev.find(t => t.position === position);
      const maxHeight = TOWER_POSITIONS[position].targetHeight;
      if (existing && existing.height >= maxHeight) return prev;
      if (existing) {
        return prev.map(t => t.position === position ? { ...t, height: t.height + 1 } : t);
      }
      return [...prev, { id: `tower-${position}`, position, height: 1 }];
    });
  }, []);

  const addDecoration = useCallback((wall: number, type: string, label: string) => {
    if (decorations.find(d => d.wall === wall)) return;
    setDecorations(prev => [...prev, { id: `dec-${wall}`, wall, type, label }]);
  }, [decorations]);

  const addCanal = useCallback(() => {
    const canalId = `canal-${canals.length}`;
    const canalPaths = [
      { fromX: 50, fromY: 10, toX: 50, toY: 50 },
      { fromX: 50, fromY: 50, toX: 20, toY: 80 },
      { fromX: 50, fromY: 50, toX: 80, toY: 80 },
    ];
    if (canals.length < canalPaths.length) {
      setCanals(prev => [...prev, { id: canalId, ...canalPaths[prev.length] }]);
    }
    if (canals.length === 2) {
      setWaterFlowing(true);
    }
  }, [canals]);

  const nextPhase = () => {
    const phases: GamePhase[] = ['intro', 'foundation', 'towers', 'decorations', 'water', 'complete'];
    const idx = phases.indexOf(phase);
    if (idx < phases.length - 1) {
      const next = phases[idx + 1];
      setPhase(next);
      if (next === 'complete' && onComplete) onComplete();
    }
  };

  const foundationComplete = blocks.length >= FOUNDATION_ROWS * FOUNDATION_COLS;
  const towersComplete = towers.reduce((sum, t) => sum + t.height, 0) >= 11; // 2+2+3+2+2
  const decorationsComplete = decorations.length >= 4;
  const canalsComplete = canals.length >= 3;

  // ─── Intro ─────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div style={styles.wrapper}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48 }}>🏛️🐘✨</div>
          <h2 style={styles.title}>Temple Builder</h2>
          <p style={styles.subtitle}>Build your own Khmer-style temple complex!</p>
        </div>
        <div style={styles.infoCard}>
          <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
            You&apos;ll build a magnificent temple in 4 stages, just like the
            ancient Khmer engineers:
          </p>
          <ol style={{ fontSize: 13, color: colors.textMuted, paddingLeft: 20, lineHeight: 1.8 }}>
            <li><strong style={{ color: colors.stone }}>Foundation</strong> — Lay sandstone blocks for the base</li>
            <li><strong style={{ color: colors.stone }}>Towers</strong> — Stack towers in the Angkor Wat style</li>
            <li><strong style={{ color: colors.stone }}>Decorations</strong> — Add bas-relief carvings to the walls</li>
            <li><strong style={{ color: colors.water }}>Water System</strong> — Build canals from your reservoir</li>
          </ol>
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button style={styles.button} onClick={nextPhase}>
            Start Building
          </button>
        </div>
      </div>
    );
  }

  // ─── Complete ──────────────────────────────────────
  if (phase === 'complete') {
    return (
      <div style={styles.wrapper}>
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: 48 }}>🏛️🐘🌿💧✨</div>
          <h2 style={{ ...styles.title, fontSize: 28 }}>Temple Complete!</h2>
          <p style={{ fontSize: 15, color: colors.text, marginBottom: 16 }}>
            Your magnificent temple stands tall above the jungle!
          </p>

          <div style={styles.infoCard}>
            <div style={{ fontSize: 14, lineHeight: 1.8 }}>
              <p>🧱 <strong>{blocks.length}</strong> sandstone blocks placed</p>
              <p>🗼 <strong>{towers.length}</strong> towers reaching the sky</p>
              <p>🎨 <strong>{decorations.length}</strong> bas-relief carvings</p>
              <p>💧 <strong>{canals.length}</strong> canals carrying water</p>
            </div>
          </div>

          <div style={{ ...styles.infoCard, background: 'rgba(79, 195, 247, 0.1)', border: `1px solid ${colors.water}` }}>
            <p style={{ fontSize: 13, color: colors.water, fontStyle: 'italic' }}>
              Water flows through your canals, rice paddies turn green, and
              elephants process through the gates. The Khmer engineers would be
              proud! 🐘
            </p>
          </div>

          {/* Simple temple visualization */}
          <div style={{ margin: '20px auto', maxWidth: 300 }}>
            <svg viewBox="0 0 300 200" style={{ width: '100%' }}>
              {/* Sky */}
              <rect width="300" height="200" fill="#1A2E1F" />
              {/* Moat */}
              <rect x="20" y="150" width="260" height="30" rx="4" fill={colors.waterDark} opacity="0.5" />
              {/* Foundation */}
              <rect x="60" y="120" width="180" height="35" rx="2" fill={colors.stone} />
              <rect x="70" y="110" width="160" height="15" rx="2" fill={colors.stoneLight} />
              {/* Towers */}
              <rect x="85" y="60" width="25" height="50" rx="2" fill={colors.stone} />
              <rect x="120" y="40" width="25" height="70" rx="2" fill={colors.stone} />
              <rect x="135" y="25" width="30" height="85" rx="2" fill={colors.goldLight} />
              <rect x="175" y="40" width="25" height="70" rx="2" fill={colors.stone} />
              <rect x="210" y="60" width="25" height="50" rx="2" fill={colors.stone} />
              {/* Peaks */}
              <polygon points="97,60 85,60 97,48 110,60" fill={colors.gold} />
              <polygon points="132,40 120,40 132,28 145,40" fill={colors.gold} />
              <polygon points="150,25 135,25 150,10 165,25" fill={colors.gold} />
              <polygon points="187,40 175,40 187,28 200,40" fill={colors.gold} />
              <polygon points="222,60 210,60 222,48 235,60" fill={colors.gold} />
              {/* Canals */}
              {canals.length > 0 && <line x1="150" y1="155" x2="150" y2="180" stroke={colors.water} strokeWidth="3" />}
              {canals.length > 1 && <line x1="150" y1="180" x2="80" y2="195" stroke={colors.water} strokeWidth="3" />}
              {canals.length > 2 && <line x1="150" y1="180" x2="220" y2="195" stroke={colors.water} strokeWidth="3" />}
              {/* Rice paddies */}
              {waterFlowing && (
                <>
                  <rect x="40" y="185" width="50" height="12" rx="2" fill="#4A8B5C" opacity="0.7" />
                  <rect x="210" y="185" width="50" height="12" rx="2" fill="#4A8B5C" opacity="0.7" />
                </>
              )}
              {/* Decorations as tiny marks */}
              {decorations.map((d, i) => (
                <text key={d.id} x={80 + i * 40} y="135" fontSize="12" textAnchor="middle">
                  {DECORATION_OPTIONS.find(o => o.type === d.type)?.emoji || '🎨'}
                </text>
              ))}
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // ─── Building Phases ───────────────────────────────
  return (
    <div style={styles.wrapper}>
      <h2 style={{ ...styles.title, fontSize: 20, margin: '4px 0 8px' }}>
        🏛️ Temple Builder
      </h2>

      {/* Progress steps */}
      <div style={styles.progressBar}>
        {['🧱', '🗼', '🎨', '💧'].map((icon, i) => (
          <div key={i} style={styles.progressStep(phaseIndex === i + 1, phaseIndex > i + 1)}>
            {icon}
          </div>
        ))}
      </div>

      {/* Foundation Phase */}
      {phase === 'foundation' && (
        <>
          <div style={styles.phaseLabel}>Step 1: Lay the Foundation</div>
          <p style={{ fontSize: 13, color: colors.textMuted, textAlign: 'center', marginBottom: 12 }}>
            Tap each slot to place a sandstone block. Fill the entire base!
          </p>
          <div style={{
            ...styles.grid,
            gridTemplateColumns: `repeat(${FOUNDATION_COLS}, 40px)`,
          }}>
            {Array.from({ length: FOUNDATION_ROWS * FOUNDATION_COLS }).map((_, i) => {
              const row = Math.floor(i / FOUNDATION_COLS);
              const col = i % FOUNDATION_COLS;
              const placed = blocks.some(b => b.row === row && b.col === col);
              return (
                <div
                  key={i}
                  style={styles.block(placed)}
                  onClick={() => placeBlock(row, col)}
                >
                  {placed ? '█' : ''}
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: 12, color: colors.textMuted, textAlign: 'center' }}>
            {blocks.length} / {FOUNDATION_ROWS * FOUNDATION_COLS} blocks placed
          </p>
          {foundationComplete && (
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <button style={styles.button} onClick={nextPhase}>
                Foundation Complete! Build Towers →
              </button>
            </div>
          )}
        </>
      )}

      {/* Towers Phase */}
      {phase === 'towers' && (
        <>
          <div style={styles.phaseLabel}>Step 2: Stack the Towers</div>
          <p style={{ fontSize: 13, color: colors.textMuted, textAlign: 'center', marginBottom: 12 }}>
            Tap each tower to stack it higher. The center tower should be the tallest!
          </p>
          <div style={styles.towerContainer}>
            {TOWER_POSITIONS.map((pos, i) => {
              const tower = towers.find(t => t.position === i);
              const height = tower?.height || 0;
              const isCenter = i === 2;
              const maxReached = height >= pos.targetHeight;
              return (
                <div key={i} style={{ textAlign: 'center' }}>
                  {height > 0 && <div style={styles.towerPeak} />}
                  <div
                    style={{
                      ...styles.tower(Math.max(height, 0.5), isCenter),
                      opacity: height > 0 ? 1 : 0.3,
                      cursor: maxReached ? 'default' : 'pointer',
                    }}
                    onClick={() => !maxReached && addTowerLevel(i)}
                  >
                    {height > 0 && (
                      <span style={{ fontSize: 10, color: colors.stoneDark, fontWeight: 700 }}>
                        {height}/{pos.targetHeight}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: 10, color: colors.textMuted, marginTop: 4, display: 'block' }}>
                    {pos.label}
                  </span>
                </div>
              );
            })}
          </div>
          {towersComplete && (
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <button style={styles.button} onClick={nextPhase}>
                Towers Complete! Add Carvings →
              </button>
            </div>
          )}
        </>
      )}

      {/* Decorations Phase */}
      {phase === 'decorations' && (
        <>
          <div style={styles.phaseLabel}>Step 3: Add Bas-Relief Carvings</div>
          <p style={{ fontSize: 13, color: colors.textMuted, textAlign: 'center', marginBottom: 12 }}>
            Choose carvings for 4 walls. Select a carving type, then tap a wall slot.
          </p>

          <div style={styles.decorationGrid}>
            {DECORATION_OPTIONS.map(opt => (
              <div
                key={opt.type}
                style={styles.decorationCard(selectedDecoration === opt.type)}
                onClick={() => setSelectedDecoration(opt.type)}
              >
                <div style={{ fontSize: 24 }}>{opt.emoji}</div>
                <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 4 }}>{opt.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
            {[0, 1, 2, 3].map(wall => {
              const dec = decorations.find(d => d.wall === wall);
              return (
                <div
                  key={wall}
                  style={{
                    width: 60,
                    height: 80,
                    borderRadius: 8,
                    border: dec ? `2px solid ${colors.gold}` : '2px dashed #3A5A3F',
                    background: dec ? 'rgba(201, 162, 39, 0.1)' : colors.cardBg,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: dec || !selectedDecoration ? 'default' : 'pointer',
                    fontSize: 24,
                  }}
                  onClick={() => {
                    if (!dec && selectedDecoration) {
                      const opt = DECORATION_OPTIONS.find(o => o.type === selectedDecoration);
                      if (opt) addDecoration(wall, opt.type, opt.label);
                    }
                  }}
                >
                  {dec ? (
                    <>
                      {DECORATION_OPTIONS.find(o => o.type === dec.type)?.emoji}
                      <span style={{ fontSize: 8, color: colors.textMuted, marginTop: 4 }}>
                        Wall {wall + 1}
                      </span>
                    </>
                  ) : (
                    <span style={{ fontSize: 10, color: colors.textMuted }}>
                      Wall {wall + 1}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {decorationsComplete && (
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <button style={styles.button} onClick={nextPhase}>
                Carvings Done! Build Water System →
              </button>
            </div>
          )}
        </>
      )}

      {/* Water Phase */}
      {phase === 'water' && (
        <>
          <div style={styles.phaseLabel}>Step 4: Build the Water System</div>
          <p style={{ fontSize: 13, color: colors.textMuted, textAlign: 'center', marginBottom: 12 }}>
            Connect canals from the reservoir to the rice paddies!
          </p>

          <div style={styles.canalArea}>
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: 200 }}>
              {/* Reservoir */}
              <rect x="35" y="2" width="30" height="12" rx="3" fill={colors.waterDark} />
              <text x="50" y="10" textAnchor="middle" fontSize="5" fill="white">Reservoir</text>

              {/* Temple */}
              <rect x="40" y="38" width="20" height="18" rx="2" fill={colors.stone} />
              <polygon points="50,30 38,38 62,38" fill={colors.gold} />
              <text x="50" y="50" textAnchor="middle" fontSize="4" fill={colors.stoneDark}>Temple</text>

              {/* Rice paddies */}
              <rect x="5" y="82" width="25" height="15" rx="2"
                fill={waterFlowing ? '#4A8B5C' : '#2A4A30'} stroke="#3A5A3F" strokeWidth="0.5" />
              <text x="17" y="91" textAnchor="middle" fontSize="4"
                fill={waterFlowing ? 'white' : colors.textMuted}>Rice</text>

              <rect x="70" y="82" width="25" height="15" rx="2"
                fill={waterFlowing ? '#4A8B5C' : '#2A4A30'} stroke="#3A5A3F" strokeWidth="0.5" />
              <text x="82" y="91" textAnchor="middle" fontSize="4"
                fill={waterFlowing ? 'white' : colors.textMuted}>Rice</text>

              {/* Drawn canals */}
              {canals.map(c => (
                <line key={c.id} x1={c.fromX} y1={c.fromY} x2={c.toX} y2={c.toY}
                  stroke={colors.water} strokeWidth="3" strokeLinecap="round" />
              ))}

              {/* Water flow animation dots */}
              {waterFlowing && canals.map((c, i) => (
                <circle key={`flow-${i}`} r="2" fill={colors.water}>
                  <animateMotion
                    dur={`${1.5 + i * 0.3}s`}
                    repeatCount="indefinite"
                    path={`M${c.fromX},${c.fromY} L${c.toX},${c.toY}`}
                  />
                </circle>
              ))}
            </svg>

            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <button
                style={{
                  ...styles.button,
                  background: canalsComplete
                    ? '#3A5A3F'
                    : `linear-gradient(145deg, ${colors.water} 0%, ${colors.waterDark} 100%)`,
                  color: canalsComplete ? colors.textMuted : 'white',
                  cursor: canalsComplete ? 'default' : 'pointer',
                }}
                onClick={() => !canalsComplete && addCanal()}
                disabled={canalsComplete}
              >
                {canals.length === 0 && 'Dig Canal from Reservoir →'}
                {canals.length === 1 && 'Dig Left Canal to Rice Paddy →'}
                {canals.length === 2 && 'Dig Right Canal to Rice Paddy →'}
                {canals.length >= 3 && 'All Canals Connected! 💧'}
              </button>
            </div>
          </div>

          <p style={{ fontSize: 12, color: colors.textMuted, textAlign: 'center' }}>
            {canals.length} / 3 canals built
          </p>

          {canalsComplete && (
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <button style={styles.button} onClick={nextPhase}>
                Water Flowing! See Your Temple →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
