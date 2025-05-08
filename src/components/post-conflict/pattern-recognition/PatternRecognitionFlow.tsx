
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { patternQuizzes, commonPatterns } from './data/pattern-data';
import { usePatternRecognition, PatternId } from './hooks/usePatternRecognition';
import PatternList from './components/PatternList';
import ReconnectionTips from './components/ReconnectionTips';
import PatternIntroScreen from './components/PatternIntroScreen';
import CyclePatternScreen from './components/CyclePatternScreen';
import PatternDetailScreen from './components/PatternDetailScreen';
import PatternRepairScreen from './components/PatternRepairScreen';
import PursueDistanceDetailScreen from './components/PursueDistanceDetailScreen';
import PursueDistanceRepairScreen from './components/PursueDistanceRepairScreen';
import { reconnectionTips } from '@/data/reconnection-tips';

interface PatternRecognitionFlowProps {
  onClose?: () => void;
  fullScreen?: boolean;
}

const PatternRecognitionFlow: React.FC<PatternRecognitionFlowProps> = ({ 
  onClose,
  fullScreen = false
}) => {
  const navigate = useNavigate();
  const { state, actions, helpers } = usePatternRecognition();
  const { sessionData } = useSession();
  
  const { 
    selectedPattern, 
    isShowingTips, 
    showIntro,
    showCyclePattern,
    showPatternDetail,
    showPatternRepair
  } = state;
  
  const { 
    handlePatternSelect, 
    handleGoBack, 
    handleIntroComplete,
    handleCyclePatternComplete,
    handlePatternDetailComplete,
  } = actions;
  
  const { getPatternSpecificTips } = helpers;
  
  const selectedPatternData = selectedPattern !== null 
    ? commonPatterns.find(p => p.id.toString() === selectedPattern)
    : null;
  
  const patternType = selectedPatternData?.patternType || null;
  
  const tipsToDisplay = selectedPatternData && patternType
    ? getPatternSpecificTips(patternType)
    : reconnectionTips.sort(() => 0.5 - Math.random()).slice(0, 3);
  
  // Navigate to Pause+Phrase section
  const handleNavigateToPausePhrase = () => {
    navigate('/during-conflict?section=pause-phrase');
  };
  
  // Fix: Use absolute positioning to ensure full screen coverage
  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="p-6 md:p-8">
        {/* Back to tools button for fullScreen mode */}
        {(fullScreen && onClose) && (
          <Button
            variant="ghost"
            className="mb-4"
            onClick={onClose}
            size="sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to tools
          </Button>
        )}
        
        {/* Show back button to pattern list specifically on pattern detail screens */}
        {selectedPattern !== null && showPatternDetail && (
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => handlePatternSelect(null)}
            size="sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to patterns
          </Button>
        )}
        
        {/* For all other views, show back button when applicable except intro and cycle pattern */}
        {!showIntro && !showCyclePattern && !showPatternDetail && (selectedPattern !== null || isShowingTips) && (
          <Button
            variant="ghost"
            className="mb-4"
            onClick={handleGoBack}
            size="sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
        
        {showIntro ? (
          <PatternIntroScreen onContinue={handleIntroComplete} />
        ) : showCyclePattern ? (
          <CyclePatternScreen onContinue={handleCyclePatternComplete} />
        ) : showPatternDetail ? (
          patternType === 'pursue-distance' ? (
            <PursueDistanceDetailScreen onContinue={handlePatternDetailComplete} />
          ) : (
            <PatternDetailScreen 
              pattern={selectedPatternData} 
              onContinue={handlePatternDetailComplete} 
            />
          )
        ) : showPatternRepair ? (
          patternType === 'pursue-distance' ? (
            <PursueDistanceRepairScreen onContinue={handleNavigateToPausePhrase} />
          ) : (
            <PatternRepairScreen 
              pattern={selectedPatternData}
              onContinue={handleNavigateToPausePhrase}
              buttonText="Practice in real life"
            />
          )
        ) : isShowingTips ? (
          <ReconnectionTips 
            selectedPattern={selectedPatternData || null}
            tipsToDisplay={tipsToDisplay}
          />
        ) : (
          <PatternList 
            patterns={commonPatterns}
            onPatternSelect={(patternId) => handlePatternSelect(patternId.toString())}
          />
        )}
      </div>
    </div>
  );
};

export default PatternRecognitionFlow;
