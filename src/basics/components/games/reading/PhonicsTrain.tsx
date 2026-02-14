import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';
import type { BasicsGameProps } from '../../../types.ts';
import { useGameState } from '../../../hooks/useGameState.ts';
import { useGameTTS } from '../../../hooks/useGameTTS.ts';
import { useGameAudio } from '../../../hooks/useGameAudio.ts';
import {
  CVC_WORDS,
  CCVC_WORDS,
  CVCC_WORDS,
  SIGHT_WORDS,
} from '../../../data/readingContent.ts';

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

function pickN<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

const CAR_COLORS = [
  '#4FC3F7', '#81C784', '#FFB74D', '#BA68C8',
  '#4DD0E1', '#FF8A65', '#AED581', '#F06292',
  '#FFD54F', '#7986CB',
];

interface WordEntry {
  word: string;
  image: string;
}

function getWordsForLevel(level: number): WordEntry[] {
  switch (level) {
    case 0: return pickN(CVC_WORDS, 8);
    case 1: return pickN(CCVC_WORDS, 8);
    case 2: return pickN(CVCC_WORDS, 8);
    case 3: {
      // Sight words don't have images, make WordEntry with a generic emoji
      const allSight = SIGHT_WORDS.flat();
      const picked = pickN(allSight, 8);
      return picked.map((w) => ({ word: w, image: '\u2B50' }));
    }
    default: return pickN(CVC_WORDS, 8);
  }
}

// ---------------------------------------------------------------------------
// 3D sub-components
// ---------------------------------------------------------------------------

/** Two rails + cross-ties */
function RailroadTrack() {
  const ties: React.JSX.Element[] = [];
  for (let i = -8; i <= 8; i++) {
    ties.push(
      <mesh key={i} position={[i * 0.8, 0.01, 0]}>
        <boxGeometry args={[0.1, 0.02, 0.7]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>,
    );
  }
  return (
    <group position={[0, 0, 0]}>
      {/* Left rail */}
      <mesh position={[0, 0.03, -0.25]}>
        <boxGeometry args={[14, 0.04, 0.06]} />
        <meshStandardMaterial color="#37474F" />
      </mesh>
      {/* Right rail */}
      <mesh position={[0, 0.03, 0.25]}>
        <boxGeometry args={[14, 0.04, 0.06]} />
        <meshStandardMaterial color="#37474F" />
      </mesh>
      {ties}
    </group>
  );
}

/** Simple ground plane */
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
      <planeGeometry args={[30, 20]} />
      <meshStandardMaterial color="#66BB6A" />
    </mesh>
  );
}

/** Train engine */
function Engine({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Body */}
      <RoundedBox args={[1.2, 0.8, 0.6]} radius={0.05} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#D32F2F" />
      </RoundedBox>
      {/* Chimney */}
      <mesh position={[0.35, 1.1, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 0.4, 12]} />
        <meshStandardMaterial color="#424242" />
      </mesh>
      {/* Cabin roof */}
      <mesh position={[-0.3, 1.0, 0]}>
        <boxGeometry args={[0.5, 0.08, 0.65]} />
        <meshStandardMaterial color="#B71C1C" />
      </mesh>
      {/* Wheels */}
      {([-0.35, 0.35] as const).map((x) =>
        ([0.35, -0.35] as const).map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.15, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
            <meshStandardMaterial color="#212121" />
          </mesh>
        )),
      )}
      {/* Front bumper */}
      <mesh position={[0.7, 0.25, 0]}>
        <boxGeometry args={[0.15, 0.3, 0.5]} />
        <meshStandardMaterial color="#F44336" />
      </mesh>
    </group>
  );
}

