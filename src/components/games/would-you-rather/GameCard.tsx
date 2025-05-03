
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GameCard as GameCardType } from '@/data/would-you-rather-cards';

interface GameCardProps {
  card: GameCardType;
  onSelectOption: (option: 'optionA' | 'optionB') => void;
  onSkip: () => void; // New prop for handling skips
  partnerAnswer?: 'optionA' | 'optionB';
  partnerName: string;
}

const GameCard: React.FC<GameCardProps> = ({ 
  card, 
  onSelectOption,
  onSkip, // New prop for handling skips
  partnerAnswer,
  partnerName 
}) => {
  const [selectedOption, setSelectedOption] = useState<'optionA' | 'optionB' | null>(null);
  const [showingResult, setShowingResult] = useState(false);
  
  const handleSelectOption = (option: 'optionA' | 'optionB') => {
    setSelectedOption(option);
    
    // Brief delay to show animation before moving on
    setTimeout(() => {
      setShowingResult(true);
      
      // If we have partner's answer, show the result for a moment
      if (partnerAnswer) {
        setTimeout(() => {
          onSelectOption(option);
          setSelectedOption(null);
          setShowingResult(false);
        }, 2000); // Show result for 2 seconds
      } else {
        // No partner answer yet, move on quicker
        setTimeout(() => {
          onSelectOption(option);
          setSelectedOption(null);
          setShowingResult(false);
        }, 1000); // Show result for 1 second
      }
    }, 500);
  };
  
  const cardStyle = card.category === 'spicy' 
    ? 'bg-gradient-to-br from-mauve-rose/20 to-mauve-rose/5 border-mauve-rose/40' 
    : 'bg-gradient-to-br from-lavender-blue/30 to-lavender-blue/10 border-lavender-blue/40';
  
  const optionAStyle = selectedOption === 'optionA' 
    ? 'bg-midnight-indigo/90 text-white border-midnight-indigo' 
    : 'bg-white/70 hover:bg-white/90 border-gray-300 hover:border-midnight-indigo/50';
  
  const optionBStyle = selectedOption === 'optionB' 
    ? 'bg-midnight-indigo/90 text-white border-midnight-indigo' 
    : 'bg-white/70 hover:bg-white/90 border-gray-300 hover:border-midnight-indigo/50';

  return (
    <div className={`rounded-xl border-2 ${cardStyle} p-6 shadow-md`}>
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-cormorant font-medium text-midnight-indigo">
          {card.question}
        </h3>
      </div>
      
      <div className="space-y-4">
        <Button
          variant="outline"
          className={`w-full py-6 h-auto text-left justify-start px-4 ${optionAStyle} transition-all break-words whitespace-normal`}
          onClick={() => !selectedOption && handleSelectOption('optionA')}
          disabled={!!selectedOption}
        >
          <span className="text-lg">{card.optionA}</span>
        </Button>
        
        <div className="text-center my-2">— or —</div>
        
        <Button
          variant="outline"
          className={`w-full py-6 h-auto text-left justify-start px-4 ${optionBStyle} transition-all break-words whitespace-normal`}
          onClick={() => !selectedOption && handleSelectOption('optionB')}
          disabled={!!selectedOption}
        >
          <span className="text-lg">{card.optionB}</span>
        </Button>
      </div>
      
      {showingResult && selectedOption && (
        <div className="mt-6 text-center">
          {partnerAnswer ? (
            <div className={`rounded-lg p-3 ${partnerAnswer === selectedOption ? 'bg-green-100' : 'bg-amber-100'}`}>
              <p className="font-medium">
                {partnerAnswer === selectedOption 
                  ? `Match! ${partnerName} chose the same option.` 
                  : `${partnerName} chose the other option.`}
              </p>
            </div>
          ) : (
            <div className="rounded-lg p-3 bg-gray-100">
              <p className="font-medium">
                Stay tuned for {partnerName}'s answer!
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Skip button at the bottom of the card */}
      <div className="flex justify-center mt-5">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-gray-700"
          onClick={onSkip}
          disabled={!!selectedOption}
        >
          Skip this question
        </Button>
      </div>
    </div>
  );
};

export default GameCard;
