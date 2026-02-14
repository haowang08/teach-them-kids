import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { BasicsProgress, GameId, GameProgress } from '../types';

// ---------------------------------------------------------------------------
// Context type
// ---------------------------------------------------------------------------

export interface BasicsProgressContextType {
  progress: BasicsProgress;
  getGameProgress: (gameId: GameId) => GameProgress;
  completeLevel: (gameId: GameId, level: number, accuracy: number) => void;
  addPlayTime: (gameId: GameId, ms: number) => void;
  resetProgress: () => void;
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'kidsLearnBasics';

function defaultProgress(): BasicsProgress {
  return {
    games: {},
    totalStars: 0,
    lastActivity: new Date().toISOString(),
  };
}

function defaultGameProgress(): GameProgress {
  return {
    currentLevel: 1,
    levels: {},
    totalPlayTimeMs: 0,
  };
}

/** Stars from accuracy: >=90% -> 3, >=70% -> 2, >=50% -> 1, else 0 */
function starsFromAccuracy(accuracy: number): number {
  if (accuracy >= 90) return 3;
  if (accuracy >= 70) return 2;
  if (accuracy >= 50) return 1;
  return 0;
}

/** Compute total stars across all games. */
function computeTotalStars(progress: BasicsProgress): number {
  let total = 0;
  for (const gp of Object.values(progress.games)) {
    if (!gp) continue;
    for (const lp of Object.values(gp.levels)) {
      total += lp.stars;
    }
  }
  return total;
}

// ---------------------------------------------------------------------------
// Load / save helpers
// ---------------------------------------------------------------------------

function loadProgress(): BasicsProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    return JSON.parse(raw) as BasicsProgress;
  } catch {
    return defaultProgress();
  }
}

function saveProgress(progress: BasicsProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // localStorage might be full or disabled – silently ignore
  }
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export const BasicsProgressContext = createContext<BasicsProgressContextType | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function BasicsProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<BasicsProgress>(loadProgress);

  // Persist on every change
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const getGameProgress = useCallback(
    (gameId: GameId): GameProgress => {
      return progress.games[gameId] ?? defaultGameProgress();
    },
    [progress],
  );

  const completeLevel = useCallback(
    (gameId: GameId, level: number, accuracy: number) => {
      setProgress((prev) => {
        const next = structuredClone(prev);

        // Ensure game entry exists
        if (!next.games[gameId]) {
          next.games[gameId] = defaultGameProgress();
        }

        const gp = next.games[gameId]!;
        const existing = gp.levels[level];
        const stars = starsFromAccuracy(accuracy);

        gp.levels[level] = {
          completed: true,
          bestAccuracy: existing ? Math.max(existing.bestAccuracy, accuracy) : accuracy,
          stars: existing ? Math.max(existing.stars, stars) : stars,
          attempts: (existing?.attempts ?? 0) + 1,
        };

        // Advance currentLevel if the player beat it
        if (level >= gp.currentLevel) {
          gp.currentLevel = level + 1;
        }

        next.totalStars = computeTotalStars(next);
        next.lastActivity = new Date().toISOString();

        return next;
      });
    },
    [],
  );

  const addPlayTime = useCallback((gameId: GameId, ms: number) => {
    setProgress((prev) => {
      const next = structuredClone(prev);

      if (!next.games[gameId]) {
        next.games[gameId] = defaultGameProgress();
      }

      next.games[gameId]!.totalPlayTimeMs += ms;
      next.lastActivity = new Date().toISOString();

      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    const fresh = defaultProgress();
    setProgress(fresh);
  }, []);

  const value = useMemo<BasicsProgressContextType>(
    () => ({
      progress,
      getGameProgress,
      completeLevel,
      addPlayTime,
      resetProgress,
    }),
    [progress, getGameProgress, completeLevel, addPlayTime, resetProgress],
  );

  return (
    <BasicsProgressContext.Provider value={value}>
      {children}
    </BasicsProgressContext.Provider>
  );
}
