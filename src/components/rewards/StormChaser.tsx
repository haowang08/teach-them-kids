import { useState, useCallback, useRef, useEffect } from 'react';

// ============================================
// TYPES
// ============================================

type GamePhase = 'intro' | 'playing' | 'debrief' | 'complete';
type DecisionStep = 'identify' | 'warn' | 'advise';

interface City {
  id: string;
  name: string;
  x: number; // percentage
  y: number; // percentage
  inPath: boolean;
}

interface StormOption {
  text: string;
  isCorrect: boolean;
}

interface StormEvent {
  id: string;
  type: string;
  emoji: string;
  name: string;
  description: string;
  x: number;
  y: number;
  identifyPrompt: string;
  identifyOptions: StormOption[];
  warnCity: string; // city id to warn
  warnPrompt: string;
  advicePrompt: string;
  adviceOptions: StormOption[];
  debrief: string;
  livesSaved: number;
}

// ============================================
// CONSTANTS
// ============================================

const CITIES: City[] = [
  { id: 'riverside', name: 'Riverside', x: 25, y: 30, inPath: false },
  { id: 'coastal', name: 'Coastal City', x: 75, y: 60, inPath: false },
  { id: 'highland', name: 'Highland Town', x: 40, y: 70, inPath: false },
  { id: 'farmville', name: 'Farmville', x: 60, y: 25, inPath: false },
  { id: 'lakeside', name: 'Lakeside', x: 50, y: 50, inPath: false },
];

