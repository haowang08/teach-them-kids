import { useState, useCallback, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Position {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

interface Character {
  id: string;
  name: string;
  emoji: string;
  poses: { id: string; name: string; variant: string }[];
}

interface Prop {
  id: string;
  name: string;
  emoji: string;
}

interface PlacedItem {
  id: string;
  type: "character" | "prop";
  itemId: string;
  poseId?: string;
  position: Position;
  scale: number;
  flipped: boolean;
}

interface Bubble {
  id: string;
  type: "speech" | "thought" | "shout";
  text: string;
  position: Position;
  tailDirection: "left" | "right" | "bottom";
}

interface Panel {
  id: string;
  background: string;
  items: PlacedItem[];
  bubbles: Bubble[];
}

type LayoutType = "1" | "2-horizontal" | "2-vertical" | "3" | "4";

interface ComicState {
  layout: LayoutType;
  panels: Panel[];
  title: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const CHARACTERS: Character[] = [
  {
    id: "hero",
    name: "Super Hero",
    emoji: "🦸",
    poses: [
      { id: "standing", name: "Standing", variant: "🦸" },
      { id: "flying", name: "Flying", variant: "🦸‍♂️" },
      { id: "power", name: "Power Pose", variant: "💪" },
      { id: "thinking", name: "Thinking", variant: "🤔" },
    ],
  },
  {
    id: "villain",
    name: "Villain",
    emoji: "🦹",
    poses: [
      { id: "standing", name: "Standing", variant: "🦹" },
      { id: "evil", name: "Evil Laugh", variant: "😈" },
      { id: "scheming", name: "Scheming", variant: "🤨" },
      { id: "defeated", name: "Defeated", variant: "😵" },
    ],
  },
  {
    id: "sidekick",
    name: "Sidekick",
    emoji: "🧒",
    poses: [
      { id: "standing", name: "Standing", variant: "🧒" },
      { id: "excited", name: "Excited", variant: "🙌" },
      { id: "worried", name: "Worried", variant: "😰" },
      { id: "determined", name: "Determined", variant: "😤" },
    ],
  },
  {
    id: "robot",
    name: "Robot",
    emoji: "🤖",
    poses: [
      { id: "standing", name: "Standing", variant: "🤖" },
      { id: "scanning", name: "Scanning", variant: "👁️" },
      { id: "broken", name: "Broken", variant: "🔧" },
      { id: "happy", name: "Happy", variant: "😊" },
    ],
  },
  {
    id: "alien",
    name: "Alien",
    emoji: "👽",
    poses: [
      { id: "standing", name: "Standing", variant: "👽" },
      { id: "waving", name: "Waving", variant: "👋" },
      { id: "confused", name: "Confused", variant: "🤷" },
      { id: "zapping", name: "Zapping", variant: "⚡" },
    ],
  },
];

const PROPS: Prop[] = [
  { id: "explosion", name: "Explosion", emoji: "💥" },
  { id: "lightning", name: "Lightning", emoji: "⚡" },
  { id: "star", name: "Star", emoji: "⭐" },
  { id: "fire", name: "Fire", emoji: "🔥" },
  { id: "shield", name: "Shield", emoji: "🛡️" },
  { id: "sword", name: "Sword", emoji: "⚔️" },
  { id: "rocket", name: "Rocket", emoji: "🚀" },
  { id: "gem", name: "Power Gem", emoji: "💎" },
  { id: "cloud", name: "Cloud", emoji: "☁️" },
  { id: "heart", name: "Heart", emoji: "❤️" },
  { id: "question", name: "Question", emoji: "❓" },
  { id: "exclaim", name: "Exclaim", emoji: "❗" },
];

const BACKGROUNDS = [
  { id: "city", name: "City", gradient: "linear-gradient(to bottom, #87CEEB 0%, #87CEEB 60%, #4a5568 60%, #2d3748 100%)", emoji: "🏙️" },
  { id: "space", name: "Space", gradient: "linear-gradient(to bottom, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", emoji: "🌌" },
  { id: "forest", name: "Forest", gradient: "linear-gradient(to bottom, #87CEEB 0%, #87CEEB 40%, #228B22 40%, #006400 100%)", emoji: "🌲" },
  { id: "desert", name: "Desert", gradient: "linear-gradient(to bottom, #FFD700 0%, #F4A460 50%, #DEB887 100%)", emoji: "🏜️" },
  { id: "underwater", name: "Underwater", gradient: "linear-gradient(to bottom, #006994 0%, #004466 50%, #002233 100%)", emoji: "🌊" },
  { id: "volcano", name: "Volcano", gradient: "linear-gradient(to bottom, #2c1810 0%, #8B0000 50%, #FF4500 100%)", emoji: "🌋" },
  { id: "lab", name: "Lab", gradient: "linear-gradient(to bottom, #e0e0e0 0%, #c0c0c0 50%, #808080 100%)", emoji: "🔬" },
  { id: "sky", name: "Sky", gradient: "linear-gradient(to bottom, #1e90ff 0%, #87CEEB 50%, #ffffff 100%)", emoji: "☁️" },
];

const LAYOUT_OPTIONS: { id: LayoutType; name: string; description: string }[] = [
  { id: "1", name: "Single", description: "1 large panel" },
  { id: "2-horizontal", name: "2 Side", description: "2 panels side by side" },
  { id: "2-vertical", name: "2 Stack", description: "2 panels stacked" },
  { id: "3", name: "3 Panel", description: "Classic 3-panel strip" },
  { id: "4", name: "4 Grid", description: "2x2 grid layout" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function createEmptyPanel(): Panel {
  return {
    id: generateId(),
    background: BACKGROUNDS[0].gradient,
    items: [],
    bubbles: [],
  };
}

function getPanelCount(layout: LayoutType): number {
  switch (layout) {
    case "1": return 1;
    case "2-horizontal":
    case "2-vertical": return 2;
    case "3": return 3;
    case "4": return 4;
    default: return 1;
  }
}

function getCharacterEmoji(itemId: string, poseId?: string): string {
  const character = CHARACTERS.find((c) => c.id === itemId);
  if (!character) return "?";
  if (poseId) {
    const pose = character.poses.find((p) => p.id === poseId);
    return pose?.variant ?? character.emoji;
  }
  return character.emoji;
}

function getPropEmoji(itemId: string): string {
  const prop = PROPS.find((p) => p.id === itemId);
  return prop?.emoji ?? "?";
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function BubbleComponent({
  bubble,
  isSelected,
  onClick,
  onTextChange,
}: {
  bubble: Bubble;
  isSelected: boolean;
  onClick: () => void;
  onTextChange: (text: string) => void;
}) {
  const getBubbleStyle = () => {
    const base: React.CSSProperties = {
      position: "absolute",
      left: `${bubble.position.x}%`,
      top: `${bubble.position.y}%`,
      transform: "translate(-50%, -50%)",
      minWidth: 60,
      maxWidth: 120,
      padding: "8px 12px",
      fontSize: 11,
      fontWeight: 600,
      textAlign: "center",
      cursor: "pointer",
      zIndex: 10,
    };

    switch (bubble.type) {
      case "speech":
        return {
          ...base,
          background: "#fff",
          border: "2px solid #333",
          borderRadius: 16,
        };
      case "thought":
        return {
          ...base,
          background: "#fff",
          border: "2px solid #666",
          borderRadius: "50%",
        };
      case "shout":
        return {
          ...base,
          background: "#FFD700",
          border: "3px solid #FF4500",
          borderRadius: 4,
          fontWeight: 800,
          textTransform: "uppercase" as const,
        };
    }
  };

  return (
    <div
      style={getBubbleStyle()}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={isSelected ? "ring-2 ring-blue-500" : ""}
    >
      {isSelected ? (
        <input
          type="text"
          value={bubble.text}
          onChange={(e) => onTextChange(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className="w-full bg-transparent border-none outline-none text-center text-xs"
          placeholder="Type..."
          autoFocus
        />
      ) : (
        <span>{bubble.text || "..."}</span>
      )}
      {/* Bubble tail */}
      {bubble.type === "speech" && (
        <div
          style={{
            position: "absolute",
            bottom: -10,
            [bubble.tailDirection === "left" ? "left" : bubble.tailDirection === "right" ? "right" : "left"]: bubble.tailDirection === "bottom" ? "50%" : 10,
            transform: bubble.tailDirection === "bottom" ? "translateX(-50%)" : "none",
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "12px solid #333",
          }}
        />
      )}
      {bubble.type === "thought" && (
        <>
          <div
            style={{
              position: "absolute",
              bottom: -8,
              left: "50%",
              transform: "translateX(-50%)",
              width: 8,
              height: 8,
              background: "#fff",
              border: "2px solid #666",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -16,
              left: "50%",
              transform: "translateX(-50%)",
              width: 5,
              height: 5,
              background: "#fff",
              border: "2px solid #666",
              borderRadius: "50%",
            }}
          />
        </>
      )}
    </div>
  );
}

function PanelView({
  panel,
  panelIndex,
  isActive,
  selectedItemId,
  selectedBubbleId,
  onPanelClick,
  onItemClick,
  onBubbleClick,
  onBubbleTextChange,
  onDropItem,
}: {
  panel: Panel;
  panelIndex: number;
  isActive: boolean;
  selectedItemId: string | null;
  selectedBubbleId: string | null;
  onPanelClick: () => void;
  onItemClick: (itemId: string) => void;
  onBubbleClick: (bubbleId: string) => void;
  onBubbleTextChange: (bubbleId: string, text: string) => void;
  onDropItem: (panelIndex: number, x: number, y: number) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  const handlePanelClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    onDropItem(panelIndex, Math.max(5, Math.min(95, x)), Math.max(5, Math.min(95, y)));
    onPanelClick();
  };

  return (
    <div
      ref={panelRef}
      className={`relative overflow-hidden border-4 ${isActive ? "border-yellow-400" : "border-gray-800"} rounded-lg cursor-crosshair`}
      style={{
        background: panel.background,
        minHeight: 120,
      }}
      onClick={handlePanelClick}
    >
      {/* Panel number indicator */}
      <div className="absolute top-1 left-1 bg-black/50 text-white text-xs px-2 py-0.5 rounded z-20">
        Panel {panelIndex + 1}
      </div>

      {/* Placed items */}
      {panel.items.map((item) => (
        <div
          key={item.id}
          style={{
            position: "absolute",
            left: `${item.position.x}%`,
            top: `${item.position.y}%`,
            transform: `translate(-50%, -50%) scale(${item.scale}) ${item.flipped ? "scaleX(-1)" : ""}`,
            fontSize: 32 * item.scale,
            cursor: "pointer",
            zIndex: 5,
          }}
          className={selectedItemId === item.id ? "ring-2 ring-blue-500 ring-offset-2 rounded-full" : ""}
          onClick={(e) => {
            e.stopPropagation();
            onItemClick(item.id);
          }}
        >
          {item.type === "character"
            ? getCharacterEmoji(item.itemId, item.poseId)
            : getPropEmoji(item.itemId)}
        </div>
      ))}

      {/* Bubbles */}
      {panel.bubbles.map((bubble) => (
        <BubbleComponent
          key={bubble.id}
          bubble={bubble}
          isSelected={selectedBubbleId === bubble.id}
          onClick={() => onBubbleClick(bubble.id)}
          onTextChange={(text) => onBubbleTextChange(bubble.id, text)}
        />
      ))}

      {/* Empty panel hint */}
      {panel.items.length === 0 && panel.bubbles.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm pointer-events-none">
          Click to add items
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ComicCreator() {
  // Comic state
  const [comic, setComic] = useState<ComicState>(() => ({
    layout: "3",
    panels: [createEmptyPanel(), createEmptyPanel(), createEmptyPanel()],
    title: "My Superhero Comic",
  }));

  // UI state
  const [activePanel, setActivePanel] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedBubbleId, setSelectedBubbleId] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [selectedPose, setSelectedPose] = useState<string | null>(null);
  const [selectedProp, setSelectedProp] = useState<string | null>(null);
  const [selectedBubbleType, setSelectedBubbleType] = useState<"speech" | "thought" | "shout" | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<"characters" | "props" | "bubbles" | "backgrounds">("characters");

  // Change layout
  const handleLayoutChange = useCallback((newLayout: LayoutType) => {
    setComic((prev) => {
      const newPanelCount = getPanelCount(newLayout);
      const currentPanelCount = prev.panels.length;

      let newPanels = [...prev.panels];

      if (newPanelCount > currentPanelCount) {
        // Add panels
        for (let i = currentPanelCount; i < newPanelCount; i++) {
          newPanels.push(createEmptyPanel());
        }
      } else if (newPanelCount < currentPanelCount) {
        // Remove panels (keep content from first panels)
        newPanels = newPanels.slice(0, newPanelCount);
      }

      return {
        ...prev,
        layout: newLayout,
        panels: newPanels,
      };
    });
    setActivePanel(0);
    setSelectedItemId(null);
    setSelectedBubbleId(null);
  }, []);

  // Handle dropping item into panel
  const handleDropItem = useCallback((panelIndex: number, x: number, y: number) => {
    // If a character is selected
    if (selectedCharacter) {
      const newItem: PlacedItem = {
        id: generateId(),
        type: "character",
        itemId: selectedCharacter,
        poseId: selectedPose ?? "standing",
        position: { x, y },
        scale: 1,
        flipped: false,
      };

      setComic((prev) => ({
        ...prev,
        panels: prev.panels.map((panel, idx) =>
          idx === panelIndex
            ? { ...panel, items: [...panel.items, newItem] }
            : panel
        ),
      }));
      setSelectedCharacter(null);
      setSelectedPose(null);
      return;
    }

    // If a prop is selected
    if (selectedProp) {
      const newItem: PlacedItem = {
        id: generateId(),
        type: "prop",
        itemId: selectedProp,
        position: { x, y },
        scale: 1,
        flipped: false,
      };

      setComic((prev) => ({
        ...prev,
        panels: prev.panels.map((panel, idx) =>
          idx === panelIndex
            ? { ...panel, items: [...panel.items, newItem] }
            : panel
        ),
      }));
      setSelectedProp(null);
      return;
    }

    // If a bubble type is selected
    if (selectedBubbleType) {
      const newBubble: Bubble = {
        id: generateId(),
        type: selectedBubbleType,
        text: "",
        position: { x, y },
        tailDirection: "left",
      };

      setComic((prev) => ({
        ...prev,
        panels: prev.panels.map((panel, idx) =>
          idx === panelIndex
            ? { ...panel, bubbles: [...panel.bubbles, newBubble] }
            : panel
        ),
      }));
      setSelectedBubbleType(null);
      setSelectedBubbleId(newBubble.id);
      return;
    }
  }, [selectedCharacter, selectedPose, selectedProp, selectedBubbleType]);

  // Update bubble text
  const handleBubbleTextChange = useCallback((bubbleId: string, text: string) => {
    setComic((prev) => ({
      ...prev,
      panels: prev.panels.map((panel) => ({
        ...panel,
        bubbles: panel.bubbles.map((bubble) =>
          bubble.id === bubbleId ? { ...bubble, text } : bubble
        ),
      })),
    }));
  }, []);

  // Delete selected item
  const handleDeleteSelected = useCallback(() => {
    if (selectedItemId) {
      setComic((prev) => ({
        ...prev,
        panels: prev.panels.map((panel) => ({
          ...panel,
          items: panel.items.filter((item) => item.id !== selectedItemId),
        })),
      }));
      setSelectedItemId(null);
    }
    if (selectedBubbleId) {
      setComic((prev) => ({
        ...prev,
        panels: prev.panels.map((panel) => ({
          ...panel,
          bubbles: panel.bubbles.filter((bubble) => bubble.id !== selectedBubbleId),
        })),
      }));
      setSelectedBubbleId(null);
    }
  }, [selectedItemId, selectedBubbleId]);

  // Scale selected item
  const handleScaleItem = useCallback((delta: number) => {
    if (!selectedItemId) return;
    setComic((prev) => ({
      ...prev,
      panels: prev.panels.map((panel) => ({
        ...panel,
        items: panel.items.map((item) =>
          item.id === selectedItemId
            ? { ...item, scale: Math.max(0.5, Math.min(2, item.scale + delta)) }
            : item
        ),
      })),
    }));
  }, [selectedItemId]);

  // Flip selected item
  const handleFlipItem = useCallback(() => {
    if (!selectedItemId) return;
    setComic((prev) => ({
      ...prev,
      panels: prev.panels.map((panel) => ({
        ...panel,
        items: panel.items.map((item) =>
          item.id === selectedItemId
            ? { ...item, flipped: !item.flipped }
            : item
        ),
      })),
    }));
  }, [selectedItemId]);

  // Change background of active panel
  const handleBackgroundChange = useCallback((gradient: string) => {
    setComic((prev) => ({
      ...prev,
      panels: prev.panels.map((panel, idx) =>
        idx === activePanel
          ? { ...panel, background: gradient }
          : panel
      ),
    }));
  }, [activePanel]);

  // Change bubble tail direction
  const handleBubbleTailChange = useCallback((direction: "left" | "right" | "bottom") => {
    if (!selectedBubbleId) return;
    setComic((prev) => ({
      ...prev,
      panels: prev.panels.map((panel) => ({
        ...panel,
        bubbles: panel.bubbles.map((bubble) =>
          bubble.id === selectedBubbleId
            ? { ...bubble, tailDirection: direction }
            : bubble
        ),
      })),
    }));
  }, [selectedBubbleId]);

  // Clear all
  const handleClearAll = useCallback(() => {
    setComic((prev) => ({
      ...prev,
      panels: prev.panels.map(() => createEmptyPanel()),
    }));
    setSelectedItemId(null);
    setSelectedBubbleId(null);
  }, []);

  // Get layout grid styles
  const getLayoutStyle = (): React.CSSProperties => {
    switch (comic.layout) {
      case "1":
        return { display: "grid", gridTemplateColumns: "1fr", gap: 8 };
      case "2-horizontal":
        return { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 };
      case "2-vertical":
        return { display: "grid", gridTemplateRows: "1fr 1fr", gap: 8 };
      case "3":
        return { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 };
      case "4":
        return { display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 8 };
      default:
        return { display: "grid", gridTemplateColumns: "1fr", gap: 8 };
    }
  };

  // Find selected item for controls
  const selectedItem = comic.panels
    .flatMap((p) => p.items)
    .find((item) => item.id === selectedItemId);

  const selectedBubble = comic.panels
    .flatMap((p) => p.bubbles)
    .find((b) => b.id === selectedBubbleId);

  /* ---- Preview Mode ---- */
  if (showPreview) {
    return (
      <div className="rounded-xl bg-gradient-to-br from-yellow-50 to-red-50 p-4 sm:p-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Comic Preview</h2>
          <button
            onClick={() => setShowPreview(false)}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg px-4 py-2 text-sm transition-colors cursor-pointer"
          >
            Back to Editor
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-black text-gray-900 tracking-wide uppercase">
            {comic.title || "Untitled Comic"}
          </h1>
        </div>

        {/* Comic display */}
        <div
          className="bg-white border-4 border-gray-900 rounded-lg p-2"
          style={getLayoutStyle()}
        >
          {comic.panels.map((panel) => (
            <div
              key={panel.id}
              className="relative overflow-hidden border-2 border-gray-800 rounded"
              style={{
                background: panel.background,
                minHeight: comic.layout === "1" ? 300 : comic.layout === "4" ? 150 : 180,
              }}
            >
              {/* Items */}
              {panel.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    position: "absolute",
                    left: `${item.position.x}%`,
                    top: `${item.position.y}%`,
                    transform: `translate(-50%, -50%) scale(${item.scale}) ${item.flipped ? "scaleX(-1)" : ""}`,
                    fontSize: 40 * item.scale,
                  }}
                >
                  {item.type === "character"
                    ? getCharacterEmoji(item.itemId, item.poseId)
                    : getPropEmoji(item.itemId)}
                </div>
              ))}

              {/* Bubbles */}
              {panel.bubbles.map((bubble) => (
                <BubbleComponent
                  key={bubble.id}
                  bubble={bubble}
                  isSelected={false}
                  onClick={() => {}}
                  onTextChange={() => {}}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Share message */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
          <p className="text-blue-800 text-sm font-semibold">
            Great comic! Show it to your friends and family!
          </p>
          <p className="text-blue-600 text-xs mt-1">
            Tip: Take a screenshot to save your creation!
          </p>
        </div>
      </div>
    );
  }

  /* ---- Editor Mode ---- */
  return (
    <div className="rounded-xl bg-gradient-to-br from-yellow-50 to-red-50 p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-2xl">💥</span> Comic Creator
          </h2>
          <p className="text-xs text-gray-500">Create your superhero comic strip!</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleClearAll}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg px-3 py-1.5 text-xs transition-colors cursor-pointer"
          >
            Clear All
          </button>
          <button
            onClick={() => setShowPreview(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg px-4 py-1.5 text-sm transition-colors cursor-pointer"
          >
            Preview Comic
          </button>
        </div>
      </div>

      {/* Title editor */}
      <div className="mb-4">
        <input
          type="text"
          value={comic.title}
          onChange={(e) => setComic((prev) => ({ ...prev, title: e.target.value }))}
          className="w-full text-lg font-bold text-center bg-white border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-yellow-500 focus:outline-none"
          placeholder="Enter your comic title..."
        />
      </div>

      {/* Layout selector */}
      <div className="mb-4">
        <label className="text-sm font-semibold text-gray-700 mb-2 block">Panel Layout:</label>
        <div className="flex gap-2 flex-wrap">
          {LAYOUT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleLayoutChange(opt.id)}
              className={`px-3 py-2 rounded-lg border-2 text-xs font-semibold transition-all cursor-pointer
                ${comic.layout === opt.id
                  ? "bg-yellow-400 border-yellow-500 text-gray-900"
                  : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
                }
              `}
            >
              <div>{opt.name}</div>
              <div className="text-[10px] opacity-70">{opt.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Comic Canvas */}
        <div className="flex-1">
          <div
            className="bg-white border-4 border-gray-900 rounded-lg p-2"
            style={getLayoutStyle()}
          >
            {comic.panels.map((panel, idx) => (
              <PanelView
                key={panel.id}
                panel={panel}
                panelIndex={idx}
                isActive={activePanel === idx}
                selectedItemId={selectedItemId}
                selectedBubbleId={selectedBubbleId}
                onPanelClick={() => {
                  setActivePanel(idx);
                  if (!selectedCharacter && !selectedProp && !selectedBubbleType) {
                    setSelectedItemId(null);
                    setSelectedBubbleId(null);
                  }
                }}
                onItemClick={(itemId) => {
                  setSelectedItemId(itemId);
                  setSelectedBubbleId(null);
                  setActivePanel(idx);
                }}
                onBubbleClick={(bubbleId) => {
                  setSelectedBubbleId(bubbleId);
                  setSelectedItemId(null);
                  setActivePanel(idx);
                }}
                onBubbleTextChange={handleBubbleTextChange}
                onDropItem={handleDropItem}
              />
            ))}
          </div>

          {/* Selection hint */}
          <div className="mt-2 text-xs text-gray-500 text-center">
            {selectedCharacter && "Click on a panel to place the character"}
            {selectedProp && "Click on a panel to place the prop"}
            {selectedBubbleType && "Click on a panel to add a bubble"}
            {!selectedCharacter && !selectedProp && !selectedBubbleType && "Select a character, prop, or bubble from the toolbar"}
          </div>
        </div>

        {/* Toolbar */}
        <div className="lg:w-72 space-y-3">
          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {(["characters", "props", "bubbles", "backgrounds"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 px-2 rounded-md text-xs font-semibold transition-colors cursor-pointer capitalize
                  ${activeTab === tab ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"}
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="bg-white border border-gray-200 rounded-lg p-3 max-h-64 overflow-y-auto">
            {/* Characters tab */}
            {activeTab === "characters" && (
              <div className="space-y-3">
                <div className="grid grid-cols-5 gap-2">
                  {CHARACTERS.map((char) => (
                    <button
                      key={char.id}
                      onClick={() => {
                        setSelectedCharacter(selectedCharacter === char.id ? null : char.id);
                        setSelectedProp(null);
                        setSelectedBubbleType(null);
                        setSelectedPose(null);
                      }}
                      className={`p-2 rounded-lg border-2 text-2xl transition-all cursor-pointer
                        ${selectedCharacter === char.id
                          ? "border-yellow-500 bg-yellow-50"
                          : "border-gray-200 hover:border-gray-400"
                        }
                      `}
                      title={char.name}
                    >
                      {char.emoji}
                    </button>
                  ))}
                </div>

                {/* Poses for selected character */}
                {selectedCharacter && (
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">
                      {CHARACTERS.find((c) => c.id === selectedCharacter)?.name} Poses:
                    </label>
                    <div className="grid grid-cols-4 gap-1">
                      {CHARACTERS.find((c) => c.id === selectedCharacter)?.poses.map((pose) => (
                        <button
                          key={pose.id}
                          onClick={() => setSelectedPose(pose.id)}
                          className={`p-1.5 rounded border text-lg transition-all cursor-pointer
                            ${selectedPose === pose.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-400"
                            }
                          `}
                          title={pose.name}
                        >
                          {pose.variant}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Props tab */}
            {activeTab === "props" && (
              <div className="grid grid-cols-4 gap-2">
                {PROPS.map((prop) => (
                  <button
                    key={prop.id}
                    onClick={() => {
                      setSelectedProp(selectedProp === prop.id ? null : prop.id);
                      setSelectedCharacter(null);
                      setSelectedBubbleType(null);
                    }}
                    className={`p-2 rounded-lg border-2 text-xl transition-all cursor-pointer
                      ${selectedProp === prop.id
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-gray-200 hover:border-gray-400"
                      }
                    `}
                    title={prop.name}
                  >
                    {prop.emoji}
                  </button>
                ))}
              </div>
            )}

            {/* Bubbles tab */}
            {activeTab === "bubbles" && (
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  {(["speech", "thought", "shout"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedBubbleType(selectedBubbleType === type ? null : type);
                        setSelectedCharacter(null);
                        setSelectedProp(null);
                      }}
                      className={`p-3 rounded-lg border-2 transition-all cursor-pointer text-center
                        ${selectedBubbleType === type
                          ? "border-yellow-500 bg-yellow-50"
                          : "border-gray-200 hover:border-gray-400"
                        }
                      `}
                    >
                      <div className="text-lg">
                        {type === "speech" ? "💬" : type === "thought" ? "💭" : "💢"}
                      </div>
                      <div className="text-xs font-semibold capitalize">{type}</div>
                    </button>
                  ))}
                </div>

                {/* Bubble tail direction (when bubble selected) */}
                {selectedBubble && selectedBubble.type === "speech" && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">
                      Tail Direction:
                    </label>
                    <div className="flex gap-2">
                      {(["left", "right", "bottom"] as const).map((dir) => (
                        <button
                          key={dir}
                          onClick={() => handleBubbleTailChange(dir)}
                          className={`flex-1 py-1 px-2 rounded text-xs font-semibold transition-colors cursor-pointer capitalize
                            ${selectedBubble.tailDirection === dir
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }
                          `}
                        >
                          {dir}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Backgrounds tab */}
            {activeTab === "backgrounds" && (
              <div>
                <p className="text-xs text-gray-500 mb-2">
                  Set background for Panel {activePanel + 1}:
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {BACKGROUNDS.map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => handleBackgroundChange(bg.gradient)}
                      className={`p-2 rounded-lg border-2 transition-all cursor-pointer
                        ${comic.panels[activePanel]?.background === bg.gradient
                          ? "border-yellow-500"
                          : "border-gray-200 hover:border-gray-400"
                        }
                      `}
                      title={bg.name}
                    >
                      <div
                        className="w-full h-8 rounded mb-1"
                        style={{ background: bg.gradient }}
                      />
                      <div className="text-[10px] text-gray-600 text-center">{bg.emoji}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Item controls (when item selected) */}
          {selectedItem && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="text-xs font-semibold text-blue-700 mb-2">Edit Item</h4>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => handleScaleItem(0.1)}
                  className="flex-1 bg-white border border-gray-300 rounded px-2 py-1 text-xs font-semibold hover:bg-gray-50 cursor-pointer"
                >
                  + Size
                </button>
                <button
                  onClick={() => handleScaleItem(-0.1)}
                  className="flex-1 bg-white border border-gray-300 rounded px-2 py-1 text-xs font-semibold hover:bg-gray-50 cursor-pointer"
                >
                  - Size
                </button>
                <button
                  onClick={handleFlipItem}
                  className="flex-1 bg-white border border-gray-300 rounded px-2 py-1 text-xs font-semibold hover:bg-gray-50 cursor-pointer"
                >
                  Flip
                </button>
                <button
                  onClick={handleDeleteSelected}
                  className="bg-red-100 border border-red-300 text-red-700 rounded px-2 py-1 text-xs font-semibold hover:bg-red-200 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          )}

          {/* Bubble controls (when bubble selected) */}
          {selectedBubble && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
              <h4 className="text-xs font-semibold text-purple-700 mb-2">Edit Bubble</h4>
              <button
                onClick={handleDeleteSelected}
                className="w-full bg-red-100 border border-red-300 text-red-700 rounded px-2 py-1 text-xs font-semibold hover:bg-red-200 cursor-pointer"
              >
                Delete Bubble
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">
        <span className="font-bold">Tips: </span>
        Select a character pose or prop, then click on a panel to place it. Click on placed items to select and edit them. Add speech bubbles to give your characters dialogue!
      </div>
    </div>
  );
}
