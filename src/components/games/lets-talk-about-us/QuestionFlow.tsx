
import React, { useState } from 'react';
import { TalkAboutUsCategory } from '@/data/lets-talk-about-us';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import QuestionCard from './QuestionCard';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { sendConversationMessage } from '@/services/conversationMessages';
import { createConversationSession } from '@/services/conversation';

interface QuestionFlowProps {
  category: TalkAboutUsCategory;
  onBack: () => void;
}

const QuestionFlow: React.FC<QuestionFlowProps> = ({ category, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const { toast } = useToast();
  const { user, relationship } = useAuth();
  
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
  
  const handleSendToPartner = async (answer: string) => {
    // Store the response locally
    setResponses(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
    
    // If partner is connected, send the message
    if (relationship?.status === 'connected' && user) {
      try {
        // Create or get existing conversation session
        let sessionId = localStorage.getItem(`talk-session-${category.id}`);
        
        if (!sessionId) {
          const session = await createConversationSession(
            relationship.id,
            user.id,
            'post-fight', // Using post-fight type for now
            { 
              tool: 'lets-talk-about-us',
              category: category.id,
              categoryTitle: category.title
            }
          );
          
          if (session) {
            sessionId = session.id;
            localStorage.setItem(`talk-session-${category.id}`, sessionId);
          }
        }
        
        if (sessionId) {
          await sendConversationMessage({
            session_id: sessionId,
            sender_id: user.id,
            message_text: `${currentQuestion.text}\n\nMy response: ${answer}`,
            message_type: 'text',
            metadata: {
              questionIndex: currentQuestionIndex,
              categoryId: category.id,
              questionText: currentQuestion.text
            }
          });
        }
      } catch (error) {
        console.error('Error sending to partner:', error);
      }
    }
    
    toast({
      title: relationship?.status === 'connected' ? "Sent to your partner!" : "Response saved!",
      description: relationship?.status === 'connected' 
        ? "Your partner will see your response when they view this activity."
        : "Connect with your partner to share responses in real-time.",
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
          {relationship?.status === 'connected' 
            ? "Share your thoughts and connect with your partner through meaningful conversation."
            : "Reflect on these questions. Connect with your partner to share responses together."
          }
        </p>
      </div>
      
      {/* Question Card */}
      <QuestionCard
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={category.questions.length}
        onSendToPartner={handleSendToPartner}
        savedResponse={responses[currentQuestionIndex]}
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
              className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                index === currentQuestionIndex 
                  ? 'bg-terracotta' 
                  : responses[index]
                  ? 'bg-terracotta/50'
                  : 'bg-gray-300'
              }`}
              onClick={() => setCurrentQuestionIndex(index)}
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
      
      {/* Share All Responses Button (appears when all questions are answered) */}
      {Object.keys(responses).length === category.questions.length && (
        <div className="text-center pt-4">
          <Button
            className="bg-terracotta hover:bg-terracotta/90 text-white"
            onClick={() => {
              toast({
                title: "All responses shared!",
                description: "Your complete conversation is ready for your partner to review.",
              });
            }}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Complete Conversation
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestionFlow;
