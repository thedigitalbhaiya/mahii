
import React, { useEffect, useState, useRef } from 'react';
import Confetti from './Confetti';
import { toPng } from 'html-to-image';

interface FinalWishProps {
  onRestart: () => void;
}

const FinalWish: React.FC<FinalWishProps> = ({ onRestart }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Emojis matching the screenshot
  const ASSETS = {
    PINK_HEART: "💗",
    SPARKLES: "✨",
    BOW: "🎀",
    CHEERS: "🥂",
    HEART_SPARKLE: "💖",
  };

  // User provided image for the centerpiece
  const PROFILE_IMAGE = "https://images.lucidapp.io/lucidchart/63b3648a-6b58-498c-9c9e-561937446545/V0_0?width=1000";

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleCelebrate = () => {
    setShowConfetti(false);
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([40, 30, 40]);
    }
    setTimeout(() => setShowConfetti(true), 50);
  };

  const handleSave = async () => {
    if (!cardRef.current) return;
    setIsCapturing(true);
    try {
      await new Promise(r => setTimeout(r, 400));
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        backgroundColor: '#ffffff',
        pixelRatio: 3,
        filter: (node) => {
          const element = node as HTMLElement;
          return element?.getAttribute?.('data-html2canvas-ignore') !== 'true';
        }
      });
      const link = document.createElement('a');
      link.download = `HNY_2026_Wish.png`;
      link.href = dataUrl;
      link.click();
    } catch (err: any) {
      console.error('Save failed:', err);
      alert("Note: Use a screenshot if the automatic save fails! ❤️");
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[95dvh] py-4 px-4 touch-none">
      {showConfetti && <Confetti />}
      
      <div 
        ref={cardRef}
        className="w-full max-w-[390px] bg-white grid-paper border border-[#4186F5]/20 flex flex-col items-center relative overflow-hidden pt-12 pb-8 px-6"
        style={{ 
          borderRadius: '1.5rem', 
          boxShadow: '0 25px 50px -12px rgba(65, 134, 245, 0.15)',
          minHeight: '600px'
        }}
      >
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center w-full">
          {/* Typography matching screenshot */}
          <div className="text-center mb-4">
            <h2 className="text-[42px] leading-tight text-slate-700 dancing-script" style={{ fontFamily: "'Dancing Script', cursive" }}>
              Happy New Year
            </h2>
            <h3 className="text-[82px] font-medium text-[#4186F5] leading-none italic" style={{ fontFamily: "'Dancing Script', cursive" }}>
              2026
            </h3>
          </div>
          
          {/* Central Image Container with Floating Decor */}
          <div className="relative mt-8 mb-12">
            {/* Floating Elements Positioned precisely like mockup */}
            <div className="absolute -top-6 -left-12 text-2xl animate-[float_4s_infinite_ease-in-out] opacity-80 z-20" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
              {ASSETS.PINK_HEART}
            </div>
            <div className="absolute top-12 -right-14 text-2xl animate-[float_3.5s_infinite_ease-in-out_0.5s] opacity-80 z-20">
              {ASSETS.SPARKLES}
            </div>
            <div className="absolute top-36 -right-12 text-2xl animate-[float_4.5s_infinite_ease-in-out_1s] opacity-80 z-20">
              {ASSETS.BOW}
            </div>
            <div className="absolute bottom-4 -left-14 text-2xl animate-[float_3.8s_infinite_ease-in-out_0.3s] opacity-80 z-20">
              {ASSETS.HEART_SPARKLE}
            </div>
            <div className="absolute bottom-10 -left-6 text-2xl animate-[float_4s_infinite_ease-in-out_0.7s] opacity-80 z-20">
              {ASSETS.CHEERS}
            </div>

            {/* Central Circle */}
            <div className="w-64 h-64 rounded-full bg-[#f8fafc] shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center justify-center overflow-hidden relative group">
              <img 
                src={PROFILE_IMAGE} 
                alt="Profile" 
                className="w-full h-full object-cover animate-[subtleZoom_20s_infinite_alternate]"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-full pointer-events-none" />
            </div>
          </div>

          {/* Footer Text precisely like mockup */}
          <div className="mt-auto mb-10">
            <p className="text-[#94a3b8] text-[9px] font-bold tracking-[0.4em] uppercase text-center opacity-80">
              FROM KHUSHTER WITH 💗
            </p>
          </div>
        </div>

        {/* Buttons (Excluded from Save) */}
        <div className="w-full space-y-3" data-html2canvas-ignore="true">
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleCelebrate}
              className="bg-[#4186F5] hover:bg-blue-600 text-white py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all shadow-md active:scale-95"
            >
              CELEBRATE 🥳
            </button>
            <button 
              onClick={onRestart}
              className="bg-slate-50 hover:bg-slate-100 text-slate-400 py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all border border-slate-200 active:scale-95"
            >
              RESTART 🔄
            </button>
          </div>
          
          <button 
            onClick={handleSave}
            disabled={isCapturing}
            className="w-full bg-white hover:bg-slate-50 text-slate-400 py-3.5 rounded-xl font-bold text-[9px] uppercase tracking-[0.2em] transition-all border border-slate-200 flex items-center justify-center gap-2"
          >
            {isCapturing ? (
              <div className="w-3 h-3 border-2 border-slate-200 border-t-[#4186F5] rounded-full animate-spin" />
            ) : (
              <>SAVE CARD 📸</>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes subtleZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .grid-paper {
            background-size: 20px 20px;
            background-image: 
                linear-gradient(to right, #f1f5f9 1px, transparent 1px),
                linear-gradient(to bottom, #f1f5f9 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
};

export default FinalWish;
