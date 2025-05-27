
import React from 'react';

interface SentenceStarterChipsProps {
  starters: string[];
  onStarterClick: (starter: string) => void;
  selectedStarter?: string;
}

const SentenceStarterChips: React.FC<SentenceStarterChipsProps> = ({ 
  starters, 
  onStarterClick,
  selectedStarter
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {starters.map((starter, index) => (
        <button
          key={index}
          onClick={() => onStarterClick(starter)}
          className={`
            rounded-full px-4 py-2 text-sm transition-colors border
            ${selectedStarter === starter 
              ? 'bg-[#5D3A5A] text-white border-[#5D3A5A]' 
              : 'bg-[#F8F5F3] text-[#3A3A3A] border-[#D9B9AF] hover:bg-[#E8DAD3]/20'}
          `}
        >
          {starter}
        </button>
      ))}
    </div>
  );
};

export default SentenceStarterChips;
