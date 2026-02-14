import { useState, useRef, useCallback, useEffect } from 'react';
import type { SpeechStatus, SpeechError, SpeechErrorCode } from '../data/types';

// ============================================
// Platform detection
// ============================================

interface PlatformInfo {
  isIOS: boolean;
  isAndroid: boolean;
  isFirefox: boolean;
  isDesktopChrome: boolean;
  isDesktopSafari: boolean;
  isMobile: boolean;
}

function detectPlatform(): PlatformInfo {
  if (typeof navigator === 'undefined') {
    return {
      isIOS: false,
      isAndroid: false,
      isFirefox: false,
      isDesktopChrome: false,
      isDesktopSafari: false,
      isMobile: false,
    };
  }

  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(ua);
  const isFirefox = /Firefox/.test(ua) && !/Seamonkey/.test(ua);
  const isMobile = isIOS || isAndroid;
  const isDesktopChrome = !isMobile && /Chrome/.test(ua) && !/Edg/.test(ua);
  const isDesktopSafari = !isMobile && /Safari/.test(ua) && !/Chrome/.test(ua);

  return { isIOS, isAndroid, isFirefox, isDesktopChrome, isDesktopSafari, isMobile };
}

// ============================================
// SpeechRecognition API type
// ============================================

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message?: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  onaudiostart: (() => void) | null;
  onspeechstart: (() => void) | null;
  onspeechend: (() => void) | null;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

function getSpeechRecognition(): SpeechRecognitionConstructor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as Record<string, unknown>;
  return (w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null) as SpeechRecognitionConstructor | null;
}

// ============================================
// Error mapping
// ============================================

function mapError(errorType: string, platform: PlatformInfo): SpeechError {
  const errors: Record<string, SpeechError> = {
    'not-allowed': {
      code: 'PERMISSION_DENIED',
      friendlyMessage: 'Ask a grown-up to turn on microphone permission!',
      recoverable: false,
    },
    'service-not-allowed': {
      code: 'SYSTEM_PERMISSION_DENIED',
      friendlyMessage: 'A grown-up can fix this in device settings.',
      recoverable: false,
    },
    'audio-capture': {
      code: 'NO_MICROPHONE',
      friendlyMessage: "We can't find a microphone! Just type instead!",
      recoverable: false,
    },
    network: {
      code: 'NETWORK_ERROR',
      friendlyMessage: 'We need the internet to listen! Type instead.',
      recoverable: true,
    },
    'no-speech': {
      code: 'NO_SPEECH',
      friendlyMessage: "We didn't hear anything. Try again!",
      recoverable: true,
    },
    aborted: {
      code: 'UNKNOWN',
      friendlyMessage: 'Listening was interrupted. Try again!',
      recoverable: true,
    },
  };

  // OS-level permission denial on iOS/macOS
  if (errorType === 'not-allowed' && (platform.isIOS || platform.isDesktopSafari)) {
    return {
      code: 'SYSTEM_PERMISSION_DENIED',
      friendlyMessage: 'A grown-up can fix this in device settings.',
      recoverable: false,
    };
  }

  return (
    errors[errorType] ?? {
      code: 'UNKNOWN' as SpeechErrorCode,
      friendlyMessage: 'Something went wrong. Try again!',
      recoverable: true,
    }
  );
}

// ============================================
// Constants
// ============================================

const TOGGLE_DEBOUNCE_MS = 200;
const AUTO_RESTART_DELAY_MS = 300;
const IOS_SILENCE_TIMEOUT_MS = 750;
const MAX_SESSION_MS = 5 * 60 * 1000; // 5 minutes
const HEARTBEAT_INTERVAL_MS = 3000;

// ============================================
// Hook
// ============================================

export interface UseSpeechRecognitionReturn {
  isSupported: boolean;
  status: SpeechStatus;
  finalTranscript: string;
  interimTranscript: string;
  error: SpeechError | null;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  dismissError: () => void;
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const platform = useRef(detectPlatform()).current;
  const SpeechRecognitionAPI = useRef(getSpeechRecognition()).current;
  const isSupported = !platform.isFirefox && SpeechRecognitionAPI !== null;

  const [status, setStatus] = useState<SpeechStatus>('idle');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<SpeechError | null>(null);

  // Refs for managing state across callbacks
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const generationRef = useRef(0);
  const statusRef = useRef<SpeechStatus>('idle');
  const lastToggleRef = useRef(0);
  const shouldRestartRef = useRef(false);
  const sessionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastHeartbeatRef = useRef(Date.now());
  const iosSilenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seenTranscriptsRef = useRef(new Set<string>());
  const restartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaSnapshotRef = useRef('');

  const setStatusTracked = useCallback((s: SpeechStatus) => {
    statusRef.current = s;
    setStatus(s);
  }, []);

