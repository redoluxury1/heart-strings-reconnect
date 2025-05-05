
import React from 'react';
import { Button } from '@/components/ui/button';

interface HomeButtonProps {
  onHome: () => void;
}

const HomeButton: React.FC<HomeButtonProps> = ({ onHome }) => {
  return (
    <div className="mt-10 flex justify-center">
      <Button 
        variant="outline" 
        onClick={onHome}
        className="border-midnight-indigo text-midnight-indigo"
      >
        Back to Home
      </Button>
    </div>
  );
};

export default HomeButton;
