import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Text, Billboard, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import type { BasicsGameProps } from '../../../types.ts';
import { useGameState } from '../../../hooks/useGameState.ts';
import { useGameTTS } from '../../../hooks/useGameTTS.ts';
import { useGameAudio } from '../../../hooks/useGameAudio.ts';
import { SIGHT_WORDS } from '../../../data/readingContent.ts';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getWordPool(level: number): string[] {
  switch (level) {
    case 0: return [...SIGHT_WORDS[0]];
    case 1: return [...SIGHT_WORDS[1]];
    case 2: return [...SIGHT_WORDS[2]];
    case 3: return SIGHT_WORDS.flat();
    default: return [...SIGHT_WORDS[0]];
  }
}

/** Pick a target + 3 distractors, ensuring no duplicates. */
function pickRoundWords(
  pool: string[],
  usedTargets: Set<string>,
): { target: string; options: string[] } {
  // Pick a target we haven't used yet if possible
  const unused = pool.filter((w) => !usedTargets.has(w));
  const target = unused.length > 0 ? pickRandom(unused) : pickRandom(pool);

  // Pick 3 distractors different from target
  const distractorPool = pool.filter((w) => w !== target);
  const distractors = shuffle(distractorPool).slice(0, 3);

  // Combine and shuffle
  const options = shuffle([target, ...distractors]);
  return { target, options };
}

const STAR_COLORS = ['#FFD700', '#FF6B6B', '#4FC3F7', '#81C784', '#BA68C8', '#FF8A65'];

// ---------------------------------------------------------------------------
// 3D sub-components
// ---------------------------------------------------------------------------

/** Background moon/planet for visual interest */
function Moon() {
  return (
    <mesh position={[4, 3, -8]}>
      <sphereGeometry args={[1.2, 24, 24]} />
      <meshStandardMaterial color="#E0E0E0" emissive="#9E9E9E" emissiveIntensity={0.3} />
    </mesh>
  );
}

