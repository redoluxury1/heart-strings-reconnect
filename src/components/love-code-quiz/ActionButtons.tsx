
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, RefreshCw } from 'lucide-react';

interface ActionButtonsProps {
  onHome: () => void;
  onRestart?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onHome, onRestart }) => {
  return (
    <div className="flex justify-center mt-8 gap-4 flex-wrap">
      <Button 
        variant="outline" 
        onClick={onHome} 
        className="border-midnight-indigo text-midnight-indigo hover:bg-midnight-indigo/10 flex gap-2"
      >
        <Home size={16} />
        Back to Home
      </Button>
      
      {onRestart && (
        <Button 
          variant="outline" 
          onClick={onRestart} 
          className="border-lavender-blue text-lavender-blue hover:bg-lavender-blue/10 flex gap-2"
        >
          <RefreshCw size={16} />
          Retake Quiz
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
