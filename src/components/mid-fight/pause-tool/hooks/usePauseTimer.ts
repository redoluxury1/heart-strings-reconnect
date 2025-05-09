
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';
import { PauseStatus } from '../PauseTool';

export const usePauseTimer = () => {
  // Change back to 'setup' as the initial state
  const [pauseStatus, setPauseStatus] = useState<PauseStatus>('setup');
  const [pauseTimeMinutes, setPauseTimeMinutes] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [restartPhrase, setRestartPhrase] = useState<string | null>(null);
  const [codeWord, setCodeWord] = useState('pause');
  const [showRestartConfirmation, setShowRestartConfirmation] = useState(false);
  const [showNotReadyOptions, setShowNotReadyOptions] = useState(false);

  // Check for existing pause on load
  useEffect(() => {
    const savedEndTime = localStorage.getItem('bridge-pause-end-time');
    const savedTimerActive = localStorage.getItem('bridge-timer-active');
    const savedRestartPhrase = localStorage.getItem('bridge-restart-phrase');
    const savedCodeWord = localStorage.getItem('bridge-code-word');
    
    if (savedRestartPhrase) {
      setRestartPhrase(savedRestartPhrase);
    }
    
    if (savedCodeWord) {
      setCodeWord(savedCodeWord);
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
          showReconnectNotification();
        }
        
        localStorage.removeItem('bridge-pause-end-time');
        localStorage.removeItem('bridge-timer-active');
      }
    }
  }, []);

  // When pause is activated, check if a timer was selected
  useEffect(() => {
    if (pauseStatus === 'in-pause' && pauseTimeMinutes && timerActive) {
      // Convert minutes to milliseconds
      const endTime = Date.now() + pauseTimeMinutes * 60 * 1000;
      
      // Store in localStorage for persistence
      localStorage.setItem('bridge-pause-end-time', endTime.toString());
      localStorage.setItem('bridge-timer-active', 'true');
      
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
            showReconnectNotification();
          }
          
          localStorage.removeItem('bridge-pause-end-time');
          localStorage.removeItem('bridge-timer-active');
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [pauseStatus, pauseTimeMinutes, timerActive, restartPhrase]);

  const handleActivateCodeWord = () => {
    setPauseStatus('activated');
    notifyPartner();
  };

  const handleChangeCodeWord = (word: string) => {
    setCodeWord(word);
    localStorage.setItem('bridge-code-word', word);
  };

  const handleTimerSelect = (minutes: number | null) => {
    if (minutes === null) {
      return;
    }
    
    setPauseTimeMinutes(minutes);
    setPauseStatus('in-pause');
    setTimerActive(true);
    
    toast({
      title: "Timer started",
      description: `Taking a ${minutes} minute pause.`
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
    localStorage.removeItem('bridge-pause-end-time');
    localStorage.removeItem('bridge-timer-active');
    localStorage.removeItem('bridge-restart-phrase');
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
      showReconnectNotification();
    }, 5 * 60 * 1000); // 5 minutes
    
    // Go back to in-pause state for now
    setPauseStatus('in-pause');
    setShowNotReadyOptions(false);
  };
  
  const setRestartMessage = (message: string) => {
    setRestartPhrase(message);
    localStorage.setItem('bridge-restart-phrase', message);
    
    toast({
      title: "Restart message saved",
      description: "Your message will be shown for review when the timer ends."
    });
  };
  
  const handleSendRestartMessage = () => {
    if (restartPhrase) {
      // Send the message to partner
      sendRestartMessage(restartPhrase);
      // Clear the stored restart message
      localStorage.removeItem('bridge-restart-phrase');
      setRestartPhrase(null);
      setShowRestartConfirmation(false);
      
      // Back to activation view
      setPauseStatus('activation');
      
      toast({
        title: "Message sent",
        description: "Your restart message has been sent to your partner."
      });
    }
  };
  
  const handleEditRestartMessage = (message: string) => {
    setRestartPhrase(message);
    localStorage.setItem('bridge-restart-phrase', message);
  };
  
  // This function would be replaced with actual push notification logic in a production app
  const showReconnectNotification = () => {
    // In a real app, this would show a push notification
    toast({
      title: "Time's up—ready to reconnect?",
      description: "Choose a softer way to restart the conversation. Tap to view restart suggestions."
    });
  };
  
  // In a real app, this would send an actual notification
  const notifyPartner = () => {
    console.log("Notifying partner about pause activation");
    // In a real app, this would send a push notification to the partner
  };
  
  // In a real app, this would sync the timer with the partner
  const syncTimerWithPartner = (minutes: number) => {
    console.log(`Syncing ${minutes} minute timer with partner`);
    // In a real app, this would use a real-time database or websocket
  };
  
  // This function would be replaced with actual messaging logic in a production app
  const sendRestartMessage = (message: string) => {
    console.log("Sending restart message to partner:", message);
    toast({
      title: "Restart message sent",
      description: "Your partner has been notified."
    });
  };

  // Format time for display (MM:SS or HH:MM:SS for longer times)
  const formatTime = () => {
    if (!timeRemaining) return '00:00';
    
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    pauseStatus,
    setPauseStatus,
    timeRemaining,
    formatTime,
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
    codeWord
  };
};
