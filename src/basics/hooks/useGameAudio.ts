import { useRef, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Shared AudioContext (singleton to avoid per-component overhead)
// ---------------------------------------------------------------------------

let sharedContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (sharedContext && sharedContext.state !== 'closed') return sharedContext;

  const AudioCtx =
    window.AudioContext ??
    (window as unknown as Record<string, unknown>).webkitAudioContext;
  if (!AudioCtx) return null;

  sharedContext = new (AudioCtx as typeof AudioContext)();
  return sharedContext;
}

function ensureResumed(ctx: AudioContext): Promise<void> {
  if (ctx.state === 'suspended') return ctx.resume();
  return Promise.resolve();
}

// ---------------------------------------------------------------------------
// Low-level tone helper
// ---------------------------------------------------------------------------

function playTone(
  ctx: AudioContext,
  frequency: number,
  startTime: number,
  duration: number,
  type: OscillatorType = 'sine',
  gainValue: number = 0.3,
): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startTime);

  gain.gain.setValueAtTime(gainValue, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Game audio hook providing synthesised sound effects via Web Audio API
 * oscillators. No external audio files required.
 */
export function useGameAudio() {
  const initializedRef = useRef(false);

  const lazyInit = useCallback((): AudioContext | null => {
    const ctx = getAudioContext();
    if (ctx && !initializedRef.current) {
      initializedRef.current = true;
      ensureResumed(ctx);
    }
    return ctx;
  }, []);

  // ── playPop – short high-pitched pop ────────────────────────────────
  const playPop = useCallback(() => {
    const ctx = lazyInit();
    if (!ctx) return;
    ensureResumed(ctx).then(() => {
      const now = ctx.currentTime;
      // Quick high sine blip
      playTone(ctx, 1200, now, 0.06, 'sine', 0.25);
    });
  }, [lazyInit]);

  // ── playWhoosh – frequency sweep ────────────────────────────────────
  const playWhoosh = useCallback(() => {
    const ctx = lazyInit();
    if (!ctx) return;
    ensureResumed(ctx).then(() => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.3);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    });
  }, [lazyInit]);

  // ── playChime – success ascending chime ─────────────────────────────
  const playChime = useCallback(() => {
    const ctx = lazyInit();
    if (!ctx) return;
    ensureResumed(ctx).then(() => {
      const now = ctx.currentTime;
      // C5 -> E5 -> G5 ascending
      playTone(ctx, 523.25, now, 0.15, 'sine', 0.2);
      playTone(ctx, 659.25, now + 0.1, 0.15, 'sine', 0.25);
      playTone(ctx, 783.99, now + 0.2, 0.2, 'sine', 0.3);
    });
  }, [lazyInit]);

  // ── playBuzz – wrong answer buzz ────────────────────────────────────
  const playBuzz = useCallback(() => {
    const ctx = lazyInit();
    if (!ctx) return;
    ensureResumed(ctx).then(() => {
      const now = ctx.currentTime;
      // Low sawtooth buzz
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    });
  }, [lazyInit]);

  // ── playLevelUp – celebration melody ────────────────────────────────
  const playLevelUp = useCallback(() => {
    const ctx = lazyInit();
    if (!ctx) return;
    ensureResumed(ctx).then(() => {
      const now = ctx.currentTime;
      // Short fanfare: C5 -> E5 -> G5 -> C6 (ascending arpeggio)
      playTone(ctx, 523.25, now, 0.15, 'sine', 0.2);         // C5
      playTone(ctx, 659.25, now + 0.12, 0.15, 'sine', 0.22); // E5
      playTone(ctx, 783.99, now + 0.24, 0.15, 'sine', 0.25); // G5
      playTone(ctx, 1046.50, now + 0.36, 0.3, 'sine', 0.3);  // C6
      // Extra sparkle
      playTone(ctx, 1318.51, now + 0.50, 0.25, 'sine', 0.15); // E6
      playTone(ctx, 1567.98, now + 0.62, 0.35, 'sine', 0.12); // G6
    });
  }, [lazyInit]);

  // ── playClick – UI click feedback ───────────────────────────────────
  const playClick = useCallback(() => {
    const ctx = lazyInit();
    if (!ctx) return;
    ensureResumed(ctx).then(() => {
      const now = ctx.currentTime;
      // Subtle short blip
      playTone(ctx, 1800, now, 0.03, 'square', 0.08);
    });
  }, [lazyInit]);

  return {
    playPop,
    playWhoosh,
    playChime,
    playBuzz,
    playLevelUp,
    playClick,
  };
}
