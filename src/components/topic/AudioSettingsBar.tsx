'use client';

import { useState } from 'react';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';

export default function AudioSettingsBar() {
  const {
    availableVoices,
    selectedVoice,
    setSelectedVoice,
    rate,
    setRate,
    isPlaying,
    stop,
  } = useTextToSpeech();

  const [expanded, setExpanded] = useState(false);

  function handleVoiceChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const voice = availableVoices.find((v) => v.name === e.target.value);
    if (voice) setSelectedVoice(voice);
  }

  function handleRateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRate(parseFloat(e.target.value));
  }

  return (
    <div className="sticky top-14 z-30 bg-[var(--topic-cream)] border-b border-[var(--topic-bronze)]/20">
      {/* Mobile toggle */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="md:hidden w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-[var(--topic-bronze)] cursor-pointer"
        aria-expanded={expanded}
        aria-controls="audio-settings-panel"
      >
        <span className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          Audio Settings
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Settings panel */}
      <div
        id="audio-settings-panel"
        className={`${
          expanded ? 'block' : 'hidden'
        } md:block px-4 py-3 md:py-2`}
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          {/* Voice selector */}
          <label className="flex items-center gap-2 text-sm text-[var(--topic-dark-brown)]">
            <span className="font-semibold text-[var(--topic-bronze)] whitespace-nowrap">
              Voice:
            </span>
            <select
              value={selectedVoice?.name ?? ''}
              onChange={handleVoiceChange}
              className="rounded-lg border border-[var(--topic-bronze)]/30 bg-white px-3 py-1.5 text-sm text-[var(--topic-dark-brown)] focus:outline-none focus:ring-2 focus:ring-[var(--topic-gold)]/50 max-w-[200px]"
            >
              {availableVoices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name}
                </option>
              ))}
            </select>
          </label>

          {/* Speed control */}
          <label className="flex items-center gap-2 text-sm text-[var(--topic-dark-brown)] flex-1 min-w-0">
            <span className="font-semibold text-[var(--topic-bronze)] whitespace-nowrap">
              Speed:
            </span>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.1"
              value={rate}
              onChange={handleRateChange}
              className="w-full max-w-[140px] accent-[var(--topic-bronze)]"
            />
            <span className="text-xs font-mono text-[var(--topic-bronze)] w-8 text-center">
              {rate.toFixed(1)}x
            </span>
          </label>

          {/* Stop reading button */}
          {isPlaying && (
            <button
              onClick={stop}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold bg-[var(--topic-bronze)] text-white hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <rect x="4" y="4" width="16" height="16" rx="2" />
              </svg>
              Stop Reading
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
