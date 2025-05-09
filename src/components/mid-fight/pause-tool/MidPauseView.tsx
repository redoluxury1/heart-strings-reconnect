
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen, PenLine } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import RestartPhrases from '@/components/mid-fight/restart-phrases/RestartPhrases';
import { useNavigate } from 'react-router-dom';

interface MidPauseViewProps {
  timeRemaining: string;
  onEndPause: () => void;
  setRestartMessage?: (message: string) => void;
}

const MidPauseView: React.FC<MidPauseViewProps> = ({ 
  timeRemaining, 
  onEndPause,
  setRestartMessage 
}) => {
  const [isRestartPhrasesOpen, setIsRestartPhrasesOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigateToJournal = () => {
    navigate('/archive', { state: { activeTab: 'thoughts' } });
  };

  const handleExploreElse = () => {
    navigate('/');
  };

  const handleRestartPhrasesClose = () => {
    setIsRestartPhrasesOpen(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl text-[#5d4357] font-medium mb-4">
          You're in a pause
        </h3>
        
        <p className="text-[#5d4357] mb-6">
          Take space. Regulate. We'll help you return when the moment feels safer.
        </p>
        
        {timeRemaining !== '00:00' && (
          <div className="text-4xl font-bold text-[#5d4357] my-6">
            {timeRemaining}
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <Button 
          variant="outline"
          className="w-full border-[#5d4357]/20 text-[#5d4357] flex items-center justify-center gap-2 py-5"
          onClick={() => setIsRestartPhrasesOpen(true)}
        >
          <Clock size={18} />
          <span>View Restart Phrases</span>
        </Button>
        
        <Button 
          variant="outline"
          className="w-full border-[#5d4357]/20 text-[#5d4357] flex items-center justify-center gap-2 py-5"
          onClick={handleNavigateToJournal}
        >
          <PenLine size={18} />
          <span>Write a Private Reflection</span>
        </Button>
        
        <Button 
          variant="outline"
          className="w-full border-[#5d4357]/20 text-[#5d4357] flex items-center justify-center gap-2 py-5"
          onClick={handleExploreElse}
        >
          <BookOpen size={18} />
          <span>Explore Something Else</span>
        </Button>
      </div>
      
      <div className="mt-8 text-center">
        <Button
          onClick={onEndPause}
          className="bg-[#5d4357] text-white hover:bg-[#5d4357]/90"
        >
          End Pause
        </Button>
      </div>

      <Dialog open={isRestartPhrasesOpen} onOpenChange={setIsRestartPhrasesOpen}>
        <DialogContent className="max-w-lg p-0 bg-transparent border-none shadow-none">
          <RestartPhrases 
            onClose={handleRestartPhrasesClose} 
            setRestartMessage={setRestartMessage}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MidPauseView;
