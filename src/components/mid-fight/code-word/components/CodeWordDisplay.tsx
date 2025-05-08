
import React from 'react';

interface CodeWordDisplayProps {
  codeWord: string;
  className?: string;
  textSize?: string;
  onClick?: () => void;
  showQuotes?: boolean;
}

const CodeWordDisplay: React.FC<CodeWordDisplayProps> = ({ 
  codeWord,
  className = "bg-[#f7e0dc]/50 p-5 rounded-lg mb-6 text-center",
  textSize = "text-3xl",
  onClick,
  showQuotes = true
}) => {
  return (
    <div 
      className={className}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      } : undefined}
    >
      <span className={`${textSize} font-medium text-[#5d4357] block truncate max-w-full`}>
        {showQuotes ? `"${codeWord}"` : codeWord}
      </span>
    </div>
  );
};

export default CodeWordDisplay;
