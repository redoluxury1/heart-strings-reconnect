
import React from 'react';

const TimeOutGraphic: React.FC = () => {
  return (
    <div className="relative font-cormorant text-center my-4">
      <div className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight relative z-10">
        <span className="text-[#4A448C]">Time</span>
        <span className="mx-1 md:mx-2 text-[#8A8AC9]">Out</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="w-full h-[30%] bg-gradient-to-r from-[#4A448C]/10 via-[#8A8AC9]/10 to-[#4A448C]/10 blur-md rounded-full"></div>
      </div>
    </div>
  );
};

export default TimeOutGraphic;
