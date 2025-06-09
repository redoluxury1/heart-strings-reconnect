
import React from 'react';
import { cn } from "@/lib/utils";
import { BubbleData } from './BubbleStyles';

interface FloatingBubbleProps {
  bubble: BubbleData;
}

const FloatingBubble: React.FC<FloatingBubbleProps> = ({ bubble }) => {
  console.log('FloatingBubble rendering:', bubble.message);
  
  return (
    <div 
      id={`bubble-${bubble.id}`}
      className={cn(
        "absolute px-4 py-2 rounded-xl shadow-lg font-inter font-semibold text-center pointer-events-none z-20",
        "after:content-[''] after:absolute after:bottom-[-8px] after:border-l-[8px] after:border-l-transparent after:border-r-[8px] after:border-r-transparent after:border-t-[8px]",
        bubble.style.bgColor,
        bubble.style.textColor,
        bubble.positionStyle,
        bubble.tailPosition,
        bubble.style.position
      )}
      style={{ 
        animation: 'fadeInSlow 1.2s ease-out forwards',
        willChange: 'opacity, transform',
        minWidth: '120px',
        maxWidth: '240px',
        fontSize: '14px',
        lineHeight: '1.3'
      }}
    >
      {bubble.message}
    </div>
  );
};

export default FloatingBubble;
