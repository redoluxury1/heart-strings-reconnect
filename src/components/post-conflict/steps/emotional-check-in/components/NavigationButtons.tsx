
import React from 'react';
import { Button } from '@/components/ui/button';

interface NavigationButtonsProps {
  onNext: () => void;
  onBack: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ onNext, onBack }) => {
  return (
    <div className="flex w-full justify-between items-center mt-8">
      <Button
        variant="outline"
        onClick={onBack}
        className="border-[#D9B9AF] text-[#3A3A3A] hover:bg-[#F8F5F3]"
      >
        Back
      </Button>
      <Button
        className="bg-[#5D3A5A] hover:bg-[#5D3A5A]/90 text-white rounded-full px-6"
        onClick={onNext}
      >
        Next
      </Button>
    </div>
  );
};

export default NavigationButtons;
