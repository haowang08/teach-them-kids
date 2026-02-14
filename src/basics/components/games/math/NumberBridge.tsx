import { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import type { BasicsGameProps } from '../../../types.ts';
import type { MathProblem } from '../../../data/mathGenerators.ts';
import { generateMixed } from '../../../data/mathGenerators.ts';
import { useGameState } from '../../../hooks/useGameState.ts';
import { useGameTTS } from '../../../hooks/useGameTTS.ts';
import { useGameAudio } from '../../../hooks/useGameAudio.ts';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TOTAL_ROUNDS = 8;
const TOTAL_PLANKS = 10; // total planks on bridge, one missing per round
const PLANK_WIDTH = 0.8;
const PLANK_GAP = 0.15;
const BRIDGE_Y = 1.5;
const BRIDGE_START_X = -5;

// ---------------------------------------------------------------------------
// Sub-components (3D)
// ---------------------------------------------------------------------------

/** A single wooden plank on the bridge */
function Plank({ position, visible }: { position: [number, number, number]; visible: boolean }) {
  if (!visible) return null;
  return (
    <mesh position={position}>
      <boxGeometry args={[PLANK_WIDTH, 0.1, 1.2]} />
      <meshStandardMaterial color="#8B5E3C" />
    </mesh>
  );
}

/** The plank that animates into place when the correct answer is chosen */
function AnimatedPlank({
  targetPosition,
  active,
  onArrived,
}: {
  targetPosition: [number, number, number];
  active: boolean;
  onArrived: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const arrivedRef = useRef(false);
  const startY = targetPosition[1] - 3;

  useFrame(() => {
    if (!ref.current || !active) return;
    const target = new THREE.Vector3(...targetPosition);
    ref.current.position.lerp(target, 0.08);
    if (ref.current.position.distanceTo(target) < 0.05 && !arrivedRef.current) {
      arrivedRef.current = true;
      ref.current.position.copy(target);
      onArrived();
    }
  });

  if (!active) return null;
  return (
    <mesh ref={ref} position={[targetPosition[0], startY, targetPosition[2]]}>
      <boxGeometry args={[PLANK_WIDTH, 0.1, 1.2]} />
      <meshStandardMaterial color="#A0724A" />
    </mesh>
  );
}

/** Stick-figure character */
function Character({ posX, walking }: { posX: number; walking: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const targetX = useRef(posX);
  targetX.current = posX;

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.x += (targetX.current - ref.current.position.x) * 0.05;
    // simple bobbing while walking
    if (walking) {
      ref.current.position.y = BRIDGE_Y + 0.65 + Math.sin(Date.now() * 0.008) * 0.05;
    }
  });

  return (
    <group ref={ref} position={[posX, BRIDGE_Y + 0.65, 0]}>
      {/* Head */}
      <mesh position={[0, 0.45, 0]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial color="#FFD54F" />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.5, 8]} />
        <meshStandardMaterial color="#42A5F5" />
      </mesh>
      {/* Left leg */}
      <mesh position={[-0.06, -0.25, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3, 6]} />
        <meshStandardMaterial color="#1565C0" />
      </mesh>
      {/* Right leg */}
      <mesh position={[0.06, -0.25, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3, 6]} />
        <meshStandardMaterial color="#1565C0" />
      </mesh>
      {/* Left arm */}
      <mesh position={[-0.18, 0.15, 0]} rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.03, 0.03, 0.28, 6]} />
        <meshStandardMaterial color="#FFD54F" />
      </mesh>
      {/* Right arm */}
      <mesh position={[0.18, 0.15, 0]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.03, 0.03, 0.28, 6]} />
        <meshStandardMaterial color="#FFD54F" />
      </mesh>
    </group>
  );
}

