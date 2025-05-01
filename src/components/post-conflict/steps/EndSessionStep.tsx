
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquareHeart } from 'lucide-react';

interface EndSessionStepProps {
  onSendLoveNote: () => void;
  onDone: () => void;
}

const EndSessionStep: React.FC<EndSessionStepProps> = ({ 
  onSendLoveNote, 
  onDone 
}) => {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <div className="flex items-center">
          <Heart className="h-8 w-8 text-red-500 fill-red-500 mr-2" />
          <Heart className="h-8 w-8 text-red-500 fill-red-500" />
        </div>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-4">
        You made it through!
      </h2>
      
      <p className="text-gray-700 mb-8 max-w-md mx-auto">
        Conflict doesn't mean disconnection — and you just proved it. What would you like to do next?
      </p>
      
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <Button 
          className="bg-mauve-rose hover:bg-mauve-rose/90 text-white flex items-center gap-2"
          onClick={onSendLoveNote}
        >
          <MessageSquareHeart size={18} />
          Send a Love Note
        </Button>
        
        <Button 
          variant="outline" 
          className="border-gray-300 text-gray-700"
          onClick={onDone}
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default EndSessionStep;
