
import React, { useState } from 'react';
import { TalkAboutUsQuestion } from '@/data/lets-talk-about-us';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

interface QuestionCardProps {
  question: TalkAboutUsQuestion;
  questionNumber: number;
  totalQuestions: number;
  onSendToPartner: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  questionNumber, 
  totalQuestions,
  onSendToPartner 
}) => {
  const [answer, setAnswer] = useState('');
  
  const handleSend = () => {
    if (answer.trim()) {
      onSendToPartner(answer);
      setAnswer(''); // Clear the answer after sending
    }
  };
  
  return (
    <Card className="p-8 bg-gradient-to-br from-white to-soft-cream/30 border-soft-cream/20">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-500 font-medium">
            Question {questionNumber} of {totalQuestions}
          </p>
          
          <h2 className="font-cormorant text-2xl md:text-3xl font-medium text-midnight-indigo leading-relaxed">
            {question.text}
          </h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your thoughts:
            </label>
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Share your thoughts on this question..."
              className="min-h-[120px] border-gray-300 focus:border-terracotta focus:ring-terracotta"
            />
          </div>
          
          <Button 
            onClick={handleSend}
            disabled={!answer.trim()}
            className="w-full bg-terracotta hover:bg-terracotta/90 text-white disabled:opacity-50"
          >
            <Send className="h-4 w-4 mr-2" />
            Send to My Partner
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default QuestionCard;
