
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
        {/* SVG Logo with Animation */}
        <div className="mb-8">
          <svg 
            width="200" 
            height="200" 
            viewBox="0 0 300 300" 
            className="overflow-visible"
          >
            {/* Speech Bubble Outline */}
            <path
              d="M90 80 Q75 80 75 95 L75 160 Q75 175 90 175 L130 175 L145 200 L160 175 L230 175 Q245 175 245 160 L245 95 Q245 80 230 80 Z"
              fill="none"
              stroke="#2e4059"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-bubble"
              pathLength="1"
            />
            
            {/* First Heart (larger, back) */}
            <path
              d="M140 110 Q140 100, 150 100 Q160 100, 160 110 Q160 100, 170 100 Q180 100, 180 110 Q180 125, 160 145 Q140 125, 140 110 Z"
              fill="none"
              stroke="#F2645A"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-heart1"
              pathLength="1"
            />
            
            {/* Second Heart (smaller, front) */}
            <path
              d="M150 125 Q150 118, 157 118 Q164 118, 164 125 Q164 118, 171 118 Q178 118, 178 125 Q178 135, 164 148 Q150 135, 150 125 Z"
              fill="none"
              stroke="#F2645A"
              strokeWidth="4"
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
