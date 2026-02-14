import { useState, useCallback } from "react";

// ============================================
// TYPES
// ============================================

type GamePhase = "intro" | "planting" | "growing" | "complete";

interface PlantType {
  id: string;
  name: string;
  emoji: string;
  label: string;
  rate: number;
  description: string;
  color: string;
  potColor: string;
}

interface YearEvent {
  year: number;
  message: string;
  emoji: string;
}

// ============================================
// CONSTANTS
// ============================================

const COLORS = {
  bg: "#0D1B0D",
  cardBg: "#1A2E1A",
  green: "#4CAF50",
  gold: "#FFD700",
  blue: "#64B5F6",
  brown: "#8D6E63",
  soil: "#5D4037",
  white: "#E8F5E9",
  dimText: "#81C784",
  red: "#EF5350",
};

const PLANT_TYPES: PlantType[] = [
  {
    id: "flowers",
    name: "Safe Flowers",
    emoji: "\u{1F338}",
    label: "Savings Account",
    rate: 0.03,
    description: "3% growth/year, never shrinks",
    color: COLORS.blue,
    potColor: "#90CAF9",
  },
  {
    id: "trees",
    name: "Steady Trees",
    emoji: "\u{1F333}",
    label: "Bonds",
    rate: 0.06,
    description: "6% avg growth, small chance of dip",
    color: COLORS.green,
    potColor: "#66BB6A",
  },
  {
    id: "sunflowers",
    name: "Sunflowers",
    emoji: "\u{1F33B}",
    label: "Stocks",
    rate: 0.1,
    description: "10% avg growth, volatile!",
    color: COLORS.gold,
    potColor: "#FFE082",
  },
];

const TOTAL_YEARS = 10;
const STARTING_MONEY = 100;

const SPARKLE_KEYFRAMES = `
@keyframes sparkle {
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
}
@keyframes growUp {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
`;

// ============================================
// HELPERS
// ============================================

function simulateYear(
  plantId: string,
  currentValue: number
): { newValue: number; growthRate: number; event: string | null } {
  let growthRate: number;
  let event: string | null = null;
  const roll = Math.random();

  if (plantId === "flowers") {
    growthRate = 0.03;
  } else if (plantId === "trees") {
    if (roll < 0.15) {
      growthRate = -0.02;
      event = "Bond market dip! Trees lost a little.";
    } else if (roll < 0.4) {
      growthRate = 0.04;
    } else {
      growthRate = 0.06 + (Math.random() * 0.02);
    }
  } else {
    if (roll < 0.12) {
      growthRate = -0.15 + (Math.random() * 0.05);
      event = "Market crash! Sunflowers dropped!";
    } else if (roll < 0.25) {
      growthRate = -0.05 + (Math.random() * 0.05);
    } else if (roll < 0.7) {
      growthRate = 0.05 + (Math.random() * 0.1);
    } else {
      growthRate = 0.15 + (Math.random() * 0.15);
      event = "Great year! Sunflowers boomed!";
    }
  }

  const newValue = Math.max(currentValue * (1 + growthRate), currentValue * 0.5);
  return { newValue, growthRate, event };
}

// ============================================
// COMPONENT
// ============================================

