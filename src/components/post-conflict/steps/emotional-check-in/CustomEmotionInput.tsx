
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface CustomEmotionInputProps {
  onAddEmotion: (emotion: string) => void;
  disabled: boolean;
}

const CustomEmotionInput: React.FC<CustomEmotionInputProps> = ({ onAddEmotion, disabled }) => {
  const [customEmotion, setCustomEmotion] = useState('');
  const { toast } = useToast();

  const handleAddCustomEmotion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmotion.trim()) return;
    
    onAddEmotion(customEmotion.trim());
    setCustomEmotion('');
  };

  return (
    <div className="mt-6">
      <p className="text-sm text-[#555555] mb-2">Didn't see yours? Add your own.</p>
      <form onSubmit={handleAddCustomEmotion} className="flex gap-2">
        <Input
          type="text"
          value={customEmotion}
          onChange={(e) => setCustomEmotion(e.target.value)}
          placeholder="Write your own..."
          className="bg-[#F5F2F0] border-[#D9B9AF] rounded-xl"
          disabled={disabled}
        />
        <Button 
          type="submit" 
          variant="outline"
          className="border-[#D9B9AF] text-[#555555]"
          disabled={!customEmotion.trim() || disabled}
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default CustomEmotionInput;
