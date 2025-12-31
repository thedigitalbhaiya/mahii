
import React, { useMemo } from 'react';

const Confetti: React.FC = () => {
  const pieces = useMemo(() => {
    const colors = ['#f472b6', '#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa'];
    // Reduced from 100 to 45 for mobile performance
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: `${Math.random() * 0.4 + 0.3}rem`,
      delay: `${Math.random() * 3}s`,
      duration: `${Math.random() * 1.5 + 2}s`,
      angle: Math.random() * 360,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map(p => (
        <div
          key={p.id}
          className="absolute rounded-sm will-change-transform"
          style={{
            left: p.left,
            top: '-2rem',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `confetti-fall ${p.duration} linear ${p.delay} infinite`,
            opacity: 0.8,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate3d(0, 100vh, 0) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Confetti;
