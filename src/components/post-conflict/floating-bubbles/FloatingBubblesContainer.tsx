
import React from 'react';
import { usePostConflictBubbles } from '@/hooks/usePostConflictBubbles';
import FloatingBubble from './FloatingBubble';

const FloatingBubblesContainer: React.FC = () => {
  const { visibleBubbles } = usePostConflictBubbles();

  return (
    <>
      {/* CSS for bubble animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
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
        `
      }} />
      
      {/* Message Bubbles Container - extending beyond its boundaries */}
      <div className="absolute inset-0 h-[220px] w-full overflow-visible">
        {visibleBubbles.map(bubble => (
          <FloatingBubble key={bubble.id} bubble={bubble} />
        ))}
      </div>
    </>
  );
};

export default FloatingBubblesContainer;
