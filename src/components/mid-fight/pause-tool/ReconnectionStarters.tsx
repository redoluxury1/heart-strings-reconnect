
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { reconnectionTips, ReconnectionTip } from '@/data/reconnection-tips';

interface ReconnectionStartersProps {
  onClose: () => void;
}

const ReconnectionStarters: React.FC<ReconnectionStartersProps> = ({ onClose }) => {
  const [currentTips, setCurrentTips] = useState<ReconnectionTip[]>(
    // Get 3 random tips
    [...reconnectionTips].sort(() => 0.5 - Math.random()).slice(0, 3)
  );
  
  const handleRefreshTips = () => {
    setCurrentTips(
      [...reconnectionTips].sort(() => 0.5 - Math.random()).slice(0, 3)
    );
  };
  
  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-2xl text-[#5d4357] font-medium mb-4 text-center">
        Reconnection Starters
      </h3>
      
      <p className="text-[#5d4357] mb-6 text-center">
        Small actions to help you rebuild connection after a pause.
      </p>
      
      <div className="space-y-3 mb-6">
        {currentTips.map((tip) => (
          <div key={tip.id} className="bg-[#F1F0FB]/50 p-4 rounded-lg">
            <p className="text-[#5d4357]">{tip.text}</p>
            <div className="mt-1">
              <span className="text-xs uppercase tracking-wider text-[#5d4357]/60 bg-[#F1F0FB] px-2 py-1 rounded">
                {tip.category}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between">
        <Button
          variant="ghost"
          className="text-[#5d4357] hover:bg-[#5d4357]/10"
          onClick={handleRefreshTips}
        >
          Show More
        </Button>
        
        <Button
          className="bg-[#5d4357] text-white hover:bg-[#5d4357]/90"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default ReconnectionStarters;
