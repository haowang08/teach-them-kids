import { useState } from "react";

interface BreadInfo {
  id: string;
  name: string;
  emoji: string;
  country: string;
  region: string;
  funFact: string;
  ingredients: string[];
  /** Position on map as percentage [left, top] */
  position: [number, number];
  /** Color of the continent blob behind it */
  continentColor: string;
}

const BREADS: BreadInfo[] = [
  {
    id: "baguette",
    name: "Baguette",
    emoji: "\u{1F956}",
    country: "France",
    region: "Europe",
    funFact:
      "A French law says a traditional baguette can only be made with flour, water, salt, and yeast. The crispy crust comes from steam injected into the oven!",
    ingredients: ["Flour", "Water", "Salt", "Yeast"],
    position: [46, 32],
    continentColor: "#8B7355",
  },
  {
    id: "naan",
    name: "Naan",
    emoji: "\u{1FAD3}",
    country: "India",
    region: "South Asia",
    funFact:
      "Naan is cooked by slapping the dough onto the inside wall of a super-hot clay oven called a tandoor. It puffs up like a pillow!",
    ingredients: ["Flour", "Yogurt", "Yeast", "Ghee"],
    position: [66, 42],
    continentColor: "#C4A35A",
  },
  {
    id: "tortilla",
    name: "Tortilla",
    emoji: "\u{1FAD4}",
    country: "Mexico",
    region: "Central America",
    funFact:
      "Corn tortillas have been made in Mexico for over 10,000 years! Ancient Mayans believed humans were made from corn dough.",
    ingredients: ["Corn (Masa)", "Water", "Lime", "Salt"],
    position: [20, 46],
    continentColor: "#A0C878",
  },
  {
    id: "sourdough",
    name: "Sourdough",
    emoji: "\u{1F35E}",
    country: "USA (San Francisco)",
    region: "North America",
    funFact:
      "San Francisco sourdough has a unique tangy taste because of special wild bacteria that live only in the foggy Bay Area air!",
    ingredients: ["Flour", "Water", "Salt", "Wild Yeast Starter"],
    position: [14, 34],
    continentColor: "#7EC8A0",
  },
  {
    id: "pita",
    name: "Pita",
    emoji: "\u{1FAD3}",
    country: "Middle East",
    region: "Middle East",
    funFact:
      "Pita bread puffs up into a hollow pocket when baked at very high heat. The steam inside creates a perfect pocket for stuffing with falafel!",
    ingredients: ["Flour", "Water", "Yeast", "Olive Oil"],
    position: [56, 40],
    continentColor: "#D4A76A",
  },
  {
    id: "injera",
    name: "Injera",
    emoji: "\u{1F95E}",
    country: "Ethiopia",
    region: "East Africa",
    funFact:
      "Injera is a spongy, sour flatbread that doubles as your plate AND your utensil! You tear off pieces and use them to scoop up stews.",
    ingredients: ["Teff Flour", "Water", "Salt"],
    position: [55, 55],
    continentColor: "#C8A870",
  },
  {
    id: "focaccia",
    name: "Focaccia",
    emoji: "\u{1F35E}",
    country: "Italy",
    region: "Europe",
    funFact:
      "Bakers poke dimples into focaccia dough with their fingers before baking. These little holes hold pools of delicious olive oil!",
    ingredients: ["Flour", "Olive Oil", "Salt", "Rosemary", "Yeast"],
    position: [50, 35],
    continentColor: "#8B7355",
  },
  {
    id: "mantou",
    name: "Mantou",
    emoji: "\u{1F35E}",
    country: "China",
    region: "East Asia",
    funFact:
      "Mantou are soft, fluffy steamed buns that have been eaten in China for nearly 2,000 years. They are steamed, not baked, which makes them cloud-soft!",
    ingredients: ["Flour", "Water", "Sugar", "Yeast"],
    position: [76, 38],
    continentColor: "#E8C87A",
  },
  {
    id: "pretzel",
    name: "Pretzel",
    emoji: "\u{1F968}",
    country: "Germany",
    region: "Europe",
    funFact:
      "The pretzel's twisted shape may represent arms crossed in prayer! They are dipped in a special baking soda bath that gives them their shiny brown crust.",
    ingredients: ["Flour", "Water", "Butter", "Baking Soda", "Salt"],
    position: [49, 29],
    continentColor: "#8B7355",
  },
  {
    id: "damper",
    name: "Damper",
    emoji: "\u{1F35E}",
    country: "Australia",
    region: "Oceania",
    funFact:
      "Damper is a simple bush bread traditionally cooked in the hot coals of a campfire by Aboriginal Australians and later by stockmen in the outback!",
    ingredients: ["Flour", "Water", "Salt", "Butter"],
    position: [82, 70],
    continentColor: "#D4956A",
  },
];

