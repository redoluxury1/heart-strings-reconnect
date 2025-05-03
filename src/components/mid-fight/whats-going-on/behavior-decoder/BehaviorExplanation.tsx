
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { Behavior } from '@/data/behavior-data';

interface BehaviorExplanationProps {
  behavior: Behavior;
  onStartChat: () => void;
}

const BehaviorExplanation: React.FC<BehaviorExplanationProps> = ({ 
  behavior, 
  onStartChat 
}) => {
  return (
    <div className="mt-8 space-y-5 bg-soft-blush/20 p-5 rounded-md">
      <div>
        <h4 className="text-md font-medium text-mauve-rose mb-2">What This Likely Means:</h4>
        <p className="text-midnight-indigo/90 text-sm">
          {behavior.meaning}
        </p>
      </div>
      
      <div>
        <h4 className="text-md font-medium text-lavender-blue mb-2">Try Saying:</h4>
        <p className="bg-white p-4 rounded border border-lavender-blue/30 text-midnight-indigo/90">
          "{behavior.response}"
        </p>
      </div>
      
      <Button 
        onClick={onStartChat} 
        className="bg-lavender-blue hover:bg-lavender-blue/90 text-white mt-5 w-full py-3"
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        Start a Chat
      </Button>
    </div>
  );
};

export default BehaviorExplanation;
