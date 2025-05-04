
import React, { useState } from 'react';
import { Puzzle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import HeardTranslator from './whats-going-on/HeardTranslator';
import RealFightAbout from './whats-going-on/RealFightAbout';
import BehaviorDecoder from './whats-going-on/BehaviorDecoder';
import SayItBetter from './whats-going-on/SayItBetter';
import { useIsMobile } from '@/hooks/use-mobile';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const WhatsReallyGoingOn = () => {
  const [activeFeature, setActiveFeature] = useState<'translator' | 'realfight' | 'behaviors' | 'sayitbetter'>('translator');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();

  // Map feature values to display names
  const featureNames = {
    'translator': 'Say It Better',
    'sayitbetter': 'Phrase Library',
    'realfight': 'Cut to the Point',
    'behaviors': 'He Said, She Said'
  };

  return (
    <div className={`space-y-4 md:space-y-8 ${isMobile ? 'py-4' : 'py-6 md:py-8'}`}>
      <div className="flex flex-col items-center mb-4 md:mb-8">
        <Puzzle className="h-12 md:h-20 w-12 md:w-20 text-mauve-rose mb-3 md:mb-5" />
        <h3 className="text-xl md:text-2xl font-cormorant font-medium text-midnight-indigo mb-2 md:mb-4 text-center">
          What's Really Going On?
        </h3>
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
              onClick={() => setActiveFeature('translator')}
            >
              Say It Better
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="py-3 cursor-pointer" 
              onClick={() => setActiveFeature('sayitbetter')}
            >
              Phrase Library
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
              {activeFeature === "translator" && (
                <HeardTranslator />
              )}
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
