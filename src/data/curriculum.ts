import type { Curriculum, Lesson, Topic } from './types';
import { ancientEgypt } from './topics/ancient-egypt';
import { ancientRome } from './topics/ancient-rome';

// Re-export topic data for convenience
export { ancientEgypt } from './topics/ancient-egypt';
export { ancientRome } from './topics/ancient-rome';

// ─── Flat maps for O(1) lookups ──────────────────────────────────

export const topics: Record<string, Topic> = {
  'ancient-egypt': ancientEgypt,
  'ancient-rome': ancientRome,
};

export const lessons: Record<string, Lesson> = {
  'ancient-civilizations': {
    id: 'ancient-civilizations',
    title: 'Ancient Civilizations',
    icon: '\u{1F3DB}\uFE0F',
    description:
      'Explore the world\'s most fascinating ancient civilizations, from Egypt to Rome and beyond!',
    status: 'active',
    topicIds: [
      'ancient-egypt',
      'ancient-rome',
      'persian-empire',
      'chinese-dynasties',
      'inca-empire',
      'mali',
    ],
  },
  'math-stuff': {
    id: 'math-stuff',
    title: 'Math Stuff',
    icon: '\u{1F522}',
    description: 'Fun math adventures coming soon!',
    status: 'coming-soon',
    topicIds: [],
  },
  art: {
    id: 'art',
    title: 'Art',
    icon: '\u{1F3A8}',
    description: 'Creative art explorations coming soon!',
    status: 'coming-soon',
    topicIds: [],
  },
  food: {
    id: 'food',
    title: 'Food',
    icon: '\u{1F354}',
    description: 'Delicious food adventures coming soon!',
    status: 'coming-soon',
    topicIds: [],
  },
};

// ─── Curriculum structure ────────────────────────────────────────

export const curriculum: Curriculum = {
  id: 'kids-learn',
  title: 'Kids Learn',
  description: 'An educational adventure for curious young minds!',
  journeys: [
    {
      id: 'history-explorer',
      title: 'History Explorer',
      icon: '\u{1F30D}',
      description:
        'Travel through time and discover the world\'s most amazing civilizations!',
      lessonIds: ['ancient-civilizations', 'math-stuff', 'art', 'food'],
    },
  ],
};

// ─── Helper functions ────────────────────────────────────────────

export function getLesson(id: string): Lesson | undefined {
  return lessons[id];
}

export function getTopic(id: string): Topic | undefined {
  return topics[id];
}

export function getTopicBySlug(slug: string): Topic | undefined {
  return Object.values(topics).find((t) => t.slug === slug);
}

export function getLessonForTopic(topicId: string): Lesson | undefined {
  return Object.values(lessons).find((lesson) =>
    lesson.topicIds.includes(topicId)
  );
}

export function getTopicsForLesson(lessonId: string): Topic[] {
  const lesson = lessons[lessonId];
  if (!lesson) return [];
  return lesson.topicIds
    .map((id) => topics[id])
    .filter((t): t is Topic => t !== undefined);
}
