
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Pattern } from '../types/PatternTypes';
import { useNavigate } from 'react-router-dom';

interface PatternResultStepProps {
  pattern: Pattern;
}

const PatternResultStep: React.FC<PatternResultStepProps> = ({ pattern }) => {
  const navigate = useNavigate();

  const handleBridgeTheGap = () => {
    navigate('/bridge-the-gap');
  };

  return (
    <div className="text-center max-w-lg mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-cormorant font-medium text-[#2e2a63] mb-4">
          Looks like you're stuck in a <span className="text-[#D3876A]">{pattern.name}</span> loop.
        </h2>
        
        <div className="bg-[#F9F5EF] rounded-lg p-6 mb-6 border border-[#E7D9C9]">
          <p className="text-[#2e2a63] mb-4">
            {pattern.explanation}
          </p>
          <div className="border-t border-[#E7D9C9] pt-4">
            <p className="text-[#2e2a63]/80 italic">
              {pattern.insight}
            </p>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={handleBridgeTheGap}
        className="bg-[#D3876A] hover:bg-[#D3876A]/90 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto"
      >
        Try to Bridge the Gap <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default PatternResultStep;
