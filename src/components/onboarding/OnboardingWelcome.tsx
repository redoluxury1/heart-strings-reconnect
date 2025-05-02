
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, BrainCog } from 'lucide-react';
import { InterfaceStyle } from '../../pages/Onboarding';

interface OnboardingWelcomeProps {
  interfaceStyle: InterfaceStyle;
  onContinue: () => void;
}

const OnboardingWelcome: React.FC<OnboardingWelcomeProps> = ({ 
  interfaceStyle,
  onContinue 
}) => {
  const isEmotional = interfaceStyle === 'emotionally-reflective';
  
  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        {isEmotional ? (
          <Heart size={60} className="text-mauve-rose" />
        ) : (
          <BrainCog size={60} className="text-[#589391]" />
        )}
      </div>
      
      <h1 className={`font-cormorant text-3xl md:text-4xl font-medium mb-6 ${
        isEmotional ? 'text-midnight-indigo' : 'text-white'
      }`}>
        We're here to help you communicate better — even when it's hard.
      </h1>
      
      <Button
        onClick={onContinue}
        className={`mt-8 px-8 py-3 text-lg ${
          isEmotional 
            ? 'rounded-full bg-mauve-rose hover:bg-mauve-rose/90 text-white' 
            : 'rounded-md bg-[#E51D2C] hover:bg-[#E51D2C]/90 text-[#F4F1EC]'
        }`}
        size="lg"
      >
        Let's Set You Up
      </Button>
    </div>
  );
};

export default OnboardingWelcome;
