
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface ConnectionPromptStepProps {
  onResponse: (response: string) => void;
  partner1Response: string | null;
  partner2Response: string | null;
}

const ConnectionPromptStep: React.FC<ConnectionPromptStepProps> = ({ 
  onResponse, 
  partner1Response,
  partner2Response 
}) => {
  const [input, setInput] = useState(partner1Response || '');
  const [isSubmitted, setIsSubmitted] = useState(!!partner1Response);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const starterPrompts = [
    "I appreciate when you...",
    "I love you. You...",
    "I really respect you when...",
    "Even when we're fighting, I...",
    "I appreciate..."
  ];
  
  const handleStarterPrompt = (prompt: string) => {
    setInput(prompt);
  };
  
  // Auto-save when input changes after a short delay
  React.useEffect(() => {
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
      <h2 className="text-3xl md:text-4xl font-cormorant font-medium text-[#2a2559] mb-4 text-center">
        Let's Move Forward
      </h2>
      
      <p className="text-center text-gray-700 mb-6 text-lg">
        Even though we fought, I still care about you. Let's say something kind to help us repair our love.
      </p>
      
      {!isSubmitted ? (
        <div className="space-y-6">
          <div className="flex justify-center mb-4">
            {!imageLoaded && (
              <Skeleton className="h-28 w-24 rounded-lg" />
            )}
            <img 
              src="/lovable-uploads/09ddfa28-d193-41e0-98fb-b37fd0ff5dab.png"
              alt="Couple holding hands" 
              className={`h-auto w-32 md:w-36 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          
          {/* Make the interactive elements completely separate from the image */}
          <div className="flex flex-col gap-2 justify-center items-center max-w-md mx-auto">
            {starterPrompts.map((prompt, index) => (
              <Button
                key={index}
                onClick={() => handleStarterPrompt(prompt)}
                className="bg-[#483D61] hover:bg-[#352d49] text-white w-full py-4 h-12 rounded-full max-w-md text-center"
              >
                {prompt}
              </Button>
            ))}
            
            <Textarea 
              placeholder="I appreciate..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="mb-4 min-h-[60px] border-[#483D61] border-2 rounded-lg mt-2"
            />
            
            {/* Continue button removed as requested */}
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FDE1D3]/40 p-5 rounded-lg border border-[#FDE1D3]">
              <h3 className="font-medium mb-3 text-[#483D8B]">You appreciate:</h3>
              <p className="text-gray-700">{partner1Response}</p>
            </div>
            
            {partner2Response && (
              <div className="bg-[#E5DEFF]/40 p-5 rounded-lg border border-[#E5DEFF] animate-fade-in">
                <h3 className="font-medium mb-3 text-[#483D8B]">Your partner appreciates:</h3>
                <p className="text-gray-700">{partner2Response}</p>
              </div>
            )}
          </div>
          
          {partner1Response && partner2Response && (
            <div className="flex justify-center mt-8">
              <div className="animate-pulse flex items-center">
                <Heart className="h-6 w-6 text-red-500 fill-red-500 mr-2" />
                <Heart className="h-6 w-6 text-red-500 fill-red-500" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConnectionPromptStep;
