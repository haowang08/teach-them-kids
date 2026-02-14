import { useState, useCallback } from 'react';

// ============================================
// TYPES
// ============================================

interface TajArchitectProps { onComplete?: () => void; }

type GamePhase = 'intro' | 'base' | 'dome' | 'minarets' | 'gardens' | 'complete';
type Corner = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

// ============================================
// CONSTANTS
// ============================================

const BASE_ROWS = 3;
const BASE_COLS = 5;

const DOME_OPTIONS = [
  { id: 'small', label: 'Small Dome', scale: 0.6, correct: false },
  { id: 'medium', label: 'Grand Dome', scale: 1.0, correct: true },
  { id: 'large', label: 'Giant Dome', scale: 1.4, correct: false },
];

const MIRROR: Record<Corner, Corner> = {
  topLeft: 'topRight', topRight: 'topLeft',
  bottomLeft: 'bottomRight', bottomRight: 'bottomLeft',
};

const GARDEN_SLOTS = [
  { slot: 0, type: 'tree' as const, label: 'Tree', x: 15, y: 30, mirror: 1 },
  { slot: 1, type: 'tree' as const, label: 'Tree', x: 85, y: 30, mirror: 0 },
  { slot: 2, type: 'tree' as const, label: 'Tree', x: 25, y: 65, mirror: 3 },
  { slot: 3, type: 'tree' as const, label: 'Tree', x: 75, y: 65, mirror: 2 },
  { slot: 4, type: 'fountain' as const, label: 'Fountain', x: 30, y: 48, mirror: 5 },
  { slot: 5, type: 'fountain' as const, label: 'Fountain', x: 70, y: 48, mirror: 4 },
  { slot: 6, type: 'pool' as const, label: 'Pool', x: 50, y: 48, mirror: -1 },
];

const PHASES: GamePhase[] = ['intro', 'base', 'dome', 'minarets', 'gardens', 'complete'];

const CORNERS: Array<{ id: Corner; label: string; row: number }> = [
  { id: 'topLeft', label: 'Back L', row: 0 },
  { id: 'topRight', label: 'Back R', row: 0 },
  { id: 'bottomLeft', label: 'Front L', row: 1 },
  { id: 'bottomRight', label: 'Front R', row: 1 },
];

// ============================================
// STYLES
// ============================================

const c = {
  bg: '#1A1A3E', bgDeep: '#0E0E28', red: '#B22222', redL: '#D44A4A',
  marble: '#F5F5F5', cream: '#FFF8E7', shadow: '#D4D0C8',
  gold: '#DAA520', goldL: '#FFD700', emerald: '#2E8B57', emeraldL: '#3CB371',
  sky: '#0F1B4C', water: '#4FC3F7', waterD: '#0277BD',
  text: '#F0F0F0', muted: '#A0A8C0', card: '#1E1E4A',
};

