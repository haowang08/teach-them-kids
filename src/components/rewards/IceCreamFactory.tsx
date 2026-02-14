import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface BaseOption {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  science: string;
}

interface FlavorOption {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  science: string;
}

interface MixInOption {
  id: string;
  name: string;
  emoji: string;
}

interface ToppingOption {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

const BASES: BaseOption[] = [
  {
    id: "cream",
    name: "Cream-Based",
    emoji: "🥛",
    description: "Classic & rich",
    color: "#FFF8E7",
    science:
      "Fat in cream traps tiny air bubbles when churned, making ice cream smooth and fluffy! The fat also coats your tongue, giving that rich creamy feeling.",
  },
  {
    id: "coconut",
    name: "Coconut Milk",
    emoji: "🥥",
    description: "Dairy-free & tropical",
    color: "#F5F0E8",
    science:
      "Coconut milk has natural fats that work like dairy cream! It freezes slightly differently because coconut fat melts at a lower temperature, giving a silky texture.",
  },
  {
    id: "sorbet",
    name: "Fruit Sorbet Base",
    emoji: "🍓",
    description: "No dairy, fruity & light",
    color: "#FFE4E1",
    science:
      "Sorbet uses sugar syrup instead of cream. Sugar lowers the freezing point of water, so sorbet stays scoopable instead of turning into a solid ice block!",
  },
];

const FLAVORS: FlavorOption[] = [
  {
    id: "vanilla",
    name: "Vanilla",
    emoji: "🌼",
    description: "From vanilla bean orchids!",
    color: "#FFF8DC",
    science:
      "Vanilla comes from orchid seed pods! It contains over 250 different aroma compounds, which is why it smells so complex and delicious.",
  },
  {
    id: "chocolate",
    name: "Chocolate",
    emoji: "🍫",
    description: "From cacao beans",
    color: "#8B4513",
    science:
      "Chocolate comes from cacao beans that grow in tropical rainforests. The beans are fermented, roasted, and ground. This process creates over 600 flavor compounds!",
  },
  {
    id: "strawberry",
    name: "Strawberry",
    emoji: "🍓",
    description: "Real fruit flavor",
    color: "#FFB6C1",
    science:
      "Strawberries get their red color from anthocyanins — the same pigments that make autumn leaves red! Fresh strawberry ice cream has vitamin C too.",
  },
  {
    id: "matcha",
    name: "Matcha",
    emoji: "🍵",
    description: "Japanese green tea",
    color: "#98D898",
    science:
      "Matcha is made from shade-grown tea leaves ground into a fine powder. Growing in shade makes the leaves produce more chlorophyll, giving matcha its vibrant green color!",
  },
  {
    id: "mango",
    name: "Mango",
    emoji: "🥭",
    description: "Tropical fruit",
    color: "#FFD700",
    science:
      "Mangoes are called the 'king of fruits' and contain an enzyme called amylase that helps break down starches. That's why ripe mangoes taste so sweet!",
  },
];

const MIX_INS: MixInOption[] = [
  { id: "cookie", name: "Cookie Pieces", emoji: "🍪" },
  { id: "brownie", name: "Brownie Chunks", emoji: "🟫" },
  { id: "berries", name: "Fresh Berries", emoji: "🫐" },
  { id: "caramel", name: "Caramel Swirl", emoji: "🍯" },
  { id: "nuts", name: "Nuts", emoji: "🥜" },
  { id: "sprinkles", name: "Sprinkles", emoji: "✨" },
  { id: "candy", name: "Candy Pieces", emoji: "🍬" },
  { id: "marshmallows", name: "Marshmallows", emoji: "☁️" },
];

const TOPPINGS: ToppingOption[] = [
  { id: "whipped", name: "Whipped Cream", emoji: "🍦", color: "#FFFEFA" },
  { id: "fudge", name: "Hot Fudge", emoji: "🍫", color: "#5C3317" },
  { id: "caramel_drizzle", name: "Caramel Drizzle", emoji: "🍯", color: "#DAA520" },
  { id: "rainbow_sprinkles", name: "Rainbow Sprinkles", emoji: "🌈", color: "#FF69B4" },
  { id: "cherry", name: "Cherry on Top", emoji: "🍒", color: "#DC143C" },
  { id: "waffle", name: "Waffle Cone Pieces", emoji: "🧇", color: "#D2A46A" },
];

const ADJECTIVES = [
  "Super",
  "Magical",
  "Sparkly",
  "Cosmic",
  "Rainbow",
  "Dreamy",
  "Fantastic",
  "Ultimate",
  "Galactic",
  "Royal",
  "Awesome",
  "Spectacular",
];

const SUFFIXES = ["Delight", "Surprise", "Dream", "Bliss", "Wonder", "Blast", "Fantasy", "Explosion"];

const MIX_IN_SCIENCE =
  "Mix-ins are added after churning so they stay chunky! If added too early, the churning blades would break them into tiny bits. Temperature matters too — the ice cream must be cold enough to hold the pieces in place.";

const TOPPING_SCIENCE =
  "Toppings add texture contrast! Your brain loves the combo of creamy, crunchy, and chewy. Hot fudge stays gooey on cold ice cream because the cold slows down its flow — that's viscosity in action!";

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function generateName(flavorId: string): string {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
  const flavor = FLAVORS.find((f) => f.id === flavorId);
  return `${adj} ${flavor?.name ?? "Mystery"} ${suffix}`;
}

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function IceCreamFactory() {
  const [step, setStep] = useState(0); // 0-3 building, 4 = done
  const [selectedBase, setSelectedBase] = useState<string | null>(null);
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
  const [selectedMixIns, setSelectedMixIns] = useState<string[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [creationName, setCreationName] = useState("");

  const reset = () => {
    setStep(0);
    setSelectedBase(null);
    setSelectedFlavor(null);
    setSelectedMixIns([]);
    setSelectedToppings([]);
    setCreationName("");
  };

  const toggleMixIn = (id: string) => {
    setSelectedMixIns((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const toggleTopping = (id: string) => {
    setSelectedToppings((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  };

  const handleNext = () => {
    if (step === 3) {
      setCreationName(generateName(selectedFlavor!));
      setStep(4);
    } else {
      setStep((s) => s + 1);
    }
  };

  const canProceed =
    (step === 0 && selectedBase !== null) ||
    (step === 1 && selectedFlavor !== null) ||
    step === 2 ||
    step === 3;

  /* ---------- style helpers ---------- */

  const pageStyle: React.CSSProperties = {
    minHeight: "100%",
    background: "linear-gradient(135deg, #FFF0F5 0%, #F0F8FF 50%, #FFFAF0 100%)",
    borderRadius: 20,
    padding: "24px 16px",
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
    maxWidth: 800,
    margin: "0 auto",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 32,
    fontWeight: 800,
    textAlign: "center" as const,
    background: "linear-gradient(90deg, #FF6B9D, #C084FC, #60A5FA)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: 4,
  };

  const cardBase: React.CSSProperties = {
    border: "3px solid transparent",
    borderRadius: 16,
    padding: "16px 12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "center" as const,
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    flex: "1 1 140px",
    minWidth: 120,
    maxWidth: 200,
  };

  const selectedCard: React.CSSProperties = {
    ...cardBase,
    borderColor: "#C084FC",
    boxShadow: "0 4px 16px rgba(192,132,252,0.35)",
    transform: "scale(1.04)",
  };

  const btnPrimary: React.CSSProperties = {
    background: "linear-gradient(135deg, #FF6B9D, #C084FC)",
    color: "#fff",
    border: "none",
    borderRadius: 40,
    padding: "14px 40px",
    fontSize: 18,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(192,132,252,0.4)",
    transition: "all 0.2s",
  };

  const btnDisabled: React.CSSProperties = {
    ...btnPrimary,
    opacity: 0.45,
    cursor: "not-allowed",
    boxShadow: "none",
  };

  const scienceBoxStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #E0F2FE, #EDE9FE)",
    borderRadius: 14,
    padding: "14px 18px",
    marginTop: 16,
    border: "2px dashed #93C5FD",
  };

  /* ---------- progress bar ---------- */

  const stepLabels = ["Base", "Flavor", "Mix-ins", "Toppings"];

  const renderProgressBar = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 28 }}>
      {stepLabels.map((label, i) => {
        const done = step > i;
        const active = step === i;
        const barFill = done ? 100 : active ? 50 : 0;
        return (
          <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: done
                  ? "linear-gradient(135deg, #34D399, #60A5FA)"
                  : active
                    ? "linear-gradient(135deg, #FF6B9D, #C084FC)"
                    : "#E5E7EB",
                color: done || active ? "#fff" : "#9CA3AF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 15,
                transition: "all 0.4s ease",
                boxShadow: active ? "0 0 0 4px rgba(192,132,252,0.3)" : "none",
              }}
            >
              {done ? "✓" : i + 1}
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: active ? 700 : 500,
                color: active ? "#9333EA" : done ? "#059669" : "#9CA3AF",
                marginTop: 4,
              }}
            >
              {label}
            </span>
            {i < stepLabels.length - 1 && (
              <div
                style={{
                  position: "absolute" as const,
                }}
              />
            )}
            {/* bar below each dot */}
            <div
              style={{
                width: "80%",
                height: 5,
                borderRadius: 3,
                background: "#E5E7EB",
                marginTop: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${barFill}%`,
                  height: "100%",
                  borderRadius: 3,
                  background: "linear-gradient(90deg, #34D399, #60A5FA)",
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  /* ---------- ice cream preview ---------- */

  const renderPreview = () => {
    const baseObj = BASES.find((b) => b.id === selectedBase);
    const flavorObj = FLAVORS.find((f) => f.id === selectedFlavor);
    const mixinObjs = MIX_INS.filter((m) => selectedMixIns.includes(m.id));
    const toppingObjs = TOPPINGS.filter((t) => selectedToppings.includes(t.id));

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 16,
          minHeight: 200,
        }}
      >
        {/* toppings on top */}
        {toppingObjs.length > 0 && (
          <div style={{ fontSize: 28, marginBottom: -4, zIndex: 3 }}>
            {toppingObjs.map((t) => (
              <span key={t.id} title={t.name}>
                {t.emoji}
              </span>
            ))}
          </div>
        )}

        {/* scoops */}
        {flavorObj && (
          <div
            style={{
              width: 110,
              height: 68,
              borderRadius: "50%",
              background: `radial-gradient(circle at 35% 35%, ${lighten(flavorObj.color)}, ${flavorObj.color})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
              zIndex: 2,
              border: "2px solid rgba(255,255,255,0.6)",
              position: "relative" as const,
            }}
          >
            {flavorObj.emoji}
            {/* show mix-ins inside scoop */}
            {mixinObjs.length > 0 && (
              <span style={{ fontSize: 13, position: "absolute" as const, bottom: 4, right: 14 }}>
                {mixinObjs.map((m) => m.emoji).join("")}
              </span>
            )}
          </div>
        )}

        {/* cone */}
        {baseObj && (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "52px solid transparent",
              borderRight: "52px solid transparent",
              borderTop: `90px solid ${baseObj.id === "sorbet" ? "#FFB4A2" : "#DAA520"}`,
              marginTop: -8,
              position: "relative" as const,
              zIndex: 1,
            }}
          >
            {/* waffle pattern lines */}
            <div
              style={{
                position: "absolute" as const,
                top: -80,
                left: -20,
                fontSize: 10,
                color: "rgba(0,0,0,0.15)",
                fontWeight: 700,
                whiteSpace: "nowrap" as const,
                transform: "rotate(-15deg)",
                letterSpacing: 2,
              }}
            >
              {"/// /// ///"}
            </div>
          </div>
        )}

