import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import GameCard from './GameCard';
import CategorySelector from './CategorySelector';
import ResultsView from './ResultsView';
import { getCardsByCategory } from '@/data/would-you-rather-cards';
import { GameAnswer, GameState } from '@/types/would-you-rather';
import { toast } from '@/hooks/use-toast';

const WouldYouRatherGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentCategory: 'normal',
    currentCardIndex: 0,
    myAnswers: [],
    partnerAnswers: [],
    partnerName: 'Alex', // This would come from user context in a real app
    showResults: false
  });

  const cards = getCardsByCategory(gameState.currentCategory);
  const currentCard = cards[gameState.currentCardIndex];

  // This would fetch partner answers from an API in a real app
  useEffect(() => {
    // Simulate fetching partner answers
    const mockPartnerAnswers: GameAnswer[] = [
      {
        cardId: 'n1',
        selectedOption: 'optionB',
        answeredAt: new Date().toISOString()
      },
      {
        cardId: 'n3',
        selectedOption: 'optionA',
        answeredAt: new Date().toISOString()
      },
      {
        cardId: 's2',
        selectedOption: 'optionA',
        answeredAt: new Date().toISOString()
      }
    ];

    setGameState(prev => ({
      ...prev,
      partnerAnswers: mockPartnerAnswers
    }));
  }, []);

  const handleSelectCategory = (category: 'normal' | 'spicy') => {
    setGameState({
      ...gameState,
      currentCategory: category,
      currentCardIndex: 0,
      showResults: false
    });
  };

  const handleSelectOption = (option: 'optionA' | 'optionB') => {
    if (!currentCard) return;

    // Record the answer
    const newAnswer: GameAnswer = {
      cardId: currentCard.id,
      selectedOption: option,
      answeredAt: new Date().toISOString()
    };

    const updatedAnswers = [...gameState.myAnswers.filter(a => a.cardId !== currentCard.id), newAnswer];

    // Check if partner has answered this card
    const partnerAnswerForCard = gameState.partnerAnswers.find(a => a.cardId === currentCard.id);
    
    if (partnerAnswerForCard) {
      const isMatch = partnerAnswerForCard.selectedOption === option;
      toast({
        title: isMatch ? "You matched!" : "Different choices!",
        description: isMatch 
          ? `You and ${gameState.partnerName} both chose the same answer.` 
          : `You and ${gameState.partnerName} had different preferences.`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Answer recorded!",
        description: `We'll let you know when ${gameState.partnerName} answers this question.`,
        duration: 3000,
      });
    }

    // Move to the next card or wrap around to the first card
    const nextIndex = (gameState.currentCardIndex + 1) % cards.length;
    
    setGameState({
      ...gameState,
      myAnswers: updatedAnswers,
      currentCardIndex: nextIndex,
    });
  };

  const handleSkip = () => {
    // Move to the next card or wrap around to the first card
    const nextIndex = (gameState.currentCardIndex + 1) % cards.length;
    
    setGameState({
      ...gameState,
      currentCardIndex: nextIndex,
    });
    
    toast({
      title: "Question skipped",
      description: "Moving to the next question",
      duration: 2000,
    });
  };

  const handleViewResults = () => {
    setGameState({
      ...gameState,
      showResults: true
    });
  };

  const handleBackToGame = () => {
    setGameState({
      ...gameState,
      showResults: false
    });
  };

  // If no cards are available for the current category
  if (cards.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="text-2xl font-cormorant font-medium text-midnight-indigo mb-4">No Cards Available</h3>
        <p className="mb-4">There are no cards available for this category yet.</p>
        <CategorySelector 
          currentCategory={gameState.currentCategory} 
          onSelectCategory={handleSelectCategory}
        />
      </div>
    );
  }

  if (gameState.showResults) {
    return (
      <ResultsView 
        myAnswers={gameState.myAnswers}
        partnerAnswers={gameState.partnerAnswers}
        partnerName={gameState.partnerName}
        onBackToGame={handleBackToGame}
      />
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md">
        <CategorySelector 
          currentCategory={gameState.currentCategory} 
          onSelectCategory={handleSelectCategory}
        />
        
        <div className="mt-6 mb-6">
          <div className="text-sm text-gray-500 mb-2 text-center">
            Card {gameState.currentCardIndex + 1} of {cards.length}
          </div>
          
          {currentCard && (
            <GameCard
              card={currentCard}
              onSelectOption={handleSelectOption}
              onSkip={handleSkip} // Add the skip handler
              partnerAnswer={gameState.partnerAnswers.find(a => a.cardId === currentCard.id)?.selectedOption}
              partnerName={gameState.partnerName}
            />
          )}
        </div>
        
        <div className="flex justify-center mt-4">
          <Button
            variant="outline"
            className="border-mauve-rose/70 text-mauve-rose hover:bg-mauve-rose/10"
            onClick={handleViewResults}
          >
            View All Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WouldYouRatherGame;
