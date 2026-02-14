import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { BasicsGameProps } from '../../../types';
import { useGameState } from '../../../hooks/useGameState';
import { useGameTTS } from '../../../hooks/useGameTTS';
import { useGameAudio } from '../../../hooks/useGameAudio';
import {
  CVC_WORDS,
  CCVC_WORDS,
  CVCC_WORDS,
  CVCE_WORDS,
} from '../../../data/readingContent';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TOTAL_ROUNDS = 8;

const LETTER_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
  '#BB8FCE', '#85C1E9', '#F0B27A', '#82E0AA',
];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}


function getDistractorLetters(word: string, count: number): string[] {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const wordLetters = new Set(word.split(''));
  const available = alphabet.split('').filter((l) => !wordLetters.has(l));
  const result: string[] = [];
  const shuffled = shuffle(available);
  for (let i = 0; i < count && i < shuffled.length; i++) {
    result.push(shuffled[i]);
  }
  return result;
}

function getWordList(level: number): { word: string; image: string }[] {
  switch (level) {
    case 1: return CVC_WORDS;
    case 2: return CCVC_WORDS;
    case 3: return CVCC_WORDS;
    case 4: return CVCE_WORDS;
    default: return CVC_WORDS;
  }
}

function generateRounds(level: number): { word: string; image: string }[] {
  const list = getWordList(level);
  const shuffled = shuffle(list);
  return shuffled.slice(0, TOTAL_ROUNDS);
}

// ---------------------------------------------------------------------------
// 3D Components
// ---------------------------------------------------------------------------

/** Workbench surface */
function Workbench() {
  return (
    <mesh position={[0, -0.6, 0]} receiveShadow>
      <boxGeometry args={[10, 0.3, 5]} />
      <meshStandardMaterial color="#8B5E3C" />
    </mesh>
  );
}

/** A single letter slot (empty box where letters go) */
function LetterSlot({
  position,
  filled,
  letter,
}: {
  position: [number, number, number];
  filled: boolean;
  letter: string;
}) {
  return (
    <group position={position}>
      <RoundedBox args={[0.9, 0.9, 0.2]} radius={0.08} smoothness={4}>
        <meshStandardMaterial
          color={filled ? '#4ECDC4' : '#555555'}
          transparent
          opacity={filled ? 1 : 0.4}
        />
      </RoundedBox>
      {filled && (
        <Text
          position={[0, 0, 0.12]}
          fontSize={0.5}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          fontWeight={700}
        >
          {letter.toUpperCase()}
        </Text>
      )}
    </group>
  );
}

/** Animated letter block that can be tapped */
function LetterBlock({
  letter,
  position,
  color,
  onTap,
  visible,
}: {
  letter: string;
  position: [number, number, number];
  color: string;
  onTap: () => void;
  visible: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const shakeRef = useRef(0);
  const basePos = useRef(new THREE.Vector3(...position));

  // Bobbing animation
  useFrame((_, delta) => {
    if (!meshRef.current || !visible) return;
    // Gentle bob
    meshRef.current.rotation.y += delta * 0.3;

    // Shake animation (decaying)
    if (shakeRef.current > 0) {
      shakeRef.current -= delta * 4;
      if (shakeRef.current < 0) shakeRef.current = 0;
      const shakeAmount = shakeRef.current * 0.15;
      meshRef.current.position.x =
        basePos.current.x + Math.sin(shakeRef.current * 30) * shakeAmount;
    } else {
      meshRef.current.position.x = basePos.current.x;
    }
  });

  // Expose shake trigger via a custom property
  const triggerShake = useCallback(() => {
    shakeRef.current = 1;
  }, []);

  // Attach triggerShake to ref so parent can access it
  useEffect(() => {
    if (meshRef.current) {
      (meshRef.current as THREE.Mesh & { triggerShake?: () => void }).triggerShake = triggerShake;
    }
  }, [triggerShake]);

  if (!visible) return null;

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onTap();
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
      }}
    >
      <RoundedBox
        ref={meshRef}
        args={[1.1, 1.1, 0.5]}
        radius={0.1}
        smoothness={4}
        castShadow
      >
        <meshStandardMaterial color={color} />
      </RoundedBox>
      <Text
        position={[0, 0, 0.27]}
        fontSize={0.55}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        fontWeight={700}
      >
        {letter.toUpperCase()}
      </Text>
    </group>
  );
}

