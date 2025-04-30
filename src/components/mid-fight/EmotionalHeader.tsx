
import React from 'react';
import { Flame } from 'lucide-react';

interface EmotionalHeaderProps {
  isVisible: boolean;
  animationsEnabled?: boolean;
}

const EmotionalHeader: React.FC<EmotionalHeaderProps> = ({ 
  isVisible,
  animationsEnabled = true
}) => {
  return (
    <section 
      className={`px-4 sm:px-6 md:px-8 py-16 bg-mauve-rose/30 rounded-md ${
        animationsEnabled ? 'transition-opacity duration-700 ease-in-out' : ''
      } ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-label="Emotional message that reads: 'This moment isn't about being right. It's about not losing each other. Take a second to breathe. You're doing better than you think.'"
    >
      <div className="max-w-3xl mx-auto text-center relative">
        <div className="flex justify-center mb-6">
          <Flame className={`h-16 w-16 text-mauve-rose ${isVisible && animationsEnabled ? 'animate-pulse' : ''}`} />
        </div>
        
        <h1 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-medium text-midnight-indigo mb-6">
          This moment isn't about being right.<br />
          It's about not losing each other.
        </h1>
        
        <div className="space-y-0">
          <p className="text-midnight-indigo/80 text-lg md:text-xl max-w-2xl mx-auto font-normal">
            Take a second to breathe.
          </p>
          <p className="text-midnight-indigo/80 text-lg md:text-xl max-w-2xl mx-auto font-normal">
            You're doing better than you think.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmotionalHeader;
