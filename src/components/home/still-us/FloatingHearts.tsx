
import React, { useState } from 'react';
import { Heart } from 'lucide-react';

// Floating heart component with animation
export const FloatingHeart = () => {
  const [style] = useState({
    left: `${Math.random() * 90 + 5}%`,
    top: `${Math.random() * 90 + 5}%`,
    animationDuration: `${Math.random() * 20 + 10}s`,
    animationDelay: `${Math.random() * 5}s`,
    opacity: (Math.random() * 0.2 + 0.1).toString(),
    transform: `scale(${Math.random() * 0.6 + 0.4})`,
  });

  return (
    <div 
      className="absolute pointer-events-none animate-float"
      style={{
        position: 'absolute',
        left: style.left,
        top: style.top,
        animation: `float ${style.animationDuration} ease-in-out infinite`,
        animationDelay: style.animationDelay,
        opacity: style.opacity,
      }}
    >
      <Heart fill="currentColor" className="h-4 w-4 text-mauve-rose" />
    </div>
  );
};

// Component to generate multiple floating hearts
export const FloatingHearts = ({ count = 15 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <FloatingHeart key={i} />
      ))}
    </>
  );
};

export default FloatingHearts;
