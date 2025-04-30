
import React from 'react';
import { Button } from "@/components/ui/button";
import { LoveCodeQuestion } from '../../types/love-code-quiz';

interface QuizQuestionProps {
  question: LoveCodeQuestion;
  questionNumber: number;
  totalQuestions: number;
  onSelectAnswer: (questionId: string, loveCode: string) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ 
  question,
  questionNumber,
  totalQuestions,
  onSelectAnswer
}) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-midnight-indigo/80">
              Question {questionNumber} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-midnight-indigo/80">
              {Math.round((questionNumber / totalQuestions) * 100)}% complete
            </span>
          </div>
          
          <div className="w-full bg-soft-blush/50 rounded-full h-2">
            <div 
              className="bg-mauve-rose h-2 rounded-full" 
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Question Text */}
        <h2 className="text-xl md:text-2xl font-cormorant font-medium text-midnight-indigo mb-6">
          {question.text}
        </h2>
        
        {/* Answer Options */}
        <div className="space-y-4">
          {question.answers.map((answer) => (
            <Button
              key={answer.id}
              variant="outline"
              className="w-full p-4 h-auto min-h-14 whitespace-normal text-left justify-start border-lavender-blue/30 hover:bg-mauve-rose/10 hover:text-midnight-indigo focus:bg-mauve-rose/10 focus:text-midnight-indigo active:bg-mauve-rose/20"
              onClick={() => onSelectAnswer(question.id, answer.code)}
            >
              <span className="text-sm md:text-base">{answer.text}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
