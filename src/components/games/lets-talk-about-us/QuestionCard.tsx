
import React from 'react';
import { TalkAboutUsQuestion } from '@/data/lets-talk-about-us';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send } from 'lucide-react';

interface QuestionCardProps {
  question: TalkAboutUsQuestion;
  questionNumber: number;
  totalQuestions: number;
  onTalkNow: () => void;
  onSendToPartner: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  questionNumber, 
  totalQuestions,
  onTalkNow,
  onSendToPartner 
}) => {
  return (
    <Card className="p-8 bg-gradient-to-br from-white to-soft-cream/30 border-soft-cream/20">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <p className="text-sm text-gray-500 font-medium">
            Question {questionNumber} of {totalQuestions}
          </p>
          
          <h2 className="font-cormorant text-2xl md:text-3xl font-medium text-midnight-indigo leading-relaxed">
            {question.text}
          </h2>
        </div>
        
        <div className="pt-4 space-y-3">
          <p className="text-sm text-gray-600 italic">
            Choose how you'd like to explore this question:
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={onTalkNow}
              className="flex-1 bg-midnight-indigo hover:bg-midnight-indigo/90 text-soft-cream"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Talk about it now
            </Button>
            
            <Button 
              onClick={onSendToPartner}
              variant="outline"
              className="flex-1 border-midnight-indigo text-midnight-indigo hover:bg-midnight-indigo/5"
            >
              <Send className="h-4 w-4 mr-2" />
              Send to my partner
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuestionCard;
