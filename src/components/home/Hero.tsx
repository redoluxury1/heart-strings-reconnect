
import React, { useEffect, useState } from 'react';
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
  "You're allowed to pause before you respond.",
  "This is just a moment — not the whole story.",
  "I can be upset and still love you.",
  "We're not perfect. We're learning.",
  "Let's stay on the same team.",
  "One kind message can change everything.",
  "I want to understand, not win.",
  "Even hard conversations can be loving.",
  "You matter more than being right.",
  "I don't want to fight — I want to connect.",
  "Love is the reason we care this much.",
  "Silence isn't always peace — let's talk.",
  "Repair is more powerful than rupture.",
  "We can try again, softly.",
  "You don't have to shut down to stay safe.",
  "Disagreement doesn't mean disconnection.",
  "We're allowed to grow through this.",
  "Calm is a choice — and a gift.",
  "You are not my enemy.",
  "I'm not leaving — I'm just hurting.",
  "Let's figure this out together.",
  "We're learning how to fight fair.",
  "Our love is bigger than this moment.",
  "Let's slow down and try again.",
  "Being heard matters just as much as being right.",
  "You're still my person, even in the hard moments.",
  "Connection begins when we stop defending.",
  "We're not broken — we're building.",
  "Let's lead with love, even now."
];

// Color schemes for bubbles with new palette colors
const getBubbleStyles = () => [
  { bgColor: "bg-[#2e4059]", textColor: "text-white", position: "after:border-t-[#2e4059]" }, // Navy
  { bgColor: "bg-[#8a6f8e]", textColor: "text-white", position: "after:border-t-[#8a6f8e]" }, // Mauve
  { bgColor: "bg-[#c97c5d]", textColor: "text-white", position: "after:border-t-[#c97c5d]" }, // Terracotta
  { bgColor: "bg-[#dbd0e0]", textColor: "text-[#2e4059]", position: "after:border-t-[#dbd0e0]" }, // Light Mauve
  { bgColor: "bg-[#e6c7bc]", textColor: "text-[#2e4059]", position: "after:border-t-[#e6c7bc]" }, // Light Terracotta
];

// Text bubble positions and tails (for variety, coming from different corners)
const bubbleVariants = [
  { position: "left-[5%] top-[5%] -rotate-2 max-w-[200px]", tail: "after:left-4" }, // Top left
  { position: "right-[5%] top-[5%] rotate-2 max-w-[210px]", tail: "after:right-4" }, // Top right
  { position: "left-[10%] bottom-[5%] -rotate-1 max-w-[190px]", tail: "after:left-6" }, // Bottom left
  { position: "right-[10%] bottom-[5%] rotate-1 max-w-[220px]", tail: "after:right-6" }, // Bottom right
  { position: "left-[25%] top-[40%] rotate-3 max-w-[180px]", tail: "after:left-10" }, // Middle left
  { position: "right-[25%] top-[40%] -rotate-3 max-w-[230px]", tail: "after:right-10" }, // Middle right
];

const Hero = () => {
  const [visibleBubbles, setVisibleBubbles] = useState([]);
  const [usedPositions, setUsedPositions] = useState([]);
  const [usedMessages, setUsedMessages] = useState([]);
  
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
    
    const newBubble = {
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
    }, 4000); // Create a bubble every 4 seconds (slower)
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative z-10 bg-gradient-to-b from-rose-50 via-white to-transparent py-20 pb-28 overflow-visible">
      {/* CSS for bubble animations */}
      <style jsx>{`
        @keyframes fadeInSlow {
          0% { 
            opacity: 0; 
            transform: translateY(20px) scale(0.9);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
      
      {/* Message Bubbles Container - extending beyond its boundaries */}
      <div className="absolute inset-0 h-[220px] w-full overflow-visible">
        {visibleBubbles.map(bubble => (
          <div 
            id={`bubble-${bubble.id}`}
            key={bubble.id}
            className={cn(
              `absolute px-4 py-2 rounded-xl shadow-sm font-inter font-semibold text-center text-sm`, 
              bubble.style.bgColor,
              bubble.style.textColor,
              bubble.positionStyle,
              bubble.tailPosition,
              "z-20 after:content-[''] after:absolute after:bottom-[-8px] after:border-l-[8px] after:border-l-transparent after:border-r-[8px] after:border-r-transparent after:border-t-[8px]",
              bubble.style.position
            )}
            style={{ 
              animation: 'fadeInSlow 2s ease-out forwards',
              willChange: 'opacity, transform',
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
