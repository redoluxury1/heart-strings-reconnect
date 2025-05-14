
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import ColorHealingMethod from '@/components/post-conflict/color-healing/ColorHealingMethod';

const MidFightColorHealing: React.FC = () => {
  const [showColorHealing, setShowColorHealing] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Preload the image when component mounts
  React.useEffect(() => {
    const img = new Image();
    img.src = "/lovable-uploads/bfee4335-5a61-4d5c-bdc2-cda58c3beb29.png";
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
            Take a Breath
          </h2>
          
          {/* Subtitle text */}
          <p className="text-[#7D5248] text-xl md:text-2xl mb-8 max-w-lg mx-auto">
            Find calm in the midst of strong emotions
          </p>
          
          {/* New illustration of the couple */}
          <div className="mb-8 flex justify-center">
            {!imageLoaded && (
              <div className="w-full max-w-md h-64 bg-gray-100 animate-pulse rounded-lg" />
            )}
            <img 
              src="/lovable-uploads/bfee4335-5a61-4d5c-bdc2-cda58c3beb29.png" 
              alt="Person with closed eyes in a peaceful state"
              className={`w-full max-w-md h-auto ${!imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`} 
              onLoad={() => setImageLoaded(true)}
              loading="eager"
              fetchPriority="high"
            />
          </div>
          
          {/* Button to start the color healing flow */}
          <button 
            onClick={() => setShowColorHealing(true)}
            className="bg-[#7D5248] hover:bg-[#6a443b] text-white rounded-full px-8 py-6 text-lg"
          >
            Try Color Healing Method
          </button>
          
          {/* Descriptive text about the color healing method */}
          <p className="text-[#7D5248] opacity-80 mt-4 text-sm max-w-sm mx-auto">
            A calming breathwork and visualization tool to release emotional tension during conflict.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default MidFightColorHealing;
