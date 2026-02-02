interface ComingSoonBadgeProps {
  className?: string;
}

export default function ComingSoonBadge({ className = '' }: ComingSoonBadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-gray-500/80 text-white rounded-full select-none ${className}`}
    >
      Coming Soon
    </span>
  );
}
