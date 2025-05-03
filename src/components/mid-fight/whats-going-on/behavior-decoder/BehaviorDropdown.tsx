
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Behavior } from '@/data/behavior-data';

interface BehaviorDropdownProps {
  behaviors: Behavior[];
  selectedBehaviorId: string;
  onBehaviorSelect: (id: string) => void;
  placeholder?: string;
}

const BehaviorDropdown: React.FC<BehaviorDropdownProps> = ({
  behaviors,
  selectedBehaviorId,
  onBehaviorSelect,
  placeholder = "Choose a behavior..."
}) => {
  return (
    <div className="relative z-20">
      <Select
        value={selectedBehaviorId}
        onValueChange={onBehaviorSelect}
      >
        <SelectTrigger className="w-full border-lavender-blue/30 mb-2 py-3">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="z-50 bg-white">
          {behaviors.map((behavior) => (
            <SelectItem key={behavior.id} value={behavior.id}>
              {behavior.behavior}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default BehaviorDropdown;
