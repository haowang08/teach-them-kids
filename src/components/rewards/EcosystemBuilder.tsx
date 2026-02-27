import { useState, useCallback } from 'react';

// ============================================
// TYPES
// ============================================

type GamePhase = 'intro' | 'building' | 'connections' | 'complete';
type BiomeId = 'reef' | 'rainforest' | 'tundra';
type Role = 'producer' | 'consumer' | 'decomposer';

interface Organism {
  id: string;
  name: string;
  emoji: string;
  role: Role;
  connections: string[]; // IDs of organisms it connects to
  specialEvent?: string;
}

interface Biome {
  id: BiomeId;
  name: string;
  emoji: string;
  gradient: string;
  organisms: Organism[];
  missingMessage: Record<Role, string>;
}

// ============================================
// CONSTANTS
// ============================================

const ROLE_COLORS: Record<Role, string> = {
  producer: '#4caf50',
  consumer: '#ff9800',
  decomposer: '#795548',
};

const ROLE_LABELS: Record<Role, string> = {
  producer: 'Producer',
  consumer: 'Consumer',
  decomposer: 'Decomposer',
};

const BIOMES: Biome[] = [
  {
    id: 'reef',
    name: 'Coral Reef',
    emoji: '\u{1FAB8}',
    gradient: 'linear-gradient(180deg, #1a8aaa, #0e5a7a, #083a55)',
    organisms: [
      { id: 'r-coral', name: 'Coral Polyps', emoji: '\u{1FAB8}', role: 'consumer', connections: ['r-zoox'], specialEvent: 'Symbiosis! Coral + Zooxanthellae glow together!' },
      { id: 'r-zoox', name: 'Zooxanthellae', emoji: '\u{1F7E2}', role: 'producer', connections: ['r-coral'] },
      { id: 'r-seagrass', name: 'Seagrass', emoji: '\u{1F33F}', role: 'producer', connections: [] },
      { id: 'r-clownfish', name: 'Clownfish', emoji: '\u{1F41F}', role: 'consumer', connections: ['r-seagrass', 'r-zoox'] },
      { id: 'r-turtle', name: 'Sea Turtle', emoji: '\u{1F422}', role: 'consumer', connections: ['r-seagrass', 'r-coral'] },
      { id: 'r-shark', name: 'Reef Shark', emoji: '\u{1F988}', role: 'consumer', connections: ['r-clownfish', 'r-turtle'] },
      { id: 'r-urchin', name: 'Sea Urchin', emoji: '\u{1F9CA}', role: 'consumer', connections: ['r-seagrass'] },
      { id: 'r-bacteria', name: 'Marine Bacteria', emoji: '\u{1F9AB}', role: 'decomposer', connections: ['r-coral', 'r-clownfish'] },
    ],
    missingMessage: {
      producer: 'Your reef needs producers! Who provides energy through photosynthesis?',
      consumer: 'Add some animals to eat the producers and each other!',
      decomposer: 'Your ecosystem is missing decomposers! Who breaks down dead material?',
    },
  },
  {
    id: 'rainforest',
    name: 'Rainforest',
    emoji: '\u{1F333}',
    gradient: 'linear-gradient(180deg, #2d6b1e, #1a4a12, #0e2a08)',
    organisms: [
      { id: 'rf-tree', name: 'Canopy Trees', emoji: '\u{1F333}', role: 'producer', connections: [] },
      { id: 'rf-orchid', name: 'Orchid', emoji: '\u{1F33A}', role: 'producer', connections: ['rf-tree'] },
      { id: 'rf-toucan', name: 'Toucan', emoji: '\u{1F99C}', role: 'consumer', connections: ['rf-tree', 'rf-orchid'] },
      { id: 'rf-sloth', name: 'Sloth', emoji: '\u{1F9A5}', role: 'consumer', connections: ['rf-tree'] },
      { id: 'rf-jaguar', name: 'Jaguar', emoji: '\u{1F406}', role: 'consumer', connections: ['rf-sloth', 'rf-toucan'] },
      { id: 'rf-frog', name: 'Tree Frog', emoji: '\u{1F438}', role: 'consumer', connections: ['rf-ants'] },
      { id: 'rf-ants', name: 'Leaf-Cutter Ants', emoji: '\u{1F41C}', role: 'decomposer', connections: ['rf-tree'] },
      { id: 'rf-fungi', name: 'Giant Fungi', emoji: '\u{1F344}', role: 'decomposer', connections: ['rf-tree', 'rf-sloth'] },
    ],
    missingMessage: {
      producer: 'The rainforest needs its trees and plants! Add some producers!',
      consumer: 'Where are the animals? Add consumers to the ecosystem!',
      decomposer: 'Without decomposers, dead material piles up! Add fungi or ants!',
    },
  },
  {
    id: 'tundra',
    name: 'Tundra',
    emoji: '\u2744\uFE0F',
    gradient: 'linear-gradient(180deg, #b0d0e8, #8aafca, #6090aa)',
    organisms: [
      { id: 't-lichen', name: 'Lichen', emoji: '\u{1F7E2}', role: 'producer', connections: [] },
      { id: 't-moss', name: 'Arctic Moss', emoji: '\u{1FAB4}', role: 'producer', connections: [] },
      { id: 't-caribou', name: 'Caribou', emoji: '\u{1F98C}', role: 'consumer', connections: ['t-lichen', 't-moss'] },
      { id: 't-fox', name: 'Arctic Fox', emoji: '\u{1F98A}', role: 'consumer', connections: ['t-lemming'], specialEvent: 'The Arctic fox\'s fur changes from brown to white!' },
      { id: 't-lemming', name: 'Lemming', emoji: '\u{1F401}', role: 'consumer', connections: ['t-lichen', 't-moss'] },
      { id: 't-owl', name: 'Snowy Owl', emoji: '\u{1F989}', role: 'consumer', connections: ['t-lemming'] },
      { id: 't-wolf', name: 'Arctic Wolf', emoji: '\u{1F43A}', role: 'consumer', connections: ['t-caribou', 't-lemming'] },
      { id: 't-microbes', name: 'Soil Microbes', emoji: '\u{1F9AB}', role: 'decomposer', connections: ['t-lichen', 't-caribou'] },
    ],
    missingMessage: {
      producer: 'The tundra needs producers! Who grows on the frozen ground?',
      consumer: 'Add some Arctic animals to the food web!',
      decomposer: 'Without decomposers, nutrients cannot be recycled!',
    },
  },
];

