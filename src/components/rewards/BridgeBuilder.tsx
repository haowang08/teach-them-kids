import { useState, useEffect, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type BridgeType = "beam" | "arch" | "truss" | "suspension";
type Material = "wood" | "stone" | "steel";
type TestPhase = "idle" | "driving" | "success" | "collapse";

interface Challenge {
  id: number;
  name: string;
  description: string;
  gapWidth: number;          // visual gap (SVG units)
  difficulty: number;        // 1-4
  sceneColor: string;        // cliff colour
  waterColor: string;
  successFact: string;
}

interface BridgeOption {
  type: BridgeType;
  label: string;
  maxSpan: number;           // difficulty threshold
  description: string;
  fact: string;
}

interface MaterialOption {
  id: Material;
  label: string;
  bonus: number;             // added to bridge maxSpan
  description: string;
  color: string;
  stroke: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    name: "Small Stream",
    description: "A gentle stream in the meadow. Any bridge should do!",
    gapWidth: 160,
    difficulty: 1,
    sceneColor: "#5a9a3c",
    waterColor: "#60b5e8",
    successFact:
      "The Clapper Bridge in England is one of the oldest beam bridges, built over 600 years ago from simple stone slabs!",
  },
  {
    id: 2,
    name: "Wide River",
    description: "This river is wider. A simple beam won't be strong enough.",
    gapWidth: 240,
    difficulty: 2,
    sceneColor: "#7a8b4a",
    waterColor: "#4a9fd8",
    successFact:
      "The Pont du Gard in France is a famous Roman arch bridge built almost 2,000 years ago. It also carried water as an aqueduct!",
  },
  {
    id: 3,
    name: "Deep Valley",
    description:
      "A deep valley stretches before you. You'll need an advanced design.",
    gapWidth: 320,
    difficulty: 3,
    sceneColor: "#8b7355",
    waterColor: "#3a8ac0",
    successFact:
      "The Forth Bridge in Scotland is a famous truss/cantilever bridge made of steel. It took 8 years to build and opened in 1890!",
  },
  {
    id: 4,
    name: "Grand Canyon",
    description:
      "The grandest span of all! Only the mightiest bridge design will work.",
    gapWidth: 400,
    difficulty: 4,
    sceneColor: "#c2784e",
    waterColor: "#2e6e9e",
    successFact:
      "The Golden Gate Bridge in San Francisco is one of the most famous suspension bridges in the world, spanning 1,280 metres!",
  },
];

const BRIDGE_OPTIONS: BridgeOption[] = [
  {
    type: "beam",
    label: "Beam Bridge",
    maxSpan: 1,
    description: "A simple flat beam across the gap. Best for short spans.",
    fact: "Beam bridges are the simplest type -- just a horizontal slab supported at each end.",
  },
  {
    type: "arch",
    label: "Arch Bridge",
    maxSpan: 2,
    description:
      "A curved arch that pushes weight outward. Good for medium spans.",
    fact: "Arches convert downward force into outward thrust, making them incredibly strong for their weight.",
  },
  {
    type: "truss",
    label: "Truss Bridge",
    maxSpan: 3,
    description:
      "Triangulated framework distributes load. Handles longer spans.",
    fact: "Trusses use triangles because a triangle is the strongest geometric shape -- it can't be deformed without changing a side length.",
  },
  {
    type: "suspension",
    label: "Suspension Bridge",
    maxSpan: 4,
    description:
      "Cables hang from tall towers. The king of long spans!",
    fact: "Suspension bridges can span over 2 km! The cables are under tremendous tension, holding up the entire road deck.",
  },
];

