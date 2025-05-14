
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SideBySideView from './SideBySideView';
import TabbedView from './TabbedView';
import { SessionData } from '@/components/post-conflict/context/SessionContext';
import { PartnerData } from '../types/partner-data';

interface TabViewProps {
  sessionData: SessionData;
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabView: React.FC<TabViewProps> = ({ sessionData, activeTab, setActiveTab }) => {
  // Extract the relevant data for display
  const partner1: PartnerData = {
    tone: sessionData.partner1.responses.complete?.intent || "Unknown",
    perspective: sessionData.partner1.responses.complete?.perspective || "No perspective shared",
    wish: sessionData.partner1.responses.complete?.understanding || "No wishes shared",
    need: sessionData.partner1.responses.complete?.needs || "No needs shared",
    emotions: sessionData.partner1.responses.emotions || []
  };
  
  const partner2: PartnerData = {
    tone: sessionData.partner2.responses.complete?.intent || "Unknown",
    perspective: sessionData.partner2.responses.complete?.perspective || "No perspective shared",
    wish: sessionData.partner2.responses.complete?.understanding || "No wishes shared",
    need: sessionData.partner2.responses.complete?.needs || "No needs shared",
    emotions: sessionData.partner2.responses.emotions || []
  };

  return (
    <Tabs
      defaultValue="side-by-side"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="side-by-side">Side by Side</TabsTrigger>
        <TabsTrigger value="tabbed">Partner Tabs</TabsTrigger>
      </TabsList>
      
      {/* Side-by-Side View */}
      <TabsContent value="side-by-side" className="w-full">
        <SideBySideView partner1={partner1} partner2={partner2} />
      </TabsContent>
      
      {/* Tabbed View */}
      <TabsContent value="tabbed" className="w-full">
        <TabbedView partner1={partner1} partner2={partner2} />
      </TabsContent>
    </Tabs>
  );
};

export default TabView;
