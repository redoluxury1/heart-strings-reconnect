
import React from 'react';

const PausePhraseGraphic: React.FC = () => {
  return (
    <div className="relative font-cormorant text-center my-4">
      <div className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight relative z-10 whitespace-nowrap">
        <span className="text-midnight-indigo">Pause + Phrase</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="w-full h-[30%] bg-gradient-to-r from-midnight-indigo/10 via-mauve-rose/10 to-midnight-indigo/10 blur-md rounded-full"></div>
      </div>
    </div>
  );
};

export default PausePhraseGraphic;
