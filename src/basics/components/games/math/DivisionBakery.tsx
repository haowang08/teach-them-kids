import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import type * as THREE from 'three';
import type { BasicsGameProps } from '../../../types.ts';
import { useGameState } from '../../../hooks/useGameState.ts';
import { useGameTTS } from '../../../hooks/useGameTTS.ts';
import { useGameAudio } from '../../../hooks/useGameAudio.ts';
import { generateDivision } from '../../../data/mathGenerators.ts';
import type { MathProblem } from '../../../data/mathGenerators.ts';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TOTAL_ROUNDS = 8;
const FEEDBACK_DELAY_MS = 2200;
const SHIRT_COLORS = ['#E53935', '#1E88E5', '#43A047', '#FB8C00', '#8E24AA', '#00ACC1', '#F4511E', '#6D4C41', '#D81B60'];
const FROSTING_COLORS = ['#FF69B4', '#FFB6C1', '#BA68C8', '#EF5350', '#AB47BC', '#F48FB1'];
const SKIN_TONE = '#FDBCB4';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Clamp visual items to a manageable count. */
function clampTreats(total: number): number {
  return Math.min(total, 24);
}

// ---------------------------------------------------------------------------
// 3D Sub-components
// ---------------------------------------------------------------------------

/** A single cupcake: cylinder base + sphere frosting. */
function Cupcake({ position }: { position: [number, number, number] }) {
  const frostingColor = useMemo(
    () => FROSTING_COLORS[Math.floor(Math.random() * FROSTING_COLORS.length)],
    [],
  );
  return (
    <group position={position}>
      {/* Base (wrapper) */}
      <mesh position={[0, 0.075, 0]}>
        <cylinderGeometry args={[0.15, 0.12, 0.15, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Frosting */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.15, 8, 6]} />
        <meshStandardMaterial color={frostingColor} />
      </mesh>
    </group>
  );
}

/** A single cookie: flat cylinder. */
function Cookie({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.05, 10]} />
        <meshStandardMaterial color="#D2A857" />
      </mesh>
      {/* Chocolate chips */}
      {([[-0.06, 0.06, 0.05], [0.08, 0.06, -0.04], [-0.02, 0.06, -0.08]] as const).map(
        (cp, i) => (
          <mesh key={i} position={[cp[0], cp[1], cp[2]]}>
            <sphereGeometry args={[0.03, 5, 4]} />
            <meshStandardMaterial color="#4E342E" />
          </mesh>
        ),
      )}
    </group>
  );
}

/** A simple friend character: cylinder body + sphere head. */
function FriendCharacter({
  position,
  colorIndex,
}: {
  position: [number, number, number];
  colorIndex: number;
}) {
  const shirtColor = SHIRT_COLORS[colorIndex % SHIRT_COLORS.length];
  return (
    <group position={position}>
      {/* Body */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.5, 8]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.15, 8, 6]} />
        <meshStandardMaterial color={SKIN_TONE} />
      </mesh>
      {/* Eyes (two small dark spheres) */}
      <mesh position={[-0.05, 0.68, 0.13]}>
        <sphereGeometry args={[0.025, 5, 4]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0.05, 0.68, 0.13]}>
        <sphereGeometry args={[0.025, 5, 4]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  );
}

/** Bakery counter: a large box. */
function BakeryCounter() {
  return (
    <group position={[0, 0, 0]}>
      {/* Counter top */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[6, 0.15, 2]} />
        <meshStandardMaterial color="#DEB887" />
      </mesh>
      {/* Counter front */}
      <mesh position={[0, 0.2, 0.95]}>
        <boxGeometry args={[6, 0.55, 0.1]} />
        <meshStandardMaterial color="#D2A06A" />
      </mesh>
    </group>
  );
}

