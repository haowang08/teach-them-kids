interface CharCounterProps {
  current: number;
  min: number;
}

export default function CharCounter({ current, min }: CharCounterProps) {
  const percentage = Math.min((current / min) * 100, 100);
  const met = current >= min;

  return (
    <div className="mt-3">
      {/* Thermometer bar */}
      <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            met
              ? 'bg-emerald-500'
              : 'bg-gradient-to-r from-[var(--topic-gold-light)] to-[var(--topic-gold)]'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Counter text */}
      <p
        className={`text-xs mt-1.5 font-semibold ${
          met ? 'text-emerald-600' : 'text-[var(--topic-bronze)]'
        }`}
      >
        {current} / {min} characters
        {met && ' -- Ready to save!'}
      </p>
    </div>
  );
}
