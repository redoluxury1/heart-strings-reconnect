
import React from 'react';
import { getDailyQuote } from '../../data/hero-quotes';

const HomeLanding = () => {
  // Get the daily quote
  const dailyQuote = getDailyQuote();
  
  return (
    <div className="text-center pt-24 pb-4 md:py-16">
      <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-medium mb-5 text-midnight-indigo">
        {dailyQuote.headline}
      </h1>
      
      <p className="text-xl max-w-2xl mx-auto text-midnight-indigo/80">
        {dailyQuote.subtext}
      </p>
    </div>
  );
};

export default HomeLanding;
