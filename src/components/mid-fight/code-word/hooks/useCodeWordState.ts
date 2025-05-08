
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CodeWordInfo } from '@/types/relationship';
import { useInterface } from '@/hooks/useInterfaceContext';

export type CodeWordStatus = 'setup' | 'sync' | 'usage' | 'cool-down' | 'negotiation' | 'confirmation';

// Mock data for demonstration purposes (would be replaced with real data from API)
const mockRelationship = {
  id: 'rel-123',
  codeWord: null
};

export const useCodeWordState = () => {
  const [codeWord, setCodeWord] = useState<CodeWordInfo | null>(mockRelationship.codeWord);
  const [currentView, setCurrentView] = useState<CodeWordStatus>(codeWord ? 'usage' : 'setup');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [partnerWord, setPartnerWord] = useState<string | null>(null);
  const [hasNotification, setHasNotification] = useState(false);
  const [userSuggestion, setUserSuggestion] = useState<string | null>(null);
  const { toast } = useToast();
  const { partnerStatus } = useInterface();
  
  // This would be based on authentication in a real implementation
  const currentUserId = "user-123";
  
  // Load code word data from localStorage for demo purposes
  // In a real app, this would be from an API or real-time database
  useEffect(() => {
    const savedCodeWord = localStorage.getItem('bridge-code-word');
    if (savedCodeWord) {
      try {
        const parsedCodeWord = JSON.parse(savedCodeWord);
        setCodeWord(parsedCodeWord);
        
        // Show appropriate view based on code word status
        if (parsedCodeWord.status === 'pending' && parsedCodeWord.updatedBy !== currentUserId) {
          // Partner has set a word that needs confirmation
          setPartnerWord(parsedCodeWord.word);
          setCurrentView('sync');
          setHasNotification(true);
        } else if (parsedCodeWord.status === 'negotiation') {
          // Both suggested different words and need to reach agreement
          if (parsedCodeWord.partnerSuggestion && parsedCodeWord.updatedBy !== currentUserId) {
            setPartnerWord(parsedCodeWord.partnerSuggestion);
            setCurrentView('sync');
            setHasNotification(true);
          } else {
            setCurrentView('usage');
          }
        } else if (parsedCodeWord.status === 'confirmed') {
          // Word is confirmed by both
          setCurrentView('usage');
        }
      } catch (e) {
        console.error("Error loading code word data:", e);
      }
    }
  }, [currentUserId]);
  
  // Save changes to localStorage for demo purposes
  // In a real app, this would save to an API or database
  useEffect(() => {
    if (codeWord) {
      localStorage.setItem('bridge-code-word', JSON.stringify(codeWord));
    }
  }, [codeWord]);
  
  const handleSetCodeWord = (word: string) => {
    // In a real app, this would send to backend and update relationship
    const newCodeWord: CodeWordInfo = {
      word,
      updatedAt: new Date(),
      updatedBy: currentUserId,
      status: partnerStatus === 'couple' ? 'pending' : 'confirmed', // If solo user, auto-confirm
    };
    
    setCodeWord(newCodeWord);
    
    // If this is the first time setting a code word or confirming partner's word,
    // show the confirmation screen
    if (!codeWord || (codeWord.status !== 'confirmed' && newCodeWord.status === 'confirmed')) {
      setCurrentView('confirmation');
    } else {
      setCurrentView('usage');
    }
    
    setUserSuggestion(null);
    
    // Close dialog if open
    setIsDialogOpen(false);
  };
  
  const handlePartnerSuggestion = (suggestedWord: string) => {
    setPartnerWord(suggestedWord);
    setCurrentView('sync');
    setHasNotification(false);
  };
  
  const handleConfirmPartnerWord = () => {
    if (partnerWord && codeWord) {
      // Update the code word to the partner's suggestion
      const updatedCodeWord: CodeWordInfo = {
        ...codeWord,
        word: partnerWord,
        status: 'confirmed',
        updatedAt: new Date()
      };
      
      setCodeWord(updatedCodeWord);
      setCurrentView('confirmation'); // Show the confirmation screen
      setPartnerWord(null);
      setHasNotification(false);
    }
  };
  
  const handleRejectPartnerWord = () => {
    // Enter negotiation mode by suggesting a new word
    setCurrentView('setup');
    setPartnerWord(null);
    
    // If we're already in a code word workflow, mark it as in negotiation
    if (codeWord) {
      const updatedCodeWord: CodeWordInfo = {
        ...codeWord,
        status: 'negotiation',
        updatedAt: new Date(),
        userSuggestion: userSuggestion
      };
      setCodeWord(updatedCodeWord);
    }
    
    toast({
      title: "Suggest a new word",
      description: "Please suggest a new code word for you and your partner to agree on.",
    });
  };
  
  const handleCodeWordUsed = () => {
    setIsDialogOpen(true);
    
    // In a real app, this would notify the partner
    // and potentially update status in the database
  };
  
  const handleChangeCodeWord = () => {
    setCurrentView('setup');
    setUserSuggestion(null);
  };
  
  const handleConfirmationClose = () => {
    setCurrentView('usage');
    
    toast({
      title: "Code word confirmed",
      description: codeWord ? `'${codeWord.word}' is now your shared code word.` : "",
    });
  };

  // This simulates a partner suggesting a word (for demo purposes)
  const simulatePartnerSuggestion = () => {
    const partnerWords = ['Butterfly', 'Timeout', 'Breather', 'Reset', 'Pause'];
    const randomWord = partnerWords[Math.floor(Math.random() * partnerWords.length)];
    handlePartnerSuggestion(randomWord);
  };
  
  return {
    codeWord,
    currentView,
    isDialogOpen,
    partnerWord,
    hasNotification,
    userSuggestion,
    currentUserId,
    partnerId: "user-456",
    setUserSuggestion,
    handleSetCodeWord,
    handlePartnerSuggestion,
    handleConfirmPartnerWord,
    handleRejectPartnerWord,
    handleCodeWordUsed,
    handleChangeCodeWord,
    handleConfirmationClose,
    setIsDialogOpen,
    simulatePartnerSuggestion
  };
};
