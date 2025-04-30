
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle } from 'lucide-react';

interface PhraseOptionProps {
  text: string;
  onFavorite: () => void;
  onCustomize: () => void;
}

const PhraseOption: React.FC<PhraseOptionProps> = ({ text, onFavorite, onCustomize }) => {
  return (
    <div className="bg-soft-blush/20 p-4 rounded-lg mb-4 border border-lavender-blue/20 hover:bg-mauve-rose/5 transition-colors">
      <p className="text-midnight-indigo mb-3 font-light italic hover:text-mauve-rose">{text}</p>
      <div className="flex space-x-2 justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs flex items-center gap-1 border-mauve-rose/50 text-mauve-rose hover:bg-mauve-rose/10"
          onClick={onFavorite}
        >
          <Heart className="h-3.5 w-3.5" />
          <span>Favorite</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs flex items-center gap-1 border-lavender-blue/50 text-lavender-blue hover:bg-lavender-blue/10"
          onClick={onCustomize}
        >
          <MessageCircle className="h-3.5 w-3.5" />
          <span>Customize</span>
        </Button>
      </div>
    </div>
  );
};

export default PhraseOption;
