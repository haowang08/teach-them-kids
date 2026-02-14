import { useState, useCallback } from 'react';

// ============================================
// TYPES
// ============================================

interface CityPlannerProps {
  onComplete?: () => void;
}

type GamePhase = 'intro' | 'grid-layout' | 'buildings' | 'drainage' | 'complete';

type CellType = 'empty' | 'street' | 'house' | 'granary' | 'bath' | 'workshop';

interface Cell {
  row: number;
  col: number;
  type: CellType;
  hasDrainage: boolean;
}

interface BuildingOption {
  type: CellType;
  label: string;
  emoji: string;
  color: string;
  description: string;
}

// ============================================
// CONSTANTS
// ============================================

const GRID_SIZE = 6;
const MIN_STREETS = 8;
const MIN_BUILDINGS = 6;
const MIN_DRAINAGE = 4;

const BUILDING_OPTIONS: BuildingOption[] = [
  {
    type: 'house',
    label: 'House',
    emoji: '\u{1F3E0}',
    color: '#D4A574',
    description: 'Brick homes for families',
  },
  {
    type: 'granary',
    label: 'Granary',
    emoji: '\u{1F3DB}',
    color: '#B8860B',
    description: 'Stores grain for the city',
  },
  {
    type: 'bath',
    label: 'Great Bath',
    emoji: '\u{1F6C1}',
    color: '#4FC3F7',
    description: 'Public bathing pool',
  },
  {
    type: 'workshop',
    label: 'Workshop',
    emoji: '\u{1F528}',
    color: '#8D6E63',
    description: 'Craft beads and tools',
  },
];

const PHASE_LIST: GamePhase[] = ['intro', 'grid-layout', 'buildings', 'drainage', 'complete'];

const PHASE_LABELS = [
  { label: 'Streets', emoji: '\u{1F6E4}' },
  { label: 'Build', emoji: '\u{1F3D7}' },
  { label: 'Drains', emoji: '\u{1F4A7}' },
  { label: 'Done', emoji: '\u{2728}' },
];

// ============================================
// STYLES
// ============================================

const colors = {
  bg: '#5D3A1A',
  bgDark: '#3E2510',
  accent: '#C84B31',
  accentLight: '#E06B50',
  sand: '#E8D5B7',
  sandDark: '#C9B896',
  brick: '#A0522D',
  brickLight: '#CD853F',
  street: '#B85C38',
  streetLight: '#D4856A',
  text: '#F5EDE0',
  textMuted: '#C9B896',
  cardBg: '#4A2E14',
  water: '#4FC3F7',
  waterDark: '#0288D1',
  gold: '#DAA520',
  goldLight: '#F5E6A3',
  drain: '#37474F',
  drainActive: '#26C6DA',
};

