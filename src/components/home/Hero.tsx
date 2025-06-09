
import React from 'react';
import HeroBubblesContainer from './hero-bubbles/HeroBubblesContainer';

const Hero = () => {
  return (
    <div className="relative overflow-visible">
      {/* Hero content area with gradient background - moved up with reduced height */}
      <div className="relative bg-gradient-to-b from-navy-800 via-navy-800/95 to-[#f8f5ef] min-h-[200px] pb-8">
        <HeroBubblesContainer />
        
        {/* Hero content with minimal spacing for bubbles */}
        <div className="relative z-10 px-4">
          {/* Content goes here - currently empty to showcase bubbles */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
