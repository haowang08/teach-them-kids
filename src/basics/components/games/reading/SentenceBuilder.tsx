import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { BasicsGameProps } from '../../../types';
import { useGameState } from '../../../hooks/useGameState';
import { useGameTTS } from '../../../hooks/useGameTTS';
import { useGameAudio } from '../../../hooks/useGameAudio';
import { SENTENCES } from '../../../data/readingContent';

// ---------------------------------------------------------------------------
// Types & Data
// ---------------------------------------------------------------------------

interface SentenceRound {
  words: string[];
  correct: string;
  image: string;
}

/** Map each sentence to include an illustrative emoji based on keywords */
const WORD_TO_IMAGE: Record<string, string> = {
  cat: '\u{1F431}', dog: '\u{1F415}', run: '\u{1F3C3}', sun: '\u{1F31E}',
  mom: '\u{1F469}', hat: '\u{1F3A9}', bird: '\u{1F426}', apples: '\u{1F34E}',
  park: '\u{1F333}', ball: '\u26BD', fish: '\u{1F41F}', mat: '\u{1F9F9}',
  pond: '\u{1F30A}', tree: '\u{1F333}', store: '\u{1F6D2}', dad: '\u{1F468}',
  books: '\u{1F4DA}', frog: '\u{1F438}', rain: '\u{1F327}\uFE0F', log: '\u{1FAB5}',
  pet: '\u{1F436}', toy: '\u{1F9F8}', cake: '\u{1F382}', pretty: '\u{1F308}',
};

function imageForSentence(words: string[]): string {
  for (const w of words) {
    const key = w.replace(/[.!?,]/g, '').toLowerCase();
    if (WORD_TO_IMAGE[key]) return WORD_TO_IMAGE[key];
  }
  return '\u{1F4AC}';
}

const TOTAL_ROUNDS = 8;

const BLOCK_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
  '#BB8FCE', '#85C1E9', '#F0B27A', '#82E0AA',
];

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

function getSentencesForLevel(level: number): SentenceRound[] {
  // level is 0-indexed from GameShell; SENTENCES data uses 1-indexed level field
  const dataLevel = level + 1;
  const pool = SENTENCES.filter((s) => s.level === dataLevel);
  return pool.map((s) => ({
    words: [...s.words],
    correct: s.correct,
    image: imageForSentence(s.words),
  }));
}

