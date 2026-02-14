import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { BasicsGameProps } from '../../../types';
import { useGameState } from '../../../hooks/useGameState';
import { useGameTTS } from '../../../hooks/useGameTTS';
import { useGameAudio } from '../../../hooks/useGameAudio';

// ---------------------------------------------------------------------------
// Types & Data
// ---------------------------------------------------------------------------

interface SentenceRound {
  text: string;
  answer: string;
  choices: string[];
  image: string;
}

const SENTENCES_L1: SentenceRound[] = [
  { text: 'The big ___', answer: 'dog', choices: ['dog', 'run', 'is'], image: '\u{1F415}' },
  { text: 'A red ___', answer: 'hat', choices: ['hat', 'go', 'the'], image: '\u{1F3A9}' },
  { text: 'My pet ___', answer: 'cat', choices: ['cat', 'at', 'up'], image: '\u{1F431}' },
  { text: 'The hot ___', answer: 'sun', choices: ['sun', 'sit', 'he'], image: '\u2600\uFE0F' },
  { text: 'A fun ___', answer: 'bus', choices: ['bus', 'and', 'we'], image: '\u{1F68C}' },
  { text: 'One big ___', answer: 'box', choices: ['box', 'in', 'am'], image: '\u{1F4E6}' },
  { text: 'The old ___', answer: 'hen', choices: ['hen', 'to', 'do'], image: '\u{1F414}' },
  { text: 'A wet ___', answer: 'mop', choices: ['mop', 'it', 'be'], image: '\u{1F9F9}' },
  { text: 'My red ___', answer: 'cup', choices: ['cup', 'on', 'no'], image: '\u{1F964}' },
  { text: 'The fat ___', answer: 'pig', choices: ['pig', 'so', 'if'], image: '\u{1F437}' },
];

const SENTENCES_L2: SentenceRound[] = [
  { text: 'The cat sat on a ___', answer: 'mat', choices: ['mat', 'run', 'big'], image: '\u{1F431}' },
  { text: 'I can see the ___', answer: 'bird', choices: ['bird', 'jump', 'into'], image: '\u{1F426}' },
  { text: 'She has a red ___', answer: 'ball', choices: ['ball', 'went', 'from'], image: '\u{1F534}' },
  { text: 'He ran to the ___', answer: 'park', choices: ['park', 'have', 'does'], image: '\u{1F333}' },
  { text: 'We like to eat ___', answer: 'cake', choices: ['cake', 'fast', 'very'], image: '\u{1F382}' },
  { text: 'The dog dug a ___', answer: 'hole', choices: ['hole', 'over', 'that'], image: '\u{1F415}' },
  { text: 'My mom has a ___', answer: 'bag', choices: ['bag', 'with', 'some'], image: '\u{1F45C}' },
  { text: 'I see a big ___', answer: 'fish', choices: ['fish', 'were', 'make'], image: '\u{1F41F}' },
  { text: 'The frog sat on ___', answer: 'log', choices: ['log', 'been', 'many'], image: '\u{1F438}' },
  { text: 'She put on her ___', answer: 'coat', choices: ['coat', 'when', 'each'], image: '\u{1F9E5}' },
];

const SENTENCES_L3: SentenceRound[] = [
  { text: 'The little bird flew over the tall ___', answer: 'tree', choices: ['tree', 'jump', 'fast'], image: '\u{1F426}' },
  { text: 'My dog likes to play in the ___', answer: 'yard', choices: ['yard', 'sing', 'blue'], image: '\u{1F415}' },
  { text: 'She went to the shop and got a ___', answer: 'gift', choices: ['gift', 'rain', 'from'], image: '\u{1F381}' },
  { text: 'The big brown bear sat by the ___', answer: 'lake', choices: ['lake', 'were', 'kind'], image: '\u{1F43B}' },
  { text: 'He put his red hat on his ___', answer: 'head', choices: ['head', 'boat', 'fast'], image: '\u{1F3A9}' },
  { text: 'I like to read books before I go to ___', answer: 'bed', choices: ['bed', 'fish', 'cold'], image: '\u{1F4DA}' },
  { text: 'The happy frog jumped into the ___', answer: 'pond', choices: ['pond', 'cake', 'soft'], image: '\u{1F438}' },
  { text: 'We saw a fox run into the dark ___', answer: 'cave', choices: ['cave', 'lamp', 'warm'], image: '\u{1F98A}' },
  { text: 'The baby chick came out of the ___', answer: 'egg', choices: ['egg', 'road', 'long'], image: '\u{1F423}' },
  { text: 'Dad made a big pot of hot ___', answer: 'soup', choices: ['soup', 'wind', 'many'], image: '\u{1F372}' },
];

