
import React, { createContext, useContext, ReactNode } from 'react';
import { useSubscriptionSync } from '@/hooks/useSubscriptionSync';

interface SubscriptionProviderProps {
  children: ReactNode;
}

const SubscriptionContext = createContext({});

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  // This hook handles syncing subscription status when app becomes active
  useSubscriptionSync();

  return (
    <SubscriptionContext.Provider value={{}}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscriptionContext = () => {
  return useContext(SubscriptionContext);
};