/** An answer plank the player can tap */
function AnswerPlank({
  value,
  position,
  onTap,
  state,
}: {
  value: number;
  position: [number, number, number];
  onTap: () => void;
  state: 'idle' | 'wrong' | 'correct' | 'hidden';
}) {
  const ref = useRef<THREE.Group>(null);
  const wobbleStart = useRef(0);

  useFrame(() => {
    if (!ref.current) return;
    if (state === 'wrong' && wobbleStart.current > 0) {
      const elapsed = Date.now() - wobbleStart.current;
      if (elapsed < 500) {
        ref.current.rotation.z = Math.sin(elapsed * 0.03) * 0.2 * (1 - elapsed / 500);
      } else {
        ref.current.rotation.z = 0;
        wobbleStart.current = 0;
      }
    }
  });

  useEffect(() => {
    if (state === 'wrong') {
      wobbleStart.current = Date.now();
    }
  }, [state]);

  if (state === 'hidden' || state === 'correct') return null;

  return (
    <Float speed={2} floatIntensity={0.3} rotationIntensity={0}>
      <group
        ref={ref}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          onTap();
        }}
      >
        <mesh>
          <boxGeometry args={[1, 0.5, 0.6]} />
          <meshStandardMaterial color="#A0724A" />
        </mesh>
        <Text
          position={[0, 0, 0.31]}
          fontSize={0.3}
          color="#FFFFFF"
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

/** Tree decoration (sphere foliage + cylinder trunk) */
function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshStandardMaterial color="#2E7D32" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.6, 6]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
    </group>
  );
}

/** The equation sign displayed above the gap */
function EquationSign({ problem, position }: { problem: MathProblem; position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Sign post */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1, 6]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      {/* Sign board */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[2, 0.6, 0.08]} />
        <meshStandardMaterial color="#FFF9C4" />
      </mesh>
      <Text
        position={[0, 0.1, 0.05]}
        fontSize={0.28}
        color="#333333"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {`${problem.a} ${problem.operation} ${problem.b} = ?`}
      </Text>
    </group>
  );
}

