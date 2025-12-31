
import React from 'react';
import { GirlSticker } from './VideoInteractions';

interface CrushHistoryProps {
  onComplete: () => void;
}

const CrushHistory: React.FC<CrushHistoryProps> = ({ onComplete }) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-2xl p-8 text-center grid-paper animate-[fadeIn_0.6s_ease-out] min-h-[580px] h-[75dvh] max-h-[700px] flex flex-col items-center border border-slate-100 overflow-hidden">
      <div className="mb-6">
        <h2 className="text-4xl text-slate-400 dancing-script" style={{ fontFamily: "'Dancing Script', cursive" }}>
          A Secret for 3 Years... 💗
        </h2>
        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em] mt-3">
          MY HEART'S JOURNEY 🎀
        </p>
      </div>

      <div className="flex-1 w-full space-y-6 py-4 overflow-y-auto custom-scrollbar px-2">
        <div className="flex items-center gap-4 animate-[slideIn_0.6s_ease-out_0.2s_both]">
          <div className="shrink-0">
            <GirlSticker pose="PRAY" size={80} />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-0.5">2023 • THE START 💖</p>
            <p className="text-xs text-slate-600 italic leading-tight">When I first realized you were special...</p>
          </div>
        </div>

        <div className="flex items-center gap-4 animate-[slideIn_0.6s_ease-out_0.8s_both]">
          <div className="shrink-0">
            <GirlSticker pose="EXCITED" size={80} />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-0.5">2024 • GROWING 🎀</p>
            <p className="text-xs text-slate-600 italic leading-tight">Thinking of you became my favorite habit.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 animate-[slideIn_0.6s_ease-out_1.4s_both]">
          <div className="shrink-0">
            <GirlSticker pose="HEARTS" size={80} />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-0.5">2025 • DEEPER ❤‍🩹</p>
            <p className="text-xs text-slate-600 italic leading-tight">I knew I wanted you in my life forever.</p>
          </div>
        </div>

        <div className="pt-6 animate-[popIn_0.5s_ease-out_2s_both] text-center">
            <p className="text-slate-800 font-black text-xl uppercase tracking-tighter">
                And now, in <span className="text-blue-400">2026</span>... 🎇
            </p>
            <p className="text-pink-400 font-bold mt-1 animate-pulse text-sm italic">
                I'm still as crazy about you as day one. 💖
            </p>
        </div>
      </div>

      <div className="mt-auto w-full pt-6 relative">
        <button
          onClick={onComplete}
          className="w-full bg-slate-800 hover:bg-slate-900 text-white py-4 rounded-2xl font-black shadow-xl transition-all active:scale-95 uppercase tracking-widest text-[11px] animate-[fadeIn_0.5s_ease-out_2.5s_both] ring-4 ring-slate-100"
        >
          Tell me more 🎀 →
        </button>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
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

export default CrushHistory;
