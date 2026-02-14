import { useState, useRef, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

interface FullscreenWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function FullscreenWrapper({ children, className = '' }: FullscreenWrapperProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if native fullscreen is supported
  const supportsFullscreen = typeof document !== 'undefined' && (
    document.fullscreenEnabled ||
    (document as any).webkitFullscreenEnabled
  );

  // Handle native fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement = document.fullscreenElement || (document as any).webkitFullscreenElement;
      setIsFullscreen(!!fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const enterFullscreen = useCallback(async () => {
    const elem = containerRef.current;
    if (!elem) return;

    try {
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        await (elem as any).webkitRequestFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen request failed:', err);
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if ((document as any).webkitFullscreenElement) {
        await (document as any).webkitExitFullscreen();
      }
    } catch (err) {
      console.warn('Exit fullscreen failed:', err);
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  // Don't show fullscreen button if not supported (e.g., iOS Safari for non-video)
  if (!supportsFullscreen) {
    return (
      <div className={`relative ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={isFullscreen ? {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
      } : undefined}
    >
      {/* Fullscreen toggle button */}
      <button
        onClick={toggleFullscreen}
        className={`absolute z-10 p-2 rounded-lg bg-black/60 text-white
          hover:bg-black/80 transition-colors backdrop-blur-sm
          ${isFullscreen ? 'top-4 right-4' : 'top-2 right-2'}`}
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        title={isFullscreen ? 'Exit fullscreen (Esc)' : 'Enter fullscreen'}
      >
        {isFullscreen ? (
          // Exit fullscreen icon (compress arrows)
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 14h6v6" />
            <path d="M20 10h-6V4" />
            <path d="M14 10l7-7" />
            <path d="M3 21l7-7" />
          </svg>
        ) : (
          // Enter fullscreen icon (expand arrows)
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3" />
            <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
            <path d="M3 16v3a2 2 0 0 0 2 2h3" />
            <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
          </svg>
        )}
      </button>

      {/* Content wrapper */}
      <div
        className={isFullscreen ? 'w-full h-full flex items-center justify-center' : 'w-full'}
      >
        {children}
      </div>
    </div>
  );
}
