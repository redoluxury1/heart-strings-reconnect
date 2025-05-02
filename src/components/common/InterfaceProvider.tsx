
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { InterfaceStyle, PartnerStatus } from '../../pages/Onboarding';

// Define solution-focused color palette
export const SolutionFocusedColors = {
  background: '#6a8cb3',   // Updated to #6a8cb3
  text: '#2C3E50',        // Deep Charcoal
  primary: '#543544',     // Updated to #543544 (primary button)
  accent: '#4f6572',      // Updated to #4f6572 (secondary button)
  highlight: '#A03D3E',   // Muted Crimson (optional)
};

type InterfaceContextType = {
  interfaceStyle: InterfaceStyle;
  setInterfaceStyle: (style: InterfaceStyle) => void;
  partnerStatus: PartnerStatus;
  setPartnerStatus: (status: PartnerStatus) => void;
  isEmotional: boolean;
  colors: {
    background: string;
    text: string;
    primary: string;
    accent: string;
    highlight: string;
  };
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
  
  // Define colors based on interface style
  const colors = isEmotional 
    ? {
        background: '#F1EAE8',  // soft-blush
        text: '#4A448C',        // midnight-indigo
        primary: '#C7747F',     // mauve-rose
        accent: '#8A8AC9',      // lavender-blue
        highlight: '#E69999',   // rosewood-tint
      }
    : SolutionFocusedColors;
  
  return (
    <InterfaceContext.Provider value={{
      interfaceStyle,
      setInterfaceStyle,
      partnerStatus,
      setPartnerStatus,
      isEmotional,
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
