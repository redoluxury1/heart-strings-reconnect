
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PauseStatus } from '../PauseTool';
import { 
  saveToLocalStorage, 
  loadFromLocalStorage, 
  removeFromLocalStorage 
} from './utils/storageUtils';
import { 
  showReconnectNotification,
  notifyPartner,
  syncTimerWithPartner,
  sendRestartMessage 
} from './utils/notificationUtils';
import { formatTimeDisplay } from './utils/timeUtils';

export const usePauseTimer = () => {
  const [pauseStatus, setPauseStatus] = useState<PauseStatus>('setup');
  const [pauseTimeMinutes, setPauseTimeMinutes] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [restartPhrase, setRestartPhrase] = useState<string | null>(null);
  const [codeWord, setCodeWord] = useState('pause');
  const [showRestartConfirmation, setShowRestartConfirmation] = useState(false);
  const [showNotReadyOptions, setShowNotReadyOptions] = useState(false);
  const [codeWordEstablished, setCodeWordEstablished] = useState(false);
  const { toast } = useToast();

  // Check for existing pause on load
  useEffect(() => {
    const savedEndTime = loadFromLocalStorage('bridge-pause-end-time');
    const savedTimerActive = loadFromLocalStorage('bridge-timer-active');
    const savedRestartPhrase = loadFromLocalStorage('bridge-restart-phrase');
    const savedCodeWord = loadFromLocalStorage('bridge-code-word');
    const savedCodeWordEstablished = loadFromLocalStorage('bridge-code-word-established');
    
    if (savedRestartPhrase) {
      setRestartPhrase(savedRestartPhrase);
    }
    
    if (savedCodeWord) {
      setCodeWord(savedCodeWord);
    }
    
    if (savedCodeWordEstablished === 'true') {
      setCodeWordEstablished(true);
    }
    
    if (savedEndTime && savedTimerActive === 'true') {
      const endTime = parseInt(savedEndTime, 10);
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      
      setTimerActive(true);
      
      if (remaining > 0) {
        setPauseStatus('in-pause');
        setTimeRemaining(remaining);
      } else {
        // If there's a restart phrase, show confirmation instead of 'ended'
        if (savedRestartPhrase) {
          setPauseStatus('confirm-restart');
          setShowRestartConfirmation(true);
        } else {
          setPauseStatus('ended');
          // Show notification prompt to reconnect
          showReconnectNotification(toast);
        }
        
        removeFromLocalStorage('bridge-pause-end-time');
        removeFromLocalStorage('bridge-timer-active');
      }
    }
  }, [toast]);

  // When pause is activated, check if a timer was selected
  useEffect(() => {
    if (pauseStatus === 'in-pause' && pauseTimeMinutes && timerActive) {
      // Convert minutes to milliseconds
      const endTime = Date.now() + pauseTimeMinutes * 60 * 1000;
      
      // Store in localStorage for persistence
      saveToLocalStorage('bridge-pause-end-time', endTime.toString());
      saveToLocalStorage('bridge-timer-active', 'true');
      
      const timer = setInterval(() => {
        const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
        setTimeRemaining(remaining);
        
        if (remaining <= 0) {
          clearInterval(timer);
          
          // If there's a restart phrase, show the confirmation dialog
          if (restartPhrase) {
            setPauseStatus('confirm-restart');
            setShowRestartConfirmation(true);
          } else {
            setPauseStatus('ended');
            // Show notification prompt to reconnect
            showReconnectNotification(toast);
          }
          
          removeFromLocalStorage('bridge-pause-end-time');
          removeFromLocalStorage('bridge-timer-active');
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [pauseStatus, pauseTimeMinutes, timerActive, restartPhrase, toast]);

  const handleActivateCodeWord = () => {
    setPauseStatus('activated');
    notifyPartner();
  };

  const handleChangeCodeWord = (word: string) => {
    setCodeWord(word);
    saveToLocalStorage('bridge-code-word', word);
    setCodeWordEstablished(true);
    saveToLocalStorage('bridge-code-word-established', 'true');
  };

  const handleTimerSelect = (minutes: number | null) => {
    if (minutes === null) {
      return;
    }
    
    setPauseTimeMinutes(minutes);
    setPauseStatus('in-pause');
    setTimerActive(true);
    
    toast({
      title: `Taking a ${minutes} minute pause.`
    });
    
    // This would sync the timer with the partner
    syncTimerWithPartner(minutes);
  };
  
  const handleCustomTimer = () => {
    setPauseStatus('custom-timer');
  };

  const handleEndPause = () => {
    setPauseStatus('activation');
    setPauseTimeMinutes(null);
    setTimeRemaining(null);
    setTimerActive(false);
    setShowRestartConfirmation(false);
    removeFromLocalStorage('bridge-pause-end-time');
    removeFromLocalStorage('bridge-timer-active');
    removeFromLocalStorage('bridge-restart-phrase');
    setRestartPhrase(null);
  };

  const handleViewReconnection = () => {
    // In a real implementation, this would navigate to reconnection tools
    console.log('Navigating to reconnection starters');
  };

  const handleNotReadyYet = () => {
    setShowNotReadyOptions(true);
    setPauseStatus('not-ready');
  };

  const handleRemindLater = () => {
    // Set a short timeout to remind again
    setTimeout(() => {
      setPauseStatus('ended');
      // Show notification prompt to reconnect
      showReconnectNotification(toast);
    }, 5 * 60 * 1000); // 5 minutes
    
    // Go back to in-pause state for now
    setPauseStatus('in-pause');
    setShowNotReadyOptions(false);
  };
  
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
      
      // Back to activation view
      setPauseStatus('activation');
    }
  };
  
  const handleEditRestartMessage = (message: string) => {
    setRestartPhrase(message);
    saveToLocalStorage('bridge-restart-phrase', message);
  };

  return {
    pauseStatus,
    setPauseStatus,
    timeRemaining,
    formatTime: () => formatTimeDisplay(timeRemaining),
    handleActivateCodeWord,
    handleChangeCodeWord,
    handleTimerSelect,
    handleCustomTimer,
    handleEndPause,
    handleViewReconnection,
    handleRemindLater,
    handleNotReadyYet,
    restartPhrase,
    setRestartMessage,
    handleSendRestartMessage,
    handleEditRestartMessage,
    showRestartConfirmation,
    setShowRestartConfirmation,
    showNotReadyOptions,
    setShowNotReadyOptions,
    codeWord,
    codeWordEstablished
  };
};
