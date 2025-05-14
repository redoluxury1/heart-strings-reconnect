
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import CustomizePhraseView from '../CustomizePhraseView';
import ConversationDialog from '../ConversationDialog';
import BehaviorDropdown from './behavior-decoder/BehaviorDropdown';
import BehaviorExplanation from './behavior-decoder/BehaviorExplanation';
import { Behavior, getFemaleBehaviors, getMaleBehaviors, getBehaviorById } from '@/data/behavior-data';

// Component type definitions
type BehaviorType = 'her' | 'him';
type ViewType = 'select' | 'explanation';

const BehaviorDecoder = () => {
  const isMobile = useIsMobile();
  const [selectedBehavior, setSelectedBehavior] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<BehaviorType>('her');
  const [currentView, setCurrentView] = useState<ViewType>('select');
  
  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customPhrase, setCustomPhrase] = useState('');

  const handleBehaviorSelect = (behavior: string) => {
    setSelectedBehavior(behavior);
    setCurrentView('explanation');
  };
  
  const handleBackToSelect = () => {
    setCurrentView('select');
    setSelectedBehavior(null);
  };
  
  const handleGenderToggle = (gender: BehaviorType) => {
    setSelectedGender(gender);
    // Reset to selection view when switching genders
    setCurrentView('select');
    setSelectedBehavior(null);
  };
  
  const openDialog = (phrase: string) => {
    setCustomPhrase(phrase);
    setIsDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCustomPhraseChange = (phrase: string) => {
    setCustomPhrase(phrase);
  };

  const handleStartConversation = () => {
    // Handle conversation start
    setIsDialogOpen(false);
  };
  
  // Get behaviors based on selected gender
  const behaviors = selectedGender === 'her' ? getFemaleBehaviors() : getMaleBehaviors();
  
  // Get the behavior object if selectedBehavior is not null
  const behaviorObject = selectedBehavior ? getBehaviorById(selectedBehavior) : undefined;
  
  return (
    <div className="space-y-6">
      {/* Two text boxes facing opposite directions design */}
      <div className="flex justify-center items-center gap-4 mb-6">
        <div className="bg-lavender-blue/20 p-3 rounded-lg transform -rotate-6">
          <div className="text-[#07183D] font-medium border-2 border-lavender-blue/40 rounded-lg px-4 py-2 shadow-sm">
            He said...
          </div>
        </div>
        <div className="bg-mauve-rose/20 p-3 rounded-lg transform rotate-6">
          <div className="text-[#07183D] font-medium border-2 border-mauve-rose/40 rounded-lg px-4 py-2 shadow-sm">
            She said...
          </div>
        </div>
      </div>

      {/* Gender Toggle Buttons */}
      <div className="flex justify-center gap-3 mb-4">
        <Button 
          variant={selectedGender === 'her' ? 'default' : 'outline'} 
          onClick={() => handleGenderToggle('her')}
          className={`rounded-full px-5 py-2 ${selectedGender === 'her' ? 'bg-mauve-rose text-white' : 'border-mauve-rose text-mauve-rose'}`}
        >
          She Says
        </Button>
        <Button 
          variant={selectedGender === 'him' ? 'default' : 'outline'} 
          onClick={() => handleGenderToggle('him')}
          className={`rounded-full px-5 py-2 ${selectedGender === 'him' ? 'bg-lavender-blue text-white' : 'border-lavender-blue text-lavender-blue'}`}
        >
          He Says
        </Button>
      </div>

      {/* Content based on current view */}
      {currentView === 'select' ? (
        <BehaviorDropdown 
          behaviors={behaviors} 
          selectedBehaviorId={selectedBehavior || ''}
          onBehaviorSelect={handleBehaviorSelect}
          genderTab={selectedGender === 'her' ? 'female' : 'male'} 
          isMobile={isMobile}
        />
      ) : (
        behaviorObject && (
          <BehaviorExplanation 
            behavior={behaviorObject}
            onStartChat={() => openDialog(behaviorObject.response)}
            isMobile={isMobile}
          />
        )
      )}

      {/* Dialog for customizing phrases */}
      <ConversationDialog 
        isOpen={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        partnerName="Partner"
        onSendInvite={handleStartConversation}
      />

      {/* Need to wrap CustomizePhraseView in a component that accepts the right props */}
      {isDialogOpen && (
        <CustomizePhraseView
          customPhrase={customPhrase}
          onCustomPhraseChange={handleCustomPhraseChange}
          onBackToTopics={handleCloseDialog}
          onStartConversation={handleStartConversation}
        />
      )}
    </div>
  );
};

export default BehaviorDecoder;
