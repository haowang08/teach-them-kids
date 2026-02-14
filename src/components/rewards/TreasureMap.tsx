import { useState, useCallback, useEffect } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Direction = "north" | "south" | "east" | "west";
type ThemeName = "forest" | "beach" | "mountain";
type CellType = "empty" | "tree" | "rock" | "water" | "path" | "treasure" | "start";

interface Position {
  x: number;
  y: number;
}

interface Clue {
  id: number;
  text: string;
  direction: Direction;
  steps: number;
  hint: string;
  mathConcept: string;
}

interface MapTheme {
  id: ThemeName;
  name: string;
  icon: string;
  bgColor: string;
  gridColor: string;
  pathColor: string;
  description: string;
  treasureEmoji: string;
}

interface TreasureMapData {
  id: number;
  theme: ThemeName;
  name: string;
  gridSize: number;
  startPosition: Position;
  treasurePosition: Position;
  clues: Clue[];
  obstacles: { pos: Position; type: CellType }[];
  funFact: string;
  perfectMoves: number;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

// Fibonacci sequence for clues
const FIBONACCI = [1, 1, 2, 3, 5, 8, 13];

// Golden ratio approximations
const PHI = 1.618;

const THEMES: MapTheme[] = [
  {
    id: "forest",
    name: "Enchanted Forest",
    icon: "🌲",
    bgColor: "from-green-900 to-emerald-800",
    gridColor: "border-green-700",
    pathColor: "bg-amber-600",
    description: "Navigate through the mystical woods",
    treasureEmoji: "🏆",
  },
  {
    id: "beach",
    name: "Pirate Cove",
    icon: "🏝️",
    bgColor: "from-cyan-800 to-blue-900",
    gridColor: "border-cyan-700",
    pathColor: "bg-yellow-500",
    description: "Search the sandy shores for treasure",
    treasureEmoji: "💎",
  },
  {
    id: "mountain",
    name: "Dragon's Peak",
    icon: "⛰️",
    bgColor: "from-slate-800 to-stone-900",
    gridColor: "border-slate-600",
    pathColor: "bg-orange-500",
    description: "Climb the ancient mountain paths",
    treasureEmoji: "👑",
  },
];

// Direction vectors
const DIRECTION_VECTORS: Record<Direction, Position> = {
  north: { x: 0, y: -1 },
  south: { x: 0, y: 1 },
  east: { x: 1, y: 0 },
  west: { x: -1, y: 0 },
};

const DIRECTION_ARROWS: Record<Direction, string> = {
  north: "↑",
  south: "↓",
  east: "→",
  west: "←",
};

const DIRECTION_LABELS: Record<Direction, string> = {
  north: "North",
  south: "South",
  east: "East",
  west: "West",
};

// Map data with Fibonacci and nature-based clues
const MAPS: TreasureMapData[] = [
  {
    id: 1,
    theme: "forest",
    name: "Fibonacci Trail",
    gridSize: 8,
    startPosition: { x: 1, y: 6 },
    treasurePosition: { x: 6, y: 1 },
    clues: [
      {
        id: 1,
        text: "Walk 3 steps North",
        direction: "north",
        steps: 3,
        hint: "3 is the 4th Fibonacci number (1, 1, 2, 3...)",
        mathConcept: "Fibonacci",
      },
      {
        id: 2,
        text: "Walk 5 steps East",
        direction: "east",
        steps: 5,
        hint: "5 is the 5th Fibonacci number. Like 5 petals on a buttercup!",
        mathConcept: "Fibonacci",
      },
      {
        id: 3,
        text: "Walk 2 steps North",
        direction: "north",
        steps: 2,
        hint: "2 branches split from many tree trunks - Fibonacci branching!",
        mathConcept: "Fibonacci",
      },
    ],
    obstacles: [
      { pos: { x: 3, y: 4 }, type: "tree" },
      { pos: { x: 4, y: 5 }, type: "tree" },
      { pos: { x: 2, y: 2 }, type: "rock" },
    ],
    funFact: "Fibonacci numbers appear everywhere in nature: flower petals (3, 5, 8, 13), pinecone spirals, and tree branches!",
    perfectMoves: 10,
  },
  {
    id: 2,
    theme: "beach",
    name: "Golden Spiral Bay",
    gridSize: 10,
    startPosition: { x: 0, y: 8 },
    treasurePosition: { x: 8, y: 1 },
    clues: [
      {
        id: 1,
        text: "Walk 5 steps East",
        direction: "east",
        steps: 5,
        hint: "5 appears in starfish arms - nature loves this number!",
        mathConcept: "Fibonacci",
      },
      {
        id: 2,
        text: "Walk 3 steps North",
        direction: "north",
        steps: 3,
        hint: "5 / 3 = 1.666... close to the Golden Ratio (1.618)!",
        mathConcept: "Golden Ratio",
      },
      {
        id: 3,
        text: "Walk 3 steps East",
        direction: "east",
        steps: 3,
        hint: "3 / 2 = 1.5, another Golden Ratio approximation!",
        mathConcept: "Golden Ratio",
      },
      {
        id: 4,
        text: "Walk 4 steps North",
        direction: "north",
        steps: 4,
        hint: "Nautilus shells grow in golden spiral patterns!",
        mathConcept: "Golden Spiral",
      },
    ],
    obstacles: [
      { pos: { x: 3, y: 6 }, type: "water" },
      { pos: { x: 4, y: 6 }, type: "water" },
      { pos: { x: 6, y: 4 }, type: "rock" },
      { pos: { x: 7, y: 7 }, type: "water" },
    ],
    funFact: `The Golden Ratio (phi = ${PHI.toFixed(3)}) creates the most aesthetically pleasing proportions. Ancient Greeks used it in the Parthenon!`,
    perfectMoves: 15,
  },
  {
    id: 3,
    theme: "mountain",
    name: "Fractal Summit",
    gridSize: 12,
    startPosition: { x: 1, y: 10 },
    treasurePosition: { x: 10, y: 2 },
    clues: [
      {
        id: 1,
        text: "Walk 8 steps North",
        direction: "north",
        steps: 8,
        hint: "8 is a Fibonacci number - like 8 spirals in many pinecones!",
        mathConcept: "Fibonacci",
      },
      {
        id: 2,
        text: "Walk 5 steps East",
        direction: "east",
        steps: 5,
        hint: "8 / 5 = 1.6, very close to the Golden Ratio!",
        mathConcept: "Golden Ratio",
      },
      {
        id: 3,
        text: "Walk 3 steps South",
        direction: "south",
        steps: 3,
        hint: "Fractal patterns repeat at different scales, like 3s within 5s within 8s!",
        mathConcept: "Fractals",
      },
      {
        id: 4,
        text: "Walk 2 steps North",
        direction: "north",
        steps: 2,
        hint: "Mountain ranges show fractal branching patterns!",
        mathConcept: "Fractals",
      },
      {
        id: 5,
        text: "Walk 4 steps East",
        direction: "east",
        steps: 4,
        hint: "Lightning bolts branch fractally - same pattern at every scale!",
        mathConcept: "Fractals",
      },
    ],
    obstacles: [
      { pos: { x: 4, y: 5 }, type: "rock" },
      { pos: { x: 5, y: 5 }, type: "rock" },
      { pos: { x: 6, y: 8 }, type: "tree" },
      { pos: { x: 8, y: 3 }, type: "rock" },
      { pos: { x: 3, y: 7 }, type: "tree" },
    ],
    funFact: "Fractals are self-similar patterns that repeat at every scale. Mountains, coastlines, ferns, and even blood vessels all follow fractal geometry!",
    perfectMoves: 22,
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getTheme(themeName: ThemeName): MapTheme {
  return THEMES.find((t) => t.id === themeName) || THEMES[0];
}

function getCellContent(
  x: number,
  y: number,
  map: TreasureMapData,
  playerPos: Position,
  visitedCells: Set<string>,
  showTreasure: boolean
): { emoji: string; bgClass: string } {
  const key = `${x},${y}`;
  const theme = getTheme(map.theme);

  // Player position
  if (playerPos.x === x && playerPos.y === y) {
    return { emoji: "🧭", bgClass: "bg-yellow-400 animate-pulse" };
  }

  // Treasure (only show if revealed)
  if (map.treasurePosition.x === x && map.treasurePosition.y === y) {
    if (showTreasure) {
      return { emoji: theme.treasureEmoji, bgClass: "bg-yellow-300 animate-bounce" };
    }
    return { emoji: "", bgClass: "" };
  }

  // Start position
  if (map.startPosition.x === x && map.startPosition.y === y) {
    return { emoji: "🏁", bgClass: "bg-green-500" };
  }

  // Obstacles
  const obstacle = map.obstacles.find((o) => o.pos.x === x && o.pos.y === y);
  if (obstacle) {
    switch (obstacle.type) {
      case "tree":
        return { emoji: map.theme === "beach" ? "🌴" : "🌲", bgClass: "bg-green-800/50" };
      case "rock":
        return { emoji: "🪨", bgClass: "bg-stone-600/50" };
      case "water":
        return { emoji: "🌊", bgClass: "bg-blue-500/50" };
      default:
        return { emoji: "", bgClass: "" };
    }
  }

  // Visited path
  if (visitedCells.has(key)) {
    return { emoji: "👣", bgClass: `${theme.pathColor}/60` };
  }

  return { emoji: "", bgClass: "" };
}

function positionToKey(pos: Position): string {
  return `${pos.x},${pos.y}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TreasureMap() {
  const [currentMapIndex, setCurrentMapIndex] = useState(0);
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 0, y: 0 });
  const [currentClueIndex, setCurrentClueIndex] = useState(0);
  const [visitedCells, setVisitedCells] = useState<Set<string>>(new Set());
  const [moveCount, setMoveCount] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<"playing" | "clue" | "won" | "allComplete">("clue");
  const [stepsRemaining, setStepsRemaining] = useState(0);
  const [currentDirection, setCurrentDirection] = useState<Direction | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [completedMaps, setCompletedMaps] = useState<boolean[]>([false, false, false]);
  const [showTreasure, setShowTreasure] = useState(false);

  const currentMap = MAPS[currentMapIndex];
  const theme = getTheme(currentMap.theme);
  const currentClue = currentMap.clues[currentClueIndex];

  // Initialize map
  const initializeMap = useCallback((mapIndex: number) => {
    const map = MAPS[mapIndex];
    setPlayerPosition({ ...map.startPosition });
    setCurrentClueIndex(0);
    setVisitedCells(new Set([positionToKey(map.startPosition)]));
    setMoveCount(0);
    setGameState("clue");
    setStepsRemaining(0);
    setCurrentDirection(null);
    setShowHint(false);
    setShowTreasure(false);
  }, []);

  // Initialize on mount and map change
  useEffect(() => {
    initializeMap(currentMapIndex);
  }, [currentMapIndex, initializeMap]);

  // Start following a clue
  const startClue = useCallback(() => {
    if (!currentClue) return;
    setStepsRemaining(currentClue.steps);
    setCurrentDirection(currentClue.direction);
    setGameState("playing");
    setShowHint(false);
  }, [currentClue]);

  // Move player
  const movePlayer = useCallback((direction: Direction) => {
    if (gameState !== "playing") return;
    if (currentDirection && direction !== currentDirection) return;
    if (stepsRemaining <= 0) return;

    const vector = DIRECTION_VECTORS[direction];
    const newX = playerPosition.x + vector.x;
    const newY = playerPosition.y + vector.y;

    // Boundary check
    if (newX < 0 || newX >= currentMap.gridSize || newY < 0 || newY >= currentMap.gridSize) {
      return;
    }

    // Obstacle check
    const isObstacle = currentMap.obstacles.some(
      (o) => o.pos.x === newX && o.pos.y === newY
    );
    if (isObstacle) {
      return;
    }

    // Update position
    const newPos = { x: newX, y: newY };
    setPlayerPosition(newPos);
    setVisitedCells((prev) => {
      const next = new Set(prev);
      next.add(positionToKey(newPos));
      return next;
    });
    setMoveCount((prev) => prev + 1);
    setStepsRemaining((prev) => prev - 1);

    // Check if clue is complete
    if (stepsRemaining - 1 === 0) {
      // Check if this was the last clue
      if (currentClueIndex >= currentMap.clues.length - 1) {
        // Check if at treasure
        if (newX === currentMap.treasurePosition.x && newY === currentMap.treasurePosition.y) {
          setShowTreasure(true);
          // Calculate score based on efficiency using functional update
          const efficiency = Math.max(0, 100 - (moveCount + 1 - currentMap.perfectMoves) * 5);
          const mapBonus = (currentMapIndex + 1) * 50;
          setScore((prev) => prev + efficiency + mapBonus);
          setCompletedMaps((prev) => {
            const next = [...prev];
            next[currentMapIndex] = true;
            return next;
          });
          setGameState("won");
        } else {
          // Not at treasure - wrong path taken
          setCurrentDirection(null);
          setGameState("clue");
        }
      } else {
        // Move to next clue
        setCurrentClueIndex((prev) => prev + 1);
        setCurrentDirection(null);
        setGameState("clue");
      }
    }
  }, [gameState, currentDirection, stepsRemaining, playerPosition, currentMap, currentClueIndex, moveCount, currentMapIndex]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== "playing") return;

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          movePlayer("north");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          movePlayer("south");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          movePlayer("east");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          movePlayer("west");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, movePlayer]);

  // Next map
  const goToNextMap = useCallback(() => {
    const nextIncomplete = completedMaps.findIndex((c, i) => !c && i !== currentMapIndex);
    if (nextIncomplete !== -1) {
      setCurrentMapIndex(nextIncomplete);
    } else if (completedMaps.every(Boolean) || completedMaps.filter(Boolean).length === MAPS.length - 1) {
      setGameState("allComplete");
    }
  }, [completedMaps, currentMapIndex]);

  // Reset game
  const resetGame = useCallback(() => {
    setCurrentMapIndex(0);
    setCompletedMaps([false, false, false]);
    setScore(0);
    setGameState("clue");
    initializeMap(0);
  }, [initializeMap]);

  // All maps complete screen
  if (gameState === "allComplete") {
    return (
      <div className="rounded-xl bg-gradient-to-br from-amber-900 via-yellow-800 to-orange-900 p-6 max-w-2xl mx-auto text-center">
        <div className="text-6xl mb-4">🏆🗺️🏆</div>
        <h2 className="text-2xl font-bold text-yellow-200 mb-2">
          Master Explorer!
        </h2>
        <p className="text-lg text-amber-100 mb-4">
          You found all the treasures using math patterns from nature!
        </p>
        <div className="flex justify-center gap-3 mb-5 flex-wrap">
          {MAPS.map((m) => {
            const t = getTheme(m.theme);
            return (
              <div
                key={m.id}
                className="bg-yellow-900/50 border-2 border-yellow-400 rounded-lg px-3 py-2 text-sm font-semibold text-yellow-200"
              >
                {t.icon} {m.name}
              </div>
            );
          })}
        </div>
        <div className="bg-amber-950/50 rounded-lg p-4 mb-5 max-w-md mx-auto">
          <p className="text-sm text-amber-200 mb-2">
            <strong>Final Score:</strong>{" "}
            <span className="text-yellow-300 text-xl">{score}</span> points
          </p>
          <p className="text-xs text-amber-300">
            You've learned how Fibonacci numbers ({FIBONACCI.slice(0, 7).join(", ")}...),
            the Golden Ratio (phi = {PHI.toFixed(3)}), and fractal patterns appear throughout nature!
          </p>
        </div>
        <button
          onClick={resetGame}
          className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded-lg px-6 py-3 text-base transition-colors cursor-pointer"
        >
          Explore Again
        </button>
      </div>
    );
  }

  return (
    <div className={`rounded-xl bg-gradient-to-br ${theme.bgColor} p-4 sm:p-6 max-w-3xl mx-auto`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">🗺️</span> Treasure Map
          </h2>
          <p className="text-xs text-white/70">Math in Nature</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-yellow-400 bg-yellow-900/50 rounded-full px-3 py-1 border border-yellow-600">
            Score: {score}
          </span>
          <span className="text-sm font-semibold text-white/80 bg-white/10 rounded-full px-3 py-1">
            Moves: {moveCount}
          </span>
        </div>
      </div>

      {/* Map selector pills */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {MAPS.map((m, i) => {
          const t = getTheme(m.theme);
          return (
            <button
              key={m.id}
              onClick={() => {
                if (gameState !== "playing") {
                  setCurrentMapIndex(i);
                }
              }}
              disabled={gameState === "playing"}
              className={`text-xs font-semibold rounded-full px-3 py-1 border-2 transition-colors cursor-pointer
                ${
                  i === currentMapIndex
                    ? "bg-white/20 text-white border-white/50"
                    : completedMaps[i]
                    ? "bg-green-900/50 text-green-300 border-green-500 hover:bg-green-900"
                    : "bg-black/20 text-white/70 border-white/20 hover:border-white/40"
                }
                ${gameState === "playing" ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {completedMaps[i] ? "✓ " : ""}
              {t.icon} {m.name}
            </button>
          );
        })}
      </div>

