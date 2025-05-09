
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface CustomPhraseInputProps {
  onSave: (text: string) => void;
  onCancel: () => void;
}

const CustomPhraseInput: React.FC<CustomPhraseInputProps> = ({ onSave, onCancel }) => {
  const [text, setText] = useState('');

  const handleSave = () => {
    if (text.trim()) {
      onSave(text);
    }
  };

  return (
    <div className="space-y-3">
      <Textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your own restart phrase..."
        className="min-h-[100px] border-lavender-blue/20 focus:border-lavender-blue"
      />
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="text-sm border-gray-200"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          disabled={!text.trim()}
          className="text-sm bg-[#5d4357] hover:bg-[#5d4357]/90"
        >
          Use This Phrase
        </Button>
      </div>
    </div>
  );
};

export default CustomPhraseInput;
