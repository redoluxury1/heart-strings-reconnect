
import React from 'react';
import { Button } from '@/components/ui/button';
import { Flag } from 'lucide-react';

interface ActionButtonsProps {
  onCodeWordUsed: () => void;
  onChangeCodeWord: () => void;
  disabled?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onCodeWordUsed, 
  onChangeCodeWord,
  disabled = false 
}) => {
  return (
    <div className="space-y-4">
      <Button
        onClick={onCodeWordUsed}
        className="w-full flex items-center justify-center gap-2 bg-[#5d4357] hover:bg-[#4d3347] text-white py-4"
        disabled={disabled}
      >
        <Flag size={18} />
        <span>We used our code word</span>
      </Button>
      
      <Button
        onClick={onChangeCodeWord}
        variant="outline"
        className="w-full border-[#5d4357]/50 text-[#5d4357] hover:bg-[#5d4357]/10"
      >
        Change our code word
      </Button>
    </div>
  );
};

export default ActionButtons;
