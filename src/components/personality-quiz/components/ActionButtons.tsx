
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { QuizResult } from '@/types/personality-quiz';
import DownloadResultsMenu from './DownloadResultsMenu';

interface ActionButtonsProps {
  results: QuizResult;
  onDownloadPdf: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ results, onDownloadPdf }) => {
  const navigate = useNavigate();
  
  const handlePartnerInvite = () => {
    // For now, just log
    console.log('Invite partner flow would start here');
  };

  const navigateToLoveCodeQuiz = () => {
    navigate('/love-code-quiz');
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        <DownloadResultsMenu results={results} onDownloadPdf={onDownloadPdf} />
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8 text-center">
        <h3 className="text-xl font-medium text-midnight-indigo mb-3">
          Continue Your Relationship Journey
        </h3>
        <p className="text-midnight-indigo/70 mb-6 max-w-2xl mx-auto">
          Deepen your connection by inviting your partner to take the quiz or discover your Love Code for even more insights.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            onClick={handlePartnerInvite}
            className="bg-lavender-blue hover:bg-lavender-blue/90 text-white"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Your Partner
          </Button>
          
          <Button 
            onClick={navigateToLoveCodeQuiz}
            className="bg-mauve-rose hover:bg-mauve-rose/90 text-white"
          >
            <Heart className="mr-2 h-4 w-4" />
            Take Love Code Quiz
          </Button>
        </div>
      </div>
    </>
  );
};

export default ActionButtons;
