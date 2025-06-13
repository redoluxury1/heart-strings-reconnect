
import React from 'react';
import { SubscriptionGate } from '@/components/subscription/SubscriptionGate';
import { FEATURE_KEYS } from '@/services/subscriptionService';

interface LoveCodeQuizGateProps {
  children: React.ReactNode;
}

export const LoveCodeQuizGate: React.FC<LoveCodeQuizGateProps> = ({ children }) => {
  return (
    <SubscriptionGate 
      featureKey={FEATURE_KEYS.QUIZ_ACCESS}
      fallback={
        <div className="text-center p-8">
          <h2 className="text-2xl font-medium text-midnight-indigo mb-4">
            Unlock Your Love Code Quiz
          </h2>
          <p className="text-midnight-indigo/70 mb-6">
            Discover how you and your partner give and receive love with our comprehensive quiz.
          </p>
        </div>
      }
    >
      {children}
    </SubscriptionGate>
  );
};
