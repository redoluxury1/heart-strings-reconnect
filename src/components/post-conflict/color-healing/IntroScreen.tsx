
import React from 'react';
import { Button } from '@/components/ui/button';

interface IntroScreenProps {
  onBegin: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onBegin }) => {
  return (
    <div className="flex flex-col items-center max-w-xl mx-auto text-center p-4 relative">
      {/* Background gradient waves */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-[30%] right-[5%] w-72 h-72 rounded-full bg-[#E5DEFF] blur-xl"></div>
        <div className="absolute top-[40%] left-[10%] w-64 h-64 rounded-full bg-[#FFDEE2] blur-xl"></div>
        <div className="absolute bottom-[20%] left-[15%] w-48 h-48 rounded-full bg-[#FDE1D3] blur-xl"></div>
      </div>
      
      {/* Content with higher z-index to appear above the background */}
      <div className="relative z-10 max-w-lg">
        <h2 className="font-cormorant text-5xl md:text-6xl text-[#2B2B2B] mb-6">
          Let's Try Something Soothing
        </h2>
        
        <p className="text-[#2B2B2B] text-xl mb-8 max-w-md mx-auto leading-relaxed">
          Sometimes the body remembers what the mind is ready to move past. This simple breathing
          and visualization method can help you feel more peaceful—even when old pain resurfaces.
        </p>
        
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/f3491f6b-acc0-4171-8fb6-e9a234feab6b.png" 
            alt="Person with closed eyes and peaceful expression with colorful waves in background" 
            className="h-auto w-full max-w-md"
          />
        </div>
        
        <div className="mt-4">
          <Button 
            onClick={onBegin}
            className="bg-[#382418] hover:bg-[#4a3020] text-white rounded-full px-10 py-6 text-xl font-medium"
          >
            Begin Color Healing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