const STORM_EVENTS: StormEvent[] = [
  {
    id: 'tornado',
    type: 'tornado',
    emoji: '\u{1F32A}\uFE0F',
    name: 'Tornado',
    description: 'A fast-spinning funnel detected moving northeast!',
    x: 15,
    y: 35,
    identifyPrompt: 'A small, fast-moving spiral is heading toward Riverside. What is it?',
    identifyOptions: [
      { text: 'Tornado', isCorrect: true },
      { text: 'Hurricane', isCorrect: false },
      { text: 'Dust Storm', isCorrect: false },
    ],
    warnCity: 'riverside',
    warnPrompt: 'Which city is in the tornado\'s path?',
    advicePrompt: 'What safety advice should we broadcast?',
    adviceOptions: [
      { text: 'Get to a basement or interior room NOW!', isCorrect: true },
      { text: 'Evacuate by car immediately', isCorrect: false },
      { text: 'Go to the beach for open space', isCorrect: false },
    ],
    debrief: 'Great work! Tornadoes are the most violent storms on Earth, with winds up to 300 mph. Basements and interior rooms are safest because debris flies horizontally. You saved Riverside!',
    livesSaved: 2400,
  },
  {
    id: 'hurricane',
    type: 'hurricane',
    emoji: '\u{1F300}',
    name: 'Hurricane',
    description: 'A massive rotating storm system approaching from the ocean!',
    x: 85,
    y: 55,
    identifyPrompt: 'A large, slow-moving spiral with 145 mph winds is approaching from the sea. What Saffir-Simpson category is this?',
    identifyOptions: [
      { text: 'Category 4 (130-156 mph)', isCorrect: true },
      { text: 'Category 2 (96-110 mph)', isCorrect: false },
      { text: 'Category 5 (157+ mph)', isCorrect: false },
    ],
    warnCity: 'coastal',
    warnPrompt: 'Which coastal city needs to evacuate?',
    advicePrompt: 'What is the most dangerous part of a hurricane?',
    adviceOptions: [
      { text: 'Storm surge \u2014 walls of ocean water flooding the coast', isCorrect: true },
      { text: 'The eye of the hurricane', isCorrect: false },
      { text: 'Lightning strikes from the storm clouds', isCorrect: false },
    ],
    debrief: 'Correct! Hurricane storm surge kills more people than wind. A Category 4 hurricane pushes ocean water 13-18 feet above normal, flooding entire neighborhoods. Evacuating Coastal City was essential!',
    livesSaved: 15000,
  },
  {
    id: 'tsunami',
    type: 'tsunami',
    emoji: '\u{1F30A}',
    name: 'Tsunami',
    description: 'Earthquake detected under the ocean floor! Seismic waves spreading...',
    x: 90,
    y: 45,
    identifyPrompt: 'An undersea earthquake just hit! The ocean is pulling away from the shore. What is about to happen?',
    identifyOptions: [
      { text: 'A tsunami is coming \u2014 the drawback is a warning sign!', isCorrect: true },
      { text: 'The tide is just going out normally', isCorrect: false },
      { text: 'A hurricane is forming offshore', isCorrect: false },
    ],
    warnCity: 'coastal',
    warnPrompt: 'Which city near the coast needs an urgent warning?',
    advicePrompt: 'What should people do when a tsunami warning is issued?',
    adviceOptions: [
      { text: 'Move to high ground immediately!', isCorrect: true },
      { text: 'Stay on the beach and watch for the wave', isCorrect: false },
      { text: 'Get in a car and drive toward the ocean', isCorrect: false },
    ],
    debrief: 'You spotted the drawback! When the ocean suddenly pulls away from shore, a tsunami is likely minutes away. Tsunamis can travel 500 mph across the open ocean. Moving to high ground saved thousands of lives!',
    livesSaved: 8500,
  },
  {
    id: 'lightning',
    type: 'lightning',
    emoji: '\u26A1',
    name: 'Lightning Storm',
    description: 'Dark thunderclouds rolling in with electrical activity detected!',
    x: 45,
    y: 40,
    identifyPrompt: 'You see a flash of lightning, then hear thunder 10 seconds later. How far away is the storm?',
    identifyOptions: [
      { text: 'About 2 miles away (sound travels ~1 mile per 5 seconds)', isCorrect: true },
      { text: 'About 10 miles away', isCorrect: false },
      { text: 'Right on top of us!', isCorrect: false },
    ],
    warnCity: 'lakeside',
    warnPrompt: 'Which town near the lake needs a lightning warning?',
    advicePrompt: 'What is the 30/30 rule for lightning safety?',
    adviceOptions: [
      { text: 'If thunder comes within 30 seconds of lightning, get inside. Stay inside 30 minutes after the last thunder.', isCorrect: true },
      { text: 'Run 30 feet from any tree and wait 30 seconds', isCorrect: false },
      { text: 'Count to 30 and the storm will pass', isCorrect: false },
    ],
    debrief: 'The 30/30 rule saves lives! Lightning can strike up to 10 miles from a storm. Sound travels about 1 mile every 5 seconds, so 10 seconds = 2 miles. That\'s close enough to be dangerous!',
    livesSaved: 320,
  },
  {
    id: 'hailstorm',
    type: 'hailstorm',
    emoji: '\u{1F9CA}',
    name: 'Hailstorm',
    description: 'Strong updrafts detected \u2014 ice is forming in the upper atmosphere!',
    x: 55,
    y: 20,
    identifyPrompt: 'Powerful updrafts are carrying water droplets high into freezing air. What extreme weather will this cause?',
    identifyOptions: [
      { text: 'A hailstorm \u2014 ice balls forming from repeated updraft cycles', isCorrect: true },
      { text: 'A snowstorm from the frozen air', isCorrect: false },
      { text: 'A tornado from the strong winds', isCorrect: false },
    ],
    warnCity: 'farmville',
    warnPrompt: 'Which agricultural area needs a hail warning?',
    advicePrompt: 'Why are hailstorms so dangerous to farmers?',
    adviceOptions: [
      { text: 'Hailstones can destroy entire crops in minutes and injure livestock', isCorrect: true },
      { text: 'Hail melts too fast and causes flooding', isCorrect: false },
      { text: 'Hail makes the soil too cold to grow anything', isCorrect: false },
    ],
    debrief: 'Hailstones form when updrafts carry raindrops into freezing air. The strongest updrafts create baseball-sized hail! A single hailstorm can cause billions of dollars in crop damage. Your warning gave farmers time to protect their livestock!',
    livesSaved: 150,
  },
];