/** Bakery back wall. */
function BakeryWall() {
  return (
    <group position={[0, 2, -3]}>
      {/* Wall */}
      <mesh>
        <planeGeometry args={[12, 5]} />
        <meshStandardMaterial color="#FFECD2" />
      </mesh>
      {/* Window */}
      <mesh position={[2.5, 0.5, 0.01]}>
        <planeGeometry args={[1.8, 1.5]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.6} />
      </mesh>
      {/* Window frame */}
      {([
        [2.5, 1.25, 0.02, 1.9, 0.08],
        [2.5, -0.25, 0.02, 1.9, 0.08],
        [1.6, 0.5, 0.02, 0.08, 1.6],
        [3.4, 0.5, 0.02, 0.08, 1.6],
      ] as const).map((f, i) => (
        <mesh key={i} position={[f[0], f[1], f[2]]}>
          <boxGeometry args={[f[3], f[4], 0.05]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      ))}
    </group>
  );
}

/** A treat that can animate flying to a friend. */
function AnimatedTreat({
  startPos,
  targetPos,
  animate,
  isCupcake,
  delay,
}: {
  startPos: [number, number, number];
  targetPos: [number, number, number];
  animate: boolean;
  isCupcake: boolean;
  delay: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const startTime = useRef(0);
  const started = useRef(false);

  useFrame(() => {
    if (!ref.current) return;
    if (!animate) {
      ref.current.position.set(startPos[0], startPos[1], startPos[2]);
      started.current = false;
      startTime.current = 0;
      return;
    }

    if (!started.current) {
      startTime.current = Date.now() + delay;
      started.current = true;
    }

    const now = Date.now();
    if (now < startTime.current) return;

    const elapsed = (now - startTime.current) / 800; // 800ms flight
    const t = Math.min(elapsed, 1);
    const eased = t * (2 - t); // ease-out

    // Lerp with arc
    const x = startPos[0] + (targetPos[0] - startPos[0]) * eased;
    const z = startPos[2] + (targetPos[2] - startPos[2]) * eased;
    const arcHeight = Math.sin(t * Math.PI) * 1.5;
    const y = startPos[1] + (targetPos[1] - startPos[1]) * eased + arcHeight;

    ref.current.position.set(x, y, z);
  });

  return (
    <group ref={ref} position={startPos}>
      {isCupcake ? (
        <Cupcake position={[0, 0, 0]} />
      ) : (
        <Cookie position={[0, 0, 0]} />
      )}
    </group>
  );
}

/** Wobbling answer bubble. */
function AnswerBubble({
  value,
  position,
  onClick,
  wobble,
  correct,
  disabled,
}: {
  value: number;
  position: [number, number, number];
  onClick: () => void;
  wobble: boolean;
  correct: boolean;
  disabled: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const wobbleStart = useRef(0);

  useFrame(() => {
    if (!ref.current) return;
    if (wobble) {
      if (wobbleStart.current === 0) wobbleStart.current = Date.now();
      const elapsed = (Date.now() - wobbleStart.current) / 1000;
      ref.current.rotation.z = Math.sin(elapsed * 20) * 0.2 * Math.max(0, 1 - elapsed);
      if (elapsed > 0.6) {
        ref.current.rotation.z = 0;
        wobbleStart.current = 0;
      }
    } else {
      wobbleStart.current = 0;
      ref.current.rotation.z = 0;
    }
  });

  const color = correct ? '#4CAF50' : '#E91E63';

  return (
    <Float speed={2} floatIntensity={0.3} rotationIntensity={0}>
      <group
        ref={ref}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (!disabled) document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <mesh>
          <sphereGeometry args={[0.5, 14, 10]} />
          <meshStandardMaterial color={color} transparent opacity={0.85} />
        </mesh>
        <Text
          position={[0, 0, 0.52]}
          fontSize={0.4}
          color="white"
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
// Bakery Scene (rendered inside Canvas)
// ---------------------------------------------------------------------------

function BakeryScene({
  problem,
  onAnswer,
  showCelebration,
  wrongIndex,
  answered,
}: {
  problem: MathProblem;
  onAnswer: (choice: number, index: number) => void;
  showCelebration: boolean;
  wrongIndex: number | null;
  answered: boolean;
}) {
  const totalTreats = clampTreats(problem.a);
  const numFriends = problem.b;
  const isCupcake = useMemo(() => Math.random() > 0.4, [problem.a, problem.b]);

  // Lay treats on counter in a grid
  const treatPositions = useMemo(() => {
    const cols = Math.min(totalTreats, 6);
    const rows = Math.ceil(totalTreats / cols);
    const spacingX = 0.55;
    const spacingZ = 0.55;
    const startX = -(cols - 1) * spacingX / 2;
    const startZ = -(rows - 1) * spacingZ / 2;
    const pts: [number, number, number][] = [];
    for (let i = 0; i < totalTreats; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      pts.push([startX + col * spacingX, 0.58, startZ + row * spacingZ]);
    }
    return pts;
  }, [totalTreats]);

  // Position friends in a row behind the counter
  const friendPositions = useMemo(() => {
    const maxFriends = Math.min(numFriends, 9);
    const spacing = Math.min(1.0, 5.5 / Math.max(maxFriends - 1, 1));
    const startX = -(maxFriends - 1) * spacing / 2;
    const pts: [number, number, number][] = [];
    for (let i = 0; i < maxFriends; i++) {
      pts.push([startX + i * spacing, 0, -1.5]);
    }
    return pts;
  }, [numFriends]);

  // For the flying animation, assign each treat to a friend
  const treatTargets = useMemo(() => {
    return treatPositions.map((_, i) => {
      const friendIdx = i % friendPositions.length;
      const fp = friendPositions[friendIdx];
      return [fp[0], fp[1] + 0.8, fp[2] + 0.3] as [number, number, number];
    });
  }, [treatPositions, friendPositions]);

  // Bubble positions
  const bubblePositions: [number, number, number][] = useMemo(() => {
    const spread = 2.8;
    const startX = -(problem.choices.length - 1) * spread / 2;
    return problem.choices.map((_, i) => [startX + i * spread, 4.0, 0] as [number, number, number]);
  }, [problem.choices]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 6, 4]} intensity={0.9} castShadow />
      <pointLight position={[-3, 4, 2]} intensity={0.3} color="#FFE4B5" />

      {/* Warm bakery background */}
      <color attach="background" args={['#FFF3E0']} />

      {/* Bakery Wall */}
      <BakeryWall />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color="#D7CCC8" />
      </mesh>

      {/* Counter */}
      <BakeryCounter />

      {/* Equation text */}
      <Text
        position={[0, 5.2, 0]}
        fontSize={0.55}
        color="#5D4037"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {`${problem.a} \u00f7 ${problem.b} = ?`}
      </Text>

      {/* Friends */}
      {friendPositions.map((pos, i) => (
        <FriendCharacter key={i} position={pos} colorIndex={i} />
      ))}

      {/* Treats on counter (animated when celebration) */}
      {treatPositions.map((pos, i) => (
        <AnimatedTreat
          key={`${problem.answer}-${i}`}
          startPos={pos}
          targetPos={treatTargets[i]}
          animate={showCelebration}
          isCupcake={isCupcake}
          delay={i * 80}
        />
      ))}

      {/* Answer bubbles */}
      {problem.choices.map((choice, i) => (
        <AnswerBubble
          key={`${problem.answer}-${i}`}
          value={choice}
          position={bubblePositions[i]}
          onClick={() => onAnswer(choice, i)}
          wobble={wrongIndex === i}
          correct={showCelebration && choice === problem.answer}
          disabled={answered}
        />
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function DivisionBakery(props: BasicsGameProps) {
  const { level, onComplete, onBack } = props;
  const game = useGameState(TOTAL_ROUNDS);
  const tts = useGameTTS();
  const audio = useGameAudio();

  // Generate all problems upfront
  const problems = useMemo(() => generateDivision(level + 1, TOTAL_ROUNDS), [level]);
  const currentProblem = problems[game.round - 1] as MathProblem | undefined;

  const [wrongIndex, setWrongIndex] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Auto-start the game
  useEffect(() => {
    if (game.phase === 'intro') {
      game.startGame();
    }
  }, [game.phase, game.startGame]);

  // Speak the problem when round changes
  useEffect(() => {
    if (game.phase === 'playing' && currentProblem) {
      const treatName = 'treats';
      tts.saySentence(
        `${currentProblem.a} ${treatName} shared among ${currentProblem.b} friends. How many each?`,
      );
    }
  }, [game.phase, game.round]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle completion
  useEffect(() => {
    if (game.phase === 'complete') {
      audio.playLevelUp();
      tts.saySentence(
        game.accuracy >= 80
          ? 'Wonderful! You are a division star!'
          : 'Good try! Keep practicing!',
      );
      const timer = setTimeout(() => {
        onComplete(game.accuracy);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [game.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAnswer = useCallback(
    (choice: number, index: number) => {
      if (game.phase !== 'playing' || !currentProblem) return;

      if (choice === currentProblem.answer) {
        // Correct!
        audio.playChime();
        tts.sayEncouragement();
        setShowCelebration(true);
        setWrongIndex(null);
        game.submitAnswer(true);

        // Move to next round after a delay (longer to allow flying animation)
        setTimeout(() => {
          setShowCelebration(false);
          game.nextRound();
        }, FEEDBACK_DELAY_MS);
      } else {
        // Wrong - wobble
        audio.playBuzz();
        tts.sayRedirect();
        setWrongIndex(index);
        setTimeout(() => setWrongIndex(null), 700);
      }
    },
    [game.phase, currentProblem, audio, tts, game.submitAnswer, game.nextRound],
  );

  // Complete phase screen
  if (game.phase === 'complete') {
    const stars = game.accuracy >= 90 ? 3 : game.accuracy >= 70 ? 2 : game.accuracy >= 50 ? 1 : 0;
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #AD1457 0%, #880E4F 100%)',
          fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
          color: '#fff',
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: 12 }}>
          {Array.from({ length: 3 })
            .map((_, i) => (i < stars ? '\u2B50' : '\u2606'))
            .join(' ')}
        </div>
        <h2 style={{ fontSize: '1.8rem', margin: '0 0 8px' }}>
          {game.accuracy >= 80 ? 'Great Job!' : 'Good Try!'}
        </h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.8, margin: 0 }}>
          {game.score} / {game.totalRounds} correct ({game.accuracy}%)
        </p>
      </div>
    );
  }

  if (!currentProblem) return null;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* HUD */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 5,
          display: 'flex',
          gap: 12,
          alignItems: 'center',
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: 'rgba(0,0,0,0.4)',
            border: 'none',
            borderRadius: 8,
            padding: '6px 14px',
            color: '#fff',
            fontSize: '0.85rem',
            cursor: 'pointer',
            fontFamily: "'Comic Sans MS', cursive",
          }}
        >
          {'\u2190'} Back
        </button>
        <span
          style={{
            background: 'rgba(0,0,0,0.4)',
            borderRadius: 8,
            padding: '6px 12px',
            color: '#fff',
            fontSize: '0.85rem',
            fontFamily: "'Comic Sans MS', cursive",
          }}
        >
          Round {game.round} / {game.totalRounds}
        </span>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 4, 7], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <BakeryScene
          problem={currentProblem}
          onAnswer={handleAnswer}
          showCelebration={showCelebration}
          wrongIndex={wrongIndex}
          answered={game.phase === 'feedback'}
        />
      </Canvas>
    </div>
  );
}
