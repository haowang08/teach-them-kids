import { useState, useCallback, useEffect, useRef } from 'react';

// ============================================
// TYPES
// ============================================

type GamePhase = 'intro' | 'playing' | 'results' | 'complete';

interface Violation {
  id: string;
  label: string;
  fixLabel: string;
  fact: string;
  floor: number; // 0-4 (bottom to top)
  xPercent: number;
  yPercent: number; // within the floor
  icon: string;
  fixIcon: string;
}

// ============================================
// CONSTANTS
// ============================================

const TIMER_SECONDS = 90;

const VIOLATIONS: Violation[] = [
  {
    id: 'locked-door',
    label: 'Locked Exit Door',
    fixLabel: 'Unlocked!',
    fact: 'After the Triangle Shirtwaist Fire in 1911, locked exit doors became illegal. 146 workers died because they couldn\'t escape.',
    floor: 0,
    xPercent: 88,
    yPercent: 40,
    icon: '\u{1F512}',
    fixIcon: '\u{1F513}',
  },
  {
    id: 'child-worker',
    label: 'Child Working at Machine',
    fixLabel: 'Sent to school!',
    fact: 'Lewis Hine\'s photographs of child laborers shocked America and helped pass laws banning child labor.',
    floor: 1,
    xPercent: 30,
    yPercent: 50,
    icon: '\u{1F9D2}',
    fixIcon: '\u{1F4DA}',
  },
  {
    id: 'no-fire-escape',
    label: 'Missing Fire Escape',
    fixLabel: 'Installed!',
    fact: 'The Triangle Fire led to 36 new safety laws, including requirements for fire escapes in all factories.',
    floor: 2,
    xPercent: 92,
    yPercent: 30,
    icon: '\u{1F6AB}',
    fixIcon: '\u{1FA9C}',
  },
  {
    id: 'no-safety-gear',
    label: 'Workers Without Safety Gear',
    fixLabel: 'Helmets added!',
    fact: 'Frances Perkins, who witnessed the Triangle Fire, became Secretary of Labor and fought for worker safety standards.',
    floor: 3,
    xPercent: 50,
    yPercent: 45,
    icon: '\u{1F6A8}',
    fixIcon: '\u26D1\uFE0F',
  },
  {
    id: 'long-hours',
    label: '16-Hour Shift Clock',
    fixLabel: 'Set to 8 hours!',
    fact: 'Labor unions fought for decades to establish the 8-hour workday. Before that, 14-16 hour days were common.',
    floor: 4,
    xPercent: 70,
    yPercent: 35,
    icon: '\u{1F551}',
    fixIcon: '\u{1F55B}',
  },
  {
    id: 'pesticide',
    label: 'Pesticide Near Workers',
    fixLabel: 'Moved away!',
    fact: 'C\u00e9sar Ch\u00e1vez led the grape boycott partly because farmworkers were being poisoned by pesticides sprayed while they worked.',
    floor: 1,
    xPercent: 70,
    yPercent: 35,
    icon: '\u2620\uFE0F',
    fixIcon: '\u2705',
  },
  {
    id: 'no-fair-trade',
    label: 'Missing Fair Trade Label',
    fixLabel: 'Stamped!',
    fact: 'Fair Trade labels help ensure workers worldwide get fair wages and safe working conditions.',
    floor: 0,
    xPercent: 20,
    yPercent: 55,
    icon: '\u{1F4E6}',
    fixIcon: '\u{1F3F7}\uFE0F',
  },
];

const FLOOR_COLORS = [
  { bg: '#4a3428', border: '#6b4c3b' }, // Ground floor - dark wood
  { bg: '#3d3028', border: '#5a4435' }, // Floor 1
  { bg: '#3a2e28', border: '#554030' }, // Floor 2
  { bg: '#372c28', border: '#503c2e' }, // Floor 3
  { bg: '#342a28', border: '#4b382c' }, // Top floor
];

// ============================================
// MAIN COMPONENT
// ============================================

