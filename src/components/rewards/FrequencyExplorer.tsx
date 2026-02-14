import { useState, useEffect, useRef, useCallback } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
type WaveType = "sine" | "square" | "triangle" | "sawtooth";

interface Preset {
  note: string;
  freq: number;
}

// ── Constants ──────────────────────────────────────────────────────────────
const PRESETS: Preset[] = [
  { note: "C4", freq: 261.6 },
  { note: "D4", freq: 293.7 },
  { note: "E4", freq: 329.6 },
  { note: "F4", freq: 349.2 },
  { note: "G4", freq: 392.0 },
  { note: "A4", freq: 440.0 },
  { note: "B4", freq: 493.9 },
  { note: "C5", freq: 523.3 },
];

const WAVE_TYPES: WaveType[] = ["sine", "square", "triangle", "sawtooth"];

const WAVE_LABELS: Record<WaveType, string> = {
  sine: "Sine ~",
  square: "Square |_|",
  triangle: "Triangle /\\",
  sawtooth: "Sawtooth /|",
};

const FUN_FACTS = [
  "Middle C is 261.6 Hz",
  "A4 (concert pitch) is 440 Hz",
  "An octave doubles the frequency (C4=261.6 Hz, C5=523.3 Hz)",
  'A "perfect fifth" is a 3:2 frequency ratio',
  'A "perfect fourth" is a 4:3 frequency ratio',
  "Bats can hear up to 120,000 Hz!",
];

