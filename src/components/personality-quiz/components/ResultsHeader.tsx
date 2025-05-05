
import React from 'react';

interface ResultsHeaderProps {
  children?: React.ReactNode;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({ children }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-medium text-midnight-indigo mb-4">
        Your Personality Blueprint
      </h1>
      <p className="text-midnight-indigo/70 max-w-2xl mx-auto mb-6">
        Based on your responses, we've identified your primary and secondary personality types.
        These influence how you communicate, process emotions, and navigate conflicts in relationships.
      </p>
      {children}
    </div>
  );
};

export default ResultsHeader;
