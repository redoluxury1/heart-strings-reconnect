
import React, { useState } from 'react';
import PatternIntroScreen from './components/PatternIntroScreen';
import PatternList from './components/PatternList';
import PatternDetailScreen from './components/PatternDetailScreen';
import PursueDistanceDetailScreen from './components/PursueDistanceDetailScreen';
import PursueDistanceRepairScreen from './components/PursueDistanceRepairScreen';
import PatternRepairScreen from './components/PatternRepairScreen';
import CyclePatternScreen from './components/CyclePatternScreen';
import { usePatternRecognition } from './hooks/usePatternRecognition';
import { Pattern, CommonPattern } from './types';

interface PatternRecognitionFlowProps {
  fullScreen?: boolean;
  onClose?: () => void;
}

const PatternRecognitionFlow: React.FC<PatternRecognitionFlowProps> = ({ fullScreen, onClose }) => {
  const [currentView, setCurrentView] = useState<'intro' | 'list' | 'detail' | 'cycle' | 'repair' | 'pdDetail' | 'pdRepair'>('intro');
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);
  
  // Sample patterns data to use when the hook doesn't provide them
  const samplePatterns: CommonPattern[] = [
    {
      id: 1,
      name: 'Criticism-Defensiveness Cycle',
      description: 'You feel blamed, so you shut down. They get louder. Repeat.',
      examples: ['You always...', 'I never said that!', 'Why are you making this my fault?'],
      breakingTips: ['Use "I" statements instead of "you" accusations', 'Take a pause before responding defensively'],
      patternType: 'criticism-defensiveness'
    },
    {
      id: 2,
      name: 'Pursue-Distance Dynamic',
      description: 'One of you chases connection. The other pulls away.',
      examples: ["Why won't you talk to me?", 'I just need some space', 'You never want to discuss our issues'],
      breakingTips: ['Set a specific time to talk later', "Respect each other's timing needs"],
      patternType: 'pursue-distance'
    },
    // ... more patterns could be added here
  ];
  
  const patternRecognition = usePatternRecognition();
  // Use sample data as fallback
  const patterns = samplePatterns;
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
    setSelectedPattern(pattern as Pattern);
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
  
  return (
    <div className={`mb-16 ${fullScreen ? 'fixed inset-0 z-50 bg-white p-4 overflow-auto' : ''}`}>
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
