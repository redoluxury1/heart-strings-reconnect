
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Edit, RotateCcw } from 'lucide-react';

// Define the color options
const colorOptions = [
  { bg: "bg-lavender-blue/20", border: "border-lavender-blue/30", hoverBg: "hover:bg-lavender-blue/30" },
  { bg: "bg-mauve-rose/20", border: "border-mauve-rose/30", hoverBg: "hover:bg-mauve-rose/30" },
  { bg: "bg-midnight-indigo/20", border: "border-midnight-indigo/30", hoverBg: "hover:bg-midnight-indigo/30" },
  { bg: "bg-rosewood-tint/20", border: "border-rosewood-tint/30", hoverBg: "hover:bg-rosewood-tint/30" },
  { bg: "bg-soft-cream/20", border: "border-soft-cream/30", hoverBg: "hover:bg-soft-cream/30" },
];

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
  const colorSet = colorOptions[colorIndex % colorOptions.length];
  
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
        <p className="text-sm text-midnight-indigo/70 italic">
          This might feel big. You're doing something important.
        </p>
        <h3 className="text-xl font-cormorant font-medium text-midnight-indigo mt-2">
          Try saying it like this...
        </h3>
      </div>
      
      <div className={`p-4 rounded-lg mb-6 border ${colorSet.bg} ${colorSet.border}`}>
        <p className="text-midnight-indigo mb-3 font-light italic">{currentPhrase}</p>
        
        {/* Why this works - centered below the phrase */}
        <div className="flex justify-center mb-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-lavender-blue justify-center hover:text-mauve-rose px-0"
            onClick={toggleWhyItWorks}
          >
            {showWhyItWorks ? "Hide explanation" : "Why this works"}
          </Button>
        </div>
        
        {showWhyItWorks && (
          <div className="bg-white/70 p-3 rounded-lg mb-3">
            <p className="text-sm text-midnight-indigo/80">
              <span className="font-medium">Why this works:</span> {getWhyItWorksExplanation()}
            </p>
          </div>
        )}
        
        {/* Navigation buttons - moved to bottom and made smaller */}
        <div className="flex justify-center gap-3 mt-4">
          <Button 
            variant="outline"
            size="sm"
            onClick={goToPreviousPhrase}
            className="border-lavender-blue/40 text-midnight-indigo hover:bg-mauve-rose/10 hover:text-mauve-rose hover:border-mauve-rose/40 h-7 px-2 py-0 text-xs"
          >
            <ArrowLeft className="h-3 w-3 mr-1" /> Go back
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={goToNextPhrase}
            className="border-lavender-blue/40 text-midnight-indigo hover:bg-mauve-rose/10 hover:text-mauve-rose hover:border-mauve-rose/40 h-7 px-2 py-0 text-xs"
          >
            Try again <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>
      
      {/* Action buttons for customization and starting over */}
      <div className="flex flex-col items-center gap-3">
        <Button 
          variant="outline" 
          className="text-xs flex items-center gap-1 border-lavender-blue/50 text-lavender-blue hover:bg-lavender-blue/10"
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
