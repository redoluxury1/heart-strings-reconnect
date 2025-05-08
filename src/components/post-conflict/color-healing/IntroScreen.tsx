
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface IntroScreenProps {
  onBegin: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onBegin }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload the image with high priority
  useEffect(() => {
    const img = new Image();
    img.src = "/lovable-uploads/bfee4335-5a61-4d5c-bdc2-cda58c3beb29.png";
    img.onload = () => setImageLoaded(true);
    
    return () => {
      img.onload = null; // Clean up
    };
  }, []);
  
  return (
    <div className="flex flex-col items-center max-w-xl mx-auto text-center p-4 relative">
      {/* Background gradient waves with animation */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-[30%] right-[5%] w-72 h-72 rounded-full bg-[#E5DEFF] blur-xl animate-pulse-slow"></div>
        <div className="absolute top-[40%] left-[10%] w-64 h-64 rounded-full bg-[#FFDEE2] blur-xl animate-float-slow"></div>
        <div className="absolute bottom-[20%] left-[15%] w-48 h-48 rounded-full bg-[#FDE1D3] blur-xl animate-expand"></div>
      </div>
      
      {/* Content with higher z-index to appear above the background */}
      <div className="relative z-10 max-w-lg">
        <h2 className="font-cormorant text-5xl md:text-6xl text-[#2B2B2B] mb-6">
          Let's Try Something Soothing
        </h2>
        
        <p className="text-[#2B2B2B] text-base mb-8 max-w-md mx-auto leading-relaxed">
          Sometimes the body remembers what the mind is ready to move past. This simple breathing
          and visualization method can help you feel more peaceful—even when old pain resurfaces.
        </p>
        
        <div className="flex justify-center mb-8 relative">
          {/* Animated waves that wrap around the figure */}
          <div className="absolute inset-0 -z-10">
            {/* Right side wave */}
            <div className="absolute top-[10%] right-[10%] w-40 h-40 rounded-full bg-[#E5DEFF] opacity-50 blur-xl animate-wave-right"></div>
            {/* Left side wave */}
            <div className="absolute bottom-[20%] left-[10%] w-40 h-40 rounded-full bg-[#FFDEE2] opacity-50 blur-xl animate-wave-left"></div>
            {/* New top wave that wraps over the figure */}
            <div className="absolute top-[-5%] left-[30%] w-52 h-52 rounded-full bg-[#E5DEFF] opacity-40 blur-xl animate-wave-top"></div>
            {/* Additional wave for more complete wrapping effect */}
            <div className="absolute top-[15%] right-[30%] w-36 h-36 rounded-full bg-[#FFDEE2] opacity-40 blur-xl animate-wave-circle"></div>
          </div>
          
          {/* Image with loading state */}
          <div className="h-auto w-full max-w-md relative z-0">
            {!imageLoaded && (
              <Skeleton className="h-[300px] w-full max-w-md rounded-lg bg-gray-200" />
            )}
            <img 
              src="/lovable-uploads/bfee4335-5a61-4d5c-bdc2-cda58c3beb29.png" 
              alt="Person with closed eyes and peaceful expression with colorful waves in background" 
              className={`h-auto w-full max-w-md relative z-0 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              loading="eager" // This is a critical above-the-fold image
              fetchPriority="high"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <Button 
            onClick={onBegin}
            className="bg-[#382418] hover:bg-[#4a3020] text-white rounded-full px-10 py-6 text-xl font-medium"
          >
            Begin Color Healing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
