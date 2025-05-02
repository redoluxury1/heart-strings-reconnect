import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { useInterface } from '../common/InterfaceProvider';

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

// Color schemes for bubbles - emotional and solution-focused versions
const getBubbleStyles = (isEmotional) => isEmotional ? [
  { bgColor: "bg-rosewood-tint", textColor: "text-white", position: "after:border-t-rosewood-tint" },
  { bgColor: "bg-mauve-rose", textColor: "text-white", position: "after:border-t-mauve-rose" },
  { bgColor: "bg-lavender-blue", textColor: "text-white", position: "after:border-t-lavender-blue" },
  { bgColor: "bg-soft-cream", textColor: "text-midnight-indigo", position: "after:border-t-soft-cream" },
  { bgColor: "bg-soft-blush", textColor: "text-midnight-indigo", position: "after:border-t-soft-blush" },
] : [
  { bgColor: "bg-[#E51D2C]", textColor: "text-white", position: "after:border-t-[#E51D2C]" },
  { bgColor: "bg-[#589391]", textColor: "text-white", position: "after:border-t-[#589391]" },
  { bgColor: "bg-[#2C3E50]", textColor: "text-white", position: "after:border-t-[#2C3E50]" },
  { bgColor: "bg-white", textColor: "text-[#2C3E50]", position: "after:border-t-white" },
  { bgColor: "bg-[#D1E5F4]/80", textColor: "text-[#2C3E50]", position: "after:border-t-[#D1E5F4]" },
];

// Text bubble positions and tails (for variety, coming from different corners)
const bubbleVariants = [
  { position: "left-[5%] top-[5%] -rotate-2 max-w-[200px]", tail: "after:left-4" }, // Top left
  { position: "right-[5%] top-[5%] rotate-2 max-w-[210px]", tail: "after:right-4" }, // Top right
  { position: "left-[10%] bottom-[15%] -rotate-1 max-w-[190px]", tail: "after:left-6" }, // Bottom left but higher
  { position: "right-[10%] bottom-[15%] rotate-1 max-w-[220px]", tail: "after:right-6" }, // Bottom right but higher
  { position: "left-[25%] top-[40%] rotate-3 max-w-[180px]", tail: "after:left-10" }, // Middle left
  { position: "right-[25%] top-[40%] -rotate-3 max-w-[230px]", tail: "after:right-10" }, // Middle right
];

const FloatingTextBubbles = () => {
  const [visibleBubbles, setVisibleBubbles] = useState([]);
  const [usedPositions, setUsedPositions] = useState([]);
  const { isEmotional } = useInterface();
  
  const bubbleStyles = getBubbleStyles(isEmotional);

  // Function to create a new bubble
  const createBubble = () => {
    // Only allow up to 3 bubbles at once
    if (visibleBubbles.length >= 3) return;
    
    const messageIndex = Math.floor(Math.random() * messages.length);
    const styleIndex = Math.floor(Math.random() * bubbleStyles.length);
    
    // Find an available position that's not currently used
    const availablePositions = bubbleVariants.filter(
      (_, index) => !usedPositions.includes(index)
    );
    
    // If all positions are used, don't add a new bubble
    if (availablePositions.length === 0) return;
    
    // Select a random position from available ones
    const positionIndex = Math.floor(Math.random() * availablePositions.length);
    const selectedVariantIndex = bubbleVariants.findIndex(
      variant => variant === availablePositions[positionIndex]
    );
    
    // Add this position to used positions
    setUsedPositions(prev => [...prev, selectedVariantIndex]);
    
    const newBubble = {
      id: Date.now(),
      message: messages[messageIndex],
      style: bubbleStyles[styleIndex],
      positionStyle: bubbleVariants[selectedVariantIndex].position,
      tailPosition: bubbleVariants[selectedVariantIndex].tail,
      variantIndex: selectedVariantIndex
    };
    
    setVisibleBubbles(prev => [...prev, newBubble]);
    
    // Set timeout to start fading out the bubble after display time
    setTimeout(() => {
      const bubbleElement = document.getElementById(`bubble-${newBubble.id}`);
      if (bubbleElement) {
        bubbleElement.style.animation = 'fadeOut 1s forwards';
        bubbleElement.addEventListener('animationend', () => {
          setVisibleBubbles(prev => prev.filter(bubble => bubble.id !== newBubble.id));
          // Free up this position
          setUsedPositions(prev => prev.filter(pos => pos !== selectedVariantIndex));
        });
      }
    }, 2500); // Display time - 2.5 seconds before fade out starts
  };

  // Effect to periodically add new bubbles
  useEffect(() => {
    // Initial bubble on load with delay
    const initialTimer = setTimeout(() => {
      createBubble();
    }, 600);
    
    // Set interval to add new bubbles at staggered times
    const interval = setInterval(() => {
      if (Math.random() > 0.3) { // 70% chance to create a new bubble each interval
        createBubble();
      }
    }, 800); // Check every 800ms if we should add a new bubble
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [visibleBubbles.length, usedPositions]);

  return (
    <div className={`relative z-10 bg-gradient-to-b ${
      isEmotional 
        ? "from-rose-50 via-white to-transparent" 
        : "from-[#D1E5F4] via-white to-transparent"
    } py-24 overflow-visible`}>
      {/* Message Bubbles Container - extending beyond its boundaries */}
      <div className="absolute inset-0 h-[220px] w-full overflow-visible">
        {visibleBubbles.map(bubble => (
          <div 
            id={`bubble-${bubble.id}`}
            key={bubble.id}
            className={cn(
              `absolute px-4 py-2 ${isEmotional ? "rounded-xl" : "rounded-md"} shadow-sm font-inter font-semibold text-center`,
              bubble.style.bgColor,
              bubble.style.textColor,
              bubble.positionStyle,
              bubble.tailPosition,
              "z-20 after:content-[''] after:absolute after:bottom-[-8px] after:border-l-[8px] after:border-l-transparent after:border-r-[8px] after:border-r-transparent after:border-t-[8px]",
              bubble.style.position
            )}
            style={{ 
              animation: 'fadeIn 1s forwards',
            }}
          >
            {bubble.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloatingTextBubbles;