/** Station sign with emoji and word hint */
function Station({
  image,
  word,
  position,
}: {
  image: string;
  word: string;
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      {/* Platform */}
      <mesh position={[0, 0.1, -1.2]}>
        <boxGeometry args={[2.5, 0.2, 1.0]} />
        <meshStandardMaterial color="#8D6E63" />
      </mesh>
      {/* Sign post */}
      <mesh position={[0, 0.9, -1.5]}>
        <boxGeometry args={[0.08, 1.4, 0.08]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      {/* Sign board */}
      <RoundedBox args={[1.8, 0.9, 0.08]} radius={0.04} position={[0, 1.5, -1.5]}>
        <meshStandardMaterial color="#FFF9C4" />
      </RoundedBox>
      {/* Image/emoji text */}
      <Text
        position={[0, 1.7, -1.44]}
        fontSize={0.35}
        anchorX="center"
        anchorY="middle"
        color="#000000"
      >
        {image}
      </Text>
      {/* Word hint (dashes) */}
      <Text
        position={[0, 1.3, -1.44]}
        fontSize={0.2}
        anchorX="center"
        anchorY="middle"
        color="#795548"
      >
        {word.split('').map(() => '_').join(' ')}
      </Text>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Animated letter car (the one that moves when tapped correctly)
// ---------------------------------------------------------------------------

interface AttachingCarProps {
  letter: string;
  color: string;
  startPos: THREE.Vector3;
  endPos: THREE.Vector3;
  onArrived: () => void;
}

function AttachingCar({ letter, color, startPos, endPos, onArrived }: AttachingCarProps) {
  const groupRef = useRef<THREE.Group>(null);
  const progressRef = useRef(0);
  const arrivedRef = useRef(false);

  useFrame((_, delta) => {
    if (!groupRef.current || arrivedRef.current) return;
    progressRef.current = Math.min(progressRef.current + delta * 2.0, 1);
    const t = progressRef.current;
    // Ease-out
    const ease = 1 - Math.pow(1 - t, 3);
    groupRef.current.position.lerpVectors(startPos, endPos, ease);
    if (t >= 1 && !arrivedRef.current) {
      arrivedRef.current = true;
      onArrived();
    }
  });

  return (
    <group ref={groupRef} position={startPos.toArray()}>
      <RoundedBox args={[0.8, 0.6, 0.5]} radius={0.04} position={[0, 0.4, 0]}>
        <meshStandardMaterial color={color} />
      </RoundedBox>
      {/* Letter on front face */}
      <Text
        position={[0, 0.4, 0.26]}
        fontSize={0.35}
        anchorX="center"
        anchorY="middle"
        color="#FFFFFF"
        fontWeight="bold"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {letter.toUpperCase()}
      </Text>
      {/* Wheels */}
      {([-0.25, 0.25] as const).map((x) =>
        ([0.28, -0.28] as const).map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.1, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.06, 12]} />
            <meshStandardMaterial color="#212121" />
          </mesh>
        )),
      )}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Wobbling wrong car
// ---------------------------------------------------------------------------

interface WobblingCarProps {
  letter: string;
  color: string;
  position: [number, number, number];
  onDone: () => void;
}

function WobblingCar({ letter, color, position, onDone }: WobblingCarProps) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const doneRef = useRef(false);

  useFrame((_, delta) => {
    if (!groupRef.current || doneRef.current) return;
    timeRef.current += delta;
    // Wobble for 0.6s
    groupRef.current.rotation.z = Math.sin(timeRef.current * 25) * 0.15 * Math.max(0, 1 - timeRef.current / 0.6);
    if (timeRef.current > 0.6 && !doneRef.current) {
      doneRef.current = true;
      groupRef.current.rotation.z = 0;
      onDone();
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <RoundedBox args={[0.8, 0.6, 0.5]} radius={0.04} position={[0, 0.4, 0]}>
        <meshStandardMaterial color={color} />
      </RoundedBox>
      <Text
        position={[0, 0.4, 0.26]}
        fontSize={0.35}
        anchorX="center"
        anchorY="middle"
        color="#FFFFFF"
        fontWeight="bold"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {letter.toUpperCase()}
      </Text>
      {/* Wheels */}
      {([-0.25, 0.25] as const).map((x) =>
        ([0.28, -0.28] as const).map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.1, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.06, 12]} />
            <meshStandardMaterial color="#212121" />
          </mesh>
        )),
      )}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Clickable scattered letter car
// ---------------------------------------------------------------------------

interface LetterCarProps {
  letter: string;
  color: string;
  position: [number, number, number];
  onClick: () => void;
  disabled: boolean;
}

function LetterCar({ letter, color, position, onClick, disabled }: LetterCarProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Float speed={2} floatIntensity={0.3} rotationIntensity={0.1}>
      <group
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) onClick();
        }}
        onPointerOver={() => { if (!disabled) setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        <RoundedBox
          args={[0.8, 0.6, 0.5]}
          radius={0.04}
          position={[0, 0.4, 0]}
          scale={hovered && !disabled ? 1.1 : 1}
        >
          <meshStandardMaterial color={hovered && !disabled ? '#FFFFFF' : color} />
        </RoundedBox>
        {/* Letter */}
        <Text
          position={[0, 0.4, 0.26]}
          fontSize={0.35}
          anchorX="center"
          anchorY="middle"
          color={hovered && !disabled ? '#000000' : '#FFFFFF'}
          fontWeight="bold"
          outlineWidth={0.02}
          outlineColor={hovered && !disabled ? '#FFFFFF' : '#000000'}
        >
          {letter.toUpperCase()}
        </Text>
        {/* Wheels */}
        {([-0.25, 0.25] as const).map((x) =>
          ([0.28, -0.28] as const).map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0.1, z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 0.06, 12]} />
              <meshStandardMaterial color="#212121" />
            </mesh>
          )),
        )}
      </group>
    </Float>
  );
}

