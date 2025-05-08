
import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCw, Flag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PatternRecognitionFlow from './pattern-recognition/PatternRecognitionFlow';
import { useState } from 'react';

const OkayButNowWhat = () => {
  const navigate = useNavigate();
  const [showPatternTool, setShowPatternTool] = useState(false);
  const [showFlagTool, setShowFlagTool] = useState(false);
  
  const handlePatternToolToggle = () => {
    setShowPatternTool(!showPatternTool);
    setShowFlagTool(false);
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
        onClose={() => setShowPatternTool(false)} 
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

// White Flag Tool Component
const WhiteFlagTool = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  const templates = [
    {
      id: 'timeout',
      title: 'Request a Timeout',
      message: "I need some space to calm down. Can we take 20 minutes to cool off and then talk?"
    },
    {
      id: 'truce',
      title: 'Call a Truce',
      message: "I want to find a way forward with you. Can we put this aside for now and talk when we're both feeling better?"
    },
    {
      id: 'apologize',
      title: 'Simple Apology',
      message: "I'm sorry for how I reacted. That wasn't fair to you. Can we try again?"
    },
    {
      id: 'reconnect',
      title: 'Reconnection Request',
      message: "This feels hard right now, but I still care about you. Can we find a way to reset?"
    }
  ];
  
  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-2xl font-medium text-[#2e2a63] mb-6 text-center">Choose a message template</h3>
      
      <div className="grid grid-cols-1 gap-4 mb-8">
        {templates.map(template => (
          <div 
            key={template.id}
            className={`border p-4 rounded-lg cursor-pointer transition-all ${
              selectedTemplate === template.id 
                ? 'border-[#c06b6b] bg-[#fce6d4]/30' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <h4 className="font-medium text-[#2e2a63] mb-2">{template.title}</h4>
            <p className="text-[#2e2a63]">{template.message}</p>
          </div>
        ))}
      </div>
      
      {selectedTemplate && (
        <div className="mt-6 flex justify-center space-x-4">
          <Button className="bg-[#c06b6b] hover:bg-[#a35757] text-white px-6">
            Copy Text
          </Button>
          <Button className="bg-[#2e2a63] hover:bg-[#1e1a43] text-white px-6">
            Send Message
          </Button>
        </div>
      )}
    </div>
  );
};

export default OkayButNowWhat;
