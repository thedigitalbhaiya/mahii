
import React, { useState } from 'react';

interface FlowerSticker {
  emoji: string;
  name: string;
}

const BouquetStage: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const flowers: FlowerSticker[] = [
    { emoji: '🌹', name: 'ROSE' },
    { emoji: '🌷', name: 'TULIP' },
    { emoji: '🌸', name: 'CHERRY' },
    { emoji: '🌻', name: 'SUN' },
    { emoji: '🌺', name: 'HIBISCUS' },
    { emoji: '🌼', name: 'DAISY' }
  ];
  
  const [collected, setCollected] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  const addFlower = (emoji: string) => {
    if (collected.length >= 6 || collected.includes(emoji)) return;
    
    setCollected(prev => {
      const next = [...prev, emoji];
      if (next.length === 6) {
        setTimeout(() => setIsDone(true), 1200);
      }
      return next;
    });

    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl p-6 sm:p-8 text-center grid-paper animate-[fadeIn_0.5s_ease-out] min-h-[580px] h-[75dvh] max-h-[700px] flex flex-col items-center border border-slate-100 relative overflow-hidden">
      <div className="mb-2">
        <h2 className="text-4xl text-slate-400 dancing-script" style={{ fontFamily: "'Dancing Script', cursive" }}>
          Build Your Bouquet
        </h2>
        <p className="text-[10px] text-slate-300 font-bold tracking-[0.2em] mt-2 uppercase">
          PICK 6 FLOWERS FOR THE VASE
        </p>
      </div>

      <div className="relative w-full flex-1 flex justify-center items-end pb-8">
        <div className="absolute inset-x-0 bottom-24 h-48 pointer-events-none z-0">
          {collected.map((emoji, i) => {
            const angle = (i - 2.5) * 28; 
            const distance = 105;
            const x = Math.sin((angle * Math.PI) / 180) * distance;
            const y = -Math.cos((angle * Math.PI) / 180) * distance + 60;
            
            return (
              <div 
                key={i} 
                className="absolute left-1/2 bottom-0"
                style={{ 
                  transform: `translateX(calc(-50% + ${x}px)) translateY(${y}px)`,
                }}
              >
                <div className="relative flex flex-col items-center">
                  <span className="text-5xl leading-none animate-[flowerPop_0.4s_ease-out_forwards] select-none block">
                    {emoji}
                  </span>
                  <div 
                    className="w-1.5 h-28 bg-green-200/60 rounded-full -mt-2 origin-top"
                    style={{ transform: `rotate(${-angle * 0.4}deg)` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-44 h-32 sm:h-40 bg-white/40 border-[3px] border-blue-100/50 rounded-b-[45px] rounded-t-sm relative z-10 backdrop-blur-[2px] shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-blue-50/10 rounded-b-[45px]" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-y-4 gap-x-6 w-full px-2 mt-2 relative">
        {collected.length === 0 && (
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-20 pointer-events-none">
                <span className="text-4xl">👇</span>
                <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest mt-1">Pick a flower</span>
            </div>
        )}
        {flowers.map((f, i) => {
          const isSelected = collected.includes(f.emoji);
          return (
            <button
              key={i}
              disabled={isSelected}
              onClick={() => addFlower(f.emoji)}
              className={`
                group flex flex-col items-center justify-center transition-all duration-300 py-2
                ${isSelected 
                  ? 'opacity-20 grayscale' 
                  : 'hover:scale-110 active:scale-95'
                }
              `}
            >
              <span className="text-5xl leading-none mb-1 select-none block">{f.emoji}</span>
              <span className="text-[8px] font-black text-slate-300 tracking-[0.2em] uppercase">{f.name}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-6 w-full flex flex-col items-center">
        {isDone ? (
          <button
            onClick={onComplete}
            className="w-full bg-blue-400 hover:bg-blue-500 text-white py-4 rounded-2xl font-black shadow-lg animate-[popIn_0.4s_ease-out] transition-all active:scale-95 uppercase tracking-widest text-[11px]"
          >
            I hope you like it 💐
          </button>
        ) : (
          <div className="text-slate-200 text-[10px] font-black uppercase tracking-[0.3em] py-4 bg-slate-50/50 px-6 rounded-full mb-2">
            {collected.length} / 6 COLLECTED
          </div>
        )}
      </div>

      <style>{`
        @keyframes flowerPop {
          0% { transform: scale(0) translateY(30px); opacity: 0; }
          70% { transform: scale(1.1) translateY(-10px); }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default BouquetStage;
