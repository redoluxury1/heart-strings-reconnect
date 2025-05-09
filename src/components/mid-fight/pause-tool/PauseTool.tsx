
import React from 'react';
import CodeWordActivationView from './CodeWordActivationView';
import PauseActivatedView from './PauseActivatedView';
import MidPauseView from './MidPauseView';
import PauseTimerEndView from './PauseTimerEndView';
import CustomTimerView from './CustomTimerView';
import PauseToolHeader from './components/PauseToolHeader';
import { usePauseTimer } from './hooks/usePauseTimer';

export type PauseStatus = 'setup' | 'activation' | 'activated' | 'custom-timer' | 'in-pause' | 'ended';

const PauseTool = () => {
  const {
    pauseStatus,
    setPauseStatus,
    formatTime,
    handleActivateCodeWord,
    handleTimerSelect,
    handleCustomTimer,
    handleEndPause,
    handleViewReconnection,
    handleRemindLater,
    setRestartMessage
  } = usePauseTimer();

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {pauseStatus !== 'in-pause' && pauseStatus !== 'ended' && (
        <PauseToolHeader 
          currentStatus={pauseStatus}
          onSetupClick={() => setPauseStatus('setup')}
        />
      )}
      
      {pauseStatus === 'activation' && (
        <CodeWordActivationView 
          onActivateWord={handleActivateCodeWord} 
        />
      )}
      
      {pauseStatus === 'activated' && (
        <PauseActivatedView 
          onTimerSelect={handleTimerSelect}
          onCustomTimer={handleCustomTimer}
        />
      )}
      
      {pauseStatus === 'custom-timer' && (
        <CustomTimerView 
          onTimerSelect={handleTimerSelect}
        />
      )}
      
      {pauseStatus === 'in-pause' && (
        <MidPauseView 
          timeRemaining={formatTime()} 
          onEndPause={handleEndPause}
          setRestartMessage={setRestartMessage}
        />
      )}
      
      {pauseStatus === 'ended' && (
        <PauseTimerEndView 
          onViewReconnection={handleViewReconnection}
          onNotYet={handleEndPause}
          onRemindLater={handleRemindLater}
          setRestartMessage={setRestartMessage}
        />
      )}
    </div>
  );
};

export default PauseTool;
