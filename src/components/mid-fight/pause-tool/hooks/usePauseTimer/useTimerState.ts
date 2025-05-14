
import { PauseStatus } from '../../PauseTool';
import { useTimerCore } from './timer/useTimerCore';
import { useTimerActions } from './timer/useTimerActions';

export const useTimerState = (
  pauseStatus: PauseStatus, 
  setPauseStatus: React.Dispatch<React.SetStateAction<PauseStatus>>,
  toast: any
) => {
  const {
    pauseTimeMinutes,
    timeRemaining,
    timerActive,
    setPauseTimeMinutes,
    setTimeRemaining,
    setTimerActive
  } = useTimerCore(pauseStatus, setPauseStatus);

  const {
    handleTimerSelect,
    handleCustomTimer,
    handleEndPause
  } = useTimerActions({
    setPauseStatus,
    setPauseTimeMinutes,
    setTimeRemaining,
    setTimerActive,
    toast
  });

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
