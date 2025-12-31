
import React from 'react';

interface IntroCardProps {
  onOpen: () => void;
}

const IntroCard: React.FC<IntroCardProps> = ({ onOpen }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center animate-[fadeIn_1s_ease-out] min-h-[400px]">
      <h1 className="text-[32px] text-slate-700 mb-8 opacity-90 leading-tight tracking-tight" style={{ fontFamily: "'Dancing Script', cursive" }}>
        For someone special
      </h1>
      
      <div 
        onClick={onOpen}
        className="relative cursor-pointer group active:scale-95 transition-transform duration-200 flex flex-col items-center"
      >
        {/* "Tap me!" badge exactly like the image */}
        <div className="mb-[-10px] relative z-20">
          <div className="bg-white border border-red-100 px-4 py-1.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.05)] animate-[bounce_2s_infinite]">
            <span className="text-red-500 font-bold text-[10px] uppercase tracking-wider whitespace-nowrap">Tap me!</span>
            {/* Small arrow at the bottom of the badge */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-red-50 rotate-45 shadow-[2px_2px_2px_rgba(0,0,0,0.02)]"></div>
          </div>
        </div>

        {/* Gift Icon Centerpiece */}
        <div className="relative w-32 h-32 flex items-center justify-center animate-[float_4s_infinite_ease-in-out]">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="w-24 h-24 text-red-500 drop-shadow-sm" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M20 12v10H4V12" />
            <path d="M2 7h20v5H2z" />
            <path d="M12 22V7" />
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
          </svg>
          {/* Subtle glow behind the gift */}
          <div className="absolute inset-0 bg-red-400 rounded-full blur-[40px] opacity-10 -z-10"></div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
};

export default IntroCard;
