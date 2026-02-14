import { useState, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FurnitureItem {
  id: string;
  name: string;
  emoji: string;
  width: number;  // grid units
  height: number; // grid units
  color: string;
  cost: number;
  description: string;
}

interface PlacedFurniture {
  id: string;
  itemId: string;
  x: number;
  y: number;
  rotation: number; // 0 or 90 degrees
}

interface Challenge {
  id: number;
  name: string;
  description: string;
  roomWidth: number;
  roomHeight: number;
  budget: number;
  tileCost: number;
  requiredItems: { itemId: string; count: number }[];
  bonusGoal?: string;
  bonusPoints: number;
}

type GamePhase = "designing" | "calculating" | "complete";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const FURNITURE_ITEMS: FurnitureItem[] = [
  {
    id: "bed",
    name: "Bed",
    emoji: "🛏️",
    width: 2,
    height: 3,
    color: "#8B5CF6",
    cost: 150,
    description: "A comfy bed (2x3 = 6 sq units)",
  },
  {
    id: "desk",
    name: "Desk",
    emoji: "🪑",
    width: 2,
    height: 1,
    color: "#F59E0B",
    cost: 80,
    description: "Study desk (2x1 = 2 sq units)",
  },
  {
    id: "wardrobe",
    name: "Wardrobe",
    emoji: "🚪",
    width: 2,
    height: 1,
    color: "#78716C",
    cost: 120,
    description: "Clothes storage (2x1 = 2 sq units)",
  },
  {
    id: "chair",
    name: "Chair",
    emoji: "💺",
    width: 1,
    height: 1,
    color: "#3B82F6",
    cost: 40,
    description: "Desk chair (1x1 = 1 sq unit)",
  },
  {
    id: "bookshelf",
    name: "Bookshelf",
    emoji: "📚",
    width: 1,
    height: 2,
    color: "#A16207",
    cost: 90,
    description: "For your books (1x2 = 2 sq units)",
  },
  {
    id: "plant",
    name: "Plant",
    emoji: "🪴",
    width: 1,
    height: 1,
    color: "#22C55E",
    cost: 25,
    description: "Decoration (1x1 = 1 sq unit)",
  },
  {
    id: "rug",
    name: "Rug",
    emoji: "🟫",
    width: 2,
    height: 2,
    color: "#DC2626",
    cost: 60,
    description: "Cozy rug (2x2 = 4 sq units)",
  },
  {
    id: "lamp",
    name: "Lamp",
    emoji: "💡",
    width: 1,
    height: 1,
    color: "#FCD34D",
    cost: 35,
    description: "Floor lamp (1x1 = 1 sq unit)",
  },
];

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    name: "Starter Room",
    description: "Design a simple bedroom with the basics!",
    roomWidth: 6,
    roomHeight: 6,
    budget: 400,
    tileCost: 10,
    requiredItems: [
      { itemId: "bed", count: 1 },
      { itemId: "desk", count: 1 },
    ],
    bonusGoal: "Add a plant for extra coziness",
    bonusPoints: 50,
  },
  {
    id: 2,
    name: "Study Corner",
    description: "Create the perfect study space!",
    roomWidth: 5,
    roomHeight: 7,
    budget: 500,
    tileCost: 12,
    requiredItems: [
      { itemId: "desk", count: 1 },
      { itemId: "chair", count: 1 },
      { itemId: "bookshelf", count: 2 },
    ],
    bonusGoal: "Add a lamp for better lighting",
    bonusPoints: 60,
  },
  {
    id: 3,
    name: "Cozy Retreat",
    description: "Design a comfortable bedroom with storage!",
    roomWidth: 7,
    roomHeight: 6,
    budget: 600,
    tileCost: 10,
    requiredItems: [
      { itemId: "bed", count: 1 },
      { itemId: "wardrobe", count: 1 },
      { itemId: "rug", count: 1 },
    ],
    bonusGoal: "Keep at least 10 sq units of floor space clear",
    bonusPoints: 75,
  },
  {
    id: 4,
    name: "Dream Suite",
    description: "The ultimate room with everything you need!",
    roomWidth: 8,
    roomHeight: 7,
    budget: 800,
    tileCost: 8,
    requiredItems: [
      { itemId: "bed", count: 1 },
      { itemId: "desk", count: 1 },
      { itemId: "chair", count: 1 },
      { itemId: "wardrobe", count: 1 },
      { itemId: "bookshelf", count: 1 },
    ],
    bonusGoal: "Stay under budget by at least $100",
    bonusPoints: 100,
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getItemDimensions(item: FurnitureItem, rotation: number) {
  if (rotation === 90) {
    return { width: item.height, height: item.width };
  }
  return { width: item.width, height: item.height };
}

function isOverlapping(
  placed: PlacedFurniture[],
  newItem: PlacedFurniture,
  items: FurnitureItem[]
): boolean {
  const newFurniture = items.find((i) => i.id === newItem.itemId)!;
  const newDims = getItemDimensions(newFurniture, newItem.rotation);

  for (const p of placed) {
    if (p.id === newItem.id) continue;
    const pFurniture = items.find((i) => i.id === p.itemId)!;
    const pDims = getItemDimensions(pFurniture, p.rotation);

    const overlapX = newItem.x < p.x + pDims.width && newItem.x + newDims.width > p.x;
    const overlapY = newItem.y < p.y + pDims.height && newItem.y + newDims.height > p.y;

    if (overlapX && overlapY) return true;
  }
  return false;
}

function isOutOfBounds(
  item: PlacedFurniture,
  furniture: FurnitureItem,
  roomWidth: number,
  roomHeight: number
): boolean {
  const dims = getItemDimensions(furniture, item.rotation);
  return (
    item.x < 0 ||
    item.y < 0 ||
    item.x + dims.width > roomWidth ||
    item.y + dims.height > roomHeight
  );
}

function calculateTotalArea(roomWidth: number, roomHeight: number): number {
  return roomWidth * roomHeight;
}

function calculateFurnitureArea(placed: PlacedFurniture[], items: FurnitureItem[]): number {
  return placed.reduce((total, p) => {
    const item = items.find((i) => i.id === p.itemId)!;
    return total + item.width * item.height;
  }, 0);
}

function calculateTotalCost(
  placed: PlacedFurniture[],
  items: FurnitureItem[],
  roomWidth: number,
  roomHeight: number,
  tileCost: number
): number {
  const floorCost = roomWidth * roomHeight * tileCost;
  const furnitureCost = placed.reduce((total, p) => {
    const item = items.find((i) => i.id === p.itemId)!;
    return total + item.cost;
  }, 0);
  return floorCost + furnitureCost;
}

function checkRequirements(
  placed: PlacedFurniture[],
  requirements: { itemId: string; count: number }[]
): boolean {
  for (const req of requirements) {
    const count = placed.filter((p) => p.itemId === req.itemId).length;
    if (count < req.count) return false;
  }
  return true;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function RoomDesigner() {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [placed, setPlaced] = useState<PlacedFurniture[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [phase, setPhase] = useState<GamePhase>("designing");
  const [score, setScore] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [dragItem, setDragItem] = useState<PlacedFurniture | null>(null);
  const [hoverCell, setHoverCell] = useState<{ x: number; y: number } | null>(null);

  const challenge = CHALLENGES[challengeIdx];
  const totalArea = calculateTotalArea(challenge.roomWidth, challenge.roomHeight);
  const furnitureArea = calculateFurnitureArea(placed, FURNITURE_ITEMS);
  const remainingSpace = totalArea - furnitureArea;
  const totalCost = calculateTotalCost(
    placed,
    FURNITURE_ITEMS,
    challenge.roomWidth,
    challenge.roomHeight,
    challenge.tileCost
  );
  const budgetRemaining = challenge.budget - totalCost;
  const requirementsMet = checkRequirements(placed, challenge.requiredItems);

  const resetChallenge = useCallback(() => {
    setPlaced([]);
    setSelectedItem(null);
    setRotation(0);
    setPhase("designing");
    setDragItem(null);
    setHoverCell(null);
  }, []);

  const handleCellClick = useCallback(
    (x: number, y: number) => {
      if (phase !== "designing") return;

      // Check if clicking on existing furniture
      const clickedFurniture = placed.find((p) => {
        const item = FURNITURE_ITEMS.find((i) => i.id === p.itemId)!;
        const dims = getItemDimensions(item, p.rotation);
        return x >= p.x && x < p.x + dims.width && y >= p.y && y < p.y + dims.height;
      });

      if (clickedFurniture) {
        // Start dragging
        setDragItem(clickedFurniture);
        setSelectedItem(null);
        return;
      }

      if (!selectedItem) return;

      const item = FURNITURE_ITEMS.find((i) => i.id === selectedItem)!;
      const dims = getItemDimensions(item, rotation);

      // Check if placement is valid
      const newPlacement: PlacedFurniture = {
        id: `${selectedItem}-${Date.now()}`,
        itemId: selectedItem,
        x,
        y,
        rotation,
      };

      if (isOutOfBounds(newPlacement, item, challenge.roomWidth, challenge.roomHeight)) {
        return;
      }

      if (isOverlapping(placed, newPlacement, FURNITURE_ITEMS)) {
        return;
      }

      // Check budget
      const newCost = totalCost + item.cost;
      if (newCost > challenge.budget) {
        return;
      }

      // Check if item fits in remaining space
      if (dims.width * dims.height > remainingSpace) {
        return;
      }

      setPlaced((prev) => [...prev, newPlacement]);
    },
    [
      phase,
      placed,
      selectedItem,
      rotation,
      challenge.roomWidth,
      challenge.roomHeight,
      challenge.budget,
      totalCost,
      remainingSpace,
    ]
  );

  const handleDragEnd = useCallback(
    (x: number, y: number) => {
      if (!dragItem) return;

      const item = FURNITURE_ITEMS.find((i) => i.id === dragItem.itemId)!;
      const updatedItem = { ...dragItem, x, y };

      if (isOutOfBounds(updatedItem, item, challenge.roomWidth, challenge.roomHeight)) {
        setDragItem(null);
        return;
      }

      const otherPlaced = placed.filter((p) => p.id !== dragItem.id);
      if (isOverlapping(otherPlaced, updatedItem, FURNITURE_ITEMS)) {
        setDragItem(null);
        return;
      }

      setPlaced((prev) =>
        prev.map((p) => (p.id === dragItem.id ? updatedItem : p))
      );
      setDragItem(null);
    },
    [dragItem, placed, challenge.roomWidth, challenge.roomHeight]
  );

  const handleRemoveFurniture = useCallback((id: string) => {
    setPlaced((prev) => prev.filter((p) => p.id !== id));
    setDragItem(null);
  }, []);

  const handleRotate = useCallback(() => {
    setRotation((prev) => (prev === 0 ? 90 : 0));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!requirementsMet) return;
    if (budgetRemaining < 0) return;

    setPhase("calculating");

    // Calculate score using functional update
    setTimeout(() => {
      let newScore = 0;

      // Base points for meeting requirements
      newScore += 100;

      // Budget efficiency: more remaining budget = more points
      newScore += Math.floor(budgetRemaining / 5);

      // Space efficiency: good use of space
      const spaceUsagePercent = (furnitureArea / totalArea) * 100;
      if (spaceUsagePercent >= 40 && spaceUsagePercent <= 70) {
        newScore += 50; // Optimal space usage
      } else if (spaceUsagePercent >= 30 && spaceUsagePercent <= 80) {
        newScore += 25; // Good space usage
      }

      // Bonus goal check
      let bonusAchieved = false;
      if (challenge.bonusGoal) {
        if (challenge.id === 1) {
          // Add a plant
          bonusAchieved = placed.some((p) => p.itemId === "plant");
        } else if (challenge.id === 2) {
          // Add a lamp
          bonusAchieved = placed.some((p) => p.itemId === "lamp");
        } else if (challenge.id === 3) {
          // Keep 10 sq units clear
          bonusAchieved = remainingSpace >= 10;
        } else if (challenge.id === 4) {
          // Stay under budget by $100
          bonusAchieved = budgetRemaining >= 100;
        }
      }

      if (bonusAchieved) {
        newScore += challenge.bonusPoints;
      }

      setScore((prevScore) => prevScore + newScore);
      setCompletedChallenges((prev) => {
        const next = [...prev];
        next[challengeIdx] = true;
        return next;
      });
      setPhase("complete");
    }, 1000);
  }, [
    requirementsMet,
    budgetRemaining,
    furnitureArea,
    totalArea,
    challenge.bonusGoal,
    challenge.bonusPoints,
    challenge.id,
    placed,
    remainingSpace,
    challengeIdx,
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

  // Render grid
  const renderGrid = () => {
    const cells = [];
    const cellSize = Math.min(40, 280 / Math.max(challenge.roomWidth, challenge.roomHeight));

    for (let y = 0; y < challenge.roomHeight; y++) {
      for (let x = 0; x < challenge.roomWidth; x++) {
        const isHovered = hoverCell?.x === x && hoverCell?.y === y;
        const isValidPlacement =
          selectedItem &&
          phase === "designing" &&
          (() => {
            const item = FURNITURE_ITEMS.find((i) => i.id === selectedItem)!;
            const dims = getItemDimensions(item, rotation);
            const testPlacement: PlacedFurniture = {
              id: "test",
              itemId: selectedItem,
              x,
              y,
              rotation,
            };
            const withinBounds =
              x + dims.width <= challenge.roomWidth &&
              y + dims.height <= challenge.roomHeight;
            const noOverlap = !isOverlapping(placed, testPlacement, FURNITURE_ITEMS);
            const withinBudget = totalCost + item.cost <= challenge.budget;
            return withinBounds && noOverlap && withinBudget;
          })();

        cells.push(
          <div
            key={`${x}-${y}`}
            className={`border border-slate-300 transition-colors cursor-pointer
              ${isHovered && isValidPlacement ? "bg-green-200" : ""}
              ${isHovered && selectedItem && !isValidPlacement ? "bg-red-200" : ""}
              ${!selectedItem && phase === "designing" ? "hover:bg-slate-100" : ""}
            `}
            style={{
              width: cellSize,
              height: cellSize,
              gridColumn: x + 1,
              gridRow: y + 1,
            }}
            onClick={() =>
              dragItem ? handleDragEnd(x, y) : handleCellClick(x, y)
            }
            onMouseEnter={() => setHoverCell({ x, y })}
            onMouseLeave={() => setHoverCell(null)}
          />
        );
      }
    }

    return cells;
  };

  // Render placed furniture
  const renderFurniture = () => {
    const cellSize = Math.min(40, 280 / Math.max(challenge.roomWidth, challenge.roomHeight));

    return placed.map((p) => {
      const item = FURNITURE_ITEMS.find((i) => i.id === p.itemId)!;
      const dims = getItemDimensions(item, p.rotation);
      const isDragging = dragItem?.id === p.id;

      return (
        <div
          key={p.id}
          className={`absolute flex flex-col items-center justify-center rounded-sm shadow-sm transition-all cursor-move
            ${isDragging ? "ring-2 ring-blue-500 opacity-70 scale-105" : "hover:ring-2 hover:ring-blue-300"}
          `}
          style={{
            left: p.x * cellSize,
            top: p.y * cellSize,
            width: dims.width * cellSize,
            height: dims.height * cellSize,
            backgroundColor: item.color,
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (phase === "designing") {
              setDragItem(p);
              setSelectedItem(null);
            }
          }}
        >
          <span style={{ fontSize: Math.min(cellSize * 0.6, 24) }}>{item.emoji}</span>
          {dims.width * dims.height >= 2 && (
            <span className="text-white text-xs font-bold drop-shadow-sm">
              {dims.width}x{dims.height}
            </span>
          )}
        </div>
      );
    });
  };

  // Preview ghost for selected item
  const renderPreview = () => {
    if (!selectedItem || !hoverCell || phase !== "designing") return null;

    const item = FURNITURE_ITEMS.find((i) => i.id === selectedItem)!;
    const dims = getItemDimensions(item, rotation);
    const cellSize = Math.min(40, 280 / Math.max(challenge.roomWidth, challenge.roomHeight));

    const testPlacement: PlacedFurniture = {
      id: "preview",
      itemId: selectedItem,
      x: hoverCell.x,
      y: hoverCell.y,
      rotation,
    };

    const withinBounds =
      hoverCell.x + dims.width <= challenge.roomWidth &&
      hoverCell.y + dims.height <= challenge.roomHeight;
    const noOverlap = !isOverlapping(placed, testPlacement, FURNITURE_ITEMS);
    const withinBudget = totalCost + item.cost <= challenge.budget;
    const isValid = withinBounds && noOverlap && withinBudget;

    return (
      <div
        className={`absolute pointer-events-none rounded-sm flex items-center justify-center
          ${isValid ? "bg-green-400/60" : "bg-red-400/60"}
        `}
        style={{
          left: hoverCell.x * cellSize,
          top: hoverCell.y * cellSize,
          width: dims.width * cellSize,
          height: dims.height * cellSize,
        }}
      >
        <span style={{ fontSize: Math.min(cellSize * 0.6, 24) }}>{item.emoji}</span>
      </div>
    );
  };

  /* ---- Completion Screen ---- */
  if (allComplete && phase !== "complete") {
    return (
      <div className="rounded-xl bg-gradient-to-br from-violet-50 to-amber-50 p-6 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-violet-800 mb-2">
          Master Room Designer!
        </h2>
        <p className="text-lg text-violet-700 mb-4">
          You completed all 4 room design challenges! You've learned about area
          calculations and budget management.
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
        <p className="text-base text-gray-600 mb-5">
          Great job calculating floor areas and managing your budget! These
          geometry skills help real architects and interior designers every day.
        </p>
        <button
          onClick={() => {
            setCompletedChallenges([false, false, false, false]);
            setChallengeIdx(0);
            setScore(0);
            resetChallenge();
          }}
          className="bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-lg px-6 py-3 text-base transition-colors cursor-pointer"
        >
          Play Again
        </button>
      </div>
    );
  }

  /* ---- Main Game UI ---- */
  return (
    <div className="rounded-xl bg-gradient-to-br from-violet-50 to-slate-100 p-4 sm:p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h2 className="text-xl font-bold text-violet-800">Room Designer</h2>
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
            disabled={phase === "calculating"}
            className={`text-xs font-semibold rounded-full px-3 py-1 border-2 transition-colors cursor-pointer
              ${
                i === challengeIdx
                  ? "bg-violet-600 text-white border-violet-600"
                  : completedChallenges[i]
                  ? "bg-green-100 text-green-700 border-green-400 hover:bg-green-200"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
              }
              ${phase === "calculating" ? "opacity-50 cursor-not-allowed" : ""}
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
        {/* Room grid */}
        <div className="flex-1 min-w-[280px]">
          <div className="bg-amber-100 border-4 border-amber-700 rounded-lg p-2 inline-block">
            <div
              className="relative bg-amber-50"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${challenge.roomWidth}, 1fr)`,
                gridTemplateRows: `repeat(${challenge.roomHeight}, 1fr)`,
              }}
            >
              {renderGrid()}
              {renderFurniture()}
              {renderPreview()}
            </div>
          </div>

          {/* Area calculations */}
          <div className="mt-3 bg-white rounded-lg p-3 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-700 mb-2">
              Area Calculations
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-blue-50 rounded p-2">
                <span className="text-blue-600 font-semibold">Total Floor Area</span>
                <div className="text-lg font-bold text-blue-800">
                  {challenge.roomWidth} x {challenge.roomHeight} = {totalArea} sq
                </div>
              </div>
              <div className="bg-purple-50 rounded p-2">
                <span className="text-purple-600 font-semibold">Furniture Area</span>
                <div className="text-lg font-bold text-purple-800">
                  {furnitureArea} sq
                </div>
              </div>
              <div className="bg-green-50 rounded p-2">
                <span className="text-green-600 font-semibold">Remaining Space</span>
                <div className="text-lg font-bold text-green-800">
                  {totalArea} - {furnitureArea} = {remainingSpace} sq
                </div>
              </div>
              <div
                className={`rounded p-2 ${
                  budgetRemaining >= 0 ? "bg-amber-50" : "bg-red-50"
                }`}
              >
                <span
                  className={`font-semibold ${
                    budgetRemaining >= 0 ? "text-amber-600" : "text-red-600"
                  }`}
                >
                  Budget Remaining
                </span>
                <div
                  className={`text-lg font-bold ${
                    budgetRemaining >= 0 ? "text-amber-800" : "text-red-800"
                  }`}
                >
                  ${challenge.budget} - ${totalCost} = ${budgetRemaining}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="w-full sm:w-64 space-y-3">
          {/* Furniture palette */}
          <div className="bg-white rounded-lg p-3 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-700 mb-2">
              Furniture (click to select)
            </h3>
            <div className="grid grid-cols-4 gap-1">
              {FURNITURE_ITEMS.map((item) => {
                const isSelected = selectedItem === item.id;
                const canAfford = totalCost + item.cost <= challenge.budget;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (canAfford && phase === "designing") {
                        setSelectedItem(isSelected ? null : item.id);
                        setDragItem(null);
                      }
                    }}
                    disabled={!canAfford || phase !== "designing"}
                    className={`p-2 rounded-lg border-2 transition-all cursor-pointer
                      ${
                        isSelected
                          ? "border-violet-500 bg-violet-50 shadow-md"
                          : "border-slate-200 bg-white hover:border-slate-400"
                      }
                      ${!canAfford ? "opacity-40 cursor-not-allowed" : ""}
                    `}
                    title={`${item.name}: ${item.width}x${item.height} = ${
                      item.width * item.height
                    } sq units, $${item.cost}`}
                  >
                    <span className="text-xl">{item.emoji}</span>
                    <div className="text-[10px] text-slate-500">${item.cost}</div>
                  </button>
                );
              })}
            </div>
            {selectedItem && (
              <div className="mt-2 text-xs text-slate-600 bg-slate-50 rounded p-2">
                <div className="font-semibold">
                  {FURNITURE_ITEMS.find((i) => i.id === selectedItem)?.name}
                </div>
                <div>
                  {FURNITURE_ITEMS.find((i) => i.id === selectedItem)?.description}
                </div>
                <button
                  onClick={handleRotate}
                  className="mt-1 text-violet-600 hover:text-violet-800 font-semibold cursor-pointer"
                >
                  Rotate ({rotation === 0 ? "0°" : "90°"})
                </button>
              </div>
            )}
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-lg p-3 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-700 mb-2">Requirements</h3>
            <ul className="space-y-1">
              {challenge.requiredItems.map((req) => {
                const item = FURNITURE_ITEMS.find((i) => i.id === req.itemId)!;
                const count = placed.filter((p) => p.itemId === req.itemId).length;
                const met = count >= req.count;
                return (
                  <li
                    key={req.itemId}
                    className={`text-xs flex items-center gap-1 ${
                      met ? "text-green-600" : "text-slate-600"
                    }`}
                  >
                    <span>{met ? "\u2713" : "\u2022"}</span>
                    <span>{item.emoji}</span>
                    <span>
                      {item.name} x{req.count} ({count}/{req.count})
                    </span>
                  </li>
                );
              })}
            </ul>
            {challenge.bonusGoal && (
              <div className="mt-2 text-xs text-amber-600 bg-amber-50 rounded p-2">
                <span className="font-semibold">Bonus (+{challenge.bonusPoints}): </span>
                {challenge.bonusGoal}
              </div>
            )}
          </div>

          {/* Drag item controls */}
          {dragItem && phase === "designing" && (
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <h3 className="text-sm font-bold text-blue-700 mb-2">Moving Furniture</h3>
              <p className="text-xs text-blue-600 mb-2">
                Click on a cell to place the{" "}
                {FURNITURE_ITEMS.find((i) => i.id === dragItem.itemId)?.name}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setDragItem(null)}
                  className="text-xs bg-white border border-blue-300 text-blue-600 px-2 py-1 rounded cursor-pointer hover:bg-blue-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRemoveFurniture(dragItem.id)}
                  className="text-xs bg-red-100 border border-red-300 text-red-600 px-2 py-1 rounded cursor-pointer hover:bg-red-200"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={resetChallenge}
              disabled={phase === "calculating"}
              className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg px-4 py-2 text-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              Clear Room
            </button>
            {phase === "designing" && (
              <button
                onClick={handleSubmit}
                disabled={!requirementsMet || budgetRemaining < 0}
                className={`flex-1 font-bold rounded-lg px-4 py-2 text-sm transition-colors cursor-pointer
                  ${
                    requirementsMet && budgetRemaining >= 0
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }
                `}
              >
                Submit Design
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Calculating overlay */}
      {phase === "calculating" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 text-center animate-pulse">
            <div className="text-4xl mb-3">📐</div>
            <h3 className="text-lg font-bold text-violet-700">
              Calculating your design...
            </h3>
          </div>
        </div>
      )}

      {/* Complete overlay */}
      {phase === "complete" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 text-center max-w-md mx-4">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-bold text-violet-700 mb-2">
              Great Design!
            </h3>
            <div className="text-slate-600 mb-4">
              <p className="mb-2">
                Room Area: {challenge.roomWidth} x {challenge.roomHeight} ={" "}
                {totalArea} square units
              </p>
              <p className="mb-2">
                Furniture Area: {furnitureArea} square units
              </p>
              <p className="mb-2">
                Free Floor Space: {remainingSpace} square units
              </p>
              <p className="mb-2">Budget Used: ${totalCost} / ${challenge.budget}</p>
            </div>
            <div className="text-2xl font-bold text-amber-600 mb-4">
              Total Score: {score}
            </div>
            {!allComplete && (
              <button
                onClick={handleNextChallenge}
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-lg px-6 py-3 text-base transition-colors cursor-pointer"
              >
                Next Challenge
              </button>
            )}
            {allComplete && (
              <button
                onClick={() => setPhase("designing")}
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-lg px-6 py-3 text-base transition-colors cursor-pointer"
              >
                View Results
              </button>
            )}
          </div>
        </div>
      )}

      {/* Educational tip */}
      {phase === "designing" && (
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
          <span className="font-bold">Math Tip:</span> To find the area of a rectangle,
          multiply length times width. A room that is 6 units x 4 units has an area of
          6 x 4 = 24 square units!
        </div>
      )}
    </div>
  );
}
