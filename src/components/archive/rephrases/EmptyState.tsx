
import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-14 px-6 bg-white/50 rounded-xl shadow-sm border border-soft-cream/20">
      <p className="text-midnight-indigo text-lg mb-3 font-cormorant font-semibold">
        No journal entries found in your archive
      </p>
      <p className="text-midnight-indigo/60 max-w-md mx-auto">
        Use "Say This Instead" or "Pause Phrase" tools to save rephrases for future reference.
        Your communication journey will be saved here.
      </p>
    </div>
  );
};

export default EmptyState;
