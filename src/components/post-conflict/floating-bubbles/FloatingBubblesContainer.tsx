
import React from 'react';
import { usePostConflictBubbles } from '@/hooks/usePostConflictBubbles';
import FloatingBubble from './FloatingBubble';

const FloatingBubblesContainer: React.FC = () => {
  const { visibleBubbles } = usePostConflictBubbles();

  console.log('FloatingBubblesContainer rendering with bubbles:', visibleBubbles.length);

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
          
          .bubble-container {
            position: relative;
            z-index: 10;
          }
        `
      }} />
      
      {/* Message Bubbles Container - constrained to prevent overlap */}
      <div className="bubble-container absolute inset-0 h-[120px] w-full overflow-hidden pointer-events-none">
        {visibleBubbles.length > 0 ? (
          visibleBubbles.map(bubble => {
            console.log('Rendering bubble:', bubble.message);
            return <FloatingBubble key={bubble.id} bubble={bubble} />;
          })
        ) : (
          <div className="absolute top-4 left-4 text-xs text-gray-500 opacity-50">
            Loading bubbles...
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingBubblesContainer;
