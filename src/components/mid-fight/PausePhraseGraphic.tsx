
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface PausePhraseGraphicProps {
  className?: string;
}

const PausePhraseGraphic: React.FC<PausePhraseGraphicProps> = ({ className = '' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Preload the image when component mounts with higher priority
  useEffect(() => {
    const img = new Image();
    img.src = "/lovable-uploads/b5890910-9dea-494b-b8b1-c4e2a38a9578.png";
    img.onload = () => setImageLoaded(true);
    
    return () => {
      img.onload = null; // Clean up
    };
  }, []);
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {!imageLoaded && (
        <Skeleton className="h-24 w-48 rounded-lg" />
      )}
      <img 
        src="/lovable-uploads/b5890910-9dea-494b-b8b1-c4e2a38a9578.png" 
        alt="Pause + Phrase" 
        className={`h-auto w-full max-w-[260px] transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImageLoaded(true)}
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
};

export default PausePhraseGraphic;
