'use client';

import { useState, useEffect } from 'react';
import type { Reward } from '../../data/types';
import { useProgress } from '../../hooks/useProgress';
import { useSound } from '../../hooks/useSound';
import SketchfabEmbed from './SketchfabEmbed';
import ChariotRace from './ChariotRace';
import ConfettiEffect from '../common/ConfettiEffect';

interface RewardSectionProps {
  reward: Reward;
  topicId: string;
}

export default function RewardSection({ reward, topicId }: RewardSectionProps) {
  const { isRewardUnlockable, getTopicProgress, markRewardUnlocked } = useProgress();
  const { playComplete } = useSound();
  const topicProgress = getTopicProgress(topicId);

  const canUnlock = isRewardUnlockable(topicId);
  const isUnlocked = topicProgress.rewardUnlocked;

  const [showCelebration, setShowCelebration] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(false);

  // Auto-unlock when requirements are met
  useEffect(() => {
    if (canUnlock && !isUnlocked) {
      markRewardUnlocked(topicId);
      setShowCelebration(true);
      setJustUnlocked(true);
      playComplete();
    }
  }, [canUnlock, isUnlocked, topicId, markRewardUnlocked, playComplete]);

  // Requirements checklist
  const essaySaved = topicProgress.essaySubmitted;

  return (
    <section id="reward" className="my-8">
      <div className="relative rounded-2xl bg-white/80 backdrop-blur-sm p-5 md:p-8 shadow-sm overflow-hidden">
        {/* Top border */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
          style={{ background: 'var(--topic-section-border-gradient)' }}
        />

        {/* Confetti */}
        <ConfettiEffect
          trigger={showCelebration}
          onComplete={() => setShowCelebration(false)}
        />

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl" aria-hidden="true">&#127942;</span>
          <h2 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--topic-primary)]">
            {reward.title}
          </h2>
        </div>

        <p className="text-base text-[var(--topic-dark-brown)] mb-4">
          {reward.description}
        </p>

        {/* Requirements checklist */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-[var(--topic-bronze)] uppercase tracking-wide mb-2">
            Requirements
          </h3>
          <ul className="space-y-2">
            {reward.requirements.map((req, i) => {
              let isMet = false;
              if (req.type === 'all-quizzes-correct') {
                isMet = canUnlock || isUnlocked;
              } else if (req.type === 'essay-saved-with-min-chars') {
                isMet = essaySaved;
              }

              return (
                <li key={i} className="flex items-center gap-2 text-sm">
                  {isMet ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-emerald-500 shrink-0"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-300 shrink-0" />
                  )}
                  <span
                    className={
                      isMet
                        ? 'text-emerald-700 font-medium'
                        : 'text-[var(--topic-dark-brown)]/60'
                    }
                  >
                    {req.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Lock overlay or reward content */}
        {isUnlocked || canUnlock ? (
          <div>
            {/* Celebration message */}
            {justUnlocked && (
              <div className="mb-4 rounded-xl bg-gradient-to-r from-[var(--topic-gold-light)] to-[var(--topic-sand)] p-4 text-center">
                <p className="text-lg font-bold text-[var(--topic-dark-brown)]">
                  {reward.celebrationMessage}
                </p>
              </div>
            )}

            {/* Reward embed */}
            {reward.type === 'sketchfab' && reward.embedUrl && reward.embedTitle && (
              <SketchfabEmbed
                embedUrl={reward.embedUrl}
                embedTitle={reward.embedTitle}
                attribution={reward.attribution}
              />
            )}

            {reward.type === 'chariot-race' && (
              <ChariotRace />
            )}
          </div>
        ) : (
          <div className="relative rounded-xl bg-gray-100 p-8 text-center overflow-hidden">
            {/* Lock overlay */}
            <div className="flex flex-col items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <p className="text-gray-500 font-semibold text-base">
                {reward.lockMessage}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
