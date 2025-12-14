import React from 'react';
import { useHeroBubbles } from '@/hooks/useHeroBubbles';
import HeroBubble from './HeroBubble';
import '@/styles/animations.css';

const HeroBubblesContainer: React.FC = () => {
  const { visibleBubbles } = useHeroBubbles();

  return (
    <div className="absolute inset-0 w-full overflow-visible z-20">
      {visibleBubbles.map(bubble => (
        <HeroBubble key={bubble.id} bubble={bubble} />
      ))}
    </div>
  );
};

export default HeroBubblesContainer;
