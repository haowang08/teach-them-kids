import { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import type { BasicsGameProps } from '../../../types.ts';
import type { MathProblem } from '../../../data/mathGenerators.ts';
import { generateAllOps } from '../../../data/mathGenerators.ts';
import { useGameState } from '../../../hooks/useGameState.ts';
import { useGameTTS } from '../../../hooks/useGameTTS.ts';
import { useGameAudio } from '../../../hooks/useGameAudio.ts';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TOTAL_ROUNDS = 8;
const MOUNTAIN_HEIGHT = 8;
const MOUNTAIN_RADIUS = 4;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Get checkpoint position spiraling up the mountain */
function getCheckpointPosition(index: number, total: number): [number, number, number] {
  const t = index / total;
  const angle = t * Math.PI * 2.5; // spiral ~2.5 turns
  const y = t * MOUNTAIN_HEIGHT * 0.85 + 0.5;
  const radiusAtHeight = MOUNTAIN_RADIUS * (1 - t * 0.7); // narrower toward top
  const x = Math.cos(angle) * radiusAtHeight;
  const z = Math.sin(angle) * radiusAtHeight;
  return [x, y, z];
}

/** Speak operation name for TTS */
function operationWord(op: string): string {
  switch (op) {
    case '+': return 'plus';
    case '-': return 'minus';
    case '\u00d7': return 'times';
    case '\u00f7': return 'divided by';
    default: return op;
  }
}

// ---------------------------------------------------------------------------
// Sub-components (3D)
// ---------------------------------------------------------------------------

/** The mountain body: a cone with a snow cap */
function Mountain() {
  return (
    <group>
      {/* Main mountain body */}
      <mesh position={[0, MOUNTAIN_HEIGHT / 2, 0]}>
        <coneGeometry args={[MOUNTAIN_RADIUS, MOUNTAIN_HEIGHT, 12]} />
        <meshStandardMaterial color="#6D4C41" />
      </mesh>
      {/* Snow cap (smaller cone on top, white) */}
      <mesh position={[0, MOUNTAIN_HEIGHT * 0.82, 0]}>
        <coneGeometry args={[MOUNTAIN_RADIUS * 0.25, MOUNTAIN_HEIGHT * 0.2, 12]} />
        <meshStandardMaterial color="#F5F5F5" />
      </mesh>
    </group>
  );
}

/** Checkpoint flag */
function CheckpointFlag({
  position,
  active,
  reached,
}: {
  position: [number, number, number];
  active: boolean;
  reached: boolean;
}) {
  const flagRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!flagRef.current || !active) return;
    // Wave the flag when active
    flagRef.current.rotation.y = Math.sin(Date.now() * 0.005) * 0.3;
  });

  const flagColor = reached ? '#4CAF50' : active ? '#F44336' : '#9E9E9E';

  return (
    <group position={position}>
      {/* Platform */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 0.15, 8]} />
        <meshStandardMaterial color="#8D6E63" />
      </mesh>
      {/* Pole */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      {/* Flag */}
      <mesh ref={flagRef} position={[0.18, 0.65, 0]}>
        <boxGeometry args={[0.35, 0.2, 0.02]} />
        <meshStandardMaterial color={flagColor} />
      </mesh>
    </group>
  );
}

/** The golden summit flag */
function SummitFlag() {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(Date.now() * 0.003) * 0.2;
  });

  return (
    <group ref={ref} position={[0, MOUNTAIN_HEIGHT + 0.3, 0]}>
      {/* Pole */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 6]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      {/* Flag */}
      <mesh position={[0.22, 0.55, 0]}>
        <boxGeometry args={[0.4, 0.25, 0.02]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  );
}

