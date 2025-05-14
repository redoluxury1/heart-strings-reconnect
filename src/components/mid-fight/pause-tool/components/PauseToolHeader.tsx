
import React from 'react';
import { PauseStatus } from '../PauseTool';

interface PauseToolHeaderProps {
  status: PauseStatus;
  onSetupClick: () => void;
}

const PauseToolHeader: React.FC<PauseToolHeaderProps> = ({ status, onSetupClick }) => {
  const isActive = status !== 'setup';
  
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-cormorant text-[#07183D] font-medium">
        Take a Pause
      </h2>
      {isActive && (
        <button 
          className="text-sm text-[#E2725B] hover:underline"
          onClick={onSetupClick}
        >
          Restart
        </button>
      )}
    </div>
  );
};

export default PauseToolHeader;
