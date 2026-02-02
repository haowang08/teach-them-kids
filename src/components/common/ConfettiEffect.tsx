import { useEffect, useState } from 'react';

interface ConfettiEffectProps {
  trigger: boolean;
  onComplete?: () => void;
}

const CONFETTI_COLORS = ['#C9A227', '#e74c3c', '#3498db', '#27ae60', '#9b59b6'];
const PIECE_COUNT = 20;

interface Piece {
  id: number;
  color: string;
  left: number;
  delay: number;
  rotation: number;
  size: number;
}

function generatePieces(): Piece[] {
  return Array.from({ length: PIECE_COUNT }, (_, i) => ({
    id: i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    left: Math.random() * 100,
    delay: Math.random() * 300,
    rotation: Math.random() * 360,
    size: 6 + Math.random() * 6,
  }));
}

export default function ConfettiEffect({ trigger, onComplete }: ConfettiEffectProps) {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!trigger) return;

    setPieces(generatePieces());
    setActive(true);

    const timer = setTimeout(() => {
      setActive(false);
      setPieces([]);
      onComplete?.();
    }, 1000);

    return () => clearTimeout(timer);
  }, [trigger, onComplete]);

  if (!active || pieces.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="animate-confetti absolute top-0"
          style={{
            left: `${piece.left}%`,
            width: piece.size,
            height: piece.size * 1.4,
            backgroundColor: piece.color,
            borderRadius: '2px',
            animationDelay: `${piece.delay}ms`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}
