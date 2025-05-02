
import { InterfaceStyle, PartnerStatus } from '../pages/Onboarding';
import { SolutionFocusedColors } from '../contexts/InterfaceContext';

// Function to check for URL parameters and apply interface style
export const checkUrlParameters = (setInterfaceStyle: (style: InterfaceStyle) => void): boolean => {
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
export const getFromLocalStorage = (setInterfaceStyle: (style: InterfaceStyle) => void): boolean => {
  const storedStyle = localStorage.getItem('bridge-interface-style') as InterfaceStyle;
  if (storedStyle) {
    console.log('Loading stored interface style:', storedStyle);
    setInterfaceStyle(storedStyle);
    return true;
  }
  return false;
};

// Function to determine colors based on interface style
export const getColors = (isEmotional: boolean) => {
  return isEmotional 
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
};

// Function to handle post message communications for iframes
export const postInterfaceMessage = (interfaceStyle: InterfaceStyle) => {
  try {
    // Notify parent if we're in an iframe
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'bridge-interface-update',
        interfaceStyle: interfaceStyle
      }, '*');
    }
    
    // Notify any children frames
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
};