const MATERIAL_OPTIONS: MaterialOption[] = [
  {
    id: "wood",
    label: "Wood",
    bonus: 0,
    description: "Light but weak",
    color: "#c8a26e",
    stroke: "#9e7a42",
  },
  {
    id: "stone",
    label: "Stone",
    bonus: 0,
    description: "Heavy, strong in compression",
    color: "#a0a0a0",
    stroke: "#707070",
  },
  {
    id: "steel",
    label: "Steel",
    bonus: 1,
    description: "Strong & flexible",
    color: "#8cb4d0",
    stroke: "#5a8aaa",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function canBridgeHold(
  bridgeType: BridgeType,
  material: Material,
  difficulty: number
): boolean {
  const bridge = BRIDGE_OPTIONS.find((b) => b.type === bridgeType)!;
  const mat = MATERIAL_OPTIONS.find((m) => m.id === material)!;
  return bridge.maxSpan + mat.bonus >= difficulty;
}

/* ------------------------------------------------------------------ */
/*  SVG Sub-components                                                 */
/* ------------------------------------------------------------------ */

const SVG_W = 600;
const SVG_H = 340;
const ROAD_Y = 170;

function SceneSVG({
  challenge,
  bridgeType,
  material,
  testPhase,
  truckX,
  collapseAmount,
}: {
  challenge: Challenge;
  bridgeType: BridgeType | null;
  material: Material | null;
  testPhase: TestPhase;
  truckX: number;
  collapseAmount: number;
}) {
  const gap = challenge.gapWidth;
  const leftCliff = SVG_W / 2 - gap / 2;
  const rightCliff = SVG_W / 2 + gap / 2;
  const matOption = material
    ? MATERIAL_OPTIONS.find((m) => m.id === material)!
    : null;
  const fill = matOption?.color ?? "#8cb4d0";
  const stroke = matOption?.stroke ?? "#5a8aaa";

  return (
    <svg
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      className="w-full max-w-[620px] mx-auto rounded-xl border-2 border-slate-200"
      style={{ background: "linear-gradient(180deg, #c9e8fc 0%, #e8f4fd 60%, #c9e8fc 100%)" }}
    >
      {/* Sky gradient */}
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#87ceeb" />
          <stop offset="100%" stopColor="#e0f0ff" />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={SVG_W} height={ROAD_Y} fill="url(#skyGrad)" />

      {/* Water / void */}
      <rect
        x={leftCliff}
        y={ROAD_Y}
        width={gap}
        height={SVG_H - ROAD_Y}
        fill={challenge.waterColor}
        opacity={0.7}
      />
      {/* Water ripple lines */}
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1={leftCliff + 15}
          y1={ROAD_Y + 40 + i * 35}
          x2={rightCliff - 15}
          y2={ROAD_Y + 45 + i * 35}
          stroke="white"
          strokeWidth={1.5}
          opacity={0.4}
        />
      ))}

      {/* Left cliff */}
      <rect
        x={0}
        y={ROAD_Y}
        width={leftCliff}
        height={SVG_H - ROAD_Y}
        fill={challenge.sceneColor}
      />
      <rect
        x={0}
        y={ROAD_Y}
        width={leftCliff}
        height={8}
        fill="#3d6b2e"
        rx={2}
      />

      {/* Right cliff */}
      <rect
        x={rightCliff}
        y={ROAD_Y}
        width={SVG_W - rightCliff}
        height={SVG_H - ROAD_Y}
        fill={challenge.sceneColor}
      />
      <rect
        x={rightCliff}
        y={ROAD_Y}
        width={SVG_W - rightCliff}
        height={8}
        fill="#3d6b2e"
        rx={2}
      />

      {/* Bridge (only if selected) */}
      {bridgeType && material && (
        <g
          transform={`translate(0, ${collapseAmount})`}
          style={{ transition: "transform 0.3s ease-in" }}
        >
          <BridgeDrawing
            bridgeType={bridgeType}
            leftX={leftCliff}
            rightX={rightCliff}
            roadY={ROAD_Y}
            fill={fill}
            stroke={stroke}
          />
        </g>
      )}

      {/* Truck */}
      {(testPhase === "driving" || testPhase === "success") && (
        <g transform={`translate(${truckX}, ${ROAD_Y - 30 + (testPhase === "driving" ? collapseAmount * 0.5 : 0)})`}>
          {/* Truck body */}
          <rect x={0} y={8} width={36} height={18} rx={3} fill="#f0c040" stroke="#c0960a" strokeWidth={1.5} />
          {/* Cab */}
          <rect x={26} y={2} width={14} height={24} rx={3} fill="#e8a820" stroke="#c0960a" strokeWidth={1.5} />
          {/* Windshield */}
          <rect x={30} y={5} width={8} height={8} rx={1} fill="#a0d8f0" />
          {/* Wheels */}
          <circle cx={8} cy={28} r={5} fill="#333" />
          <circle cx={8} cy={28} r={2} fill="#888" />
          <circle cx={30} cy={28} r={5} fill="#333" />
          <circle cx={30} cy={28} r={2} fill="#888" />
        </g>
      )}

      {/* Celebration sparkles on success */}
      {testPhase === "success" && (
        <>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle
              key={i}
              cx={SVG_W / 2 + Math.cos(i * 1.05) * (60 + i * 15)}
              cy={80 + Math.sin(i * 1.7) * 30}
              r={4 + (i % 3)}
              fill={["#FFD700", "#FF6B6B", "#4ECDC4", "#FFD700", "#9B59B6", "#FF6B6B"][i]}
              opacity={0.9}
            >
              <animate
                attributeName="cy"
                values={`${80 + Math.sin(i * 1.7) * 30};${50 + Math.sin(i * 1.7) * 30};${80 + Math.sin(i * 1.7) * 30}`}
                dur={`${0.8 + i * 0.15}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.9;0.3;0.9"
                dur={`${0.8 + i * 0.15}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
          <text
            x={SVG_W / 2}
            y={50}
            textAnchor="middle"
            fontSize={22}
            fontWeight="bold"
            fill="#2d7d46"
            stroke="white"
            strokeWidth={3}
            paintOrder="stroke"
          >
            Bridge Holds!
          </text>
        </>
      )}

      {/* Collapse text */}
      {testPhase === "collapse" && (
        <text
          x={SVG_W / 2}
          y={60}
          textAnchor="middle"
          fontSize={20}
          fontWeight="bold"
          fill="#c0392b"
          stroke="white"
          strokeWidth={3}
          paintOrder="stroke"
        >
          Bridge Collapsed!
        </text>
      )}
    </svg>
  );
}

