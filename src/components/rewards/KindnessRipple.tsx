import { useState, useCallback } from "react";

// ============================================
// TYPES
// ============================================

type GamePhase = "intro" | "choose" | "ripple" | "complete";

interface KindnessOption {
  label: string;
  description: string;
  rippleMessage: string;
  peopleDirect: number;
  peopleIndirect: number;
}

interface Location {
  id: string;
  name: string;
  emoji: string;
  situation: string;
  options: KindnessOption[];
  gridRow: number;
  gridCol: number;
}

interface ChosenAction {
  locationId: string;
  option: KindnessOption;
}

interface RippleEvent {
  from: string;
  to: string;
  message: string;
  delay: number;
}

// ============================================
// DATA
// ============================================

const LOCATIONS: Location[] = [
  {
    id: "neighbor",
    name: "Neighbor's House",
    emoji: "\u{1F3E0}",
    situation: "Mrs. Johnson is recovering from surgery and needs help.",
    gridRow: 0,
    gridCol: 0,
    options: [
      { label: "Help with groceries", description: "Carry her heavy bags inside", rippleMessage: "Mrs. Johnson baked thank-you cookies for the food bank!", peopleDirect: 1, peopleIndirect: 12 },
      { label: "Mow their lawn", description: "Keep her yard looking nice", rippleMessage: "Her neighbor saw you and started a lawn-care volunteer group!", peopleDirect: 1, peopleIndirect: 8 },
      { label: "Bake cookies", description: "Bring a warm batch of cookies", rippleMessage: "Mrs. Johnson shared the recipe at the senior center potluck!", peopleDirect: 1, peopleIndirect: 15 },
    ],
  },
  {
    id: "school",
    name: "School",
    emoji: "\u{1F3EB}",
    situation: "Some students are struggling and the schoolyard needs care.",
    gridRow: 0,
    gridCol: 1,
    options: [
      { label: "Tutor a classmate", description: "Help Sam understand fractions", rippleMessage: "Sam gained confidence and now helps his little sister with homework!", peopleDirect: 1, peopleIndirect: 3 },
      { label: "Organize a cleanup", description: "Rally friends to clean up the yard", rippleMessage: "The principal started a weekly Green Team inspired by your effort!", peopleDirect: 5, peopleIndirect: 20 },
      { label: "Start a book drive", description: "Collect books for the library", rippleMessage: "The book drive grew so big it supplied three nearby schools!", peopleDirect: 10, peopleIndirect: 45 },
    ],
  },
  {
    id: "hospital",
    name: "Hospital",
    emoji: "\u{1F3E5}",
    situation: "Kids on the recovery ward could use some cheering up.",
    gridRow: 0,
    gridCol: 2,
    options: [
      { label: "Draw get-well cards", description: "Create colorful cards for patients", rippleMessage: "A nurse was so moved she started an art therapy program!", peopleDirect: 8, peopleIndirect: 30 },
      { label: "Donate toys", description: "Bring toys from home to share", rippleMessage: "Other families saw your donation box and contributed too!", peopleDirect: 5, peopleIndirect: 25 },
    ],
  },
  {
    id: "park",
    name: "Park",
    emoji: "\u{1F333}",
    situation: "The community park has litter and a lonely new kid on the bench.",
    gridRow: 1,
    gridCol: 0,
    options: [
      { label: "Clean up litter", description: "Pick up trash and recycle", rippleMessage: "The city noticed and installed new recycling bins in every park!", peopleDirect: 0, peopleIndirect: 50 },
      { label: "Befriend the new kid", description: "Invite them to play with you", rippleMessage: "That kid introduced you to their cousins, and a big friend group formed!", peopleDirect: 1, peopleIndirect: 6 },
    ],
  },
  {
    id: "shelter",
    name: "Animal Shelter",
    emoji: "\u{1F415}",
    situation: "The shelter is overcrowded and the animals need love and attention.",
    gridRow: 1,
    gridCol: 1,
    options: [
      { label: "Walk the dogs", description: "Take shelter dogs on a nice walk", rippleMessage: "People saw you walking dogs and three got adopted that week!", peopleDirect: 0, peopleIndirect: 3 },
      { label: "Make adoption posters", description: "Design posters with cute pet photos", rippleMessage: "Your posters went viral online and adoptions doubled!", peopleDirect: 0, peopleIndirect: 15 },
    ],
  },
  {
    id: "senior",
    name: "Senior Center",
    emoji: "\u{1F9D3}",
    situation: "The elderly residents feel lonely and miss their families.",
    gridRow: 1,
    gridCol: 2,
    options: [
      { label: "Read stories aloud", description: "Share books and conversation", rippleMessage: "Grandpa Lou started reading to kids at the library every Saturday!", peopleDirect: 5, peopleIndirect: 20 },
      { label: "Teach them technology", description: "Help them video-call family", rippleMessage: "Now they video-call grandkids daily - whole families reconnected!", peopleDirect: 4, peopleIndirect: 16 },
    ],
  },
  {
    id: "library",
    name: "Library",
    emoji: "\u{1F4DA}",
    situation: "The library needs volunteers and younger kids need reading buddies.",
    gridRow: 2,
    gridCol: 0,
    options: [
      { label: "Be a reading buddy", description: "Read with a younger child each week", rippleMessage: "Three more teens signed up as reading buddies after seeing you!", peopleDirect: 1, peopleIndirect: 4 },
      { label: "Organize shelves", description: "Sort and tidy the whole section", rippleMessage: "The librarian used saved time to launch a free coding class!", peopleDirect: 1, peopleIndirect: 12 },
    ],
  },
  {
    id: "foodbank",
    name: "Food Bank",
    emoji: "\u{1F37D}\uFE0F",
    situation: "Families in the area are going hungry and supplies are running low.",
    gridRow: 2,
    gridCol: 1,
    options: [
      { label: "Collect canned goods", description: "Go door-to-door collecting food", rippleMessage: "Your neighborhood now does a monthly food drive together!", peopleDirect: 20, peopleIndirect: 60 },
      { label: "Help sort donations", description: "Volunteer to organize the shelves", rippleMessage: "Faster sorting meant 50 more families were fed that month!", peopleDirect: 10, peopleIndirect: 50 },
    ],
  },
  {
    id: "shop",
    name: "Local Shop",
    emoji: "\u{1F3EA}",
    situation: "The small shop owner is struggling and could use community support.",
    gridRow: 2,
    gridCol: 2,
    options: [
      { label: "Buy local & tell friends", description: "Support the shop and spread the word", rippleMessage: "Ten new regular customers came in thanks to your word of mouth!", peopleDirect: 1, peopleIndirect: 10 },
      { label: "Help decorate the shop", description: "Paint a cheerful mural on the wall", rippleMessage: "The mural became a landmark and foot traffic tripled!", peopleDirect: 1, peopleIndirect: 20 },
    ],
  },
];

