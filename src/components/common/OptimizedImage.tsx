
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  style?: React.CSSProperties; // Added style prop support
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  onLoad,
  style = {}, // Default to empty object
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Preload the image when component mounts
  useEffect(() => {
    // If the image is already in browser cache, it might be loaded instantly
    const img = new Image();
    img.src = src;
    
    if (priority) {
      img.fetchPriority = "high";
    }
    
    img.onload = () => {
      setImageLoaded(true);
      if (onLoad) onLoad();
    };
    
    img.onerror = () => {
      setError(true);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad, priority]);

  const aspectRatio = width && height ? { aspectRatio: `${width} / ${height}` } : {};
  const combinedStyle = { ...aspectRatio, ...style };
  
  return (
    <>
      {!imageLoaded && !error && (
        <Skeleton 
          className={`${className} bg-slate-200`} 
          style={combinedStyle}
        />
      )}
      
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => {
          setImageLoaded(true);
          if (onLoad) onLoad();
        }}
        onError={() => setError(true)}
        style={combinedStyle}
      />
    </>
  );
};

export default OptimizedImage;