function BridgeDrawing({
  bridgeType,
  leftX,
  rightX,
  roadY,
  fill,
  stroke,
}: {
  bridgeType: BridgeType;
  leftX: number;
  rightX: number;
  roadY: number;
  fill: string;
  stroke: string;
}) {
  const midX = (leftX + rightX) / 2;
  const span = rightX - leftX;

  switch (bridgeType) {
    case "beam":
      return (
        <g>
          {/* Simple flat beam */}
          <rect
            x={leftX}
            y={roadY - 8}
            width={span}
            height={10}
            fill={fill}
            stroke={stroke}
            strokeWidth={2}
            rx={1}
          />
          {/* Support pillars at edges */}
          <rect x={leftX} y={roadY} width={8} height={20} fill={stroke} />
          <rect x={rightX - 8} y={roadY} width={8} height={20} fill={stroke} />
        </g>
      );

    case "arch": {
      const archDepth = span * 0.25;
      return (
        <g>
          {/* Arch curve */}
          <path
            d={`M ${leftX},${roadY} Q ${midX},${roadY - archDepth} ${rightX},${roadY}`}
            fill="none"
            stroke={stroke}
            strokeWidth={6}
          />
          {/* Road deck */}
          <rect
            x={leftX}
            y={roadY - 8}
            width={span}
            height={8}
            fill={fill}
            stroke={stroke}
            strokeWidth={1.5}
          />
          {/* Spandrel columns */}
          {[0.2, 0.35, 0.5, 0.65, 0.8].map((t, i) => {
            const x = leftX + span * t;
            const archY =
              roadY -
              archDepth * 4 * t * (1 - t);
            return (
              <line
                key={i}
                x1={x}
                y1={roadY - 8}
                x2={x}
                y2={archY}
                stroke={stroke}
                strokeWidth={2}
              />
            );
          })}
          {/* Abutments */}
          <rect x={leftX - 4} y={roadY - 2} width={12} height={22} fill={stroke} rx={1} />
          <rect x={rightX - 8} y={roadY - 2} width={12} height={22} fill={stroke} rx={1} />
        </g>
      );
    }

    case "truss": {
      const trussH = 30;
      const segments = 6;
      const segW = span / segments;
      return (
        <g>
          {/* Top chord */}
          <line
            x1={leftX}
            y1={roadY - trussH}
            x2={rightX}
            y2={roadY - trussH}
            stroke={stroke}
            strokeWidth={3}
          />
          {/* Bottom chord / road */}
          <rect
            x={leftX}
            y={roadY - 6}
            width={span}
            height={6}
            fill={fill}
            stroke={stroke}
            strokeWidth={1.5}
          />
          {/* Verticals and diagonals */}
          {Array.from({ length: segments + 1 }).map((_, i) => {
            const x = leftX + segW * i;
            return (
              <g key={i}>
                {/* vertical */}
                <line
                  x1={x}
                  y1={roadY - 6}
                  x2={x}
                  y2={roadY - trussH}
                  stroke={stroke}
                  strokeWidth={2}
                />
                {/* diagonal */}
                {i < segments && (
                  <line
                    x1={x}
                    y1={i % 2 === 0 ? roadY - 6 : roadY - trussH}
                    x2={x + segW}
                    y2={i % 2 === 0 ? roadY - trussH : roadY - 6}
                    stroke={stroke}
                    strokeWidth={2}
                  />
                )}
              </g>
            );
          })}
          {/* End supports */}
          <rect x={leftX - 3} y={roadY - 2} width={10} height={22} fill={stroke} rx={1} />
          <rect x={rightX - 7} y={roadY - 2} width={10} height={22} fill={stroke} rx={1} />
        </g>
      );
    }

    case "suspension": {
      const towerH = 70;
      const towerW = 8;
      const towerLeft = leftX + span * 0.15;
      const towerRight = rightX - span * 0.15;
      const cableCount = 10;
      return (
        <g>
          {/* Road deck */}
          <rect
            x={leftX}
            y={roadY - 6}
            width={span}
            height={6}
            fill={fill}
            stroke={stroke}
            strokeWidth={1.5}
          />
          {/* Left tower */}
          <rect
            x={towerLeft - towerW / 2}
            y={roadY - towerH}
            width={towerW}
            height={towerH + 20}
            fill={stroke}
            rx={1}
          />
          {/* Right tower */}
          <rect
            x={towerRight - towerW / 2}
            y={roadY - towerH}
            width={towerW}
            height={towerH + 20}
            fill={stroke}
            rx={1}
          />
          {/* Main cable (catenary-ish) */}
          <path
            d={`M ${leftX},${roadY - 10}
                Q ${(leftX + towerLeft) / 2},${roadY - towerH + 15} ${towerLeft},${roadY - towerH + 5}
                Q ${midX},${roadY - 15} ${towerRight},${roadY - towerH + 5}
                Q ${(rightX + towerRight) / 2},${roadY - towerH + 15} ${rightX},${roadY - 10}`}
            fill="none"
            stroke={stroke}
            strokeWidth={3}
          />
          {/* Vertical suspender cables */}
          {Array.from({ length: cableCount }).map((_, i) => {
            const t = (i + 1) / (cableCount + 1);
            const x = leftX + span * t;
            // parabolic approximation for cable y
            const cableY =
              roadY -
              towerH +
              5 +
              (towerH - 15) * Math.pow(2 * t - 1, 2);
            return (
              <line
                key={i}
                x1={x}
                y1={Math.min(cableY, roadY - 8)}
                x2={x}
                y2={roadY - 6}
                stroke={stroke}
                strokeWidth={1}
                opacity={0.7}
              />
            );
          })}
          {/* Anchorages */}
          <rect x={leftX - 4} y={roadY - 2} width={14} height={22} fill={stroke} rx={2} />
          <rect x={rightX - 10} y={roadY - 2} width={14} height={22} fill={stroke} rx={2} />
        </g>
      );
    }
  }
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function BridgeBuilder() {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [selectedBridge, setSelectedBridge] = useState<BridgeType | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [testPhase, setTestPhase] = useState<TestPhase>("idle");
  const [truckX, setTruckX] = useState(0);
  const [collapseAmount, setCollapseAmount] = useState(0);
  const [completed, setCompleted] = useState<boolean[]>([false, false, false, false]);
  const [showFact, setShowFact] = useState(false);
  const allDone = completed.every(Boolean);
  const challenge = CHALLENGES[challengeIdx];

  const gap = challenge.gapWidth;
  const leftCliff = SVG_W / 2 - gap / 2;
  const rightCliff = SVG_W / 2 + gap / 2;

  const resetTest = useCallback(() => {
    setTestPhase("idle");
    setTruckX(0);
    setCollapseAmount(0);
    setShowFact(false);
  }, []);

  // Animation loop
  useEffect(() => {
    if (testPhase !== "driving") return;

    const success = canBridgeHold(selectedBridge!, selectedMaterial!, challenge.difficulty);
    const collapsePoint = leftCliff + gap * 0.45; // collapse near middle
    let frame: number;
    let x = leftCliff - 50;
    let collapse = 0;

    const tick = () => {
      x += 2.5;
      setTruckX(x);

      if (!success && x > collapsePoint) {
        collapse += 4;
        setCollapseAmount(collapse);
        if (collapse >= 120) {
          setTestPhase("collapse");
          return;
        }
      }

      if (success && x > rightCliff + 20) {
        setTestPhase("success");
        setShowFact(true);
        setCompleted((prev) => {
          const next = [...prev];
          next[challengeIdx] = true;
          return next;
        });
        return;
      }

      if (!success && collapse >= 120) return;

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [testPhase, selectedBridge, selectedMaterial, challenge.difficulty, challengeIdx, leftCliff, rightCliff, gap]);

  const handleTest = () => {
    if (!selectedBridge || !selectedMaterial) return;
    setCollapseAmount(0);
    setTruckX(leftCliff - 50);
    setShowFact(false);
    setTestPhase("driving");
  };

  const handleNextChallenge = () => {
    const nextIdx = completed.findIndex((c, i) => !c && i !== challengeIdx);
    if (nextIdx !== -1) {
      setChallengeIdx(nextIdx);
    } else if (allDone) {
      // stay on completion screen
    }
    setSelectedBridge(null);
    setSelectedMaterial(null);
    resetTest();
  };

  const handleSelectChallenge = (idx: number) => {
    setChallengeIdx(idx);
    setSelectedBridge(null);
    setSelectedMaterial(null);
    resetTest();
  };

  /* ---- Completion Screen ---- */
  if (allDone && testPhase !== "success") {
    return (
      <div className="rounded-xl bg-gradient-to-br from-sky-50 to-amber-50 p-6 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-sky-800 mb-2">
          Master Bridge Builder!
        </h2>
        <p className="text-lg text-sky-700 mb-4">
          You completed all 4 bridge challenges! You've learned about beam,
          arch, truss, and suspension bridges.
        </p>
        <div className="flex justify-center gap-3 mb-5">
          {CHALLENGES.map((c) => (
            <div
              key={c.id}
              className="bg-green-100 border-2 border-green-400 rounded-lg px-3 py-2 text-sm font-semibold text-green-700"
            >
              {c.name}
            </div>
          ))}
        </div>
        <p className="text-base text-gray-600 mb-5">
          Every great bridge starts with understanding the problem -- the span,
          the load, and the materials. Now you think like a real structural
          engineer!
        </p>
        <button
          onClick={() => {
            setCompleted([false, false, false, false]);
            setChallengeIdx(0);
            setSelectedBridge(null);
            setSelectedMaterial(null);
            resetTest();
          }}
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg px-6 py-3 text-base transition-colors cursor-pointer"
        >
          Play Again
        </button>
      </div>
    );
  }

  /* ---- Main Game UI ---- */
  const bridgeInfo = selectedBridge
    ? BRIDGE_OPTIONS.find((b) => b.type === selectedBridge)!
    : null;

  return (
    <div className="rounded-xl bg-gradient-to-br from-sky-50 to-slate-100 p-4 sm:p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h2 className="text-xl font-bold text-sky-800">Bridge Builder</h2>
        <span className="text-sm font-semibold text-slate-500 bg-white rounded-full px-3 py-1 border border-slate-200">
          Challenge {challengeIdx + 1} / 4
        </span>
      </div>

      {/* Challenge selector pills */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {CHALLENGES.map((c, i) => (
          <button
            key={c.id}
            onClick={() => handleSelectChallenge(i)}
            disabled={testPhase === "driving"}
            className={`text-xs font-semibold rounded-full px-3 py-1 border-2 transition-colors cursor-pointer
              ${
                i === challengeIdx
                  ? "bg-sky-600 text-white border-sky-600"
                  : completed[i]
                  ? "bg-green-100 text-green-700 border-green-400 hover:bg-green-200"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
              }
              ${testPhase === "driving" ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {completed[i] ? "\u2713 " : ""}
            {c.name}
          </button>
        ))}
      </div>

      {/* Challenge description */}
      <p className="text-sm text-slate-600 mb-3">{challenge.description}</p>

      {/* SVG Scene */}
      <SceneSVG
        challenge={challenge}
        bridgeType={selectedBridge}
        material={selectedMaterial}
        testPhase={testPhase}
        truckX={truckX}
        collapseAmount={collapseAmount}
      />

      {/* Controls area */}
      <div className="mt-4 space-y-4">
        {/* Bridge type selection */}
        <div>
          <h3 className="text-sm font-bold text-slate-700 mb-2">
            1. Choose Bridge Type
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {BRIDGE_OPTIONS.map((opt) => (
              <button
                key={opt.type}
                onClick={() => {
                  setSelectedBridge(opt.type);
                  resetTest();
                }}
                disabled={testPhase === "driving"}
                className={`rounded-lg border-2 p-2 text-left transition-all cursor-pointer
                  ${
                    selectedBridge === opt.type
                      ? "border-sky-500 bg-sky-50 shadow-md"
                      : "border-slate-200 bg-white hover:border-slate-400"
                  }
                  ${testPhase === "driving" ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                <div className="text-xs font-bold text-slate-800">
                  {opt.label}
                </div>
                <div className="text-[10px] text-slate-500 leading-tight mt-0.5">
                  {opt.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Material selection */}
        <div>
          <h3 className="text-sm font-bold text-slate-700 mb-2">
            2. Choose Material
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {MATERIAL_OPTIONS.map((mat) => (
              <button
                key={mat.id}
                onClick={() => {
                  setSelectedMaterial(mat.id);
                  resetTest();
                }}
                disabled={testPhase === "driving"}
                className={`rounded-lg border-2 p-2 text-center transition-all cursor-pointer
                  ${
                    selectedMaterial === mat.id
                      ? "border-sky-500 bg-sky-50 shadow-md"
                      : "border-slate-200 bg-white hover:border-slate-400"
                  }
                  ${testPhase === "driving" ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                <div
                  className="w-6 h-6 rounded-full mx-auto mb-1 border-2"
                  style={{ backgroundColor: mat.color, borderColor: mat.stroke }}
                />
                <div className="text-xs font-bold text-slate-800">
                  {mat.label}
                </div>
                <div className="text-[10px] text-slate-500">{mat.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Engineering fact about selected bridge */}
        {bridgeInfo && testPhase === "idle" && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
            <span className="font-bold">Engineering Fact:</span>{" "}
            {bridgeInfo.fact}
          </div>
        )}

        {/* Test button */}
        <div className="flex gap-3 items-center flex-wrap">
          {testPhase === "idle" && (
            <button
              onClick={handleTest}
              disabled={!selectedBridge || !selectedMaterial}
              className={`font-bold rounded-lg px-5 py-2.5 text-sm transition-colors cursor-pointer
                ${
                  selectedBridge && selectedMaterial
                    ? "bg-amber-400 hover:bg-amber-500 text-amber-900 shadow"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }
              `}
            >
              Test Bridge
            </button>
          )}

          {testPhase === "driving" && (
            <span className="text-sm text-slate-500 font-semibold animate-pulse">
              Testing...
            </span>
          )}

          {testPhase === "collapse" && (
            <>
              <p className="text-sm font-bold text-red-600">
                The bridge couldn't handle the span! Try a different design.
              </p>
              <button
                onClick={resetTest}
                className="bg-slate-600 hover:bg-slate-700 text-white font-bold rounded-lg px-4 py-2 text-sm transition-colors cursor-pointer"
              >
                Try Again
              </button>
            </>
          )}

          {testPhase === "success" && (
            <>
              {!allDone && !completed.every(Boolean) ? (
                <button
                  onClick={handleNextChallenge}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg px-5 py-2.5 text-sm transition-colors cursor-pointer"
                >
                  Next Challenge
                </button>
              ) : (
                <button
                  onClick={() => setTestPhase("idle")}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg px-5 py-2.5 text-sm transition-colors cursor-pointer"
                >
                  View Results
                </button>
              )}
            </>
          )}
        </div>

        {/* Success fact about real bridge */}
        {showFact && testPhase === "success" && (
          <div className="bg-green-50 border border-green-300 rounded-lg p-3 text-xs text-green-800">
            <span className="font-bold">Famous Bridge Fact:</span>{" "}
            {challenge.successFact}
          </div>
        )}
      </div>
    </div>
  );
}
