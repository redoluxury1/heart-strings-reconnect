
import React, { useState, useEffect } from 'react';
import CodeWordSetup from '../code-word/CodeWordSetup';
import { useCodeWordState } from '../code-word/hooks/useCodeWordState';
import PauseActivatedView from './PauseActivatedView';
import MidPauseView from './MidPauseView';
import PauseTimerEndView from './PauseTimerEndView';
import CustomTimerView from './CustomTimerView';
import CodeWordActivationView from './CodeWordActivationView';
import PauseToolHeader from './components/PauseToolHeader';
import { usePauseTimer } from './hooks/usePauseTimer';
import { useToast } from '@/hooks/use-toast';

export type PauseStatus = 'setup' | 'activation' | 'activated' | 'custom-timer' | 'in-pause' | 'ended';

const PauseTool = () => {
  const {
    codeWord,
    currentView: codeWordView,
    handleSetCodeWord,
    handleChangeCodeWord,
    userSuggestion,
    setUserSuggestion,
  } = useCodeWordState();
  
  const {
    pauseStatus, 
    setPauseStatus,
    formatTime,
    handleActivateCodeWord,
    handleTimerSelect,
    handleCustomTimer,
    handleEndPause,
    handleViewReconnection,
    handleRemindLater
  } = usePauseTimer();
  
  const { toast } = useToast();

  // Determine initial state based on code word existence
  useEffect(() => {
    if (codeWord && codeWord.status === 'confirmed') {
      setPauseStatus('activation');
    }
  }, [codeWord, setPauseStatus]);

  // Save code word confirmation
  const handleCodeWordConfirm = (word: string) => {
    handleSetCodeWord(word);
    toast({
      title: "Code word locked in",
      description: `We've saved "${word}" as your code word. When you use it in real life, come here to set a timer to cool off.`
    });
  };

  // Render the appropriate view based on current state
  const renderContent = () => {
    if (!codeWord || codeWordView === 'setup') {
      return (
        <CodeWordSetup
          onSetCodeWord={handleCodeWordConfirm}
          initialWord={userSuggestion || ''}
          onWordChange={setUserSuggestion}
        />
      );
    }
    
    switch (pauseStatus) {
      case 'activation':
        return (
          <CodeWordActivationView
            codeWord={codeWord}
            onActivate={handleActivateCodeWord}
            onChangeCodeWord={handleChangeCodeWord}
          />
        );
      case 'activated':
        return (
          <PauseActivatedView
            codeWord={codeWord}
            onTimerSelect={handleTimerSelect}
            onCustomTimer={handleCustomTimer}
          />
        );
      case 'custom-timer':
        return (
          <CustomTimerView
            onTimerSelect={handleTimerSelect}
            onBack={() => setPauseStatus('activated')}
          />
        );
      case 'in-pause':
        return (
          <MidPauseView
            timeRemaining={formatTime()}
            onEndPause={handleEndPause}
          />
        );
      case 'ended':
        return (
          <PauseTimerEndView
            onViewReconnection={handleViewReconnection}
            onNotYet={handleEndPause}
            onRemindLater={handleRemindLater}
          />
        );
      default:
        return (
          <CodeWordSetup
            onSetCodeWord={handleCodeWordConfirm}
            initialWord={userSuggestion || ''}
            onWordChange={setUserSuggestion}
          />
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-lavender-blue/10 mt-6 mb-10">
      <PauseToolHeader />
      {renderContent()}
    </div>
  );
};

export default PauseTool;
