
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/hooks/onboarding/useOnboarding';

const OnboardingScreen = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const { handleNextStep } = useOnboarding();

  useEffect(() => {
    // Start the animation after component mounts
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2500); // 2.5 seconds for animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dbd0e0] via-[#f5f1e8] to-[#e6c7bc] flex flex-col items-center justify-center px-4">
      {/* Animated Logo Container */}
      <div className="mb-12 flex flex-col items-center">
        {/* SVG Logo with Animation */}
        <div className="mb-8">
          <svg 
            width="200" 
            height="200" 
            viewBox="0 0 200 200" 
            className="overflow-visible"
          >
            {/* Speech Bubble Outline */}
            <path
              d="M50 40 Q40 40 40 50 L40 100 Q40 110 50 110 L80 110 L90 125 L100 110 L150 110 Q160 110 160 100 L160 50 Q160 40 150 40 Z"
              fill="none"
              stroke="#2e4059"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-bubble"
              pathLength="1"
            />
            
            {/* First Heart */}
            <path
              d="M85 65 C85 60, 90 55, 95 55 C100 55, 105 60, 105 65 C105 60, 110 55, 115 55 C120 55, 125 60, 125 65 C125 75, 105 90, 105 90 C105 90, 85 75, 85 65 Z"
              fill="none"
              stroke="#c97c5d"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-heart1"
              pathLength="1"
            />
            
            {/* Second Heart (smaller, overlapping) */}
            <path
              d="M95 75 C95 72, 98 69, 101 69 C104 69, 107 72, 107 75 C107 72, 110 69, 113 69 C116 69, 119 72, 119 75 C119 82, 107 92, 107 92 C107 92, 95 82, 95 75 Z"
              fill="none"
              stroke="#c97c5d"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-heart2"
              pathLength="1"
            />
          </svg>
        </div>

        {/* Brand Text with Fade-in Animation */}
        <div className={`text-center transition-opacity duration-1000 ${animationComplete ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="font-cormorant text-4xl md:text-5xl font-medium text-[#2e4059] mb-2">
            Bridge For Couples
          </h1>
        </div>
      </div>

      {/* Content that appears after animation */}
      <div className={`text-center max-w-2xl transition-all duration-1000 delay-500 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h2 className="font-cormorant text-3xl md:text-4xl font-medium text-[#2e4059] mb-6 leading-tight">
          Every couple hits a rough patch. Not every couple has a tool for it.
        </h2>
        
        <p className="text-lg md:text-xl text-[#2e4059]/80 mb-12 font-inter leading-relaxed">
          Bridge for Couples helps you talk through conflict with clarity, respect, and emotional intelligence.
        </p>
        
        <Button 
          onClick={handleNextStep}
          size="lg"
          className="bg-[#2e4059] hover:bg-[#2e4059]/90 text-white font-medium px-8 py-4 text-lg rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
        >
          Let's Get Started
        </Button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
