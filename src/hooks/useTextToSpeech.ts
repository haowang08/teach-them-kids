import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Voice names ordered by naturalness / warmth.
 * Enhanced/Premium macOS voices and high-quality Google voices come first.
 * The picker also prefers "(Enhanced)" or "(Premium)" suffixed variants
 * of any match automatically.
 */
const PREFERRED_VOICES = [
  // macOS high-quality (available when downloaded in System Settings → Accessibility → Spoken Content)
  'Samantha (Enhanced)',
  'Zoe (Enhanced)',
  'Evan (Enhanced)',
  'Karen (Enhanced)',
  'Daniel (Enhanced)',
  'Moira (Enhanced)',
  'Tessa (Enhanced)',
  'Samantha (Premium)',
  'Zoe (Premium)',
  // Google (Chrome / Android)
  'Google US English',
  'Google UK English Female',
  'Google UK English Male',
  // Microsoft (Edge / Windows)
  'Microsoft Aria Online (Natural)',
  'Microsoft Jenny Online (Natural)',
  'Microsoft Zira',
  'Microsoft David',
  // macOS base (still decent)
  'Samantha',
  'Karen',
  'Daniel',
  'Moira',
  'Tessa',
];

function pickBestVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const english = voices.filter(
    (v) => v.lang.startsWith('en-') || v.lang === 'en',
  );

  // Try preferred voices in order
  for (const name of PREFERRED_VOICES) {
    const match = english.find((v) => v.name === name);
    if (match) return match;
  }

  // If none matched exactly, prefer any Enhanced/Premium English voice
  const enhanced = english.find(
    (v) => v.name.includes('(Enhanced)') || v.name.includes('(Premium)'),
  );
  if (enhanced) return enhanced;

  // Fall back to any English voice
  if (english.length > 0) return english[0];

  // Last resort
  return voices[0] ?? null;
}

export function useTextToSpeech() {
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTextId, setCurrentTextId] = useState<string | null>(null);
  const [rate, setRate] = useState(1);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const loadVoices = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) return;
    setAvailableVoices(voices);
    setSelectedVoice((prev) => prev ?? pickBestVoice(voices));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    // Some browsers load voices synchronously
    loadVoices();

    // Others fire voiceschanged asynchronously
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, [loadVoices]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stop = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentTextId(null);
  }, []);

  const play = useCallback(
    (textId: string, text: string) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) return;

      // Stop any current speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.rate = rate;
      utterance.pitch = 1;

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
        setCurrentTextId(textId);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentTextId(null);
        utteranceRef.current = null;
      };

      utterance.onerror = (event) => {
        // 'canceled' is expected when we call stop/play again
        if (event.error !== 'canceled') {
          console.warn('Speech synthesis error:', event.error);
        }
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentTextId(null);
        utteranceRef.current = null;
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [selectedVoice, rate]
  );

  const pause = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, []);

  return {
    play,
    pause,
    resume,
    stop,
    isPlaying,
    isPaused,
    currentTextId,
    availableVoices,
    selectedVoice,
    setSelectedVoice,
    rate,
    setRate,
  };
}
