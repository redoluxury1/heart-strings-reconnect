
import React from 'react';
import { Behavior } from '@/data/behavior-data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  if (isMobile) {
    return (
      <Select value={selectedBehaviorId} onValueChange={onBehaviorSelect}>
        <SelectTrigger className="w-full bg-white border-lavender-blue/30 py-3">
          <SelectValue placeholder={genderTab === 'female' ? "Select what she says..." : "Select what he says..."} />
        </SelectTrigger>
        <SelectContent className="max-h-80 overflow-y-auto bg-white">
          {behaviors.map((behavior) => (
            <SelectItem key={behavior.id} value={behavior.id}>
              {behavior.phrase}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  // Desktop view uses accordion
  return (
    <Accordion 
      type="single" 
      collapsible 
      defaultValue="behaviors"
      className="border rounded-md overflow-hidden bg-white"
    >
      <AccordionItem value="behaviors" className="border-0">
        <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline">
          {genderTab === 'female' ? "When she says..." : "When he says..."}
        </AccordionTrigger>
        <AccordionContent className="max-h-64 overflow-y-auto">
          <div className="space-y-1 p-2">
            {behaviors.map((behavior) => (
              <div 
                key={behavior.id} 
                onClick={() => onBehaviorSelect(behavior.id)}
                className={`rounded px-3 py-2 text-sm cursor-pointer transition-colors ${
                  behavior.id === selectedBehaviorId 
                    ? 'bg-lavender-blue/20 text-midnight-indigo' 
                    : 'hover:bg-lavender-blue/10 text-midnight-indigo/80'
                }`}
              >
                {behavior.phrase}
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default BehaviorDropdown;
