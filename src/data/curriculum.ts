import type { Curriculum, Lesson, Topic } from './types';
import { ancientEgypt } from './topics/ancient-egypt';
import { ancientRome } from './topics/ancient-rome';
import { persianEmpire } from './topics/persian-empire';
import { chineseDynasties } from './topics/chinese-dynasties';
import { incaEmpire } from './topics/inca-empire';
import { mali } from './topics/mali';

// Re-export topic data for convenience
export { ancientEgypt } from './topics/ancient-egypt';
export { ancientRome } from './topics/ancient-rome';
export { persianEmpire } from './topics/persian-empire';
export { chineseDynasties } from './topics/chinese-dynasties';
export { incaEmpire } from './topics/inca-empire';
export { mali } from './topics/mali';

// ─── Flat maps for O(1) lookups ──────────────────────────────────

export const topics: Record<string, Topic> = {
  'ancient-egypt': ancientEgypt,
  'ancient-rome': ancientRome,
  'persian-empire': persianEmpire,
  'chinese-dynasties': chineseDynasties,
  'inca-empire': incaEmpire,
  'mali': mali,
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
  'fun-math': {
    id: 'fun-math',
    title: 'Fun Math',
    icon: '\u{1F9E9}',
    description: 'Explore the hidden math behind codes, sports, patterns, shapes, and the history of numbers!',
    status: 'coming-soon',
    topicIds: ['secret-codes', 'math-in-sports', 'patterns-puzzles-magic', 'shape-shifters', 'history-of-counting'],
  },
  'not-so-fun-math': {
    id: 'not-so-fun-math',
    title: 'Not-so-fun Math ;-)',
    icon: '\u{1F4DD}',
    description: 'Master multiplication, division, geometry, and algebra through pirates, pizza, space, and treasure hunts!',
    status: 'coming-soon',
    topicIds: ['single-digit-multiplication', 'dividing-by-single-digits', 'multi-digit-multiplication', 'multi-digit-division', 'geometry-area', 'geometry-volume', 'algebra-solve-for-x', 'algebra-solve-for-xy'],
  },
  art: {
    id: 'art',
    title: 'Art',
    icon: '\u{1F3A8}',
    description: 'Discover street art, optical illusions, animation, mysterious paintings, cave art, and superhero comics!',
    status: 'coming-soon',
    topicIds: ['street-art', 'colors-light-illusions', 'art-around-the-world', 'animation-nation', 'mysterious-paintings', 'prehistoric-cave-art', 'superhero-comics'],
  },
  food: {
    id: 'food',
    title: 'Food',
    icon: '\u{1F354}',
    description: 'Explore foods that changed history, kitchen science, street food, chocolate, festivals, dumplings, and noodles!',
    status: 'coming-soon',
    topicIds: ['foods-that-changed-the-world', 'kitchen-science-lab', 'street-food-around-the-world', 'journey-of-chocolate', 'feasts-festivals-food', 'dumplings-around-the-world', 'history-of-noodles'],
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
      lessonIds: ['ancient-civilizations', 'fun-math', 'not-so-fun-math', 'art', 'food'],
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
