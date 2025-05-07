
import React, { useState, useEffect } from 'react';
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
  
  // Auto-save when input changes after a short delay
  useEffect(() => {
    if (input.trim() && input !== partner1Response) {
      const saveTimer = setTimeout(() => {
        onResponse(input);
        setIsSubmitted(true);
      }, 1200); // Auto-save after 1.2 second of inactivity
      
      return () => clearTimeout(saveTimer);
    }
  }, [input, onResponse, partner1Response]);
  
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-cormorant font-medium text-[#483D8B] mb-3 text-center">
        Needs + Repair
      </h2>
      
      <p className="text-center text-2xl text-gray-800 mb-6">
        What do you need in order to move forward?
      </p>
      
      {!isSubmitted ? (
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            {!imageLoaded && (
              <Skeleton className="h-52 w-52 rounded-lg" />
            )}
            <img 
              src="/lovable-uploads/bdee8a9b-e15c-4d60-a2f7-01e813da95e5.png" 
              alt="Couple holding hands and supporting each other" 
              className={`h-auto w-52 md:w-64 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              loading="eager"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
            {starterPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="bg-[#7b4b69] hover:bg-[#6a3a58] text-white rounded-full py-1.5 px-3 text-sm font-normal h-auto"
                onClick={() => handleStarterPrompt(prompt)}
              >
                {prompt}
              </Button>
            ))}
          </div>
          
          <div className="mt-3 max-w-md mx-auto">
            <Textarea 
              placeholder="I need..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="mb-2 min-h-[80px] border-[#7b4b69] border-2 rounded-lg"
            />
            
            {/* Continue button removed, using auto-save instead */}
            <p className="text-xs text-gray-500 text-center italic">
              Your response will save automatically
            </p>
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
