
import React, { useState, useEffect } from 'react';
import { getDailyQuote } from '../../data/hero-quotes';

const humorousBanners = [
  "Finally, an app that teaches you when to listen and when to shut up.",
  "Built for arguments. Approved for making up.",
  "Tap here before you say something you'll regret.",
  "Like couples therapy, but your phone won't charge you $200 an hour.",
  "Because 'I'm fine' usually means the opposite.",
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
      
      <div className="bg-mauve-rose/10 py-3 px-4 rounded-lg max-w-lg mx-auto transition-all duration-500 ease-in-out">
        <p className="text-md italic text-midnight-indigo">
          {humorousBanners[currentBannerIndex]}
        </p>
      </div>
    </div>
  );
};

export default HomeLanding;
