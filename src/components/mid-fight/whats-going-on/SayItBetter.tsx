
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import CustomizePhraseView from '@/components/mid-fight/CustomizePhraseView';
import ConversationDialog from '@/components/mid-fight/ConversationDialog';
import { useToast } from '@/hooks/use-toast';

// Import our components
import PhraseList from './say-it-better/PhraseList';
import { useSearchFilters } from './say-it-better/useSearchFilters';
import { usePhraseManagement } from './say-it-better/usePhraseManagement';

interface SayItBetterProps {
  allowSave?: boolean;
}

const SayItBetter: React.FC<SayItBetterProps> = ({ allowSave = false }) => {
  const { toast } = useToast();
  const [showCategories, setShowCategories] = useState(false);
  
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

  // Category selection interface
  if (showCategories) {
    return (
      <div className="space-y-4">
        <div className="mb-4">
          <h4 className="text-lg font-medium text-midnight-indigo mb-2">
            Select a category
          </h4>
          <p className="text-sm text-midnight-indigo/70">
            Choose a category to find phrases for your situation
          </p>
        </div>
        
        <div className="space-y-2">
          {['all', ...categories].map((category) => (
            <Button
              key={category}
              variant="outline"
              className={`w-full justify-between py-3 px-4 border-lavender-blue/20 ${
                selectedCategory === category 
                  ? 'bg-mauve-rose/10 text-mauve-rose border-mauve-rose/30' 
                  : 'hover:bg-mauve-rose/5 text-midnight-indigo'
              }`}
              onClick={() => {
                setSelectedCategory(category);
                setShowCategories(false);
              }}
            >
              <span>{category === 'all' ? 'All Categories' : category}</span>
              <ChevronRight className="h-4 w-4 text-mauve-rose/70" />
            </Button>
          ))}
        </div>
      </div>
    );
  }

  // Main phrase list view
  return (
    <div className="space-y-6">
      <Button
        variant="outline"
        className="w-full flex justify-between items-center bg-mauve-rose/20 hover:bg-mauve-rose/30 border-mauve-rose/20 text-midnight-indigo py-3"
        onClick={() => setShowCategories(true)}
      >
        <span>
          {selectedCategory === 'all' 
            ? 'Select a category' 
            : `Category: ${selectedCategory}`}
        </span>
        <ChevronRight className="h-4 w-4" />
      </Button>
      
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
