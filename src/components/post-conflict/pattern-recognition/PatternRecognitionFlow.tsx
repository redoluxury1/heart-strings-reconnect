
import React, { useState } from 'react';
import PatternIntroScreen from './components/PatternIntroScreen';
import PatternList from './components/PatternList';
import PatternDetailScreen from './components/PatternDetailScreen';
import PursueDistanceDetailScreen from './components/PursueDistanceDetailScreen';
import PursueDistanceRepairScreen from './components/PursueDistanceRepairScreen';
import PatternRepairScreen from './components/PatternRepairScreen';
import CyclePatternScreen from './components/CyclePatternScreen';
import { usePatternRecognition } from './hooks/usePatternRecognition';
import { CommonPattern } from './types';
import { commonPatterns } from './data/pattern-data';

interface PatternRecognitionFlowProps {
  fullScreen?: boolean;
  onClose?: () => void;
}

const PatternRecognitionFlow: React.FC<PatternRecognitionFlowProps> = ({ fullScreen, onClose }) => {
  const [currentView, setCurrentView] = useState<'intro' | 'list' | 'detail' | 'cycle' | 'repair' | 'pdDetail' | 'pdRepair'>('intro');
  const [selectedPattern, setSelectedPattern] = useState<CommonPattern | null>(null);
  
  // Sample cycle data (could be expanded later)
  const cycleData = {};
  const selectedPatterns: number[] = [];
  
  const togglePatternSelection = (id: number | string) => {
    console.log("Toggle pattern:", id);
    // Implementation would be here in a real app
  };
  
  const handleContinueFromIntro = () => {
    setCurrentView('list');
  };
  
  const handleSelectPattern = (pattern: CommonPattern) => {
    setSelectedPattern(pattern);
    if (pattern.patternType === 'pursue-distance') {
      setCurrentView('pdDetail');
    } else {
      setCurrentView('detail');
    }
  };
  
  const handleViewCycle = () => {
    setCurrentView('cycle');
  };
  
  const handleViewRepair = () => {
    if (selectedPattern?.patternType === 'pursue-distance') {
      setCurrentView('pdRepair');
    } else {
      setCurrentView('repair');
    }
  };
  
  const handleBack = () => {
    switch (currentView) {
      case 'detail':
      case 'pdDetail':
        setCurrentView('list');
        break;
      case 'cycle':
        if (selectedPattern?.patternType === 'pursue-distance') {
          setCurrentView('pdDetail');
        } else {
          setCurrentView('detail');
        }
        break;
      case 'repair':
      case 'pdRepair':
        if (selectedPattern?.patternType === 'pursue-distance') {
          setCurrentView('pdDetail');
        } else {
          setCurrentView('detail');
        }
        break;
      default:
        setCurrentView('intro');
    }
  };

  const handleContinueFromCycle = () => {
    // After viewing cycle, go to repair options
    handleViewRepair();
  };

  const handleContinueFromRepair = () => {
    // Reset to intro if fullscreen mode, otherwise just go back to list
    if (fullScreen && onClose) {
      onClose();
    } else {
      setCurrentView('list');
    }
  };
  
  // We're using the common patterns from the data file
  const patterns = commonPatterns;
  
  return (
    <div className={`${fullScreen ? 'fixed inset-0 z-50 bg-white p-4 overflow-auto' : ''}`}>
      {fullScreen && (
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          aria-label="Close"
        >
          ✕
        </button>
      )}
      
      {currentView === 'intro' && (
        <PatternIntroScreen onContinue={handleContinueFromIntro} />
      )}
      
      {currentView === 'list' && (
        <PatternList 
          patterns={patterns}
          onPatternSelect={handleSelectPattern}
          togglePatternSelection={togglePatternSelection}
          selectedPatterns={selectedPatterns}
        />
      )}
      
      {currentView === 'detail' && selectedPattern && (
        <PatternDetailScreen 
          pattern={selectedPattern}
          onBack={handleBack}
          onViewCycle={handleViewCycle}
          onViewRepair={handleViewRepair}
        />
      )}
      
      {currentView === 'pdDetail' && (
        <PursueDistanceDetailScreen
          onBack={handleBack}
          onViewCycle={handleViewCycle}
          onViewRepair={handleViewRepair}
        />
      )}
      
      {currentView === 'cycle' && (
        <CyclePatternScreen
          pattern={selectedPattern}
          cycleData={cycleData}
          onBack={handleBack}
          onViewRepair={handleViewRepair}
          onContinue={handleContinueFromCycle}
        />
      )}
      
      {currentView === 'repair' && selectedPattern && (
        <PatternRepairScreen
          pattern={selectedPattern}
          onBack={handleBack}
          onContinue={handleContinueFromRepair}
        />
      )}
      
      {currentView === 'pdRepair' && (
        <PursueDistanceRepairScreen
          onBack={handleBack}
          onContinue={handleContinueFromRepair}
        />
      )}
    </div>
  );
};

export default PatternRecognitionFlow;
