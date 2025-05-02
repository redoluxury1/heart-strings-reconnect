
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
    // Function to check for URL parameters and apply interface style
    const checkUrlParameters = () => {
      const params = new URLSearchParams(window.location.search);
      const interfaceParam = params.get('interface');
      
      if (interfaceParam === 'emotional' || interfaceParam === 'emotionally-reflective') {
        setInterfaceStyle('emotionally-reflective');
        localStorage.setItem('bridge-interface-style', 'emotionally-reflective');
        return true;
      } else if (interfaceParam === 'solution' || interfaceParam === 'solution-focused') {
        setInterfaceStyle('solution-focused');
        localStorage.setItem('bridge-interface-style', 'solution-focused');
        return true;
      }
      
      return false;
    };
    
    // Load user preferences from localStorage
    const loadPreferences = () => {
      // First check URL parameters
      const urlParamApplied = checkUrlParameters();
      
      // If no URL parameters, try to get from localStorage
      if (!urlParamApplied) {
        const storedStyle = localStorage.getItem('bridge-interface-style') as InterfaceStyle;
        const storedStatus = localStorage.getItem('bridge-partner-status') as PartnerStatus;
        const storedPartnerInvited = localStorage.getItem('bridge-partner-invited');
        
        console.log('Loading stored interface style:', storedStyle);
        
        if (storedStyle) setInterfaceStyle(storedStyle);
        if (storedStatus) setPartnerStatus(storedStatus);
        if (storedPartnerInvited === 'true') setIsPartnerInvited(true);
      }
    };
    
    // Load preferences immediately
    loadPreferences();
    
    // Also set up an event listener for storage changes
    // This ensures interface updates when localStorage changes in another window/tab
    const handleStorageChange = (event: StorageEvent) => {
      console.log('Storage event detected:', event.key, event.newValue);
      
      if (event.key === 'bridge-interface-style') {
        const newStyle = event.newValue as InterfaceStyle;
        if (newStyle) {
          console.log('Setting interface style from storage event:', newStyle);
          setInterfaceStyle(newStyle);
        }
      }
      if (event.key === 'bridge-partner-status') {
        const newStatus = event.newValue as PartnerStatus;
        if (newStatus) setPartnerStatus(newStatus);
      }
      if (event.key === 'bridge-partner-invited') {
        setIsPartnerInvited(event.newValue === 'true');
      }
    };
    
    window.addEventListener('storage', handleStorageChange);

    // Handle communication between windows if this is a fullscreen view
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'bridge-interface-update') {
        console.log('Received message event:', event.data);
        if (event.data.interfaceStyle) {
          setInterfaceStyle(event.data.interfaceStyle);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Set up an interval to check localStorage for changes (for iframe scenarios)
    const checkInterval = setInterval(() => {
      const currentStyle = localStorage.getItem('bridge-interface-style') as InterfaceStyle;
      if (currentStyle && currentStyle !== interfaceStyle) {
        console.log('Interface style changed in localStorage:', currentStyle);
        setInterfaceStyle(currentStyle);
      }
    }, 1000);
    
    // Add fullscreen change event listener
    const handleFullScreenChange = () => {
      // When entering or exiting fullscreen, check preferences again
      setTimeout(loadPreferences, 100);
    };
    
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('message', handleMessage);
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      clearInterval(checkInterval);
    };
  }, [interfaceStyle]);
  
  // Save preferences when they change
  useEffect(() => {
    console.log('Saving interface style to localStorage:', interfaceStyle);
    localStorage.setItem('bridge-interface-style', interfaceStyle);
    
    // Inform any other windows/frames about the change
    try {
      if (window.parent !== window) {
        window.parent.postMessage({
          type: 'bridge-interface-update',
          interfaceStyle: interfaceStyle
        }, '*');
      }
      
      if (window.frames.length > 0) {
        for (let i = 0; i < window.frames.length; i++) {
          try {
            window.frames[i].postMessage({
              type: 'bridge-interface-update',
              interfaceStyle: interfaceStyle
            }, '*');
          } catch (e) {
            console.error('Error posting to frame:', e);
          }
        }
      }
    } catch (e) {
      console.error('Error in postMessage:', e);
    }
    
  }, [interfaceStyle]);
  
  // Save partner status when it changes
  useEffect(() => {
    localStorage.setItem('bridge-partner-status', partnerStatus);
  }, [partnerStatus]);
  
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