const RIPPLE_CONNECTIONS: Record<string, string[]> = {
  neighbor: ["school", "park", "shop"],
  school: ["library", "park", "hospital"],
  hospital: ["senior", "shelter", "school"],
  park: ["neighbor", "shelter", "library"],
  shelter: ["park", "hospital", "senior"],
  senior: ["hospital", "library", "neighbor"],
  library: ["school", "foodbank", "senior"],
  foodbank: ["shop", "library", "neighbor"],
  shop: ["foodbank", "neighbor", "park"],
};

// ============================================
// STYLES
// ============================================

const COLORS = {
  bg: "#1A1A2E",
  cardBg: "#2D2D44",
  heart: "#E91E63",
  orange: "#FF9800",
  gold: "#FFD700",
  teal: "#00BCD4",
  text: "#FFFFFF",
  textDim: "#B0B0C8",
  green: "#4CAF50",
};

const rippleKeyframes = `
@keyframes rippleExpand {
  0% { transform: scale(0); opacity: 0.7; }
  100% { transform: scale(3); opacity: 0; }
}
@keyframes fadeSlideUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes pulseHeart {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
}
@keyframes meterFill {
  0% { width: 0%; }
}
@keyframes sparkle {
  0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
  50% { opacity: 1; transform: scale(1) rotate(180deg); }
}
`;

