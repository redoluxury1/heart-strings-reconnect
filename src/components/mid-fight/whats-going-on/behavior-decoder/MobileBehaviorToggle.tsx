
import React from 'react';
import { Button } from '@/components/ui/button';
import { CollapsibleTrigger } from '@/components/ui/collapsible';

interface MobileBehaviorToggleProps {
  isDropdownOpen: boolean;
  genderTab: 'female' | 'male';
  isMobile: boolean;
}

const MobileBehaviorToggle: React.FC<MobileBehaviorToggleProps> = ({
  isDropdownOpen,
  genderTab,
  isMobile
}) => {
  if (!isMobile) return null;
  
  return (
    <CollapsibleTrigger asChild>
      <Button 
        variant="outline" 
        className="w-full mb-4 flex justify-between items-center py-3 text-sm px-4"
      >
        <span className="font-medium text-left mr-2">
          {genderTab === 'female' 
            ? "She's not mad, she..."
            : "He doesn't hate you, he..."}
        </span>
        <span className="text-lavender-blue flex-shrink-0">{isDropdownOpen ? '▲' : '▼'}</span>
      </Button>
    </CollapsibleTrigger>
  );
};

export default MobileBehaviorToggle;
