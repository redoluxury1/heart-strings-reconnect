
import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCw, Flag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PatternRecognitionFlow from './pattern-recognition/PatternRecognitionFlow';
import { useState } from 'react';
import WhiteFlagTool from './white-flag/WhiteFlagTool';

const OkayButNowWhat = () => {
  const navigate = useNavigate();
  const [showPatternTool, setShowPatternTool] = useState(false);
  const [showFlagTool, setShowFlagTool] = useState(false);
  
  const handlePatternToolToggle = () => {
    // Save the current scroll position
    const currentScrollPos = window.scrollY;
    
    setShowPatternTool(!showPatternTool);
    setShowFlagTool(false);
    
    // Use setTimeout to allow the component to render before restoring the scroll position
    setTimeout(() => {
      window.scrollTo(0, currentScrollPos);
    }, 0);
  };
  
  const handleFlagToolToggle = () => {
    setShowFlagTool(!showFlagTool);
    setShowPatternTool(false);
  };
  
  // If pattern tool is shown in full-screen mode
  if (showPatternTool) {
    return (
      <PatternRecognitionFlow 
        fullScreen={true} 
        onClose={() => {
          const currentScrollPos = window.scrollY;
          setShowPatternTool(false);
          // Restore scroll position after closing
          setTimeout(() => window.scrollTo(0, currentScrollPos), 0);
        }} 
      />
    );
  }
  
  return (
    <section id="okay-but-now-what" className="bg-[#f8f5f0] rounded-xl shadow-sm p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-cormorant font-medium text-[#2e2a63] mb-3 text-center">
          OK but now what?
        </h2>
        
        <p className="text-center text-[#2e2a63] mb-10">
          You made it through the hard part. This section helps you keep it from happening again.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Pattern Recognition Button */}
          <div 
            className={`bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer ${showPatternTool ? 'ring-2 ring-[#2e2a63]' : ''}`} 
            onClick={handlePatternToolToggle}
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
          
          {/* Send a White Flag Button */}
          <div 
            className={`bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer ${showFlagTool ? 'ring-2 ring-[#c06b6b]' : ''}`}
            onClick={handleFlagToolToggle}
          >
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-[#fce6d4] p-3 rounded-full mb-4">
                <Flag className="h-8 w-8 text-[#c06b6b]" />
              </div>
              <h3 className="text-xl font-medium text-[#2e2a63] mb-2">Send a White Flag</h3>
              <p className="text-[#2e2a63]">
                Send a pause signal, call a truce, or say "I need space" without making it worse.
              </p>
            </div>
          </div>
        </div>
        
        {/* White Flag Tool Content Display (only shown if flag tool is active) */}
        {showFlagTool && (
          <div className="mt-8 transition-all duration-300">
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <WhiteFlagTool />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OkayButNowWhat;
