
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import CustomizePhraseView from '@/components/mid-fight/CustomizePhraseView';
import ConversationDialog from '@/components/mid-fight/ConversationDialog';
import { useToast } from '@/hooks/use-toast';

// Import our new components
import PhraseList from './say-it-better/PhraseList';
import { useSearchFilters } from './say-it-better/useSearchFilters';
import { usePhraseManagement } from './say-it-better/usePhraseManagement';

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
      <div className="mb-4">
        <p className="text-sm text-midnight-indigo/70 mb-4">
          Find better ways to express difficult feelings without causing harm
        </p>
      </div>
      
      {/* Category filter only - removed search */}
      <div>
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full bg-white border border-lavender-blue/30 rounded-md p-2 text-sm focus:border-lavender-blue focus:outline-none focus:ring-1 focus:ring-lavender-blue"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
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
          // In a real app, this would send the invite
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
