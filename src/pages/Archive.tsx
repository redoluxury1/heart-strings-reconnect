
import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Book, Heart, BookOpen } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import ContentContainer from '../components/common/ContentContainer';
import SavedRephrases from '../components/archive/SavedRephrases';
import LoveNotesArchive from '../components/archive/LoveNotesArchive';
import JournalEntries from '../components/archive/JournalEntries';

const Archive = () => {
  const [activeTab, setActiveTab] = useState('saved-rephrases');

  return (
    <div className="min-h-screen bg-soft-cream">
      <Navbar />
      
      <div className="py-10">
        <ContentContainer>
          <h1 className="font-cormorant text-3xl md:text-4xl font-bold text-midnight-indigo mb-4 text-center">
            The Archive
          </h1>
          
          <p className="text-center mb-10 max-w-2xl mx-auto text-midnight-indigo/70">
            Everything worth holding onto—from the things you've said to the love you've received.
          </p>
          
          <Tabs
            defaultValue="saved-rephrases"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="flex justify-center mb-8 bg-transparent p-1 gap-2">
              <TabsTrigger 
                value="saved-rephrases"
                className="flex items-center gap-2 py-3 px-5 data-[state=active]:bg-soft-blush rounded-full"
              >
                <Book className="h-4 w-4" />
                <span>Saved Rephrases</span>
              </TabsTrigger>
              <TabsTrigger 
                value="love-notes"
                className="flex items-center gap-2 py-3 px-5 data-[state=active]:bg-soft-blush rounded-full"
              >
                <Heart className="h-4 w-4" />
                <span>Love Notes</span>
              </TabsTrigger>
              <TabsTrigger 
                value="journal"
                className="flex items-center gap-2 py-3 px-5 data-[state=active]:bg-soft-blush rounded-full"
              >
                <BookOpen className="h-4 w-4" />
                <span>Journal</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="saved-rephrases">
              <SavedRephrases />
            </TabsContent>
            
            <TabsContent value="love-notes">
              <LoveNotesArchive />
            </TabsContent>
            
            <TabsContent value="journal">
              <JournalEntries />
            </TabsContent>
          </Tabs>
        </ContentContainer>
      </div>
    </div>
  );
};

export default Archive;
