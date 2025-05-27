
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const OnboardingScreen = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Start the animation after component mounts
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2500); // 2.5 seconds for animation

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dbd0e0] via-[#f5f1e8] to-[#e6c7bc] flex flex-col items-center justify-center px-4">
      {/* Animated Logo Container */}
      <div className="mb-12 flex flex-col items-center">
        {/* SVG Logo with Animation - Using actual logo paths */}
        <div className="mb-8">
          <svg 
            width="200" 
            height="200" 
            viewBox="0 0 1024 787" 
            className="overflow-visible"
          >
            {/* Actual logo path from the provided SVG */}
            <path
              d="M0,0 L0,786 L1023,786 L1023,0 Z"
              fill="none"
              stroke="#2e4059"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-logo"
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
          onClick={handleGetStarted}
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
