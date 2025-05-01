
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import ScenarioCard from './drama-detox/ScenarioCard';
import dramaDetoxScenarios from '../../data/drama-detox';
import { useIsMobile } from '../../hooks/use-mobile';

type CommentType = {
  id: string;
  username: string;
  text: string;
  timestamp: Date;
  likes: number;
};

// Array of background colors to cycle through for scenarios
const backgroundColors = [
  "#4A448C", // Midnight Indigo
  "#8A8AC9", // Lavender Blue 
  "#C7747F", // Mauve Rose
  "#7E69AB", // Secondary Purple
  "#6E59A5", // Tertiary Purple
  "#8B5CF6", // Vivid Purple
  "#D946EF", // Magenta Pink
];

const DramaDetox = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [userVotes, setUserVotes] = useState<Record<string, string>>({});
  const [comments, setComments] = useState<Record<string, CommentType[]>>({});
  const [newComment, setNewComment] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const currentScenario = dramaDetoxScenarios[currentScenarioIndex];
  
  // Get a different background color for each scenario based on its index
  const getBackgroundColor = (index: number) => {
    return backgroundColors[index % backgroundColors.length];
  };

  const handleVote = (scenarioId: string, option: string) => {
    setUserVotes(prev => ({
      ...prev,
      [scenarioId]: option
    }));
  };
  
  const handleSwipe = (direction: 'up' | 'down') => {
    // Only allow swiping to next if the user has voted on the current scenario
    if (direction === 'up' && currentScenarioIndex < dramaDetoxScenarios.length - 1) {
      if (userVotes[currentScenario.id]) {
        setCurrentScenarioIndex(prev => prev + 1);
      } else {
        // Provide feedback that user needs to vote first
        alert('Please vote on this scenario before moving to the next one');
      }
    } else if (direction === 'down' && currentScenarioIndex > 0) {
      setCurrentScenarioIndex(prev => prev - 1);
    }
  };

  const handleAddComment = (scenarioId: string) => {
    if (newComment.trim()) {
      const comment: CommentType = {
        id: Date.now().toString(),
        username: `User${Math.floor(Math.random() * 1000)}`,
        text: newComment,
        timestamp: new Date(),
        likes: 0
      };
      
      setComments(prev => ({
        ...prev,
        [scenarioId]: [...(prev[scenarioId] || []), comment]
      }));
      
      setNewComment('');
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
  }, [currentScenarioIndex, userVotes, currentScenario.id]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-[100vh] overflow-hidden relative text-[#F1EAE8] flex flex-col justify-center"
      style={{ backgroundColor: "#4A448C" }}
    >      
      <div className="h-full w-full flex flex-col">
        <ScenarioCard
          key={currentScenario.id}
          scenario={currentScenario}
          userVote={userVotes[currentScenario.id]}
          onVote={(option) => handleVote(currentScenario.id, option)}
          comments={comments[currentScenario.id] || []}
          newComment={newComment}
          onCommentChange={setNewComment}
          onAddComment={() => handleAddComment(currentScenario.id)}
          isFirstScenario={currentScenarioIndex === 0}
          backgroundColor={getBackgroundColor(currentScenarioIndex)}
        />
      </div>
      
      {!userVotes[currentScenario.id] ? (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center text-xs text-[#F1EAE8]/60">
          <span>Vote to continue</span>
        </div>
      ) : (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center text-xs text-[#F1EAE8] bg-[#C7747F] py-2 px-4 rounded-full mx-auto w-fit">
          <ArrowUp className="h-3 w-3 mr-1" />
          <span>Swipe up for next drama</span>
        </div>
      )}
    </div>
  );
};

export default DramaDetox;
