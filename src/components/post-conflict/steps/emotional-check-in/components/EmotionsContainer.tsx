
import React, { ReactNode } from 'react';

interface EmotionsContainerProps {
  children: ReactNode;
}

const EmotionsContainer: React.FC<EmotionsContainerProps> = ({ children }) => {
  return (
    <div className="bg-[#FDFBF9] rounded-xl border border-[#E8DAD3] shadow-sm p-6 max-w-xl mx-auto">
      <div className="flex flex-col items-center">
        {children}
      </div>
    </div>
  );
};

export default EmotionsContainer;
