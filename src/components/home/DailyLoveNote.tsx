
import React from 'react';
import { useInterface } from '../../hooks/useInterfaceContext';

const DailyLoveNote = () => {
  const { colors } = useInterface();
  
  return (
    <div className="bg-soft-cream py-6 relative">
      <div className="container mx-auto text-center">
        <p className="text-xl text-midnight-indigo font-semibold">
          Your daily love note is waiting for you.
        </p>
      </div>
    </div>
  );
};

export default DailyLoveNote;
