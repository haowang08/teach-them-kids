import type {
  CurriculumProgress,
  QuizAttempt,
  Quiz,
  Topic,
  Lesson,
} from '../data/types';

/**
 * Compute topic completion as a percentage (0-100).
 * 80% weight for quizzes, 20% weight for essay.
 */
export function computeTopicCompletion(
  topicId: string,
  progress: CurriculumProgress,
  topic: Topic
): number {
  const topicProgress = progress.topics[topicId];
  if (!topicProgress) return 0;

  const totalQuizzes = topic.quizzes.length;
  if (totalQuizzes === 0) return 0;

  // Quiz portion: count correct quizzes
  let correctQuizzes = 0;
  for (const quiz of topic.quizzes) {
    const attempt = topicProgress.quizAttempts[quiz.id];
    if (attempt && attempt.correct) {
      correctQuizzes++;
    }
  }

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
  topics: Record<string, Topic>
): number {
  const lesson = lessons[lessonId];
  if (!lesson) return 0;

  const activeTopicIds = lesson.topicIds.filter(
    (id) => topics[id] && topics[id].status === 'active'
  );
  if (activeTopicIds.length === 0) return 0;

  let total = 0;
  for (const topicId of activeTopicIds) {
    total += computeTopicCompletion(topicId, progress, topics[topicId]);
  }

  return Math.round(total / activeTopicIds.length);
}

/**
 * Compute curriculum-wide completion as an average of all lesson completions.
 */
export function computeCurriculumCompletion(
  progress: CurriculumProgress,
  lessons: Record<string, Lesson>,
  topics: Record<string, Topic>
): number {
  const lessonIds = Object.keys(lessons).filter(
    (id) => lessons[id].status === 'active'
  );
  if (lessonIds.length === 0) return 0;

  let total = 0;
  for (const lessonId of lessonIds) {
    total += computeLessonCompletion(lessonId, progress, lessons, topics);
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
 * Requirements: all quizzes correct + essay saved with minimum characters.
 */
export function checkRewardUnlock(
  topicId: string,
  progress: CurriculumProgress,
  topic: Topic
): boolean {
  const topicProgress = progress.topics[topicId];
  if (!topicProgress) return false;
  if (!topic.reward) return false;

  // Check all quizzes correct
  const allQuizzesCorrect = topic.quizzes.every((quiz) => {
    const attempt = topicProgress.quizAttempts[quiz.id];
    return attempt && attempt.correct;
  });

  // Check essay submitted with minimum characters
  const essayMet =
    topicProgress.essaySubmitted &&
    topicProgress.essayCharCount >= topic.essay.minCharacters;

  return allQuizzesCorrect && essayMet;
}

/**
 * Compute XP earned for a quiz attempt.
 */
export function computeXpForQuiz(attempt: QuizAttempt, quiz: Quiz): number {
  if (!attempt.correct) return 0;
  return attempt.firstTryCorrect ? quiz.xpCorrectFirstTry : quiz.xpCorrectRetry;
}
