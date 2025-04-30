
import React from 'react';
import Navbar from '../components/layout/Navbar';
import ContentContainer from '../components/common/ContentContainer';
import DramaDetox from '../components/games/DramaDetox';

const Games = () => {
  return (
    <div className="min-h-screen bg-[#F1ECE8]">
      <Navbar />
      
      <div className="py-10">
        <ContentContainer>
          <h1 className="font-cormorant text-3xl md:text-4xl font-medium text-center mb-6 text-midnight-indigo">
            Relationship Games
          </h1>
          <p className="text-center mb-10 max-w-2xl mx-auto text-midnight-indigo/70">
            Fun ways to explore relationship dynamics together.
          </p>
          
          <DramaDetox />
        </ContentContainer>
      </div>
    </div>
  );
};

export default Games;
