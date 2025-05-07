
import React from 'react';
import { Button } from '@/components/ui/button';
import { QuizQuestion as QuizQuestionType } from '../types';

interface QuizQuestionProps {
  currentQuestion: QuizQuestionType;
  currentQuestionIndex: number;
  totalQuestions: number;
  onAnswerSelect: (answerId: number) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  onAnswerSelect,
}) => {
  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Question {currentQuestionIndex + 1} of {totalQuestions}</h1>
        <p className="text-lg">{currentQuestion.question}</p>
      </div>
      
      <div className="w-full space-y-4">
        {currentQuestion.options.map((option, idx) => (
          <Button
            key={idx}
            variant="outline"
            className="w-full py-6 text-left justify-start text-lg hover:bg-slate-100"
            onClick={() => onAnswerSelect(idx)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