// ---------------------------------------------------------------------------
// Scene (3D contents inside Canvas)
// ---------------------------------------------------------------------------

interface SceneProps {
  targetWord: WordEntry;
  onLetterCorrect: (index: number) => void;
  onLetterWrong: () => void;
  currentLetterIndex: number;
  completedLetters: number[];
  roundKey: number;
  disabled: boolean;
}

function Scene({
  targetWord,
  onLetterCorrect,
  onLetterWrong,
  currentLetterIndex,
  completedLetters,
  roundKey,
  disabled,
}: SceneProps) {
  const word = targetWord.word;
  const letters = word.split('');

  // Generate scattered positions for each letter (randomised but stable per round)
  const scatteredPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const usedX = new Set<number>();
    for (let i = 0; i < letters.length; i++) {
      let x: number;
      do {
        x = Math.round((Math.random() * 4 - 2) * 10) / 10;
      } while (usedX.has(Math.round(x)));
      usedX.add(Math.round(x));
      const z = 1.5 + Math.random() * 1.5;
      positions.push([x, 0, z]);
    }
    return positions;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundKey, word]);

  // Shuffled indices (so letters appear in random order)
  const shuffledIndices = useMemo(() => {
    return shuffle(letters.map((_, i) => i));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundKey, word]);

  // Engine position (left side of track)
  const engineX = -4;
  // Each attached car sits to the right of the engine
  const getTrainCarX = (idx: number) => engineX + 1.4 + idx * 0.9;

  // State for animating cars
  const [animating, setAnimating] = useState<{
    letterIndex: number;
    startPos: THREE.Vector3;
    endPos: THREE.Vector3;
  } | null>(null);

  const [wobbling, setWobbling] = useState<{
    shuffledIdx: number;
  } | null>(null);

  const handleLetterClick = useCallback(
    (letterIndex: number, shuffledIdx: number) => {
      if (disabled || animating !== null || wobbling !== null) return;
      if (completedLetters.includes(letterIndex)) return;

      if (letterIndex === currentLetterIndex) {
        // Correct!
        const startPos = new THREE.Vector3(...scatteredPositions[shuffledIdx]);
        const endPos = new THREE.Vector3(getTrainCarX(currentLetterIndex), 0, 0);
        setAnimating({ letterIndex, startPos, endPos });
      } else {
        // Wrong
        setWobbling({ shuffledIdx });
        onLetterWrong();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled, animating, wobbling, currentLetterIndex, completedLetters, scatteredPositions],
  );

  const handleArrived = useCallback(() => {
    if (animating) {
      onLetterCorrect(animating.letterIndex);
    }
    setAnimating(null);
  }, [animating, onLetterCorrect]);

  const handleWobbleDone = useCallback(() => {
    setWobbling(null);
  }, []);

  // Reset animation state on round change
  useEffect(() => {
    setAnimating(null);
    setWobbling(null);
  }, [roundKey]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 3]} intensity={0.8} />

      {/* Sky color */}
      <color attach="background" args={['#87CEEB']} />

      <Ground />
      <RailroadTrack />
      <Engine position={[engineX, 0, 0]} />
      <Station image={targetWord.image} word={word} position={[engineX, 0, 0]} />

      {/* Already-attached cars (completed letters) */}
      {completedLetters.map((idx) => (
        <group key={`attached-${idx}`} position={[getTrainCarX(idx), 0, 0]}>
          <RoundedBox args={[0.8, 0.6, 0.5]} radius={0.04} position={[0, 0.4, 0]}>
            <meshStandardMaterial color={CAR_COLORS[idx % CAR_COLORS.length]} />
          </RoundedBox>
          <Text
            position={[0, 0.4, 0.26]}
            fontSize={0.35}
            anchorX="center"
            anchorY="middle"
            color="#FFFFFF"
            fontWeight="bold"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            {letters[idx].toUpperCase()}
          </Text>
          {([-0.25, 0.25] as const).map((x) =>
            ([0.28, -0.28] as const).map((z) => (
              <mesh key={`${x}-${z}`} position={[x, 0.1, z]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.06, 12]} />
                <meshStandardMaterial color="#212121" />
              </mesh>
            )),
          )}
        </group>
      ))}

      {/* Animating car (one that's rolling to the train) */}
      {animating !== null && (
        <AttachingCar
          letter={letters[animating.letterIndex]}
          color={CAR_COLORS[animating.letterIndex % CAR_COLORS.length]}
          startPos={animating.startPos}
          endPos={animating.endPos}
          onArrived={handleArrived}
        />
      )}

      {/* Scattered letter cars */}
      {shuffledIndices.map((letterIdx, sIdx) => {
        // Hide if completed or currently animating
        if (completedLetters.includes(letterIdx)) return null;
        if (animating?.letterIndex === letterIdx) return null;

        // If this is the wobbling car, show wobble version
        if (wobbling?.shuffledIdx === sIdx) {
          return (
            <WobblingCar
              key={`wobble-${sIdx}-${roundKey}`}
              letter={letters[letterIdx]}
              color={CAR_COLORS[letterIdx % CAR_COLORS.length]}
              position={scatteredPositions[sIdx]}
              onDone={handleWobbleDone}
            />
          );
        }

        return (
          <LetterCar
            key={`car-${sIdx}-${roundKey}`}
            letter={letters[letterIdx]}
            color={CAR_COLORS[letterIdx % CAR_COLORS.length]}
            position={scatteredPositions[sIdx]}
            onClick={() => handleLetterClick(letterIdx, sIdx)}
            disabled={disabled || animating !== null || wobbling !== null}
          />
        );
      })}
    </>
  );
}

