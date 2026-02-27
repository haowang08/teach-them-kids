import { useState, useCallback, useEffect } from 'react';

// ============================================
// TYPES
// ============================================

type GamePhase = 'intro' | 'playing' | 'complete';

interface CityData {
  id: string;
  name: string;
  x: number; // percentage
  y: number; // percentage
  cipherWord: string;
  shift: number;
  fact: string;
  connection: string; // id of city to connect to
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
}

// ============================================
// CONSTANTS
// ============================================

const CITIES: CityData[] = [
  {
    id: 'london',
    name: 'London',
    x: 42,
    y: 22,
    cipherWord: 'CUTHBERT',
    shift: 1,
    fact: 'Virginia Hall named her wooden leg Cuthbert!',
    connection: 'paris',
  },
  {
    id: 'paris',
    name: 'Paris',
    x: 47,
    y: 35,
    cipherWord: 'MADELEINE',
    shift: 1,
    fact: 'Noor Inayat Khan used the code name "Madeleine" as a radio operator in Paris.',
    connection: 'london',
  },
  {
    id: 'lisbon',
    name: 'Lisbon',
    x: 30,
    y: 58,
    cipherWord: 'GARBO',
    shift: 2,
    fact: 'Juan Pujol Garcia, code name "Garbo," invented 27 fake agents to fool the Nazis!',
    connection: 'paris',
  },
  {
    id: 'berlin',
    name: 'Berlin',
    x: 58,
    y: 28,
    cipherWord: 'LIBERTE',
    shift: 2,
    fact: 'Noor Inayat Khan\'s last word was "Libert\u00e9" (Freedom).',
    connection: 'paris',
  },
  {
    id: 'marseille',
    name: 'Marseille',
    x: 48,
    y: 50,
    cipherWord: 'MOUSE',
    shift: 3,
    fact: 'The Gestapo called Nancy Wake "the White Mouse" because she always slipped away!',
    connection: 'paris',
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    x: 50,
    y: 20,
    cipherWord: 'NORMANDY',
    shift: 3,
    fact: 'Garbo\'s greatest trick was convincing the Nazis the real D-Day target wasn\'t Normandy!',
    connection: 'berlin',
  },
  {
    id: 'washington',
    name: 'Washington',
    x: 12,
    y: 35,
    cipherWord: 'TUBMAN',
    shift: 2,
    fact: 'Harriet Tubman was the first woman in U.S. history to plan and lead a military raid!',
    connection: 'london',
  },
  {
    id: 'lyon',
    name: 'Lyon',
    x: 50,
    y: 42,
    cipherWord: 'COMBAHEE',
    shift: 3,
    fact: 'The Combahee River Raid led by Tubman freed over 700 enslaved people in one night!',
    connection: 'marseille',
  },
];

