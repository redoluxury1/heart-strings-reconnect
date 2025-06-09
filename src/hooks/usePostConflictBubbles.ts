
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

  console.log('usePostConflictBubbles hook initialized');

  // Function to create a new bubble
  const createBubble = () => {
    console.log('createBubble called, current visible bubbles:', visibleBubbles.length);
    
    // Limit to maximum 3 bubbles on screen
    if (visibleBubbles.length >= 3) {
      console.log('Maximum bubbles reached, skipping creation');
      return;
    }
    
    // Get available messages (not recently used)
    const availableMessages = messages.filter(
      (_, index) => !usedMessages.includes(index)
    );
    
    console.log('Available messages:', availableMessages.length);
    
    // If all messages used, reset the used messages array
    if (availableMessages.length === 0) {
      console.log('Resetting used messages');
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
    
    console.log('Available positions:', availablePositions.length);
    
    // If all positions are used, clear some positions
    if (availablePositions.length === 0) {
      console.log('Resetting used positions');
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
    
    console.log('Creating new bubble:', newBubble.message);
    
    setVisibleBubbles(prev => {
      const updated = [...prev, newBubble];
      console.log('Updated visible bubbles count:', updated.length);
      return updated;
    });
    
    // Set timeout to start fading out the bubble after longer display time
    setTimeout(() => {
      const bubbleElement = document.getElementById(`bubble-${newBubble.id}`);
      if (bubbleElement) {
        console.log('Fading out bubble:', newBubble.message);
        bubbleElement.style.opacity = '0';
        bubbleElement.style.transform = 'translateY(-10px) scale(0.95)';
        bubbleElement.style.transition = 'opacity 1.5s ease-out, transform 1.5s ease-out';
        
        // Remove from DOM after fade out completes
        setTimeout(() => {
          console.log('Removing bubble from state:', newBubble.message);
          setVisibleBubbles(prev => prev.filter(bubble => bubble.id !== newBubble.id));
          // Free up this position
          setUsedPositions(prev => prev.filter(pos => pos !== selectedVariantIndex));
        }, 1500);
      } else {
        console.log('Bubble element not found for removal:', newBubble.id);
      }
    }, 6000); // Display for 6 seconds before starting fade out
  };

  // Effect to periodically add new bubbles
  useEffect(() => {
    console.log('Setting up bubble creation intervals');
    
    // Initial bubble after a delay
    const initialTimer = setTimeout(() => {
      console.log('Creating initial bubble');
      createBubble();
    }, 1000);
    
    // Set interval to add new bubbles at slower intervals
    const interval = setInterval(() => {
      console.log('Creating interval bubble');
      createBubble();
    }, 4000); // Create a bubble every 4 seconds
    
    return () => {
      console.log('Cleaning up bubble timers');
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []); // Remove the dependency on visibleBubbles.length

  console.log('usePostConflictBubbles returning bubbles:', visibleBubbles.length);
  return { visibleBubbles };
};
