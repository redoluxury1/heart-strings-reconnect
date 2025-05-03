
import React from 'react';
import { Button } from '@/components/ui/button';
import { Puzzle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ActionButtonsProps {
  onHome?: () => void;
  onRestart?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = () => {
  return (
    <div className="flex justify-center flex-wrap gap-4 mt-8">
      <Link to="/personality-quiz">
        <Button 
          className="bg-lavender-blue hover:bg-lavender-blue/90 text-white flex gap-2"
        >
          <Puzzle size={16} />
          Take Personality Quiz
        </Button>
      </Link>
    </div>
  );
};

export default ActionButtons;
