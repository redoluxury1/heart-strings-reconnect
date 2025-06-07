
import React from 'react';
import { cn } from "@/lib/utils";
import { BubbleData } from './BubbleStyles';

interface HeroBubbleProps {
  bubble: BubbleData;
}

const HeroBubble: React.FC<HeroBubbleProps> = ({ bubble }) => {
  return (
    <div 
      id={`bubble-${bubble.id}`}
      className={cn(
        `absolute px-4 py-2 rounded-xl shadow-sm font-inter font-semibold text-center text-sm`, 
        bubble.style.bgColor,
        bubble.style.textColor,
        bubble.positionStyle,
        bubble.tailPosition,
        "after:content-[''] after:absolute after:bottom-[-8px] after:border-l-[8px] after:border-l-transparent after:border-r-[8px] after:border-r-transparent after:border-t-[8px]",
        bubble.style.position
      )}
      style={{ 
        animation: 'fadeInSlow 2s ease-out forwards',
        willChange: 'opacity, transform',
      }}
    >
      {bubble.message}
    </div>
  );
};

export default HeroBubble;
