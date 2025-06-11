
import React from 'react';
import { PatternChip } from '../types/PatternTypes';
import { getChipIcon } from './ChipIcons';
import { getChipColor } from './ChipColorUtils';

interface ChipButtonProps {
  chip: PatternChip;
  index: number;
  isSelected: boolean;
  onSelect: (chipId: string) => void;
}

const ChipButton: React.FC<ChipButtonProps> = ({ 
  chip, 
  index, 
  isSelected, 
  onSelect 
}) => {
  return (
    <button
      onClick={() => onSelect(chip.id)}
      className={`w-full p-5 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${
        getChipColor(index, isSelected)
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 mt-1">
          {getChipIcon(chip.text)}
        </span>
        <span className="text-lg leading-relaxed font-medium">
          {chip.text}
        </span>
      </div>
    </button>
  );
};

export default ChipButton;
