import { useState, useCallback } from 'react';

// ============================================
// TYPES
// ============================================

type GamePhase = 'intro' | 'choose' | 'result' | 'complete';

interface GaugeState {
  temperature: number;  // degrees C above pre-industrial
  co2: number;          // ppm
  seaLevel: number;     // cm rise
  renewable: number;    // percentage
}

interface ActionCard {
  id: string;
  name: string;
  emoji: string;
  category: 'energy' | 'nature' | 'technology' | 'society';
  description: string;
  deltaCO2: number;
  deltaTemp: number;
  deltaSeaLevel: number;
  deltaRenewable: number;
  delayed?: boolean; // takes effect next turn
}

// ============================================
// CONSTANTS
// ============================================

const DECADES = ['2025', '2035', '2045', '2055', '2065'];

const CATEGORY_COLORS: Record<string, string> = {
  energy: '#eab308',
  nature: '#22c55e',
  technology: '#3b82f6',
  society: '#a855f7',
};

const CATEGORY_LABELS: Record<string, string> = {
  energy: 'Energy',
  nature: 'Nature',
  technology: 'Technology',
  society: 'Society',
};

const ALL_CARDS: ActionCard[][] = [
  // Decade 1 (2025)
  [
    { id: 'solar-1', name: 'Build Solar Farms', emoji: '\u2600\uFE0F', category: 'energy', description: 'Cover deserts with solar panels', deltaCO2: -15, deltaTemp: -0.05, deltaSeaLevel: -0.5, deltaRenewable: 10 },
    { id: 'coal-1', name: 'Keep Burning Coal', emoji: '\u{1F3ED}', category: 'energy', description: 'Cheaper energy but more pollution', deltaCO2: 20, deltaTemp: 0.12, deltaSeaLevel: 1.5, deltaRenewable: -5 },
    { id: 'forest-1', name: 'Protect Rainforests', emoji: '\u{1F333}', category: 'nature', description: 'Stop deforestation in the Amazon', deltaCO2: -8, deltaTemp: -0.03, deltaSeaLevel: -0.3, deltaRenewable: 0 },
    { id: 'ev-1', name: 'Electric Vehicle Push', emoji: '\u{1F697}', category: 'technology', description: 'Replace gas cars with electric ones', deltaCO2: -5, deltaTemp: -0.02, deltaSeaLevel: -0.2, deltaRenewable: 3 },
    { id: 'edu-1', name: 'Climate Education', emoji: '\u{1F4DA}', category: 'society', description: 'Teach everyone about climate science', deltaCO2: -2, deltaTemp: -0.01, deltaSeaLevel: 0, deltaRenewable: 2 },
  ],
  // Decade 2 (2035)
  [
    { id: 'wind-2', name: 'Invest in Wind Power', emoji: '\u{1F32C}\uFE0F', category: 'energy', description: 'Build offshore wind turbines', deltaCO2: -10, deltaTemp: -0.04, deltaSeaLevel: -0.4, deltaRenewable: 8 },
    { id: 'deforest-2', name: 'Allow Deforestation', emoji: '\u{1FAA8}', category: 'nature', description: 'Clear forests for farming', deltaCO2: 12, deltaTemp: 0.08, deltaSeaLevel: 1, deltaRenewable: 0 },
    { id: 'trees-2', name: 'Plant 1 Billion Trees', emoji: '\u{1F332}', category: 'nature', description: 'Massive reforestation campaign', deltaCO2: -5, deltaTemp: -0.02, deltaSeaLevel: -0.2, deltaRenewable: 0 },
    { id: 'capture-2', name: 'Carbon Capture Research', emoji: '\u{1F9EA}', category: 'technology', description: 'Machines that pull CO2 from the air', deltaCO2: -3, deltaTemp: -0.01, deltaSeaLevel: -0.1, deltaRenewable: 0, delayed: true },
    { id: 'youth-2', name: 'Youth Climate Movement', emoji: '\u{1F4E3}', category: 'society', description: 'Young people demand climate action', deltaCO2: -4, deltaTemp: -0.01, deltaSeaLevel: -0.1, deltaRenewable: 3 },
  ],
  // Decade 3 (2045)
  [
    { id: 'nuclear-3', name: 'Clean Nuclear Energy', emoji: '\u2622\uFE0F', category: 'energy', description: 'Safe modern nuclear reactors', deltaCO2: -12, deltaTemp: -0.05, deltaSeaLevel: -0.5, deltaRenewable: 12 },
    { id: 'ocean-3', name: 'Restore Ocean Kelp', emoji: '\u{1F33F}', category: 'nature', description: 'Kelp forests absorb massive CO2', deltaCO2: -6, deltaTemp: -0.02, deltaSeaLevel: -0.3, deltaRenewable: 0 },
    { id: 'insulate-3', name: 'Insulate All Buildings', emoji: '\u{1F3E0}', category: 'technology', description: 'Reduce heating/cooling energy waste', deltaCO2: -3, deltaTemp: -0.01, deltaSeaLevel: -0.1, deltaRenewable: 2 },
    { id: 'expand-fossil-3', name: 'Expand Fossil Fuels', emoji: '\u{1F6E2}\uFE0F', category: 'energy', description: 'Drill for more oil and gas', deltaCO2: 18, deltaTemp: 0.1, deltaSeaLevel: 1.2, deltaRenewable: -8 },
    { id: 'green-city-3', name: 'Green City Design', emoji: '\u{1F3D9}\uFE0F', category: 'society', description: 'Walkable cities with public transit', deltaCO2: -5, deltaTemp: -0.02, deltaSeaLevel: -0.2, deltaRenewable: 4 },
  ],
  // Decade 4 (2055)
  [
    { id: 'fusion-4', name: 'Fusion Power Breakthrough', emoji: '\u{1F31F}', category: 'technology', description: 'Limitless clean energy from hydrogen fusion', deltaCO2: -18, deltaTemp: -0.08, deltaSeaLevel: -0.8, deltaRenewable: 15 },
    { id: 'permafrost-4', name: 'Permafrost Thawing', emoji: '\u{1F9CA}', category: 'nature', description: 'Melting permafrost releases trapped methane', deltaCO2: 10, deltaTemp: 0.06, deltaSeaLevel: 0.8, deltaRenewable: 0 },
    { id: 'smart-grid-4', name: 'Smart Energy Grid', emoji: '\u26A1', category: 'technology', description: 'AI-managed power distribution', deltaCO2: -7, deltaTemp: -0.03, deltaSeaLevel: -0.3, deltaRenewable: 6 },
    { id: 'restore-4', name: 'Restore Wetlands', emoji: '\u{1F426}', category: 'nature', description: 'Wetlands store carbon and reduce floods', deltaCO2: -4, deltaTemp: -0.02, deltaSeaLevel: -0.3, deltaRenewable: 0 },
    { id: 'global-treaty-4', name: 'Global Climate Treaty', emoji: '\u{1F30D}', category: 'society', description: 'All nations agree to emission cuts', deltaCO2: -10, deltaTemp: -0.04, deltaSeaLevel: -0.4, deltaRenewable: 5 },
  ],
  // Decade 5 (2065)
  [
    { id: 'space-solar-5', name: 'Space Solar Satellites', emoji: '\u{1F6F0}\uFE0F', category: 'energy', description: 'Solar panels in orbit beam energy down', deltaCO2: -14, deltaTemp: -0.06, deltaSeaLevel: -0.6, deltaRenewable: 12 },
    { id: 'ocean-acid-5', name: 'Ocean Acidification Crisis', emoji: '\u{1F9AA}', category: 'nature', description: 'Coral reefs dying from acid oceans', deltaCO2: 8, deltaTemp: 0.04, deltaSeaLevel: 0.6, deltaRenewable: 0 },
    { id: 'carbon-mineral-5', name: 'Carbon Mineralization', emoji: '\u{1FAA8}', category: 'technology', description: 'Turn CO2 permanently into rock', deltaCO2: -10, deltaTemp: -0.04, deltaSeaLevel: -0.4, deltaRenewable: 0 },
    { id: 'circular-econ-5', name: 'Circular Economy', emoji: '\u267B\uFE0F', category: 'society', description: 'Zero waste: everything is reused or recycled', deltaCO2: -6, deltaTemp: -0.02, deltaSeaLevel: -0.2, deltaRenewable: 3 },
    { id: 'do-nothing-5', name: 'Business as Usual', emoji: '\u{1F937}', category: 'energy', description: 'No new policies, keep current path', deltaCO2: 15, deltaTemp: 0.08, deltaSeaLevel: 1, deltaRenewable: -3 },
  ],
];

