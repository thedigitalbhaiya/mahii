
import React from 'react';

/**
 * Component to display the specific character stickers.
 * Updated with high-priority loading for immediate display.
 */
export const GirlSticker: React.FC<{ 
  pose: 'KISS' | 'PRAY' | 'EXCITED' | 'HEARTS' | 'HOLD_HEART'; 
  size?: number; 
  className?: string 
}> = ({ pose, size = 180, className = "" }) => {
  const stickerMap = {
    PRAY: 'https://yelling-beige-otdwf6myhv.edgeone.app/20251231_192633.png',
    EXCITED: 'https://yelling-beige-otdwf6myhv.edgeone.app/20251231_192653.png',
    KISS: 'https://yelling-beige-otdwf6myhv.edgeone.app/20251231_192708.png',
    HEARTS: 'https://yelling-beige-otdwf6myhv.edgeone.app/20251231_192722.png',
    HOLD_HEART: 'https://yelling-beige-otdwf6myhv.edgeone.app/20251231_192744.png'
  };

  return (
    <div 
      className={`relative select-none pointer-events-none flex items-center justify-center transition-all duration-300 ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <img 
        src={stickerMap[pose]} 
        alt={`Character sticker ${pose}`}
        className="w-full h-full object-contain drop-shadow-md"
        loading="eager"
        // @ts-ignore - fetchpriority is a valid experimental attribute
        fetchpriority="high"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "https://cdn-icons-png.flaticon.com/512/833/833472.png"; 
        }}
      />
    </div>
  );
};

export const MadeSomething: React.FC<{ onYes: () => void }> = ({ onYes }) => {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 text-center grid-paper animate-[fadeIn_0.5s_ease-out] border border-slate-50 mx-4 max-w-[350px]">
      <h2 className="text-[28px] font-medium text-slate-700 dancing-script mb-10 leading-[1.3] px-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
        hey i made you something <br/> would you like to see it
      </h2>
      <div className="flex justify-center mb-12 animate-[float_3s_infinite_ease-in-out]">
        <GirlSticker pose="PRAY" size={180} />
      </div>
      <div className="flex justify-center">
        <button 
          onClick={onYes}
          className="w-full max-w-[200px] bg-[#f472b6] hover:bg-pink-500 text-white py-4 rounded-2xl font-bold text-[13px] uppercase tracking-widest active:scale-95 transition-all shadow-md"
        >
          YES
        </button>
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export const AreYouReady: React.FC<{ onYes: () => void }> = ({ onYes }) => {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 text-center grid-paper animate-[fadeIn_0.5s_ease-out] border border-slate-50 mx-4 max-w-[350px]">
      <h2 className="text-4xl font-bold text-slate-700 dancing-script mb-10" style={{ fontFamily: "'Dancing Script', cursive" }}>
        Are you ready?
      </h2>
      <div className="flex justify-center mb-12 animate-[popIn_0.5s_ease-out]">
        <GirlSticker pose="EXCITED" size={180} />
      </div>
      <button 
        onClick={onYes}
        className="w-full bg-[#f472b6] hover:bg-pink-500 text-white py-4 rounded-2xl font-bold text-[13px] uppercase tracking-widest active:scale-95 transition-all shadow-md"
      >
        YES
      </button>
      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export const KissInteraction: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 text-center grid-paper animate-[fadeIn_0.5s_ease-out] border border-slate-50 mx-4 max-w-[350px]">
      <h2 className="text-4xl font-bold text-slate-700 dancing-script mb-10" style={{ fontFamily: "'Dancing Script', cursive" }}>
        kiss me first
      </h2>
      <div className="flex justify-center mb-12 animate-pulse">
        <GirlSticker pose="KISS" size={180} />
      </div>
      <button 
        onClick={onComplete}
        className="w-full bg-[#f472b6] hover:bg-pink-500 text-white py-4 rounded-2xl font-bold text-[13px] uppercase tracking-widest active:scale-95 transition-all shadow-md"
      >
        NEXT
      </button>
    </div>
  );
};

export const BlushingResponse: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 text-center grid-paper animate-[fadeIn_0.5s_ease-out] border border-slate-50 mx-4 max-w-[350px]">
      <h2 className="text-4xl font-bold text-slate-700 dancing-script mb-10" style={{ fontFamily: "'Dancing Script', cursive" }}>
        aww im blushing
      </h2>
      <div className="flex justify-center mb-12">
        <GirlSticker pose="HEARTS" size={180} />
      </div>
      <button 
        onClick={onComplete}
        className="w-full bg-[#f472b6] hover:bg-pink-500 text-white py-4 rounded-2xl font-bold text-[13px] uppercase tracking-widest active:scale-95 transition-all"
      >
        NEXT
      </button>
    </div>
  );
};

export const KuchupuchuWish: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <div className="bg-slate-900 rounded-[2.5rem] shadow-2xl p-10 text-center relative overflow-hidden h-[480px] flex flex-col items-center justify-center border border-white/10 mx-4 max-w-[350px]">
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full animate-[firework_2s_infinite]"
            style={{
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
              backgroundColor: ['#fbbf24', '#f87171', '#60a5fa', '#34d399', '#f472b6'][i % 5],
              width: '2px',
              height: '2px',
              animationDelay: `${i * 0.15}s`
            }}
          />
        ))}
      </div>

      <div className="z-10 relative">
        <h2 className="text-3xl font-bold text-white dancing-script mb-8 leading-tight" style={{ fontFamily: "'Dancing Script', cursive" }}>
          Happy new year <br/>
          My Kuchupuchu
        </h2>
        <div className="flex justify-center mb-10 animate-bounce">
          <GirlSticker pose="HOLD_HEART" size={180} />
        </div>
        <button 
          onClick={onComplete}
          className="w-full bg-white/10 backdrop-blur-md text-white border border-white/20 py-4 px-10 rounded-2xl font-bold text-[13px] uppercase tracking-widest active:scale-95 transition-all"
        >
          NEXT
        </button>
      </div>

      <style>{`
        @keyframes firework {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(80); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
