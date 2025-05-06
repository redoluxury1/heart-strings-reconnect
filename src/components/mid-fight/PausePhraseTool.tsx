import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { goals } from '@/data/pause-phrase-goals';
import PhraseSelectionView from './PhraseSelectionView';
import CustomizePhraseView from './CustomizePhraseView';
import ConversationDialog from './ConversationDialog';
import { Goal } from '@/data/pause-phrase-goals';
import PausePhraseGraphic from './PausePhraseGraphic';

interface PausePhraseToolProps {
  onClose: () => void;
}

const PausePhraseTool: React.FC<PausePhraseToolProps> = ({ onClose }) => {
  const [step, setStep] = useState<'goal-selection' | 'phrase-options'>('goal-selection');
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [customPhrase, setCustomPhrase] = useState('');
  const [isCustomizing, setIsCustomizing] = useState(false);
  const { toast } = useToast();
  const [startConversationOpen, setStartConversationOpen] = useState(false);
  const [partnerName, setPartnerName] = useState("your partner"); // In a real app, this would come from user data

  // For colorizing goals in the goal selection view - using our updated color scheme without yellow/orange/green
  const goalColorMap = goals.reduce((acc, goal, index) => {
    acc[goal.id] = index % 5; // Using modulo 5 since we have 5 color options
    return acc;
  }, {} as Record<string, number>);

  const handleGoalSelect = (goal: Goal) => {
    setSelectedGoal(goal);
    setStep('phrase-options');
  };

  const handleBackToTopics = () => {
    if (isCustomizing) {
      // If we were customizing a specific phrase, go back to phrase options
      if (selectedGoal) {
        setIsCustomizing(false);
      } else {
        // If it was "Something else" with no selected goal, go back to topics
        setStep('goal-selection');
      }
    } else {
      setStep('goal-selection');
    }
  };

  const handleCustomizePhrase = (phrase: string) => {
    setCustomPhrase(phrase);
    setIsCustomizing(true);
  };

  const handleStartConversation = () => {
    setStartConversationOpen(true);
  };

  const handleSendInvite = () => {
    toast({
      title: "Message ready",
      description: `Your phrase is ready to share with ${partnerName}.`,
    });
  };

  const handleSomethingElse = () => {
    // For "Something else", go directly to customization with a blank template
    setCustomPhrase("");
    setSelectedGoal(null);
    setIsCustomizing(true);
  };

  const handleStartOver = () => {
    // Reset everything and go back to the first step
    setStep('goal-selection');
    setSelectedGoal(null);
    setCustomPhrase('');
    setIsCustomizing(false);
  };

  return (
    <div className="flex flex-col">
      {step === 'goal-selection' ? (
        <>
          <PausePhraseGraphic />
          <div className="text-center mb-6">
            <p className="text-sm text-midnight-indigo/70">
              You know what you want to say. We'll help you say it in a way they can actually hear.
            </p>
          </div>
          <GoalSelectionView 
            goals={goals.filter(goal => goal.title !== "Say how I feel without blame")}
            onGoalSelect={handleGoalSelect}
            onSomethingElse={handleSomethingElse}
            goalColorMap={goalColorMap}
            onStartConversation={() => {}}
          />
        </>
      ) : isCustomizing ? (
        <CustomizePhraseView
          customPhrase={customPhrase}
          onCustomPhraseChange={setCustomPhrase}
          onBackToTopics={handleStartOver}
          onStartConversation={handleStartConversation}
        />
      ) : (
        <PhraseSelectionView
          selectedGoal={selectedGoal}
          onBack={handleBackToTopics}
          onCustomizePhrase={handleCustomizePhrase}
          colorIndex={selectedGoal ? goalColorMap[selectedGoal.id] : 0}
        />
      )}

      {/* Conversation Dialog - keep for customization flow */}
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

export default PausePhraseTool;
