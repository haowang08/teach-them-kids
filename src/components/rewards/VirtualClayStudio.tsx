import { useState } from 'react';

// ============================================
// TYPES
// ============================================

type ShapeKind = 'sphere' | 'cylinder' | 'cone';

interface ClayShape {
  id: number;
  kind: ShapeKind;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  colorName: string;
}

type ChallengeId = 'vase' | 'animal' | 'abstract' | 'free';

interface Challenge {
  id: ChallengeId;
  title: string;
  description: string;
  targetShapes: string;
  hint: string;
  minShapes: number;
  needsVariety: boolean;
}

type GamePhase = 'menu' | 'sculpting' | 'rating';

// ============================================
// CONSTANTS
// ============================================

const CLAY_COLORS: { name: string; value: string; gradient: string }[] = [
  {
    name: 'Terracotta',
    value: '#b5543a',
    gradient: 'radial-gradient(circle at 35% 35%, #d4785e, #b5543a 50%, #8a3a24 100%)',
  },
  {
    name: 'White Marble',
    value: '#e8e4df',
    gradient: 'radial-gradient(circle at 35% 35%, #ffffff, #e8e4df 50%, #c9c4bc 100%)',
  },
  {
    name: 'Gray Stone',
    value: '#8a8a8a',
    gradient: 'radial-gradient(circle at 35% 35%, #b0b0b0, #8a8a8a 50%, #5e5e5e 100%)',
  },
  {
    name: 'Bronze',
    value: '#b8860b',
    gradient: 'radial-gradient(circle at 35% 35%, #daa520, #b8860b 50%, #8b6508 100%)',
  },
  {
    name: 'Blue Ceramic',
    value: '#4a7fb5',
    gradient: 'radial-gradient(circle at 35% 35%, #6fa8dc, #4a7fb5 50%, #2e5a82 100%)',
  },
  {
    name: 'Green Jade',
    value: '#4a8a5e',
    gradient: 'radial-gradient(circle at 35% 35%, #6fb87e, #4a8a5e 50%, #2e6a3e 100%)',
  },
];

const CHALLENGES: Challenge[] = [
  {
    id: 'vase',
    title: 'Ancient Vase',
    description: 'Stack shapes to make a beautiful vase!',
    targetShapes: 'Try: cylinder (base) + sphere (body) + cylinder (neck)',
    hint: 'Start with a cylinder at the bottom, add a wide sphere, then a thin cylinder on top.',
    minShapes: 3,
    needsVariety: true,
  },
  {
    id: 'animal',
    title: 'Animal Figure',
    description: 'Sculpt a simple animal like a cat or dog!',
    targetShapes: 'Try: sphere (head) + cylinder (body) + cylinders (legs)',
    hint: 'Use a sphere for the head, a stretched cylinder for the body, and small cylinders for legs.',
    minShapes: 4,
    needsVariety: true,
  },
  {
    id: 'abstract',
    title: 'Abstract Art',
    description: 'Create a wild abstract sculpture with 5+ shapes!',
    targetShapes: 'Use any combination of 5 or more shapes',
    hint: 'Mix different shapes, colors, and sizes. There are no rules in abstract art!',
    minShapes: 5,
    needsVariety: false,
  },
];

const SCULPTURE_FACTS: string[] = [
  'Michelangelo said he saw the angel in the marble and carved until he set it free!',
  'Auguste Rodin, who made "The Thinker", often left parts of his sculptures rough on purpose.',
  'The ancient Greeks painted their marble statues in bright colors - they weren\'t always white!',
  'The Statue of Liberty is one of the tallest sculptures ever made - over 300 feet tall!',
  'Chinese terracotta warriors were each sculpted with unique faces - no two are alike!',
  'Alexander Calder invented "mobiles" - sculptures that move with the wind!',
  'Louise Bourgeois made giant spider sculptures to honor her mother, who was a weaver.',
  'In Japan, there is an art called Kintsugi where broken pottery is repaired with gold!',
];

const WORKSPACE_W = 500;
const WORKSPACE_H = 400;

// ============================================
// HELPERS
// ============================================

function getRandomFact(): string {
  return SCULPTURE_FACTS[Math.floor(Math.random() * SCULPTURE_FACTS.length)];
}

