
import React from 'react';
import { useSession } from '../context/SessionContext';

interface ProgressIndicatorProps {
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ totalSteps }) => {
  const { currentStep } = useSession();
  
  return (
    <div className="bg-gray-100 h-1 w-full">
      <div 
        className="bg-blue-500 h-1 transition-all duration-500"
        style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
      ></div>
    </div>
  );
};

export default ProgressIndicator;
