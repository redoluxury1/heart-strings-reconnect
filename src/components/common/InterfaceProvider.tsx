
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { InterfaceStyle, PartnerStatus } from '../../pages/Onboarding';

// Define solution-focused color palette
export const SolutionFocusedColors = {
  background: '#6a8cb3',   // Updated to #6a8cb3
  text: '#2C3E50',        // Deep Charcoal
  primary: '#543544',     // Updated to #543544 (primary button)
  accent: '#4f6572',      // Updated to #4f6572 (secondary button)
  highlight: '#543544',   // Updated to #543544 (burgundy)
};

type InterfaceContextType = {
  interfaceStyle: InterfaceStyle;
  setInterfaceStyle: (style: InterfaceStyle) => void;
  partnerStatus: PartnerStatus;
  setPartnerStatus: (status: PartnerStatus) => void;
  isEmotional: boolean;
  isPartnerInvited: boolean;
  setIsPartnerInvited: (invited: boolean) => void;
  colors: {
    background: string;
    text: string;
    primary: string;
    accent: string;
    highlight: string;
    plum: string; // Added plum accent color
  };
};

const InterfaceContext = createContext<InterfaceContextType | undefined>(undefined);

interface InterfaceProviderProps {
  children: ReactNode;
}

export const InterfaceProvider: React.FC<InterfaceProviderProps> = ({ children }) => {
  const [interfaceStyle, setInterfaceStyle] = useState<InterfaceStyle>('emotionally-reflective');
  const [partnerStatus, setPartnerStatus] = useState<PartnerStatus>('solo');
  const [isPartnerInvited, setIsPartnerInvited] = useState(false);
  
  useEffect(() => {
    // Load user preferences from localStorage
    const storedStyle = localStorage.getItem('bridge-interface-style') as InterfaceStyle;
    const storedStatus = localStorage.getItem('bridge-partner-status') as PartnerStatus;
    const storedPartnerInvited = localStorage.getItem('bridge-partner-invited');
    
    if (storedStyle) setInterfaceStyle(storedStyle);
    if (storedStatus) setPartnerStatus(storedStatus);
    if (storedPartnerInvited === 'true') setIsPartnerInvited(true);
  }, []);
  
  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem('bridge-interface-style', interfaceStyle);
    localStorage.setItem('bridge-partner-status', partnerStatus);
  }, [interfaceStyle, partnerStatus]);
  
  // Save partner invited status when it changes
  useEffect(() => {
    localStorage.setItem('bridge-partner-invited', isPartnerInvited.toString());
  }, [isPartnerInvited]);
  
  const isEmotional = interfaceStyle === 'emotionally-reflective';
  
  // Define colors based on interface style
  const colors = isEmotional 
    ? {
        background: '#F1EAE8',  // soft-blush
        text: '#4A448C',        // midnight-indigo
        primary: '#C7747F',     // mauve-rose
        accent: '#8A8AC9',      // lavender-blue
        highlight: '#E69999',   // rosewood-tint
        plum: '#6A4A74',        // new plum accent color
      }
    : {
        ...SolutionFocusedColors,
        plum: '#543544',        // using a similar color for solution-focused
      };
  
  return (
    <InterfaceContext.Provider value={{
      interfaceStyle,
      setInterfaceStyle,
      partnerStatus,
      setPartnerStatus,
      isEmotional,
      isPartnerInvited,
      setIsPartnerInvited,
      colors
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
