import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Ingredient {
  name: string;
  baseAmount: number;   // stored as a decimal (e.g. 0.75 for ¾)
  unit: string;
}

interface Recipe {
  title: string;
  emoji: string;
  baseServings: number;
  baseUnit: string;     // "cookies" | "servings" | "pizzas"
  ingredients: Ingredient[];
  targetOptions: { label: string; servings: number }[];
  scienceTip: string;
}

interface IngredientResult {
  value: string;
  correct: boolean | null; // null = not checked yet
}

/* ------------------------------------------------------------------ */
/*  Recipe data                                                        */
/* ------------------------------------------------------------------ */

const RECIPES: Recipe[] = [
  {
    title: "Chocolate Chip Cookies",
    emoji: "🍪",
    baseServings: 24,
    baseUnit: "cookies",
    ingredients: [
      { name: "Flour", baseAmount: 2, unit: "cups" },
      { name: "Butter", baseAmount: 1, unit: "cup" },
      { name: "Sugar", baseAmount: 0.75, unit: "cup" },
      { name: "Chocolate Chips", baseAmount: 0.5, unit: "cup" },
      { name: "Eggs", baseAmount: 2, unit: "" },
    ],
    targetOptions: [
      { label: "12 cookies (÷2)", servings: 12 },
      { label: "48 cookies (×2)", servings: 48 },
    ],
    scienceTip:
      "Keeping the ratio of flour to butter correct is what makes cookies chewy vs. cakey. Too much flour makes them dry; too much butter makes them flat!",
  },
  {
    title: "Pancakes",
    emoji: "🥞",
    baseServings: 4,
    baseUnit: "servings",
    ingredients: [
      { name: "Flour", baseAmount: 1.5, unit: "cups" },
      { name: "Milk", baseAmount: 1, unit: "cup" },
      { name: "Egg", baseAmount: 1, unit: "" },
      { name: "Sugar", baseAmount: 2, unit: "tbsp" },
      { name: "Butter", baseAmount: 1, unit: "tbsp" },
    ],
    targetOptions: [
      { label: "2 servings (÷2)", servings: 2 },
      { label: "8 servings (×2)", servings: 8 },
    ],
    scienceTip:
      "The ratio of liquid to flour controls how thick or thin your pancakes are. Doubling only the milk would give you crepes instead of fluffy pancakes!",
  },
  {
    title: "Pizza Dough",
    emoji: "🍕",
    baseServings: 2,
    baseUnit: "pizzas",
    ingredients: [
      { name: "Flour", baseAmount: 3, unit: "cups" },
      { name: "Water", baseAmount: 1, unit: "cup" },
      { name: "Yeast", baseAmount: 2, unit: "tsp" },
      { name: "Salt", baseAmount: 1, unit: "tsp" },
      { name: "Olive Oil", baseAmount: 1, unit: "tbsp" },
    ],
    targetOptions: [
      { label: "1 pizza (÷2)", servings: 1 },
      { label: "6 pizzas (×3)", servings: 6 },
    ],
    scienceTip:
      "In bread-making, the water-to-flour ratio is called 'hydration'. Higher hydration = more air bubbles and a crispier crust. Bakers always scale by ratio!",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Turn a decimal like 0.75 into a nice display string like "¾" */
function formatAmount(n: number): string {
  // Handle common fractions
  const fracs: [number, string][] = [
    [0.25, "¼"],
    [0.5, "½"],
    [0.75, "¾"],
    [0.333, "⅓"],
    [0.667, "⅔"],
  ];

  const whole = Math.floor(n);
  const frac = n - whole;

  if (frac < 0.01) return whole.toString();

  for (const [val, sym] of fracs) {
    if (Math.abs(frac - val) < 0.01) {
      return whole > 0 ? `${whole}${sym}` : sym;
    }
  }

  // Fall back to one-decimal display
  return Number(n.toFixed(2)).toString();
}

/** Parse user input — accepts fractions (½, ¾, 1½, 3/4) and decimals */
function parseInput(raw: string): number | null {
  const s = raw.trim();
  if (s === "") return null;

  // Unicode fraction map
  const unicodeFracs: Record<string, number> = {
    "¼": 0.25,
    "½": 0.5,
    "¾": 0.75,
    "⅓": 1 / 3,
    "⅔": 2 / 3,
    "⅛": 0.125,
    "⅜": 0.375,
    "⅝": 0.625,
    "⅞": 0.875,
  };

  // Check for whole + unicode fraction, e.g. "1½"
  for (const [sym, val] of Object.entries(unicodeFracs)) {
    if (s.includes(sym)) {
      const rest = s.replace(sym, "").trim();
      const whole = rest === "" ? 0 : Number(rest);
      if (isNaN(whole)) return null;
      return whole + val;
    }
  }

  // Slash fractions: "3/4" or "1 3/4"
  const slashMatch = s.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (slashMatch) {
    return (
      Number(slashMatch[1]) +
      Number(slashMatch[2]) / Number(slashMatch[3])
    );
  }
  const simpleSlash = s.match(/^(\d+)\/(\d+)$/);
  if (simpleSlash) {
    return Number(simpleSlash[1]) / Number(simpleSlash[2]);
  }

  const num = Number(s);
  return isNaN(num) ? null : num;
}

function almostEqual(a: number, b: number): boolean {
  return Math.abs(a - b) < 0.01;
}

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const colors = {
  warmBrown: "#6D4C2E",
  creamyYellow: "#FFF8E7",
  softWhite: "#FFFDF7",
  cardBg: "#FFFFFF",
  accent: "#E8913A",
  accentLight: "#FCEBD5",
  green: "#4CAF50",
  red: "#E53935",
  muted: "#8B7355",
  inputBg: "#FEF3E2",
  inputBorder: "#DCC5A0",
};

const s = {
  wrapper: {
    background: `linear-gradient(135deg, ${colors.creamyYellow} 0%, ${colors.softWhite} 100%)`,
    borderRadius: 16,
    padding: "24px 20px",
    fontFamily:
      "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
    maxWidth: 640,
    margin: "0 auto",
    color: colors.warmBrown,
  } as React.CSSProperties,

  header: {
    textAlign: "center" as const,
    marginBottom: 20,
  } as React.CSSProperties,

  title: {
    fontSize: 26,
    fontWeight: 800,
    color: colors.warmBrown,
    margin: "4px 0",
  } as React.CSSProperties,

  subtitle: {
    fontSize: 14,
    color: colors.muted,
  } as React.CSSProperties,

  progress: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    marginBottom: 18,
  } as React.CSSProperties,

  dot: (active: boolean, done: boolean) =>
    ({
      width: 32,
      height: 32,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14,
      fontWeight: 700,
      background: done ? colors.green : active ? colors.accent : "#E8DCC8",
      color: done || active ? "#fff" : colors.muted,
      transition: "all 0.3s",
    }) as React.CSSProperties,

  card: {
    background: colors.cardBg,
    borderRadius: 14,
    padding: "22px 20px",
    boxShadow:
      "0 2px 12px rgba(109,76,46,0.10), 0 1px 3px rgba(109,76,46,0.06)",
    marginBottom: 16,
    border: "1px solid #F0E6D4",
  } as React.CSSProperties,

  recipeTitle: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 4,
  } as React.CSSProperties,

  baseLabel: {
    fontSize: 13,
    color: colors.muted,
    marginBottom: 14,
  } as React.CSSProperties,

  targetSelector: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap" as const,
    marginBottom: 16,
  } as React.CSSProperties,

  targetBtn: (selected: boolean) =>
    ({
      padding: "8px 16px",
      borderRadius: 20,
      border: `2px solid ${selected ? colors.accent : colors.inputBorder}`,
      background: selected ? colors.accentLight : colors.softWhite,
      color: colors.warmBrown,
      fontWeight: selected ? 700 : 500,
      fontSize: 14,
      cursor: "pointer",
      transition: "all 0.2s",
    }) as React.CSSProperties,

  ingredientRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    flexWrap: "wrap" as const,
  } as React.CSSProperties,

  ingredientName: {
    width: 130,
    fontSize: 14,
    fontWeight: 600,
    flexShrink: 0,
  } as React.CSSProperties,

  originalAmount: {
    fontSize: 13,
    color: colors.muted,
    width: 90,
    flexShrink: 0,
  } as React.CSSProperties,

  arrow: {
    fontSize: 16,
    color: colors.accent,
    flexShrink: 0,
  } as React.CSSProperties,

  inputWrap: {
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
    gap: 4,
  } as React.CSSProperties,

  input: (result: boolean | null) => {
    let borderColor = colors.inputBorder;
    if (result === true) borderColor = colors.green;
    if (result === false) borderColor = colors.red;
    return {
      width: 72,
      padding: "7px 10px",
      borderRadius: 10,
      border: `2px solid ${borderColor}`,
      background: colors.inputBg,
      fontSize: 15,
      fontWeight: 600,
      color: colors.warmBrown,
      textAlign: "center" as const,
      outline: "none",
      transition: "border-color 0.2s",
    } as React.CSSProperties;
  },

  unitLabel: {
    fontSize: 13,
    color: colors.muted,
    minWidth: 30,
  } as React.CSSProperties,

  resultIcon: {
    fontSize: 18,
    marginLeft: 2,
    flexShrink: 0,
  } as React.CSSProperties,

  btnRow: {
    display: "flex",
    gap: 10,
    marginTop: 16,
    flexWrap: "wrap" as const,
  } as React.CSSProperties,

  btnPrimary: {
    padding: "10px 24px",
    borderRadius: 24,
    border: "none",
    background: colors.accent,
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    transition: "transform 0.15s",
  } as React.CSSProperties,

  btnSecondary: {
    padding: "10px 24px",
    borderRadius: 24,
    border: `2px solid ${colors.inputBorder}`,
    background: "transparent",
    color: colors.warmBrown,
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
  } as React.CSSProperties,

  hint: {
    marginTop: 12,
    padding: "12px 14px",
    borderRadius: 10,
    background: "#FEF9EF",
    border: `1px dashed ${colors.inputBorder}`,
    fontSize: 13,
    lineHeight: 1.55,
    color: colors.warmBrown,
  } as React.CSSProperties,

  scienceCorner: {
    marginTop: 14,
    padding: "14px 16px",
    borderRadius: 12,
    background: "linear-gradient(135deg, #FFF4E0 0%, #FDE8CB 100%)",
    border: `1px solid #EDD8B5`,
    fontSize: 13,
    lineHeight: 1.6,
    color: colors.warmBrown,
  } as React.CSSProperties,

  celebration: {
    textAlign: "center" as const,
    padding: "36px 20px",
  } as React.CSSProperties,

  celebEmoji: {
    fontSize: 56,
    display: "block",
    marginBottom: 12,
  } as React.CSSProperties,

  celebTitle: {
    fontSize: 28,
    fontWeight: 800,
    color: colors.accent,
    marginBottom: 8,
  } as React.CSSProperties,

  celebBody: {
    fontSize: 15,
    color: colors.warmBrown,
    lineHeight: 1.6,
    maxWidth: 420,
    margin: "0 auto 20px",
  } as React.CSSProperties,
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BakingLab() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [completed, setCompleted] = useState<boolean[]>([false, false, false]);
  const [targetIndices, setTargetIndices] = useState<number[]>([0, 0, 0]);

  // Per-challenge answer state: array of IngredientResult per recipe
  const [answers, setAnswers] = useState<IngredientResult[][]>(
    RECIPES.map((r) =>
      r.ingredients.map(() => ({ value: "", correct: null }))
    )
  );
  const [showHint, setShowHint] = useState<boolean[]>([false, false, false]);
  const [showScience, setShowScience] = useState<boolean[]>([false, false, false]);

  const allDone = completed.every(Boolean);

  /* ---------- helpers ---------- */

  const recipe = RECIPES[currentChallenge];
  const targetIdx = targetIndices[currentChallenge];

  function setTargetForChallenge(ci: number, ti: number) {
    setTargetIndices((prev) => {
      const next = [...prev];
      next[ci] = ti;
      return next;
    });
    // Reset answers for this challenge when target changes
    setAnswers((prev) => {
      const next = [...prev];
      next[ci] = RECIPES[ci].ingredients.map(() => ({
        value: "",
        correct: null,
      }));
      return next;
    });
  }

  function updateAnswer(ci: number, ii: number, value: string) {
    setAnswers((prev) => {
      const next = prev.map((a) => [...a]);
      next[ci][ii] = { value, correct: null };
      return next;
    });
  }

  function checkAnswers() {
    const ci = currentChallenge;
    const r = RECIPES[ci];
    const sc = r.targetOptions[targetIndices[ci]].servings / r.baseServings;

    setAnswers((prev) => {
      const next = prev.map((a) => [...a]);
      let allCorrect = true;
      next[ci] = next[ci].map((ans, ii) => {
        const expected = r.ingredients[ii].baseAmount * sc;
        const parsed = parseInput(ans.value);
        const correct = parsed !== null && almostEqual(parsed, expected);
        if (!correct) allCorrect = false;
        return { ...ans, correct };
      });
      if (allCorrect) {
        setCompleted((p) => {
          const c = [...p];
          c[ci] = true;
          return c;
        });
      }
      return next;
    });
  }

  function nextChallenge() {
    if (currentChallenge < RECIPES.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
    }
  }

  function resetAll() {
    setCurrentChallenge(0);
    setCompleted([false, false, false]);
    setTargetIndices([0, 0, 0]);
    setAnswers(
      RECIPES.map((r) =>
        r.ingredients.map(() => ({ value: "", correct: null }))
      )
    );
    setShowHint([false, false, false]);
    setShowScience([false, false, false]);
  }

  function toggleHint(ci: number) {
    setShowHint((prev) => {
      const n = [...prev];
      n[ci] = !n[ci];
      return n;
    });
  }

  function toggleScience(ci: number) {
    setShowScience((prev) => {
      const n = [...prev];
      n[ci] = !n[ci];
      return n;
    });
  }

  /* ---------- build hint text ---------- */

  function hintText(): string {
    const r = RECIPES[currentChallenge];
    const tgt = r.targetOptions[targetIndices[currentChallenge]];
    const sc = tgt.servings / r.baseServings;
    const scaleLabel =
      sc === 0.5
        ? "dividing by 2"
        : sc === 2
          ? "multiplying by 2"
          : sc === 3
            ? "multiplying by 3"
            : `multiplying by ${sc}`;
    const lines = r.ingredients.map((ing) => {
      const expected = ing.baseAmount * sc;
      return `  ${ing.name}: ${formatAmount(ing.baseAmount)} ${ing.unit} ${sc < 1 ? "÷" : "×"} ${sc < 1 ? Math.round(1 / sc) : sc} = ${formatAmount(expected)} ${ing.unit}`;
    });
    return `To go from ${r.baseServings} ${r.baseUnit} to ${tgt.servings}, you are ${scaleLabel}.\n\n${lines.join("\n")}`;
  }

  /* ---------- render ---------- */

  if (allDone) {
    return (
      <div style={s.wrapper}>
        <div style={s.celebration}>
          <span style={s.celebEmoji}>🧑‍🍳👩‍🍳🎉</span>
          <div style={s.celebTitle}>Master Baker!</div>
          <p style={s.celebBody}>
            You nailed all three recipe scaling challenges! You now understand
            how bakers use ratios and multiplication to adjust any recipe. Keep
            experimenting in the kitchen -- math makes everything taste better!
          </p>

          <div style={s.scienceCorner}>
            <strong>Science Corner</strong>
            <br />
            <br />
            Professional bakers always measure by <em>ratio</em> rather than
            fixed amounts. A classic bread ratio is <strong>5:3 flour to water</strong>.
            This means no matter if you make 1 loaf or 100, the proportions
            stay the same -- and so does the taste! Understanding ratios is one
            of the most important math skills in any kitchen.
          </div>

          <div style={{ marginTop: 20 }}>
            <button style={s.btnPrimary} onClick={resetAll}>
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.wrapper}>
      {/* Header */}
      <div style={s.header}>
        <div style={{ fontSize: 36 }}>🧑‍🍳</div>
        <div style={s.title}>Baking Ratio Lab</div>
        <div style={s.subtitle}>
          Scale recipes up and down -- math makes the magic!
        </div>
      </div>

      {/* Progress dots */}
      <div style={s.progress}>
        {RECIPES.map((_, i) => (
          <button
            key={i}
            style={s.dot(i === currentChallenge, completed[i])}
            onClick={() => setCurrentChallenge(i)}
            aria-label={`Challenge ${i + 1}`}
          >
            {completed[i] ? "✓" : i + 1}
          </button>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          fontSize: 13,
          color: colors.muted,
          marginBottom: 14,
        }}
      >
        Challenge {currentChallenge + 1} of {RECIPES.length}
      </div>

      {/* Recipe card */}
      <div style={s.card}>
        <div style={s.recipeTitle}>
          {recipe.emoji} {recipe.title}
        </div>
        <div style={s.baseLabel}>
          Original recipe: {recipe.baseServings} {recipe.baseUnit}
        </div>

        {/* Target selector */}
        <div style={{ marginBottom: 6, fontSize: 14, fontWeight: 600 }}>
          Scale to:
        </div>
        <div style={s.targetSelector}>
          {recipe.targetOptions.map((opt, ti) => (
            <button
              key={ti}
              style={s.targetBtn(ti === targetIdx)}
              onClick={() => setTargetForChallenge(currentChallenge, ti)}
              disabled={completed[currentChallenge]}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Ingredient rows */}
        <div style={{ marginTop: 8 }}>
          {recipe.ingredients.map((ing, ii) => {
            const ans = answers[currentChallenge][ii];
            return (
              <div key={ii} style={s.ingredientRow}>
                <div style={s.ingredientName}>{ing.name}</div>
                <div style={s.originalAmount}>
                  {formatAmount(ing.baseAmount)} {ing.unit}
                </div>
                <span style={s.arrow}>→</span>
                <div style={s.inputWrap}>
                  <input
                    type="text"
                    style={s.input(ans.correct)}
                    value={ans.value}
                    onChange={(e) =>
                      updateAnswer(currentChallenge, ii, e.target.value)
                    }
                    placeholder="?"
                    disabled={completed[currentChallenge]}
                    aria-label={`Scaled amount of ${ing.name}`}
                  />
                  <span style={s.unitLabel}>{ing.unit}</span>
                  {ans.correct === true && (
                    <span style={{ ...s.resultIcon, color: colors.green }}>
                      ✓
                    </span>
                  )}
                  {ans.correct === false && (
                    <span style={{ ...s.resultIcon, color: colors.red }}>
                      ✗
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div style={s.btnRow}>
          {!completed[currentChallenge] && (
            <button style={s.btnPrimary} onClick={checkAnswers}>
              Check Answers
            </button>
          )}
          {completed[currentChallenge] &&
            currentChallenge < RECIPES.length - 1 && (
              <button style={s.btnPrimary} onClick={nextChallenge}>
                Next Challenge →
              </button>
            )}
          {!completed[currentChallenge] && (
            <button
              style={s.btnSecondary}
              onClick={() => toggleHint(currentChallenge)}
            >
              {showHint[currentChallenge] ? "Hide Hint" : "Show Hint"}
            </button>
          )}
          <button
            style={s.btnSecondary}
            onClick={() => toggleScience(currentChallenge)}
          >
            {showScience[currentChallenge]
              ? "Hide Science"
              : "🔬 Science Corner"}
          </button>
        </div>

        {/* Hint */}
        {showHint[currentChallenge] && !completed[currentChallenge] && (
          <div style={s.hint}>
            <strong>Hint:</strong>
            <pre
              style={{
                fontFamily: "inherit",
                whiteSpace: "pre-wrap",
                margin: "6px 0 0",
              }}
            >
              {hintText()}
            </pre>
          </div>
        )}

        {/* Completed message */}
        {completed[currentChallenge] && (
          <div
            style={{
              marginTop: 14,
              padding: "10px 14px",
              borderRadius: 10,
              background: "#E8F5E9",
              color: "#2E7D32",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Perfect! All amounts are correct! {recipe.emoji}
          </div>
        )}

        {/* Science Corner */}
        {showScience[currentChallenge] && (
          <div style={s.scienceCorner}>
            <strong>🔬 Science Corner</strong>
            <br />
            {recipe.scienceTip}
          </div>
        )}
      </div>
    </div>
  );
}