const styles = {
  wrapper: {
    background: `linear-gradient(145deg, ${colors.bg} 0%, ${colors.bgDark} 100%)`,
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
    textShadow: '0 2px 8px rgba(218, 165, 32, 0.3)',
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
    color: colors.accentLight,
    textAlign: 'center' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    marginBottom: 8,
  } as React.CSSProperties,

  instruction: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center' as const,
    marginBottom: 12,
    lineHeight: 1.5,
  } as React.CSSProperties,

  grid: {
    display: 'grid',
    gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
    gap: 3,
    justifyContent: 'center',
    marginBottom: 16,
    maxWidth: 320,
    marginLeft: 'auto',
    marginRight: 'auto',
  } as React.CSSProperties,

  cell: (type: CellType, hasDrainage: boolean, clickable: boolean) => {
    const base: React.CSSProperties = {
      width: '100%',
      aspectRatio: '1',
      borderRadius: 4,
      border: '2px solid transparent',
      cursor: clickable ? 'pointer' : 'default',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      position: 'relative' as const,
    };

    switch (type) {
      case 'empty':
        return {
          ...base,
          background: `linear-gradient(135deg, ${colors.sand} 0%, ${colors.sandDark} 100%)`,
          border: clickable ? '2px dashed #A08060' : '2px solid #C9B896',
        };
      case 'street':
        return {
          ...base,
          background: hasDrainage
            ? `linear-gradient(135deg, ${colors.drain} 0%, #455A64 100%)`
            : `linear-gradient(135deg, ${colors.street} 0%, ${colors.streetLight} 100%)`,
          border: hasDrainage
            ? `2px solid ${colors.drainActive}`
            : `2px solid ${colors.brick}`,
          boxShadow: hasDrainage ? `0 0 6px ${colors.drainActive}40` : 'none',
        };
      case 'house':
        return {
          ...base,
          background: 'linear-gradient(135deg, #D4A574 0%, #B8956A 100%)',
          border: '2px solid #8B6914',
        };
      case 'granary':
        return {
          ...base,
          background: 'linear-gradient(135deg, #DAA520 0%, #B8860B 100%)',
          border: '2px solid #8B6914',
        };
      case 'bath':
        return {
          ...base,
          background: 'linear-gradient(135deg, #4FC3F7 0%, #0288D1 100%)',
          border: '2px solid #01579B',
        };
      case 'workshop':
        return {
          ...base,
          background: 'linear-gradient(135deg, #8D6E63 0%, #5D4037 100%)',
          border: '2px solid #3E2723',
        };
      default:
        return base;
    }
  },

  button: {
    padding: '12px 28px',
    borderRadius: 24,
    border: 'none',
    background: `linear-gradient(145deg, ${colors.accent} 0%, #9A3520 100%)`,
    color: '#fff',
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    transition: 'transform 0.15s, box-shadow 0.15s',
    boxShadow: '0 4px 12px rgba(200, 75, 49, 0.3)',
  } as React.CSSProperties,

  buttonGold: {
    padding: '12px 28px',
    borderRadius: 24,
    border: 'none',
    background: `linear-gradient(145deg, ${colors.gold} 0%, #B8860B 100%)`,
    color: colors.bgDark,
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    transition: 'transform 0.15s, box-shadow 0.15s',
    boxShadow: '0 4px 12px rgba(218, 165, 32, 0.3)',
  } as React.CSSProperties,

  buildingPalette: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 8,
    marginBottom: 16,
    maxWidth: 320,
    marginLeft: 'auto',
    marginRight: 'auto',
  } as React.CSSProperties,

  buildingCard: (selected: boolean) => ({
    padding: '10px 8px',
    borderRadius: 10,
    border: selected ? `2px solid ${colors.gold}` : `2px solid ${colors.cardBg}`,
    background: selected ? 'rgba(218, 165, 32, 0.15)' : colors.cardBg,
    cursor: 'pointer',
    textAlign: 'center' as const,
    transition: 'all 0.2s',
    boxShadow: selected ? `0 0 8px ${colors.gold}40` : 'none',
  }) as React.CSSProperties,

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
    background: completed ? colors.accent : active ? colors.gold : '#3A2410',
    color: completed || active ? '#fff' : colors.textMuted,
    border: active ? `2px solid ${colors.goldLight}` : '2px solid transparent',
    transition: 'all 0.3s',
  }) as React.CSSProperties,

  infoCard: {
    background: colors.cardBg,
    borderRadius: 12,
    padding: '14px 16px',
    marginBottom: 16,
    border: `1px solid ${colors.brick}40`,
  } as React.CSSProperties,

  counter: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center' as const,
    marginBottom: 8,
  } as React.CSSProperties,

  badge: (met: boolean) => ({
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 700,
    background: met ? `${colors.accent}30` : `${colors.cardBg}`,
    color: met ? colors.accentLight : colors.textMuted,
    border: met ? `1px solid ${colors.accent}` : `1px solid ${colors.brick}40`,
  }) as React.CSSProperties,
};

// ============================================
// HELPERS
// ============================================

function createEmptyGrid(): Cell[][] {
  const grid: Cell[][] = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < GRID_SIZE; c++) {
      row.push({ row: r, col: c, type: 'empty', hasDrainage: false });
    }
    grid.push(row);
  }
  return grid;
}

