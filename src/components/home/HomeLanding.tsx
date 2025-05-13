
import React from 'react';
import { getDailyQuote } from '../../data/hero-quotes';

const HomeLanding = () => {
  // Get the daily quote
  const dailyQuote = getDailyQuote();
  
  return (
    <div className="text-center pt-16 pb-4 md:py-14">
      <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-medium mb-5 text-navy-800">
        {dailyQuote.headline}
      </h1>
      
      <p className="text-sm max-w-2xl mx-auto text-navy-800/80 mb-8">
        {dailyQuote.subtext}
      </p>
    </div>
  );
};

export default HomeLanding;
