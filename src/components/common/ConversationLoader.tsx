
import React, { useState, useEffect } from 'react';

interface ConversationLoaderProps {
  className?: string;
}

const ConversationLoader: React.FC<ConversationLoaderProps> = ({ className = "" }) => {
  const [currentCycle, setCurrentCycle] = useState(0);
  const [visibleBubbles, setVisibleBubbles] = useState<number[]>([]);

  const textCycles = [
    [
      "Softening tension…",
      "Opening emotional bandwidth…", 
      "Building a bridge…"
    ],
    [
      "Taking a deep breath…",
      "Creating emotional space…",
      "Preparing something gentle…"
    ],
    [
      "Making your words feel safer…",
      "Resetting the tone…",
      "Bringing you back together…"
    ]
  ];

  useEffect(() => {
    const animateBubbles = () => {
      // Reset bubbles
      setVisibleBubbles([]);
      
      // Animate each bubble in sequence
      const timeouts = [
        setTimeout(() => setVisibleBubbles([0]), 100),
        setTimeout(() => setVisibleBubbles([0, 1]), 600),
        setTimeout(() => setVisibleBubbles([0, 1, 2]), 1100),
        setTimeout(() => {
          // Hold for a moment, then cycle to next set
          setTimeout(() => {
            setCurrentCycle((prev) => (prev + 1) % textCycles.length);
          }, 1500);
        }, 1600)
      ];

      return timeouts;
    };

    const timeouts = animateBubbles();
    
    // Set up the cycling interval
    const cycleInterval = setInterval(() => {
      animateBubbles();
    }, 4000);

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
      clearInterval(cycleInterval);
    };
  }, [currentCycle]);

  const currentTexts = textCycles[currentCycle];

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      {currentTexts.map((text, index) => (
        <div
          key={`${currentCycle}-${index}`}
          className={`
            px-4 py-3 max-w-xs rounded-2xl bg-soft-blush shadow-sm
            transition-all duration-500 ease-out
            ${visibleBubbles.includes(index) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
            }
          `}
          style={{
            transitionDelay: `${index * 100}ms`
          }}
        >
          <p className="text-sm text-midnight-indigo text-center font-medium">
            {text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ConversationLoader;