function generateRounds(level: number): SentenceRound[] {
  const pool = getSentencesForLevel(level);
  // If not enough unique sentences, repeat
  const result: SentenceRound[] = [];
  const shuffled = shuffle(pool);
  while (result.length < TOTAL_ROUNDS) {
    for (const s of shuffled) {
      if (result.length >= TOTAL_ROUNDS) break;
      result.push({ ...s, words: [...s.words] });
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// 3D Components
// ---------------------------------------------------------------------------

/** Conveyor belt base */
function ConveyorBelt() {
  const stripeRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (stripeRef.current) {
      stripeRef.current.position.z = ((timeRef.current * 0.3) % 0.4) - 0.2;
    }
  });

  return (
    <group position={[0, -1.3, 0.8]}>
      {/* Belt surface */}
      <mesh>
        <boxGeometry args={[8, 0.2, 1.8]} />
        <meshStandardMaterial color="#404040" />
      </mesh>
      {/* Belt stripes - animated indicators */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[-3.6 + i * 0.8, 0.11, 0]} ref={i === 0 ? stripeRef : undefined}>
          <boxGeometry args={[0.06, 0.01, 1.6]} />
          <meshStandardMaterial color="#555555" />
        </mesh>
      ))}
      {/* Rollers at each end */}
      <mesh position={[-4.1, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 2, 8]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
      <mesh position={[4.1, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 2, 8]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
      {/* Belt legs */}
      <mesh position={[-3.5, -0.6, 0.6]}>
        <boxGeometry args={[0.15, 1, 0.15]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      <mesh position={[3.5, -0.6, 0.6]}>
        <boxGeometry args={[0.15, 1, 0.15]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      <mesh position={[-3.5, -0.6, -0.6]}>
        <boxGeometry args={[0.15, 1, 0.15]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      <mesh position={[3.5, -0.6, -0.6]}>
        <boxGeometry args={[0.15, 1, 0.15]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
    </group>
  );
}

/** Workshop back wall */
function BackWall() {
  return (
    <mesh position={[0, 1, -1.5]}>
      <planeGeometry args={[14, 6]} />
      <meshStandardMaterial color="#5D5D5D" />
    </mesh>
  );
}

/** A sentence slot (target position for words) */
function SentenceSlot({
  position,
  filled,
  word,
  width,
}: {
  position: [number, number, number];
  filled: boolean;
  word: string;
  width: number;
}) {
  return (
    <group position={position}>
      <RoundedBox args={[width, 0.55, 0.15]} radius={0.06} smoothness={4}>
        <meshStandardMaterial
          color={filled ? '#4ECDC4' : '#777777'}
          transparent
          opacity={filled ? 0.9 : 0.25}
          wireframe={!filled}
        />
      </RoundedBox>
      {filled && (
        <Text
          position={[0, 0, 0.09]}
          fontSize={0.25}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          fontWeight={700}
        >
          {word}
        </Text>
      )}
    </group>
  );
}

/** Animated word block on the conveyor */
function WordBlock({
  word,
  position,
  color,
  onTap,
  visible,
  flyTarget,
}: {
  word: string;
  position: [number, number, number];
  color: string;
  onTap: () => void;
  visible: boolean;
  flyTarget: [number, number, number] | null;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const animProgress = useRef(0);
  const startPos = useRef(new THREE.Vector3(...position));
  const isFlying = useRef(false);
  const shakeTimer = useRef(0);
  const isShaking = useRef(false);

  // Reset start position when position prop changes (new round)
  useEffect(() => {
    startPos.current.set(...position);
    animProgress.current = 0;
    isFlying.current = false;
    isShaking.current = false;
    shakeTimer.current = 0;
  }, [position[0], position[1], position[2]]); // eslint-disable-line react-hooks/exhaustive-deps

  // Start flying when flyTarget is set
  useEffect(() => {
    if (flyTarget) {
      isFlying.current = true;
      animProgress.current = 0;
    }
  }, [flyTarget]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (isFlying.current && flyTarget) {
      // Fly to target slot
      animProgress.current = Math.min(1, animProgress.current + delta * 3);
      const t = animProgress.current;
      // Ease out cubic
      const ease = 1 - Math.pow(1 - t, 3);
      groupRef.current.position.lerpVectors(
        startPos.current,
        new THREE.Vector3(...flyTarget),
        ease,
      );
      // Add arc
      groupRef.current.position.y += Math.sin(t * Math.PI) * 0.8;
    } else if (isShaking.current) {
      // Shake animation for wrong tap
      shakeTimer.current += delta * 25;
      groupRef.current.position.x =
        startPos.current.x + Math.sin(shakeTimer.current) * 0.12;
      if (shakeTimer.current > 8) {
        isShaking.current = false;
        shakeTimer.current = 0;
        groupRef.current.position.x = startPos.current.x;
      }
    } else if (visible) {
      // Gentle idle bob
      groupRef.current.position.y =
        startPos.current.y + Math.sin(state.clock.elapsedTime * 2 + startPos.current.x) * 0.04;
    }
  });

  // Expose shake trigger
  const triggerShake = useCallback(() => {
    isShaking.current = true;
    shakeTimer.current = 0;
  }, []);

  useEffect(() => {
    if (groupRef.current) {
      (groupRef.current as THREE.Group & { triggerShake?: () => void }).triggerShake = triggerShake;
    }
  }, [triggerShake]);

  if (!visible && !flyTarget) return null;

  // Compute width based on word length
  const blockWidth = Math.max(0.8, word.length * 0.22 + 0.4);

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        if (visible && !isFlying.current) onTap();
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <RoundedBox
        args={[blockWidth, 0.55, 0.35]}
        radius={0.08}
        smoothness={4}
        castShadow
      >
        <meshStandardMaterial color={color} />
      </RoundedBox>
      <Text
        position={[0, 0, 0.19]}
        fontSize={0.22}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        fontWeight={700}
      >
        {word}
      </Text>
    </group>
  );
}

/** Image hint display */
function ImageHint({ image }: { image: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = 2.6 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
  });

  return (
    <group ref={groupRef} position={[0, 2.6, 0]}>
      <Text
        fontSize={1.0}
        anchorX="center"
        anchorY="middle"
      >
        {image}
      </Text>
    </group>
  );
}

/** Celebration particles */
function CelebrationParticles({ active }: { active: boolean }) {
  const particlesRef = useRef<THREE.Points>(null);
  const positionsRef = useRef<Float32Array | null>(null);
  const velocitiesRef = useRef<number[]>([]);

  useEffect(() => {
    if (active) {
      const count = 30;
      const positions = new Float32Array(count * 3);
      const velocities: number[] = [];
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 4;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
        velocities.push(
          (Math.random() - 0.5) * 3,
          Math.random() * 4 + 2,
          (Math.random() - 0.5) * 3,
        );
      }
      positionsRef.current = positions;
      velocitiesRef.current = velocities;
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
      velocities[i * 3 + 1] -= 5 * delta;
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.attributes.position.needsUpdate = true;
  });

  if (!active || !positionsRef.current) return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positionsRef.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#FFD700" size={0.15} sizeAttenuation />
    </points>
  );
}

// ---------------------------------------------------------------------------
// Scene
// ---------------------------------------------------------------------------

interface WordBlockState {
  word: string;
  id: string;
  color: string;
  placed: boolean;
  flyTarget: [number, number, number] | null;
}

interface SceneProps {
  correctWords: string[];
  blocks: WordBlockState[];
  placedCount: number;
  image: string;
  onBlockTap: (blockId: string) => void;
  showCelebration: boolean;
}

function Scene({
  correctWords,
  blocks,
  placedCount,
  image,
  onBlockTap,
  showCelebration,
}: SceneProps) {
  const wordCount = correctWords.length;

  // Compute slot positions
  const slotWidth = Math.max(0.8, 1.0);
  const totalSlotWidth = wordCount * (slotWidth + 0.15);
  const slotStartX = -totalSlotWidth / 2 + slotWidth / 2;
  const slotY = 1.3;

  const slotPositions: [number, number, number][] = correctWords.map((_, i) => [
    slotStartX + i * (slotWidth + 0.15),
    slotY,
    0.3,
  ]);

  // Compute block positions on conveyor (scattered)
  const blockCount = blocks.length;
  const blockSpacing = Math.min(1.6, 7.5 / blockCount);
  const blockStartX = -((blockCount - 1) * blockSpacing) / 2;

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={0.8} castShadow />
      <pointLight position={[-3, 3, 2]} intensity={0.3} color="#FFE4B5" />

      {/* Fixed camera */}
      <OrbitControls enabled={false} />

      {/* Back wall */}
      <BackWall />

      {/* Conveyor belt */}
      <ConveyorBelt />

      {/* Image hint */}
      <ImageHint image={image} />

      {/* Sentence slots */}
      {correctWords.map((_word, i) => (
        <SentenceSlot
          key={`slot-${i}`}
          position={slotPositions[i]}
          filled={i < placedCount}
          word={i < placedCount ? correctWords[i] : ''}
          width={slotWidth}
        />
      ))}

      {/* Word blocks on conveyor */}
      {blocks.map((block, i) => (
        <WordBlock
          key={block.id}
          word={block.word}
          position={[blockStartX + i * blockSpacing, -1.15, 0.8]}
          color={block.color}
          visible={!block.placed}
          flyTarget={block.flyTarget}
          onTap={() => onBlockTap(block.id)}
        />
      ))}

      {/* Celebration */}
      <CelebrationParticles active={showCelebration} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function SentenceBuilder(props: BasicsGameProps) {
  const { level, onComplete, onBack } = props;
  const { phase, round, score, accuracy, totalRounds, startGame, submitAnswer, nextRound } =
    useGameState(TOTAL_ROUNDS);
  const tts = useGameTTS();
  const audio = useGameAudio();

  // Generate rounds on mount / level change
  const rounds = useMemo(() => generateRounds(level), [level]);

  // Current round data
  const currentRound = rounds[round - 1] ?? rounds[0];

  // The correct word order
  const correctWords = useMemo(() => {
    if (!currentRound) return [];
    return currentRound.correct.split(' ');
  }, [currentRound]);

  // Shuffled word blocks for this round
  const [blocks, setBlocks] = useState<WordBlockState[]>([]);
  const [placedCount, setPlacedCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [wrongFeedback, setWrongFeedback] = useState(false);
  const [roundComplete, setRoundComplete] = useState(false);

  // Reset when round changes
  useEffect(() => {
    if (!currentRound) return;
    const shuffledWords = shuffle(currentRound.words);
    setBlocks(
      shuffledWords.map((word, i) => ({
        word,
        id: `${round}-${i}-${word}`,
        color: BLOCK_COLORS[i % BLOCK_COLORS.length],
        placed: false,
        flyTarget: null,
      })),
    );
    setPlacedCount(0);
    setShowCelebration(false);
    setWrongFeedback(false);
    setRoundComplete(false);
  }, [round, currentRound]);

  // Read sentence aloud when round starts
  useEffect(() => {
    if (phase === 'playing' && currentRound) {
      const timer = setTimeout(() => {
        tts.saySentence(currentRound.correct);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase, round]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle complete phase
  useEffect(() => {
    if (phase === 'complete') {
      onComplete(accuracy);
    }
  }, [phase, accuracy, onComplete]);

  // Handle block tap
  const handleBlockTap = useCallback(
    (blockId: string) => {
      if (phase !== 'playing' || roundComplete) return;

      const block = blocks.find((b) => b.id === blockId);
      if (!block || block.placed) return;

      const expectedWord = correctWords[placedCount];

      if (block.word === expectedWord) {
        // Correct word in correct position
        audio.playPop();

        // Calculate fly target position
        const wordCount = correctWords.length;
        const slotWidth = Math.max(0.8, 1.0);
        const totalSlotWidth = wordCount * (slotWidth + 0.15);
        const slotStartX = -totalSlotWidth / 2 + slotWidth / 2;
        const targetX = slotStartX + placedCount * (slotWidth + 0.15);
        const flyTarget: [number, number, number] = [targetX, 1.3, 0.3];

        setBlocks((prev) =>
          prev.map((b) =>
            b.id === blockId ? { ...b, placed: true, flyTarget } : b,
          ),
        );

        const newPlacedCount = placedCount + 1;
        setPlacedCount(newPlacedCount);

        // Check if sentence is complete
        if (newPlacedCount === correctWords.length) {
          setRoundComplete(true);
          setShowCelebration(true);
          audio.playChime();
          tts.sayEncouragement();
          submitAnswer(true);

          // Auto advance after celebration
          setTimeout(() => {
            nextRound();
          }, 2200);
        }
      } else {
        // Wrong word
        audio.playBuzz();
        tts.sayRedirect();
        setWrongFeedback(true);
        setTimeout(() => setWrongFeedback(false), 600);
      }
    },
    [phase, roundComplete, blocks, correctWords, placedCount, audio, tts, submitAnswer, nextRound],
  );

  // Replay sentence
  const handleReplay = useCallback(() => {
    if (currentRound) {
      tts.saySentence(currentRound.correct);
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
          background: 'linear-gradient(135deg, #263238 0%, #37474F 50%, #455A64 100%)',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', marginBottom: '0.5rem' }}>
          {'\u{1F4DD}'}
        </div>
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            margin: '0 0 0.5rem 0',
            textAlign: 'center',
          }}
        >
          Sentence Builder
        </h1>
        <p
          style={{
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            margin: '0 0 2rem 0',
            opacity: 0.8,
            textAlign: 'center',
            padding: '0 1rem',
          }}
        >
          Tap the words in the right order!
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
            background: 'linear-gradient(135deg, #00695C, #00897B)',
            color: '#FFFFFF',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0, 105, 92, 0.4)',
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
          background: 'linear-gradient(135deg, #263238 0%, #37474F 50%, #455A64 100%)',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', marginBottom: '0.5rem' }}>
          {'\u{1F389}'}
        </div>
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            margin: '0 0 0.5rem 0',
          }}
        >
          Great Job!
        </h1>
        <p
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            margin: '0.5rem 0',
          }}
        >
          {'\u2B50'.repeat(stars)}{'\u2606'.repeat(3 - stars)}
        </p>
        <p
          style={{
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            margin: '0 0 0.5rem 0',
            opacity: 0.8,
          }}
        >
          {score} / {totalRounds} sentences built
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
            background: 'linear-gradient(135deg, #00695C, #00897B)',
            color: '#FFFFFF',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0, 105, 92, 0.4)',
          }}
        >
          Done
        </button>
      </div>
    );
  }

  // Playing / Feedback: 3D scene with HUD overlay
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: '#263238',
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
            gap: '1rem',
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
          }}
        >
          <span>
            Round {round}/{totalRounds}
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
          title="Hear sentence again"
        >
          {'\u{1F50A}'}
        </button>
      </div>

      {/* Wrong answer feedback overlay */}
      {wrongFeedback && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0,0,0,0.7)',
            color: '#FF6B6B',
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            padding: '0.8rem 1.5rem',
            borderRadius: '1rem',
            zIndex: 20,
            fontWeight: 700,
          }}
        >
          Try again!
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0.8, 6], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene
          correctWords={correctWords}
          blocks={blocks}
          placedCount={placedCount}
          image={currentRound.image}
          onBlockTap={handleBlockTap}
          showCelebration={showCelebration}
        />
      </Canvas>
    </div>
  );
}
