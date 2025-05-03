
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getRealIssues } from '@/data/real-issues-data';

interface RealIssue {
  id: string;
  label: string;
  explanation: string;
  suggestion: string;
}

const RealFightAbout = () => {
  const [selectedIssue, setSelectedIssue] = useState<RealIssue | null>(null);
  const realIssues = getRealIssues();
  
  return (
    <div className="space-y-4">
      <div className="mb-3">
        <h3 className="text-lg font-medium text-midnight-indigo mb-2">
          What's Really Bothering You?
        </h3>
        <p className="text-sm text-midnight-indigo/70">
          Tap the option that feels closest to what's really going on
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {realIssues.map((issue) => (
          <Button
            key={issue.id}
            variant={selectedIssue?.id === issue.id ? "default" : "outline"}
            className={`text-left justify-start h-auto py-3 ${
              selectedIssue?.id === issue.id 
                ? "bg-lavender-blue text-white" 
                : "border-lavender-blue/30 hover:bg-lavender-blue/10"
            }`}
            onClick={() => setSelectedIssue(issue)}
          >
            {issue.label}
          </Button>
        ))}
      </div>
      
      {selectedIssue && (
        <div className="mt-6 space-y-4 bg-soft-blush/20 p-4 rounded-md">
          <div>
            <h4 className="text-md font-medium text-mauve-rose mb-1">What's Really Going On:</h4>
            <p className="text-midnight-indigo/90 text-sm">
              {selectedIssue.explanation}
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-lavender-blue mb-1">Try Expressing It This Way:</h4>
            <p className="bg-white p-3 rounded border border-lavender-blue/30 text-midnight-indigo/90">
              "{selectedIssue.suggestion}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealFightAbout;
