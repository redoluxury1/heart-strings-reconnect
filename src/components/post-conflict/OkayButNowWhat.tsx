
import React, { useState } from 'react';
import { RotateCw, Flag } from 'lucide-react';
import WhiteFlagModal from './steps/summary/components/WhiteFlagModal';
import PatternRecognitionFlow from './pattern-recognition/PatternRecognitionFlow';

const OkayButNowWhat: React.FC = () => {
  const [isWhiteFlagModalOpen, setIsWhiteFlagModalOpen] = useState(false);
  const [isPatternRecognitionOpen, setIsPatternRecognitionOpen] = useState(false);

  const handleWhiteFlagClick = () => {
    setIsWhiteFlagModalOpen(true);
  };

  const handlePatternRecognitionClick = () => {
    setIsPatternRecognitionOpen(true);
  };

  if (isPatternRecognitionOpen) {
    return (
      <section className="bg-white py-10 px-4 rounded-lg shadow-sm">
        <PatternRecognitionFlow onClose={() => setIsPatternRecognitionOpen(false)} />
      </section>
    );
  }

  return (
    <section className="bg-white py-10 px-4 rounded-lg shadow-sm">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-[#2e2a63] mb-3">
            Okay, but now what?
          </h2>
          
          <p className="text-[#2e2a63] text-lg max-w-2xl mx-auto">
            You've cooled down, but things still feel unresolved. Here are some ways to move forward—together.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Pattern Recognition Button - Now fully functional */}
          <div 
            className="bg-white rounded-lg border shadow-sm relative overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={handlePatternRecognitionClick}
          >
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-[#e1d8ed] p-3 rounded-full mb-4">
                <RotateCw className="h-8 w-8 text-[#2e2a63]" />
              </div>
              
              <h3 className="text-xl font-medium text-[#2e2a63] mb-2">Recognize a Pattern</h3>
              <p className="text-[#2e2a63]">
                Identify the fight you keep having—and why it keeps showing up.
              </p>
            </div>
          </div>
          
          {/* White Flag Tool */}
          <div 
            className="bg-white rounded-lg border shadow-sm relative overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={handleWhiteFlagClick}
          >
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-[#FDF0E9] p-3 rounded-full mb-4">
                <Flag className="h-8 w-8 text-[#D3876A]" />
              </div>
              <h3 className="text-xl font-medium text-[#2e2a63] mb-2">Send a White Flag</h3>
              <p className="text-[#2e2a63]">
                Simple messages to help de-escalate when things start to heat up.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* White Flag Modal */}
      <WhiteFlagModal 
        isOpen={isWhiteFlagModalOpen} 
        onClose={() => setIsWhiteFlagModalOpen(false)} 
      />
    </section>
  );
};

export default OkayButNowWhat;
