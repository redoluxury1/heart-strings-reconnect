
import React from 'react';
import { Button } from '@/components/ui/button';
import { useInterface } from '../../hooks/useInterfaceContext';

const OkayButNowWhat = () => {
  const { colors } = useInterface();
  
  return (
    <div id="okay-but-now-what" className="bg-gradient-to-br from-soft-cream/40 to-soft-cream/10 rounded-xl shadow-md p-6 md:p-8">
      <h2 className="text-3xl md:text-4xl font-cormorant font-medium mb-4 text-center text-midnight-indigo">
        Okay... But Now What?
      </h2>
      
      <p className="text-center text-gray-700 mb-6 max-w-xl mx-auto">
        Uncovering the patterns in your relationship helps you both break free from them.
        Let's understand what's really happening.
      </p>
      
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 justify-center mb-4">
        <Button 
          className="bg-midnight-indigo hover:bg-midnight-indigo/90 text-white px-6"
        >
          Find Our Pattern
        </Button>
        
        <Button 
          variant="outline" 
          className="border-gray-300 text-midnight-indigo bg-white/70 hover:bg-gray-100"
        >
          Create a Repair Plan
        </Button>
      </div>
      
      <p className="text-center text-gray-500 text-sm mt-4">
        Conflict is natural. How we repair is what matters.
      </p>
    </div>
  );
};

export default OkayButNowWhat;
