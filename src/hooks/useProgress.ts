import { useContext, useCallback } from 'react';
import { ProgressContext } from '../context/ProgressContext';
import {
  computeTopicCompletion,
  computeLessonCompletion,
  computeCurriculumCompletion,
  computeAccuracy,
  checkRewardUnlock,
} from '../lib/progress';
import { topicMeta, lessons } from '../data/curriculum';

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }

  const getTopicCompletion = useCallback(
    (topicId: string): number => {
      const meta = topicMeta[topicId];
      if (!meta) return 0;
      return computeTopicCompletion(topicId, ctx.progress, meta);
    },
    [ctx.progress]
  );

  const getLessonCompletion = useCallback(
    (lessonId: string): number => {
      return computeLessonCompletion(lessonId, ctx.progress, lessons, topicMeta);
    },
    [ctx.progress]
  );

  const getCurriculumCompletion = useCallback((): number => {
    return computeCurriculumCompletion(ctx.progress, lessons, topicMeta);
  }, [ctx.progress]);

  const getAccuracy = useCallback(
    (topicId?: string): number => {
      return computeAccuracy(topicId, ctx.progress);
    },
    [ctx.progress]
  );

  const isRewardUnlockable = useCallback(
    (topicId: string): boolean => {
      const meta = topicMeta[topicId];
      if (!meta) return false;
      return checkRewardUnlock(topicId, ctx.progress, meta);
    },
    [ctx.progress]
  );

  return {
    ...ctx,
    getTopicCompletion,
    getLessonCompletion,
    getCurriculumCompletion,
    getAccuracy,
    isRewardUnlockable,
  };
}
