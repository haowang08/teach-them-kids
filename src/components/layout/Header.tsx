import { useMemo, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress';
import { clearStoredUsername } from '../../lib/cloudSync';

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
  const { xp, username, setUsername } = useProgress();
  const { current, next, progressToNext } = useMemo(() => getLevelInfo(xp), [xp]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  const handleSwitchUser = () => {
    clearStoredUsername();
    setUsername(null);
    setDropdownOpen(false);
    // Reload to show the username modal again
    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#3D2914] text-[#FFF8E7] flex items-center justify-between px-4 shadow-lg">
      {/* App title */}
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <span className="text-xl font-[family-name:var(--font-heading)] text-[#C9A227] tracking-wide">
            Keep 'em curious
          </span>
        </Link>
        {/* Info icon with tooltip */}
        <div className="relative group">
          <button
            className="w-5 h-5 rounded-full bg-[#5a3d1f] text-[#C9A227] text-xs font-bold
              flex items-center justify-center hover:bg-[#6a4d2f] transition-colors cursor-help"
            aria-label="About this site"
          >
            i
          </button>
          <div className="absolute left-0 top-full mt-2 bg-[#3D2914] border border-[#C9A227]/40
            rounded-lg shadow-xl p-3 min-w-[200px] z-50 opacity-0 invisible
            group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <p className="text-xs text-[#C9A227] font-[family-name:var(--font-heading)] mb-1">
              an Olivo e Biscotto production.
            </p>
            <p className="text-[10px] text-[#F5E6A3] mb-1">
              contribute / pay what you want @curiouskidsdotfun on Venmo.
            </p>
            <p className="text-[10px] text-[#CD7F32]">
              Feedback or see something wrong? Contact us at{' '}
              <a
                href="mailto:info@padna.app"
                className="text-[#F5E6A3] hover:text-white underline underline-offset-2"
              >
                info@padna.app
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* XP display */}
      <div className="flex items-center gap-3">
        {/* Username badge */}
        {username && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="flex items-center gap-1 bg-[#5a3d1f] rounded-full px-2.5 py-1 text-xs
                text-[#F5E6A3] font-semibold hover:bg-[#6a4d2f] transition-colors cursor-pointer"
            >
              <span role="img" aria-label="user">👤</span>
              <span className="max-w-[80px] truncate">{username}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1 bg-[#3D2914] border border-[#C9A227]/40
                rounded-lg shadow-xl py-1 min-w-[140px] z-50">
                <button
                  onClick={handleSwitchUser}
                  className="w-full text-left px-3 py-2 text-xs text-[#F5E6A3] hover:bg-[#5a3d1f]
                    transition-colors cursor-pointer"
                >
                  Switch User
                </button>
              </div>
            )}
          </div>
        )}

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
