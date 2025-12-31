
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
    // Initial confetti burst
    const timer = setTimeout(() => setShowConfetti(false), 8000);
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
      const img = cardRef.current.querySelector('img');
      if (img) {
        // Essential for canvas capture of cross-domain images
        img.crossOrigin = "anonymous";
        if (!img.complete) {
          await new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        }
      }

      // Small delay for font/asset stability
      await new Promise(r => setTimeout(r, 1000));
      
      const options = {
        cacheBust: true,
        backgroundColor: '#ffffff',
        pixelRatio: 2,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        },
        filter: (node: any) => {
          const element = node as HTMLElement;
          // Hide UI buttons in the final image
          return element?.getAttribute?.('data-html2canvas-ignore') !== 'true';
        }
      };

      // Double pass for mobile browsers
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
      let errorMsg = "Something went wrong.";
      if (err instanceof Error) errorMsg = err.message;
      else if (typeof err === 'object') errorMsg = JSON.stringify(err);
      
      alert(`Save failed: ${errorMsg}\nTry a screenshot if this continues! ❤️`);
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[95dvh] py-4 px-4 touch-none">
      {showConfetti && <Confetti />}
      
      {/* 
          Greeting Card 
          Designed to 100% match the visual aesthetic: large blue 2026, 
          script text, and exact emoji placements on a dot grid background.
      */}
      <div 
        ref={cardRef}
        className="w-full max-w-[380px] bg-white flex flex-col items-center relative overflow-hidden pt-14 pb-10 px-6 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)]"
        style={{ 
          borderRadius: '3rem', 
          minHeight: '660px',
          // Dot grid background as seen in the screenshot
          backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '12px 12px'
        }}
      >
        {/* Title Section - Precise matching of typography */}
        <div className="text-center w-full mb-4 z-10">
          <h2 className="text-[44px] text-[#475569] dancing-script font-normal leading-none mb-1" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Happy New Year
          </h2>
          <h3 className="text-[100px] font-bold text-[#4186F5] leading-[0.7] italic tracking-tighter" style={{ fontFamily: "'Dancing Script', cursive" }}>
            2026
          </h3>
        </div>
        
        {/* Central Content Area */}
        <div className="relative w-full flex-1 flex flex-col items-center justify-center py-8">
          
          {/* Exact Emoji Placements matching screenshot */}
          {/* Top-ish Left Heart */}
          <div className="absolute top-[8%] left-[0%] text-4xl animate-[float_4s_infinite_ease-in-out] z-20 pointer-events-none drop-shadow-sm">💖</div>
          
          {/* Mid-Right Sparkles */}
          <div className="absolute top-[55%] right-[-10px] text-3xl animate-[float_3.5s_infinite_ease-in-out_0.5s] z-20 pointer-events-none drop-shadow-sm">✨</div>
          
          {/* Lower-Right Bow */}
          <div className="absolute bottom-[20%] right-[-5px] text-3xl animate-[float_4.5s_infinite_ease-in-out_1s] z-20 pointer-events-none drop-shadow-sm">🎀</div>
          
          {/* Lower-Left Glasses */}
          <div className="absolute bottom-[8%] left-[0%] text-4xl animate-[float_3.8s_infinite_ease-in-out_0.3s] z-20 pointer-events-none drop-shadow-sm">🥂</div>
          
          {/* Very Bottom-Left Heart */}
          <div className="absolute bottom-[-5%] left-[-10px] text-3xl animate-[float_4s_infinite_ease-in-out_0.7s] z-20 pointer-events-none drop-shadow-sm">❤️</div>

          {/* Portrait Image Circle - Fixed Rendering */}
          <div className="w-64 h-64 rounded-full bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] border-[10px] border-white flex items-center justify-center overflow-hidden relative z-10 ring-1 ring-slate-100">
            <img 
              src={imgError ? FALLBACK_IMAGE : PROFILE_IMAGE} 
              alt="Mahi" 
              className="w-full h-full object-cover animate-[subtleZoom_30s_infinite_alternate]"
              loading="eager"
              crossOrigin="anonymous"
              // @ts-ignore
              fetchpriority="high"
              onError={(e) => {
                console.warn("Main image load failed, using fallback.");
                setImgError(true);
              }}
              onLoad={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.naturalWidth === 0) setImgError(true);
              }}
            />
            {/* Soft inner vignette/ring */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] pointer-events-none" />
          </div>
        </div>

        {/* Action Buttons - Excluded from final saved image */}
        <div className="w-full space-y-3 mt-8 z-20" data-html2canvas-ignore="true">
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleCelebrate}
              className="bg-[#4186F5] hover:bg-blue-600 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-lg active:scale-95"
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
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes subtleZoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
};

export default FinalWish;
