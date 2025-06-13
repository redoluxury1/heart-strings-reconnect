
import React from 'react';
import { SubscriptionGate } from '@/components/subscription/SubscriptionGate';
import { FEATURE_KEYS } from '@/services/subscriptionService';
import { PauseCircle } from 'lucide-react';

interface PauseToolGateProps {
  children: React.ReactNode;
}

export const PauseToolGate: React.FC<PauseToolGateProps> = ({ children }) => {
  return (
    <SubscriptionGate 
      featureKey={FEATURE_KEYS.MID_FIGHT_ACCESS}
      fallback={
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-[#f7e0dc]/60 p-4 rounded-full">
              <PauseCircle className="w-16 h-16 text-[#E2725B]" />
            </div>
          </div>
          <h2 className="text-2xl font-medium text-[#5d4357] mb-4">
            Premium Pause Tool
          </h2>
          <p className="text-[#5d4357]/70 mb-6">
            Take strategic breaks during heated conversations with our guided pause tool.
          </p>
        </div>
      }
    >
      {children}
    </SubscriptionGate>
  );
};
