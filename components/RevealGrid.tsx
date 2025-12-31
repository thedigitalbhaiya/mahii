
import React, { useState } from 'react';
import { GirlSticker } from './VideoInteractions';

interface RevealGridProps {
  onComplete: () => void;
}

const RevealGrid: React.FC<RevealGridProps> = ({ onComplete }) => {
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false, false, false]);
  
  const items = [
    { text: "You", pose: "HEARTS" as const },
    { text: "are", pose: "EXCITED" as const },
    { text: "my", pose: "PRAY" as const },
    { text: "best", pose: "KISS" as const },
    { text: "blessing ❤️", pose: "HOLD_HEART" as const }
  ];

  const handleReveal = (index: number) => {
    if (revealed[index]) return;
    
    const nextRevealed = [...revealed];
    nextRevealed[index] = true;
    setRevealed(nextRevealed);

    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(20);
    }

    if (nextRevealed.every(v => v)) {
      setTimeout(onComplete, 2500);
    }
  };

  const noneRevealed = revealed.every(v => !v);

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl p-8 grid-paper animate-[scaleUp_0.5s_ease-out] border border-slate-50">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-slate-400 dancing-script mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
          Just for you
        </h2>
        <p className="text-xs text-slate-500 italic tracking-wide">I don't need a resolution, because...</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 py-4 relative">
        {noneRevealed && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce z-20 pointer-events-none flex flex-col items-center">
                <span className="text-5xl mb-2">👆</span>
                <span className="text-[10px] font-black text-pink-400 uppercase tracking-[0.3em] bg-white px-4 py-1 rounded-full shadow-sm border border-pink-50">Tap to reveal</span>
            </div>
        )}

        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleReveal(idx)}
            className={`
              w-24 h-24 sm:w-28 sm:h-28 rounded-2xl shadow-sm border-2 transition-all duration-500 p-2 relative overflow-hidden active:scale-95
              ${revealed[idx] 
                ? 'bg-white border-blue-50 rotate-0 shadow-inner' 
                : 'bg-pink-50 border-pink-100 rotate-3 hover:rotate-0 hover:bg-pink-100'
              }
            `}
          >
            {revealed[idx] ? (
              <div className="flex flex-col items-center justify-center h-full animate-[popIn_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]">
                <GirlSticker pose={item.pose} size={60} />
                <span className="text-slate-700 font-black text-[9px] uppercase tracking-tighter mt-1">{item.text}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-pink-300 text-3xl opacity-60">❤️</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {revealed.every(v => v) && (
        <div className="text-center mt-10 text-blue-400 font-bold text-[10px] uppercase tracking-[0.3em] animate-pulse">
          Wait for it... ✨
        </div>
      )}

      <style>{`
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default RevealGrid;
