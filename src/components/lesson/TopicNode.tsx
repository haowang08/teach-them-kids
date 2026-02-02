import { Link } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress';
import ProgressRing from '../common/ProgressRing';
import ComingSoonBadge from '../common/ComingSoonBadge';
import type { Status } from '../../data/types';

interface TopicNodeProps {
  topicId: string;
  slug: string;
  title: string;
  status: Status;
  icon: string;
  lessonSlug: string;
  index: number;
}

export default function TopicNode({
  topicId,
  slug,
  title,
  status,
  icon,
  lessonSlug,
  index,
}: TopicNodeProps) {
  const { getTopicCompletion, getAccuracy } = useProgress();
  const completion = status === 'active' ? getTopicCompletion(topicId) : 0;
  const accuracy = status === 'active' ? getAccuracy(topicId) : 0;
  const isLeft = index % 2 === 0;
  const isComingSoon = status === 'coming-soon';
  const isCompleted = completion === 100;
  const isInProgress = completion > 0 && completion < 100;

  // Star rating based on accuracy (for completed topics)
  const starCount = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : 1;

  const label = isComingSoon
    ? ''
    : isCompleted
      ? 'REPLAY'
      : isInProgress
        ? 'CONTINUE'
        : 'START';

  const nodeContent = (
    <div
      className={`flex flex-col items-center gap-1 transition-transform duration-200 ${
        !isComingSoon ? 'hover:-translate-y-1' : ''
      }`}
    >
      {/* Circle node */}
      <div
        className={`
          relative flex items-center justify-center
          w-16 h-16 md:w-20 md:h-20
          rounded-full text-2xl md:text-3xl
          transition-all duration-300
          ${
            isComingSoon
              ? 'border-2 border-dashed border-gray-400 bg-gray-200 opacity-60 grayscale'
              : isCompleted
                ? 'border-3 border-gold bg-gradient-to-br from-gold-light to-cream shadow-lg'
                : 'border-3 border-gold bg-white shadow-md animate-pulse-glow'
          }
        `}
      >
        {isComingSoon ? (
          <span className="text-gray-400 text-xl">&#128274;</span>
        ) : isCompleted ? (
          <>
            <span>{icon}</span>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gold rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-xs font-bold">&#10003;</span>
            </div>
          </>
        ) : isInProgress ? (
          <div className="relative flex items-center justify-center w-full h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <ProgressRing
                size={64}
                progress={completion}
                strokeWidth={4}
              />
            </div>
            <span className="relative z-10 text-lg md:text-xl">{icon}</span>
          </div>
        ) : (
          <span>{icon}</span>
        )}
      </div>

      {/* Stars for completed topics */}
      {isCompleted && (
        <div className="flex gap-0.5">
          {[1, 2, 3].map((star) => (
            <span
              key={star}
              className={`text-sm ${star <= starCount ? 'text-gold' : 'text-gray-300'}`}
            >
              &#9733;
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <span
        className={`text-xs md:text-sm font-bold text-center max-w-[100px] leading-tight ${
          isComingSoon ? 'text-gray-400' : 'text-dark-brown'
        }`}
      >
        {title}
      </span>

      {/* Status label */}
      {isComingSoon ? (
        <ComingSoonBadge className="text-[10px] px-2 py-0.5" />
      ) : (
        <span
          className={`text-[10px] font-extrabold uppercase tracking-widest ${
            isCompleted
              ? 'text-gold'
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
        <Link
          to={`/lesson/${lessonSlug}/${slug}`}
          className="no-underline"
        >
          {nodeContent}
        </Link>
      )}
    </div>
  );
}
