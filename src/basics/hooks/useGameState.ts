import { useState, useCallback, useMemo } from 'react';

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
 */
export function useGameState(totalRounds: number): UseGameStateReturn {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);

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
      if (phase !== 'playing') return;

      setAnswered((prev) => prev + 1);
      if (correct) {
        setScore((prev) => prev + 1);
      }
      setPhase('feedback');
    },
    [phase],
  );

  const nextRound = useCallback(() => {
    if (phase !== 'feedback') return;

    if (round >= totalRounds) {
      // All rounds done
      setPhase('complete');
    } else {
      setRound((prev) => prev + 1);
      setPhase('playing');
    }
  }, [phase, round, totalRounds]);

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
