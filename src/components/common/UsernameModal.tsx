import { useState, useEffect, useCallback } from 'react';
import { validateUsername, claimUsername, setStoredUsername, loadCloudProgress, mergeProgress } from '../../lib/cloudSync';
import type { CurriculumProgress } from '../../data/types';

interface UsernameModalProps {
  onComplete: (username: string, mergedProgress: CurriculumProgress | null) => void;
  onSkip: () => void;
  localProgress: CurriculumProgress;
}

export default function UsernameModal({ onComplete, onSkip, localProgress }: UsernameModalProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'welcome-back' | 'created'>('idle');
  const [resolvedUsername, setResolvedUsername] = useState('');

  // Live validation
  useEffect(() => {
    if (input.length === 0) {
      setError(null);
      return;
    }
    setError(validateUsername(input));
  }, [input]);

  const isValid = input.length > 0 && error === null;

  const handleSubmit = useCallback(async () => {
    if (!isValid || status === 'loading') return;

    const validationError = validateUsername(input);
    if (validationError) {
      setError(validationError);
      return;
    }

    setStatus('loading');
    setError(null);

    const result = await claimUsername(input);

    if (result.error) {
      setError(result.error);
      setStatus('idle');
      return;
    }

    const normalizedUsername = input.toLowerCase();
    setResolvedUsername(normalizedUsername);

    if (result.exists) {
      // Existing user — load cloud progress and merge
      setStatus('welcome-back');
      const cloudProgress = await loadCloudProgress(normalizedUsername);
      setStoredUsername(normalizedUsername);

      // Auto-close after a brief moment
      setTimeout(() => {
        const merged = cloudProgress ? mergeProgress(localProgress, cloudProgress) : null;
        onComplete(normalizedUsername, merged);
      }, 1200);
    } else {
      // New user created
      setStatus('created');
      setStoredUsername(normalizedUsername);

      setTimeout(() => {
        onComplete(normalizedUsername, null);
      }, 1000);
    }
  }, [input, isValid, status, localProgress, onComplete]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#FFF8E7] rounded-2xl shadow-2xl p-8 text-center space-y-5 border-2 border-[#C9A227]/40">
        {/* Header decorations */}
        <div className="text-4xl leading-none select-none" aria-hidden="true">
          🌟📚✨
        </div>

        <h2 className="text-2xl font-bold text-[#3D2914] font-[family-name:var(--font-heading)]">
          Welcome! Choose a Username
        </h2>

        <p className="text-sm text-[#6B5B3E]">
          Your username saves your progress so you can continue on any device.
        </p>

        {/* Feedback messages */}
        {status === 'welcome-back' && (
          <div className="bg-green-100 text-green-800 rounded-lg px-4 py-2 text-sm font-semibold animate-pulse">
            Welcome back, {resolvedUsername}! 🎉
          </div>
        )}
        {status === 'created' && (
          <div className="bg-blue-100 text-blue-800 rounded-lg px-4 py-2 text-sm font-semibold animate-pulse">
            Username created! 🚀
          </div>
        )}

        {/* Input */}
        {(status === 'idle' || status === 'loading') && (
          <>
            <div className="space-y-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g. super-explorer"
                maxLength={20}
                autoFocus
                disabled={status === 'loading'}
                className="w-full px-4 py-3 rounded-xl border-2 text-[#3D2914] text-center text-lg font-semibold
                  bg-white placeholder:text-[#C9A227]/50 outline-none
                  border-[#C9A227]/40 focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/30
                  disabled:opacity-60 transition-colors"
              />
              {error && input.length > 0 && (
                <p className="text-xs text-red-600 font-medium">{error}</p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isValid || status === 'loading'}
              className="w-full py-3 rounded-xl font-bold text-lg text-[#FFF8E7]
                bg-gradient-to-r from-[#C9A227] to-[#CD7F32]
                hover:from-[#d4ac2f] hover:to-[#d98a3a]
                disabled:opacity-40 disabled:cursor-not-allowed
                transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              {status === 'loading' ? 'Checking...' : 'Start Learning! 🎓'}
            </button>

            <button
              onClick={onSkip}
              disabled={status === 'loading'}
              className="text-xs text-[#8B7355] hover:text-[#6B5B3E] underline underline-offset-2
                disabled:opacity-40 transition-colors"
            >
              Continue Without Saving
            </button>
          </>
        )}
      </div>
    </div>
  );
}
