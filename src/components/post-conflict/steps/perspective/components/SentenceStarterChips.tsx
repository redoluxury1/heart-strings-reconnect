
import React from 'react';

interface SentenceStarterChipsProps {
  starters: string[];
  onStarterClick: (starter: string) => void;
}

const SentenceStarterChips: React.FC<SentenceStarterChipsProps> = ({ 
  starters, 
  onStarterClick 
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {starters.map((starter, index) => (
        <button
          key={index}
          onClick={() => onStarterClick(starter)}
          className="rounded-full px-4 py-2 text-sm bg-[#F8F5F3] border border-[#D9B9AF] text-[#3A3A3A] hover:bg-[#F8F5F3]/80 transition-colors"
        >
          {starter.substring(0, 20)}...
        </button>
      ))}
    </div>
  );
};

export default SentenceStarterChips;
