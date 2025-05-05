
import React from 'react';

const PausePhraseGraphic: React.FC = () => {
  return (
    <div className="relative font-cormorant text-center my-4">
      <div className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight relative z-10">
        <span className="text-[#460038]">Pause</span>
        <span className="mx-1 md:mx-2 text-[#886f80]">+</span>
        <span className="text-[#460038]">Phrase</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="w-full h-[30%] bg-gradient-to-r from-[#460038]/10 via-[#886f80]/10 to-[#460038]/10 blur-md rounded-full"></div>
      </div>
    </div>
  );
};

export default PausePhraseGraphic;
