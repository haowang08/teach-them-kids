'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

// ---------- Types ----------

type Grid = boolean[][];

interface Preset {
  name: string;
  label: string;
  grid: Grid;
  description: string;
}

// ---------- Constants ----------

const NUM_BEATS = 8;
const NUM_INSTRUMENTS = 4;
const INSTRUMENTS = ['Kick', 'Snare', 'Hi-hat', 'Clap'] as const;

const ROW_COLORS: Record<number, { active: string; glow: string; dim: string }> = {
  0: { active: '#ff4422', glow: '0 0 12px #ff4422, 0 0 24px #ff442288', dim: '#551a10' },  // Kick - deep red/orange
  1: { active: '#22aaff', glow: '0 0 12px #22aaff, 0 0 24px #22aaff88', dim: '#0d3355' },  // Snare - electric blue
  2: { active: '#ffcc00', glow: '0 0 12px #ffcc00, 0 0 24px #ffcc0088', dim: '#554400' },  // Hi-hat - golden yellow
  3: { active: '#bb44ff', glow: '0 0 12px #bb44ff, 0 0 24px #bb44ff88', dim: '#3d1555' },  // Clap - purple
};

function emptyGrid(): Grid {
  return Array.from({ length: NUM_INSTRUMENTS }, () => Array(NUM_BEATS).fill(false));
}

// ---------- Presets ----------

const PRESETS: Preset[] = [
  {
    name: 'ancient',
    label: 'Ancient Drum',
    description: 'Ancient civilizations used simple, powerful drum patterns in rituals and ceremonies. Feel the primal beat!',
    grid: [
      [true, false, false, false, true, false, false, false],   // Kick on 1, 5
      [false, false, false, false, false, false, false, false], // Snare off
      [false, false, false, false, false, false, false, false], // Hi-hat off
      [false, false, true, false, false, false, true, false],   // Clap on 3, 7
    ],
  },
  {
    name: 'medieval',
    label: 'Medieval March',
    description: 'Medieval soldiers marched to steady rhythms. The strong downbeats kept everyone in step!',
    grid: [
      [true, false, true, false, true, false, true, false],     // Kick every other
      [false, false, true, false, false, false, true, false],   // Snare on 3, 7
      [true, true, true, true, true, true, true, true],         // Hi-hat every beat
      [false, false, false, false, false, false, false, false], // Clap off
    ],
  },
  {
    name: 'jazz',
    label: 'Jazz Swing',
    description: 'Jazz from the 1920s introduced swing feel and syncopation. Notice how beats land on unexpected spots!',
    grid: [
      [true, false, false, true, false, false, true, false],    // Kick syncopated
      [false, false, true, false, false, false, true, false],   // Snare on 3, 7
      [true, false, true, true, true, false, true, true],       // Hi-hat swing pattern
      [false, false, false, false, true, false, false, true],   // Clap offbeats
    ],
  },
  {
    name: 'rock',
    label: 'Rock Beat',
    description: 'The classic rock beat from the 1960s-70s drives the music forward. Kick and snare trade off while hi-hats keep time!',
    grid: [
      [true, false, false, false, true, false, false, false],   // Kick on 1, 5
      [false, false, true, false, false, false, true, false],   // Snare on 3, 7
      [true, true, true, true, true, true, true, true],         // Hi-hat every beat
      [false, false, false, false, false, false, false, false], // Clap off
    ],
  },
  {
    name: 'electronic',
    label: 'Electronic',
    description: 'Modern electronic music uses drum machines to create complex, driving patterns. This style started in the 1980s!',
    grid: [
      [true, false, false, true, true, false, false, false],    // Kick four-on-floor variation
      [false, false, true, false, false, true, true, false],    // Snare with ghost notes
      [true, true, true, true, true, true, true, true],         // Hi-hat every beat
      [false, false, false, true, false, false, false, true],   // Clap accents
    ],
  },
];

// ---------- Sound Synthesis ----------

function getAudioContext(ref: React.MutableRefObject<AudioContext | null>): AudioContext {
  if (!ref.current) {
    ref.current = new AudioContext();
  }
  if (ref.current.state === 'suspended') {
    ref.current.resume();
  }
  return ref.current;
}

function playKick(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.15);
  gain.gain.setValueAtTime(0.8, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.2);
}

function playSnare(ctx: AudioContext) {
  // Noise component
  const bufferSize = ctx.sampleRate * 0.1;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.6, ctx.currentTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 1000;
  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(ctx.currentTime);
  noise.stop(ctx.currentTime + 0.1);

  // Tone component
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.07);
  oscGain.gain.setValueAtTime(0.5, ctx.currentTime);
  oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.07);
}

function playHihat(ctx: AudioContext) {
  const bufferSize = ctx.sampleRate * 0.05;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 7000;
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  noise.start(ctx.currentTime);
  noise.stop(ctx.currentTime + 0.05);
}

function playClap(ctx: AudioContext) {
  const bufferSize = ctx.sampleRate * 0.12;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 2500;
  filter.Q.value = 1.5;
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  noise.start(ctx.currentTime);
  noise.stop(ctx.currentTime + 0.12);
}