const INITIAL_GAUGES: GaugeState = {
  temperature: 1.1,
  co2: 425,
  seaLevel: 24,
  renewable: 30,
};

// "Do nothing" scenario for comparison
const DO_NOTHING_FINAL: GaugeState = {
  temperature: 3.8,
  co2: 560,
  seaLevel: 45,
  renewable: 18,
};

const BEST_POSSIBLE: GaugeState = {
  temperature: 1.5,
  co2: 350,
  seaLevel: 26,
  renewable: 95,
};

// ============================================
// STYLES
// ============================================

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 680,
    margin: '0 auto',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    userSelect: 'none',
  },
  dashboardBg: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 20,
    border: '1px solid #1e293b',
  },
  gaugeRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 10,
    marginBottom: 16,
  },
  gaugeCard: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: '10px 14px',
    position: 'relative',
    overflow: 'hidden',
  },
  gaugeLabel: {
    fontSize: 11,
    color: '#94a3b8',
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
    fontWeight: 600,
    marginBottom: 4,
  },
  gaugeValue: {
    fontSize: 22,
    fontWeight: 800,
    fontVariantNumeric: 'tabular-nums',
    transition: 'color 0.5s',
  },
  gaugeBar: {
    height: 4,
    borderRadius: 2,
    marginTop: 6,
    backgroundColor: '#334155',
    overflow: 'hidden',
  },
  gaugeBarFill: {
    height: '100%',
    borderRadius: 2,
    transition: 'width 1s ease, background-color 1s ease',
  },
  globe: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    margin: '0 auto 16px',
    position: 'relative',
    transition: 'background 1s ease, box-shadow 1s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 60,
  },
  decadeBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: '0 4px',
  },
  decadeLabel: {
    fontSize: 12,
    fontWeight: 700,
    padding: '4px 10px',
    borderRadius: 6,
    transition: 'background-color 0.3s, color 0.3s',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: 10,
    marginBottom: 16,
  },
  actionCard: {
    borderRadius: 10,
    padding: 12,
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
    border: '2px solid transparent',
    textAlign: 'center' as const,
    position: 'relative',
  },
  cardEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  cardName: {
    fontSize: 13,
    fontWeight: 700,
    color: '#e2e8f0',
    marginBottom: 4,
    lineHeight: 1.3,
  },
  cardDesc: {
    fontSize: 11,
    color: '#94a3b8',
    lineHeight: 1.3,
  },
  cardBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    fontSize: 9,
    fontWeight: 700,
    padding: '2px 6px',
    borderRadius: 4,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
  confirmBtn: {
    display: 'block',
    width: '100%',
    padding: '12px 24px',
    borderRadius: 10,
    border: 'none',
    backgroundColor: '#22c55e',
    color: '#fff',
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'background-color 0.2s, opacity 0.2s',
  },
  resultPanel: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: '16px 20px',
    marginTop: 12,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#e2e8f0',
    marginBottom: 10,
  },
  resultItem: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 6,
    lineHeight: 1.5,
  },
  nextBtn: {
    display: 'inline-block',
    marginTop: 12,
    padding: '10px 28px',
    borderRadius: 8,
    border: 'none',
    backgroundColor: '#3b82f6',
    color: '#fff',
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  introCard: {
    textAlign: 'center' as const,
    padding: 32,
    backgroundColor: '#0f172a',
    borderRadius: 16,
    border: '1px solid #1e293b',
  },
  introTitle: {
    fontSize: 28,
    fontWeight: 800,
    color: '#3b82f6',
    marginBottom: 8,
  },
  introSubtitle: {
    fontSize: 15,
    color: '#94a3b8',
    marginBottom: 24,
    lineHeight: 1.6,
    maxWidth: 500,
    margin: '0 auto 24px',
  },
  startBtn: {
    padding: '14px 40px',
    borderRadius: 10,
    border: 'none',
    backgroundColor: '#3b82f6',
    color: '#fff',
    fontSize: 17,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  completeCard: {
    textAlign: 'center' as const,
    padding: 28,
    backgroundColor: '#0f172a',
    borderRadius: 16,
    border: '2px solid #3b82f6',
  },
  completeTitle: {
    fontSize: 26,
    fontWeight: 800,
    marginBottom: 8,
  },
  completeSubtitle: {
    fontSize: 15,
    color: '#94a3b8',
    marginBottom: 20,
    lineHeight: 1.6,
  },
  comparisonBar: {
    marginBottom: 8,
  },
  compLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 4,
    display: 'flex',
    justifyContent: 'space-between',
  },
  compBarTrack: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#334155',
    overflow: 'hidden',
  },
  compBarFill: {
    height: '100%',
    borderRadius: 5,
    transition: 'width 1s ease',
  },
  selectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 6,
  },
};

