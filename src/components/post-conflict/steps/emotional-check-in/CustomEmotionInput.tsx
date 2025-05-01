
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface CustomEmotionInputProps {
  onAddEmotion: (emotion: string) => void;
}

const CustomEmotionInput: React.FC<CustomEmotionInputProps> = ({ onAddEmotion }) => {
  const [customEmotion, setCustomEmotion] = useState('');

  const handleAddCustom = () => {
    if (customEmotion.trim()) {
      onAddEmotion(customEmotion.trim());
      setCustomEmotion('');
    }
  };

  return (
    <div className="flex gap-2 mb-8 max-w-lg mx-auto">
      <Input
        placeholder="Add your own emotion..."
        value={customEmotion}
        onChange={(e) => setCustomEmotion(e.target.value)}
        className="flex-grow"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAddCustom();
          }
        }}
      />
      <Button
        onClick={handleAddCustom}
        variant="outline"
        className="bg-midnight-indigo/20 hover:bg-midnight-indigo/30 text-midnight-indigo hover:text-midnight-indigo"
        disabled={!customEmotion.trim()}
      >
        <Plus size={16} className="mr-1" />
        Add
      </Button>
    </div>
  );
};

export default CustomEmotionInput;
