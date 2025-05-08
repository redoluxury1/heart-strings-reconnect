
import React from 'react';

interface SuggestionGridProps {
  suggestions: string[];
  onSelect: (word: string) => void;
}

const SuggestionGrid: React.FC<SuggestionGridProps> = ({ suggestions, onSelect }) => {
  return (
    <div className="mt-8">
      <h4 className="text-lg text-[#5d4357] mb-3 text-center">
        Or choose a suggestion:
      </h4>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {suggestions.map((word) => (
          <button
            key={word}
            onClick={() => onSelect(word)}
            className="bg-[#f7e0dc] text-[#5d4357] py-2 px-3 rounded-full hover:bg-[#e7c6c0] transition-colors text-sm"
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestionGrid;
