
import React from 'react';
import { Button } from '@/components/ui/button';

interface PauseTimerEndViewProps {
  onViewReconnection: () => void;
  onNotYet: () => void;
  onRemindLater: () => void;
}

const PauseTimerEndView: React.FC<PauseTimerEndViewProps> = ({
  onViewReconnection,
  onNotYet,
  onRemindLater
}) => {
  return (
    <div className="max-w-md mx-auto text-center">
      <h3 className="text-2xl text-[#5d4357] font-medium mb-4">
        Your pause is up
      </h3>
      
      <p className="text-[#5d4357] mb-8">
        Want to return to this gently?
      </p>
      
      <div className="space-y-4">
        <Button
          onClick={onViewReconnection}
          className="w-full bg-[#5d4357] text-white hover:bg-[#5d4357]/90 py-5"
        >
          View Reconnection Starters
        </Button>
        
        <Button
          onClick={onNotYet}
          variant="outline"
          className="w-full border-[#5d4357]/20 text-[#5d4357] hover:bg-[#5d4357]/10 py-5"
        >
          Not Yet
        </Button>
        
        <Button
          onClick={onRemindLater}
          variant="outline"
          className="w-full border-[#5d4357]/20 text-[#5d4357] hover:bg-[#5d4357]/10 py-5"
        >
          Remind Me Again Later
        </Button>
      </div>
      
      <p className="text-[#5d4357]/70 text-sm mt-8 italic">
        You don't have to rush back in. Take the time you need.
      </p>
    </div>
  );
};

export default PauseTimerEndView;
