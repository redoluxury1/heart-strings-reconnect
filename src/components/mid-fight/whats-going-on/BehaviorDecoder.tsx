
import React, { useState } from 'react';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { useIsMobile } from '@/hooks/use-mobile';
import CustomizePhraseView from '../CustomizePhraseView';
import ConversationDialog from '../ConversationDialog';
import { Button } from '@/components/ui/button';
import BehaviorDropdown from './behavior-decoder/BehaviorDropdown';
import BehaviorExplanation from './behavior-decoder/BehaviorExplanation';
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
        <p className="text-sm text-midnight-indigo/70 mb-2">
          Understand what's behind common reactions during conflict
        </p>
      </div>

      {/* Gender Toggle Bubbles - Now Stacked Vertically */}
      <div className="flex flex-col gap-4 mb-6">
        <Button
          variant="outline"
          className={`rounded-full px-4 py-6 text-sm flex items-center justify-center h-auto ${
            genderTab === 'male' 
              ? 'bg-lavender-blue text-white border-lavender-blue' 
              : 'bg-white text-midnight-indigo/80 border-lavender-blue/30 hover:bg-lavender-blue/10'
          }`}
          onClick={() => {
            setGenderTab('male');
            setSelectedFemaleBehaviorId('');
          }}
        >
          <span className="text-center">He doesn't hate you, he...</span>
        </Button>
        
        <Button
          variant="outline"
          className={`rounded-full px-4 py-6 text-sm flex items-center justify-center h-auto ${
            genderTab === 'female' 
              ? 'bg-mauve-rose text-white border-mauve-rose' 
              : 'bg-white text-midnight-indigo/80 border-mauve-rose/30 hover:bg-mauve-rose/10'
          }`}
          onClick={() => {
            setGenderTab('female');
            setSelectedMaleBehaviorId('');
          }}
        >
          <span className="text-center">She's not mad, she...</span>
        </Button>
      </div>

      <div className={`${isMobile ? "flex flex-col" : "grid grid-cols-5 gap-4"}`}>
        <div className={`${isMobile ? "mb-4" : "col-span-2"}`}>
          <BehaviorDropdown
            behaviors={genderTab === 'female' ? getFemaleBehaviors() : getMaleBehaviors()}
            selectedBehaviorId={genderTab === 'female' ? selectedFemaleBehaviorId : selectedMaleBehaviorId}
            onBehaviorSelect={genderTab === 'female' ? setSelectedFemaleBehaviorId : setSelectedMaleBehaviorId}
            genderTab={genderTab}
            isMobile={isMobile}
          />
        </div>
        <div className={`${isMobile ? "" : "col-span-3"}`}>
          {genderTab === 'female' && selectedFemaleBehaviorId && (
            <BehaviorExplanation 
              behavior={getFemaleBehaviors().find(b => b.id === selectedFemaleBehaviorId)!}
              onStartChat={handleStartChat}
              isMobile={isMobile}
            />
          )}
          {genderTab === 'male' && selectedMaleBehaviorId && (
            <BehaviorExplanation 
              behavior={getMaleBehaviors().find(b => b.id === selectedMaleBehaviorId)!}
              onStartChat={handleStartChat}
              isMobile={isMobile}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BehaviorDecoder;
