
import React, { useEffect, useState } from 'react';
import { QuizQuestion as QuizQuestionType, QuizAnswer } from '@/types/personality-quiz';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { shuffleArray } from '@/data/personality-quiz-data';
import { ArrowLeft } from 'lucide-react';

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNumber: number;
  totalQuestions: number;
  onSelectAnswer: (questionId: string, type: string) => void;
  onGoBack: () => void;
  canGoBack: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ 
  question, 
  questionNumber, 
  totalQuestions,
  onSelectAnswer,
  onGoBack,
  canGoBack
}) => {
  const [shuffledAnswers, setShuffledAnswers] = useState<QuizAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  
  // Shuffle answers when question changes
  useEffect(() => {
    setShuffledAnswers(shuffleArray(question.answers));
    setSelectedAnswer(null);
  }, [question]);
  
  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    
    // Find the selected answer object
    const selectedAnswerObject = question.answers.find(answer => answer.id === answerId);
    if (selectedAnswerObject) {
      // Submit answer after a short delay to allow the user to see their selection
      setTimeout(() => {
        onSelectAnswer(question.id, selectedAnswerObject.type);
      }, 500);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-3xl mx-auto relative">
      {canGoBack && (
        <Button 
          variant="ghost" 
          size="sm"
          className="absolute left-4 top-4"
          onClick={onGoBack}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      )}
      
      <div className="mb-8 text-center">
        <div className="inline-block px-3 py-1 bg-lavender-blue/20 rounded-full text-sm text-lavender-blue mb-4">
          Question {questionNumber} of {totalQuestions}
        </div>
        <h2 className="text-xl md:text-2xl font-medium text-midnight-indigo">{question.text}</h2>
      </div>
      
      <RadioGroup
        className="space-y-4"
        value={selectedAnswer || ""}
        onValueChange={handleAnswerSelect}
      >
        {shuffledAnswers.map((answer) => (
          <label
            key={answer.id}
            className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${
              selectedAnswer === answer.id
                ? "border-lavender-blue bg-lavender-blue/10"
                : "border-gray-200 hover:border-lavender-blue/50"
            }`}
          >
            <RadioGroupItem value={answer.id} id={answer.id} className="mt-0.5" />
            <span className="ml-3 text-midnight-indigo">{answer.text}</span>
          </label>
        ))}
      </RadioGroup>
      
      <div className="mt-8 flex justify-between items-center">
        <div className="h-2 bg-gray-100 rounded-full w-full max-w-sm">
          <div 
            className="h-2 bg-lavender-blue rounded-full" 
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          ></div>
        </div>
        <span className="text-sm text-gray-500 ml-4">
          {Math.round((questionNumber / totalQuestions) * 100)}%
        </span>
      </div>
    </div>
  );
};

export default QuizQuestion;
