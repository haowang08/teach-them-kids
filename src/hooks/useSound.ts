import { useRef, useCallback } from 'react';

let sharedContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (sharedContext && sharedContext.state !== 'closed') return sharedContext;

  const AudioCtx =
    window.AudioContext ?? (window as unknown as Record<string, unknown>).webkitAudioContext;
  if (!AudioCtx) return null;

  sharedContext = new (AudioCtx as typeof AudioContext)();
  return sharedContext;
}

function ensureResumed(ctx: AudioContext): Promise<void> {
  if (ctx.state === 'suspended') {
    return ctx.resume();
  }
  return Promise.resolve();
}

function playTone(
  ctx: AudioContext,
  frequency: number,
  startTime: number,
  duration: number,
  type: OscillatorType = 'sine',
  gainValue: number = 0.3
): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startTime);

  gain.gain.setValueAtTime(gainValue, startTime);
  // Fade out to avoid clicks
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

export function useSound() {
  const initializedRef = useRef(false);

  const lazyInit = useCallback((): AudioContext | null => {
    const ctx = getAudioContext();
    if (ctx && !initializedRef.current) {
      initializedRef.current = true;
      ensureResumed(ctx);
    }
    return ctx;
  }, []);

  const playCorrect = useCallback(() => {
    const ctx = lazyInit();
    if (!ctx) return;
    ensureResumed(ctx).then(() => {
      const now = ctx.currentTime;
      // Bright ascending chime: two quick tones
      playTone(ctx, 523.25, now, 0.15, 'sine', 0.25);         // C5
      playTone(ctx, 659.25, now + 0.1, 0.2, 'sine', 0.3);     // E5
    });
  }, [lazyInit]);

  const playWrong = useCallback(() => {
    const ctx = lazyInit();
    if (!ctx) return;
    ensureResumed(ctx).then(() => {
      const now = ctx.currentTime;
      // Gentle descending boop: single low tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, now);          // E4
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.25); // Slide down to A3

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    });
  }, [lazyInit]);

  const playComplete = useCallback(() => {
    const ctx = lazyInit();
    if (!ctx) return;
    ensureResumed(ctx).then(() => {
      const now = ctx.currentTime;
      // Short fanfare: ascending arpeggio C-E-G-C
      playTone(ctx, 523.25, now, 0.15, 'sine', 0.2);           // C5
      playTone(ctx, 659.25, now + 0.12, 0.15, 'sine', 0.22);   // E5
      playTone(ctx, 783.99, now + 0.24, 0.15, 'sine', 0.25);   // G5
      playTone(ctx, 1046.50, now + 0.36, 0.3, 'sine', 0.3);    // C6
    });
  }, [lazyInit]);

  const playClick = useCallback(() => {
    const ctx = lazyInit();
    if (!ctx) return;
    ensureResumed(ctx).then(() => {
      const now = ctx.currentTime;
      // Subtle click: very short high-frequency blip
      playTone(ctx, 1800, now, 0.03, 'square', 0.08);
    });
  }, [lazyInit]);

  return { playCorrect, playWrong, playComplete, playClick };
}
