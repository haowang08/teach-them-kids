import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Billboard, Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { BasicsGameProps } from '../../../types';
import { useGameState } from '../../../hooks/useGameState';
import { useGameTTS } from '../../../hooks/useGameTTS';
import { useGameAudio } from '../../../hooks/useGameAudio';
import { PHONEMES } from '../../../data/readingContent';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TOTAL_ROUNDS = 8;
const CHOICES_PER_ROUND = 4;

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

interface PhonemeEntry {
  phoneme: string;
  words: { word: string; image: string }[];
  distractors: { word: string; image: string }[];
}

type RoundData = {
  phoneme: string;
  correctIndex: number;
  choices: { word: string; image: string; isCorrect: boolean }[];
};

/** Get phonemes for the given level */
function getPhonemePool(level: number): PhonemeEntry[] {
  const consonants = PHONEMES.filter(
    (p) => p.phoneme.length === 1,
  );
  const digraphs = PHONEMES.filter(
    (p) => ['sh', 'ch', 'th', 'wh'].includes(p.phoneme),
  );
  const blends = PHONEMES.filter(
    (p) => p.phoneme.length === 2 && !['sh', 'ch', 'th', 'wh'].includes(p.phoneme),
  );

  switch (level) {
    case 0: return consonants;
    case 1: return digraphs;
    case 2: return blends;
    case 3: return [...consonants, ...digraphs, ...blends];
    default: return consonants;
  }
}

function generateRounds(level: number): RoundData[] {
  const pool = getPhonemePool(level);
  const rounds: RoundData[] = [];

  // Use shuffled pool entries, cycling if needed
  const shuffled = shuffle(pool);
  for (let i = 0; i < TOTAL_ROUNDS; i++) {
    const entry = shuffled[i % shuffled.length];
    const correctWord = pickRandom(entry.words);

    // Build distractors: pull from the entry's own distractors + other phoneme words
    const otherWords: { word: string; image: string }[] = [];
    for (const other of pool) {
      if (other.phoneme !== entry.phoneme) {
        otherWords.push(...other.words);
      }
    }
    otherWords.push(...entry.distractors);

    // Deduplicate by word
    const seen = new Set<string>([correctWord.word]);
    const uniqueOthers: { word: string; image: string }[] = [];
    for (const item of shuffle(otherWords)) {
      if (!seen.has(item.word)) {
        seen.add(item.word);
        uniqueOthers.push(item);
      }
    }

    // Pick 3 distractors
    const distractors = uniqueOthers.slice(0, CHOICES_PER_ROUND - 1);

    // Build choices and shuffle
    const choices = shuffle([
      { ...correctWord, isCorrect: true },
      ...distractors.map((d) => ({ ...d, isCorrect: false })),
    ]);

    const correctIndex = choices.findIndex((c) => c.isCorrect);

    rounds.push({
      phoneme: entry.phoneme,
      correctIndex,
      choices,
    });
  }

  return rounds;
}

// ---------------------------------------------------------------------------
// Bush positions arranged in a semicircle
// ---------------------------------------------------------------------------

const BUSH_POSITIONS: [number, number, number][] = [
  [-3, 0, 0.5],
  [-1, 0, -0.8],
  [1, 0, -0.8],
  [3, 0, 0.5],
];

const BUSH_COLORS = ['#2E7D32', '#388E3C', '#43A047', '#4CAF50'];

// ---------------------------------------------------------------------------
// 3D Components
// ---------------------------------------------------------------------------

/** Jungle ground */
function JungleFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
      <planeGeometry args={[20, 12]} />
      <meshStandardMaterial color="#3B7A2A" />
    </mesh>
  );
}

/** Simple tree mesh (cylinder trunk + cone canopy) */
function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 1.5, 8]} />
        <meshStandardMaterial color="#6D4C2A" />
      </mesh>
      {/* Canopy */}
      <mesh position={[0, 1.8, 0]}>
        <coneGeometry args={[1.0, 2.0, 8]} />
        <meshStandardMaterial color="#1B5E20" />
      </mesh>
    </group>
  );
}

