
import React from 'react';
import { GirlSticker } from './VideoInteractions';

interface ThandChaandProps {
  onComplete: () => void;
}

const ThandChaand: React.FC<ThandChaandProps> = ({ onComplete }) => {
  return (
    <div className="relative w-full max-w-sm mx-auto bg-[#040712] rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[550px] h-[80dvh] max-h-[680px] flex flex-col items-center justify-between p-6 sm:p-8 border border-white/5 animate-[fadeIn_0.6s_ease-out] contain-paint">
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-900/30 rounded-full blur-[60px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative mt-2 z-20 flex flex-col items-center">
        <div className="w-24 h-24 flex items-center justify-center animate-[moonGlow_4s_infinite_ease-in-out]">
          <span className="text-[80px] leading-none block drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] select-none">🌙</span>
        </div>
        <div className="mt-4 animate-[fadeIn_1.5s_ease-out]">
          <GirlSticker pose="PRAY" size={160} />
        </div>
      </div>

      <div className="z-20 text-center w-full flex-1 flex flex-col justify-center px-2">
        <div className="space-y-4 sm:space-y-5 text-slate-300 dancing-script" style={{ fontFamily: "'Dancing Script', cursive" }}>
          <div className="animate-[fadeSlide_1s_ease-out_0.2s_both]">
            <p className="text-lg leading-relaxed text-white/95">
              She is not mine,<br/>
              yet I feel her presence everywhere.
            </p>
          </div>
          <div className="animate-[fadeSlide_1s_ease-out_1.4s_both] pt-2">
            <p className="text-lg leading-relaxed text-white/95 italic">
              <span className="text-blue-300/80">Jaise koi apna ho,</span><br/>
              jo kabhi paas na hoke bhi<br/>
              hamesha saath hota hai.
            </p>
          </div>
        </div>
      </div>

      <div className="z-20 w-full pb-2 animate-[fadeIn_0.5s_ease-out_2s_both]">
        <button
          onClick={onComplete}
          className="w-full bg-white/5 hover:bg-white/10 active:bg-white/20 border border-white/10 backdrop-blur-md text-blue-100/80 py-4 sm:py-5 rounded-2xl font-black text-[10px] sm:text-[11px] uppercase tracking-[0.4em] transition-all active:scale-[0.98]"
        >
          Continue
        </button>
      </div>

      <style>{`
        @keyframes moonGlow {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -10px, 0); }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translate3d(0, 15px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ThandChaand;
