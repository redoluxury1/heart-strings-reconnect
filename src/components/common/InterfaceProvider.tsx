
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { InterfaceStyle, PartnerStatus } from '../../pages/Onboarding';

type InterfaceContextType = {
  interfaceStyle: InterfaceStyle;
  setInterfaceStyle: (style: InterfaceStyle) => void;
  partnerStatus: PartnerStatus;
  setPartnerStatus: (status: PartnerStatus) => void;
  isEmotional: boolean;
};

const InterfaceContext = createContext<InterfaceContextType | undefined>(undefined);

interface InterfaceProviderProps {
  children: ReactNode;
}

export const InterfaceProvider: React.FC<InterfaceProviderProps> = ({ children }) => {
  const [interfaceStyle, setInterfaceStyle] = useState<InterfaceStyle>('emotionally-reflective');
  const [partnerStatus, setPartnerStatus] = useState<PartnerStatus>('solo');
  
  useEffect(() => {
    // Load user preferences from localStorage
    const storedStyle = localStorage.getItem('bridge-interface-style') as InterfaceStyle;
    const storedStatus = localStorage.getItem('bridge-partner-status') as PartnerStatus;
    
    if (storedStyle) setInterfaceStyle(storedStyle);
    if (storedStatus) setPartnerStatus(storedStatus);
  }, []);
  
  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem('bridge-interface-style', interfaceStyle);
    localStorage.setItem('bridge-partner-status', partnerStatus);
  }, [interfaceStyle, partnerStatus]);
  
  const isEmotional = interfaceStyle === 'emotionally-reflective';
  
  return (
    <InterfaceContext.Provider value={{
      interfaceStyle,
      setInterfaceStyle,
      partnerStatus,
      setPartnerStatus,
      isEmotional
    }}>
      {children}
    </InterfaceContext.Provider>
  );
};

export const useInterface = (): InterfaceContextType => {
  const context = useContext(InterfaceContext);
  if (context === undefined) {
    throw new Error('useInterface must be used within an InterfaceProvider');
  }
  return context;
};
