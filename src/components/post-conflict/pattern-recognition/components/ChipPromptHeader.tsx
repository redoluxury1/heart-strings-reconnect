
import React from 'react';
import { getSubheadText } from './ChipColorUtils';

interface ChipPromptHeaderProps {
  prompt: string;
}

const ChipPromptHeader: React.FC<ChipPromptHeaderProps> = ({ prompt }) => {
  return (
    <div className="text-center mb-8">
      <h3 className="text-2xl font-cormorant font-medium text-[#2e2a63] mb-3">
        {prompt}
      </h3>
      <p className="text-[#2e2a63]/70 text-lg leading-relaxed">
        {getSubheadText(prompt)}
      </p>
    </div>
  );
};

export default ChipPromptHeader;