const styles = {
  wrapper: {
    background: `linear-gradient(180deg, ${c.sky} 0%, ${c.bg} 40%, ${c.bgDeep} 100%)`,
    borderRadius: 16, padding: '20px',
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
    color: c.text, minHeight: 500, position: 'relative' as const, overflow: 'hidden',
  } as React.CSSProperties,
  title: {
    fontSize: 24, fontWeight: 800, color: c.goldL, margin: '8px 0',
    textAlign: 'center' as const, textShadow: '0 2px 8px rgba(218,165,32,0.4)',
  } as React.CSSProperties,
  subtitle: {
    fontSize: 13, color: c.muted, textAlign: 'center' as const, marginBottom: 16, lineHeight: 1.6,
  } as React.CSSProperties,
  phaseLabel: {
    fontSize: 14, fontWeight: 700, color: c.goldL, textAlign: 'center' as const,
    textTransform: 'uppercase' as const, letterSpacing: '1px', marginBottom: 12,
  } as React.CSSProperties,
  btn: {
    padding: '12px 28px', borderRadius: 24, border: 'none',
    background: `linear-gradient(145deg, ${c.red} 0%, #8B1A1A 100%)`,
    color: '#FFF', fontWeight: 700, fontSize: 15, cursor: 'pointer',
    transition: 'transform 0.15s, box-shadow 0.15s',
    boxShadow: '0 4px 12px rgba(178,34,34,0.4)',
  } as React.CSSProperties,
  btnGold: {
    padding: '12px 28px', borderRadius: 24, border: 'none',
    background: `linear-gradient(145deg, ${c.gold} 0%, #B8860B 100%)`,
    color: '#1A1A3E', fontWeight: 700, fontSize: 15, cursor: 'pointer',
    transition: 'transform 0.15s, box-shadow 0.15s',
    boxShadow: '0 4px 12px rgba(218,165,32,0.4)',
  } as React.CSSProperties,
  grid: { display: 'grid', gap: 4, justifyContent: 'center', marginBottom: 16 } as React.CSSProperties,
  block: (on: boolean) => ({
    width: 48, height: 32, borderRadius: 4,
    border: on ? `2px solid ${c.shadow}` : '2px dashed rgba(245,245,245,0.25)',
    background: on
      ? `linear-gradient(135deg, ${c.marble} 0%, ${c.cream} 50%, ${c.shadow} 100%)`
      : 'rgba(245,245,245,0.05)',
    cursor: on ? 'default' : 'pointer', transition: 'all 0.3s ease',
    transform: on ? 'scale(1)' : 'scale(0.95)',
    boxShadow: on ? '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)' : 'none',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: c.shadow,
  }) as React.CSSProperties,
  progress: { display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 } as React.CSSProperties,
  step: (active: boolean, done: boolean) => ({
    width: 32, height: 32, borderRadius: '50%', display: 'flex',
    alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700,
    background: done ? c.emerald : active ? c.red : 'rgba(30,30,74,0.8)',
    color: done || active ? '#fff' : c.muted,
    border: active ? `2px solid ${c.redL}` : '2px solid transparent', transition: 'all 0.3s',
  }) as React.CSSProperties,
  info: {
    background: c.card, borderRadius: 12, padding: '14px 16px', marginBottom: 16,
    border: '1px solid rgba(218,165,32,0.15)',
  } as React.CSSProperties,
  dome: (sel: boolean, ok: boolean, rev: boolean) => ({
    padding: '16px 12px', borderRadius: 12, flex: 1, textAlign: 'center' as const,
    transition: 'all 0.3s', cursor: rev ? 'default' : 'pointer',
    border: rev && ok ? `2px solid ${c.emerald}` : rev && sel && !ok ? '2px solid #FF6B6B'
      : sel ? `2px solid ${c.goldL}` : '2px solid rgba(245,245,245,0.15)',
    background: rev && ok ? 'rgba(46,139,87,0.15)' : sel ? 'rgba(218,165,32,0.1)' : c.card,
  }) as React.CSSProperties,
  minSlot: (on: boolean, guide: boolean) => ({
    width: 44, height: 80, borderRadius: '6px 6px 2px 2px',
    border: on ? `2px solid ${c.shadow}` : guide ? `2px dashed ${c.goldL}` : '2px dashed rgba(245,245,245,0.2)',
    background: on ? `linear-gradient(180deg, ${c.marble} 0%, ${c.cream} 60%, ${c.shadow} 100%)`
      : guide ? 'rgba(218,165,32,0.08)' : 'rgba(245,245,245,0.03)',
    cursor: on ? 'default' : 'pointer', transition: 'all 0.4s ease',
    display: 'flex', flexDirection: 'column' as const, alignItems: 'center',
    justifyContent: 'flex-end', paddingBottom: 4,
    boxShadow: on ? '0 4px 8px rgba(0,0,0,0.3)' : 'none',
    transform: on ? 'scale(1)' : 'scale(0.9)',
  }) as React.CSSProperties,
  garSlot: (on: boolean, t: string) => ({
    width: t === 'pool' ? 80 : 44, height: t === 'pool' ? 28 : 44,
    borderRadius: t === 'pool' ? 14 : t === 'fountain' ? '50%' : 8,
    border: on ? `2px solid ${t === 'pool' ? c.waterD : c.emerald}` : '2px dashed rgba(245,245,245,0.2)',
    background: on
      ? t === 'pool' ? `linear-gradient(180deg, ${c.water} 0%, ${c.waterD} 100%)`
        : t === 'fountain' ? `radial-gradient(circle, ${c.water} 0%, ${c.waterD} 100%)`
        : `linear-gradient(180deg, ${c.emeraldL} 0%, ${c.emerald} 100%)`
      : 'rgba(245,245,245,0.03)',
    cursor: on ? 'default' : 'pointer', transition: 'all 0.4s ease',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: on ? 18 : 11, color: on ? '#fff' : c.muted,
    position: 'absolute' as const, boxShadow: on ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
  }) as React.CSSProperties,
};

