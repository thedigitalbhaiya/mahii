
import React from 'react';

interface ThandChaandProps {
  onComplete: () => void;
}

const ThandChaand: React.FC<ThandChaandProps> = ({ onComplete }) => {
  return (
    <div className="relative w-full max-w-sm mx-auto bg-[#040712] rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[550px] h-[80dvh] max-h-[680px] flex flex-col items-center justify-between p-6 sm:p-8 border border-white/5 animate-[fadeIn_0.6s_ease-out] contain-paint">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-900/30 rounded-full blur-[60px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
      </div>

      {/* Moon - Centered and Glowing */}
      <div className="relative mt-12 z-20 flex flex-col items-center flex-1 justify-center">
        <div className="w-32 h-32 flex items-center justify-center animate-[moonGlow_4s_infinite_ease-in-out]">
          <span className="text-[100px] leading-none block drop-shadow-[0_0_35px_rgba(255,255,255,0.5)] select-none">🌙</span>
        </div>
      </div>

      {/* Poetic Text */}
      <div className="z-20 text-center w-full flex-1 flex flex-col justify-center px-2 mb-10">
        <div className="space-y-6 sm:space-y-8 text-slate-300 dancing-script" style={{ fontFamily: "'Dancing Script', cursive" }}>
          <div className="animate-[fadeSlide_1.2s_ease-out_0.2s_both]">
            <p className="text-2xl leading-relaxed text-white/95">
              She is not mine,<br/>
              yet I feel her presence everywhere.
            </p>
          </div>
          <div className="animate-[fadeSlide_1.2s_ease-out_1.4s_both] pt-2">
            <p className="text-2xl leading-relaxed text-white/95 italic">
              <span className="text-blue-300/80">Jaise koi apna ho,</span><br/>
              jo kabhi paas na hoke bhi<br/>
              hamesha saath hota hai.
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="z-20 w-full pb-4 animate-[fadeIn_0.5s_ease-out_2.5s_both]">
        <button
          onClick={onComplete}
          className="w-full bg-white/5 hover:bg-white/10 active:bg-white/20 border border-white/10 backdrop-blur-md text-blue-100/80 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] transition-all active:scale-[0.98]"
        >
          Continue
        </button>
      </div>

      <style>{`
        @keyframes moonGlow {
          0%, 100% { transform: translate3d(0, 0, 0); filter: drop-shadow(0 0 20px rgba(255,255,255,0.3)); }
          50% { transform: translate3d(0, -15px, 0); filter: drop-shadow(0 0 40px rgba(255,255,255,0.6)); }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translate3d(0, 20px, 0); }
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
