
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
    <div className="text-center max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-cormorant font-medium text-[#2e2a63] mb-6">
          🌀 Pattern: <span className="text-[#D3876A]">{pattern.name}</span>
        </h2>
        
        <div className="bg-[#F9F5EF] rounded-xl p-8 mb-6 border border-[#E7D9C9] text-left space-y-6">
          <div>
            <h3 className="text-lg font-medium text-[#2e2a63] mb-2">What's happening:</h3>
            <p className="text-[#2e2a63]/90">
              {pattern.explanation}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-[#2e2a63] mb-2">Why it happens:</h3>
            <p className="text-[#2e2a63]/90 italic">
              {pattern.insight}
            </p>
          </div>
          
          <div className="border-t border-[#E7D9C9] pt-6">
            <h3 className="text-lg font-medium text-[#D3876A] mb-3">Try this next time:</h3>
            <p className="text-[#2e2a63] leading-relaxed">
              {pattern.repairAdvice}
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-[#2e2a63]/70 mb-4">🧭 Want more help?</p>
          <Button 
            onClick={handleBridgeTheGap}
            className="bg-[#D3876A] hover:bg-[#D3876A]/90 text-white px-8 py-3 rounded-xl text-lg font-medium flex items-center gap-2 mx-auto"
          >
            Try Bridge the Gap <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatternResultStep;