/** A distant planet */
function Planet() {
  return (
    <group position={[-5, -2, -10]}>
      <mesh>
        <sphereGeometry args={[1.8, 24, 24]} />
        <meshStandardMaterial color="#7E57C2" emissive="#4527A0" emissiveIntensity={0.2} />
      </mesh>
      {/* Ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.8, 0.15, 8, 48]} />
        <meshStandardMaterial color="#CE93D8" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Floating sight-word star
// ---------------------------------------------------------------------------

interface WordStarProps {
  word: string;
  position: [number, number, number];
  color: string;
  onClick: () => void;
  disabled: boolean;
  flashRed: boolean;
}

function WordStar({ word, position, color, onClick, disabled, flashRed }: WordStarProps) {
  const groupRef = useRef<THREE.Group>(null);
  const baseY = useRef(position[1]);
  const timeOffset = useRef(Math.random() * Math.PI * 2);
  const [hovered, setHovered] = useState(false);

  // Gentle floating animation
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime + timeOffset.current;
    // Slow float downward then wrap around
    groupRef.current.position.y = baseY.current + Math.sin(t * 0.5) * 0.3;
    // Gentle rotation
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.2;
  });

  const matColor = flashRed ? '#FF1744' : hovered && !disabled ? '#FFFFFF' : color;

  return (
    <group ref={groupRef} position={position}>
      {/* Dodecahedron body (star-like) */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) onClick();
        }}
        onPointerOver={() => { if (!disabled) setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        scale={hovered && !disabled ? 1.15 : 1}
      >
        <dodecahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color={matColor}
          emissive={matColor}
          emissiveIntensity={flashRed ? 0.8 : 0.4}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* Word label - billboarded so it always faces camera */}
      <Billboard position={[0, 0.95, 0]}>
        <Text
          fontSize={0.32}
          anchorX="center"
          anchorY="middle"
          color="#FFFFFF"
          fontWeight="bold"
          outlineWidth={0.025}
          outlineColor="#000000"
        >
          {word}
        </Text>
      </Billboard>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Burst effect (shows briefly on correct tap)
// ---------------------------------------------------------------------------

interface BurstProps {
  position: [number, number, number];
  onDone: () => void;
}

function Burst({ position, onDone }: BurstProps) {
  const ref = useRef<THREE.Points>(null);
  const timeRef = useRef(0);
  const doneRef = useRef(false);

  useFrame((_, delta) => {
    if (!ref.current || doneRef.current) return;
    timeRef.current += delta;
    // Scale up then fade
    const t = timeRef.current;
    const s = 1 + t * 3;
    ref.current.scale.set(s, s, s);
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = Math.max(0, 1 - t * 2);
    if (t > 0.6 && !doneRef.current) {
      doneRef.current = true;
      onDone();
    }
  });

  return (
    <Sparkles
      ref={ref}
      position={position}
      count={20}
      size={6}
      scale={1.5}
      color="#FFD700"
      speed={0.4}
      opacity={1}
    />
  );
}

// ---------------------------------------------------------------------------
// Scene
// ---------------------------------------------------------------------------

interface SceneProps {
  options: string[];
  targetWord: string;
  onCorrect: () => void;
  onWrong: () => void;
  disabled: boolean;
  roundKey: number;
}

function Scene({ options, targetWord, onCorrect, onWrong, disabled, roundKey }: SceneProps) {
  const [flashIndex, setFlashIndex] = useState<number | null>(null);
  const [burstPos, setBurstPos] = useState<[number, number, number] | null>(null);
  const [hiddenIndex, setHiddenIndex] = useState<number | null>(null);

  // Star positions: spread out in a gentle arc
  const starPositions = useMemo<[number, number, number][]>(() => {
    const count = options.length;
    const positions: [number, number, number][] = [];
    const spread = 2.2;
    for (let i = 0; i < count; i++) {
      const x = (i - (count - 1) / 2) * spread;
      const y = 0.5 + Math.random() * 0.8;
      const z = -1 + Math.random() * 0.6;
      positions.push([x, y, z]);
    }
    return positions;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundKey]);

  // Reset flash on round change
  useEffect(() => {
    setFlashIndex(null);
    setBurstPos(null);
    setHiddenIndex(null);
  }, [roundKey]);

  const handleClick = useCallback(
    (word: string, index: number) => {
      if (disabled || flashIndex !== null || hiddenIndex !== null) return;

      if (word === targetWord) {
        // Correct!
        setHiddenIndex(index);
        setBurstPos(starPositions[index]);
        onCorrect();
      } else {
        // Wrong - flash red
        setFlashIndex(index);
        onWrong();
        setTimeout(() => setFlashIndex(null), 500);
      }
    },
    [disabled, flashIndex, hiddenIndex, targetWord, starPositions, onCorrect, onWrong],
  );

  const handleBurstDone = useCallback(() => {
    setBurstPos(null);
  }, []);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 5, 4]} intensity={0.6} color="#E3F2FD" />
      <pointLight position={[0, 2, 3]} intensity={0.4} color="#FFD54F" />

      {/* Background */}
      <color attach="background" args={['#0A0E27']} />
      <Stars radius={80} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />

      <Moon />
      <Planet />

      {/* Word stars */}
      {options.map((word, i) => {
        if (hiddenIndex === i) return null;
        return (
          <WordStar
            key={`${roundKey}-${i}`}
            word={word}
            position={starPositions[i]}
            color={STAR_COLORS[i % STAR_COLORS.length]}
            onClick={() => handleClick(word, i)}
            disabled={disabled || hiddenIndex !== null}
            flashRed={flashIndex === i}
          />
        );
      })}

      {/* Burst particles on correct */}
      {burstPos && <Burst position={burstPos} onDone={handleBurstDone} />}
    </>
  );
}

