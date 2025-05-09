
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
    img.src = "/lovable-uploads/e1e5274e-42a4-478e-8034-e9e2ab658dda.png";
    img.onload = () => setImageLoaded(true);
    
    return () => {
      img.onload = null; // Clean up
    };
  }, []);
  
  return (
    <div className={`relative ${className}`}>
      {!imageLoaded && (
        <Skeleton className="h-24 w-24 rounded-lg" />
      )}
      <img 
        src="/lovable-uploads/e1e5274e-42a4-478e-8034-e9e2ab658dda.png" 
        alt="Pause + Phrase" 
        className={`h-24 w-auto transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImageLoaded(true)}
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
};

export default PausePhraseGraphic;
