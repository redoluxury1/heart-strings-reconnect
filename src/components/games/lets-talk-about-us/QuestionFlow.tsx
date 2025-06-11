
import React, { useState } from 'react';
import { TalkAboutUsCategory } from '@/data/lets-talk-about-us';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import QuestionCard from './QuestionCard';
import { useToast } from '@/hooks/use-toast';

interface QuestionFlowProps {
  category: TalkAboutUsCategory;
  onBack: () => void;
}

const QuestionFlow: React.FC<QuestionFlowProps> = ({ category, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { toast } = useToast();
  
  const currentQuestion = category.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === category.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  
  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleSendToPartner = (answer: string) => {
    toast({
      title: "Sent to your partner!",
      description: "Your question and answer have been shared. They'll receive it when they're ready to connect.",
    });
    
    // Auto-advance to next question after sending
    if (!isLastQuestion) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 1500);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-midnight-indigo hover:bg-midnight-indigo/5"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Categories
        </Button>
        
        <div className="flex items-center justify-center space-x-2">
          <category.icon className="h-5 w-5 text-terracotta" />
          <h1 className="font-cormorant text-2xl font-medium text-midnight-indigo">
            {category.title}
          </h1>
        </div>
        
        <p className="text-gray-600 text-sm italic max-w-md mx-auto">
          Share your thoughts and connect with your partner through meaningful conversation.
        </p>
      </div>
      
      {/* Question Card */}
      <QuestionCard
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={category.questions.length}
        onSendToPartner={handleSendToPartner}
      />
      
      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={isFirstQuestion}
          className="border-terracotta text-terracotta hover:bg-terracotta/5"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <div className="flex space-x-2">
          {category.questions.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentQuestionIndex 
                  ? 'bg-terracotta' 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={isLastQuestion}
          className="border-terracotta text-terracotta hover:bg-terracotta/5"
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default QuestionFlow;
