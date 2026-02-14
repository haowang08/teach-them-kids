import { useState, useCallback, useRef } from "react";

// ============================================
// TYPES & DATA
// ============================================

type Phase = "intro" | "planning" | "event" | "temptation" | "complete";
type JarKey = "save" | "spend" | "share";
interface Goal { emoji: string; name: string; cost: number }
interface Evt { emoji: string; text: string; type: "bonus" | "cost"; amount: number; jar: JarKey | "choose" }
interface Tempt { emoji: string; name: string; cost: number }

const GOALS: Goal[] = [
  { emoji: "\uD83C\uDFAE", name: "Game Console", cost: 50 },
  { emoji: "\uD83D\uDEB2", name: "Bicycle", cost: 75 },
  { emoji: "\uD83C\uDFB8", name: "Guitar", cost: 100 },
];
const ALLOWANCE = 15, WEEKS = 8;
const JARS: { key: JarKey; label: string; emoji: string; color: string }[] = [
  { key: "save", label: "Save", emoji: "\uD83D\uDC37", color: "#E91E63" },
  { key: "spend", label: "Spend", emoji: "\uD83D\uDECD\uFE0F", color: "#2196F3" },
  { key: "share", label: "Share", emoji: "\u2764\uFE0F", color: "#F44336" },
];
const EVENTS: Evt[] = [
  { emoji: "\uD83C\uDF82", text: "Birthday money! Grandma sent you $10!", type: "bonus", amount: 10, jar: "choose" },
  { emoji: "\uD83D\uDC94", text: "Oh no! Your favorite toy broke. Repair costs $5.", type: "cost", amount: 5, jar: "spend" },
  { emoji: "\uD83C\uDF55", text: "Pizza party with friends! That costs $3.", type: "cost", amount: 3, jar: "spend" },
  { emoji: "\u2B50", text: "Bonus for good grades! You earned $5!", type: "bonus", amount: 5, jar: "save" },
  { emoji: "\uD83C\uDF1F", text: "You found $3 in your coat pocket!", type: "bonus", amount: 3, jar: "choose" },
  { emoji: "\uD83C\uDF08", text: "Charity bake sale! You donated $2.", type: "cost", amount: 2, jar: "share" },
];
const TEMPTS: Tempt[] = [
  { emoji: "\uD83E\uDDF8", name: "Cool Stuffed Animal", cost: 8 },
  { emoji: "\uD83C\uDF6D", name: "Giant Candy Box", cost: 5 },
  { emoji: "\uD83C\uDFB2", name: "Shiny Board Game", cost: 10 },
  { emoji: "\uD83D\uDE80", name: "Toy Rocket Ship", cost: 7 },
];
const EVENT_WKS = [2, 4, 6], TEMPT_WKS = [3, 5, 7];

// ============================================
// STYLES
// ============================================

const C = { bg: "#1A1A2E", card: "#2D2D44", pink: "#E91E63", gold: "#FFD700", blue: "#2196F3", red: "#F44336", txt: "#FFF", mut: "#9E9EAF", grn: "#4CAF50" };
const btn: React.CSSProperties = { border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 16, fontWeight: 700, cursor: "pointer", color: "#FFF" };
const wrap: React.CSSProperties = { background: C.bg, minHeight: "100vh", padding: 24, color: C.txt, fontFamily: "system-ui, sans-serif" };
const card: React.CSSProperties = { background: C.card, borderRadius: 12, padding: 16, marginBottom: 16 };

// ============================================
// COMPONENT
// ============================================

