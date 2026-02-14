import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Topping {
  id: string;
  name: string;
  emoji: string;
  color: string;         // fallback colour for the circle on the pizza
  positions: { top: string; left: string }[];   // where it renders on the base
}

interface PizzaStyle {
  id: string;
  name: string;
  region: string;
  flag: string;
  funFact: string;
  celebration: string;
  baseColor: string;     // inner dough colour
  crustColor: string;
  toppings: Topping[];
}

/* ------------------------------------------------------------------ */
/*  Data – six world pizzas                                            */
/* ------------------------------------------------------------------ */

const PIZZAS: PizzaStyle[] = [
  {
    id: "margherita",
    name: "Margherita",
    region: "Italy",
    flag: "\uD83C\uDDEE\uD83C\uDDF9",
    celebration: "Perfetto! Bellissima! \uD83C\uDF89",
    funFact:
      "Legend says Margherita pizza was created in 1889 for Queen Margherita of Italy, with colours matching the Italian flag!",
    baseColor: "#f5deb3",
    crustColor: "#d2a04e",
    toppings: [
      {
        id: "tomato-sauce",
        name: "Tomato Sauce",
        emoji: "\uD83C\uDF45",
        color: "#e53e3e",
        positions: [
          { top: "30%", left: "35%" },
          { top: "50%", left: "50%" },
          { top: "60%", left: "30%" },
          { top: "40%", left: "60%" },
        ],
      },
      {
        id: "mozzarella",
        name: "Mozzarella",
        emoji: "\uD83E\uDDC0",
        color: "#fefcbf",
        positions: [
          { top: "35%", left: "45%" },
          { top: "55%", left: "35%" },
          { top: "50%", left: "60%" },
        ],
      },
      {
        id: "basil",
        name: "Basil",
        emoji: "\uD83C\uDF3F",
        color: "#38a169",
        positions: [
          { top: "40%", left: "40%" },
          { top: "55%", left: "55%" },
          { top: "60%", left: "42%" },
        ],
      },
    ],
  },
  {
    id: "deep-dish",
    name: "Deep Dish",
    region: "Chicago, USA",
    flag: "\uD83C\uDDFA\uD83C\uDDF8",
    celebration: "Awesome job, chef! \uD83C\uDF1F",
    funFact:
      "Chicago deep-dish pizza can be over 2 inches tall! It was invented in 1943 at Pizzeria Uno.",
    baseColor: "#e8c97a",
    crustColor: "#b8860b",
    toppings: [
      {
        id: "thick-crust",
        name: "Thick Crust",
        emoji: "\uD83C\uDF5E",
        color: "#d4a24e",
        positions: [
          { top: "25%", left: "25%" },
          { top: "25%", left: "65%" },
          { top: "65%", left: "25%" },
          { top: "65%", left: "65%" },
        ],
      },
      {
        id: "chunky-tomato",
        name: "Chunky Tomato",
        emoji: "\uD83C\uDF45",
        color: "#c53030",
        positions: [
          { top: "35%", left: "40%" },
          { top: "50%", left: "55%" },
          { top: "55%", left: "35%" },
        ],
      },
      {
        id: "mozzarella-dd",
        name: "Mozzarella",
        emoji: "\uD83E\uDDC0",
        color: "#fefcbf",
        positions: [
          { top: "40%", left: "50%" },
          { top: "55%", left: "40%" },
        ],
      },
      {
        id: "sausage",
        name: "Sausage",
        emoji: "\uD83C\uDF56",
        color: "#9b2c2c",
        positions: [
          { top: "38%", left: "35%" },
          { top: "52%", left: "52%" },
          { top: "48%", left: "38%" },
        ],
      },
    ],
  },
  {
    id: "okonomiyaki",
    name: "Okonomiyaki-Style",
    region: "Japan",
    flag: "\uD83C\uDDEF\uD83C\uDDF5",
    celebration: "Sugoi! Oishii! \uD83C\uDF8A",
    funFact:
      "Okonomiyaki means 'grilled as you like it' in Japanese. It's sometimes called a Japanese pizza!",
    baseColor: "#e8d5b7",
    crustColor: "#c9a96e",
    toppings: [
      {
        id: "mayo",
        name: "Mayo Drizzle",
        emoji: "\uD83E\uDD5B",
        color: "#fffff0",
        positions: [
          { top: "30%", left: "30%" },
          { top: "40%", left: "55%" },
          { top: "55%", left: "40%" },
          { top: "60%", left: "60%" },
        ],
      },
      {
        id: "bonito",
        name: "Bonito Flakes",
        emoji: "\uD83D\uDC1F",
        color: "#e8b89d",
        positions: [
          { top: "35%", left: "42%" },
          { top: "50%", left: "50%" },
          { top: "45%", left: "35%" },
        ],
      },
      {
        id: "cabbage",
        name: "Cabbage",
        emoji: "\uD83E\uDD6C",
        color: "#9ae6b4",
        positions: [
          { top: "40%", left: "48%" },
          { top: "55%", left: "35%" },
          { top: "50%", left: "58%" },
        ],
      },
      {
        id: "okono-sauce",
        name: "Okonomi Sauce",
        emoji: "\uD83E\uDD63",
        color: "#7b341e",
        positions: [
          { top: "42%", left: "40%" },
          { top: "52%", left: "52%" },
        ],
      },
    ],
  },
  {
    id: "lahmacun",
    name: "Lahmacun",
    region: "Turkey",
    flag: "\uD83C\uDDF9\uD83C\uDDF7",
    celebration: "Harika! \u00C7ok g\u00FCzel! \uD83C\uDF1F",
    funFact:
      "Lahmacun is a super-thin flatbread topped with minced meat and veggies. It's often rolled up to eat!",
    baseColor: "#e8d5b7",
    crustColor: "#c4a265",
    toppings: [
      {
        id: "minced-meat",
        name: "Minced Meat",
        emoji: "\uD83E\uDD69",
        color: "#9b2c2c",
        positions: [
          { top: "32%", left: "38%" },
          { top: "45%", left: "50%" },
          { top: "55%", left: "38%" },
          { top: "50%", left: "58%" },
        ],
      },
      {
        id: "onions",
        name: "Onions",
        emoji: "\uD83E\uDDC5",
        color: "#e9d8fd",
        positions: [
          { top: "38%", left: "45%" },
          { top: "52%", left: "45%" },
        ],
      },
      {
        id: "peppers",
        name: "Peppers",
        emoji: "\uD83C\uDF36\uFE0F",
        color: "#f56565",
        positions: [
          { top: "42%", left: "35%" },
          { top: "48%", left: "55%" },
        ],
      },
      {
        id: "parsley",
        name: "Parsley",
        emoji: "\uD83C\uDF3F",
        color: "#48bb78",
        positions: [
          { top: "36%", left: "52%" },
          { top: "56%", left: "48%" },
          { top: "46%", left: "42%" },
        ],
      },
    ],
  },
  {
    id: "hawaiiana",
    name: "Pizza Hawaiiana",
    region: "Disputed Origin",
    flag: "\uD83C\uDF0D",
    celebration: "Aloha, chef! Mahalo! \uD83C\uDF3A",
    funFact:
      "Hawaiian pizza was actually invented in Canada in 1962 by a Greek-born cook named Sam Panopoulos!",
    baseColor: "#f5deb3",
    crustColor: "#d2a04e",
    toppings: [
      {
        id: "ham",
        name: "Ham",
        emoji: "\uD83C\uDF56",
        color: "#feb2b2",
        positions: [
          { top: "35%", left: "38%" },
          { top: "50%", left: "50%" },
          { top: "55%", left: "35%" },
        ],
      },
      {
        id: "pineapple",
        name: "Pineapple",
        emoji: "\uD83C\uDF4D",
        color: "#fefcbf",
        positions: [
          { top: "38%", left: "52%" },
          { top: "48%", left: "38%" },
          { top: "58%", left: "52%" },
        ],
      },
      {
        id: "mozzarella-hw",
        name: "Mozzarella",
        emoji: "\uD83E\uDDC0",
        color: "#fffff0",
        positions: [
          { top: "40%", left: "45%" },
          { top: "52%", left: "55%" },
          { top: "45%", left: "32%" },
        ],
      },
    ],
  },
  {
    id: "manakish",
    name: "Manakish",
    region: "Lebanon",
    flag: "\uD83C\uDDF1\uD83C\uDDE7",
    celebration: "Yalla! Mumtaz! \uD83C\uDF1F",
    funFact:
      "Manakish is a popular Lebanese breakfast flatbread. Za'atar is a spice mix of thyme, sesame seeds, and sumac!",
    baseColor: "#ede4d3",
    crustColor: "#c4a265",
    toppings: [
      {
        id: "zaatar",
        name: "Za'atar",
        emoji: "\uD83C\uDF3E",
        color: "#6b7a2f",
        positions: [
          { top: "32%", left: "40%" },
          { top: "42%", left: "52%" },
          { top: "52%", left: "38%" },
          { top: "58%", left: "55%" },
        ],
      },
      {
        id: "olive-oil",
        name: "Olive Oil",
        emoji: "\uD83E\uDED2",
        color: "#d4c36a",
        positions: [
          { top: "38%", left: "45%" },
          { top: "50%", left: "50%" },
        ],
      },
      {
        id: "cheese-mn",
        name: "Cheese",
        emoji: "\uD83E\uDDC0",
        color: "#fefcbf",
        positions: [
          { top: "42%", left: "38%" },
          { top: "48%", left: "55%" },
          { top: "55%", left: "45%" },
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PizzaWorldTour() {
  const [selectedPizzaId, setSelectedPizzaId] = useState<string | null>(null);
  const [placedToppings, setPlacedToppings] = useState<Record<string, Set<string>>>({});
  const [showCelebration, setShowCelebration] = useState(false);

  /* derived -------------------------------------------------------- */
  const completedPizzas = PIZZAS.filter((p) => {
    const placed = placedToppings[p.id];
    return placed && placed.size === p.toppings.length;
  });

  const completedIds = new Set(completedPizzas.map((p) => p.id));

  const selectedPizza = PIZZAS.find((p) => p.id === selectedPizzaId) ?? null;
  const currentPlaced = selectedPizza
    ? placedToppings[selectedPizza.id] ?? new Set<string>()
    : new Set<string>();
  const isCurrentComplete = selectedPizza
    ? currentPlaced.size === selectedPizza.toppings.length
    : false;

  /* handlers ------------------------------------------------------- */
  const handleSelectPizza = (id: string) => {
    setShowCelebration(false);
    setSelectedPizzaId(id);
  };

  const handlePlaceTopping = (toppingId: string) => {
    if (!selectedPizza || isCurrentComplete) return;
    if (currentPlaced.has(toppingId)) return;

    const next = new Set(currentPlaced);
    next.add(toppingId);
    setPlacedToppings((prev) => ({ ...prev, [selectedPizza.id]: next }));

    if (next.size === selectedPizza.toppings.length) {
      setShowCelebration(true);
    }
  };

  const handleReset = () => {
    if (!selectedPizza) return;
    setPlacedToppings((prev) => {
      const copy = { ...prev };
      delete copy[selectedPizza.id];
      return copy;
    });
    setShowCelebration(false);
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div
      style={{
        minHeight: "100%",
        background:
          "repeating-conic-gradient(#fff0f0 0% 25%, #ffffff 0% 50%) 0 0 / 40px 40px",
        borderRadius: 16,
        padding: 16,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* header */}
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <h2
          style={{
            margin: 0,
            fontSize: "clamp(1.3rem, 4vw, 2rem)",
            color: "#c53030",
            textShadow: "1px 1px 0 #fed7d7",
          }}
        >
          {"\uD83C\uDF55"} Pizza World Tour {"\uD83C\uDF0D"}
        </h2>
        <p style={{ margin: "4px 0 0", fontSize: 14, color: "#718096" }}>
          Build famous pizzas from around the world!
        </p>
        <div
          style={{
            display: "inline-block",
            marginTop: 6,
            padding: "4px 14px",
            background: "#fff5f5",
            borderRadius: 20,
            fontWeight: 700,
            color: "#c53030",
            fontSize: 14,
            border: "2px solid #feb2b2",
          }}
        >
          {"\u2B50"} {completedIds.size} / {PIZZAS.length} Pizzas Completed
        </div>
      </div>

      {/* pizza selector grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
          gap: 8,
          marginBottom: 16,
        }}
      >
        {PIZZAS.map((p) => {
          const done = completedIds.has(p.id);
          const active = selectedPizzaId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => handleSelectPizza(p.id)}
              style={{
                padding: "8px 6px",
                borderRadius: 12,
                border: active ? "3px solid #c53030" : "2px solid #e2e8f0",
                background: done
                  ? "linear-gradient(135deg, #f0fff4, #c6f6d5)"
                  : active
                  ? "#fff5f5"
                  : "#ffffff",
                cursor: "pointer",
                textAlign: "center",
                transition: "transform 0.15s",
                transform: active ? "scale(1.05)" : "scale(1)",
                position: "relative",
              }}
            >
              {done && (
                <span
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    fontSize: 20,
                  }}
                >
                  {"\u2B50"}
                </span>
              )}
              <div style={{ fontSize: 22 }}>{p.flag}</div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#2d3748",
                  lineHeight: 1.2,
                }}
              >
                {p.name}
              </div>
              <div style={{ fontSize: 11, color: "#718096" }}>{p.region}</div>
            </button>
          );
        })}
      </div>

      {/* workspace */}
      {selectedPizza ? (
        <div
          style={{
            background: "#fffaf0",
            borderRadius: 16,
            padding: 16,
            border: "2px solid #feebc8",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <h3
              style={{
                margin: 0,
                fontSize: "clamp(1rem, 3vw, 1.4rem)",
                color: "#c05621",
              }}
            >
              {selectedPizza.flag} {selectedPizza.name}{" "}
              <span style={{ fontWeight: 400, fontSize: "0.8em", color: "#a0aec0" }}>
                ({selectedPizza.region})
              </span>
            </h3>
          </div>

          {/* pizza base + toppings layout */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            {/* pizza plate */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div
                style={{
                  width: "clamp(180px, 40vw, 260px)",
                  height: "clamp(180px, 40vw, 260px)",
                  borderRadius: "50%",
                  background: `radial-gradient(circle at 50% 50%, ${selectedPizza.baseColor} 65%, ${selectedPizza.crustColor} 66%, ${selectedPizza.crustColor} 78%, #a0783c 80%)`,
                  boxShadow: "0 6px 24px rgba(0,0,0,0.15), inset 0 2px 8px rgba(0,0,0,0.08)",
                  position: "relative",
                  border: "4px solid #e2c08d",
                }}
              >
                {/* placed toppings */}
                {selectedPizza.toppings.map((t) =>
                  currentPlaced.has(t.id)
                    ? t.positions.map((pos, i) => (
                        <div
                          key={`${t.id}-${i}`}
                          style={{
                            position: "absolute",
                            top: pos.top,
                            left: pos.left,
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            background: t.color,
                            border: "1.5px solid rgba(0,0,0,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 13,
                            animation: "popIn 0.3s ease-out",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
                          }}
                          title={t.name}
                        >
                          {t.emoji}
                        </div>
                      ))
                    : null
                )}

                {/* centre label when empty */}
                {currentPlaced.size === 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "#a0aec0",
                      fontSize: 13,
                      textAlign: "center",
                      pointerEvents: "none",
                      fontStyle: "italic",
                    }}
                  >
                    Add toppings!
                  </div>
                )}
              </div>

              {/* reset button */}
              <div style={{ textAlign: "center", marginTop: 8 }}>
                <button
                  onClick={handleReset}
                  style={{
                    padding: "4px 16px",
                    fontSize: 12,
                    borderRadius: 8,
                    border: "1px solid #e2e8f0",
                    background: "#fff",
                    color: "#718096",
                    cursor: "pointer",
                  }}
                >
                  {"\uD83D\uDD04"} Start Over
                </button>
              </div>
            </div>

            {/* right panel – toppings + fact */}
            <div style={{ flex: "1 1 200px", minWidth: 0 }}>
              <p
                style={{
                  margin: "0 0 8px",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#2d3748",
                }}
              >
                Toppings:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                {selectedPizza.toppings.map((t) => {
                  const placed = currentPlaced.has(t.id);
                  return (
                    <button
                      key={t.id}
                      onClick={() => handlePlaceTopping(t.id)}
                      disabled={placed}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "6px 12px",
                        borderRadius: 10,
                        border: placed ? "2px solid #48bb78" : "2px solid #e2e8f0",
                        background: placed
                          ? "linear-gradient(135deg, #f0fff4, #c6f6d5)"
                          : "#ffffff",
                        cursor: placed ? "default" : "pointer",
                        opacity: placed ? 0.7 : 1,
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#2d3748",
                        transition: "transform 0.12s, box-shadow 0.12s",
                        boxShadow: placed ? "none" : "0 2px 6px rgba(0,0,0,0.08)",
                      }}
                      onMouseEnter={(e) => {
                        if (!placed) (e.currentTarget.style.transform = "scale(1.08)");
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <span style={{ fontSize: 20 }}>{t.emoji}</span>
                      {t.name}
                      {placed && (
                        <span style={{ color: "#38a169", marginLeft: 2 }}>{"\u2713"}</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* target preview */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: 10,
                  padding: "8px 12px",
                  marginBottom: 10,
                  border: "1px dashed #cbd5e0",
                  fontSize: 13,
                  color: "#4a5568",
                }}
              >
                <strong>Target toppings:</strong>{" "}
                {selectedPizza.toppings.map((t) => t.emoji + " " + t.name).join(", ")}
              </div>

              {/* fun fact */}
              <div
                style={{
                  background: "linear-gradient(135deg, #ebf8ff, #bee3f8)",
                  borderRadius: 10,
                  padding: "8px 12px",
                  fontSize: 13,
                  color: "#2b6cb0",
                  lineHeight: 1.45,
                }}
              >
                <strong>{"\uD83D\uDCA1"} Fun Fact:</strong> {selectedPizza.funFact}
              </div>
            </div>
          </div>

          {/* celebration overlay */}
          {showCelebration && isCurrentComplete && (
            <div
              style={{
                marginTop: 16,
                textAlign: "center",
                padding: 16,
                background: "linear-gradient(135deg, #fffff0, #fefcbf)",
                borderRadius: 14,
                border: "3px solid #f6e05e",
                animation: "popIn 0.4s ease-out",
              }}
            >
              <div style={{ fontSize: 36 }}>{"\uD83C\uDF89\u2B50\uD83C\uDF55"}</div>
              <p
                style={{
                  margin: "6px 0 0",
                  fontWeight: 800,
                  fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
                  color: "#c05621",
                }}
              >
                {selectedPizza.celebration}
              </p>
              <p style={{ margin: "4px 0 0", fontSize: 14, color: "#718096" }}>
                You built the perfect {selectedPizza.name}!{" "}
                {completedIds.size === PIZZAS.length
                  ? "All 6 pizzas complete \u2014 you're a world pizza champion! \uD83C\uDFC6"
                  : `${completedIds.size}/${PIZZAS.length} done \u2014 keep going!`}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: 32,
            color: "#a0aec0",
            fontSize: 15,
          }}
        >
          {"\uD83D\uDC46"} Pick a pizza above to start building!
        </div>
      )}

      {/* keyframes via style tag */}
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.4); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
