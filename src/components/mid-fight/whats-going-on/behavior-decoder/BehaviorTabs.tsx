
import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import BehaviorDropdown from './BehaviorDropdown';
import BehaviorExplanation from './BehaviorExplanation';
import { getFemaleBehaviors, getMaleBehaviors, Behavior } from '@/data/behavior-data';

interface BehaviorTabsProps {
  genderTab: 'female' | 'male';
  onGenderTabChange: (value: 'female' | 'male') => void;
  selectedFemaleBehaviorId: string;
  selectedMaleBehaviorId: string;
  onFemaleBehaviorSelect: (id: string) => void;
  onMaleBehaviorSelect: (id: string) => void;
  onStartChat: () => void;
  isMobile: boolean;
}

const BehaviorTabs: React.FC<BehaviorTabsProps> = ({
  genderTab,
  onGenderTabChange,
  selectedFemaleBehaviorId,
  selectedMaleBehaviorId,
  onFemaleBehaviorSelect,
  onMaleBehaviorSelect,
  onStartChat,
  isMobile
}) => {
  // Pre-fetch behaviors for both genders
  const femaleBehaviors = getFemaleBehaviors();
  const maleBehaviors = getMaleBehaviors();
  
  // Get selected behavior based on current tab
  const selectedBehavior = genderTab === 'female'
    ? femaleBehaviors.find(b => b.id === selectedFemaleBehaviorId)
    : maleBehaviors.find(b => b.id === selectedMaleBehaviorId);
  
  // Show first behavior by default if none selected
  useEffect(() => {
    if (genderTab === 'female' && !selectedFemaleBehaviorId && femaleBehaviors.length > 0) {
      onFemaleBehaviorSelect(femaleBehaviors[0].id);
    } else if (genderTab === 'male' && !selectedMaleBehaviorId && maleBehaviors.length > 0) {
      onMaleBehaviorSelect(maleBehaviors[0].id);
    }
  }, [genderTab, selectedFemaleBehaviorId, selectedMaleBehaviorId]);

  return (
    <Tabs 
      value={genderTab} 
      onValueChange={(value) => onGenderTabChange(value as 'female' | 'male')}
      className="w-full"
    >
      <TabsList className="grid grid-cols-2 mb-4 w-full bg-lavender-blue/10">
        <TabsTrigger 
          value="female" 
          className="text-sm py-2 px-3 data-[state=active]:text-lavender-blue font-medium"
        >
          What She Means
        </TabsTrigger>
        <TabsTrigger 
          value="male" 
          className="text-sm py-2 px-3 data-[state=active]:text-lavender-blue font-medium"
        >
          What He Means
        </TabsTrigger>
      </TabsList>

      <TabsContent value="female" className="mt-0">
        <div className={`${isMobile ? "flex flex-col" : "grid grid-cols-5 gap-4"}`}>
          <div className={`${isMobile ? "mb-4" : "col-span-2"}`}>
            <BehaviorDropdown
              behaviors={femaleBehaviors}
              selectedBehaviorId={selectedFemaleBehaviorId}
              onBehaviorSelect={onFemaleBehaviorSelect}
              genderTab="female"
              isMobile={isMobile}
            />
          </div>
          <div className={`${isMobile ? "" : "col-span-3"}`}>
            {selectedBehavior && (
              <BehaviorExplanation 
                behavior={selectedBehavior}
                onStartChat={onStartChat}
                isMobile={isMobile}
              />
            )}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="male" className="mt-0">
        <div className={`${isMobile ? "flex flex-col" : "grid grid-cols-5 gap-4"}`}>
          <div className={`${isMobile ? "mb-4" : "col-span-2"}`}>
            <BehaviorDropdown
              behaviors={maleBehaviors}
              selectedBehaviorId={selectedMaleBehaviorId}
              onBehaviorSelect={onMaleBehaviorSelect}
              genderTab="male"
              isMobile={isMobile}
            />
          </div>
          <div className={`${isMobile ? "" : "col-span-3"}`}>
            {selectedBehavior && (
              <BehaviorExplanation 
                behavior={selectedBehavior} 
                onStartChat={onStartChat}
                isMobile={isMobile}
              />
            )}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default BehaviorTabs;
