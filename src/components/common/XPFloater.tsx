import { useEffect, useState } from 'react';

interface XPFloaterProps {
  amount: number;
  trigger: boolean;
}

export default function XPFloater({ amount, trigger }: XPFloaterProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!trigger) return;

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 1200); // matches xp-float animation duration

    return () => clearTimeout(timer);
  }, [trigger]);

  if (!visible || amount <= 0) return null;

  return (
    <span
      className="animate-xp-float pointer-events-none inline-block text-lg font-bold text-[#C9A227]"
      aria-live="polite"
    >
      +{amount} XP
    </span>
  );
}