const PLAY_FUNCTIONS = [playKick, playSnare, playHihat, playClap];

// ---------- Component ----------

export default function RhythmTimeline() {
  const [grid, setGrid] = useState<Grid>(emptyGrid);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [tempo, setTempo] = useState(120);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [presetDescription, setPresetDescription] = useState<string | null>(null);
  const [pulsing, setPulsing] = useState<Set<string>>(new Set());

  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gridRef = useRef(grid);
  const beatRef = useRef(-1);

  // Keep refs in sync
  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const toggleCell = useCallback((row: number, col: number) => {
    // Ensure audio context on first interaction
    getAudioContext(audioCtxRef);
    setGrid(prev => {
      const next = prev.map(r => [...r]);
      next[row][col] = !next[row][col];
      return next;
    });
    setActivePreset(null);
  }, []);

  const playBeatSounds = useCallback((beat: number) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const g = gridRef.current;
    const pulseKeys: string[] = [];
    for (let row = 0; row < NUM_INSTRUMENTS; row++) {
      if (g[row][beat]) {
        PLAY_FUNCTIONS[row](ctx);
        pulseKeys.push(`${row}-${beat}`);
      }
    }
    if (pulseKeys.length > 0) {
      setPulsing(new Set(pulseKeys));
      setTimeout(() => setPulsing(new Set()), 120);
    }
  }, []);

  const stopPlayback = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
    setCurrentBeat(-1);
    beatRef.current = -1;
  }, []);

  const startPlayback = useCallback(() => {
    const ctx = getAudioContext(audioCtxRef);
    if (!ctx) return;

    stopPlayback();
    setIsPlaying(true);
    beatRef.current = 0;
    setCurrentBeat(0);
    playBeatSounds(0);

    const msPerBeat = (60 / tempo) * 1000;
    intervalRef.current = setInterval(() => {
      const nextBeat = (beatRef.current + 1) % NUM_BEATS;
      beatRef.current = nextBeat;
      setCurrentBeat(nextBeat);
      playBeatSounds(nextBeat);
    }, msPerBeat);
  }, [tempo, playBeatSounds, stopPlayback]);

  // Restart playback when tempo changes during play
  useEffect(() => {
    if (isPlaying) {
      // Restart with new tempo
      if (intervalRef.current) clearInterval(intervalRef.current);
      const msPerBeat = (60 / tempo) * 1000;
      intervalRef.current = setInterval(() => {
        const nextBeat = (beatRef.current + 1) % NUM_BEATS;
        beatRef.current = nextBeat;
        setCurrentBeat(nextBeat);
        playBeatSounds(nextBeat);
      }, msPerBeat);
    }
    return () => {
      if (intervalRef.current && isPlaying) {
        // Will be re-created
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempo]);

  const loadPreset = useCallback((preset: Preset) => {
    getAudioContext(audioCtxRef);
    setGrid(preset.grid.map(r => [...r]));
    setActivePreset(preset.name);
    setPresetDescription(preset.description);
  }, []);

  const clearAll = useCallback(() => {
    stopPlayback();
    setGrid(emptyGrid());
    setActivePreset(null);
    setPresetDescription(null);
  }, [stopPlayback]);

  // ---------- Styles ----------

  const containerStyle: React.CSSProperties = {
    background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    borderRadius: 16,
    padding: '24px',
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
    color: '#e0e0e0',
    position: 'relative',
    overflow: 'hidden',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 800,
    textAlign: 'center' as const,
    margin: '0 0 4px 0',
    background: 'linear-gradient(90deg, #ff4422, #ffcc00, #22aaff, #bb44ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '0.02em',
  };

  const subtitleStyle: React.CSSProperties = {
    textAlign: 'center' as const,
    fontSize: '0.85rem',
    color: '#8899aa',
    margin: '0 0 20px 0',
  };

  return (
    <div style={containerStyle}>
      {/* Decorative notes */}
      <div style={{ position: 'absolute', top: 8, left: 16, fontSize: '1.4rem', opacity: 0.15 }} aria-hidden="true">
        {'♪ ♫ ♬'}
      </div>
      <div style={{ position: 'absolute', top: 8, right: 16, fontSize: '1.4rem', opacity: 0.15 }} aria-hidden="true">
        {'♬ ♫ ♪'}
      </div>

      <h3 style={titleStyle}>Rhythm Pattern Maker</h3>
      <p style={subtitleStyle}>Create beats from different musical eras!</p>

      {/* Preset Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
        {PRESETS.map(p => (
          <button
            key={p.name}
            onClick={() => loadPreset(p)}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              border: activePreset === p.name ? '2px solid #ffcc00' : '2px solid #334466',
              background: activePreset === p.name ? 'rgba(255,204,0,0.15)' : 'rgba(255,255,255,0.05)',
              color: activePreset === p.name ? '#ffcc00' : '#aabbcc',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Preset Description */}
      {presetDescription && (
        <div
          style={{
            background: 'rgba(255,204,0,0.08)',
            border: '1px solid rgba(255,204,0,0.2)',
            borderRadius: 10,
            padding: '10px 14px',
            marginBottom: 16,
            fontSize: '0.82rem',
            lineHeight: 1.5,
            color: '#ccbb88',
            textAlign: 'center',
          }}
        >
          {presetDescription}
        </div>
      )}

      {/* Beat Grid */}
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 360 }}>
          {/* Beat numbers header */}
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 56, flexShrink: 0 }} />
            {Array.from({ length: NUM_BEATS }, (_, col) => (
              <div
                key={col}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: currentBeat === col ? '#ffffff' : '#556677',
                  transition: 'color 0.1s',
                }}
              >
                {col + 1}
              </div>
            ))}
          </div>

          {/* Instrument rows */}
          {INSTRUMENTS.map((instrument, row) => {
            const colors = ROW_COLORS[row];
            return (
              <div key={instrument} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {/* Instrument label */}
                <div
                  style={{
                    width: 56,
                    flexShrink: 0,
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: colors.active,
                    textAlign: 'right',
                    paddingRight: 8,
                    textShadow: `0 0 8px ${colors.active}44`,
                  }}
                >
                  {instrument}
                </div>

                {/* Beat cells */}
                {Array.from({ length: NUM_BEATS }, (_, col) => {
                  const isActive = grid[row][col];
                  const isCurrentBeat = currentBeat === col;
                  const isPulsing = pulsing.has(`${row}-${col}`);

                  return (
                    <button
                      key={col}
                      onClick={() => toggleCell(row, col)}
                      aria-label={`${instrument} beat ${col + 1} ${isActive ? 'on' : 'off'}`}
                      style={{
                        flex: 1,
                        aspectRatio: '1',
                        maxWidth: 56,
                        minWidth: 32,
                        borderRadius: 8,
                        border: isActive
                          ? `2px solid ${colors.active}`
                          : `2px solid ${isCurrentBeat ? '#ffffff33' : '#334455'}`,
                        background: isActive
                          ? isCurrentBeat
                            ? colors.active
                            : colors.dim
                          : isCurrentBeat
                            ? 'rgba(255,255,255,0.08)'
                            : 'rgba(255,255,255,0.02)',
                        boxShadow: isActive && isCurrentBeat
                          ? colors.glow
                          : isPulsing && isActive
                            ? colors.glow
                            : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.08s ease-out',
                        transform: isPulsing && isActive ? 'scale(1.15)' : 'scale(1)',
                        padding: 0,
                        outline: 'none',
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Playhead indicator */}
      {isPlaying && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 12, paddingLeft: 62 }}>
          {Array.from({ length: NUM_BEATS }, (_, col) => (
            <div
              key={col}
              style={{
                flex: 1,
                maxWidth: 56,
                height: 3,
                borderRadius: 2,
                background: currentBeat === col
                  ? 'linear-gradient(90deg, #ff4422, #ffcc00, #22aaff)'
                  : 'rgba(255,255,255,0.05)',
                transition: 'background 0.08s',
              }}
            />
          ))}
        </div>
      )}

      {/* Controls */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
      }}>
        {/* Play / Stop */}
        <button
          onClick={isPlaying ? stopPlayback : startPlayback}
          style={{
            padding: '10px 28px',
            borderRadius: 28,
            border: 'none',
            background: isPlaying
              ? 'linear-gradient(135deg, #ff4444, #cc2222)'
              : 'linear-gradient(135deg, #22cc66, #11aa44)',
            color: '#fff',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: isPlaying
              ? '0 0 16px rgba(255,68,68,0.4)'
              : '0 0 16px rgba(34,204,102,0.4)',
            transition: 'all 0.2s',
            minWidth: 100,
          }}
        >
          {isPlaying ? 'Stop' : 'Play'}
        </button>

        {/* Tempo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label
            htmlFor="tempo-slider"
            style={{ fontSize: '0.78rem', color: '#8899aa', fontWeight: 600 }}
          >
            Tempo
          </label>
          <input
            id="tempo-slider"
            type="range"
            min={60}
            max={180}
            value={tempo}
            onChange={e => setTempo(Number(e.target.value))}
            style={{
              width: 100,
              accentColor: '#ffcc00',
              cursor: 'pointer',
            }}
          />
          <span style={{
            fontSize: '0.78rem',
            color: '#ffcc00',
            fontWeight: 700,
            minWidth: 50,
          }}>
            {tempo} BPM
          </span>
        </div>

        {/* Clear */}
        <button
          onClick={clearAll}
          style={{
            padding: '8px 18px',
            borderRadius: 20,
            border: '2px solid #445566',
            background: 'transparent',
            color: '#8899aa',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          Clear All
        </button>
      </div>

      {/* Footer hint */}
      <p style={{ textAlign: 'center', fontSize: '0.72rem', color: '#556677', margin: '12px 0 0 0' }}>
        Click cells to toggle beats on/off. Try a preset, then make it your own!
      </p>
    </div>
  );
}
