
import React from 'react';
import { Button } from '@/components/ui/button';

interface VisualizationControlsProps {
  showButtons: boolean;
  onContinue: () => void;
  onBack: () => void;
}

const VisualizationControls: React.FC<VisualizationControlsProps> = ({ 
  showButtons, 
  onContinue, 
  onBack 
}) => {
  return (
    <div className={`flex space-x-4 mt-4 transition-opacity duration-500 ${showButtons ? 'opacity-100' : 'opacity-0'}`}>
      <Button 
        variant="outline" 
        onClick={onBack}
        className="border-gray-300 text-gray-600 hover:text-[#7d6272]"
        disabled={!showButtons}
      >
        Back
      </Button>
      <Button 
        onClick={onContinue}
        className="bg-[#7d6272] hover:bg-[#6d5262] text-white"
        disabled={!showButtons}
      >
        Continue
      </Button>
    </div>
  );
};

export default VisualizationControls;
