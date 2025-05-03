
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { RepairItem } from './types';
import RepairActionItem from './RepairActionItem';

interface CreatePlanStepProps {
  repairItems: RepairItem[];
  onToggleItem: (id: number) => void;
  onCreatePlan: () => void;
  onAddCustomItem: (text: string) => void;
}

const CreatePlanStep: React.FC<CreatePlanStepProps> = ({
  repairItems,
  onToggleItem,
  onCreatePlan,
  onAddCustomItem
}) => {
  const [customRepairText, setCustomRepairText] = useState("");
  const { toast } = useToast();

  const handleAddCustom = () => {
    if (customRepairText.trim()) {
      onAddCustomItem(customRepairText.trim());
      setCustomRepairText("");
      
      toast({
        title: "Custom action added",
        description: "Your repair action has been added to the plan.",
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-6 text-center">
        Create Your Repair Plan
      </h2>
      
      <p className="text-gray-700 mb-8 text-center">
        Select actions you both commit to trying next time you encounter conflict.
        A good repair plan gives you concrete steps to take when things get tense.
      </p>
      
      <div className="space-y-3 mb-8">
        {repairItems.map(item => (
          <RepairActionItem 
            key={item.id}
            item={item}
            onToggle={onToggleItem}
          />
        ))}
      </div>
      
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add your own repair action:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={customRepairText}
            onChange={(e) => setCustomRepairText(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mauve-rose focus:border-transparent"
            placeholder="E.g., Take 10 deep breaths before responding"
          />
          <Button 
            onClick={handleAddCustom}
            disabled={!customRepairText.trim()}
            className="bg-midnight-indigo hover:bg-midnight-indigo/90 text-white"
          >
            Add
          </Button>
        </div>
      </div>
      
      <Button
        className="bg-mauve-rose hover:bg-mauve-rose/90 text-white w-full"
        onClick={onCreatePlan}
      >
        Create My Repair Plan
      </Button>
    </div>
  );
};

export default CreatePlanStep;