const ALL_SENTENCES: SentenceRound[][] = [SENTENCES_L1, SENTENCES_L2, SENTENCES_L3];

const TOTAL_ROUNDS = 8;

const CHOICE_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1'];

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
  const idx = Math.min(level, ALL_SENTENCES.length - 1);
  return ALL_SENTENCES[idx];
}

function generateRounds(level: number): SentenceRound[] {
  const pool = getSentencesForLevel(level);
  const shuffled = shuffle(pool);
  return shuffled.slice(0, TOTAL_ROUNDS).map((s) => ({
    ...s,
    choices: shuffle(s.choices),
  }));
}

function buildDisplayText(text: string): string {
  return text.replace('___', '____');
}

function buildFullSentence(text: string, answer: string): string {
  return text.replace('___', answer);
}

// ---------------------------------------------------------------------------
// 3D Components
// ---------------------------------------------------------------------------

/** Desk surface under the book */
function DeskSurface() {
  return (
    <mesh position={[0, -1.6, 0]} receiveShadow rotation={[-0.15, 0, 0]}>
      <boxGeometry args={[12, 0.3, 8]} />
      <meshStandardMaterial color="#8B6914" />
    </mesh>
  );
}

/** Book spine */
function BookSpine() {
  return (
    <mesh position={[0, 0.4, 0.1]} rotation={[0, 0, 0]}>
      <cylinderGeometry args={[0.08, 0.08, 3.6, 8]} />
      <meshStandardMaterial color="#5D3A1A" />
    </mesh>
  );
}

/** A single book page (left or right) */
function BookPage({
  side,
  children,
}: {
  side: 'left' | 'right';
  children?: React.ReactNode;
}) {
  const angle = side === 'left' ? 0.25 : -0.25; // ~15 degrees
  const xOffset = side === 'left' ? -1.7 : 1.7;

  return (
    <group position={[xOffset, 0.4, 0.3]} rotation={[0, 0, angle]}>
      {/* Page background */}
      <mesh>
        <planeGeometry args={[3.2, 3.6]} />
        <meshStandardMaterial color="#FFF8E7" side={THREE.DoubleSide} />
      </mesh>
      {/* Content */}
      {children}
    </group>
  );
}

/** Left page with emoji illustration */
function LeftPageContent({ image }: { image: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.06;
  });

  return (
    <group ref={groupRef}>
      <Text
        position={[0, 0.2, 0.02]}
        fontSize={1.8}
        anchorX="center"
        anchorY="middle"
      >
        {image}
      </Text>
    </group>
  );
}

