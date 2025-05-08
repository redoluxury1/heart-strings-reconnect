
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import WouldYouRatherGame from '@/components/games/would-you-rather/WouldYouRatherGame';
import DateWheel from '@/components/games/date-wheel/DateWheel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Reconnect = () => {
  const [currentTab, setCurrentTab] = useState<string>("would-you-rather");
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="py-12">
        <ContentContainer maxWidth="lg">
          <h1 className="text-4xl md:text-5xl font-cormorant font-medium text-midnight-indigo text-center mb-3">
            Reconnect & Have Fun
          </h1>
          
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Grow closer with these playful activities designed to help you learn about each other and create new memories.
          </p>
          
          <Tabs
            defaultValue="would-you-rather"
            value={currentTab}
            onValueChange={setCurrentTab}
            className="w-full max-w-3xl mx-auto"
          >
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="would-you-rather">Would You Rather Game</TabsTrigger>
              <TabsTrigger value="date-wheel">Date Night Wheel</TabsTrigger>
            </TabsList>
            
            <TabsContent value="would-you-rather" className="focus-visible:outline-none">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-cormorant font-medium text-midnight-indigo text-center mb-4">
                  Would You Rather: Couples Edition
                </h2>
                
                <p className="text-center text-gray-600 mb-8">
                  Have fun discovering each other's preferences and see how well you know one another.
                </p>
                
                <WouldYouRatherGame />
              </div>
            </TabsContent>
            
            <TabsContent value="date-wheel" className="focus-visible:outline-none">
              <DateWheel />
            </TabsContent>
          </Tabs>
        </ContentContainer>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reconnect;
