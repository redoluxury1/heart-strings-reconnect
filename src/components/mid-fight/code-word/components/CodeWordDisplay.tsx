
import React from 'react';

interface CodeWordDisplayProps {
  codeWord: string;
}

const CodeWordDisplay: React.FC<CodeWordDisplayProps> = ({ codeWord }) => {
  return (
    <div className="bg-[#f7e0dc]/50 p-5 rounded-lg mb-6 text-center">
      <span className="text-3xl font-medium text-[#5d4357]">
        "{codeWord}"
      </span>
    </div>
  );
};

export default CodeWordDisplay;