/** Full 3D scene for one round */
function BridgeScene({
  problem,
  gapIndex,
  filledPlanks,
  answerStates,
  onChoose,
  characterX,
  isWalking,
  plankFlying,
  gapPosition,
  onPlankArrived,
}: {
  problem: MathProblem;
  gapIndex: number;
  filledPlanks: Set<number>;
  answerStates: ('idle' | 'wrong' | 'correct' | 'hidden')[];
  onChoose: (choiceIndex: number) => void;
  characterX: number;
  isWalking: boolean;
  plankFlying: boolean;
  gapPosition: [number, number, number];
  onPlankArrived: () => void;
}) {
  // Plank positions
  const planks = useMemo(() => {
    const arr: { pos: [number, number, number]; idx: number }[] = [];
    for (let i = 0; i < TOTAL_PLANKS; i++) {
      const x = BRIDGE_START_X + i * (PLANK_WIDTH + PLANK_GAP);
      arr.push({ pos: [x, BRIDGE_Y, 0], idx: i });
    }
    return arr;
  }, []);

  // Answer plank positions (below the bridge, spread out)
  const answerPositions = useMemo<[number, number, number][]>(() => {
    const startX = BRIDGE_START_X + 1;
    return problem.choices.map((_, i) => [startX + i * 1.6, BRIDGE_Y - 2.2, 0]);
  }, [problem.choices]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} />

      {/* Sky background color set via Canvas gl.setClearColor */}

      {/* River/water below */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 6]} />
        <meshStandardMaterial color="#4FC3F7" transparent opacity={0.7} />
      </mesh>

      {/* Left cliff */}
      <mesh position={[BRIDGE_START_X - 2, 0.5, 0]}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#795548" />
      </mesh>

      {/* Right cliff */}
      <mesh position={[BRIDGE_START_X + TOTAL_PLANKS * (PLANK_WIDTH + PLANK_GAP) + 0.5, 0.5, 0]}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#795548" />
      </mesh>

      {/* Bridge railings (thin boxes on sides) */}
      <mesh position={[0, BRIDGE_Y + 0.4, 0.7]}>
        <boxGeometry args={[TOTAL_PLANKS * (PLANK_WIDTH + PLANK_GAP), 0.06, 0.06]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      <mesh position={[0, BRIDGE_Y + 0.4, -0.7]}>
        <boxGeometry args={[TOTAL_PLANKS * (PLANK_WIDTH + PLANK_GAP), 0.06, 0.06]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>

      {/* Bridge planks */}
      {planks.map(({ pos, idx }) => (
        <Plank key={idx} position={pos} visible={idx !== gapIndex || filledPlanks.has(gapIndex)} />
      ))}

      {/* Animated plank flying into gap */}
      <AnimatedPlank targetPosition={gapPosition} active={plankFlying} onArrived={onPlankArrived} />

      {/* Equation sign above gap */}
      <EquationSign problem={problem} position={[gapPosition[0], BRIDGE_Y + 1.5, 0]} />

      {/* Answer planks */}
      {problem.choices.map((value, i) => (
        <AnswerPlank
          key={`${value}-${i}`}
          value={value}
          position={answerPositions[i]}
          onTap={() => onChoose(i)}
          state={answerStates[i]}
        />
      ))}

      {/* Character */}
      <Character posX={characterX} walking={isWalking} />

      {/* Trees on left */}
      <Tree position={[BRIDGE_START_X - 3.5, 1.8, -1]} />
      <Tree position={[BRIDGE_START_X - 2.5, 1.8, 1]} />

      {/* Trees on right */}
      {(() => {
        const rightCliffX = BRIDGE_START_X + TOTAL_PLANKS * (PLANK_WIDTH + PLANK_GAP) + 0.5;
        return (
          <>
            <Tree position={[rightCliffX + 1.5, 1.8, -1]} />
            <Tree position={[rightCliffX + 2.2, 1.8, 0.8]} />
          </>
        );
      })()}

      {/* Bushes (small green spheres) */}
      <mesh position={[BRIDGE_START_X - 1.5, 2.1, 0.8]}>
        <sphereGeometry args={[0.3, 6, 6]} />
        <meshStandardMaterial color="#388E3C" />
      </mesh>
    </>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function NumberBridge(props: BasicsGameProps) {
  const { level, onComplete, onBack } = props;
  const game = useGameState(TOTAL_ROUNDS);
  const tts = useGameTTS();
  const audio = useGameAudio();

  // Generate all problems up front
  const problems = useMemo(() => generateMixed(level, TOTAL_ROUNDS), [level]);

  // Tracking which answers have been attempted
  const [answerStates, setAnswerStates] = useState<('idle' | 'wrong' | 'correct' | 'hidden')[]>(
    () => new Array(4).fill('idle') as ('idle' | 'wrong' | 'correct' | 'hidden')[],
  );
  const [plankFlying, setPlankFlying] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [filledPlanks, setFilledPlanks] = useState<Set<number>>(() => new Set());
  const [characterX, setCharacterX] = useState(BRIDGE_START_X - 1.5);
  const walkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Gap index for current round
  const gapIndex = useMemo(() => {
    // Distribute gap across the bridge based on round
    return Math.min(game.round - 1, TOTAL_PLANKS - 1);
  }, [game.round]);

  const gapPosition = useMemo<[number, number, number]>(() => {
    const x = BRIDGE_START_X + gapIndex * (PLANK_WIDTH + PLANK_GAP);
    return [x, BRIDGE_Y, 0];
  }, [gapIndex]);

  const currentProblem = problems[game.round - 1];

  // Reset answer states when round changes
  useEffect(() => {
    setAnswerStates(new Array(4).fill('idle') as ('idle' | 'wrong' | 'correct' | 'hidden')[]);
    setPlankFlying(false);

    if (game.phase === 'playing' && currentProblem) {
      tts.saySentence(
        `What is ${currentProblem.a} ${currentProblem.operation === '+' ? 'plus' : 'minus'} ${currentProblem.b}?`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.round, game.phase]);

  const handlePlankArrived = useCallback(() => {
    setFilledPlanks((prev) => {
      const next = new Set(prev);
      next.add(gapIndex);
      return next;
    });
    setPlankFlying(false);

    // Walk character forward
    setIsWalking(true);
    const targetX = BRIDGE_START_X + (gapIndex + 1) * (PLANK_WIDTH + PLANK_GAP);
    setCharacterX(targetX);

    if (walkTimerRef.current) clearTimeout(walkTimerRef.current);
    walkTimerRef.current = setTimeout(() => {
      setIsWalking(false);
      game.nextRound();
    }, 1200);
  }, [gapIndex, game]);

  const handleChoose = useCallback(
    (choiceIndex: number) => {
      if (game.phase !== 'playing' || plankFlying) return;

      const chosen = currentProblem.choices[choiceIndex];
      if (chosen === currentProblem.answer) {
        // Correct!
        audio.playChime();
        tts.sayEncouragement();
        setAnswerStates((prev) => prev.map((_s, i) => (i === choiceIndex ? 'correct' : 'hidden')));
        setPlankFlying(true);
        game.submitAnswer(true);
      } else {
        // Wrong
        audio.playBuzz();
        tts.sayRedirect();
        setAnswerStates((prev) =>
          prev.map((s, i) => (i === choiceIndex ? 'wrong' : s)),
        );
      }
    },
    [game, currentProblem, plankFlying, audio, tts],
  );

  // Handle intro
  useEffect(() => {
    if (game.phase === 'intro') {
      tts.saySentence('Help the explorer cross the bridge! Solve the math problems to place the planks.');
      const timer = setTimeout(() => game.startGame(), 3000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.phase]);

  // Handle complete
  useEffect(() => {
    if (game.phase === 'complete') {
      audio.playLevelUp();
      tts.saySentence(`Amazing! You crossed the bridge! You got ${game.accuracy} percent right!`);
      const timer = setTimeout(() => onComplete(game.accuracy), 4000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.phase]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (walkTimerRef.current) clearTimeout(walkTimerRef.current);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 3, 8], fov: 50 }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => gl.setClearColor('#87CEEB')}
      >
        {game.phase === 'playing' || game.phase === 'feedback' ? (
          <BridgeScene
            problem={currentProblem}
            gapIndex={gapIndex}
            filledPlanks={filledPlanks}
            answerStates={answerStates}
            onChoose={handleChoose}
            characterX={characterX}
            isWalking={isWalking}
            plankFlying={plankFlying}
            gapPosition={gapPosition}
            onPlankArrived={handlePlankArrived}
          />
        ) : (
          <>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 8, 5]} intensity={0.8} />
          </>
        )}
      </Canvas>

      {/* HUD Overlays */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          pointerEvents: 'none',
          padding: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <button
          onClick={onBack}
          style={{
            pointerEvents: 'auto',
            background: 'rgba(0,0,0,0.4)',
            border: 'none',
            borderRadius: 10,
            padding: '8px 16px',
            color: '#FFF',
            fontSize: '1rem',
            cursor: 'pointer',
            fontFamily: "'Comic Sans MS', cursive",
          }}
        >
          Back
        </button>

        <div
          style={{
            background: 'rgba(0,0,0,0.4)',
            borderRadius: 10,
            padding: '8px 16px',
            color: '#FFF',
            fontSize: '0.9rem',
            fontFamily: "'Comic Sans MS', cursive",
          }}
        >
          {game.phase === 'playing' || game.phase === 'feedback'
            ? `Plank ${game.round} / ${TOTAL_ROUNDS}`
            : ''}
        </div>
      </div>

      {/* Intro overlay */}
      {game.phase === 'intro' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.5)',
            color: '#FFF',
            fontFamily: "'Comic Sans MS', cursive",
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>{"🌉"}</div>
          <h1 style={{ fontSize: '2rem', margin: '0 0 8px' }}>Number Bridge</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>Solve problems to cross the bridge!</p>
        </div>
      )}

      {/* Complete overlay */}
      {game.phase === 'complete' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.5)',
            color: '#FFF',
            fontFamily: "'Comic Sans MS', cursive",
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>{"🎉"}</div>
          <h1 style={{ fontSize: '2rem', margin: '0 0 8px' }}>You crossed the bridge!</h1>
          <p style={{ fontSize: '1.4rem' }}>
            {game.score} / {TOTAL_ROUNDS} correct ({game.accuracy}%)
          </p>
        </div>
      )}
    </div>
  );
}
