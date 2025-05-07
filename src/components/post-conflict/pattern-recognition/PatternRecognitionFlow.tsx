
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
import { reconnectionTips } from '@/data/reconnection-tips';

const PatternRecognitionFlow: React.FC = () => {
  const { state, actions, helpers } = usePatternRecognition();
  const { sessionData } = useSession();
  
  const { selectedPattern, isShowingQuiz, isShowingTips, currentQuestionIndex, showIntro } = state;
  const { handlePatternSelect, handleAnswerSelect, handleGoBack, handleIntroComplete } = actions;
  const { getPatternSpecificTips } = helpers;
  
  const selectedPatternData = selectedPattern !== null 
    ? commonPatterns.find(p => p.id.toString() === selectedPattern)
    : null;
  
  const patternType = selectedPatternData?.patternType || null;
  const quizQuestions = patternType ? patternQuizzes[patternType] || [] : [];
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  const tipsToDisplay = selectedPatternData && patternType
    ? getPatternSpecificTips(patternType)
    : reconnectionTips.sort(() => 0.5 - Math.random()).slice(0, 3);
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 md:p-8">
        {!showIntro && (selectedPattern !== null || isShowingQuiz || isShowingTips) && (
          <Button
            variant="ghost"
            className="mb-4"
            onClick={handleGoBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
        
        {showIntro ? (
          <PatternIntroScreen onContinue={handleIntroComplete} />
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
