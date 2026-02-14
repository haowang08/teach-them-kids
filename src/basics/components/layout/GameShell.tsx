import { useState, useCallback, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGameBySlug } from '../../data/gameRegistry';
import { useBasicsProgress } from '../../hooks/useBasicsProgress';

type GameComponentType = React.LazyExoticComponent<React.ComponentType<{ level: number; onComplete: (accuracy: number) => void; onBack: () => void }>>;

const GAME_COMPONENTS: Record<string, GameComponentType> = {
  // Reading games
  'sound-safari': lazy(() => import('../games/reading/SoundSafari')),
  'word-builder': lazy(() => import('../games/reading/WordBuilder')),
  'phonics-train': lazy(() => import('../games/reading/PhonicsTrain')),
  'sight-word-stars': lazy(() => import('../games/reading/SightWordStars')),
  'story-book': lazy(() => import('../games/reading/StoryBook')),
  'sentence-builder': lazy(() => import('../games/reading/SentenceBuilder')),
  // Math games
  'addition-aquarium': lazy(() => import('../games/math/AdditionAquarium')),
  'subtraction-spaceship': lazy(() => import('../games/math/SubtractionSpaceship')),
  'number-bridge': lazy(() => import('../games/math/NumberBridge')),
  'multiplication-meadow': lazy(() => import('../games/math/MultiplicationMeadow')),
  'division-bakery': lazy(() => import('../games/math/DivisionBakery')),
  'math-mountain': lazy(() => import('../games/math/MathMountain')),
};

export default function GameShell() {
  const { gameSlug } = useParams<{ gameSlug: string }>();
  const navigate = useNavigate();
  const { getGameProgress, completeLevel } = useBasicsProgress();

  const game = gameSlug ? getGameBySlug(gameSlug) : undefined;
  const progress = game ? getGameProgress(game.id) : undefined;
  const currentLevel = progress?.currentLevel ?? 0;
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const handleBack = useCallback(() => {
    if (selectedLevel !== null) {
      setSelectedLevel(null);
    } else {
      navigate('/basics');
    }
  }, [selectedLevel, navigate]);

  const handleComplete = useCallback((accuracy: number) => {
    if (game && selectedLevel !== null) {
      completeLevel(game.id, selectedLevel, accuracy);
      setSelectedLevel(null);
    }
  }, [game, selectedLevel, completeLevel]);

  if (!game) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#FFFFFF', fontFamily: "'Comic Sans MS', cursive" }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>{'\uD83E\uDD14'}</div>
        <h2>Game not found!</h2>
        <button onClick={() => navigate('/basics')} style={backBtnStyle}>Back to Games</button>
      </div>
    );
  }

  const GameComponent = GAME_COMPONENTS[game.slug];

  // Level selector (when no level selected or game not yet built)
  if (selectedLevel === null || !GameComponent) {
    return (
      <div style={{ padding: '20px 16px', maxWidth: 480, margin: '0 auto' }}>
        <button onClick={handleBack} style={backBtnStyle}>{'\u2190'} Back</button>

        <div style={{ textAlign: 'center', marginTop: 12, marginBottom: 20 }}>
          <div style={{ fontSize: '3.5rem', marginBottom: 8 }}>{game.icon}</div>
          <h2 style={{
            fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
            fontSize: '1.6rem',
            color: '#FFFFFF',
            margin: '0 0 4px',
          }}>{game.name}</h2>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>{game.description}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {game.levels.map((lvl) => {
            const locked = lvl.level - 1 > currentLevel;
            const lvlProgress = progress?.levels[lvl.level - 1];
            const stars = lvlProgress?.stars ?? 0;
            return (
              <button
                key={lvl.level}
                disabled={locked}
                onClick={() => !locked && setSelectedLevel(lvl.level - 1)}
                style={{
                  background: locked ? 'rgba(255,255,255,0.05)' : `${game.color}33`,
                  border: `2px solid ${locked ? 'rgba(255,255,255,0.1)' : game.color}`,
                  borderRadius: 14,
                  padding: '14px 18px',
                  cursor: locked ? 'default' : 'pointer',
                  opacity: locked ? 0.4 : 1,
                  fontFamily: "'Comic Sans MS', cursive",
                  color: '#FFFFFF',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'transform 0.15s ease',
                }}
                onMouseEnter={(e) => { if (!locked) e.currentTarget.style.transform = 'scale(1.03)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>
                    {locked ? '\uD83D\uDD12' : ''} Level {lvl.level}: {lvl.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
                    {lvl.description}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} style={{ fontSize: '1rem', opacity: i < stars ? 1 : 0.2 }}>{'\u2B50'}</span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {!GameComponent && (
          <div style={{
            textAlign: 'center',
            marginTop: 20,
            padding: '16px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 12,
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.8rem',
            fontFamily: "'Comic Sans MS', cursive",
          }}>
            {'\uD83D\uDEA7'} This game is coming soon!
          </div>
        )}
      </div>
    );
  }

  // Render the actual game
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Suspense fallback={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#FFFFFF', fontFamily: "'Comic Sans MS', cursive", fontSize: '1.2rem' }}>
          Loading game...
        </div>
      }>
        <GameComponent level={selectedLevel} onComplete={handleComplete} onBack={handleBack} />
      </Suspense>
    </div>
  );
}

const backBtnStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.1)',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: 8,
  padding: '6px 14px',
  color: 'rgba(255,255,255,0.7)',
  fontSize: '0.8rem',
  cursor: 'pointer',
  fontFamily: "'Comic Sans MS', cursive",
};
