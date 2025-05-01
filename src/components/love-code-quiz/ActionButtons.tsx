
import React from 'react';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  onHome: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onHome }) => {
  return (
    <div className="flex justify-center mt-8">
      <Button variant="outline" onClick={onHome} className="border-midnight-indigo text-midnight-indigo">
        Back to Home
      </Button>
    </div>
  );
};

export default ActionButtons;
