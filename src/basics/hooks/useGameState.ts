import { useState, useCallback, useMemo, useRef } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type GamePhase = 'intro' | 'playing' | 'feedback' | 'complete';

export interface UseGameStateReturn {
  /** Current phase of the game lifecycle. */
  phase: GamePhase;
  /** Current round (1-indexed). */
  round: number;
  /** Number of correct answers so far. */
  score: number;
  /** Accuracy percentage (0-100). 0 when no rounds played yet. */
  accuracy: number;
  /** Total rounds in this game session. */
  totalRounds: number;
  /** Transition from 'intro' to 'playing'. */
  startGame: () => void;
  /**
   * Submit an answer for the current round.
   * Moves phase to 'feedback'.
   * @param correct whether the player answered correctly
   */
  submitAnswer: (correct: boolean) => void;
  /**
   * Move to the next round (from 'feedback').
   * Auto-transitions to 'complete' after the last round.
   */
  nextRound: () => void;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * State-machine hook managing game phases:
 *   intro -> playing -> feedback -> playing -> ... -> complete
 *
 * Uses refs for phase/round so that submitAnswer and nextRound
 * always read the latest values even when called from setTimeout.
 */
export function useGameState(totalRounds: number): UseGameStateReturn {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);

  // Refs to avoid stale closures in setTimeout callbacks
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const roundRef = useRef(round);
  roundRef.current = round;

  const accuracy = useMemo(
    () => (answered > 0 ? Math.round((score / answered) * 100) : 0),
    [score, answered],
  );

  const startGame = useCallback(() => {
    setPhase('playing');
    setRound(1);
    setScore(0);
    setAnswered(0);
  }, []);

  const submitAnswer = useCallback(
    (correct: boolean) => {
      if (phaseRef.current !== 'playing') return;

      setAnswered((prev) => prev + 1);
      if (correct) {
        setScore((prev) => prev + 1);
      }
      setPhase('feedback');
    },
    [],
  );

  const nextRound = useCallback(() => {
    if (phaseRef.current !== 'feedback') return;

    if (roundRef.current >= totalRounds) {
      setPhase('complete');
    } else {
      setRound((prev) => prev + 1);
      setPhase('playing');
    }
  }, [totalRounds]);

  return {
    phase,
    round,
    score,
    accuracy,
    totalRounds,
    startGame,
    submitAnswer,
    nextRound,
  };
}
