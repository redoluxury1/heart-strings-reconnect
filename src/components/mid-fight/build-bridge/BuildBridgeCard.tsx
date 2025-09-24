
import React from 'react';
import { Card } from '@/components/ui/card';
import ExpertApplicationDialog from './ExpertApplicationDialog';

const BuildBridgeCard: React.FC = () => {
  return (
    <Card className="border-0 shadow-md bg-[#F7ECD9] rounded-2xl overflow-hidden">
      <div className="p-6 md:p-8 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-[#162137] mb-6">
          Build a Bridge
        </h2>
        
        <p className="text-[#162137] text-base md:text-lg max-w-md mb-8">
          Sometimes we need structured guidance to navigate challenging conversations and rebuild connection after conflict.
        </p>
        
        <div className="bg-white/40 rounded-xl p-6 mb-6 max-w-lg">
          <h3 className="font-medium text-[#162137] mb-4">Bridge-Building Tools:</h3>
          <ul className="text-left text-[#162137] space-y-2">
            <li>• Guided conversation starters</li>
            <li>• Conflict resolution frameworks</li>
            <li>• Repair conversation templates</li>
            <li>• Understanding exercises</li>
          </ul>
        </div>
        
        <div className="w-full max-w-sm">
          <ExpertApplicationDialog />
        </div>
      </div>
    </Card>
  );
};

export default BuildBridgeCard;
