
import React from 'react';
import OptimizedImage from '@/components/common/OptimizedImage';

interface ResultsHeaderProps {
  children?: React.ReactNode;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({ children }) => {
  return (
    <div className="text-center mb-8">
      <div className="mb-4">
        <OptimizedImage 
          src="/public/lovable-uploads/99edd396-a932-4643-a801-ce8e4d438035.png" 
          alt="Personality Blueprint Types" 
          className="max-w-full h-auto mx-auto"
          priority={true}
          style={{ maxHeight: "280px" }}
        />
      </div>
      {children}
    </div>
  );
};

export default ResultsHeader;
