
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import RestartPhrases from '@/components/mid-fight/restart-phrases/RestartPhrases';

interface ReconnectionStartersProps {
  onClose: () => void;
}

const ReconnectionStarters: React.FC<ReconnectionStartersProps> = ({ onClose }) => {
  return (
    <DialogContent className="max-w-lg p-0 bg-transparent border-none shadow-none">
      <RestartPhrases onClose={onClose} />
    </DialogContent>
  );
};

export default ReconnectionStarters;
