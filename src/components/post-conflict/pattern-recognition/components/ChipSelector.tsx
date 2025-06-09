
import React from 'react';
import { PatternChip } from '../types/PatternTypes';

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
      <h3 className="text-xl font-medium text-[#2e2a63] mb-6 text-center">
        {prompt}
      </h3>
      
      <div className="space-y-3">
        {chips.map((chip) => (
          <button
            key={chip.id}
            onClick={() => onChipSelect(chip.id)}
            className={`w-full p-4 rounded-lg border text-left transition-all ${
              selectedChips.includes(chip.id)
                ? 'bg-[#2e2a63] text-white border-[#2e2a63]'
                : 'bg-white text-[#2e2a63] border-gray-200 hover:border-[#2e2a63]/30'
            }`}
          >
            {chip.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChipSelector;
