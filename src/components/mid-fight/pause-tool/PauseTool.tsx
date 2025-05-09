
import React from 'react';
import CodeWordActivationView from './CodeWordActivationView';
import PauseActivatedView from './PauseActivatedView';
import MidPauseView from './MidPauseView';
import PauseTimerEndView from './PauseTimerEndView';
import CustomTimerView from './CustomTimerView';
import PauseToolHeader from './components/PauseToolHeader';
import { usePauseTimer } from './hooks/usePauseTimer';
import CodeWordSetupView from './CodeWordSetupView'; 

export type PauseStatus = 'setup' | 'activation' | 'activated' | 'custom-timer' | 'in-pause' | 'ended';

const PauseTool = () => {
  const {
    pauseStatus,
    setPauseStatus,
    formatTime,
    handleActivateCodeWord,
    handleChangeCodeWord,
    handleTimerSelect,
    handleCustomTimer,
    handleEndPause,
    handleViewReconnection,
    handleRemindLater,
    setRestartMessage,
    codeWord
  } = usePauseTimer();

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {pauseStatus !== 'in-pause' && pauseStatus !== 'ended' && (
        <PauseToolHeader 
          status={pauseStatus}
          onSetupClick={() => setPauseStatus('activation')}
        />
      )}
      
      {pauseStatus === 'setup' && (
        <CodeWordSetupView 
          onGetStarted={() => setPauseStatus('activation')}
        />
      )}
      
      {pauseStatus === 'activation' && (
        <CodeWordActivationView 
          onActivate={handleActivateCodeWord} 
          codeWord={codeWord || ''}
          onChangeCodeWord={handleChangeCodeWord}
        />
      )}
      
      {pauseStatus === 'activated' && (
        <PauseActivatedView 
          onTimerSelect={handleTimerSelect}
          onCustomTimer={handleCustomTimer}
          codeWord={codeWord || "pause"}
        />
      )}
      
      {pauseStatus === 'custom-timer' && (
        <CustomTimerView 
          onTimerSelect={handleTimerSelect}
          onBack={() => setPauseStatus('activated')}
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
