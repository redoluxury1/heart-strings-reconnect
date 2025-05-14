
import React from 'react';
import { Button } from '@/components/ui/button';
import OptimizedImage from '@/components/common/OptimizedImage';

interface OnboardingWelcomeProps {
  onContinue: () => void;
}

const OnboardingWelcome: React.FC<OnboardingWelcomeProps> = ({ onContinue }) => {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <OptimizedImage 
          src="/lovable-uploads/f11235c1-f453-4752-bb91-b9417445b517.png"
          alt="Bridge For Couples"
          className="h-16 w-auto"
          priority={true}
        />
      </div>
      
      <h1 className="font-cormorant text-3xl md:text-4xl font-medium mb-6 text-midnight-indigo">
        We're here to help you communicate better — even when it's hard.
      </h1>
      
      <Button
        onClick={onContinue}
        className="mt-8 px-8 py-3 text-lg rounded-full bg-mauve-rose hover:bg-mauve-rose/90 text-white"
        size="lg"
      >
        Let's Get Started
      </Button>
    </div>
  );
};

export default OnboardingWelcome;