export default function PiggyBankPlanner() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [goal, setGoal] = useState<Goal | null>(null);
  const [week, setWeek] = useState(1);
  const [jars, setJars] = useState({ save: 0, spend: 0, share: 0 });
  const [alloc, setAlloc] = useState({ save: 5, spend: 5, share: 5 });
  const [evt, setEvt] = useState<Evt | null>(null);
  const [tempt, setTempt] = useState<Tempt | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [used, setUsed] = useState<number[]>([]);
  const [usedTempts, setUsedTempts] = useState<number[]>([]);
  const confirming = useRef(false);

  const advance = useCallback((w: number) => {
    if (w >= WEEKS) setPhase("complete");
    else { setWeek(w + 1); setAlloc({ save: 5, spend: 5, share: 5 }); setPhase("planning"); }
  }, []);

  const adjust = useCallback((jar: JarKey, d: number) => {
    setAlloc(p => {
      const v = p[jar] + d;
      if (v < 0 || v > ALLOWANCE) return p;
      const others = (["save", "spend", "share"] as JarKey[]).filter(j => j !== jar);
      const u = { ...p, [jar]: v };
      const tot = u.save + u.spend + u.share;
      if (tot > ALLOWANCE) { const diff = tot - ALLOWANCE; for (const o of others) if (u[o] >= diff) { u[o] -= diff; break; } }
      else if (tot < ALLOWANCE) u[others[0]] += ALLOWANCE - tot;
      return u.save >= 0 && u.spend >= 0 && u.share >= 0 ? u : p;
    });
  }, []);

  const pickTemptation = useCallback(() => {
    const avail = TEMPTS.filter((_, i) => !usedTempts.includes(i));
    const pool = avail.length ? avail : TEMPTS;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setUsedTempts(p => [...p, TEMPTS.indexOf(pick)]);
    return pick;
  }, [usedTempts]);

  const confirmWeek = useCallback(() => {
    if (confirming.current) return;
    confirming.current = true;
    setJars(p => ({ save: p.save + alloc.save, spend: p.spend + alloc.spend, share: p.share + alloc.share }));
    setLog(p => [...p, `Week ${week}: Saved $${alloc.save}, Spent $${alloc.spend}, Shared $${alloc.share}`]);
    if (EVENT_WKS.includes(week)) {
      const avail = EVENTS.filter((_, i) => !used.includes(i));
      if (avail.length) {
        const pick = avail[Math.floor(Math.random() * avail.length)];
        setUsed(p => [...p, EVENTS.indexOf(pick)]);
        setEvt(pick); setPhase("event"); confirming.current = false; return;
      }
    }
    if (TEMPT_WKS.includes(week)) { setTempt(pickTemptation()); setPhase("temptation"); confirming.current = false; return; }
    if (week >= WEEKS) setPhase("complete"); else { setWeek(w => w + 1); setAlloc({ save: 5, spend: 5, share: 5 }); }
    confirming.current = false;
  }, [alloc, week, used, pickTemptation]);

  const handleEvt = useCallback((chosen?: JarKey) => {
    if (!evt) return;
    setJars(p => {
      const u = { ...p };
      const targetJar: JarKey = evt.jar === "choose" ? (chosen || "save") : evt.jar;
      if (evt.type === "bonus") u[targetJar] += evt.amount;
      else u[targetJar] = Math.max(0, u[targetJar] - evt.amount);
      return u;
    });
    setLog(p => [...p, `${evt.emoji} ${evt.text}`]); setEvt(null);
    if (TEMPT_WKS.includes(week)) { setTempt(pickTemptation()); setPhase("temptation"); }
    else advance(week);
  }, [evt, week, advance, pickTemptation]);

  const handleTempt = useCallback((buy: boolean) => {
    if (!tempt) return;
    if (buy) { setJars(p => ({ ...p, save: Math.max(0, p.save - tempt.cost) })); setLog(p => [...p, `${tempt.emoji} Spent $${tempt.cost} on ${tempt.name}.`]); }
    else setLog(p => [...p, `\uD83D\uDCAA Resisted ${tempt.name}! Great willpower!`]);
    setTempt(null); advance(week);
  }, [tempt, week, advance]);

  const reset = useCallback(() => {
    setPhase("intro"); setGoal(null); setWeek(1); setJars({ save: 0, spend: 0, share: 0 });
    setAlloc({ save: 5, spend: 5, share: 5 }); setEvt(null); setTempt(null); setLog([]); setUsed([]); setUsedTempts([]);
  }, []);

  // --- Shared renderers ---
  const Jar = ({ label, emoji, amt, color, max }: { label: string; emoji: string; amt: number; color: string; max: number }) => {
    const fill = Math.min(100, (amt / max) * 100);
    return (
      <div style={{ textAlign: "center", flex: 1, minWidth: 80 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.mut, marginBottom: 4 }}>{emoji} {label}</div>
        <svg width="64" height="90" viewBox="0 0 64 90" style={{ display: "block", margin: "0 auto" }}>
          <rect x="5" y="10" width="54" height="76" rx="7" fill={C.bg} stroke={color} strokeWidth="2" />
          <rect x="14" y="2" width="36" height="11" rx="4" fill={C.card} stroke={color} strokeWidth="2" />
          <rect x="7" y={10 + 74 * (1 - fill / 100)} width="50" height={74 * (fill / 100)} rx="5" fill={color} opacity={0.55} style={{ transition: "all 0.5s" }} />
        </svg>
        <div style={{ fontSize: 18, fontWeight: 800, color, marginTop: 2 }}>${amt}</div>
      </div>
    );
  };

  const ProgBar = ({ val, max, label, sub, color1, color2, h = 8 }: { val: number; max: number; label: string; sub: string; color1: string; color2: string; h?: number }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.mut, marginBottom: 3 }}><span>{label}</span><span>{sub}</span></div>
      <div style={{ height: h, background: C.bg, borderRadius: h / 2, overflow: "hidden", border: h > 8 ? `1px solid ${C.gold}33` : "none" }}>
        <div style={{ width: `${Math.min(100, (val / max) * 100)}%`, height: "100%", background: `linear-gradient(90deg, ${color1}, ${color2})`, borderRadius: h / 2, transition: "width 0.5s" }} />
      </div>
    </div>
  );

  // ============================================
  // INTRO
  // ============================================
  if (phase === "intro") return (
    <div style={wrap}>
      <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 8 }}>{"\uD83D\uDC37"}</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: C.pink, margin: 0 }}>Piggy Bank Planner</h1>
        <p style={{ color: C.mut, fontSize: 15, margin: "8px 0 28px" }}>Learn to save, spend wisely, and share! Split your weekly allowance over 8 weeks to reach your savings goal.</p>
        <h2 style={{ fontSize: 18, color: C.gold, marginBottom: 16 }}>Choose Your Savings Goal</h2>
        {GOALS.map(g => (
          <button key={g.name} onClick={() => { setGoal(g); setPhase("planning"); }} style={{ ...btn, background: C.card, border: `2px solid ${C.pink}44`, padding: 16, display: "flex", alignItems: "center", gap: 16, width: "100%", marginBottom: 10, textAlign: "left" }}>
            <span style={{ fontSize: 36 }}>{g.emoji}</span>
            <div><div style={{ fontSize: 18, fontWeight: 800 }}>{g.name}</div><div style={{ color: C.gold }}>${g.cost}</div></div>
          </button>
        ))}
      </div>
    </div>
  );

  // ============================================
  // PLANNING
  // ============================================
  if (phase === "planning") {
    const total = alloc.save + alloc.spend + alloc.share;
    return (
      <div style={wrap}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.pink, margin: "0 0 12px", textAlign: "center" }}>{"\uD83D\uDC37"} Piggy Bank Planner</h1>
          <ProgBar val={week - 1} max={WEEKS} label={`Week ${week} of ${WEEKS}`} sub={`${Math.round(((week - 1) / WEEKS) * 100)}%`} color1={C.blue} color2={C.gold} />
          {goal && <ProgBar val={jars.save} max={goal.cost} label={`${goal.emoji} Goal: ${goal.name}`} sub={`$${jars.save} / $${goal.cost}`} color1={jars.save >= goal.cost ? C.grn : C.pink} color2={C.gold} h={12} />}
          <div style={card}>
            <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
              {JARS.map(j => <Jar key={j.key} label={j.label} emoji={j.emoji} amt={jars[j.key]} color={j.color} max={j.key === "save" ? (goal?.cost || 100) : j.key === "spend" ? 60 : 40} />)}
            </div>
          </div>
          <div style={card}>
            <div style={{ textAlign: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 13, color: C.mut }}>Week {week} Allowance</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: C.gold }}>${ALLOWANCE}</div>
              <div style={{ fontSize: 12, color: C.mut }}>Split it into your 3 jars!</div>
            </div>
            {JARS.map(j => (
              <div key={j.key} style={{ display: "flex", alignItems: "center", padding: "7px 0", gap: 6 }}>
                <span style={{ fontSize: 13, color: j.color, fontWeight: 700, minWidth: 82 }}>{j.emoji} {j.label}</span>
                <button onClick={() => adjust(j.key, -1)} disabled={alloc[j.key] <= 0} style={{ ...btn, background: j.color, padding: "3px 11px", fontSize: 17, opacity: alloc[j.key] <= 0 ? 0.3 : 1 }}>-</button>
                <span style={{ fontSize: 20, fontWeight: 800, color: j.color, minWidth: 36, textAlign: "center" }}>${alloc[j.key]}</span>
                <button onClick={() => adjust(j.key, 1)} disabled={alloc[j.key] >= ALLOWANCE} style={{ ...btn, background: j.color, padding: "3px 11px", fontSize: 17, opacity: alloc[j.key] >= ALLOWANCE ? 0.3 : 1 }}>+</button>
                <div style={{ width: 70, height: 7, background: C.bg, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${(alloc[j.key] / ALLOWANCE) * 100}%`, height: "100%", background: j.color, borderRadius: 4, transition: "width 0.2s" }} />
                </div>
              </div>
            ))}
            <div style={{ textAlign: "center", marginTop: 4, fontSize: 13, color: total === ALLOWANCE ? C.grn : C.red }}>Total: ${total} / ${ALLOWANCE}</div>
          </div>
          <button onClick={confirmWeek} disabled={total !== ALLOWANCE} style={{ ...btn, width: "100%", background: total === ALLOWANCE ? `linear-gradient(135deg, ${C.pink}, ${C.gold})` : C.mut, fontSize: 18, padding: "14px 0" }}>
            Confirm Week {week} {"\u2714\uFE0F"}
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // EVENT
  // ============================================
  if (phase === "event" && evt) {
    const choose = evt.jar === "choose" && evt.type === "bonus";
    return (
      <div style={{ ...wrap, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ ...card, maxWidth: 400, width: "100%", padding: 28, textAlign: "center", borderRadius: 16 }}>
          <div style={{ fontSize: 60, marginBottom: 10 }}>{evt.emoji}</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: evt.type === "bonus" ? C.gold : C.red, margin: "0 0 8px" }}>{evt.type === "bonus" ? "Lucky Event!" : "Unexpected Cost!"}</h2>
          <p style={{ fontSize: 15, lineHeight: 1.5, marginBottom: 16 }}>{evt.text}</p>
          <div style={{ fontSize: 26, fontWeight: 800, color: evt.type === "bonus" ? C.grn : C.red, marginBottom: 18 }}>{evt.type === "bonus" ? "+" : "-"}${evt.amount}</div>
          {choose ? (
            <>
              <p style={{ fontSize: 13, color: C.mut, marginBottom: 10 }}>Which jar should it go to?</p>
              <div style={{ display: "flex", gap: 8 }}>
                {JARS.map(j => <button key={j.key} onClick={() => handleEvt(j.key)} style={{ ...btn, background: j.color, flex: 1 }}>{j.emoji} {j.label}</button>)}
              </div>
            </>
          ) : <button onClick={() => handleEvt()} style={{ ...btn, background: C.gold, color: C.bg, width: "100%", fontSize: 16 }}>Continue</button>}
        </div>
      </div>
    );
  }

  // ============================================
  // TEMPTATION
  // ============================================
  if (phase === "temptation" && tempt) {
    const ok = jars.save >= tempt.cost;
    return (
      <div style={{ ...wrap, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ ...card, maxWidth: 400, width: "100%", padding: 28, textAlign: "center", borderRadius: 16, border: `2px solid ${C.gold}55` }}>
          <div style={{ fontSize: 52, marginBottom: 6 }}>{tempt.emoji}</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: C.gold, margin: "0 0 8px" }}>Temptation!</h2>
          <p style={{ fontSize: 15, marginBottom: 4 }}>You spotted a <strong>{tempt.name}</strong>!</p>
          <p style={{ fontSize: 13, color: C.mut, marginBottom: 10 }}>Cost: <strong style={{ color: C.red }}>${tempt.cost}</strong> from Save jar</p>
          <p style={{ fontSize: 13, color: C.mut, marginBottom: 18 }}>Save jar: <strong style={{ color: C.pink }}>${jars.save}</strong>{goal && <> | Goal: <strong style={{ color: C.gold }}>${goal.cost}</strong></>}</p>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => handleTempt(true)} disabled={!ok} style={{ ...btn, background: ok ? C.red : C.mut, flex: 1, opacity: ok ? 1 : 0.4 }}>Buy it! {"\uD83D\uDE1C"}</button>
            <button onClick={() => handleTempt(false)} style={{ ...btn, background: C.grn, flex: 1 }}>Resist! {"\uD83D\uDCAA"}</button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // COMPLETE
  // ============================================
  if (phase === "complete") {
    const met = goal ? jars.save >= goal.cost : false;
    const pct = goal ? Math.min(100, Math.round((jars.save / goal.cost) * 100)) : 0;
    return (
      <div style={wrap}>
        <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 52, marginBottom: 6 }}>{met ? "\uD83C\uDF89" : "\uD83D\uDC37"}</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: met ? C.gold : C.pink, margin: "0 0 6px" }}>{met ? "You Reached Your Goal!" : "Great Effort!"}</h1>
          <p style={{ color: C.mut, fontSize: 14, marginBottom: 18 }}>{met ? `Amazing! You saved enough for the ${goal?.name}!` : `You saved ${pct}% toward your ${goal?.name}. Keep it up!`}</p>
          <div style={{ ...card, padding: 20 }}>
            <div style={{ fontSize: 13, color: C.mut, marginBottom: 8 }}>Savings Thermometer</div>
            <div style={{ position: "relative", height: 170, width: 46, margin: "0 auto", background: C.bg, borderRadius: 23, border: `2px solid ${C.gold}55`, overflow: "hidden" }}>
              <div style={{ position: "absolute", bottom: 0, width: "100%", height: `${pct}%`, background: `linear-gradient(to top, ${met ? C.grn : C.pink}, ${C.gold})`, borderRadius: "0 0 21px 21px", transition: "height 1s" }} />
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: 15, fontWeight: 800, textShadow: "0 1px 3px rgba(0,0,0,.5)" }}>{pct}%</div>
            </div>
            <div style={{ marginTop: 6, fontSize: 13, color: C.gold }}>${jars.save} / ${goal?.cost}</div>
          </div>
          <div style={card}>
            <div style={{ fontSize: 13, color: C.mut, marginBottom: 10 }}>Final Jar Totals</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
              {JARS.map(j => <Jar key={j.key} label={j.label} emoji={j.emoji} amt={jars[j.key]} color={j.color} max={j.key === "save" ? (goal?.cost || 100) : j.key === "spend" ? 60 : 40} />)}
            </div>
          </div>
          <div style={{ ...card, textAlign: "left" }}>
            <div style={{ fontSize: 13, color: C.mut, marginBottom: 6, textAlign: "center" }}>Activity Log</div>
            <div style={{ maxHeight: 140, overflowY: "auto" }}>
              {log.map((e, i) => <div key={i} style={{ fontSize: 12, padding: "3px 0", borderBottom: `1px solid ${C.bg}` }}>{e}</div>)}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: 13, color: C.gold, marginBottom: 6 }}>{"\u2B50"} Money Tips</div>
            <div style={{ fontSize: 12, color: C.mut, lineHeight: 1.6, textAlign: "left" }}>
              {met
                ? <>{"\u2714\uFE0F"} Great patience! Saving a little each week adds up. Resisting temptation helps reach big goals.</>
                : <>{"\uD83D\uDCA1"} Try saving more each week. Resist temptations to protect savings. A smaller goal may be easier to start!</>}
            </div>
          </div>
          <button onClick={reset} style={{ ...btn, background: `linear-gradient(135deg, ${C.pink}, ${C.gold})`, width: "100%", fontSize: 18, padding: "14px 0" }}>Play Again {"\uD83D\uDD01"}</button>
        </div>
      </div>
    );
  }

  return null;
}
