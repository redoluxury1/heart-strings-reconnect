
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface TryAgainGraphicProps {
  className?: string;
}

const TryAgainGraphic: React.FC<TryAgainGraphicProps> = ({ className = '' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Preload the image when component mounts with higher priority
  useEffect(() => {
    const img = new Image();
    img.src = "/lovable-uploads/27295ce7-ea9f-48d5-b8cc-11ced227583b.png";
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
        src="/lovable-uploads/27295ce7-ea9f-48d5-b8cc-11ced227583b.png" 
        alt="Let's Try That Again" 
        className={`h-auto w-full max-w-[260px] transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImageLoaded(true)}
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
};

export default TryAgainGraphic;
