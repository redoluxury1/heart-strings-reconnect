
import React from 'react';
import { Button } from '@/components/ui/button';
import { type PauseStatus } from '../PauseTool';

interface PauseToolHeaderProps {
  status: PauseStatus;
  onSetupClick: () => void;
}

const PauseToolHeader: React.FC<PauseToolHeaderProps> = ({ 
  status, 
  onSetupClick 
}) => {
  const getStatusText = () => {
    switch (status) {
      case 'setup':
        return 'Pause Tool';
      case 'activation':
        return 'Activate Code Word';
      case 'activated':
        return 'Select Pause Duration';
      case 'custom-timer':
        return 'Custom Timer';
      default:
        return 'Pause Tool';
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-medium text-[#5d4357]">
        {getStatusText()}
      </h2>
      
      {status !== 'setup' && (
        <Button
          variant="ghost"
          className="text-[#5d4357] hover:bg-[#5d4357]/10"
          onClick={onSetupClick}
        >
          Back
        </Button>
      )}
    </div>
  );
};

export default PauseToolHeader;
