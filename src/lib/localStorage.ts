import type { CurriculumProgress } from '../data/types';

export const STORAGE_KEY = 'kidsLearnProgress';

export function createEmptyProgress(): CurriculumProgress {
  return {
    topics: {},
    xp: 0,
    streakDays: 0,
    lastVisit: new Date().toISOString(),
  };
}

function isValidProgress(data: unknown): data is CurriculumProgress {
  if (typeof data !== 'object' || data === null) return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.topics === 'object' && d.topics !== null && !Array.isArray(d.topics) &&
    typeof d.xp === 'number' &&
    typeof d.streakDays === 'number' &&
    typeof d.lastVisit === 'string'
  );
}

export function loadProgress(): CurriculumProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const fresh = createEmptyProgress();
      saveProgress(fresh);
      return fresh;
    }
    const parsed = JSON.parse(raw);
    if (!isValidProgress(parsed)) {
      const fresh = createEmptyProgress();
      saveProgress(fresh);
      return fresh;
    }
    return parsed;
  } catch {
    const fresh = createEmptyProgress();
    saveProgress(fresh);
    return fresh;
  }
}

export function saveProgress(progress: CurriculumProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage:', e);
  }
}

/**
 * Migrate old data from the original standalone Egypt/Rome apps.
 * Old keys: 'egyptResponses' and 'romeResponses' stored essay text.
 */
export function migrateOldData(): void {
  try {
    const progress = loadProgress();
    let changed = false;

    const egyptRaw = localStorage.getItem('egyptResponses');
    if (egyptRaw) {
      try {
        const egyptData = JSON.parse(egyptRaw);
        const essayText =
          typeof egyptData === 'string'
            ? egyptData
            : egyptData.response || egyptData.text || '';
        if (essayText && essayText.length > 0) {
          if (!progress.topics['ancient-egypt']) {
            progress.topics['ancient-egypt'] = {
              quizAttempts: {},
              essaySubmitted: true,
              essayCharCount: essayText.length,
              essayText,
              rewardUnlocked: false,
            };
          } else if (!progress.topics['ancient-egypt'].essaySubmitted) {
            progress.topics['ancient-egypt'].essaySubmitted = true;
            progress.topics['ancient-egypt'].essayCharCount = essayText.length;
            progress.topics['ancient-egypt'].essayText = essayText;
          }
          changed = true;
        }
      } catch {
        // Could not parse old Egypt data, skip
      }
      localStorage.removeItem('egyptResponses');
    }

    const romeRaw = localStorage.getItem('romeResponses');
    if (romeRaw) {
      try {
        const romeData = JSON.parse(romeRaw);
        const essayText =
          typeof romeData === 'string'
            ? romeData
            : romeData.response || romeData.text || '';
        if (essayText && essayText.length > 0) {
          if (!progress.topics['ancient-rome']) {
            progress.topics['ancient-rome'] = {
              quizAttempts: {},
              essaySubmitted: true,
              essayCharCount: essayText.length,
              essayText,
              rewardUnlocked: false,
            };
          } else if (!progress.topics['ancient-rome'].essaySubmitted) {
            progress.topics['ancient-rome'].essaySubmitted = true;
            progress.topics['ancient-rome'].essayCharCount = essayText.length;
            progress.topics['ancient-rome'].essayText = essayText;
          }
          changed = true;
        }
      } catch {
        // Could not parse old Rome data, skip
      }
      localStorage.removeItem('romeResponses');
    }

    if (changed) {
      saveProgress(progress);
    }
  } catch {
    // Migration is best-effort; don't crash
  }
}
