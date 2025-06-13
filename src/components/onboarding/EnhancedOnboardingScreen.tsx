
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from '@/components/common/OptimizedImage';

const EnhancedOnboardingScreen = () => {
  const [animationStage, setAnimationStage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Stage 0: Logo entrance animation
    const logoTimer = setTimeout(() => {
      setAnimationStage(1);
    }, 800);

    // Stage 1: Headline animation
    const headlineTimer = setTimeout(() => {
      setAnimationStage(2);
    }, 1600);

    // Stage 2: Subtitle animation
    const subtitleTimer = setTimeout(() => {
      setAnimationStage(3);
    }, 2200);

    // Stage 3: Button animation
    const buttonTimer = setTimeout(() => {
      setAnimationStage(4);
      setIsLoaded(true);
    }, 2800);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(headlineTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  const handleGetStarted = () => {
    navigate('/signup-choice');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dbd0e0] via-[#f5f1e8] to-[#e6c7bc] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white/25 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }} />
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }} />
        
        {/* Subtle gradient overlay animation */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent animate-pulse" style={{ animationDuration: '6s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo Container with Advanced Animation */}
        <div className="mb-8 flex flex-col items-center">
          <div 
            className={`mb-6 transition-all duration-1000 ease-out transform ${
              animationStage >= 0 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-75 translate-y-8'
            }`}
            style={{
              filter: animationStage >= 0 ? 'drop-shadow(0 10px 30px rgba(46, 64, 89, 0.15))' : 'none'
            }}
          >
            <div className={`relative ${animationStage >= 0 ? 'animate-logo-glow' : ''}`}>
              <OptimizedImage 
                src="/lovable-uploads/a76cbc57-66f5-47a4-9713-382f8a512e91.png"
                alt="Bridge For Couples"
                className="w-72 md:w-80 h-auto"
                priority={true}
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#2e4059]/10 via-transparent to-[#2e4059]/10 rounded-lg blur-xl -z-10" />
            </div>
          </div>
        </div>

        {/* Content Container with Staggered Animations */}
        <div className="max-w-2xl space-y-6">
          {/* Headline with Advanced Animation */}
          <div 
            className={`transition-all duration-800 ease-out transform ${
              animationStage >= 1
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-6 scale-95'
            }`}
          >
            <h1 className="font-cormorant text-3xl md:text-4xl lg:text-5xl font-medium text-[#2e4059] leading-tight">
              <span className="inline-block animate-text-reveal">Every couple hits a rough patch.</span>
              <br />
              <span className="inline-block animate-text-reveal" style={{ animationDelay: '0.3s' }}>
                Not every couple has a tool for it.
              </span>
            </h1>
          </div>
          
          {/* Subtitle with Animation */}
          <div 
            className={`transition-all duration-800 ease-out transform ${
              animationStage >= 2
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-lg md:text-xl text-[#2e4059]/80 font-inter leading-relaxed max-w-xl mx-auto">
              Bridge for Couples helps you talk through conflict with clarity, respect, and emotional intelligence.
            </p>
          </div>
          
          {/* CTA Button with Advanced Animation */}
          <div 
            className={`transition-all duration-800 ease-out transform ${
              animationStage >= 3
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-4 scale-95'
            }`}
          >
            <div className="pt-4">
              <Button 
                onClick={handleGetStarted}
                size="lg"
                disabled={!isLoaded}
                className="
                  bg-[#2e4059] hover:bg-[#2e4059]/90 
                  text-white font-medium 
                  px-10 py-4 text-lg 
                  rounded-xl 
                  shadow-lg hover:shadow-xl 
                  transition-all duration-300 
                  transform hover:scale-105 hover:-translate-y-1
                  relative overflow-hidden
                  group
                "
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <span className="relative z-10 flex items-center gap-2">
                  {!isLoaded ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Let's Get Started
                      <svg 
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Loading Progress Indicator */}
        <div 
          className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${
            isLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="flex items-center gap-2 text-[#2e4059]/60 text-sm">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-[#2e4059]/40 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-[#2e4059]/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-[#2e4059]/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="font-inter">Preparing your experience...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedOnboardingScreen;
