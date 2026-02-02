'use client';

import { useEffect, useRef, useState } from 'react';
import type { CharacterData } from '../../data/types';

interface CharacterCardProps {
  character: CharacterData;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`hover-lift rounded-xl border-2 border-[var(--topic-primary)]/20 bg-white p-5 shadow-sm transition-all duration-500 ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6'
      }`}
    >
      {/* Emoji icon */}
      <div className="text-4xl mb-3">{character.emoji}</div>

      {/* Name */}
      <h4 className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--topic-primary)] mb-1">
        {character.name}
      </h4>

      {/* Title */}
      <p className="text-sm font-semibold text-[var(--topic-bronze)] mb-2">
        {character.title}
      </p>

      {/* Extra tag badge */}
      {character.extraTag && (
        <span className="inline-block rounded-full bg-[var(--topic-gold-light)] text-[var(--topic-dark-brown)] text-xs font-semibold px-2.5 py-0.5 mb-2">
          {character.extraTag}
        </span>
      )}

      {/* Description */}
      <p className="text-sm text-[var(--topic-dark-brown)] leading-relaxed">
        {character.description}
      </p>
    </div>
  );
}
