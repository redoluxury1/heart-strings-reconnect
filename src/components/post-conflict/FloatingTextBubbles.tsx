
import React from 'react';
import FloatingBubblesContainer from './floating-bubbles/FloatingBubblesContainer';

const FloatingTextBubbles = () => {
  return (
    <div className="relative z-10 bg-gradient-to-b from-rose-50 via-white to-transparent py-24 overflow-visible">
      <FloatingBubblesContainer />
    </div>
  );
};

export default FloatingTextBubbles;
