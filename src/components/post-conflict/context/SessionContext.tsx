
import React, { createContext, useContext } from 'react';
import { useSessionManagement } from '../hooks/useSessionManagement';

// Define the session data types
export type PartnerData = {
  responses: Record<string, any>;
  ready: boolean;
};

export type SessionData = {
  partner1: PartnerData;
  partner2: PartnerData;
  currentStep?: number;
};

type SessionContextType = {
  sessionData: SessionData;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  handleResponse: (partner: 'partner1' | 'partner2', stepId: string, response: any) => void;
  bothPartnersReady: boolean;
  handleRestart: () => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sessionManagement = useSessionManagement();
  
  return (
    <SessionContext.Provider value={sessionManagement}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
