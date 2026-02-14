import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import type { BasicsGameProps } from '../../../types.ts';
import type { MathProblem } from '../../../data/mathGenerators.ts';
import { generateAddition } from '../../../data/mathGenerators.ts';
import { useGameState } from '../../../hooks/useGameState.ts';
import { useGameTTS } from '../../../hooks/useGameTTS.ts';
import { useGameAudio } from '../../../hooks/useGameAudio.ts';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TOTAL_ROUNDS = 8;
const FISH_COLORS_A = ['#FF8C42', '#FFB347', '#FFA07A'];
const FISH_COLORS_B = ['#42A5F5', '#64B5F6', '#81D4FA'];

// ---------------------------------------------------------------------------
// Fish component - simple low-poly fish from primitives
// ---------------------------------------------------------------------------

interface FishProps {
  color: string;
  position: [number, number, number];
  direction: 1 | -1;
  index: number;
  celebrating: boolean;
}

function Fish({ color, position, direction, index, celebrating }: FishProps) {
  const groupRef = useRef<THREE.Group>(null);
  const baseY = position[1];
  const speed = 0.6 + index * 0.15;
  const phaseOffset = index * 1.3;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Gentle sinusoidal swimming motion
    groupRef.current.position.y =
      baseY + Math.sin(t * speed + phaseOffset) * 0.12;
    groupRef.current.position.x =
      position[0] + Math.sin(t * 0.3 + phaseOffset) * 0.15;

    // Slight roll while swimming
    groupRef.current.rotation.z = Math.sin(t * speed + phaseOffset) * 0.08;

    // Celebration jump
    if (celebrating) {
      groupRef.current.position.y += Math.abs(Math.sin(t * 4 + index)) * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Body - elongated sphere */}
      <mesh scale={[1.4, 1, 0.8]}>
        <sphereGeometry args={[0.18, 12, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Tail - cone behind body */}
      <mesh
        position={[direction * -0.28, 0, 0]}
        rotation={[0, 0, direction * (Math.PI / 2)]}
      >
        <coneGeometry args={[0.12, 0.2, 4]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Eye */}
      <mesh position={[direction * 0.12, 0.04, 0.1]}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[direction * 0.14, 0.04, 0.12]}>
        <sphereGeometry args={[0.02, 6, 6]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// FishGroup - animates a group of fish swimming in from one side
// ---------------------------------------------------------------------------

interface FishGroupProps {
  count: number;
  side: 'left' | 'right';
  colors: string[];
  visible: boolean;
  celebrating: boolean;
}

function FishGroup({ count, side, colors, visible, celebrating }: FishGroupProps) {
  const groupRef = useRef<THREE.Group>(null);
  const direction: 1 | -1 = side === 'left' ? 1 : -1;
  const startX = side === 'left' ? -4 : 4;
  const targetX = side === 'left' ? -0.8 : 0.8;

  useFrame(() => {
    if (!groupRef.current) return;
    if (visible) {
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        targetX,
        0.03,
      );
    } else {
      groupRef.current.position.x = startX;
    }
  });

  const fishPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      positions.push([col * 0.45 - 0.45, -0.2 + row * 0.45, (i % 2) * 0.2]);
    }
    return positions;
  }, [count]);

  return (
    <group ref={groupRef} position={[startX, 0, 0]}>
      {fishPositions.map((pos, i) => (
        <Fish
          key={i}
          color={colors[i % colors.length]}
          position={pos}
          direction={direction}
          index={i}
          celebrating={celebrating}
        />
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Seaweed
// ---------------------------------------------------------------------------

function Seaweed({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.15;
  });

  return (
    <mesh ref={ref} position={position}>
      <cylinderGeometry args={[0.03, 0.05, 0.6, 6]} />
      <meshStandardMaterial color="#2E7D32" />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Aquarium glass box
// ---------------------------------------------------------------------------

function AquariumTank() {
  return (
    <group>
      {/* Glass walls */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 2.5, 2.5]} />
        <meshPhysicalMaterial
          color="#88CCFF"
          transparent
          transmission={0.8}
          roughness={0.1}
          thickness={0.05}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Sand bottom */}
      <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.9, 2.4]} />
        <meshStandardMaterial color="#DEB887" />
      </mesh>
      {/* Seaweed */}
      <Seaweed position={[-1.5, -0.9, 0.3]} />
      <Seaweed position={[1.4, -0.9, -0.4]} />
      <Seaweed position={[-0.5, -0.9, -0.6]} />
      <Seaweed position={[0.8, -0.9, 0.5]} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// AnswerBubble
// ---------------------------------------------------------------------------

interface AnswerBubbleProps {
  value: number;
  position: [number, number, number];
  onTap: () => void;
  state: 'idle' | 'correct' | 'wrong';
}

function AnswerBubble({ value, position, onTap, state }: AnswerBubbleProps) {
  const groupRef = useRef<THREE.Group>(null);
  const wobbleTime = useRef(0);
  const popped = state === 'correct';

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (state === 'wrong') {
      wobbleTime.current += delta * 20;
      groupRef.current.rotation.z = Math.sin(wobbleTime.current) * 0.2;
      if (wobbleTime.current > Math.PI * 4) {
        wobbleTime.current = 0;
        groupRef.current.rotation.z = 0;
      }
    }
    if (popped) {
      groupRef.current.scale.lerp(new THREE.Vector3(0, 0, 0), 0.15);
    }
  });

  return (
    <Float speed={2} floatIntensity={0.3}>
      <group ref={groupRef} position={position} onClick={onTap}>
        <mesh>
          <sphereGeometry args={[0.5, 16, 12]} />
          <meshPhysicalMaterial
            color="#B3E5FC"
            transparent
            opacity={0.5}
            roughness={0.1}
          />
        </mesh>
        <Text
          fontSize={0.35}
          color="#1565C0"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {String(value)}
        </Text>
      </group>
    </Float>
  );
}

// ---------------------------------------------------------------------------
// Equation display above the tank
// ---------------------------------------------------------------------------

function EquationDisplay({
  a,
  b,
  showAnswer,
  answer,
}: {
  a: number;
  b: number;
  showAnswer: boolean;
  answer: number;
}) {
  return (
    <Text
      position={[0, 2.2, 0]}
      fontSize={0.4}
      color="#FFFFFF"
      anchorX="center"
      anchorY="middle"
      fontWeight="bold"
      outlineWidth={0.02}
      outlineColor="#000000"
    >
      {`${a} + ${b} = ${showAnswer ? answer : '?'}`}
    </Text>
  );
}

// ---------------------------------------------------------------------------
// Scene - 3D content rendered inside the Canvas
// ---------------------------------------------------------------------------

interface SceneProps {
  problem: MathProblem;
  showFish: boolean;
  celebrating: boolean;
  showAnswer: boolean;
  bubbleStates: Record<number, 'idle' | 'correct' | 'wrong'>;
  onBubbleTap: (value: number) => void;
}

function Scene({
  problem,
  showFish,
  celebrating,
  showAnswer,
  bubbleStates,
  onBubbleTap,
}: SceneProps) {
  // Position the 4 answer bubbles in a row below the tank
  const bubblePositions: [number, number, number][] = useMemo(
    () => [
      [-2.2, -2.2, 0],
      [-0.75, -2.2, 0],
      [0.75, -2.2, 0],
      [2.2, -2.2, 0],
    ],
    [],
  );

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={0.8} />
      <directionalLight position={[-2, 3, -3]} intensity={0.3} />

      {/* Background color */}
      <color attach="background" args={['#0A2A4A']} />

      {/* Aquarium */}
      <AquariumTank />

      {/* Fish groups */}
      <FishGroup
        count={problem.a}
        side="left"
        colors={FISH_COLORS_A}
        visible={showFish}
        celebrating={celebrating}
      />
      <FishGroup
        count={problem.b}
        side="right"
        colors={FISH_COLORS_B}
        visible={showFish}
        celebrating={celebrating}
      />

      {/* Equation */}
      <EquationDisplay
        a={problem.a}
        b={problem.b}
        showAnswer={showAnswer}
        answer={problem.answer}
      />

      {/* Answer bubbles */}
      {problem.choices.map((choice, i) => (
        <AnswerBubble
          key={`${problem.a}-${problem.b}-${choice}-${i}`}
          value={choice}
          position={bubblePositions[i]}
          onTap={() => onBubbleTap(choice)}
          state={bubbleStates[choice] ?? 'idle'}
        />
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// Main game component
// ---------------------------------------------------------------------------

export default function AdditionAquarium(props: BasicsGameProps) {
  const { level, onComplete, onBack } = props;
  const { phase, round, score, accuracy, totalRounds, startGame, submitAnswer, nextRound } =
    useGameState(TOTAL_ROUNDS);
  const tts = useGameTTS();
  const audio = useGameAudio();

  // Generate all problems for this session
  const problems = useMemo(
    () => generateAddition(level, TOTAL_ROUNDS),
    [level],
  );

  const currentProblem = problems[round - 1] ?? problems[0];

  // Per-round state
  const [showFish, setShowFish] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [bubbleStates, setBubbleStates] = useState<Record<number, 'idle' | 'correct' | 'wrong'>>({});
  const [answered, setAnswered] = useState(false);

  // Reset per-round state when round changes
  useEffect(() => {
    if (phase === 'playing') {
      setShowFish(false);
      setCelebrating(false);
      setShowAnswer(false);
      setBubbleStates({});
      setAnswered(false);

      // Brief delay then show fish and speak
      const timer = setTimeout(() => {
        setShowFish(true);
        tts.saySentence('How many fish in all?');
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [phase, round]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-start on mount
  useEffect(() => {
    if (phase === 'intro') {
      startGame();
    }
  }, [phase, startGame]);

  // When phase becomes 'complete', report accuracy
  useEffect(() => {
    if (phase === 'complete') {
      tts.saySentence(
        accuracy >= 80 ? 'Amazing job! You are a fish counting champion!' : 'Good try! Keep practicing!',
      );
      audio.playLevelUp();
    }
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBubbleTap = useCallback(
    (value: number) => {
      if (phase !== 'playing' || answered) return;

      if (value === currentProblem.answer) {
        // Correct!
        setBubbleStates((prev) => ({ ...prev, [value]: 'correct' }));
        setShowAnswer(true);
        setCelebrating(true);
        setAnswered(true);
        audio.playChime();
        tts.sayEncouragement();
        submitAnswer(true);

        // Move to next round after a short celebration
        setTimeout(() => {
          setCelebrating(false);
          nextRound();
        }, 2000);
      } else {
        // Wrong - wobble and try again
        setBubbleStates((prev) => ({ ...prev, [value]: 'wrong' }));
        audio.playBuzz();
        tts.sayRedirect();

        // Reset wrong state after wobble animation
        setTimeout(() => {
          setBubbleStates((prev) => {
            const next = { ...prev };
            delete next[value];
            return next;
          });
        }, 800);
      }
    },
    [phase, answered, currentProblem.answer, audio, tts, submitAnswer, nextRound],
  );

  // ── Complete screen ──
  if (phase === 'complete') {
    const stars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : accuracy >= 50 ? 1 : 0;
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0A2A4A 0%, #1565C0 100%)',
          fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
          color: '#FFFFFF',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: 12 }}>
          {stars >= 3 ? '\u{1F3C6}' : stars >= 2 ? '\u{2B50}' : '\u{1F41F}'}
        </div>
        <h2 style={{ fontSize: '1.8rem', margin: '0 0 8px' }}>All Done!</h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.8, margin: '0 0 4px' }}>
          Score: {score} / {totalRounds}
        </p>
        <p style={{ fontSize: '1rem', opacity: 0.7, margin: '0 0 20px' }}>
          {accuracy}% Accuracy
        </p>
        <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ fontSize: '2rem', opacity: i < stars ? 1 : 0.2 }}>
              {'\u2B50'}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={onBack} style={hudBtnStyle}>
            {'\u2190'} Back
          </button>
          <button
            onClick={() => onComplete(accuracy)}
            style={{ ...hudBtnStyle, background: '#1565C0' }}
          >
            Done {'\u2714'}
          </button>
        </div>
      </div>
    );
  }

  // ── Main game rendering ──
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene
          problem={currentProblem}
          showFish={showFish}
          celebrating={celebrating}
          showAnswer={showAnswer}
          bubbleStates={bubbleStates}
          onBubbleTap={handleBubbleTap}
        />
      </Canvas>

      {/* HUD overlay */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          right: 12,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <button
          onClick={onBack}
          style={{ ...hudBtnStyle, pointerEvents: 'auto' }}
        >
          {'\u2190'} Back
        </button>
        <div
          style={{
            fontFamily: "'Comic Sans MS', cursive",
            color: '#FFFFFF',
            fontSize: '0.9rem',
            background: 'rgba(0,0,0,0.4)',
            borderRadius: 8,
            padding: '4px 12px',
          }}
        >
          Round {round}/{totalRounds} &middot; Score {score}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const hudBtnStyle: React.CSSProperties = {
  background: 'rgba(0,0,0,0.5)',
  border: '1px solid rgba(255,255,255,0.3)',
  borderRadius: 10,
  padding: '8px 16px',
  color: '#FFFFFF',
  fontSize: '0.9rem',
  cursor: 'pointer',
  fontFamily: "'Comic Sans MS', cursive",
};
