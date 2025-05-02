
import React, { useState, useEffect } from 'react';
import { useInterface } from '@/hooks/useInterfaceContext';
import { Lightbulb, Heart, ThumbsUp, ThumbsDown, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { reconnectionTips, ReconnectionTip } from '@/data/reconnection-tips';
import { toast } from '@/hooks/use-toast';

const OkayButNowWhat = () => {
  const { isEmotional } = useInterface();
  const [currentTip, setCurrentTip] = useState<ReconnectionTip | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  // Randomly select a tip when the component mounts or when refreshing
  useEffect(() => {
    showRandomTip();
  }, []);

  // Get a random tip that's different from the current one
  const showRandomTip = () => {
    // If we have no tips, return early
    if (reconnectionTips.length === 0) return;
    
    // If we only have one tip, just show that
    if (reconnectionTips.length === 1) {
      setCurrentTip(reconnectionTips[0]);
      return;
    }
    
    let randomTip;
    // Make sure we get a different tip than the current one
    do {
      const randomIndex = Math.floor(Math.random() * reconnectionTips.length);
      randomTip = reconnectionTips[randomIndex];
    } while (currentTip && randomTip.id === currentTip.id);
    
    setCurrentTip(randomTip);
    setHasVoted(false);
  };

  // Handle feedback submission
  const handleFeedback = (helpful: boolean) => {
    // In a real app, this would send the feedback to a backend
    toast({
      title: helpful ? "Thanks for your feedback!" : "We'll try to improve our suggestions",
      description: helpful ? "We're glad this suggestion was helpful." : "We'll note that this wasn't as useful.",
      duration: 3000,
      position: "bottom",
    });
    setHasVoted(true);
  };

  // Determine background colors based on interface style
  const bgColor = isEmotional
    ? "bg-gradient-to-br from-[#F1E5FF]/80 to-[#F1E5FF]/30" // Soft purple for emotional
    : "bg-gradient-to-br from-[#D1E5F4]/90 to-[#D1E5F4]/50"; // Soft blue for solution-focused

  // Button styling based on interface
  const primaryBtnClass = isEmotional
    ? "bg-midnight-indigo hover:bg-midnight-indigo/90 text-white"
    : "bg-[#589391] hover:bg-[#589391]/90 text-white";

  const secondaryBtnClass = isEmotional
    ? "bg-mauve-rose/30 hover:bg-mauve-rose/40 text-midnight-indigo"
    : "bg-[#589391]/20 hover:bg-[#589391]/30 text-[#2C3E50]";

  return (
    <div className={`${bgColor} rounded-xl shadow-md p-6 md:p-8 mb-12`}>
      <div className="flex flex-col items-center">
        {/* Icon based on interface style */}
        {isEmotional ? (
          <Heart className="h-12 w-12 text-mauve-rose mb-4" />
        ) : (
          <Lightbulb className="h-12 w-12 text-[#589391] mb-4" />
        )}
        
        {/* Section Title */}
        <h2 className={`text-3xl md:text-4xl ${isEmotional ? "font-cormorant" : ""} font-medium mb-3 text-center ${
          isEmotional ? "text-midnight-indigo" : "text-[#221F26]"
        }`}>
          Okay, but now what?
        </h2>
        
        {/* Description */}
        <p className="text-center text-gray-700 mb-6 max-w-xl">
          A small step to help you reconnect after a tough moment.
        </p>
        
        {/* Tip Card */}
        {currentTip && (
          <div className="bg-white/60 p-6 rounded-lg shadow-sm mb-6 max-w-lg w-full">
            <p className="text-lg text-center font-medium text-gray-800">
              {currentTip.text}
            </p>
          </div>
        )}
        
        {/* Feedback and Refresh Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {!hasVoted && (
            <>
              <Button 
                onClick={() => handleFeedback(true)}
                className={`${primaryBtnClass} flex items-center gap-2`}
                size="sm"
              >
                <ThumbsUp size={16} />
                Helpful
              </Button>
              
              <Button 
                onClick={() => handleFeedback(false)}
                className={`${secondaryBtnClass} flex items-center gap-2`}
                size="sm"
              >
                <ThumbsDown size={16} />
                Not Helpful
              </Button>
            </>
          )}
          
          <Button 
            onClick={showRandomTip}
            className={`${primaryBtnClass} flex items-center gap-2 ${hasVoted ? 'mt-2' : ''}`}
            size="sm"
          >
            <RefreshCw size={16} />
            Show Another Tip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OkayButNowWhat;
