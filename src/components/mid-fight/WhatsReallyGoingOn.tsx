
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Edit, Target, MessageSquare } from 'lucide-react';
import RealFightAbout from './whats-going-on/RealFightAbout';
import BehaviorDecoder from './whats-going-on/BehaviorDecoder';
import SayItBetter from './whats-going-on/SayItBetter';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WhatsReallyGoingOn = () => {
  const [activeTab, setActiveTab] = useState<string>('sayitbetter');
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6 py-4 md:py-8">
      <Tabs 
        defaultValue="sayitbetter" 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-8 w-full">
          <TabsTrigger value="sayitbetter">Say It Better</TabsTrigger>
          <TabsTrigger value="realfight">Cut to the Point</TabsTrigger>
          <TabsTrigger value="behaviors">He Said, She Said</TabsTrigger>
        </TabsList>

        <TabsContent value="sayitbetter" className="mt-2">
          <Card className="border-lavender-blue/20 shadow-md">
            <div className="p-6">
              <SayItBetter />
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="realfight" className="mt-2">
          <Card className="border-lavender-blue/20 shadow-md">
            <div className="p-6">
              <RealFightAbout />
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="behaviors" className="mt-2">
          <Card className="border-lavender-blue/20 shadow-md">
            <div className="p-6">
              <BehaviorDecoder />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhatsReallyGoingOn;
