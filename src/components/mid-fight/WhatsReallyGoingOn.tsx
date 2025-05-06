
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Edit, Target, MessageSquare, ChevronRight } from 'lucide-react';
import RealFightAbout from './whats-going-on/RealFightAbout';
import BehaviorDecoder from './whats-going-on/BehaviorDecoder';
import SayItBetter from './whats-going-on/SayItBetter';
import { useIsMobile } from '@/hooks/use-mobile';

type ToolType = 'sayitbetter' | 'realfight' | 'behaviors' | null;

const WhatsReallyGoingOn = () => {
  const [activeTool, setActiveTool] = useState<ToolType>(null);
  const isMobile = useIsMobile();
  
  // Map tool values to display names and descriptions
  const toolInfo = {
    'sayitbetter': {
      title: 'Say It Better',
      description: 'Find better ways to express difficult feelings without causing harm.',
      icon: <Edit className="h-5 w-5 text-mauve-rose" />
    },
    'realfight': {
      title: 'Cut to the Point',
      description: '', // Removed the description as requested
      icon: <Target className="h-5 w-5 text-mauve-rose" />
    },
    'behaviors': {
      title: 'He Said, She Said',
      description: 'Translate behaviors across different perspectives and communication styles.',
      icon: <MessageSquare className="h-5 w-5 text-mauve-rose" />
    }
  };

  // Render tool selection if no tool is active
  if (!activeTool) {
    return (
      <div className="space-y-6 py-4 md:py-8">
        <div className="mb-6 text-center">
          <h3 className="text-xl md:text-2xl font-medium text-midnight-indigo mb-2">
            Tap a tool to decode what's happening underneath the conflict.
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(toolInfo).map(([key, info]) => (
            <button
              key={key}
              onClick={() => setActiveTool(key as ToolType)}
              className="bg-white rounded-2xl p-5 shadow-sm border border-lavender-blue/10 hover:border-lavender-blue/30 transition-all duration-200 text-left"
            >
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-soft-cream/50 flex items-center justify-center mr-3">
                  {info.icon}
                </div>
                <h4 className="text-lg font-medium text-midnight-indigo">{info.title}</h4>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const currentTool = toolInfo[activeTool];

  return (
    <div className="space-y-6 py-4 md:py-8">
      <button 
        onClick={() => setActiveTool(null)}
        className="flex items-center text-sm text-lavender-blue mb-4 hover:text-mauve-rose transition-colors"
      >
        <span className="transform rotate-180"><ChevronRight className="h-4 w-4 inline" /></span>
        <span className="ml-1">Back to tools</span>
      </button>
      
      <Card className="border-lavender-blue/20 shadow-md">
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-2xl md:text-3xl font-cormorant text-midnight-indigo text-center mb-2">
              {currentTool.title}
            </h3>
            <p className="text-midnight-indigo/80 text-center text-sm md:text-base">
              {currentTool.description}
            </p>
          </div>

          <div>
            {activeTool === "sayitbetter" && <SayItBetter />}
            {activeTool === "realfight" && <RealFightAbout />}
            {activeTool === "behaviors" && <BehaviorDecoder />}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WhatsReallyGoingOn;
