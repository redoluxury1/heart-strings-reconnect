
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageCircle } from 'lucide-react';

interface PhraseOptionProps {
  text: string;
  onNewTopic: () => void;
  onCustomize: () => void;
  colorIndex?: number;
}

const PhraseOption: React.FC<PhraseOptionProps> = ({ text, onNewTopic, onCustomize, colorIndex = 0 }) => {
  return (
    <div className="p-5 rounded-md mb-3 border border-mauve-rose/40 bg-white/80 transition-colors">
      <p className="text-sm text-[#07183D] mb-3 font-light italic">{text}</p>
      <div className="flex space-x-2 justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs flex items-center gap-1 border-mauve-rose/50 text-mauve-rose hover:bg-mauve-rose/10"
          onClick={onNewTopic}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>New Topic</span>
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="text-xs flex items-center gap-1 bg-[#536878] hover:bg-[#536878]/90 text-white"
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
