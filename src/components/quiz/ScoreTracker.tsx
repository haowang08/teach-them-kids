'use client';

import { useProgress } from '../../hooks/useProgress';
import type { Topic } from '../../data/types';

interface ScoreTrackerProps {
  topic: Topic;
}

export default function ScoreTracker({ topic }: ScoreTrackerProps) {
  const { getTopicProgress } = useProgress();

  const totalQuizzes = topic.quizzes.length;
  if (totalQuizzes === 0) return null;

  const topicProgress = getTopicProgress(topic.id);
  const correctCount = Object.values(topicProgress.quizAttempts).filter(
    (a) => a.correct
  ).length;

  const isPerfect = correctCount === totalQuizzes && totalQuizzes > 0;

  return (
    <div
      className={`fixed top-16 right-4 z-40 rounded-full px-4 py-2 shadow-lg text-sm font-bold ${
        isPerfect
          ? 'animate-pulse-glow bg-gradient-to-r from-[var(--topic-gold)] to-[var(--topic-gold-light)] text-white'
          : 'bg-[var(--topic-gold)] text-white'
      }`}
    >
      Score: {correctCount} / {totalQuizzes}
    </div>
  );
}
