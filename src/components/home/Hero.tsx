
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

// Bubble positions and sizes (for variety)
const bubbleVariants = [
  "left-[10%] top-5 -rotate-3 max-w-[180px]",
  "left-[35%] top-10 rotate-2 max-w-[220px]",
  "left-[60%] top-3 -rotate-1 max-w-[200px]",
  "left-[20%] top-16 rotate-3 max-w-[190px]",
  "left-[45%] top-20 -rotate-2 max-w-[210px]",
  "left-[70%] top-14 rotate-1 max-w-[230px]",
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
  const [bubbleCounter, setBubbleCounter] = useState(0);

  // Function to create a new bubble
  const createBubble = () => {
    const messageIndex = Math.floor(Math.random() * messages.length);
    const styleIndex = Math.floor(Math.random() * bubbleStyles.length);
    const positionIndex = Math.floor(Math.random() * bubbleVariants.length);
    
    const newBubble = {
      id: Date.now(),
      message: messages[messageIndex],
      style: bubbleStyles[styleIndex],
      position: bubbleVariants[positionIndex],
      phase: 'entering'
    };
    
    setVisibleBubbles(prev => [...prev, newBubble]);
    
    // Set timeout to remove the bubble after display time
    setTimeout(() => {
      const bubbleElement = document.getElementById(`bubble-${newBubble.id}`);
      if (bubbleElement) {
        bubbleElement.style.animation = 'fadeOut 4s forwards';
        bubbleElement.addEventListener('animationend', () => {
          setVisibleBubbles(prev => prev.filter(bubble => bubble.id !== newBubble.id));
        });
      }
    }, 8000); // Display for 8 seconds (increased from 5)
  };

  // Effect to periodically add new bubbles
  useEffect(() => {
    // Initial bubble on load
    createBubble();
    
    // Set interval to add new bubbles
    const interval = setInterval(() => {
      if (visibleBubbles.length < 3) { // Reduced max concurrent bubbles from 5 to 3
        createBubble();
        setBubbleCounter(prev => prev + 1);
      }
    }, 4000); // New bubble every 4 seconds (increased from 2)
    
    return () => clearInterval(interval);
  }, [visibleBubbles.length]);

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
              animation: 'fadeIn 4s forwards',
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
