
import React from 'react';
import { Button } from '@/components/ui/button';
import { HeartHandshake } from 'lucide-react';
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
        <HeartHandshake size={60} className={isEmotional ? "text-mauve-rose" : "text-emerald-600"} />
      </div>
      
      <h1 className={`font-cormorant text-3xl md:text-4xl font-medium mb-6 ${
        isEmotional ? 'text-midnight-indigo' : 'text-white'
      }`}>
        We're here to help you communicate better — even when it's hard.
      </h1>
      
      <Button
        onClick={onContinue}
        className={`mt-8 px-8 py-3 rounded-full text-lg ${
          isEmotional 
            ? 'bg-mauve-rose hover:bg-mauve-rose/90 text-white' 
            : 'bg-emerald-700 hover:bg-emerald-600 text-white'
        }`}
        size="lg"
      >
        Let's Set You Up
      </Button>
    </div>
  );
};

export default OnboardingWelcome;
