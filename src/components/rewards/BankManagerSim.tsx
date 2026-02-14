import { useState, useCallback } from "react";

// ============================================
// TYPES
// ============================================
type GamePhase = "intro" | "setup" | "monthly" | "complete";
interface BankConfig { name: string; depositRate: number; loanRate: number }
interface Depositor { id: number; name: string; amount: number }
interface LoanRequest {
  id: number; name: string; amount: number;
  purpose: string; emoji: string; approved: boolean | null;
}
interface MonthEvent { text: string; type: "good" | "bad" | "neutral" }
interface MonthData { depositors: Depositor[]; loanRequests: LoanRequest[]; event: MonthEvent | null }
interface GameState {
  month: number; totalDeposits: number; totalLoans: number;
  interestEarned: number; interestPaid: number; happiness: number;
  monthHistory: { deposits: number; loans: number; profit: number }[];
}

// ============================================
// DATA
// ============================================
const NAMES = [
  "Alice","Bob","Carlos","Diana","Ethan","Fatima","George","Hannah",
  "Ivan","Julia","Kai","Luna","Marcus","Nina","Oscar","Priya","Quinn","Rosa","Sam","Tina",
];
const LOAN_PURPOSES = [
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
const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
const face = (h: number) => (h >= 70 ? "\u{1F60A}" : h >= 40 ? "\u{1F610}" : "\u{1F61F}");

function generateMonth(month: number, used: Set<string>): MonthData {
  const getName = () => {
    let n = pick(NAMES), i = 0;
    while (used.has(n) && i++ < 20) n = pick(NAMES);
    used.add(n);
    return n;
  };
  const depositors = Array.from({ length: randInt(1, 3) }, (_, i) => ({
    id: month * 100 + i, name: getName(), amount: randInt(1, 4) * 50,
  }));
  const loanRequests = Array.from({ length: randInt(1, 2) }, (_, i) => {
    const lp = pick(LOAN_PURPOSES);
    return {
      id: month * 100 + 50 + i, name: getName(), amount: randInt(1, 5) * 100,
      purpose: lp.purpose, emoji: lp.emoji, approved: null as boolean | null,
    };
  });
  const event = month > 1 && Math.random() > 0.35 ? pick(RANDOM_EVENTS) : null;
  return { depositors, loanRequests, event };
}

function getStars(profit: number, happiness: number, avgRes: number) {
  let s = 0;
  if (profit > 0) s++; if (profit > 50) s++;
  if (happiness >= 60) s++; if (happiness >= 80) s++;
  if (avgRes >= 30) s++;
  return Math.min(s, 5);
}

// ============================================
// STYLES
// ============================================
const C = { bg: "#1A1A2E", card: "#2D2D44", blue: "#1565C0", gold: "#FFD700", green: "#4CAF50", red: "#F44336", text: "#ECEFF1", muted: "#90A4AE" };

const S = {
  wrap: { background: C.bg, color: C.text, minHeight: "100vh", padding: "24px", fontFamily: "'Segoe UI',Tahoma,Geneva,Verdana,sans-serif" } as React.CSSProperties,
  card: { background: C.card, borderRadius: "16px", padding: "24px", marginBottom: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" } as React.CSSProperties,
  title: { fontSize: "28px", fontWeight: 700, textAlign: "center" as const, marginBottom: "8px" } as React.CSSProperties,
  sub: { fontSize: "16px", color: C.muted, textAlign: "center" as const, marginBottom: "24px" } as React.CSSProperties,
  btn: { background: C.blue, color: "#fff", border: "none", borderRadius: "12px", padding: "12px 28px", fontSize: "16px", fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
  btnG: { background: C.green, color: "#fff", border: "none", borderRadius: "10px", padding: "8px 20px", fontSize: "14px", fontWeight: 600, cursor: "pointer", marginRight: "8px" } as React.CSSProperties,
  btnR: { background: C.red, color: "#fff", border: "none", borderRadius: "10px", padding: "8px 20px", fontSize: "14px", fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
  input: { background: C.bg, border: `2px solid ${C.blue}`, borderRadius: "10px", color: C.text, padding: "10px 16px", fontSize: "16px", width: "100%", boxSizing: "border-box" as const, marginBottom: "12px" } as React.CSSProperties,
  opt: (sel: boolean) => ({ background: sel ? C.blue : C.bg, color: sel ? "#fff" : C.muted, border: `2px solid ${sel ? C.blue : C.muted}`, borderRadius: "10px", padding: "10px 18px", fontSize: "15px", fontWeight: 600, cursor: "pointer", marginRight: "8px", marginBottom: "8px" }) as React.CSSProperties,
  row: { display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.bg}`, fontSize: "15px" } as React.CSSProperties,
  bar: { background: C.bg, borderRadius: "8px", height: "22px", overflow: "hidden", position: "relative" as const } as React.CSSProperties,
  dot: (done: boolean, cur: boolean) => ({ width: "36px", height: "36px", borderRadius: "50%", background: cur ? C.gold : done ? C.green : C.card, border: `3px solid ${cur ? C.gold : done ? C.green : C.muted}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, color: cur || done ? "#fff" : C.muted }) as React.CSSProperties,
  loan: { background: C.bg, borderRadius: "12px", padding: "14px 18px", marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: "8px" } as React.CSSProperties,
};

// ============================================
// COMPONENT
// ============================================
export default function BankManagerSim() {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [cfg, setCfg] = useState<BankConfig>({ name: "", depositRate: 2, loanRate: 7 });
  const [game, setGame] = useState<GameState>({ month: 1, totalDeposits: 500, totalLoans: 0, interestEarned: 0, interestPaid: 0, happiness: 75, monthHistory: [] });
  const [md, setMd] = useState<MonthData | null>(null);
  const [decided, setDecided] = useState(false);
  const [used] = useState(() => new Set<string>());
  const [eventShown, setEventShown] = useState(false);

  const resPct = game.totalDeposits > 0 ? Math.round(((game.totalDeposits - game.totalLoans) / game.totalDeposits) * 100) : 100;
  const profit = game.interestEarned - game.interestPaid;

  const canApprove = useCallback((amt: number) => {
    const pending = md?.loanRequests.filter(l => l.approved === true).reduce((s, l) => s + l.amount, 0) ?? 0;
    return game.totalLoans + pending + amt <= game.totalDeposits * 0.8;
  }, [game.totalDeposits, game.totalLoans, md]);

  const startGame = useCallback(() => {
    if (!cfg.name.trim()) return;
    setPhase("monthly"); setMd(generateMonth(1, used)); setDecided(false); setEventShown(false);
  }, [cfg.name, used]);

  const decideLoan = useCallback((id: number, ok: boolean) => {
    setMd(p => p ? { ...p, loanRequests: p.loanRequests.map(l => l.id === id ? { ...l, approved: ok } : l) } : p);
  }, []);

  const allDecided = md?.loanRequests.every(l => l.approved !== null) ?? false;

  const confirmLoans = useCallback(() => {
    if (!allDecided) return;
    setDecided(true);
    if (md?.event) setEventShown(true);
  }, [allDecided, md]);

  const advanceMonth = useCallback(() => {
    if (!md) return;
    const newDep = md.depositors.reduce((s, d) => s + d.amount, 0);
    const approved = md.loanRequests.filter(l => l.approved).reduce((s, l) => s + l.amount, 0);
    const denied = md.loanRequests.filter(l => l.approved === false).length;
    let dDep = newDep, dLoan = approved;
    if (md.event?.text.includes("repaid")) dLoan -= 150;
    if (md.event?.text.includes("withdrew")) dDep -= 100;
    // Clamp deposits and loans BEFORE interest calc; ensure loans never exceed deposits (reserves >= 0)
    const nDep = Math.max(0, game.totalDeposits + dDep);
    const nLoan = Math.min(nDep, Math.max(0, game.totalLoans + dLoan));
    const mIE = nLoan * (cfg.loanRate / 100 / 12);
    const mIP = nDep * (cfg.depositRate / 100 / 12);
    let hd = md.loanRequests.filter(l => l.approved).length * 5 - denied * 8;
    if (md.event?.type === "good") hd += 5; if (md.event?.type === "bad") hd -= 5;
    if (nDep > 0 && (nDep - nLoan) / nDep < 0.25) hd -= 5;

    setGame(p => {
      const ns: GameState = {
        month: p.month + 1, totalDeposits: nDep, totalLoans: nLoan,
        interestEarned: p.interestEarned + mIE, interestPaid: p.interestPaid + mIP,
        happiness: Math.max(0, Math.min(100, p.happiness + hd)),
        monthHistory: [...p.monthHistory, { deposits: nDep, loans: nLoan, profit: p.interestEarned + mIE - (p.interestPaid + mIP) }],
      };
      if (ns.month > 6) { setPhase("complete"); }
      else { setMd(generateMonth(ns.month, used)); setDecided(false); setEventShown(false); }
      return ns;
    });
  }, [md, game, cfg, used]);

  const restart = useCallback(() => {
    setPhase("intro"); setCfg({ name: "", depositRate: 2, loanRate: 7 });
    setGame({ month: 1, totalDeposits: 500, totalLoans: 0, interestEarned: 0, interestPaid: 0, happiness: 75, monthHistory: [] });
    setMd(null); setDecided(false); used.clear(); setEventShown(false);
  }, [used]);

  const anyApprovable = md ? md.loanRequests.some(l => l.approved === null && canApprove(l.amount)) : false;

  // ========== INTRO ==========
  if (phase === "intro") return (
    <div style={S.wrap}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 72, marginBottom: 16 }}>{"\u{1F3E6}"}</div>
        <div style={S.title}>Bank Manager Simulator</div>
        <div style={S.sub}>Run your own community bank for 6 months! Manage deposits, approve loans, and keep everyone happy.</div>
        <div style={{ ...S.card, textAlign: "left" }}>
          <div style={{ fontWeight: 600, marginBottom: 12, color: C.gold }}>How It Works:</div>
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: "2" }}>
            <li>Accept deposits from community members</li>
            <li>Approve or deny loan requests</li>
            <li>Keep at least 20% of deposits in reserve</li>
            <li>Earn interest on loans, pay interest on deposits</li>
            <li>Keep customers happy for the best rating!</li>
          </ul>
        </div>
        <button style={S.btn} onClick={() => setPhase("setup")}>Open Your Bank {"\u{1F511}"}</button>
      </div>
    </div>
  );

  // ========== SETUP ==========
  if (phase === "setup") return (
    <div style={S.wrap}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <div style={{ fontSize: 48, textAlign: "center", marginBottom: 8 }}>{"\u{1F3E6}"}</div>
        <div style={{ ...S.title, marginBottom: 24 }}>Set Up Your Bank</div>
        <div style={S.card}>
          <label style={{ fontWeight: 600, display: "block", marginBottom: 8 }}>Bank Name</label>
          <input style={S.input} placeholder="e.g. Sunshine Community Bank" value={cfg.name}
            onChange={e => setCfg(c => ({ ...c, name: e.target.value }))} maxLength={30} />
          <label style={{ fontWeight: 600, display: "block", marginBottom: 8, marginTop: 16 }}>
            Deposit Interest Rate (you pay depositors)
          </label>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {[1, 2, 3].map(r => <button key={r} style={S.opt(cfg.depositRate === r)} onClick={() => setCfg(c => ({ ...c, depositRate: r }))}>{r}% / year</button>)}
          </div>
          <label style={{ fontWeight: 600, display: "block", marginBottom: 8, marginTop: 16 }}>
            Loan Interest Rate (borrowers pay you)
          </label>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {[5, 7, 10].map(r => <button key={r} style={S.opt(cfg.loanRate === r)} onClick={() => setCfg(c => ({ ...c, loanRate: r }))}>{r}% / year</button>)}
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button style={{ ...S.btn, opacity: cfg.name.trim() ? 1 : 0.4 }} onClick={startGame} disabled={!cfg.name.trim()}>
            Start Managing! {"\u{1F4BC}"}
          </button>
        </div>
      </div>
    </div>
  );

  // ========== MONTHLY ==========
  if (phase === "monthly" && md) {
    const rc = resPct >= 30 ? C.green : resPct >= 20 ? C.gold : C.red;
    const hc = game.happiness >= 60 ? C.green : game.happiness >= 35 ? C.gold : C.red;
    const mx = Math.max(game.totalDeposits, game.totalLoans, 1);
    return (
      <div style={S.wrap}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {/* Header + Progress */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 4 }}>
            <span style={{ fontSize: 32 }}>{"\u{1F3E6}"}</span>
            <span style={{ fontSize: 22, fontWeight: 700 }}>{cfg.name}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 20 }}>
            {[1,2,3,4,5,6].map(m => <div key={m} style={S.dot(m < game.month, m === game.month)}>{m}</div>)}
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
            {[
              ["Deposits", `$${game.totalDeposits.toFixed(0)}`, C.green],
              ["Loans Out", `$${game.totalLoans.toFixed(0)}`, C.blue],
              ["Profit", `$${profit.toFixed(2)}`, profit >= 0 ? C.gold : C.red],
            ].map(([label, val, color]) => (
              <div key={label as string} style={{ ...S.card, padding: 14, textAlign: "center" }}>
                <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: color as string }}>{val}</div>
              </div>
            ))}
          </div>

          {/* Reserve + Happiness */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            <div style={{ ...S.card, padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: C.muted }}>Reserve Ratio</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: rc }}>{resPct}%</span>
              </div>
              <div style={S.bar}><div style={{ height: "100%", width: `${Math.min(100, Math.max(0, resPct))}%`, background: rc, borderRadius: 8, transition: "width 0.4s" }} /></div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>Min 20% required</div>
            </div>
            <div style={{ ...S.card, padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: C.muted }}>Happiness</span>
                <span style={{ fontSize: 22 }}>{face(game.happiness)}</span>
              </div>
              <div style={S.bar}><div style={{ height: "100%", width: `${game.happiness}%`, background: hc, borderRadius: 8, transition: "width 0.4s" }} /></div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{game.happiness}% satisfaction</div>
            </div>
          </div>

          {/* Balance Sheet Chart */}
          <div style={{ ...S.card, padding: 14, marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 10, fontWeight: 600 }}>Balance Sheet</div>
            <div style={{ display: "flex", alignItems: "end", gap: 6, height: 60 }}>
              {[
                { v: game.totalDeposits, c: C.green, l: "Deposits" },
                { v: game.totalLoans, c: C.blue, l: "Loans" },
                { v: Math.max(0, game.totalDeposits - game.totalLoans), c: rc, l: "Reserves" },
              ].map(b => (
                <div key={b.l} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ background: b.c, borderRadius: "4px 4px 0 0", height: Math.max(4, (b.v / mx) * 60), transition: "height 0.4s" }} />
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{b.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Depositors */}
          <div style={{ ...S.card, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 10, color: C.green }}>{"\u{1F4B0}"} New Deposits This Month</div>
            {md.depositors.map(d => (
              <div key={d.id} style={S.row}>
                <span>{d.name} deposited</span>
                <span style={{ fontWeight: 700, color: C.green }}>${d.amount}</span>
              </div>
            ))}
          </div>

          {/* Loan Requests */}
          <div style={{ ...S.card, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 10, color: C.blue }}>{"\u{1F4DD}"} Loan Requests</div>
            {md.loanRequests.map(loan => {
              const ok = canApprove(loan.amount);
              return (
                <div key={loan.id} style={S.loan}>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontWeight: 600 }}>{loan.emoji} {loan.name}</div>
                    <div style={{ fontSize: 13, color: C.muted }}>${loan.amount} for {loan.purpose}</div>
                  </div>
                  {loan.approved === null && !decided ? (
                    <div>
                      <button style={{ ...S.btnG, opacity: ok ? 1 : 0.4 }} onClick={() => ok && decideLoan(loan.id, true)}
                        disabled={!ok} title={ok ? "Approve" : "Not enough reserves"}>
                        Approve {"\u2705"}
                      </button>
                      <button style={S.btnR} onClick={() => decideLoan(loan.id, false)}>Deny {"\u274C"}</button>
                    </div>
                  ) : (
                    <span style={{ fontWeight: 700, color: loan.approved ? C.green : C.red, fontSize: 14 }}>
                      {loan.approved ? "\u2705 Approved" : "\u274C Denied"}
                    </span>
                  )}
                </div>
              );
            })}
            {!anyApprovable && !decided && (
              <div style={{ fontSize: 13, color: C.red, marginTop: 8 }}>{"\u26A0\uFE0F"} Some loans cannot be approved -- reserves would drop below 20%.</div>
            )}
          </div>

          {/* Random Event */}
          {decided && eventShown && md.event && (
            <div style={{ ...S.card, borderLeft: `4px solid ${md.event.type === "good" ? C.green : md.event.type === "bad" ? C.red : C.gold}`, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{"\u{1F4F0}"} News Flash!</div>
              <div style={{ fontSize: 15 }}>{md.event.text}</div>
            </div>
          )}

          {/* Actions */}
          <div style={{ textAlign: "center", marginTop: 8, marginBottom: 24 }}>
            {!decided ? (
              <button style={{ ...S.btn, opacity: allDecided ? 1 : 0.4 }} onClick={confirmLoans} disabled={!allDecided}>
                Confirm Decisions {"\u2705"}
              </button>
            ) : (
              <button style={{ ...S.btn, background: C.gold, color: C.bg }} onClick={advanceMonth}>
                {game.month < 6 ? `Advance to Month ${game.month + 1} \u27A1\uFE0F` : "View Final Report \u{1F4CA}"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ========== COMPLETE ==========
  if (phase === "complete") {
    const avgRes = game.monthHistory.length > 0
      ? game.monthHistory.reduce((s, m) => s + (m.deposits > 0 ? ((m.deposits - m.loans) / m.deposits) * 100 : 100), 0) / game.monthHistory.length : 100;
    const stars = getStars(profit, game.happiness, avgRes);
    const best = profit > 0 && game.happiness >= 70;
    const maxD = Math.max(...game.monthHistory.map(h => h.deposits), 1);
    return (
      <div style={S.wrap}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 8 }}>{"\u{1F3E6}"}</div>
          <div style={S.title}>6-Month Report Card</div>
          <div style={{ ...S.sub, marginBottom: 20 }}>{cfg.name}</div>
          <div style={{ fontSize: 36, marginBottom: 20, letterSpacing: 6 }}>
            {Array.from({ length: 5 }, (_, i) => <span key={i} style={{ opacity: i < stars ? 1 : 0.2 }}>{"\u2B50"}</span>)}
          </div>

          {/* Stats */}
          <div style={{ ...S.card, textAlign: "left" }}>
            {[
              ["Total Deposits", `$${game.totalDeposits.toFixed(0)}`, C.green],
              ["Total Loans Outstanding", `$${game.totalLoans.toFixed(0)}`, C.blue],
              ["Interest Earned", `$${game.interestEarned.toFixed(2)}`, C.gold],
              ["Interest Paid", `$${game.interestPaid.toFixed(2)}`, C.red],
            ].map(([l, v, c]) => (
              <div key={l as string} style={S.row}>
                <span>{l}</span><span style={{ fontWeight: 700, color: c as string }}>{v}</span>
              </div>
            ))}
            <div style={{ ...S.row, borderBottom: "none", paddingTop: 10 }}>
              <span style={{ fontWeight: 700 }}>Net Profit</span>
              <span style={{ fontWeight: 700, fontSize: 18, color: profit >= 0 ? C.gold : C.red }}>${profit.toFixed(2)}</span>
            </div>
          </div>

          {/* Happiness + Reserve */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            <div style={{ ...S.card, padding: 16 }}>
              <div style={{ fontSize: 32 }}>{face(game.happiness)}</div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>Customer Happiness</div>
              <div style={{ fontWeight: 700, fontSize: 20 }}>{game.happiness}%</div>
            </div>
            <div style={{ ...S.card, padding: 16 }}>
              <div style={{ fontSize: 32 }}>{resPct >= 20 ? "\u{1F6E1}\uFE0F" : "\u26A0\uFE0F"}</div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>Reserve Health</div>
              <div style={{ fontWeight: 700, fontSize: 20, color: resPct >= 20 ? C.green : C.red }}>{resPct}%</div>
            </div>
          </div>

          {/* Growth Chart */}
          {game.monthHistory.length > 0 && (
            <div style={{ ...S.card, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.muted, marginBottom: 12 }}>Monthly Growth</div>
              <div style={{ display: "flex", alignItems: "end", gap: 8, height: 80 }}>
                {game.monthHistory.map((m, i) => (
                  <div key={i} style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ background: C.green, borderRadius: "4px 4px 0 0", height: Math.max(6, (m.deposits / maxD) * 70), marginBottom: 2 }} />
                    <div style={{ fontSize: 10, color: C.muted }}>M{i + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Badge */}
          {best && (
            <div style={{ ...S.card, background: "linear-gradient(135deg,#2D2D44,#3D3D5C)", border: `2px solid ${C.gold}`, padding: 20, marginBottom: 16 }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>{"\u{1F3C6}"}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.gold }}>Best Banker Award!</div>
              <div style={{ fontSize: 14, color: C.muted, marginTop: 6 }}>
                You ran a profitable bank while keeping your community happy. Outstanding work!
              </div>
            </div>
          )}

          <div style={{ marginBottom: 16, fontSize: 14, color: C.muted, lineHeight: "1.6" }}>
            {profit > 0 ? "Great job! Your bank made money by charging more interest on loans than you paid on deposits."
              : "Your bank lost money this time. Try adjusting your interest rates or approving more good loans!"}{" "}
            {game.happiness >= 70 ? "Your customers loved your service!"
              : game.happiness >= 40 ? "Your customers were satisfied but could be happier."
              : "Some customers were unhappy. Try approving more loans next time!"}
          </div>
          <button style={S.btn} onClick={restart}>Play Again {"\u{1F504}"}</button>
        </div>
      </div>
    );
  }

  return null;
}
