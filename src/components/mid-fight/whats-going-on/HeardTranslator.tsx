
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { translateStatement } from '@/data/translator-data';

const HeardTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState<{
    heardAs: string;
    trySaying: string;
  } | null>(null);

  const handleTranslate = () => {
    if (inputText.trim()) {
      const result = translateStatement(inputText);
      setTranslation(result);
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-3">
        <h3 className="text-lg font-medium text-midnight-indigo mb-2">
          Say It Better
        </h3>
        <p className="text-sm text-midnight-indigo/70">
          Type what you want to say, and we'll translate how it might be received
        </p>
      </div>
      
      <Textarea
        placeholder="Type what you want to say... (e.g., 'This is not a big deal.')"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="min-h-[80px]"
      />
      
      <Button 
        onClick={handleTranslate} 
        className="w-full bg-midnight-indigo hover:bg-midnight-indigo/90"
        disabled={!inputText.trim()}
      >
        Translate
      </Button>
      
      {translation && (
        <div className="mt-6 space-y-4 bg-soft-blush/20 p-4 rounded-md">
          <div>
            <h4 className="text-md font-medium text-mauve-rose mb-1">How It Might Land:</h4>
            <p className="bg-white p-3 rounded border border-mauve-rose/20 text-midnight-indigo/90">
              "{translation.heardAs}"
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-lavender-blue mb-1">Try Saying Instead:</h4>
            <p className="bg-white p-3 rounded border border-lavender-blue/30 text-midnight-indigo/90">
              "{translation.trySaying}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeardTranslator;
