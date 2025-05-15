
import React, { useState } from 'react';
import PatternIntroScreen from './components/PatternIntroScreen';
import PatternList from './components/PatternList';
import PatternDetailScreen from './components/PatternDetailScreen';
import PursueDistanceDetailScreen from './components/PursueDistanceDetailScreen';
import PursueDistanceRepairScreen from './components/PursueDistanceRepairScreen';
import PatternRepairScreen from './components/PatternRepairScreen';
import CyclePatternScreen from './components/CyclePatternScreen';
import { usePatternRecognition } from './hooks/usePatternRecognition';
import { Pattern } from './types';

const PatternRecognitionFlow: React.FC = () => {
  const [currentView, setCurrentView] = useState<'intro' | 'list' | 'detail' | 'cycle' | 'repair' | 'pdDetail' | 'pdRepair'>('intro');
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);
  const { patterns, cycleData, togglePatternSelection, selectedPatterns } = usePatternRecognition();
  
  const handleContinueFromIntro = () => {
    setCurrentView('list');
  };
  
  const handleSelectPattern = (pattern: Pattern) => {
    setSelectedPattern(pattern);
    if (pattern.id === 'pursue-distance') {
      setCurrentView('pdDetail');
    } else {
      setCurrentView('detail');
    }
  };
  
  const handleViewCycle = () => {
    setCurrentView('cycle');
  };
  
  const handleViewRepair = () => {
    if (selectedPattern?.id === 'pursue-distance') {
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
        if (selectedPattern?.id === 'pursue-distance') {
          setCurrentView('pdDetail');
        } else {
          setCurrentView('detail');
        }
        break;
      case 'repair':
      case 'pdRepair':
        if (selectedPattern?.id === 'pursue-distance') {
          setCurrentView('pdDetail');
        } else {
          setCurrentView('detail');
        }
        break;
      default:
        setCurrentView('intro');
    }
  };
  
  return (
    <div className="mb-16">
      {currentView === 'intro' && (
        <PatternIntroScreen onContinue={handleContinueFromIntro} />
      )}
      
      {currentView === 'list' && (
        <PatternList 
          patterns={patterns}
          onSelectPattern={handleSelectPattern}
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
      
      {currentView === 'pdDetail' && selectedPattern && (
        <PursueDistanceDetailScreen
          onBack={handleBack}
          onViewCycle={handleViewCycle}
          onViewRepair={handleViewRepair}
        />
      )}
      
      {currentView === 'cycle' && selectedPattern && (
        <CyclePatternScreen
          pattern={selectedPattern}
          cycleData={cycleData}
          onBack={handleBack}
          onViewRepair={handleViewRepair}
        />
      )}
      
      {currentView === 'repair' && selectedPattern && (
        <PatternRepairScreen
          pattern={selectedPattern}
          onBack={handleBack}
        />
      )}
      
      {currentView === 'pdRepair' && (
        <PursueDistanceRepairScreen
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default PatternRecognitionFlow;
