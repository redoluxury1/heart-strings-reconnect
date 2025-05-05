
import React from 'react';

const EmptyStateResults: React.FC = () => {
  return (
    <div className="bg-gray-50 p-6 rounded-md text-center">
      <p className="text-gray-500">No phrases found matching your search</p>
    </div>
  );
};

export default EmptyStateResults;
