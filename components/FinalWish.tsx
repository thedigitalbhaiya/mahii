import React, { useEffect, useState, useRef } from 'react';
import Confetti from './Confetti';
import { toPng } from 'html-to-image';

interface FinalWishProps {
  onRestart: () => void;
}

const FinalWish: React.FC<FinalWishProps> = ({ onRestart }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // User provided image for the final reveal
  const PROFILE_IMAGE = "https://yelling-beige-otdwf6myhv.edgeone.app/file_0000000032307209aad94d46f52251c9.png";
  const FALLBACK_IMAGE = "https://cdn.pixabay.com/photo/2021/04/24/23/16/girl-6205216_1280.png";

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
    if (!cardRef.current || isCapturing) return;
    setIsCapturing(true);
    
    try {
      // Ensure the profile image is fully loaded before we attempt to capture it
      const img = cardRef.current.querySelector('img');
      if (img && !img.complete) {
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }

      // Brief delay to allow mobile browsers to finish rendering any late layout shifts
      await new Promise(r => setTimeout(r, 600));
      
      const options = {
        cacheBust: true,
        backgroundColor: '#ffffff',
        pixelRatio: 2,
        includeQueryParams: true,
        style: {
          // Flatten any active animations during the screenshot
          transform: 'scale(1)',
          transformOrigin: 'top left'
        },
        filter: (node: any) => {
          const element = node as HTMLElement;
          // Don't include the interactive buttons in the saved PNG
          return element?.getAttribute?.('data-html2canvas-ignore') !== 'true';
        }
      };

      // Perform a double-pass capture (Common fix for asset skipping in Mobile Safari/Chrome)
      await toPng(cardRef.current, options);
      const dataUrl = await toPng(cardRef.current, options);
      
      const link = document.createElement('a');
      link.download = `HNY_2026_Mahi.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (err: any) {
      console.error('Save failed:', err);
      // Fixed the "[object Object]" error by stringifying the error object
      const errorMsg = err instanceof Error ? err.message : (typeof err === 'object' ? JSON.stringify(err) : String(err));
      alert(`Oops! Saving failed: ${errorMsg}. Try taking a screenshot instead! ❤️`);
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[95dvh] py-4 px-4 touch-none">
      {showConfetti && <Confetti />}
      
      {/* 
          Main Greeting Card 
          Designed to 100% match the visual aesthetic in the provided screenshot.
      */}
      <div 
        ref={cardRef}
        className="w-full max-w-[380px] bg-white border border-blue-50/50 flex flex-col items-center relative overflow-hidden pt-12 pb-10 px-6 shadow-[0_30px_60px_-15px_rgba(65,134,245,0.12)]"
        style={{ 
          borderRadius: '2.5rem', 
          minHeight: '640px',
          // Custom grid paper matching screenshot size exactly
          backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '12px 12px'
        }}
      >
        {/* Title Section */}
        <div className="text-center w-full mb-2 z-10">
          <h2 className="text-[40px] text-slate-600 dancing-script font-medium leading-tight mb-0" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Happy New Year
          </h2>
          <h3 className="text-[86px] font-bold text-[#4186F5] leading-[0.8] italic tracking-tighter" style={{ fontFamily: "'Dancing Script', cursive" }}>
            2026
          </h3>
        </div>
        
        {/* Central Content Area (Image + Icons) */}
        <div className="relative w-full flex-1 flex flex-col items-center justify-center py-6">
          {/* Icons positioned exactly as per the user's screenshot */}
          <div className="absolute top-[12%] left-[-10px] text-3xl animate-[float_4s_infinite_ease-in-out] select-none z-20 opacity-90">💖</div>
          <div className="absolute top-[42%] right-[-15px] text-2xl animate-[float_3.5s_infinite_ease-in-out_0.5s] select-none z-20 opacity-90">✨</div>
          <div className="absolute bottom-[28%] right-[-10px] text-2xl animate-[float_4.5s_infinite_ease-in-out_1s] select-none z-20 opacity-90">🎀</div>
          <div className="absolute bottom-[10%] left-[-5px] text-3xl animate-[float_3.8s_infinite_ease-in-out_0.3s] select-none z-20 opacity-90">🥂</div>
          <div className="absolute bottom-[0%] left-[-15px] text-3xl animate-[float_4s_infinite_ease-in-out_0.7s] select-none z-20 opacity-90">❤️</div>

          {/* Central Circular Image */}
          <div className="w-64 h-64 rounded-full bg-white shadow-[0_25px_50px_rgba(0,0,0,0.1)] border-[8px] border-white flex items-center justify-center overflow-hidden relative z-10">
            <img 
              src={imgError ? FALLBACK_IMAGE : PROFILE_IMAGE} 
              alt="Profile" 
              className="w-full h-full object-cover animate-[subtleZoom_25s_infinite_alternate]"
              loading="eager"
              crossOrigin="anonymous"
              // @ts-ignore
              fetchpriority="high"
              onError={() => {
                console.warn("Failed to load PROFILE_IMAGE, using fallback.");
                setImgError(true);
              }}
            />
            {/* Subtle overlay for better rendering depth */}
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-full pointer-events-none" />
          </div>
        </div>

        {/* Interactive Buttons (Hidden in final PNG) */}
        <div className="w-full space-y-3 mt-6" data-html2canvas-ignore="true">
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleCelebrate}
              className="bg-[#4186F5] hover:bg-blue-600 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-md active:scale-95"
            >
              CELEBRATE 🥳
            </button>
            <button 
              onClick={onRestart}
              className="bg-slate-50 hover:bg-slate-100 text-slate-400 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all border border-slate-200 active:scale-95"
            >
              RESTART 🔄
            </button>
          </div>
          
          <button 
            onClick={handleSave}
            disabled={isCapturing}
            className="w-full bg-white hover:bg-slate-50 text-slate-400 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all border border-slate-200 flex items-center justify-center gap-2"
          >
            {isCapturing ? (
              <div className="w-4 h-4 border-2 border-slate-200 border-t-[#4186F5] rounded-full animate-spin" />
            ) : (
              <>SAVE CARD 📸</>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(3deg); }
        }
        @keyframes subtleZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default FinalWish;
