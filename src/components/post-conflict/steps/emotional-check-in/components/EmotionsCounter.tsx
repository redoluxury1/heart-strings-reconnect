
import React from 'react';

interface EmotionsCounterProps {
  count: number;
  maxCount: number;
}

const EmotionsCounter: React.FC<EmotionsCounterProps> = ({ count, maxCount }) => {
  return (
    <div className="text-sm text-[#555555] mb-6">
      Selected: {count}/{maxCount}
    </div>
  );
};

export default EmotionsCounter;
