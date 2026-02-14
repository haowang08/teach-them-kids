import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Stars } from '@react-three/drei';
import * as THREE from 'three';
import type { BasicsGameProps } from '../../../types.ts';
import type { MathProblem } from '../../../data/mathGenerators.ts';
import { generateSubtraction } from '../../../data/mathGenerators.ts';
import { useGameState } from '../../../hooks/useGameState.ts';
import { useGameTTS } from '../../../hooks/useGameTTS.ts';
import { useGameAudio } from '../../../hooks/useGameAudio.ts';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TOTAL_ROUNDS = 8;
const ALIEN_COLORS = [
  '#76FF03',
  '#FF4081',
  '#40C4FF',
  '#FFAB40',
  '#E040FB',
  '#64FFDA',
  '#FF6E40',
  '#B388FF',
  '#69F0AE',
  '#FF80AB',
  '#448AFF',
  '#FFD740',
  '#EA80FC',
  '#84FFFF',
  '#FF9E80',
  '#B9F6CA',
  '#8C9EFF',
  '#FFE57F',
  '#F48FB1',
  '#80D8FF',
];

// ---------------------------------------------------------------------------
// Alien component - colorful sphere with eyes
// ---------------------------------------------------------------------------

interface AlienProps {
  color: string;
  position: [number, number, number];
  leaving: boolean;
  planetPosition: [number, number, number];
  index: number;
}

