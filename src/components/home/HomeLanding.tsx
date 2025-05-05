
import React, { useState, useEffect } from 'react';
import { getDailyQuote } from '../../data/hero-quotes';

const humorousBanners = [
  "Finally, an app that teaches you when to listen and when to shut up.",
  "Built for arguments. Approved for making up.",
  "Tap here before you say something you'll regret.",
  "Like couples therapy, but your phone won't charge you $200 an hour.",
  "Because 'I'm fine' usually means the opposite.",
  "For when 'whatever you want' definitely doesn't mean whatever you want.",
  "Helping couples avoid the 'silent treatment' since 2024.",
  "Save your relationship and your dignity at the same time.",
  "The app your therapist wishes you'd download.",
  "Turn 'I hate you right now' into 'I'm upset but still love you.'",
  "For relationships where 'fine' is never actually fine.",
  "Because sometimes love needs a translator.",
  "Your relationship's secret weapon (don't tell your ex).",
  "For when you want to fight fair, not just fight.",
  "The app that helps you say what you mean, not what you feel like screaming."
];

const HomeLanding = () => {
  // Get the daily quote
  const dailyQuote = getDailyQuote();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  
  // Rotate through banners every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % humorousBanners.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="text-center pt-24 pb-4 md:py-16">
      <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-medium mb-5 text-midnight-indigo">
        {dailyQuote.headline}
      </h1>
      
      <p className="text-xl max-w-2xl mx-auto text-midnight-indigo/80 mb-8">
        {dailyQuote.subtext}
      </p>
      
      <div className="bg-mauve-rose/10 py-3 px-4 rounded-lg max-w-lg mx-auto transition-all duration-500 ease-in-out mb-6">
        <p className="text-xs italic text-lavender-blue/80">
          {humorousBanners[currentBannerIndex]}
        </p>
      </div>
    </div>
  );
};

export default HomeLanding;
