export type GameId =
  | 'sound-safari' | 'word-builder' | 'phonics-train' | 'sight-word-stars' | 'story-book' | 'sentence-builder'
  | 'addition-aquarium' | 'subtraction-spaceship' | 'number-bridge' | 'multiplication-meadow' | 'division-bakery' | 'math-mountain';

export type GameCategory = 'reading' | 'math';

export interface LevelMeta {
  level: number;
  name: string;
  description: string;
}

export interface GameMeta {
  id: GameId;
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: GameCategory;
  levelCount: number;
  levels: LevelMeta[];
  color: string; // theme color for the game card
}

export interface LevelProgress {
  completed: boolean;
  bestAccuracy: number;
  stars: number; // 0-3
  attempts: number;
}

export interface GameProgress {
  currentLevel: number;
  levels: Record<number, LevelProgress>;
  totalPlayTimeMs: number;
}

export interface BasicsProgress {
  games: Partial<Record<GameId, GameProgress>>;
  totalStars: number;
  lastActivity: string;
}

export interface BasicsGameProps {
  level: number;
  onComplete: (accuracy: number) => void;
  onBack: () => void;
}
