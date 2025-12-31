
import React, { useState } from 'react';

interface Reason {
  id: number;
  text: string;
  revealed: boolean;
}

interface WhyILikeHerProps {
  onComplete: () => void;
}

const WhyILikeHer: React.FC<WhyILikeHerProps> = ({ onComplete }) => {
  const [reasons, setReasons] = useState<Reason[]>([
    { id: 1, text: "Your beautiful soul", revealed: false },
    { id: 2, text: "Your cute smile", revealed: false },
    { id: 3, text: "The way you care", revealed: false },
    { id: 4, text: "Your intelligence", revealed: false },
    { id: 5, text: "Your goofy humor", revealed: false },
    { id: 6, text: "Just being YOU", revealed: false },
  ]);

  const toggleReason = (id: number) => {
    setReasons(prev => prev.map(r => r.id === id ? { ...r, revealed: true } : r));
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(15);
    }
  };

  const allRevealed = reasons.every(r => r.revealed);
  const noneRevealed = reasons.every(r => !r.revealed);

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl p-8 text-center grid-paper animate-[slideUp_0.6s_ease-out] min-h-[580px] h-[75dvh] max-h-[700px] flex flex-col border border-pink-50 relative overflow-hidden">
      <div className="mb-6">
        <h2 className="text-4xl text-slate-400 dancing-script" style={{ fontFamily: "'Dancing Script', cursive" }}>
          Why I Like You...
        </h2>
        <p className="text-[10px] text-slate-300 font-bold tracking-[0.2em] mt-3 uppercase">Tap the hearts to reveal</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 flex-1 mb-8 overflow-y-auto custom-scrollbar p-2 relative">
        {noneRevealed && (
            <div className="absolute top-10 left-10 pointer-events-none z-10 animate-bounce flex flex-col items-center">
                <span className="text-4xl">👆</span>
                <span className="text-[9px] font-black text-pink-400 uppercase tracking-widest mt-1">Tap a heart</span>
            </div>
        )}

        {reasons.map(reason => (
          <button
            key={reason.id}
            onClick={() => toggleReason(reason.id)}
            className={`
              relative h-28 rounded-[1.5rem] border-2 transition-all duration-500 overflow-hidden flex items-center justify-center p-3 active:scale-95
              ${reason.revealed 
                ? 'bg-pink-50 border-pink-100 shadow-inner' 
                : 'bg-white border-slate-50 shadow-sm hover:border-pink-200'
              }
            `}
          >
            {reason.revealed ? (
              <span className="text-xs sm:text-sm font-black text-slate-600 leading-tight uppercase tracking-tighter animate-[popIn_0.3s_ease-out]">
                {reason.text}
              </span>
            ) : (
              <span className="text-3xl animate-pulse filter drop-shadow-sm">❤️</span>
            )}
            {reason.revealed && (
              <div className="absolute top-2 right-2 text-[10px] opacity-30">✨</div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-auto">
        {allRevealed ? (
          <button
            onClick={onComplete}
            className="w-full bg-gradient-to-r from-pink-400 to-rose-400 hover:brightness-105 text-white py-4 rounded-2xl font-black shadow-xl transition-all transform active:scale-95 animate-[fadeIn_0.5s] uppercase tracking-widest text-[11px]"
          >
            But there's one more thing...
          </button>
        ) : (
          <p className="text-[9px] text-slate-300 font-black uppercase tracking-[0.25em] py-4 bg-slate-50/50 rounded-full border border-slate-100">
            Reveal all {reasons.length} reasons
          </p>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default WhyILikeHer;
