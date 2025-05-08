
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen, PenLine } from 'lucide-react';

interface MidPauseViewProps {
  timeRemaining: string;
  onEndPause: () => void;
}

const MidPauseView: React.FC<MidPauseViewProps> = ({ 
  timeRemaining, 
  onEndPause 
}) => {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-[#F1F0FB] p-4 rounded-lg mb-6 flex items-center justify-between">
        <span className="text-[#5d4357]">You're in a pause</span>
        <button 
          onClick={onEndPause}
          className="text-[#5d4357]/70 text-sm hover:text-[#5d4357]"
        >
          Dismiss
        </button>
      </div>
      
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
          onClick={() => console.log('View restart phrases')}
        >
          <Clock size={18} />
          <span>View Restart Phrases</span>
        </Button>
        
        <Button 
          variant="outline"
          className="w-full border-[#5d4357]/20 text-[#5d4357] flex items-center justify-center gap-2 py-5"
          onClick={() => console.log('Write private reflection')}
        >
          <PenLine size={18} />
          <span>Write a Private Reflection</span>
        </Button>
        
        <Button 
          variant="outline"
          className="w-full border-[#5d4357]/20 text-[#5d4357] flex items-center justify-center gap-2 py-5"
          onClick={() => console.log('Explore something else')}
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
    </div>
  );
};

export default MidPauseView;
