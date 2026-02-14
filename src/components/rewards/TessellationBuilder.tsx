import { useState, useCallback, useMemo } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ShapeType = "triangle" | "square" | "hexagon";
type GamePhase = "building" | "checking" | "complete";

interface PlacedShape {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  color: string;
  rotation: number; // 0, 60, 120, 180, 240, 300 for triangles; 0, 90, 180, 270 for squares
}

interface Challenge {
  id: number;
  name: string;
  description: string;
  targetShape: ShapeType;
  targetCount: number;
  gridWidth: number;
  gridHeight: number;
  bonusGoal?: string;
  bonusPoints: number;
  fact: string;
}

interface ShapeInfo {
  type: ShapeType;
  label: string;
  emoji: string;
  sides: number;
  interiorAngle: number;
  tessellates: boolean;
  reason: string;
  svgPath: (size: number) => string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const SHAPE_COLORS = [
  "#EF4444", // red
  "#F97316", // orange
  "#EAB308", // yellow
  "#22C55E", // green
  "#3B82F6", // blue
  "#8B5CF6", // purple
  "#EC4899", // pink
  "#14B8A6", // teal
];

const SHAPES: ShapeInfo[] = [
  {
    type: "square",
    label: "Square",
    emoji: "◻️",
    sides: 4,
    interiorAngle: 90,
    tessellates: true,
    reason:
      "4 squares meet at each corner: 90° × 4 = 360°. Since the angles add up perfectly to 360°, squares tile with no gaps!",
    svgPath: (size: number) => {
      const half = size / 2;
      return `M ${-half} ${-half} L ${half} ${-half} L ${half} ${half} L ${-half} ${half} Z`;
    },
  },
  {
    type: "triangle",
    label: "Triangle",
    emoji: "△",
    sides: 3,
    interiorAngle: 60,
    tessellates: true,
    reason:
      "6 equilateral triangles meet at each corner: 60° × 6 = 360°. The angles fit perfectly together!",
    svgPath: (size: number) => {
      const h = (size * Math.sqrt(3)) / 2;
      return `M 0 ${-h * 0.6} L ${size / 2} ${h * 0.4} L ${-size / 2} ${h * 0.4} Z`;
    },
  },
  {
    type: "hexagon",
    label: "Hexagon",
    emoji: "⬡",
    sides: 6,
    interiorAngle: 120,
    tessellates: true,
    reason:
      "3 hexagons meet at each corner: 120° × 3 = 360°. This is why honeycomb uses hexagons - it's nature's most efficient shape!",
    svgPath: (size: number) => {
      const r = size / 2;
      const points = [];
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        points.push(`${r * Math.cos(angle)},${r * Math.sin(angle)}`);
      }
      return `M ${points.join(" L ")} Z`;
    },
  },
];

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    name: "Square Grid",
    description: "Fill the grid with squares! This is the simplest tessellation.",
    targetShape: "square",
    targetCount: 9,
    gridWidth: 3,
    gridHeight: 3,
    bonusGoal: "Use at least 3 different colors",
    bonusPoints: 30,
    fact: "Squares tessellate because 4 right angles (90° each) meet at every corner to make exactly 360°!",
  },
  {
    id: 2,
    name: "Triangle Tiles",
    description: "Create a pattern using equilateral triangles!",
    targetShape: "triangle",
    targetCount: 12,
    gridWidth: 4,
    gridHeight: 3,
    bonusGoal: "Alternate colors in a checkerboard pattern",
    bonusPoints: 40,
    fact: "Triangle tessellations appear in many cultures' art, from Islamic geometric patterns to African textiles!",
  },
  {
    id: 3,
    name: "Honeycomb",
    description: "Build a honeycomb pattern with hexagons, just like bees do!",
    targetShape: "hexagon",
    targetCount: 7,
    gridWidth: 3,
    gridHeight: 3,
    bonusGoal: "Make the center hexagon a different color",
    bonusPoints: 35,
    fact: "Bees use hexagons because they hold the most honey with the least wax! Mathematicians proved this in 1999.",
  },
  {
    id: 4,
    name: "Creative Canvas",
    description: "Free build! Create any tessellation pattern you like.",
    targetShape: "square",
    targetCount: 12,
    gridWidth: 4,
    gridHeight: 4,
    bonusGoal: "Fill the entire grid with no gaps",
    bonusPoints: 50,
    fact: "Only 3 regular polygons can tessellate alone: triangles, squares, and hexagons. All other regular polygons leave gaps!",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getGridCellSize(
  gridWidth: number,
  gridHeight: number,
  shapeType: ShapeType
): number {
  const maxSize = 300;
  if (shapeType === "hexagon") {
    return Math.min(maxSize / gridWidth / 1.5, maxSize / gridHeight / 1.3);
  }
  return Math.min(maxSize / gridWidth, maxSize / gridHeight);
}

function getShapePosition(
  gridX: number,
  gridY: number,
  cellSize: number,
  shapeType: ShapeType
): { x: number; y: number } {
  if (shapeType === "hexagon") {
    const xOffset = gridY % 2 === 1 ? cellSize * 0.75 : 0;
    return {
      x: gridX * cellSize * 1.5 + cellSize / 2 + xOffset,
      y: gridY * cellSize * 0.866 + cellSize / 2,
    };
  }
  if (shapeType === "triangle") {
    const xOffset = (gridX % 2 === 1) !== (gridY % 2 === 1) ? 0 : 0;
    return {
      x: gridX * cellSize * 0.5 + cellSize / 2 + xOffset,
      y: gridY * cellSize * 0.866 + cellSize / 2,
    };
  }
  return {
    x: gridX * cellSize + cellSize / 2,
    y: gridY * cellSize + cellSize / 2,
  };
}

function countUniqueColors(shapes: PlacedShape[]): number {
  const colors = new Set(shapes.map((s) => s.color));
  return colors.size;
}

/* ------------------------------------------------------------------ */
/*  SVG Components                                                     */
/* ------------------------------------------------------------------ */

function ShapeSVG({
  shape,
  cellSize,
  isPreview = false,
  onClick,
  onRemove,
}: {
  shape: PlacedShape;
  cellSize: number;
  isPreview?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
}) {
  const shapeInfo = SHAPES.find((s) => s.type === shape.type)!;
  const path = shapeInfo.svgPath(cellSize * 0.85);

  return (
    <g
      transform={`translate(${shape.x}, ${shape.y}) rotate(${shape.rotation})`}
      className={`transition-all duration-150 ${isPreview ? "opacity-50" : ""} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <path
        d={path}
        fill={shape.color}
        stroke={isPreview ? "#666" : "#333"}
        strokeWidth={isPreview ? 1 : 2}
        strokeDasharray={isPreview ? "4,2" : undefined}
        className={onClick ? "hover:brightness-110" : ""}
      />
      {onRemove && !isPreview && (
        <circle
          cx={cellSize * 0.35}
          cy={-cellSize * 0.35}
          r={8}
          fill="#EF4444"
          stroke="white"
          strokeWidth={1.5}
          className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        />
      )}
    </g>
  );
}

function GridOverlay({
  gridWidth,
  gridHeight,
  cellSize,
  shapeType,
  onCellClick,
  placedShapes,
}: {
  gridWidth: number;
  gridHeight: number;
  cellSize: number;
  shapeType: ShapeType;
  onCellClick: (x: number, y: number) => void;
  placedShapes: PlacedShape[];
}) {
  const cells = [];

  if (shapeType === "square") {
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        const pos = getShapePosition(x, y, cellSize, shapeType);
        const isOccupied = placedShapes.some(
          (s) => Math.abs(s.x - pos.x) < 5 && Math.abs(s.y - pos.y) < 5
        );
        cells.push(
          <rect
            key={`${x}-${y}`}
            x={pos.x - cellSize / 2}
            y={pos.y - cellSize / 2}
            width={cellSize}
            height={cellSize}
            fill={isOccupied ? "transparent" : "rgba(200, 200, 200, 0.3)"}
            stroke="#ccc"
            strokeWidth={1}
            strokeDasharray="4,2"
            className={isOccupied ? "" : "cursor-pointer hover:fill-blue-200/50"}
            onClick={() => !isOccupied && onCellClick(x, y)}
          />
        );
      }
    }
  } else if (shapeType === "hexagon") {
    for (let y = 0; y < gridHeight; y++) {
      const rowWidth = y % 2 === 0 ? gridWidth : gridWidth - 1;
      for (let x = 0; x < rowWidth; x++) {
        const pos = getShapePosition(x, y, cellSize, shapeType);
        const isOccupied = placedShapes.some(
          (s) => Math.abs(s.x - pos.x) < 5 && Math.abs(s.y - pos.y) < 5
        );
        const shapeInfo = SHAPES.find((s) => s.type === "hexagon")!;
        cells.push(
          <path
            key={`${x}-${y}`}
            d={shapeInfo.svgPath(cellSize * 0.9)}
            transform={`translate(${pos.x}, ${pos.y})`}
            fill={isOccupied ? "transparent" : "rgba(200, 200, 200, 0.3)"}
            stroke="#ccc"
            strokeWidth={1}
            strokeDasharray="4,2"
            className={isOccupied ? "" : "cursor-pointer hover:fill-blue-200/50"}
            onClick={() => !isOccupied && onCellClick(x, y)}
          />
        );
      }
    }
  } else if (shapeType === "triangle") {
    for (let y = 0; y < gridHeight * 2; y++) {
      for (let x = 0; x < gridWidth * 2; x++) {
        const pos = getShapePosition(x, y, cellSize, shapeType);
        const rotation = (x + y) % 2 === 0 ? 0 : 180;
        const isOccupied = placedShapes.some(
          (s) =>
            Math.abs(s.x - pos.x) < 5 &&
            Math.abs(s.y - pos.y) < 5 &&
            s.rotation === rotation
        );
        const shapeInfo = SHAPES.find((s) => s.type === "triangle")!;
        cells.push(
          <path
            key={`${x}-${y}`}
            d={shapeInfo.svgPath(cellSize * 0.85)}
            transform={`translate(${pos.x}, ${pos.y}) rotate(${rotation})`}
            fill={isOccupied ? "transparent" : "rgba(200, 200, 200, 0.3)"}
            stroke="#ccc"
            strokeWidth={1}
            strokeDasharray="4,2"
            className={isOccupied ? "" : "cursor-pointer hover:fill-blue-200/50"}
            onClick={() => !isOccupied && onCellClick(x, y)}
          />
        );
      }
    }
  }

  return <g>{cells}</g>;
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function TessellationBuilder() {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [placedShapes, setPlacedShapes] = useState<PlacedShape[]>([]);
  const [selectedColor, setSelectedColor] = useState(SHAPE_COLORS[0]);
  const [phase, setPhase] = useState<GamePhase>("building");
  const [score, setScore] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [showInfo, setShowInfo] = useState<ShapeType | null>(null);

  const challenge = CHALLENGES[challengeIdx];
  const shapeInfo = SHAPES.find((s) => s.type === challenge.targetShape)!;
  const cellSize = getGridCellSize(
    challenge.gridWidth,
    challenge.gridHeight,
    challenge.targetShape
  );

  const svgWidth = useMemo(() => {
    if (challenge.targetShape === "hexagon") {
      return challenge.gridWidth * cellSize * 1.5 + cellSize;
    }
    if (challenge.targetShape === "triangle") {
      return challenge.gridWidth * cellSize + cellSize;
    }
    return challenge.gridWidth * cellSize + 20;
  }, [challenge.gridWidth, cellSize, challenge.targetShape]);

  const svgHeight = useMemo(() => {
    if (challenge.targetShape === "hexagon") {
      return challenge.gridHeight * cellSize * 0.866 + cellSize;
    }
    if (challenge.targetShape === "triangle") {
      return challenge.gridHeight * cellSize * 0.866 * 2 + cellSize;
    }
    return challenge.gridHeight * cellSize + 20;
  }, [challenge.gridHeight, cellSize, challenge.targetShape]);

  const resetChallenge = useCallback(() => {
    setPlacedShapes([]);
    setPhase("building");
    setShowInfo(null);
  }, []);

  const handleCellClick = useCallback(
    (gridX: number, gridY: number) => {
      if (phase !== "building") return;

      const pos = getShapePosition(gridX, gridY, cellSize, challenge.targetShape);
      const rotation =
        challenge.targetShape === "triangle" ? ((gridX + gridY) % 2 === 0 ? 0 : 180) : 0;

      // Check if already occupied
      const isOccupied = placedShapes.some(
        (s) =>
          Math.abs(s.x - pos.x) < 5 &&
          Math.abs(s.y - pos.y) < 5 &&
          (challenge.targetShape !== "triangle" || s.rotation === rotation)
      );

      if (isOccupied) return;

      const newShape: PlacedShape = {
        id: `shape-${Date.now()}-${Math.random()}`,
        type: challenge.targetShape,
        x: pos.x,
        y: pos.y,
        color: selectedColor,
        rotation,
      };

      setPlacedShapes((prev) => [...prev, newShape]);
    },
    [phase, cellSize, challenge.targetShape, placedShapes, selectedColor]
  );

  const handleRemoveShape = useCallback((id: string) => {
    setPlacedShapes((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const handleSubmit = useCallback(() => {
    if (placedShapes.length < challenge.targetCount) return;

    setPhase("checking");

    setTimeout(() => {
      let earnedPoints = 0;

      // Base points for meeting the target
      earnedPoints += 100;

      // Points for exact target match
      if (placedShapes.length === challenge.targetCount) {
        earnedPoints += 25;
      }

      // Bonus goal check
      let bonusAchieved = false;
      if (challenge.bonusGoal) {
        if (challenge.id === 1) {
          // Use at least 3 different colors
          bonusAchieved = countUniqueColors(placedShapes) >= 3;
        } else if (challenge.id === 2) {
          // Alternate colors (at least 2 colors used in a pattern)
          bonusAchieved = countUniqueColors(placedShapes) >= 2;
        } else if (challenge.id === 3) {
          // Center hexagon different color
          const centerShape = placedShapes.find(
            (s) => Math.abs(s.x - svgWidth / 2) < cellSize && Math.abs(s.y - svgHeight / 2) < cellSize
          );
          if (centerShape) {
            const otherColors = placedShapes
              .filter((s) => s.id !== centerShape.id)
              .map((s) => s.color);
            bonusAchieved = !otherColors.includes(centerShape.color);
          }
        } else if (challenge.id === 4) {
          // Fill entire grid
          const expectedCount =
            challenge.targetShape === "triangle"
              ? challenge.gridWidth * challenge.gridHeight * 4
              : challenge.gridWidth * challenge.gridHeight;
          bonusAchieved = placedShapes.length >= expectedCount * 0.9;
        }
      }

      if (bonusAchieved) {
        earnedPoints += challenge.bonusPoints;
      }

      // Use functional update to ensure proper score increment
      setScore((prevScore) => prevScore + earnedPoints);
      setCompletedChallenges((prev) => {
        const next = [...prev];
        next[challengeIdx] = true;
        return next;
      });
      setPhase("complete");
    }, 800);
  }, [
    placedShapes,
    challenge.targetCount,
    challenge.bonusGoal,
    challenge.bonusPoints,
    challenge.id,
    challengeIdx,
    svgWidth,
    svgHeight,
    cellSize,
    challenge.gridWidth,
    challenge.gridHeight,
    challenge.targetShape,
  ]);

  const handleNextChallenge = useCallback(() => {
    const nextIdx = completedChallenges.findIndex((c, i) => !c && i !== challengeIdx);
    if (nextIdx !== -1) {
      setChallengeIdx(nextIdx);
      resetChallenge();
    }
  }, [completedChallenges, challengeIdx, resetChallenge]);

  const handleSelectChallenge = useCallback(
    (idx: number) => {
      setChallengeIdx(idx);
      resetChallenge();
    },
    [resetChallenge]
  );

  const allComplete = completedChallenges.every(Boolean);

  /* ---- Completion Screen ---- */
  if (allComplete && phase !== "complete") {
    return (
      <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 p-6 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-indigo-800 mb-2">
          Tessellation Master!
        </h2>
        <p className="text-lg text-indigo-700 mb-4">
          You completed all 4 tessellation challenges! You've learned why certain
          shapes tile perfectly.
        </p>
        <div className="flex justify-center gap-3 mb-5 flex-wrap">
          {CHALLENGES.map((c) => (
            <div
              key={c.id}
              className="bg-green-100 border-2 border-green-400 rounded-lg px-3 py-2 text-sm font-semibold text-green-700"
            >
              {c.name}
            </div>
          ))}
        </div>
        <div className="text-3xl font-bold text-amber-600 mb-4">
          Total Score: {score}
        </div>
        <div className="bg-indigo-100 rounded-lg p-4 mb-5 text-sm text-indigo-800">
          <p className="font-bold mb-2">What you learned:</p>
          <ul className="text-left space-y-1">
            <li>
              <span className="font-semibold">Squares:</span> 4 corners at 90° = 360°
            </li>
            <li>
              <span className="font-semibold">Triangles:</span> 6 corners at 60° = 360°
            </li>
            <li>
              <span className="font-semibold">Hexagons:</span> 3 corners at 120° = 360°
            </li>
          </ul>
          <p className="mt-2">
            The key is that the angles must add up to exactly 360° at each vertex!
          </p>
        </div>
        <button
          onClick={() => {
            setCompletedChallenges([false, false, false, false]);
            setChallengeIdx(0);
            setScore(0);
            resetChallenge();
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg px-6 py-3 text-base transition-colors cursor-pointer"
        >
          Play Again
        </button>
      </div>
    );
  }

  /* ---- Main Game UI ---- */
  return (
    <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-slate-100 p-4 sm:p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h2 className="text-xl font-bold text-indigo-800">Tessellation Builder</h2>
        <div className="flex gap-2 items-center">
          <span className="text-sm font-semibold text-amber-600 bg-amber-100 rounded-full px-3 py-1">
            Score: {score}
          </span>
          <span className="text-sm font-semibold text-slate-500 bg-white rounded-full px-3 py-1 border border-slate-200">
            Challenge {challengeIdx + 1}/4
          </span>
        </div>
      </div>

      {/* Challenge selector */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {CHALLENGES.map((c, i) => (
          <button
            key={c.id}
            onClick={() => handleSelectChallenge(i)}
            disabled={phase === "checking"}
            className={`text-xs font-semibold rounded-full px-3 py-1 border-2 transition-colors cursor-pointer
              ${
                i === challengeIdx
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : completedChallenges[i]
                  ? "bg-green-100 text-green-700 border-green-400 hover:bg-green-200"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
              }
              ${phase === "checking" ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {completedChallenges[i] ? "\u2713 " : ""}
            {c.name}
          </button>
        ))}
      </div>

      {/* Challenge description */}
      <p className="text-sm text-slate-600 mb-3">{challenge.description}</p>

      {/* Main layout */}
      <div className="flex flex-wrap gap-4">
        {/* Canvas area */}
        <div className="flex-1 min-w-[280px]">
          <div className="bg-white border-2 border-indigo-200 rounded-xl p-3 shadow-inner">
            <svg
              width="100%"
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="max-h-[350px]"
              style={{ background: "#fafafa" }}
            >
              {/* Grid overlay */}
              <GridOverlay
                gridWidth={challenge.gridWidth}
                gridHeight={challenge.gridHeight}
                cellSize={cellSize}
                shapeType={challenge.targetShape}
                onCellClick={handleCellClick}
                placedShapes={placedShapes}
              />

              {/* Placed shapes */}
              {placedShapes.map((shape) => (
                <g key={shape.id} className="group">
                  <ShapeSVG
                    shape={shape}
                    cellSize={cellSize}
                    onClick={() => phase === "building" && handleRemoveShape(shape.id)}
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* Progress bar */}
          <div className="mt-3 bg-slate-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (placedShapes.length / challenge.targetCount) * 100)}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>
              {placedShapes.length} / {challenge.targetCount} shapes placed
            </span>
            <span>Click to place, click again to remove</span>
          </div>
        </div>

        {/* Controls panel */}
        <div className="w-full sm:w-56 space-y-3">
          {/* Shape info */}
          <div className="bg-white rounded-lg p-3 border border-indigo-200">
            <h3 className="text-sm font-bold text-indigo-700 mb-2">
              Current Shape: {shapeInfo.label}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{shapeInfo.emoji}</span>
              <div className="text-xs text-slate-600">
                <div>{shapeInfo.sides} sides</div>
                <div>Interior angle: {shapeInfo.interiorAngle}°</div>
              </div>
            </div>
            <button
              onClick={() => setShowInfo(showInfo === shapeInfo.type ? null : shapeInfo.type)}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
            >
              {showInfo === shapeInfo.type ? "Hide" : "Why does it tessellate?"}
            </button>
            {showInfo === shapeInfo.type && (
              <div className="mt-2 text-xs bg-indigo-50 rounded p-2 text-indigo-800">
                {shapeInfo.reason}
              </div>
            )}
          </div>

          {/* Color palette */}
          <div className="bg-white rounded-lg p-3 border border-indigo-200">
            <h3 className="text-sm font-bold text-slate-700 mb-2">Choose Color</h3>
            <div className="grid grid-cols-4 gap-2">
              {SHAPE_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedColor === color
                      ? "border-slate-800 scale-110 shadow-md"
                      : "border-transparent hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Bonus goal */}
          {challenge.bonusGoal && (
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
              <h3 className="text-xs font-bold text-amber-700 mb-1">
                Bonus Goal (+{challenge.bonusPoints} pts)
              </h3>
              <p className="text-xs text-amber-600">{challenge.bonusGoal}</p>
            </div>
          )}

          {/* All shapes info */}
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <h3 className="text-xs font-bold text-slate-700 mb-2">
              Shapes That Tessellate
            </h3>
            <div className="space-y-1">
              {SHAPES.map((s) => (
                <button
                  key={s.type}
                  onClick={() => setShowInfo(showInfo === s.type ? null : s.type)}
                  className="flex items-center gap-2 text-xs text-slate-600 hover:text-indigo-600 cursor-pointer w-full text-left"
                >
                  <span>{s.emoji}</span>
                  <span>{s.label}</span>
                  <span className="text-slate-400">({s.interiorAngle}°)</span>
                </button>
              ))}
            </div>
            {showInfo && showInfo !== challenge.targetShape && (
              <div className="mt-2 text-xs bg-indigo-50 rounded p-2 text-indigo-800">
                {SHAPES.find((s) => s.type === showInfo)?.reason}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={resetChallenge}
              disabled={phase === "checking"}
              className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              Clear
            </button>
            {phase === "building" && (
              <button
                onClick={handleSubmit}
                disabled={placedShapes.length < challenge.targetCount}
                className={`flex-1 font-bold rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer
                  ${
                    placedShapes.length >= challenge.targetCount
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }
                `}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Checking overlay */}
      {phase === "checking" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 text-center animate-pulse">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-indigo-700">
              Checking your tessellation...
            </h3>
          </div>
        </div>
      )}

      {/* Complete overlay */}
      {phase === "complete" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 text-center max-w-md mx-4">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-bold text-indigo-700 mb-2">
              Beautiful Tessellation!
            </h3>
            <p className="text-slate-600 mb-4">{challenge.fact}</p>
            <div className="text-2xl font-bold text-amber-600 mb-4">
              Total Score: {score}
            </div>
            {!allComplete && (
              <button
                onClick={handleNextChallenge}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg px-6 py-3 text-base transition-colors cursor-pointer"
              >
                Next Challenge
              </button>
            )}
            {allComplete && (
              <button
                onClick={() => setPhase("building")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg px-6 py-3 text-base transition-colors cursor-pointer"
              >
                View Results
              </button>
            )}
          </div>
        </div>
      )}

      {/* Educational tip */}
      {phase === "building" && (
        <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-xs text-indigo-800">
          <span className="font-bold">Math Tip:</span> A tessellation works when shapes
          fit together with no gaps or overlaps. The angles meeting at each corner must
          add up to exactly 360 degrees!
        </div>
      )}
    </div>
  );
}
