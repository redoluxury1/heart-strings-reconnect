
import { PauseStatus } from '../../../PauseTool';
import { syncTimerWithPartner } from '../../utils/notificationUtils';
import { persistTimerState, removeTimerPersistence } from './timerPersistence';

export interface TimerActionsProps {
  setPauseStatus: React.Dispatch<React.SetStateAction<PauseStatus>>;
  setPauseTimeMinutes: (minutes: number | null) => void;
  setTimeRemaining: (seconds: number | null) => void;
  setTimerActive: (active: boolean) => void;
  toast: any;
}

export const useTimerActions = ({
  setPauseStatus,
  setPauseTimeMinutes,
  setTimeRemaining,
  setTimerActive,
  toast
}: TimerActionsProps) => {
  
  const handleTimerSelect = (minutes: number | null) => {
    if (minutes === null) {
      return;
    }
    
    setPauseTimeMinutes(minutes);
    setPauseStatus('in-pause');
    setTimerActive(true);
    
    // Store in localStorage for persistence
    const endTime = Date.now() + minutes * 60 * 1000;
    persistTimerState(endTime, true);
    
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
    removeTimerPersistence();
  };

  return {
    handleTimerSelect,
    handleCustomTimer,
    handleEndPause
  };
};
