'use client';

import { useProgress } from '../../hooks/useProgress';
import { getTopic } from '../../data/curriculum';

interface ScoreTrackerProps {
  topicId: string;
}

export default function ScoreTracker({ topicId }: ScoreTrackerProps) {
  const { getTopicProgress } = useProgress();
  const topic = getTopic(topicId);

  if (!topic) return null;

  const totalQuizzes = topic.quizzes.length;
  if (totalQuizzes === 0) return null;

  const topicProgress = getTopicProgress(topicId);
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
