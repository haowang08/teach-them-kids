import type { Topic, TopicTheme } from '../../data/types';

interface TopicHeroProps {
  topic: Topic;
  theme?: TopicTheme;
}

export default function TopicHero({ topic }: TopicHeroProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ background: 'var(--topic-hero-gradient)' }}
    >
      {/* Floating emoji icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {topic.heroIcons.map((icon, i) => (
          <span
            key={i}
            className="animate-float absolute text-4xl md:text-5xl opacity-20"
            style={{
              left: `${15 + i * 30}%`,
              top: `${20 + (i % 2) * 30}%`,
              animationDelay: `${i * 0.7}s`,
            }}
          >
            {icon}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 md:py-20 text-center">
        {/* Hero icons row */}
        <div className="flex justify-center gap-3 mb-4">
          {topic.heroIcons.map((icon, i) => (
            <span key={i} className="text-3xl md:text-4xl animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
              {icon}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1
          className="font-[family-name:var(--font-heading)] text-[var(--topic-gold)] font-bold mb-3"
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 3rem)',
            lineHeight: 1.2,
          }}
        >
          {topic.title}
        </h1>

        {/* Subtitle */}
        <p
          className="font-[family-name:var(--font-heading)] text-[var(--topic-sand)] max-w-2xl mx-auto"
          style={{
            fontSize: 'clamp(0.875rem, 2.5vw, 1.25rem)',
            lineHeight: 1.5,
          }}
        >
          {topic.subtitle}
        </p>
      </div>
    </div>
  );
}
