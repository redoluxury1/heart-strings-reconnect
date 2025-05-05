
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, MessageSquare, MessageSquarePlus } from 'lucide-react';
import { Goal } from '@/data/pause-phrase-goals';

// Define the color options
const colorOptions = [
  { bg: "bg-lavender-blue/20", border: "border-lavender-blue/30", hoverBg: "hover:bg-lavender-blue/30" },
  { bg: "bg-mauve-rose/20", border: "border-mauve-rose/30", hoverBg: "hover:bg-mauve-rose/30" },
  { bg: "bg-sage/20", border: "border-sage/30", hoverBg: "hover:bg-sage/30" },
  { bg: "bg-peachy-terracotta/20", border: "border-peachy-terracotta/30", hoverBg: "hover:bg-peachy-terracotta/30" },
  { bg: "bg-golden-mustard/20", border: "border-golden-mustard/30", hoverBg: "hover:bg-golden-mustard/30" },
];

interface GoalSelectionViewProps {
  goals: Goal[];
  onGoalSelect: (goal: Goal) => void;
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
              onClick={() => onGoalSelect(goal)}
              className={`p-3 rounded-md cursor-pointer flex justify-between items-center ${colorSet.bg} ${colorSet.border} ${colorSet.hoverBg} transition-colors`}
            >
              <div>
                <p className="font-medium text-midnight-indigo">{goal.title}</p>
                <p className="text-sm text-midnight-indigo/70">{goal.description}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-midnight-indigo/50" />
            </div>
          );
        })}
        
        {/* Something else option */}
        <div 
          onClick={onSomethingElse}
          className="p-3 rounded-md cursor-pointer flex justify-between items-center bg-sage/20 border-sage/30 hover:bg-sage/30 transition-colors"
        >
          <div>
            <p className="font-medium text-midnight-indigo">Something else...</p>
            <p className="text-sm text-midnight-indigo/70">Write your own message from scratch</p>
          </div>
          <MessageSquarePlus className="h-5 w-5 text-midnight-indigo/50" />
        </div>
        
        {/* Start a conversation option */}
        <div 
          onClick={onStartConversation}
          className="p-3 rounded-md cursor-pointer flex justify-between items-center bg-lavender-blue/20 border-lavender-blue/30 hover:bg-lavender-blue/30 transition-colors mt-4"
        >
          <div>
            <p className="font-medium text-midnight-indigo">Start a conversation</p>
            <p className="text-sm text-midnight-indigo/70">Send your partner a message inviting them to talk</p>
          </div>
          <MessageSquare className="h-5 w-5 text-midnight-indigo/50" />
        </div>
      </div>
    </div>
  );
};

export default GoalSelectionView;
