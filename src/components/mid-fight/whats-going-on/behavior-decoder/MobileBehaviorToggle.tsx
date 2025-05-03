
import React from 'react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';

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
        className="w-full mb-5 flex justify-between items-center py-3"
      >
        <span className="font-medium">{genderTab === 'female' ? "She's not mad, she..." : "He doesn't hate you, he..."}</span>
        <span>{isDropdownOpen ? '▲' : '▼'}</span>
      </Button>
    </CollapsibleTrigger>
  );
};

export default MobileBehaviorToggle;