// ============================================
// STYLES
// ============================================

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 700,
    margin: '0 auto',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    userSelect: 'none',
  },
  radarBg: {
    position: 'relative',
    width: '100%',
    paddingBottom: '70%',
    backgroundColor: '#0a1628',
    borderRadius: 16,
    overflow: 'hidden',
    border: '2px solid #1a3a5c',
  },
  radarInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage:
      'linear-gradient(rgba(34, 197, 94, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.08) 1px, transparent 1px)',
    backgroundSize: '10% 10%',
    pointerEvents: 'none',
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.3), transparent)',
    animation: 'scanMove 3s linear infinite',
    pointerEvents: 'none',
  },
  cityDot: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
    textAlign: 'center' as const,
    transition: 'transform 0.2s, filter 0.2s',
  },
  cityCircle: {
    width: 14,
    height: 14,
    borderRadius: '50%',
    backgroundColor: '#4ade80',
    border: '2px solid #166534',
    margin: '0 auto',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  },
  cityLabel: {
    fontSize: 10,
    color: '#86efac',
    marginTop: 2,
    whiteSpace: 'nowrap' as const,
    textShadow: '0 0 4px rgba(0,0,0,0.8)',
  },
  stormIcon: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    fontSize: 36,
    animation: 'stormPulse 1.5s ease-in-out infinite',
    pointerEvents: 'none',
    filter: 'drop-shadow(0 0 8px rgba(255,100,100,0.6))',
  },
  scoreBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 16px',
    backgroundColor: '#0f1d32',
    borderRadius: 12,
    marginBottom: 12,
    border: '1px solid #1a3a5c',
  },
  livesCounter: {
    color: '#4ade80',
    fontSize: 18,
    fontWeight: 700,
    fontVariantNumeric: 'tabular-nums',
  },
  eventLabel: {
    color: '#94a3b8',
    fontSize: 13,
  },
  progressDots: {
    display: 'flex',
    gap: 6,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    transition: 'background-color 0.3s',
  },
  questionPanel: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: '16px 20px',
    marginTop: 12,
    border: '1px solid #334155',
  },
  questionText: {
    color: '#e2e8f0',
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 12,
    lineHeight: 1.5,
  },
  optionBtn: {
    display: 'block',
    width: '100%',
    padding: '10px 16px',
    marginBottom: 8,
    borderRadius: 8,
    border: '2px solid #475569',
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    textAlign: 'left' as const,
    transition: 'border-color 0.2s, background-color 0.2s',
  },
  optionCorrect: {
    borderColor: '#22c55e',
    backgroundColor: '#052e16',
    color: '#86efac',
  },
  optionWrong: {
    borderColor: '#ef4444',
    backgroundColor: '#450a0a',
    color: '#fca5a5',
  },
  debriefPanel: {
    backgroundColor: '#fef9ef',
    borderRadius: 12,
    padding: '20px 24px',
    marginTop: 12,
    border: '1px solid #d4a056',
  },
  debriefTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: '#92400e',
    marginBottom: 8,
  },
  debriefText: {
    fontSize: 14,
    color: '#78350f',
    lineHeight: 1.6,
  },
  nextBtn: {
    display: 'inline-block',
    marginTop: 14,
    padding: '10px 28px',
    borderRadius: 8,
    border: 'none',
    backgroundColor: '#22c55e',
    color: '#fff',
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  introCard: {
    textAlign: 'center' as const,
    padding: 32,
    backgroundColor: '#0f1d32',
    borderRadius: 16,
    border: '1px solid #1a3a5c',
  },
  introTitle: {
    fontSize: 28,
    fontWeight: 800,
    color: '#4ade80',
    marginBottom: 8,
  },
  introSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 24,
    lineHeight: 1.6,
  },
  startBtn: {
    padding: '14px 40px',
    borderRadius: 10,
    border: 'none',
    backgroundColor: '#22c55e',
    color: '#fff',
    fontSize: 17,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  completeCard: {
    textAlign: 'center' as const,
    padding: 32,
    backgroundColor: '#0f1d32',
    borderRadius: 16,
    border: '2px solid #22c55e',
  },
  completeTitle: {
    fontSize: 28,
    fontWeight: 800,
    color: '#4ade80',
    marginBottom: 8,
  },
  completeSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 20,
    lineHeight: 1.6,
  },
  statRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 20,
  },
  statBox: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: '12px 20px',
    textAlign: 'center' as const,
    minWidth: 100,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 800,
    color: '#4ade80',
  },
  statLabel: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
  },
  cityHighlight: {
    backgroundColor: '#facc15',
    boxShadow: '0 0 12px rgba(250,204,21,0.6)',
    border: '2px solid #ca8a04',
  },
};

const keyframesStyle = `
@keyframes scanMove {
  0% { top: 0%; }
  100% { top: 100%; }
}
@keyframes stormPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.9; }
  50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
}
@keyframes popIn {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
`;

// ============================================
// COMPONENT
// ============================================