function countCellType(grid: Cell[][], type: CellType): number {
  let count = 0;
  for (const row of grid) {
    for (const cell of row) {
      if (cell.type === type) count++;
    }
  }
  return count;
}

function countBuildings(grid: Cell[][]): number {
  const buildingTypes: CellType[] = ['house', 'granary', 'bath', 'workshop'];
  let count = 0;
  for (const row of grid) {
    for (const cell of row) {
      if (buildingTypes.includes(cell.type)) count++;
    }
  }
  return count;
}

function countDrainage(grid: Cell[][]): number {
  let count = 0;
  for (const row of grid) {
    for (const cell of row) {
      if (cell.hasDrainage) count++;
    }
  }
  return count;
}

function hasGridPattern(grid: Cell[][]): boolean {
  let hasHorizontal = false;
  let hasVertical = false;
  for (let r = 0; r < GRID_SIZE; r++) {
    let rowStreets = 0;
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c].type === 'street') rowStreets++;
    }
    if (rowStreets >= 3) hasHorizontal = true;
  }
  for (let c = 0; c < GRID_SIZE; c++) {
    let colStreets = 0;
    for (let r = 0; r < GRID_SIZE; r++) {
      if (grid[r][c].type === 'street') colStreets++;
    }
    if (colStreets >= 3) hasVertical = true;
  }
  return hasHorizontal && hasVertical;
}

function isAdjacentToDrainage(grid: Cell[][], row: number, col: number): boolean {
  const drainCount = countDrainage(grid);
  if (drainCount === 0) return true;
  const neighbors = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ];
  for (const [nr, nc] of neighbors) {
    if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
      if (grid[nr][nc].hasDrainage) return true;
    }
  }
  return false;
}

function getCellEmoji(type: CellType, hasDrainage: boolean): string {
  if (hasDrainage) return '\u{1F4A7}';
  switch (type) {
    case 'street': return '\u{1F9F1}';
    case 'house': return '\u{1F3E0}';
    case 'granary': return '\u{1F3DB}';
    case 'bath': return '\u{1F6C1}';
    case 'workshop': return '\u{1F528}';
    default: return '';
  }
}

// ============================================
// COMPONENT
// ============================================