function rateResult(shapes: ClayShape[], challenge: Challenge): { stars: number; message: string } {
  const count = shapes.length;
  const kinds = new Set(shapes.map((s) => s.kind));
  const colors = new Set(shapes.map((s) => s.colorName));

  if (count === 0) return { stars: 1, message: 'Try adding some shapes next time!' };

  let score = 0;
  if (count >= challenge.minShapes) score += 2;
  else if (count >= Math.ceil(challenge.minShapes / 2)) score += 1;

  if (kinds.size >= 2) score += 1;
  if (colors.size >= 2) score += 1;
  if (count >= challenge.minShapes + 2) score += 1;

  const stars = Math.min(5, Math.max(1, score));

  const messages = [
    'Keep practicing - every sculptor starts somewhere!',
    'Nice start! You are learning to sculpt!',
    'Good work! Your sculpture is taking shape!',
    'Great job! You have real artistic talent!',
    'Amazing! You sculpt like a true master artist!',
  ];

  return { stars, message: messages[stars - 1] };
}

// ============================================
// SILHOUETTE COMPONENTS
// ============================================

function VaseSilhouette() {
  return (
    <div style={{ position: 'relative', width: 80, height: 100, opacity: 0.25 }}>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 15,
          width: 50,
          height: 20,
          borderRadius: 6,
          background: '#6b4e3d',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 15,
          left: 5,
          width: 70,
          height: 50,
          borderRadius: '50%',
          background: '#6b4e3d',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 25,
          width: 30,
          height: 30,
          borderRadius: 6,
          background: '#6b4e3d',
        }}
      />
    </div>
  );
}

function AnimalSilhouette() {
  return (
    <div style={{ position: 'relative', width: 110, height: 80, opacity: 0.25 }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 35,
          height: 35,
          borderRadius: '50%',
          background: '#6b4e3d',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 25,
          width: 65,
          height: 30,
          borderRadius: 12,
          background: '#6b4e3d',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 30,
          width: 12,
          height: 25,
          borderRadius: 4,
          background: '#6b4e3d',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 70,
          width: 12,
          height: 25,
          borderRadius: 4,
          background: '#6b4e3d',
        }}
      />
    </div>
  );
}

function AbstractSilhouette() {
  return (
    <div
      style={{
        width: 80,
        height: 80,
        opacity: 0.25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 40,
        color: '#6b4e3d',
      }}
    >
      ?
    </div>
  );
}

// ============================================
// SHAPE RENDERER
// ============================================