function caesarEncode(text: string, shift: number): string {
  return text
    .toUpperCase()
    .split('')
    .map((char) => {
      if (char >= 'A' && char <= 'Z') {
        const index = char.charCodeAt(0) - 65;
        const newIndex = (index + shift) % 26;
        return String.fromCharCode(newIndex + 65);
      }
      return char;
    })
    .join('');
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function SpyNetworkBuilder() {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [decodedCities, setDecodedCities] = useState<Set<string>>(new Set());
  const [currentCity, setCurrentCity] = useState<string | null>(null);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');
  const [factMessage, setFactMessage] = useState('');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    function check() { setIsSmall(window.innerWidth < 640); }
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Animate particles
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles(prev => prev
        .map(p => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, vy: p.vy + 0.3, life: p.life - 1 }))
        .filter(p => p.life > 0)
      );
    }, 30);
    return () => clearInterval(interval);
  }, [particles.length]);

  const spawnParticles = useCallback((x: number, y: number) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 12; i++) {
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6 - 2,
        color: ['#ffd700', '#00ff88', '#e94560', '#ffa500'][Math.floor(Math.random() * 4)],
        life: 30 + Math.floor(Math.random() * 20),
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  const handleCityClick = useCallback((cityId: string) => {
    if (decodedCities.has(cityId)) return;
    setCurrentCity(cityId);
    setUserInput('');
    setFeedback('none');
    setFactMessage('');
  }, [decodedCities]);

  const handleSubmit = useCallback(() => {
    if (!currentCity) return;
    const city = CITIES.find(c => c.id === currentCity);
    if (!city) return;

    const normalizedInput = userInput.toUpperCase().replace(/[^A-Z]/g, '');
    const expected = city.cipherWord.toUpperCase().replace(/[^A-Z]/g, '');

    if (normalizedInput === expected) {
      setFeedback('correct');
      setFactMessage(city.fact);
      setDecodedCities(prev => new Set([...prev, currentCity]));
      spawnParticles(city.x, city.y);

      const newCount = decodedCities.size + 1;
      if (newCount >= 6) {
        setTimeout(() => {
          setPhase('complete');
        }, 2500);
      } else {
        setTimeout(() => {
          setCurrentCity(null);
          setFeedback('none');
          setFactMessage('');
        }, 3000);
      }
    } else {
      setFeedback('incorrect');
      setTimeout(() => setFeedback('none'), 1200);
    }
  }, [currentCity, userInput, decodedCities, spawnParticles]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userInput.trim()) {
      handleSubmit();
    }
  }, [userInput, handleSubmit]);

  const handleRestart = useCallback(() => {
    setPhase('intro');
    setDecodedCities(new Set());
    setCurrentCity(null);
    setUserInput('');
    setFeedback('none');
    setFactMessage('');
    setParticles([]);
  }, []);

  // ============================================
  // STYLES
  // ============================================

  const containerStyle: React.CSSProperties = {
    background: 'linear-gradient(145deg, #1a1a2e, #16213e, #0f3460)',
    borderRadius: 16,
    padding: isSmall ? 12 : 24,
    minHeight: 400,
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    position: 'relative',
    overflow: 'hidden',
    border: '2px solid #d4a843',
    boxShadow: '0 0 30px rgba(212, 168, 67, 0.2)',
  };

  const buttonStyle: React.CSSProperties = {
    padding: isSmall ? '10px 28px' : '14px 48px',
    borderRadius: 8,
    border: '2px solid #d4a843',
    background: 'linear-gradient(180deg, #d4a843 0%, #b8860b 100%)',
    color: '#1a1a2e',
    fontWeight: 800,
    fontSize: isSmall ? 14 : 18,
    cursor: 'pointer',
    boxShadow: '0 0 15px rgba(212, 168, 67, 0.4)',
    transition: 'all 0.2s ease',
    letterSpacing: 1,
  };

  // ============================================
  // INTRO
  // ============================================

  if (phase === 'intro') {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: isSmall ? 48 : 64, marginBottom: 8 }}>{'\u{1F575}\uFE0F'}</div>
          <h2 style={{
            fontSize: isSmall ? 22 : 30,
            fontWeight: 800,
            color: '#d4a843',
            textShadow: '0 0 10px rgba(212, 168, 67, 0.5)',
            margin: '0 0 8px',
            letterSpacing: 2,
          }}>
            SPY NETWORK BUILDER
          </h2>
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 12,
            padding: isSmall ? 16 : 20,
            maxWidth: 520,
            margin: '0 auto 20px',
            textAlign: 'left',
            border: '1px solid rgba(212, 168, 67, 0.3)',
          }}>
            <p style={{ color: '#d4a843', fontSize: isSmall ? 11 : 13, fontFamily: 'monospace', margin: '0 0 8px' }}>
              CLASSIFIED BRIEFING:
            </p>
            <p style={{ color: '#c0c0d0', fontSize: isSmall ? 13 : 15, lineHeight: 1.7, margin: 0 }}>
              Your mission: build a secret spy network across Europe and the Americas. Click cities on the map to expand your network.
              Each city presents a <strong style={{ color: '#00ff88' }}>Caesar cipher</strong> challenge.
              Decode the word to connect the city to your network.
              Connect <strong style={{ color: '#ffd700' }}>6 or more cities</strong> to complete the mission!
            </p>
          </div>
          <button
            onClick={() => setPhase('playing')}
            style={buttonStyle}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            ACCEPT MISSION
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // COMPLETE
  // ============================================

  if (phase === 'complete') {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: isSmall ? 48 : 64, marginBottom: 8 }}>{'\u{1F3C6}'}</div>
          <h2 style={{
            fontSize: isSmall ? 22 : 28,
            fontWeight: 800,
            color: '#ffd700',
            textShadow: '0 0 15px rgba(255, 215, 0, 0.5)',
            margin: '0 0 8px',
          }}>
            MISSION COMPLETE!
          </h2>
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 12,
            padding: isSmall ? 16 : 24,
            maxWidth: 500,
            margin: '0 auto 20px',
            border: '1px solid #00ff88',
          }}>
            <p style={{ color: '#00ff88', fontSize: isSmall ? 16 : 20, fontWeight: 'bold', margin: '0 0 8px' }}>
              Your spy network spans {decodedCities.size} cities!
            </p>
            <p style={{ color: '#c0c0d0', fontSize: isSmall ? 13 : 15, margin: 0, lineHeight: 1.6 }}>
              The intelligence is flowing across your network. You decoded secret messages, connected
              safe houses, and proved yourself a true spymaster. The Allied forces are grateful!
            </p>
          </div>

          {/* Mini map showing completed network */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: 400,
            margin: '0 auto 20px',
            aspectRatio: '4 / 3',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid rgba(212, 168, 67, 0.3)',
          }}>
            <svg width="100%" height="100%" viewBox="0 0 100 80" preserveAspectRatio="xMidYMid meet">
              {/* Connection lines - all glowing */}
              {CITIES.filter(c => decodedCities.has(c.id)).map(city => {
                const target = CITIES.find(t => t.id === city.connection);
                if (!target || !decodedCities.has(target.id)) return null;
                return (
                  <line
                    key={`${city.id}-${target.id}`}
                    x1={city.x}
                    y1={city.y}
                    x2={target.x}
                    y2={target.y}
                    stroke="#00ff88"
                    strokeWidth="0.8"
                    strokeDasharray="2,1"
                    opacity={0.8}
                  />
                );
              })}
              {CITIES.map(city => (
                <g key={city.id}>
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={2}
                    fill={decodedCities.has(city.id) ? '#00ff88' : '#4a4a6a'}
                  />
                  <text
                    x={city.x}
                    y={city.y + 5}
                    textAnchor="middle"
                    fill={decodedCities.has(city.id) ? '#ffd700' : '#6a6a8a'}
                    fontSize="3"
                    fontFamily="monospace"
                  >
                    {city.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <button
            onClick={handleRestart}
            style={buttonStyle}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            NEW MISSION
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // PLAYING
  // ============================================

  const activeCityData = currentCity ? CITIES.find(c => c.id === currentCity) : null;
  const encodedWord = activeCityData ? caesarEncode(activeCityData.cipherWord, activeCityData.shift) : '';

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
          background: 'rgba(212, 168, 67, 0.2)',
          border: '1px solid #d4a843',
          borderRadius: 20,
          padding: '4px 14px',
          color: '#d4a843',
          fontWeight: 700,
          fontSize: isSmall ? 11 : 13,
        }}>
          CITIES: {decodedCities.size} / 6+
        </div>
        <div style={{
          background: 'rgba(0, 255, 136, 0.15)',
          border: '1px solid #00ff88',
          borderRadius: 20,
          padding: '4px 14px',
          color: '#00ff88',
          fontWeight: 700,
          fontSize: isSmall ? 11 : 13,
        }}>
          NETWORK {decodedCities.size >= 6 ? 'COMPLETE' : 'BUILDING...'}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        height: 6,
        background: 'rgba(0,0,0,0.3)',
        borderRadius: 3,
        marginBottom: 12,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${Math.min((decodedCities.size / 6) * 100, 100)}%`,
          background: 'linear-gradient(90deg, #d4a843, #00ff88)',
          borderRadius: 3,
          transition: 'width 0.5s ease',
        }} />
      </div>

      {/* Map */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: isSmall ? '4 / 3' : '5 / 3',
        background: 'radial-gradient(ellipse at center, #1a2a3e 0%, #0f1a2e 100%)',
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid rgba(212, 168, 67, 0.3)',
        marginBottom: 12,
      }}>
        {/* Grid lines */}
        <svg width="100%" height="100%" viewBox="0 0 100 80"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: 'absolute', inset: 0 }}
        >
          {/* Grid */}
          {[20, 40, 60, 80].map(x => (
            <line key={`vg${x}`} x1={x} y1={0} x2={x} y2={80} stroke="rgba(100,120,150,0.1)" strokeWidth="0.3" />
          ))}
          {[16, 32, 48, 64].map(y => (
            <line key={`hg${y}`} x1={0} y1={y} x2={100} y2={y} stroke="rgba(100,120,150,0.1)" strokeWidth="0.3" />
          ))}

          {/* Connection lines */}
          {CITIES.filter(c => decodedCities.has(c.id)).map(city => {
            const target = CITIES.find(t => t.id === city.connection);
            if (!target || !decodedCities.has(target.id)) return null;
            return (
              <line
                key={`line-${city.id}-${target.id}`}
                x1={city.x}
                y1={city.y}
                x2={target.x}
                y2={target.y}
                stroke="#00ff88"
                strokeWidth="0.6"
                strokeDasharray="2,1"
                opacity={0.7}
              >
                <animate attributeName="stroke-dashoffset" from="0" to="-6" dur="2s" repeatCount="indefinite" />
              </line>
            );
          })}

          {/* City nodes */}
          {CITIES.map(city => {
            const decoded = decodedCities.has(city.id);
            const isActive = currentCity === city.id;
            return (
              <g
                key={city.id}
                style={{ cursor: decoded ? 'default' : 'pointer' }}
                onClick={() => handleCityClick(city.id)}
              >
                {/* Glow */}
                {decoded && (
                  <circle cx={city.x} cy={city.y} r={3.5} fill="none" stroke="#00ff88" strokeWidth="0.3" opacity={0.5}>
                    <animate attributeName="r" values="3;4.5;3" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                {isActive && !decoded && (
                  <circle cx={city.x} cy={city.y} r={3.5} fill="none" stroke="#ffd700" strokeWidth="0.4" opacity={0.7}>
                    <animate attributeName="r" values="3;4.5;3" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={2}
                  fill={decoded ? '#00ff88' : isActive ? '#ffd700' : '#d4a843'}
                  stroke={decoded ? '#00ff88' : '#d4a843'}
                  strokeWidth="0.5"
                />
                <text
                  x={city.x}
                  y={city.y + 5}
                  textAnchor="middle"
                  fill={decoded ? '#00ff88' : '#d4a843'}
                  fontSize={isSmall ? 2.5 : 3}
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {city.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Particles */}
        {particles.map(p => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: p.color,
              boxShadow: `0 0 4px ${p.color}`,
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* Cipher challenge panel */}
      {activeCityData && feedback !== 'correct' ? (
        <div style={{
          background: 'rgba(0,0,0,0.4)',
          borderRadius: 12,
          padding: isSmall ? 12 : 16,
          border: '1px solid rgba(212, 168, 67, 0.4)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <span style={{
              color: '#d4a843',
              fontSize: isSmall ? 12 : 14,
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}>
              Decode to connect: {activeCityData.name}
            </span>
          </div>
          <div style={{
            textAlign: 'center',
            marginBottom: 8,
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 8,
            padding: isSmall ? 10 : 14,
          }}>
            <p style={{ color: '#a0a0c0', fontSize: isSmall ? 10 : 12, margin: '0 0 4px' }}>
              Caesar Cipher (shift +{activeCityData.shift}):
            </p>
            <p style={{
              color: '#e94560',
              fontSize: isSmall ? 20 : 28,
              fontFamily: 'monospace',
              fontWeight: 'bold',
              letterSpacing: isSmall ? 3 : 5,
              margin: 0,
            }}>
              {encodedWord}
            </p>
            <p style={{ color: '#6a6a8a', fontSize: isSmall ? 10 : 11, margin: '6px 0 0', fontStyle: 'italic' }}>
              Shift each letter BACK by {activeCityData.shift} to decode
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value.toUpperCase())}
              onKeyDown={handleKeyDown}
              placeholder="Type the decoded word..."
              style={{
                flex: 1,
                minWidth: 140,
                maxWidth: 300,
                padding: '10px 14px',
                fontSize: isSmall ? 16 : 18,
                fontFamily: 'monospace',
                textAlign: 'center',
                letterSpacing: 2,
                textTransform: 'uppercase',
                background: '#1a1a2e',
                border: `2px solid ${feedback === 'incorrect' ? '#e94560' : '#4a4a6a'}`,
                borderRadius: 8,
                color: '#fff',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s',
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={!userInput.trim()}
              style={{
                padding: '10px 24px',
                borderRadius: 8,
                border: '2px solid #d4a843',
                background: !userInput.trim() ? '#4a4a6a' : 'linear-gradient(180deg, #d4a843, #b8860b)',
                color: !userInput.trim() ? '#888' : '#1a1a2e',
                fontWeight: 800,
                fontSize: isSmall ? 13 : 15,
                cursor: !userInput.trim() ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
              }}
            >
              DECODE
            </button>
          </div>
          {feedback === 'incorrect' && (
            <p style={{
              textAlign: 'center',
              color: '#e94560',
              fontSize: isSmall ? 12 : 14,
              fontWeight: 'bold',
              marginTop: 8,
              marginBottom: 0,
            }}>
              Not quite! Try shifting each letter back by {activeCityData.shift}.
            </p>
          )}
        </div>
      ) : feedback === 'correct' && factMessage ? (
        <div style={{
          background: 'rgba(0, 255, 136, 0.1)',
          borderRadius: 12,
          padding: isSmall ? 12 : 16,
          border: '1px solid #00ff88',
          textAlign: 'center',
        }}>
          <p style={{ color: '#00ff88', fontSize: isSmall ? 16 : 18, fontWeight: 'bold', margin: '0 0 8px' }}>
            {'\u2713'} CITY CONNECTED!
          </p>
          <p style={{ color: '#c0c0d0', fontSize: isSmall ? 13 : 15, margin: 0, lineHeight: 1.6 }}>
            {'\u{1F4CB}'} {factMessage}
          </p>
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: isSmall ? 12 : 16,
          color: '#a0a0c0',
          fontSize: isSmall ? 13 : 15,
        }}>
          {'\u{1F449}'} Click an unconnected city on the map to decode its cipher!
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes morse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
