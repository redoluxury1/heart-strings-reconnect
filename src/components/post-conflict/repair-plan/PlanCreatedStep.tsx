
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Heart } from 'lucide-react';
import { RepairItem } from './types';

interface PlanCreatedStepProps {
  selectedItems: RepairItem[];
  onSavePlan: () => void;
}

const PlanCreatedStep: React.FC<PlanCreatedStepProps> = ({ selectedItems, onSavePlan }) => {
  return (
    <div className="animate-fade-in text-center">
      <div className="flex justify-center mb-6">
        <div className="h-16 w-16 rounded-full bg-mauve-rose/20 flex items-center justify-center">
          <Heart className="h-8 w-8 text-mauve-rose" />
        </div>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-cormorant font-medium text-midnight-indigo mb-4">
        Your Repair Plan is Ready
      </h2>
      
      <p className="text-gray-700 mb-8">
        You've selected {selectedItems.length} actions for your repair plan.
        Try to implement these strategies the next time tensions rise.
      </p>
      
      <div className="bg-soft-cream/20 rounded-lg p-6 mb-8">
        <h3 className="font-medium text-mauve-rose mb-4">Your Repair Actions:</h3>
        <ul className="space-y-3 text-left">
          {selectedItems.map(item => (
            <li key={item.id} className="flex items-start">
              <Check className="h-5 w-5 text-mauve-rose mr-2 mt-0.5" />
              <span className="text-gray-700">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="text-gray-600 text-sm p-4 border border-gray-200 rounded-lg mb-8">
        <p>
          Remember: Healing after conflict takes practice. Be patient with each other as you try
          these new repair strategies. What matters is that you're both committed to growing together.
        </p>
      </div>
      
      <Button
        className="bg-midnight-indigo hover:bg-midnight-indigo/90 text-white"
        onClick={onSavePlan}
      >
        Save to Archive
      </Button>
    </div>
  );
};

export default PlanCreatedStep;
