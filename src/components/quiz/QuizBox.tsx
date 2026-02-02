'use client';

import { useState, useCallback } from 'react';
import type { Quiz } from '../../data/types';
import { useProgress } from '../../hooks/useProgress';
import { useSound } from '../../hooks/useSound';
import QuizOption from './QuizOption';
import ConfettiEffect from '../common/ConfettiEffect';
import XPFloater from '../common/XPFloater';

interface QuizBoxProps {
  quiz: Quiz;
  topicId: string;
}

export default function QuizBox({ quiz, topicId }: QuizBoxProps) {
  const { recordQuizAttempt, getTopicProgress } = useProgress();
  const { playCorrect, playWrong } = useSound();

  const topicProgress = getTopicProgress(topicId);
  const existingAttempt = topicProgress.quizAttempts[quiz.id];

  const [disabledOptions, setDisabledOptions] = useState<Set<number>>(() => {
    if (existingAttempt?.correct) {
      return new Set(quiz.options.map((_, i) => i));
    }
    return new Set();
  });
  const [optionStates, setOptionStates] = useState<
    Record<number, 'default' | 'correct' | 'wrong' | 'disabled'>
  >(() => {
    if (existingAttempt?.correct) {
      const states: Record<number, 'correct' | 'disabled'> = {};
      quiz.options.forEach((opt, i) => {
        states[i] = opt.isCorrect ? 'correct' : 'disabled';
      });
      return states;
    }
    return {};
  });
  const [solved, setSolved] = useState(existingAttempt?.correct ?? false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showXP, setShowXP] = useState(false);
  const [attemptCount, setAttemptCount] = useState(existingAttempt?.attempts ?? 0);

  const handleOptionClick = useCallback(
    (index: number) => {
      if (solved || disabledOptions.has(index)) return;

      const option = quiz.options[index];
      const newAttemptCount = attemptCount + 1;
      setAttemptCount(newAttemptCount);

      if (option.isCorrect) {
        // Correct answer
        recordQuizAttempt(topicId, quiz.id, true);
        playCorrect();

        setOptionStates((prev) => {
          const next: Record<number, 'correct' | 'wrong' | 'disabled' | 'default'> = { ...prev };
          next[index] = 'correct';
          quiz.options.forEach((_, i) => {
            if (i !== index) next[i] = 'disabled';
          });
          return next;
        });

        setDisabledOptions(new Set(quiz.options.map((_, i) => i)));
        setSolved(true);
        setShowConfetti(true);

        setTimeout(() => setShowXP(true), 300);
      } else {
        // Wrong answer
        recordQuizAttempt(topicId, quiz.id, false);
        playWrong();

        setOptionStates((prev) => ({
          ...prev,
          [index]: 'wrong',
        }));

        setDisabledOptions((prev) => {
          const next = new Set(prev);
          next.add(index);
          return next;
        });

        // Reset the wrong visual after a moment, but keep it disabled
        setTimeout(() => {
          setOptionStates((prev) => ({
            ...prev,
            [index]: 'disabled',
          }));
        }, 600);
      }
    },
    [solved, disabledOptions, quiz, topicId, attemptCount, recordQuizAttempt, playCorrect, playWrong]
  );

  const xpAmount = attemptCount <= 1 ? quiz.xpCorrectFirstTry : quiz.xpCorrectRetry;

  return (
    <div className="relative rounded-xl border-2 border-[var(--topic-gold)]/30 bg-[var(--topic-cream)] p-5 md:p-6">
      {/* Confetti */}
      <ConfettiEffect trigger={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Quiz title */}
      <h4 className="text-sm font-semibold text-[var(--topic-bronze)] uppercase tracking-wide mb-2">
        {quiz.title}
      </h4>

      {/* Question */}
      <p className="text-base md:text-lg font-semibold text-[var(--topic-dark-brown)] mb-5">
        {quiz.question}
      </p>

      {/* Options */}
      <div className="flex flex-col md:flex-row gap-3 flex-wrap">
        {quiz.options.map((option, i) => (
          <QuizOption
            key={i}
            text={option.text}
            isCorrect={option.isCorrect}
            disabled={disabledOptions.has(i)}
            state={optionStates[i] ?? 'default'}
            onClick={() => handleOptionClick(i)}
          />
        ))}
      </div>

      {/* Success message + XP floater */}
      {solved && (
        <div className="mt-4 flex items-center gap-3">
          <p className="text-emerald-700 font-semibold text-sm">
            Correct! Great job!
          </p>
          <XPFloater amount={xpAmount} trigger={showXP} />
        </div>
      )}
    </div>
  );
}
