
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { InterfaceStyle, PartnerStatus } from '../../pages/Onboarding';

// Define solution-focused color palette with slate blue/crimson
export const SolutionFocusedColors = {
  background: '#6a8cb3',   // Slate blue
  text: '#2C3E50',        // Deep Charcoal
  primary: '#543544',     // Crimson
  accent: '#4f6572',      // Slate accent
  highlight: '#543544',   // Crimson highlight
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
        console.log('Setting emotional interface from URL parameter');
        setInterfaceStyle('emotionally-reflective');
        localStorage.setItem('bridge-interface-style', 'emotionally-reflective');
        return true;
      } else if (interfaceParam === 'solution' || interfaceParam === 'solution-focused') {
        console.log('Setting solution interface from URL parameter');
        setInterfaceStyle('solution-focused');
        localStorage.setItem('bridge-interface-style', 'solution-focused');
        return true;
      }
      
      return false;
    };
    
    // Function to try getting interface style from localStorage
    const getFromLocalStorage = () => {
      const storedStyle = localStorage.getItem('bridge-interface-style') as InterfaceStyle;
      if (storedStyle) {
        console.log('Loading stored interface style:', storedStyle);
        setInterfaceStyle(storedStyle);
        return true;
      }
      return false;
    };
    
    // Load user preferences
    const loadPreferences = () => {
      // First check URL parameters (highest priority)
      const urlParamApplied = checkUrlParameters();
      
      // If no URL parameters, try to get from localStorage
      if (!urlParamApplied) {
        const localStorageApplied = getFromLocalStorage();
        
        if (!localStorageApplied) {
          // Default to emotional if nothing is specified
          console.log('No interface preference found, defaulting to emotional');
          setInterfaceStyle('emotionally-reflective');
        }
      }
      
      // Load partner status
      const storedStatus = localStorage.getItem('bridge-partner-status') as PartnerStatus;
      if (storedStatus) setPartnerStatus(storedStatus);
      
      // Load partner invited status
      const storedPartnerInvited = localStorage.getItem('bridge-partner-invited');
      if (storedPartnerInvited === 'true') setIsPartnerInvited(true);
    };
    
    // Load preferences immediately on mount
    loadPreferences();
    
    // Set up storage event listener for changes in other windows/tabs
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

    // Handle message events for iframe communication
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'bridge-interface-update') {
        console.log('Received message event:', event.data);
        if (event.data.interfaceStyle) {
          setInterfaceStyle(event.data.interfaceStyle);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Sync interface style with localStorage on an interval (for iframe scenarios)
    const checkInterval = setInterval(() => {
      const currentStyle = localStorage.getItem('bridge-interface-style') as InterfaceStyle;
      if (currentStyle && currentStyle !== interfaceStyle) {
        console.log('Interface style changed in localStorage:', currentStyle);
        setInterfaceStyle(currentStyle);
      }
    }, 1000);
    
    // Handle fullscreen events
    const handleFullScreenChange = () => {
      console.log('Fullscreen change detected');
      
      // Check URL parameters when entering/exiting fullscreen
      // This ensures the correct interface is maintained
      setTimeout(() => {
        const isFullscreen = document.fullscreenElement !== null;
        console.log('Is fullscreen:', isFullscreen);
        
        // Force recheck of preferences
        loadPreferences();
        
        // If entering fullscreen, make sure we apply the current interface style
        if (isFullscreen) {
          // Get the current style from localStorage to ensure consistency
          const currentStyle = localStorage.getItem('bridge-interface-style') as InterfaceStyle;
          if (currentStyle) {
            console.log('Applying interface style in fullscreen:', currentStyle);
            setInterfaceStyle(currentStyle);
            
            // Force a refresh if needed by toggling a class on the body
            document.body.classList.add('interface-refresh');
            setTimeout(() => {
              document.body.classList.remove('interface-refresh');
            }, 50);
          }
        }
      }, 100);
    };
    
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('message', handleMessage);
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      clearInterval(checkInterval);
    };
  }, []);
  
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
        plum: '#6A4A74',        // plum accent color
      }
    : {
        ...SolutionFocusedColors,
        plum: '#543544',        // using crimson for solution-focused
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
