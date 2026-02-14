import { useState, useCallback, useEffect } from "react";

// ---- Types ----

type Suit = "♠" | "♥" | "♦" | "♣";
type Value = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";

interface Card {
  suit: Suit;
  value: Value;
  id: string;
}

type Phase = "intro" | "picking" | "gathering" | "reveal";

// ---- Helpers ----

const SUITS: Suit[] = ["♠", "♥", "♦", "♣"];
const VALUES: Value[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function isRed(suit: Suit): boolean {
  return suit === "♥" || suit === "♦";
}

function buildDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const value of VALUES) {
      deck.push({ suit, value, id: `${value}${suit}` });
    }
  }
  return deck;
}

function shuffle(arr: Card[]): Card[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function dealToColumns(cards: Card[]): [Card[], Card[], Card[]] {
  const cols: [Card[], Card[], Card[]] = [[], [], []];
  for (let i = 0; i < cards.length; i++) {
    cols[i % 3].push(cards[i]);
  }
  return cols;
}

function gatherWithMiddle(
  columns: [Card[], Card[], Card[]],
  chosenCol: number
): Card[] {
  const order = [0, 1, 2].filter((c) => c !== chosenCol);
  // chosen column goes in the middle
  return [...columns[order[0]], ...columns[chosenCol], ...columns[order[1]]];
}

// ---- Sub-components ----

function PlayingCard({
  card,
  highlighted,
  small,
}: {
  card: Card;
  highlighted: boolean;
  small: boolean;
}) {
  const red = isRed(card.suit);
  const color = red ? "#dc2626" : "#1e293b";

  const width = small ? 52 : 68;
  const height = small ? 76 : 100;
  const fontSize = small ? 13 : 16;
  const suitSize = small ? 18 : 24;

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 8,
        background: highlighted
          ? "linear-gradient(135deg, #fef08a, #fbbf24)"
          : "#fff",
        border: highlighted ? "3px solid #f59e0b" : "2px solid #cbd5e1",
        boxShadow: highlighted
          ? "0 0 16px rgba(251,191,36,0.7)"
          : "0 2px 6px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
        color,
        fontFamily: "'Georgia', serif",
        fontWeight: 700,
        userSelect: "none" as const,
        transition: "all 0.3s ease",
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize, lineHeight: 1 }}>{card.value}</span>
      <span style={{ fontSize: suitSize, lineHeight: 1, marginTop: 2 }}>
        {card.suit}
      </span>
    </div>
  );
}

function ColumnDisplay({
  cards,
  colIndex,
  onSelect,
  small,
}: {
  cards: Card[];
  colIndex: number;
  onSelect: (col: number) => void;
  small: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: small ? 4 : 6,
      }}
    >
      <button
        onClick={() => onSelect(colIndex)}
        style={{
          padding: small ? "6px 14px" : "8px 20px",
          borderRadius: 20,
          border: "none",
          background: "linear-gradient(135deg, #f59e0b, #d97706)",
          color: "#fff",
          fontWeight: 700,
          fontSize: small ? 12 : 14,
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          transition: "transform 0.15s ease",
          marginBottom: 4,
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.transform = "scale(1)";
        }}
      >
        This Column!
      </button>
      {cards.map((card) => (
        <PlayingCard key={card.id} card={card} highlighted={false} small={small} />
      ))}
    </div>
  );
}

// ---- Main Component ----

