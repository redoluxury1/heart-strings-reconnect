
import React, { useState } from 'react';
import { getDailyQuote } from '../../data/hero-quotes';

const HomeLanding = () => {
  // Get the daily quote
  const dailyQuote = getDailyQuote();
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="text-center pt-16 pb-4 md:py-14">
      <div 
        className="relative transition-all duration-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-medium mb-5 text-navy-800">
          {dailyQuote.headline}
        </h1>
        
        <p className="text-xs sm:text-sm max-w-2xl mx-auto text-navy-800/80 mb-8">
          {dailyQuote.subtext}
        </p>
        
        {/* Micro text that appears on hover */}
        <div 
          className={`absolute left-0 right-0 bottom-0 text-xs text-navy-800/60 italic transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          share to instagram, text, email, twitter or submit your own
        </div>
      </div>
    </div>
  );
};

export default HomeLanding;
