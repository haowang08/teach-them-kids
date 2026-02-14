import { useState, useCallback } from "react";

type Phase = "intro" | "choose" | "ripple" | "complete";
interface Opt { label: string; desc: string; ripple: string; direct: number; indirect: number }
interface Loc { id: string; name: string; emoji: string; situation: string; options: Opt[] }
interface Action { locId: string; opt: Opt }
interface Evt { from: string; to: string; msg: string }

const C = { bg: "#1A1A2E", card: "#2D2D44", heart: "#E91E63", orange: "#FF9800",
  gold: "#FFD700", teal: "#00BCD4", text: "#FFF", dim: "#B0B0C8", green: "#4CAF50" };

const LOCS: Loc[] = [
  { id: "neighbor", name: "Neighbor's House", emoji: "\u{1F3E0}",
    situation: "Mrs. Johnson is recovering from surgery and needs help.",
    options: [
      { label: "Help with groceries", desc: "Carry her heavy bags inside", ripple: "Mrs. Johnson baked thank-you cookies for the food bank!", direct: 1, indirect: 12 },
      { label: "Mow their lawn", desc: "Keep her yard looking nice", ripple: "Her neighbor saw you and started a lawn-care volunteer group!", direct: 1, indirect: 8 },
      { label: "Bake cookies", desc: "Bring a warm batch of cookies", ripple: "Mrs. Johnson shared the recipe at the senior center potluck!", direct: 1, indirect: 15 },
    ] },
  { id: "school", name: "School", emoji: "\u{1F3EB}",
    situation: "Some students are struggling and the schoolyard needs care.",
    options: [
      { label: "Tutor a classmate", desc: "Help Sam understand fractions", ripple: "Sam gained confidence and now helps his little sister with homework!", direct: 1, indirect: 3 },
      { label: "Organize a cleanup", desc: "Rally friends to clean the yard", ripple: "The principal started a weekly Green Team inspired by your effort!", direct: 5, indirect: 20 },
      { label: "Start a book drive", desc: "Collect books for the library", ripple: "The book drive grew so big it supplied three nearby schools!", direct: 10, indirect: 45 },
    ] },
  { id: "hospital", name: "Hospital", emoji: "\u{1F3E5}",
    situation: "Kids on the recovery ward could use some cheering up.",
    options: [
      { label: "Draw get-well cards", desc: "Create colorful cards for patients", ripple: "A nurse was so moved she started an art therapy program!", direct: 8, indirect: 30 },
      { label: "Donate toys", desc: "Bring toys from home to share", ripple: "Other families saw your donation box and contributed too!", direct: 5, indirect: 25 },
    ] },
  { id: "park", name: "Park", emoji: "\u{1F333}",
    situation: "The community park has litter and a lonely new kid on the bench.",
    options: [
      { label: "Clean up litter", desc: "Pick up trash and recycle", ripple: "The city installed new recycling bins in every park!", direct: 0, indirect: 50 },
      { label: "Befriend the new kid", desc: "Invite them to play with you", ripple: "That kid introduced you to their cousins and a big friend group formed!", direct: 1, indirect: 6 },
    ] },
  { id: "shelter", name: "Animal Shelter", emoji: "\u{1F415}",
    situation: "The shelter is overcrowded and the animals need love.",
    options: [
      { label: "Walk the dogs", desc: "Take shelter dogs on a nice walk", ripple: "People saw you walking dogs and three got adopted that week!", direct: 0, indirect: 3 },
      { label: "Make adoption posters", desc: "Design posters with cute pet photos", ripple: "Your posters went viral online and adoptions doubled!", direct: 0, indirect: 15 },
    ] },
  { id: "senior", name: "Senior Center", emoji: "\u{1F9D3}",
    situation: "The elderly residents feel lonely and miss their families.",
    options: [
      { label: "Read stories aloud", desc: "Share books and conversation", ripple: "Grandpa Lou started reading to kids at the library every Saturday!", direct: 5, indirect: 20 },
      { label: "Teach them technology", desc: "Help them video-call family", ripple: "Now they video-call grandkids daily \u2014 whole families reconnected!", direct: 4, indirect: 16 },
    ] },
  { id: "library", name: "Library", emoji: "\u{1F4DA}",
    situation: "The library needs volunteers and younger kids need reading buddies.",
    options: [
      { label: "Be a reading buddy", desc: "Read with a younger child each week", ripple: "Three more teens signed up as reading buddies after seeing you!", direct: 1, indirect: 4 },
      { label: "Organize shelves", desc: "Sort and tidy the whole section", ripple: "The librarian used saved time to launch a free coding class!", direct: 1, indirect: 12 },
    ] },
  { id: "foodbank", name: "Food Bank", emoji: "\u{1F37D}\uFE0F",
    situation: "Families in the area are going hungry and supplies are running low.",
    options: [
      { label: "Collect canned goods", desc: "Go door-to-door collecting food", ripple: "Your neighborhood now does a monthly food drive together!", direct: 20, indirect: 60 },
      { label: "Help sort donations", desc: "Volunteer to organize the shelves", ripple: "Faster sorting meant 50 more families were fed that month!", direct: 10, indirect: 50 },
    ] },
  { id: "shop", name: "Local Shop", emoji: "\u{1F3EA}",
    situation: "The small shop owner is struggling and could use community support.",
    options: [
      { label: "Buy local & tell friends", desc: "Support the shop and spread the word", ripple: "Ten new regular customers came in thanks to your word of mouth!", direct: 1, indirect: 10 },
      { label: "Help decorate the shop", desc: "Paint a cheerful mural on the wall", ripple: "The mural became a landmark and foot traffic tripled!", direct: 1, indirect: 20 },
    ] },
];