const GLOBAL_CONNECTIONS = [
  { from: 'Sahara Desert', to: 'Amazon Rainforest', label: 'Dust carries phosphorus 5,000 km!' },
  { from: 'Amazon Rainforest', to: 'South American Rainfall', label: 'Flying rivers create distant rainfall' },
  { from: 'Arctic Tundra', to: 'Global Atmosphere', label: 'Thawing permafrost releases CO2 & methane' },
  { from: 'Ocean Currents', to: 'Coral Reefs', label: 'Warming waters cause coral bleaching' },
  { from: 'Deep Ocean', to: 'Surface Plankton', label: 'Plankton produce 50% of world\'s oxygen' },
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
  },
  introCard: {
    background: 'linear-gradient(135deg, #1a4a12, #0e6a5a)',
    borderRadius: 16,
    padding: 32,
    textAlign: 'center',
    color: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 800,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#ccc',
    marginBottom: 24,
    lineHeight: 1.5,
  },
  btn: {
    background: 'linear-gradient(135deg, #4caf50, #388e3c)',
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    padding: '14px 32px',
    fontSize: 18,
    fontWeight: 700,
    cursor: 'pointer',
  },
  landscape: {
    borderRadius: 16,
    padding: 20,
    minHeight: 350,
    position: 'relative',
  },
  biomeTabs: {
    display: 'flex',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 16,
  },
  biomeTab: {
    padding: '8px 16px',
    borderRadius: 20,
    border: '2px solid',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  healthBar: {
    marginBottom: 16,
  },
  healthLabel: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 4,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
  },
  healthTrack: {
    height: 14,
    background: 'rgba(255,255,255,0.2)',
    borderRadius: 7,
    overflow: 'hidden',
  },
  healthFill: {
    height: '100%',
    borderRadius: 7,
    transition: 'width 0.5s, background-color 0.5s',
  },
  placedGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 8,
    minHeight: 60,
    padding: 12,
    background: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
  },
  placedOrg: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '6px 10px',
    borderRadius: 8,
    fontSize: 11,
    fontWeight: 600,
    color: '#fff',
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.2)',
    position: 'relative',
  },
  connectionLine: {
    textAlign: 'center',
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    margin: '4px 0',
    fontStyle: 'italic',
  },
  dock: {
    background: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  dockTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  dockGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: 6,
  },
  orgCard: {
    background: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    padding: '8px 6px',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 600,
    transition: 'all 0.2s',
    border: '2px solid transparent',
  },
  warning: {
    background: 'rgba(255,152,0,0.2)',
    border: '1px solid rgba(255,152,0,0.5)',
    borderRadius: 8,
    padding: '6px 10px',
    fontSize: 12,
    color: '#ffcc80',
    textAlign: 'center',
    marginTop: 8,
  },
  specialEvent: {
    background: 'rgba(76,175,80,0.2)',
    border: '1px solid rgba(76,175,80,0.5)',
    borderRadius: 8,
    padding: '6px 10px',
    fontSize: 12,
    color: '#a5d6a7',
    textAlign: 'center',
    marginTop: 8,
  },
  connectionsPanel: {
    background: 'linear-gradient(135deg, #1a2a3a, #0a1a2a)',
    borderRadius: 16,
    padding: 24,
    color: '#fff',
    textAlign: 'center',
  },
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function EcosystemBuilder() {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [currentBiomeIndex, setCurrentBiomeIndex] = useState(0);
  const [placedByBiome, setPlacedByBiome] = useState<Record<BiomeId, Set<string>>>({
    reef: new Set(),
    rainforest: new Set(),
    tundra: new Set(),
  });
  const [specialEvents, setSpecialEvents] = useState<string[]>([]);
  const [completedBiomes, setCompletedBiomes] = useState<Set<BiomeId>>(new Set());

  const currentBiome = BIOMES[currentBiomeIndex];
  const placed = placedByBiome[currentBiome.id];

  const getHealth = useCallback((biomeId: BiomeId): number => {
    const biome = BIOMES.find(b => b.id === biomeId);
    if (!biome) return 0;
    const p = placedByBiome[biomeId];
    return Math.round((p.size / biome.organisms.length) * 100);
  }, [placedByBiome]);

  const getMissingRoles = useCallback((): Role[] => {
    const roles: Role[] = ['producer', 'consumer', 'decomposer'];
    return roles.filter(role => {
      const hasRole = currentBiome.organisms.some(o => o.role === role && placed.has(o.id));
      return !hasRole;
    });
  }, [currentBiome, placed]);

  const handlePlaceOrganism = useCallback((orgId: string) => {
    const org = currentBiome.organisms.find(o => o.id === orgId);
    if (!org || placed.has(orgId)) return;

    const newPlaced = new Set(placed);
    newPlaced.add(orgId);
    setPlacedByBiome(prev => ({ ...prev, [currentBiome.id]: newPlaced }));

    if (org.specialEvent) {
      setSpecialEvents(prev => [...prev, org.specialEvent!]);
      setTimeout(() => setSpecialEvents(prev => prev.slice(1)), 3000);
    }

    // Check if biome complete
    if (newPlaced.size === currentBiome.organisms.length) {
      const newCompleted = new Set(completedBiomes);
      newCompleted.add(currentBiome.id);
      setCompletedBiomes(newCompleted);

      if (newCompleted.size === BIOMES.length) {
        setTimeout(() => setPhase('connections'), 1000);
      }
    }
  }, [currentBiome, placed, completedBiomes]);

  const health = getHealth(currentBiome.id);
  const healthColor = health >= 80 ? '#4caf50' : health >= 40 ? '#ff9800' : '#f44336';
  const missingRoles = getMissingRoles();
  const unplaced = currentBiome.organisms.filter(o => !placed.has(o.id));

  // --- INTRO ---
  if (phase === 'intro') {
    return (
      <div style={styles.container}>
        <div style={styles.introCard}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{'\u{1F30E}'}</div>
          <h2 style={styles.title}>Ecosystem Builder</h2>
          <p style={styles.subtitle}>
            Build 3 living ecosystems! Place organisms into the correct biome and
            watch the food web come alive. Keep each ecosystem balanced and thriving!
          </p>
          <button style={styles.btn} onClick={() => setPhase('building')}>
            Start Building
          </button>
        </div>
      </div>
    );
  }

  // --- COMPLETE ---
  if (phase === 'complete') {
    return (
      <div style={styles.container}>
        <div style={styles.introCard}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{'\u{1F3C6}'}</div>
          <h2 style={styles.title}>All Ecosystems Thriving!</h2>
          <p style={styles.subtitle}>
            You built balanced ecosystems across coral reefs, rainforests, and the tundra!
            And you discovered that all ecosystems are connected through global cycles
            of water, carbon, and energy. Pull one thread, and the whole tapestry shifts.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 16 }}>
            {BIOMES.map(b => (
              <div key={b.id} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36 }}>{b.emoji}</div>
                <div style={{ fontSize: 12, color: '#ccc' }}>{b.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- CONNECTIONS ---
  if (phase === 'connections') {
    return (
      <div style={styles.container}>
        <div style={styles.connectionsPanel}>
          <h2 style={styles.title}>Global Connections</h2>
          <p style={{ fontSize: 14, color: '#aaa', marginBottom: 20 }}>
            No ecosystem exists in isolation. They are all connected!
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {GLOBAL_CONNECTIONS.map((gc, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 10,
                padding: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 13,
              }}>
                <span style={{ fontWeight: 700, color: '#4caf50', minWidth: 100 }}>{gc.from}</span>
                <span style={{ color: '#888' }}>{'\u2192'}</span>
                <span style={{ fontWeight: 700, color: '#2196f3', minWidth: 100 }}>{gc.to}</span>
                <span style={{ color: '#ccc', flex: 1, textAlign: 'right' }}>{gc.label}</span>
              </div>
            ))}
          </div>
          <button
            style={{ ...styles.btn, marginTop: 20 }}
            onClick={() => setPhase('complete')}
          >
            Complete! {'\u{1F30E}'}
          </button>
        </div>
      </div>
    );
  }

  // --- BUILDING ---
  return (
    <div style={styles.container}>
      {/* Biome Tabs */}
      <div style={styles.biomeTabs}>
        {BIOMES.map((b, i) => (
          <button
            key={b.id}
            onClick={() => setCurrentBiomeIndex(i)}
            style={{
              ...styles.biomeTab,
              borderColor: i === currentBiomeIndex ? '#fff' : 'rgba(255,255,255,0.3)',
              background: completedBiomes.has(b.id) ? 'rgba(76,175,80,0.3)' : i === currentBiomeIndex ? 'rgba(255,255,255,0.15)' : 'transparent',
              color: '#fff',
            }}
          >
            {b.emoji} {b.name} {completedBiomes.has(b.id) ? '\u2713' : ''}
          </button>
        ))}
      </div>

      <div style={{ ...styles.landscape, background: currentBiome.gradient }}>
        {/* Health Bar */}
        <div style={styles.healthBar}>
          <div style={{ ...styles.healthLabel, color: 'rgba(255,255,255,0.7)' }}>
            Ecosystem Health: {health}%
          </div>
          <div style={styles.healthTrack}>
            <div style={{ ...styles.healthFill, width: `${health}%`, backgroundColor: healthColor }} />
          </div>
        </div>

        {/* Placed organisms */}
        <div style={styles.placedGrid}>
          {placed.size === 0 && (
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, padding: 16 }}>
              Click organisms below to place them here
            </div>
          )}
          {currentBiome.organisms.filter(o => placed.has(o.id)).map(o => (
            <div key={o.id} style={styles.placedOrg}>
              <span style={{ fontSize: 24 }}>{o.emoji}</span>
              <span>{o.name}</span>
              <span style={{
                fontSize: 9,
                color: ROLE_COLORS[o.role],
                textTransform: 'uppercase',
                fontWeight: 800,
              }}>
                {ROLE_LABELS[o.role]}
              </span>
            </div>
          ))}
        </div>

        {/* Food web connections (simplified text) */}
        {placed.size >= 2 && (
          <div style={styles.connectionLine}>
            {'\u{1F517}'} {placed.size} organisms connected in the food web
          </div>
        )}

        {/* Special events */}
        {specialEvents.map((event, i) => (
          <div key={i} style={styles.specialEvent}>
            {'\u2728'} {event}
          </div>
        ))}

        {/* Missing role warnings */}
        {placed.size > 0 && missingRoles.length > 0 && (
          <div style={styles.warning}>
            {'\u26A0\uFE0F'} {currentBiome.missingMessage[missingRoles[0]]}
          </div>
        )}

        {/* Organism dock */}
        {unplaced.length > 0 && (
          <div style={styles.dock}>
            <div style={styles.dockTitle}>Species Dock ({unplaced.length} remaining)</div>
            <div style={styles.dockGrid}>
              {unplaced.map(o => (
                <div
                  key={o.id}
                  onClick={() => handlePlaceOrganism(o.id)}
                  style={{
                    ...styles.orgCard,
                    borderColor: ROLE_COLORS[o.role],
                    color: '#333',
                  }}
                >
                  <div style={{ fontSize: 22 }}>{o.emoji}</div>
                  {o.name}
                  <div style={{ fontSize: 9, color: ROLE_COLORS[o.role], fontWeight: 800, textTransform: 'uppercase' }}>
                    {ROLE_LABELS[o.role]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Complete biome message */}
        {completedBiomes.has(currentBiome.id) && unplaced.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#4caf50' }}>
              {'\u2713'} {currentBiome.name} ecosystem is thriving!
            </div>
            {currentBiomeIndex < BIOMES.length - 1 && !completedBiomes.has(BIOMES[currentBiomeIndex + 1].id) && (
              <button
                style={{ ...styles.btn, marginTop: 8, fontSize: 14, padding: '10px 20px' }}
                onClick={() => setCurrentBiomeIndex(currentBiomeIndex + 1)}
              >
                Next Biome: {BIOMES[currentBiomeIndex + 1].emoji} {BIOMES[currentBiomeIndex + 1].name} {'\u2192'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
