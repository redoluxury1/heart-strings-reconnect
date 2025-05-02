
import React from 'react';
import { Button } from '@/components/ui/button';
import { BrainCog } from 'lucide-react';
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
          <img 
            src="/lovable-uploads/f11235c1-f453-4752-bb91-b9417445b517.png"
            alt="Bridge For Couples"
            className="h-16 w-auto"
          />
        ) : (
          <div className="flex items-center justify-center">
            <BrainCog size={60} className="text-[#4f6572] mr-2" />
            <img 
              src="/lovable-uploads/f11235c1-f453-4752-bb91-b9417445b517.png"
              alt="Bridge For Couples"
              className="h-16 w-auto"
            />
          </div>
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
            : 'rounded-md bg-[#543544] hover:bg-[#543544]/90 text-white'
        }`}
        size="lg"
      >
        Let's Set You Up
      </Button>
    </div>
  );
};

export default OnboardingWelcome;