const CONNS: Record<string, string[]> = {
  neighbor: ["school", "park", "shop"], school: ["library", "park", "hospital"],
  hospital: ["senior", "shelter", "school"], park: ["neighbor", "shelter", "library"],
  shelter: ["park", "hospital", "senior"], senior: ["hospital", "library", "neighbor"],
  library: ["school", "foodbank", "senior"], foodbank: ["shop", "library", "neighbor"],
  shop: ["foodbank", "neighbor", "park"],
};

const KF = `
@keyframes rippleExpand { 0%{transform:scale(0);opacity:.7} 100%{transform:scale(3);opacity:0} }
@keyframes fadeUp { 0%{opacity:0;transform:translateY(20px)} 100%{opacity:1;transform:translateY(0)} }
@keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.3)} }`;

const card: React.CSSProperties = { background: C.card, borderRadius: 16, padding: 24, maxWidth: 800, width: "100%", boxShadow: "0 8px 32px rgba(0,0,0,.3)" };
const wrap: React.CSSProperties = { background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "system-ui,sans-serif", padding: 20, display: "flex", flexDirection: "column", alignItems: "center" };
const grid3: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 };
const btn = (bg: string, shadow?: string): React.CSSProperties => ({ background: bg, border: "none", color: "#fff", fontSize: 18, fontWeight: "bold", padding: "14px 40px", borderRadius: 30, cursor: "pointer", boxShadow: shadow || "none" });

