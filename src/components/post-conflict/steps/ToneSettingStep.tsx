
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from '../context/SessionContext';

interface ToneSettingStepProps {
  onResponse: (response: string) => void;
  partner1Response: string | null;
}

const ToneSettingStep: React.FC<ToneSettingStepProps> = ({ 
  onResponse, 
  partner1Response
}) => {
  const [input, setInput] = useState(partner1Response || '');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { setCurrentStep } = useSession();
  
  const starterPrompts = [
    "I want us to work together to...",
    "We're on the same team. Let's...",
    "I'm open and willing to listen...",
    "I'm here to listen, not fight...",
    "I care about you, even if I'm upset..."
  ];
  
  const handleStarterPrompt = (prompt: string) => {
    setInput(prompt);
    // Auto-save after selecting a prompt
    onResponse(prompt);
    // Move to the next step automatically
    setTimeout(() => {
      // Fix: Use a direct number instead of a function
      const nextStep = 2; // This will move to the perspective step (index 2)
      setCurrentStep(nextStep);
    }, 500);
  };
  
  // Auto-save when input changes after a short delay
  useEffect(() => {
    if (input.trim() && input !== partner1Response) {
      const timer = setTimeout(() => {
        onResponse(input);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [input, onResponse, partner1Response]);
  
  // Handle textarea blur to save content
  const handleBlur = () => {
    if (input.trim() && input !== partner1Response) {
      onResponse(input);
    }
  };
  
  return (
    <div className="flex flex-col items-center max-w-xl mx-auto">
      <img 
        src="/lovable-uploads/6a166a5a-f921-4cff-8a03-83cbfe4fde10.png" 
        alt="Couple embracing" 
        className="w-full max-w-md mb-6" 
      />
      
      <h2 className="text-4xl md:text-5xl font-cormorant font-medium text-midnight-indigo mb-4 text-center">
        Setting the Tone
      </h2>
      
      <p className="text-center text-gray-700 mb-8 text-lg max-w-md">
        What's one thing you want to keep in mind while talking this through?
      </p>
      
      <div className="w-full flex flex-col gap-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {starterPrompts.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              className="bg-[#7d6272] border-none hover:bg-[#6d5262] hover:text-white text-white text-xs whitespace-normal h-auto py-2 px-3 rounded-full max-w-[95%] mx-auto"
              onClick={() => handleStarterPrompt(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>
        
        <Textarea 
          placeholder="Write your own..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onBlur={handleBlur}
          className="mt-3 mb-4 min-h-[80px] h-20 rounded-2xl"
        />
      </div>
    </div>
  );
};

export default ToneSettingStep;
