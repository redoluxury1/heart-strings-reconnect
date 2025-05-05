
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageCircle } from 'lucide-react';

interface PhraseOptionProps {
  text: string;
  onNewTopic: () => void;
  onCustomize: () => void;
  colorIndex?: number;
}

// Define an array of color combinations without yellow, orange, and green
const colorOptions = [
  { bg: "bg-lavender-blue/20", border: "border-lavender-blue/30", hoverBg: "hover:bg-lavender-blue/30" },
  { bg: "bg-mauve-rose/20", border: "border-mauve-rose/30", hoverBg: "hover:bg-mauve-rose/30" },
  { bg: "bg-midnight-indigo/20", border: "border-midnight-indigo/30", hoverBg: "hover:bg-midnight-indigo/30" },
  { bg: "bg-rosewood-tint/20", border: "border-rosewood-tint/30", hoverBg: "hover:bg-rosewood-tint/30" },
  { bg: "bg-soft-cream/20", border: "border-soft-cream/30", hoverBg: "hover:bg-soft-cream/30" },
];

const PhraseOption: React.FC<PhraseOptionProps> = ({ text, onNewTopic, onCustomize, colorIndex = 0 }) => {
  // Use modulo to ensure we always get a valid color option even if index is out of bounds
  const colorSet = colorOptions[colorIndex % colorOptions.length];
  
  return (
    <div className={`p-3 rounded-md mb-3 border ${colorSet.bg} ${colorSet.border} ${colorSet.hoverBg} transition-colors`}>
      <p className="text-sm text-midnight-indigo mb-2 font-light italic hover:text-mauve-rose">{text}</p>
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