function Alien({ color, position, leaving, planetPosition, index }: AlienProps) {
  const groupRef = useRef<THREE.Group>(null);
  const progress = useRef(0);
  const startPos = useRef(new THREE.Vector3(...position));

  // Reset start position when the alien's base position changes
  useEffect(() => {
    startPos.current.set(...position);
    progress.current = 0;
  }, [position]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (leaving) {
      progress.current = Math.min(progress.current + delta * 0.8, 1);
      const t = progress.current;
      // Float toward the planet with a curved path
      const ease = t * t * (3 - 2 * t); // smoothstep
      groupRef.current.position.x = THREE.MathUtils.lerp(
        startPos.current.x,
        planetPosition[0],
        ease,
      );
      groupRef.current.position.y =
        THREE.MathUtils.lerp(startPos.current.y, planetPosition[1], ease) +
        Math.sin(t * Math.PI) * 0.8; // arc upward
      groupRef.current.position.z = THREE.MathUtils.lerp(
        startPos.current.z,
        planetPosition[2],
        ease,
      );
      // Shrink as they reach the planet
      const scale = 1 - ease * 0.7;
      groupRef.current.scale.setScalar(scale);
    } else {
      // Gentle idle bobbing on the ship
      const t = state.clock.elapsedTime;
      groupRef.current.position.y =
        position[1] + Math.sin(t * 1.5 + index * 0.9) * 0.05;
      groupRef.current.scale.setScalar(1);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Body */}
      <mesh>
        <sphereGeometry args={[0.18, 10, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Left eye */}
      <mesh position={[-0.07, 0.06, 0.14]}>
        <sphereGeometry args={[0.055, 6, 6]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[-0.07, 0.06, 0.18]}>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      {/* Right eye */}
      <mesh position={[0.07, 0.06, 0.14]}>
        <sphereGeometry args={[0.055, 6, 6]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.07, 0.06, 0.18]}>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Spaceship - cone nose + cylinder body
// ---------------------------------------------------------------------------

interface SpaceshipProps {
  celebrating: boolean;
}

function Spaceship({ celebrating }: SpaceshipProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;

    // Gentle hover
    ref.current.position.y = Math.sin(t * 0.5) * 0.1;

    // Celebration spin
    if (celebrating) {
      ref.current.rotation.y += 0.06;
    } else {
      // Slowly rotate back to front
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        0,
        0.03,
      );
    }
  });

  return (
    <group ref={ref} position={[-1.2, 0, 0]}>
      {/* Body - cylinder */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.5, 1.8, 12]} />
        <meshStandardMaterial color="#B0BEC5" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Nose - cone */}
      <mesh position={[1.1, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.4, 0.6, 12]} />
        <meshStandardMaterial color="#78909C" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Engine glow */}
      <mesh position={[-1.1, 0, 0]}>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshStandardMaterial
          color="#FF6D00"
          emissive="#FF6D00"
          emissiveIntensity={1.5}
        />
      </mesh>
      {/* Window */}
      <mesh position={[0.4, 0.35, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshPhysicalMaterial
          color="#81D4FA"
          transparent
          opacity={0.7}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Planet
// ---------------------------------------------------------------------------

function Planet({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <mesh ref={ref} position={[3.5, 0.5, -1]}>
      <sphereGeometry args={[1.2, 16, 12]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// StarBurst - particles on correct answer
// ---------------------------------------------------------------------------

function StarBurst({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const particles = useMemo(() => {
    const pts: { pos: [number, number, number]; vel: [number, number, number] }[] = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      pts.push({
        pos: [0, 0, 0],
        vel: [Math.cos(angle) * 2, Math.sin(angle) * 2, (Math.random() - 0.5) * 2],
      });
    }
    return pts;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      if (active) {
        const mesh = child as THREE.Mesh;
        mesh.position.x += particles[i].vel[0] * delta;
        mesh.position.y += particles[i].vel[1] * delta;
        mesh.position.z += particles[i].vel[2] * delta;
        mesh.scale.multiplyScalar(0.97);
      }
    });
  });

  if (!active) return null;

  return (
    <group ref={groupRef} position={[-1.2, 0, 0]}>
      {particles.map((_, i) => (
        <mesh key={i} position={[0, 0, 0]}>
          <sphereGeometry args={[0.06, 4, 4]} />
          <meshStandardMaterial
            color="#FFEB3B"
            emissive="#FFEB3B"
            emissiveIntensity={2}
          />
        </mesh>
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// AnswerBubble (space version - glowing)
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
    if (state === 'correct') {
      groupRef.current.scale.lerp(new THREE.Vector3(0, 0, 0), 0.12);
    }
  });

  return (
    <Float speed={1.5} floatIntensity={0.25}>
      <group ref={groupRef} position={position} onClick={onTap}>
        <mesh>
          <sphereGeometry args={[0.5, 16, 12]} />
          <meshStandardMaterial
            color="#7C4DFF"
            emissive="#7C4DFF"
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
        <Text
          fontSize={0.35}
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

// ---------------------------------------------------------------------------
// EquationDisplay
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
      position={[0, 2.5, 0]}
      fontSize={0.4}
      color="#FFFFFF"
      anchorX="center"
      anchorY="middle"
      fontWeight="bold"
      outlineWidth={0.02}
      outlineColor="#000000"
    >
      {`${a} - ${b} = ${showAnswer ? answer : '?'}`}
    </Text>
  );
}

// ---------------------------------------------------------------------------
// Scene
// ---------------------------------------------------------------------------

interface SceneProps {
  problem: MathProblem;
  alienStates: { leaving: boolean }[];
  celebrating: boolean;
  starBurst: boolean;
  showAnswer: boolean;
  bubbleStates: Record<number, 'idle' | 'correct' | 'wrong'>;
  onBubbleTap: (value: number) => void;
  planetColor: string;
}

function Scene({
  problem,
  alienStates,
  celebrating,
  starBurst,
  showAnswer,
  bubbleStates,
  onBubbleTap,
  planetColor,
}: SceneProps) {
  const planetPosition: [number, number, number] = [3.5, 0.5, -1];

  // Alien positions on the ship
  const alienPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < problem.a; i++) {
      const row = Math.floor(i / 5);
      const col = i % 5;
      positions.push([-1.6 + col * 0.4, 0.55 + row * 0.4, 0.3]);
    }
    return positions;
  }, [problem.a]);

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
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 4]} intensity={0.7} />
      <pointLight position={[-1.2, 0, 2]} intensity={0.5} color="#FF6D00" />

      {/* Space background */}
      <color attach="background" args={['#0A0A2E']} />
      <Stars radius={80} depth={50} count={800} factor={3} fade speed={0.5} />

      {/* Spaceship */}
      <Spaceship celebrating={celebrating} />

      {/* Planet */}
      <Planet color={planetColor} />

      {/* Aliens */}
      {alienPositions.map((pos, i) => (
        <Alien
          key={`alien-${i}`}
          color={ALIEN_COLORS[i % ALIEN_COLORS.length]}
          position={pos}
          leaving={alienStates[i]?.leaving ?? false}
          planetPosition={planetPosition}
          index={i}
        />
      ))}

      {/* Star burst effect */}
      <StarBurst active={starBurst} />

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

const PLANET_COLORS = ['#E57373', '#81C784', '#64B5F6', '#FFB74D', '#BA68C8', '#4DD0E1', '#FF8A65', '#AED581'];

export default function SubtractionSpaceship(props: BasicsGameProps) {
  const { level, onComplete, onBack } = props;
  const { phase, round, score, accuracy, totalRounds, startGame, submitAnswer, nextRound } =
    useGameState(TOTAL_ROUNDS);
  const tts = useGameTTS();
  const audio = useGameAudio();

  // Generate all problems for this session
  const problems = useMemo(
    () => generateSubtraction(level, TOTAL_ROUNDS),
    [level],
  );

  const currentProblem = problems[round - 1] ?? problems[0];
  const planetColor = PLANET_COLORS[(round - 1) % PLANET_COLORS.length];

  // Per-round state
  const [alienStates, setAlienStates] = useState<{ leaving: boolean }[]>([]);
  const [celebrating, setCelebrating] = useState(false);
  const [starBurst, setStarBurst] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [bubbleStates, setBubbleStates] = useState<Record<number, 'idle' | 'correct' | 'wrong'>>({});
  const [answered, setAnswered] = useState(false);
  const [aliensLeft, setAliensLeft] = useState(false);

  // Reset per-round state when round changes
  useEffect(() => {
    if (phase === 'playing') {
      const initialAliens = Array.from({ length: currentProblem.a }, () => ({
        leaving: false,
      }));
      setAlienStates(initialAliens);
      setCelebrating(false);
      setStarBurst(false);
      setShowAnswer(false);
      setBubbleStates({});
      setAnswered(false);
      setAliensLeft(false);

      // Narrate and then animate aliens leaving
      const speakTimer = setTimeout(() => {
        tts.saySentence(
          `${currentProblem.a} aliens are on the ship. ${currentProblem.b} aliens leave at this planet.`,
        );
      }, 300);

      // Animate aliens leaving after a delay
      const leaveTimer = setTimeout(() => {
        setAliensLeft(true);
        setAlienStates((prev) => {
          const next = [...prev];
          // The last B aliens leave
          for (let i = currentProblem.a - 1; i >= currentProblem.a - currentProblem.b; i--) {
            if (next[i]) {
              next[i] = { leaving: true };
            }
          }
          return next;
        });
      }, 1500);

      return () => {
        clearTimeout(speakTimer);
        clearTimeout(leaveTimer);
      };
    }
  }, [phase, round]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-start on mount
  useEffect(() => {
    if (phase === 'intro') {
      startGame();
    }
  }, [phase, startGame]);

  // Completion
  useEffect(() => {
    if (phase === 'complete') {
      tts.saySentence(
        accuracy >= 80
          ? 'Great space adventure! You are a subtraction star!'
          : 'Good try, space cadet! Keep practicing!',
      );
      audio.playLevelUp();
    }
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBubbleTap = useCallback(
    (value: number) => {
      if (phase !== 'playing' || answered || !aliensLeft) return;

      if (value === currentProblem.answer) {
        // Correct!
        setBubbleStates((prev) => ({ ...prev, [value]: 'correct' }));
        setShowAnswer(true);
        setCelebrating(true);
        setStarBurst(true);
        setAnswered(true);
        audio.playChime();
        tts.sayEncouragement();
        submitAnswer(true);

        // Move to next round after celebration
        setTimeout(() => {
          setCelebrating(false);
          setStarBurst(false);
          nextRound();
        }, 2200);
      } else {
        // Wrong
        setBubbleStates((prev) => ({ ...prev, [value]: 'wrong' }));
        audio.playBuzz();
        tts.sayRedirect();

        // Reset wrong state after wobble
        setTimeout(() => {
          setBubbleStates((prev) => {
            const next = { ...prev };
            delete next[value];
            return next;
          });
        }, 800);
      }
    },
    [phase, answered, aliensLeft, currentProblem.answer, audio, tts, submitAnswer, nextRound],
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
          background: 'linear-gradient(135deg, #0A0A2E 0%, #283593 100%)',
          fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
          color: '#FFFFFF',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: 12 }}>
          {stars >= 3 ? '\u{1F680}' : stars >= 2 ? '\u{2B50}' : '\u{1F47E}'}
        </div>
        <h2 style={{ fontSize: '1.8rem', margin: '0 0 8px' }}>Mission Complete!</h2>
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
            style={{ ...hudBtnStyle, background: '#283593' }}
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
          alienStates={alienStates}
          celebrating={celebrating}
          starBurst={starBurst}
          showAnswer={showAnswer}
          bubbleStates={bubbleStates}
          onBubbleTap={handleBubbleTap}
          planetColor={planetColor}
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
          Planet {round}/{totalRounds} &middot; Score {score}
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
