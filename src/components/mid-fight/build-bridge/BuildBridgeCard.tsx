
import React from 'react';
import { Card } from '@/components/ui/card';
import ExpertApplicationDialog from './ExpertApplicationDialog';

const BuildBridgeCard: React.FC = () => {
  return (
    <Card className="border-0 shadow-md bg-[#F7ECD9] rounded-2xl overflow-hidden">
      <div className="p-6 md:p-8 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-midnight-indigo mb-4">
          Build a Bridge
        </h2>
        
        <div className="bg-[#F1D6CC] text-midnight-indigo px-6 py-2 rounded-full text-sm font-medium mb-6">
          Coming Soon
        </div>
        
        <p className="text-midnight-indigo text-base md:text-lg max-w-md mb-8">
          Sometimes we just need a third party to help us navigate something hard.
          We are building our team of experts to bring this feature to life.
        </p>
        
        <div className="w-full max-w-sm">
          <ExpertApplicationDialog />
        </div>
      </div>
    </Card>
  );
};

export default BuildBridgeCard;
