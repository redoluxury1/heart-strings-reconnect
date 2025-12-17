
import React from 'react';
import { Link } from 'react-router-dom';
import { getDailyQuote } from '../../data/hero-quotes';

const HomeLanding = () => {
  const dailyQuote = getDailyQuote();
  
  return (
    <div className="text-center px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-12 lg:pb-16">
      <h1 className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-6 sm:mb-8 lg:mb-10 text-navy-800 leading-tight">
        {dailyQuote.headline}
      </h1>

      {/* Get Started CTA */}
      <div className="mt-8 pt-6 border-t border-navy-800/10">
        <p className="text-navy-800/70 mb-4">
          Want to learn more about how Bridge For Couples can help your relationship?
        </p>
        <Link 
          to="/intro" 
          className="inline-flex items-center px-6 py-3 bg-navy-800 hover:bg-navy-800/90 text-white border-[3px] border-terracotta rounded-lg font-medium transition-all duration-200 hover:shadow-md"
          style={{ 
            animation: 'subtle-glow 3s ease-in-out infinite',
          }}
        >
          Get Started Now
        </Link>
        <style>{`
          @keyframes subtle-glow {
            0%, 100% { box-shadow: 0 0 8px rgba(198, 124, 100, 0.3); }
            50% { box-shadow: 0 0 16px rgba(198, 124, 100, 0.5); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default HomeLanding;
