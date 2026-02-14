import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import type * as THREE from 'three';
import type { BasicsGameProps } from '../../../types.ts';
import { useGameState } from '../../../hooks/useGameState.ts';
import { useGameTTS } from '../../../hooks/useGameTTS.ts';
import { useGameAudio } from '../../../hooks/useGameAudio.ts';
import { generateMultiplication } from '../../../data/mathGenerators.ts';
import type { MathProblem } from '../../../data/mathGenerators.ts';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TOTAL_ROUNDS = 8;
const FEEDBACK_DELAY_MS = 1800;
const ANIMAL_COLORS = ['#F5F5DC', '#FFFAF0', '#FFF8E7', '#F0EAD6'];
const CHICKEN_BODY_COLORS = ['#FF8C00', '#E8751A', '#D2691E'];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Clamp groups shown visually to keep scene manageable. */
function clampVisual(groups: number, perGroup: number): { vGroups: number; vPerGroup: number } {
  const maxItems = 20;
  let vGroups = groups;
  let vPerGroup = perGroup;
  if (vGroups * vPerGroup > maxItems) {
    vGroups = Math.min(vGroups, 5);
    vPerGroup = Math.min(vPerGroup, Math.floor(maxItems / vGroups));
  }
  return { vGroups, vPerGroup };
}

// ---------------------------------------------------------------------------
// 3D Sub-components
// ---------------------------------------------------------------------------

/** Simple procedural sheep built from spheres + cylinders. */
function Sheep({ position }: { position: [number, number, number] }) {
  const colorIdx = useMemo(() => Math.floor(Math.random() * ANIMAL_COLORS.length), []);
  return (
    <group position={position}>
      {/* Body */}
      <mesh castShadow position={[0, 0.25, 0]}>
        <sphereGeometry args={[0.25, 10, 8]} />
        <meshStandardMaterial color={ANIMAL_COLORS[colorIdx]} />
      </mesh>
      {/* Head */}
      <mesh castShadow position={[0.22, 0.35, 0]}>
        <sphereGeometry args={[0.15, 8, 6]} />
        <meshStandardMaterial color={ANIMAL_COLORS[colorIdx]} />
      </mesh>
      {/* Legs */}
      {([[-0.1, 0, 0.1], [-0.1, 0, -0.1], [0.1, 0, 0.1], [0.1, 0, -0.1]] as const).map(
        (lp, i) => (
          <mesh key={i} position={[lp[0], 0.1, lp[2]]}>
            <cylinderGeometry args={[0.03, 0.03, 0.2, 6]} />
            <meshStandardMaterial color="#555" />
          </mesh>
        ),
      )}
    </group>
  );
}

