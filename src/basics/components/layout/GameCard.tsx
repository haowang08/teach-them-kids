import type { GameMeta, GameProgress } from '../../types';

const FONT = "'Fredoka', 'Nunito', system-ui, sans-serif";

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
        padding: '22px 18px',
        minWidth: 260,
        maxWidth: 300,
        cursor: 'pointer',
        fontFamily: FONT,
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
      <div style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 4 }}>{game.name}</div>
      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 10, lineHeight: 1.4 }}>
        {game.description}
      </div>

      {/* Star progress */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 6, padding: '0 4px' }}>
        <span style={{ fontSize: '0.85rem' }}>{'\u2B50'}</span>
        <div style={{
          flex: '1 1 auto',
          maxWidth: 140,
          height: 8,
          borderRadius: 4,
          background: 'rgba(255,255,255,0.15)',
          overflow: 'hidden',
        }}>
          <div style={{
            width: maxStars > 0 ? `${(totalStars / maxStars) * 100}%` : '0%',
            height: '100%',
            borderRadius: 4,
            background: 'linear-gradient(90deg, #FFD700, #FFA000)',
            transition: 'width 0.3s ease',
          }} />
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.8, whiteSpace: 'nowrap' }}>
          {totalStars}/{maxStars}
        </span>
      </div>

      {/* Level badge */}
      <div style={{
        fontSize: '0.8rem',
        fontWeight: 700,
        background: 'rgba(255,255,255,0.15)',
        borderRadius: 8,
        padding: '3px 8px',
        display: 'inline-block',
      }}>
        Level {currentLevel + 1} / {game.levelCount}
      </div>

      {/* Category badge */}
      <div style={{
        fontSize: '0.75rem',
        fontWeight: 700,
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
