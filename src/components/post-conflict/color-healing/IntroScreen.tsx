
import React from 'react';
import { Button } from '@/components/ui/button';

interface IntroScreenProps {
  onBegin: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onBegin }) => {
  return (
    <div className="flex flex-col items-center max-w-xl mx-auto text-center">
      <img 
        src="/lovable-uploads/6a166a5a-f921-4cff-8a03-83cbfe4fde10.png" 
        alt="Calming image" 
        className="h-32 w-auto mb-6" 
      />
      
      <h2 className="text-3xl md:text-4xl font-cormorant font-medium mb-4 text-center text-midnight-indigo">
        Let's Try Something Soothing
      </h2>
      
      <p className="text-center text-gray-700 mb-8 text-lg max-w-md mx-auto">
        Sometimes the body remembers what the mind is ready to move past. This simple breathing
        and visualization method can help you feel more peaceful—even when old pain resurfaces.
      </p>
      
      <Button 
        onClick={onBegin}
        className="bg-[#7d6272] hover:bg-[#6d5262] text-white px-8 py-2 rounded-full text-sm"
      >
        Begin Color Healing
      </Button>
    </div>
  );
};

export default IntroScreen;
