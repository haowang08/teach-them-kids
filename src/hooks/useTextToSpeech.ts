import { useState, useEffect, useRef, useCallback } from 'react';

const PREFERRED_VOICES = [
  'Samantha',
  'Alex',
  'Daniel',
  'Karen',
  'Moira',
  'Tessa',
  'Google US English',
  'Google UK English Female',
  'Google UK English Male',
  'Microsoft Zira',
  'Microsoft David',
];

function pickBestVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  // Try preferred voices first
  for (const name of PREFERRED_VOICES) {
    const match = voices.find((v) => v.name.includes(name));
    if (match) return match;
  }
  // Fall back to any English voice
  const english = voices.find(
    (v) => v.lang.startsWith('en-') || v.lang === 'en'
  );
  if (english) return english;
  // Fall back to first available
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
