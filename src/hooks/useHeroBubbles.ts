
import { useState, useEffect } from 'react';
import { heroBubbleMessages } from '@/data/hero-bubble-messages';
import { getBubbleStyles, bubbleVariants, BubbleData } from '@/components/home/hero-bubbles/BubbleStyles';

export const useHeroBubbles = () => {
  const [visibleBubbles, setVisibleBubbles] = useState<BubbleData[]>([]);
  const [usedPositions, setUsedPositions] = useState<number[]>([]);
  const [usedMessages, setUsedMessages] = useState<number[]>([]);
  
  const bubbleStyles = getBubbleStyles();

  // Function to create a new bubble
  const createBubble = () => {
    // Limit to maximum 3 bubbles on screen
    if (visibleBubbles.length >= 3) return;
    
    // Get available messages (not recently used)
    const availableMessages = heroBubbleMessages.filter(
      (_, index) => !usedMessages.includes(index)
    );
    
    // If all messages used, reset the used messages array
    if (availableMessages.length === 0) {
      setUsedMessages([]);
      return;
    }
    
    const messageIndex = Math.floor(Math.random() * availableMessages.length);
    const actualMessageIndex = heroBubbleMessages.findIndex(msg => msg === availableMessages[messageIndex]);
    
    const styleIndex = Math.floor(Math.random() * bubbleStyles.length);
    
    // Find an available position that's not currently used
    const availablePositions = bubbleVariants.filter(
      (_, index) => !usedPositions.includes(index)
    );
    
    // If all positions are used, clear some positions
    if (availablePositions.length === 0) {
      setUsedPositions([]);
      return;
    }
    
    // Select a random position from available ones
    const positionIndex = Math.floor(Math.random() * availablePositions.length);
    const selectedVariantIndex = bubbleVariants.findIndex(
      variant => variant === availablePositions[positionIndex]
    );
    
    // Add this position and message to used arrays
    setUsedPositions(prev => [...prev, selectedVariantIndex]);
    setUsedMessages(prev => [...prev, actualMessageIndex]);
    
    const newBubble: BubbleData = {
      id: Date.now() + Math.random(),
      message: heroBubbleMessages[actualMessageIndex],
      style: bubbleStyles[styleIndex],
      positionStyle: bubbleVariants[selectedVariantIndex].position,
      tailPosition: bubbleVariants[selectedVariantIndex].tail,
      variantIndex: selectedVariantIndex
    };
    
    setVisibleBubbles(prev => [...prev, newBubble]);
    
    // Set timeout to start fading out the bubble after longer display time
    setTimeout(() => {
      const bubbleElement = document.getElementById(`bubble-${newBubble.id}`);
      if (bubbleElement) {
        bubbleElement.style.opacity = '0';
        bubbleElement.style.transform = 'translateY(-10px) scale(0.95)';
        bubbleElement.style.transition = 'opacity 1.5s ease-out, transform 1.5s ease-out';
        
        // Remove from DOM after fade out completes
        setTimeout(() => {
          setVisibleBubbles(prev => prev.filter(bubble => bubble.id !== newBubble.id));
          // Free up this position
          setUsedPositions(prev => prev.filter(pos => pos !== selectedVariantIndex));
        }, 1500);
      }
    }, 6000); // Display for 6 seconds before starting fade out
  };

  // Effect to periodically add new bubbles
  useEffect(() => {
    // Initial bubble after a delay
    const initialTimer = setTimeout(() => {
      createBubble();
    }, 2000);
    
    // Set interval to add new bubbles at slower intervals
    const interval = setInterval(() => {
      createBubble();
    }, 4000); // Create a bubble every 4 seconds (slower)
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return { visibleBubbles };
};
