
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
  // Dynamically adjust text size based on word length
  const getFontSize = () => {
    const length = codeWord.length;
    if (length > 15) return 'text-xl';
    if (length > 10) return 'text-2xl';
    return textSize; // Default size for normal words
  };

  const dynamicTextSize = getFontSize();

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
      <span className={`${dynamicTextSize} font-medium text-[#5d4357] block w-full break-words`}>
        {showQuotes ? `"${codeWord}"` : codeWord}
      </span>
    </div>
  );
};

export default CodeWordDisplay;