// ── Helpers ────────────────────────────────────────────────────────────────
/** Build an SVG path string for the given wave type. */
function buildWavePath(
  waveType: WaveType,
  frequency: number,
  amplitude: number,
  width: number,
  height: number
): string {
  const midY = height / 2;
  const amp = (amplitude * height) / 2.4; // leave a little padding
  const cycles = Math.max(1, Math.min(8, frequency / 130)); // show 1-8 cycles
  const steps = 400;

  const points: string[] = [];

  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const t = (i / steps) * cycles; // normalised time in cycles
    let y = 0;

    switch (waveType) {
      case "sine":
        y = Math.sin(2 * Math.PI * t);
        break;
      case "square":
        y = Math.sin(2 * Math.PI * t) >= 0 ? 1 : -1;
        break;
      case "triangle":
        y = (2 / Math.PI) * Math.asin(Math.sin(2 * Math.PI * t));
        break;
      case "sawtooth":
        y = 2 * (t % 1) - 1;
        break;
    }

    const py = midY - y * amp;
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${py.toFixed(2)}`);
  }

  return points.join(" ");
}

// ── Component ──────────────────────────────────────────────────────────────
export default function FrequencyExplorer() {
  // --- state ---
  const [frequency, setFrequency] = useState(440);
  const [amplitude, setAmplitude] = useState(0.5);
  const [waveType, setWaveType] = useState<WaveType>("sine");
  const [playing, setPlaying] = useState(false);
  const [factIndex, setFactIndex] = useState(0);

  // --- refs (audio) ---
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // --- SVG dimensions (responsive) ---
  const SVG_W = 600;
  const SVG_H = 200;

  // ── Audio helpers ────────────────────────────────────────────────────────
  const ensureAudioCtx = useCallback((): AudioContext => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const startTone = useCallback(() => {
    const ctx = ensureAudioCtx();

    // tear down any existing nodes
    if (oscRef.current) {
      try { oscRef.current.stop(); } catch { /* already stopped */ }
      oscRef.current.disconnect();
    }
    if (gainRef.current) {
      gainRef.current.disconnect();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = waveType;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(amplitude, ctx.currentTime + 0.05);

    osc.connect(gain).connect(ctx.destination);
    osc.start();

    oscRef.current = osc;
    gainRef.current = gain;
    setPlaying(true);
  }, [ensureAudioCtx, frequency, amplitude, waveType]);

  const stopTone = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (gainRef.current && ctx) {
      gainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.05);
    }
    setTimeout(() => {
      if (oscRef.current) {
        try { oscRef.current.stop(); } catch { /* noop */ }
        oscRef.current.disconnect();
        oscRef.current = null;
      }
      if (gainRef.current) {
        gainRef.current.disconnect();
        gainRef.current = null;
      }
    }, 80);
    setPlaying(false);
  }, []);

  // keep oscillator params in sync while playing
  useEffect(() => {
    if (!playing) return;
    const ctx = audioCtxRef.current;
    if (oscRef.current && ctx) {
      oscRef.current.frequency.setValueAtTime(frequency, ctx.currentTime);
      oscRef.current.type = waveType;
    }
    if (gainRef.current && ctx) {
      gainRef.current.gain.linearRampToValueAtTime(amplitude, ctx.currentTime + 0.04);
    }
  }, [frequency, amplitude, waveType, playing]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (oscRef.current) {
        try { oscRef.current.stop(); } catch { /* noop */ }
        oscRef.current.disconnect();
      }
      if (gainRef.current) {
        gainRef.current.disconnect();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // rotate fun facts
  useEffect(() => {
    const id = setInterval(() => setFactIndex((i) => (i + 1) % FUN_FACTS.length), 5000);
    return () => clearInterval(id);
  }, []);

  // ── Preset handler ───────────────────────────────────────────────────────
  const playPreset = useCallback(
    (preset: Preset) => {
      setFrequency(preset.freq);

      const ctx = ensureAudioCtx();
      // brief preview note
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = waveType;
      osc.frequency.setValueAtTime(preset.freq, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(amplitude, ctx.currentTime + 0.03);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.65);
    },
    [ensureAudioCtx, waveType, amplitude]
  );

  // ── SVG path ─────────────────────────────────────────────────────────────
  const wavePath = buildWavePath(waveType, frequency, amplitude, SVG_W, SVG_H);

  // ── Styles ───────────────────────────────────────────────────────────────
  const containerStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #0f0c29, #1a1245, #24243e)",
    borderRadius: 16,
    padding: "28px 24px",
    color: "#e0e0e0",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    maxWidth: 720,
    margin: "0 auto",
    position: "relative",
    overflow: "hidden",
  };

  const headingStyle: React.CSSProperties = {
    textAlign: "center" as const,
    fontSize: 26,
    fontWeight: 800,
    background: "linear-gradient(90deg, #00e5ff, #76ff03)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: 4,
  };

  const subHeadStyle: React.CSSProperties = {
    textAlign: "center" as const,
    fontSize: 13,
    color: "#a0a0c0",
    marginBottom: 18,
  };

  const svgContainerStyle: React.CSSProperties = {
    background: "rgba(0,0,0,0.35)",
    borderRadius: 12,
    padding: 8,
    marginBottom: 18,
    border: "1px solid rgba(0,229,255,0.15)",
  };

  const sliderTrackStyle: React.CSSProperties = {
    width: "100%",
    accentColor: "#00e5ff",
    cursor: "pointer",
    height: 6,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 13,
    color: "#b0b0d0",
    marginBottom: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const valueStyle: React.CSSProperties = {
    fontWeight: 700,
    color: "#00e5ff",
    fontFamily: "monospace",
    fontSize: 15,
  };

  const btnBase: React.CSSProperties = {
    border: "none",
    borderRadius: 8,
    padding: "8px 16px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 14,
    transition: "all 0.15s ease",
  };

  const waveTypeBtnStyle = (active: boolean): React.CSSProperties => ({
    ...btnBase,
    background: active
      ? "linear-gradient(135deg, #00e5ff, #00b0ff)"
      : "rgba(255,255,255,0.08)",
    color: active ? "#0f0c29" : "#a0a0c0",
    border: active ? "2px solid #00e5ff" : "2px solid rgba(255,255,255,0.1)",
    boxShadow: active ? "0 0 12px rgba(0,229,255,0.4)" : "none",
    padding: "6px 12px",
    fontSize: 12,
  });

  const presetBtnStyle = (isActive: boolean): React.CSSProperties => ({
    ...btnBase,
    background: isActive
      ? "linear-gradient(135deg, #76ff03, #64dd17)"
      : "rgba(255,255,255,0.06)",
    color: isActive ? "#0f0c29" : "#c0c0e0",
    border: isActive ? "2px solid #76ff03" : "2px solid rgba(255,255,255,0.08)",
    boxShadow: isActive ? "0 0 12px rgba(118,255,3,0.35)" : "none",
    padding: "6px 10px",
    fontSize: 13,
    minWidth: 52,
  });

  const playBtnStyle: React.CSSProperties = {
    ...btnBase,
    width: "100%",
    padding: "12px 0",
    fontSize: 18,
    letterSpacing: 1,
    background: playing
      ? "linear-gradient(135deg, #ff1744, #d50000)"
      : "linear-gradient(135deg, #76ff03, #64dd17)",
    color: playing ? "#fff" : "#0f0c29",
    boxShadow: playing
      ? "0 0 20px rgba(255,23,68,0.45)"
      : "0 0 20px rgba(118,255,3,0.35)",
  };

  const factStyle: React.CSSProperties = {
    textAlign: "center" as const,
    fontSize: 13,
    color: "#ffd740",
    padding: "8px 0",
    minHeight: 36,
    fontStyle: "italic",
  };

  const equationStyle: React.CSSProperties = {
    textAlign: "center" as const,
    fontFamily: "monospace",
    fontSize: 14,
    color: "#ce93d8",
    background: "rgba(0,0,0,0.25)",
    borderRadius: 8,
    padding: "8px 12px",
    marginBottom: 14,
    border: "1px solid rgba(206,147,216,0.2)",
  };

  const sectionGap: React.CSSProperties = { marginBottom: 14 };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div style={containerStyle}>
      {/* decorative notes */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 16,
          fontSize: 28,
          opacity: 0.12,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {"\u266B \u266A"}
      </div>
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 16,
          fontSize: 28,
          opacity: 0.12,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {"\u266A \u266B"}
      </div>

      {/* heading */}
      <h2 style={headingStyle}>Sound Wave Explorer</h2>
      <p style={subHeadStyle}>Discover how math creates music!</p>

      {/* wave equation */}
      <div style={equationStyle}>
        y = <span style={{ color: "#76ff03" }}>{amplitude.toFixed(2)}</span>{" "}
        &times; sin(2&pi; &times;{" "}
        <span style={{ color: "#00e5ff" }}>{frequency.toFixed(1)}</span> &times;
        t)
      </div>

      {/* SVG visualisation */}
      <div style={svgContainerStyle}>
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ display: "block" }}
        >
          {/* grid lines */}
          <line
            x1={0}
            y1={SVG_H / 2}
            x2={SVG_W}
            y2={SVG_H / 2}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={1}
          />
          {[0.25, 0.75].map((r) => (
            <line
              key={r}
              x1={0}
              y1={SVG_H * r}
              x2={SVG_W}
              y2={SVG_H * r}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth={0.5}
            />
          ))}

          {/* glow filter */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* wave */}
          <path
            d={wavePath}
            fill="none"
            stroke="#00e5ff"
            strokeWidth={2.5}
            strokeLinejoin="round"
            filter="url(#glow)"
          />
        </svg>
      </div>

      {/* frequency slider */}
      <div style={sectionGap}>
        <div style={labelStyle}>
          <span>Frequency</span>
          <span style={valueStyle}>{frequency.toFixed(1)} Hz</span>
        </div>
        <input
          type="range"
          min={100}
          max={1000}
          step={0.1}
          value={frequency}
          onChange={(e) => setFrequency(Number(e.target.value))}
          style={sliderTrackStyle}
        />
      </div>

      {/* amplitude slider */}
      <div style={sectionGap}>
        <div style={labelStyle}>
          <span>Volume / Amplitude</span>
          <span style={valueStyle}>{(amplitude * 100).toFixed(0)}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={amplitude}
          onChange={(e) => setAmplitude(Number(e.target.value))}
          style={sliderTrackStyle}
        />
      </div>

      {/* wave type buttons */}
      <div style={sectionGap}>
        <div style={{ ...labelStyle, marginBottom: 6 }}>
          <span>Wave Type</span>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {WAVE_TYPES.map((wt) => (
            <button
              key={wt}
              style={waveTypeBtnStyle(waveType === wt)}
              onClick={() => setWaveType(wt)}
            >
              {WAVE_LABELS[wt]}
            </button>
          ))}
        </div>
      </div>

      {/* preset note buttons */}
      <div style={sectionGap}>
        <div style={{ ...labelStyle, marginBottom: 6 }}>
          <span>Musical Notes</span>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {PRESETS.map((p) => (
            <button
              key={p.note}
              style={presetBtnStyle(
                Math.abs(frequency - p.freq) < 0.5
              )}
              onClick={() => playPreset(p)}
            >
              <div style={{ fontWeight: 700 }}>{p.note}</div>
              <div style={{ fontSize: 10, opacity: 0.7 }}>{p.freq} Hz</div>
            </button>
          ))}
        </div>
      </div>

      {/* play / stop */}
      <div style={{ marginBottom: 14 }}>
        <button
          style={playBtnStyle}
          onClick={() => (playing ? stopTone() : startTone())}
        >
          {playing ? "\u25A0  Stop" : "\u25B6  Play Tone"}
        </button>
      </div>

      {/* fun fact */}
      <div style={factStyle}>
        {"Did you know? " + FUN_FACTS[factIndex]}
      </div>

      {/* interval ratios */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 8,
          marginTop: 8,
        }}
      >
        {[
          { name: "Octave", ratio: "2 : 1" },
          { name: "Perfect Fifth", ratio: "3 : 2" },
          { name: "Perfect Fourth", ratio: "4 : 3" },
          { name: "Major Third", ratio: "5 : 4" },
        ].map((iv) => (
          <div
            key={iv.name}
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: 8,
              padding: "6px 10px",
              textAlign: "center",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ fontSize: 11, color: "#a0a0c0" }}>{iv.name}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#ffd740", fontFamily: "monospace" }}>
              {iv.ratio}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
