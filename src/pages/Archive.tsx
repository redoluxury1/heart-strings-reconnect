
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Book, Heart, BookOpen } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import ContentContainer from '../components/common/ContentContainer';
import SavedRephrases from '../components/archive/SavedRephrases';
import LoveNotesArchive from '../components/archive/LoveNotesArchive';
import JournalEntries from '../components/archive/JournalEntries';
import JournalBubblesHero from '../components/archive/JournalBubblesHero';
import { useIsMobile } from '../hooks/use-mobile';

const Archive = () => {
  const [activeTab, setActiveTab] = useState('saved-rephrases');
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-[#F1ECE8]">
      <Navbar />
      
      <div className="py-10">
        <ContentContainer>
          <JournalBubblesHero />
          
          <p className="text-center mb-10 max-w-2xl mx-auto text-midnight-indigo/70 mt-16">
            Everything worth holding onto—from the things you've said to the love you've received.
          </p>
          
          <Tabs
            defaultValue="saved-rephrases"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="flex flex-col sm:flex-row justify-center mb-8 bg-transparent p-1 gap-2">
              <div className="flex flex-col sm:flex-row justify-center w-full gap-2">
                <TabsTrigger 
                  value="saved-rephrases"
                  className="flex items-center gap-2 py-3 px-5 data-[state=active]:bg-midnight-indigo data-[state=active]:text-white rounded-full text-xs sm:text-sm"
                >
                  <Book className="h-4 w-4" />
                  <span>Saved Rephrases</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="love-notes"
                  className="flex items-center gap-2 py-3 px-5 data-[state=active]:bg-mauve-rose data-[state=active]:text-white rounded-full text-xs sm:text-sm"
                >
                  <Heart className="h-4 w-4" />
                  <span>Love Notes</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="thoughts"
                  className="flex items-center gap-2 py-3 px-5 data-[state=active]:bg-soft-blush data-[state=active]:text-midnight-indigo rounded-full text-xs sm:text-sm"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Thoughts</span>
                </TabsTrigger>
              </div>
            </TabsList>
            
            <TabsContent value="saved-rephrases">
              <SavedRephrases />
            </TabsContent>
            
            <TabsContent value="love-notes">
              <LoveNotesArchive />
            </TabsContent>
            
            <TabsContent value="thoughts">
              <div className="text-center mb-8">
                <p className="text-midnight-indigo text-lg font-medium">Just need to get it out?</p>
                <p className="text-midnight-indigo/70">This space is only for you.</p>
              </div>
              <JournalEntries />
            </TabsContent>
          </Tabs>
        </ContentContainer>
      </div>
    </div>
  );
};

export default Archive;