export default function FactoryInspector() {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [foundViolations, setFoundViolations] = useState<Set<string>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(TIMER_SECONDS);
  const [currentFix, setCurrentFix] = useState<string | null>(null);
  const [showFact, setShowFact] = useState<string | null>(null);
  const [stampAnimating, setStampAnimating] = useState<string | null>(null);
  const [isSmall, setIsSmall] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    function check() { setIsSmall(window.innerWidth < 640); }
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Timer
  useEffect(() => {
    if (phase !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  // Separate effect to transition to results when time runs out
  useEffect(() => {
    if (phase === 'playing' && timeRemaining === 0) {
      setPhase('results');
    }
  }, [phase, timeRemaining]);

  // Check if all violations found
  useEffect(() => {
    if (phase === 'playing' && foundViolations.size === VIOLATIONS.length) {
      if (timerRef.current) clearInterval(timerRef.current);
      setTimeout(() => setPhase('results'), 1500);
    }
  }, [foundViolations.size, phase]);

  const handleViolationClick = useCallback((violationId: string) => {
    if (foundViolations.has(violationId) || phase !== 'playing') return;
    const violation = VIOLATIONS.find(v => v.id === violationId);
    if (!violation) return;

    setStampAnimating(violationId);
    setCurrentFix(violationId);
    setFoundViolations(prev => new Set([...prev, violationId]));

    setTimeout(() => {
      setStampAnimating(null);
      setShowFact(violation.fact);
      setTimeout(() => {
        setShowFact(null);
        setCurrentFix(null);
      }, 2500);
    }, 800);
  }, [foundViolations, phase]);

  const handleStart = useCallback(() => {
    setPhase('playing');
    setFoundViolations(new Set());
    setTimeRemaining(TIMER_SECONDS);
    setCurrentFix(null);
    setShowFact(null);
    setStampAnimating(null);
  }, []);

  const handleRestart = useCallback(() => {
    setPhase('intro');
    setFoundViolations(new Set());
    setTimeRemaining(TIMER_SECONDS);
    setCurrentFix(null);
    setShowFact(null);
    setStampAnimating(null);
  }, []);

  // ============================================
  // STYLES
  // ============================================

  const containerStyle: React.CSSProperties = {
    background: 'linear-gradient(145deg, #2c1810, #3d2817, #4a3020)',
    borderRadius: 16,
    padding: isSmall ? 12 : 24,
    minHeight: 400,
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    position: 'relative',
    overflow: 'hidden',
    border: '2px solid #8b6914',
    boxShadow: '0 0 20px rgba(139, 105, 20, 0.3)',
  };

  const buttonStyle: React.CSSProperties = {
    padding: isSmall ? '10px 28px' : '14px 48px',
    borderRadius: 8,
    border: '2px solid #c9a82c',
    background: 'linear-gradient(180deg, #c9a82c 0%, #8b6914 100%)',
    color: '#2c1810',
    fontWeight: 800,
    fontSize: isSmall ? 14 : 18,
    cursor: 'pointer',
    boxShadow: '0 0 15px rgba(201, 168, 44, 0.4)',
    transition: 'all 0.2s ease',
    letterSpacing: 1,
  };

  const safetyScore = Math.round((foundViolations.size / VIOLATIONS.length) * 100);

  // ============================================
  // INTRO
  // ============================================

  if (phase === 'intro') {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: isSmall ? 48 : 64, marginBottom: 8 }}>{'\u{1F3ED}'}</div>
          <h2 style={{
            fontSize: isSmall ? 22 : 30,
            fontWeight: 800,
            color: '#c9a82c',
            textShadow: '0 0 10px rgba(201, 168, 44, 0.4)',
            margin: '0 0 8px',
            letterSpacing: 2,
          }}>
            FACTORY INSPECTOR
          </h2>
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 12,
            padding: isSmall ? 16 : 20,
            maxWidth: 520,
            margin: '0 auto 20px',
            textAlign: 'left',
            border: '1px solid rgba(201, 168, 44, 0.3)',
          }}>
            <p style={{ color: '#c9a82c', fontSize: isSmall ? 13 : 15, fontWeight: 'bold', margin: '0 0 8px' }}>
              {'\u{1F4CB}'} INSPECTOR BRIEFING:
            </p>
            <p style={{ color: '#d4c4a0', fontSize: isSmall ? 13 : 15, lineHeight: 1.7, margin: 0 }}>
              After the Triangle Shirtwaist Fire, <strong>YOU</strong> have been appointed as a factory inspector.
              Examine this factory cross-section and <strong style={{ color: '#ff6b6b' }}>find all {VIOLATIONS.length} safety violations</strong> before
              time runs out! Click on hazards to fix them. Each violation is connected to a real reform from history.
            </p>
          </div>
          <button
            onClick={handleStart}
            style={buttonStyle}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            START INSPECTION
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // RESULTS / COMPLETE
  // ============================================

  if (phase === 'results' || phase === 'complete') {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: isSmall ? 48 : 64, marginBottom: 8 }}>
            {safetyScore === 100 ? '\u{1F3C6}' : '\u{1F4CB}'}
          </div>
          <h2 style={{
            fontSize: isSmall ? 22 : 28,
            fontWeight: 800,
            color: safetyScore === 100 ? '#ffd700' : '#c9a82c',
            margin: '0 0 8px',
          }}>
            INSPECTION COMPLETE!
          </h2>

          <div style={{
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 12,
            padding: isSmall ? 16 : 24,
            maxWidth: 500,
            margin: '0 auto 16px',
            border: `1px solid ${safetyScore === 100 ? '#00ff88' : '#c9a82c'}`,
          }}>
            <p style={{
              color: safetyScore === 100 ? '#00ff88' : '#ffa500',
              fontSize: isSmall ? 18 : 24,
              fontWeight: 'bold',
              margin: '0 0 4px',
            }}>
              {foundViolations.size} of {VIOLATIONS.length} violations found!
            </p>
            <p style={{ color: '#d4c4a0', fontSize: isSmall ? 14 : 16, margin: '0 0 12px' }}>
              This factory is now <strong style={{ color: safetyScore === 100 ? '#00ff88' : '#ffa500' }}>{safetyScore}%</strong> safer!
            </p>

            {/* Safety meter */}
            <div style={{
              height: 16,
              background: 'rgba(0,0,0,0.4)',
              borderRadius: 8,
              overflow: 'hidden',
              marginBottom: 16,
            }}>
              <div style={{
                height: '100%',
                width: `${safetyScore}%`,
                background: safetyScore === 100
                  ? 'linear-gradient(90deg, #00ff88, #00cc66)'
                  : safetyScore >= 60
                  ? 'linear-gradient(90deg, #ffa500, #ff8c00)'
                  : 'linear-gradient(90deg, #ff4444, #cc2222)',
                borderRadius: 8,
                transition: 'width 1s ease',
              }} />
            </div>

            {/* Checklist */}
            <div style={{ textAlign: 'left' }}>
              {VIOLATIONS.map(v => {
                const found = foundViolations.has(v.id);
                return (
                  <div key={v.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '4px 0',
                    opacity: found ? 1 : 0.5,
                  }}>
                    <span style={{ fontSize: 16 }}>{found ? '\u2705' : '\u274C'}</span>
                    <span style={{
                      color: found ? '#00ff88' : '#ff6b6b',
                      fontSize: isSmall ? 12 : 13,
                      fontWeight: found ? 'bold' : 'normal',
                    }}>
                      {v.label} {found ? `\u2014 ${v.fixLabel}` : ''}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleRestart}
            style={buttonStyle}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            INSPECT AGAIN
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // PLAYING
  // ============================================

  const timerPercent = (timeRemaining / TIMER_SECONDS) * 100;
  const timerColor = timerPercent > 50 ? '#00ff88' : timerPercent > 25 ? '#ffa500' : '#ff4444';

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        flexWrap: 'wrap',
        gap: 8,
      }}>
        <div style={{
          color: '#c9a82c',
          fontWeight: 700,
          fontSize: isSmall ? 12 : 14,
        }}>
          {'\u{1F50D}'} FOUND: {foundViolations.size}/{VIOLATIONS.length}
        </div>
        <div style={{
          color: timerColor,
          fontWeight: 700,
          fontSize: isSmall ? 12 : 14,
          fontFamily: 'monospace',
        }}>
          {'\u23F1\uFE0F'} {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
        </div>
      </div>

      {/* Timer bar */}
      <div style={{
        height: 6,
        background: 'rgba(0,0,0,0.3)',
        borderRadius: 3,
        marginBottom: 10,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${timerPercent}%`,
          background: timerColor,
          borderRadius: 3,
          transition: 'width 1s linear, background 0.5s',
        }} />
      </div>

      {/* Factory cross-section */}
      <div style={{
        position: 'relative',
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
        border: '2px solid #6b4c3b',
      }}>
        {/* Floors */}
        {FLOOR_COLORS.map((floorColor, floorIndex) => {
          const floorNum = FLOOR_COLORS.length - 1 - floorIndex; // top to bottom
          const floorViolations = VIOLATIONS.filter(v => v.floor === floorNum);
          return (
            <div
              key={floorNum}
              style={{
                position: 'relative',
                height: isSmall ? 60 : 80,
                background: floorColor.bg,
                borderBottom: `2px solid ${floorColor.border}`,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* Floor label */}
              <div style={{
                position: 'absolute',
                left: 4,
                top: 4,
                color: 'rgba(200, 180, 140, 0.3)',
                fontSize: isSmall ? 9 : 11,
                fontFamily: 'monospace',
              }}>
                F{floorNum + 1}
              </div>

              {/* Machine silhouettes as background decoration */}
              {floorNum < 4 && (
                <div style={{
                  position: 'absolute',
                  left: '10%',
                  bottom: 0,
                  width: '80%',
                  height: '70%',
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'flex-end',
                  opacity: 0.15,
                }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} style={{
                      width: '15%',
                      height: `${40 + i * 15}%`,
                      background: '#8b7355',
                      borderRadius: '4px 4px 0 0',
                    }} />
                  ))}
                </div>
              )}

              {/* Violations on this floor */}
              {floorViolations.map(violation => {
                const isFound = foundViolations.has(violation.id);
                const isFixing = stampAnimating === violation.id;
                const isCurrent = currentFix === violation.id;
                return (
                  <div
                    key={violation.id}
                    onClick={() => handleViolationClick(violation.id)}
                    style={{
                      position: 'absolute',
                      left: `${violation.xPercent}%`,
                      top: `${violation.yPercent}%`,
                      transform: 'translate(-50%, -50%)',
                      cursor: isFound ? 'default' : 'pointer',
                      zIndex: isCurrent ? 10 : 2,
                      transition: 'transform 0.2s',
                    }}
                    onMouseEnter={e => {
                      if (!isFound) e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.3)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                    }}
                  >
                    {/* Glow hint for unfound violations */}
                    {!isFound && (
                      <div style={{
                        position: 'absolute',
                        inset: -6,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(255,100,100,0.3) 0%, transparent 70%)',
                        animation: 'violationPulse 2s ease-in-out infinite',
                      }} />
                    )}
                    <div style={{
                      fontSize: isSmall ? 22 : 30,
                      filter: isFound ? 'none' : 'drop-shadow(0 0 6px rgba(255,100,100,0.6))',
                      position: 'relative',
                    }}>
                      {isFound ? violation.fixIcon : violation.icon}
                    </div>
                    {/* FIXED stamp */}
                    {isFixing && (
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%) rotate(-15deg)',
                        background: 'rgba(0, 200, 100, 0.9)',
                        color: '#fff',
                        fontWeight: 900,
                        fontSize: isSmall ? 10 : 14,
                        padding: '2px 8px',
                        borderRadius: 4,
                        border: '2px solid #fff',
                        whiteSpace: 'nowrap',
                        animation: 'stampIn 0.4s ease-out',
                        zIndex: 20,
                      }}>
                        FIXED!
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Roof */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: '#6b4c3b',
        }} />
      </div>

      {/* Fact display */}
      {showFact && (
        <div style={{
          marginTop: 10,
          background: 'rgba(0, 200, 100, 0.1)',
          borderRadius: 10,
          padding: isSmall ? 10 : 14,
          border: '1px solid rgba(0, 200, 100, 0.4)',
          textAlign: 'center',
          animation: 'fadeInUp 0.3s ease-out',
        }}>
          <p style={{ color: '#d4c4a0', fontSize: isSmall ? 12 : 14, margin: 0, lineHeight: 1.6 }}>
            {'\u{1F4A1}'} {showFact}
          </p>
        </div>
      )}

      {!showFact && !currentFix && (
        <div style={{
          marginTop: 10,
          textAlign: 'center',
          color: '#a09070',
          fontSize: isSmall ? 12 : 14,
        }}>
          {'\u{1F50D}'} Click on hazards in the factory to fix them!
        </div>
      )}

      {/* Clipboard sidebar on larger screens */}
      {!isSmall && (
        <div style={{
          marginTop: 12,
          background: 'rgba(0,0,0,0.2)',
          borderRadius: 10,
          padding: 12,
          border: '1px solid rgba(201, 168, 44, 0.2)',
        }}>
          <p style={{ color: '#c9a82c', fontSize: 12, fontWeight: 'bold', margin: '0 0 8px' }}>
            {'\u{1F4CB}'} INSPECTOR CHECKLIST:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {VIOLATIONS.map(v => (
              <span key={v.id} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '3px 8px',
                borderRadius: 4,
                background: foundViolations.has(v.id) ? 'rgba(0,200,100,0.15)' : 'rgba(0,0,0,0.2)',
                border: `1px solid ${foundViolations.has(v.id) ? 'rgba(0,200,100,0.3)' : 'rgba(100,80,60,0.3)'}`,
                color: foundViolations.has(v.id) ? '#00ff88' : '#8a7a60',
                fontSize: 11,
                fontWeight: foundViolations.has(v.id) ? 'bold' : 'normal',
                textDecoration: foundViolations.has(v.id) ? 'line-through' : 'none',
              }}>
                {foundViolations.has(v.id) ? '\u2705' : '\u2B1C'} {v.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes violationPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        @keyframes stampIn {
          0% { transform: translate(-50%, -50%) rotate(-15deg) scale(3); opacity: 0; }
          60% { transform: translate(-50%, -50%) rotate(-15deg) scale(0.9); opacity: 1; }
          100% { transform: translate(-50%, -50%) rotate(-15deg) scale(1); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