/** Climbing character (same stick figure) */
function Climber({ targetPosition }: { targetPosition: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Vector3(...targetPosition));
  target.current.set(...targetPosition);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.lerp(target.current, 0.04);
    // Face the direction of movement
    const dir = target.current.clone().sub(ref.current.position);
    if (dir.length() > 0.1) {
      const angle = Math.atan2(dir.x, dir.z);
      ref.current.rotation.y += (angle - ref.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={ref} position={targetPosition}>
      {/* Head */}
      <mesh position={[0, 0.45, 0]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial color="#FFD54F" />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.5, 8]} />
        <meshStandardMaterial color="#EF5350" />
      </mesh>
      {/* Left leg */}
      <mesh position={[-0.06, -0.25, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3, 6]} />
        <meshStandardMaterial color="#C62828" />
      </mesh>
      {/* Right leg */}
      <mesh position={[0.06, -0.25, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3, 6]} />
        <meshStandardMaterial color="#C62828" />
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

/** Cloud decoration */
function Cloud({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.4, 0.05, 0]}>
        <sphereGeometry args={[0.35, 8, 8]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.5} />
      </mesh>
      <mesh position={[-0.35, -0.05, 0]}>
        <sphereGeometry args={[0.4, 8, 8]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

/** An answer stone the player can tap */
function AnswerStone({
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
  const scaleRef = useRef(1);

  useFrame(() => {
    if (!ref.current) return;
    if (state === 'wrong') {
      // Crumble: scale down
      scaleRef.current = Math.max(0, scaleRef.current - 0.04);
      ref.current.scale.setScalar(scaleRef.current);
    }
  });

  useEffect(() => {
    scaleRef.current = 1;
    if (ref.current) ref.current.scale.setScalar(1);
  }, [state]);

  if (state === 'hidden' || state === 'correct') return null;

  return (
    <Float speed={1.5} floatIntensity={0.2} rotationIntensity={0}>
      <group
        ref={ref}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          onTap();
        }}
      >
        {/* Stone body */}
        <mesh>
          <boxGeometry args={[0.9, 0.6, 0.5]} />
          <meshStandardMaterial color="#78909C" />
        </mesh>
        <Text
          position={[0, 0, 0.26]}
          fontSize={0.28}
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

/** Rock sign showing the equation */
function RockSign({ problem, position }: { problem: MathProblem; position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Rock */}
      <mesh>
        <boxGeometry args={[1.8, 0.7, 0.3]} />
        <meshStandardMaterial color="#A1887F" />
      </mesh>
      <Text
        position={[0, 0, 0.16]}
        fontSize={0.26}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {`${problem.a} ${problem.operation} ${problem.b} = ?`}
      </Text>
    </group>
  );
}

/** Camera that follows the active checkpoint */
function FollowCamera({ target }: { target: [number, number, number] }) {
  const targetVec = useRef(new THREE.Vector3(...target));
  targetVec.current.set(...target);

  useFrame(({ camera }) => {
    // Position camera offset from the checkpoint
    const desired = targetVec.current.clone().add(new THREE.Vector3(3, 2, 6));
    camera.position.lerp(desired, 0.03);
    // Look at the checkpoint area
    const lookTarget = targetVec.current.clone().add(new THREE.Vector3(0, 0.5, 0));
    const currentLook = new THREE.Vector3();
    camera.getWorldDirection(currentLook);
    camera.lookAt(lookTarget);
  });

  return null;
}

/** Full 3D scene */
function MountainScene({
  problem,
  currentCheckpoint,
  reachedCheckpoints,
  answerStates,
  onChoose,
  characterPos,
  showSummit,
}: {
  problem: MathProblem;
  currentCheckpoint: number;
  reachedCheckpoints: Set<number>;
  answerStates: ('idle' | 'wrong' | 'correct' | 'hidden')[];
  onChoose: (choiceIndex: number) => void;
  characterPos: [number, number, number];
  showSummit: boolean;
}) {
  // Checkpoint positions
  const checkpoints = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let i = 0; i < TOTAL_ROUNDS; i++) {
      arr.push(getCheckpointPosition(i, TOTAL_ROUNDS));
    }
    return arr;
  }, []);

  const activePos = checkpoints[currentCheckpoint] ?? checkpoints[0];

  // Answer stones: positioned near the active checkpoint, spread in a row
  const answerPositions = useMemo<[number, number, number][]>(() => {
    const base = activePos;
    // Spread answers horizontally around checkpoint, offset outward
    return problem.choices.map((_, i) => {
      const angle = ((i - 1.5) / 3) * 1.2;
      const outwardRadius = MOUNTAIN_RADIUS * (1 - (currentCheckpoint / TOTAL_ROUNDS) * 0.7) + 1.5;
      const baseAngle = Math.atan2(base[2], base[0]);
      const x = Math.cos(baseAngle + angle * 0.3) * outwardRadius;
      const z = Math.sin(baseAngle + angle * 0.3) * outwardRadius;
      return [x, base[1] + 0.3, z];
    });
  }, [activePos, problem.choices, currentCheckpoint]);

  // Sign position: slightly above the checkpoint
  const signPos = useMemo<[number, number, number]>(
    () => [activePos[0] * 1.3, activePos[1] + 1.2, activePos[2] * 1.3],
    [activePos],
  );

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[8, 12, 6]} intensity={0.9} />

      {/* Camera follower */}
      <FollowCamera target={activePos} />

      {/* Ground */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#4CAF50" />
      </mesh>

      {/* Mountain */}
      <Mountain />

      {/* Summit flag */}
      <SummitFlag />

      {/* Path platforms (small stepping stones along the path) */}
      {checkpoints.map((pos, i) => {
        // Add small platform boxes between checkpoints
        const next = checkpoints[i + 1] ?? [0, MOUNTAIN_HEIGHT, 0];
        const mid: [number, number, number] = [
          (pos[0] + next[0]) / 2,
          (pos[1] + next[1]) / 2,
          (pos[2] + next[2]) / 2,
        ];
        return (
          <mesh key={`path-${i}`} position={mid}>
            <boxGeometry args={[0.2, 0.08, 0.2]} />
            <meshStandardMaterial color="#8D6E63" />
          </mesh>
        );
      })}

      {/* Checkpoint flags */}
      {checkpoints.map((pos, i) => (
        <CheckpointFlag
          key={`cp-${i}`}
          position={pos}
          active={i === currentCheckpoint}
          reached={reachedCheckpoints.has(i)}
        />
      ))}

      {/* Clouds */}
      <Cloud position={[-5, MOUNTAIN_HEIGHT * 0.5, -3]} />
      <Cloud position={[4, MOUNTAIN_HEIGHT * 0.55, 2]} />
      <Cloud position={[1, MOUNTAIN_HEIGHT * 0.7, -5]} />

      {/* Rock sign with equation */}
      {!showSummit && <RockSign problem={problem} position={signPos} />}

      {/* Answer stones */}
      {!showSummit &&
        problem.choices.map((value, i) => (
          <AnswerStone
            key={`${value}-${i}`}
            value={value}
            position={answerPositions[i]}
            onTap={() => onChoose(i)}
            state={answerStates[i]}
          />
        ))}

      {/* Climber character */}
      <Climber targetPosition={characterPos} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function MathMountain(props: BasicsGameProps) {
  const { level, onComplete, onBack } = props;
  const game = useGameState(TOTAL_ROUNDS);
  const tts = useGameTTS();
  const audio = useGameAudio();

  // Generate problems for all rounds
  const problems = useMemo(() => generateAllOps(level, TOTAL_ROUNDS), [level]);

  const [answerStates, setAnswerStates] = useState<('idle' | 'wrong' | 'correct' | 'hidden')[]>(
    () => new Array(4).fill('idle') as ('idle' | 'wrong' | 'correct' | 'hidden')[],
  );
  const [reachedCheckpoints, setReachedCheckpoints] = useState<Set<number>>(() => new Set());
  const [characterPos, setCharacterPos] = useState<[number, number, number]>(() =>
    getCheckpointPosition(0, TOTAL_ROUNDS),
  );
  const [showSummit, setShowSummit] = useState(false);
  const climbTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentProblem = problems[game.round - 1];
  const currentCheckpoint = game.round - 1;

  // Reset answer states on new round
  useEffect(() => {
    setAnswerStates(new Array(4).fill('idle') as ('idle' | 'wrong' | 'correct' | 'hidden')[]);

    if (game.phase === 'playing' && currentProblem) {
      tts.saySentence(
        `What is ${currentProblem.a} ${operationWord(currentProblem.operation)} ${currentProblem.b}?`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.round, game.phase]);

  const handleChoose = useCallback(
    (choiceIndex: number) => {
      if (game.phase !== 'playing') return;

      const chosen = currentProblem.choices[choiceIndex];
      if (chosen === currentProblem.answer) {
        // Correct!
        audio.playChime();
        tts.sayEncouragement();
        setAnswerStates((prev) => prev.map((_s, i) => (i === choiceIndex ? 'correct' : 'hidden')));
        game.submitAnswer(true);

        // Mark checkpoint reached and climb
        setReachedCheckpoints((prev) => {
          const next = new Set(prev);
          next.add(currentCheckpoint);
          return next;
        });

        // Move character to next checkpoint
        if (climbTimerRef.current) clearTimeout(climbTimerRef.current);
        climbTimerRef.current = setTimeout(() => {
          if (currentCheckpoint + 1 < TOTAL_ROUNDS) {
            setCharacterPos(getCheckpointPosition(currentCheckpoint + 1, TOTAL_ROUNDS));
          } else {
            // Summit!
            setCharacterPos([0, MOUNTAIN_HEIGHT + 0.5, 0]);
            setShowSummit(true);
          }
          game.nextRound();
        }, 1200);
      } else {
        // Wrong: crumble the stone
        audio.playBuzz();
        tts.sayRedirect();
        setAnswerStates((prev) =>
          prev.map((s, i) => (i === choiceIndex ? 'wrong' : s)),
        );
        // After crumble animation, reset to idle so it reappears? No - it stays crumbled.
        // The child can still try other stones.
      }
    },
    [game, currentProblem, currentCheckpoint, audio, tts],
  );

  // Handle intro
  useEffect(() => {
    if (game.phase === 'intro') {
      tts.saySentence('Climb the mountain! Solve math problems at each checkpoint to reach the summit!');
      const timer = setTimeout(() => game.startGame(), 3000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.phase]);

  // Handle complete
  useEffect(() => {
    if (game.phase === 'complete') {
      audio.playLevelUp();
      tts.saySentence(`You reached the top! You got ${game.accuracy} percent correct! Amazing climb!`);
      const timer = setTimeout(() => onComplete(game.accuracy), 4000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.phase]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (climbTimerRef.current) clearTimeout(climbTimerRef.current);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Canvas
        camera={{ position: [6, 4, 10], fov: 50 }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => gl.setClearColor('#B3E5FC')}
      >
        {game.phase === 'playing' || game.phase === 'feedback' ? (
          <MountainScene
            problem={currentProblem}
            currentCheckpoint={currentCheckpoint}
            reachedCheckpoints={reachedCheckpoints}
            answerStates={answerStates}
            onChoose={handleChoose}
            characterPos={characterPos}
            showSummit={showSummit}
          />
        ) : (
          <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[8, 12, 6]} intensity={0.9} />
            <Mountain />
            <SummitFlag />
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
            ? `Checkpoint ${game.round} / ${TOTAL_ROUNDS}`
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
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>{"\u26F0\uFE0F"}</div>
          <h1 style={{ fontSize: '2rem', margin: '0 0 8px' }}>Math Mountain</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>Climb to the summit by solving problems!</p>
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
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>{"\uD83C\uDFF4"}</div>
          <h1 style={{ fontSize: '2rem', margin: '0 0 8px' }}>You reached the summit!</h1>
          <p style={{ fontSize: '1.4rem' }}>
            {game.score} / {TOTAL_ROUNDS} correct ({game.accuracy}%)
          </p>
        </div>
      )}
    </div>
  );
}
