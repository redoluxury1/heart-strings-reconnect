
import React from 'react';
import FloatingBubblesContainer from './floating-bubbles/FloatingBubblesContainer';

const FloatingTextBubbles = () => {
  console.log('FloatingTextBubbles component rendering');
  
  return (
    <div className="relative z-10 bg-gradient-to-b from-rose-50 via-white to-transparent py-4 overflow-visible">
      <div className="relative h-[120px] w-full">
        <FloatingBubblesContainer />
      </div>
    </div>
  );
};

export default FloatingTextBubbles;
