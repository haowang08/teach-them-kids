import { Link } from 'react-router-dom';
import type { Lesson } from '../../data/types';
import ProgressRing from '../common/ProgressRing';
import ComingSoonBadge from '../common/ComingSoonBadge';

interface LessonNodeProps {
  lesson: Lesson;
  index: number;
  completion: number; // 0-100
}

export default function LessonNode({ lesson, index, completion }: LessonNodeProps) {
  const isLeft = index % 2 === 0;
  const isComingSoon = lesson.status === 'coming-soon';
  const isCompleted = completion === 100;
  const isInProgress = completion > 0 && completion < 100;

  const label = isComingSoon
    ? ''
    : isCompleted
      ? 'REPLAY'
      : isInProgress
        ? 'CONTINUE'
        : 'START';

  // Star rating for completed lessons
  const starCount = completion === 100 ? 3 : 0;

  const nodeContent = (
    <div
      className={`flex flex-col items-center gap-1.5 transition-transform duration-200 ${
        !isComingSoon ? 'hover:-translate-y-1.5' : ''
      }`}
    >
      {/* Circle node */}
      <div
        className={`
          relative flex items-center justify-center
          w-20 h-20 md:w-24 md:h-24
          rounded-full
          transition-all duration-300
          ${
            isComingSoon
              ? 'border-2 border-dashed border-gray-400 bg-gray-200 opacity-60'
              : isCompleted
                ? 'border-4 border-gold bg-gradient-to-br from-gold-light to-cream shadow-lg'
                : 'border-4 border-gold bg-white shadow-md animate-pulse-glow'
          }
        `}
      >
        {isComingSoon ? (
          <span className="text-gray-400 text-3xl grayscale">&#128274;</span>
        ) : isCompleted ? (
          <>
            <span className="text-3xl md:text-4xl">{lesson.icon}</span>
            <div className="absolute -top-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
              <span className="text-white text-sm font-bold">&#10003;</span>
            </div>
          </>
        ) : isInProgress ? (
          <div className="relative flex items-center justify-center w-full h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <ProgressRing
                size={80}
                progress={completion}
                strokeWidth={5}
              />
            </div>
            <span className="relative z-10 text-2xl md:text-3xl">{lesson.icon}</span>
          </div>
        ) : (
          <span className="text-3xl md:text-4xl">{lesson.icon}</span>
        )}
      </div>

      {/* Stars for completed */}
      {isCompleted && (
        <div className="flex gap-0.5">
          {[1, 2, 3].map((star) => (
            <span
              key={star}
              className={`text-base ${star <= starCount ? 'text-gold' : 'text-gray-300'}`}
            >
              &#9733;
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <span
        className={`text-sm md:text-base font-bold text-center max-w-[120px] leading-tight ${
          isComingSoon ? 'text-gray-400' : 'text-dark-brown'
        }`}
      >
        {lesson.title}
      </span>

      {/* Status label or badge */}
      {isComingSoon ? (
        <ComingSoonBadge />
      ) : (
        <span
          className={`text-[11px] font-extrabold uppercase tracking-widest ${
            isCompleted
              ? 'text-green-600'
              : isInProgress
                ? 'text-bronze'
                : 'text-gold animate-pulse'
          }`}
        >
          {label}
        </span>
      )}
    </div>
  );

  return (
    <div
      className={`flex ${isLeft ? 'justify-start' : 'justify-end'} w-full`}
      style={{ paddingLeft: isLeft ? '10%' : '0', paddingRight: isLeft ? '0' : '10%' }}
    >
      {isComingSoon ? (
        <div className="cursor-not-allowed">{nodeContent}</div>
      ) : (
        <Link to={`/lesson/${lesson.id}`} className="no-underline">
          {nodeContent}
        </Link>
      )}
    </div>
  );
}
