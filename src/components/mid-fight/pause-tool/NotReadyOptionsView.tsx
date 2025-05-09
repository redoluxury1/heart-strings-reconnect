
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Heart, BookOpen, PenLine, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NotReadyOptionsViewProps {
  onRemindLater: () => void;
  onEndPause: () => void;
}

const NotReadyOptionsView: React.FC<NotReadyOptionsViewProps> = ({
  onRemindLater,
  onEndPause
}) => {
  const navigate = useNavigate();
  
  const handleNavigateToPostConflict = () => {
    navigate('/post-conflict');
  };
  
  const handleNavigateToJournal = () => {
    navigate('/archive', { state: { activeTab: 'thoughts' } });
  };
  
  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl text-[#5d4357] font-medium mb-4">
          That's okay
        </h3>
        
        <p className="text-[#5d4357] mb-6">
          We'll check in again soon. In the meantime, you can try something calming or write a private note.
        </p>
      </div>
      
      <div className="space-y-4 mb-8">
        <Button
          onClick={() => navigate('/post-conflict/color-healing')}
          variant="outline"
          className="w-full border-[#5d4357]/20 text-[#5d4357] hover:bg-[#5d4357]/10 flex items-center justify-center gap-2 py-5"
        >
          <Heart size={18} />
          <span>Try Color Healing</span>
        </Button>
        
        <Button
          onClick={handleNavigateToPostConflict}
          variant="outline"
          className="w-full border-[#5d4357]/20 text-[#5d4357] hover:bg-[#5d4357]/10 flex items-center justify-center gap-2 py-5"
        >
          <BookOpen size={18} />
          <span>Let's Work This Out</span>
        </Button>
        
        <Button
          onClick={handleNavigateToJournal}
          variant="outline"
          className="w-full border-[#5d4357]/20 text-[#5d4357] hover:bg-[#5d4357]/10 flex items-center justify-center gap-2 py-5"
        >
          <PenLine size={18} />
          <span>Journal Reflection</span>
        </Button>
      </div>
      
      <div className="space-y-4">
        <Button
          onClick={onRemindLater}
          className="w-full bg-[#5d4357] text-white hover:bg-[#5d4357]/90 flex items-center justify-center py-5"
        >
          <Clock size={18} className="mr-2" />
          Remind Me in 5 Minutes
        </Button>
        
        <Button
          onClick={onEndPause}
          variant="outline"
          className="w-full border-[#5d4357]/20 text-[#5d4357] hover:bg-[#5d4357]/10 flex items-center justify-center py-5"
        >
          <RotateCcw size={18} className="mr-2" />
          End Pause Session
        </Button>
      </div>
    </div>
  );
};

export default NotReadyOptionsView;