const PASSPORT_STAMP_COLORS = [
  "#B8432F",
  "#2E6B4F",
  "#3B5998",
  "#8B4513",
  "#6B3FA0",
  "#C4721A",
  "#1A7A7A",
  "#A0522D",
  "#4A6741",
  "#8B0000",
];

export default function BreadAtlas() {
  const [discovered, setDiscovered] = useState<Set<string>>(new Set());
  const [selectedBread, setSelectedBread] = useState<BreadInfo | null>(null);
  const [showPassport, setShowPassport] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleMarkerClick = (bread: BreadInfo) => {
    setSelectedBread(bread);
    setShowPassport(false);

    if (!discovered.has(bread.id)) {
      const next = new Set(discovered);
      next.add(bread.id);
      setDiscovered(next);

      if (next.size === BREADS.length) {
        setTimeout(() => setShowCelebration(true), 800);
      }
    }
  };

  const closeCard = () => {
    setSelectedBread(null);
  };

  const discoveredCount = discovered.size;
  const totalBreads = BREADS.length;

  return (
    <div className="rounded-2xl overflow-hidden select-none" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center justify-between flex-wrap gap-2"
        style={{ background: "linear-gradient(135deg, #8B4513, #A0522D, #CD853F)" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">{"\u{1F30D}"}</span>
          <h2 className="text-lg sm:text-xl font-bold text-amber-50 drop-shadow">
            Bread Atlas
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setShowPassport(!showPassport); setSelectedBread(null); }}
            className="px-3 py-1 rounded-full text-xs sm:text-sm font-bold transition-all duration-200"
            style={{
              background: showPassport ? "#FDE68A" : "rgba(255,255,255,0.2)",
              color: showPassport ? "#78350F" : "#FDE68A",
              border: "2px solid #FDE68A",
            }}
          >
            {"\u{1F4D8}"} Passport
          </button>
          <div
            className="px-3 py-1 rounded-full text-xs sm:text-sm font-bold"
            style={{ background: "rgba(255,255,255,0.2)", color: "#FDE68A" }}
          >
            {discoveredCount}/{totalBreads} Discovered!
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div
        className="relative"
        style={{
          background: "linear-gradient(180deg, #F5E6C8 0%, #EDD9B3 50%, #E8D0A0 100%)",
          minHeight: 420,
        }}
      >
        {/* Subtle map grid lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage:
            "linear-gradient(rgba(139,69,19,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,69,19,0.3) 1px, transparent 1px)",
          backgroundSize: "10% 10%",
        }} />

        {/* Compass rose */}
        <div className="absolute top-3 right-3 text-2xl opacity-30 pointer-events-none select-none">
          {"\u{1F9ED}"}
        </div>

        {/* Continent blobs (very simplified) */}
        {/* North America */}
        <div className="absolute rounded-3xl pointer-events-none" style={{
          left: "6%", top: "18%", width: "22%", height: "35%",
          background: "rgba(126,200,160,0.25)", borderRadius: "40% 60% 50% 40%",
        }} />
        {/* South America */}
        <div className="absolute rounded-3xl pointer-events-none" style={{
          left: "18%", top: "52%", width: "14%", height: "32%",
          background: "rgba(126,200,160,0.2)", borderRadius: "50% 45% 55% 40%",
        }} />
        {/* Europe */}
        <div className="absolute rounded-3xl pointer-events-none" style={{
          left: "42%", top: "18%", width: "14%", height: "22%",
          background: "rgba(139,115,85,0.22)", borderRadius: "45% 55% 40% 50%",
        }} />
        {/* Africa */}
        <div className="absolute rounded-3xl pointer-events-none" style={{
          left: "44%", top: "40%", width: "16%", height: "35%",
          background: "rgba(200,168,112,0.22)", borderRadius: "40% 50% 55% 45%",
        }} />
        {/* Asia */}
        <div className="absolute rounded-3xl pointer-events-none" style={{
          left: "56%", top: "16%", width: "28%", height: "38%",
          background: "rgba(232,200,122,0.2)", borderRadius: "50% 40% 45% 55%",
        }} />
        {/* Australia */}
        <div className="absolute rounded-3xl pointer-events-none" style={{
          left: "74%", top: "60%", width: "16%", height: "20%",
          background: "rgba(212,149,106,0.25)", borderRadius: "45% 55% 50% 40%",
        }} />

        {/* Bread markers */}
        {BREADS.map((bread) => {
          const isDiscovered = discovered.has(bread.id);
          const isSelected = selectedBread?.id === bread.id;

          return (
            <button
              key={bread.id}
              onClick={() => handleMarkerClick(bread)}
              className="absolute flex flex-col items-center group"
              style={{
                left: `${bread.position[0]}%`,
                top: `${bread.position[1]}%`,
                transform: "translate(-50%, -50%)",
                zIndex: isSelected ? 20 : 10,
              }}
              title={isDiscovered ? bread.name : "???"}
            >
              {/* Marker dot */}
              <div
                className="relative flex items-center justify-center transition-all duration-300"
                style={{
                  width: isSelected ? 44 : 36,
                  height: isSelected ? 44 : 36,
                  borderRadius: "50%",
                  background: isDiscovered
                    ? "radial-gradient(circle, #FFD700, #DAA520)"
                    : "radial-gradient(circle, #D4A76A, #A0522D)",
                  boxShadow: isDiscovered
                    ? "0 0 12px rgba(255,215,0,0.6), 0 2px 8px rgba(0,0,0,0.2)"
                    : isSelected
                      ? "0 0 8px rgba(160,82,45,0.5)"
                      : "0 2px 6px rgba(0,0,0,0.2)",
                  border: isSelected ? "3px solid #FFF" : "2px solid rgba(255,255,255,0.6)",
                  animation: !isDiscovered ? "pulse-marker 2s ease-in-out infinite" : undefined,
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: isDiscovered ? 20 : 16 }}>
                  {isDiscovered ? bread.emoji : "?"}
                </span>
              </div>
              {/* Label below marker */}
              {isDiscovered && (
                <span
                  className="mt-1 text-center font-bold leading-tight whitespace-nowrap pointer-events-none"
                  style={{
                    fontSize: 9,
                    color: "#5C3A1E",
                    textShadow: "0 1px 2px rgba(255,255,255,0.8)",
                    maxWidth: 70,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {bread.name}
                </span>
              )}
            </button>
          );
        })}

        {/* Info card overlay */}
        {selectedBread && !showPassport && (
          <div
            className="absolute inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 30 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.3)" }}
              onClick={closeCard}
            />
            {/* Card */}
            <div
              className="relative rounded-2xl p-5 max-w-xs w-full"
              style={{
                background: "linear-gradient(145deg, #FFFBF0, #F5E6C8)",
                border: "3px solid #DAA520",
                boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.5)",
                animation: "card-pop 0.3s ease-out",
              }}
            >
              <button
                onClick={closeCard}
                className="absolute top-2 right-3 text-lg font-bold transition-colors"
                style={{ color: "#A0522D" }}
              >
                {"\u2715"}
              </button>
              <div className="text-center mb-3">
                <span className="text-5xl block mb-1">{selectedBread.emoji}</span>
                <h3 className="text-xl font-extrabold" style={{ color: "#5C3A1E" }}>
                  {selectedBread.name}
                </h3>
                <p className="text-sm font-semibold" style={{ color: "#A0522D" }}>
                  {selectedBread.country} {"\u2022"} {selectedBread.region}
                </p>
              </div>
              <div
                className="rounded-xl p-3 mb-3"
                style={{ background: "rgba(139,69,19,0.08)" }}
              >
                <p className="text-sm leading-relaxed" style={{ color: "#5C3A1E" }}>
                  {"\u{1F4A1}"} {selectedBread.funFact}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold mb-1" style={{ color: "#A0522D" }}>
                  Key Ingredients:
                </p>
                <div className="flex flex-wrap gap-1">
                  {selectedBread.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{
                        background: "rgba(218,165,32,0.2)",
                        color: "#78350F",
                        border: "1px solid rgba(218,165,32,0.4)",
                      }}
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Passport view */}
        {showPassport && (
          <div
            className="absolute inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 30 }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.3)" }}
              onClick={() => setShowPassport(false)}
            />
            <div
              className="relative rounded-2xl p-5 max-w-sm w-full overflow-y-auto"
              style={{
                background: "linear-gradient(145deg, #1E3A5F, #1A2F4A)",
                border: "3px solid #DAA520",
                boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
                maxHeight: "90%",
                animation: "card-pop 0.3s ease-out",
              }}
            >
              <button
                onClick={() => setShowPassport(false)}
                className="absolute top-2 right-3 text-lg font-bold"
                style={{ color: "#DAA520" }}
              >
                {"\u2715"}
              </button>
              <div className="text-center mb-4">
                <span className="text-3xl">{"\u{1F4D8}"}</span>
                <h3 className="text-lg font-extrabold" style={{ color: "#FFD700" }}>
                  Bread Passport
                </h3>
                <p className="text-xs" style={{ color: "#A0C4E8" }}>
                  {discoveredCount}/{totalBreads} stamps collected
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {BREADS.map((bread, idx) => {
                  const stamped = discovered.has(bread.id);
                  return (
                    <div
                      key={bread.id}
                      className="rounded-xl p-2 flex flex-col items-center justify-center text-center"
                      style={{
                        minHeight: 72,
                        background: stamped
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(255,255,255,0.03)",
                        border: stamped
                          ? `2px solid ${PASSPORT_STAMP_COLORS[idx % PASSPORT_STAMP_COLORS.length]}`
                          : "2px dashed rgba(255,255,255,0.15)",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {stamped ? (
                        <>
                          {/* Stamp ring effect */}
                          <div
                            className="absolute inset-1 rounded-lg pointer-events-none"
                            style={{
                              border: `2px solid ${PASSPORT_STAMP_COLORS[idx % PASSPORT_STAMP_COLORS.length]}`,
                              opacity: 0.3,
                              transform: `rotate(${(idx * 7 - 15) % 30}deg)`,
                            }}
                          />
                          <span className="text-2xl mb-0.5">{bread.emoji}</span>
                          <span
                            className="text-xs font-bold"
                            style={{ color: PASSPORT_STAMP_COLORS[idx % PASSPORT_STAMP_COLORS.length] }}
                          >
                            {bread.name}
                          </span>
                          <span className="text-xs" style={{ color: "#A0C4E8", fontSize: 9 }}>
                            {bread.country}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-xl mb-0.5" style={{ opacity: 0.3 }}>
                            {"?"}
                          </span>
                          <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                            Undiscovered
                          </span>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Celebration overlay */}
        {showCelebration && (
          <div
            className="absolute inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 40 }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.4)" }}
              onClick={() => setShowCelebration(false)}
            />
            <div
              className="relative rounded-2xl p-6 text-center max-w-xs w-full"
              style={{
                background: "linear-gradient(145deg, #FFF8DC, #FFE4B5)",
                border: "4px solid #FFD700",
                boxShadow: "0 0 40px rgba(255,215,0,0.4), 0 8px 32px rgba(0,0,0,0.2)",
                animation: "card-pop 0.4s ease-out",
              }}
            >
              <div className="text-5xl mb-2">
                {"\u{1F389}\u{1F35E}\u{1F30D}"}
              </div>
              <h3 className="text-xl font-extrabold mb-2" style={{ color: "#78350F" }}>
                Master Baker Explorer!
              </h3>
              <p className="text-sm mb-3" style={{ color: "#92400E" }}>
                You discovered all {totalBreads} breads from around the world! Your passport is complete!
              </p>
              <div className="flex justify-center gap-1 text-2xl mb-3">
                {BREADS.map((b) => (
                  <span key={b.id}>{b.emoji}</span>
                ))}
              </div>
              <button
                onClick={() => setShowCelebration(false)}
                className="px-4 py-2 rounded-full text-sm font-bold transition-all"
                style={{
                  background: "linear-gradient(135deg, #DAA520, #FFD700)",
                  color: "#5C3A1E",
                  border: "2px solid #B8860B",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              >
                Keep Exploring!
              </button>
            </div>
          </div>
        )}

        {/* Hint text at bottom */}
        {discoveredCount === 0 && !selectedBread && (
          <div
            className="absolute bottom-3 left-0 right-0 text-center pointer-events-none"
            style={{ zIndex: 5 }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold"
              style={{
                background: "rgba(139,69,19,0.12)",
                color: "#78350F",
                animation: "pulse-marker 2s ease-in-out infinite",
              }}
            >
              {"\u{1F447}"} Tap the pulsing markers to discover breads from around the world!
            </span>
          </div>
        )}
      </div>

      {/* CSS animations via style tag */}
      <style>{`
        @keyframes pulse-marker {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes card-pop {
          0% { transform: scale(0.85); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
