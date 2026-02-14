import { useState, useCallback } from "react";

// ============================================
// TYPES
// ============================================

type GamePhase = "intro" | "setup" | "monthly" | "complete";

interface BankConfig {
  name: string;
  depositRate: number;
  loanRate: number;
}

interface Depositor {
  id: number;
  name: string;
  amount: number;
}

interface LoanRequest {
  id: number;
  name: string;
  amount: number;
  purpose: string;
  emoji: string;
  approved: boolean | null;
}

interface MonthEvent {
  text: string;
  type: "good" | "bad" | "neutral";
}

interface MonthData {
  depositors: Depositor[];
  loanRequests: LoanRequest[];
  event: MonthEvent | null;
}

interface GameState {
  month: number;
  totalDeposits: number;
  totalLoans: number;
  interestEarned: number;
  interestPaid: number;
  happiness: number;
  monthHistory: { deposits: number; loans: number; profit: number }[];
}

// ============================================
// DATA
// ============================================

const NAMES = [
  "Alice", "Bob", "Carlos", "Diana", "Ethan", "Fatima", "George",
  "Hannah", "Ivan", "Julia", "Kai", "Luna", "Marcus", "Nina",
  "Oscar", "Priya", "Quinn", "Rosa", "Sam", "Tina",
];

const LOAN_PURPOSES: { purpose: string; emoji: string }[] = [
  { purpose: "home repair", emoji: "\u{1F3E0}" },
  { purpose: "car fix", emoji: "\u{1F697}" },
  { purpose: "school tuition", emoji: "\u{1F4DA}" },
  { purpose: "new business", emoji: "\u{1F3EA}" },
];

const RANDOM_EVENTS: MonthEvent[] = [
  { text: "A borrower repaid their loan early! +$150 returned.", type: "good" },
  { text: "A depositor withdrew $100 in savings.", type: "bad" },
  { text: "The town held a festival -- everyone is in a great mood!", type: "good" },
  { text: "A storm hit the area. Some customers are worried.", type: "bad" },
  { text: "A local newspaper featured your bank! New interest in town.", type: "good" },
  { text: "A competing bank opened nearby. Customers are watching closely.", type: "neutral" },
];

// ============================================
// HELPERS
// ============================================

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateMonth(month: number, usedNames: Set<string>): MonthData {
  const numDepositors = randInt(1, 3);
  const depositors: Depositor[] = [];
  for (let i = 0; i < numDepositors; i++) {
    let name = pickRandom(NAMES);
    let attempts = 0;
    while (usedNames.has(name) && attempts < 20) {
      name = pickRandom(NAMES);
      attempts++;
    }
    usedNames.add(name);
    depositors.push({
      id: month * 100 + i,
      name,
      amount: randInt(1, 4) * 50,
    });
  }

  const numLoans = randInt(1, 2);
  const loanRequests: LoanRequest[] = [];
  for (let i = 0; i < numLoans; i++) {
    let name = pickRandom(NAMES);
    let attempts = 0;
    while (usedNames.has(name) && attempts < 20) {
      name = pickRandom(NAMES);
      attempts++;
    }
    usedNames.add(name);
    const lp = pickRandom(LOAN_PURPOSES);
    loanRequests.push({
      id: month * 100 + 50 + i,
      name,
      amount: randInt(1, 5) * 100,
      purpose: lp.purpose,
      emoji: lp.emoji,
      approved: null,
    });
  }

  const event = month > 1 && Math.random() > 0.35 ? pickRandom(RANDOM_EVENTS) : null;

  return { depositors, loanRequests, event };
}

function getStarRating(profit: number, happiness: number, avgReserve: number): number {
  let stars = 0;
  if (profit > 0) stars++;
  if (profit > 50) stars++;
  if (happiness >= 60) stars++;
  if (happiness >= 80) stars++;
  if (avgReserve >= 30) stars++;
  return Math.min(stars, 5);
}

function happinessFace(h: number): string {
  if (h >= 70) return "\u{1F60A}";
  if (h >= 40) return "\u{1F610}";
  return "\u{1F61F}";
}

// ============================================
// STYLES
// ============================================

