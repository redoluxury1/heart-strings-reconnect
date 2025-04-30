
import React, { useState, useEffect } from 'react';
import { LoveCodeQuestion, LoveCodeAnswer, LoveCode } from '../../types/love-code-quiz';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface QuizQuestionProps {
  question: LoveCodeQuestion;
  questionNumber: number;
  totalQuestions: number;
  onSelectAnswer: (questionId: string, loveCode: LoveCode) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onSelectAnswer
}) => {
  const [randomizedAnswers, setRandomizedAnswers] = useState<LoveCodeAnswer[]>([]);
  const progressPercentage = (questionNumber / totalQuestions) * 100;
  
  // Randomize the order of answers when the question changes
  useEffect(() => {
    const shuffled = [...question.answers].sort(() => Math.random() - 0.5);
    setRandomizedAnswers(shuffled);
  }, [question]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-md">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-midnight-indigo/70">Question {questionNumber} of {totalQuestions}</span>
            <span className="text-sm font-medium text-midnight-indigo/70">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <h2 className="text-xl md:text-2xl font-cormorant font-medium text-midnight-indigo mb-6">
          {question.text}
        </h2>
        
        <div className="space-y-4 mt-6">
          {randomizedAnswers.map((answer) => (
            <Button
              key={answer.id}
              variant="outline"
              className="w-full justify-start py-6 px-5 h-auto text-left border-lavender-blue/30 text-midnight-indigo/90 
                hover:bg-mauve-rose/10 hover:border-mauve-rose focus:bg-mauve-rose/10 focus:border-mauve-rose
                active:bg-mauve-rose/20 transition-all min-h-[80px] break-words whitespace-normal"
              onClick={() => onSelectAnswer(question.id, answer.code)}
            >
              <span className="line-clamp-none">{answer.text}</span>
            </Button>
          ))}
        </div>
      </div>
      
      <p className="text-xs text-center text-midnight-indigo/60 mt-4">
        Select the answer that feels most true for you. There are no right or wrong answers.
      </p>
    </div>
  );
};

export default QuizQuestion;
