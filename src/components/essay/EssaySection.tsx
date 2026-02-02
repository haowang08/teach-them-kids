'use client';

import { useState, useCallback } from 'react';
import type { Essay } from '../../data/types';
import { useProgress } from '../../hooks/useProgress';
import CharCounter from './CharCounter';
import SpeechInput from './SpeechInput';

interface EssaySectionProps {
  essay: Essay;
  topicId: string;
}

export default function EssaySection({ essay, topicId }: EssaySectionProps) {
  const { recordEssaySave, getTopicProgress } = useProgress();
  const topicProgress = getTopicProgress(topicId);

  const [text, setText] = useState(topicProgress.essayText || '');
  const [saved, setSaved] = useState(topicProgress.essaySubmitted);

  const charCount = text.length;
  const meetsMinimum = charCount >= essay.minCharacters;

  const handleSave = useCallback(() => {
    if (!meetsMinimum) return;
    recordEssaySave(topicId, text, charCount);
    setSaved(true);
  }, [meetsMinimum, recordEssaySave, topicId, text, charCount]);

  const handleTranscript = useCallback((transcript: string) => {
    setText((prev) => {
      const needsSpace = prev.length > 0 && !prev.endsWith(' ');
      return prev + (needsSpace ? ' ' : '') + transcript;
    });
    setSaved(false);
  }, []);

  return (
    <section id="essay" className="my-8">
      <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-5 md:p-8 shadow-sm overflow-hidden relative">
        {/* Top border */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
          style={{ background: 'var(--topic-section-border-gradient)' }}
        />

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl" aria-hidden="true">&#9997;&#65039;</span>
          <h2 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--topic-primary)]">
            Your Turn to Write!
          </h2>
        </div>

        {/* Prompt */}
        <p className="text-base text-[var(--topic-dark-brown)] mb-2 font-semibold">
          {essay.prompt}
        </p>
        <p className="text-sm text-[var(--topic-dark-brown)]/70 mb-4">
          {essay.description}
        </p>

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setSaved(false);
          }}
          placeholder="Start writing your thoughts here..."
          rows={8}
          className="w-full rounded-xl border-2 border-[var(--topic-bronze)]/30 bg-white px-4 py-3 text-base text-[var(--topic-dark-brown)] leading-relaxed placeholder:text-[var(--topic-bronze)]/40 focus:outline-none focus:border-[var(--topic-gold)] focus:ring-2 focus:ring-[var(--topic-gold)]/20 resize-y"
        />

        {/* Char counter */}
        <CharCounter current={charCount} min={essay.minCharacters} />

        {/* Controls */}
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <SpeechInput onTranscript={handleTranscript} />

          <button
            onClick={handleSave}
            disabled={!meetsMinimum}
            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 cursor-pointer ${
              meetsMinimum
                ? 'bg-[var(--topic-gold)] text-white hover:opacity-90 active:scale-95 shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            Save My Writing
          </button>
        </div>

        {/* Success message */}
        {saved && (
          <div className="mt-4 rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-700 font-semibold">
            {essay.successMessage}
          </div>
        )}
      </div>
    </section>
  );
}
