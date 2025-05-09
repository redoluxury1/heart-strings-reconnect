
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PauseStatus } from '../PauseTool';

export const usePauseTimer = () => {
  const [pauseStatus, setPauseStatus] = useState<PauseStatus>('setup');
  const [pauseTimeMinutes, setPauseTimeMinutes] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [restartPhrase, setRestartPhrase] = useState<string | null>(null);
  const [codeWord, setCodeWord] = useState('pause');
  const { toast } = useToast();

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
        setPauseStatus('ended');
        localStorage.removeItem('bridge-pause-end-time');
        localStorage.removeItem('bridge-timer-active');
        if (savedRestartPhrase) {
          sendRestartNotification(savedRestartPhrase);
          localStorage.removeItem('bridge-restart-phrase');
          setRestartPhrase(null);
        }
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
          setPauseStatus('ended');
          localStorage.removeItem('bridge-pause-end-time');
          localStorage.removeItem('bridge-timer-active');
          
          // Send the restart phrase notification if one exists
          if (restartPhrase) {
            sendRestartNotification(restartPhrase);
            localStorage.removeItem('bridge-restart-phrase');
            setRestartPhrase(null);
          }
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [pauseStatus, pauseTimeMinutes, timerActive, restartPhrase]);

  const handleActivateCodeWord = () => {
    setPauseStatus('activated');
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
  };
  
  const handleCustomTimer = () => {
    setPauseStatus('custom-timer');
  };

  const handleEndPause = () => {
    setPauseStatus('activation');
    setPauseTimeMinutes(null);
    setTimeRemaining(null);
    setTimerActive(false);
    localStorage.removeItem('bridge-pause-end-time');
    localStorage.removeItem('bridge-timer-active');
    localStorage.removeItem('bridge-restart-phrase');
    setRestartPhrase(null);
  };

  const handleViewReconnection = () => {
    // In a real implementation, this would navigate to reconnection tools
    console.log('Navigating to reconnection starters');
  };

  const handleRemindLater = () => {
    // Set a short timeout to remind again
    setTimeout(() => {
      setPauseStatus('ended');
    }, 5 * 60 * 1000); // 5 minutes
    
    // Go back to in-pause state for now
    setPauseStatus('in-pause');
  };
  
  const setRestartMessage = (message: string) => {
    setRestartPhrase(message);
    localStorage.setItem('bridge-restart-phrase', message);
    
    toast({
      title: "Restart message saved",
      description: "Your message will be sent when the timer ends."
    });
  };
  
  // This function would be replaced with actual push notification logic in a production app
  const sendRestartNotification = (message: string) => {
    console.log("Sending restart message to partner:", message);
    toast({
      title: "Restart message sent",
      description: "Your partner has been notified."
    });
    // In a real implementation, this would send a push notification to the partner
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
    restartPhrase,
    setRestartMessage,
    codeWord
  };
};