// ---------------------------------------------------------------------------
// Main game component
// ---------------------------------------------------------------------------

const TOTAL_ROUNDS = 10;

export default function SightWordStars(props: BasicsGameProps) {
  const { level, onComplete, onBack } = props;
  const { phase, round, score, accuracy, totalRounds, startGame, submitAnswer, nextRound } =
    useGameState(TOTAL_ROUNDS);
  const tts = useGameTTS();
  const audio = useGameAudio();

  const wordPool = useMemo(() => getWordPool(level), [level]);

  // Track used targets so we don't repeat
  const usedTargets = useRef(new Set<string>());

  // Generate current round's words
  const [roundData, setRoundData] = useState<{ target: string; options: string[] }>({
    target: '',
    options: [],
  });
  const [roundKey, setRoundKey] = useState(0);

  // Generate new words when round changes
  const generateRound = useCallback(() => {
    const data = pickRoundWords(wordPool, usedTargets.current);
    usedTargets.current.add(data.target);
    setRoundData(data);
    setRoundKey((k) => k + 1);
  }, [wordPool]);

  // Init first round when game starts
  useEffect(() => {
    if (phase === 'playing' && roundData.target === '') {
      generateRound();
    }
  }, [phase, roundData.target, generateRound]);

  // Speak target word
  useEffect(() => {
    if (phase === 'playing' && roundData.target) {
      const timer = setTimeout(() => {
        tts.saySentence(`Find the word: ${roundData.target}!`);
      }, 600);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, roundKey]);

  // Handle correct tap
  const handleCorrect = useCallback(() => {
    audio.playChime();
    tts.sayEncouragement();
    submitAnswer(true);

    // Next round after delay
    setTimeout(() => {
      nextRound();
      generateRound();
    }, 1400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generateRound]);

  // Handle wrong tap
  const handleWrong = useCallback(() => {
    audio.playBuzz();
    tts.sayRedirect(`The word is ${roundData.target}.`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundData.target]);

  // Game complete
  useEffect(() => {
    if (phase === 'complete') {
      audio.playLevelUp();
      const timer = setTimeout(() => {
        onComplete(accuracy);
      }, 2000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Reset used targets on new game
  useEffect(() => {
    if (phase === 'intro') {
      usedTargets.current.clear();
      setRoundData({ target: '', options: [] });
    }
  }, [phase]);

  // ── Intro screen ──
  if (phase === 'intro') {
    return (
      <div style={overlayStyle}>
        <div style={cardStyle}>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>{'\u2B50'}</div>
          <h1 style={titleStyle}>Sight Word Stars</h1>
          <p style={subtitleStyle}>Listen for the word, then tap the matching star!</p>
          <button
            onClick={() => {
              audio.playClick();
              startGame();
            }}
            style={startBtnStyle}
          >
            Blast Off!
          </button>
          <button onClick={onBack} style={backBtnStyle}>
            {'\u2190'} Back
          </button>
        </div>
      </div>
    );
  }

  // ── Complete screen ──
  if (phase === 'complete') {
    const stars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : accuracy >= 50 ? 1 : 0;
    return (
      <div style={overlayStyle}>
        <div style={cardStyle}>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>{'\uD83C\uDF1F'}</div>
          <h1 style={titleStyle}>Super Star!</h1>
          <p style={subtitleStyle}>
            You found {score} out of {totalRounds} words!
          </p>
          <div style={{ fontSize: '2rem', margin: '12px 0' }}>
            {Array.from({ length: 3 }, (_, i) => (
              <span key={i} style={{ opacity: i < stars ? 1 : 0.2 }}>{'\u2B50'}</span>
            ))}
          </div>
          <button onClick={onBack} style={startBtnStyle}>
            Continue
          </button>
        </div>
      </div>
    );
  }

  // ── Playing / Feedback ──
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        {roundData.target && (
          <Scene
            options={roundData.options}
            targetWord={roundData.target}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
            disabled={phase === 'feedback'}
            roundKey={roundKey}
          />
        )}
      </Canvas>

      {/* HUD */}
      <div style={hudStyle}>
        <button onClick={onBack} style={hudBackBtn}>
          {'\u2190'}
        </button>
        <span style={hudTextStyle}>
          Round {round}/{totalRounds}
        </span>
        <span style={hudTextStyle}>
          {'\u2B50'} {score}
        </span>
      </div>

      {/* Target word prompt */}
      {roundData.target && (
        <div style={wordPromptStyle}>
          <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Find:</span>
          <span
            style={{
              fontSize: '1.6rem',
              fontWeight: 'bold',
              color: '#FFD54F',
              marginLeft: 10,
              letterSpacing: 2,
            }}
          >
            {roundData.target}
          </span>
          <button
            onClick={() => tts.saySentence(`Find the word: ${roundData.target}!`)}
            style={repeatBtnStyle}
            title="Hear again"
          >
            {'\uD83D\uDD0A'}
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const overlayStyle: React.CSSProperties = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #0A0E27 0%, #1A1040 50%, #0A0E27 100%)',
};

const cardStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '40px 32px',
  borderRadius: 24,
  background: 'rgba(255,255,255,0.08)',
  backdropFilter: 'blur(12px)',
  maxWidth: 400,
  width: '90%',
};

const titleStyle: React.CSSProperties = {
  fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
  fontSize: '2rem',
  color: '#FFFFFF',
  margin: '0 0 8px',
};

const subtitleStyle: React.CSSProperties = {
  fontFamily: "'Comic Sans MS', cursive",
  fontSize: '1rem',
  color: 'rgba(255,255,255,0.7)',
  margin: '0 0 24px',
};

const startBtnStyle: React.CSSProperties = {
  fontFamily: "'Comic Sans MS', cursive",
  fontSize: '1.2rem',
  padding: '14px 40px',
  borderRadius: 16,
  border: 'none',
  background: '#6A1B9A',
  color: '#FFFFFF',
  cursor: 'pointer',
  fontWeight: 'bold',
  marginBottom: 12,
  display: 'block',
  width: '100%',
};

const backBtnStyle: React.CSSProperties = {
  fontFamily: "'Comic Sans MS', cursive",
  fontSize: '0.9rem',
  padding: '8px 20px',
  borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.2)',
  background: 'rgba(255,255,255,0.1)',
  color: 'rgba(255,255,255,0.7)',
  cursor: 'pointer',
  display: 'block',
  width: '100%',
};

const hudStyle: React.CSSProperties = {
  position: 'absolute',
  top: 12,
  left: 12,
  right: 12,
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  pointerEvents: 'auto',
};

const hudBackBtn: React.CSSProperties = {
  fontFamily: "'Comic Sans MS', cursive",
  fontSize: '1.2rem',
  width: 40,
  height: 40,
  borderRadius: 12,
  border: 'none',
  background: 'rgba(0,0,0,0.5)',
  color: '#FFFFFF',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const hudTextStyle: React.CSSProperties = {
  fontFamily: "'Comic Sans MS', cursive",
  fontSize: '1rem',
  color: '#FFFFFF',
  background: 'rgba(0,0,0,0.5)',
  padding: '6px 14px',
  borderRadius: 10,
};

const wordPromptStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: 24,
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'center',
  background: 'rgba(0,0,0,0.7)',
  padding: '12px 24px',
  borderRadius: 16,
  fontFamily: "'Comic Sans MS', cursive",
  color: '#FFFFFF',
};

const repeatBtnStyle: React.CSSProperties = {
  marginLeft: 12,
  background: 'rgba(255,255,255,0.15)',
  border: 'none',
  borderRadius: 8,
  padding: '4px 10px',
  fontSize: '1.2rem',
  cursor: 'pointer',
  color: '#FFFFFF',
};
