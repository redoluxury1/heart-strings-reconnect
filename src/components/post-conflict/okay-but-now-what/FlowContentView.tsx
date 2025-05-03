
import React from 'react';
import { Button } from '@/components/ui/button';
import PatternRecognitionFlow from '../pattern-recognition/PatternRecognitionFlow';
import RepairPlanFlow from '../repair-plan/RepairPlanFlow';

interface FlowContentViewProps {
  activeFlow: 'pattern' | 'repair';
  onBack: () => void;
}

const FlowContentView: React.FC<FlowContentViewProps> = ({
  activeFlow,
  onBack
}) => {
  return (
    <div className="rounded-xl shadow-md">
      <div className="mb-4">
        <Button 
          variant="ghost" 
          className="text-midnight-indigo hover:bg-transparent hover:text-midnight-indigo/70"
          onClick={onBack}
        >
          ← Back to options
        </Button>
      </div>
      
      {activeFlow === 'pattern' ? (
        <PatternRecognitionFlow />
      ) : (
        <RepairPlanFlow />
      )}
    </div>
  );
};

export default FlowContentView;
