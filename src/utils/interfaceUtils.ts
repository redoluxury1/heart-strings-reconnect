
import { InterfaceStyle, PartnerStatus } from '../pages/Onboarding';
import { SolutionFocusedColors } from '../contexts/InterfaceContext';

/**
 * Checks URL parameters for interface style settings and applies them if found.
 * This allows users to override the interface style via URL for sharing or testing.
 * 
 * @param setInterfaceStyle - Function to update the interface style
 * @returns boolean - True if a URL parameter was found and applied, false otherwise
 */
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

/**
 * Attempts to load interface style preference from localStorage.
 * Called when no URL parameters are present or during initial app load.
 * 
 * @param setInterfaceStyle - Function to update the interface style
 * @returns boolean - True if a stored preference was found and applied, false otherwise
 */
export const getFromLocalStorage = (setInterfaceStyle: (style: InterfaceStyle) => void): boolean => {
  const storedStyle = localStorage.getItem('bridge-interface-style') as InterfaceStyle;
  if (storedStyle) {
    console.log('Loading stored interface style:', storedStyle);
    setInterfaceStyle(storedStyle);
    return true;
  }
  return false;
};

/**
 * Determines color scheme based on the selected interface style.
 * Returns a complete color object with all necessary UI colors.
 * 
 * @param isEmotional - Boolean flag indicating if emotionally-reflective interface is active
 * @returns object - Color object containing all theme colors
 */
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

/**
 * Facilitates cross-frame communication for interface style updates.
 * Sends messages to both parent frames and child iframes to ensure style consistency.
 * Important for embedded applications and multi-window scenarios.
 * 
 * @param interfaceStyle - The current interface style to communicate
 */
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
