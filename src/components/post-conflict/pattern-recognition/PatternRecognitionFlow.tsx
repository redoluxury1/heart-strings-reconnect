
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useSession } from '../context/SessionContext';
import { patternQuizzes, commonPatterns } from './data/pattern-data';
import { usePatternRecognition } from './hooks/usePatternRecognition';
import PatternList from './components/PatternList';
import QuizQuestion from './components/QuizQuestion';
import ReconnectionTips from './components/ReconnectionTips';
import { reconnectionTips } from '@/data/reconnection-tips';

const PatternRecognitionFlow: React.FC = () => {
  const { state, actions, helpers } = usePatternRecognition();
  const { sessionData } = useSession();
  
  const { selectedPattern, isShowingQuiz, isShowingTips, currentQuestionIndex } = state;
  const { handlePatternSelect, handleAnswerSelect, handleGoBack } = actions;
  const { getPatternSpecificTips } = helpers;
  
  const selectedPatternData = selectedPattern !== null 
    ? commonPatterns.find(p => p.id === selectedPattern)
    : null;
  
  const patternType = selectedPatternData?.patternType || '';
  const quizQuestions = patternType ? patternQuizzes[patternType] || [] : [];
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  const tipsToDisplay = selectedPatternData 
    ? getPatternSpecificTips(patternType)
    : reconnectionTips.sort(() => 0.5 - Math.random()).slice(0, 3);
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 md:p-8">
        {(selectedPattern !== null || isShowingQuiz || isShowingTips) && (
          <Button
            variant="ghost"
            className="mb-4"
            onClick={handleGoBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
        
        {isShowingTips ? (
          <ReconnectionTips 
            selectedPattern={selectedPatternData || null}
            tipsToDisplay={tipsToDisplay}
          />
        ) : isShowingQuiz && currentQuestion ? (
          <QuizQuestion
            currentQuestion={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={quizQuestions.length}
            onAnswerSelect={handleAnswerSelect}
          />
        ) : (
          <PatternList 
            patterns={commonPatterns}
            onPatternSelect={handlePatternSelect}
          />
        )}
      </div>
    </div>
  );
};

export default PatternRecognitionFlow;
