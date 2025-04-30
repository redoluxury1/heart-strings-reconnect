
import React from 'react';
import { Button } from '@/components/ui/button';
import { SendHorizontal, Edit } from 'lucide-react';

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {goals.map((goal) => (
          <Button
            key={goal.id}
            variant="outline"
            className="flex justify-start border-lavender-blue/40 text-midnight-indigo hover:bg-mauve-rose/10 hover:text-mauve-rose hover:border-mauve-rose/40 h-auto py-3 px-4 transition-all whitespace-normal text-left"
            onClick={() => onGoalSelect(goal)}
          >
            <span className="text-sm text-left line-clamp-2">{goal.title}</span>
          </Button>
        ))}

        {/* Something else option */}
        <Button
          variant="outline"
          className="flex justify-start border-lavender-blue/40 text-midnight-indigo hover:bg-mauve-rose/10 hover:text-mauve-rose hover:border-mauve-rose/40 h-auto py-3 px-4 transition-all"
          onClick={onSomethingElse}
        >
          <Edit className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="text-sm text-left line-clamp-2">Something else</span>
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
