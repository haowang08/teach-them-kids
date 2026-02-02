import { useEffect, useState } from 'react';

interface ProgressRingProps {
  size?: number;
  progress: number; // 0-100
  strokeWidth?: number;
  color?: string; // CSS variable (e.g. "var(--color-gold)") or hex
}

export default function ProgressRing({
  size = 80,
  progress,
  strokeWidth = 6,
  color = '#C9A227',
}: ProgressRingProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Animate on mount / when progress changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedProgress(Math.min(Math.max(progress, 0), 100));
    }, 50);
    return () => clearTimeout(timeout);
  }, [progress]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedProgress / 100) * circumference;
  const center = size / 2;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#e5e0d5"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
        />
      </svg>
      {/* Center text */}
      <span
        className="absolute font-bold text-[#3D2914]"
        style={{ fontSize: size * 0.22 }}
      >
        {Math.round(animatedProgress)}%
      </span>
    </div>
  );
}
