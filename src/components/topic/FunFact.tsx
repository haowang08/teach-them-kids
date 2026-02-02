import type { FunFactData } from '../../data/types';

interface FunFactProps {
  fact: FunFactData;
}

export default function FunFact({ fact }: FunFactProps) {
  return (
    <div className="rounded-xl p-5 my-4 bg-gradient-to-br from-[var(--topic-gold-light)] via-[var(--topic-sand)] to-[var(--topic-gold-light)] border border-[var(--topic-gold)]/30">
      <div className="flex items-start gap-3">
        {/* Spinning star */}
        <span className="animate-spin-slow text-2xl shrink-0 mt-0.5" aria-hidden="true">
          &#11088;
        </span>

        <div>
          <h4 className="text-base font-bold text-[var(--topic-dark-brown)] mb-1">
            {fact.title}
          </h4>
          <p className="text-sm text-[var(--topic-dark-brown)]/80 leading-relaxed">
            {fact.text}
          </p>
        </div>
      </div>
    </div>
  );
}
