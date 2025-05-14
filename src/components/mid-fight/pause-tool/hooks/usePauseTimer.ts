
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PauseStatus } from '../PauseTool';
import { useTimerState } from './usePauseTimer/useTimerState';
import { useRestartMessage } from './usePauseTimer/useRestartMessage';
import { useCodeWordState } from './usePauseTimer/useCodeWordState';
import { showReconnectNotification } from './utils/notificationUtils';
import { syncTimerWithPartner, notifyPartner, sendRestartMessage } from './utils/notificationUtils';
import { formatTimeDisplay } from './utils/timeUtils';

export const usePauseTimer = () => {
  const [pauseStatus, setPauseStatus] = useState<PauseStatus>('setup');
  const [showNotReadyOptions, setShowNotReadyOptions] = useState(false);
  const { toast } = useToast();
  
  // Use smaller, focused hooks
  const { 
    timeRemaining, 
    pauseTimeMinutes, 
    timerActive, 
    setPauseTimeMinutes,
    setTimeRemaining,
    setTimerActive,
    handleTimerSelect,
    handleCustomTimer,
    handleEndPause
  } = useTimerState(pauseStatus, setPauseStatus, toast);

  const {
    restartPhrase,
    showRestartConfirmation,
    setRestartPhrase,
    setShowRestartConfirmation,
    setRestartMessage,
    handleSendRestartMessage,
    handleEditRestartMessage
  } = useRestartMessage(toast);

  const {
    codeWord,
    codeWordEstablished,
    handleChangeCodeWord,
  } = useCodeWordState();

  const handleActivateCodeWord = () => {
    setPauseStatus('activated');
    notifyPartner();
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
