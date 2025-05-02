
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { InterfaceStyle, PartnerStatus } from '../../pages/Onboarding';

// Define solution-focused color palette
export const SolutionFocusedColors = {
  background: '#D1E5F4',   // Updated from #F4F1EC to #D1E5F4
  text: '#2C3E50',        // Deep Charcoal
  primary: '#E51D2C',     // Updated from #4B6D8C to #E51D2C (primary button)
  accent: '#589391',      // Updated from #9BAA9E to #589391 (secondary button)
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
