
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ColorHealingMethod from '@/components/post-conflict/color-healing/ColorHealingMethod';
import { Skeleton } from '@/components/ui/skeleton';

const MidFightColorHealing: React.FC = () => {
  const [showColorHealing, setShowColorHealing] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Preload the image when component mounts
  useEffect(() => {
    const img = new Image();
    img.src = "/lovable-uploads/c8f75296-51f7-4d50-84f0-68f55b65e7bc.png";
    img.onload = () => setImageLoaded(true);
    
    return () => {
      img.onload = null; // Clean up
    };
  }, []);
  
  if (showColorHealing) {
    return <ColorHealingMethod />;
  }

  return (
    <Card className="border-none overflow-hidden rounded-xl shadow-md">
      <div 
        className="p-8 lg:p-12 flex flex-col items-center bg-[#F8EFE0]" 
      >
        <div className="max-w-2xl mx-auto text-center">
          {/* Title using the serif font and warm brown color */}
          <h2 className="font-cormorant text-5xl md:text-6xl lg:text-7xl mb-4 text-[#7D5248] leading-tight">
            Sometimes,<br />it still hurts.
          </h2>
          
          {/* Subtitle text */}
          <p className="text-[#7D5248] text-xl md:text-2xl mb-8 max-w-lg mx-auto">
            Find calm when forgiveness doesn't erase the pain.
          </p>
          
          {/* Image of person with emotions */}
          <div className="mb-8 flex justify-center">
            {!imageLoaded && (
              <Skeleton className="w-full max-w-md h-64" />
            )}
            <img 
              src="/lovable-uploads/c8f75296-51f7-4d50-84f0-68f55b65e7bc.png" 
              alt="Person crying with partner comforting them"
              className={`w-full max-w-md h-auto ${!imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`} 
              onLoad={() => setImageLoaded(true)}
              loading="eager"
              fetchPriority="high"
            />
          </div>
          
          {/* Smaller button to start the color healing flow */}
          <Button 
            onClick={() => setShowColorHealing(true)}
            className="bg-[#7D5248] hover:bg-[#6a443b] text-white rounded-full px-4 py-2 text-sm"
          >
            Try Color Healing Method
          </Button>
          
          {/* Descriptive text about the color healing method */}
          <p className="text-[#7D5248] opacity-80 mt-4 text-xs max-w-sm mx-auto">
            A calming breathwork and visualization tool to release lingering emotional tension.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default MidFightColorHealing;
