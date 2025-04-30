
import React from 'react';
import { Button } from '@/components/ui/button';
import { SendHorizontal, Edit } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Goal {
  id: string;
  title: string;
  phrases: string[];
}

interface GoalSelectionViewProps {
  goals: Goal[];
  onGoalSelect: (goal: Goal) => void;
  onStartConversation: () => void;
  onSomethingElse: () => void;
}

const GoalSelectionView: React.FC<GoalSelectionViewProps> = ({
  goals,
  onGoalSelect,
  onStartConversation,
  onSomethingElse
}) => {
  const isMobile = useIsMobile();
  
  return (
    <>
      <div className="mb-6 text-center">
        <h3 className="text-xl font-cormorant font-medium text-midnight-indigo mb-2">
          What are you trying to say?
        </h3>
        <p className="text-sm text-midnight-indigo/70">
          We'll help you say it clearly—without making things worse.
        </p>
      </div>
      
      <div className="space-y-2 mb-6">
        {goals.filter(goal => goal.title !== "Say how I feel without blame").map((goal) => (
          <Button
            key={goal.id}
            variant="outline"
            className="w-full flex justify-start items-center border-lavender-blue/40 text-midnight-indigo hover:bg-mauve-rose/10 hover:text-mauve-rose hover:border-mauve-rose/40 transition-all py-2 px-3 h-auto"
            onClick={() => onGoalSelect(goal)}
          >
            <span className={`text-xs sm:text-sm`}>
              {goal.title}
            </span>
          </Button>
        ))}

        {/* Something else option */}
        <Button
          variant="outline"
          className="w-full flex justify-start items-center border-lavender-blue/40 text-midnight-indigo hover:bg-mauve-rose/10 hover:text-mauve-rose hover:border-mauve-rose/40 transition-all py-2 px-3 h-auto"
          onClick={onSomethingElse}
        >
          <div className="flex items-center gap-2">
            <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className={`text-xs sm:text-sm`}>Something else</span>
          </div>
        </Button>
      </div>

      <div className="flex justify-center mt-4">
        <Button
          variant="default"
          className="bg-lavender-blue hover:bg-lavender-blue/90 text-white flex items-center gap-2"
          onClick={onStartConversation}
        >
          <SendHorizontal className="h-4 w-4" />
          Start Conversation with Partner
        </Button>
      </div>
    </>
  );
};

export default GoalSelectionView;
