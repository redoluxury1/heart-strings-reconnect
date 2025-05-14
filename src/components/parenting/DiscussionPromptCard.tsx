
import React from 'react';
import { Send } from 'lucide-react';
import Card from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface DiscussionPromptCardProps {
  text: string;
  response: string;
  sent: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
}

const DiscussionPromptCard: React.FC<DiscussionPromptCardProps> = ({ 
  text, 
  response, 
  sent, 
  onChange, 
  onSend 
}) => {
  return (
    <Card className="p-5 bg-white hover:shadow-sm transition-shadow duration-200">
      <div>
        <p className="text-midnight-indigo text-lg font-medium mb-3">{text}</p>
        
        <div className="mt-3">
          <Textarea 
            placeholder="Write your response..." 
            className="w-full resize-none bg-gray-50"
            value={response}
            onChange={(e) => onChange(e.target.value)}
            disabled={sent}
            rows={3}
          />
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <span className="inline-block rounded-full px-2.5 py-0.5 text-xs bg-slate-100 text-slate-600">
            Discussion question
          </span>
          
          {sent ? (
            <span className="text-xs text-green-600 font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Sent to partner
            </span>
          ) : (
            <Button 
              onClick={onSend}
              size="sm" 
              className="bg-mauve-rose hover:bg-mauve-rose/90 text-white"
              disabled={!response || response.trim() === ''}
            >
              <Send className="h-4 w-4 mr-1" /> Send
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default DiscussionPromptCard;
