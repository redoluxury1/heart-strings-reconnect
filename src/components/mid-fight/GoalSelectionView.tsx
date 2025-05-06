
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, MessageSquarePlus } from 'lucide-react';
import { Goal } from '@/data/pause-phrase-goals';

// Define the color options - removing yellow, orange and green from the palette
const colorOptions = [
  { bg: "bg-lavender-blue/20", border: "border-lavender-blue/30", hoverBg: "hover:bg-lavender-blue/30" },
  { bg: "bg-mauve-rose/20", border: "border-mauve-rose/30", hoverBg: "hover:bg-mauve-rose/30" },
  { bg: "bg-midnight-indigo/20", border: "border-midnight-indigo/30", hoverBg: "hover:bg-midnight-indigo/30" },
  { bg: "bg-rosewood-tint/20", border: "border-rosewood-tint/30", hoverBg: "hover:bg-rosewood-tint/30" },
  { bg: "bg-soft-cream/20", border: "border-soft-cream/30", hoverBg: "hover:bg-soft-cream/30" },
];

interface GoalSelectionViewProps {
  goals: Goal[];
  onGoalSelect: (goalId: string) => void; // Changed from Goal to goalId: string
  onStartConversation: () => void;
  onSomethingElse: () => void;
  goalColorMap?: Record<string, number>;
}

const GoalSelectionView: React.FC<GoalSelectionViewProps> = ({ 
  goals, 
  onGoalSelect, 
  onStartConversation,
  onSomethingElse,
  goalColorMap = {}
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium text-midnight-indigo">What do you want to say?</h3>
      
      <div className="space-y-2">
        {goals.map((goal) => {
          const colorIndex = goalColorMap[goal.id] || 0;
          const colorSet = colorOptions[colorIndex % colorOptions.length];
          
          return (
            <div 
              key={goal.id}
              onClick={() => onGoalSelect(goal.id)} // Changed to pass goal.id instead of goal
              className={`p-3 rounded-md cursor-pointer flex justify-between items-center ${colorSet.bg} ${colorSet.border} ${colorSet.hoverBg} transition-colors`}
            >
              <div>
                <p className="font-medium text-midnight-indigo">{goal.title}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-midnight-indigo/50" />
            </div>
          );
        })}
        
        {/* Something else option */}
        <div 
          onClick={onSomethingElse}
          className="p-3 rounded-md cursor-pointer flex justify-between items-center bg-midnight-indigo/20 border-midnight-indigo/30 hover:bg-midnight-indigo/30 transition-colors"
        >
          <div>
            <p className="font-medium text-midnight-indigo">Something else...</p>
            <p className="text-sm text-midnight-indigo/70">Write your own message from scratch</p>
          </div>
          <MessageSquarePlus className="h-5 w-5 text-midnight-indigo/50" />
        </div>
      </div>
    </div>
  );
};

export default GoalSelectionView;
