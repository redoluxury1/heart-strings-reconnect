
import React from 'react';
import { Flame, HeartCrack, Puzzle } from 'lucide-react';

export const FlameIcon: React.FC<{ className?: string }> = ({ className }) => (
  <div className="group relative">
    <Flame 
      className={`h-7 w-7 text-[#b25a44] transition-all group-hover-flame-flicker ${className}`} 
    />
    <div className="absolute inset-0 opacity-0 group-hover:opacity-50 bg-[#b25a44] blur-lg rounded-full transition-opacity" />
  </div>
);

export const HeartBreakIcon: React.FC<{ className?: string }> = ({ className }) => (
  <div className="group relative">
    <HeartCrack 
      className={`h-7 w-7 text-[#2f3975] ${className}`} 
    />
    <div 
      className="absolute top-1/2 left-1/2 w-[2px] h-[60%] bg-[#2f3975] transform -translate-x-1/2 -translate-y-1/2 heart-break-line group-hover-heart-break"
    />
  </div>
);

export const PuzzleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <div className="group relative flex items-center justify-center">
    <Puzzle 
      className={`h-7 w-7 text-mauve-rose transition-all ${className}`} 
    />
    <Puzzle 
      className={`h-5 w-5 text-mauve-rose/70 absolute transition-all puzzle-piece group-hover-puzzle-fit`} 
    />
  </div>
);
