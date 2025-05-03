
import React from 'react';
import { Button } from '@/components/ui/button';
import { CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
        className="w-full mb-4 flex justify-between items-center py-3 text-sm md:text-base px-4"
      >
        <span className="font-medium text-left mr-2">
          {genderTab === 'female' 
            ? "She's not mad, she..."
            : "He doesn't hate you, he..."}
        </span>
        <span className="text-lavender-blue flex items-center">
          {isDropdownOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </span>
      </Button>
    </CollapsibleTrigger>
  );
};

export default MobileBehaviorToggle;
