
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

interface NeedsRepairStepProps {
  onResponse: (response: string) => void;
  partner1Response: string | null;
  partner2Response: string | null;
}

const NeedsRepairStep: React.FC<NeedsRepairStepProps> = ({ 
  onResponse, 
  partner1Response,
  partner2Response 
}) => {
  const [input, setInput] = useState(partner1Response || '');
  const [isSubmitted, setIsSubmitted] = useState(!!partner1Response);
  
  const handleSubmit = () => {
    if (input.trim()) {
      onResponse(input);
      setIsSubmitted(true);
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-3 text-center">
        Needs + Repair
      </h2>
      
      <p className="text-center text-gray-700 mb-6">
        What do you need in order to move forward?
      </p>
      
      {!isSubmitted ? (
        <div className="max-w-lg mx-auto">
          <Textarea 
            placeholder="I need..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mb-4 min-h-[120px]"
          />
          
          <Button 
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white w-full flex items-center justify-center gap-2"
            disabled={!input.trim()}
          >
            <Send size={16} />
            Share
          </Button>
        </div>
      ) : (
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-soft-blush/20 p-5 rounded-lg">
              <h3 className="font-medium mb-3 text-midnight-indigo">You need:</h3>
              <p className="text-gray-700">{partner1Response}</p>
            </div>
            
            {partner2Response && (
              <div className="bg-soft-cream/30 p-5 rounded-lg animate-fade-in">
                <h3 className="font-medium mb-3 text-midnight-indigo">Your partner needs:</h3>
                <p className="text-gray-700">{partner2Response}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NeedsRepairStep;