      {/* Current map info */}
      <div className="bg-black/30 border border-white/20 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              {theme.icon} {currentMap.name}
            </h3>
            <p className="text-xs text-white/70">{theme.description}</p>
          </div>
          <div className="text-xs text-white/60">
            Clue {currentClueIndex + 1} of {currentMap.clues.length}
          </div>
        </div>
      </div>

      {/* Game grid */}
      <div className="bg-black/40 rounded-xl p-2 sm:p-4 mb-4 overflow-x-auto">
        <div
          className="grid gap-0.5 sm:gap-1 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${currentMap.gridSize}, minmax(0, 1fr))`,
            maxWidth: `${currentMap.gridSize * 40}px`,
          }}
        >
          {Array.from({ length: currentMap.gridSize }).map((_, y) =>
            Array.from({ length: currentMap.gridSize }).map((_, x) => {
              const { emoji, bgClass } = getCellContent(
                x,
                y,
                currentMap,
                playerPosition,
                visitedCells,
                showTreasure
              );
              return (
                <div
                  key={`${x}-${y}`}
                  className={`aspect-square flex items-center justify-center text-sm sm:text-lg border ${theme.gridColor} rounded
                    ${bgClass || "bg-black/20"}
                    transition-all duration-200
                  `}
                >
                  {emoji}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Clue display */}
      {gameState === "clue" && currentClue && (
        <div className="bg-amber-900/60 border-2 border-amber-500 rounded-lg p-4 mb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h4 className="text-sm font-bold text-amber-200 mb-1">Clue #{currentClue.id}</h4>
              <p className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                {DIRECTION_ARROWS[currentClue.direction]} {currentClue.text}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs bg-amber-800/50 text-amber-200 px-2 py-1 rounded-full">
                  {currentClue.mathConcept}
                </span>
                <span className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-full">
                  {currentClue.steps} steps
                </span>
              </div>
              {showHint && (
                <div className="bg-amber-950/50 rounded p-2 text-sm text-amber-100">
                  <strong>Hint:</strong> {currentClue.hint}
                </div>
              )}
            </div>
            <button
              onClick={() => setShowHint((prev) => !prev)}
              className="text-amber-300 hover:text-amber-100 text-sm underline cursor-pointer"
            >
              {showHint ? "Hide" : "Show"} Hint
            </button>
          </div>
          <button
            onClick={startClue}
            className="mt-3 w-full bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg px-4 py-2 transition-colors cursor-pointer"
          >
            Start Walking {DIRECTION_ARROWS[currentClue.direction]} {DIRECTION_LABELS[currentClue.direction]}
          </button>
        </div>
      )}

      {/* Active walking state */}
      {gameState === "playing" && currentDirection && (
        <div className="bg-blue-900/60 border-2 border-blue-400 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-sm font-bold text-blue-200">Walking...</h4>
              <p className="text-lg text-white">
                {stepsRemaining} steps remaining {DIRECTION_ARROWS[currentDirection]} {DIRECTION_LABELS[currentDirection]}
              </p>
            </div>
            <div className="text-4xl animate-bounce">
              {DIRECTION_ARROWS[currentDirection]}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 max-w-[180px] mx-auto">
            <div />
            <button
              onClick={() => movePlayer("north")}
              disabled={currentDirection !== "north"}
              className={`p-3 rounded-lg text-xl font-bold transition-colors cursor-pointer
                ${currentDirection === "north"
                  ? "bg-blue-500 hover:bg-blue-400 text-white"
                  : "bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}
            >
              ↑
            </button>
            <div />
            <button
              onClick={() => movePlayer("west")}
              disabled={currentDirection !== "west"}
              className={`p-3 rounded-lg text-xl font-bold transition-colors cursor-pointer
                ${currentDirection === "west"
                  ? "bg-blue-500 hover:bg-blue-400 text-white"
                  : "bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}
            >
              ←
            </button>
            <div className="p-3 rounded-lg bg-gray-800 text-center text-white text-sm">
              {stepsRemaining}
            </div>
            <button
              onClick={() => movePlayer("east")}
              disabled={currentDirection !== "east"}
              className={`p-3 rounded-lg text-xl font-bold transition-colors cursor-pointer
                ${currentDirection === "east"
                  ? "bg-blue-500 hover:bg-blue-400 text-white"
                  : "bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}
            >
              →
            </button>
            <div />
            <button
              onClick={() => movePlayer("south")}
              disabled={currentDirection !== "south"}
              className={`p-3 rounded-lg text-xl font-bold transition-colors cursor-pointer
                ${currentDirection === "south"
                  ? "bg-blue-500 hover:bg-blue-400 text-white"
                  : "bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}
            >
              ↓
            </button>
            <div />
          </div>
          <p className="text-xs text-blue-200 text-center mt-3">
            Use arrow keys or WASD to move, or click the buttons
          </p>
        </div>
      )}

      {/* Victory state */}
      {gameState === "won" && (
        <div className="bg-yellow-900/60 border-2 border-yellow-400 rounded-lg p-4 mb-4 text-center">
          <div className="text-5xl mb-2">{theme.treasureEmoji}✨{theme.treasureEmoji}</div>
          <h3 className="text-2xl font-bold text-yellow-200 mb-2">Treasure Found!</h3>
          <p className="text-white mb-3">
            You completed the {currentMap.name} in {moveCount} moves!
          </p>
          <div className="bg-yellow-950/50 rounded-lg p-3 mb-4 text-left">
            <h4 className="text-sm font-bold text-yellow-300 mb-1">Math in Nature Fact:</h4>
            <p className="text-sm text-yellow-100">{currentMap.funFact}</p>
          </div>
          {completedMaps.every(Boolean) || completedMaps.filter(Boolean).length === MAPS.length ? (
            <button
              onClick={() => setGameState("allComplete")}
              className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded-lg px-6 py-2 transition-colors cursor-pointer"
            >
              View Final Results
            </button>
          ) : (
            <button
              onClick={goToNextMap}
              className="bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg px-6 py-2 transition-colors cursor-pointer"
            >
              Next Map
            </button>
          )}
        </div>
      )}

      {/* Progress bar */}
      <div className="bg-black/30 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between text-xs text-white/70 mb-2">
          <span>Progress</span>
          <span>
            {currentClueIndex + (gameState === "won" ? 1 : 0)} / {currentMap.clues.length} clues
          </span>
        </div>
        <div className="h-2 bg-black/40 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500"
            style={{
              width: `${((currentClueIndex + (gameState === "won" ? 1 : 0)) / currentMap.clues.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Math concepts reference */}
      <div className="bg-black/20 border border-white/10 rounded-lg p-3">
        <h4 className="text-xs font-bold text-white/80 mb-2">Nature's Math Patterns</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div className="bg-black/20 rounded p-2">
            <div className="font-bold text-amber-300 mb-1">Fibonacci Sequence</div>
            <div className="text-white/70 font-mono">{FIBONACCI.slice(0, 7).join(", ")}...</div>
            <div className="text-white/50 text-[10px] mt-1">Found in petals, pinecones, shells</div>
          </div>
          <div className="bg-black/20 rounded p-2">
            <div className="font-bold text-amber-300 mb-1">Golden Ratio (phi)</div>
            <div className="text-white/70 font-mono">{PHI.toFixed(6)}...</div>
            <div className="text-white/50 text-[10px] mt-1">Spirals, proportions, beauty</div>
          </div>
          <div className="bg-black/20 rounded p-2">
            <div className="font-bold text-amber-300 mb-1">Fractals</div>
            <div className="text-white/70">Self-similar patterns</div>
            <div className="text-white/50 text-[10px] mt-1">Trees, mountains, coastlines</div>
          </div>
        </div>
      </div>
    </div>
  );
}