// ============================================
// COMPONENT
// ============================================

export default function TajArchitect({ onComplete }: TajArchitectProps) {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [blocks, setBlocks] = useState<Array<{ row: number; col: number }>>([]);
  const [selDome, setSelDome] = useState<string | null>(null);
  const [domeRevealed, setDomeRevealed] = useState(false);
  const [domeOk, setDomeOk] = useState(false);
  const [spire, setSpire] = useState(false);
  const [mins, setMins] = useState<Corner[]>([]);
  const [minStep, setMinStep] = useState(0);
  const [garden, setGarden] = useState<number[]>([]);

  const pi = PHASES.indexOf(phase);

  const placeBlock = useCallback((r: number, co: number) => {
    setBlocks(p => p.some(b => b.row === r && b.col === co) ? p : [...p, { row: r, col: co }]);
  }, []);

  const pickDome = useCallback((id: string) => { if (!domeRevealed) setSelDome(id); }, [domeRevealed]);

  const confirmDome = useCallback(() => {
    if (!selDome) return;
    setDomeRevealed(true);
    if (DOME_OPTIONS.find(d => d.id === selDome)?.correct) setDomeOk(true);
  }, [selDome]);

  const resetDome = useCallback(() => {
    setSelDome(null); setDomeRevealed(false); setDomeOk(false);
  }, []);

  const placeMin = useCallback((corner: Corner) => {
    setMins(p => {
      if (p.includes(corner)) return p;
      const mirror = MIRROR[corner];
      return p.includes(mirror) ? [...p, corner] : [...p, corner, mirror];
    });
    setMinStep(p => Math.min(p + 1, 2));
  }, []);

  const placeGarden = useCallback((slot: number) => {
    setGarden(p => {
      if (p.includes(slot)) return p;
      const def = GARDEN_SLOTS.find(s => s.slot === slot)!;
      const next = [...p, slot];
      if (def.mirror >= 0 && !p.includes(def.mirror) && !next.includes(def.mirror))
        next.push(def.mirror);
      return next;
    });
  }, []);

  const advance = useCallback(() => {
    const i = PHASES.indexOf(phase);
    if (i < PHASES.length - 1) {
      const next = PHASES[i + 1];
      setPhase(next);
      if (next === 'complete' && onComplete) onComplete();
    }
  }, [phase, onComplete]);

  const baseDone = blocks.length >= BASE_ROWS * BASE_COLS;
  const domeDone = domeOk && spire;
  const minsDone = mins.length >= 4;
  const gardenDone = garden.length >= 7;

  // -- SVG Preview ------------------------------------------
  const tajSVG = (base: boolean, dome: boolean, minar: boolean, gard: boolean) => (
    <svg viewBox="0 0 340 220" style={{ width: '100%', display: 'block' }}>
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.sky} /><stop offset="100%" stopColor={c.bg} />
        </linearGradient>
        <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.marble} /><stop offset="50%" stopColor={c.cream} />
          <stop offset="100%" stopColor={c.shadow} />
        </linearGradient>
        <linearGradient id="dg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF" /><stop offset="100%" stopColor={c.shadow} />
        </linearGradient>
        <linearGradient id="wg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c.waterD} /><stop offset="50%" stopColor={c.water} />
          <stop offset="100%" stopColor={c.waterD} />
        </linearGradient>
      </defs>
      <rect width="340" height="220" fill="url(#sg)" />
      {[{x:30,y:20},{x:90,y:35},{x:250,y:15},{x:310,y:40},{x:180,y:10}].map((s,i) =>
        <circle key={i} cx={s.x} cy={s.y} r="1" fill="#FFF" opacity={0.3+i*0.08} />)}
      <rect x="0" y="185" width="340" height="35" fill={c.emerald} opacity="0.3" />
      {gard && <>
        <rect x="130" y="170" width="80" height="18" rx="9" fill="url(#wg)" opacity="0.7" />
        <rect x="165" y="155" width="10" height="30" fill={c.shadow} opacity="0.3" />
        {[[80,165,12],[260,165,12],[110,175,10],[230,175,10]].map(([cx,cy,r],i) =>
          <circle key={i} cx={cx} cy={cy} r={r} fill={i<2?c.emerald:c.emeraldL} />)}
        <circle cx="130" cy="168" r="5" fill={c.water} opacity="0.8" />
        <circle cx="210" cy="168" r="5" fill={c.water} opacity="0.8" />
      </>}
      {minar && <>
        {[[92,90,12,65,98,5],[236,90,12,65,242,5],[108,100,10,55,113,4],[222,100,10,55,227,4]]
          .map(([x,y,w,h,cx,r],i) => <g key={i}>
            <rect x={x} y={y} width={w} height={h} rx="2" fill="url(#mg)" />
            <circle cx={cx} cy={y!-2} r={r} fill={c.marble} />
            <line x1={cx} y1={y!-2-r!} x2={cx} y2={y!-2-r!-7} stroke={c.gold} strokeWidth={r!>4?1.5:1.2} />
          </g>)}
      </>}
      {base && <>
        <rect x="115" y="148" width="110" height="10" rx="1" fill={c.shadow} />
        <rect x="105" y="155" width="130" height="8" rx="1" fill={c.marble} opacity="0.9" />
        <rect x="130" y="100" width="80" height="50" rx="2" fill="url(#mg)" />
        <rect x="155" y="115" width="30" height="35" rx="15" fill={c.bgDeep} opacity="0.6" />
        <rect x="133" y="120" width="16" height="25" rx="8" fill={c.bgDeep} opacity="0.3" />
        <rect x="191" y="120" width="16" height="25" rx="8" fill={c.bgDeep} opacity="0.3" />
        <rect x="130" y="148" width="80" height="3" fill={c.red} opacity="0.6" />
      </>}
      {dome && <>
        <ellipse cx="170" cy="100" rx="32" ry="38" fill="url(#dg)" />
        <line x1="170" y1="62" x2="170" y2="46" stroke={c.gold} strokeWidth="2.5" />
        <circle cx="170" cy="44" r="3" fill={c.goldL} />
      </>}
    </svg>
  );

  // ─── Intro ───────────────────────────────────
  if (phase === 'intro') return (
    <div style={styles.wrapper}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>{'\u{1F54C}'}{'\u{2728}'}{'\u{1F3F0}'}</div>
        <h2 style={styles.title}>Taj Architect</h2>
        <p style={{ ...styles.subtitle, fontSize: 15, color: c.goldL }}>
          Build the Wonder of the World!
        </p>
      </div>
      <div style={styles.info}>
        <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>
          Emperor Shah Jahan built the Taj Mahal as a monument of love for his
          wife Mumtaz Mahal. Now it is your turn to build this masterpiece!
        </p>
        <ol style={{ fontSize: 13, color: c.muted, paddingLeft: 20, lineHeight: 2 }}>
          <li><strong style={{ color: c.marble }}>Marble Base</strong> {'\u{2014}'} Lay the white marble platform</li>
          <li><strong style={{ color: c.marble }}>Grand Dome</strong> {'\u{2014}'} Place the famous onion dome</li>
          <li><strong style={{ color: c.marble }}>Minarets</strong> {'\u{2014}'} Raise 4 symmetric towers</li>
          <li><strong style={{ color: c.emeraldL }}>Gardens</strong> {'\u{2014}'} Trees, fountains, and reflecting pool</li>
        </ol>
      </div>
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <button style={styles.btn} onClick={advance}>{'\u{1F3D7}'} Start Building</button>
      </div>
    </div>
  );

  // ─── Complete ────────────────────────────────
  if (phase === 'complete') return (
    <div style={styles.wrapper}>
      <div style={{ textAlign: 'center', padding: '10px 0' }}>
        <div style={{ fontSize: 44 }}>{'\u{1F54C}'}{'\u{2728}'}{'\u{1F389}'}{'\u{2728}'}{'\u{1F54C}'}</div>
        <h2 style={{ ...styles.title, fontSize: 26, marginBottom: 4 }}>Taj Mahal Complete!</h2>
        <p style={{ fontSize: 14, color: c.goldL, marginBottom: 16 }}>
          Your architectural masterpiece shines in the moonlight!
        </p>
        <div style={{ margin: '12px auto', maxWidth: 340 }}>{tajSVG(true, true, true, true)}</div>
        <div style={styles.info}>
          <div style={{ fontSize: 14, lineHeight: 1.9 }}>
            <p>{'\u{1F9F1}'} <strong>{blocks.length}</strong> marble blocks placed</p>
            <p>{'\u{1F54C}'} Grand dome with golden spire</p>
            <p>{'\u{1F3DB}'} <strong>{mins.length}</strong> minarets raised</p>
            <p>{'\u{1F333}'} <strong>{garden.length}</strong> garden elements added</p>
          </div>
        </div>
        <div style={{ ...styles.info, background: 'rgba(218,165,32,0.08)', border: `1px solid ${c.gold}` }}>
          <p style={{ fontSize: 13, color: c.goldL, fontStyle: 'italic', lineHeight: 1.7 }}>
            {'\u{1F4A1}'} <strong>Fun Fact:</strong> The real Taj Mahal took 22 years
            to build with 20,000 workers. Over 1,000 elephants carried marble
            from 300 km away. It is one of the New Seven Wonders of the World!
          </p>
        </div>
        <button style={styles.btnGold} onClick={onComplete}>{'\u{1F31F}'} Amazing!</button>
      </div>
    </div>
  );

  // ─── Building Phases ─────────────────────────
  const factText: Record<string, string> = {
    base: 'The Taj Mahal sits on a massive white marble platform raised 50 meters above the riverbank. The marble was transported from Makrana, over 300 km away!',
    dome: 'The main dome is 35 meters high and is called an "onion dome" because of its shape. It is topped with a gilded finial (spire) combining traditional Persian and Hindu designs.',
    minarets: 'The four minarets are each 40 meters tall and lean slightly outward. This was done on purpose so that if one fell, it would fall away from the main tomb!',
    gardens: 'The Charbagh gardens are divided into 4 equal parts by walkways and water channels. The reflecting pool creates a stunning mirror image of the Taj Mahal.',
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={{ ...styles.title, fontSize: 18, margin: '4px 0 8px' }}>{'\u{1F54C}'} Taj Architect</h2>

      <div style={styles.progress}>
        {['\u{1F9F1}', '\u{1F54C}', '\u{1F3DB}', '\u{1F333}'].map((ic, i) => (
          <div key={i} style={styles.step(pi === i + 1, pi > i + 1)}>{ic}</div>
        ))}
      </div>

      <div style={{ margin: '12px auto', maxWidth: 340 }}>
        {tajSVG(
          baseDone || phase !== 'base',
          domeDone || (phase !== 'base' && phase !== 'dome'),
          minsDone || !['base','dome','minarets'].includes(phase),
          gardenDone,
        )}
      </div>

      {/* Base Phase */}
      {phase === 'base' && <>
        <div style={styles.phaseLabel}>Phase 1: Lay the Marble Platform</div>
        <p style={{ fontSize: 13, color: c.muted, textAlign: 'center', marginBottom: 12 }}>
          Tap each slot to place a white marble block. Fill all 15 cells!
        </p>
        <div style={{ ...styles.grid, gridTemplateColumns: `repeat(${BASE_COLS}, 48px)` }}>
          {Array.from({ length: BASE_ROWS * BASE_COLS }).map((_, i) => {
            const r = Math.floor(i / BASE_COLS), co = i % BASE_COLS;
            const on = blocks.some(b => b.row === r && b.col === co);
            return <div key={i} style={styles.block(on)} onClick={() => placeBlock(r, co)}>{on ? '\u{2588}' : ''}</div>;
          })}
        </div>
        <p style={{ fontSize: 12, color: c.muted, textAlign: 'center' }}>{blocks.length} / {BASE_ROWS * BASE_COLS} blocks</p>
        {baseDone && <div style={{ textAlign: 'center', marginTop: 12 }}>
          <button style={styles.btn} onClick={advance}>Platform Complete! Add the Dome {'\u{2192}'}</button>
        </div>}
      </>}

      {/* Dome Phase */}
      {phase === 'dome' && <>
        <div style={styles.phaseLabel}>Phase 2: Crown the Dome</div>
        {!domeOk ? <>
          <p style={{ fontSize: 13, color: c.muted, textAlign: 'center', marginBottom: 12 }}>
            The Taj Mahal has a famous onion dome. Pick the correct proportion!
          </p>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            {DOME_OPTIONS.map(o => (
              <div key={o.id} style={styles.dome(selDome === o.id, o.correct, domeRevealed)} onClick={() => pickDome(o.id)}>
                <svg viewBox="0 0 80 80" style={{ width: 60, height: 60, display: 'block', margin: '0 auto 8px' }}>
                  <ellipse cx="40" cy={50 - o.scale * 15} rx={18 * o.scale} ry={24 * o.scale}
                    fill={selDome === o.id ? c.marble : c.shadow} stroke={c.shadow} strokeWidth="1" />
                  <rect x="25" y="52" width="30" height="16" rx="1" fill={c.shadow} opacity="0.5" />
                </svg>
                <div style={{ fontSize: 12, fontWeight: 600, color: c.text }}>{o.label}</div>
                {domeRevealed && o.correct && <div style={{ fontSize: 11, color: c.emeraldL, marginTop: 4 }}>{'\u{2705}'} Correct!</div>}
                {domeRevealed && selDome === o.id && !o.correct && <div style={{ fontSize: 11, color: '#FF6B6B', marginTop: 4 }}>{'\u{274C}'} Not quite</div>}
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            {!domeRevealed && selDome && <button style={styles.btn} onClick={confirmDome}>Confirm Dome Choice</button>}
            {domeRevealed && !domeOk && <button style={{ ...styles.btn, background: 'linear-gradient(145deg,#555,#333)' }} onClick={resetDome}>Try Again</button>}
          </div>
        </> : !spire ? <>
          <p style={{ fontSize: 13, color: c.muted, textAlign: 'center', marginBottom: 12 }}>
            Great dome choice! Now add the golden spire {'\u{1F51D}'} on top.
          </p>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div onClick={() => setSpire(true)} style={{
              display: 'inline-block', cursor: 'pointer', padding: '20px 40px', borderRadius: 12,
              border: `2px dashed ${c.goldL}`, background: 'rgba(218,165,32,0.05)', transition: 'all 0.3s',
            }}>
              <svg viewBox="0 0 80 100" style={{ width: 80, height: 100 }}>
                <ellipse cx="40" cy="55" rx="28" ry="35" fill="url(#dg)" />
                <line x1="40" y1="20" x2="40" y2="5" stroke={c.goldL} strokeWidth="3" strokeDasharray="4 3" />
                <circle cx="40" cy="4" r="4" fill={c.goldL} opacity="0.5" />
                <rect x="30" y="85" width="20" height="10" rx="1" fill={c.shadow} opacity="0.4" />
              </svg>
              <div style={{ fontSize: 12, color: c.goldL, marginTop: 4 }}>Tap to place the golden spire!</div>
            </div>
          </div>
        </> : <>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <svg viewBox="0 0 80 100" style={{ width: 80, height: 100 }}>
              <defs><linearGradient id="ld" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFF" /><stop offset="100%" stopColor={c.shadow} />
              </linearGradient></defs>
              <ellipse cx="40" cy="55" rx="28" ry="35" fill="url(#ld)" />
              <line x1="40" y1="20" x2="40" y2="5" stroke={c.gold} strokeWidth="3" />
              <circle cx="40" cy="3" r="4" fill={c.goldL} />
              <rect x="30" y="85" width="20" height="10" rx="1" fill={c.shadow} opacity="0.4" />
            </svg>
            <p style={{ fontSize: 13, color: c.emeraldL, marginTop: 8 }}>{'\u{2728}'} Beautiful! The dome and spire are in place!</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button style={styles.btn} onClick={advance}>Dome Complete! Raise the Minarets {'\u{2192}'}</button>
          </div>
        </>}
      </>}

      {/* Minarets Phase */}
      {phase === 'minarets' && <>
        <div style={styles.phaseLabel}>Phase 3: Raise the Minarets</div>
        <p style={{ fontSize: 13, color: c.muted, textAlign: 'center', marginBottom: 4 }}>
          Place minarets at the corners. Each one mirrors to the opposite side!
        </p>
        <p style={{ fontSize: 11, color: c.gold, textAlign: 'center', marginBottom: 16 }}>
          {'\u{2194}'} Symmetry is key to Mughal architecture
        </p>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto 1fr', gridTemplateRows: 'auto auto',
          gap: 8, justifyItems: 'center', alignItems: 'center', maxWidth: 320, margin: '0 auto 16px',
        }}>
          {CORNERS.filter(cn => cn.row === 0).map(cn => {
            const on = mins.includes(cn.id);
            return <div key={cn.id} style={styles.minSlot(on, minStep === 0)} onClick={() => placeMin(cn.id)}>
              <span style={{ fontSize: on ? 10 : 9, color: on ? c.shadow : c.muted }}>{on ? '\u{1F3DB}' : cn.label}</span>
            </div>;
          })}
          {/* Splice: TAJ center box spanning both rows */}
          <div style={{
            width: 80, height: 60, borderRadius: 6,
            background: `linear-gradient(180deg, ${c.marble} 0%, ${c.shadow} 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, color: c.bgDeep, fontWeight: 700, opacity: 0.7,
            gridRow: '1 / 3', gridColumn: '2',
          }}>TAJ</div>
          {/* Insert empty div to skip col 2 in row 0 -- handled by gridRow span above */}
          {CORNERS.filter(cn => cn.row === 1).map(cn => {
            const on = mins.includes(cn.id);
            return <div key={cn.id} style={styles.minSlot(on, minStep === 1)} onClick={() => placeMin(cn.id)}>
              <span style={{ fontSize: on ? 10 : 9, color: on ? c.shadow : c.muted }}>{on ? '\u{1F3DB}' : cn.label}</span>
            </div>;
          })}
        </div>
        <p style={{ fontSize: 12, color: c.muted, textAlign: 'center' }}>{mins.length} / 4 minarets placed</p>
        {minsDone && <div style={{ textAlign: 'center', marginTop: 12 }}>
          <button style={styles.btn} onClick={advance}>Minarets Complete! Add Gardens {'\u{2192}'}</button>
        </div>}
      </>}

      {/* Gardens Phase */}
      {phase === 'gardens' && <>
        <div style={styles.phaseLabel}>Phase 4: Plant the Gardens</div>
        <p style={{ fontSize: 13, color: c.muted, textAlign: 'center', marginBottom: 4 }}>
          Add the famous Charbagh gardens. Tap to place trees, fountains, and the reflecting pool!
        </p>
        <p style={{ fontSize: 11, color: c.emeraldL, textAlign: 'center', marginBottom: 16 }}>
          {'\u{1F333}'} Trees and {'\u{26F2}'} fountains auto-mirror for symmetry
        </p>
        <div style={{
          position: 'relative', width: '100%', maxWidth: 320, height: 180, margin: '0 auto 16px',
          borderRadius: 12, background: 'linear-gradient(180deg, rgba(46,139,87,0.15), rgba(46,139,87,0.05))',
          border: '1px solid rgba(46,139,87,0.25)', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', left: '50%', top: 0, width: 6, height: '100%', background: c.shadow, opacity: 0.15, transform: 'translateX(-50%)' }} />
          <div style={{ position: 'absolute', top: '50%', left: 0, height: 4, width: '100%', background: c.shadow, opacity: 0.1, transform: 'translateY(-50%)' }} />
          <div style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)', fontSize: 10, color: c.muted, opacity: 0.5 }}>
            {'\u{1F54C}'} Taj Mahal
          </div>
          {GARDEN_SLOTS.map(sl => {
            const on = garden.includes(sl.slot);
            const emoji = sl.type === 'tree' ? '\u{1F333}' : sl.type === 'fountain' ? '\u{26F2}' : '\u{1F30A}';
            return <div key={sl.slot} style={{
              ...styles.garSlot(on, sl.type), left: `${sl.x}%`, top: `${sl.y}%`,
              transform: `translate(-50%,-50%) ${on ? 'scale(1)' : 'scale(0.85)'}`,
            }} onClick={() => placeGarden(sl.slot)}>{on ? emoji : sl.label}</div>;
          })}
        </div>
        <p style={{ fontSize: 12, color: c.muted, textAlign: 'center' }}>{garden.length} / 7 garden elements</p>
        {gardenDone && <div style={{ textAlign: 'center', marginTop: 12 }}>
          <button style={styles.btn} onClick={advance}>{'\u{2728}'} Reveal Your Taj Mahal!</button>
        </div>}
      </>}

      <div style={{ ...styles.info, marginTop: 16 }}>
        <p style={{ fontSize: 12, color: c.muted, lineHeight: 1.6, margin: 0 }}>
          {'\u{1F4A1}'} {factText[phase] ?? ''}
        </p>
      </div>
    </div>
  );
}
