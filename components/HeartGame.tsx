
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GirlSticker } from './VideoInteractions';

interface Heart {
  id: number;
  baseLeft: number;
  left: number;
  top: number;
  speed: number;
  size: number;
  swayAmplitude: number;
  swaySpeed: number;
  phase: number;
}

interface HeartGameProps {
  onComplete: () => void;
}

const HeartGame: React.FC<HeartGameProps> = ({ onComplete }) => {
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const targetScore = 7;
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const spawnHeart = useCallback(() => {
    const newHeart: Heart = {
      id: Math.random(),
      baseLeft: Math.random() * 80 + 10,
      left: 0,
      top: -100,
      speed: Math.random() * 1.5 + 2.0,
      size: Math.random() * 20 + 60,
      swayAmplitude: Math.random() * 15 + 10,
      swaySpeed: Math.random() * 0.002 + 0.001,
      phase: Math.random() * Math.PI * 2,
    };
    setHearts(prev => [...prev, newHeart]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setHearts(prev => {
        if (prev.length === 0) return prev;
        return prev
          .map(h => ({
            ...h,
            top: h.top + h.speed,
            left: h.baseLeft + Math.sin(now * h.swaySpeed + h.phase) * h.swayAmplitude
          }))
          .filter(h => h.top < 650);
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const spawner = setInterval(spawnHeart, 800);
    return () => clearInterval(spawner);
  }, [spawnHeart]);

  const catchHeart = (id: number) => {
    setScore(prev => {
      const newScore = prev + 1;
      if (newScore >= targetScore) {
        setTimeout(onComplete, 1200);
      }
      return newScore;
    });
    setHearts(prev => prev.filter(h => h.id !== id));
    
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(15);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 text-center grid-paper animate-[fadeIn_0.5s_ease-out] relative overflow-hidden h-[70dvh] flex flex-col border border-slate-100 max-h-[600px]">
      <div className="mb-4 z-10">
        <h2 className="text-4xl text-slate-400 dancing-script" style={{ fontFamily: "'Dancing Script', cursive" }}>
          Love Catcher
        </h2>
        <p className="text-[10px] text-slate-300 font-bold tracking-[0.2em] mt-2 uppercase">
          Catch {targetScore} hearts
        </p>
      </div>

      <div 
        ref={gameContainerRef}
        className="flex-1 relative bg-slate-50/40 rounded-[2rem] border-2 border-dashed border-slate-100 mb-6 overflow-hidden shadow-inner"
      >
        {hearts.map(heart => (
          <button
            key={heart.id}
            onPointerDown={(e) => {
              e.preventDefault();
              catchHeart(heart.id);
            }}
            className="absolute cursor-pointer select-none touch-none will-change-transform flex items-center justify-center active:scale-125 transition-transform"
            style={{
              transform: `translate3d(${heart.left}vw, ${heart.top}px, 0)`,
              width: `${heart.size}px`,
              height: `${heart.size}px`,
              left: `-${heart.size/2}px`,
              top: '0'
            }}
          >
            <GirlSticker pose="HOLD_HEART" size={heart.size} />
          </button>
        ))}

        {score === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-slate-200 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">
              TAP THE FALLING HEARTS
            </p>
          </div>
        )}
      </div>

      <div className="px-4 z-10 mb-2">
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-pink-300 to-pink-400 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(100, (score / targetScore) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-3 px-1">
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">PROGRESS</span>
          <span className="text-pink-400 font-black text-xs">{score} / {targetScore}</span>
        </div>
      </div>

      {score >= targetScore && (
        <div className="absolute inset-0 bg-white/90 z-30 flex items-center justify-center animate-[fadeIn_0.5s] backdrop-blur-sm">
          <div className="text-center transform animate-[popIn_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)]">
            <GirlSticker pose="EXCITED" size={240} />
            <h3 className="text-2xl font-black text-slate-400 tracking-widest uppercase mt-4">AMAZING!</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeartGame;
