
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, RefreshCw, Puzzle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ActionButtonsProps {
  onHome: () => void;
  onRestart?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onHome, onRestart }) => {
  return (
    <div className="flex justify-center flex-wrap gap-4 mt-8">
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
