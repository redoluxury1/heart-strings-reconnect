
import React from 'react';
import { CirclePlay } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DateIdea } from '@/types/date-wheel';
import { renderIcon } from './utils/iconRenderer';

interface SpinningWheelProps {
  dateIdeas: DateIdea[];
  rotation: number;
  isSpinning: boolean;
  onSpin: () => void;
}

const SpinningWheel: React.FC<SpinningWheelProps> = ({
  dateIdeas,
  rotation,
  isSpinning,
  onSpin
}) => {
  return (
    <div className="relative w-full max-w-md aspect-square my-8">
      {/* Wheel Background */}
      <div className="absolute inset-0 rounded-full bg-white shadow-md border-2 border-lavender-blue/20"></div>
      
      {/* Spinning Wheel */}
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden"
        animate={{ rotate: rotation }}
        transition={{ duration: 3, type: "spring", damping: 30 }}
      >
        {dateIdeas.map((idea, index) => {
          const segmentSize = 360 / dateIdeas.length;
          const startAngle = index * segmentSize;
          const endAngle = (index + 1) * segmentSize;
          
          // Calculate segment background color based on pattern
          const segmentColors = [
            "from-[#FFDEE2] to-[#FFDEE2]/70", // Soft Pink
            "from-[#E5DEFF] to-[#E5DEFF]/70", // Soft Purple
            "from-[#FDE1D3] to-[#FDE1D3]/70", // Soft Peach
            "from-[#D3E4FD] to-[#D3E4FD]/70", // Soft Blue
            "from-[#F1F0FB] to-[#F1F0FB]/70", // Soft Gray
          ];
          const colorIndex = index % segmentColors.length;
          
          return (
            <div
              key={index}
              className={cn(
                "absolute inset-0 origin-bottom-left bg-gradient-to-br",
                segmentColors[colorIndex]
              )}
              style={{
                clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(startAngle * Math.PI / 180)}% ${50 + 50 * Math.sin(startAngle * Math.PI / 180)}%, ${50 + 50 * Math.cos(endAngle * Math.PI / 180)}% ${50 + 50 * Math.sin(endAngle * Math.PI / 180)}%)`
              }}
            >
              <div 
                className="absolute"
                style={{
                  top: `${50 + 42 * Math.sin((startAngle + segmentSize / 2) * Math.PI / 180)}%`,
                  left: `${50 + 42 * Math.cos((startAngle + segmentSize / 2) * Math.PI / 180)}%`,
                  transform: 'translate(-50%, -50%) rotate(90deg)',
                }}
              >
                {renderIcon(idea.icon)}
              </div>
            </div>
          );
        })}
      </motion.div>
      
      {/* Center Button */}
      <button
        onClick={onSpin}
        disabled={isSpinning}
        className={cn(
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
          "w-24 h-24 rounded-full bg-gradient-to-br from-midnight-indigo to-midnight-indigo/80",
          "flex items-center justify-center text-white shadow-lg",
          "transition-transform hover:scale-105 active:scale-95",
          "focus:outline-none focus:ring-2 focus:ring-lavender-blue",
          "disabled:opacity-70 z-10"
        )}
      >
        <div className="flex flex-col items-center">
          <CirclePlay className="h-8 w-8 mb-1" />
          <span className="text-xs font-medium">Spin</span>
        </div>
      </button>
      
      {/* Pointer indicator */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6">
        <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-midnight-indigo mx-auto"></div>
      </div>
    </div>
  );
};

export default SpinningWheel;
