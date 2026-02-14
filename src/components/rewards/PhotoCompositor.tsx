import { useState, useCallback } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

interface Position {
  x: number; // 0-100 percentage
  y: number; // 0-100 percentage
}

interface ChallengeConfig {
  title: string;
  rule: string;
  tip: string;
  background: string;
  elements: { id: string; label: string }[];
  evaluate: (placed: Record<string, Position>) => number; // returns 1-3
}

// ── Helpers ────────────────────────────────────────────────────────────────

function dist(a: Position, b: Position): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

// ── Challenge Definitions ──────────────────────────────────────────────────

const CHALLENGES: ChallengeConfig[] = [
  {
    title: "Sunset Landscape",
    rule: "Place the horizon on the lower third line and the tree on a vertical third line for a balanced landscape.",
    tip: "Pro tip: Placing the horizon on the lower third gives more sky, creating a sense of openness!",
    background: "linear-gradient(to bottom, #ff9a56 0%, #ff6b35 40%, #2d5016 60%, #1a3a0a 100%)",
    elements: [
      { id: "horizon", label: "Horizon" },
      { id: "tree", label: "Tree" },
    ],
    evaluate: (placed) => {
      let score = 0;
      const h = placed["horizon"];
      const t = placed["tree"];
      if (!h || !t) return 1;
      // Horizon should be near y=66.7 (lower third)
      const horizonDist = Math.abs(h.y - 66.7);
      if (horizonDist < 5) score += 2;
      else if (horizonDist < 12) score += 1;
      // Tree on left third (x~33) or right third (x~67)
      const treeDist = Math.min(Math.abs(t.x - 33.3), Math.abs(t.x - 66.7));
      if (treeDist < 8) score += 1;
      return clamp(score, 1, 3);
    },
  },
  {
    title: "Portrait",
    rule: "Place the face near an upper-third intersection point. Great portraits have the eyes at the top third!",
    tip: "Pro tip: Placing a subject's eyes at the upper third intersection creates a natural, engaging portrait!",
    background: "linear-gradient(to bottom, #87CEEB 0%, #b8d4e3 50%, #8B7355 80%, #6B5B3F 100%)",
    elements: [{ id: "face", label: "Face" }],
    evaluate: (placed) => {
      const f = placed["face"];
      if (!f) return 1;
      // Upper-third intersections: (33.3, 33.3) and (66.7, 33.3)
      const d1 = dist(f, { x: 33.3, y: 33.3 });
      const d2 = dist(f, { x: 66.7, y: 33.3 });
      const best = Math.min(d1, d2);
      if (best < 8) return 3;
      if (best < 18) return 2;
      return 1;
    },
  },
  {
    title: "Leading Lines",
    rule: "Place the road start at the bottom and the vanishing point near an upper intersection to create depth.",
    tip: "Pro tip: Leading lines guide the viewer's eye into the photo, creating a sense of depth and journey!",
    background: "linear-gradient(to bottom, #5b8fb9 0%, #87a7c4 30%, #7a9b5a 60%, #4a7a3a 100%)",
    elements: [
      { id: "road_start", label: "Road Start" },
      { id: "vanish", label: "Vanishing Point" },
    ],
    evaluate: (placed) => {
      const rs = placed["road_start"];
      const vp = placed["vanish"];
      if (!rs || !vp) return 1;
      let score = 0;
      // Road start near bottom center
      if (rs.y > 80 && Math.abs(rs.x - 50) < 20) score += 1;
      // Vanishing point near upper third intersection
      const d1 = dist(vp, { x: 33.3, y: 33.3 });
      const d2 = dist(vp, { x: 50, y: 33.3 });
      const d3 = dist(vp, { x: 66.7, y: 33.3 });
      const best = Math.min(d1, d2, d3);
      if (best < 10) score += 2;
      else if (best < 20) score += 1;
      return clamp(score, 1, 3);
    },
  },
  {
    title: "Symmetry",
    rule: "Place two elements symmetrically on either side of the center line for a balanced composition.",
    tip: "Pro tip: Symmetrical compositions feel calm and powerful, perfect for architecture and reflections!",
    background: "linear-gradient(to bottom, #4a90d9 0%, #6ba3e0 40%, #4a90d9 60%, #2c5f8a 100%)",
    elements: [
      { id: "left_obj", label: "Left Element" },
      { id: "right_obj", label: "Right Element" },
    ],
    evaluate: (placed) => {
      const l = placed["left_obj"];
      const r = placed["right_obj"];
      if (!l || !r) return 1;
      // Check horizontal symmetry around x=50
      const xSymmetry = Math.abs((l.x + r.x) / 2 - 50);
      const xSpread = Math.abs(l.x - r.x);
      const yMatch = Math.abs(l.y - r.y);
      let score = 0;
      if (xSymmetry < 8) score += 1;
      if (xSpread > 25) score += 1;
      if (yMatch < 10) score += 1;
      return clamp(score, 1, 3);
    },
  },
  {
    title: "Frame within Frame",
    rule: "Place the arch to frame the scene, then position the subject inside the arch for a 'frame within a frame.'",
    tip: "Pro tip: Using natural frames like doorways or arches focuses attention and adds depth to your photo!",
    background: "linear-gradient(to bottom, #f5e6c8 0%, #d4a76a 40%, #8B7355 70%, #5c4a32 100%)",
    elements: [
      { id: "arch", label: "Arch / Frame" },
      { id: "subject", label: "Subject" },
    ],
    evaluate: (placed) => {
      const a = placed["arch"];
      const s = placed["subject"];
      if (!a || !s) return 1;
      let score = 0;
      // Arch should be roughly centered
      if (Math.abs(a.x - 50) < 15 && Math.abs(a.y - 40) < 15) score += 1;
      // Subject inside arch area and near center
      if (Math.abs(s.x - 50) < 18 && Math.abs(s.y - 50) < 18) score += 1;
      // Subject should be "inside" arch (close to arch but slightly below center)
      const d = dist(a, s);
      if (d > 8 && d < 30) score += 1;
      return clamp(score, 1, 3);
    },
  },
];

