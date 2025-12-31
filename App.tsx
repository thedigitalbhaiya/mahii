
import React, { useState } from 'react';
import Snowfall from './components/Snowfall';
import IntroCard from './components/IntroCard';
import HeartGame from './components/HeartGame';
import BouquetStage from './components/BouquetStage';
import WhyILikeHer from './components/WhyILikeHer';
import ThandChaand from './components/ThandChaand';
import HowMuch from './components/HowMuch';
import CrushHistory from './components/CrushHistory';
import RevealGrid from './components/RevealGrid';
import Letter from './components/Letter';
import FinalWish from './components/FinalWish';
import { MadeSomething, AreYouReady, KissInteraction, BlushingResponse, KuchupuchuWish } from './components/VideoInteractions';

export enum AppStage {
  INTRO = 'INTRO',
  MADE_SOMETHING = 'MADE_SOMETHING',
  READY_QUESTION = 'READY_QUESTION',
  CRUSH_HISTORY = 'CRUSH_HISTORY',
  THAND_CHAAND = 'THAND_CHAAND',
  WHY_I_LIKE_HER = 'WHY_I_LIKE_HER',
  HOW_MUCH = 'HOW_MUCH',
  HEART_GAME = 'HEART_GAME',
  BOUQUET = 'BOUQUET',
  REVEAL = 'REVEAL',
  KISS_INTERACTION = 'KISS_INTERACTION',
  BLUSHING_RESPONSE = 'BLUSHING_RESPONSE',
  KUCHUPUCHU_WISH = 'KUCHUPUCHU_WISH',
  LETTER = 'LETTER',
  FINAL_WISH = 'FINAL_WISH'
}

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.INTRO);
  const [fade, setFade] = useState(true);

  const transitionTo = (nextStage: AppStage) => {
    setFade(false);
    setTimeout(() => {
      setStage(nextStage);
      setFade(true);
    }, 300);
  };

  const handleRestart = () => {
    transitionTo(AppStage.INTRO);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center bg-gradient-to-b from-[#e0f2fe] to-white overflow-hidden px-4 py-8">
      {/* Background soft circles as seen in the image */}
      <div className="absolute top-[15%] left-[10%] w-4 h-4 rounded-full bg-blue-200/40 blur-sm pointer-events-none" />
      <div className="absolute top-[25%] right-[20%] w-6 h-6 rounded-full bg-blue-100/30 blur-sm pointer-events-none" />
      <div className="absolute bottom-[30%] left-[15%] w-5 h-5 rounded-full bg-blue-200/20 blur-sm pointer-events-none" />
      
      <Snowfall />
      
      <div className={`z-10 w-full max-w-md transition-all duration-300 transform ${fade ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {stage === AppStage.INTRO && (
          <IntroCard onOpen={() => transitionTo(AppStage.MADE_SOMETHING)} />
        )}

        {stage === AppStage.MADE_SOMETHING && (
          <MadeSomething onYes={() => transitionTo(AppStage.READY_QUESTION)} />
        )}

        {stage === AppStage.READY_QUESTION && (
          <AreYouReady onYes={() => transitionTo(AppStage.CRUSH_HISTORY)} />
        )}

        {stage === AppStage.CRUSH_HISTORY && (
          <CrushHistory onComplete={() => transitionTo(AppStage.THAND_CHAAND)} />
        )}

        {stage === AppStage.THAND_CHAAND && (
          <ThandChaand onComplete={() => transitionTo(AppStage.WHY_I_LIKE_HER)} />
        )}

        {stage === AppStage.WHY_I_LIKE_HER && (
          <WhyILikeHer onComplete={() => transitionTo(AppStage.HOW_MUCH)} />
        )}

        {stage === AppStage.HOW_MUCH && (
          <HowMuch onComplete={() => transitionTo(AppStage.HEART_GAME)} />
        )}

        {stage === AppStage.HEART_GAME && (
          <HeartGame onComplete={() => transitionTo(AppStage.BOUQUET)} />
        )}

        {stage === AppStage.BOUQUET && (
          <BouquetStage onComplete={() => transitionTo(AppStage.REVEAL)} />
        )}

        {stage === AppStage.REVEAL && (
          <RevealGrid onComplete={() => transitionTo(AppStage.KISS_INTERACTION)} />
        )}

        {stage === AppStage.KISS_INTERACTION && (
          <KissInteraction onComplete={() => transitionTo(AppStage.BLUSHING_RESPONSE)} />
        )}

        {stage === AppStage.BLUSHING_RESPONSE && (
          <BlushingResponse onComplete={() => transitionTo(AppStage.KUCHUPUCHU_WISH)} />
        )}

        {stage === AppStage.KUCHUPUCHU_WISH && (
          <KuchupuchuWish onComplete={() => transitionTo(AppStage.LETTER)} />
        )}

        {stage === AppStage.LETTER && (
          <Letter onComplete={() => transitionTo(AppStage.FINAL_WISH)} />
        )}

        {stage === AppStage.FINAL_WISH && (
          <FinalWish onRestart={handleRestart} />
        )}
      </div>

      {/* Minimal Footer Text - Clean Modern Typography */}
      <div className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-0 right-0 text-center pointer-events-none z-50">
        <span className="text-slate-400 text-[10px] font-semibold tracking-[0.2em] uppercase opacity-50">
          From Khushter with 💗
        </span>
      </div>
    </div>
  );
};

export default App;
