
import React from 'react';
import { Button } from '@/components/ui/button';

interface OnboardingWelcomeProps {
  onContinue: () => void;
}

const OnboardingWelcome: React.FC<OnboardingWelcomeProps> = ({ onContinue }) => {
  return (
    <div className="text-center flex flex-col items-center">
      <h1 className="font-cormorant text-3xl md:text-4xl font-medium mb-6 text-midnight-indigo">
        We know it's hard to know what to say or even what to ask for help with. That's why we've done the thinking for you.
      </h1>
      
      <Button
        onClick={onContinue}
        className="mt-4 px-8 py-3 text-lg rounded-full bg-mauve-rose hover:bg-mauve-rose/90 text-white"
        size="lg"
      >
        Let's Get Started
      </Button>
    </div>
  );
};

export default OnboardingWelcome;
