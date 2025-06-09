
import { useState, useEffect } from 'react';
import { BubbleData } from '@/components/post-conflict/floating-bubbles/BubbleStyles';
import { getBubbleStyles, bubbleVariants } from '@/components/post-conflict/floating-bubbles/BubbleStyles';

// Messages to cycle through in the bubbles
const messages = [
  "We're on the same team",
  "It's not about winning",
  "One honest sentence can change everything",
  "You can repair without rehashing it all out",
  "Fighting doesn't mean failing",
  "This is hard- but we're trying",
  "Let's figure this out together",
  "You don't need perfect words",
  "The goal isn't to be right",
  "I'm not here to fix you. I'm here to hear you",
  "We've been here before and we're stronger",
  "Let's talk like we love each other",
  "Silence builds walls. Words build bridges",
  "You're allowed to feel everything",
  "We're allowed to mess up",
  "We're still learning to be human",
  "This doesn't have to spiral",
  "Even if it's messy, it's progress"
];

export const usePostConflictBubbles = () => {
  const [visibleBubbles, setVisibleBubbles] = useState<BubbleData[]>([]);
  const [usedPositions, setUsedPositions] = useState<number[]>([]);
  const [usedMessages, setUsedMessages] = useState<number[]>([]);
  
  const bubbleStyles = getBubbleStyles();

  // Function to create a new bubble
  const createBubble = () => {
    // Limit to maximum 3 bubbles on screen
    if (visibleBubbles.length >= 3) return;
    
    // Get available messages (not recently used)
    const availableMessages = messages.filter(
      (_, index) => !usedMessages.includes(index)
    );
    
    // If all messages used, reset the used messages array
    if (availableMessages.length === 0) {
      setUsedMessages([]);
      return;
    }
    
    const messageIndex = Math.floor(Math.random() * availableMessages.length);
    const actualMessageIndex = messages.findIndex(msg => msg === availableMessages[messageIndex]);
    
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
      message: messages[actualMessageIndex],
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
    }, 4000); // Create a bubble every 4 seconds
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return { visibleBubbles };
};
