
import React, { useState } from 'react';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { useIsMobile } from '@/hooks/use-mobile';
import CustomizePhraseView from '../CustomizePhraseView';
import ConversationDialog from '../ConversationDialog';
import MobileBehaviorToggle from './behavior-decoder/MobileBehaviorToggle';
import BehaviorTabs from './behavior-decoder/BehaviorTabs';

// Import behavior data functions
import { getFemaleBehaviors, getMaleBehaviors } from '@/data/behavior-data';

const BehaviorDecoder = () => {
  const [selectedFemaleBehaviorId, setSelectedFemaleBehaviorId] = useState<string>('');
  const [selectedMaleBehaviorId, setSelectedMaleBehaviorId] = useState<string>('');
  const [genderTab, setGenderTab] = useState<'female' | 'male'>('female');
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [customPhrase, setCustomPhrase] = useState('');
  const [startConversationOpen, setStartConversationOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const isMobile = useIsMobile();
  
  const handleStartChat = () => {
    const selectedBehavior = genderTab === 'female' 
      ? getFemaleBehaviors().find(b => b.id === selectedFemaleBehaviorId)
      : getMaleBehaviors().find(b => b.id === selectedMaleBehaviorId);
    
    if (selectedBehavior) {
      setCustomPhrase(selectedBehavior.response);
      setIsCustomizing(true);
    }
  };

  const handleStartConversation = () => {
    setStartConversationOpen(true);
  };

  const handleSendInvite = () => {
    // This would integrate with your notification system
    setStartConversationOpen(false);
    setIsCustomizing(false);
  };

  if (isCustomizing) {
    return (
      <div className="mt-2">
        <CustomizePhraseView
          customPhrase={customPhrase}
          onCustomPhraseChange={setCustomPhrase}
          onBackToTopics={() => setIsCustomizing(false)}
          onStartConversation={handleStartConversation}
        />
        
        <ConversationDialog
          isOpen={startConversationOpen}
          onOpenChange={setStartConversationOpen}
          partnerName="Partner"
          onSendInvite={handleSendInvite}
        />
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-midnight-indigo mb-2">
          He Said, She Said
        </h3>
        <p className="text-sm text-midnight-indigo/70 mb-2">
          Understand what's behind common reactions during conflict
        </p>
      </div>

      <Collapsible
        open={!isMobile || isDropdownOpen}
        onOpenChange={isMobile ? setIsDropdownOpen : undefined}
      >
        <MobileBehaviorToggle 
          isDropdownOpen={isDropdownOpen}
          genderTab={genderTab}
          isMobile={isMobile}
        />
        
        <CollapsibleContent className={isMobile ? "animate-accordion-down" : ""}>
          <BehaviorTabs 
            genderTab={genderTab}
            onGenderTabChange={(value) => {
              setGenderTab(value);
              // Reset selected behaviors when switching tabs
              if (value === 'female') {
                setSelectedMaleBehaviorId('');
              } else {
                setSelectedFemaleBehaviorId('');
              }
            }}
            selectedFemaleBehaviorId={selectedFemaleBehaviorId}
            selectedMaleBehaviorId={selectedMaleBehaviorId}
            onFemaleBehaviorSelect={setSelectedFemaleBehaviorId}
            onMaleBehaviorSelect={setSelectedMaleBehaviorId}
            onStartChat={handleStartChat}
            isMobile={isMobile}
          />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default BehaviorDecoder;