  // Cleanup all timers
  const clearAllTimers = useCallback(() => {
    if (sessionTimerRef.current) {
      clearTimeout(sessionTimerRef.current);
      sessionTimerRef.current = null;
    }
    if (heartbeatRef.current) {
      clearInterval(heartbeatRef.current);
      heartbeatRef.current = null;
    }
    if (iosSilenceTimerRef.current) {
      clearTimeout(iosSilenceTimerRef.current);
      iosSilenceTimerRef.current = null;
    }
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
  }, []);

  const destroyRecognition = useCallback(() => {
    const rec = recognitionRef.current;
    if (rec) {
      rec.onresult = null;
      rec.onerror = null;
      rec.onend = null;
      rec.onstart = null;
      rec.onaudiostart = null;
      rec.onspeechstart = null;
      rec.onspeechend = null;
      try {
        rec.abort();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
    clearAllTimers();
  }, [clearAllTimers]);

  // Edge case 16: Snapshot textarea content before starting
  const captureTextareaSnapshot = useCallback(() => {
    const active = document.activeElement;
    if (active && (active.tagName === 'TEXTAREA' || active.tagName === 'INPUT')) {
      textareaSnapshotRef.current = (active as HTMLTextAreaElement | HTMLInputElement).value;
    } else {
      textareaSnapshotRef.current = '';
    }
  }, []);

  const startListening = useCallback(() => {
    if (!isSupported || !SpeechRecognitionAPI) return;

    // Edge case 13: Debounce rapid toggles
    const now = Date.now();
    if (now - lastToggleRef.current < TOGGLE_DEBOUNCE_MS) return;
    lastToggleRef.current = now;

    // State machine guard: only start from idle
    if (statusRef.current !== 'idle') return;

    // Edge case 16: Capture textarea snapshot
    captureTextareaSnapshot();

    // Bump generation counter to ignore stale events
    generationRef.current += 1;
    const gen = generationRef.current;

    setStatusTracked('starting');
    shouldRestartRef.current = true;
    seenTranscriptsRef.current.clear();
    setError(null);
    setInterimTranscript('');

    const recognition = new SpeechRecognitionAPI();
    recognitionRef.current = recognition;

    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    // Platform-specific continuous mode
    if (platform.isAndroid) {
      // Edge case: Android continuous mode is broken
      recognition.continuous = false;
    } else {
      recognition.continuous = true;
    }

    // Edge case 14: Max session timer (5 min)
    sessionTimerRef.current = setTimeout(() => {
      if (gen === generationRef.current) {
        shouldRestartRef.current = false;
        try {
          recognition.stop();
        } catch {
          // ignore
        }
      }
    }, MAX_SESSION_MS);

    // Edge case 12: Heartbeat for device sleep detection
    lastHeartbeatRef.current = Date.now();
    heartbeatRef.current = setInterval(() => {
      const elapsed = Date.now() - lastHeartbeatRef.current;
      lastHeartbeatRef.current = Date.now();
      if (elapsed > HEARTBEAT_INTERVAL_MS * 3 && gen === generationRef.current) {
        // Device likely slept
        shouldRestartRef.current = false;
        setError({
          code: 'UNKNOWN',
          friendlyMessage: 'Your device took a nap! Tap the microphone to try again.',
          recoverable: true,
        });
        destroyRecognition();
        setStatusTracked('idle');
      }
    }, HEARTBEAT_INTERVAL_MS);

    recognition.onstart = () => {
      if (gen !== generationRef.current) return;
      setStatusTracked('recording');
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      if (gen !== generationRef.current) return;

      let newFinal = '';
      let newInterim = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        const confidence = result[0].confidence;

        if (result.isFinal) {
          // Dedup - browsers sometimes send duplicate final results
          const trimmed = transcript.trim();
          if (seenTranscriptsRef.current.has(trimmed)) continue;
          seenTranscriptsRef.current.add(trimmed);

          // Edge case 7: Low confidence might mean non-English
          if (confidence > 0 && confidence < 0.4) {
            setError({
              code: 'UNKNOWN',
              friendlyMessage: "I didn't catch that clearly. Try speaking more slowly!",
              recoverable: true,
            });
          }

          newFinal += transcript;
        } else {
          // Edge case 15 (iOS): Silence timeout to force finalization
          if (platform.isIOS) {
            if (iosSilenceTimerRef.current) {
              clearTimeout(iosSilenceTimerRef.current);
            }
            iosSilenceTimerRef.current = setTimeout(() => {
              // Promote interim to final after silence
              if (gen === generationRef.current && newInterim.trim()) {
                setFinalTranscript((prev) => prev + newInterim);
                setInterimTranscript('');
              }
            }, IOS_SILENCE_TIMEOUT_MS);
          }

          newInterim += transcript;
        }
      }

      if (newFinal) {
        setFinalTranscript((prev) => prev + newFinal);
      }
      setInterimTranscript(newInterim);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (gen !== generationRef.current) return;

      const errorType = event.error;

      // Edge case 8: Background noise detection
      if (errorType === 'no-speech') {
        setError({
          code: 'NO_SPEECH',
          friendlyMessage: "It's noisy! Move somewhere quieter or try speaking louder.",
          recoverable: true,
        });
        // Don't stop - let auto-restart handle it
        return;
      }

      // Edge case 5: Mic in use
      if (errorType === 'audio-capture') {
        // Distinguish between no mic and mic in use
        // Unfortunately the API doesn't differentiate well,
        // so we check if we ever got audio before
        if (statusRef.current === 'recording') {
          setError({
            code: 'MIC_IN_USE',
            friendlyMessage: 'Another app is using the mic. Try closing it!',
            recoverable: true,
          });
        } else {
          setError(mapError(errorType, platform));
        }
        shouldRestartRef.current = false;
        return;
      }

      // Edge case 6: Network error
      if (errorType === 'network') {
        setError(mapError(errorType, platform));
        shouldRestartRef.current = false;
        return;
      }

      // For 'aborted' errors, don't show error if we initiated the stop
      if (errorType === 'aborted' && !shouldRestartRef.current) {
        return;
      }

      // Permission errors
      if (errorType === 'not-allowed' || errorType === 'service-not-allowed') {
        setError(mapError(errorType, platform));
        shouldRestartRef.current = false;
        return;
      }

      // Default
      setError(mapError(errorType, platform));
    };

    recognition.onend = () => {
      if (gen !== generationRef.current) return;

      // Clear iOS silence timer
      if (iosSilenceTimerRef.current) {
        clearTimeout(iosSilenceTimerRef.current);
        iosSilenceTimerRef.current = null;
      }

      // Edge case 9, 15: Auto-restart for iOS and Android
      if (shouldRestartRef.current && (platform.isIOS || platform.isAndroid)) {
        restartTimerRef.current = setTimeout(() => {
          if (gen === generationRef.current && shouldRestartRef.current) {
            try {
              recognition.start();
            } catch {
              // Recognition might be in a bad state
              setStatusTracked('idle');
              clearAllTimers();
            }
          }
        }, AUTO_RESTART_DELAY_MS);
        return;
      }

      // Edge case 9: Auto-restart on long pause for desktop
      if (shouldRestartRef.current && !platform.isMobile) {
        restartTimerRef.current = setTimeout(() => {
          if (gen === generationRef.current && shouldRestartRef.current) {
            try {
              recognition.start();
            } catch {
              setStatusTracked('idle');
              clearAllTimers();
            }
          }
        }, AUTO_RESTART_DELAY_MS);
        return;
      }

      // Normal stop
      setStatusTracked('idle');
      clearAllTimers();
      setInterimTranscript('');
    };

    try {
      recognition.start();
    } catch (err) {
      // Edge case 10: Might get error if starting too quickly
      setStatusTracked('idle');
      clearAllTimers();
      setError({
        code: 'UNKNOWN',
        friendlyMessage: 'Something went wrong starting the microphone. Try again!',
        recoverable: true,
      });
    }
  }, [
    isSupported,
    SpeechRecognitionAPI,
    platform,
    setStatusTracked,
    destroyRecognition,
    clearAllTimers,
    captureTextareaSnapshot,
  ]);

  const stopListening = useCallback(() => {
    // Edge case 13: Debounce rapid toggles
    const now = Date.now();
    if (now - lastToggleRef.current < TOGGLE_DEBOUNCE_MS) return;
    lastToggleRef.current = now;

    // State machine guard
    if (statusRef.current === 'idle' || statusRef.current === 'stopping') return;

    shouldRestartRef.current = false;
    setStatusTracked('stopping');

    const rec = recognitionRef.current;
    if (rec) {
      try {
        rec.stop();
      } catch {
        // Force cleanup if stop fails
        destroyRecognition();
        setStatusTracked('idle');
      }
    } else {
      setStatusTracked('idle');
      clearAllTimers();
    }
  }, [setStatusTracked, destroyRecognition, clearAllTimers]);

  const resetTranscript = useCallback(() => {
    setFinalTranscript('');
    setInterimTranscript('');
    seenTranscriptsRef.current.clear();
  }, []);

  const dismissError = useCallback(() => {
    setError(null);
  }, []);

  // Edge case 11: Tab visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && statusRef.current === 'recording') {
        shouldRestartRef.current = false;
        const rec = recognitionRef.current;
        if (rec) {
          try {
            rec.stop();
          } catch {
            // ignore
          }
        }
        setError({
          code: 'UNKNOWN',
          friendlyMessage: 'Listening stopped when you switched away. Tap the mic to start again!',
          recoverable: true,
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      shouldRestartRef.current = false;
      destroyRecognition();
    };
  }, [destroyRecognition]);

  return {
    isSupported,
    status,
    finalTranscript,
    interimTranscript,
    error,
    startListening,
    stopListening,
    resetTranscript,
    dismissError,
  };
}
