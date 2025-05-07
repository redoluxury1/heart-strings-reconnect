
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useSession } from '../context/SessionContext';
import { patternQuizzes, commonPatterns } from './data/pattern-data';
import { usePatternRecognition, PatternId } from './hooks/usePatternRecognition';
import PatternList from './components/PatternList';
import QuizQuestion from './components/QuizQuestion';
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
  const { state, actions, helpers } = usePatternRecognition();
  const { sessionData } = useSession();
  
  const { 
    selectedPattern, 
    isShowingQuiz, 
    isShowingTips, 
    currentQuestionIndex, 
    showIntro,
    showCyclePattern,
    showPatternDetail,
    showPatternRepair
  } = state;
  
  const { 
    handlePatternSelect, 
    handleAnswerSelect, 
    handleGoBack, 
    handleIntroComplete,
    handleCyclePatternComplete,
    handlePatternDetailComplete,
    handlePatternRepairComplete
  } = actions;
  
  const { getPatternSpecificTips } = helpers;
  
  const selectedPatternData = selectedPattern !== null 
    ? commonPatterns.find(p => p.id === parseInt(selectedPattern))
    : null;
  
  const patternType = selectedPatternData?.patternType || null;
  const quizQuestions = patternType ? patternQuizzes[patternType] || [] : [];
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  const tipsToDisplay = selectedPatternData && patternType
    ? getPatternSpecificTips(patternType)
    : reconnectionTips.sort(() => 0.5 - Math.random()).slice(0, 3);
  
  // Determine classes based on fullScreen mode
  const containerClasses = fullScreen 
    ? "fixed inset-0 z-50 bg-white overflow-y-auto" 
    : "bg-white rounded-xl shadow-md overflow-hidden";
  
  return (
    <div className={containerClasses}>
      <div className="p-6 md:p-8">
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
        
        {!showIntro && !showCyclePattern && !showPatternDetail && !showPatternRepair && (selectedPattern !== null || isShowingQuiz || isShowingTips) && (
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
            <PursueDistanceRepairScreen onContinue={handlePatternRepairComplete} />
          ) : (
            <PatternRepairScreen 
              pattern={selectedPatternData}
              onContinue={handlePatternRepairComplete}
            />
          )
        ) : isShowingTips ? (
          <ReconnectionTips 
            selectedPattern={selectedPatternData || null}
            tipsToDisplay={tipsToDisplay}
          />
        ) : isShowingQuiz && currentQuestion ? (
          <QuizQuestion
            currentQuestion={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={quizQuestions.length}
            onAnswerSelect={(answerId) => handleAnswerSelect(currentQuestionIndex, answerId)}
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
