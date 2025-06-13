
import React from 'react';
import { SubscriptionGate } from '@/components/subscription/SubscriptionGate';
import { FEATURE_KEYS } from '@/services/subscriptionService';

interface PauseToolGateProps {
  children: React.ReactNode;
}

export const PauseToolGate: React.FC<PauseToolGateProps> = ({ children }) => {
  return (
    <SubscriptionGate 
      featureKey={FEATURE_KEYS.MID_FIGHT_ACCESS}
    >
      {children}
    </SubscriptionGate>
  );
};
