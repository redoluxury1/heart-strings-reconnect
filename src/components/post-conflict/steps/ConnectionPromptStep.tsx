
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart } from 'lucide-react';

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
  
  const starterPrompts = [
    "I appreciate when you...",
    "I love you. You...",
    "I really respect you when...",
    "Even when we're fighting, I...",
    "One thing I admire about you is..."
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
    <div>
      <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-3 text-center">
        Let's Move Forward
      </h2>
      
      <div className="max-w-2xl mx-auto">
        <p className="text-center text-gray-700 mb-6">
          Even though we fought, I still care about you. Let's say something kind to help us repair our love.
        </p>
        
        {!isSubmitted ? (
          <div className="max-w-lg mx-auto">
            <div className="flex flex-wrap gap-2 justify-center mb-3">
              {starterPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="bg-white border-gray-300 hover:bg-gray-100 hover:text-mauve-rose text-gray-700 whitespace-normal h-auto py-1"
                  onClick={() => handleStarterPrompt(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
            
            <Textarea 
              placeholder="I appreciate..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="mb-4 min-h-[120px]"
            />
            
            <Button 
              onClick={handleSubmit}
              className="bg-midnight-indigo hover:bg-midnight-indigo/90 text-white w-full flex items-center justify-center"
              disabled={!input.trim()}
            >
              Continue
            </Button>
          </div>
        ) : (
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-soft-blush/20 p-5 rounded-lg">
                <h3 className="font-medium mb-3 text-midnight-indigo">You appreciate:</h3>
                <p className="text-gray-700">{partner1Response}</p>
              </div>
              
              {partner2Response && (
                <div className="bg-soft-cream/30 p-5 rounded-lg animate-fade-in">
                  <h3 className="font-medium mb-3 text-midnight-indigo">Your partner appreciates:</h3>
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
    </div>
  );
};

export default ConnectionPromptStep;