/** Emoji picture floating above the workbench */
function PictureDisplay({
  image,
  word,
}: {
  image: string;
  word: string;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = 2.8 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
  });

  return (
    <group ref={groupRef} position={[0, 2.8, 0]}>
      <Text
        fontSize={1.2}
        anchorX="center"
        anchorY="middle"
        position={[0, 0.3, 0]}
      >
        {image}
      </Text>
      <Text
        fontSize={0.3}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        position={[0, -0.5, 0]}
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {word.toUpperCase()}
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
        positions[i * 3] = (Math.random() - 0.5) * 2;
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
      // Gravity
      velocities[i * 3 + 1] -= 5 * delta;
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.attributes.position.needsUpdate = true;
  });

  if (!active || !positionsRef.current) return null;

  return (
    <points ref={particlesRef} position={[0, 0, 0]}>
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
// Scene (inside Canvas)
// ---------------------------------------------------------------------------

interface SceneProps {
  roundData: {
    word: string;
    image: string;
    letters: { letter: string; id: string; color: string }[];
  };
  filledSlots: string[];
  onLetterTap: (letterId: string, letter: string) => void;
  showCelebration: boolean;
}

function Scene({ roundData, filledSlots, onLetterTap, showCelebration }: SceneProps) {
  const { word, image, letters } = roundData;
  const wordLen = word.length;

  // Position letter slots centered
  const slotStartX = -(wordLen - 1) * 0.55;

  // Position available letter blocks in a scattered row below
  const blockStartX = -(letters.length - 1) * 0.7;

  // Track which letters have been placed
  const placedIds = new Set(filledSlots);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} castShadow />
      <pointLight position={[-3, 4, 2]} intensity={0.4} color="#FFE4B5" />

      {/* Fixed camera */}
      <OrbitControls enabled={false} />

      {/* Workbench */}
      <Workbench />

      {/* Picture display */}
      <PictureDisplay image={image} word={word} />

      {/* Letter slots */}
      {word.split('').map((char, i) => (
        <LetterSlot
          key={`slot-${i}`}
          position={[slotStartX + i * 1.1, 0.6, 0.5]}
          filled={i < filledSlots.length}
          letter={i < filledSlots.length ? char : ''}
        />
      ))}

      {/* Scattered letter blocks */}
      {letters.map((block, i) => (
        <LetterBlock
          key={block.id}
          letter={block.letter}
          position={[blockStartX + i * 1.4, -0.1, 2.2]}
          color={block.color}
          visible={!placedIds.has(block.id)}
          onTap={() => onLetterTap(block.id, block.letter)}
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

export default function WordBuilder(props: BasicsGameProps) {
  const { level, onComplete, onBack } = props;
  const { phase, round, score, accuracy, totalRounds, startGame, submitAnswer, nextRound } =
    useGameState(TOTAL_ROUNDS);
  const tts = useGameTTS();
  const audio = useGameAudio();

  // Generate rounds on mount/level change
  const rounds = useMemo(() => generateRounds(level), [level]);

  // Current round data
  const currentWord = rounds[round - 1] ?? rounds[0];

  // Generate letter blocks for this round
  const roundLetters = useMemo(() => {
    if (!currentWord) return [];
    const distractors = getDistractorLetters(currentWord.word, 3);
    const allLetters = [...currentWord.word.split(''), ...distractors];
    const shuffled = shuffle(allLetters);
    return shuffled.map((letter, i) => ({
      letter,
      id: `${round}-${i}-${letter}`,
      color: LETTER_COLORS[i % LETTER_COLORS.length],
    }));
  }, [currentWord, round]);

  // Track which slots are filled (by letter block id)
  const [filledSlots, setFilledSlots] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [roundComplete, setRoundComplete] = useState(false);

  // Reset slots when round changes
  useEffect(() => {
    setFilledSlots([]);
    setShowCelebration(false);
    setRoundComplete(false);
    setWrongShake(false);
  }, [round]);

  // Speak word when round starts
  useEffect(() => {
    if (phase === 'playing' && currentWord) {
      const timer = setTimeout(() => {
        tts.sayWord(currentWord.word);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [phase, round]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle complete phase
  useEffect(() => {
    if (phase === 'complete') {
      onComplete(accuracy);
    }
  }, [phase, accuracy, onComplete]);

  // Handle letter tap
  const handleLetterTap = useCallback(
    (letterId: string, letter: string) => {
      if (phase !== 'playing' || roundComplete) return;

      const nextIndex = filledSlots.length;
      const expectedLetter = currentWord.word[nextIndex];

      if (letter === expectedLetter) {
        // Correct letter
        audio.playPop();
        const newFilled = [...filledSlots, letterId];
        setFilledSlots(newFilled);

        // Check if word is complete
        if (newFilled.length === currentWord.word.length) {
          setRoundComplete(true);
          setShowCelebration(true);
          audio.playChime();
          tts.sayEncouragement();
          submitAnswer(true);

          // Auto advance after celebration
          setTimeout(() => {
            nextRound();
          }, 2000);
        }
      } else {
        // Wrong letter
        audio.playBuzz();
        setWrongShake(true);
        tts.sayRedirect();
        setTimeout(() => setWrongShake(false), 500);
      }
    },
    [phase, roundComplete, filledSlots, currentWord, audio, tts, submitAnswer, nextRound],
  );

  // Speaker button handler
  const handleReplay = useCallback(() => {
    if (currentWord) {
      tts.sayWord(currentWord.word);
    }
  }, [currentWord, tts]);

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
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', marginBottom: '0.5rem' }}>
          🔤
        </div>
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            margin: '0 0 0.5rem 0',
            textAlign: 'center',
          }}
        >
          Word Builder
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
          Tap the letters to spell the word!
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
            background: 'linear-gradient(135deg, #4ECDC4, #45B7D1)',
            color: '#FFFFFF',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(78, 205, 196, 0.4)',
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
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
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
          Great Job!
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
          {score} / {totalRounds} words correct
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
            background: 'linear-gradient(135deg, #4ECDC4, #45B7D1)',
            color: '#FFFFFF',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(78, 205, 196, 0.4)',
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
        background: '#1a1a2e',
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
          title="Hear word again"
        >
          🔊
        </button>
      </div>

      {/* Wrong answer feedback overlay */}
      {wrongShake && (
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
        camera={{ position: [0, 2, 6], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene
          roundData={{
            word: currentWord.word,
            image: currentWord.image,
            letters: roundLetters,
          }}
          filledSlots={filledSlots}
          onLetterTap={handleLetterTap}
          showCelebration={showCelebration}
        />
      </Canvas>
    </div>
  );
}
