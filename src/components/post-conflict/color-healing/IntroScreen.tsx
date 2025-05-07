
import React from 'react';
import { Button } from '@/components/ui/button';

interface IntroScreenProps {
  onBegin: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onBegin }) => {
  return (
    <div className="flex flex-col items-center max-w-xl mx-auto text-center p-4">
      <h2 className="font-cormorant text-4xl md:text-5xl text-[#7D5248] mb-6">
        Let's Try Something Soothing
      </h2>
      
      <img 
        src="/lovable-uploads/75a2efab-7a98-43ed-aa60-ff0fd54306da.png" 
        alt="Couple comforting each other" 
        className="h-auto w-full max-w-sm mb-8" 
      />
      
      <p className="text-[#7D5248] text-lg mb-8 max-w-md mx-auto">
        Sometimes the body remembers what the mind is ready to move past. This simple breathing
        and visualization method can help you feel more peaceful—even when old pain resurfaces.
      </p>
      
      <Button 
        onClick={onBegin}
        className="bg-[#7D5248] hover:bg-[#6a443b] text-white rounded-full px-8 py-6 text-lg"
      >
        Begin Color Healing
      </Button>
    </div>
  );
};

export default IntroScreen;