// ── Element Renderers ──────────────────────────────────────────────────────

function renderElement(
  challengeIndex: number,
  elementId: string,
  pos: Position,
  opacity: number = 1,
): React.ReactNode {
  const base: React.CSSProperties = {
    position: "absolute",
    left: `${pos.x}%`,
    top: `${pos.y}%`,
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
    opacity,
  };

  switch (`${challengeIndex}-${elementId}`) {
    // Sunset Landscape
    case "0-horizon":
      return (
        <div key={elementId} style={{ ...base, width: "100%", left: "50%" }}>
          <div
            style={{
              width: "100%",
              height: 4,
              background: "linear-gradient(to right, #ff8c00, #ffd700, #ff8c00)",
              borderRadius: 2,
              boxShadow: "0 0 8px rgba(255,200,0,0.6)",
            }}
          />
        </div>
      );
    case "0-tree":
      return (
        <div key={elementId} style={{ ...base }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "14px solid transparent",
                borderRight: "14px solid transparent",
                borderBottom: "22px solid #2d8a2d",
                marginBottom: -4,
              }}
            />
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "18px solid transparent",
                borderRight: "18px solid transparent",
                borderBottom: "26px solid #1e7a1e",
                marginBottom: -4,
              }}
            />
            <div
              style={{
                width: 8,
                height: 16,
                background: "#6b3a1f",
                borderRadius: 2,
              }}
            />
          </div>
        </div>
      );

    // Portrait
    case "1-face":
      return (
        <div key={elementId} style={{ ...base }}>
          <div
            style={{
              width: 48,
              height: 56,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #fdd9b5, #f5c28a)",
              border: "3px solid #e8a86d",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", gap: 10, marginBottom: 4 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#3a2a1a" }} />
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#3a2a1a" }} />
            </div>
            <div
              style={{
                width: 12,
                height: 6,
                borderRadius: "0 0 6px 6px",
                background: "#e07a5f",
              }}
            />
          </div>
        </div>
      );

    // Leading Lines
    case "2-road_start":
      return (
        <div key={elementId} style={{ ...base }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "radial-gradient(circle, #8B7355, #6b5a3a)",
              border: "3px solid #fff",
              boxShadow: "0 0 6px rgba(0,0,0,0.4)",
            }}
          />
        </div>
      );
    case "2-vanish":
      return (
        <div key={elementId} style={{ ...base }}>
          <div
            style={{
              width: 16,
              height: 16,
              background: "#fff",
              borderRadius: "50%",
              border: "2px solid #ffd700",
              boxShadow: "0 0 12px rgba(255,215,0,0.8)",
            }}
          />
        </div>
      );

    // Symmetry
    case "3-left_obj":
      return (
        <div key={elementId} style={{ ...base }}>
          <div
            style={{
              width: 32,
              height: 48,
              background: "linear-gradient(to top, #4a6741, #6b8f62)",
              borderRadius: "8px 8px 0 0",
              border: "2px solid #3a5731",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "#5a7f52",
                border: "2px solid #3a5731",
              }}
            />
          </div>
        </div>
      );
    case "3-right_obj":
      return (
        <div key={elementId} style={{ ...base }}>
          <div
            style={{
              width: 32,
              height: 48,
              background: "linear-gradient(to top, #4a6741, #6b8f62)",
              borderRadius: "8px 8px 0 0",
              border: "2px solid #3a5731",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "#5a7f52",
                border: "2px solid #3a5731",
              }}
            />
          </div>
        </div>
      );

    // Frame within Frame
    case "4-arch":
      return (
        <div key={elementId} style={{ ...base }}>
          <div
            style={{
              width: 80,
              height: 100,
              borderRadius: "40px 40px 0 0",
              border: "6px solid #8B6914",
              borderBottom: "none",
              background: "rgba(0,0,0,0.15)",
              boxShadow: "0 0 10px rgba(139,105,20,0.4)",
            }}
          />
        </div>
      );
    case "4-subject":
      return (
        <div key={elementId} style={{ ...base }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "#fdd9b5",
                border: "2px solid #e8a86d",
                marginBottom: 2,
              }}
            />
            <div
              style={{
                width: 20,
                height: 24,
                background: "linear-gradient(to bottom, #e74c3c, #c0392b)",
                borderRadius: "4px 4px 0 0",
              }}
            />
          </div>
        </div>
      );

    default:
      return (
        <div key={elementId} style={{ ...base }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "#ff6b6b",
              border: "2px solid #fff",
            }}
          />
        </div>
      );
  }
}

