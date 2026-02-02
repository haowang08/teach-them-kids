import { useMemo } from 'react';
import type { TopicTheme } from '../data/types';
import { getTheme } from '../lib/themes';

interface UseThemeResult {
  theme: TopicTheme | undefined;
  themeStyle: React.CSSProperties;
}

export function useTheme(themeId: string): UseThemeResult {
  const theme = useMemo(() => getTheme(themeId), [themeId]);

  const themeStyle = useMemo((): React.CSSProperties => {
    if (!theme) return {};

    return {
      '--topic-gold': theme.colors.gold,
      '--topic-primary': theme.colors.primary,
      '--topic-secondary': theme.colors.secondary,
      '--topic-cream': theme.colors.cream,
      '--topic-accent': theme.colors.accent,
      '--topic-dark-brown': theme.colors.darkBrown,
      '--topic-sand': theme.colors.sand,
      '--topic-bronze': theme.colors.bronze,
      '--topic-gold-light': theme.colors.goldLight,
      '--topic-hero-gradient': theme.heroGradient,
      '--topic-nav-gradient': theme.navGradient,
      '--topic-section-border-gradient': theme.sectionBorderGradient,
    } as React.CSSProperties;
  }, [theme]);

  return { theme, themeStyle };
}
