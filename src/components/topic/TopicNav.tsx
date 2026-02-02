'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { NavItem } from '../../data/types';

interface TopicNavProps {
  items: NavItem[];
}

export default function TopicNav({ items }: TopicNavProps) {
  const [activeId, setActiveId] = useState<string>('');
  const navRef = useRef<HTMLElement>(null);

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const sectionElements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Pick the one closest to top
          const topEntry = visibleEntries.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0.1,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Auto-scroll active pill into view
  useEffect(() => {
    if (!navRef.current || !activeId) return;
    const activeButton = navRef.current.querySelector(`[data-nav-id="${activeId}"]`);
    if (activeButton) {
      activeButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeId]);

  return (
    <nav
      ref={navRef}
      className="sticky top-14 z-30 overflow-x-auto scrollbar-hide"
      style={{ background: 'var(--topic-nav-gradient)' }}
    >
      <div className="max-w-4xl mx-auto flex items-center gap-2 px-4 py-2">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              data-nav-id={item.id}
              onClick={() => handleClick(item.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-white/25 text-white shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="text-base" aria-hidden="true">{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
