
import React, { useState } from 'react';
import { GirlSticker } from './VideoInteractions';

interface HowMuchProps {
  onComplete: () => void;
}

const HowMuch: React.FC<HowMuchProps> = ({ onComplete }) => {
  const [value, setValue] = useState(0);
  const [maxed, setMaxed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setValue(val);
    if (val >= 100) {
      if (!maxed && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate([30, 50, 100]);
      }
      setMaxed(true);
    }
  };

  const getMessage = () => {
    if (value === 0) return "Slide to find out...";
    if (value < 25) return "A little? No...";
    if (value < 50) return "A lot? Still more!";
    if (value < 75) return "To the moon and back!";
    if (value < 100) return "Beyond the stars!!";
    return "IT'S INFINITE! ♾️❤️";
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl p-8 text-center grid-paper animate-[scaleUp_0.5s_ease-out] min-h-[580px] h-[75dvh] max-h-[700px] flex flex-col items-center border border-slate-100 overflow-hidden">
      <div className="mb-4">
        <h2 className="text-4xl text-slate-400 dancing-script" style={{ fontFamily: "'Dancing Script', cursive" }}>
          How much do I like you?
        </h2>
        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em] mt-3">ADJUST THE LOVE METER</p>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center space-y-12">
        <div className="relative w-48 h-48 flex items-center justify-center">
           <div 
             className="absolute inset-0 bg-pink-100 rounded-full opacity-20 blur-3xl transition-all duration-500" 
             style={{ transform: `scale(${1 + value / 100})`, opacity: 0.1 + (value / 150) }}
           />
           <div className={`transition-all duration-300 transform drop-shadow-2xl ${value === 100 ? 'scale-110' : 'scale-100'}`}>
             <GirlSticker pose={value === 100 ? "KISS" : "HEARTS"} size={220} />
           </div>
        </div>

        <div className="w-full px-4 relative">
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={value}
            onChange={handleChange}
            className="w-full h-4 bg-slate-100 rounded-full appearance-none cursor-pointer accent-pink-400 shadow-inner"
          />
          {!maxed && value < 70 && (
              <div className="absolute right-6 -top-10 flex flex-col items-center animate-[slideRight_2s_infinite]">
                <span className="text-[10px] font-black text-pink-300 uppercase tracking-widest mb-1">Slide right</span>
                <span className="text-xl">👉</span>
              </div>
          )}
          <div className="mt-8">
            <p className={`text-lg font-black transition-all duration-300 uppercase tracking-tighter ${value === 100 ? 'text-pink-500 scale-110' : 'text-slate-400'}`}>
              {getMessage()}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto w-full pt-8">
        {maxed ? (
          <button
            onClick={onComplete}
            className="w-full bg-pink-400 hover:bg-pink-500 text-white py-5 rounded-2xl font-black shadow-xl animate-[popIn_0.4s_ease-out] transition-all active:scale-95 uppercase tracking-widest text-[11px]"
          >
            I knew it! 🥰
          </button>
        ) : (
          <div className="text-slate-200 text-[10px] font-black uppercase tracking-[0.3em] py-4 bg-slate-50/50 rounded-full inline-block px-8">
            Keep sliding to the right...
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideRight {
          0%, 100% { transform: translateX(0); opacity: 0.5; }
          50% { transform: translateX(10px); opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes popIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 32px;
          height: 32px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: 4px solid #f9a8d4;
          box-shadow: 0 0 15px rgba(244, 114, 182, 0.4);
        }
      `}</style>
    </div>
  );
};

export default HowMuch;
