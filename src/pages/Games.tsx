
import React from 'react';
import Navbar from '../components/layout/Navbar';
import DramaDetox from '../components/games/DramaDetox';

const Games = () => {
  return (
    <div className="min-h-screen bg-[#F1ECE8]">
      <Navbar />
      
      <div className="py-0">
        <DramaDetox />
      </div>
    </div>
  );
};

export default Games;
