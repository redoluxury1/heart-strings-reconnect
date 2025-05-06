
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ToneSettingStepProps {
  onResponse: (response: string) => void;
  partner1Response: string | null;
}

const ToneSettingStep: React.FC<ToneSettingStepProps> = ({ 
  onResponse, 
  partner1Response
}) => {
  const [input, setInput] = useState(partner1Response || '');
  const [isSubmitted, setIsSubmitted] = useState(!!partner1Response);
  
  const starterPrompts = [
    "I want us to work together to...",
    "We're on the same team. Let's...",
    "I want to stay open even if it's hard...",
    "I'm here to listen, not fight...",
    "I care about you, even if I'm upset..."
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
    <div className="flex flex-col items-center max-w-xl mx-auto">
      <img 
        src="/lovable-uploads/035b9f98-9337-4134-b1d7-e27a6922b517.png" 
        alt="Couple embracing" 
        className="w-full max-w-md rounded-2xl mb-6" 
      />
      
      <h2 className="text-4xl md:text-5xl font-cormorant font-medium text-midnight-indigo mb-4 text-center">
        Setting the Tone
      </h2>
      
      <p className="text-center text-gray-700 mb-8 text-lg max-w-md">
        What's one thing you want to keep in mind while talking this through?
      </p>
      
      <div className="w-full max-w-md flex flex-col gap-3">
        {starterPrompts.map((prompt, index) => (
          <Button
            key={index}
            variant="outline"
            className="bg-mauve-rose/30 border-none hover:bg-mauve-rose/40 hover:text-midnight-indigo text-midnight-indigo text-lg whitespace-normal h-auto py-4 rounded-full"
            onClick={() => handleStarterPrompt(prompt)}
          >
            {prompt}
          </Button>
        ))}
        
        <Textarea 
          placeholder="Write your own..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mt-3 mb-4 min-h-[120px] rounded-2xl"
        />
        
        <Button 
          onClick={handleSubmit}
          className="bg-midnight-indigo hover:bg-midnight-indigo/90 text-white w-full py-4 flex items-center justify-center rounded-full text-lg"
          disabled={!input.trim()}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ToneSettingStep;
