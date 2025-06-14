
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from '@/components/common/OptimizedImage';

const EnhancedOnboardingScreen = () => {
  const [showLogo, setShowLogo] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Immediate logo entrance
    setShowLogo(true);

    // Text reveals at 400ms
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 400);

    // Button becomes active at 800ms
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 800);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  const handleGetStarted = () => {
    navigate('/signup-choice');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dbd0e0] via-[#f5f1e8] to-[#e6c7bc] relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-white/25 rounded-full animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/3 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Welcome Text */}
        <div 
          className={`mb-2 transition-all duration-500 ease-out ${
            showLogo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-[#2e4059]/60 font-inter text-sm tracking-wide">Welcome to</p>
        </div>

        {/* Logo Container */}
        <div className="mb-8 flex flex-col items-center">
          <div 
            className={`mb-6 transition-all duration-700 ease-out ${
              showLogo 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 translate-y-6'
            }`}
          >
            <div className="relative">
              <OptimizedImage 
                src="/lovable-uploads/a76cbc57-66f5-47a4-9713-382f8a512e91.png"
                alt="Bridge For Couples"
                className="w-72 md:w-80 h-auto"
                priority={true}
              />
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#2e4059]/5 via-transparent to-[#2e4059]/5 rounded-lg blur-xl -z-10" />
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-2xl space-y-6">
          {/* Headline */}
          <div 
            className={`transition-all duration-600 ease-out ${
              showContent
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <h1 className="font-cormorant text-3xl md:text-4xl lg:text-5xl font-medium text-[#2e4059] leading-tight mb-6">
              Every couple hits a rough patch.
              <br />
              Not every couple has a tool for it.
            </h1>
          </div>
          
          {/* Subtitle */}
          <div 
            className={`transition-all duration-600 ease-out ${
              showContent
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <p className="text-lg md:text-xl text-[#2e4059]/80 font-inter leading-relaxed max-w-xl mx-auto">
              Bridge for Couples helps you talk through conflict with clarity, respect, and emotional intelligence.
            </p>
          </div>
          
          {/* CTA Button */}
          <div 
            className={`pt-4 transition-all duration-500 ease-out ${
              showButton
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-4 scale-95'
            }`}
          >
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="
                bg-[#2e4059] hover:bg-[#2e4059]/90 
                text-white font-medium 
                px-10 py-4 text-lg 
                rounded-xl 
                shadow-lg hover:shadow-xl 
                transition-all duration-200 
                transform hover:scale-105 hover:-translate-y-1
                relative overflow-hidden
                group
              "
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              <span className="relative z-10 flex items-center gap-2">
                Let's Get Started
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedOnboardingScreen;
