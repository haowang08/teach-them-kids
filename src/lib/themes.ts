import type { TopicTheme } from '../data/types';

export const ancientEgyptTheme: TopicTheme = {
  id: 'ancient-egypt',
  colors: {
    gold: '#C9A227',
    primary: '#1B3A5C',
    secondary: '#26619C',
    cream: '#FFF8E7',
    accent: '#008080',
    darkBrown: '#3D2914',
    sand: '#F5DEB3',
    bronze: '#CD7F32',
    goldLight: '#F5E6A3',
  },
  heroGradient:
    'linear-gradient(180deg, rgba(27, 58, 92, 0.95) 0%, rgba(38, 97, 156, 0.85) 50%, rgba(61, 41, 20, 0.9) 100%)',
  navGradient:
    'linear-gradient(90deg, #1B3A5C, #26619C, #1B3A5C)',
  sectionBorderGradient:
    'linear-gradient(90deg, #C9A227, #1B3A5C, #C9A227)',
};

export const ancientRomeTheme: TopicTheme = {
  id: 'ancient-rome',
  colors: {
    gold: '#D4AF37',
    primary: '#8B0000',
    secondary: '#722F37',
    cream: '#FDF5E6',
    accent: '#556B2F',
    darkBrown: '#3D2914',
    sand: '#F5DEB3',
    bronze: '#CD7F32',
    goldLight: '#F5E6A3',
  },
  heroGradient:
    'linear-gradient(180deg, rgba(139, 0, 0, 0.9) 0%, rgba(114, 47, 55, 0.85) 50%, rgba(61, 41, 20, 0.9) 100%)',
  navGradient:
    'linear-gradient(90deg, #722F37, #8B0000, #722F37)',
  sectionBorderGradient:
    'linear-gradient(90deg, #D4AF37, #8B0000, #D4AF37)',
};

export const persianEmpireTheme: TopicTheme = {
  id: 'persian-empire',
  colors: {
    gold: '#C9A227',
    primary: '#1A4731',
    secondary: '#2D7A4F',
    cream: '#F5F0E1',
    accent: '#8B4513',
    darkBrown: '#3D2914',
    sand: '#E8DCC8',
    bronze: '#CD7F32',
    goldLight: '#F5E6A3',
  },
  heroGradient:
    'linear-gradient(180deg, rgba(26, 71, 49, 0.95) 0%, rgba(45, 122, 79, 0.85) 50%, rgba(61, 41, 20, 0.9) 100%)',
  navGradient:
    'linear-gradient(90deg, #1A4731, #2D7A4F, #1A4731)',
  sectionBorderGradient:
    'linear-gradient(90deg, #C9A227, #1A4731, #C9A227)',
};

export const chineseDynastiesTheme: TopicTheme = {
  id: 'chinese-dynasties',
  colors: {
    gold: '#DAA520',
    primary: '#8B0000',
    secondary: '#CC0000',
    cream: '#FFF8F0',
    accent: '#2F4F4F',
    darkBrown: '#3D2914',
    sand: '#F5DEB3',
    bronze: '#CD7F32',
    goldLight: '#FFE4B5',
  },
  heroGradient:
    'linear-gradient(180deg, rgba(139, 0, 0, 0.95) 0%, rgba(204, 0, 0, 0.85) 50%, rgba(61, 41, 20, 0.9) 100%)',
  navGradient:
    'linear-gradient(90deg, #8B0000, #CC0000, #8B0000)',
  sectionBorderGradient:
    'linear-gradient(90deg, #DAA520, #8B0000, #DAA520)',
};

export const incaEmpireTheme: TopicTheme = {
  id: 'inca-empire',
  colors: {
    gold: '#DAA520',
    primary: '#8B4513',
    secondary: '#D2691E',
    cream: '#FFF8E7',
    accent: '#228B22',
    darkBrown: '#3D2914',
    sand: '#DEB887',
    bronze: '#CD7F32',
    goldLight: '#F5E6A3',
  },
  heroGradient:
    'linear-gradient(180deg, rgba(139, 69, 19, 0.95) 0%, rgba(210, 105, 30, 0.85) 50%, rgba(61, 41, 20, 0.9) 100%)',
  navGradient:
    'linear-gradient(90deg, #8B4513, #D2691E, #8B4513)',
  sectionBorderGradient:
    'linear-gradient(90deg, #DAA520, #8B4513, #DAA520)',
};

export const maliEmpireTheme: TopicTheme = {
  id: 'mali-empire',
  colors: {
    gold: '#FFD700',
    primary: '#8B6914',
    secondary: '#CD853F',
    cream: '#FFFACD',
    accent: '#006400',
    darkBrown: '#3D2914',
    sand: '#F4E6C8',
    bronze: '#CD7F32',
    goldLight: '#FFEAA7',
  },
  heroGradient:
    'linear-gradient(180deg, rgba(139, 105, 20, 0.95) 0%, rgba(205, 133, 63, 0.85) 50%, rgba(61, 41, 20, 0.9) 100%)',
  navGradient:
    'linear-gradient(90deg, #8B6914, #CD853F, #8B6914)',
  sectionBorderGradient:
    'linear-gradient(90deg, #FFD700, #8B6914, #FFD700)',
};

export const themes: Record<string, TopicTheme> = {
  'ancient-egypt': ancientEgyptTheme,
  'ancient-rome': ancientRomeTheme,
  'persian-empire': persianEmpireTheme,
  'chinese-dynasties': chineseDynastiesTheme,
  'inca-empire': incaEmpireTheme,
  'mali-empire': maliEmpireTheme,
};

export function getTheme(themeId: string): TopicTheme | undefined {
  return themes[themeId];
}
