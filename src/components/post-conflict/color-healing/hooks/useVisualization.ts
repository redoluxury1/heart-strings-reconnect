
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface UseVisualizationProps {
  onComplete?: () => void;
}

const useVisualization = ({ onComplete }: UseVisualizationProps = {}) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [expandOrb, setExpandOrb] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [audioPreloaded, setAudioPreloaded] = useState(false);
  
  // Preload audio file when component mounts
  useEffect(() => {
    const audio = new Audio('/notification-sound.mp3');
    
    const handleCanPlayThrough = () => {
      setAudioPreloaded(true);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
    
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.load(); // Start loading the audio
    
    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, []);
  
  // Play a subtle sound notification when visualization completes
  const playCompletionSound = () => {
    if (!audioPreloaded) return;
    
    try {
      const sound = new Audio('/notification-sound.mp3');
      sound.volume = 0.3; // Keep volume subtle
      sound.play().catch(e => console.log('Audio play prevented by browser policy:', e));
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };
  
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
    let visualizationTimer: ReturnType<typeof setTimeout>;
    
    if (fadeIn) {
      // Hide buttons during visualization
      setShowButtons(false);
      
      // Start expansion animation
      setExpandOrb(true);
      
      // Set timer for visualization completion (7 seconds to match countdown)
      visualizationTimer = setTimeout(() => {
        setShowButtons(true);
        playCompletionSound();
        
        toast({
          title: "Visualization complete",
          description: "Feel the energy of your chosen color throughout your being",
        });
        
        if (onComplete) {
          onComplete();
        }
      }, 7000);
    }
    
    return () => {
      if (visualizationTimer) clearTimeout(visualizationTimer);
    };
  }, [fadeIn, onComplete]);

  return {
    fadeIn,
    expandOrb,
    showButtons,
    setFadeIn // Export the setFadeIn function so it can be used in components
  };
};

export default useVisualization;
