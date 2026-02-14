import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PatternSwatch {
  id: string;
  name: string;
  culture: string;
  flag: string;
  funFact: string;
  css: React.CSSProperties;
}

interface GarmentItem {
  id: string;
  emoji: string;
  name: string;
  culture: string;
  flag: string;
  funFact: string;
}

type GamePhase = "intro" | "round1" | "round2" | "round3" | "celebration";

/* ------------------------------------------------------------------ */
/*  Data – Round 1: Patterns                                           */
/* ------------------------------------------------------------------ */

const PATTERNS: PatternSwatch[] = [
  {
    id: "tartan",
    name: "Tartan / Plaid",
    culture: "Scotland",
    flag: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74\uDB40\uDC7F",
    funFact:
      "Scottish tartans date back centuries. Each clan has its own unique tartan pattern!",
    css: {
      background: `
        repeating-linear-gradient(
          0deg,
          transparent, transparent 12px,
          rgba(0,80,160,0.5) 12px, rgba(0,80,160,0.5) 14px
        ),
        repeating-linear-gradient(
          90deg,
          transparent, transparent 12px,
          rgba(0,80,160,0.5) 12px, rgba(0,80,160,0.5) 14px
        ),
        repeating-linear-gradient(
          0deg,
          transparent, transparent 24px,
          rgba(255,255,255,0.3) 24px, rgba(255,255,255,0.3) 26px
        ),
        repeating-linear-gradient(
          90deg,
          transparent, transparent 24px,
          rgba(255,255,255,0.3) 24px, rgba(255,255,255,0.3) 26px
        ),
        #cc2222
      `,
    },
  },
  {
    id: "kente",
    name: "Kente Cloth",
    culture: "Ghana",
    flag: "\uD83C\uDDEC\uD83C\uDDED",
    funFact:
      "Kente cloth is woven by the Ashanti people of Ghana. Each colour and pattern has a special meaning!",
    css: {
      background: `
        repeating-linear-gradient(
          0deg,
          #d4a017 0px, #d4a017 8px,
          #228B22 8px, #228B22 16px,
          #cc2222 16px, #cc2222 24px,
          #d4a017 24px, #d4a017 32px,
          #000 32px, #000 34px
        )
      `,
    },
  },
  {
    id: "ikat",
    name: "Ikat",
    culture: "Indonesia",
    flag: "\uD83C\uDDEE\uD83C\uDDE9",
    funFact:
      "Ikat means 'to tie' in Indonesian. The yarns are dyed before weaving, creating beautiful blurred edges!",
    css: {
      background: `
        repeating-linear-gradient(
          135deg,
          #4a2060 0px, #6b3fa0 6px,
          #e8d5a0 6px, #e8d5a0 10px,
          #b04040 10px, #b04040 16px,
          #e8d5a0 16px, #e8d5a0 20px,
          #4a2060 20px, #6b3fa0 26px
        )
      `,
    },
  },
  {
    id: "paisley",
    name: "Paisley",
    culture: "India / Persia",
    flag: "\uD83C\uDDEE\uD83C\uDDF3",
    funFact:
      "The paisley pattern is based on the boteh, a Zoroastrian symbol of life. It became famous in the Scottish town of Paisley!",
    css: {
      background: `
        radial-gradient(ellipse 18px 24px at 20% 30%, #c0392b 40%, transparent 42%),
        radial-gradient(ellipse 14px 20px at 60% 60%, #8e44ad 40%, transparent 42%),
        radial-gradient(ellipse 16px 22px at 80% 25%, #c0392b 40%, transparent 42%),
        radial-gradient(ellipse 12px 18px at 40% 80%, #8e44ad 40%, transparent 42%),
        radial-gradient(ellipse 15px 20px at 10% 70%, #c0392b 40%, transparent 42%),
        #f5e6c8
      `,
    },
  },
  {
    id: "batik",
    name: "Batik",
    culture: "Java / Indonesia",
    flag: "\uD83C\uDDEE\uD83C\uDDE9",
    funFact:
      "Batik uses wax to resist dye, creating intricate patterns. UNESCO recognizes Indonesian batik as a Masterpiece of Heritage!",
    css: {
      background: `
        radial-gradient(circle 4px at 15% 20%, #d4a017 70%, transparent 72%),
        radial-gradient(circle 3px at 45% 15%, #d4a017 70%, transparent 72%),
        radial-gradient(circle 5px at 75% 30%, #d4a017 70%, transparent 72%),
        radial-gradient(circle 3px at 30% 50%, #d4a017 70%, transparent 72%),
        radial-gradient(circle 4px at 60% 55%, #d4a017 70%, transparent 72%),
        radial-gradient(circle 3px at 85% 60%, #d4a017 70%, transparent 72%),
        radial-gradient(circle 5px at 20% 75%, #d4a017 70%, transparent 72%),
        radial-gradient(circle 4px at 50% 80%, #d4a017 70%, transparent 72%),
        radial-gradient(circle 3px at 80% 85%, #d4a017 70%, transparent 72%),
        radial-gradient(circle 6px at 50% 45%, transparent 50%, #d4a017 52%, #d4a017 58%, transparent 60%),
        radial-gradient(circle 8px at 25% 40%, transparent 50%, #d4a017 52%, #d4a017 56%, transparent 58%),
        radial-gradient(circle 7px at 70% 70%, transparent 50%, #d4a017 52%, #d4a017 56%, transparent 58%),
        #1a0a2e
      `,
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Data – Round 2: Garments                                           */
/* ------------------------------------------------------------------ */

const GARMENTS: GarmentItem[] = [
  {
    id: "kimono",
    emoji: "\uD83D\uDC58",
    name: "Kimono",
    culture: "Japan",
    flag: "\uD83C\uDDEF\uD83C\uDDF5",
    funFact:
      "Kimono means 'thing to wear'. The way you tie your obi (belt) can show your age and the occasion!",
  },
  {
    id: "sari",
    emoji: "\uD83E\uDD7B",
    name: "Sari",
    culture: "India",
    flag: "\uD83C\uDDEE\uD83C\uDDF3",
    funFact:
      "A sari is a single piece of cloth, usually 5 to 9 metres long, draped in beautiful ways!",
  },
  {
    id: "poncho",
    emoji: "\uD83E\uDDE5",
    name: "Poncho",
    culture: "Peru / South America",
    flag: "\uD83C\uDDF5\uD83C\uDDEA",
    funFact:
      "Ponchos have been worn in South America for over 500 years. They were originally made from llama or alpaca wool!",
  },
  {
    id: "dirndl",
    emoji: "\uD83D\uDC57",
    name: "Dirndl",
    culture: "Germany / Austria",
    flag: "\uD83C\uDDE9\uD83C\uDDEA",
    funFact:
      "The way you tie your dirndl apron tells people if you are single, taken, or widowed!",
  },
  {
    id: "dashiki",
    emoji: "\uD83D\uDC55",
    name: "Dashiki",
    culture: "West Africa",
    flag: "\uD83C\uDDF3\uD83C\uDDEC",
    funFact:
      "Dashiki comes from the Yoruba word 'danshiki'. It became a symbol of African pride around the world!",
  },
];

/* ------------------------------------------------------------------ */
/*  Data – Round 3: Color Schemes                                      */
/* ------------------------------------------------------------------ */

const COLOR_SCHEMES = [
  {
    id: "sunrise",
    name: "Sunrise Gold",
    colors: ["#FFD700", "#FF8C00", "#FF4500"],
    bg: "linear-gradient(135deg, #FFD700, #FF8C00, #FF4500)",
  },
  {
    id: "ocean",
    name: "Ocean Breeze",
    colors: ["#00CED1", "#1E90FF", "#4169E1"],
    bg: "linear-gradient(135deg, #00CED1, #1E90FF, #4169E1)",
  },
  {
    id: "forest",
    name: "Enchanted Forest",
    colors: ["#2ECC71", "#27AE60", "#1E8449"],
    bg: "linear-gradient(135deg, #2ECC71, #27AE60, #1E8449)",
  },
  {
    id: "royal",
    name: "Royal Purple",
    colors: ["#9B59B6", "#8E44AD", "#6C3483"],
    bg: "linear-gradient(135deg, #9B59B6, #8E44AD, #6C3483)",
  },
  {
    id: "blossom",
    name: "Cherry Blossom",
    colors: ["#FFB6C1", "#FF69B4", "#FF1493"],
    bg: "linear-gradient(135deg, #FFB6C1, #FF69B4, #FF1493)",
  },
];

/* ------------------------------------------------------------------ */
/*  Helper – shuffle an array                                          */
/* ------------------------------------------------------------------ */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ------------------------------------------------------------------ */
/*  Helper – generate fun outfit name                                  */
/* ------------------------------------------------------------------ */

function generateOutfitName(
  patternName: string,
  garmentName: string,
  colorName: string,
): string {
  const adjectives = [
    "Magnificent",
    "Dazzling",
    "Splendid",
    "Glorious",
    "Stunning",
    "Radiant",
    "Fabulous",
    "Legendary",
  ];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  return `The ${adj} ${colorName} ${patternName} ${garmentName}`;
}

/* ------------------------------------------------------------------ */
/*  Keyframe injection (once)                                          */
/* ------------------------------------------------------------------ */

const STYLE_ID = "fashion-mix-match-keyframes";

function ensureKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes fmm-shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-6px); }
      40% { transform: translateX(6px); }
      60% { transform: translateX(-4px); }
      80% { transform: translateX(4px); }
    }
    @keyframes fmm-glow {
      0% { box-shadow: 0 0 5px rgba(72,199,142,0.4); }
      50% { box-shadow: 0 0 25px rgba(72,199,142,0.9); }
      100% { box-shadow: 0 0 5px rgba(72,199,142,0.4); }
    }
    @keyframes fmm-confetti {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(-120px) rotate(720deg); opacity: 0; }
    }
    @keyframes fmm-float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    @keyframes fmm-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FashionMixMatch() {
  ensureKeyframes();

  /* -- state --------------------------------------------------------- */
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [score, setScore] = useState(0);

  // Round 1
  const [r1Cultures] = useState(() => shuffle(PATTERNS.map((p) => p.culture)));
  const [r1Selected, setR1Selected] = useState<string | null>(null);
  const [r1Matches, setR1Matches] = useState<Record<string, string>>({});
  const [r1Results, setR1Results] = useState<Record<string, boolean>>({});
  const [r1Shake, setR1Shake] = useState<string | null>(null);
  const [r1ShowFact, setR1ShowFact] = useState<string | null>(null);

  // Round 2
  const [r2Cultures] = useState(() =>
    shuffle(GARMENTS.map((g) => g.culture)),
  );
  const [r2Selected, setR2Selected] = useState<string | null>(null);
  const [r2Matches, setR2Matches] = useState<Record<string, string>>({});
  const [r2Results, setR2Results] = useState<Record<string, boolean>>({});
  const [r2Shake, setR2Shake] = useState<string | null>(null);
  const [r2ShowFact, setR2ShowFact] = useState<string | null>(null);

  // Round 3
  const [r3Pattern, setR3Pattern] = useState<string | null>(null);
  const [r3Garment, setR3Garment] = useState<string | null>(null);
  const [r3Color, setR3Color] = useState<string | null>(null);
  const [r3Done, setR3Done] = useState(false);
  const [outfitName, setOutfitName] = useState("");

  /* -- helpers ------------------------------------------------------- */
  const r1AllMatched = Object.keys(r1Results).length === PATTERNS.length;
  const r2AllMatched = Object.keys(r2Results).length === GARMENTS.length;

  function handleR1PatternClick(patternId: string) {
    if (r1Results[patternId]) return;
    setR1Selected(patternId);
    setR1ShowFact(null);
  }

  function handleR1CultureClick(culture: string) {
    if (!r1Selected) return;
    const pattern = PATTERNS.find((p) => p.id === r1Selected);
    if (!pattern) return;

    if (pattern.culture === culture) {
      setR1Matches((m) => ({ ...m, [r1Selected]: culture }));
      setR1Results((r) => ({ ...r, [r1Selected]: true }));
      setScore((s) => s + 20);
      setR1ShowFact(r1Selected);
      setR1Selected(null);
    } else {
      setR1Shake(r1Selected);
      setTimeout(() => setR1Shake(null), 500);
    }
  }

  function handleR2GarmentClick(garmentId: string) {
    if (r2Results[garmentId]) return;
    setR2Selected(garmentId);
    setR2ShowFact(null);
  }

  function handleR2CultureClick(culture: string) {
    if (!r2Selected) return;
    const garment = GARMENTS.find((g) => g.id === r2Selected);
    if (!garment) return;

    if (garment.culture === culture) {
      setR2Matches((m) => ({ ...m, [r2Selected]: culture }));
      setR2Results((r) => ({ ...r, [r2Selected]: true }));
      setScore((s) => s + 20);
      setR2ShowFact(r2Selected);
      setR2Selected(null);
    } else {
      setR2Shake(r2Selected);
      setTimeout(() => setR2Shake(null), 500);
    }
  }

  function handleCreateOutfit() {
    if (!r3Pattern || !r3Garment || !r3Color) return;
    const p = PATTERNS.find((x) => x.id === r3Pattern);
    const g = GARMENTS.find((x) => x.id === r3Garment);
    const c = COLOR_SCHEMES.find((x) => x.id === r3Color);
    if (!p || !g || !c) return;
    setOutfitName(generateOutfitName(p.name, g.name, c.name));
    setScore((s) => s + 50);
    setR3Done(true);
  }

  /* -- shared styles ------------------------------------------------- */

  const containerStyle: React.CSSProperties = {
    maxWidth: 720,
    margin: "0 auto",
    fontFamily:
      "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    background: "linear-gradient(145deg, #fdf2f8, #faf5ff, #fef3c7)",
    borderRadius: 20,
    padding: "24px 20px",
    position: "relative",
    overflow: "hidden",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: 26,
    fontWeight: 800,
    textAlign: "center",
    margin: "0 0 4px",
    background: "linear-gradient(90deg, #ec4899, #a855f7, #d97706)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const subHeadingStyle: React.CSSProperties = {
    fontSize: 14,
    textAlign: "center",
    color: "#9333ea",
    fontWeight: 600,
    margin: "0 0 16px",
  };

  const btnBase: React.CSSProperties = {
    border: "none",
    borderRadius: 12,
    padding: "10px 24px",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    transition: "transform 0.15s, box-shadow 0.15s",
  };

  const primaryBtn: React.CSSProperties = {
    ...btnBase,
    background: "linear-gradient(135deg, #ec4899, #a855f7)",
    color: "#fff",
    boxShadow: "0 4px 14px rgba(168,85,247,0.4)",
  };

  const scoreBarStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
    padding: "8px 16px",
    background: "rgba(255,255,255,0.7)",
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 700,
    color: "#7c3aed",
  };

  const swatchStyle = (
    css: React.CSSProperties,
    isSelected: boolean,
    isMatched: boolean,
    isShaking: boolean,
  ): React.CSSProperties => ({
    width: 100,
    height: 100,
    borderRadius: 14,
    ...css,
    border: isSelected
      ? "3px solid #a855f7"
      : isMatched
        ? "3px solid #22c55e"
        : "3px solid rgba(0,0,0,0.1)",
    cursor: isMatched ? "default" : "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    animation: isShaking
      ? "fmm-shake 0.4s ease-in-out"
      : isMatched
        ? "fmm-glow 1.5s ease-in-out"
        : "none",
    opacity: isMatched ? 0.7 : 1,
    boxShadow: isSelected ? "0 0 0 4px rgba(168,85,247,0.3)" : "none",
    flexShrink: 0,
  });

  const cultureChipStyle = (disabled: boolean): React.CSSProperties => ({
    padding: "8px 14px",
    borderRadius: 10,
    border: "2px solid #e9d5ff",
    background: disabled ? "#f3f4f6" : "#fff",
    cursor: disabled ? "default" : "pointer",
    fontSize: 14,
    fontWeight: 600,
    color: disabled ? "#9ca3af" : "#7c3aed",
    transition: "background 0.15s, transform 0.15s",
    textDecoration: disabled ? "line-through" : "none",
  });

  const factBoxStyle: React.CSSProperties = {
    marginTop: 12,
    padding: "12px 16px",
    borderRadius: 12,
    background: "linear-gradient(135deg, #dcfce7, #d1fae5)",
    border: "2px solid #86efac",
    fontSize: 14,
    color: "#166534",
    fontWeight: 500,
    textAlign: "center",
  };

  const garmentCardStyle = (
    isSelected: boolean,
    isMatched: boolean,
    isShaking: boolean,
  ): React.CSSProperties => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 110,
    height: 110,
    borderRadius: 14,
    background: isMatched
      ? "linear-gradient(135deg, #dcfce7, #bbf7d0)"
      : isSelected
        ? "linear-gradient(135deg, #faf5ff, #f3e8ff)"
        : "#fff",
    border: isSelected
      ? "3px solid #a855f7"
      : isMatched
        ? "3px solid #22c55e"
        : "2px solid #e5e7eb",
    cursor: isMatched ? "default" : "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    animation: isShaking
      ? "fmm-shake 0.4s ease-in-out"
      : isMatched
        ? "fmm-glow 1.5s ease-in-out"
        : "none",
    boxShadow: isSelected ? "0 0 0 4px rgba(168,85,247,0.3)" : "none",
    opacity: isMatched ? 0.75 : 1,
    flexShrink: 0,
    gap: 4,
  });

  /* -- render: INTRO ------------------------------------------------- */

  if (phase === "intro") {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div
            style={{
              fontSize: 56,
              marginBottom: 12,
              animation: "fmm-float 2s ease-in-out infinite",
            }}
          >
            {"\uD83E\uDDF5\uD83C\uDF0D\uD83D\uDC57"}
          </div>
          <h2 style={{ ...headingStyle, fontSize: 30, marginBottom: 8 }}>
            Global Fashion Mix &amp; Match
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "#6b21a8",
              maxWidth: 440,
              margin: "0 auto 20px",
              lineHeight: 1.5,
            }}
          >
            Explore amazing fashion and textiles from around the world! Match
            patterns and garments to their cultures, then design your very own
            global outfit.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 24,
              marginBottom: 24,
              flexWrap: "wrap",
            }}
          >
            {["Round 1: Match the Pattern", "Round 2: Match the Garment", "Round 3: Design Your Outfit"].map(
              (label, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    borderRadius: 12,
                    padding: "10px 16px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#7c3aed",
                    border: "1px solid #e9d5ff",
                  }}
                >
                  {label}
                </div>
              ),
            )}
          </div>
          <button
            style={primaryBtn}
            onClick={() => setPhase("round1")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Start Fashion Journey!
          </button>
        </div>
      </div>
    );
  }

  /* -- render: ROUND 1 ----------------------------------------------- */

  if (phase === "round1") {
    const matchedCultures = new Set(Object.values(r1Matches));
    const currentFact = r1ShowFact
      ? PATTERNS.find((p) => p.id === r1ShowFact)
      : null;

    return (
      <div style={containerStyle}>
        <h2 style={headingStyle}>Round 1: Match the Pattern</h2>
        <p style={subHeadingStyle}>
          Click a pattern, then click its culture of origin!
        </p>

        <div style={scoreBarStyle}>
          {"\u2B50"} Score: {score} / 200
        </div>

        {/* Pattern swatches */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          {PATTERNS.map((p) => (
            <div key={p.id} style={{ textAlign: "center" }}>
              <div
                style={swatchStyle(
                  p.css,
                  r1Selected === p.id,
                  !!r1Results[p.id],
                  r1Shake === p.id,
                )}
                onClick={() => handleR1PatternClick(p.id)}
                title={p.name}
              />
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  marginTop: 6,
                  color: r1Results[p.id] ? "#22c55e" : "#7c3aed",
                }}
              >
                {p.name}
                {r1Results[p.id] ? " \u2705" : ""}
              </div>
            </div>
          ))}
        </div>

        {/* Culture buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
            marginBottom: 12,
          }}
        >
          {r1Cultures.map((culture) => {
            const pattern = PATTERNS.find((p) => p.culture === culture);
            const disabled = matchedCultures.has(culture);
            return (
              <button
                key={culture}
                style={cultureChipStyle(disabled)}
                disabled={disabled}
                onClick={() => handleR1CultureClick(culture)}
                onMouseEnter={(e) => {
                  if (!disabled)
                    e.currentTarget.style.background = "#f3e8ff";
                }}
                onMouseLeave={(e) => {
                  if (!disabled) e.currentTarget.style.background = "#fff";
                }}
              >
                {pattern?.flag} {culture}
              </button>
            );
          })}
        </div>

        {/* Fun fact display */}
        {currentFact && (
          <div style={factBoxStyle}>
            {"\u2728"} <strong>Fun Fact:</strong> {currentFact.funFact}
          </div>
        )}

        {/* Next round button */}
        {r1AllMatched && (
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#16a34a",
                marginBottom: 10,
              }}
            >
              {"\uD83C\uDF89"} All patterns matched! Great job!
            </div>
            <button
              style={primaryBtn}
              onClick={() => setPhase("round2")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Next: Match the Garment {"\u2192"}
            </button>
          </div>
        )}
      </div>
    );
  }

  /* -- render: ROUND 2 ----------------------------------------------- */

  if (phase === "round2") {
    const matchedCultures = new Set(Object.values(r2Matches));
    const currentFact = r2ShowFact
      ? GARMENTS.find((g) => g.id === r2ShowFact)
      : null;

    return (
      <div style={containerStyle}>
        <h2 style={headingStyle}>Round 2: Match the Garment</h2>
        <p style={subHeadingStyle}>
          Click a garment, then click its culture of origin!
        </p>

        <div style={scoreBarStyle}>
          {"\u2B50"} Score: {score} / 200
        </div>

        {/* Garment cards */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          {GARMENTS.map((g) => (
            <div
              key={g.id}
              style={garmentCardStyle(
                r2Selected === g.id,
                !!r2Results[g.id],
                r2Shake === g.id,
              )}
              onClick={() => handleR2GarmentClick(g.id)}
            >
              <span style={{ fontSize: 36 }}>{g.emoji}</span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: r2Results[g.id] ? "#16a34a" : "#6b21a8",
                }}
              >
                {g.name}
                {r2Results[g.id] ? " \u2705" : ""}
              </span>
            </div>
          ))}
        </div>

        {/* Culture buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
            marginBottom: 12,
          }}
        >
          {r2Cultures.map((culture) => {
            const garment = GARMENTS.find((g) => g.culture === culture);
            const disabled = matchedCultures.has(culture);
            return (
              <button
                key={culture}
                style={cultureChipStyle(disabled)}
                disabled={disabled}
                onClick={() => handleR2CultureClick(culture)}
                onMouseEnter={(e) => {
                  if (!disabled)
                    e.currentTarget.style.background = "#f3e8ff";
                }}
                onMouseLeave={(e) => {
                  if (!disabled) e.currentTarget.style.background = "#fff";
                }}
              >
                {garment?.flag} {culture}
              </button>
            );
          })}
        </div>

        {/* Fun fact display */}
        {currentFact && (
          <div style={factBoxStyle}>
            {"\u2728"} <strong>Fun Fact:</strong> {currentFact.funFact}
          </div>
        )}

        {/* Next round button */}
        {r2AllMatched && (
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#16a34a",
                marginBottom: 10,
              }}
            >
              {"\uD83C\uDF89"} All garments matched! Amazing!
            </div>
            <button
              style={primaryBtn}
              onClick={() => setPhase("round3")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Next: Design Your Outfit {"\u2192"}
            </button>
          </div>
        )}
      </div>
    );
  }

  /* -- render: ROUND 3 ----------------------------------------------- */

  if (phase === "round3") {
    const selectedPattern = PATTERNS.find((p) => p.id === r3Pattern);
    const selectedGarment = GARMENTS.find((g) => g.id === r3Garment);
    const selectedColor = COLOR_SCHEMES.find((c) => c.id === r3Color);

    const selectionCardStyle = (
      isSelected: boolean,
    ): React.CSSProperties => ({
      padding: "8px 12px",
      borderRadius: 10,
      border: isSelected ? "2px solid #a855f7" : "2px solid #e5e7eb",
      background: isSelected
        ? "linear-gradient(135deg, #faf5ff, #f3e8ff)"
        : "#fff",
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 600,
      color: "#6b21a8",
      transition: "all 0.15s",
      textAlign: "center" as const,
    });

    return (
      <div style={containerStyle}>
        <h2 style={headingStyle}>Round 3: Design Your Outfit</h2>
        <p style={subHeadingStyle}>
          Mix a pattern, a garment, and a color scheme to create something
          amazing!
        </p>

        <div style={scoreBarStyle}>
          {"\u2B50"} Score: {score} / 250
        </div>

        {!r3Done ? (
          <>
            {/* Pick a pattern */}
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#7c3aed",
                  marginBottom: 8,
                }}
              >
                1. Pick a Pattern:
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  justifyContent: "center",
                }}
              >
                {PATTERNS.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setR3Pattern(p.id)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 10,
                        ...p.css,
                        border:
                          r3Pattern === p.id
                            ? "3px solid #a855f7"
                            : "2px solid #e5e7eb",
                        boxShadow:
                          r3Pattern === p.id
                            ? "0 0 0 3px rgba(168,85,247,0.3)"
                            : "none",
                      }}
                    />
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#7c3aed" }}>
                      {p.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pick a garment */}
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#7c3aed",
                  marginBottom: 8,
                }}
              >
                2. Pick a Garment:
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  justifyContent: "center",
                }}
              >
                {GARMENTS.map((g) => (
                  <button
                    key={g.id}
                    style={selectionCardStyle(r3Garment === g.id)}
                    onClick={() => setR3Garment(g.id)}
                  >
                    <span style={{ fontSize: 24 }}>{g.emoji}</span>
                    <br />
                    {g.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Pick a color scheme */}
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#7c3aed",
                  marginBottom: 8,
                }}
              >
                3. Pick a Color Scheme:
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  justifyContent: "center",
                }}
              >
                {COLOR_SCHEMES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setR3Color(c.id)}
                    style={{
                      ...selectionCardStyle(r3Color === c.id),
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                      padding: "8px 14px",
                    }}
                  >
                    <div
                      style={{
                        width: 50,
                        height: 20,
                        borderRadius: 6,
                        background: c.bg,
                      }}
                    />
                    <span style={{ fontSize: 11 }}>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Create button */}
            <div style={{ textAlign: "center" }}>
              <button
                style={{
                  ...primaryBtn,
                  opacity: r3Pattern && r3Garment && r3Color ? 1 : 0.4,
                  cursor:
                    r3Pattern && r3Garment && r3Color
                      ? "pointer"
                      : "not-allowed",
                }}
                disabled={!r3Pattern || !r3Garment || !r3Color}
                onClick={handleCreateOutfit}
                onMouseEnter={(e) => {
                  if (r3Pattern && r3Garment && r3Color)
                    e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {"\u2728"} Create My Outfit!
              </button>
            </div>
          </>
        ) : (
          /* -- Outfit result card -- */
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "inline-block",
                borderRadius: 20,
                overflow: "hidden",
                border: "3px solid #d97706",
                boxShadow: "0 8px 30px rgba(168,85,247,0.3)",
                marginBottom: 16,
              }}
            >
              {/* Pattern background + garment */}
              <div
                style={{
                  width: 220,
                  height: 220,
                  position: "relative",
                  ...selectedPattern?.css,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Color overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: selectedColor?.bg,
                    opacity: 0.35,
                  }}
                />
                <span
                  style={{
                    fontSize: 80,
                    position: "relative",
                    zIndex: 1,
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                    animation: "fmm-float 2s ease-in-out infinite",
                  }}
                >
                  {selectedGarment?.emoji}
                </span>
              </div>
              {/* Label */}
              <div
                style={{
                  background: "linear-gradient(135deg, #faf5ff, #fef3c7)",
                  padding: "12px 16px",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    color: "#a855f7",
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  Your Creation
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: "#7c2d12",
                    lineHeight: 1.3,
                  }}
                >
                  {outfitName}!
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#6b21a8",
                    marginTop: 4,
                  }}
                >
                  {selectedPattern?.name} + {selectedGarment?.name} +{" "}
                  {selectedColor?.name}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 8 }}>
              <button
                style={primaryBtn}
                onClick={() => setPhase("celebration")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                See Final Results {"\uD83C\uDFC6"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* -- render: CELEBRATION ------------------------------------------- */

  if (phase === "celebration") {
    const confettiPieces = [
      "\uD83C\uDF1F",
      "\uD83D\uDC9C",
      "\uD83D\uDC9B",
      "\uD83E\uDDF5",
      "\u2728",
      "\uD83C\uDF80",
      "\uD83C\uDFA8",
      "\uD83C\uDF0D",
    ];

    return (
      <div style={containerStyle}>
        {/* Confetti */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 80,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {confettiPieces.map((emoji, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                top: 60,
                left: `${10 + i * 12}%`,
                fontSize: 22,
                animation: `fmm-confetti ${1.5 + i * 0.2}s ease-out infinite`,
                animationDelay: `${i * 0.15}s`,
              }}
            >
              {emoji}
            </span>
          ))}
        </div>

        <div style={{ textAlign: "center", paddingTop: 30 }}>
          <div
            style={{
              fontSize: 60,
              marginBottom: 12,
              animation: "fmm-float 2s ease-in-out infinite",
            }}
          >
            {"\uD83C\uDFC6"}
          </div>
          <h2
            style={{
              ...headingStyle,
              fontSize: 28,
              marginBottom: 8,
            }}
          >
            Fashion Designer Extraordinaire!
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#6b21a8",
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            You explored fashion and textiles from around the world!
          </p>

          {/* Score card */}
          <div
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #faf5ff, #fef3c7)",
              borderRadius: 16,
              padding: "20px 32px",
              border: "2px solid #d97706",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                fontSize: 40,
                fontWeight: 800,
                background:
                  "linear-gradient(90deg, #d97706, #ec4899, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {score} Points
            </div>
            <div style={{ fontSize: 14, color: "#7c3aed", marginTop: 4 }}>
              {score >= 200
                ? "Perfect matching + creative design!"
                : "Great effort! Try again for a perfect score!"}
            </div>
          </div>

          {/* Summary */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            {[
              {
                label: "Patterns Learned",
                value: Object.keys(r1Results).length,
                total: PATTERNS.length,
                emoji: "\uD83E\uDDF6",
              },
              {
                label: "Garments Learned",
                value: Object.keys(r2Results).length,
                total: GARMENTS.length,
                emoji: "\uD83D\uDC57",
              },
              {
                label: "Outfit Created",
                value: r3Done ? 1 : 0,
                total: 1,
                emoji: "\u2728",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: "12px 18px",
                  border: "1px solid #e9d5ff",
                  minWidth: 130,
                }}
              >
                <div style={{ fontSize: 24 }}>{stat.emoji}</div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#7c3aed",
                  }}
                >
                  {stat.value}/{stat.total}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#9333ea",
                    fontWeight: 600,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Play again */}
          <button
            style={primaryBtn}
            onClick={() => {
              setPhase("intro");
              setScore(0);
              setR1Selected(null);
              setR1Matches({});
              setR1Results({});
              setR1ShowFact(null);
              setR2Selected(null);
              setR2Matches({});
              setR2Results({});
              setR2ShowFact(null);
              setR3Pattern(null);
              setR3Garment(null);
              setR3Color(null);
              setR3Done(false);
              setOutfitName("");
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Play Again {"\uD83D\uDD04"}
          </button>
        </div>
      </div>
    );
  }

  return null;
}
