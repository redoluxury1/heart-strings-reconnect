
import React, { useState } from 'react';
import { Puzzle, MessageCircle, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeardTranslator from './whats-going-on/HeardTranslator';
import RealFightAbout from './whats-going-on/RealFightAbout';
import BehaviorDecoder from './whats-going-on/BehaviorDecoder';

const WhatsReallyGoingOn = () => {
  const [activeTab, setActiveTab] = useState("translator");

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center mb-2">
        <Puzzle className="h-16 md:h-20 w-16 md:w-20 text-mauve-rose mb-3" />
        <h3 className="text-2xl font-cormorant font-medium text-midnight-indigo mb-2 text-center">
          What's Really Going On?
        </h3>
        <p className="text-midnight-indigo/80 text-center max-w-2xl">
          Fast insight tools to help you decode what's happening when things get heated.
        </p>
      </div>

      <Card className="border-lavender-blue/20">
        <Tabs 
          defaultValue="translator" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="translator" className="text-xs md:text-sm">
              Say It Better
            </TabsTrigger>
            <TabsTrigger value="realfight" className="text-xs md:text-sm">
              Cut to the Point
            </TabsTrigger>
            <TabsTrigger value="behaviors" className="text-xs md:text-sm">
              Decode Their Behavior
            </TabsTrigger>
          </TabsList>
          <TabsContent value="translator" className="p-4">
            <HeardTranslator />
          </TabsContent>
          <TabsContent value="realfight" className="p-4">
            <RealFightAbout />
          </TabsContent>
          <TabsContent value="behaviors" className="p-4">
            <BehaviorDecoder />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default WhatsReallyGoingOn;
