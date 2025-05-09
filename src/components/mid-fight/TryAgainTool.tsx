
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { goals } from '@/data/pause-phrase-goals';
import PhraseSelectionView from './PhraseSelectionView';
import CustomizePhraseView from './CustomizePhraseView';
import ConversationDialog from './ConversationDialog';
import { Goal } from '@/data/pause-phrase-goals';
import TryAgainGraphic from './TryAgainGraphic';
import GoalSelectionView from './GoalSelectionView';
import CompactTryAgain from './CompactTryAgain';

interface TryAgainToolProps {
  onClose: () => void;
}

const TryAgainTool: React.FC<TryAgainToolProps> = ({ onClose }) => {
  const [step, setStep] = useState<'goal-selection' | 'phrase-options' | 'customize'>('goal-selection');
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [customPhrase, setCustomPhrase] = useState('');
  const { toast } = useToast();
  const [startConversationOpen, setStartConversationOpen] = useState(false);
  const [partnerName, setPartnerName] = useState("your partner"); 
  const [useCompactView, setUseCompactView] = useState(true); 

  // For colorizing goals in the goal selection view
  const goalColorMap = goals.reduce((acc, goal, index) => {
    acc[goal.id] = index % 5; // Using modulo 5 since we have 5 color options
    return acc;
  }, {} as Record<string, number>);

  const handleGoalSelect = (goalId: string) => {
    // Find the goal by id
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      setSelectedGoal(goal);
      setStep('phrase-options');
    }
  };

  const handleBackToTopics = () => {
    setStep('goal-selection');
    setSelectedGoal(null);
  };

  const handleCustomizePhrase = (phrase: string) => {
    setCustomPhrase(phrase);
    setStep('customize');
  };

  const handleStartConversation = () => {
    setStartConversationOpen(true);
  };

  const handleSendInvite = () => {
    toast({
      description: `Your phrase is ready to share with ${partnerName}.`,
    });
  };

  const handleSomethingElse = () => {
    // For "Something else", go directly to customization with a blank template
    setCustomPhrase("");
    setSelectedGoal(null);
    setStep('customize');
  };

  const handleStartOver = () => {
    // Reset everything and go back to the first step
    setStep('goal-selection');
    setSelectedGoal(null);
    setCustomPhrase('');
  };

  // Show the appropriate view based on the current step
  const renderCurrentView = () => {
    if (step === 'goal-selection') {
      return (
        <CompactTryAgain 
          onCategorySelect={handleGoalSelect} 
          onSomethingElse={handleSomethingElse}
        />
      );
    } else if (step === 'phrase-options' && selectedGoal) {
      return (
        <PhraseSelectionView
          selectedGoal={selectedGoal}
          onBack={handleBackToTopics}
          onCustomizePhrase={handleCustomizePhrase}
          colorIndex={selectedGoal ? goalColorMap[selectedGoal.id] : 0}
        />
      );
    } else if (step === 'customize') {
      return (
        <CustomizePhraseView
          customPhrase={customPhrase}
          onCustomPhraseChange={setCustomPhrase}
          onBackToTopics={handleStartOver}
          onStartConversation={handleStartConversation}
        />
      );
    }
    
    // Fallback to goal selection
    return (
      <CompactTryAgain
        onCategorySelect={handleGoalSelect} 
        onSomethingElse={handleSomethingElse}
      />
    );
  };

  return (
    <div className="flex flex-col">
      {renderCurrentView()}
      
      {/* Conversation Dialog */}
      <ConversationDialog
        isOpen={startConversationOpen}
        onOpenChange={setStartConversationOpen}
        partnerName={partnerName}
        onSendInvite={handleSendInvite}
        topicId={selectedGoal?.id || 'something-else'}
      />
    </div>
  );
};

export default TryAgainTool;
