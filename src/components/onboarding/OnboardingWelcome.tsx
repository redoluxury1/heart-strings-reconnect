
import React from 'react';
import { Button } from '@/components/ui/button';
import OptimizedImage from '@/components/common/OptimizedImage';

interface OnboardingWelcomeProps {
  onContinue: () => void;
}

const OnboardingWelcome: React.FC<OnboardingWelcomeProps> = ({ onContinue }) => {
  return (
    <div className="text-center flex flex-col items-center">
      <h1 className="font-cormorant text-3xl md:text-4xl font-medium mb-6 text-midnight-indigo">
        We're here to help you communicate better — even when it's hard.
      </h1>
      
      <div className="flex justify-center my-8 w-full">
        <OptimizedImage 
          src="/lovable-uploads/1630939c-5a23-4678-a75f-c4d384bbfce4.png"
          alt="Bridge For Couples Hearts Logo"
          className="h-32 w-auto"
          priority={true}
        />
      </div>
      
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
