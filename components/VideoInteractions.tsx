
import React, { useState } from 'react';

/**
 * Component to display specific girl stickers using the provided individual PNGs.
 */
export const GirlSticker: React.FC<{ 
  pose: 'KISS' | 'PRAY' | 'EXCITED' | 'HEARTS' | 'HOLD_HEART'; 
  size?: number; 
  className?: string 
}> = ({ pose, size = 180, className = "" }) => {
  const stickerMap = {
    HEARTS: 'https://i.ibb.co/6YhYyW1/hearts.png',
    HOLD_HEART: 'https://i.ibb.co/hZq9v10/hold-heart.png',
    EXCITED: 'https://i.ibb.co/yN1vjT5/excited.png',
    PRAY: 'https://i.ibb.co/K2s3tX0/pray.png',
    KISS: 'https://i.ibb.co/zXq2S0H/kiss.png'
  };

  return (
    <div 
      className={`relative select-none pointer-events-none flex items-center justify-center transition-all duration-300 ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <img 
        src={stickerMap[pose]} 
        alt={`Girl sticker ${pose}`}
        className="w-full h-full object-contain"
        loading="eager"
      />
    </div>
  );
};

/**
 * SCREEN 1: "Hey i made you something would you like to see it"
 */
export const MadeSomething: React.FC<{ onYes: () => void }> = ({ onYes }) => {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 text-center grid-paper animate-[fadeIn_0.5s_ease-out] border border-slate-50 mx-4 max-w-[340px]">
      <h2 className="text-3xl font-bold text-slate-700 dancing-script mb-10 leading-tight" style={{ fontFamily: "'Dancing Script', cursive" }}>
        hey i made you something <br/> would you like to see it
      </h2>
      <div className="flex justify-center mb-12 animate-[float_3s_infinite_ease-in-out]">
        <GirlSticker pose="PRAY" size={200} />
      </div>
      <div className="flex justify-center">
        <button 
          onClick={onYes}
          className="w-full max-w-[160px] bg-pink-400 hover:bg-pink-500 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest active:scale-95 transition-all shadow-md"
        >
          YES
        </button>
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
};

/**
 * SCREEN 2: "Are you ready?"
 */
export const AreYouReady: React.FC<{ onYes: () => void }> = ({ onYes }) => {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 text-center grid-paper animate-[fadeIn_0.5s_ease-out] border border-slate-50 mx-4 max-w-[340px]">
      <h2 className="text-4xl font-bold text-slate-700 dancing-script mb-10" style={{ fontFamily: "'Dancing Script', cursive" }}>
        Are you ready?
      </h2>
      <div className="flex justify-center mb-12 animate-[popIn_0.5s_ease-out]">
        <GirlSticker pose="EXCITED" size={200} />
      </div>
      <button 
        onClick={onYes}
        className="w-full bg-pink-400 hover:bg-pink-500 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest active:scale-95 transition-all shadow-md"
      >
        YES
      </button>
    </div>
  );
};

/**
 * SCREEN 3: "kiss me first"
 */
export const KissInteraction: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 text-center grid-paper animate-[fadeIn_0.5s_ease-out] border border-slate-50 mx-4 max-w-[340px]">
      <h2 className="text-4xl font-bold text-slate-700 dancing-script mb-10" style={{ fontFamily: "'Dancing Script', cursive" }}>
        kiss me first
      </h2>
      <div className="flex justify-center mb-12 animate-pulse">
        <GirlSticker pose="KISS" size={200} />
      </div>
      <button 
        onClick={onComplete}
        className="w-full bg-pink-400 hover:bg-pink-500 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest active:scale-95 transition-all"
      >
        NEXT
      </button>
    </div>
  );
};

/**
 * SCREEN 4: "aww im blushing"
 */
export const BlushingResponse: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 text-center grid-paper animate-[fadeIn_0.5s_ease-out] border border-slate-50 mx-4 max-w-[340px]">
      <h2 className="text-4xl font-bold text-slate-700 dancing-script mb-10" style={{ fontFamily: "'Dancing Script', cursive" }}>
        aww im blushing
      </h2>
      <div className="flex justify-center mb-12">
        <GirlSticker pose="HEARTS" size={200} />
      </div>
      <button 
        onClick={onComplete}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest active:scale-95 transition-all"
      >
        NEXT
      </button>
    </div>
  );
};

/**
 * SCREEN 5: "Happy new year My Kuchupuchu"
 */
export const KuchupuchuWish: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <div className="bg-slate-900 rounded-[2.5rem] shadow-2xl p-8 text-center relative overflow-hidden h-[480px] flex flex-col items-center justify-center border border-white/10 mx-4 max-w-[340px]">
      <div className="absolute inset-0 z-0">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full animate-[firework_2s_infinite]"
            style={{
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
              backgroundColor: ['#fbbf24', '#f87171', '#60a5fa', '#34d399'][i % 4],
              width: '3px',
              height: '3px',
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      <div className="z-10 relative">
        <h2 className="text-3xl font-bold text-white dancing-script mb-6 leading-tight" style={{ fontFamily: "'Dancing Script', cursive" }}>
          Happy new year <br/>
          My Kuchupuchu
        </h2>
        <div className="flex justify-center mb-10 animate-bounce">
          <GirlSticker pose="HOLD_HEART" size={200} />
        </div>
        <button 
          onClick={onComplete}
          className="w-full bg-white/10 backdrop-blur-md text-white border border-white/20 py-4 px-10 rounded-2xl font-black text-[11px] uppercase tracking-widest active:scale-95 transition-all"
        >
          NEXT
        </button>
      </div>

      <style>{`
        @keyframes firework {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(35); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
