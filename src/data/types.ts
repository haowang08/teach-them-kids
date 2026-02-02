// ============================================
// CURRICULUM HIERARCHY
// ============================================

export type Status = 'active' | 'coming-soon';

export interface Curriculum {
  id: string;
  title: string;
  description: string;
  journeys: Journey[];
}

export interface Journey {
  id: string;
  title: string;
  icon: string;
  description: string;
  lessonIds: string[];
}

export interface Lesson {
  id: string;
  title: string;
  icon: string;
  description: string;
  status: Status;
  topicIds: string[];
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  status: Status;
  themeId: string;
  heroIcons: string[];
  sections: TopicSection[];
  quizzes: Quiz[];
  essay: Essay;
  reward?: Reward;
  conclusion: ConclusionData;
  navItems: NavItem[];
}

// ============================================
// CONTENT BLOCKS
// ============================================

export interface NavItem {
  id: string;
  icon: string;
  label: string;
}

export interface TopicSection {
  id: string;
  icon: string;
  title: string;
  introText?: string;
  readAloudBlocks: ReadAloudBlock[];
  characters?: CharacterData[];
  timeline?: TimelineEntry[];
  funFacts?: FunFactData[];
  videos: VideoData[];
  quizIds: string[];
}

export interface ReadAloudBlock {
  id: string;
  paragraphs: string[];
}

export interface CharacterData {
  emoji: string;
  name: string;
  title: string;
  description: string;
  extraTag?: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface FunFactData {
  title: string;
  text: string;
}

export interface VideoData {
  youtubeId: string;
  title: string;
  channelName?: string;
}

export interface ConclusionData {
  title: string;
  paragraphs: string[];
}

// ============================================
// QUIZ
// ============================================

export interface Quiz {
  id: string;
  sectionId: string;
  title: string;
  question: string;
  options: QuizOption[];
  xpCorrectFirstTry: number;
  xpCorrectRetry: number;
}

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

// ============================================
// ESSAY
// ============================================

export interface Essay {
  id: string;
  prompt: string;
  description: string;
  minCharacters: number;
  xpValue: number;
  successMessage: string;
}

// ============================================
// REWARD
// ============================================

export interface Reward {
  id: string;
  title: string;
  description: string;
  lockMessage: string;
  requirements: RewardRequirement[];
  type: 'sketchfab' | 'chariot-race';
  embedUrl?: string;
  embedTitle?: string;
  celebrationMessage: string;
  attribution?: RewardAttribution;
}

export interface RewardRequirement {
  type: 'all-quizzes-correct' | 'essay-saved-with-min-chars';
  label: string;
}

export interface RewardAttribution {
  modelName: string;
  modelUrl: string;
  authorName: string;
  authorUrl: string;
  platformUrl: string;
}

// ============================================
// THEME
// ============================================

export interface TopicTheme {
  id: string;
  colors: {
    gold: string;
    primary: string;
    secondary: string;
    cream: string;
    accent: string;
    darkBrown: string;
    sand: string;
    bronze: string;
    goldLight: string;
  };
  heroGradient: string;
  navGradient: string;
  sectionBorderGradient: string;
}

// ============================================
// PROGRESS TRACKING
// ============================================

export interface CurriculumProgress {
  topics: Record<string, TopicProgress>;
  xp: number;
  streakDays: number;
  lastVisit: string;
}

export interface TopicProgress {
  quizAttempts: Record<string, QuizAttempt>;
  essaySubmitted: boolean;
  essayCharCount: number;
  essayText: string;
  rewardUnlocked: boolean;
}

export interface QuizAttempt {
  correct: boolean;
  attempts: number;
  firstTryCorrect: boolean;
}

// ============================================
// SPEECH RECOGNITION
// ============================================

export type SpeechStatus = 'idle' | 'starting' | 'recording' | 'stopping';

export type SpeechErrorCode =
  | 'PERMISSION_DENIED'
  | 'SYSTEM_PERMISSION_DENIED'
  | 'NO_MICROPHONE'
  | 'MIC_IN_USE'
  | 'NETWORK_ERROR'
  | 'NO_SPEECH'
  | 'NOT_SUPPORTED'
  | 'UNKNOWN';

export interface SpeechError {
  code: SpeechErrorCode;
  friendlyMessage: string;
  recoverable: boolean;
}
