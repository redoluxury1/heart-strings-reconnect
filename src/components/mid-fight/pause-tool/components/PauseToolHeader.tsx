
import React from 'react';
import { PauseCircle } from 'lucide-react';

interface PauseToolHeaderProps {
  status: 'setup' | 'activation' | 'activated' | 'custom-timer' | 'in-pause' | 'ended' | 'confirm-restart' | 'not-ready';
  onSetupClick: () => void;
  codeWordExists?: boolean;
}

const PauseToolHeader: React.FC<PauseToolHeaderProps> = ({ 
  status, 
  onSetupClick,
  codeWordExists = false 
}) => {
  const isInitialView = status === 'setup';
  const hasCodeWord = codeWordExists;
  
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <button 
          onClick={onSetupClick}
          className={`mr-4 relative ${hasCodeWord ? 'cursor-pointer hover:opacity-80' : ''} transition-opacity`}
          disabled={!hasCodeWord}
          aria-label={hasCodeWord ? "Activate code word" : "Pause button"}
        >
          <PauseCircle className={`w-12 h-12 ${hasCodeWord ? 'text-[#E2725B]' : 'text-[#536878]'}`} />
          {hasCodeWord && (
            <span className="absolute -right-1 -bottom-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white" />
          )}
        </button>
        
        <div>
          <p className="text-sm text-[#5d4357]/80">
            {hasCodeWord 
              ? "Click the pause button to activate your code word" 
              : "Set a shared word that signals you need a pause"}
          </p>
        </div>
      </div>
      
      {!isInitialView && !hasCodeWord && (
        <button 
          onClick={onSetupClick}
          className="text-sm text-[#536878] hover:underline"
        >
          Change Settings
        </button>
      )}
    </div>
  );
};

export default PauseToolHeader;
