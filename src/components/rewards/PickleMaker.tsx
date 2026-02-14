import { useState, useEffect, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ProjectId = "pickles" | "kimchi" | "sourdough";
type Step = "choose" | "prepare" | "conditions" | "ferment" | "results";

interface Ingredient {
  name: string;
  emoji: string;
  fact: string;
  added: boolean;
}

interface Project {
  id: ProjectId;
  title: string;
  emoji: string;
  color: string;
  colorLight: string;
  ingredients: Ingredient[];
  milestones: string[];
  optimalTemp: number;
  optimalSalt: number;
  scienceSummary: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const PROJECTS: Record<ProjectId, Omit<Project, "id">> = {
  pickles: {
    title: "Pickles",
    emoji: "\u{1F952}",
    color: "#4a8c3f",
    colorLight: "#e8f5e3",
    ingredients: [
      {
        name: "Cucumbers",
        emoji: "\u{1F952}",
        fact: "Cucumbers are 95% water \u2014 perfect for soaking up salty brine!",
        added: false,
      },
      {
        name: "Salt",
        emoji: "\u{1F9C2}",
        fact: "Salt pulls water out of cucumbers through osmosis and keeps bad bacteria away!",
        added: false,
      },
      {
        name: "Water",
        emoji: "\u{1F4A7}",
        fact: "The brine creates an environment where only good bacteria (Lactobacillus) can thrive!",
        added: false,
      },
      {
        name: "Garlic",
        emoji: "\u{1F9C4}",
        fact: "Garlic adds flavor AND has natural antimicrobial properties!",
        added: false,
      },
      {
        name: "Dill",
        emoji: "\u{1F33F}",
        fact: "Dill has been used in pickling for thousands of years \u2014 even the ancient Egyptians pickled!",
        added: false,
      },
    ],
    milestones: [
      "Day 1: Bacteria are waking up! Salt is pulling water from the cucumbers.",
      "Day 2: Lactobacillus bacteria start eating the sugars!",
      "Day 3: Lactobacillus is taking over! The brine is getting cloudy.",
      "Day 5: Lactic acid is building up \u2014 that\u2019s the sour taste!",
      "Day 7: The pickles are getting crunchy and tangy!",
    ],
    optimalTemp: 1,
    optimalSalt: 1,
    scienceSummary:
      "Lactobacillus bacteria converted sugars in the cucumbers into lactic acid through anaerobic fermentation. The salt created a selective environment where only beneficial bacteria could survive, preserving the cucumbers and creating that classic sour, crunchy pickle taste!",
  },
  kimchi: {
    title: "Kimchi",
    emoji: "\u{1F96C}",
    color: "#c0392b",
    colorLight: "#fde8e5",
    ingredients: [
      {
        name: "Napa Cabbage",
        emoji: "\u{1F96C}",
        fact: "Napa cabbage is salted first to wilt it and draw out water \u2014 that\u2019s osmosis at work!",
        added: false,
      },
      {
        name: "Korean Chili Flakes",
        emoji: "\u{1F336}\uFE0F",
        fact: "Gochugaru (chili flakes) gives kimchi its red color and has antioxidants!",
        added: false,
      },
      {
        name: "Garlic",
        emoji: "\u{1F9C4}",
        fact: "Garlic contains allicin, which helps control which bacteria grow during fermentation!",
        added: false,
      },
      {
        name: "Salt",
        emoji: "\u{1F9C2}",
        fact: "Salt concentration determines which microbes survive \u2014 too little and bad bacteria win!",
        added: false,
      },
      {
        name: "Fish Sauce",
        emoji: "\u{1F41F}",
        fact: "Fish sauce adds umami flavor AND provides extra amino acids for bacteria to eat!",
        added: false,
      },
    ],
    milestones: [
      "Day 1: Salt is drawing water from the cabbage. Bacteria are gathering!",
      "Day 2: Leuconostoc bacteria start the fermentation party!",
      "Day 4: Lactobacillus takes the lead! CO\u2082 bubbles are forming.",
      "Day 6: The flavors are developing \u2014 sour, spicy, and umami!",
      "Day 8: Kimchi is perfectly tangy and full of probiotics!",
    ],
    optimalTemp: 1,
    optimalSalt: 1,
    scienceSummary:
      "Multiple species of lactic acid bacteria worked in sequence: first Leuconostoc started the fermentation, then Lactobacillus took over as acidity increased. The chili, garlic, and fish sauce provided nutrients while salt controlled the microbial environment. The result is a probiotic-rich food with complex flavors!",
  },
  sourdough: {
    title: "Sourdough Starter",
    emoji: "\u{1F35E}",
    color: "#b8860b",
    colorLight: "#fdf5e6",
    ingredients: [
      {
        name: "Flour",
        emoji: "\u{1F33E}",
        fact: "Flour contains natural wild yeast and bacteria \u2014 they\u2019ve been hitching a ride on the wheat!",
        added: false,
      },
      {
        name: "Water",
        emoji: "\u{1F4A7}",
        fact: "Water activates enzymes in flour that break starch into sugars for yeast to eat!",
        added: false,
      },
      {
        name: "Wild Yeast",
        emoji: "\u{1F9EB}",
        fact: "Wild yeast is everywhere \u2014 in the air, on your hands, on fruit! It\u2019s been making bread rise for 6,000 years!",
        added: false,
      },
      {
        name: "Time & Patience",
        emoji: "\u23F3",
        fact: "A sourdough starter needs daily feeding \u2014 it\u2019s like having a tiny pet made of microbes!",
        added: false,
      },
    ],
    milestones: [
      "Day 1: Flour and water are mixed. Wild yeast is waking up!",
      "Day 3: Bacteria are producing acids \u2014 that\u2019s the \u2018sour\u2019 in sourdough!",
      "Day 5: Yeast is producing CO\u2082 \u2014 look at those bubbles!",
      "Day 7: The starter is rising and falling predictably!",
      "Day 10: Your starter is alive and ready to bake with!",
    ],
    optimalTemp: 1,
    optimalSalt: 0,
    scienceSummary:
      "Wild yeast (Saccharomyces) and Lactobacillus bacteria formed a symbiotic culture. The yeast produces CO\u2082 gas that makes bread rise, while the bacteria produce lactic and acetic acids that create the sour flavor. Together they create a stable ecosystem that can live forever if you keep feeding it!",
  },
};

const TEMP_LABELS = ["Cold (40\u00B0F)", "Room Temp (68\u00B0F)", "Warm (85\u00B0F)"];
const SALT_LABELS = ["Low Salt", "Medium Salt", "High Salt"];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getRating(
  project: Project,
  temp: number,
  salt: number
): { stars: number; label: string; detail: string } {
  const tempDiff = Math.abs(temp - project.optimalTemp);
  const saltDiff = Math.abs(salt - project.optimalSalt);
  const total = tempDiff + saltDiff;

  if (total === 0) {
    return {
      stars: 3,
      label: "Perfect Fermentation!",
      detail: "You nailed the conditions! The microbes had the ideal environment.",
    };
  }
  if (total === 1) {
    if (temp > project.optimalTemp) {
      return {
        stars: 2,
        label: "A bit funky!",
        detail:
          "It was a little warm \u2014 fermentation went fast and some off-flavors developed. Still tasty though!",
      };
    }
    if (temp < project.optimalTemp) {
      return {
        stars: 2,
        label: "Needs more time...",
        detail:
          "It was a bit cold, so the bacteria were sluggish. Give it a few more days!",
      };
    }
    return {
      stars: 2,
      label: "Pretty good!",
      detail:
        "The salt level wasn\u2019t quite right, but the fermentation still worked. Almost perfect!",
    };
  }
  if (temp === 2) {
    return {
      stars: 1,
      label: "Too funky!",
      detail:
        "Way too warm! The wrong bacteria took over and it got slimy. Science lesson learned!",
    };
  }
  return {
    stars: 1,
    label: "Not quite right...",
    detail:
      "The conditions were off, so the fermentation didn\u2019t go well. Try adjusting temperature and salt!",
  };
}

function predictDays(temp: number, salt: number): number {
  const base = 7;
  const tempMod = temp === 0 ? 1.8 : temp === 1 ? 1.0 : 0.6;
  const saltMod = salt === 0 ? 0.8 : salt === 1 ? 1.0 : 1.3;
  return Math.round(base * tempMod * saltMod);
}

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const S = {
  wrapper: {
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
    background: "linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 50%, #f3e5f5 100%)",
    borderRadius: 20,
    padding: 24,
    maxWidth: 540,
    margin: "0 auto",
    color: "#2d3436",
    position: "relative" as const,
    overflow: "hidden" as const,
  },
  title: {
    fontSize: 22,
    fontWeight: 800,
    textAlign: "center" as const,
    margin: "0 0 4px",
    color: "#1a5e1f",
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center" as const,
    color: "#636e72",
    margin: "0 0 16px",
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    gap: 6,
    marginBottom: 18,
    fontSize: 12,
    fontWeight: 600,
  },
  card: {
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(6px)",
    borderRadius: 16,
    padding: 20,
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  },
  btn: (bg: string) => ({
    background: bg,
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "10px 22px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    transition: "transform 0.15s, box-shadow 0.15s",
    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
  }),
  btnOutline: (color: string) => ({
    background: "transparent",
    color,
    border: `2px solid ${color}`,
    borderRadius: 12,
    padding: "10px 22px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  }),
  projectCard: (color: string, colorLight: string, selected: boolean) => ({
    background: selected ? colorLight : "#fff",
    border: `2px solid ${selected ? color : "#e0e0e0"}`,
    borderRadius: 14,
    padding: "14px 16px",
    cursor: "pointer",
    textAlign: "center" as const,
    transition: "all 0.2s",
    flex: 1,
    minWidth: 0,
  }),
  ingredientBtn: (added: boolean, color: string) => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: added ? color + "18" : "#fff",
    border: `2px solid ${added ? color : "#ddd"}`,
    borderRadius: 12,
    padding: "10px 14px",
    cursor: added ? "default" : "pointer",
    width: "100%",
    textAlign: "left" as const,
    fontSize: 14,
    fontWeight: 600,
    transition: "all 0.2s",
    opacity: added ? 0.75 : 1,
  }),
  slider: {
    width: "100%",
    height: 8,
    borderRadius: 4,
    appearance: "none" as const,
    WebkitAppearance: "none" as const,
    outline: "none",
    cursor: "pointer",
  },
  jar: (color: string, fillPct: number) => ({
    width: 100,
    height: 140,
    borderRadius: "8px 8px 20px 20px",
    border: `3px solid ${color}`,
    background: `linear-gradient(to top, ${color}${Math.round(
      (0.3 + fillPct * 0.5) * 255
    )
      .toString(16)
      .padStart(2, "0")} ${fillPct * 100}%, rgba(255,255,255,0.3) ${
      fillPct * 100
    }%)`,
    position: "relative" as const,
    overflow: "hidden" as const,
    margin: "0 auto",
    transition: "background 0.5s",
  }),
  bubble: (left: number, delay: number, size: number) => ({
    position: "absolute" as const,
    width: size,
    height: size,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.6)",
    left: `${left}%`,
    bottom: 0,
    animation: `bubbleUp ${2 + delay}s ease-in infinite`,
    animationDelay: `${delay}s`,
  }),
  meter: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    fontWeight: 600,
  },
  meterBar: (_pct: number, _color: string) => ({
    flex: 1,
    height: 10,
    borderRadius: 5,
    background: "#e0e0e0",
    overflow: "hidden" as const,
    position: "relative" as const,
  }),
  meterFill: (pct: number, color: string) => ({
    width: `${pct * 100}%`,
    height: "100%",
    borderRadius: 5,
    background: color,
    transition: "width 0.5s",
  }),
  badge: (done: boolean) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: done ? "#4caf50" : "#e0e0e0",
    color: done ? "#fff" : "#999",
    fontSize: 13,
    fontWeight: 700,
  }),
  completedTracker: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    marginTop: 14,
    fontSize: 13,
    color: "#636e72",
    alignItems: "center",
  },
  factBox: {
    background: "#fffde7",
    border: "1px solid #fff9c4",
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 13,
    color: "#5d4037",
    marginTop: 8,
    lineHeight: 1.5,
  },
  starRow: {
    fontSize: 32,
    textAlign: "center" as const,
    margin: "8px 0",
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Keyframes (injected once)                                          */
/* ------------------------------------------------------------------ */

const KEYFRAMES_ID = "pickle-maker-keyframes";

function ensureKeyframes() {
  if (document.getElementById(KEYFRAMES_ID)) return;
  const style = document.createElement("style");
  style.id = KEYFRAMES_ID;
  style.textContent = `
    @keyframes bubbleUp {
      0%   { transform: translateY(0) scale(1); opacity: 0.7; }
      100% { transform: translateY(-150px) scale(0.4); opacity: 0; }
    }
    @keyframes popIn {
      0%   { transform: scale(0.5); opacity: 0; }
      70%  { transform: scale(1.1); }
      100% { transform: scale(1); opacity: 1; }
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 22px; height: 22px; border-radius: 50%;
      background: #4a8c3f; cursor: pointer; border: 3px solid #fff;
      box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    }
    input[type="range"]::-moz-range-thumb {
      width: 22px; height: 22px; border-radius: 50%;
      background: #4a8c3f; cursor: pointer; border: 3px solid #fff;
      box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    }
  `;
  document.head.appendChild(style);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PickleMaker() {
  /* --- state --- */
  const [step, setStep] = useState<Step>("choose");
  const [projectId, setProjectId] = useState<ProjectId | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [currentFact, setCurrentFact] = useState<string | null>(null);
  const [temp, setTemp] = useState(1);
  const [salt, setSalt] = useState(1);
  const [fermentProgress, setFermentProgress] = useState(0); // 0-1
  const [completed, setCompleted] = useState<Set<ProjectId>>(new Set());

  /* inject keyframes */
  useEffect(() => {
    ensureKeyframes();
  }, []);

  /* derived */
  const project: Project | null = projectId
    ? { id: projectId, ...PROJECTS[projectId] }
    : null;
  const allAdded = ingredients.length > 0 && ingredients.every((i) => i.added);

  /* fermentation timer */
  useEffect(() => {
    if (step !== "ferment") return;
    setFermentProgress(0);
    const duration = 10_000; // 10 seconds
    const interval = 50;
    let elapsed = 0;
    const id = setInterval(() => {
      elapsed += interval;
      const p = Math.min(elapsed / duration, 1);
      setFermentProgress(p);
      if (p >= 1) {
        clearInterval(id);
        setTimeout(() => setStep("results"), 600);
      }
    }, interval);
    return () => clearInterval(id);
  }, [step]);

  /* handlers */
  const chooseProject = useCallback((id: ProjectId) => {
    setProjectId(id);
    setIngredients(PROJECTS[id].ingredients.map((i) => ({ ...i, added: false })));
    setCurrentFact(null);
    setTemp(1);
    setSalt(1);
    setStep("prepare");
  }, []);

  const addIngredient = useCallback(
    (idx: number) => {
      if (ingredients[idx].added) return;
      setIngredients((prev) =>
        prev.map((item, i) => (i === idx ? { ...item, added: true } : item))
      );
      setCurrentFact(ingredients[idx].fact);
    },
    [ingredients]
  );

  const tryAnother = useCallback(() => {
    if (projectId) {
      setCompleted((prev) => new Set(prev).add(projectId));
    }
    setStep("choose");
    setProjectId(null);
    setFermentProgress(0);
    setCurrentFact(null);
  }, [projectId]);

  /* --- fermentation computed values --- */
  const milestoneIdx = project
    ? Math.min(
        Math.floor(fermentProgress * project.milestones.length),
        project.milestones.length - 1
      )
    : 0;
  const pH = (6.5 - fermentProgress * 3.1).toFixed(1);
  const bacteriaCount = Math.round(
    1000 * Math.pow(10, fermentProgress * 6)
  ).toLocaleString();
  const predictedDays = predictDays(temp, salt);

  const rating = project ? getRating(project, temp, salt) : null;

  /* ---------------------------------------------------------------- */
  /*  Render helpers                                                   */
  /* ---------------------------------------------------------------- */

  const renderStepIndicator = () => {
    const steps: { key: Step; label: string }[] = [
      { key: "prepare", label: "Prep" },
      { key: "conditions", label: "Set" },
      { key: "ferment", label: "Ferment" },
      { key: "results", label: "Results" },
    ];
    const order: Step[] = ["prepare", "conditions", "ferment", "results"];
    const currentIdx = order.indexOf(step);
    return (
      <div style={S.progress}>
        {steps.map((s, i) => {
          const active = i <= currentIdx;
          return (
            <div
              key={s.key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  background: active ? project?.color ?? "#4a8c3f" : "#ddd",
                  color: active ? "#fff" : "#999",
                  transition: "all 0.3s",
                }}
              >
                {i + 1}
              </span>
              <span style={{ color: active ? "#333" : "#aaa" }}>{s.label}</span>
              {i < steps.length - 1 && (
                <span style={{ color: "#ccc", margin: "0 2px" }}>&mdash;</span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  /* ---- CHOOSE ---- */
  const renderChoose = () => (
    <div style={S.card}>
      <h3
        style={{
          fontSize: 17,
          fontWeight: 700,
          textAlign: "center",
          margin: "0 0 14px",
        }}
      >
        Choose Your Fermentation Project
      </h3>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {(Object.entries(PROJECTS) as [ProjectId, (typeof PROJECTS)[ProjectId]][]).map(
          ([id, p]) => {
            const done = completed.has(id);
            return (
              <div
                key={id}
                role="button"
                tabIndex={0}
                style={S.projectCard(p.color, p.colorLight, false)}
                onClick={() => chooseProject(id)}
                onKeyDown={(e) => e.key === "Enter" && chooseProject(id)}
              >
                <div style={{ fontSize: 36 }}>{p.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>
                  {p.title}
                </div>
                {done && (
                  <div
                    style={{ fontSize: 11, color: "#4caf50", marginTop: 2 }}
                  >
                    Completed!
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>
      <div style={S.completedTracker}>
        {(["pickles", "kimchi", "sourdough"] as ProjectId[]).map((id) => (
          <span key={id} style={S.badge(completed.has(id))}>
            {completed.has(id) ? "\u2713" : PROJECTS[id].emoji}
          </span>
        ))}
        <span style={{ marginLeft: 4 }}>
          {completed.size}/3 completed
        </span>
      </div>
    </div>
  );

  /* ---- PREPARE ---- */
  const renderPrepare = () => {
    if (!project) return null;
    return (
      <div style={S.card}>
        {renderStepIndicator()}
        <h3
          style={{
            fontSize: 17,
            fontWeight: 700,
            margin: "0 0 4px",
            textAlign: "center",
          }}
        >
          {project.emoji} Prepare Ingredients
        </h3>
        <p
          style={{
            fontSize: 13,
            color: "#777",
            textAlign: "center",
            margin: "0 0 14px",
          }}
        >
          Click each ingredient to add it to your jar!
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {ingredients.map((ing, i) => (
            <button
              key={ing.name}
              style={S.ingredientBtn(ing.added, project.color) as React.CSSProperties}
              onClick={() => addIngredient(i)}
            >
              <span style={{ fontSize: 22 }}>{ing.emoji}</span>
              <span>
                {ing.name}
                {ing.added && (
                  <span style={{ color: project.color, marginLeft: 6 }}>
                    Added!
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>

        {currentFact && (
          <div
            style={{
              ...S.factBox,
              animation: "popIn 0.3s ease-out",
            }}
          >
            <strong>Science Fact:</strong> {currentFact}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button
            style={{
              ...S.btn(project.color),
              opacity: allAdded ? 1 : 0.4,
              pointerEvents: allAdded ? "auto" : "none",
            }}
            onClick={() => setStep("conditions")}
          >
            Next: Set Conditions &rarr;
          </button>
        </div>
      </div>
    );
  };

  /* ---- CONDITIONS ---- */
  const renderConditions = () => {
    if (!project) return null;
    return (
      <div style={S.card}>
        {renderStepIndicator()}
        <h3
          style={{
            fontSize: 17,
            fontWeight: 700,
            margin: "0 0 14px",
            textAlign: "center",
          }}
        >
          Set Fermentation Conditions
        </h3>

        {/* Temperature */}
        <div style={{ marginBottom: 18 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            <span>Temperature</span>
            <span style={{ color: project.color }}>{TEMP_LABELS[temp]}</span>
          </div>
          <input
            type="range"
            min={0}
            max={2}
            step={1}
            value={temp}
            onChange={(e) => setTemp(Number(e.target.value))}
            style={{
              ...S.slider,
              background: `linear-gradient(90deg, #90caf9, #ffcc80, #ef9a9a)`,
            }}
          />
          <div
            style={{ fontSize: 12, color: "#888", marginTop: 4, lineHeight: 1.4 }}
          >
            {temp === 0 &&
              "Cold temperatures slow bacteria down. Fermentation will take longer but develop complex flavors."}
            {temp === 1 &&
              "Room temperature is ideal for most fermentation \u2014 bacteria are happy and active!"}
            {temp === 2 &&
              "Warm temperatures speed things up, but can let unwanted bacteria grow too."}
          </div>
        </div>

        {/* Salt */}
        <div style={{ marginBottom: 18 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            <span>Salt Level</span>
            <span style={{ color: project.color }}>{SALT_LABELS[salt]}</span>
          </div>
          <input
            type="range"
            min={0}
            max={2}
            step={1}
            value={salt}
            onChange={(e) => setSalt(Number(e.target.value))}
            style={{
              ...S.slider,
              background: `linear-gradient(90deg, #a5d6a7, #fff59d, #ef9a9a)`,
            }}
          />
          <div
            style={{ fontSize: 12, color: "#888", marginTop: 4, lineHeight: 1.4 }}
          >
            {salt === 0 &&
              "Low salt lets bacteria grow faster, but less control over which ones survive."}
            {salt === 1 &&
              "Medium salt is the sweet spot \u2014 it selects for good Lactobacillus bacteria!"}
            {salt === 2 &&
              "High salt preserves well but slows fermentation. Some bacteria can\u2019t survive."}
          </div>
        </div>

        <div
          style={{
            background: project.colorLight,
            borderRadius: 10,
            padding: "10px 14px",
            textAlign: "center",
            fontSize: 14,
            fontWeight: 600,
            color: project.color,
            marginBottom: 14,
          }}
        >
          Predicted fermentation time: ~{predictedDays} days
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            style={S.btn(project.color)}
            onClick={() => setStep("ferment")}
          >
            Start Fermentation! &rarr;
          </button>
        </div>
      </div>
    );
  };

  /* ---- FERMENT ---- */
  const renderFerment = () => {
    if (!project) return null;
    const bubbles = Array.from({ length: 8 }, (_, i) => ({
      left: 10 + ((i * 37 + 13) % 80),
      delay: (i * 0.7) % 3,
      size: 6 + (i % 4) * 3,
    }));

    return (
      <div style={S.card}>
        {renderStepIndicator()}
        <h3
          style={{
            fontSize: 17,
            fontWeight: 700,
            margin: "0 0 14px",
            textAlign: "center",
          }}
        >
          Watch It Ferment!
        </h3>

        {/* Jar */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={S.jar(project.color, fermentProgress)}>
            {fermentProgress > 0.05 &&
              bubbles.map((b, i) => (
                <div key={i} style={S.bubble(b.left, b.delay, b.size)} />
              ))}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                fontSize: 32,
              }}
            >
              {project.emoji}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: 14,
            borderRadius: 7,
            background: "#e0e0e0",
            overflow: "hidden",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              width: `${fermentProgress * 100}%`,
              height: "100%",
              borderRadius: 7,
              background: `linear-gradient(90deg, ${project.color}88, ${project.color})`,
              transition: "width 0.1s linear",
            }}
          />
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 12,
          }}
        >
          {/* pH */}
          <div
            style={{
              background: "#f5f5f5",
              borderRadius: 10,
              padding: "8px 12px",
            }}
          >
            <div style={{ fontSize: 11, color: "#999", fontWeight: 600 }}>
              pH Level
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#e65100" }}>
              {pH}
            </div>
            <div style={S.meterBar(0, "")}>
              <div
                style={S.meterFill(
                  1 - (parseFloat(pH) - 3.0) / 4.0,
                  "#e65100"
                )}
              />
            </div>
          </div>

          {/* Bacteria */}
          <div
            style={{
              background: "#f5f5f5",
              borderRadius: 10,
              padding: "8px 12px",
            }}
          >
            <div style={{ fontSize: 11, color: "#999", fontWeight: 600 }}>
              Bacteria Count
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "#2e7d32",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {bacteriaCount}
            </div>
            <div style={S.meterBar(0, "")}>
              <div style={S.meterFill(fermentProgress, "#2e7d32")} />
            </div>
          </div>
        </div>

        {/* Milestone */}
        <div
          style={{
            background: project.colorLight,
            borderRadius: 10,
            padding: "10px 14px",
            fontSize: 13,
            fontWeight: 600,
            color: project.color,
            textAlign: "center",
            minHeight: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1.4,
          }}
        >
          {project.milestones[milestoneIdx]}
        </div>
      </div>
    );
  };

  /* ---- RESULTS ---- */
  const renderResults = () => {
    if (!project || !rating) return null;
    return (
      <div style={S.card}>
        {renderStepIndicator()}
        <h3
          style={{
            fontSize: 17,
            fontWeight: 700,
            margin: "0 0 8px",
            textAlign: "center",
          }}
        >
          {project.emoji} Your {project.title} Are Ready!
        </h3>

        <div style={S.starRow}>
          {Array.from({ length: 3 }, (_, i) => (
            <span
              key={i}
              style={{
                opacity: i < rating.stars ? 1 : 0.2,
                transition: "opacity 0.3s",
                marginRight: 4,
              }}
            >
              {"\u2B50"}
            </span>
          ))}
        </div>

        <div
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: 800,
            color: project.color,
            marginBottom: 4,
          }}
        >
          {rating.label}
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "#666",
            margin: "0 0 14px",
            lineHeight: 1.5,
          }}
        >
          {rating.detail}
        </p>

        {/* Jar display */}
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={S.jar(project.color, 1)}>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                fontSize: 36,
              }}
            >
              {project.emoji}
            </div>
          </div>
        </div>

        {/* Science summary */}
        <div
          style={{
            ...S.factBox,
            background: "#e8f5e9",
            borderColor: "#a5d6a7",
          }}
        >
          <strong>What Happened (The Science!):</strong>
          <br />
          {project.scienceSummary}
        </div>

        {/* Stats recap */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8,
            marginTop: 12,
            textAlign: "center",
            fontSize: 12,
          }}
        >
          <div
            style={{
              background: "#f5f5f5",
              borderRadius: 8,
              padding: 8,
            }}
          >
            <div style={{ fontWeight: 700, color: "#e65100" }}>pH 3.4</div>
            <div style={{ color: "#999" }}>Final Acidity</div>
          </div>
          <div
            style={{
              background: "#f5f5f5",
              borderRadius: 8,
              padding: 8,
            }}
          >
            <div style={{ fontWeight: 700, color: "#2e7d32" }}>1 Billion+</div>
            <div style={{ color: "#999" }}>Bacteria</div>
          </div>
          <div
            style={{
              background: "#f5f5f5",
              borderRadius: 8,
              padding: 8,
            }}
          >
            <div style={{ fontWeight: 700, color: "#1565c0" }}>
              ~{predictedDays} days
            </div>
            <div style={{ color: "#999" }}>Fermentation</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            marginTop: 16,
            flexWrap: "wrap",
          }}
        >
          <button
            style={S.btn(project.color)}
            onClick={tryAnother}
          >
            Try Another Project!
          </button>
        </div>

        <div style={S.completedTracker}>
          {(["pickles", "kimchi", "sourdough"] as ProjectId[]).map((id) => {
            const willComplete = id === projectId || completed.has(id);
            return (
              <span key={id} style={S.badge(willComplete)}>
                {willComplete ? "\u2713" : PROJECTS[id].emoji}
              </span>
            );
          })}
          <span style={{ marginLeft: 4 }}>
            {new Set([...completed, projectId!]).size}/3 completed
          </span>
        </div>
      </div>
    );
  };

  /* ---------------------------------------------------------------- */
  /*  Main render                                                      */
  /* ---------------------------------------------------------------- */

  return (
    <div style={S.wrapper}>
      <h2 style={S.title}>Fermentation Lab</h2>
      <p style={S.subtitle}>The Yummy Science of Fermentation!</p>

      {step === "choose" && renderChoose()}
      {step === "prepare" && renderPrepare()}
      {step === "conditions" && renderConditions()}
      {step === "ferment" && renderFerment()}
      {step === "results" && renderResults()}
    </div>
  );
}
