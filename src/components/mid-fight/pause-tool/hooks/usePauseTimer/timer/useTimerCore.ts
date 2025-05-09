
import { useState, useEffect } from 'react';
import { PauseStatus } from '../../../PauseTool';
import { 
  getStoredEndTime, 
  getStoredTimerActive, 
  removeTimerPersistence 
} from './timerPersistence';

export const useTimerCore = (
  pauseStatus: PauseStatus, 
  setPauseStatus: React.Dispatch<React.SetStateAction<PauseStatus>>
) => {
  const [pauseTimeMinutes, setPauseTimeMinutes] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);

  // Check for existing timer on load
  useEffect(() => {
    const endTime = getStoredEndTime();
    const savedTimerActive = getStoredTimerActive();
    
    if (endTime && savedTimerActive === 'true') {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      
      setTimerActive(true);
      
      if (remaining > 0) {
        setPauseStatus('in-pause');
        setTimeRemaining(remaining);
      } else {
        // Timer expired
        removeTimerPersistence();
      }
    }
  }, [setPauseStatus]);

  // Active timer effect
  useEffect(() => {
    if (pauseStatus === 'in-pause' && pauseTimeMinutes && timerActive) {
      // Create timer end time
      const endTime = Date.now() + pauseTimeMinutes * 60 * 1000;
      
      const timer = setInterval(() => {
        const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
        setTimeRemaining(remaining);
        
        if (remaining <= 0) {
          clearInterval(timer);
          setPauseStatus('ended');
          
          removeTimerPersistence();
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [pauseStatus, pauseTimeMinutes, timerActive, setPauseStatus]);

  return {
    pauseTimeMinutes,
    timeRemaining,
    timerActive,
    setPauseTimeMinutes,
    setTimeRemaining,
    setTimerActive
  };
};