/** Right page showing sentence text with blank */
function RightPageContent({
  displayText,
  answered,
  answer,
  highlightWord,
}: {
  displayText: string;
  answered: boolean;
  answer: string;
  highlightWord: number;
}) {
  const finalText = answered
    ? buildFullSentence(displayText.replace('____', '___'), answer)
    : displayText;

  // Split into words for highlighting
  const words = finalText.split(' ');

  return (
    <group position={[0, 0, 0.02]}>
      {words.map((word, i) => {
        const lineWidth = 2.6;
        const fontSize = words.length > 6 ? 0.22 : 0.28;
        const wordsPerLine = words.length > 6 ? 4 : 3;
        const lineIndex = Math.floor(i / wordsPerLine);
        const wordInLine = i % wordsPerLine;
        const lineWordCount = Math.min(wordsPerLine, words.length - lineIndex * wordsPerLine);
        const xStart = -lineWidth / 2;
        const spacing = lineWidth / (lineWordCount + 1);
        const x = xStart + spacing * (wordInLine + 1);
        const y = 0.6 - lineIndex * 0.45;

        const isBlank = word === '____';
        const isHighlighted = highlightWord === i;

        let color = '#333333';
        if (isBlank) color = '#E65100';
        if (isHighlighted) color = '#1565C0';
        if (answered && word === answer) color = '#2E7D32';

        return (
          <Text
            key={`${i}-${word}`}
            position={[x, y, 0]}
            fontSize={fontSize}
            color={color}
            anchorX="center"
            anchorY="middle"
            fontWeight={isHighlighted || isBlank ? 700 : 400}
          >
            {word}
          </Text>
        );
      })}
    </group>
  );
}

/** A tappable word choice card */
function ChoiceCard({
  word,
  position,
  color,
  onTap,
  disabled,
  wrongShake,
}: {
  word: string;
  position: [number, number, number];
  color: string;
  onTap: () => void;
  disabled: boolean;
  wrongShake: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const shakeTimer = useRef(0);
  const baseX = useRef(position[0]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    // Gentle bob
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0] * 2) * 0.05;

    // Shake animation
    if (wrongShake) {
      shakeTimer.current += delta * 25;
      meshRef.current.position.x =
        baseX.current + Math.sin(shakeTimer.current) * 0.1;
    } else {
      shakeTimer.current = 0;
      meshRef.current.position.x = baseX.current;
    }
  });

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        if (!disabled) onTap();
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <RoundedBox
        ref={meshRef}
        args={[1.6, 0.7, 0.25]}
        radius={0.1}
        smoothness={4}
        castShadow
      >
        <meshStandardMaterial color={color} />
      </RoundedBox>
      <Text
        position={[0, position[1] - position[1], 0.14]}
        fontSize={0.3}
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

interface SceneProps {
  roundData: SentenceRound;
  answered: boolean;
  highlightWord: number;
  wrongChoice: string | null;
  onChoiceTap: (word: string) => void;
  showCelebration: boolean;
}

