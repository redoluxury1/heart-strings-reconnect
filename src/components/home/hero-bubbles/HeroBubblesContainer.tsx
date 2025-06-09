
import React from 'react';
import { useHeroBubbles } from '@/hooks/useHeroBubbles';
import HeroBubble from './HeroBubble';

const HeroBubblesContainer: React.FC = () => {
  const { visibleBubbles } = useHeroBubbles();

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
      
      {/* Message Bubbles Container - positioned to start right after navbar with minimal spacing */}
      <div className="absolute inset-0 w-full overflow-visible z-20">
        {visibleBubbles.map(bubble => (
          <HeroBubble key={bubble.id} bubble={bubble} />
        ))}
      </div>
    </>
  );
};

export default HeroBubblesContainer;
