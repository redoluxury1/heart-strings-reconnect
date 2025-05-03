
import React from 'react';
import { PatternQuestion } from '../types';

interface QuizQuestionProps {
  currentQuestion: PatternQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  onAnswerSelect: (questionId: number, answer: string) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ 
  currentQuestion, 
  currentQuestionIndex, 
  totalQuestions, 
  onAnswerSelect 
}) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-6">
        Understanding Your Pattern
      </h2>
      
      <div className="bg-soft-cream/20 p-5 rounded-lg mb-6">
        <h3 className="font-medium text-mauve-rose mb-4">Question {currentQuestionIndex + 1} of {totalQuestions}</h3>
        <p className="text-gray-800 mb-5">{currentQuestion.question}</p>
        
        <div className="space-y-3">
          {currentQuestion.options.map(option => (
            <button
              key={option}
              className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-mauve-rose/10 transition-colors"
              onClick={() => onAnswerSelect(currentQuestion.id, option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
