
import React from 'react';
import HeroBubblesContainer from './hero-bubbles/HeroBubblesContainer';

const Hero = () => {
  return (
    <div className="relative overflow-visible">
      {/* Hero content area with gradient background - bubbles start right after navbar */}
      <div className="relative bg-gradient-to-b from-navy-800 via-navy-800/95 to-[#f8f5ef] min-h-[400px] pb-16">
        <HeroBubblesContainer />
        
        {/* Hero content with minimal spacing for bubbles */}
        <div className="relative z-10 pt-8 px-4">
          {/* Content goes here - currently empty to showcase bubbles */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
