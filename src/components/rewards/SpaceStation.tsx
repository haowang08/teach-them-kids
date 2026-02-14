import { useState, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ShapeType = "cube" | "cylinder" | "sphere";

interface Module {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  // Dimensions vary by type
  // Cube: size (side length)
  // Cylinder: radius, height
  // Sphere: radius
  size: number;
  radius?: number;
  height?: number;
  color: string;
}

interface Mission {
  id: number;
  name: string;
  description: string;
  targetVolume: number;
  minModules: number;
  requiredTypes?: ShapeType[];
  reward: string;
  fact: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const SHAPE_OPTIONS: { type: ShapeType; label: string; icon: string; description: string }[] = [
  {
    type: "cube",
    label: "Cube Module",
    icon: "[ ]",
    description: "V = s x s x s",
  },
  {
    type: "cylinder",
    label: "Cylinder Module",
    icon: "( )",
    description: "V = pi x r x r x h",
  },
  {
    type: "sphere",
    label: "Sphere Module",
    icon: "O",
    description: "V = (4/3) x pi x r x r x r",
  },
];

const COLORS = [
  "#60A5FA", // blue
  "#34D399", // green
  "#F472B6", // pink
  "#FBBF24", // yellow
  "#A78BFA", // purple
  "#FB923C", // orange
];

const MISSIONS: Mission[] = [
  {
    id: 1,
    name: "Observation Outpost",
    description: "Build a small station with at least 50 cubic units of volume.",
    targetVolume: 50,
    minModules: 1,
    reward: "Space Pioneer Badge",
    fact: "The International Space Station has a pressurized volume of about 916 cubic meters - that's like a 5-bedroom house floating in space!",
  },
  {
    id: 2,
    name: "Research Station",
    description: "Create a research station with 150+ cubic units. Use at least 2 different shapes!",
    targetVolume: 150,
    minModules: 2,
    reward: "Science Commander Badge",
    fact: "NASA's planned Lunar Gateway station will have about 125 cubic meters of habitable volume - much smaller than the ISS because it needs to travel to the Moon!",
  },
  {
    id: 3,
    name: "Colony Hub",
    description: "Design a colony hub with 300+ cubic units using all three shape types.",
    targetVolume: 300,
    minModules: 3,
    requiredTypes: ["cube", "cylinder", "sphere"],
    reward: "Master Architect Badge",
    fact: "SpaceX's Starship could one day carry modules to Mars. Engineers must carefully calculate volumes to fit life support, supplies, and living space!",
  },
  {
    id: 4,
    name: "Mega Station",
    description: "Build an enormous station with 500+ cubic units of volume!",
    targetVolume: 500,
    minModules: 4,
    reward: "Galaxy Builder Badge",
    fact: "Future space habitats might use inflatable modules! Bigelow Aerospace's B330 module expands to 330 cubic meters - volume efficiency is key in space!",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function calculateVolume(module: Module): number {
  switch (module.type) {
    case "cube":
      return module.size * module.size * module.size;
    case "cylinder":
      return Math.PI * (module.radius ?? 3) * (module.radius ?? 3) * (module.height ?? 5);
    case "sphere":
      return (4 / 3) * Math.PI * Math.pow(module.radius ?? 3, 3);
    default:
      return 0;
  }
}

function formatVolume(volume: number): string {
  return volume.toFixed(1);
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function getShapeTypes(modules: Module[]): Set<ShapeType> {
  return new Set(modules.map((m) => m.type));
}

/* ------------------------------------------------------------------ */
/*  SVG Components for 3D-ish Shapes                                   */
/* ------------------------------------------------------------------ */

function IsometricCube({
  x,
  y,
  size,
  color,
  selected,
  onClick,
}: {
  x: number;
  y: number;
  size: number;
  color: string;
  selected: boolean;
  onClick: () => void;
}) {
  const scale = size / 5;
  const w = 30 * scale;
  const h = 17.32 * scale;

  // Isometric cube vertices
  const top = { x: x, y: y - h };
  const left = { x: x - w / 2, y: y - h / 2 };
  const right = { x: x + w / 2, y: y - h / 2 };
  const bottom = { x: x, y: y };
  const backLeft = { x: x - w / 2, y: y - h * 1.5 };
  const backRight = { x: x + w / 2, y: y - h * 1.5 };
  const topBack = { x: x, y: y - h * 2 };

  // Lighten/darken color for faces
  const topColor = color;
  const leftColor = adjustBrightness(color, -30);
  const rightColor = adjustBrightness(color, -60);

  return (
    <g
      onClick={onClick}
      style={{ cursor: "pointer" }}
      className={selected ? "animate-pulse" : ""}
    >
      {/* Left face */}
      <polygon
        points={`${left.x},${left.y} ${bottom.x},${bottom.y} ${top.x},${top.y} ${backLeft.x},${backLeft.y}`}
        fill={leftColor}
        stroke={selected ? "#fff" : "#00000030"}
        strokeWidth={selected ? 2 : 1}
      />
      {/* Right face */}
      <polygon
        points={`${right.x},${right.y} ${bottom.x},${bottom.y} ${top.x},${top.y} ${backRight.x},${backRight.y}`}
        fill={rightColor}
        stroke={selected ? "#fff" : "#00000030"}
        strokeWidth={selected ? 2 : 1}
      />
      {/* Top face */}
      <polygon
        points={`${backLeft.x},${backLeft.y} ${topBack.x},${topBack.y} ${backRight.x},${backRight.y} ${top.x},${top.y}`}
        fill={topColor}
        stroke={selected ? "#fff" : "#00000030"}
        strokeWidth={selected ? 2 : 1}
      />
      {/* Glow effect when selected */}
      {selected && (
        <circle cx={x} cy={y - h} r={w * 0.8} fill="none" stroke="#fff" strokeWidth={2} opacity={0.5} />
      )}
    </g>
  );
}

function IsometricCylinder({
  x,
  y,
  radius,
  height,
  color,
  selected,
  onClick,
}: {
  x: number;
  y: number;
  radius: number;
  height: number;
  color: string;
  selected: boolean;
  onClick: () => void;
}) {
  const rx = radius * 5;
  const ry = radius * 2.5;
  const h = height * 5;

  const bodyColor = adjustBrightness(color, -30);
  const topColor = color;

  return (
    <g
      onClick={onClick}
      style={{ cursor: "pointer" }}
      className={selected ? "animate-pulse" : ""}
    >
      {/* Body (rectangle with gradient effect) */}
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={bodyColor} />
      <rect
        x={x - rx}
        y={y - h}
        width={rx * 2}
        height={h}
        fill={bodyColor}
        stroke={selected ? "#fff" : "none"}
        strokeWidth={selected ? 2 : 0}
      />
      {/* Side shading */}
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={adjustBrightness(color, -50)} />
      <rect
        x={x - rx}
        y={y - h}
        width={rx * 2}
        height={h}
        fill="url(#cylinderGradient)"
      />
      {/* Top ellipse */}
      <ellipse
        cx={x}
        cy={y - h}
        rx={rx}
        ry={ry}
        fill={topColor}
        stroke={selected ? "#fff" : "#00000030"}
        strokeWidth={selected ? 2 : 1}
      />
      {selected && (
        <circle cx={x} cy={y - h / 2} r={rx + 5} fill="none" stroke="#fff" strokeWidth={2} opacity={0.5} />
      )}
    </g>
  );
}

function IsometricSphere({
  x,
  y,
  radius,
  color,
  selected,
  onClick,
}: {
  x: number;
  y: number;
  radius: number;
  color: string;
  selected: boolean;
  onClick: () => void;
}) {
  const r = radius * 6;

  return (
    <g
      onClick={onClick}
      style={{ cursor: "pointer" }}
      className={selected ? "animate-pulse" : ""}
    >
      {/* Main sphere */}
      <circle
        cx={x}
        cy={y - r}
        r={r}
        fill={`url(#sphereGradient-${color.replace("#", "")})`}
        stroke={selected ? "#fff" : "#00000020"}
        strokeWidth={selected ? 2 : 1}
      />
      {/* Highlight */}
      <circle
        cx={x - r * 0.3}
        cy={y - r - r * 0.3}
        r={r * 0.2}
        fill="rgba(255,255,255,0.6)"
      />
      {selected && (
        <circle cx={x} cy={y - r} r={r + 5} fill="none" stroke="#fff" strokeWidth={2} opacity={0.5} />
      )}
    </g>
  );
}

function adjustBrightness(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function SpaceStation() {
  const [missionIdx, setMissionIdx] = useState(0);
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [completedMissions, setCompletedMissions] = useState<boolean[]>([false, false, false, false]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [score, setScore] = useState(0);

  // Edit state for selected module
  const [editSize, setEditSize] = useState(5);
  const [editRadius, setEditRadius] = useState(3);
  const [editHeight, setEditHeight] = useState(5);

  const mission = MISSIONS[missionIdx];
  const allDone = completedMissions.every(Boolean);

  // Calculate total volume using functional approach
  const totalVolume = modules.reduce((sum, mod) => sum + calculateVolume(mod), 0);

  // Check mission requirements
  const checkMissionComplete = useCallback((currentModules: Module[], currentMission: Mission): boolean => {
    const total = currentModules.reduce((sum, mod) => sum + calculateVolume(mod), 0);
    if (total < currentMission.targetVolume) return false;
    if (currentModules.length < currentMission.minModules) return false;
    if (currentMission.requiredTypes) {
      const types = getShapeTypes(currentModules);
      for (const reqType of currentMission.requiredTypes) {
        if (!types.has(reqType)) return false;
      }
    }
    return true;
  }, []);

  const isMissionComplete = checkMissionComplete(modules, mission);

  // Add module
  const addModule = useCallback((type: ShapeType) => {
    const newModule: Module = {
      id: generateId(),
      type,
      x: 200 + Math.random() * 200,
      y: 200 + Math.random() * 100,
      size: 5,
      radius: 3,
      height: 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };

    setModules((prev) => [...prev, newModule]);
    setSelectedModuleId(newModule.id);
    setEditSize(newModule.size);
    setEditRadius(newModule.radius ?? 3);
    setEditHeight(newModule.height ?? 5);
  }, []);

  // Remove module
  const removeModule = useCallback((id: string) => {
    setModules((prev) => prev.filter((m) => m.id !== id));
    setSelectedModuleId((prevSelected) => (prevSelected === id ? null : prevSelected));
  }, []);

  // Update module dimensions
  const updateModule = useCallback((id: string, updates: Partial<Module>) => {
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  }, []);

  // Select module
  const selectModule = useCallback((id: string | null) => {
    setSelectedModuleId(id);
    if (id) {
      const mod = modules.find((m) => m.id === id);
      if (mod) {
        setEditSize(mod.size);
        setEditRadius(mod.radius ?? 3);
        setEditHeight(mod.height ?? 5);
      }
    }
  }, [modules]);

  // Complete mission
  const completeMission = useCallback(() => {
    if (!isMissionComplete) return;

    setCompletedMissions((prev) => {
      const next = [...prev];
      next[missionIdx] = true;
      return next;
    });

    setScore((prev) => prev + mission.targetVolume + modules.length * 10);
    setShowSuccess(true);
  }, [isMissionComplete, missionIdx, mission.targetVolume, modules.length]);

  // Next mission
  const nextMission = useCallback(() => {
    setShowSuccess(false);
    const nextIdx = completedMissions.findIndex((c, i) => !c && i !== missionIdx);
    if (nextIdx !== -1) {
      setMissionIdx(nextIdx);
    } else if (completedMissions.filter(Boolean).length === MISSIONS.length - 1) {
      // Last mission just completed
      setMissionIdx(missionIdx);
    }
    setModules([]);
    setSelectedModuleId(null);
  }, [completedMissions, missionIdx]);

  // Reset game
  const resetGame = useCallback(() => {
    setMissionIdx(0);
    setModules([]);
    setSelectedModuleId(null);
    setCompletedMissions([false, false, false, false]);
    setShowSuccess(false);
    setScore(0);
  }, []);

  // Handle dimension changes
  const handleSizeChange = useCallback((value: number) => {
    setEditSize(value);
    if (selectedModuleId) {
      updateModule(selectedModuleId, { size: value });
    }
  }, [selectedModuleId, updateModule]);

  const handleRadiusChange = useCallback((value: number) => {
    setEditRadius(value);
    if (selectedModuleId) {
      updateModule(selectedModuleId, { radius: value });
    }
  }, [selectedModuleId, updateModule]);

  const handleHeightChange = useCallback((value: number) => {
    setEditHeight(value);
    if (selectedModuleId) {
      updateModule(selectedModuleId, { height: value });
    }
  }, [selectedModuleId, updateModule]);

  const selectedModule = modules.find((m) => m.id === selectedModuleId);

  /* ---- All Missions Complete Screen ---- */
  if (allDone && !showSuccess) {
    return (
      <div className="rounded-xl bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 p-6 max-w-2xl mx-auto text-center">
        <div className="text-6xl mb-4">*** *** ***</div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Master Space Architect!
        </h2>
        <p className="text-lg text-purple-200 mb-4">
          You completed all 4 missions! You've mastered calculating volumes of 3D shapes.
        </p>
        <div className="flex justify-center gap-3 mb-5 flex-wrap">
          {MISSIONS.map((m) => (
            <div
              key={m.id}
              className="bg-green-900/50 border-2 border-green-400 rounded-lg px-3 py-2 text-sm font-semibold text-green-300"
            >
              {m.reward}
            </div>
          ))}
        </div>
        <p className="text-base text-slate-300 mb-2">
          Final Score: <span className="text-yellow-400 font-bold">{score}</span> points
        </p>
        <p className="text-sm text-slate-400 mb-5">
          You now know how to calculate the volume of cubes (s^3), cylinders (pi*r^2*h), and spheres (4/3*pi*r^3)!
        </p>
        <button
          onClick={resetGame}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg px-6 py-3 text-base transition-colors cursor-pointer"
        >
          Play Again
        </button>
      </div>
    );
  }

  /* ---- Main Game UI ---- */
  return (
    <div className="rounded-xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4 sm:p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">*</span> Space Station Builder
          </h2>
          <p className="text-xs text-slate-400">Geometry: Volume</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-yellow-400 bg-yellow-900/30 rounded-full px-3 py-1 border border-yellow-600">
            Score: {score}
          </span>
          <span className="text-sm font-semibold text-slate-400 bg-slate-800 rounded-full px-3 py-1 border border-slate-700">
            Mission {missionIdx + 1} / {MISSIONS.length}
          </span>
        </div>
      </div>

      {/* Mission selector pills */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {MISSIONS.map((m, i) => (
          <button
            key={m.id}
            onClick={() => {
              if (!showSuccess) {
                setMissionIdx(i);
                setModules([]);
                setSelectedModuleId(null);
              }
            }}
            disabled={showSuccess}
            className={`text-xs font-semibold rounded-full px-3 py-1 border-2 transition-colors cursor-pointer
              ${
                i === missionIdx
                  ? "bg-purple-600 text-white border-purple-500"
                  : completedMissions[i]
                  ? "bg-green-900/50 text-green-300 border-green-600 hover:bg-green-900"
                  : "bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500"
              }
              ${showSuccess ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {completedMissions[i] ? "* " : ""}
            {m.name}
          </button>
        ))}
      </div>

      {/* Mission description */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 mb-4">
        <h3 className="font-bold text-purple-300 text-sm mb-1">{mission.name}</h3>
        <p className="text-sm text-slate-300 mb-2">{mission.description}</p>
        <div className="flex flex-wrap gap-3 text-xs">
          <span className="text-slate-400">
            Target: <span className="text-cyan-400 font-mono">{mission.targetVolume} units^3</span>
          </span>
          <span className="text-slate-400">
            Current: <span className={`font-mono ${totalVolume >= mission.targetVolume ? "text-green-400" : "text-yellow-400"}`}>
              {formatVolume(totalVolume)} units^3
            </span>
          </span>
          {mission.requiredTypes && (
            <span className="text-slate-400">
              Required shapes: {mission.requiredTypes.join(", ")}
            </span>
          )}
        </div>
      </div>

      {/* Building Area */}
      <div className="bg-slate-950 rounded-xl border-2 border-slate-700 mb-4 relative overflow-hidden">
        {/* SVG Building Canvas */}
        <svg
          viewBox="0 0 600 350"
          className="w-full"
          style={{ background: "radial-gradient(ellipse at center, #1e1b4b 0%, #0f0a1e 100%)" }}
        >
          {/* Defs for gradients */}
          <defs>
            <linearGradient id="cylinderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="30%" stopColor="rgba(255,255,255,0)" />
              <stop offset="70%" stopColor="rgba(0,0,0,0.2)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
            </linearGradient>
            {COLORS.map((color) => (
              <radialGradient
                key={color}
                id={`sphereGradient-${color.replace("#", "")}`}
                cx="35%"
                cy="35%"
                r="60%"
              >
                <stop offset="0%" stopColor={adjustBrightness(color, 60)} />
                <stop offset="50%" stopColor={color} />
                <stop offset="100%" stopColor={adjustBrightness(color, -60)} />
              </radialGradient>
            ))}
          </defs>

          {/* Stars background - using deterministic positions based on index */}
          {Array.from({ length: 50 }).map((_, i) => {
            // Use deterministic pseudo-random values based on index
            const seed1 = ((i * 127 + 37) % 100) / 100;
            const seed2 = ((i * 73 + 89) % 100) / 100;
            const seed3 = ((i * 41 + 53) % 100) / 100;
            const seed4 = ((i * 97 + 23) % 100) / 100;
            return (
              <circle
                key={i}
                cx={seed1 * 600}
                cy={seed2 * 350}
                r={seed3 * 1.5 + 0.5}
                fill="white"
                opacity={seed4 * 0.5 + 0.3}
              />
            );
          })}

          {/* Grid lines */}
          <g opacity={0.1}>
            {Array.from({ length: 13 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={i * 50}
                y1={0}
                x2={i * 50}
                y2={350}
                stroke="white"
                strokeWidth={0.5}
              />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1={0}
                y1={i * 50}
                x2={600}
                y2={i * 50}
                stroke="white"
                strokeWidth={0.5}
              />
            ))}
          </g>

          {/* Render modules */}
          {modules.map((mod) => {
            const isSelected = mod.id === selectedModuleId;
            switch (mod.type) {
              case "cube":
                return (
                  <IsometricCube
                    key={mod.id}
                    x={mod.x}
                    y={mod.y}
                    size={mod.size}
                    color={mod.color}
                    selected={isSelected}
                    onClick={() => selectModule(mod.id)}
                  />
                );
              case "cylinder":
                return (
                  <IsometricCylinder
                    key={mod.id}
                    x={mod.x}
                    y={mod.y}
                    radius={mod.radius ?? 3}
                    height={mod.height ?? 5}
                    color={mod.color}
                    selected={isSelected}
                    onClick={() => selectModule(mod.id)}
                  />
                );
              case "sphere":
                return (
                  <IsometricSphere
                    key={mod.id}
                    x={mod.x}
                    y={mod.y}
                    radius={mod.radius ?? 3}
                    color={mod.color}
                    selected={isSelected}
                    onClick={() => selectModule(mod.id)}
                  />
                );
              default:
                return null;
            }
          })}

          {/* Empty state */}
          {modules.length === 0 && (
            <text x="300" y="175" textAnchor="middle" fill="#64748b" fontSize="14">
              Add modules to start building your station!
            </text>
          )}
        </svg>

        {/* Success overlay */}
        {showSuccess && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-xl">
            <div className="text-5xl mb-3">***</div>
            <h3 className="text-2xl font-bold text-green-400 mb-2">Mission Complete!</h3>
            <p className="text-lg text-white mb-2">You earned: {mission.reward}</p>
            <p className="text-sm text-slate-300 mb-4 max-w-md text-center px-4">
              {mission.fact}
            </p>
            <button
              onClick={nextMission}
              className="bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg px-6 py-2 transition-colors cursor-pointer"
            >
              {completedMissions.filter(Boolean).length >= MISSIONS.length - 1 ? "View Results" : "Next Mission"}
            </button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Add Module Panel */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
          <h3 className="text-sm font-bold text-slate-300 mb-2">Add Module</h3>
          <div className="flex gap-2 flex-wrap">
            {SHAPE_OPTIONS.map((opt) => (
              <button
                key={opt.type}
                onClick={() => addModule(opt.type)}
                disabled={showSuccess}
                className={`flex-1 min-w-[80px] rounded-lg border-2 p-2 text-center transition-all cursor-pointer
                  border-slate-600 bg-slate-900 hover:border-purple-500 hover:bg-slate-800
                  ${showSuccess ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                <div className="text-lg font-mono text-purple-400">{opt.icon}</div>
                <div className="text-xs font-bold text-slate-300">{opt.label}</div>
                <div className="text-[10px] text-slate-500">{opt.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Module Info Panel */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
          <h3 className="text-sm font-bold text-slate-300 mb-2">
            {selectedModule ? "Edit Module" : "Module Info"}
          </h3>

          {selectedModule ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 capitalize">{selectedModule.type}</span>
                <button
                  onClick={() => removeModule(selectedModule.id)}
                  className="text-xs text-red-400 hover:text-red-300 cursor-pointer"
                >
                  Remove
                </button>
              </div>

              {/* Dimension controls based on shape type */}
              {selectedModule.type === "cube" && (
                <label className="block">
                  <span className="text-xs text-slate-400">Side Length (s): {editSize}</span>
                  <input
                    type="range"
                    min={2}
                    max={10}
                    value={editSize}
                    onChange={(e) => handleSizeChange(Number(e.target.value))}
                    className="w-full mt-1 accent-purple-500"
                  />
                  <div className="text-xs text-cyan-400 mt-1">
                    V = {editSize} x {editSize} x {editSize} = <span className="font-bold">{formatVolume(editSize * editSize * editSize)}</span> units^3
                  </div>
                </label>
              )}

              {selectedModule.type === "cylinder" && (
                <>
                  <label className="block">
                    <span className="text-xs text-slate-400">Radius (r): {editRadius}</span>
                    <input
                      type="range"
                      min={1}
                      max={6}
                      value={editRadius}
                      onChange={(e) => handleRadiusChange(Number(e.target.value))}
                      className="w-full mt-1 accent-purple-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs text-slate-400">Height (h): {editHeight}</span>
                    <input
                      type="range"
                      min={2}
                      max={10}
                      value={editHeight}
                      onChange={(e) => handleHeightChange(Number(e.target.value))}
                      className="w-full mt-1 accent-purple-500"
                    />
                  </label>
                  <div className="text-xs text-cyan-400">
                    V = pi x {editRadius}^2 x {editHeight} = <span className="font-bold">{formatVolume(Math.PI * editRadius * editRadius * editHeight)}</span> units^3
                  </div>
                </>
              )}

              {selectedModule.type === "sphere" && (
                <label className="block">
                  <span className="text-xs text-slate-400">Radius (r): {editRadius}</span>
                  <input
                    type="range"
                    min={1}
                    max={6}
                    value={editRadius}
                    onChange={(e) => handleRadiusChange(Number(e.target.value))}
                    className="w-full mt-1 accent-purple-500"
                  />
                  <div className="text-xs text-cyan-400 mt-1">
                    V = (4/3) x pi x {editRadius}^3 = <span className="font-bold">{formatVolume((4 / 3) * Math.PI * Math.pow(editRadius, 3))}</span> units^3
                  </div>
                </label>
              )}
            </div>
          ) : (
            <div className="text-sm text-slate-500">
              Click on a module to select and edit it, or add a new module to start building.
            </div>
          )}
        </div>
      </div>

      {/* Module List */}
      {modules.length > 0 && (
        <div className="mt-4 bg-slate-800/50 border border-slate-700 rounded-lg p-3">
          <h3 className="text-sm font-bold text-slate-300 mb-2">Station Modules ({modules.length})</h3>
          <div className="flex gap-2 flex-wrap max-h-24 overflow-y-auto">
            {modules.map((mod, idx) => {
              const vol = calculateVolume(mod);
              return (
                <button
                  key={mod.id}
                  onClick={() => selectModule(mod.id)}
                  className={`text-xs rounded px-2 py-1 border transition-colors cursor-pointer
                    ${mod.id === selectedModuleId
                      ? "bg-purple-900 border-purple-500 text-white"
                      : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500"
                    }
                  `}
                >
                  <span className="capitalize">{mod.type} {idx + 1}</span>
                  <span className="ml-1 text-cyan-400">{formatVolume(vol)}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Volume Summary & Action */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 bg-slate-800 rounded-lg p-3">
        <div>
          <div className="text-sm text-slate-400">Total Station Volume</div>
          <div className="text-2xl font-bold text-cyan-400 font-mono">{formatVolume(totalVolume)} units^3</div>
          <div className="text-xs text-slate-500">
            Target: {mission.targetVolume} units^3
            {totalVolume >= mission.targetVolume && " (Achieved!)"}
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex-1 min-w-[150px] max-w-[250px]">
          <div className="h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
            <div
              className={`h-full transition-all duration-500 ${
                totalVolume >= mission.targetVolume ? "bg-green-500" : "bg-purple-600"
              }`}
              style={{ width: `${Math.min(100, (totalVolume / mission.targetVolume) * 100)}%` }}
            />
          </div>
          <div className="text-xs text-slate-500 text-center mt-1">
            {Math.min(100, Math.round((totalVolume / mission.targetVolume) * 100))}% of goal
          </div>
        </div>

        <button
          onClick={completeMission}
          disabled={!isMissionComplete || showSuccess}
          className={`px-5 py-2 rounded-lg font-bold text-sm transition-colors cursor-pointer
            ${isMissionComplete && !showSuccess
              ? "bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/50"
              : "bg-slate-700 text-slate-500 cursor-not-allowed"
            }
          `}
        >
          Complete Mission
        </button>
      </div>

      {/* Formula reference */}
      <div className="mt-4 bg-indigo-950/50 border border-indigo-800 rounded-lg p-3">
        <h4 className="text-xs font-bold text-indigo-300 mb-2">Volume Formulas Reference</h4>
        <div className="grid grid-cols-3 gap-2 text-xs text-center">
          <div className="bg-slate-900/50 rounded p-2">
            <div className="font-mono text-purple-400">[ ]</div>
            <div className="text-slate-400">Cube</div>
            <div className="text-cyan-400 font-mono">V = s^3</div>
          </div>
          <div className="bg-slate-900/50 rounded p-2">
            <div className="font-mono text-purple-400">( )</div>
            <div className="text-slate-400">Cylinder</div>
            <div className="text-cyan-400 font-mono">V = pi*r^2*h</div>
          </div>
          <div className="bg-slate-900/50 rounded p-2">
            <div className="font-mono text-purple-400">O</div>
            <div className="text-slate-400">Sphere</div>
            <div className="text-cyan-400 font-mono">V = (4/3)*pi*r^3</div>
          </div>
        </div>
      </div>
    </div>
  );
}
