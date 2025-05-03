
import React, { useState } from 'react';
import { Puzzle, MessageCircle, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeardTranslator from './whats-going-on/HeardTranslator';
import RealFightAbout from './whats-going-on/RealFightAbout';
import BehaviorDecoder from './whats-going-on/BehaviorDecoder';
import { useIsMobile } from '@/hooks/use-mobile';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

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
    <div className="space-y-6">
      <div className="flex flex-col items-center mb-4">
        <Puzzle className="h-16 md:h-20 w-16 md:w-20 text-mauve-rose mb-3" />
        <h3 className="text-2xl font-cormorant font-medium text-midnight-indigo mb-3 text-center">
          What's Really Going On?
        </h3>
        <p className="text-midnight-indigo/80 text-center max-w-2xl">
          Fast insight tools to help you decode what's happening when things get heated.
        </p>
      </div>

      <Collapsible open={!isCollapsed} onOpenChange={setIsCollapsed}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full mb-5 justify-between"
          >
            <span>{tabNames[activeTab as keyof typeof tabNames]}</span>
            <span>{isCollapsed ? "▼ Show Tool" : "▲ Hide Tool"}</span>
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="pt-4">
          <Card className="border-lavender-blue/20">
            <Tabs 
              defaultValue="translator" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className={`grid ${isMobile ? 'grid-cols-1 gap-2 p-3 mb-2' : 'grid-cols-3 mb-4'} w-full`}>
                {isMobile ? (
                  <>
                    <TabsTrigger value="translator" className="text-xs md:text-sm py-3">
                      Say It Better
                    </TabsTrigger>
                    <TabsTrigger value="realfight" className="text-xs md:text-sm py-3">
                      Cut to the Point
                    </TabsTrigger>
                    <TabsTrigger value="behaviors" className="text-xs md:text-sm py-3">
                      He Said, She Said
                    </TabsTrigger>
                  </>
                ) : (
                  <>
                    <TabsTrigger value="translator" className="text-xs md:text-sm py-3">
                      Say It Better
                    </TabsTrigger>
                    <TabsTrigger value="realfight" className="text-xs md:text-sm py-3">
                      Cut to the Point
                    </TabsTrigger>
                    <TabsTrigger value="behaviors" className="text-xs md:text-sm py-3">
                      He Said, She Said
                    </TabsTrigger>
                  </>
                )}
              </TabsList>
              <div className="p-6">
                <TabsContent value="translator" className="mt-0">
                  <HeardTranslator />
                </TabsContent>
                <TabsContent value="realfight" className="mt-0">
                  <RealFightAbout />
                </TabsContent>
                <TabsContent value="behaviors" className="mt-0">
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
