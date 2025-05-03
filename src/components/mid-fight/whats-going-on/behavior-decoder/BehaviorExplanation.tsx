
import React from 'react';
import { Button } from '@/components/ui/button';
import { Behavior } from '@/data/behavior-data';

interface BehaviorExplanationProps {
  behavior: Behavior;
  onStartChat: () => void;
  isMobile: boolean;
}

const BehaviorExplanation: React.FC<BehaviorExplanationProps> = ({ 
  behavior,
  onStartChat,
  isMobile
}) => {
  return (
    <div className="bg-white rounded-md border border-lavender-blue/20 p-4">
      <div className="mb-4">
        <h4 className={`font-medium ${isMobile ? 'text-base mb-2' : 'text-lg mb-3'} text-midnight-indigo`}>
          {behavior.explanation.title}
        </h4>
        <p className="text-sm text-midnight-indigo/80 leading-relaxed">
          {behavior.explanation.description}
        </p>
      </div>
      
      <div className={`${isMobile ? 'mb-3 py-2' : 'mb-4 py-3'} border-t border-b border-lavender-blue/10`}>
        <p className="text-sm font-medium text-midnight-indigo mb-1">Instead of reacting, try saying:</p>
        <blockquote className="italic text-sm text-midnight-indigo/90 pl-2 border-l-2 border-lavender-blue/30">
          "{behavior.response}"
        </blockquote>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={onStartChat} 
          variant="default"
          className="bg-lavender-blue hover:bg-lavender-blue/90 text-white text-sm py-2"
        >
          Use this phrase
        </Button>
      </div>
    </div>
  );
};

export default BehaviorExplanation;