const colors = {
  bg: "#1A1A2E",
  cardBg: "#2D2D44",
  blue: "#1565C0",
  gold: "#FFD700",
  green: "#4CAF50",
  red: "#F44336",
  text: "#ECEFF1",
  muted: "#90A4AE",
  barBg: "#1A1A2E",
};

const s = {
  container: {
    background: colors.bg,
    color: colors.text,
    minHeight: "100vh",
    padding: "24px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  } as React.CSSProperties,
  card: {
    background: colors.cardBg,
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  } as React.CSSProperties,
  title: {
    fontSize: "28px",
    fontWeight: 700,
    textAlign: "center" as const,
    marginBottom: "8px",
  } as React.CSSProperties,
  subtitle: {
    fontSize: "16px",
    color: colors.muted,
    textAlign: "center" as const,
    marginBottom: "24px",
  } as React.CSSProperties,
  button: {
    background: colors.blue,
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "12px 28px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "transform 0.15s, opacity 0.15s",
  } as React.CSSProperties,
  buttonGreen: {
    background: colors.green,
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "8px 20px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    marginRight: "8px",
  } as React.CSSProperties,
  buttonRed: {
    background: colors.red,
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "8px 20px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  } as React.CSSProperties,
  input: {
    background: colors.barBg,
    border: `2px solid ${colors.blue}`,
    borderRadius: "10px",
    color: colors.text,
    padding: "10px 16px",
    fontSize: "16px",
    width: "100%",
    boxSizing: "border-box" as const,
    marginBottom: "12px",
  } as React.CSSProperties,
  optionBtn: (selected: boolean) =>
    ({
      background: selected ? colors.blue : colors.barBg,
      color: selected ? "#fff" : colors.muted,
      border: `2px solid ${selected ? colors.blue : colors.muted}`,
      borderRadius: "10px",
      padding: "10px 18px",
      fontSize: "15px",
      fontWeight: 600,
      cursor: "pointer",
      marginRight: "8px",
      marginBottom: "8px",
      transition: "all 0.15s",
    }) as React.CSSProperties,
  stat: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
    borderBottom: `1px solid ${colors.barBg}`,
    fontSize: "15px",
  } as React.CSSProperties,
  barOuter: {
    background: colors.barBg,
    borderRadius: "8px",
    height: "22px",
    overflow: "hidden",
    position: "relative" as const,
  } as React.CSSProperties,
  progressDot: (active: boolean, current: boolean) =>
    ({
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      background: current ? colors.gold : active ? colors.green : colors.cardBg,
      border: `3px solid ${current ? colors.gold : active ? colors.green : colors.muted}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      fontWeight: 700,
      color: current || active ? "#fff" : colors.muted,
      transition: "all 0.3s",
    }) as React.CSSProperties,
  loanCard: {
    background: colors.barBg,
    borderRadius: "12px",
    padding: "14px 18px",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap" as const,
    gap: "8px",
  } as React.CSSProperties,
};

// ============================================
// COMPONENT
// ============================================

export default function BankManagerSim() {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [config, setConfig] = useState<BankConfig>({
    name: "",
    depositRate: 2,
    loanRate: 7,
  });
  const [game, setGame] = useState<GameState>({
    month: 1,
    totalDeposits: 500,
    totalLoans: 0,
    interestEarned: 0,
    interestPaid: 0,
    happiness: 75,
    monthHistory: [],
  });
  const [monthData, setMonthData] = useState<MonthData | null>(null);
  const [loansDecided, setLoansDecided] = useState(false);
  const [usedNames] = useState(() => new Set<string>());
  const [showEvent, setShowEvent] = useState(false);

  const reservePercent =
    game.totalDeposits > 0
      ? Math.round(((game.totalDeposits - game.totalLoans) / game.totalDeposits) * 100)
      : 100;

  const profit = game.interestEarned - game.interestPaid;

  const startSetup = useCallback(() => setPhase("setup"), []);

  const startGame = useCallback(() => {
    if (!config.name.trim()) return;
    setPhase("monthly");
    const md = generateMonth(1, usedNames);
    setMonthData(md);
    setLoansDecided(false);
    setShowEvent(false);
  }, [config.name, usedNames]);

  const canApproveLoan = useCallback(
    (loanAmount: number) => {
      const currentLent = game.totalLoans;
      const pendingApproved =
        monthData?.loanRequests
          .filter((l) => l.approved === true)
          .reduce((sum, l) => sum + l.amount, 0) ?? 0;
      const newTotal = currentLent + pendingApproved + loanAmount;
      return newTotal <= game.totalDeposits * 0.8;
    },
    [game.totalDeposits, game.totalLoans, monthData]
  );

  const decideLoan = useCallback(
    (loanId: number, approved: boolean) => {
      if (!monthData) return;
      setMonthData((prev) => {
        if (!prev) return prev;
        const updated = prev.loanRequests.map((l) =>
          l.id === loanId ? { ...l, approved } : l
        );
        return { ...prev, loanRequests: updated };
      });
    },
    [monthData]
  );

  const confirmMonth = useCallback(() => {
    if (!monthData) return;

    const newDeposits = monthData.depositors.reduce((sum, d) => sum + d.amount, 0);
    const approvedLoans = monthData.loanRequests
      .filter((l) => l.approved === true)
      .reduce((sum, l) => sum + l.amount, 0);
    const deniedCount = monthData.loanRequests.filter((l) => l.approved === false).length;

    let depositDelta = newDeposits;
    let loanDelta = approvedLoans;

    // Apply random event effects
    if (monthData.event) {
      if (monthData.event.text.includes("repaid")) {
        loanDelta -= 150;
      } else if (monthData.event.text.includes("withdrew")) {
        depositDelta -= 100;
      }
    }

    const monthInterestEarned = (game.totalLoans + loanDelta) * (config.loanRate / 100 / 12);
    const monthInterestPaid = (game.totalDeposits + depositDelta) * (config.depositRate / 100 / 12);

    let happinessDelta = 0;
    if (approvedLoans > 0) happinessDelta += monthData.loanRequests.filter((l) => l.approved).length * 5;
    if (deniedCount > 0) happinessDelta -= deniedCount * 8;
    if (monthData.event?.type === "good") happinessDelta += 5;
    if (monthData.event?.type === "bad") happinessDelta -= 5;

    const newTotalDeposits = Math.max(0, game.totalDeposits + depositDelta);
    const newTotalLoans = Math.max(0, game.totalLoans + loanDelta);
    const newReserve = newTotalDeposits > 0 ? (newTotalDeposits - newTotalLoans) / newTotalDeposits : 1;
    if (newReserve < 0.25) happinessDelta -= 5;

    setGame((prev) => {
      const newState: GameState = {
        month: prev.month + 1,
        totalDeposits: newTotalDeposits,
        totalLoans: newTotalLoans,
        interestEarned: prev.interestEarned + monthInterestEarned,
        interestPaid: prev.interestPaid + monthInterestPaid,
        happiness: Math.max(0, Math.min(100, prev.happiness + happinessDelta)),
        monthHistory: [
          ...prev.monthHistory,
          {
            deposits: newTotalDeposits,
            loans: newTotalLoans,
            profit: prev.interestEarned + monthInterestEarned - (prev.interestPaid + monthInterestPaid),
          },
        ],
      };

      if (newState.month > 6) {
        setPhase("complete");
      } else {
        const md = generateMonth(newState.month, usedNames);
        setMonthData(md);
        setLoansDecided(false);
        setShowEvent(false);
      }

      return newState;
    });
  }, [monthData, game, config, usedNames]);

  const allLoansDecided =
    monthData?.loanRequests.every((l) => l.approved !== null) ?? false;

  const handleConfirmLoans = useCallback(() => {
    if (allLoansDecided) {
      setLoansDecided(true);
      if (monthData?.event) {
        setShowEvent(true);
      }
    }
  }, [allLoansDecided, monthData]);

  const restart = useCallback(() => {
    setPhase("intro");
    setConfig({ name: "", depositRate: 2, loanRate: 7 });
    setGame({
      month: 1,
      totalDeposits: 500,
      totalLoans: 0,
      interestEarned: 0,
      interestPaid: 0,
      happiness: 75,
      monthHistory: [],
    });
    setMonthData(null);
    setLoansDecided(false);
    usedNames.clear();
    setShowEvent(false);
  }, [usedNames]);

  function couldApproveAny(): boolean {
    if (!monthData) return false;
    return monthData.loanRequests.some(
      (l) => l.approved === null && canApproveLoan(l.amount)
    );
  }

  // ========== RENDER: INTRO ==========
  if (phase === "intro") {
    return (
      <div style={s.container}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "72px", marginBottom: "16px" }}>{"\u{1F3E6}"}</div>
          <div style={s.title}>Bank Manager Simulator</div>
          <div style={s.subtitle}>
            Run your own community bank for 6 months! Manage deposits, approve
            loans, and keep your customers happy.
          </div>
          <div style={{ ...s.card, textAlign: "left" }}>
            <div style={{ fontWeight: 600, marginBottom: "12px", color: colors.gold }}>
              How It Works:
            </div>
            <ul style={{ margin: 0, paddingLeft: "20px", lineHeight: "2" }}>
              <li>Accept deposits from community members</li>
              <li>Approve or deny loan requests</li>
              <li>Keep at least 20% of deposits in reserve</li>
              <li>Earn interest on loans, pay interest on deposits</li>
              <li>Keep customers happy for the best rating!</li>
            </ul>
          </div>
          <button style={s.button} onClick={startSetup}>
            Open Your Bank {"\u{1F511}"}
          </button>
        </div>
      </div>
    );
  }

  // ========== RENDER: SETUP ==========
  if (phase === "setup") {
    return (
      <div style={s.container}>
        <div style={{ maxWidth: "520px", margin: "0 auto" }}>
          <div style={{ fontSize: "48px", textAlign: "center", marginBottom: "8px" }}>
            {"\u{1F3E6}"}
          </div>
          <div style={{ ...s.title, marginBottom: "24px" }}>Set Up Your Bank</div>

          <div style={s.card}>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
              Bank Name
            </label>
            <input
              style={s.input}
              placeholder="e.g. Sunshine Community Bank"
              value={config.name}
              onChange={(e) => setConfig((c) => ({ ...c, name: e.target.value }))}
              maxLength={30}
            />

            <label style={{ fontWeight: 600, display: "block", marginBottom: "8px", marginTop: "16px" }}>
              Deposit Interest Rate (you pay depositors)
            </label>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {[1, 2, 3].map((r) => (
                <button
                  key={r}
                  style={s.optionBtn(config.depositRate === r)}
                  onClick={() => setConfig((c) => ({ ...c, depositRate: r }))}
                >
                  {r}% per year
                </button>
              ))}
            </div>

            <label style={{ fontWeight: 600, display: "block", marginBottom: "8px", marginTop: "16px" }}>
              Loan Interest Rate (borrowers pay you)
            </label>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {[5, 7, 10].map((r) => (
                <button
                  key={r}
                  style={s.optionBtn(config.loanRate === r)}
                  onClick={() => setConfig((c) => ({ ...c, loanRate: r }))}
                >
                  {r}% per year
                </button>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <button
              style={{
                ...s.button,
                opacity: config.name.trim() ? 1 : 0.4,
                cursor: config.name.trim() ? "pointer" : "not-allowed",
              }}
              onClick={startGame}
              disabled={!config.name.trim()}
            >
              Start Managing! {"\u{1F4BC}"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========== RENDER: MONTHLY ==========
  if (phase === "monthly" && monthData) {
    const reserveColor = reservePercent >= 30 ? colors.green : reservePercent >= 20 ? colors.gold : colors.red;

    return (
      <div style={s.container}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "4px" }}>
            <span style={{ fontSize: "32px" }}>{"\u{1F3E6}"}</span>
            <span style={{ fontSize: "22px", fontWeight: 700 }}>{config.name}</span>
          </div>

          {/* Month Progress */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "20px" }}>
            {[1, 2, 3, 4, 5, 6].map((m) => (
              <div key={m} style={s.progressDot(m < game.month, m === game.month)}>
                {m}
              </div>
            ))}
          </div>

          {/* Stats Row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "16px" }}>
            <div style={{ ...s.card, padding: "14px", textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: colors.muted, marginBottom: "4px" }}>Deposits</div>
              <div style={{ fontSize: "20px", fontWeight: 700, color: colors.green }}>${game.totalDeposits.toFixed(0)}</div>
            </div>
            <div style={{ ...s.card, padding: "14px", textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: colors.muted, marginBottom: "4px" }}>Loans Out</div>
              <div style={{ fontSize: "20px", fontWeight: 700, color: colors.blue }}>${game.totalLoans.toFixed(0)}</div>
            </div>
            <div style={{ ...s.card, padding: "14px", textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: colors.muted, marginBottom: "4px" }}>Profit</div>
              <div style={{ fontSize: "20px", fontWeight: 700, color: profit >= 0 ? colors.gold : colors.red }}>
                ${profit.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Reserve + Happiness Meters */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
            <div style={{ ...s.card, padding: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "13px", color: colors.muted }}>Reserve Ratio</span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: reserveColor }}>{reservePercent}%</span>
              </div>
              <div style={s.barOuter}>
                <div
                  style={{
                    height: "100%",
                    width: `${Math.min(100, Math.max(0, reservePercent))}%`,
                    background: reserveColor,
                    borderRadius: "8px",
                    transition: "width 0.4s, background 0.4s",
                  }}
                />
              </div>
              <div style={{ fontSize: "11px", color: colors.muted, marginTop: "4px" }}>
                Min 20% required
              </div>
            </div>
            <div style={{ ...s.card, padding: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "13px", color: colors.muted }}>Happiness</span>
                <span style={{ fontSize: "22px" }}>{happinessFace(game.happiness)}</span>
              </div>
              <div style={s.barOuter}>
                <div
                  style={{
                    height: "100%",
                    width: `${game.happiness}%`,
                    background: game.happiness >= 60 ? colors.green : game.happiness >= 35 ? colors.gold : colors.red,
                    borderRadius: "8px",
                    transition: "width 0.4s, background 0.4s",
                  }}
                />
              </div>
              <div style={{ fontSize: "11px", color: colors.muted, marginTop: "4px" }}>
                {game.happiness}% customer satisfaction
              </div>
            </div>
          </div>

          {/* Balance Sheet Mini Chart */}
          <div style={{ ...s.card, padding: "14px", marginBottom: "16px" }}>
            <div style={{ fontSize: "13px", color: colors.muted, marginBottom: "10px", fontWeight: 600 }}>
              Balance Sheet
            </div>
            <div style={{ display: "flex", alignItems: "end", gap: "6px", height: "60px" }}>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div
                  style={{
                    background: colors.green,
                    borderRadius: "4px 4px 0 0",
                    height: `${Math.min(60, Math.max(8, (game.totalDeposits / Math.max(game.totalDeposits, game.totalLoans, 1)) * 60))}px`,
                    transition: "height 0.4s",
                  }}
                />
                <div style={{ fontSize: "10px", color: colors.muted, marginTop: "4px" }}>Deposits</div>
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div
                  style={{
                    background: colors.blue,
                    borderRadius: "4px 4px 0 0",
                    height: `${Math.min(60, Math.max(4, (game.totalLoans / Math.max(game.totalDeposits, game.totalLoans, 1)) * 60))}px`,
                    transition: "height 0.4s",
                  }}
                />
                <div style={{ fontSize: "10px", color: colors.muted, marginTop: "4px" }}>Loans</div>
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div
                  style={{
                    background: reserveColor,
                    borderRadius: "4px 4px 0 0",
                    height: `${Math.min(60, Math.max(4, (Math.max(0, game.totalDeposits - game.totalLoans) / Math.max(game.totalDeposits, 1)) * 60))}px`,
                    transition: "height 0.4s",
                  }}
                />
                <div style={{ fontSize: "10px", color: colors.muted, marginTop: "4px" }}>Reserves</div>
              </div>
            </div>
          </div>

          {/* New Depositors */}
          <div style={{ ...s.card, marginBottom: "16px" }}>
            <div style={{ fontWeight: 700, marginBottom: "10px", color: colors.green }}>
              {"\u{1F4B0}"} New Deposits This Month
            </div>
            {monthData.depositors.map((d) => (
              <div key={d.id} style={{ ...s.stat }}>
                <span>{d.name} deposited</span>
                <span style={{ fontWeight: 700, color: colors.green }}>${d.amount}</span>
              </div>
            ))}
          </div>

          {/* Loan Requests */}
          <div style={{ ...s.card, marginBottom: "16px" }}>
            <div style={{ fontWeight: 700, marginBottom: "10px", color: colors.blue }}>
              {"\u{1F4DD}"} Loan Requests
            </div>
            {monthData.loanRequests.map((loan) => {
              const couldApprove = canApproveLoan(loan.amount);
              return (
                <div key={loan.id} style={s.loanCard}>
                  <div style={{ flex: 1, minWidth: "180px" }}>
                    <div style={{ fontWeight: 600 }}>
                      {loan.emoji} {loan.name}
                    </div>
                    <div style={{ fontSize: "13px", color: colors.muted }}>
                      ${loan.amount} for {loan.purpose}
                    </div>
                  </div>
                  {loan.approved === null && !loansDecided ? (
                    <div>
                      <button
                        style={{
                          ...s.buttonGreen,
                          opacity: couldApprove ? 1 : 0.4,
                          cursor: couldApprove ? "pointer" : "not-allowed",
                        }}
                        onClick={() => couldApprove && decideLoan(loan.id, true)}
                        disabled={!couldApprove}
                        title={couldApprove ? "Approve loan" : "Not enough reserves"}
                      >
                        Approve {"\u2705"}
                      </button>
                      <button style={s.buttonRed} onClick={() => decideLoan(loan.id, false)}>
                        Deny {"\u274C"}
                      </button>
                    </div>
                  ) : (
                    <span
                      style={{
                        fontWeight: 700,
                        color: loan.approved ? colors.green : colors.red,
                        fontSize: "14px",
                      }}
                    >
                      {loan.approved ? "\u2705 Approved" : "\u274C Denied"}
                    </span>
                  )}
                </div>
              );
            })}
            {!couldApproveAny() && !loansDecided && (
              <div style={{ fontSize: "13px", color: colors.red, marginTop: "8px" }}>
                {"\u26A0\uFE0F"} Some loans cannot be approved -- reserves would drop below 20%.
              </div>
            )}
          </div>

          {/* Random Event */}
          {loansDecided && showEvent && monthData.event && (
            <div
              style={{
                ...s.card,
                borderLeft: `4px solid ${
                  monthData.event.type === "good" ? colors.green : monthData.event.type === "bad" ? colors.red : colors.gold
                }`,
                marginBottom: "16px",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: "6px" }}>
                {"\u{1F4F0}"} News Flash!
              </div>
              <div style={{ fontSize: "15px" }}>{monthData.event.text}</div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ textAlign: "center", marginTop: "8px", marginBottom: "24px" }}>
            {!loansDecided ? (
              <button
                style={{
                  ...s.button,
                  opacity: allLoansDecided ? 1 : 0.4,
                  cursor: allLoansDecided ? "pointer" : "not-allowed",
                }}
                onClick={handleConfirmLoans}
                disabled={!allLoansDecided}
              >
                Confirm Decisions {"\u2705"}
              </button>
            ) : (
              <button style={{ ...s.button, background: colors.gold, color: "#1A1A2E" }} onClick={confirmMonth}>
                {game.month < 6 ? `Advance to Month ${game.month + 1} \u27A1\uFE0F` : "View Final Report \u{1F4CA}"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ========== RENDER: COMPLETE ==========
  if (phase === "complete") {
    const avgReserve =
      game.monthHistory.length > 0
        ? game.monthHistory.reduce((sum, m) => {
            const res = m.deposits > 0 ? ((m.deposits - m.loans) / m.deposits) * 100 : 100;
            return sum + res;
          }, 0) / game.monthHistory.length
        : 100;
    const stars = getStarRating(profit, game.happiness, avgReserve);
    const isBestBanker = profit > 0 && game.happiness >= 70;

    return (
      <div style={s.container}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "64px", marginBottom: "8px" }}>{"\u{1F3E6}"}</div>
          <div style={s.title}>6-Month Report Card</div>
          <div style={{ ...s.subtitle, marginBottom: "20px" }}>{config.name}</div>

          {/* Stars */}
          <div style={{ fontSize: "36px", marginBottom: "20px", letterSpacing: "6px" }}>
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} style={{ opacity: i < stars ? 1 : 0.2 }}>
                {"\u2B50"}
              </span>
            ))}
          </div>

          {/* Stats Card */}
          <div style={{ ...s.card, textAlign: "left" }}>
            <div style={s.stat}>
              <span>Total Deposits</span>
              <span style={{ fontWeight: 700, color: colors.green }}>${game.totalDeposits.toFixed(0)}</span>
            </div>
            <div style={s.stat}>
              <span>Total Loans Outstanding</span>
              <span style={{ fontWeight: 700, color: colors.blue }}>${game.totalLoans.toFixed(0)}</span>
            </div>
            <div style={s.stat}>
              <span>Interest Earned</span>
              <span style={{ fontWeight: 700, color: colors.gold }}>${game.interestEarned.toFixed(2)}</span>
            </div>
            <div style={s.stat}>
              <span>Interest Paid</span>
              <span style={{ fontWeight: 700, color: colors.red }}>${game.interestPaid.toFixed(2)}</span>
            </div>
            <div style={{ ...s.stat, borderBottom: "none", paddingTop: "10px" }}>
              <span style={{ fontWeight: 700 }}>Net Profit</span>
              <span style={{ fontWeight: 700, fontSize: "18px", color: profit >= 0 ? colors.gold : colors.red }}>
                ${profit.toFixed(2)}
              </span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
            <div style={{ ...s.card, padding: "16px" }}>
              <div style={{ fontSize: "32px" }}>{happinessFace(game.happiness)}</div>
              <div style={{ fontSize: "13px", color: colors.muted, marginTop: "4px" }}>Customer Happiness</div>
              <div style={{ fontWeight: 700, fontSize: "20px" }}>{game.happiness}%</div>
            </div>
            <div style={{ ...s.card, padding: "16px" }}>
              <div style={{ fontSize: "32px" }}>{reservePercent >= 20 ? "\u{1F6E1}\uFE0F" : "\u26A0\uFE0F"}</div>
              <div style={{ fontSize: "13px", color: colors.muted, marginTop: "4px" }}>Reserve Health</div>
              <div style={{ fontWeight: 700, fontSize: "20px", color: reservePercent >= 20 ? colors.green : colors.red }}>
                {reservePercent}%
              </div>
            </div>
          </div>

          {/* Monthly History Chart */}
          {game.monthHistory.length > 0 && (
            <div style={{ ...s.card, padding: "16px", marginBottom: "16px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: colors.muted, marginBottom: "12px" }}>
                Monthly Growth
              </div>
              <div style={{ display: "flex", alignItems: "end", gap: "8px", height: "80px" }}>
                {game.monthHistory.map((m, i) => {
                  const maxDep = Math.max(...game.monthHistory.map((h) => h.deposits), 1);
                  return (
                    <div key={i} style={{ flex: 1, textAlign: "center" }}>
                      <div
                        style={{
                          background: colors.green,
                          borderRadius: "4px 4px 0 0",
                          height: `${Math.max(6, (m.deposits / maxDep) * 70)}px`,
                          marginBottom: "2px",
                        }}
                      />
                      <div style={{ fontSize: "10px", color: colors.muted }}>M{i + 1}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Badge */}
          {isBestBanker && (
            <div
              style={{
                ...s.card,
                background: "linear-gradient(135deg, #2D2D44, #3D3D5C)",
                border: `2px solid ${colors.gold}`,
                padding: "20px",
                marginBottom: "16px",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "8px" }}>{"\u{1F3C6}"}</div>
              <div style={{ fontSize: "20px", fontWeight: 700, color: colors.gold }}>Best Banker Award!</div>
              <div style={{ fontSize: "14px", color: colors.muted, marginTop: "6px" }}>
                You ran a profitable bank while keeping your community happy. Outstanding work!
              </div>
            </div>
          )}

          <div style={{ marginBottom: "16px", fontSize: "14px", color: colors.muted, lineHeight: "1.6" }}>
            {profit > 0
              ? "Great job! Your bank made money by charging more interest on loans than you paid on deposits."
              : "Your bank lost money this time. Try adjusting your interest rates or approving more good loans!"}
            {" "}
            {game.happiness >= 70
              ? "Your customers loved your service!"
              : game.happiness >= 40
              ? "Your customers were satisfied but could be happier."
              : "Some customers were unhappy. Try approving more loans next time!"}
          </div>

          <button style={s.button} onClick={restart}>
            Play Again {"\u{1F504}"}
          </button>
        </div>
      </div>
    );
  }

  return null;
}