/** A bush that can be tapped, with a picture peeking out */
function Bush({
  position,
  color,
  image,
  word,
  onTap,
  state,
}: {
  position: [number, number, number];
  color: string;
  image: string;
  word: string;
  onTap: () => void;
  state: 'idle' | 'correct' | 'wrong';
}) {
  const groupRef = useRef<THREE.Group>(null);
  const shakeRef = useRef(0);
  const bounceRef = useRef(0);
  const baseY = position[1];

  useEffect(() => {
    if (state === 'wrong') {
      shakeRef.current = 1;
    } else if (state === 'correct') {
      bounceRef.current = 1;
    }
  }, [state]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Shake animation for wrong answer
    if (shakeRef.current > 0) {
      shakeRef.current -= delta * 4;
      if (shakeRef.current < 0) shakeRef.current = 0;
      groupRef.current.position.x =
        position[0] + Math.sin(shakeRef.current * 30) * shakeRef.current * 0.2;
    } else {
      groupRef.current.position.x = position[0];
    }

    // Bounce animation for correct answer
    if (bounceRef.current > 0) {
      bounceRef.current -= delta * 2;
      if (bounceRef.current < 0) bounceRef.current = 0;
      groupRef.current.position.y =
        baseY + Math.abs(Math.sin(bounceRef.current * Math.PI * 3)) * 0.8;
    } else {
      groupRef.current.position.y = baseY;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onTap();
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
      }}
    >
      {/* Bush body - large sphere */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshStandardMaterial
          color={state === 'correct' ? '#FFD700' : color}
        />
      </mesh>
      {/* Bush smaller top */}
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.55, 12, 12]} />
        <meshStandardMaterial
          color={state === 'correct' ? '#FFC107' : color}
        />
      </mesh>

      {/* Picture peeking out */}
      <Billboard position={[0, 1.8, 0]}>
        <Text fontSize={0.8} anchorX="center" anchorY="middle">
          {image}
        </Text>
        <Text
          fontSize={0.22}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          position={[0, -0.55, 0]}
          outlineWidth={0.02}
          outlineColor="#000000"
          fontWeight={700}
        >
          {word}
        </Text>
      </Billboard>
    </group>
  );
}

/** Celebration particles */
function CelebrationParticles({ active }: { active: boolean }) {
  const particlesRef = useRef<THREE.Points>(null);
  const positionsRef = useRef<Float32Array | null>(null);
  const velocitiesRef = useRef<number[]>([]);
  const colorsRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (active) {
      const count = 40;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const velocities: number[] = [];
      const palette = [
        [1, 0.84, 0], [1, 0.42, 0.42], [0.3, 0.8, 0.5],
        [0.27, 0.8, 0.82], [0.75, 0.56, 0.8],
      ];
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 3;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
        velocities.push(
          (Math.random() - 0.5) * 4,
          Math.random() * 5 + 2,
          (Math.random() - 0.5) * 4,
        );
        const c = palette[i % palette.length];
        colors[i * 3] = c[0];
        colors[i * 3 + 1] = c[1];
        colors[i * 3 + 2] = c[2];
      }
      positionsRef.current = positions;
      velocitiesRef.current = velocities;
      colorsRef.current = colors;
    }
  }, [active]);

  useFrame((_, delta) => {
    if (!active || !particlesRef.current || !positionsRef.current) return;
    const positions = positionsRef.current;
    const velocities = velocitiesRef.current;
    const geom = particlesRef.current.geometry;

    for (let i = 0; i < positions.length / 3; i++) {
      positions[i * 3] += velocities[i * 3] * delta;
      positions[i * 3 + 1] += velocities[i * 3 + 1] * delta;
      positions[i * 3 + 2] += velocities[i * 3 + 2] * delta;
      velocities[i * 3 + 1] -= 6 * delta;
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.attributes.position.needsUpdate = true;
  });

  if (!active || !positionsRef.current || !colorsRef.current) return null;

  return (
    <points ref={particlesRef} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positionsRef.current, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colorsRef.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial vertexColors size={0.18} sizeAttenuation />
    </points>
  );
}

// ---------------------------------------------------------------------------
// Scene
// ---------------------------------------------------------------------------

