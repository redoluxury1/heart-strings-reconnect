
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SayItBetterPhrase } from '@/data/say-it-better-data';

interface UsePhraseManagementProps {
  allowSave?: boolean;
}

export const usePhraseManagement = ({ allowSave = false }: UsePhraseManagementProps = {}) => {
  const [expandedPhraseId, setExpandedPhraseId] = useState<string | null>(null);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isConversationOpen, setIsConversationOpen] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState<SayItBetterPhrase | null>(null);
  const [customizedPhrase, setCustomizedPhrase] = useState('');
  const { toast } = useToast();

  const handlePhraseClick = (phraseId: string) => {
    setExpandedPhraseId(expandedPhraseId === phraseId ? null : phraseId);
  };

  const handleCustomize = (phrase: SayItBetterPhrase) => {
    setCurrentPhrase(phrase);
    setCustomizedPhrase(phrase.trySayingInstead);
    setIsCustomizeOpen(true);
  };

  const handleStartConversation = () => {
    setIsCustomizeOpen(false);
    setIsConversationOpen(true);
  };

  const handleSavePhrase = (phrase: SayItBetterPhrase) => {
    if (!allowSave) return;
    
    // In a real app, this would save to local storage or database
    toast({
      title: "Phrase Saved",
      description: "This phrase has been saved to your collection.",
    });
    
    // For now, just log it
    console.log('Saved phrase:', phrase);
  };

  return {
    expandedPhraseId,
    isCustomizeOpen,
    isConversationOpen,
    currentPhrase,
    customizedPhrase,
    handlePhraseClick,
    handleCustomize,
    handleStartConversation,
    handleSavePhrase,
    setIsCustomizeOpen,
    setIsConversationOpen,
    setCustomizedPhrase
  };
};
