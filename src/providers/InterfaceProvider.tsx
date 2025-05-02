
import React, { useState, useEffect, ReactNode } from 'react';
import InterfaceContext, { PartnerStatus } from '../contexts/InterfaceContext';
import { getColors } from '../utils/interfaceUtils';

interface InterfaceProviderProps {
  children: ReactNode;
}

export const InterfaceProvider: React.FC<InterfaceProviderProps> = ({ children }) => {
  const [partnerStatus, setPartnerStatus] = useState<PartnerStatus>('solo');
  const [isPartnerInvited, setIsPartnerInvited] = useState(false);
  
  useEffect(() => {
    // Load partner status
    const storedStatus = localStorage.getItem('bridge-partner-status');
    if (storedStatus === 'solo' || storedStatus === 'couple') {
      setPartnerStatus(storedStatus as PartnerStatus);
    }
    
    // Load partner invited status
    const storedPartnerInvited = localStorage.getItem('bridge-partner-invited');
    if (storedPartnerInvited === 'true') setIsPartnerInvited(true);
  }, []);
  
  // Save partner status when it changes
  useEffect(() => {
    localStorage.setItem('bridge-partner-status', partnerStatus);
  }, [partnerStatus]);
  
  // Save partner invited status when it changes
  useEffect(() => {
    localStorage.setItem('bridge-partner-invited', isPartnerInvited.toString());
  }, [isPartnerInvited]);
  
  // Get colors from the utils function
  const colors = getColors();
  
  return (
    <InterfaceContext.Provider value={{
      partnerStatus,
      setPartnerStatus,
      isPartnerInvited,
      setIsPartnerInvited,
      colors
    }}>
      {children}
    </InterfaceContext.Provider>
  );
};

export default InterfaceProvider;
