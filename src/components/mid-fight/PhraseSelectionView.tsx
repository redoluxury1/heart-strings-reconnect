
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Edit, RotateCcw } from 'lucide-react';

interface PhraseSelectionViewProps {
  selectedGoal: {
    id: string;
    title: string;
    phrases: string[];
  } | null;
  onBack: () => void;
  onCustomizePhrase: (phrase: string) => void;
  colorIndex?: number;
}

const PhraseSelectionView: React.FC<PhraseSelectionViewProps> = ({
  selectedGoal,
  onBack,
  onCustomizePhrase,
  colorIndex = 0
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [showWhyItWorks, setShowWhyItWorks] = useState(false);
  
  // No phrases or invalid index
  if (!selectedGoal || !selectedGoal.phrases.length) {
    return (
      <div className="text-center py-4">
        <p>No phrases available</p>
        <Button variant="outline" onClick={onBack} className="mt-4">
          Go back
        </Button>
      </div>
    );
  }
  
  const currentPhrase = selectedGoal.phrases[currentPhraseIndex];
  const phrasesCount = selectedGoal.phrases.length;
  
  const goToNextPhrase = () => {
    setCurrentPhraseIndex((prev) => (prev + 1) % phrasesCount);
    setShowWhyItWorks(false);
  };
  
  const goToPreviousPhrase = () => {
    setCurrentPhraseIndex((prev) => (prev - 1 + phrasesCount) % phrasesCount);
    setShowWhyItWorks(false);
  };
  
  const toggleWhyItWorks = () => {
    setShowWhyItWorks(!showWhyItWorks);
  };
  
  // Sample why-it-works explanations based on goal type
  const getWhyItWorksExplanation = () => {
    const goalId = selectedGoal?.id;
    
    switch (goalId) {
      case 'ask-for-space':
        return "This phrase clearly states your need without blaming your partner. It includes a timeframe so they don't feel abandoned.";
      case 'say-what-hurt':
        return "This focuses on your feelings without accusation. Using 'I felt' instead of 'You made me feel' avoids triggering defensiveness.";
      case 'explain-meant':
        return "This acknowledges potential miscommunication and takes responsibility for clarifying, which helps de-escalate tension.";
      case 'apologize':
        return "This takes full responsibility without excuses, which helps rebuild trust and shows genuine remorse.";
      case 'express-need':
        return "This clearly states what you need without demanding, and invites your partner to respond rather than comply.";
      case 'ask-question':
        return "This opens dialogue without assuming you know their thoughts, showing genuine curiosity rather than interrogation.";
      case 'share-fear':
        return "Showing vulnerability helps your partner understand the deeper concerns behind your words, fostering empathy.";
      case 'acknowledge-pattern':
        return "This acknowledges a cycle without blame, and focuses on creating solutions together.";
      case 'suggest-solution':
        return "This presents compromise as a mutual goal rather than a concession, emphasizing teamwork.";
      case 'set-boundary':
        return "This establishes limits while reinforcing commitment to the relationship, ensuring boundaries feel like protection, not rejection.";
      case 'request-appreciation':
        return "This asks for what you need in a positive way, focusing on connection rather than criticism.";
      default:
        return "This phrasing helps communicate your message clearly while maintaining connection.";
    }
  };

  return (
    <>
      <div className="mb-4">
        <p className="text-sm text-mauve-rose italic">
          This might feel big. You're doing something important.
        </p>
        <h3 className="text-xl font-cormorant font-semibold text-[#07183D] mt-2">
          Try saying it like this...
        </h3>
      </div>
      
      <div className="p-5 rounded-lg mb-6 border border-mauve-rose/40 bg-white/80">
        <p className="text-[#07183D] mb-3 font-light italic text-base">{currentPhrase}</p>
        
        {/* Why this works - centered below the phrase */}
        <div className="flex justify-center mb-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-mauve-rose justify-center hover:text-mauve-rose/80 px-0"
            onClick={toggleWhyItWorks}
          >
            {showWhyItWorks ? "Hide explanation" : "Why this works"}
          </Button>
        </div>
        
        {showWhyItWorks && (
          <div className="border border-mauve-rose/20 bg-white/50 p-3 rounded-lg mb-3">
            <p className="text-sm text-[#07183D] mb-1">
              <span className="font-medium">Why this works:</span> 
            </p>
            <p className="text-sm text-[#07183D]">
              {getWhyItWorksExplanation()}
            </p>
          </div>
        )}
        
        {/* Navigation buttons - moved to bottom and made smaller */}
        <div className="flex justify-center gap-3 mt-5">
          <Button 
            variant="outline"
            size="sm"
            onClick={goToPreviousPhrase}
            className="border-mauve-rose/40 text-[#07183D] hover:bg-mauve-rose/10 hover:text-mauve-rose hover:border-mauve-rose/40 h-7 px-2 py-0 text-xs"
          >
            <ArrowLeft className="h-3 w-3 mr-1" /> Go back
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={goToNextPhrase}
            className="border-mauve-rose/40 text-[#07183D] hover:bg-mauve-rose/10 hover:text-mauve-rose hover:border-mauve-rose/40 h-7 px-2 py-0 text-xs"
          >
            Try again <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>
      
      {/* Action buttons for customization and starting over */}
      <div className="flex flex-col items-center gap-3">
        <Button 
          variant="default" 
          className="text-sm flex items-center gap-1 bg-[#536878] hover:bg-[#536878]/90 text-white"
          onClick={() => onCustomizePhrase(currentPhrase)}
        >
          <Edit className="h-3.5 w-3.5" />
          <span>Customize</span>
        </Button>
        
        <Button 
          variant="ghost"
          size="sm" 
          className="text-xs flex items-center text-midnight-indigo/70 hover:text-mauve-rose"
          onClick={onBack}
        >
          <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
          <span>Start over</span>
        </Button>
      </div>
    </>
  );
};

export default PhraseSelectionView;
