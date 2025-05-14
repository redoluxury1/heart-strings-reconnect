
import React from 'react';
import { Flame, HeartCrack, Puzzle } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export const FlameIcon: React.FC<{ className?: string }> = ({ className }) => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="relative">
      <Flame 
        className={`h-7 w-7 text-[#b25a44] transition-all ${isVisible ? 'animate-flame-flicker' : ''} ${className}`} 
      />
      <div 
        className={`absolute inset-0 ${isVisible ? 'opacity-50' : 'opacity-0'} bg-[#b25a44] blur-lg rounded-full transition-opacity duration-500`} 
      />
    </div>
  );
};

export const HeartBreakIcon: React.FC<{ className?: string }> = ({ className }) => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="relative">
      <HeartCrack 
        className={`h-7 w-7 text-[#2f3975] ${className}`} 
      />
      {/* Only using the zigzag line for the heart break effect, removing the straight line */}
      <div 
        className={`absolute top-1/4 left-1/2 w-[2px] h-[60%] transform -translate-x-1/2 zigzag-line ${
          isVisible ? 'animate-heart-break' : ''
        }`}
      />
    </div>
  );
};

export const PuzzleIcon: React.FC<{ className?: string }> = ({ className }) => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="relative flex items-center justify-center">
      {/* First puzzle piece (positioned on the left) */}
      <Puzzle 
        className={`h-7 w-7 text-mauve-rose transition-all left-puzzle-piece ${
          isVisible ? 'animate-puzzle-left' : ''
        }`} 
      />
      {/* Second puzzle piece (positioned on the right) */}
      <Puzzle 
        className={`h-7 w-7 text-mauve-rose/70 absolute transition-all right-puzzle-piece ${
          isVisible ? 'animate-puzzle-right' : ''
        }`} 
      />
    </div>
  );
};
