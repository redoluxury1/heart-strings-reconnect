
import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-10">
      <p className="text-midnight-indigo text-lg mb-2">
        No saved rephrases found
      </p>
      <p className="text-midnight-indigo/60">
        Use "Say This Instead" or "Pause Phrase" tools to save rephrases for future reference.
      </p>
    </div>
  );
};

export default EmptyState;
