
import React from 'react';
import { GirlSticker } from './VideoInteractions';

interface IntroCardProps {
  onOpen: () => void;
}

const IntroCard: React.FC<IntroCardProps> = ({ onOpen }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center animate-[fadeIn_1s_ease-out]">
      <h1 className="text-[36px] sm:text-[42px] text-[#334155] dancing-script mb-16 opacity-90 leading-tight" style={{ fontFamily: "'Dancing Script', cursive" }}>
        For someone special
      </h1>
      
      <div 
        onClick={onOpen}
        className="relative cursor-pointer group active:scale-95 transition-transform duration-200"
      >
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 translate-x-10 bg-white border-[1.5px] border-red-200 px-4 py-1.5 rounded-2xl shadow-[0_4px_12px_rgba(239,68,68,0.08)] animate-[bounce_2.5s_infinite] z-20">
          <span className="text-[#e11d48] font-black text-sm tracking-tight whitespace-nowrap">Tap me!</span>
          <div className="absolute -bottom-1 left-4 w-2.5 h-2.5 bg-white border-r-[1.5px] border-b-[1.5px] border-red-200 rotate-45"></div>
        </div>

        <div className="relative w-48 h-48 flex items-center justify-center animate-[float_4s_infinite_ease-in-out]">
          <GirlSticker pose="PRAY" size={240} />
          <div className="absolute inset-0 bg-red-400 rounded-full blur-[50px] opacity-10 -z-10 animate-pulse"></div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -8px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  );
};

export default IntroCard;
