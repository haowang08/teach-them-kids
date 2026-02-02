'use client';

import { useState } from 'react';
import type { RewardAttribution } from '../../data/types';

interface SketchfabEmbedProps {
  embedUrl: string;
  embedTitle: string;
  attribution?: RewardAttribution;
}

export default function SketchfabEmbed({
  embedUrl,
  embedTitle,
  attribution,
}: SketchfabEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="my-4">
      <div
        className="relative w-full overflow-hidden rounded-xl bg-gray-900"
        style={{ maxHeight: '600px', aspectRatio: '16/10' }}
      >
        {!loaded ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <button
              onClick={() => setLoaded(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--topic-gold)] text-white px-6 py-3 font-bold text-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
              Load 3D Model
            </button>
            <p className="text-gray-400 text-sm">{embedTitle}</p>
          </div>
        ) : (
          <iframe
            title={embedTitle}
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
          />
        )}
      </div>

      {/* Attribution */}
      {attribution && (
        <p className="text-xs text-[var(--topic-bronze)] mt-2 text-center">
          <a
            href={attribution.modelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline"
          >
            {attribution.modelName}
          </a>{' '}
          by{' '}
          <a
            href={attribution.authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline"
          >
            {attribution.authorName}
          </a>{' '}
          on{' '}
          <a
            href={attribution.platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline"
          >
            Sketchfab
          </a>
        </p>
      )}
    </div>
  );
}
