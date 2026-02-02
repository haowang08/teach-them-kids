'use client';

import { useEffect } from 'react';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';

interface SpeechInputProps {
  onTranscript: (text: string) => void;
}

export default function SpeechInput({ onTranscript }: SpeechInputProps) {
  const {
    isSupported,
    status,
    finalTranscript,
    interimTranscript,
    error,
    startListening,
    stopListening,
    resetTranscript,
    dismissError,
  } = useSpeechRecognition();

  // Push final transcript to parent
  useEffect(() => {
    if (finalTranscript) {
      onTranscript(finalTranscript);
      resetTranscript();
    }
  }, [finalTranscript, onTranscript, resetTranscript]);

  if (!isSupported) return null;

  const isRecording = status === 'recording';
  const isStarting = status === 'starting';
  const isActive = isRecording || isStarting;

  function handleToggle() {
    if (isActive) {
      stopListening();
    } else {
      startListening();
    }
  }

  return (
    <div className="flex items-center gap-3">
      {/* Mic button */}
      <button
        onClick={handleToggle}
        className={`relative inline-flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 cursor-pointer ${
          isActive
            ? 'bg-red-500 text-white shadow-lg'
            : 'bg-[var(--topic-bronze)] text-white hover:opacity-90'
        } active:scale-95`}
        aria-label={isActive ? 'Stop listening' : 'Start voice input'}
      >
        {/* Recording indicator (blinking red dot) */}
        {isRecording && (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-red-400 animate-pulse" />
        )}

        {/* Mic icon */}
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
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      </button>

      {/* Status text */}
      <div className="text-sm">
        {isStarting && (
          <span className="text-[var(--topic-bronze)] font-medium">Starting...</span>
        )}
        {isRecording && (
          <span className="text-red-600 font-medium flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Listening...
          </span>
        )}
        {interimTranscript && (
          <span className="text-[var(--topic-dark-brown)]/60 italic text-xs block mt-0.5">
            {interimTranscript}
          </span>
        )}
      </div>

      {/* Error display */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm">
          <span className="text-red-600">{error.friendlyMessage}</span>
          <button
            onClick={dismissError}
            className="text-red-400 hover:text-red-600 transition-colors cursor-pointer text-xs font-bold"
            aria-label="Dismiss error"
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
}
