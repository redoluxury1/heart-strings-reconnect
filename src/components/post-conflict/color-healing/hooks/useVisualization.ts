
import { useState, useEffect } from 'react';

interface UseVisualizationProps {
  onComplete?: () => void;
}

const useVisualization = ({ onComplete }: UseVisualizationProps = {}) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [expandOrb, setExpandOrb] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  
  // Trigger fade-in animation after component mounts
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeIn(true);
    }, 500);
    
    return () => {
      clearTimeout(fadeTimer);
    };
  }, []);

  // Handle expansion animation
  useEffect(() => {
    if (fadeIn) {
      // Start expansion animation
      setExpandOrb(true);
      
      // Call onComplete if provided
      if (onComplete) {
        onComplete();
      }
    }
  }, [fadeIn, onComplete]);

  return {
    fadeIn,
    expandOrb,
    showButtons,
    setFadeIn // Export the setFadeIn function so it can be used in components
  };
};

export default useVisualization;
