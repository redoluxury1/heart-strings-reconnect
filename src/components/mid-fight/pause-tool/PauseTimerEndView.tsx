
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import RestartPhrases from '@/components/mid-fight/restart-phrases/RestartPhrases';
import { Clock } from 'lucide-react';

interface PauseTimerEndViewProps {
  onViewReconnection: () => void;
  onNotYet: () => void;
  onRemindLater: () => void;
  setRestartMessage?: (message: string) => void;
}

const PauseTimerEndView: React.FC<PauseTimerEndViewProps> = ({
  onViewReconnection,
  onNotYet,
  onRemindLater,
  setRestartMessage
}) => {
  const [isRestartPhrasesOpen, setIsRestartPhrasesOpen] = useState(false);

  const handleRestartPhrasesClose = () => {
    setIsRestartPhrasesOpen(false);
  };

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
          onClick={() => setIsRestartPhrasesOpen(true)}
          className="w-full bg-[#5d4357] text-white hover:bg-[#5d4357]/90 py-5"
        >
          View Restart Phrases
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
          className="w-full border-[#5d4357]/20 text-[#5d4357] hover:bg-[#5d4357]/10 flex items-center justify-center py-5"
        >
          <Clock size={18} className="mr-2" />
          Remind Me Again Later
        </Button>
      </div>
      
      <p className="text-[#5d4357]/70 text-sm mt-8 italic">
        You don't have to rush back in. Take the time you need.
      </p>

      <Dialog open={isRestartPhrasesOpen} onOpenChange={setIsRestartPhrasesOpen}>
        <DialogContent className="max-w-lg p-0 bg-transparent border-none shadow-none">
          <RestartPhrases 
            onClose={handleRestartPhrasesClose}
            setRestartMessage={setRestartMessage}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PauseTimerEndView;
