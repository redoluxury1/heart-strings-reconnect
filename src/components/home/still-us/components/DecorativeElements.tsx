
import React from 'react';

interface DecorativeElementsProps {
  visualEffect?: string;
}

const DecorativeElements: React.FC<DecorativeElementsProps> = ({ visualEffect }) => {
  if (!visualEffect) return null;
  
  switch(visualEffect) {
    case 'starry-navy':
      return (
        <>
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: 0.7
              }}
            />
          ))}
        </>
      );
    
    case 'terracotta-plum-blend':
      return (
        <>
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full animate-float bg-opacity-30"
              style={{
                width: `${Math.random() * 25 + 15}px`,
                height: `${Math.random() * 25 + 15}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: i % 2 === 0 ? '#b25a44' : '#e8dfea',
                opacity: 0.15,
                animationDelay: `${Math.random() * 3}s`,
                filter: 'blur(8px)'
              }}
            />
          ))}
        </>
      );
      
    default:
      return null;
  }
};

export default DecorativeElements;
