
import React from 'react';
import { PatternChip } from '../types/PatternTypes';
import ChipPromptHeader from './ChipPromptHeader';
import ChipButton from './ChipButton';

interface ChipSelectorProps {
  chips: PatternChip[];
  selectedChips: string[];
  onChipSelect: (chipId: string) => void;
  prompt: string;
}

const ChipSelector: React.FC<ChipSelectorProps> = ({ 
  chips, 
  selectedChips, 
  onChipSelect, 
  prompt 
}) => {
  return (
    <div className="max-w-2xl mx-auto">
      <ChipPromptHeader prompt={prompt} />
      
      <div className="space-y-4">
        {chips.map((chip, index) => (
          <ChipButton
            key={chip.id}
            chip={chip}
            index={index}
            isSelected={selectedChips.includes(chip.id)}
            onSelect={onChipSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default ChipSelector;
