
import React, { useState, useEffect, ReactNode } from 'react';
import InterfaceContext, { PartnerStatus, InterfaceStyle } from '../contexts/InterfaceContext';
import { getColors } from '../utils/interfaceUtils';

interface InterfaceProviderProps {
  children: ReactNode;
}

const InterfaceProvider: React.FC<InterfaceProviderProps> = ({ children }) => {
  // Move all useState calls inside the component function body
  const [partnerStatus, setPartnerStatus] = useState<PartnerStatus>('solo');
  const [isPartnerInvited, setIsPartnerInvited] = useState(false);
  const [interfaceStyle, setInterfaceStyle] = useState<InterfaceStyle>('emotionally-reflective');
  
  // Compute isEmotional based on interfaceStyle
  const isEmotional = interfaceStyle === 'emotionally-reflective';
  
  useEffect(() => {
    // Load partner status
    const storedStatus = localStorage.getItem('bridge-partner-status');
    if (storedStatus === 'solo' || storedStatus === 'couple') {
      setPartnerStatus(storedStatus as PartnerStatus);
    }
    
    // Load partner invited status
    const storedPartnerInvited = localStorage.getItem('bridge-partner-invited');
    if (storedPartnerInvited === 'true') setIsPartnerInvited(true);
    
    // Load interface style preference
    const storedStyle = localStorage.getItem('bridge-interface-style');
    if (storedStyle === 'emotionally-reflective' || storedStyle === 'solution-focused') {
      setInterfaceStyle(storedStyle as InterfaceStyle);
    }
  }, []);
  
  // Save partner status when it changes
  useEffect(() => {
    localStorage.setItem('bridge-partner-status', partnerStatus);
  }, [partnerStatus]);
  
  // Save partner invited status when it changes
  useEffect(() => {
    localStorage.setItem('bridge-partner-invited', isPartnerInvited.toString());
  }, [isPartnerInvited]);
  
  // Save interface style when it changes
  useEffect(() => {
    localStorage.setItem('bridge-interface-style', interfaceStyle);
  }, [interfaceStyle]);
  
  // Get colors from the utils function
  const colors = getColors();
  
  return (
    <InterfaceContext.Provider value={{
      partnerStatus,
      setPartnerStatus,
      isPartnerInvited,
      setIsPartnerInvited,
      isEmotional,
      setInterfaceStyle,
      colors
    }}>
      {children}
    </InterfaceContext.Provider>
  );
};

export default InterfaceProvider;
