
import { PartnerStatus } from '../contexts/InterfaceContext';

/**
 * Facilitates cross-frame communication for partner status updates.
 * Sends messages to both parent frames and child iframes to ensure status consistency.
 * Important for embedded applications and multi-window scenarios.
 * 
 * @param partnerStatus - The current partner status to communicate
 */
export const postPartnerStatusMessage = (partnerStatus: PartnerStatus) => {
  try {
    // Notify parent if we're in an iframe
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'bridge-partner-status-update',
        partnerStatus: partnerStatus
      }, '*');
    }
    
    // Notify any children frames
    if (window.frames.length > 0) {
      for (let i = 0; i < window.frames.length; i++) {
        try {
          window.frames[i].postMessage({
            type: 'bridge-partner-status-update',
            partnerStatus: partnerStatus
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

/**
 * Gets colors object for the UI theme
 * 
 * @returns object - Color object containing all theme colors
 */
export const getColors = () => {
  return {
    background: '#F1EAE8',  // soft-blush
    text: '#4A448C',        // midnight-indigo
    primary: '#C7747F',     // mauve-rose
    accent: '#8A8AC9',      // lavender-blue
    highlight: '#E69999',   // rosewood-tint
    plum: '#6A4A74',        // plum accent color
  };
};
