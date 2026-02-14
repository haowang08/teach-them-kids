import type { CurriculumProgress, TopicProgress, QuizAttempt } from '../data/types';

const USERNAME_KEY = 'kidsLearnUsername';
const TOKEN_KEY = 'kidsLearnToken';
const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,20}$/;

// ---------------------------------------------------------------------------
// localStorage helpers for the username and token
// ---------------------------------------------------------------------------

export function getStoredUsername(): string | null {
  try {
    return localStorage.getItem(USERNAME_KEY);
  } catch {
    return null;
  }
}

export function setStoredUsername(username: string): void {
  try {
    localStorage.setItem(USERNAME_KEY, username);
  } catch {
    // best-effort
  }
}

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token: string): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // best-effort
  }
}

export function clearStoredUsername(): void {
  try {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // best-effort
  }
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

export function validateUsername(username: string): string | null {
  const trimmed = username.trim();
  if (trimmed.length === 0) return 'Please enter a username.';
  if (trimmed.length < 3) return 'Username must be at least 3 characters.';
  if (trimmed.length > 20) return 'Username must be 20 characters or fewer.';
  if (!USERNAME_REGEX.test(trimmed)) {
    return 'Only letters, numbers, hyphens, and underscores are allowed.';
  }
  return null;
}

// ---------------------------------------------------------------------------
// API helpers
// ---------------------------------------------------------------------------

export async function claimUsername(
  username: string,
): Promise<{ created: boolean; exists: boolean; error?: string }> {
  try {
    const res = await fetch('/api/username', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.toLowerCase() }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { created: false, exists: false, error: body.error ?? 'Request failed.' };
    }
    const data = await res.json();
    // Store the auth token if returned
    if (data.token) {
      setStoredToken(data.token);
    }
    return { created: !!data.created, exists: !!data.exists };
  } catch {
    return { created: false, exists: false, error: 'Could not reach server. Try again later.' };
  }
}

export async function loadCloudProgress(
  username: string,
): Promise<CurriculumProgress | null> {
  try {
    const res = await fetch(`/api/progress?username=${encodeURIComponent(username.toLowerCase())}`);
    if (!res.ok) return null;
    const data = await res.json();
    // Validate basic shape before trusting the data
    if (
      typeof data !== 'object' || data === null ||
      typeof data.xp !== 'number' ||
      typeof data.topics !== 'object' || data.topics === null
    ) {
      return null;
    }
    return data as CurriculumProgress;
  } catch {
    return null;
  }
}

export async function saveCloudProgress(
  username: string,
  progress: CurriculumProgress,
): Promise<boolean> {
  try {
    const token = getStoredToken();
    if (!token) {
      console.warn('No auth token found, skipping cloud save');
      return false;
    }
    const res = await fetch('/api/progress', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.toLowerCase(), progress, token }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Merge logic — takes the "richer" data per topic
// ---------------------------------------------------------------------------

function mergeQuizAttempts(
  a: Record<string, QuizAttempt> | undefined,
  b: Record<string, QuizAttempt> | undefined,
): Record<string, QuizAttempt> {
  if (!a) return b ?? {};
  if (!b) return a;
  const merged: Record<string, QuizAttempt> = { ...a };
  for (const [quizId, attemptB] of Object.entries(b)) {
    const attemptA = merged[quizId];
    if (!attemptA) {
      merged[quizId] = attemptB;
    } else {
      // Keep whichever has more attempts; prefer correct
      merged[quizId] = {
        correct: attemptA.correct || attemptB.correct,
        attempts: Math.max(attemptA.attempts, attemptB.attempts),
        firstTryCorrect: attemptA.firstTryCorrect || attemptB.firstTryCorrect,
      };
    }
  }
  return merged;
}

function mergeTopicProgress(a: TopicProgress, b: TopicProgress): TopicProgress {
  const textA = a.essayText ?? '';
  const textB = b.essayText ?? '';
  return {
    quizAttempts: mergeQuizAttempts(a.quizAttempts, b.quizAttempts),
    essaySubmitted: a.essaySubmitted || b.essaySubmitted,
    essayCharCount: Math.max(a.essayCharCount ?? 0, b.essayCharCount ?? 0),
    essayText: textA.length >= textB.length ? textA : textB,
    rewardUnlocked: a.rewardUnlocked || b.rewardUnlocked,
  };
}

export function mergeProgress(
  local: CurriculumProgress,
  cloud: CurriculumProgress,
): CurriculumProgress {
  const allTopicIds = new Set([
    ...Object.keys(local.topics),
    ...Object.keys(cloud.topics),
  ]);

  const mergedTopics: Record<string, TopicProgress> = {};
  for (const topicId of allTopicIds) {
    const localTopic = local.topics[topicId];
    const cloudTopic = cloud.topics[topicId];
    if (localTopic && cloudTopic) {
      mergedTopics[topicId] = mergeTopicProgress(localTopic, cloudTopic);
    } else {
      mergedTopics[topicId] = (localTopic ?? cloudTopic)!;
    }
  }

  return {
    topics: mergedTopics,
    xp: Math.max(local.xp, cloud.xp),
    streakDays: Math.max(local.streakDays, cloud.streakDays),
    lastVisit: local.lastVisit > cloud.lastVisit ? local.lastVisit : cloud.lastVisit,
  };
}
