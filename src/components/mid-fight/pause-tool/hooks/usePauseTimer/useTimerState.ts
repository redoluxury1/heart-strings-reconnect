
import { useState, useEffect } from 'react';
import { PauseStatus } from '../../PauseTool';
import { saveToLocalStorage, loadFromLocalStorage, removeFromLocalStorage } from '../utils/storageUtils';
import { syncTimerWithPartner } from '../utils/notificationUtils';

export const useTimerState = (
  pauseStatus: PauseStatus, 
  setPauseStatus: React.Dispatch<React.SetStateAction<PauseStatus>>,
  toast: any
) => {
  const [pauseTimeMinutes, setPauseTimeMinutes] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);

  // Check for existing timer on load
  useEffect(() => {
    const savedEndTime = loadFromLocalStorage('bridge-pause-end-time');
    const savedTimerActive = loadFromLocalStorage('bridge-timer-active');
    
    if (savedEndTime && savedTimerActive === 'true') {
      const endTime = parseInt(savedEndTime, 10);
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      
      setTimerActive(true);
      
      if (remaining > 0) {
        setPauseStatus('in-pause');
        setTimeRemaining(remaining);
      } else {
        // Timer expired handling is done in the parent hook
        removeFromLocalStorage('bridge-pause-end-time');
        removeFromLocalStorage('bridge-timer-active');
      }
    }
  }, [setPauseStatus]);

  // Active timer effect
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
          setPauseStatus('ended');
          
          removeFromLocalStorage('bridge-pause-end-time');
          removeFromLocalStorage('bridge-timer-active');
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [pauseStatus, pauseTimeMinutes, timerActive, setPauseStatus]);

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
    removeFromLocalStorage('bridge-pause-end-time');
    removeFromLocalStorage('bridge-timer-active');
  };

  return {
    timeRemaining,
    pauseTimeMinutes,
    timerActive,
    setPauseTimeMinutes,
    setTimeRemaining,
    setTimerActive,
    handleTimerSelect,
    handleCustomTimer,
    handleEndPause
  };
};
