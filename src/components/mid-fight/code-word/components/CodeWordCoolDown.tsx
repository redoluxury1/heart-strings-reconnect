
import React from 'react';

interface CodeWordCoolDownProps {
  onClose: () => void;
}

const CodeWordCoolDown: React.FC<CodeWordCoolDownProps> = ({ onClose }) => {
  return (
    <div className="text-center">
      <div className="space-y-3">
        <button 
          onClick={onClose}
          className="w-full bg-[#f7e0dc] text-[#5d4357] py-2 px-4 rounded-full hover:bg-[#e7c6c0] transition-colors"
        >
          Set a Timer
        </button>
        <button 
          onClick={onClose}
          className="w-full bg-transparent border border-[#5d4357]/30 text-[#5d4357] py-2 px-4 rounded-full hover:bg-[#5d4357]/10 transition-colors"
        >
          I'll revisit this later
        </button>
        <button 
          onClick={onClose}
          className="w-full bg-transparent border border-[#5d4357]/30 text-[#5d4357] py-2 px-4 rounded-full hover:bg-[#5d4357]/10 transition-colors"
        >
          View Restart Phrases
        </button>
      </div>
    </div>
  );
};

export default CodeWordCoolDown;
