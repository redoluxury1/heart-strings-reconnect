
import React from 'react';

interface CodeWordHeaderProps {
  hasNotification?: boolean;
}

const CodeWordHeader: React.FC<CodeWordHeaderProps> = ({ hasNotification = false }) => {
  return (
    <div className="text-center my-6 relative">
      {hasNotification && (
        <div className="absolute -top-2 right-0 md:right-20 lg:right-40">
          <span className="inline-block px-3 py-1 bg-[#f7e0dc] text-[#5d4357] rounded-full animate-pulse text-xs">
            New suggestion
          </span>
        </div>
      )}
      <h2 className="text-5xl md:text-6xl font-cormorant text-[#5d4357] font-medium">
        Code Word
      </h2>
      <p className="text-lg md:text-xl text-[#5d4357] mt-3 mb-8">
        One word to pause conflict instantly.
      </p>
    </div>
  );
};

export default CodeWordHeader;