// Leading line SVG between two points
function renderLeadingLine(start: Position, end: Position): React.ReactNode {
  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <line
        x1={`${start.x}%`}
        y1={`${start.y}%`}
        x2={`${end.x}%`}
        y2={`${end.y}%`}
        stroke="#8B7355"
        strokeWidth="4"
        strokeDasharray="8 4"
        opacity={0.7}
      />
    </svg>
  );
}

// ── Stars Component ────────────────────────────────────────────────────────

function Stars({ count, size = 28 }: { count: number; size?: number }) {
  return (
    <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          style={{
            fontSize: size,
            color: i <= count ? "#ffd700" : "#555",
            textShadow: i <= count ? "0 0 6px rgba(255,215,0,0.5)" : "none",
            transition: "all 0.3s ease",
          }}
        >
          {"\u2605"}
        </span>
      ))}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function PhotoCompositor() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const [placedElements, setPlacedElements] = useState<Record<string, Position>>({});
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [completed, setCompleted] = useState(false);

  const challenge = CHALLENGES[currentChallenge];
  const allPlaced =
    challenge?.elements.every((e) => placedElements[e.id] !== undefined) ?? false;

  const handleFrameClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!activeElement || showResult) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = clamp(((e.clientX - rect.left) / rect.width) * 100, 2, 98);
      const y = clamp(((e.clientY - rect.top) / rect.height) * 100, 2, 98);
      setPlacedElements((prev) => ({ ...prev, [activeElement]: { x, y } }));
      // Auto-advance to next unplaced element
      const nextUnplaced = challenge.elements.find(
        (el) => el.id !== activeElement && !placedElements[el.id],
      );
      setActiveElement(nextUnplaced?.id ?? null);
    },
    [activeElement, showResult, challenge, placedElements],
  );

  const handleTakePhoto = useCallback(() => {
    const score = challenge.evaluate(placedElements);
    setScores((prev) => [...prev, score]);
    setShowResult(true);
  }, [challenge, placedElements]);

  const handleNext = useCallback(() => {
    if (currentChallenge >= CHALLENGES.length - 1) {
      setCompleted(true);
    } else {
      setCurrentChallenge((prev) => prev + 1);
      setPlacedElements({});
      setActiveElement(null);
      setShowResult(false);
    }
  }, [currentChallenge]);

  const handleReset = useCallback(() => {
    setPlacedElements({});
    setActiveElement(null);
    setShowResult(false);
    setScores((prev) => prev.slice(0, -1));
  }, []);

  const handlePlayAgain = useCallback(() => {
    setCurrentChallenge(0);
    setPlacedElements({});
    setActiveElement(null);
    setScores([]);
    setShowResult(false);
    setCompleted(false);
  }, []);

  // ── Celebration Screen ───────────────────────────────────────────────────

  if (completed) {
    const totalStars = scores.reduce((a, b) => a + b, 0);
    const maxStars = CHALLENGES.length * 3;
    return (
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          borderRadius: 16,
          padding: 24,
          textAlign: "center",
          color: "#fff",
          maxWidth: 540,
          margin: "0 auto",
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 8 }}>
          {"\uD83C\uDFC6"}
        </div>
        <h2
          style={{
            fontSize: 26,
            fontWeight: 800,
            marginBottom: 4,
            background: "linear-gradient(90deg, #ffd700, #ffaa00)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Photography Pro!
        </h2>
        <p style={{ fontSize: 14, color: "#aaa", marginBottom: 16 }}>
          You completed all 5 composition challenges!
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            marginBottom: 20,
            fontSize: 14,
            color: "#ccc",
          }}
        >
          <span>Total: {totalStars}/{maxStars}</span>
          <Stars count={totalStars >= 12 ? 3 : totalStars >= 8 ? 2 : 1} size={20} />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 12,
            marginBottom: 20,
          }}
        >
          {CHALLENGES.map((ch, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: 10,
                padding: 10,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  borderRadius: 6,
                  background: ch.background,
                  marginBottom: 8,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 600,
                  }}
                >
                  {ch.title}
                </div>
              </div>
              <Stars count={scores[i] ?? 1} size={18} />
            </div>
          ))}
        </div>
        <button
          onClick={handlePlayAgain}
          style={{
            background: "linear-gradient(135deg, #ffd700, #ffaa00)",
            color: "#1a1a2e",
            border: "none",
            borderRadius: 10,
            padding: "10px 28px",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Play Again
        </button>
      </div>
    );
  }

  // ── Main Game UI ─────────────────────────────────────────────────────────

  const currentScore = showResult ? scores[scores.length - 1] : 0;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        borderRadius: 16,
        padding: 20,
        maxWidth: 540,
        margin: "0 auto",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 22 }}>{"\uD83D\uDCF7"}</span>
          <span style={{ fontWeight: 700, fontSize: 16 }}>Photo Studio</span>
        </div>
        <span
          style={{
            fontSize: 13,
            color: "#aaa",
            background: "rgba(255,255,255,0.08)",
            padding: "3px 10px",
            borderRadius: 8,
          }}
        >
          Photo {currentChallenge + 1}/5
        </span>
      </div>

      {/* Challenge Title & Rule */}
      <div
        style={{
          background: "rgba(255,255,255,0.06)",
          borderRadius: 10,
          padding: 12,
          marginBottom: 12,
        }}
      >
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, marginBottom: 4 }}>
          {challenge.title}
        </h3>
        <p style={{ margin: 0, fontSize: 13, color: "#bbb", lineHeight: 1.4 }}>
          {challenge.rule}
        </p>
      </div>

      {/* Element Palette */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 10,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 12, color: "#888", marginRight: 4 }}>Place:</span>
        {challenge.elements.map((el) => {
          const isPlaced = !!placedElements[el.id];
          const isActive = activeElement === el.id;
          return (
            <button
              key={el.id}
              onClick={() => !showResult && setActiveElement(isActive ? null : el.id)}
              style={{
                background: isActive
                  ? "rgba(255,215,0,0.25)"
                  : isPlaced
                    ? "rgba(100,255,100,0.15)"
                    : "rgba(255,255,255,0.1)",
                border: isActive
                  ? "2px solid #ffd700"
                  : isPlaced
                    ? "2px solid rgba(100,255,100,0.4)"
                    : "2px solid rgba(255,255,255,0.15)",
                borderRadius: 8,
                padding: "5px 12px",
                color: isActive ? "#ffd700" : isPlaced ? "#8f8" : "#ccc",
                fontSize: 12,
                fontWeight: 600,
                cursor: showResult ? "default" : "pointer",
                transition: "all 0.2s",
              }}
            >
              {isPlaced ? "\u2713 " : ""}
              {el.label}
            </button>
          );
        })}
        <div style={{ flex: 1 }} />
        <button
          onClick={() => setShowGrid((prev) => !prev)}
          style={{
            background: showGrid ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 6,
            padding: "4px 10px",
            color: showGrid ? "#fff" : "#666",
            fontSize: 11,
            cursor: "pointer",
          }}
        >
          Grid {showGrid ? "ON" : "OFF"}
        </button>
      </div>

      {/* Viewfinder Frame */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 3",
          background: challenge.background,
          borderRadius: 8,
          overflow: "hidden",
          border: "3px solid #333",
          boxShadow: "inset 0 0 20px rgba(0,0,0,0.3), 0 4px 20px rgba(0,0,0,0.4)",
          cursor: activeElement && !showResult ? "crosshair" : "default",
          marginBottom: 12,
        }}
        onClick={handleFrameClick}
      >
        {/* Corner brackets (viewfinder style) */}
        {[
          { top: 6, left: 6 },
          { top: 6, right: 6 },
          { bottom: 6, left: 6 },
          { bottom: 6, right: 6 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              ...pos,
              width: 16,
              height: 16,
              borderColor: "rgba(255,255,255,0.5)",
              borderStyle: "solid",
              borderWidth: 0,
              ...(i === 0
                ? { borderTopWidth: 2, borderLeftWidth: 2 }
                : i === 1
                  ? { borderTopWidth: 2, borderRightWidth: 2 }
                  : i === 2
                    ? { borderBottomWidth: 2, borderLeftWidth: 2 }
                    : { borderBottomWidth: 2, borderRightWidth: 2 }),
              pointerEvents: "none" as const,
            }}
          />
        ))}

        {/* Rule of thirds grid */}
        {showGrid && (
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            {/* Vertical lines */}
            <div
              style={{
                position: "absolute",
                left: "33.33%",
                top: 0,
                width: 1,
                height: "100%",
                background: "rgba(255,255,255,0.25)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "66.67%",
                top: 0,
                width: 1,
                height: "100%",
                background: "rgba(255,255,255,0.25)",
              }}
            />
            {/* Horizontal lines */}
            <div
              style={{
                position: "absolute",
                top: "33.33%",
                left: 0,
                height: 1,
                width: "100%",
                background: "rgba(255,255,255,0.25)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "66.67%",
                left: 0,
                height: 1,
                width: "100%",
                background: "rgba(255,255,255,0.25)",
              }}
            />
            {/* Intersection dots */}
            {[33.33, 66.67].map((x) =>
              [33.33, 66.67].map((y) => (
                <div
                  key={`${x}-${y}`}
                  style={{
                    position: "absolute",
                    left: `${x}%`,
                    top: `${y}%`,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.35)",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )),
            )}
          </div>
        )}

        {/* Leading line SVG (for challenge 2) */}
        {currentChallenge === 2 &&
          placedElements["road_start"] &&
          placedElements["vanish"] &&
          renderLeadingLine(placedElements["road_start"], placedElements["vanish"])}

        {/* Placed elements */}
        {challenge.elements.map(
          (el) =>
            placedElements[el.id] && renderElement(currentChallenge, el.id, placedElements[el.id]),
        )}

        {/* Active element indicator */}
        {activeElement && !showResult && (
          <div
            style={{
              position: "absolute",
              bottom: 8,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.7)",
              color: "#ffd700",
              padding: "4px 12px",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            Click to place: {challenge.elements.find((e) => e.id === activeElement)?.label}
          </div>
        )}

        {/* Result overlay */}
        {showResult && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                background: "rgba(20,20,40,0.9)",
                borderRadius: 12,
                padding: "16px 24px",
                textAlign: "center",
                border: "1px solid rgba(255,215,0,0.3)",
              }}
            >
              <Stars count={currentScore} size={32} />
              <p
                style={{
                  margin: "8px 0 0 0",
                  fontSize: 14,
                  fontWeight: 700,
                  color:
                    currentScore === 3 ? "#ffd700" : currentScore === 2 ? "#aaa" : "#888",
                }}
              >
                {currentScore === 3
                  ? "Perfect Composition!"
                  : currentScore === 2
                    ? "Good Eye!"
                    : "Keep Practicing!"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Tip (shown after scoring) */}
      {showResult && (
        <div
          style={{
            background: "rgba(255,215,0,0.08)",
            border: "1px solid rgba(255,215,0,0.2)",
            borderRadius: 8,
            padding: 10,
            marginBottom: 12,
            fontSize: 12,
            color: "#ddd",
            lineHeight: 1.4,
          }}
        >
          {challenge.tip}
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        {!showResult && (
          <>
            <button
              onClick={() => {
                setPlacedElements({});
                setActiveElement(challenge.elements[0]?.id ?? null);
              }}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 8,
                padding: "8px 18px",
                color: "#aaa",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Reset
            </button>
            <button
              onClick={handleTakePhoto}
              disabled={!allPlaced}
              style={{
                background: allPlaced
                  ? "linear-gradient(135deg, #e74c3c, #c0392b)"
                  : "rgba(255,255,255,0.05)",
                border: allPlaced ? "none" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                padding: "8px 24px",
                color: allPlaced ? "#fff" : "#555",
                fontSize: 14,
                fontWeight: 700,
                cursor: allPlaced ? "pointer" : "default",
                boxShadow: allPlaced ? "0 2px 10px rgba(231,76,60,0.4)" : "none",
                transition: "all 0.2s",
              }}
            >
              {"\uD83D\uDCF8"} Take Photo!
            </button>
          </>
        )}
        {showResult && (
          <>
            <button
              onClick={handleReset}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 8,
                padding: "8px 18px",
                color: "#aaa",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Retry
            </button>
            <button
              onClick={handleNext}
              style={{
                background: "linear-gradient(135deg, #ffd700, #ffaa00)",
                border: "none",
                borderRadius: 8,
                padding: "8px 24px",
                color: "#1a1a2e",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 2px 10px rgba(255,215,0,0.3)",
              }}
            >
              {currentChallenge >= CHALLENGES.length - 1 ? "See Results" : "Next Photo"}{" "}
              {"\u2192"}
            </button>
          </>
        )}
      </div>

      {/* Progress bar */}
      <div
        style={{
          marginTop: 14,
          height: 4,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${((currentChallenge + (showResult ? 1 : 0)) / CHALLENGES.length) * 100}%`,
            background: "linear-gradient(90deg, #ffd700, #ffaa00)",
            borderRadius: 2,
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}
