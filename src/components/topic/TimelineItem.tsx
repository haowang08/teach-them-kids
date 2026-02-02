'use client';

import { useEffect, useRef, useState } from 'react';
import type { TimelineEntry } from '../../data/types';

interface TimelineItemProps {
  entry: TimelineEntry;
  index: number;
}

export default function TimelineItem({ entry, index }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={itemRef}
      className={`relative flex items-start gap-4 transition-all duration-600 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Desktop: alternating layout */}
      <div
        className={`hidden md:flex w-full items-start ${
          isLeft ? 'flex-row' : 'flex-row-reverse'
        }`}
      >
        {/* Content */}
        <div className={`w-5/12 ${isLeft ? 'text-right pr-6' : 'text-left pl-6'}`}>
          <h4 className="text-base font-bold text-[var(--topic-primary)] font-[family-name:var(--font-heading)]">
            {entry.title}
          </h4>
          <p className="text-sm text-[var(--topic-dark-brown)] mt-1 leading-relaxed">
            {entry.description}
          </p>
        </div>

        {/* Year badge (center) */}
        <div className="flex flex-col items-center w-2/12 shrink-0">
          <div className="w-12 h-12 rounded-full bg-[var(--topic-gold)] text-white flex items-center justify-center text-xs font-bold shadow-md z-10">
            {entry.year}
          </div>
          {/* Connecting line segment */}
          <div className="w-0.5 flex-1 bg-[var(--topic-gold)]/30 min-h-[24px]" />
        </div>

        {/* Spacer for the other side */}
        <div className="w-5/12" />
      </div>

      {/* Mobile: all left aligned */}
      <div className="flex md:hidden items-start gap-4 w-full">
        {/* Year badge + line */}
        <div className="flex flex-col items-center shrink-0">
          <div className="w-11 h-11 rounded-full bg-[var(--topic-gold)] text-white flex items-center justify-center text-[10px] font-bold shadow-md z-10">
            {entry.year}
          </div>
          <div className="w-0.5 flex-1 bg-[var(--topic-gold)]/30 min-h-[16px]" />
        </div>

        {/* Content */}
        <div className="flex-1 pb-6">
          <h4 className="text-base font-bold text-[var(--topic-primary)] font-[family-name:var(--font-heading)]">
            {entry.title}
          </h4>
          <p className="text-sm text-[var(--topic-dark-brown)] mt-1 leading-relaxed">
            {entry.description}
          </p>
        </div>
      </div>
    </div>
  );
}
