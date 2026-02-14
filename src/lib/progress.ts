import type {
  CurriculumProgress,
  QuizAttempt,
  Quiz,
  Topic,
  Lesson,
  TopicMeta,
} from '../data/types';

/**
 * Compute topic completion as a percentage (0-100).
 * 80% weight for quizzes, 20% weight for essay.
 *
 * Works with lightweight TopicMeta (uses quizCount and counts correct
 * attempts from progress) so we don't need the full Topic loaded.
 */
export function computeTopicCompletion(
  topicId: string,
  progress: CurriculumProgress,
  meta: TopicMeta
): number {
  const topicProgress = progress.topics[topicId];
  if (!topicProgress) return 0;

  const totalQuizzes = meta.quizCount;
  if (totalQuizzes === 0) return 0;

  // Quiz portion: count correct quizzes from progress data
  let correctQuizzes = 0;
  for (const attempt of Object.values(topicProgress.quizAttempts)) {
    if (attempt.correct) {
      correctQuizzes++;
    }
  }
  // Cap at total quizzes to avoid exceeding 100%
  correctQuizzes = Math.min(correctQuizzes, totalQuizzes);

  const quizPortion = (correctQuizzes / totalQuizzes) * 80;

  // Essay portion
  const essayPortion = topicProgress.essaySubmitted ? 20 : 0;

  return Math.round(quizPortion + essayPortion);
}

/**
 * Compute lesson completion as an average of all its active topics.
 */
export function computeLessonCompletion(
  lessonId: string,
  progress: CurriculumProgress,
  lessons: Record<string, Lesson>,
  allTopicMeta: Record<string, TopicMeta>
): number {
  const lesson = lessons[lessonId];
  if (!lesson) return 0;

  const activeTopicIds = lesson.topicIds.filter(
    (id) => allTopicMeta[id] && allTopicMeta[id].status === 'active'
  );
  if (activeTopicIds.length === 0) return 0;

  let total = 0;
  for (const topicId of activeTopicIds) {
    total += computeTopicCompletion(topicId, progress, allTopicMeta[topicId]);
  }

  return Math.round(total / activeTopicIds.length);
}

/**
 * Compute curriculum-wide completion as an average of all lesson completions.
 */
export function computeCurriculumCompletion(
  progress: CurriculumProgress,
  lessons: Record<string, Lesson>,
  allTopicMeta: Record<string, TopicMeta>
): number {
  const lessonIds = Object.keys(lessons).filter(
    (id) => lessons[id].status === 'active'
  );
  if (lessonIds.length === 0) return 0;

  let total = 0;
  for (const lessonId of lessonIds) {
    total += computeLessonCompletion(lessonId, progress, lessons, allTopicMeta);
  }

  return Math.round(total / lessonIds.length);
}

/**
 * Compute accuracy percentage (0-100) for a specific topic or across all topics.
 * Accuracy = correct answers / total attempted quizzes.
 */
export function computeAccuracy(
  topicId: string | undefined,
  progress: CurriculumProgress
): number {
  let totalAttempted = 0;
  let totalCorrect = 0;

  const topicIds = topicId ? [topicId] : Object.keys(progress.topics);

  for (const id of topicIds) {
    const topicProgress = progress.topics[id];
    if (!topicProgress) continue;

    for (const quizId of Object.keys(topicProgress.quizAttempts)) {
      const attempt = topicProgress.quizAttempts[quizId];
      if (attempt.attempts > 0) {
        totalAttempted++;
        if (attempt.correct) {
          totalCorrect++;
        }
      }
    }
  }

  if (totalAttempted === 0) return 0;
  return Math.round((totalCorrect / totalAttempted) * 100);
}

/**
 * Check whether the reward for a topic should be unlocked.
 * Works with TopicMeta for lightweight checks.
 */
export function checkRewardUnlock(
  topicId: string,
  progress: CurriculumProgress,
  meta: TopicMeta
): boolean {
  const topicProgress = progress.topics[topicId];
  if (!topicProgress) return false;
  if (!meta.hasReward) return false;

  // Check all quizzes correct: count correct attempts and compare to quiz count
  let correctQuizzes = 0;
  for (const attempt of Object.values(topicProgress.quizAttempts)) {
    if (attempt.correct) {
      correctQuizzes++;
    }
  }
  const allQuizzesCorrect = correctQuizzes >= meta.quizCount;

  // Check essay submitted with minimum characters
  const essayMet =
    topicProgress.essaySubmitted &&
    topicProgress.essayCharCount >= meta.essayMinChars;

  return allQuizzesCorrect && essayMet;
}

/**
 * Compute XP earned for a quiz attempt.
 */
export function computeXpForQuiz(attempt: QuizAttempt, quiz: Quiz): number {
  if (!attempt.correct) return 0;
  return attempt.firstTryCorrect ? quiz.xpCorrectFirstTry : quiz.xpCorrectRetry;
}

/**
 * Check reward unlock using a full Topic object (for use when topic is loaded).
 */
export function checkRewardUnlockFull(
  topicId: string,
  progress: CurriculumProgress,
  topic: Topic
): boolean {
  const topicProgress = progress.topics[topicId];
  if (!topicProgress) return false;
  if (!topic.reward) return false;

  const allQuizzesCorrect = topic.quizzes.every((quiz) => {
    const attempt = topicProgress.quizAttempts[quiz.id];
    return attempt && attempt.correct;
  });

  const essayMet =
    topicProgress.essaySubmitted &&
    topicProgress.essayCharCount >= topic.essay.minCharacters;

  return allQuizzesCorrect && essayMet;
}
