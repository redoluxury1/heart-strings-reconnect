
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import ContentContainer from '../common/ContentContainer';
import { cn } from "@/lib/utils";

// Messages to cycle through
const messages = [
  "It's okay to feel everything.",
  "You're on the same team.",
  "Take a breath — you're doing your best.",
  "Small steps still count.",
  "You don't have to be perfect to be loved.",
  "Kindness calms everything.",
  "You're learning. You're trying. That matters.",
  "Connection starts with one calm message.",
  "You're allowed to pause before you respond."
];

// Color schemes for bubbles
const bubbleStyles = [
  { bgColor: "bg-rosewood-tint", textColor: "text-white", position: "after:border-t-rosewood-tint" },
  { bgColor: "bg-mauve-rose", textColor: "text-white", position: "after:border-t-mauve-rose" },
  { bgColor: "bg-lavender-blue", textColor: "text-white", position: "after:border-t-lavender-blue" },
  { bgColor: "bg-soft-cream", textColor: "text-midnight-indigo", position: "after:border-t-soft-cream" },
  { bgColor: "bg-soft-blush", textColor: "text-midnight-indigo", position: "after:border-t-soft-blush" },
];

// Text bubble positions and tails (for variety, coming from different corners)
const bubbleVariants = [
  { position: "left-[5%] top-[5%] -rotate-2 max-w-[200px]", tail: "after:left-4" }, // Top left
  { position: "right-[5%] top-[5%] rotate-2 max-w-[210px]", tail: "after:right-4" }, // Top right
  { position: "left-[10%] top-[40%] -rotate-1 max-w-[190px]", tail: "after:left-6" }, // Middle left
  { position: "right-[10%] top-[40%] rotate-1 max-w-[220px]", tail: "after:right-6" }, // Middle right
  { position: "left-[25%] top-[10%] rotate-3 max-w-[180px]", tail: "after:left-10" }, // Upper left
  { position: "right-[25%] top-[10%] -rotate-3 max-w-[230px]", tail: "after:right-10" }, // Upper right
];

const Hero = () => {
  const [visibleBubbles, setVisibleBubbles] = useState([]);
  const [isAddingBubble, setIsAddingBubble] = useState(false);
  const [lastPosition, setLastPosition] = useState(-1);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Function to create a new bubble
  const createBubble = () => {
    if (isAddingBubble) return;
    
    setIsAddingBubble(true);
    
    const messageIndex = Math.floor(Math.random() * messages.length);
    const styleIndex = Math.floor(Math.random() * bubbleStyles.length);
    
    // Choose a position that's different from the last one
    let positionIndex;
    do {
      positionIndex = Math.floor(Math.random() * bubbleVariants.length);
    } while (positionIndex === lastPosition && bubbleVariants.length > 1);
    
    setLastPosition(positionIndex);
    
    const newBubble = {
      id: Date.now(),
      message: messages[messageIndex],
      style: bubbleStyles[styleIndex],
      positionStyle: bubbleVariants[positionIndex].position,
      tailPosition: bubbleVariants[positionIndex].tail,
    };
    
    setVisibleBubbles(prev => [...prev, newBubble]);
    
    // Set timeout to start fading out the bubble after display time
    setTimeout(() => {
      setIsFadingOut(true);
      const bubbleElement = document.getElementById(`bubble-${newBubble.id}`);
      if (bubbleElement) {
        bubbleElement.style.animation = 'fadeOut 1s forwards';
        bubbleElement.addEventListener('animationend', () => {
          setVisibleBubbles(prev => prev.filter(bubble => bubble.id !== newBubble.id));
          // After the fade out is complete, allow for a new bubble
          setIsFadingOut(false);
        });
      }
      
      // Allow adding a new bubble only after this one starts fading
      setTimeout(() => {
        setIsAddingBubble(false);
      }, 300); // Reduced from 500ms to 300ms
      
    }, 2500); // Reduced from 4000ms to 2500ms for faster display time
  };

  // Effect to periodically add new bubbles
  useEffect(() => {
    // Initial bubble on load with delay
    const initialTimer = setTimeout(() => {
      createBubble();
    }, 800); // Reduced from 1000ms to 800ms
    
    // Set interval to add new bubbles only if we're not already adding one 
    // and no bubble is currently fading out
    const interval = setInterval(() => {
      if (visibleBubbles.length < 2 && !isAddingBubble && !isFadingOut) {
        createBubble();
      }
    }, 500); // Reduced from 1000ms to 500ms to check more frequently
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [visibleBubbles.length, isAddingBubble, isFadingOut]);

  return (
    <div className="bg-gradient-to-b from-rose-50 to-white py-20 relative overflow-hidden">
      {/* Message Bubbles Container */}
      <div className="absolute inset-0 h-[180px] w-full overflow-hidden">
        {visibleBubbles.map(bubble => (
          <div 
            id={`bubble-${bubble.id}`}
            key={bubble.id}
            className={cn(
              "absolute px-4 py-2 rounded-xl shadow-sm font-inter font-semibold text-center",
              bubble.style.bgColor,
              bubble.style.textColor,
              bubble.positionStyle,
              bubble.tailPosition,
              "z-10 after:content-[''] after:absolute after:bottom-[-8px] after:border-l-[8px] after:border-l-transparent after:border-r-[8px] after:border-r-transparent after:border-t-[8px]",
              bubble.style.position
            )}
            style={{ 
              animation: 'fadeIn 1s forwards', // Reduced from 2s to 1s for faster fade in
            }}
          >
            {bubble.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