interface SceneProps {
  roundData: RoundData;
  bushStates: ('idle' | 'correct' | 'wrong')[];
  onBushTap: (index: number) => void;
  showCelebration: boolean;
}

function Scene({ roundData, bushStates, onBushTap, showCelebration }: SceneProps) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={0.7} castShadow />
      <pointLight position={[-4, 6, 3]} intensity={0.3} color="#FFFACD" />
      <hemisphereLight
        color="#87CEEB"
        groundColor="#3B7A2A"
        intensity={0.4}
      />

      {/* Fixed camera */}
      <OrbitControls enabled={false} />

      {/* Sky background color */}
      <color attach="background" args={['#87CEEB']} />

      {/* Jungle floor */}
      <JungleFloor />

      {/* Background trees */}
      <Tree position={[-5, -1, -3]} />
      <Tree position={[-3.5, -1, -4]} />
      <Tree position={[0, -1, -5]} />
      <Tree position={[3.5, -1, -4]} />
      <Tree position={[5, -1, -3]} />

      {/* Bushes with pictures */}
      {roundData.choices.map((choice, i) => (
        <Bush
          key={`bush-${i}`}
          position={BUSH_POSITIONS[i]}
          color={BUSH_COLORS[i]}
          image={choice.image}
          word={choice.word}
          state={bushStates[i]}
          onTap={() => onBushTap(i)}
        />
      ))}

      {/* Celebration particles */}
      <CelebrationParticles active={showCelebration} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function SoundSafari(props: BasicsGameProps) {
  const { level, onComplete, onBack } = props;
  const { phase, round, score, accuracy, totalRounds, startGame, submitAnswer, nextRound } =
    useGameState(TOTAL_ROUNDS);
  const tts = useGameTTS();
  const audio = useGameAudio();

  // Generate rounds on mount / level change
  const rounds = useMemo(() => generateRounds(level), [level]);

  const currentRound = rounds[round - 1] ?? rounds[0];

  // Bush states for animation
  const [bushStates, setBushStates] = useState<('idle' | 'correct' | 'wrong')[]>(
    Array(CHOICES_PER_ROUND).fill('idle'),
  );
  const [showCelebration, setShowCelebration] = useState(false);
  const [roundLocked, setRoundLocked] = useState(false);

  // Reset bush states on new round
  useEffect(() => {
    setBushStates(Array(CHOICES_PER_ROUND).fill('idle'));
    setShowCelebration(false);
    setRoundLocked(false);
  }, [round]);

  // Speak prompt when round starts
  useEffect(() => {
    if (phase === 'playing' && currentRound) {
      const timer = setTimeout(() => {
        tts.saySentence(
          `Find the picture that starts with ${currentRound.phoneme}`,
        );
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [phase, round]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle game complete
  useEffect(() => {
    if (phase === 'complete') {
      onComplete(accuracy);
    }
  }, [phase, accuracy, onComplete]);

  // Handle bush tap
  const handleBushTap = useCallback(
    (index: number) => {
      if (phase !== 'playing' || roundLocked) return;

      const isCorrect = currentRound.choices[index].isCorrect;

      if (isCorrect) {
        setRoundLocked(true);
        const newStates = Array(CHOICES_PER_ROUND).fill('idle') as ('idle' | 'correct' | 'wrong')[];
        newStates[index] = 'correct';
        setBushStates(newStates);
        setShowCelebration(true);
        audio.playChime();
        tts.sayEncouragement();
        submitAnswer(true);

        setTimeout(() => {
          nextRound();
        }, 2000);
      } else {
        audio.playBuzz();
        const newStates = [...bushStates] as ('idle' | 'correct' | 'wrong')[];
        newStates[index] = 'wrong';
        setBushStates(newStates);
        tts.sayRedirect();

        // Reset the wrong state after shake
        setTimeout(() => {
          setBushStates((prev) => {
            const reset = [...prev] as ('idle' | 'correct' | 'wrong')[];
            reset[index] = 'idle';
            return reset;
          });
        }, 600);
      }
    },
    [phase, roundLocked, currentRound, bushStates, audio, tts, submitAnswer, nextRound],
  );

  // Replay prompt
  const handleReplay = useCallback(() => {
    if (currentRound) {
      tts.saySentence(
        `Find the picture that starts with ${currentRound.phoneme}`,
      );
    }
  }, [currentRound, tts]);

  // ── Render ──

  // Intro screen
  if (phase === 'intro') {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #388E3C 100%)',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', marginBottom: '0.5rem' }}>
          🦁
        </div>
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            margin: '0 0 0.5rem 0',
            textAlign: 'center',
          }}
        >
          Sound Safari
        </h1>
        <p
          style={{
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            margin: '0 0 2rem 0',
            opacity: 0.9,
            textAlign: 'center',
            padding: '0 1rem',
          }}
        >
          Listen for the sound, then tap the matching picture!
        </p>
        <button
          onClick={() => {
            audio.playClick();
            startGame();
          }}
          style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            padding: '0.8rem 2.5rem',
            borderRadius: '2rem',
            border: 'none',
            background: 'linear-gradient(135deg, #FFD700, #FFA000)',
            color: '#1B5E20',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)',
          }}
        >
          Start!
        </button>
        <button
          onClick={onBack}
          style={{
            marginTop: '1rem',
            fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
            padding: '0.5rem 1.5rem',
            borderRadius: '1rem',
            border: '2px solid rgba(255,255,255,0.3)',
            background: 'transparent',
            color: '#FFFFFF',
            cursor: 'pointer',
          }}
        >
          Back
        </button>
      </div>
    );
  }

  // Complete screen
  if (phase === 'complete') {
    const stars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : accuracy >= 50 ? 1 : 0;
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #388E3C 100%)',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', marginBottom: '0.5rem' }}>
          🎉
        </div>
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            margin: '0 0 0.5rem 0',
          }}
        >
          Safari Complete!
        </h1>
        <p
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            margin: '0.5rem 0',
          }}
        >
          {'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}
        </p>
        <p
          style={{
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            margin: '0 0 0.5rem 0',
            opacity: 0.8,
          }}
        >
          {score} / {totalRounds} sounds matched
        </p>
        <p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            margin: '0 0 2rem 0',
            opacity: 0.6,
          }}
        >
          Accuracy: {accuracy}%
        </p>
        <button
          onClick={onBack}
          style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            padding: '0.8rem 2.5rem',
            borderRadius: '2rem',
            border: 'none',
            background: 'linear-gradient(135deg, #FFD700, #FFA000)',
            color: '#1B5E20',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)',
          }}
        >
          Done
        </button>
      </div>
    );
  }

  // Playing / Feedback: 3D scene
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: '#87CEEB',
        fontFamily: 'sans-serif',
      }}
    >
      {/* HUD strip at top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3.5rem',
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1rem',
          zIndex: 10,
          color: '#FFFFFF',
        }}
      >
        <button
          onClick={onBack}
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            padding: '0.3rem 0.8rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(255,255,255,0.3)',
            background: 'transparent',
            color: '#FFFFFF',
            cursor: 'pointer',
          }}
        >
          Back
        </button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
          }}
        >
          <span
            style={{
              background: 'rgba(255,255,255,0.15)',
              padding: '0.2rem 0.6rem',
              borderRadius: '0.5rem',
              fontWeight: 700,
            }}
          >
            &ldquo;{currentRound.phoneme}&rdquo;
          </span>
          <span style={{ opacity: 0.6 }}>|</span>
          <span>
            {round}/{totalRounds}
          </span>
          <span style={{ opacity: 0.6 }}>|</span>
          <span>Score: {score}</span>
        </div>

        <button
          onClick={handleReplay}
          style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            padding: '0.3rem 0.8rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(255,255,255,0.3)',
            background: 'transparent',
            cursor: 'pointer',
          }}
          title="Hear sound again"
        >
          🔊
        </button>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 2, 5.5], fov: 55 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene
          roundData={currentRound}
          bushStates={bushStates}
          onBushTap={handleBushTap}
          showCelebration={showCelebration}
        />
      </Canvas>
    </div>
  );
}
