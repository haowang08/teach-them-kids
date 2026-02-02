'use client';

import { useState } from 'react';
import type { VideoData } from '../../data/types';

interface VideoEmbedProps {
  video: VideoData;
}

export default function VideoEmbed({ video }: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

  return (
    <div className="my-6">
      <div className="relative w-full overflow-hidden rounded-xl bg-black" style={{ paddingBottom: '56.25%' }}>
        {loaded ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => setLoaded(true)}
            className="absolute inset-0 w-full h-full cursor-pointer group"
            aria-label={`Play video: ${video.title}`}
          >
            {/* Thumbnail */}
            <img
              src={thumbnailUrl}
              alt={video.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[var(--topic-gold)]/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Title and channel */}
      <div className="mt-2 px-1">
        <p className="text-sm font-semibold text-[var(--topic-dark-brown)]">{video.title}</p>
        {video.channelName && (
          <span className="inline-block mt-1 rounded-full bg-[var(--topic-cream)] text-[var(--topic-bronze)] text-xs font-medium px-2.5 py-0.5">
            {video.channelName}
          </span>
        )}
      </div>
    </div>
  );
}
