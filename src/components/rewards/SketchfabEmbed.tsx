'use client';

import { useState } from 'react';
import type { RewardAttribution } from '../../data/types';

interface SketchfabEmbedProps {
  embedUrl: string;
  embedTitle: string;
  attribution?: RewardAttribution;
}

const ALLOWED_EMBED_DOMAINS = ['sketchfab.com'];

function isAllowedUrl(url: string, allowedDomains: string[]): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && allowedDomains.some(d => parsed.hostname.endsWith(d));
  } catch {
    return false;
  }
}

function isSafeHttpsUrl(url: string): boolean {
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
}

export default function SketchfabEmbed({
  embedUrl,
  embedTitle,
  attribution,
}: SketchfabEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const safeEmbedUrl = isAllowedUrl(embedUrl, ALLOWED_EMBED_DOMAINS) ? embedUrl : null;

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
        ) : safeEmbedUrl ? (
          <iframe
            title={embedTitle}
            src={safeEmbedUrl}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            sandbox="allow-scripts allow-same-origin allow-popups"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
            Invalid embed URL
          </div>
        )}
      </div>

      {/* Attribution */}
      {attribution && (
        <p className="text-xs text-[var(--topic-bronze)] mt-2 text-center">
          {isSafeHttpsUrl(attribution.modelUrl) ? (
            <a
              href={attribution.modelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              {attribution.modelName}
            </a>
          ) : (
            <span className="font-semibold">{attribution.modelName}</span>
          )}{' '}
          by{' '}
          {isSafeHttpsUrl(attribution.authorUrl) ? (
            <a
              href={attribution.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              {attribution.authorName}
            </a>
          ) : (
            <span className="font-semibold">{attribution.authorName}</span>
          )}{' '}
          on{' '}
          {isSafeHttpsUrl(attribution.platformUrl) ? (
            <a
              href={attribution.platformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              Sketchfab
            </a>
          ) : (
            <span className="font-semibold">Sketchfab</span>
          )}
        </p>
      )}
    </div>
  );
}
