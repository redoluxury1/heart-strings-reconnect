
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
            rounded-full px-4 py-2 text-sm border transition-colors
            ${selectedStarter === starter 
              ? 'bg-[#D3876A] text-white border-[#D3876A]' 
              : 'bg-[#F8F5F3] border-[#D9B9AF] text-[#3A3A3A] hover:bg-[#F8F5F3]/80'}
          `}
        >
          {starter}
        </button>
      ))}
    </div>
  );
};

export default SentenceStarterChips;
