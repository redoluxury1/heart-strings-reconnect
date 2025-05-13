
import React, { createContext, useContext } from 'react';
import { useSessionManagement } from '../hooks/useSessionManagement';

// Define partner data structure
export interface PartnerData {
  responses: Record<string, any>;
  ready: boolean;
}

// Define overall session data structure
export interface SessionData {
  partner1: PartnerData;
  partner2: PartnerData;
}

// Define the context shape
interface SessionContextType {
  sessionData: SessionData;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  handleResponse: (partner: 'partner1' | 'partner2', stepId: string, response: any) => void;
  bothPartnersReady: boolean;
  handleRestart: () => void;
}

// Create the context with a default undefined value
const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Provider component
export const SessionProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Use our hook to manage session state
  const sessionState = useSessionManagement();
  
  return (
    <SessionContext.Provider value={sessionState}>
      {children}
    </SessionContext.Provider>
  );
};

// Custom hook to use the session context
export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
