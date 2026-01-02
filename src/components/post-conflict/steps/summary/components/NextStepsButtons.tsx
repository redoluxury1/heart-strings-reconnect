
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/post-conflict/context/SessionContext';
import WhiteFlagButton from './WhiteFlagButton';

const NextStepsButtons: React.FC = () => {
  const navigate = useNavigate();
  const { handleRestart } = useSession();
  
  const handleWriteLoveNote = () => {
    navigate('/love-notes');
  };
  
  const handleViewArchive = () => {
    navigate('/archive');
  };
  
  const handleRetry = () => {
    // Reset the session state before navigating back to the beginning
    handleRestart();
    // Navigate back to the beginning of the flow
    navigate('/post-conflict');
  };

  return (
    <div className="w-full">
      <h3 className="font-medium text-[#2C2C2C] text-center mb-4">Next Steps</h3>
      
      {/* White Flag Button - Featured prominently at the top */}
      <div className="flex justify-center mb-6">
        <WhiteFlagButton />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          onClick={handleWriteLoveNote}
          className="bg-[#D3876A] hover:bg-[#D3876A]/90 text-white rounded-full flex items-center"
        >
          <Heart className="mr-2 h-4 w-4" />
          Draft a Love Note
        </Button>
        
        <Button
          onClick={handleViewArchive}
          className="bg-[#5D3A5A] hover:bg-[#5D3A5A]/90 text-white rounded-full flex items-center"
        >
          <BookOpen className="mr-2 h-4 w-4" />
          View My Reflections
        </Button>
        
        <Button
          variant="outline"
          onClick={handleRetry}
          className="border-[#D3876A] text-[#D3876A] hover:bg-[#D3876A]/10 bg-transparent rounded-full flex items-center md:col-span-2"
        >
          <ArrowRight className="mr-2 h-4 w-4" />
          Start Another Reflection
        </Button>
      </div>
    </div>
  );
};

export default NextStepsButtons;
