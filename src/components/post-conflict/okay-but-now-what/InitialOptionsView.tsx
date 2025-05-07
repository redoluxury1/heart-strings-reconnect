
import React from 'react';
import { Button } from '@/components/ui/button';

interface InitialOptionsViewProps {
  onFindPattern: () => void;
  onCreateRepairPlan: () => void;
}

const InitialOptionsView: React.FC<InitialOptionsViewProps> = ({
  onFindPattern,
  onCreateRepairPlan
}) => {
  return (
    <div className="p-8 md:p-12 flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl font-cormorant font-medium mb-4 text-center text-[#473C85]">
        Okay, but now what?
      </h2>
      
      <p className="text-center text-gray-800 mb-12 max-w-lg mx-auto text-xl">
        This is where we help you prevent the next argument.
      </p>
      
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <Button 
          className="bg-[#473C85] hover:bg-[#373075] text-white py-6 rounded-full text-xl"
          onClick={onFindPattern}
        >
          Recognize a Pattern
        </Button>
        
        <Button 
          className="bg-[#473C85] hover:bg-[#373075] text-white py-6 rounded-full text-xl"
          onClick={onCreateRepairPlan}
        >
          Send a White Flag
        </Button>
      </div>
    </div>
  );
};

export default InitialOptionsView;
