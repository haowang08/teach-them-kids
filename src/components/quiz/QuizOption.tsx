interface QuizOptionProps {
  text: string;
  isCorrect: boolean;
  disabled: boolean;
  state: 'default' | 'correct' | 'wrong' | 'disabled';
  onClick: () => void;
}

export default function QuizOption({
  text,
  disabled,
  state,
  onClick,
}: QuizOptionProps) {
  const baseClasses =
    'w-full min-h-[56px] md:min-h-[48px] md:w-auto md:rounded-full rounded-xl px-6 py-3 text-sm md:text-base font-semibold transition-all duration-200 cursor-pointer border-2 text-left md:text-center';

  const stateClasses: Record<string, string> = {
    default:
      'bg-white border-[var(--topic-primary)]/20 text-[var(--topic-dark-brown)] hover:border-[var(--topic-primary)]/50 hover:shadow-sm active:scale-[0.98]',
    correct:
      'bg-emerald-100 border-emerald-500 text-emerald-800 animate-celebrate',
    wrong:
      'bg-red-100 border-red-400 text-red-700 animate-shake',
    disabled:
      'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-60',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${stateClasses[state]}`}
    >
      {text}
    </button>
  );
}
