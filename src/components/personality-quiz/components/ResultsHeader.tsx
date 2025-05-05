
import React from 'react';

interface ResultsHeaderProps {
  children?: React.ReactNode;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({ children }) => {
  return (
    <div className="text-center mb-8">
      <div className="mb-4">
        <img 
          src="/public/lovable-uploads/99edd396-a932-4643-a801-ce8e4d438035.png" 
          alt="Personality Blueprint Types" 
          className="max-w-full h-auto mx-auto"
          style={{ maxHeight: "280px" }}
        />
      </div>
      {children}
    </div>
  );
};

export default ResultsHeader;