function Scene({
  roundData,
  answered,
  highlightWord,
  wrongChoice,
  onChoiceTap,
  showCelebration,
}: SceneProps) {
  const displayText = buildDisplayText(roundData.text);

  // Position choices below the book
  const choiceCount = roundData.choices.length;
  const spacing = 2.0;
  const startX = -((choiceCount - 1) * spacing) / 2;

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={0.8} castShadow />
      <pointLight position={[-3, 3, 2]} intensity={0.3} color="#FFE4B5" />

      {/* Fixed camera */}
      <OrbitControls enabled={false} />

      {/* Desk surface */}
      <DeskSurface />

      {/* Book spine */}
      <BookSpine />

      {/* Left page - illustration */}
      <BookPage side="left">
        <LeftPageContent image={roundData.image} />
      </BookPage>

      {/* Right page - sentence */}
      <BookPage side="right">
        <RightPageContent
          displayText={displayText}
          answered={answered}
          answer={roundData.answer}
          highlightWord={highlightWord}
        />
      </BookPage>

      {/* Word choice cards below the book */}
      {!answered &&
        roundData.choices.map((word, i) => (
          <ChoiceCard
            key={`${word}-${i}`}
            word={word}
            position={[startX + i * spacing, -1.1, 1.5]}
            color={CHOICE_COLORS[i % CHOICE_COLORS.length]}
            onTap={() => onChoiceTap(word)}
            disabled={answered}
            wrongShake={wrongChoice === word}
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

export default function StoryBook(props: BasicsGameProps) {
  const { level, onComplete, onBack } = props;
  const { phase, round, score, accuracy, totalRounds, startGame, submitAnswer, nextRound } =
    useGameState(TOTAL_ROUNDS);
  const tts = useGameTTS();
  const audio = useGameAudio();

  // Generate rounds on mount / level change
  const rounds = useMemo(() => generateRounds(level), [level]);

  // Current round data
  const currentRound = rounds[round - 1] ?? rounds[0];

  // State
  const [answered, setAnswered] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [wrongChoice, setWrongChoice] = useState<string | null>(null);
  const [highlightWord, setHighlightWord] = useState(-1);

  // Reset when round changes
  useEffect(() => {
    setAnswered(false);
    setShowCelebration(false);
    setWrongChoice(null);
    setHighlightWord(-1);
  }, [round]);

  // Read sentence aloud with word highlighting when round starts
  useEffect(() => {
    if (phase !== 'playing' || !currentRound) return;

    const fullSentence = buildFullSentence(currentRound.text, currentRound.answer);
    const words = fullSentence.split(' ');

    // Read full sentence after a brief delay
    const readTimer = setTimeout(() => {
      tts.saySentence(fullSentence);
    }, 500);

    // Highlight words sequentially (approximate timing)
    const highlightTimers: ReturnType<typeof setTimeout>[] = [];
    const msPerWord = 500;
    words.forEach((_, i) => {
      const timer = setTimeout(() => {
        setHighlightWord(i);
      }, 500 + i * msPerWord);
      highlightTimers.push(timer);
    });

    // Clear highlight after all words
    const clearTimer = setTimeout(() => {
      setHighlightWord(-1);
    }, 500 + words.length * msPerWord + 300);
    highlightTimers.push(clearTimer);

    return () => {
      clearTimeout(readTimer);
      highlightTimers.forEach(clearTimeout);
    };
  }, [phase, round]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle complete phase
  useEffect(() => {
    if (phase === 'complete') {
      onComplete(accuracy);
    }
  }, [phase, accuracy, onComplete]);

  // Handle word choice tap
  const handleChoiceTap = useCallback(
    (word: string) => {
      if (phase !== 'playing' || answered) return;

      if (word === currentRound.answer) {
        // Correct!
        audio.playChime();
        tts.sayEncouragement();
        setAnswered(true);
        setShowCelebration(true);
        setWrongChoice(null);
        submitAnswer(true);

        // Auto advance after celebration
        setTimeout(() => {
          nextRound();
        }, 2200);
      } else {
        // Wrong!
        audio.playBuzz();
        tts.sayRedirect();
        setWrongChoice(word);
        setTimeout(() => setWrongChoice(null), 600);
      }
    },
    [phase, answered, currentRound, audio, tts, submitAnswer, nextRound],
  );

  // Replay sentence
  const handleReplay = useCallback(() => {
    if (currentRound) {
      const fullSentence = buildFullSentence(currentRound.text, currentRound.answer);
      tts.saySentence(fullSentence);
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
          background: 'linear-gradient(135deg, #3E2723 0%, #4E342E 50%, #5D4037 100%)',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', marginBottom: '0.5rem' }}>
          {'\u{1F4D6}'}
        </div>
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            margin: '0 0 0.5rem 0',
            textAlign: 'center',
          }}
        >
          Story Book
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
          Read along and fill in the missing word!
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
            background: 'linear-gradient(135deg, #E65100, #FF8F00)',
            color: '#FFFFFF',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(230, 81, 0, 0.4)',
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
          background: 'linear-gradient(135deg, #3E2723 0%, #4E342E 50%, #5D4037 100%)',
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
          {score} / {totalRounds} sentences correct
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
            background: 'linear-gradient(135deg, #E65100, #FF8F00)',
            color: '#FFFFFF',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(230, 81, 0, 0.4)',
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
        background: '#3E2723',
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
      {wrongChoice && (
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
        camera={{ position: [0, 0.5, 5.5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene
          roundData={currentRound}
          answered={answered}
          highlightWord={highlightWord}
          wrongChoice={wrongChoice}
          onChoiceTap={handleChoiceTap}
          showCelebration={showCelebration}
        />
      </Canvas>
    </div>
  );
}
