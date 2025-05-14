
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageCircle } from 'lucide-react';

interface PhraseOptionProps {
  text: string;
  onNewTopic: () => void;
  onCustomize: () => void;
  colorIndex?: number;
}

// Define an array of color combinations with the new color
const colorOptions = [
  { bg: "bg-[#536878]/20", border: "border-[#536878]/30", hoverBg: "hover:bg-[#536878]/30" },
  { bg: "bg-[#536878]/20", border: "border-[#536878]/30", hoverBg: "hover:bg-[#536878]/30" },
  { bg: "bg-[#536878]/20", border: "border-[#536878]/30", hoverBg: "hover:bg-[#536878]/30" },
  { bg: "bg-[#536878]/20", border: "border-[#536878]/30", hoverBg: "hover:bg-[#536878]/30" },
  { bg: "bg-[#536878]/20", border: "border-[#536878]/30", hoverBg: "hover:bg-[#536878]/30" },
];

const PhraseOption: React.FC<PhraseOptionProps> = ({ text, onNewTopic, onCustomize, colorIndex = 0 }) => {
  // Use modulo to ensure we always get a valid color option even if index is out of bounds
  const colorSet = colorOptions[colorIndex % colorOptions.length];
  
  return (
    <div className={`p-3 rounded-md mb-3 border ${colorSet.bg} ${colorSet.border} ${colorSet.hoverBg} transition-colors`}>
      <p className="text-sm text-midnight-indigo mb-2 font-light italic">{text}</p>
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
          className="text-xs flex items-center gap-1 border-midnight-indigo text-midnight-indigo hover:bg-midnight-indigo/10"
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
