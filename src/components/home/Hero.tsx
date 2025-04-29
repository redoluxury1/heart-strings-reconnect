
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
  { bgColor: "bg-rosewood-tint", textColor: "text-white" },
  { bgColor: "bg-mauve-rose", textColor: "text-white" },
  { bgColor: "bg-lavender-blue", textColor: "text-white" },
  { bgColor: "bg-soft-cream", textColor: "text-midnight-indigo" },
  { bgColor: "bg-soft-blush", textColor: "text-midnight-indigo" },
];

// Bubble positions and sizes (for variety, coming from different corners)
const bubbleVariants = [
  "left-[5%] top-[5%] -rotate-2 max-w-[200px]", // Top left
  "right-[5%] top-[5%] rotate-2 max-w-[210px]", // Top right
  "left-[10%] top-[40%] -rotate-1 max-w-[190px]", // Middle left
  "right-[10%] top-[40%] rotate-1 max-w-[220px]", // Middle right
  "left-[25%] top-[10%] rotate-3 max-w-[180px]", // Upper left
  "right-[25%] top-[10%] -rotate-3 max-w-[230px]", // Upper right
];

// Message Bubble Component
const MessageBubble = ({ message, style, position, onAnimationEnd }) => {
  return (
    <div 
      className={cn(
        "absolute px-4 py-2 rounded-full shadow-sm font-inter font-semibold text-center",
        style.bgColor,
        style.textColor,
        position,
        "z-10 opacity-0"
      )}
      style={{ 
        animation: 'fadeIn 4s forwards 0.5s',
      }}
      onAnimationEnd={onAnimationEnd}
    >
      {message}
    </div>
  );
};

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
      position: bubbleVariants[positionIndex],
    };
    
    setVisibleBubbles(prev => [...prev, newBubble]);
    
    // Set timeout to start fading out the bubble after display time
    setTimeout(() => {
      setIsFadingOut(true);
      const bubbleElement = document.getElementById(`bubble-${newBubble.id}`);
      if (bubbleElement) {
        bubbleElement.style.animation = 'fadeOut 2s forwards';
        bubbleElement.addEventListener('animationend', () => {
          setVisibleBubbles(prev => prev.filter(bubble => bubble.id !== newBubble.id));
          // After the fade out is complete, allow for a new bubble
          setIsFadingOut(false);
        });
      }
      
      // Allow adding a new bubble only after this one starts fading
      setTimeout(() => {
        setIsAddingBubble(false);
      }, 500);
      
    }, 4000); // Display for 4 seconds before starting to fade
  };

  // Effect to periodically add new bubbles
  useEffect(() => {
    // Initial bubble on load with delay
    const initialTimer = setTimeout(() => {
      createBubble();
    }, 1000);
    
    // Set interval to add new bubbles only if we're not already adding one 
    // and no bubble is currently fading out
    const interval = setInterval(() => {
      if (visibleBubbles.length < 2 && !isAddingBubble && !isFadingOut) {
        createBubble();
      }
    }, 1000); // Check frequently if we can add a new bubble
    
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
              "absolute px-4 py-2 rounded-full shadow-sm font-inter font-semibold text-center",
              bubble.style.bgColor,
              bubble.style.textColor,
              bubble.position,
              "z-10"
            )}
            style={{ 
              animation: 'fadeIn 2s forwards',
            }}
          >
            {bubble.message}
          </div>
        ))}
      </div>
      
      {/* Main Hero Content */}
      <ContentContainer>
        <div className="flex flex-col items-center text-center mt-16">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-sm">
              <img 
                src="/lovable-uploads/4c43c832-fd35-4f81-8d27-f1fbfa7d6250.png" 
                alt="Bridge For Couples Icon" 
                className="h-12 w-auto" 
              />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 max-w-3xl mb-6">
            Reconnect with your partner during difficult moments
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-8">
            Bridge For Couples provides emotional guidance and practical tools to help couples navigate conflict 
            and find their way back to each other.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white px-8">
              Start Now
            </Button>
            <Button size="lg" variant="outline" className="border-rose-300 text-rose-500 hover:bg-rose-50 px-8">
              Learn More
            </Button>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default Hero;
