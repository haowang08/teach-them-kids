'use client';

import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import type { ReadAloudBlock as ReadAloudBlockData } from '../../data/types';

interface ReadAloudBlockProps {
  block: ReadAloudBlockData;
}

function stripHtml(html: string): string {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent ?? '';
}

export default function ReadAloudBlock({ block }: ReadAloudBlockProps) {
  const { play, pause, resume, isPlaying, isPaused, currentTextId, stop } =
    useTextToSpeech();

  const isThisPlaying = currentTextId === block.id && isPlaying;
  const isThisPaused = currentTextId === block.id && isPaused;

  function handleListenClick() {
    if (isThisPlaying) {
      pause();
    } else if (isThisPaused) {
      resume();
    } else {
      const plainText = block.paragraphs.map(stripHtml).join('\n\n');
      play(block.id, plainText);
    }
  }

  function handleStop() {
    stop();
  }

  return (
    <div
      className="rounded-lg border-l-4 border-l-[var(--topic-gold)] bg-[var(--topic-cream)] p-6 md:p-8 my-4"
      style={{ lineHeight: 2.0 }}
    >
      {block.paragraphs.map((paragraph, i) => (
        <p
          key={i}
          className="mb-4 last:mb-0 text-[var(--topic-dark-brown)] text-base md:text-lg"
          dangerouslySetInnerHTML={{ __html: paragraph }}
        />
      ))}

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleListenClick}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer bg-[var(--topic-gold)] text-white hover:opacity-90 active:scale-95"
          aria-label={isThisPlaying ? 'Pause reading' : 'Listen to this'}
        >
          {isThisPlaying ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
              Pause
            </>
          ) : isThisPaused ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Resume
            </>
          ) : (
            <>
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
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
              Listen to This
            </>
          )}
        </button>

        {(isThisPlaying || isThisPaused) && (
          <button
            onClick={handleStop}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-[var(--topic-bronze)] hover:text-[var(--topic-dark-brown)] transition-colors cursor-pointer"
            aria-label="Stop reading"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect x="4" y="4" width="16" height="16" rx="2" />
            </svg>
            Stop
          </button>
        )}
      </div>
    </div>
  );
}
