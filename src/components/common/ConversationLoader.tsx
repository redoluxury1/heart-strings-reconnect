
import React, { useState, useEffect } from 'react';

interface ConversationLoaderProps {
  className?: string;
  isLoading?: boolean; // Allow parent to control loading state
  loadingText?: string; // Allow custom loading text
}

const ConversationLoader: React.FC<ConversationLoaderProps> = ({ 
  className = "",
  isLoading = true,
  loadingText = "Getting your conversation ready…"
}) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [visibleBubbles, setVisibleBubbles] = useState<number[]>([]);

  const messages = [
    loadingText,
    "Creating emotional space…",
    "Preparing something gentle…"
  ];

  useEffect(() => {
    if (!isLoading) return;

    // Show first message immediately
    setVisibleBubbles([0]);
    
    // Only cycle through additional messages if loading takes longer than 2 seconds
    const longLoadingTimer = setTimeout(() => {
      if (isLoading) {
        setVisibleBubbles([0, 1]);
        
        // Add third message if still loading after 4 seconds
        const veryLongLoadingTimer = setTimeout(() => {
          if (isLoading) {
            setVisibleBubbles([0, 1, 2]);
          }
        }, 2000);
        
        return () => clearTimeout(veryLongLoadingTimer);
      }
    }, 2000);

    return () => clearTimeout(longLoadingTimer);
  }, [isLoading, loadingText]);

  // Reset when loading stops
  useEffect(() => {
    if (!isLoading) {
      setVisibleBubbles([]);
      setCurrentMessage(0);
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      {messages.slice(0, Math.max(1, visibleBubbles.length)).map((text, index) => (
        <div
          key={index}
          className={`
            px-4 py-3 max-w-xs rounded-2xl bg-soft-blush shadow-sm
            transition-all duration-300 ease-out
            ${visibleBubbles.includes(index) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
            }
          `}
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
