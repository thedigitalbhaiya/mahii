
import React, { useState } from 'react';

interface LetterProps {
  onComplete: () => void;
}

const Letter: React.FC<LetterProps> = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`transition-all duration-700 w-full flex items-center justify-center ${isOpen ? 'h-[85dvh]' : 'h-[350px]'}`}>
      {!isOpen ? (
        <div 
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center cursor-pointer group active:scale-95 transition-all"
        >
          {/* Sealed Envelope Visual */}
          <div className="relative mb-6">
            <div className="absolute -inset-4 bg-pink-100/40 rounded-full blur-2xl animate-pulse" />
            <div className="w-28 h-28 bg-white rounded-3xl shadow-lg flex items-center justify-center border border-pink-50 relative z-10 animate-[floatLetter_3s_infinite_ease-in-out]">
              <span className="text-5xl">💌</span>
              <div className="absolute -top-1 -right-1 bg-pink-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-black animate-bounce shadow-md">
                🎀
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-slate-700 dancing-script mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
            A special letter... 💝
          </h3>
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.25em] animate-pulse">
            Tap to open 💗
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-6 sm:p-10 h-full w-full flex flex-col grid-paper animate-[expandLetter_0.8s_cubic-bezier(0.165,0.84,0.44,1)] relative border border-pink-50 overflow-hidden">
          <div className="flex justify-center items-center mb-6 z-20 border-b border-slate-50 pb-4">
            <span className="text-[9px] text-slate-400 font-black tracking-[0.4em] uppercase">Private Note for You 🎀</span>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 pt-2 cursor-default">
            <div className="space-y-5 text-slate-600 leading-relaxed text-[15px] italic">
              <h3 className="text-2xl font-bold text-blue-500 mb-4 dancing-script" style={{ fontFamily: "'Dancing Script', cursive" }}>
                My Dearest, 💖
              </h3>
              
              <p>
                As we step into 2026, I wanted to tell you how incredible you are. 🎀
                The past year was full of memories, but I know this one will be even better because 
                I get to spend it with you. 💗
              </p>

              <p>
                You aren't just a part of my life; you are the reason behind my smiles. 💝
                Your laugh is my favorite sound, and your happiness is everything to me. ❤‍🩹
              </p>

              <p>
                In 2026, I promise to be there for you through every sunrise and every starry night. ✨
                I may not be perfect, but I'll always be your biggest supporter and your best friend. 💖
              </p>

              <p>
                Let's make this year our best adventure yet. 365 new days to fall in love with life all over again. 🎇
              </p>

              <div className="pt-6 border-t border-slate-50">
                <p className="font-bold text-slate-800">Happy New Year 2026! 🥂❤️</p>
                <p className="mt-1 text-pink-400 font-bold text-xl dancing-script">#AlwaysYours 🎀💗</p>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-auto">
            <button 
              onClick={onComplete}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-lg active:scale-95"
            >
              Continue to Wish! ✨ 💖
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes expandLetter {
          0% { opacity: 0; transform: scale(0.3) translateY(60px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes floatLetter {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

export default Letter;
