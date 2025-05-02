
import React, { useState, useEffect, ReactNode } from 'react';
import InterfaceContext from '../contexts/InterfaceContext';

interface InterfaceProviderProps {
  children: ReactNode;
}

export const InterfaceProvider: React.FC<InterfaceProviderProps> = ({ children }) => {
  const [partnerStatus, setPartnerStatus] = useState('solo');
  const [isPartnerInvited, setIsPartnerInvited] = useState(false);
  
  useEffect(() => {
    // Load partner status
    const storedStatus = localStorage.getItem('bridge-partner-status');
    if (storedStatus) setPartnerStatus(storedStatus);
    
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
  
  // Define the colors of our interface
  const colors = {
    background: '#F1EAE8',  // soft-blush
    text: '#4A448C',        // midnight-indigo
    primary: '#C7747F',     // mauve-rose
    accent: '#8A8AC9',      // lavender-blue
    highlight: '#E69999',   // rosewood-tint
    plum: '#6A4A74',        // plum accent color
  };
  
  return (
    <InterfaceContext.Provider value={{
      partnerStatus,
      setPartnerStatus,
      isPartnerInvited,
      setIsPartnerInvited,
      colors,
      isEmotional: true // Always true now
    }}>
      {children}
    </InterfaceContext.Provider>
  );
};

export default InterfaceProvider;
