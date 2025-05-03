
import React, { useState } from 'react';
import { getFemaleBehaviors, getMaleBehaviors } from '@/data/behavior-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Behavior {
  id: string;
  behavior: string;
  meaning: string;
  response: string;
}

const BehaviorDecoder = () => {
  const [selectedFemaleBehaviorId, setSelectedFemaleBehaviorId] = useState<string>('');
  const [selectedMaleBehaviorId, setSelectedMaleBehaviorId] = useState<string>('');
  const [genderTab, setGenderTab] = useState<'female' | 'male'>('female');
  
  const femaleBehaviors = getFemaleBehaviors();
  const maleBehaviors = getMaleBehaviors();
  
  const selectedFemaleBehavior = femaleBehaviors.find(b => b.id === selectedFemaleBehaviorId);
  const selectedMaleBehavior = maleBehaviors.find(b => b.id === selectedMaleBehaviorId);
  
  return (
    <div className="space-y-4">
      <div className="mb-3">
        <h3 className="text-lg font-medium text-midnight-indigo mb-2">
          Decode Their Behavior
        </h3>
        <p className="text-sm text-midnight-indigo/70">
          Understand what's behind common reactions during conflict
        </p>
      </div>
      
      <Tabs 
        defaultValue="female" 
        value={genderTab}
        onValueChange={(value) => setGenderTab(value as 'female' | 'male')}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 w-full mb-4">
          <TabsTrigger value="female">
            She's not mad, she...
          </TabsTrigger>
          <TabsTrigger value="male">
            He doesn't hate you, he...
          </TabsTrigger>
        </TabsList>

        <TabsContent value="female" className="space-y-4">
          <Select
            value={selectedFemaleBehaviorId}
            onValueChange={setSelectedFemaleBehaviorId}
          >
            <SelectTrigger className="w-full border-lavender-blue/30">
              <SelectValue placeholder="Choose a behavior..." />
            </SelectTrigger>
            <SelectContent>
              {femaleBehaviors.map((behavior) => (
                <SelectItem key={behavior.id} value={behavior.id}>
                  {behavior.behavior}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {selectedFemaleBehavior && (
            <div className="mt-6 space-y-4 bg-soft-blush/20 p-4 rounded-md">
              <div>
                <h4 className="text-md font-medium text-mauve-rose mb-1">What This Likely Means:</h4>
                <p className="text-midnight-indigo/90 text-sm">
                  {selectedFemaleBehavior.meaning}
                </p>
              </div>
              
              <div>
                <h4 className="text-md font-medium text-lavender-blue mb-1">Try Saying:</h4>
                <p className="bg-white p-3 rounded border border-lavender-blue/30 text-midnight-indigo/90">
                  "{selectedFemaleBehavior.response}"
                </p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="male" className="space-y-4">
          <Select
            value={selectedMaleBehaviorId}
            onValueChange={setSelectedMaleBehaviorId}
          >
            <SelectTrigger className="w-full border-lavender-blue/30">
              <SelectValue placeholder="Choose a behavior..." />
            </SelectTrigger>
            <SelectContent>
              {maleBehaviors.map((behavior) => (
                <SelectItem key={behavior.id} value={behavior.id}>
                  {behavior.behavior}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {selectedMaleBehavior && (
            <div className="mt-6 space-y-4 bg-soft-blush/20 p-4 rounded-md">
              <div>
                <h4 className="text-md font-medium text-mauve-rose mb-1">What This Likely Means:</h4>
                <p className="text-midnight-indigo/90 text-sm">
                  {selectedMaleBehavior.meaning}
                </p>
              </div>
              
              <div>
                <h4 className="text-md font-medium text-lavender-blue mb-1">Try Saying:</h4>
                <p className="bg-white p-3 rounded border border-lavender-blue/30 text-midnight-indigo/90">
                  "{selectedMaleBehavior.response}"
                </p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BehaviorDecoder;
