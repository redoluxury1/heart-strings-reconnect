
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import RestartPhrases from '@/components/mid-fight/restart-phrases/RestartPhrases';

interface ReconnectionStartersProps {
  onClose: () => void;
  setRestartMessage?: (message: string) => void;
}

const ReconnectionStarters: React.FC<ReconnectionStartersProps> = ({ 
  onClose,
  setRestartMessage 
}) => {
  return (
    <DialogContent className="max-w-lg p-0 bg-transparent border-none shadow-none">
      <RestartPhrases onClose={onClose} />
    </DialogContent>
  );
};

export default ReconnectionStarters;
