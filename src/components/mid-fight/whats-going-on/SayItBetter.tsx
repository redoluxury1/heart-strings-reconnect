
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import CustomizePhraseView from '@/components/mid-fight/CustomizePhraseView';
import ConversationDialog from '@/components/mid-fight/ConversationDialog';
import { useToast } from '@/hooks/use-toast';

// Import our new components
import SearchFilters from './say-it-better/SearchFilters';
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
    searchTerm, 
    selectedCategory, 
    categories, 
    filteredPhrases, 
    setSearchTerm, 
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
        <h3 className="text-lg font-medium text-midnight-indigo mb-3">
          Say It Better
        </h3>
        <p className="text-sm text-midnight-indigo/70 mb-4">
          Find better ways to express difficult feelings without causing harm
        </p>
      </div>
      
      {/* Search and filter */}
      <SearchFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />
      
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
