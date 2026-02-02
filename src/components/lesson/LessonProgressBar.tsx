import { useEffect, useState } from 'react';
import { useProgress } from '../../hooks/useProgress';

interface LessonProgressBarProps {
  lessonId: string;
}

export default function LessonProgressBar({ lessonId }: LessonProgressBarProps) {
  const { getLessonCompletion } = useProgress();
  const completion = getLessonCompletion(lessonId);
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedWidth(completion);
    }, 100);
    return () => clearTimeout(timeout);
  }, [completion]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-dark-brown">
          {Math.round(completion)}% complete
        </span>
      </div>
      <div className="w-full h-3 bg-cream rounded-full overflow-hidden border border-gold-light">
        <div
          className="h-full rounded-full"
          style={{
            width: `${animatedWidth}%`,
            background: 'linear-gradient(90deg, #C9A227, #F5E6A3)',
            transition: 'width 0.8s ease-out',
          }}
        />
      </div>
    </div>
  );
}
