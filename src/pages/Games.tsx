
import React from 'react';
import DramaDetox from '../components/games/DramaDetox';

const Games = () => {
  return (
    <div className="min-h-screen bg-[#F1ECE8]">
      {/* Add Heading Now font styles */}
      <style>
        {`
          @font-face {
            font-family: 'Heading Now Regular';
            src: url('https://fonts.cdnfonts.com/css/heading-now-45-trial') format('woff2');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
          
          @font-face {
            font-family: 'Heading Now Medium';
            src: url('https://fonts.cdnfonts.com/css/heading-now-45-trial') format('woff2');
            font-weight: 500;
            font-style: normal;
            font-display: swap;
          }
          
          .font-heading-now-regular {
            font-family: 'Heading Now Regular', sans-serif;
          }
          
          .font-heading-now-medium {
            font-family: 'Heading Now Medium', sans-serif;
          }
        `}
      </style>
      <DramaDetox />
    </div>
  );
};

export default Games;
