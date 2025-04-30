
import React from 'react';

const NoResults: React.FC = () => {
  return (
    <div className="text-center py-6">
      <p className="text-midnight-indigo/60">No phrases match your search.</p>
      <p className="text-midnight-indigo/60">Try another term or category.</p>
    </div>
  );
};

export default NoResults;
