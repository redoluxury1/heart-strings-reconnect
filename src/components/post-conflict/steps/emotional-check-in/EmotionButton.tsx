
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface EmotionButtonProps {
  emotion: string;
  isSelected: boolean;
  onToggle: (emotion: string) => void;
}

const EmotionButton: React.FC<EmotionButtonProps> = ({ 
  emotion, 
  isSelected, 
  onToggle 
}) => {
  return (
    <Button
      key={emotion}
      type="button"
      variant={isSelected ? 'default' : 'outline'}
      className={isSelected 
        ? 'bg-mauve-rose text-white hover:text-white' 
        : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-mauve-rose'
      }
      onClick={() => onToggle(emotion)}
    >
      {isSelected && <Check className="mr-1 h-4 w-4" />}
      {emotion}
    </Button>
  );
};

export default EmotionButton;
