
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import RealFightAbout from './whats-going-on/RealFightAbout';
import BehaviorDecoder from './whats-going-on/BehaviorDecoder';
import SayItBetter from './whats-going-on/SayItBetter';
import { useIsMobile } from '@/hooks/use-mobile';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const WhatsReallyGoingOn = () => {
  const [activeFeature, setActiveFeature] = useState<'sayitbetter' | 'realfight' | 'behaviors'>('sayitbetter');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();

  // Map feature values to display names
  const featureNames = {
    'sayitbetter': 'Say It Better',
    'realfight': 'Cut to the Point',
    'behaviors': 'He Said, She Said'
  };

  return (
    <div className={`space-y-4 md:space-y-8 ${isMobile ? 'py-4' : 'py-6 md:py-8'}`}>
      <div className="flex flex-col items-center mb-4 md:mb-8">
        {/* Custom title styling to replace the icon */}
        <div className="relative font-cormorant text-center my-4">
          <div className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight relative z-10">
            <span className="text-lavender-blue">What's</span>
            <span className="mx-1 md:mx-2 text-mauve-rose">Really</span>
            <span className="text-lavender-blue">Going On?</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="w-full h-[30%] bg-gradient-to-r from-lavender-blue/10 via-mauve-rose/10 to-lavender-blue/10 blur-md rounded-full"></div>
          </div>
        </div>
        
        <p className="text-midnight-indigo/80 text-center max-w-2xl px-4 text-sm md:text-base">
          Fast insight tools to help you decode what's happening when things get heated.
        </p>
      </div>

      <Collapsible open={!isCollapsed} onOpenChange={setIsCollapsed}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full mb-3 md:mb-6 justify-between py-2 md:py-3 text-sm md:text-base"
            >
              <span className="font-medium">{featureNames[activeFeature]}</span>
              <span className="flex items-center">
                <ChevronDown className="h-4 w-4 ml-1" />
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[calc(100%-1rem)] bg-white">
            <DropdownMenuItem 
              className="py-3 cursor-pointer" 
              onClick={() => setActiveFeature('sayitbetter')}
            >
              Say It Better
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="py-3 cursor-pointer" 
              onClick={() => setActiveFeature('realfight')}
            >
              Cut to the Point
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="py-3 cursor-pointer" 
              onClick={() => setActiveFeature('behaviors')}
            >
              He Said, She Said
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <CollapsibleContent className={`${isMobile ? 'pt-3' : 'pt-4 md:pt-6'}`}>
          <Card className="border-lavender-blue/20 shadow-md">
            <div className={`${isMobile ? 'p-3' : 'p-4 md:p-6'}`}>
              {activeFeature === "sayitbetter" && (
                <SayItBetter />
              )}
              {activeFeature === "realfight" && (
                <RealFightAbout />
              )}
              {activeFeature === "behaviors" && (
                <BehaviorDecoder />
              )}
            </div>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default WhatsReallyGoingOn;
