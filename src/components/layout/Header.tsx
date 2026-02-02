import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress';

/** Level thresholds and titles */
const LEVELS = [
  { xp: 0, title: 'Explorer' },
  { xp: 1000, title: 'Curious Learner' },
  { xp: 2000, title: 'History Detective' },
  { xp: 3000, title: 'Ancient Scholar' },
  { xp: 5000, title: 'Time Traveler' },
  { xp: 8000, title: 'Legendary Historian' },
] as const;

function getLevelInfo(xp: number) {
  let current: (typeof LEVELS)[number] = LEVELS[0];
  let next: (typeof LEVELS)[number] | null = LEVELS[1];

  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xp) {
      current = LEVELS[i];
      next = LEVELS[i + 1] ?? null;
      break;
    }
  }

  const progressToNext = next
    ? ((xp - current.xp) / (next.xp - current.xp)) * 100
    : 100;

  return { current, next, progressToNext: Math.min(progressToNext, 100) };
}

export default function Header() {
  const { xp } = useProgress();
  const { current, next, progressToNext } = useMemo(() => getLevelInfo(xp), [xp]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#3D2914] text-[#FFF8E7] flex items-center justify-between px-4 shadow-lg">
      {/* App title */}
      <Link to="/" className="flex items-center gap-2 no-underline">
        <span className="text-xl font-[family-name:var(--font-heading)] text-[#C9A227] tracking-wide">
          Kids Learn Everything
        </span>
      </Link>

      {/* XP display */}
      <div className="flex items-center gap-3">
        {/* Level title */}
        <span className="hidden sm:inline text-xs text-[#F5E6A3] font-semibold">
          {current.title}
        </span>

        {/* XP bar */}
        <div className="flex items-center gap-2">
          <div className="w-24 sm:w-32 h-2.5 bg-[#5a3d1f] rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#C9A227] to-[#F5E6A3] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressToNext}%` }}
            />
          </div>
          {next && (
            <span className="text-[10px] text-[#CD7F32] whitespace-nowrap hidden sm:inline">
              {next.xp - xp} to {next.title}
            </span>
          )}
        </div>

        {/* Gold coin + XP count */}
        <div className="flex items-center gap-1 bg-[#5a3d1f] rounded-full px-3 py-1">
          <span className="text-base leading-none" role="img" aria-label="gold coin">
            🪙
          </span>
          <span className="text-sm font-bold text-[#C9A227] tabular-nums">
            {xp.toLocaleString()} XP
          </span>
        </div>
      </div>
    </header>
  );
}
