
import React from 'react';
import { Button } from '@/components/ui/button';
import { Behavior } from '@/data/behavior-data';

interface BehaviorDropdownProps {
  behaviors: Behavior[];
  selectedBehaviorId: string;
  onBehaviorSelect: (id: string) => void;
  genderTab: 'female' | 'male';
  isMobile: boolean;
}

const BehaviorDropdown: React.FC<BehaviorDropdownProps> = ({
  behaviors,
  selectedBehaviorId,
  onBehaviorSelect,
  genderTab,
  isMobile
}) => {
  return (
    <div className="space-y-2">
      <p className="text-center text-midnight-indigo/80 mb-3">
        {genderTab === 'female' ? "Select what she's doing:" : "Select what he's doing:"}
      </p>
      
      <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-1">
        {behaviors.map((behavior) => (
          <Button
            key={behavior.id}
            variant="outline"
            className={`text-left justify-start h-auto min-h-[44px] py-2 px-4 w-full whitespace-normal ${
              selectedBehaviorId === behavior.id
                ? genderTab === 'female' 
                  ? 'bg-mauve-rose text-white border-mauve-rose'
                  : 'bg-midnight-indigo text-white border-midnight-indigo'
                : 'border-lavender-blue/20 hover:bg-lavender-blue/5 hover:text-midnight-indigo text-midnight-indigo'
            }`}
            onClick={() => onBehaviorSelect(behavior.id)}
          >
            <span>{behavior.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BehaviorDropdown;
