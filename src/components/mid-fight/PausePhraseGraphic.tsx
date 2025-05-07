
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const PausePhraseGraphic: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Preload the image when component mounts
  useEffect(() => {
    const img = new Image();
    img.src = "/lovable-uploads/09c6e370-f376-47e7-98ba-66452103b58b.png";
    img.onload = () => setImageLoaded(true);
    
    return () => {
      img.onload = null; // Clean up
    };
  }, []);
  
  return (
    <div className="relative text-center my-4">
      {!imageLoaded && (
        <Skeleton className="h-32 w-full max-w-md mx-auto rounded-lg" />
      )}
      <img 
        src="/lovable-uploads/09c6e370-f376-47e7-98ba-66452103b58b.png" 
        alt="Pause + Phrase" 
        className={`h-auto w-full max-w-md mx-auto transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImageLoaded(true)}
        loading="eager"
      />
    </div>
  );
};

export default PausePhraseGraphic;
