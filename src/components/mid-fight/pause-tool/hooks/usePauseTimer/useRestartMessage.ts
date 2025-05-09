
import { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage, removeFromLocalStorage } from '../utils/storageUtils';
import { sendRestartMessage } from '../utils/notificationUtils';

export const useRestartMessage = (toast: any) => {
  const [restartPhrase, setRestartPhrase] = useState<string | null>(null);
  const [showRestartConfirmation, setShowRestartConfirmation] = useState(false);

  // Load saved restart phrase
  useEffect(() => {
    const savedRestartPhrase = loadFromLocalStorage('bridge-restart-phrase');
    
    if (savedRestartPhrase) {
      setRestartPhrase(savedRestartPhrase);
    }
  }, []);

  const setRestartMessage = (message: string) => {
    setRestartPhrase(message);
    saveToLocalStorage('bridge-restart-phrase', message);
    
    toast({
      title: "Your message will be shown for review when the timer ends."
    });
  };
  
  const handleSendRestartMessage = () => {
    if (restartPhrase) {
      // Send the message to partner
      sendRestartMessage(restartPhrase, toast);
      // Clear the stored restart message
      removeFromLocalStorage('bridge-restart-phrase');
      setRestartPhrase(null);
      setShowRestartConfirmation(false);
    }
  };
  
  const handleEditRestartMessage = (message: string) => {
    setRestartPhrase(message);
    saveToLocalStorage('bridge-restart-phrase', message);
  };

  return {
    restartPhrase,
    showRestartConfirmation,
    setRestartPhrase,
    setShowRestartConfirmation,
    setRestartMessage,
    handleSendRestartMessage,
    handleEditRestartMessage
  };
};
