import { useState } from "react";

type PortId = "india" | "indonesia" | "egypt" | "venice";
type SpiceId =
  | "pepper"
  | "cinnamon"
  | "cardamom"
  | "nutmeg"
  | "cloves"
  | "saffron";

interface Port {
  id: PortId;
  name: string;
  flag: string;
  color: string;
  fact: string;
}

interface Spice {
  id: SpiceId;
  name: string;
  emoji: string;
}

const PORTS: Port[] = [
  {
    id: "india",
    name: "Kerala, India",
    flag: "\u{1F1EE}\u{1F1F3}",
    color: "#e07020",
    fact: "Kerala was known as the 'Land of Spices.' Ancient Romans paid fortunes for Indian pepper, calling it 'black gold!'",
  },
  {
    id: "indonesia",
    name: "Maluku Islands, Indonesia",
    flag: "\u{1F1EE}\u{1F1E9}",
    color: "#d04040",
    fact: "The Maluku Islands were called the 'Spice Islands.' For centuries, they were the ONLY place in the world where nutmeg and cloves grew!",
  },
  {
    id: "egypt",
    name: "Alexandria, Egypt",
    flag: "\u{1F1EA}\u{1F1EC}",
    color: "#c0a030",
    fact: "Alexandria was the great crossroads of trade. Spices from the East arrived here before being shipped across the Mediterranean Sea to Europe.",
  },
  {
    id: "venice",
    name: "Venice, Italy",
    flag: "\u{1F3F4}",
    color: "#3060a0",
    fact: "Venice grew incredibly rich by controlling the spice trade to Europe. A pound of nutmeg could buy seven fat oxen in medieval times!",
  },
];

const SPICES: Spice[] = [
  { id: "pepper", name: "Pepper", emoji: "\u{1F336}\u{FE0F}" },
  { id: "cinnamon", name: "Cinnamon", emoji: "\u{1FAD0}" },
  { id: "cardamom", name: "Cardamom", emoji: "\u{1F49A}" },
  { id: "nutmeg", name: "Nutmeg", emoji: "\u{1F7E4}" },
  { id: "cloves", name: "Cloves", emoji: "\u{1F338}" },
  { id: "saffron", name: "Saffron", emoji: "\u{1F9C2}" },
];

const PRICES: Record<SpiceId, Record<PortId, number>> = {
  pepper: { india: 5, indonesia: 8, egypt: 15, venice: 25 },
  cinnamon: { india: 8, indonesia: 10, egypt: 20, venice: 35 },
  cardamom: { india: 6, indonesia: 12, egypt: 18, venice: 30 },
  nutmeg: { india: 15, indonesia: 4, egypt: 20, venice: 40 },
  cloves: { india: 12, indonesia: 5, egypt: 22, venice: 38 },
  saffron: { india: 20, indonesia: 25, egypt: 15, venice: 50 },
};

const TRAVEL_COST = 10;
const GOAL_GOLD = 500;

type Inventory = Record<SpiceId, number>;

const emptyInventory = (): Inventory => ({
  pepper: 0,
  cinnamon: 0,
  cardamom: 0,
  nutmeg: 0,
  cloves: 0,
  saffron: 0,
});

const totalCarried = (inv: Inventory) =>
  Object.values(inv).reduce((a, b) => a + b, 0);

