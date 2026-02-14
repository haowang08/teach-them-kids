import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import type { CurriculumProgress, TopicProgress } from '../data/types';
import {
  loadProgress,
  saveProgress,
  createEmptyProgress,
  migrateOldData,
} from '../lib/localStorage';
import {
  getStoredUsername,
  loadCloudProgress,
  saveCloudProgress,
  mergeProgress,
} from '../lib/cloudSync';

interface ProgressContextValue {
  progress: CurriculumProgress;
  xp: number;
  username: string | null;
  setUsername: (username: string | null) => void;
  applyMergedProgress: (merged: CurriculumProgress) => void;
  recordQuizAttempt: (topicId: string, quizId: string, isCorrect: boolean) => void;
  recordEssaySave: (topicId: string, text: string, charCount: number) => void;
  recordEssayDraft: (topicId: string, text: string) => void;
  markRewardUnlocked: (topicId: string) => void;
  getTopicProgress: (topicId: string) => TopicProgress;
  resetProgress: () => void;
}

const defaultTopicProgress: TopicProgress = {
  quizAttempts: {},
  essaySubmitted: false,
  essayCharCount: 0,
  essayText: '',
  rewardUnlocked: false,
};

export const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<CurriculumProgress>(() => {
    return loadProgress() ?? createEmptyProgress();
  });
  const [username, setUsername] = useState<string | null>(() => getStoredUsername());
  const hasMigrated = useRef(false);
  const loadedCloudUser = useRef<string | null>(null);
  const cloudSyncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Run migration on first mount
  useEffect(() => {
    if (!hasMigrated.current) {
      hasMigrated.current = true;
      migrateOldData();
      // Reload after migration in case data changed
      const migrated = loadProgress();
      if (migrated) {
        setProgress(migrated);
      }
    }
  }, []);

  // On mount or username change: fetch cloud progress and merge
  useEffect(() => {
    if (!username || loadedCloudUser.current === username) return;
    loadedCloudUser.current = username;

    loadCloudProgress(username).then((cloudData) => {
      if (cloudData) {
        setProgress((prev) => {
          const merged = mergeProgress(prev, cloudData);
          saveProgress(merged);
          return merged;
        });
      }
    }).catch((err) => {
      console.error('Failed to load cloud progress:', err);
    });
  }, [username]);

  // Save to localStorage on every change
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Debounced cloud sync — fire after every progress change
  useEffect(() => {
    if (!username) return;

    if (cloudSyncTimer.current) {
      clearTimeout(cloudSyncTimer.current);
    }

    cloudSyncTimer.current = setTimeout(() => {
      saveCloudProgress(username, progress).catch((err) => {
        console.error('Cloud sync failed:', err);
      });
    }, 2000);

    return () => {
      if (cloudSyncTimer.current) {
        clearTimeout(cloudSyncTimer.current);
      }
    };
  }, [progress, username]);

  const applyMergedProgress = useCallback((merged: CurriculumProgress) => {
    setProgress(merged);
    saveProgress(merged);
  }, []);

  const ensureTopicProgress = useCallback(
    (topicId: string): TopicProgress => {
      return progress.topics[topicId] ?? { ...defaultTopicProgress };
    },
    [progress]
  );

  const recordQuizAttempt = useCallback(
    (topicId: string, quizId: string, isCorrect: boolean) => {
      setProgress((prev) => {
        const topic = prev.topics[topicId] ?? {
          ...defaultTopicProgress,
          quizAttempts: {},
        };
        const existing = topic.quizAttempts[quizId];

        let xpGain = 0;
        let newAttempt;

        if (existing) {
          // Already attempted before
          const attempts = existing.attempts + 1;
          const correct = isCorrect || existing.correct;
          newAttempt = {
            correct,
            attempts,
            firstTryCorrect: existing.firstTryCorrect,
          };
          // Award XP for retry correct only if not already correct
          if (isCorrect && !existing.correct) {
            xpGain = 50;
          }
        } else {
          // First attempt ever
          newAttempt = {
            correct: isCorrect,
            attempts: 1,
            firstTryCorrect: isCorrect,
          };
          if (isCorrect) {
            xpGain = 100;
          }
        }

        return {
          ...prev,
          xp: prev.xp + xpGain,
          topics: {
            ...prev.topics,
            [topicId]: {
              ...topic,
              quizAttempts: {
                ...topic.quizAttempts,
                [quizId]: newAttempt,
              },
            },
          },
        };
      });
    },
    []
  );

  const recordEssaySave = useCallback(
    (topicId: string, text: string, charCount: number) => {
      setProgress((prev) => {
        const topic = prev.topics[topicId] ?? { ...defaultTopicProgress };
        const isFirstSave = !topic.essaySubmitted;
        const xpGain = isFirstSave ? 75 : 0;

        return {
          ...prev,
          xp: prev.xp + xpGain,
          topics: {
            ...prev.topics,
            [topicId]: {
              ...topic,
              essaySubmitted: true,
              essayText: text,
              essayCharCount: charCount,
            },
          },
        };
      });
    },
    []
  );

  const recordEssayDraft = useCallback(
    (topicId: string, text: string) => {
      setProgress((prev) => {
        const topic = prev.topics[topicId] ?? { ...defaultTopicProgress };
        // Only save draft text — don't mark as submitted or award XP
        if (topic.essayText === text) return prev;
        return {
          ...prev,
          topics: {
            ...prev.topics,
            [topicId]: {
              ...topic,
              essayText: text,
              essayCharCount: text.length,
            },
          },
        };
      });
    },
    []
  );

  const markRewardUnlocked = useCallback((topicId: string) => {
    setProgress((prev) => {
      const topic = prev.topics[topicId] ?? { ...defaultTopicProgress };
      return {
        ...prev,
        topics: {
          ...prev.topics,
          [topicId]: {
            ...topic,
            rewardUnlocked: true,
          },
        },
      };
    });
  }, []);

  const getTopicProgress = useCallback(
    (topicId: string): TopicProgress => {
      return ensureTopicProgress(topicId);
    },
    [ensureTopicProgress]
  );

  const resetProgress = useCallback(() => {
    const empty = createEmptyProgress();
    setProgress(empty);
  }, []);

  const value: ProgressContextValue = {
    progress,
    xp: progress.xp,
    username,
    setUsername,
    applyMergedProgress,
    recordQuizAttempt,
    recordEssaySave,
    recordEssayDraft,
    markRewardUnlocked,
    getTopicProgress,
    resetProgress,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}