// ============================================
// HELPERS
// ============================================

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function getTemperatureColor(temp: number): string {
  if (temp < 1.5) return '#22c55e';
  if (temp < 2.0) return '#eab308';
  if (temp < 3.0) return '#f97316';
  return '#ef4444';
}

function getCO2Color(co2: number): string {
  if (co2 < 380) return '#22c55e';
  if (co2 < 430) return '#eab308';
  if (co2 < 480) return '#f97316';
  return '#ef4444';
}

function getRenewableColor(pct: number): string {
  if (pct >= 80) return '#22c55e';
  if (pct >= 50) return '#3b82f6';
  if (pct >= 30) return '#eab308';
  return '#ef4444';
}

function getGlobeEmoji(temp: number): string {
  if (temp < 1.5) return '\u{1F30D}';
  if (temp < 2.5) return '\u{1F30E}';
  return '\u{1F525}';
}

function getGlobeShadow(temp: number): string {
  if (temp < 1.5) return '0 0 30px rgba(34,197,94,0.3)';
  if (temp < 2.0) return '0 0 30px rgba(234,179,8,0.3)';
  if (temp < 3.0) return '0 0 30px rgba(249,115,22,0.4)';
  return '0 0 30px rgba(239,68,68,0.5)';
}

// ============================================
// COMPONENT
// ============================================

