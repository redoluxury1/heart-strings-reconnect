
import React, { useState } from 'react';
import { Puzzle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeardTranslator from './whats-going-on/HeardTranslator';
import RealFightAbout from './whats-going-on/RealFightAbout';
import BehaviorDecoder from './whats-going-on/BehaviorDecoder';
import { useIsMobile } from '@/hooks/use-mobile';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

const WhatsReallyGoingOn = () => {
  const [activeTab, setActiveTab] = useState("translator");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();

  // Map tab values to display names
  const tabNames = {
    "translator": "Say It Better",
    "realfight": "Cut to the Point",
    "behaviors": "He Said, She Said"
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
        <CollapsibleTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full mb-3 md:mb-6 justify-between py-2 md:py-3 text-sm md:text-base"
          >
            <span className="font-medium">{tabNames[activeTab as keyof typeof tabNames]}</span>
            <span className="flex items-center">
              {isCollapsed ? <ChevronDown className="h-4 w-4 ml-1" /> : <ChevronUp className="h-4 w-4 ml-1" />}
            </span>
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className={`${isMobile ? 'pt-3' : 'pt-4 md:pt-6'}`}>
          <Card className="border-lavender-blue/20 shadow-md">
            <Tabs 
              defaultValue="translator" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-1 gap-1 p-2 mb-3 md:mb-5 w-full">
                <TabsTrigger 
                  value="translator" 
                  className="text-sm py-2 md:py-3 px-3 md:px-4 justify-start"
                >
                  Say It Better
                </TabsTrigger>
                <TabsTrigger 
                  value="realfight" 
                  className="text-sm py-2 md:py-3 px-3 md:px-4 justify-start"
                >
                  Cut to the Point
                </TabsTrigger>
                <TabsTrigger 
                  value="behaviors" 
                  className="text-sm py-2 md:py-3 px-3 md:px-4 justify-start"
                >
                  He Said, She Said
                </TabsTrigger>
              </TabsList>
              <div className={`${isMobile ? 'p-3' : 'p-4 md:p-6'}`}>
                <TabsContent value="translator" className="mt-0 pt-2">
                  <HeardTranslator />
                </TabsContent>
                <TabsContent value="realfight" className="mt-0 pt-2">
                  <RealFightAbout />
                </TabsContent>
                <TabsContent value="behaviors" className="mt-0 pt-2">
                  <BehaviorDecoder />
                </TabsContent>
              </div>
            </Tabs>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default WhatsReallyGoingOn;
