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

export const themes: Record<string, TopicTheme> = {
  'ancient-egypt': ancientEgyptTheme,
  'ancient-rome': ancientRomeTheme,
};

export function getTheme(themeId: string): TopicTheme | undefined {
  return themes[themeId];
}