export default function CityPlanner({ onComplete }: CityPlannerProps) {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [grid, setGrid] = useState<Cell[][]>(createEmptyGrid);
  const [selectedBuilding, setSelectedBuilding] = useState<CellType>('house');
  const [message, setMessage] = useState<string>('');

  const phaseIndex = PHASE_LIST.indexOf(phase);
  const streetCount = countCellType(grid, 'street');
  const buildingCount = countBuildings(grid);
  const drainageCount = countDrainage(grid);
  const gridPatternMet = hasGridPattern(grid);

  const nextPhase = useCallback(() => {
    const idx = PHASE_LIST.indexOf(phase);
    if (idx < PHASE_LIST.length - 1) {
      const next = PHASE_LIST[idx + 1];
      setPhase(next);
      setMessage('');
      if (next === 'complete' && onComplete) onComplete();
    }
  }, [phase, onComplete]);

  const placeStreet = useCallback((row: number, col: number) => {
    setGrid(prev => {
      if (prev[row][col].type !== 'empty') return prev;
      const next = prev.map(r => r.map(c => ({ ...c })));
      next[row][col].type = 'street';
      return next;
    });
    setMessage('');
  }, []);

  const placeBuilding = useCallback((row: number, col: number) => {
    setGrid(prev => {
      if (prev[row][col].type !== 'empty') return prev;
      const next = prev.map(r => r.map(c => ({ ...c })));
      next[row][col].type = selectedBuilding;
      return next;
    });
    setMessage('');
  }, [selectedBuilding]);

  const placeDrainage = useCallback((row: number, col: number) => {
    setGrid(prev => {
      if (prev[row][col].type !== 'street') return prev;
      if (prev[row][col].hasDrainage) return prev;
      if (!isAdjacentToDrainage(prev, row, col)) {
        setMessage('Connect drainage to an existing drain tile!');
        return prev;
      }
      const next = prev.map(r => r.map(c => ({ ...c })));
      next[row][col].hasDrainage = true;
      return next;
    });
    setMessage('');
  }, []);

  const handleCellClick = useCallback((row: number, col: number) => {
    if (phase === 'grid-layout') {
      placeStreet(row, col);
    } else if (phase === 'buildings') {
      placeBuilding(row, col);
    } else if (phase === 'drainage') {
      placeDrainage(row, col);
    }
  }, [phase, placeStreet, placeBuilding, placeDrainage]);

  const canAdvanceStreets = streetCount >= MIN_STREETS && gridPatternMet;
  const canAdvanceBuildings = buildingCount >= MIN_BUILDINGS;
  const canAdvanceDrainage = drainageCount >= MIN_DRAINAGE;

  // ─── Progress Bar ─────────────────────────────────
  const renderProgress = () => (
    <div style={styles.progressBar}>
      {PHASE_LABELS.map((step, i) => {
        const stepPhaseIndex = i + 1;
        const active = phaseIndex === stepPhaseIndex;
        const completed = phaseIndex > stepPhaseIndex;
        return (
          <div key={step.label} style={styles.progressStep(active, completed)}>
            {completed ? '\u{2705}' : step.emoji}
          </div>
        );
      })}
    </div>
  );

  // ─── Grid Renderer ────────────────────────────────
  const renderGrid = () => {
    const clickable = phase === 'grid-layout' || phase === 'buildings' || phase === 'drainage';
    return (
      <div style={styles.grid}>
        {grid.map((row, ri) =>
          row.map((cell, ci) => {
            const canClick = clickable && (
              (phase === 'grid-layout' && cell.type === 'empty') ||
              (phase === 'buildings' && cell.type === 'empty') ||
              (phase === 'drainage' && cell.type === 'street' && !cell.hasDrainage)
            );
            return (
              <div
                key={`${ri}-${ci}`}
                style={styles.cell(cell.type, cell.hasDrainage, canClick)}
                onClick={canClick ? () => handleCellClick(ri, ci) : undefined}
                title={canClick ? 'Click to place' : cell.type}
              >
                <span style={{ fontSize: 16, lineHeight: 1 }}>
                  {getCellEmoji(cell.type, cell.hasDrainage)}
                </span>
              </div>
            );
          })
        )}
      </div>
    );
  };

  // ─── Intro ─────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div style={styles.wrapper}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48 }}>{'\u{1F3D9}'}{'\u{1F9F1}'}{'\u{2728}'}</div>
          <h2 style={styles.title}>City Planner: Build Mohenjo-daro!</h2>
          <p style={styles.subtitle}>
            Design a city from the ancient Indus Valley Civilization
          </p>
        </div>
        <div style={styles.infoCard}>
          <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
            Over 4,000 years ago, the people of the Indus Valley built one of the
            world&apos;s first planned cities. Now it&apos;s your turn!
          </p>
          <ol style={{ fontSize: 13, color: colors.textMuted, paddingLeft: 20, lineHeight: 1.8 }}>
            <li>
              <strong style={{ color: colors.street }}>{'\u{1F6E4}'} Streets</strong>
              {' \u{2014} '} Lay out a grid of straight streets
            </li>
            <li>
              <strong style={{ color: colors.gold }}>{'\u{1F3D7}'} Buildings</strong>
              {' \u{2014} '} Place houses, granaries, baths, and workshops
            </li>
            <li>
              <strong style={{ color: colors.water }}>{'\u{1F4A7}'} Drainage</strong>
              {' \u{2014} '} Connect drains along the streets
            </li>
          </ol>
        </div>
        <div style={{
          ...styles.infoCard,
          background: `${colors.accent}15`,
          border: `1px solid ${colors.accent}60`,
        }}>
          <p style={{ fontSize: 13, color: colors.accentLight, fontStyle: 'italic', margin: 0 }}>
            {'\u{1F4A1}'} Fun fact: Mohenjo-daro had running water and drainage
            systems thousands of years before most of the world!
          </p>
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button style={styles.button} onClick={nextPhase}>
            Start Building {'\u{1F3D7}'}
          </button>
        </div>
      </div>
    );
  }

  // ─── Complete ──────────────────────────────────────
  if (phase === 'complete') {
    const houseCount = countCellType(grid, 'house');
    const granaryCount = countCellType(grid, 'granary');
    const bathCount = countCellType(grid, 'bath');
    const workshopCount = countCellType(grid, 'workshop');
    return (
      <div style={styles.wrapper}>
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: 48 }}>
            {'\u{1F3D9}'}{'\u{1F389}'}{'\u{2728}'}
          </div>
          <h2 style={{ ...styles.title, fontSize: 28 }}>
            Mohenjo-daro Complete!
          </h2>
          <p style={{ fontSize: 15, color: colors.text, marginBottom: 16 }}>
            Your ancient city is ready for its citizens!
          </p>
        </div>

        {renderGrid()}

        <div style={styles.infoCard}>
          <p style={{ fontSize: 15, fontWeight: 700, color: colors.gold, marginBottom: 10, textAlign: 'center' }}>
            {'\u{1F4CA}'} City Stats
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 8,
            fontSize: 13,
            lineHeight: 1.8,
          }}>
            <div>{'\u{1F9F1}'} <strong>{streetCount}</strong> street tiles</div>
            <div>{'\u{1F4A7}'} <strong>{drainageCount}</strong> drain tiles</div>
            <div>{'\u{1F3E0}'} <strong>{houseCount}</strong> houses</div>
            <div>{'\u{1F3DB}'} <strong>{granaryCount}</strong> granaries</div>
            <div>{'\u{1F6C1}'} <strong>{bathCount}</strong> great baths</div>
            <div>{'\u{1F528}'} <strong>{workshopCount}</strong> workshops</div>
          </div>
        </div>

        <div style={{
          ...styles.infoCard,
          background: 'rgba(79, 195, 247, 0.1)',
          border: `1px solid ${colors.water}`,
        }}>
          <p style={{ fontSize: 13, color: colors.water, fontStyle: 'italic', margin: 0 }}>
            Water flows through your drainage system, the granaries are stocked,
            and the Great Bath gleams in the sun. The Indus Valley engineers
            would be proud of your city planning! {'\u{1F3D9}'}
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button style={styles.buttonGold} onClick={onComplete}>
            Amazing! {'\u{2728}'}
          </button>
        </div>
      </div>
    );
  }

  // ─── Gameplay Phases ───────────────────────────────
  return (
    <div style={styles.wrapper}>
      {renderProgress()}

      {/* Phase: Grid Layout */}
      {phase === 'grid-layout' && (
        <>
          <div style={styles.phaseLabel}>
            Phase 1: Lay Out the Streets
          </div>
          <p style={styles.instruction}>
            Click empty cells to place brick streets. Build at least one horizontal
            row and one vertical column of streets to form a proper grid.
            Need {MIN_STREETS}+ street tiles.
          </p>

          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <span style={styles.badge(streetCount >= MIN_STREETS)}>
              {'\u{1F9F1}'} Streets: {streetCount}/{MIN_STREETS}
            </span>
            {'  '}
            <span style={styles.badge(gridPatternMet)}>
              {gridPatternMet ? '\u{2705}' : '\u{274C}'} Grid pattern
            </span>
          </div>

          {renderGrid()}

          {message && (
            <p style={{ ...styles.counter, color: colors.accentLight }}>
              {message}
            </p>
          )}

          <div style={styles.infoCard}>
            <p style={{ fontSize: 12, color: colors.textMuted, margin: 0 }}>
              {'\u{1F4A1}'} Tip: Mohenjo-daro had streets laid out in a perfect
              grid pattern, like a modern city! Place streets in rows and columns
              to form intersections.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <button
              style={{
                ...styles.button,
                opacity: canAdvanceStreets ? 1 : 0.4,
                cursor: canAdvanceStreets ? 'pointer' : 'not-allowed',
              }}
              onClick={canAdvanceStreets ? nextPhase : undefined}
            >
              {canAdvanceStreets
                ? `Next: Place Buildings ${'\u{1F3D7}'}`
                : `Need ${MIN_STREETS - streetCount} more streets`}
            </button>
          </div>
        </>
      )}

      {/* Phase: Buildings */}
      {phase === 'buildings' && (
        <>
          <div style={styles.phaseLabel}>
            Phase 2: Place Buildings
          </div>
          <p style={styles.instruction}>
            Select a building type below, then click empty cells on the grid
            to place it. You need at least {MIN_BUILDINGS} buildings.
          </p>

          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <span style={styles.badge(buildingCount >= MIN_BUILDINGS)}>
              {'\u{1F3E0}'} Buildings: {buildingCount}/{MIN_BUILDINGS}
            </span>
          </div>

          <div style={styles.buildingPalette}>
            {BUILDING_OPTIONS.map(opt => (
              <div
                key={opt.type}
                style={styles.buildingCard(selectedBuilding === opt.type)}
                onClick={() => setSelectedBuilding(opt.type)}
              >
                <div style={{ fontSize: 22, marginBottom: 4 }}>{opt.emoji}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>
                  {opt.label}
                </div>
                <div style={{ fontSize: 11, color: colors.textMuted }}>
                  {opt.description}
                </div>
              </div>
            ))}
          </div>

          {renderGrid()}

          {message && (
            <p style={{ ...styles.counter, color: colors.accentLight }}>
              {message}
            </p>
          )}

          <div style={styles.infoCard}>
            <p style={{ fontSize: 12, color: colors.textMuted, margin: 0 }}>
              {'\u{1F4A1}'} The Great Bath of Mohenjo-daro was an enormous public
              pool, possibly the world&apos;s first public swimming pool! Granaries
              stored food for thousands of people.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <button
              style={{
                ...styles.button,
                opacity: canAdvanceBuildings ? 1 : 0.4,
                cursor: canAdvanceBuildings ? 'pointer' : 'not-allowed',
              }}
              onClick={canAdvanceBuildings ? nextPhase : undefined}
            >
              {canAdvanceBuildings
                ? `Next: Add Drainage ${'\u{1F4A7}'}`
                : `Need ${MIN_BUILDINGS - buildingCount} more buildings`}
            </button>
          </div>
        </>
      )}

      {/* Phase: Drainage */}
      {phase === 'drainage' && (
        <>
          <div style={styles.phaseLabel}>
            Phase 3: Connect the Drainage
          </div>
          <p style={styles.instruction}>
            Click street tiles to add drainage channels. Each drain must connect
            to the previous one (adjacent). Need at least {MIN_DRAINAGE} connected drains.
          </p>

          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <span style={styles.badge(drainageCount >= MIN_DRAINAGE)}>
              {'\u{1F4A7}'} Drains: {drainageCount}/{MIN_DRAINAGE}
            </span>
          </div>

          {renderGrid()}

          {message && (
            <p style={{ ...styles.counter, color: colors.accentLight }}>
              {message}
            </p>
          )}

          <div style={styles.infoCard}>
            <p style={{ fontSize: 12, color: colors.textMuted, margin: 0 }}>
              {'\u{1F4A1}'} Mohenjo-daro had covered drains running under every
              street! Each house connected to the main drainage system. This was
              incredibly advanced for 2600 BCE.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <button
              style={{
                ...styles.button,
                opacity: canAdvanceDrainage ? 1 : 0.4,
                cursor: canAdvanceDrainage ? 'pointer' : 'not-allowed',
              }}
              onClick={canAdvanceDrainage ? nextPhase : undefined}
            >
              {canAdvanceDrainage
                ? `Complete City ${'\u{2728}'}`
                : `Need ${MIN_DRAINAGE - drainageCount} more drains`}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
