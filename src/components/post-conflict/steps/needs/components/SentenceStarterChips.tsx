
import React from 'react';
import { NeedsStarter } from '../data/needsStartersData';

interface SentenceStarterChipsProps {
  starters: NeedsStarter[];
  onStarterClick: (text: string) => void;
  selectedStarterId?: number;
}

const SentenceStarterChips: React.FC<SentenceStarterChipsProps> = ({ 
  starters, 
  onStarterClick,
  selectedStarterId
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6 justify-center">
      {starters.map((starter) => (
        <button
          key={starter.id}
          onClick={() => onStarterClick(starter.text)}
          className={`
            rounded-full border px-4 py-2 text-sm transition-colors
            ${selectedStarterId === starter.id 
              ? 'bg-[#5D3A5A] text-white border-[#5D3A5A]' 
              : 'bg-[#F8F5F3] text-[#3A3A3A] border-[#D9B9AF] hover:bg-[#E8DAD3]/20'}
          `}
        >
          {starter.text}
        </button>
      ))}
    </div>
  );
};

export default SentenceStarterChips;