function renderShape(shape: ClayShape, index: number) {
  const colorDef = CLAY_COLORS.find((c) => c.name === shape.colorName);
  const grad = colorDef?.gradient ?? `radial-gradient(circle at 35% 35%, ${shape.color}, ${shape.color})`;

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    left: shape.x,
    top: shape.y,
    width: shape.width,
    height: shape.height,
    background: grad,
    boxShadow: `3px 4px 8px rgba(0,0,0,0.35), inset -2px -2px 6px rgba(0,0,0,0.15), inset 2px 2px 6px rgba(255,255,255,0.2)`,
    transition: 'width 0.2s, height 0.2s',
    cursor: 'default',
    zIndex: index + 1,
  };

  if (shape.kind === 'sphere') {
    return (
      <div
        key={shape.id}
        style={{
          ...baseStyle,
          borderRadius: '50%',
        }}
      />
    );
  }

  if (shape.kind === 'cylinder') {
    return (
      <div
        key={shape.id}
        style={{
          ...baseStyle,
          borderRadius: `${Math.min(shape.width, shape.height) * 0.3}px`,
        }}
      />
    );
  }

  // cone - use clip-path for triangle
  return (
    <div
      key={shape.id}
      style={{
        ...baseStyle,
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        borderRadius: 0,
      }}
    />
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function VirtualClayStudio() {
  const [phase, setPhase] = useState<GamePhase>('menu');
  const [currentChallenge, setCurrentChallenge] = useState<ChallengeId>('free');
  const [shapes, setShapes] = useState<ClayShape[]>([]);
  const [selectedColor, setSelectedColor] = useState(CLAY_COLORS[0]);
  const [selectedTool, setSelectedTool] = useState<ShapeKind | 'stretch' | 'squash' | 'remove'>('sphere');
  const [nextId, setNextId] = useState(1);
  const [rating, setRating] = useState<{ stars: number; message: string } | null>(null);
  const [fact, setFact] = useState('');
  const [showHint, setShowHint] = useState(false);

  // ---- handlers ----

  function startChallenge(id: ChallengeId) {
    setCurrentChallenge(id);
    setShapes([]);
    setNextId(1);
    setPhase('sculpting');
    setRating(null);
    setFact('');
    setShowHint(false);
    setSelectedTool('sphere');
  }

  function handleWorkspaceClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedTool === 'stretch') {
      setShapes((prev) => {
        if (prev.length === 0) return prev;
        const copy = [...prev];
        const last = { ...copy[copy.length - 1] };
        last.height = Math.min(200, last.height + 15);
        copy[copy.length - 1] = last;
        return copy;
      });
      return;
    }

    if (selectedTool === 'squash') {
      setShapes((prev) => {
        if (prev.length === 0) return prev;
        const copy = [...prev];
        const last = { ...copy[copy.length - 1] };
        last.width = Math.min(200, last.width + 15);
        copy[copy.length - 1] = last;
        return copy;
      });
      return;
    }

    if (selectedTool === 'remove') {
      setShapes((prev) => prev.slice(0, -1));
      return;
    }

    // adding a shape
    const kind: ShapeKind = selectedTool;
    const defaultSizes: Record<ShapeKind, { w: number; h: number }> = {
      sphere: { w: 60, h: 60 },
      cylinder: { w: 50, h: 70 },
      cone: { w: 55, h: 65 },
    };

    const sz = defaultSizes[kind];
    const newShape: ClayShape = {
      id: nextId,
      kind,
      x: Math.max(0, Math.min(x - sz.w / 2, WORKSPACE_W - sz.w)),
      y: Math.max(0, Math.min(y - sz.h / 2, WORKSPACE_H - sz.h)),
      width: sz.w,
      height: sz.h,
      color: selectedColor.value,
      colorName: selectedColor.name,
    };

    setShapes((prev) => [...prev, newShape]);
    setNextId((n) => n + 1);
  }

  function handleStretch() {
    setShapes((prev) => {
      if (prev.length === 0) return prev;
      const copy = [...prev];
      const last = { ...copy[copy.length - 1] };
      last.height = Math.min(200, last.height + 15);
      copy[copy.length - 1] = last;
      return copy;
    });
  }

  function handleSquash() {
    setShapes((prev) => {
      if (prev.length === 0) return prev;
      const copy = [...prev];
      const last = { ...copy[copy.length - 1] };
      last.width = Math.min(200, last.width + 15);
      copy[copy.length - 1] = last;
      return copy;
    });
  }

  function handleRemoveLast() {
    setShapes((prev) => prev.slice(0, -1));
  }

  function handleDone() {
    const challenge = CHALLENGES.find((c) => c.id === currentChallenge);
    if (challenge) {
      setRating(rateResult(shapes, challenge));
    } else {
      // free mode
      const freeChallenge: Challenge = {
        id: 'free',
        title: 'Free Sculpt',
        description: '',
        targetShapes: '',
        hint: '',
        minShapes: 1,
        needsVariety: false,
      };
      setRating(rateResult(shapes, freeChallenge));
    }
    setFact(getRandomFact());
    setPhase('rating');
  }

  // ---- renders ----

  const challengeData = CHALLENGES.find((c) => c.id === currentChallenge);

  // TOOL BUTTON
  function toolBtn(
    label: string,
    icon: string,
    tool: ShapeKind | 'stretch' | 'squash' | 'remove',
    onClick?: () => void
  ) {
    const isActive = selectedTool === tool;
    return (
      <button
        key={tool}
        onClick={() => {
          setSelectedTool(tool);
          if (onClick) onClick();
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 12px',
          border: isActive ? '2px solid #8b5e3c' : '2px solid #d4c4a8',
          borderRadius: 10,
          background: isActive
            ? 'linear-gradient(145deg, #c9a96e, #a67c52)'
            : 'linear-gradient(145deg, #f5ead6, #e8d8bc)',
          color: isActive ? '#fff' : '#5a3e28',
          fontWeight: 700,
          fontSize: 13,
          cursor: 'pointer',
          boxShadow: isActive
            ? 'inset 0 2px 4px rgba(0,0,0,0.2)'
            : '0 2px 4px rgba(0,0,0,0.15)',
          transition: 'all 0.15s',
          width: '100%',
          textAlign: 'left' as const,
        }}
      >
        <span style={{ fontSize: 18 }}>{icon}</span>
        {label}
      </button>
    );
  }

  // ============================================
  // MENU PHASE
  // ============================================
  if (phase === 'menu') {
    return (
      <div
        style={{
          background: 'linear-gradient(180deg, #fdf6ec 0%, #f5e6ce 100%)',
          borderRadius: 16,
          padding: 24,
          maxWidth: 650,
          margin: '0 auto',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 42, marginBottom: 4 }}>&#x1f3a8;</div>
          <h2
            style={{
              margin: 0,
              fontSize: 26,
              color: '#5a3e28',
              fontWeight: 800,
            }}
          >
            Virtual Clay Studio
          </h2>
          <p style={{ color: '#8a7050', fontSize: 14, marginTop: 6 }}>
            Shape virtual clay into amazing sculptures!
          </p>
        </div>

        <h3
          style={{
            color: '#6b4e3d',
            fontSize: 16,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          Guided Challenges
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 12,
            marginBottom: 20,
          }}
        >
          {CHALLENGES.map((ch) => (
            <button
              key={ch.id}
              onClick={() => startChallenge(ch.id)}
              style={{
                padding: 16,
                borderRadius: 12,
                border: '2px solid #d4c4a8',
                background: 'linear-gradient(145deg, #fff9f0, #f5ead6)',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <div style={{ marginBottom: 8 }}>
                {ch.id === 'vase' && <VaseSilhouette />}
                {ch.id === 'animal' && <AnimalSilhouette />}
                {ch.id === 'abstract' && <AbstractSilhouette />}
              </div>
              <div
                style={{
                  fontWeight: 700,
                  color: '#5a3e28',
                  fontSize: 14,
                  marginBottom: 4,
                }}
              >
                {ch.title}
              </div>
              <div style={{ color: '#8a7050', fontSize: 12 }}>{ch.description}</div>
            </button>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => startChallenge('free')}
            style={{
              padding: '12px 32px',
              borderRadius: 30,
              border: 'none',
              background: 'linear-gradient(145deg, #8b5e3c, #6b4226)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(107,66,38,0.4)',
              transition: 'transform 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Free Sculpt Mode
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // RATING PHASE
  // ============================================
  if (phase === 'rating') {
    return (
      <div
        style={{
          background: 'linear-gradient(180deg, #fdf6ec 0%, #f5e6ce 100%)',
          borderRadius: 16,
          padding: 24,
          maxWidth: 650,
          margin: '0 auto',
          textAlign: 'center',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h2 style={{ color: '#5a3e28', fontSize: 24, fontWeight: 800, margin: '0 0 8px 0' }}>
          Sculpture Complete!
        </h2>

        {/* mini workspace preview */}
        <div
          style={{
            position: 'relative',
            width: 300,
            height: 200,
            margin: '16px auto',
            background: 'linear-gradient(180deg, #f5ead6 0%, #e8d5b8 100%)',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          {shapes.map((s, i) => {
            const scaled: ClayShape = {
              ...s,
              x: (s.x / WORKSPACE_W) * 300,
              y: (s.y / WORKSPACE_H) * 200,
              width: (s.width / WORKSPACE_W) * 300,
              height: (s.height / WORKSPACE_H) * 200,
            };
            return renderShape(scaled, i);
          })}
        </div>

        {/* stars */}
        {rating && (
          <>
            <div style={{ fontSize: 36, marginBottom: 8 }}>
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  style={{
                    color: i < rating.stars ? '#daa520' : '#d4c4a8',
                    textShadow: i < rating.stars ? '0 0 6px rgba(218,165,32,0.5)' : 'none',
                  }}
                >
                  &#9733;
                </span>
              ))}
            </div>
            <p
              style={{
                color: '#5a3e28',
                fontWeight: 700,
                fontSize: 16,
                margin: '0 0 8px 0',
              }}
            >
              {rating.message}
            </p>
            <p
              style={{
                color: '#8a7050',
                fontSize: 13,
                margin: '0 0 4px 0',
              }}
            >
              Shapes used: {shapes.length} | Types:{' '}
              {[...new Set(shapes.map((s) => s.kind))].join(', ') || 'none'}
            </p>
          </>
        )}

        {/* fun fact */}
        <div
          style={{
            background: 'linear-gradient(145deg, #fff9f0, #f5ead6)',
            border: '2px solid #d4c4a8',
            borderRadius: 12,
            padding: 16,
            margin: '16px 0',
            textAlign: 'left',
          }}
        >
          <div style={{ fontWeight: 700, color: '#6b4e3d', fontSize: 13, marginBottom: 4 }}>
            Fun Sculpture Fact:
          </div>
          <div style={{ color: '#5a3e28', fontSize: 13, lineHeight: 1.5 }}>{fact}</div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => startChallenge(currentChallenge)}
            style={{
              padding: '10px 24px',
              borderRadius: 24,
              border: '2px solid #8b5e3c',
              background: 'transparent',
              color: '#8b5e3c',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
          <button
            onClick={() => setPhase('menu')}
            style={{
              padding: '10px 24px',
              borderRadius: 24,
              border: 'none',
              background: 'linear-gradient(145deg, #8b5e3c, #6b4226)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              boxShadow: '0 3px 8px rgba(107,66,38,0.3)',
            }}
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // SCULPTING PHASE
  // ============================================
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #fdf6ec 0%, #f5e6ce 100%)',
        borderRadius: 16,
        padding: 16,
        maxWidth: 800,
        margin: '0 auto',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 20,
              color: '#5a3e28',
              fontWeight: 800,
            }}
          >
            {challengeData ? challengeData.title : 'Free Sculpt'}
          </h2>
          {challengeData && (
            <p style={{ margin: '2px 0 0 0', color: '#8a7050', fontSize: 12 }}>
              {challengeData.targetShapes}
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {challengeData && (
            <button
              onClick={() => setShowHint((h) => !h)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: '2px solid #d4c4a8',
                background: showHint ? '#f5ead6' : 'transparent',
                color: '#6b4e3d',
                fontWeight: 600,
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
          )}
          <button
            onClick={handleDone}
            style={{
              padding: '6px 18px',
              borderRadius: 20,
              border: 'none',
              background: 'linear-gradient(145deg, #4caf50, #388e3c)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(56,142,60,0.4)',
            }}
          >
            I&#39;m Done!
          </button>
          <button
            onClick={() => setPhase('menu')}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              border: '2px solid #d4c4a8',
              background: 'transparent',
              color: '#8a7050',
              fontWeight: 600,
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            Back
          </button>
        </div>
      </div>

      {/* Hint */}
      {showHint && challengeData && (
        <div
          style={{
            background: '#fff9f0',
            border: '2px dashed #d4c4a8',
            borderRadius: 10,
            padding: '8px 14px',
            marginBottom: 10,
            color: '#6b4e3d',
            fontSize: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 18 }}>&#x1f4a1;</span>
          {challengeData.hint}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        {/* LEFT: Tools */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            minWidth: 140,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#8a7050',
              textTransform: 'uppercase' as const,
              letterSpacing: 1,
              marginBottom: 2,
            }}
          >
            Add Shapes
          </div>
          {toolBtn('Add Sphere', '\u25CF', 'sphere')}
          {toolBtn('Add Cylinder', '\u25AD', 'cylinder')}
          {toolBtn('Add Cone', '\u25B2', 'cone')}

          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#8a7050',
              textTransform: 'uppercase' as const,
              letterSpacing: 1,
              marginTop: 6,
              marginBottom: 2,
            }}
          >
            Modify
          </div>
          <button
            onClick={handleStretch}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 12px',
              border: '2px solid #d4c4a8',
              borderRadius: 10,
              background: 'linear-gradient(145deg, #f5ead6, #e8d8bc)',
              color: '#5a3e28',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              width: '100%',
              textAlign: 'left' as const,
            }}
          >
            <span style={{ fontSize: 18 }}>&#x2195;</span>
            Stretch
          </button>
          <button
            onClick={handleSquash}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 12px',
              border: '2px solid #d4c4a8',
              borderRadius: 10,
              background: 'linear-gradient(145deg, #f5ead6, #e8d8bc)',
              color: '#5a3e28',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              width: '100%',
              textAlign: 'left' as const,
            }}
          >
            <span style={{ fontSize: 18 }}>&#x2194;</span>
            Squash
          </button>
          <button
            onClick={handleRemoveLast}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 12px',
              border: '2px solid #e0a0a0',
              borderRadius: 10,
              background: 'linear-gradient(145deg, #fce8e8, #f0d0d0)',
              color: '#8b3a3a',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              width: '100%',
              textAlign: 'left' as const,
            }}
          >
            <span style={{ fontSize: 18 }}>&#x2716;</span>
            Remove Last
          </button>

          {/* Color picker */}
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#8a7050',
              textTransform: 'uppercase' as const,
              letterSpacing: 1,
              marginTop: 6,
              marginBottom: 2,
            }}
          >
            Clay Color
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 6,
            }}
          >
            {CLAY_COLORS.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                title={c.name}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border:
                    selectedColor.name === c.name
                      ? '3px solid #5a3e28'
                      : '3px solid transparent',
                  background: c.gradient,
                  cursor: 'pointer',
                  boxShadow:
                    selectedColor.name === c.name
                      ? '0 0 0 2px #d4c4a8, 0 2px 6px rgba(0,0,0,0.2)'
                      : '0 2px 4px rgba(0,0,0,0.15)',
                  transition: 'all 0.15s',
                  padding: 0,
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: 11, color: '#8a7050', textAlign: 'center' }}>
            {selectedColor.name}
          </div>
        </div>

        {/* CENTER: Workspace */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Target silhouette if challenge */}
          {challengeData && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 8,
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: 11, color: '#8a7050', fontWeight: 600 }}>Target:</span>
              {challengeData.id === 'vase' && <VaseSilhouette />}
              {challengeData.id === 'animal' && <AnimalSilhouette />}
              {challengeData.id === 'abstract' && <AbstractSilhouette />}
            </div>
          )}

          {/* workspace area */}
          <div
            onClick={handleWorkspaceClick}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: WORKSPACE_W,
              height: WORKSPACE_H,
              margin: '0 auto',
              background: 'linear-gradient(180deg, #f0e4d0 0%, #e8d5b8 60%, #c9a97a 100%)',
              borderRadius: 14,
              overflow: 'hidden',
              cursor: 'crosshair',
              boxShadow:
                'inset 0 2px 10px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.15)',
              border: '2px solid #c9a97a',
            }}
          >
            {/* Wooden table surface at bottom */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 40,
                background:
                  'repeating-linear-gradient(90deg, #b8925a 0px, #c9a06a 8px, #b5894e 16px)',
                borderTop: '2px solid #a07840',
                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.15)',
                zIndex: 0,
              }}
            />

            {/* Workspace label */}
            {shapes.length === 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#b5a48a',
                  fontSize: 14,
                  fontWeight: 600,
                  textAlign: 'center',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              >
                Click anywhere to place a shape!
              </div>
            )}

            {/* Shapes */}
            {shapes.map((s, i) => renderShape(s, i))}
          </div>

          {/* Info bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 8,
              fontSize: 12,
              color: '#8a7050',
              maxWidth: WORKSPACE_W,
              margin: '8px auto 0 auto',
            }}
          >
            <span>
              Shapes: {shapes.length}
              {challengeData ? ` / ${challengeData.minShapes}+ needed` : ''}
            </span>
            <span>
              Tool:{' '}
              {selectedTool === 'sphere'
                ? 'Add Sphere'
                : selectedTool === 'cylinder'
                  ? 'Add Cylinder'
                  : selectedTool === 'cone'
                    ? 'Add Cone'
                    : selectedTool === 'stretch'
                      ? 'Stretch'
                      : selectedTool === 'squash'
                        ? 'Squash'
                        : 'Remove'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
