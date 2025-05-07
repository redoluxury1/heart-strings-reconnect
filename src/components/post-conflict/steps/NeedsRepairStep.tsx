
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';

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
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const starterPrompts = [
    "I really need you to...",
    "I think we could grow stronger if...",
    "I want us to work on...",
    "What helps me feel safe is...",
    "It would mean a lot to me if you..."
  ];
  
  const handleStarterPrompt = (prompt: string) => {
    setInput(prompt);
  };
  
  const handleSubmit = () => {
    if (input.trim()) {
      onResponse(input);
      setIsSubmitted(true);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-cormorant font-medium text-[#483D8B] mb-3 text-center">
        Needs + Repair
      </h2>
      
      <p className="text-center text-2xl text-gray-800 mb-8">
        What do you need in order to move forward?
      </p>
      
      {!isSubmitted ? (
        <div className="space-y-6">
          <div className="flex justify-center mb-4">
            {!imageLoaded && (
              <Skeleton className="h-64 w-64 rounded-lg" />
            )}
            <img 
              src="/lovable-uploads/86ce82c1-0b6c-4830-b3cd-91817c842665.png" 
              alt="Couple holding hands and supporting each other" 
              className={`h-auto w-64 md:w-80 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              loading="eager"
            />
          </div>
          
          <div className="space-y-3">
            {starterPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="lg"
                className="bg-[#483D8B] hover:bg-[#3c3372] text-white rounded-full w-full py-6 text-xl font-normal h-auto"
                onClick={() => handleStarterPrompt(prompt)}
              >
                {prompt}
              </Button>
            ))}
          </div>
          
          <div className="mt-6">
            <Textarea 
              placeholder="I need..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="mb-4 min-h-[120px] border-[#483D8B] border-2 rounded-lg"
            />
            
            <Button 
              onClick={handleSubmit}
              className="bg-[#6a5acd] hover:bg-[#483D8B] text-white w-full flex items-center justify-center py-6 text-lg"
              disabled={!input.trim()}
            >
              Continue
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FDE1D3]/40 p-5 rounded-lg border border-[#FDE1D3]">
              <h3 className="font-medium mb-3 text-[#483D8B]">You need:</h3>
              <p className="text-gray-700">{partner1Response}</p>
            </div>
            
            {partner2Response && (
              <div className="bg-[#E5DEFF]/40 p-5 rounded-lg border border-[#E5DEFF] animate-fade-in">
                <h3 className="font-medium mb-3 text-[#483D8B]">Your partner needs:</h3>
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
