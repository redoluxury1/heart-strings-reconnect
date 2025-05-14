
import React from 'react';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IntroScreenProps {
  isAnimating: boolean;
  onReady: () => void;
  onNeedTime: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ 
  isAnimating, 
  onReady, 
  onNeedTime 
}) => {
  return (
    <div className="bg-[#FDFBF9] rounded-xl border border-[#D7B4A8] shadow-sm p-6 max-w-xl mx-auto">
      <div className="flex flex-col items-center">
        {/* Icon with animation */}
        <div className="w-16 h-16 rounded-full bg-[#D3876A]/10 flex items-center justify-center mb-6">
          <Compass 
            className={`h-7 w-7 text-[#D3876A] ${isAnimating ? 'animate-rotate-compass' : ''}`} 
            onAnimationEnd={() => {}} // Animation end is handled in parent component
          />
        </div>
        
        {/* Header */}
        <h2 className="font-cormorant text-2xl md:text-[28px] font-semibold text-[#2C2C2C] mb-4 text-center">
          Let's Work This Out
        </h2>
        
        {/* Body Paragraphs */}
        <div className="text-center space-y-4 mb-6">
          <p className="text-[#3A3A3A] leading-[1.6]">
            This is a space to reflect on what just happened—privately and honestly.
          </p>
          <p className="text-[#3A3A3A] leading-[1.6]">
            You'll answer a few questions about how it felt for you. Your partner will do the same. When you're both done, we'll gently show where you align—and where to grow.
          </p>
        </div>
        
        {/* Primary CTA */}
        <Button 
          className="rounded-full bg-[#C47463] hover:bg-[#C47463]/90 text-white font-medium py-3 px-6 mt-6 w-full max-w-md"
          onClick={onReady}
        >
          Yes — I'm ready to move forward
        </Button>
        
        {/* Secondary CTA */}
        <Button 
          variant="outline" 
          className="rounded-full border-[1.5px] border-[#C47463] text-[#C47463] font-normal py-3 px-6 mt-3 hover:bg-[#C47463]/10 hover:text-[#C47463] bg-transparent w-full max-w-md"
          onClick={onNeedTime}
        >
          No — I need more time to decompress
        </Button>
      </div>
    </div>
  );
};

export default IntroScreen;
