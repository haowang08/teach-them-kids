import { useCallback, useMemo } from 'react';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';

// ---------------------------------------------------------------------------
// Encouragement & redirect phrases
// ---------------------------------------------------------------------------

const ENCOURAGEMENTS = [
  'Great job!',
  'You did it!',
  'Awesome!',
  'Super star!',
  'Way to go!',
  'Wonderful!',
  'You are amazing!',
  'Fantastic!',
  'Keep it up!',
  'Brilliant!',
  'Nice work!',
  'Well done!',
  'High five!',
  'You rock!',
  'Excellent!',
];

const REDIRECTS = [
  "Oops! Let's try again.",
  "Almost! Give it another try.",
  "Not quite. You can do it!",
  "So close! Try one more time.",
  "Hmm, let's think about that again.",
  "Good try! Let's keep going.",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Kid-friendly text-to-speech wrapper with convenience methods.
 * Uses a slightly higher pitch and slower rate so speech feels
 * warm and clear for young learners.
 */
export function useGameTTS() {
  const tts = useTextToSpeech();


  // Apply kid-friendly defaults once
  // We set rate and pitch on the underlying hook so every utterance inherits them
  useMemo(() => {
    tts.setRate(0.85);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /** Internal speak helper that also sets pitch via the utterance. */
  const speak = useCallback(
    (text: string) => {
      // The base hook does not expose a pitch setter, so we
      // monkey-patch the pitch by creating a custom speak flow.
      // However, to stay compatible we use the hook's `play` method
      // and accept its default pitch=1. For a true 1.15 pitch we
      // would need to extend the base hook. For now we leverage
      // the Web Speech API directly as a small override.
      if (typeof window === 'undefined' || !window.speechSynthesis) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.15;
      utterance.rate = 0.85;

      // Try to use the same voice the parent hook selected
      if (tts.selectedVoice) {
        utterance.voice = tts.selectedVoice;
      }

      window.speechSynthesis.speak(utterance);
    },
    [tts.selectedVoice],
  );

  /** Speak a single word clearly. */
  const sayWord = useCallback(
    (word: string) => {
      speak(word);
    },
    [speak],
  );

  /** Speak a phoneme sound (e.g. "sh", "ch"). */
  const sayPhoneme = useCallback(
    (phoneme: string) => {
      speak(phoneme);
    },
    [speak],
  );

  /** Speak a full sentence. */
  const saySentence = useCallback(
    (sentence: string) => {
      speak(sentence);
    },
    [speak],
  );

  /** Speak a random encouragement phrase. */
  const sayEncouragement = useCallback(() => {
    speak(pickRandom(ENCOURAGEMENTS));
  }, [speak]);

  /** Speak a gentle redirect with an optional hint. */
  const sayRedirect = useCallback(
    (hint?: string) => {
      const base = pickRandom(REDIRECTS);
      const full = hint ? `${base} ${hint}` : base;
      speak(full);
    },
    [speak],
  );

  /** Cancel any in-progress speech. */
  const cancel = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  return {
    sayWord,
    sayPhoneme,
    saySentence,
    sayEncouragement,
    sayRedirect,
    cancel,
    /** Expose underlying TTS state for advanced use. */
    isPlaying: tts.isPlaying,
    selectedVoice: tts.selectedVoice,
  };
}