// ============================================
// COMPONENT
// ============================================

export default function KindnessRipple() {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [tokens, setTokens] = useState(5);
  const [chosenActions, setChosenActions] = useState<ChosenAction[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [rippleStep, setRippleStep] = useState(0);
  const [happinessMeter, setHappinessMeter] = useState(0);
  const [rippleEvents, setRippleEvents] = useState<RippleEvent[]>([]);
  const [totalDirect, setTotalDirect] = useState(0);
  const [totalIndirect, setTotalIndirect] = useState(0);

  const buildRippleEvents = useCallback((actions: ChosenAction[]) => {
    const events: RippleEvent[] = [];
    let delay = 0;
    const touched = new Set<string>();

    for (const action of actions) {
      touched.add(action.locationId);
      events.push({
        from: action.locationId,
        to: action.locationId,
        message: action.option.rippleMessage,
        delay,
      });
      delay += 1800;

      const connections = RIPPLE_CONNECTIONS[action.locationId] || [];
      for (const conn of connections) {
        if (!touched.has(conn)) {
          touched.add(conn);
          const loc = LOCATIONS.find((l) => l.id === conn);
          if (loc) {
            events.push({
              from: action.locationId,
              to: conn,
              message: `The ripple reached ${loc.name}! People there were inspired to help others too.`,
              delay,
            });
            delay += 1200;
          }
        }
      }
    }
    return events;
  }, []);

  const handleChooseAction = useCallback(
    (location: Location, option: KindnessOption) => {
      if (tokens <= 0) return;
      const newAction: ChosenAction = { locationId: location.id, option };
      const newActions = [...chosenActions, newAction];
      setChosenActions(newActions);
      setTokens((t) => t - 1);
      setSelectedLocation(null);

      if (tokens - 1 === 0) {
        const events = buildRippleEvents(newActions);
        setRippleEvents(events);

        let direct = 0;
        let indirect = 0;
        for (const a of newActions) {
          direct += a.option.peopleDirect;
          indirect += a.option.peopleIndirect;
        }
        setTotalDirect(direct);
        setTotalIndirect(indirect);

        setTimeout(() => {
          setPhase("ripple");
          let step = 0;
          const interval = setInterval(() => {
            step++;
            setRippleStep(step);
            setHappinessMeter((prev) => Math.min(100, prev + Math.floor(100 / events.length)));
            if (step >= events.length) {
              clearInterval(interval);
              setTimeout(() => setPhase("complete"), 2500);
            }
          }, 2000);
        }, 600);
      }
    },
    [tokens, chosenActions, buildRippleEvents]
  );

  const actedLocations = chosenActions.map((a) => a.locationId);

  const containerStyle: React.CSSProperties = {
    background: COLORS.bg,
    minHeight: "100vh",
    color: COLORS.text,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const cardStyle: React.CSSProperties = {
    background: COLORS.cardBg,
    borderRadius: "16px",
    padding: "24px",
    maxWidth: "800px",
    width: "100%",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  };

  // ---- INTRO ----
  if (phase === "intro") {
    return (
      <div style={containerStyle}>
        <style>{rippleKeyframes}</style>
        <div style={{ ...cardStyle, textAlign: "center", marginTop: "40px" }}>
          <div style={{ fontSize: "72px", marginBottom: "16px" }}>
            {"\u{1F49D}"}
          </div>
          <h1 style={{ fontSize: "32px", color: COLORS.gold, margin: "0 0 16px" }}>
            Kindness Ripple Effect
          </h1>
          <p style={{ fontSize: "18px", lineHeight: 1.7, color: COLORS.textDim, maxWidth: "560px", margin: "0 auto 24px" }}>
            Every act of kindness creates a ripple that spreads far and wide!
            See how <span style={{ color: COLORS.orange, fontWeight: "bold" }}>YOUR</span> kindness
            can change a whole community!
          </p>
          <p style={{ fontSize: "15px", color: COLORS.teal, marginBottom: "32px" }}>
            You have <strong>5 kindness tokens</strong> to spend across 9 community locations.
            Watch how your actions create ripples that help even more people!
          </p>
          <button
            onClick={() => setPhase("choose")}
            style={{
              background: `linear-gradient(135deg, ${COLORS.heart}, ${COLORS.orange})`,
              border: "none",
              color: "#fff",
              fontSize: "20px",
              fontWeight: "bold",
              padding: "14px 48px",
              borderRadius: "30px",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(233,30,99,0.4)",
            }}
          >
            Start Spreading Kindness!
          </button>
        </div>
      </div>
    );
  }

  // ---- CHOOSE ACTIONS ----
  if (phase === "choose") {
    return (
      <div style={containerStyle}>
        <style>{rippleKeyframes}</style>
        <div style={{ maxWidth: "860px", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ margin: 0, color: COLORS.gold, fontSize: "24px" }}>
              {"\u{1F5FA}\uFE0F"} Community Map
            </h2>
            <div style={{
              background: COLORS.cardBg,
              padding: "10px 20px",
              borderRadius: "20px",
              fontSize: "18px",
              fontWeight: "bold",
              border: `2px solid ${COLORS.orange}`,
            }}>
              {"\u{1F49B}"} Kindness Tokens: {tokens}
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "14px",
            marginBottom: "20px",
          }}>
            {LOCATIONS.map((loc) => {
              const acted = actedLocations.includes(loc.id);
              const isSelected = selectedLocation?.id === loc.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => {
                    if (!acted && tokens > 0) setSelectedLocation(isSelected ? null : loc);
                  }}
                  style={{
                    background: acted
                      ? `linear-gradient(135deg, ${COLORS.green}33, ${COLORS.green}22)`
                      : isSelected
                      ? `linear-gradient(135deg, ${COLORS.teal}44, ${COLORS.teal}22)`
                      : COLORS.cardBg,
                    border: acted
                      ? `2px solid ${COLORS.green}`
                      : isSelected
                      ? `2px solid ${COLORS.teal}`
                      : "2px solid transparent",
                    borderRadius: "14px",
                    padding: "16px 12px",
                    cursor: acted ? "default" : tokens > 0 ? "pointer" : "not-allowed",
                    textAlign: "center",
                    color: COLORS.text,
                    opacity: acted ? 0.7 : 1,
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ fontSize: "36px", marginBottom: "6px" }}>{loc.emoji}</div>
                  <div style={{ fontSize: "14px", fontWeight: "bold" }}>{loc.name}</div>
                  {acted && (
                    <div style={{ fontSize: "12px", color: COLORS.green, marginTop: "4px" }}>
                      {"\u2714"} Kindness given!
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {selectedLocation && (
            <div style={{
              ...cardStyle,
              animation: "fadeSlideUp 0.3s ease",
              border: `2px solid ${COLORS.teal}`,
            }}>
              <h3 style={{ margin: "0 0 8px", color: COLORS.teal, fontSize: "20px" }}>
                {selectedLocation.emoji} {selectedLocation.name}
              </h3>
              <p style={{ color: COLORS.textDim, fontSize: "14px", margin: "0 0 16px" }}>
                {selectedLocation.situation}
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {selectedLocation.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleChooseAction(selectedLocation, opt)}
                    style={{
                      flex: "1 1 180px",
                      background: `linear-gradient(135deg, ${COLORS.heart}22, ${COLORS.orange}22)`,
                      border: `1px solid ${COLORS.heart}66`,
                      borderRadius: "12px",
                      padding: "14px",
                      cursor: "pointer",
                      color: COLORS.text,
                      textAlign: "left",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ fontWeight: "bold", fontSize: "15px", marginBottom: "4px" }}>
                      {"\u{1F49D}"} {opt.label}
                    </div>
                    <div style={{ fontSize: "12px", color: COLORS.textDim }}>
                      {opt.description}
                    </div>
                    <div style={{ fontSize: "11px", color: COLORS.orange, marginTop: "6px" }}>
                      Cost: 1 token
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {chosenActions.length > 0 && !selectedLocation && (
            <div style={{ ...cardStyle, marginTop: "8px" }}>
              <h4 style={{ margin: "0 0 10px", color: COLORS.orange }}>Your Kindness So Far:</h4>
              {chosenActions.map((a, i) => {
                const loc = LOCATIONS.find((l) => l.id === a.locationId);
                return (
                  <div key={i} style={{ fontSize: "14px", color: COLORS.textDim, marginBottom: "4px" }}>
                    {loc?.emoji} {loc?.name}: {a.option.label}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---- RIPPLE EFFECT ----
  if (phase === "ripple") {
    const visibleEvents = rippleEvents.slice(0, rippleStep);
    return (
      <div style={containerStyle}>
        <style>{rippleKeyframes}</style>
        <div style={{ maxWidth: "860px", width: "100%" }}>
          <h2 style={{ textAlign: "center", color: COLORS.gold, marginBottom: "8px", fontSize: "26px" }}>
            {"\u2728"} Watch Your Kindness Ripple! {"\u2728"}
          </h2>

          {/* Happiness Meter */}
          <div style={{
            background: COLORS.cardBg,
            borderRadius: "16px",
            padding: "16px 20px",
            marginBottom: "20px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "14px", fontWeight: "bold", color: COLORS.heart }}>
                Community Happiness
              </span>
              <span style={{ fontSize: "14px", color: COLORS.gold }}>
                {Array.from({ length: Math.min(5, Math.ceil(happinessMeter / 20)) }).map((_, i) => (
                  <span key={i} style={{ animation: "pulseHeart 0.6s ease infinite", animationDelay: `${i * 0.1}s`, display: "inline-block" }}>
                    {"\u2764\uFE0F"}
                  </span>
                ))}
              </span>
            </div>
            <div style={{
              background: "#1A1A2E",
              borderRadius: "10px",
              height: "20px",
              overflow: "hidden",
            }}>
              <div style={{
                height: "100%",
                width: `${happinessMeter}%`,
                background: `linear-gradient(90deg, ${COLORS.heart}, ${COLORS.orange}, ${COLORS.gold})`,
                borderRadius: "10px",
                transition: "width 0.8s ease",
              }} />
            </div>
            <div style={{ textAlign: "right", fontSize: "13px", color: COLORS.textDim, marginTop: "4px" }}>
              {happinessMeter}%
            </div>
          </div>

          {/* Community Grid with Ripples */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
            marginBottom: "20px",
          }}>
            {LOCATIONS.map((loc) => {
              const isRippling = visibleEvents.some((e) => e.from === loc.id || e.to === loc.id);
              const isSource = chosenActions.some((a) => a.locationId === loc.id);
              return (
                <div
                  key={loc.id}
                  style={{
                    background: isSource
                      ? `linear-gradient(135deg, ${COLORS.heart}33, ${COLORS.orange}22)`
                      : isRippling
                      ? `linear-gradient(135deg, ${COLORS.teal}33, ${COLORS.teal}11)`
                      : COLORS.cardBg,
                    borderRadius: "14px",
                    padding: "14px",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    border: isRippling ? `2px solid ${COLORS.teal}` : "2px solid transparent",
                    transition: "all 0.5s",
                  }}
                >
                  {isRippling && (
                    <>
                      <div style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "40px",
                        height: "40px",
                        marginTop: "-20px",
                        marginLeft: "-20px",
                        borderRadius: "50%",
                        border: `2px solid ${isSource ? COLORS.heart : COLORS.teal}`,
                        animation: "rippleExpand 2s ease-out infinite",
                        pointerEvents: "none",
                      }} />
                      <div style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "40px",
                        height: "40px",
                        marginTop: "-20px",
                        marginLeft: "-20px",
                        borderRadius: "50%",
                        border: `2px solid ${isSource ? COLORS.orange : COLORS.gold}`,
                        animation: "rippleExpand 2s ease-out infinite",
                        animationDelay: "0.5s",
                        pointerEvents: "none",
                      }} />
                    </>
                  )}
                  <div style={{ fontSize: "30px", position: "relative", zIndex: 1 }}>{loc.emoji}</div>
                  <div style={{ fontSize: "12px", fontWeight: "bold", position: "relative", zIndex: 1 }}>
                    {loc.name}
                  </div>
                  {isSource && (
                    <div style={{ fontSize: "10px", color: COLORS.heart, marginTop: "2px", position: "relative", zIndex: 1 }}>
                      {"\u{1F49D}"} Your kindness!
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Ripple Event Feed */}
          <div style={{ ...cardStyle }}>
            <h3 style={{ margin: "0 0 12px", color: COLORS.teal, fontSize: "16px" }}>
              {"\u{1F4AC}"} Ripple Stories
            </h3>
            <div style={{ maxHeight: "220px", overflowY: "auto" }}>
              {visibleEvents.map((evt, i) => {
                const fromLoc = LOCATIONS.find((l) => l.id === evt.from);
                const toLoc = LOCATIONS.find((l) => l.id === evt.to);
                const isSelf = evt.from === evt.to;
                return (
                  <div
                    key={i}
                    style={{
                      background: isSelf ? `${COLORS.heart}15` : `${COLORS.teal}15`,
                      borderRadius: "10px",
                      padding: "10px 14px",
                      marginBottom: "8px",
                      animation: "fadeSlideUp 0.5s ease",
                      borderLeft: `3px solid ${isSelf ? COLORS.heart : COLORS.teal}`,
                    }}
                  >
                    <div style={{ fontSize: "13px", marginBottom: "2px" }}>
                      {isSelf ? (
                        <span style={{ color: COLORS.orange }}>
                          {fromLoc?.emoji} {fromLoc?.name}
                        </span>
                      ) : (
                        <span style={{ color: COLORS.teal }}>
                          {fromLoc?.emoji} {"\u2192"} {toLoc?.emoji} {toLoc?.name}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: "13px", color: COLORS.textDim }}>{evt.message}</div>
                  </div>
                );
              })}
              {visibleEvents.length === 0 && (
                <div style={{ color: COLORS.textDim, fontSize: "14px", textAlign: "center", padding: "20px" }}>
                  Ripples starting...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---- COMPLETE ----
  const totalPeople = totalDirect + totalIndirect;
  const locationsReached = new Set([
    ...chosenActions.map((a) => a.locationId),
    ...rippleEvents.map((e) => e.to),
  ]).size;

  return (
    <div style={containerStyle}>
      <style>{rippleKeyframes}</style>
      <div style={{ ...cardStyle, textAlign: "center", marginTop: "30px", maxWidth: "640px" }}>
        <div style={{ fontSize: "64px", marginBottom: "8px", animation: "pulseHeart 1s ease infinite" }}>
          {"\u{1F3C6}"}
        </div>
        <h1 style={{ color: COLORS.gold, margin: "0 0 6px", fontSize: "28px" }}>
          Kindness Champion!
        </h1>
        <p style={{ color: COLORS.textDim, margin: "0 0 24px", fontSize: "15px" }}>
          Look at the incredible impact you made!
        </p>

        {/* Before / After */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
          <div style={{
            flex: 1,
            background: "#1A1A2E",
            borderRadius: "12px",
            padding: "16px",
            border: `1px solid ${COLORS.textDim}33`,
          }}>
            <div style={{ fontSize: "12px", color: COLORS.textDim, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>
              Before
            </div>
            <div style={{ fontSize: "28px", marginBottom: "4px" }}>{"\u{1F614}"}</div>
            <div style={{ fontSize: "13px", color: COLORS.textDim }}>
              People struggling alone, unconnected community
            </div>
          </div>
          <div style={{
            flex: 1,
            background: `linear-gradient(135deg, ${COLORS.heart}15, ${COLORS.gold}15)`,
            borderRadius: "12px",
            padding: "16px",
            border: `1px solid ${COLORS.gold}44`,
          }}>
            <div style={{ fontSize: "12px", color: COLORS.gold, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>
              After
            </div>
            <div style={{ fontSize: "28px", marginBottom: "4px" }}>{"\u{1F60A}"}</div>
            <div style={{ fontSize: "13px", color: COLORS.textDim }}>
              Connected, caring, thriving together!
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          marginBottom: "24px",
        }}>
          <div style={{ background: `${COLORS.heart}22`, borderRadius: "12px", padding: "14px" }}>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: COLORS.heart }}>{totalDirect}</div>
            <div style={{ fontSize: "12px", color: COLORS.textDim }}>Helped Directly</div>
          </div>
          <div style={{ background: `${COLORS.teal}22`, borderRadius: "12px", padding: "14px" }}>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: COLORS.teal }}>{totalIndirect}</div>
            <div style={{ fontSize: "12px", color: COLORS.textDim }}>Helped by Ripples</div>
          </div>
          <div style={{ background: `${COLORS.gold}22`, borderRadius: "12px", padding: "14px" }}>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: COLORS.gold }}>{locationsReached}</div>
            <div style={{ fontSize: "12px", color: COLORS.textDim }}>Locations Reached</div>
          </div>
        </div>

        {/* Total Impact */}
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.heart}, ${COLORS.orange})`,
          borderRadius: "14px",
          padding: "18px",
          marginBottom: "24px",
        }}>
          <div style={{ fontSize: "14px", opacity: 0.9, marginBottom: "4px" }}>Total People Impacted</div>
          <div style={{ fontSize: "42px", fontWeight: "bold" }}>{totalPeople}</div>
          <div style={{ fontSize: "13px", opacity: 0.85 }}>
            from just 5 acts of kindness!
          </div>
        </div>

        {/* Badge */}
        <div style={{
          display: "inline-block",
          background: `linear-gradient(135deg, ${COLORS.gold}33, ${COLORS.orange}33)`,
          border: `2px solid ${COLORS.gold}`,
          borderRadius: "16px",
          padding: "16px 32px",
          marginBottom: "24px",
        }}>
          <div style={{ fontSize: "36px" }}>{"\u{1F396}\uFE0F"}</div>
          <div style={{ fontSize: "16px", fontWeight: "bold", color: COLORS.gold }}>
            Kindness Champion Badge
          </div>
          <div style={{ fontSize: "12px", color: COLORS.textDim, marginTop: "4px" }}>
            Awarded for transforming a community
          </div>
        </div>

        <p style={{
          fontSize: "16px",
          lineHeight: 1.7,
          color: COLORS.textDim,
          maxWidth: "440px",
          margin: "0 auto 28px",
          fontStyle: "italic",
        }}>
          "No act of kindness, no matter how small, is ever wasted. One person really can change the world
          {"\u2014"}and that person is you."
        </p>

        <button
          onClick={() => {
            setPhase("intro");
            setTokens(5);
            setChosenActions([]);
            setSelectedLocation(null);
            setRippleStep(0);
            setHappinessMeter(0);
            setRippleEvents([]);
            setTotalDirect(0);
            setTotalIndirect(0);
          }}
          style={{
            background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.green})`,
            border: "none",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "bold",
            padding: "14px 40px",
            borderRadius: "30px",
            cursor: "pointer",
            boxShadow: `0 4px 20px ${COLORS.teal}44`,
          }}
        >
          Spread Kindness Again!
        </button>
      </div>
    </div>
  );
}
