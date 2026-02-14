import type { GameMeta, GameProgress } from '../../types';

interface GameCardProps {
  game: GameMeta;
  progress?: GameProgress;
  onClick: () => void;
}

export default function GameCard({ game, progress, onClick }: GameCardProps) {
  const totalStars = progress
    ? Object.values(progress.levels).reduce((sum, lp) => sum + lp.stars, 0)
    : 0;
  const maxStars = game.levelCount * 3;
  const currentLevel = progress?.currentLevel ?? 0;

  return (
    <button
      onClick={onClick}
      style={{
        background: `linear-gradient(145deg, ${game.color}22, ${game.color}44)`,
        border: `3px solid ${game.color}88`,
        borderRadius: 20,
        padding: '20px 16px',
        minWidth: 200,
        maxWidth: 220,
        cursor: 'pointer',
        fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
        color: '#FFFFFF',
        textAlign: 'center',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        scrollSnapAlign: 'center',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.06)';
        e.currentTarget.style.boxShadow = `0 8px 24px ${game.color}44`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ fontSize: '3rem', marginBottom: 8 }}>{game.icon}</div>
      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: 4 }}>{game.name}</div>
      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', marginBottom: 10, lineHeight: 1.4 }}>
        {game.description}
      </div>

      {/* Star progress */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 6 }}>
        {Array.from({ length: maxStars }, (_, i) => (
          <span key={i} style={{ fontSize: '0.7rem', opacity: i < totalStars ? 1 : 0.25 }}>
            {'\u2B50'}
          </span>
        ))}
      </div>

      {/* Level badge */}
      <div style={{
        fontSize: '0.65rem',
        background: 'rgba(255,255,255,0.15)',
        borderRadius: 8,
        padding: '3px 8px',
        display: 'inline-block',
      }}>
        Level {currentLevel + 1} / {game.levelCount}
      </div>

      {/* Category badge */}
      <div style={{
        fontSize: '0.6rem',
        marginTop: 6,
        color: game.category === 'reading' ? '#81D4FA' : '#A5D6A7',
        textTransform: 'uppercase',
        letterSpacing: 1,
      }}>
        {game.category}
      </div>
    </button>
  );
}
