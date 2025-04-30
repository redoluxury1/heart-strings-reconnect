
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { goals } from '@/data/pause-phrase-goals';
import GoalSelectionView from './GoalSelectionView';
import PhraseSelectionView from './PhraseSelectionView';
import CustomizePhraseView from './CustomizePhraseView';
import ConversationDialog from './ConversationDialog';
import { Goal } from '@/data/pause-phrase-goals';

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

  const handleGoalSelect = (goal: Goal) => {
    setSelectedGoal(goal);
    setStep('phrase-options');
  };

  const handleBackToTopics = () => {
    if (isCustomizing) {
      setIsCustomizing(false);
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
      title: "Conversation request sent",
      description: `${partnerName} will be notified that you want to talk things through.`,
    });
    setStartConversationOpen(false);
  };

  const handleSomethingElse = () => {
    setCustomPhrase("I'd like to talk about something that's been on my mind...");
    setIsCustomizing(true);
  };

  return (
    <div className="flex flex-col">
      {step === 'goal-selection' ? (
        <GoalSelectionView 
          goals={goals}
          onGoalSelect={handleGoalSelect}
          onStartConversation={handleStartConversation}
          onSomethingElse={handleSomethingElse}
        />
      ) : isCustomizing ? (
        <CustomizePhraseView
          customPhrase={customPhrase}
          onCustomPhraseChange={setCustomPhrase}
          onBackToTopics={handleBackToTopics}
          onStartConversation={handleStartConversation}
        />
      ) : (
        <PhraseSelectionView
          selectedGoal={selectedGoal}
          onBack={handleBackToTopics}
          onCustomizePhrase={handleCustomizePhrase}
        />
      )}

      {/* Start Conversation Dialog */}
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