// ---------------------------------------------------------------------------
// Main game component
// ---------------------------------------------------------------------------

const TOTAL_ROUNDS = 8;

export default function PhonicsTrain(props: BasicsGameProps) {
  const { level, onComplete, onBack } = props;
  const { phase, round, score, accuracy, totalRounds, startGame, submitAnswer, nextRound } =
    useGameState(TOTAL_ROUNDS);
  const tts = useGameTTS();
  const audio = useGameAudio();

  // Generate all words for this session up front
  const words = useMemo(() => getWordsForLevel(level), [level]);

  // Current word
  const currentWord = words[(round - 1) % words.length];

  // Track which letter index we expect next (0-indexed within the word)
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [completedLetters, setCompletedLetters] = useState<number[]>([]);
  const [roundKey, setRoundKey] = useState(0);
  const [wrongThisRound, setWrongThisRound] = useState(false);

  // Speak the word when a new round starts
  useEffect(() => {
    if (phase === 'playing' && currentWord) {
      const timer = setTimeout(() => {
        tts.saySentence(`Spell the word: ${currentWord.word}`);
      }, 500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, round]);

  // Handle correct letter selection
  const handleLetterCorrect = useCallback(
    (letterIndex: number) => {
      audio.playPop();
      const newCompleted = [...completedLetters, letterIndex];
      setCompletedLetters(newCompleted);
      const nextIdx = currentLetterIndex + 1;
      setCurrentLetterIndex(nextIdx);

      // Check if word is complete
      if (nextIdx >= currentWord.word.length) {
        // Word complete!
        audio.playChime();
        tts.sayEncouragement();
        submitAnswer(!wrongThisRound);

        // Move to next round after a short delay
        setTimeout(() => {
          nextRound();
          setCurrentLetterIndex(0);
          setCompletedLetters([]);
          setRoundKey((k) => k + 1);
          setWrongThisRound(false);
        }, 1500);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [completedLetters, currentLetterIndex, currentWord, wrongThisRound],
  );

  // Handle wrong letter
  const handleLetterWrong = useCallback(() => {
    audio.playBuzz();
    tts.sayRedirect();
    setWrongThisRound(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When game completes
  useEffect(() => {
    if (phase === 'complete') {
      audio.playLevelUp();
      const timer = setTimeout(() => {
        onComplete(accuracy);
      }, 2000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Reset state when round changes (for next round after state machine update)
  useEffect(() => {
    if (phase === 'playing') {
      setCurrentLetterIndex(0);
      setCompletedLetters([]);
      setWrongThisRound(false);
    }
  }, [phase, round]);

  // ── Intro screen ──
  if (phase === 'intro') {
    return (
      <div style={overlayStyle}>
        <div style={cardStyle}>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>{'\uD83D\uDE82'}</div>
          <h1 style={titleStyle}>Phonics Train</h1>
          <p style={subtitleStyle}>Tap the letters in order to spell each word!</p>
          <button
            onClick={() => {
              audio.playClick();
              startGame();
              setRoundKey((k) => k + 1);
            }}
            style={startBtnStyle}
          >
            All Aboard!
          </button>
          <button onClick={onBack} style={backBtnStyle}>
            {'\u2190'} Back
          </button>
        </div>
      </div>
    );
  }

  // ── Complete screen ──
  if (phase === 'complete') {
    const stars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : accuracy >= 50 ? 1 : 0;
    return (
      <div style={overlayStyle}>
        <div style={cardStyle}>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>{'\uD83C\uDF89'}</div>
          <h1 style={titleStyle}>All Done!</h1>
          <p style={subtitleStyle}>
            You got {score} out of {totalRounds} right!
          </p>
          <div style={{ fontSize: '2rem', margin: '12px 0' }}>
            {Array.from({ length: 3 }, (_, i) => (
              <span key={i} style={{ opacity: i < stars ? 1 : 0.2 }}>{'\u2B50'}</span>
            ))}
          </div>
          <button onClick={onBack} style={startBtnStyle}>
            Continue
          </button>
        </div>
      </div>
    );
  }

  // ── Playing / Feedback ──
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 4, 7], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene
          targetWord={currentWord}
          onLetterCorrect={handleLetterCorrect}
          onLetterWrong={handleLetterWrong}
          currentLetterIndex={currentLetterIndex}
          completedLetters={completedLetters}
          roundKey={roundKey}
          disabled={phase === 'feedback'}
        />
      </Canvas>

      {/* HUD */}
      <div style={hudStyle}>
        <button onClick={onBack} style={hudBackBtn}>
          {'\u2190'}
        </button>
        <span style={hudTextStyle}>
          Round {round}/{totalRounds}
        </span>
        <span style={hudTextStyle}>
          {'\u2B50'} {score}
        </span>
      </div>

      {/* Word prompt */}
      <div style={wordPromptStyle}>
        <span style={{ fontSize: '1.8rem', marginRight: 8 }}>{currentWord.image}</span>
        <span style={{ fontSize: '1.4rem', fontWeight: 'bold', letterSpacing: 4 }}>
          {currentWord.word.split('').map((ch, i) => (
            <span
              key={i}
              style={{
                color: completedLetters.includes(i) ? '#4CAF50' : 'rgba(255,255,255,0.4)',
              }}
            >
              {completedLetters.includes(i) ? ch.toUpperCase() : '_'}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const overlayStyle: React.CSSProperties = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #0D1B2A 0%, #1B2838 50%, #0D1B2A 100%)',
};

const cardStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '40px 32px',
  borderRadius: 24,
  background: 'rgba(255,255,255,0.08)',
  backdropFilter: 'blur(12px)',
  maxWidth: 400,
  width: '90%',
};

const titleStyle: React.CSSProperties = {
  fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
  fontSize: '2rem',
  color: '#FFFFFF',
  margin: '0 0 8px',
};

const subtitleStyle: React.CSSProperties = {
  fontFamily: "'Comic Sans MS', cursive",
  fontSize: '1rem',
  color: 'rgba(255,255,255,0.7)',
  margin: '0 0 24px',
};

const startBtnStyle: React.CSSProperties = {
  fontFamily: "'Comic Sans MS', cursive",
  fontSize: '1.2rem',
  padding: '14px 40px',
  borderRadius: 16,
  border: 'none',
  background: '#C62828',
  color: '#FFFFFF',
  cursor: 'pointer',
  fontWeight: 'bold',
  marginBottom: 12,
  display: 'block',
  width: '100%',
};

const backBtnStyle: React.CSSProperties = {
  fontFamily: "'Comic Sans MS', cursive",
  fontSize: '0.9rem',
  padding: '8px 20px',
  borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.2)',
  background: 'rgba(255,255,255,0.1)',
  color: 'rgba(255,255,255,0.7)',
  cursor: 'pointer',
  display: 'block',
  width: '100%',
};

const hudStyle: React.CSSProperties = {
  position: 'absolute',
  top: 12,
  left: 12,
  right: 12,
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  pointerEvents: 'auto',
};

const hudBackBtn: React.CSSProperties = {
  fontFamily: "'Comic Sans MS', cursive",
  fontSize: '1.2rem',
  width: 40,
  height: 40,
  borderRadius: 12,
  border: 'none',
  background: 'rgba(0,0,0,0.4)',
  color: '#FFFFFF',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const hudTextStyle: React.CSSProperties = {
  fontFamily: "'Comic Sans MS', cursive",
  fontSize: '1rem',
  color: '#FFFFFF',
  background: 'rgba(0,0,0,0.4)',
  padding: '6px 14px',
  borderRadius: 10,
};

const wordPromptStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: 24,
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'center',
  background: 'rgba(0,0,0,0.6)',
  padding: '12px 24px',
  borderRadius: 16,
  fontFamily: "'Comic Sans MS', cursive",
  color: '#FFFFFF',
};