export default function KindnessRipple() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [tokens, setTokens] = useState(5);
  const [actions, setActions] = useState<Action[]>([]);
  const [selLoc, setSelLoc] = useState<Loc | null>(null);
  const [step, setStep] = useState(0);
  const [happiness, setHappiness] = useState(0);
  const [events, setEvents] = useState<Evt[]>([]);
  const [totD, setTotD] = useState(0);
  const [totI, setTotI] = useState(0);

  const buildEvents = useCallback((acts: Action[]) => {
    const evts: Evt[] = [];
    const touched = new Set<string>();
    for (const a of acts) {
      touched.add(a.locId);
      evts.push({ from: a.locId, to: a.locId, msg: a.opt.ripple });
      for (const c of (CONNS[a.locId] || [])) {
        if (!touched.has(c)) {
          touched.add(c);
          const l = LOCS.find(x => x.id === c);
          if (l) evts.push({ from: a.locId, to: c, msg: `The ripple reached ${l.name}! People there were inspired to help others too.` });
        }
      }
    }
    return evts;
  }, []);

  const chooseAction = useCallback((loc: Loc, opt: Opt) => {
    if (tokens <= 0) return;
    if (actions.some(a => a.locId === loc.id)) return;
    const next = [...actions, { locId: loc.id, opt }];
    setActions(next);
    setTokens(t => t - 1);
    setSelLoc(null);
    if (tokens - 1 === 0) {
      const evts = buildEvents(next);
      setEvents(evts);
      let d = 0, i = 0;
      for (const a of next) { d += a.opt.direct; i += a.opt.indirect; }
      setTotD(d); setTotI(i);
      setTimeout(() => {
        setPhase("ripple");
        let s = 0;
        const iv = setInterval(() => {
          s++;
          setStep(s);
          setHappiness(p => s >= evts.length ? 100 : Math.min(100, p + Math.floor(100 / evts.length)));
          if (s >= evts.length) { clearInterval(iv); setTimeout(() => setPhase("complete"), 2500); }
        }, 2000);
      }, 600);
    }
  }, [tokens, actions, buildEvents]);

  const acted = actions.map(a => a.locId);
  const reset = () => { setPhase("intro"); setTokens(5); setActions([]); setSelLoc(null); setStep(0); setHappiness(0); setEvents([]); setTotD(0); setTotI(0); };

  // ---- INTRO ----
  if (phase === "intro") return (
    <div style={wrap}><style>{KF}</style>
      <div style={{ ...card, textAlign: "center", marginTop: 40 }}>
        <div style={{ fontSize: 72, marginBottom: 16 }}>{"\u{1F49D}"}</div>
        <h1 style={{ fontSize: 32, color: C.gold, margin: "0 0 16px" }}>Kindness Ripple Effect</h1>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: C.dim, maxWidth: 560, margin: "0 auto 24px" }}>
          Every act of kindness creates a ripple that spreads far and wide! See how{" "}
          <span style={{ color: C.orange, fontWeight: "bold" }}>YOUR</span> kindness can change a whole community!
        </p>
        <p style={{ fontSize: 15, color: C.teal, marginBottom: 32 }}>
          You have <strong>5 kindness tokens</strong> to spend across 9 community locations. Watch how your actions create ripples that help even more people!
        </p>
        <button onClick={() => setPhase("choose")} style={btn(`linear-gradient(135deg,${C.heart},${C.orange})`, "0 4px 20px rgba(233,30,99,.4)")}>
          Start Spreading Kindness!
        </button>
      </div>
    </div>
  );

  // ---- CHOOSE ----
  if (phase === "choose") return (
    <div style={wrap}><style>{KF}</style>
      <div style={{ maxWidth: 860, width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, color: C.gold, fontSize: 24 }}>{"\u{1F5FA}\uFE0F"} Community Map</h2>
          <div style={{ background: C.card, padding: "10px 20px", borderRadius: 20, fontSize: 18, fontWeight: "bold", border: `2px solid ${C.orange}` }}>
            {"\u{1F49B}"} Tokens: {tokens}
          </div>
        </div>
        <div style={{ ...grid3, gap: 14, marginBottom: 20 }}>
          {LOCS.map(loc => {
            const done = acted.includes(loc.id), sel = selLoc?.id === loc.id;
            return (
              <button key={loc.id} onClick={() => { if (!done && tokens > 0) setSelLoc(sel ? null : loc); }}
                style={{ background: done ? `linear-gradient(135deg,${C.green}33,${C.green}22)` : sel ? `linear-gradient(135deg,${C.teal}44,${C.teal}22)` : C.card,
                  border: done ? `2px solid ${C.green}` : sel ? `2px solid ${C.teal}` : "2px solid transparent",
                  borderRadius: 14, padding: "16px 12px", cursor: done ? "default" : tokens > 0 ? "pointer" : "not-allowed",
                  textAlign: "center", color: C.text, opacity: done ? 0.7 : 1, transition: "all .2s" }}>
                <div style={{ fontSize: 36, marginBottom: 6 }}>{loc.emoji}</div>
                <div style={{ fontSize: 14, fontWeight: "bold" }}>{loc.name}</div>
                {done && <div style={{ fontSize: 12, color: C.green, marginTop: 4 }}>{"\u2714"} Kindness given!</div>}
              </button>
            );
          })}
        </div>
        {selLoc && (
          <div style={{ ...card, animation: "fadeUp .3s ease", border: `2px solid ${C.teal}` }}>
            <h3 style={{ margin: "0 0 8px", color: C.teal, fontSize: 20 }}>{selLoc.emoji} {selLoc.name}</h3>
            <p style={{ color: C.dim, fontSize: 14, margin: "0 0 16px" }}>{selLoc.situation}</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {selLoc.options.map((o, i) => (
                <button key={i} onClick={() => chooseAction(selLoc, o)}
                  style={{ flex: "1 1 180px", background: `linear-gradient(135deg,${C.heart}22,${C.orange}22)`,
                    border: `1px solid ${C.heart}66`, borderRadius: 12, padding: 14, cursor: "pointer", color: C.text, textAlign: "left" }}>
                  <div style={{ fontWeight: "bold", fontSize: 15, marginBottom: 4 }}>{"\u{1F49D}"} {o.label}</div>
                  <div style={{ fontSize: 12, color: C.dim }}>{o.desc}</div>
                  <div style={{ fontSize: 11, color: C.orange, marginTop: 6 }}>Cost: 1 token</div>
                </button>
              ))}
            </div>
          </div>
        )}
        {actions.length > 0 && !selLoc && (
          <div style={{ ...card, marginTop: 8 }}>
            <h4 style={{ margin: "0 0 10px", color: C.orange }}>Your Kindness So Far:</h4>
            {actions.map((a, i) => { const l = LOCS.find(x => x.id === a.locId); return (
              <div key={i} style={{ fontSize: 14, color: C.dim, marginBottom: 4 }}>{l?.emoji} {l?.name}: {a.opt.label}</div>
            ); })}
          </div>
        )}
      </div>
    </div>
  );

  // ---- RIPPLE ----
  if (phase === "ripple") {
    const visible = events.slice(0, step);
    const ripCircle = (color: string, delay: string): React.CSSProperties => ({
      position: "absolute", top: "50%", left: "50%", width: 40, height: 40, marginTop: -20, marginLeft: -20,
      borderRadius: "50%", border: `2px solid ${color}`, animation: "rippleExpand 2s ease-out infinite",
      animationDelay: delay, pointerEvents: "none",
    });
    return (
      <div style={wrap}><style>{KF}</style>
        <div style={{ maxWidth: 860, width: "100%" }}>
          <h2 style={{ textAlign: "center", color: C.gold, marginBottom: 8, fontSize: 26 }}>
            {"\u2728"} Watch Your Kindness Ripple! {"\u2728"}
          </h2>
          <div style={{ background: C.card, borderRadius: 16, padding: "16px 20px", marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: "bold", color: C.heart }}>Community Happiness</span>
              <span>{Array.from({ length: Math.min(5, Math.ceil(happiness / 20)) }).map((_, i) => (
                <span key={i} style={{ animation: "pulse .6s ease infinite", animationDelay: `${i * .1}s`, display: "inline-block" }}>{"\u2764\uFE0F"}</span>
              ))}</span>
            </div>
            <div style={{ background: C.bg, borderRadius: 10, height: 20, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${happiness}%`, background: `linear-gradient(90deg,${C.heart},${C.orange},${C.gold})`, borderRadius: 10, transition: "width .8s ease" }} />
            </div>
            <div style={{ textAlign: "right", fontSize: 13, color: C.dim, marginTop: 4 }}>{happiness}%</div>
          </div>
          <div style={{ ...grid3, marginBottom: 20 }}>
            {LOCS.map(loc => {
              const rip = visible.some(e => e.from === loc.id || e.to === loc.id);
              const src = actions.some(a => a.locId === loc.id);
              return (
                <div key={loc.id} style={{ background: src ? `linear-gradient(135deg,${C.heart}33,${C.orange}22)` : rip ? `linear-gradient(135deg,${C.teal}33,${C.teal}11)` : C.card,
                  borderRadius: 14, padding: 14, textAlign: "center", position: "relative", overflow: "hidden",
                  border: rip ? `2px solid ${C.teal}` : "2px solid transparent", transition: "all .5s" }}>
                  {rip && <><div style={ripCircle(src ? C.heart : C.teal, "0s")} /><div style={ripCircle(src ? C.orange : C.gold, "0.5s")} /></>}
                  <div style={{ fontSize: 30, position: "relative", zIndex: 1 }}>{loc.emoji}</div>
                  <div style={{ fontSize: 12, fontWeight: "bold", position: "relative", zIndex: 1 }}>{loc.name}</div>
                  {src && <div style={{ fontSize: 10, color: C.heart, marginTop: 2, position: "relative", zIndex: 1 }}>{"\u{1F49D}"} Your kindness!</div>}
                </div>
              );
            })}
          </div>
          <div style={card}>
            <h3 style={{ margin: "0 0 12px", color: C.teal, fontSize: 16 }}>{"\u{1F4AC}"} Ripple Stories</h3>
            <div style={{ maxHeight: 220, overflowY: "auto" }}>
              {visible.length === 0 && <div style={{ color: C.dim, fontSize: 14, textAlign: "center", padding: 20 }}>Ripples starting...</div>}
              {visible.map((e, i) => {
                const fl = LOCS.find(x => x.id === e.from), tl = LOCS.find(x => x.id === e.to), self = e.from === e.to;
                return (
                  <div key={i} style={{ background: self ? `${C.heart}15` : `${C.teal}15`, borderRadius: 10, padding: "10px 14px", marginBottom: 8, animation: "fadeUp .5s ease", borderLeft: `3px solid ${self ? C.heart : C.teal}` }}>
                    <div style={{ fontSize: 13, marginBottom: 2 }}>
                      {self ? <span style={{ color: C.orange }}>{fl?.emoji} {fl?.name}</span>
                        : <span style={{ color: C.teal }}>{fl?.emoji} {"\u2192"} {tl?.emoji} {tl?.name}</span>}
                    </div>
                    <div style={{ fontSize: 13, color: C.dim }}>{e.msg}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---- COMPLETE ----
  const total = totD + totI;
  const reached = new Set([...actions.map(a => a.locId), ...events.map(e => e.to)]).size;
  return (
    <div style={wrap}><style>{KF}</style>
      <div style={{ ...card, textAlign: "center", marginTop: 30, maxWidth: 640 }}>
        <div style={{ fontSize: 64, marginBottom: 8, animation: "pulse 1s ease infinite" }}>{"\u{1F3C6}"}</div>
        <h1 style={{ color: C.gold, margin: "0 0 6px", fontSize: 28 }}>Kindness Champion!</h1>
        <p style={{ color: C.dim, margin: "0 0 24px", fontSize: 15 }}>Look at the incredible impact you made!</p>
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          <div style={{ flex: 1, background: C.bg, borderRadius: 12, padding: 16, border: `1px solid ${C.dim}33` }}>
            <div style={{ fontSize: 12, color: C.dim, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Before</div>
            <div style={{ fontSize: 28, marginBottom: 4 }}>{"\u{1F614}"}</div>
            <div style={{ fontSize: 13, color: C.dim }}>People struggling alone, unconnected community</div>
          </div>
          <div style={{ flex: 1, background: `linear-gradient(135deg,${C.heart}15,${C.gold}15)`, borderRadius: 12, padding: 16, border: `1px solid ${C.gold}44` }}>
            <div style={{ fontSize: 12, color: C.gold, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>After</div>
            <div style={{ fontSize: 28, marginBottom: 4 }}>{"\u{1F60A}"}</div>
            <div style={{ fontSize: 13, color: C.dim }}>Connected, caring, thriving together!</div>
          </div>
        </div>
        <div style={{ ...grid3, marginBottom: 24 }}>
          {[{ n: totD, c: C.heart, l: "Helped Directly" }, { n: totI, c: C.teal, l: "Helped by Ripples" }, { n: reached, c: C.gold, l: "Locations Reached" }].map((s, i) => (
            <div key={i} style={{ background: `${s.c}22`, borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 28, fontWeight: "bold", color: s.c }}>{s.n}</div>
              <div style={{ fontSize: 12, color: C.dim }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ background: `linear-gradient(135deg,${C.heart},${C.orange})`, borderRadius: 14, padding: 18, marginBottom: 24 }}>
          <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 4 }}>Total People Impacted</div>
          <div style={{ fontSize: 42, fontWeight: "bold" }}>{total}</div>
          <div style={{ fontSize: 13, opacity: 0.85 }}>from just 5 acts of kindness!</div>
        </div>
        <div style={{ display: "inline-block", background: `linear-gradient(135deg,${C.gold}33,${C.orange}33)`, border: `2px solid ${C.gold}`, borderRadius: 16, padding: "16px 32px", marginBottom: 24 }}>
          <div style={{ fontSize: 36 }}>{"\u{1F396}\uFE0F"}</div>
          <div style={{ fontSize: 16, fontWeight: "bold", color: C.gold }}>Kindness Champion Badge</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>Awarded for transforming a community</div>
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: C.dim, maxWidth: 440, margin: "0 auto 28px", fontStyle: "italic" }}>
          "No act of kindness, no matter how small, is ever wasted. One person really can change the world{"\u2014"}and that person is you."
        </p>
        <button onClick={reset} style={btn(`linear-gradient(135deg,${C.teal},${C.green})`, `0 4px 20px ${C.teal}44`)}>
          Spread Kindness Again!
        </button>
      </div>
    </div>
  );
}