export default function ClimateDashboard() {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [decade, setDecade] = useState(0);
  const [gauges, setGauges] = useState<GaugeState>({ ...INITIAL_GAUGES });
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [resultMessages, setResultMessages] = useState<string[]>([]);
  const [delayedEffects, setDelayedEffects] = useState<ActionCard[]>([]);

  const currentCards = ALL_CARDS[decade] || [];

  const toggleCard = useCallback(
    (cardId: string) => {
      if (phase !== 'choose') return;
      setSelectedCards((prev) => {
        if (prev.includes(cardId)) {
          return prev.filter((id) => id !== cardId);
        }
        if (prev.length >= 2) return prev;
        return [...prev, cardId];
      });
    },
    [phase],
  );

  const applyCards = useCallback(() => {
    if (selectedCards.length !== 2) return;

    const chosen = selectedCards
      .map((id) => currentCards.find((c) => c.id === id))
      .filter(Boolean) as ActionCard[];

    // Apply delayed effects from previous turns
    const allEffects = [...chosen, ...delayedEffects];
    const newDelayed: ActionCard[] = [];

    let dCO2 = 0;
    let dTemp = 0;
    let dSea = 0;
    let dRenew = 0;
    const messages: string[] = [];

    for (const card of allEffects) {
      if (card.delayed && !delayedEffects.includes(card)) {
        newDelayed.push({ ...card, delayed: false });
        messages.push(`\u{1F52C} ${card.name}: Research started! Effects will show next decade.`);
        continue;
      }
      dCO2 += card.deltaCO2;
      dTemp += card.deltaTemp;
      dSea += card.deltaSeaLevel;
      dRenew += card.deltaRenewable;

      if (card.deltaCO2 < 0) {
        messages.push(`\u2705 ${card.name}: CO\u2082 reduced by ${Math.abs(card.deltaCO2)} ppm!`);
      } else if (card.deltaCO2 > 0) {
        messages.push(`\u26A0\uFE0F ${card.name}: CO\u2082 increased by ${card.deltaCO2} ppm.`);
      }
    }

    // Natural baseline increase per decade
    const baselineIncrease = { co2: 8, temp: 0.06, sea: 1.2 };

    setGauges((prev) => ({
      temperature: clamp(
        Number((prev.temperature + dTemp + baselineIncrease.temp).toFixed(2)),
        0,
        6,
      ),
      co2: clamp(Math.round(prev.co2 + dCO2 + baselineIncrease.co2), 280, 700),
      seaLevel: clamp(
        Number((prev.seaLevel + dSea + baselineIncrease.sea).toFixed(1)),
        0,
        100,
      ),
      renewable: clamp(Math.round(prev.renewable + dRenew), 0, 100),
    }));

    setDelayedEffects(newDelayed);
    setResultMessages(messages);
    setPhase('result');
  }, [selectedCards, currentCards, delayedEffects]);

  const nextDecade = useCallback(() => {
    const next = decade + 1;
    if (next >= DECADES.length) {
      setPhase('complete');
    } else {
      setDecade(next);
      setSelectedCards([]);
      setResultMessages([]);
      setPhase('choose');
    }
  }, [decade]);

  // ── INTRO ──
  if (phase === 'intro') {
    return (
      <div style={styles.container}>
        <div style={styles.introCard}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{'\u{1F30D}'}</div>
          <div style={styles.introTitle}>Climate Action Dashboard</div>
          <div style={styles.introSubtitle}>
            You are Earth's Climate Director! Make policy and technology choices over 5 decades
            (2025-2075). Every decision affects temperature, CO{'\u2082'}, sea levels, and renewable
            energy. Can you keep warming under 2{'\u00B0'}C?
          </div>
          <button
            style={styles.startBtn}
            onClick={() => setPhase('choose')}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'scale(1)';
            }}
          >
            Take Command
          </button>
        </div>
      </div>
    );
  }

  // ── COMPLETE ──
  if (phase === 'complete') {
    const underTwo = gauges.temperature <= 2.0;
    const tempPct = clamp(((gauges.temperature - 1.0) / 3.0) * 100, 0, 100);
    const doNothingPct = clamp(((DO_NOTHING_FINAL.temperature - 1.0) / 3.0) * 100, 0, 100);
    const bestPct = clamp(((BEST_POSSIBLE.temperature - 1.0) / 3.0) * 100, 0, 100);

    return (
      <div style={styles.container}>
        <div style={styles.completeCard}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>
            {underTwo ? '\u{1F389}' : '\u{1F30D}'}
          </div>
          <div
            style={{
              ...styles.completeTitle,
              color: underTwo ? '#22c55e' : '#f97316',
            }}
          >
            {underTwo ? 'Mission Accomplished!' : 'A Tough Road Ahead'}
          </div>
          <div style={styles.completeSubtitle}>
            {underTwo
              ? `You kept warming to just ${gauges.temperature.toFixed(1)}\u00B0C! Coral reefs survived, ice caps stabilized, and renewable energy powers ${gauges.renewable}% of the grid. Your choices made a real difference!`
              : `Warming reached ${gauges.temperature.toFixed(1)}\u00B0C \u2014 but every action still helped slow the damage. In real life, it's never too late to act. The choices we make today shape the future.`}
          </div>

          {/* Comparison bars */}
          <div style={{ maxWidth: 400, margin: '0 auto 20px', textAlign: 'left' as const }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0', marginBottom: 12 }}>
              Temperature Comparison
            </div>
            {/* Best possible */}
            <div style={styles.comparisonBar}>
              <div style={styles.compLabel}>
                <span>Best Possible</span>
                <span>{BEST_POSSIBLE.temperature.toFixed(1)}{'\u00B0'}C</span>
              </div>
              <div style={styles.compBarTrack}>
                <div style={{ ...styles.compBarFill, width: `${bestPct}%`, backgroundColor: '#22c55e' }} />
              </div>
            </div>
            {/* Your result */}
            <div style={styles.comparisonBar}>
              <div style={styles.compLabel}>
                <span style={{ fontWeight: 700, color: '#e2e8f0' }}>Your Result</span>
                <span style={{ fontWeight: 700, color: '#e2e8f0' }}>{gauges.temperature.toFixed(1)}{'\u00B0'}C</span>
              </div>
              <div style={styles.compBarTrack}>
                <div
                  style={{
                    ...styles.compBarFill,
                    width: `${tempPct}%`,
                    backgroundColor: getTemperatureColor(gauges.temperature),
                  }}
                />
              </div>
            </div>
            {/* Do nothing */}
            <div style={styles.comparisonBar}>
              <div style={styles.compLabel}>
                <span>Do Nothing</span>
                <span>{DO_NOTHING_FINAL.temperature.toFixed(1)}{'\u00B0'}C</span>
              </div>
              <div style={styles.compBarTrack}>
                <div style={{ ...styles.compBarFill, width: `${doNothingPct}%`, backgroundColor: '#ef4444' }} />
              </div>
            </div>
          </div>

          {/* Final stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 8,
              maxWidth: 360,
              margin: '0 auto 16px',
            }}
          >
            <div style={{ backgroundColor: '#1e293b', borderRadius: 8, padding: '8px 12px' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: getCO2Color(gauges.co2) }}>
                {gauges.co2} ppm
              </div>
              <div style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase' as const }}>
                CO{'\u2082'} Level
              </div>
            </div>
            <div style={{ backgroundColor: '#1e293b', borderRadius: 8, padding: '8px 12px' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: getRenewableColor(gauges.renewable) }}>
                {gauges.renewable}%
              </div>
              <div style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase' as const }}>
                Renewable Energy
              </div>
            </div>
          </div>

          <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6, maxWidth: 460, margin: '0 auto' }}>
            Every choice matters. Solar energy costs have dropped 90% since 2010. Wind power is
            the cheapest new electricity in most countries. The solutions exist {'\u2014'} we just
            need to choose them.
          </div>
        </div>
      </div>
    );
  }

  // ── CHOOSE / RESULT ──
  return (
    <div style={styles.container}>
      <div style={styles.dashboardBg}>
        {/* Decade timeline */}
        <div style={styles.decadeBar}>
          {DECADES.map((d, i) => (
            <div
              key={d}
              style={{
                ...styles.decadeLabel,
                backgroundColor: i === decade ? '#3b82f6' : i < decade ? '#1e293b' : '#0f172a',
                color: i === decade ? '#fff' : i < decade ? '#64748b' : '#334155',
              }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Globe */}
        <div
          style={{
            ...styles.globe,
            boxShadow: getGlobeShadow(gauges.temperature),
          }}
        >
          {getGlobeEmoji(gauges.temperature)}
        </div>

        {/* Gauges */}
        <div style={styles.gaugeRow}>
          {/* Temperature */}
          <div style={styles.gaugeCard}>
            <div style={styles.gaugeLabel}>{'\u{1F321}\uFE0F'} Temperature</div>
            <div style={{ ...styles.gaugeValue, color: getTemperatureColor(gauges.temperature) }}>
              +{gauges.temperature.toFixed(1)}{'\u00B0'}C
            </div>
            <div style={styles.gaugeBar}>
              <div
                style={{
                  ...styles.gaugeBarFill,
                  width: `${clamp((gauges.temperature / 4) * 100, 0, 100)}%`,
                  backgroundColor: getTemperatureColor(gauges.temperature),
                }}
              />
            </div>
          </div>

          {/* CO2 */}
          <div style={styles.gaugeCard}>
            <div style={styles.gaugeLabel}>{'\u{1F4A8}'} CO{'\u2082'} Level</div>
            <div style={{ ...styles.gaugeValue, color: getCO2Color(gauges.co2) }}>
              {gauges.co2} ppm
            </div>
            <div style={styles.gaugeBar}>
              <div
                style={{
                  ...styles.gaugeBarFill,
                  width: `${clamp(((gauges.co2 - 280) / 280) * 100, 0, 100)}%`,
                  backgroundColor: getCO2Color(gauges.co2),
                }}
              />
            </div>
          </div>

          {/* Sea Level */}
          <div style={styles.gaugeCard}>
            <div style={styles.gaugeLabel}>{'\u{1F30A}'} Sea Level Rise</div>
            <div
              style={{
                ...styles.gaugeValue,
                color: gauges.seaLevel > 35 ? '#ef4444' : gauges.seaLevel > 28 ? '#eab308' : '#3b82f6',
              }}
            >
              {gauges.seaLevel.toFixed(1)} cm
            </div>
            <div style={styles.gaugeBar}>
              <div
                style={{
                  ...styles.gaugeBarFill,
                  width: `${clamp((gauges.seaLevel / 60) * 100, 0, 100)}%`,
                  backgroundColor: gauges.seaLevel > 35 ? '#ef4444' : '#3b82f6',
                }}
              />
            </div>
          </div>

          {/* Renewable */}
          <div style={styles.gaugeCard}>
            <div style={styles.gaugeLabel}>{'\u2600\uFE0F'} Renewable Energy</div>
            <div style={{ ...styles.gaugeValue, color: getRenewableColor(gauges.renewable) }}>
              {gauges.renewable}%
            </div>
            <div style={styles.gaugeBar}>
              <div
                style={{
                  ...styles.gaugeBarFill,
                  width: `${gauges.renewable}%`,
                  backgroundColor: getRenewableColor(gauges.renewable),
                }}
              />
            </div>
          </div>
        </div>

        {/* Action cards or result */}
        {phase === 'choose' ? (
          <>
            <div
              style={{
                fontSize: 14,
                color: '#94a3b8',
                marginBottom: 10,
                fontWeight: 600,
              }}
            >
              Choose 2 actions for the {DECADES[decade]}s decade:
              <span style={{ color: '#e2e8f0', marginLeft: 6 }}>
                {selectedCards.length}/2 selected
              </span>
            </div>

            <div style={styles.cardGrid}>
              {currentCards.map((card) => {
                const isSelected = selectedCards.includes(card.id);
                const catColor = CATEGORY_COLORS[card.category];
                return (
                  <div
                    key={card.id}
                    style={{
                      ...styles.actionCard,
                      backgroundColor: '#0f172a',
                      borderColor: isSelected ? '#22c55e' : 'transparent',
                      boxShadow: isSelected ? '0 0 12px rgba(34,197,94,0.3)' : 'none',
                    }}
                    onClick={() => toggleCard(card.id)}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.03)';
                        (e.currentTarget as HTMLDivElement).style.borderColor = '#475569';
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                      if (!isSelected) {
                        (e.currentTarget as HTMLDivElement).style.borderColor = 'transparent';
                      }
                    }}
                  >
                    <div
                      style={{
                        ...styles.cardBadge,
                        backgroundColor: catColor,
                        color: '#000',
                      }}
                    >
                      {CATEGORY_LABELS[card.category]}
                    </div>
                    <div style={styles.cardEmoji}>{card.emoji}</div>
                    <div style={styles.cardName}>{card.name}</div>
                    <div style={styles.cardDesc}>{card.description}</div>
                    {isSelected && (
                      <div style={styles.selectedOverlay}>
                        <span style={{ fontSize: 16 }}>{'\u2705'}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              style={{
                ...styles.confirmBtn,
                opacity: selectedCards.length === 2 ? 1 : 0.4,
                cursor: selectedCards.length === 2 ? 'pointer' : 'not-allowed',
              }}
              onClick={selectedCards.length === 2 ? applyCards : undefined}
            >
              Apply Choices {'\u2192'}
            </button>
          </>
        ) : (
          /* Result phase */
          <div style={styles.resultPanel}>
            <div style={styles.resultTitle}>
              {DECADES[decade]}s Decade Results
            </div>
            {resultMessages.map((msg, i) => (
              <div key={i} style={styles.resultItem}>
                {msg}
              </div>
            ))}
            <button
              style={styles.nextBtn}
              onClick={nextDecade}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = '#3b82f6';
              }}
            >
              {decade + 1 >= DECADES.length
                ? 'See Final Results'
                : `Next Decade: ${DECADES[decade + 1]}s \u2192`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
