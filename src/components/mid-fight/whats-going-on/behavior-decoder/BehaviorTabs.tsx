
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BehaviorDropdown from './BehaviorDropdown';
import BehaviorExplanation from './BehaviorExplanation';
import { getFemaleBehaviors, getMaleBehaviors } from '@/data/behavior-data';

interface BehaviorTabsProps {
  genderTab: 'female' | 'male';
  onGenderTabChange: (value: 'female' | 'male') => void;
  selectedFemaleBehaviorId: string;
  selectedMaleBehaviorId: string;
  onFemaleBehaviorSelect: (id: string) => void;
  onMaleBehaviorSelect: (id: string) => void;
  onStartChat: () => void;
}

const BehaviorTabs: React.FC<BehaviorTabsProps> = ({
  genderTab,
  onGenderTabChange,
  selectedFemaleBehaviorId,
  selectedMaleBehaviorId,
  onFemaleBehaviorSelect,
  onMaleBehaviorSelect,
  onStartChat
}) => {
  const femaleBehaviors = getFemaleBehaviors();
  const maleBehaviors = getMaleBehaviors();
  
  const selectedFemaleBehavior = femaleBehaviors.find(b => b.id === selectedFemaleBehaviorId);
  const selectedMaleBehavior = maleBehaviors.find(b => b.id === selectedMaleBehaviorId);

  return (
    <Tabs 
      value={genderTab}
      onValueChange={(value) => onGenderTabChange(value as 'female' | 'male')}
      className="w-full"
    >
      <TabsList className="grid grid-cols-2 w-full mb-5">
        <TabsTrigger value="female" className="text-xs md:text-sm py-3">
          She's not mad, she...
        </TabsTrigger>
        <TabsTrigger value="male" className="text-xs md:text-sm py-3">
          He doesn't hate you, he...
        </TabsTrigger>
      </TabsList>

      <TabsContent value="female" className="space-y-5">
        <BehaviorDropdown 
          behaviors={femaleBehaviors}
          selectedBehaviorId={selectedFemaleBehaviorId}
          onBehaviorSelect={onFemaleBehaviorSelect}
        />
        
        {selectedFemaleBehavior && (
          <BehaviorExplanation 
            behavior={selectedFemaleBehavior} 
            onStartChat={onStartChat} 
          />
        )}
      </TabsContent>

      <TabsContent value="male" className="space-y-5">
        <BehaviorDropdown 
          behaviors={maleBehaviors}
          selectedBehaviorId={selectedMaleBehaviorId}
          onBehaviorSelect={onMaleBehaviorSelect}
        />
        
        {selectedMaleBehavior && (
          <BehaviorExplanation 
            behavior={selectedMaleBehavior} 
            onStartChat={onStartChat} 
          />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default BehaviorTabs;
