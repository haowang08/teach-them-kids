import type { TimelineEntry } from '../../data/types';
import TimelineItem from './TimelineItem';

interface TimelineProps {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  if (entries.length === 0) return null;

  return (
    <div className="relative my-8">
      {/* Continuous vertical line for desktop */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[var(--topic-gold)]/20 -translate-x-1/2" />

      <div className="space-y-2">
        {entries.map((entry, i) => (
          <TimelineItem key={`${entry.year}-${i}`} entry={entry} index={i} />
        ))}
      </div>
    </div>
  );
}
