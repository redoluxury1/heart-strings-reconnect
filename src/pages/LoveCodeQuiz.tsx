
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContentContainer from '../components/common/ContentContainer';
import QuizIntro from '../components/love-code-quiz/QuizIntro';
import QuizQuestion from '../components/love-code-quiz/QuizQuestion';
import QuizResults from '../components/love-code-quiz/QuizResults';
import { LoveCodeQuestion, LoveCodeAnswer, LoveCode, LoveCodeResult } from '../types/love-code-quiz';
import { quizQuestions } from '../data/love-code-quiz-data';

// Types of quiz states
type QuizState = 'intro' | 'questions' | 'results';

const LoveCodeQuiz = () => {
  const navigate = useNavigate();
  const [quizState, setQuizState] = useState<QuizState>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, LoveCode>>({});
  const [results, setResults] = useState<LoveCodeResult | null>(null);

  // Start the quiz
  const startQuiz = () => {
    setQuizState('questions');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, loveCode: LoveCode) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: loveCode
    }));
    
    // Move to next question or show results if finished
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults();
    }
  };

  // Calculate quiz results
  const calculateResults = () => {
    const loveCodes: Record<LoveCode, number> = {
      'loving_words': 0,
      'thoughtful_gestures': 0,
      'intentional_time': 0,
      'helpful_actions': 0,
      'physical_connection': 0
    };

    // Tally the scores
    Object.values(answers).forEach(code => {
      loveCodes[code]++;
    });

    // Find primary and secondary love codes
    const sortedCodes = Object.entries(loveCodes)
      .sort((a, b) => b[1] - a[1]) 
      .map(([code]) => code as LoveCode);
    
    const primaryCode = sortedCodes[0];
    const secondaryCode = sortedCodes[1];
    
    // Calculate percentages for the pie chart
    const total = Object.values(loveCodes).reduce((sum, count) => sum + count, 0);
    const percentages: Record<LoveCode, number> = {} as Record<LoveCode, number>;
    
    (Object.keys(loveCodes) as LoveCode[]).forEach(code => {
      percentages[code] = Math.round((loveCodes[code] / total) * 100);
    });

    setResults({
      primaryCode,
      secondaryCode,
      scores: loveCodes,
      percentages
    });
    
    setQuizState('results');
  };

  // Restart the quiz
  const restartQuiz = () => {
    setQuizState('intro');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResults(null);
  };

  // Go back to the home page
  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-soft-blush">
      <Navbar />
      
      <main className="flex-grow py-8 md:py-12">
        <ContentContainer>
          {quizState === 'intro' && (
            <QuizIntro onStart={startQuiz} />
          )}
          
          {quizState === 'questions' && (
            <QuizQuestion
              question={quizQuestions[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={quizQuestions.length}
              onSelectAnswer={handleAnswerSelect}
            />
          )}
          
          {quizState === 'results' && results && (
            <QuizResults
              results={results}
              onRestart={restartQuiz}
              onHome={goToHome}
            />
          )}
        </ContentContainer>
      </main>
      
      <Footer showCTA={false} />
    </div>
  );
};

export default LoveCodeQuiz;
