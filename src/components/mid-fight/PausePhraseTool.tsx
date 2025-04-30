
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

  const handleFavoritePhrase = (phrase: string) => {
    // In a real app, we would save this to user's favorites
    toast({
      title: "Phrase saved to favorites",
      description: "You can access this later in your saved phrases",
    });
  };

  const handleCustomizePhrase = (phrase: string) => {
    setCustomPhrase(phrase);
    setIsCustomizing(true);
  };

  const handleSaveCustomPhrase = () => {
    toast({
      title: "Custom phrase saved",
      description: "Your personalized phrase is ready to use",
    });
    setIsCustomizing(false);
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
          onBack={() => setIsCustomizing(false)}
          onSave={handleSaveCustomPhrase}
          onStartConversation={handleStartConversation}
        />
      ) : (
        <PhraseSelectionView
          selectedGoal={selectedGoal}
          onBack={() => setStep('goal-selection')}
          onFavoritePhrase={handleFavoritePhrase}
          onCustomizePhrase={handleCustomizePhrase}
        />
      )}

      {/* Start Conversation Dialog */}
      <ConversationDialog
        isOpen={startConversationOpen}
        onOpenChange={setStartConversationOpen}
        partnerName={partnerName}
        onSendInvite={handleSendInvite}
      />
    </div>
  );
};

export default PausePhraseTool;
