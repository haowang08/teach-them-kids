import { useNavigate } from 'react-router-dom';
import { GAMES } from '../../data/gameRegistry';
import { useBasicsProgress } from '../../hooks/useBasicsProgress';
import GameCard from './GameCard';

export default function BasicsMapPage() {
  const navigate = useNavigate();
  const { progress } = useBasicsProgress();

  const readingGames = GAMES.filter((g) => g.category === 'reading');
  const mathGames = GAMES.filter((g) => g.category === 'math');

  const totalStars = progress.totalStars;

  return (
    <div style={{ padding: '20px 16px', maxWidth: 960, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: '2.5rem', marginBottom: 4 }}>{'\uD83C\uDF1F'}</div>
        <h1 style={{
          fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
          fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
          color: '#FFFFFF',
          margin: '0 0 6px 0',
        }}>
          Curious Kids
        </h1>
        <div style={{
          fontSize: '0.85rem',
          color: 'rgba(255,255,255,0.6)',
          marginBottom: 8,
        }}>
          {'\u2B50'} {totalStars} stars collected
        </div>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 8,
            padding: '6px 16px',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.75rem',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {'\u2190'} Back to Main
        </button>
      </div>

      {/* Reading row */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{
          fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
          fontSize: '1.1rem',
          color: '#81D4FA',
          marginBottom: 12,
          paddingLeft: 8,
        }}>
          {'\uD83D\uDCD6'} Reading
        </h2>
        <div style={{
          display: 'flex',
          gap: 16,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          padding: '4px 8px 16px',
          WebkitOverflowScrolling: 'touch',
        }}>
          {readingGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              progress={progress.games[game.id]}
              onClick={() => navigate(`/basics/${game.slug}`)}
            />
          ))}
        </div>
      </div>

      {/* Math row */}
      <div>
        <h2 style={{
          fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
          fontSize: '1.1rem',
          color: '#A5D6A7',
          marginBottom: 12,
          paddingLeft: 8,
        }}>
          {'\uD83D\uDCDD'} Math
        </h2>
        <div style={{
          display: 'flex',
          gap: 16,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          padding: '4px 8px 16px',
          WebkitOverflowScrolling: 'touch',
        }}>
          {mathGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              progress={progress.games[game.id]}
              onClick={() => navigate(`/basics/${game.slug}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
