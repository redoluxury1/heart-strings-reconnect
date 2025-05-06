
import React from 'react';
import { Button } from '@/components/ui/button';

interface ActiveTimerProps {
  formattedTime: string;
  onCancel: () => void;
}

const ActiveTimer: React.FC<ActiveTimerProps> = ({ formattedTime, onCancel }) => {
  return (
    <div className="text-center">
      <p className="text-[#5d4357] mb-2">
        Your partner has been notified that you need some time.
      </p>
      <div className="text-4xl font-bold text-golden-mustard my-6">
        {formattedTime}
      </div>
      <p className="text-[#5d4357]/80 mb-4 italic">
        You're doing something brave. Give yourself this time.
      </p>
      <Button 
        variant="outline"
        className="border-mauve-rose text-mauve-rose hover:bg-mauve-rose/10"
        onClick={onCancel}
      >
        Cancel Timer
      </Button>
    </div>
  );
};

export default ActiveTimer;
