
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
          <h1 className="font-cormorant text-3xl md:text-4xl font-bold text-midnight-indigo mb-8 text-center">
            The Archive
          </h1>
          
          <p className="text-center mb-10 max-w-lg mx-auto text-midnight-indigo/80">
            Your personal collection of communication insights, love notes, and reflections.
          </p>
          
          <Tabs
            defaultValue="saved-rephrases"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger 
                value="saved-rephrases"
                className="flex flex-col items-center space-y-2 py-3"
              >
                <Book className="h-5 w-5" />
                <span>Saved Rephrases</span>
              </TabsTrigger>
              <TabsTrigger 
                value="love-notes"
                className="flex flex-col items-center space-y-2 py-3"
              >
                <Heart className="h-5 w-5" />
                <span>Love Notes</span>
              </TabsTrigger>
              <TabsTrigger 
                value="journal"
                className="flex flex-col items-center space-y-2 py-3"
              >
                <BookOpen className="h-5 w-5" />
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
