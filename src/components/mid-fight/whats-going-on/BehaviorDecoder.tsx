
import React, { useState } from 'react';
import { getBehaviors } from '@/data/behavior-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Behavior {
  id: string;
  behavior: string;
  meaning: string;
  response: string;
}

const BehaviorDecoder = () => {
  const [selectedBehaviorId, setSelectedBehaviorId] = useState<string>('');
  const behaviors = getBehaviors();
  
  const selectedBehavior = behaviors.find(b => b.id === selectedBehaviorId);
  
  return (
    <div className="space-y-4">
      <div className="mb-3">
        <h3 className="text-lg font-medium text-midnight-indigo mb-2">
          Decode Her Behavior
        </h3>
        <p className="text-sm text-midnight-indigo/70">
          Select a behavior to understand what it might mean
        </p>
      </div>
      
      <Select
        value={selectedBehaviorId}
        onValueChange={setSelectedBehaviorId}
      >
        <SelectTrigger className="w-full border-lavender-blue/30">
          <SelectValue placeholder="Choose a behavior..." />
        </SelectTrigger>
        <SelectContent>
          {behaviors.map((behavior) => (
            <SelectItem key={behavior.id} value={behavior.id}>
              {behavior.behavior}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {selectedBehavior && (
        <div className="mt-6 space-y-4 bg-soft-blush/20 p-4 rounded-md">
          <div>
            <h4 className="text-md font-medium text-mauve-rose mb-1">What This Likely Means:</h4>
            <p className="text-midnight-indigo/90 text-sm">
              {selectedBehavior.meaning}
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-lavender-blue mb-1">Try Saying:</h4>
            <p className="bg-white p-3 rounded border border-lavender-blue/30 text-midnight-indigo/90">
              "{selectedBehavior.response}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BehaviorDecoder;