export default function StormChaser() {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [eventIndex, setEventIndex] = useState(0);
  const [step, setStep] = useState<DecisionStep>('identify');
  const [totalLivesSaved, setTotalLivesSaved] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [eventsCompleted, setEventsCompleted] = useState(0);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    };
  }, []);

  const currentEvent = STORM_EVENTS[eventIndex];

  const handleOptionClick = useCallback(
    (index: number, correct: boolean) => {
      if (selectedOption !== null) return;
      setSelectedOption(index);
      setIsCorrect(correct);

      if (correct) {
        feedbackTimerRef.current = setTimeout(() => {
          if (step === 'identify') {
            setStep('warn');
            setSelectedOption(null);
            setIsCorrect(null);
          } else if (step === 'advise') {
            setTotalLivesSaved((prev) => prev + currentEvent.livesSaved);
            setPhase('debrief');
            setSelectedOption(null);
            setIsCorrect(null);
          }
        }, 800);
      } else {
        feedbackTimerRef.current = setTimeout(() => {
          setSelectedOption(null);
          setIsCorrect(null);
        }, 1200);
      }
    },
    [selectedOption, step, currentEvent],
  );

  const [wrongCity, setWrongCity] = useState<string | null>(null);

  const handleCityClick = useCallback(
    (cityId: string) => {
      if (step !== 'warn') return;
      if (cityId === currentEvent.warnCity) {
        setWrongCity(null);
        setStep('advise');
      } else {
        setWrongCity(cityId);
        setTimeout(() => setWrongCity(null), 1200);
      }
    },
    [step, currentEvent],
  );

  const handleNext = useCallback(() => {
    const nextIndex = eventIndex + 1;
    setEventsCompleted((prev) => prev + 1);
    if (nextIndex >= STORM_EVENTS.length) {
      setPhase('complete');
    } else {
      setEventIndex(nextIndex);
      setStep('identify');
      setSelectedOption(null);
      setIsCorrect(null);
      setPhase('playing');
    }
  }, [eventIndex]);

  const getCurrentOptions = (): StormOption[] => {
    if (step === 'identify') return currentEvent.identifyOptions;
    if (step === 'advise') return currentEvent.adviceOptions;
    return [];
  };

  const getCurrentPrompt = (): string => {
    if (step === 'identify') return currentEvent.identifyPrompt;
    if (step === 'warn') return currentEvent.warnPrompt;
    return currentEvent.advicePrompt;
  };

  // ── INTRO ──
  if (phase === 'intro') {
    return (
      <div style={styles.container}>
        <style>{keyframesStyle}</style>
        <div style={styles.introCard}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{'\u{1F32A}\uFE0F'}</div>
          <div style={styles.introTitle}>Storm Chaser Command</div>
          <div style={styles.introSubtitle}>
            You are in charge of the Weather Command Center! Track 5 extreme weather events,
            identify each storm, warn the right communities, and save as many lives as possible.
          </div>
          <button
            style={styles.startBtn}
            onClick={() => setPhase('playing')}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'scale(1)';
            }}
          >
            Start Mission
          </button>
        </div>
      </div>
    );
  }

  // ── COMPLETE ──
  if (phase === 'complete') {
    return (
      <div style={styles.container}>
        <style>{keyframesStyle}</style>
        <div style={styles.completeCard}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{'\u{1F3C6}'}</div>
          <div style={styles.completeTitle}>Mission Complete!</div>
          <div style={styles.completeSubtitle}>
            Outstanding work, Commander! You tracked every storm and protected communities
            across the region.
          </div>
          <div style={styles.statRow}>
            <div style={styles.statBox}>
              <div style={styles.statValue}>{totalLivesSaved.toLocaleString()}</div>
              <div style={styles.statLabel}>Lives Saved</div>
            </div>
            <div style={styles.statBox}>
              <div style={styles.statValue}>5/5</div>
              <div style={styles.statLabel}>Storms Tracked</div>
            </div>
          </div>
          <div
            style={{
              fontSize: 14,
              color: '#94a3b8',
              lineHeight: 1.6,
              maxWidth: 480,
              margin: '0 auto',
            }}
          >
            Real meteorologists use radar, satellites, and computer models to track storms just
            like you did. Their warnings save thousands of lives every year. Knowledge really is
            a superpower!
          </div>
        </div>
      </div>
    );
  }

  // ── PLAYING / DEBRIEF ──
  return (
    <div style={styles.container}>
      <style>{keyframesStyle}</style>

      {/* Score bar */}
      <div style={styles.scoreBar}>
        <div>
          <span style={styles.livesCounter}>
            {'\u{1F49A}'} {totalLivesSaved.toLocaleString()} Lives Saved
          </span>
        </div>
        <div style={styles.progressDots}>
          {STORM_EVENTS.map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.progressDot,
                backgroundColor:
                  i < eventsCompleted ? '#22c55e' : i === eventIndex && phase === 'playing' ? '#facc15' : '#334155',
              }}
            />
          ))}
        </div>
      </div>

      {/* Radar map */}
      <div style={styles.radarBg}>
        <div style={styles.radarInner}>
          {/* Grid overlay */}
          <div style={styles.gridOverlay} />

          {/* Scan line */}
          {phase === 'playing' && <div style={styles.scanLine} />}

          {/* Cities */}
          {CITIES.map((city) => {
            const showHighlight = step === 'warn';
            return (
              <div
                key={city.id}
                style={{
                  ...styles.cityDot,
                  left: `${city.x}%`,
                  top: `${city.y}%`,
                  cursor: showHighlight ? 'pointer' : 'default',
                }}
                onClick={() => handleCityClick(city.id)}
              >
                <div
                  style={{
                    ...styles.cityCircle,
                    ...(showHighlight
                      ? { cursor: 'pointer', transform: 'scale(1.2)' }
                      : {}),
                    ...(wrongCity === city.id
                      ? { background: '#ef4444', boxShadow: '0 0 12px #ef4444', transform: 'scale(1.3)' }
                      : {}),
                  }}
                />
                <div style={styles.cityLabel}>
                  {city.name}
                  {wrongCity === city.id && <span style={{ color: '#ef4444', marginLeft: 4 }}>{'\u2717'}</span>}
                </div>
              </div>
            );
          })}

          {/* Storm icon */}
          {phase === 'playing' && (
            <div
              style={{
                ...styles.stormIcon,
                left: `${currentEvent.x}%`,
                top: `${currentEvent.y}%`,
              }}
            >
              {currentEvent.emoji}
            </div>
          )}

          {/* Event label overlay */}
          <div
            style={{
              position: 'absolute',
              top: 10,
              left: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ color: '#ef4444', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 1 }}>
              {'\u{1F534}'} ALERT
            </span>
            <span style={styles.eventLabel}>
              Event {eventIndex + 1}/5: {currentEvent.name}
            </span>
          </div>
        </div>
      </div>

      {/* Decision panel or debrief */}
      {phase === 'debrief' ? (
        <div style={styles.debriefPanel}>
          <div style={styles.debriefTitle}>
            {'\u2705'} +{currentEvent.livesSaved.toLocaleString()} Lives Saved!
          </div>
          <div style={styles.debriefText}>{currentEvent.debrief}</div>
          <button
            style={styles.nextBtn}
            onClick={handleNext}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = '#16a34a';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = '#22c55e';
            }}
          >
            {eventIndex + 1 >= STORM_EVENTS.length ? 'See Results' : 'Next Storm \u2192'}
          </button>
        </div>
      ) : (
        <div style={styles.questionPanel}>
          {/* Step indicator */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              marginBottom: 12,
            }}
          >
            {(['identify', 'warn', 'advise'] as DecisionStep[]).map((s) => (
              <div
                key={s}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase' as const,
                  letterSpacing: 1,
                  color: s === step ? '#facc15' : '#475569',
                  borderBottom: s === step ? '2px solid #facc15' : '2px solid transparent',
                  paddingBottom: 4,
                }}
              >
                {s === 'identify' ? '1. Identify' : s === 'warn' ? '2. Warn' : '3. Advise'}
              </div>
            ))}
          </div>

          <div style={styles.questionText}>{getCurrentPrompt()}</div>

          {step === 'warn' ? (
            <div style={{ color: '#94a3b8', fontSize: 13 }}>
              {'\u{1F446}'} Click the correct city on the radar map above
            </div>
          ) : (
            getCurrentOptions().map((opt, i) => {
              let btnStyle = { ...styles.optionBtn };
              if (selectedOption === i) {
                btnStyle = {
                  ...btnStyle,
                  ...(isCorrect ? styles.optionCorrect : styles.optionWrong),
                };
              }
              return (
                <button
                  key={i}
                  style={btnStyle}
                  onClick={() => handleOptionClick(i, opt.isCorrect)}
                  onMouseEnter={(e) => {
                    if (selectedOption === null) {
                      (e.target as HTMLButtonElement).style.borderColor = '#94a3b8';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedOption === null) {
                      (e.target as HTMLButtonElement).style.borderColor = '#475569';
                    }
                  }}
                >
                  {opt.text}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