export default function CardTrickSimulator() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [round, setRound] = useState(0); // 0-based, 0..2
  const [cards, setCards] = useState<Card[]>([]);
  const [columns, setColumns] = useState<[Card[], Card[], Card[]]>([[], [], []]);
  const [revealedCard, setRevealedCard] = useState<Card | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  // Responsive check
  useEffect(() => {
    function check() {
      setIsSmall(window.innerWidth < 640);
    }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const startTrick = useCallback(() => {
    const deck = shuffle(buildDeck()).slice(0, 21);
    setCards(deck);
    setColumns(dealToColumns(deck));
    setRound(0);
    setPhase("picking");
    setRevealedCard(null);
    setShowExplanation(false);
  }, []);

  const handleColumnSelect = useCallback(
    (colIndex: number) => {
      // Gather cards with chosen column in the middle
      const gathered = gatherWithMiddle(columns, colIndex);
      setCards(gathered);
      setPhase("gathering");

      const nextRound = round + 1;

      // Brief pause for "gathering" animation, then re-deal or reveal
      setTimeout(() => {
        if (nextRound < 3) {
          const newCols = dealToColumns(gathered);
          setColumns(newCols);
          setRound(nextRound);
          setPhase("picking");
        } else {
          // After 3 rounds, the 11th card (index 10) is the chosen card
          setRevealedCard(gathered[10]);
          setPhase("reveal");
        }
      }, 800);
    },
    [columns, round]
  );

  const resetTrick = useCallback(() => {
    setPhase("intro");
    setCards([]);
    setColumns([[], [], []]);
    setRound(0);
    setRevealedCard(null);
    setShowExplanation(false);
  }, []);

  // ---- Render helpers ----

  const renderIntro = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        padding: isSmall ? 16 : 32,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: isSmall ? 48 : 64 }}>🃏</div>
      <h2
        style={{
          fontSize: isSmall ? 22 : 30,
          fontWeight: 800,
          color: "#fbbf24",
          textShadow: "0 2px 4px rgba(0,0,0,0.4)",
          margin: 0,
        }}
      >
        The Magic 21-Card Trick
      </h2>
      <p
        style={{
          color: "#d1fae5",
          fontSize: isSmall ? 14 : 16,
          maxWidth: 480,
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        Think of a card, tell me which column it is in three times, and I will
        read your mind! This trick uses math, not magic.
      </p>
      <div
        style={{
          background: "rgba(255,255,255,0.1)",
          borderRadius: 12,
          padding: isSmall ? 12 : 16,
          maxWidth: 420,
        }}
      >
        <p style={{ color: "#fef3c7", fontSize: isSmall ? 13 : 14, margin: 0, lineHeight: 1.6 }}>
          <strong>How to play:</strong>
          <br />
          1. I will deal 21 cards into 3 columns
          <br />
          2. Pick any card in your mind (do not tell me!)
          <br />
          3. Click the column your card is in
          <br />
          4. We repeat this 3 times
          <br />
          5. I will guess your card!
        </p>
      </div>
      <button
        onClick={startTrick}
        style={{
          marginTop: 8,
          padding: isSmall ? "12px 32px" : "14px 40px",
          borderRadius: 28,
          border: "none",
          background: "linear-gradient(135deg, #f59e0b, #ef4444)",
          color: "#fff",
          fontWeight: 800,
          fontSize: isSmall ? 16 : 18,
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          transition: "transform 0.15s ease",
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.transform = "scale(1.06)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.transform = "scale(1)";
        }}
      >
        Start the Trick!
      </button>
    </div>
  );

  const renderPicking = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: isSmall ? 8 : 14,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            background: "rgba(251,191,36,0.2)",
            border: "1px solid #fbbf24",
            borderRadius: 20,
            padding: "4px 14px",
            color: "#fef08a",
            fontWeight: 700,
            fontSize: isSmall ? 13 : 15,
          }}
        >
          Round {round + 1} / 3
        </span>
      </div>
      <p
        style={{
          color: "#d1fae5",
          fontSize: isSmall ? 14 : 16,
          margin: 0,
          textAlign: "center",
          fontWeight: 600,
        }}
      >
        Which column is your card in? Click the button above that column.
      </p>
      <div
        style={{
          display: "flex",
          gap: isSmall ? 8 : 16,
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          overflowX: "auto",
          padding: "4px 0",
        }}
      >
        {columns.map((col, i) => (
          <ColumnDisplay
            key={i}
            cards={col}
            colIndex={i}
            onSelect={handleColumnSelect}
            small={isSmall}
          />
        ))}
      </div>
    </div>
  );

  const renderGathering = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        padding: isSmall ? 16 : 32,
      }}
    >
      <div
        style={{
          fontSize: isSmall ? 36 : 48,
          animation: "spin 0.8s ease-in-out",
        }}
      >
        ✨
      </div>
      <p
        style={{
          color: "#fef08a",
          fontSize: isSmall ? 16 : 20,
          fontWeight: 700,
          margin: 0,
          textAlign: "center",
        }}
      >
        Gathering the cards...
      </p>
      <div
        style={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {cards.map((card, i) => (
          <div
            key={card.id}
            style={{
              transition: "all 0.4s ease",
              transitionDelay: `${i * 20}ms`,
              transform: "scale(0.8)",
              opacity: 0.7,
            }}
          >
            <PlayingCard card={card} highlighted={false} small={true} />
          </div>
        ))}
      </div>
    </div>
  );

  const renderReveal = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: isSmall ? 12 : 20,
        padding: isSmall ? 16 : 32,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: isSmall ? 40 : 56 }}>🎉</div>
      <h2
        style={{
          fontSize: isSmall ? 20 : 28,
          fontWeight: 800,
          color: "#fbbf24",
          textShadow: "0 2px 4px rgba(0,0,0,0.4)",
          margin: 0,
        }}
      >
        Your card is...
      </h2>
      {revealedCard && (
        <div
          style={{
            transform: "scale(1.5)",
            margin: isSmall ? "12px 0" : "20px 0",
          }}
        >
          <PlayingCard card={revealedCard} highlighted={true} small={false} />
        </div>
      )}
      <p
        style={{
          color: "#d1fae5",
          fontSize: isSmall ? 14 : 16,
          margin: 0,
          maxWidth: 400,
          lineHeight: 1.5,
        }}
      >
        Was I right? The math never lies!
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={resetTrick}
          style={{
            padding: isSmall ? "10px 24px" : "12px 32px",
            borderRadius: 24,
            border: "none",
            background: "linear-gradient(135deg, #f59e0b, #ef4444)",
            color: "#fff",
            fontWeight: 700,
            fontSize: isSmall ? 14 : 16,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          Try Again!
        </button>
        <button
          onClick={() => setShowExplanation((p) => !p)}
          style={{
            padding: isSmall ? "10px 24px" : "12px 32px",
            borderRadius: 24,
            border: "2px solid #fbbf24",
            background: "transparent",
            color: "#fbbf24",
            fontWeight: 700,
            fontSize: isSmall ? 14 : 16,
            cursor: "pointer",
          }}
        >
          {showExplanation ? "Hide Explanation" : "How Does It Work?"}
        </button>
      </div>

      {showExplanation && (
        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: 12,
            padding: isSmall ? 14 : 20,
            maxWidth: 520,
            textAlign: "left",
            marginTop: 8,
          }}
        >
          <h3
            style={{
              color: "#fbbf24",
              fontSize: isSmall ? 15 : 17,
              margin: "0 0 8px 0",
            }}
          >
            The Math Behind the Magic
          </h3>
          <p style={{ color: "#d1fae5", fontSize: isSmall ? 13 : 14, lineHeight: 1.7, margin: 0 }}>
            When you deal 21 cards into 3 columns and place the chosen column in the
            middle, you guarantee the chosen card is somewhere in positions 8 to 14
            (the middle 7 cards).
          </p>
          <p style={{ color: "#d1fae5", fontSize: isSmall ? 13 : 14, lineHeight: 1.7, margin: "8px 0 0 0" }}>
            After the second round, the card narrows to positions 10 to 12 (the middle
            3). After the third round, it is exactly at position 11 -- right in the
            center of 21 cards.
          </p>
          <p style={{ color: "#d1fae5", fontSize: isSmall ? 13 : 14, lineHeight: 1.7, margin: "8px 0 0 0" }}>
            This works because each time you pick a column and it goes in the middle,
            the card&apos;s possible positions get divided by 3 and centered. After 3
            rounds: 21 / 3 / 3 / 3 converges to exactly 1 position. The 11th card
            is always the one you picked!
          </p>
          <p style={{ color: "#fef08a", fontSize: isSmall ? 13 : 14, fontWeight: 600, margin: "10px 0 0 0" }}>
            This is called the &quot;principle of narrowing&quot; and is based on how
            numbers divide in base 3. Pretty cool, right?
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #064e3b, #065f46, #047857)",
        borderRadius: 16,
        padding: isSmall ? 12 : 20,
        minHeight: 400,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative felt texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.04) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        {phase === "intro" && renderIntro()}
        {phase === "picking" && renderPicking()}
        {phase === "gathering" && renderGathering()}
        {phase === "reveal" && renderReveal()}
      </div>
    </div>
  );
}