        {!baseObj && !flavorObj && (
          <div style={{ color: "#CBD5E1", fontSize: 60 }}>🍦</div>
        )}
      </div>
    );
  };

  /* ---------- step content ---------- */

  const renderStep0 = () => (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#6D28D9", marginBottom: 4 }}>
        Step 1: Choose Your Base
      </h2>
      <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 16 }}>
        Every ice cream starts with a base. Pick one!
      </p>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 14, justifyContent: "center" }}>
        {BASES.map((b) => (
          <div
            key={b.id}
            onClick={() => setSelectedBase(b.id)}
            style={selectedBase === b.id ? selectedCard : cardBase}
          >
            <div style={{ fontSize: 40, marginBottom: 6 }}>{b.emoji}</div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#374151" }}>{b.name}</div>
            <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{b.description}</div>
          </div>
        ))}
      </div>
      {selectedBase && (
        <div style={scienceBoxStyle}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#1E40AF", marginBottom: 4 }}>
            🔬 Science Corner
          </div>
          <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>
            {BASES.find((b) => b.id === selectedBase)!.science}
          </div>
        </div>
      )}
    </div>
  );

  const renderStep1 = () => (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#6D28D9", marginBottom: 4 }}>
        Step 2: Choose Your Flavor
      </h2>
      <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 16 }}>
        What flavor do you want? Pick one!
      </p>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 14, justifyContent: "center" }}>
        {FLAVORS.map((f) => (
          <div
            key={f.id}
            onClick={() => setSelectedFlavor(f.id)}
            style={{
              ...(selectedFlavor === f.id ? selectedCard : cardBase),
              borderBottomWidth: 5,
              borderBottomColor: selectedFlavor === f.id ? f.color : "transparent",
              borderBottomStyle: "solid" as const,
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 6 }}>{f.emoji}</div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#374151" }}>{f.name}</div>
            <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{f.description}</div>
          </div>
        ))}
      </div>
      {selectedFlavor && (
        <div style={scienceBoxStyle}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#1E40AF", marginBottom: 4 }}>
            🔬 Science Corner
          </div>
          <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>
            {FLAVORS.find((f) => f.id === selectedFlavor)!.science}
          </div>
        </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#6D28D9", marginBottom: 4 }}>
        Step 3: Choose Mix-ins
      </h2>
      <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 16 }}>
        Pick up to 3 mix-ins (or skip this step)!
      </p>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 12, justifyContent: "center" }}>
        {MIX_INS.map((m) => {
          const isSelected = selectedMixIns.includes(m.id);
          const atMax = selectedMixIns.length >= 3 && !isSelected;
          return (
            <div
              key={m.id}
              onClick={() => !atMax && toggleMixIn(m.id)}
              style={{
                ...(isSelected ? selectedCard : cardBase),
                opacity: atMax ? 0.45 : 1,
                cursor: atMax ? "not-allowed" : "pointer",
                minWidth: 100,
                maxWidth: 140,
                padding: "12px 10px",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 4 }}>{m.emoji}</div>
              <div style={{ fontWeight: 600, fontSize: 13, color: "#374151" }}>{m.name}</div>
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: "center" as const, marginTop: 10, fontSize: 13, color: "#9CA3AF" }}>
        {selectedMixIns.length}/3 selected
      </div>
      {selectedMixIns.length > 0 && (
        <div style={scienceBoxStyle}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#1E40AF", marginBottom: 4 }}>
            🔬 Science Corner
          </div>
          <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{MIX_IN_SCIENCE}</div>
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#6D28D9", marginBottom: 4 }}>
        Step 4: Choose Toppings
      </h2>
      <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 16 }}>
        Pick up to 2 toppings to finish your creation (or skip)!
      </p>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 12, justifyContent: "center" }}>
        {TOPPINGS.map((t) => {
          const isSelected = selectedToppings.includes(t.id);
          const atMax = selectedToppings.length >= 2 && !isSelected;
          return (
            <div
              key={t.id}
              onClick={() => !atMax && toggleTopping(t.id)}
              style={{
                ...(isSelected ? selectedCard : cardBase),
                opacity: atMax ? 0.45 : 1,
                cursor: atMax ? "not-allowed" : "pointer",
                minWidth: 100,
                maxWidth: 160,
                padding: "12px 10px",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 4 }}>{t.emoji}</div>
              <div style={{ fontWeight: 600, fontSize: 13, color: "#374151" }}>{t.name}</div>
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: "center" as const, marginTop: 10, fontSize: 13, color: "#9CA3AF" }}>
        {selectedToppings.length}/2 selected
      </div>
      {selectedToppings.length > 0 && (
        <div style={scienceBoxStyle}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#1E40AF", marginBottom: 4 }}>
            🔬 Science Corner
          </div>
          <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{TOPPING_SCIENCE}</div>
        </div>
      )}
    </div>
  );

  /* ---------- final creation ---------- */

  const renderFinal = () => {
    const baseObj = BASES.find((b) => b.id === selectedBase)!;
    const flavorObj = FLAVORS.find((f) => f.id === selectedFlavor)!;
    const mixinObjs = MIX_INS.filter((m) => selectedMixIns.includes(m.id));
    const toppingObjs = TOPPINGS.filter((t) => selectedToppings.includes(t.id));

    return (
      <div style={{ textAlign: "center" as const }}>
        {/* celebration header */}
        <div style={{ fontSize: 42, marginBottom: 4 }}>🎉</div>
        <h2
          style={{
            fontSize: 26,
            fontWeight: 800,
            background: "linear-gradient(90deg, #FF6B9D, #C084FC, #60A5FA)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 8,
          }}
        >
          Your Ice Cream is Ready!
        </h2>

        {/* creation name */}
        <div
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #FDE68A, #FBCFE8)",
            borderRadius: 30,
            padding: "10px 28px",
            fontSize: 20,
            fontWeight: 700,
            color: "#92400E",
            marginBottom: 20,
            boxShadow: "0 3px 12px rgba(251,207,232,0.5)",
          }}
        >
          &ldquo;{creationName}&rdquo;
        </div>

        {/* big preview */}
        <div
          style={{
            background: "#fff",
            borderRadius: 24,
            padding: 24,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            display: "inline-block",
            marginBottom: 20,
          }}
        >
          {renderPreview()}
        </div>

        {/* recipe summary */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "16px 20px",
            textAlign: "left" as const,
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            marginBottom: 16,
            maxWidth: 400,
            margin: "0 auto 20px",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 16, color: "#6D28D9", marginBottom: 10 }}>
            Recipe:
          </div>
          <div style={{ fontSize: 14, color: "#374151", lineHeight: 2 }}>
            <div>
              <strong>Base:</strong> {baseObj.emoji} {baseObj.name}
            </div>
            <div>
              <strong>Flavor:</strong> {flavorObj.emoji} {flavorObj.name}
            </div>
            <div>
              <strong>Mix-ins:</strong>{" "}
              {mixinObjs.length > 0
                ? mixinObjs.map((m) => `${m.emoji} ${m.name}`).join(", ")
                : "None"}
            </div>
            <div>
              <strong>Toppings:</strong>{" "}
              {toppingObjs.length > 0
                ? toppingObjs.map((t) => `${t.emoji} ${t.name}`).join(", ")
                : "None"}
            </div>
          </div>
        </div>

        {/* fun fact */}
        <div style={{ ...scienceBoxStyle, maxWidth: 440, margin: "0 auto 24px" }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#1E40AF", marginBottom: 4 }}>
            🔬 Final Fun Fact
          </div>
          <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>
            The first ice cream cone was invented at the 1904 World's Fair in St. Louis! A waffle
            vendor rolled his waffles into cones to help an ice cream seller who ran out of bowls.
            Teamwork makes the dream work!
          </div>
        </div>

        <button onClick={reset} style={btnPrimary}>
          🍦 Make Another!
        </button>
      </div>
    );
  };

  /* ---------- MAIN RENDER ---------- */

  return (
    <div style={pageStyle}>
      {/* Header */}
      <div style={{ textAlign: "center" as const, marginBottom: 20 }}>
        <div style={{ fontSize: 48, marginBottom: 2 }}>🍦🏭</div>
        <h1 style={titleStyle}>Ice Cream Factory</h1>
        <p style={{ color: "#9CA3AF", fontSize: 14 }}>Build your dream frozen treat and learn cool science!</p>
      </div>

      {step < 4 && (
        <>
          {/* Progress bar */}
          {renderProgressBar()}

          {/* Two-column: preview + step content */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap" as const,
              gap: 20,
              alignItems: "flex-start",
            }}
          >
            {/* Preview sidebar */}
            <div
              style={{
                flex: "0 0 180px",
                background: "#fff",
                borderRadius: 20,
                padding: 16,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                textAlign: "center" as const,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: "#9CA3AF", marginBottom: 6 }}>
                Preview
              </div>
              {renderPreview()}
            </div>

            {/* Step content */}
            <div style={{ flex: 1, minWidth: 260 }}>
              {step === 0 && renderStep0()}
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}

              {/* Navigation */}
              <div
                style={{
                  display: "flex",
                  justifyContent: step > 0 ? "space-between" : "flex-end",
                  marginTop: 24,
                  gap: 12,
                }}
              >
                {step > 0 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    style={{
                      background: "#fff",
                      color: "#6D28D9",
                      border: "2px solid #C084FC",
                      borderRadius: 40,
                      padding: "12px 28px",
                      fontSize: 16,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={canProceed ? handleNext : undefined}
                  style={canProceed ? btnPrimary : btnDisabled}
                >
                  {step === 3 ? "Finish! 🎉" : "Next Step →"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {step === 4 && renderFinal()}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Utility                                                            */
/* ------------------------------------------------------------------ */

function lighten(hex: string): string {
  // Lighten a hex color for gradient highlights
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lr = Math.min(255, r + 60);
  const lg = Math.min(255, g + 60);
  const lb = Math.min(255, b + 60);
  return `rgb(${lr},${lg},${lb})`;
}
