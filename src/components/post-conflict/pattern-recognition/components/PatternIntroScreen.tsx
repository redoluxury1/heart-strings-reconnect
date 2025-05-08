
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface PatternIntroScreenProps {
  onContinue: () => void;
}

const PatternIntroScreen: React.FC<PatternIntroScreenProps> = ({ onContinue }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Preload the image when component mounts
  useEffect(() => {
    const img = new Image();
    img.src = "/lovable-uploads/39110aa2-d4b1-4586-bd3f-56a1ae1053c8.png";
    img.onload = () => setImageLoaded(true);
    
    return () => {
      img.onload = null; // Clean up
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto py-4">
      <h2 className="text-5xl font-cormorant font-medium text-[#14213d] mb-6 tracking-tight">
        Let's break the cycle.
      </h2>
      
      <p className="text-xl text-[#14213d] mb-10 max-w-2xl">
        Every couple has patterns. The goal isn't to be perfect—it's to catch 
        the cycle before it catches you.
      </p>
      
      <div className="relative w-full max-w-md mb-10">
        {!imageLoaded && (
          <Skeleton className="w-full h-64 rounded-lg" />
        )}
        <img
          src="/lovable-uploads/39110aa2-d4b1-4586-bd3f-56a1ae1053c8.png"
          alt="Couple sitting back to back with arms crossed"
          className={`w-full h-auto rounded-lg transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="eager"
          fetchPriority="high"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      <Button
        onClick={onContinue}
        className="bg-[#14213d] hover:bg-[#14213d]/90 text-white font-medium py-2 px-5 rounded-full text-sm"
      >
        Start Recognizing the Pattern
      </Button>
    </div>
  );
};

export default PatternIntroScreen;