export default function CompoundGrowthGarden() {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [allocations, setAllocations] = useState<Record<string, number>>({
    flowers: 34,
    trees: 33,
    sunflowers: 33,
  });
  const [values, setValues] = useState<Record<string, number>>({
    flowers: 0,
    trees: 0,
    sunflowers: 0,
  });
  const [year, setYear] = useState(0);
  const [yearEvents, setYearEvents] = useState<YearEvent[]>([]);
  const [yearLog, setYearLog] = useState<string[]>([]);
  const [allFlowersValues, setAllFlowersValues] = useState(STARTING_MONEY);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalAllocated = Object.values(allocations).reduce((a, b) => a + b, 0);

  const handleAllocate = useCallback(
    (plantId: string, delta: number) => {
      setAllocations((prev) => {
        const current = prev[plantId];
        const newVal = Math.max(0, Math.min(STARTING_MONEY, current + delta));
        const diff = newVal - current;
        const otherTotal = totalAllocated - current;
        if (otherTotal + newVal > STARTING_MONEY && diff > 0) return prev;
        return { ...prev, [plantId]: newVal };
      });
    },
    [totalAllocated]
  );

  const startGrowing = useCallback(() => {
    if (totalAllocated > STARTING_MONEY) return;
    setValues({
      flowers: allocations.flowers,
      trees: allocations.trees,
      sunflowers: allocations.sunflowers,
    });
    setAllFlowersValues(STARTING_MONEY);
    setYear(0);
    setYearEvents([]);
    setYearLog([]);
    setPhase("growing");
  }, [allocations, totalAllocated]);

  const advanceYear = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    const currentYear = year + 1;
    const logs: string[] = [];
    const events: YearEvent[] = [];

    setValues((prev) => {
      const next = { ...prev };
      PLANT_TYPES.forEach((plant) => {
        if (prev[plant.id] > 0) {
          const result = simulateYear(plant.id, prev[plant.id]);
          next[plant.id] = Math.round(result.newValue * 100) / 100;
          const pct = (result.growthRate * 100).toFixed(1);
          const sign = result.growthRate >= 0 ? "+" : "";
          logs.push(
            `${plant.emoji} ${plant.name}: $${prev[plant.id].toFixed(2)} → $${next[plant.id].toFixed(2)} (${sign}${pct}%)`
          );
          if (result.event) {
            events.push({ year: currentYear, message: result.event, emoji: plant.emoji });
          }
        }
      });
      return next;
    });

    setAllFlowersValues((prev) => Math.round(prev * 1.03 * 100) / 100);
    setYear(currentYear);
    setYearLog(logs);
    setYearEvents((prev) => [...prev, ...events]);

    setTimeout(() => {
      setIsAnimating(false);
      if (currentYear >= TOTAL_YEARS) {
        setTimeout(() => setPhase("complete"), 800);
      }
    }, 600);
  }, [year, isAnimating]);

  const resetGame = useCallback(() => {
    setPhase("intro");
    setAllocations({ flowers: 34, trees: 33, sunflowers: 33 });
    setValues({ flowers: 0, trees: 0, sunflowers: 0 });
    setYear(0);
    setYearEvents([]);
    setYearLog([]);
    setAllFlowersValues(STARTING_MONEY);
    setIsAnimating(false);
  }, []);

  const totalValue = Object.values(values).reduce((a, b) => a + b, 0);

  // ============================================
  // RENDER HELPERS
  // ============================================

  const renderPlantSVG = (plantId: string, value: number, allocation: number) => {
    const plant = PLANT_TYPES.find((p) => p.id === plantId)!;
    const growthRatio = allocation > 0 ? Math.min(value / allocation, 4) : 0;
    const height = 20 + growthRatio * 40;

    return (
      <svg width="100" height="180" viewBox="0 0 100 180" style={{ display: "block", margin: "0 auto" }}>
        {/* Pot */}
        <path d="M30 155 L35 180 L65 180 L70 155 Z" fill={plant.potColor} opacity={0.8} />
        <rect x="27" y="150" width="46" height="8" rx="2" fill={plant.potColor} />
        {/* Stem */}
        {allocation > 0 && (
          <rect
            x="47"
            y={150 - height}
            width="6"
            rx="3"
            height={height}
            fill="#388E3C"
            style={{
              transformOrigin: "50px 150px",
              animation: isAnimating ? "growUp 0.5s ease-out" : undefined,
            }}
          />
        )}
        {/* Leaves */}
        {growthRatio > 0.5 && (
          <>
            <ellipse
              cx={40}
              cy={150 - height * 0.4}
              rx="12"
              ry="5"
              fill="#66BB6A"
              transform={`rotate(-30 40 ${150 - height * 0.4})`}
            />
            <ellipse
              cx={60}
              cy={150 - height * 0.6}
              rx="12"
              ry="5"
              fill="#66BB6A"
              transform={`rotate(30 60 ${150 - height * 0.6})`}
            />
          </>
        )}
        {/* Flower/Crown */}
        {allocation > 0 && growthRatio > 0.2 && (
          <>
            {plantId === "flowers" && (
              <>
                <circle cx="50" cy={145 - height} r={8 + growthRatio * 3} fill="#E1BEE7" opacity={0.9} />
                <circle cx="50" cy={145 - height} r={4 + growthRatio} fill="#F8BBD0" />
              </>
            )}
            {plantId === "trees" && (
              <>
                <ellipse cx="50" cy={140 - height} rx={14 + growthRatio * 5} ry={12 + growthRatio * 4} fill="#2E7D32" />
                <ellipse cx="42" cy={145 - height} rx={10 + growthRatio * 3} ry={8 + growthRatio * 3} fill="#388E3C" />
                <ellipse cx="58" cy={145 - height} rx={10 + growthRatio * 3} ry={8 + growthRatio * 3} fill="#388E3C" />
              </>
            )}
            {plantId === "sunflowers" && (
              <>
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                  const r = 6 + growthRatio * 3;
                  const cx = 50 + Math.cos((angle * Math.PI) / 180) * (r + 2);
                  const cy = 143 - height + Math.sin((angle * Math.PI) / 180) * (r + 2);
                  return <ellipse key={angle} cx={cx} cy={cy} rx="5" ry="3" fill={COLORS.gold}
                    transform={`rotate(${angle} ${cx} ${cy})`} />;
                })}
                <circle cx="50" cy={143 - height} r={5 + growthRatio * 2} fill="#795548" />
              </>
            )}
          </>
        )}
        {/* Sparkles during animation */}
        {isAnimating && allocation > 0 && (
          <>
            {[0, 1, 2].map((i) => (
              <circle
                key={i}
                cx={35 + i * 15}
                cy={130 - height + i * 10}
                r="2"
                fill={COLORS.gold}
                style={{ animation: `sparkle 0.8s ease-in-out ${i * 0.2}s` }}
              />
            ))}
          </>
        )}
      </svg>
    );
  };

  const renderGardenScene = (showValues: boolean) => {
    return (
      <div style={{ position: "relative", background: "linear-gradient(180deg, #1B3A1B 0%, #0D1B0D 40%, #3E2723 90%, #5D4037 100%)", borderRadius: 16, padding: "20px 10px 10px", marginBottom: 16 }}>
        {/* Sun */}
        <div style={{ position: "absolute", top: 8, right: 16, width: 40, height: 40, borderRadius: "50%", background: "radial-gradient(circle, #FFF176, #FFD700, transparent)", opacity: 0.7 }} />
        {/* Plants row */}
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-end" }}>
          {PLANT_TYPES.map((plant) => (
            <div key={plant.id} style={{ textAlign: "center", flex: 1 }}>
              {renderPlantSVG(plant.id, values[plant.id], allocations[plant.id])}
              {showValues && allocations[plant.id] > 0 && (
                <div style={{ color: plant.color, fontWeight: 700, fontSize: 15, marginTop: 4, animation: "fadeSlideIn 0.4s ease-out" }}>
                  ${values[plant.id].toFixed(2)}
                </div>
              )}
              <div style={{ color: COLORS.dimText, fontSize: 11, marginTop: 2 }}>
                {plant.emoji} {plant.name}
              </div>
            </div>
          ))}
        </div>
        {/* Soil line */}
        <div style={{ height: 6, background: `linear-gradient(90deg, ${COLORS.soil}, ${COLORS.brown}, ${COLORS.soil})`, borderRadius: 3, marginTop: 4 }} />
      </div>
    );
  };

  // ============================================
  // PHASE RENDERS
  // ============================================

  const renderIntro = () => (
    <div style={{ textAlign: "center", padding: 20 }}>
      <div style={{ fontSize: 56, marginBottom: 12 }}>{"\u{1F33B}\u{1F333}\u{1F338}"}</div>
      <h1 style={{ color: COLORS.green, fontSize: 28, margin: "0 0 8px" }}>Compound Growth Garden</h1>
      <p style={{ color: COLORS.dimText, fontSize: 16, lineHeight: 1.6, maxWidth: 420, margin: "0 auto 20px" }}>
        Welcome to the Growth Garden! Plant your money seeds and watch them grow over 10 years through
        the magic of <span style={{ color: COLORS.gold, fontWeight: 700 }}>compound interest</span>!
      </p>
      <p style={{ color: COLORS.white, fontSize: 14, marginBottom: 24 }}>
        You have <strong style={{ color: COLORS.gold }}>${STARTING_MONEY}</strong> to invest across three types of plants.
        Each grows differently -- some are safe and steady, others are wild and unpredictable!
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 380, margin: "0 auto 28px" }}>
        {PLANT_TYPES.map((plant) => (
          <div key={plant.id} style={{ background: COLORS.cardBg, borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, border: `1px solid ${plant.color}33` }}>
            <span style={{ fontSize: 28 }}>{plant.emoji}</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ color: plant.color, fontWeight: 700, fontSize: 14 }}>{plant.name} <span style={{ fontWeight: 400, color: COLORS.dimText }}>({plant.label})</span></div>
              <div style={{ color: COLORS.dimText, fontSize: 12 }}>{plant.description}</div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => setPhase("planting")} style={btnStyle(COLORS.green)}>
        Start Planting!
      </button>
    </div>
  );

  const renderPlanting = () => {
    const remaining = STARTING_MONEY - totalAllocated;
    return (
      <div style={{ padding: 20 }}>
        <h2 style={{ color: COLORS.green, textAlign: "center", margin: "0 0 6px", fontSize: 22 }}>
          Plant Your Seeds
        </h2>
        <p style={{ color: COLORS.dimText, textAlign: "center", fontSize: 13, margin: "0 0 16px" }}>
          Distribute your ${STARTING_MONEY} across the three plant types
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 400, margin: "0 auto 16px" }}>
          {PLANT_TYPES.map((plant) => (
            <div key={plant.id} style={{ background: COLORS.cardBg, borderRadius: 12, padding: 14, border: `1px solid ${plant.color}44` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ color: plant.color, fontWeight: 700, fontSize: 15 }}>
                  {plant.emoji} {plant.name}
                </span>
                <span style={{ color: COLORS.gold, fontWeight: 700, fontSize: 18 }}>
                  ${allocations[plant.id]}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => handleAllocate(plant.id, -10)} style={smallBtnStyle(plant.color)}>-10</button>
                <button onClick={() => handleAllocate(plant.id, -1)} style={smallBtnStyle(plant.color)}>-1</button>
                <div style={{ flex: 1, height: 8, background: "#0D1B0D", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${allocations[plant.id]}%`, height: "100%", background: plant.color, borderRadius: 4, transition: "width 0.2s" }} />
                </div>
                <button onClick={() => handleAllocate(plant.id, 1)} style={smallBtnStyle(plant.color)}>+1</button>
                <button onClick={() => handleAllocate(plant.id, 10)} style={smallBtnStyle(plant.color)}>+10</button>
              </div>
              <div style={{ color: COLORS.dimText, fontSize: 11, marginTop: 6 }}>{plant.description}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <span style={{ color: remaining === 0 ? COLORS.green : remaining < 0 ? COLORS.red : COLORS.gold, fontWeight: 700, fontSize: 15 }}>
            {remaining === 0 ? "All $100 allocated!" : remaining < 0 ? `$${Math.abs(remaining)} over budget!` : `$${remaining} remaining`}
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          <button onClick={() => setPhase("intro")} style={btnStyle("#555")}>Back</button>
          <button
            onClick={startGrowing}
            disabled={remaining < 0 || totalAllocated === 0}
            style={{
              ...btnStyle(COLORS.green),
              opacity: remaining < 0 || totalAllocated === 0 ? 0.4 : 1,
              cursor: remaining < 0 || totalAllocated === 0 ? "not-allowed" : "pointer",
            }}
          >
            Plant & Grow!
          </button>
        </div>
      </div>
    );
  };

  const renderGrowing = () => {
    const latestEvents = yearEvents.filter((e) => e.year === year);
    return (
      <div style={{ padding: 16 }}>
        {/* Year counter */}
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <div style={{ color: COLORS.dimText, fontSize: 13 }}>Year</div>
          <div style={{ color: COLORS.gold, fontSize: 42, fontWeight: 800, lineHeight: 1 }}>
            {year} <span style={{ fontSize: 16, color: COLORS.dimText, fontWeight: 400 }}>/ {TOTAL_YEARS}</span>
          </div>
        </div>

        {/* Garden scene */}
        {renderGardenScene(true)}

        {/* Total */}
        <div style={{ textAlign: "center", background: COLORS.cardBg, borderRadius: 12, padding: "10px 16px", marginBottom: 12, border: `1px solid ${COLORS.gold}33` }}>
          <div style={{ color: COLORS.dimText, fontSize: 12 }}>Total Portfolio</div>
          <div style={{ color: COLORS.gold, fontSize: 28, fontWeight: 800, animation: isAnimating ? "pulse 0.5s ease-in-out" : undefined }}>
            ${totalValue.toFixed(2)}
          </div>
          <div style={{ color: totalValue >= STARTING_MONEY ? COLORS.green : COLORS.red, fontSize: 13 }}>
            {totalValue >= STARTING_MONEY ? "+" : ""}{((totalValue - STARTING_MONEY) / STARTING_MONEY * 100).toFixed(1)}% from start
          </div>
        </div>

        {/* Events */}
        {latestEvents.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            {latestEvents.map((ev, i) => (
              <div key={i} style={{
                background: ev.message.includes("crash") || ev.message.includes("dropped") ? "#4A1A1A" : "#1A3A1A",
                border: `1px solid ${ev.message.includes("crash") || ev.message.includes("dropped") ? COLORS.red : COLORS.green}44`,
                borderRadius: 8, padding: "8px 12px", marginBottom: 6, color: COLORS.white, fontSize: 13,
                animation: "fadeSlideIn 0.4s ease-out",
              }}>
                {ev.emoji} {ev.message}
              </div>
            ))}
          </div>
        )}

        {/* Year log */}
        {yearLog.length > 0 && (
          <div style={{ background: COLORS.cardBg, borderRadius: 10, padding: 12, marginBottom: 14, fontSize: 12 }}>
            {yearLog.map((log, i) => (
              <div key={i} style={{ color: COLORS.dimText, marginBottom: 3, animation: "fadeSlideIn 0.3s ease-out" }}>
                {log}
              </div>
            ))}
          </div>
        )}

        {/* Next year button */}
        {year < TOTAL_YEARS && (
          <div style={{ textAlign: "center" }}>
            <button onClick={advanceYear} disabled={isAnimating} style={{
              ...btnStyle(COLORS.green),
              opacity: isAnimating ? 0.5 : 1,
              cursor: isAnimating ? "not-allowed" : "pointer",
              fontSize: 16,
              padding: "12px 36px",
            }}>
              {year === 0 ? "Start Year 1" : `Grow Year ${year + 1}`}
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderComplete = () => {
    const gain = totalValue - STARTING_MONEY;
    const gainPct = ((gain / STARTING_MONEY) * 100).toFixed(1);
    const allFlowersFinal = allFlowersValues;
    const diff = totalValue - allFlowersFinal;

    return (
      <div style={{ padding: 20 }}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 44, marginBottom: 6 }}>{"\u{1F389}"}</div>
          <h2 style={{ color: COLORS.gold, fontSize: 24, margin: "0 0 4px" }}>Garden Complete!</h2>
          <p style={{ color: COLORS.dimText, fontSize: 13 }}>10 years of compound growth</p>
        </div>

        {renderGardenScene(true)}

        {/* Results */}
        <div style={{ background: COLORS.cardBg, borderRadius: 14, padding: 18, marginBottom: 16, border: `1px solid ${COLORS.gold}33` }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ color: COLORS.dimText, fontSize: 13 }}>Your Portfolio Grew To</div>
            <div style={{ color: COLORS.gold, fontSize: 36, fontWeight: 800 }}>${totalValue.toFixed(2)}</div>
            <div style={{ color: gain >= 0 ? COLORS.green : COLORS.red, fontSize: 15, fontWeight: 600 }}>
              {gain >= 0 ? "+" : ""}${gain.toFixed(2)} ({gain >= 0 ? "+" : ""}{gainPct}%)
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${COLORS.green}33`, paddingTop: 12 }}>
            {PLANT_TYPES.map((plant) =>
              allocations[plant.id] > 0 ? (
                <div key={plant.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
                  <span style={{ color: COLORS.dimText }}>{plant.emoji} {plant.name} (${allocations[plant.id]} invested)</span>
                  <span style={{ color: plant.color, fontWeight: 700 }}>${values[plant.id].toFixed(2)}</span>
                </div>
              ) : null
            )}
          </div>
        </div>

        {/* Comparison */}
        <div style={{ background: "#1A2A3A", borderRadius: 12, padding: 16, marginBottom: 16, border: `1px solid ${COLORS.blue}33` }}>
          <div style={{ color: COLORS.blue, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>
            {"\u{1F4CA}"} Comparison
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
            <span style={{ color: COLORS.dimText }}>If all in Safe Flowers (3%):</span>
            <span style={{ color: COLORS.blue, fontWeight: 700 }}>${allFlowersFinal.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
            <span style={{ color: COLORS.dimText }}>Your strategy:</span>
            <span style={{ color: COLORS.gold, fontWeight: 700 }}>${totalValue.toFixed(2)}</span>
          </div>
          <div style={{ marginTop: 8, color: diff >= 0 ? COLORS.green : COLORS.blue, fontSize: 13 }}>
            {diff >= 0
              ? `Your strategy earned $${diff.toFixed(2)} more by taking some risk!`
              : `Safe Flowers earned $${Math.abs(diff).toFixed(2)} more -- but that's rare over 10 years!`}
          </div>
        </div>

        {/* Lesson */}
        <div style={{ background: "#2A1A2A", borderRadius: 12, padding: 16, marginBottom: 18, border: `1px solid #CE93D833` }}>
          <div style={{ color: "#CE93D8", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
            {"\u{1F4A1}"} What You Learned
          </div>
          <div style={{ color: COLORS.dimText, fontSize: 13, lineHeight: 1.6 }}>
            <strong style={{ color: COLORS.white }}>Compound growth</strong> means your earnings make more earnings every year -- like a snowball rolling downhill!
            <br /><br />
            <strong style={{ color: COLORS.white }}>Diversification</strong> means spreading your money across different investments. That way, if one type has a bad year, the others can help balance it out.
            <br /><br />
            <strong style={{ color: COLORS.white }}>Risk vs. reward</strong>: Riskier investments can grow more, but they can also shrink. Safe investments grow slowly but steadily. A mix of both is often the smartest choice!
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          <button onClick={resetGame} style={btnStyle(COLORS.green)}>
            Play Again
          </button>
        </div>
      </div>
    );
  };

  // ============================================
  // MAIN RENDER
  // ============================================

  return (
    <div
      style={{
        background: COLORS.bg,
        minHeight: 480,
        maxWidth: 520,
        margin: "0 auto",
        borderRadius: 20,
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
        overflow: "hidden",
        border: `1px solid ${COLORS.green}33`,
      }}
    >
      <style>{SPARKLE_KEYFRAMES}</style>
      {phase === "intro" && renderIntro()}
      {phase === "planting" && renderPlanting()}
      {phase === "growing" && renderGrowing()}
      {phase === "complete" && renderComplete()}
    </div>
  );
}

// ============================================
// STYLE HELPERS
// ============================================

function btnStyle(bg: string): React.CSSProperties {
  return {
    background: bg,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "10px 24px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    transition: "transform 0.15s, opacity 0.15s",
  };
}

function smallBtnStyle(color: string): React.CSSProperties {
  return {
    background: "transparent",
    color: color,
    border: `1px solid ${color}66`,
    borderRadius: 6,
    padding: "3px 8px",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    minWidth: 32,
  };
}
