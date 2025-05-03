
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContentContainer from '../components/common/ContentContainer';
import QuizIntro from '../components/personality-quiz/QuizIntro';
import QuizQuestion from '../components/personality-quiz/QuizQuestion';
import QuizResults from '../components/personality-quiz/QuizResults';
import { PersonalityType, QuizResult } from '../types/personality-quiz';
import { personalityQuizQuestions } from '../data/personality-quiz-data';

// Types of quiz states
type QuizState = 'intro' | 'questions' | 'results';

const PersonalityQuiz = () => {
  const navigate = useNavigate();
  const [quizState, setQuizState] = useState<QuizState>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, PersonalityType>>({});
  const [results, setResults] = useState<QuizResult | null>(null);

  // Start the quiz
  const startQuiz = () => {
    setQuizState('questions');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, personalityType: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: personalityType as PersonalityType
    }));
    
    // Move to next question or show results if finished
    if (currentQuestionIndex < personalityQuizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults();
    }
  };

  // Go back to previous question
  const handleGoBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Calculate quiz results
  const calculateResults = () => {
    const personalityTypes: Record<PersonalityType, number> = {
      'anchor': 0,
      'spark': 0,
      'strategist': 0,
      'reflector': 0
    };

    // Tally the scores
    Object.values(answers).forEach(type => {
      personalityTypes[type]++;
    });

    // Find primary and secondary personality types
    const sortedTypes = Object.entries(personalityTypes)
      .sort((a, b) => b[1] - a[1]) 
      .map(([type]) => type as PersonalityType);
    
    const primaryType = sortedTypes[0];
    const secondaryType = sortedTypes[1];
    
    // Calculate percentages for the pie chart
    const total = Object.values(personalityTypes).reduce((sum, count) => sum + count, 0);
    const percentages: Record<PersonalityType, number> = {} as Record<PersonalityType, number>;
    
    (Object.keys(personalityTypes) as PersonalityType[]).forEach(type => {
      percentages[type] = Math.round((personalityTypes[type] / total) * 100);
    });

    setResults({
      primaryType,
      secondaryType,
      scores: personalityTypes,
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
              question={personalityQuizQuestions[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={personalityQuizQuestions.length}
              onSelectAnswer={handleAnswerSelect}
              onGoBack={handleGoBack}
              canGoBack={currentQuestionIndex > 0}
            />
          )}
          
          {quizState === 'results' && results && (
            <QuizResults
              results={results}
              onRestart={restartQuiz}
            />
          )}
        </ContentContainer>
      </main>
      
      <Footer showCTA={false} />
    </div>
  );
};

export default PersonalityQuiz;