export default function SpiceTrade() {
  const [gold, setGold] = useState(100);
  const [port, setPort] = useState<PortId>("india");
  const [inventory, setInventory] = useState<Inventory>(emptyInventory());
  const [message, setMessage] = useState("");
  const [won, setWon] = useState(false);
  const [started, setStarted] = useState(false);
  const [turns, setTurns] = useState(0);

  const currentPort = PORTS.find((p) => p.id === port)!;

  const buySpice = (spiceId: SpiceId) => {
    const price = PRICES[spiceId][port];
    if (gold < price) {
      setMessage("Not enough gold coins!");
      return;
    }
    setGold((g) => g - price);
    setInventory((inv) => ({ ...inv, [spiceId]: inv[spiceId] + 1 }));
    const spice = SPICES.find((s) => s.id === spiceId)!;
    setMessage(`Bought 1 ${spice.emoji} ${spice.name} for ${price} gold`);
  };

  const sellSpice = (spiceId: SpiceId) => {
    if (inventory[spiceId] <= 0) {
      setMessage("You don't have any to sell!");
      return;
    }
    const price = PRICES[spiceId][port];
    const newGold = gold + price;
    setGold(newGold);
    setInventory((inv) => ({ ...inv, [spiceId]: inv[spiceId] - 1 }));
    const spice = SPICES.find((s) => s.id === spiceId)!;
    setMessage(`Sold 1 ${spice.emoji} ${spice.name} for ${price} gold`);
    if (newGold >= GOAL_GOLD) {
      setWon(true);
    }
  };

  const travelTo = (destId: PortId) => {
    if (gold < TRAVEL_COST) {
      setMessage("Not enough gold to travel! You need 10 gold.");
      return;
    }
    setGold((g) => g - TRAVEL_COST);
    setPort(destId);
    setTurns((t) => t + 1);
    const dest = PORTS.find((p) => p.id === destId)!;
    setMessage(`Sailed to ${dest.flag} ${dest.name}! (-${TRAVEL_COST} gold)`);
  };

  const resetGame = () => {
    setGold(100);
    setPort("india");
    setInventory(emptyInventory());
    setMessage("");
    setWon(false);
    setStarted(false);
    setTurns(0);
  };

  // --- STYLES ---
  const containerStyle: React.CSSProperties = {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    background: "linear-gradient(135deg, #f5e6c8 0%, #e8d5a8 50%, #dcc494 100%)",
    borderRadius: 16,
    padding: "20px",
    maxWidth: 600,
    margin: "0 auto",
    border: "3px solid #b8943e",
    boxShadow: "0 4px 20px rgba(139, 109, 56, 0.3), inset 0 0 40px rgba(184,148,62,0.1)",
    position: "relative",
    overflow: "hidden",
  };

  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    marginBottom: 16,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#5a3e1b",
    margin: 0,
    textShadow: "1px 1px 2px rgba(184,148,62,0.4)",
  };

  const goldBarStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 8,
  };

  const goldStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #ffd700, #daa520)",
    color: "#5a3e1b",
    fontWeight: "bold",
    fontSize: "1.1rem",
    padding: "6px 16px",
    borderRadius: 20,
    border: "2px solid #b8860b",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  };

  const portBadgeStyle: React.CSSProperties = {
    background: currentPort.color,
    color: "#fff",
    fontWeight: "bold",
    fontSize: "0.95rem",
    padding: "6px 14px",
    borderRadius: 20,
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  };

  const messageStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#5a3e1b",
    fontStyle: "italic",
    fontSize: "0.9rem",
    minHeight: 22,
    marginBottom: 8,
  };

  const sectionStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.45)",
    borderRadius: 12,
    padding: "12px 14px",
    marginBottom: 12,
    border: "1px solid rgba(184,148,62,0.3)",
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#6b4c1e",
    margin: "0 0 8px 0",
  };

  const spiceRowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 0",
    borderBottom: "1px solid rgba(184,148,62,0.2)",
    flexWrap: "wrap",
    gap: 4,
  };

  const btnBuy: React.CSSProperties = {
    background: "linear-gradient(135deg, #4caf50, #388e3c)",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "5px 12px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "0.8rem",
    fontFamily: "inherit",
  };

  const btnSell: React.CSSProperties = {
    background: "linear-gradient(135deg, #f57c00, #e65100)",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "5px 12px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "0.8rem",
    fontFamily: "inherit",
  };

  const btnTravel: React.CSSProperties = {
    background: "linear-gradient(135deg, #5c6bc0, #3949ab)",
    color: "#fff",
    border: "2px solid #283593",
    borderRadius: 10,
    padding: "8px 14px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "0.85rem",
    fontFamily: "inherit",
    flex: "1 1 auto",
    minWidth: 120,
    transition: "transform 0.1s",
  };

  const btnDisabled: React.CSSProperties = {
    opacity: 0.5,
    cursor: "not-allowed",
  };

  const factBoxStyle: React.CSSProperties = {
    background: "rgba(139,109,56,0.12)",
    borderRadius: 10,
    padding: "10px 14px",
    marginBottom: 12,
    borderLeft: `4px solid ${currentPort.color}`,
    fontSize: "0.85rem",
    color: "#5a3e1b",
    lineHeight: 1.5,
  };

  const inventoryPillStyle = (count: number): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    background: count > 0 ? "rgba(184,148,62,0.25)" : "rgba(0,0,0,0.05)",
    borderRadius: 16,
    padding: "3px 10px",
    fontSize: "0.82rem",
    color: count > 0 ? "#5a3e1b" : "#a09070",
    fontWeight: count > 0 ? "bold" : "normal",
    margin: 2,
  });

  const progressBarOuter: React.CSSProperties = {
    width: "100%",
    height: 10,
    background: "rgba(0,0,0,0.1)",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 6,
  };

  const progressBarInner: React.CSSProperties = {
    width: `${Math.min((gold / GOAL_GOLD) * 100, 100)}%`,
    height: "100%",
    background: "linear-gradient(90deg, #daa520, #ffd700)",
    borderRadius: 5,
    transition: "width 0.4s ease",
  };

  // --- START SCREEN ---
  if (!started) {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: "3rem", marginBottom: 8 }}>
            {"\u{26F5}"} {"\u{1F336}\u{FE0F}"} {"\u{1F30D}"}
          </div>
          <h2 style={{ ...titleStyle, fontSize: "1.7rem", marginBottom: 12 }}>
            The Spice Trade
          </h2>
          <p
            style={{
              color: "#6b4c1e",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              maxWidth: 420,
              margin: "0 auto 16px",
            }}
          >
            Become a spice merchant! Buy spices where they grow cheaply, sail to
            distant ports, and sell them for a profit. Can you turn your{" "}
            <strong>100 gold coins</strong> into <strong>500</strong>?
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 8,
              marginBottom: 20,
            }}
          >
            {SPICES.map((s) => (
              <span
                key={s.id}
                style={{
                  background: "rgba(255,255,255,0.5)",
                  borderRadius: 12,
                  padding: "4px 10px",
                  fontSize: "0.85rem",
                  color: "#5a3e1b",
                }}
              >
                {s.emoji} {s.name}
              </span>
            ))}
          </div>
          <button
            onClick={() => setStarted(true)}
            style={{
              background: "linear-gradient(135deg, #daa520, #b8860b)",
              color: "#fff",
              border: "2px solid #8b6914",
              borderRadius: 14,
              padding: "12px 36px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: "0 4px 12px rgba(139,109,56,0.4)",
            }}
          >
            {"\u{26F5}"} Set Sail!
          </button>
        </div>
      </div>
    );
  }

  // --- WIN SCREEN ---
  if (won) {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: "3rem", marginBottom: 8 }}>
            {"\u{1F389}"} {"\u{1F451}"} {"\u{1F389}"}
          </div>
          <h2
            style={{
              ...titleStyle,
              fontSize: "1.6rem",
              color: "#b8860b",
              marginBottom: 12,
            }}
          >
            Master Spice Merchant!
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#5a3e1b",
              fontWeight: "bold",
              marginBottom: 4,
            }}
          >
            {"\u{1FA99}"} {gold} Gold Coins in {turns} voyages!
          </p>
          <p
            style={{
              color: "#6b4c1e",
              fontSize: "0.9rem",
              lineHeight: 1.6,
              maxWidth: 440,
              margin: "12px auto 20px",
              background: "rgba(255,255,255,0.5)",
              padding: "12px 16px",
              borderRadius: 12,
            }}
          >
            {"\u{1F4DC}"} <strong>Did you know?</strong> The spice trade was one
            of the most important drivers of exploration in human history.
            Christopher Columbus was actually trying to find a new route to the
            Spice Islands when he reached the Americas in 1492! The desire for
            pepper, cinnamon, and nutmeg literally changed the map of the world.
          </p>
          <button
            onClick={resetGame}
            style={{
              background: "linear-gradient(135deg, #daa520, #b8860b)",
              color: "#fff",
              border: "2px solid #8b6914",
              borderRadius: 14,
              padding: "10px 30px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: "0 4px 12px rgba(139,109,56,0.4)",
            }}
          >
            {"\u{1F504}"} Play Again
          </button>
        </div>
      </div>
    );
  }

  // --- MAIN GAME ---
  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h2 style={titleStyle}>{"\u{26F5}"} The Spice Trade</h2>
      </div>

      {/* Gold & Port */}
      <div style={goldBarStyle}>
        <span style={goldStyle}>
          {"\u{1FA99}"} {gold} Gold
        </span>
        <span style={portBadgeStyle}>
          {currentPort.flag} {currentPort.name}
        </span>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: 10, padding: "0 4px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.75rem",
            color: "#8b6914",
          }}
        >
          <span>Goal: {GOAL_GOLD} gold</span>
          <span>{Math.min(Math.round((gold / GOAL_GOLD) * 100), 100)}%</span>
        </div>
        <div style={progressBarOuter}>
          <div style={progressBarInner} />
        </div>
      </div>

      {/* Message */}
      <div style={messageStyle}>{message}</div>

      {/* Fun Fact */}
      <div style={factBoxStyle}>
        {"\u{1F4D6}"} <strong>Port Fact:</strong> {currentPort.fact}
      </div>

      {/* Inventory */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>
          {"\u{1F392}"} Your Cargo ({totalCarried(inventory)} items)
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {SPICES.map((s) => (
            <span key={s.id} style={inventoryPillStyle(inventory[s.id])}>
              {s.emoji} {inventory[s.id]}
            </span>
          ))}
        </div>
      </div>

      {/* Market */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>
          {"\u{1F3EA}"} Market at {currentPort.name}
        </h3>
        {SPICES.map((spice) => {
          const price = PRICES[spice.id][port];
          const canBuy = gold >= price;
          const canSell = inventory[spice.id] > 0;
          return (
            <div key={spice.id} style={spiceRowStyle}>
              <span
                style={{
                  fontSize: "0.9rem",
                  color: "#5a3e1b",
                  minWidth: 110,
                }}
              >
                {spice.emoji} {spice.name}
              </span>
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "#8b6914",
                  fontWeight: "bold",
                  minWidth: 70,
                  textAlign: "center",
                }}
              >
                {"\u{1FA99}"} {price} each
              </span>
              <span style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={() => buySpice(spice.id)}
                  disabled={!canBuy}
                  style={canBuy ? btnBuy : { ...btnBuy, ...btnDisabled }}
                >
                  Buy
                </button>
                <button
                  onClick={() => sellSpice(spice.id)}
                  disabled={!canSell}
                  style={canSell ? btnSell : { ...btnSell, ...btnDisabled }}
                >
                  Sell
                </button>
              </span>
            </div>
          );
        })}
      </div>

      {/* Travel */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>
          {"\u{1F5FA}\u{FE0F}"} Sail to Another Port (costs {TRAVEL_COST} gold)
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
          }}
        >
          {PORTS.filter((p) => p.id !== port).map((dest) => {
            const canTravel = gold >= TRAVEL_COST;
            return (
              <button
                key={dest.id}
                onClick={() => travelTo(dest.id)}
                disabled={!canTravel}
                style={
                  canTravel ? btnTravel : { ...btnTravel, ...btnDisabled }
                }
              >
                {"\u{26F5}"} {dest.flag} {dest.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset */}
      <div style={{ textAlign: "center", marginTop: 4 }}>
        <button
          onClick={resetGame}
          style={{
            background: "transparent",
            border: "1px solid rgba(184,148,62,0.4)",
            borderRadius: 8,
            padding: "5px 16px",
            fontSize: "0.8rem",
            color: "#8b6914",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {"\u{1F504}"} Start Over
        </button>
      </div>
    </div>
  );
}
