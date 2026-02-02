import { useProgress } from '../../hooks/useProgress';

// XP thresholds for levels
const LEVELS = [
  { name: 'Curious Kitten', minXp: 0 },
  { name: 'Eager Explorer', minXp: 200 },
  { name: 'Knowledge Knight', minXp: 500 },
  { name: 'Wisdom Wizard', minXp: 1000 },
  { name: 'Grand Scholar', minXp: 2000 },
  { name: 'Legendary Learner', minXp: 5000 },
];

function getLevelInfo(xp: number) {
  let currentLevel = LEVELS[0];
  let nextLevel = LEVELS[1];

  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXp) {
      currentLevel = LEVELS[i];
      nextLevel = LEVELS[i + 1] || null;
      break;
    }
  }

  const progressToNext = nextLevel
    ? ((xp - currentLevel.minXp) / (nextLevel.minXp - currentLevel.minXp)) * 100
    : 100;

  return { currentLevel, nextLevel, progressToNext };
}

export default function ProgressSummary() {
  const { xp, getCurriculumCompletion } = useProgress();
  const curriculumCompletion = getCurriculumCompletion();
  const { currentLevel, nextLevel, progressToNext } = getLevelInfo(xp);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gold-light/50 p-4 md:p-6 max-w-lg mx-auto">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* XP */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">&#129689;</span>
          <div>
            <div className="text-lg md:text-xl font-extrabold text-gold">{xp} XP</div>
            <div className="text-[11px] text-dark-brown/60 font-semibold uppercase tracking-wide">
              Total Earned
            </div>
          </div>
        </div>

        {/* Curriculum completion */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">&#127942;</span>
          <div>
            <div className="text-lg md:text-xl font-extrabold text-dark-brown">
              {curriculumCompletion}%
            </div>
            <div className="text-[11px] text-dark-brown/60 font-semibold uppercase tracking-wide">
              Complete
            </div>
          </div>
        </div>
      </div>

      {/* Level progress */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-bold text-dark-brown">
            &#9876;&#65039; {currentLevel.name}
          </span>
          {nextLevel && (
            <span className="text-xs text-dark-brown/50 font-semibold">
              Next: {nextLevel.name}
            </span>
          )}
        </div>
        <div className="w-full h-2.5 bg-cream rounded-full overflow-hidden border border-gold-light/40">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${Math.min(progressToNext, 100)}%`,
              background: 'linear-gradient(90deg, #C9A227, #CD7F32)',
            }}
          />
        </div>
        {nextLevel && (
          <div className="text-[11px] text-dark-brown/50 mt-1 text-right font-medium">
            {nextLevel.minXp - xp} XP to next level
          </div>
        )}
      </div>
    </div>
  );
}
