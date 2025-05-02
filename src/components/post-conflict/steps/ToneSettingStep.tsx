
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
      // Instead of showing the reflection, we'll just mark it as submitted
      // and let the navigation system move to the next step
      setIsSubmitted(true);
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-3 text-center">
        Setting the Tone
      </h2>
      
      <p className="text-center text-gray-700 mb-6">
        What's one thing you want to keep in mind while talking this through?
      </p>
      
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
          placeholder="Write your reflection here..."
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
    </div>
  );
};

export default ToneSettingStep;