/** Simple procedural chicken. */
function Chicken({ position }: { position: [number, number, number] }) {
  const bodyColor = useMemo(
    () => CHICKEN_BODY_COLORS[Math.floor(Math.random() * CHICKEN_BODY_COLORS.length)],
    [],
  );
  return (
    <group position={position}>
      {/* Body */}
      <mesh castShadow position={[0, 0.18, 0]}>
        <sphereGeometry args={[0.18, 8, 6]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>
      {/* Head */}
      <mesh castShadow position={[0.15, 0.32, 0]}>
        <sphereGeometry args={[0.1, 8, 6]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>
      {/* Comb */}
      <mesh position={[0.15, 0.44, 0]}>
        <coneGeometry args={[0.05, 0.1, 6]} />
        <meshStandardMaterial color="red" />
      </mesh>
      {/* Beak */}
      <mesh position={[0.26, 0.32, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.03, 0.08, 4]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  );
}

/** Wooden fence pen (rectangle from thin boxes). */
function FencePen({
  position,
  width,
  depth,
}: {
  position: [number, number, number];
  width: number;
  depth: number;
}) {
  const h = 0.25;
  const t = 0.05; // fence thickness
  const halfW = width / 2;
  const halfD = depth / 2;
  return (
    <group position={position}>
      {/* Front */}
      <mesh position={[0, h / 2, halfD]}>
        <boxGeometry args={[width, h, t]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Back */}
      <mesh position={[0, h / 2, -halfD]}>
        <boxGeometry args={[width, h, t]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Left */}
      <mesh position={[-halfW, h / 2, 0]}>
        <boxGeometry args={[t, h, depth]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Right */}
      <mesh position={[halfW, h / 2, 0]}>
        <boxGeometry args={[t, h, depth]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
}

/** A single pen with animals inside it. */
function AnimalGroup({
  penPosition,
  count,
  penWidth,
  penDepth,
  useSheep,
}: {
  penPosition: [number, number, number];
  count: number;
  penWidth: number;
  penDepth: number;
  useSheep: boolean;
}) {
  // Distribute animals in a grid inside the pen
  const positions = useMemo(() => {
    const cols = Math.min(count, 3);
    const rows = Math.ceil(count / cols);
    const pts: [number, number, number][] = [];
    const spacingX = (penWidth - 0.6) / Math.max(cols - 1, 1);
    const spacingZ = (penDepth - 0.6) / Math.max(rows - 1, 1);
    for (let i = 0; i < count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = penPosition[0] - (penWidth - 0.6) / 2 + col * spacingX;
      const z = penPosition[2] - (penDepth - 0.6) / 2 + row * spacingZ;
      pts.push([x, penPosition[1], z]);
    }
    return pts;
  }, [penPosition, count, penWidth, penDepth]);

  const AnimalComp = useSheep ? Sheep : Chicken;

  return (
    <group>
      <FencePen position={penPosition} width={penWidth} depth={penDepth} />
      {positions.map((pos, i) => (
        <AnimalComp key={i} position={pos} />
      ))}
    </group>
  );
}

/** Bouncing animals celebration animation wrapper. */
function BouncingGroup({
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    if (active) {
      ref.current.position.y = Math.abs(Math.sin(Date.now() * 0.008)) * 0.3;
    } else {
      ref.current.position.y += (0 - ref.current.position.y) * Math.min(delta * 5, 1);
    }
  });
  return <group ref={ref}>{children}</group>;
}

/** Sun in the sky. */
function Sun() {
  return (
    <group position={[5, 6, -5]}>
      <mesh>
        <sphereGeometry args={[0.8, 12, 10]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>
    </group>
  );
}

/** Clickable answer bubble. */
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

  const color = correct ? '#4CAF50' : '#42A5F5';

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
// Meadow Scene (rendered inside Canvas)
// ---------------------------------------------------------------------------

function MeadowScene({
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
  const visual = problem.visual ?? { groups: problem.a, perGroup: problem.b };
  const { vGroups, vPerGroup } = clampVisual(visual.groups, visual.perGroup);
  const useSheep = useMemo(() => Math.random() > 0.5, [problem.a, problem.b]);

  // Determine pen sizing and layout
  const penWidth = Math.max(1, vPerGroup * 0.55);
  const penDepth = Math.max(0.8, Math.ceil(vPerGroup / 3) * 0.6);
  const totalWidth = vGroups * (penWidth + 0.4);
  const startX = -totalWidth / 2 + penWidth / 2;

  // Bubble positions spread across the top of the scene
  const bubblePositions: [number, number, number][] = useMemo(() => {
    const spread = 3;
    const startBX = -spread * (problem.choices.length - 1) / 2;
    return problem.choices.map((_, i) => [startBX + i * spread, 3.5, 0] as [number, number, number]);
  }, [problem.choices]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.0} castShadow />
      <Sun />

      {/* Sky background color */}
      <color attach="background" args={['#87CEEB']} />

      {/* Ground (meadow grass) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial color="#4CAF50" />
      </mesh>

      {/* Equation text */}
      <Text
        position={[0, 5, 0]}
        fontSize={0.6}
        color="#333"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {`${problem.a} \u00d7 ${problem.b} = ?`}
      </Text>

      {/* Animal pens */}
      <BouncingGroup active={showCelebration}>
        {Array.from({ length: vGroups }).map((_, gi) => (
          <AnimalGroup
            key={gi}
            penPosition={[startX + gi * (penWidth + 0.4), 0, 0]}
            count={vPerGroup}
            penWidth={penWidth}
            penDepth={penDepth}
            useSheep={useSheep}
          />
        ))}
      </BouncingGroup>

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

export default function MultiplicationMeadow(props: BasicsGameProps) {
  const { level, onComplete, onBack } = props;
  const game = useGameState(TOTAL_ROUNDS);
  const tts = useGameTTS();
  const audio = useGameAudio();

  // Generate all problems upfront for this session
  const problems = useMemo(() => generateMultiplication(level, TOTAL_ROUNDS), [level]);
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
      const visual = currentProblem.visual;
      if (visual) {
        tts.saySentence(
          `How many animals in all? ${visual.groups} groups of ${visual.perGroup}!`,
        );
      } else {
        tts.saySentence(`What is ${currentProblem.a} times ${currentProblem.b}?`);
      }
    }
  }, [game.phase, game.round]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle completion
  useEffect(() => {
    if (game.phase === 'complete') {
      audio.playLevelUp();
      tts.saySentence(
        game.accuracy >= 80
          ? 'Amazing job! You are a multiplication star!'
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

        // Move to next round after a delay
        setTimeout(() => {
          setShowCelebration(false);
          game.nextRound();
        }, FEEDBACK_DELAY_MS);
      } else {
        // Wrong - wobble that bubble
        audio.playBuzz();
        tts.sayRedirect();
        setWrongIndex(index);
        // Clear wobble after animation
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
          background: 'linear-gradient(135deg, #558B2F 0%, #33691E 100%)',
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
        camera={{ position: [0, 4, 8], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <MeadowScene
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
