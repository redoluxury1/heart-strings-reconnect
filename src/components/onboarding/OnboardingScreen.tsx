
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
    }, 3500); // 3.5 seconds for full animation sequence

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dbd0e0] via-[#f5f1e8] to-[#e6c7bc] flex flex-col items-center justify-center px-4">
      {/* Animated Logo Container */}
      <div className="mb-12 flex flex-col items-center">
        {/* SVG Logo with Animation - Bridge for Couples actual logo */}
        <div className="mb-8">
          <svg 
            width="200" 
            height="154" 
            viewBox="0 0 1024 787" 
            className="overflow-visible"
          >
            {/* Speech Bubble Path */}
            <path
              d="M273.5,278.5 C273.5,234.037 309.037,198.5 353.5,198.5 L670.5,198.5 C714.963,198.5 750.5,234.037 750.5,278.5 L750.5,438.5 C750.5,482.963 714.963,518.5 670.5,518.5 L480,518.5 L373.5,588.5 L480,518.5 L353.5,518.5 C309.037,518.5 273.5,482.963 273.5,438.5 Z"
              fill="none"
              stroke="#2e4059"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-bubble"
              pathLength="1"
            />
            
            {/* First Heart (larger, back) */}
            <path
              d="M430,310 C430,290 448,290 460,310 C472,290 490,290 490,310 C490,340 460,380 460,380 C460,380 430,340 430,310 Z"
              fill="none"
              stroke="#F2645A"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-heart1"
              pathLength="1"
            />
            
            {/* Second Heart (overlapping) */}
            <path
              d="M530,320 C530,305 543,305 552,320 C561,305 574,305 574,320 C574,345 552,375 552,375 C552,375 530,345 530,320 Z"
              fill="none"
              stroke="#F2645A"
              strokeWidth="6"
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
