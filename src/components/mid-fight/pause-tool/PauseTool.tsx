
import React, { useState, useEffect } from 'react';
import CodeWordSetup from '../code-word/CodeWordSetup';
import { useCodeWordState } from '../code-word/hooks/useCodeWordState';
import PauseActivatedView from './PauseActivatedView';
import MidPauseView from './MidPauseView';
import PauseTimerEndView from './PauseTimerEndView';
import { CodeWordInfo } from '@/types/relationship';

export type PauseStatus = 'setup' | 'activated' | 'in-pause' | 'ended';

const PauseTool = () => {
  const {
    codeWord,
    currentView: codeWordView,
    handleSetCodeWord,
    userSuggestion,
    setUserSuggestion,
  } = useCodeWordState();
  
  const [pauseStatus, setPauseStatus] = useState<PauseStatus>('setup');
  const [pauseTimeMinutes, setPauseTimeMinutes] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  // Determine initial state based on code word existence
  useEffect(() => {
    if (codeWord && codeWord.status === 'confirmed') {
      setPauseStatus('activated');
    }
  }, [codeWord]);

  // When pause is activated, check if a timer was selected
  useEffect(() => {
    if (pauseStatus === 'in-pause' && pauseTimeMinutes) {
      // Convert minutes to milliseconds
      const endTime = Date.now() + pauseTimeMinutes * 60 * 1000;
      
      // Store in localStorage for persistence
      localStorage.setItem('bridge-pause-end-time', endTime.toString());
      
      const timer = setInterval(() => {
        const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
        setTimeRemaining(remaining);
        
        if (remaining <= 0) {
          clearInterval(timer);
          setPauseStatus('ended');
          localStorage.removeItem('bridge-pause-end-time');
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [pauseStatus, pauseTimeMinutes]);

  // Check for existing pause on load
  useEffect(() => {
    const savedEndTime = localStorage.getItem('bridge-pause-end-time');
    if (savedEndTime) {
      const endTime = parseInt(savedEndTime, 10);
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      
      if (remaining > 0) {
        setPauseStatus('in-pause');
        setTimeRemaining(remaining);
      } else {
        setPauseStatus('ended');
        localStorage.removeItem('bridge-pause-end-time');
      }
    }
  }, []);

  const handleActivatePause = (codeWordUsed?: boolean) => {
    setPauseStatus('activated');
  };

  const handleTimerSelect = (minutes: number | null) => {
    setPauseTimeMinutes(minutes);
    setPauseStatus('in-pause');
  };

  const handleEndPause = () => {
    setPauseStatus('activated');
    setPauseTimeMinutes(null);
    setTimeRemaining(null);
    localStorage.removeItem('bridge-pause-end-time');
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
          onSetCodeWord={handleSetCodeWord}
          initialWord={userSuggestion || ''}
          onWordChange={setUserSuggestion}
        />
      );
    }
    
    switch (pauseStatus) {
      case 'activated':
        return (
          <PauseActivatedView
            codeWord={codeWord}
            onTimerSelect={handleTimerSelect}
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
            onSetCodeWord={handleSetCodeWord}
            initialWord={userSuggestion || ''}
            onWordChange={setUserSuggestion}
          />
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-lavender-blue/10 mt-6 mb-10">
      <h2 className="text-5xl md:text-6xl font-cormorant text-[#5d4357] font-medium text-center mb-6">
        Pause Tool
      </h2>
      <p className="text-xl md:text-2xl font-cormorant text-[#5d4357] mt-4 mb-10 text-center">
        Use your code word or take a break when things get heated.
      </p>
      
      {renderContent()}
    </div>
  );
};

export default PauseTool;
