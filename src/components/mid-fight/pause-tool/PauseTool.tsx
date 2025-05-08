
import React, { useState, useEffect } from 'react';
import CodeWordSetup from '../code-word/CodeWordSetup';
import { useCodeWordState } from '../code-word/hooks/useCodeWordState';
import PauseActivatedView from './PauseActivatedView';
import MidPauseView from './MidPauseView';
import PauseTimerEndView from './PauseTimerEndView';
import CustomTimerView from './CustomTimerView';
import CodeWordActivationView from './CodeWordActivationView';
import { CodeWordInfo } from '@/types/relationship';
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
  
  const [pauseStatus, setPauseStatus] = useState<PauseStatus>('setup');
  const [pauseTimeMinutes, setPauseTimeMinutes] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const { toast } = useToast();

  // Determine initial state based on code word existence
  useEffect(() => {
    if (codeWord && codeWord.status === 'confirmed') {
      setPauseStatus('activation');
    }
  }, [codeWord]);

  // Save code word confirmation
  const handleCodeWordConfirm = (word: string) => {
    handleSetCodeWord(word);
    toast({
      title: "Code word locked in",
      description: `We've saved "${word}" as your code word. When you use it in real life, come here to set a timer to cool off.`
    });
  };

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
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [pauseStatus, pauseTimeMinutes, timerActive]);

  // Check for existing pause on load
  useEffect(() => {
    const savedEndTime = localStorage.getItem('bridge-pause-end-time');
    const savedTimerActive = localStorage.getItem('bridge-timer-active');
    
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
      }
    }
  }, []);

  const handleActivateCodeWord = () => {
    setPauseStatus('activated');
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
    setPauseStatus(codeWord?.status === 'confirmed' ? 'activation' : 'setup');
    setPauseTimeMinutes(null);
    setTimeRemaining(null);
    setTimerActive(false);
    localStorage.removeItem('bridge-pause-end-time');
    localStorage.removeItem('bridge-timer-active');
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
      <h2 className="text-5xl md:text-6xl font-cormorant text-[#5d4357] font-medium text-center mb-6">
        Code Word + Time Out
      </h2>
      <p className="text-xl md:text-2xl font-cormorant text-[#5d4357] mt-4 mb-10 text-center">
        Use your code word or take a break when things get heated.
      </p>
      
      {renderContent()}
    </div>
  );
};

export default PauseTool;
