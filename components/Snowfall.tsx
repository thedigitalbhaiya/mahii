
import React, { useMemo } from 'react';

const Snowfall: React.FC = () => {
  const snowflakes = useMemo(() => {
    return Array.from({ length: 30 }).map(((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${10 + Math.random() * 12}s`,
      animationDelay: `${Math.random() * 10}s`,
      size: `${Math.random() * 0.4 + 0.1}rem`,
      opacity: Math.random() * 0.5 + 0.2
    })));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 contain-strict">
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="absolute text-white will-change-transform pointer-events-none"
          style={{
            left: flake.left,
            top: '-2rem',
            fontSize: flake.size,
            opacity: flake.opacity,
            animation: `fall ${flake.animationDuration} linear ${flake.animationDelay} infinite`
          }}
        >
          ❄
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translate3d(0, -20px, 0); }
          100% { transform: translate3d(0, 110vh, 0); }
        }
      `}</style>
    </div>
  );
};

export default Snowfall;
