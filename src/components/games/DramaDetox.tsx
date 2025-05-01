
import React, { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';
import ScenarioCard from './drama-detox/ScenarioCard';
import dramaDetoxScenarios from '../../data/drama-detox';

const DramaDetox = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [userVotes, setUserVotes] = useState<Record<string, string>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  
  const currentScenario = dramaDetoxScenarios[currentScenarioIndex];

  const handleVote = (scenarioId: string, option: string) => {
    setUserVotes(prev => ({
      ...prev,
      [scenarioId]: option
    }));
  };
  
  const handleSwipe = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentScenarioIndex < dramaDetoxScenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
    } else if (direction === 'down' && currentScenarioIndex > 0) {
      setCurrentScenarioIndex(prev => prev - 1);
    }
  };

  // Touch handling for swipe gestures
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartY = 0;
    let touchEndY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      touchEndY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = () => {
      const diffY = touchStartY - touchEndY;
      const THRESHOLD = 50; // Minimum swipe distance
      
      if (Math.abs(diffY) > THRESHOLD) {
        if (diffY > 0) {
          // Swiped up
          handleSwipe('up');
        } else {
          // Swiped down
          handleSwipe('down');
        }
      }
    };
    
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentScenarioIndex]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-[85vh] overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-2 flex items-center justify-center z-10">
        <h2 className="text-lg font-medium text-midnight-indigo">Drama Detox™</h2>
        <span className="mx-2 text-xs text-midnight-indigo/60">•</span>
        <p className="text-xs text-midnight-indigo/60">Who's wrong? Decide, then swipe for the next.</p>
      </div>
      
      <div className="h-full w-full flex items-center justify-center pt-12">
        <ScenarioCard
          key={currentScenario.id}
          scenario={currentScenario}
          userVote={userVotes[currentScenario.id]}
          onVote={(option) => handleVote(currentScenario.id, option)}
        />
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center text-xs text-midnight-indigo/60">
        <Info className="h-3 w-3 mr-1" />
        <span>Swipe up for next scenario, down for previous</span>
      </div>
    </div>
  );
};

export default DramaDetox;
