
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import CustomizePhraseView from '@/components/mid-fight/CustomizePhraseView';
import ConversationDialog from '@/components/mid-fight/ConversationDialog';
import { useToast } from '@/hooks/use-toast';

// Import components
import PhraseList from './say-it-better/PhraseList';
import { useSearchFilters } from './say-it-better/useSearchFilters';
import { usePhraseManagement } from './say-it-better/usePhraseManagement';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SayItBetterProps {
  allowSave?: boolean;
}

const SayItBetter: React.FC<SayItBetterProps> = ({ allowSave = false }) => {
  const { toast } = useToast();
  
  // Custom hooks for search/filtering and phrase management
  const { 
    selectedCategory, 
    categories, 
    filteredPhrases, 
    setSelectedCategory 
  } = useSearchFilters();
  
  const { 
    expandedPhraseId,
    isCustomizeOpen,
    isConversationOpen,
    currentPhrase,
    customizedPhrase,
    handlePhraseClick,
    handleCustomize,
    handleStartConversation,
    handleSavePhrase,
    setIsCustomizeOpen,
    setIsConversationOpen,
    setCustomizedPhrase
  } = usePhraseManagement({ allowSave });

  return (
    <div className="space-y-6">
      {/* Category dropdown */}
      <div className="w-full">
        <Select 
          value={selectedCategory} 
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-full bg-white border-[#536878]/30 hover:border-[#536878] focus:border-[#536878] py-3 text-[#22254a]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Results */}
      <PhraseList 
        phrases={filteredPhrases}
        expandedPhraseId={expandedPhraseId}
        onPhraseClick={handlePhraseClick}
        onCustomize={handleCustomize}
        onSavePhrase={handleSavePhrase}
        allowSave={allowSave}
      />

      {/* Customize phrase dialog */}
      <Dialog open={isCustomizeOpen} onOpenChange={setIsCustomizeOpen}>
        <DialogContent className="sm:max-w-md">
          {currentPhrase && (
            <CustomizePhraseView
              customPhrase={customizedPhrase}
              onCustomPhraseChange={setCustomizedPhrase}
              onBackToTopics={() => setIsCustomizeOpen(false)}
              onStartConversation={handleStartConversation}
              showSaveOption={allowSave}
              onSaveToLibrary={() => {
                if (currentPhrase) handleSavePhrase(currentPhrase);
                setIsCustomizeOpen(false);
              }}
              isFromSayThisInstead={true}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Conversation dialog */}
      <ConversationDialog
        isOpen={isConversationOpen}
        onOpenChange={setIsConversationOpen}
        partnerName="Partner" 
        onSendInvite={() => {
          console.log('Sending conversation invite with phrase:', customizedPhrase);
          toast({
            title: "Conversation Started",
            description: "We've sent your partner a notification to start the conversation.",
          });
        }}
      />
    </div>
  );
};

export default SayItBetter;
