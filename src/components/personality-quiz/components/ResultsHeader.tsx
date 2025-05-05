
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
      {children}
    </div>
  );
};

export default ResultsHeader;
