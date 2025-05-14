
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { MessageSquare } from 'lucide-react';
import CustomizePhraseView from '../CustomizePhraseView';
import ConversationDialog from '../ConversationDialog';
import BehaviorDropdown from './behavior-decoder/BehaviorDropdown';
import BehaviorExplanation from './behavior-decoder/BehaviorExplanation';

// Import behavior data functions
import { getFemaleBehaviors, getMaleBehaviors, Behavior } from '@/data/behavior-data';

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
    <div className="space-y-6">
      {/* Replace image with MessageSquare icon */}
      <div className="flex justify-center mb-6">
        <div className="bg-gradient-to-r from-mauve-rose to-midnight-indigo p-4 rounded-full">
          <MessageSquare 
            size={64} 
            className="text-white"
          />
        </div>
      </div>

      {/* Gender Toggle Buttons */}
      <div className="flex flex-col gap-3 mb-4">
        <Button
          variant="outline"
          className={`rounded-full px-4 py-1.5 text-sm flex items-center justify-center h-auto ${
            genderTab === 'male' 
              ? 'bg-midnight-indigo text-white border-midnight-indigo' 
              : 'bg-white text-midnight-indigo/80 border-midnight-indigo/30 hover:bg-midnight-indigo/10'
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
          className={`rounded-full px-4 py-1.5 text-sm flex items-center justify-center h-auto ${
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
        <div className={`${isMobile ? "mb-4" : "col-span-5"}`}>
          <BehaviorDropdown
            behaviors={genderTab === 'female' ? getFemaleBehaviors() : getMaleBehaviors()}
            selectedBehaviorId={genderTab === 'female' ? selectedFemaleBehaviorId : selectedMaleBehaviorId}
            onBehaviorSelect={genderTab === 'female' ? setSelectedFemaleBehaviorId : setSelectedMaleBehaviorId}
            genderTab={genderTab}
            isMobile={isMobile}
          />
        </div>
        
        {/* Show explanation when behavior is selected */}
        {((genderTab === 'female' && selectedFemaleBehaviorId) || 
          (genderTab === 'male' && selectedMaleBehaviorId)) && (
          <div className={`${isMobile ? "" : "col-span-5"} mt-4`}>
            <BehaviorExplanation 
              behavior={genderTab === 'female' 
                ? getFemaleBehaviors().find(b => b.id === selectedFemaleBehaviorId)!
                : getMaleBehaviors().find(b => b.id === selectedMaleBehaviorId)!}
              onStartChat={handleStartChat}
              isMobile={isMobile}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BehaviorDecoder;
