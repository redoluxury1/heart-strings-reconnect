
import React, { useState } from 'react';
import { getFemaleBehaviors, getMaleBehaviors } from '@/data/behavior-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useIsMobile } from '@/hooks/use-mobile';
import CustomizePhraseView from '../CustomizePhraseView';
import ConversationDialog from '../ConversationDialog';

interface Behavior {
  id: string;
  behavior: string;
  meaning: string;
  response: string;
}

const BehaviorDecoder = () => {
  const [selectedFemaleBehaviorId, setSelectedFemaleBehaviorId] = useState<string>('');
  const [selectedMaleBehaviorId, setSelectedMaleBehaviorId] = useState<string>('');
  const [genderTab, setGenderTab] = useState<'female' | 'male'>('female');
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [customPhrase, setCustomPhrase] = useState('');
  const [startConversationOpen, setStartConversationOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const femaleBehaviors = getFemaleBehaviors();
  const maleBehaviors = getMaleBehaviors();
  
  const selectedFemaleBehavior = femaleBehaviors.find(b => b.id === selectedFemaleBehaviorId);
  const selectedMaleBehavior = maleBehaviors.find(b => b.id === selectedMaleBehaviorId);

  const isMobile = useIsMobile();
  
  const handleStartChat = () => {
    const selectedBehavior = genderTab === 'female' 
      ? selectedFemaleBehavior 
      : selectedMaleBehavior;
    
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
      <>
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
      </>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="mb-3">
        <h3 className="text-lg font-medium text-midnight-indigo mb-2">
          He Said, She Said
        </h3>
        <p className="text-sm text-midnight-indigo/70">
          Understand what's behind common reactions during conflict
        </p>
      </div>

      <Collapsible
        open={!isMobile || isDropdownOpen}
        onOpenChange={isMobile ? setIsDropdownOpen : undefined}
      >
        {isMobile && (
          <CollapsibleTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full mb-4 flex justify-between items-center"
            >
              <span>{genderTab === 'female' ? 'She's not mad, she...' : 'He doesn't hate you, he...'}</span>
              <span>{isDropdownOpen ? '▲' : '▼'}</span>
            </Button>
          </CollapsibleTrigger>
        )}
        
        <CollapsibleContent>
          <Tabs 
            defaultValue="female" 
            value={genderTab}
            onValueChange={(value) => setGenderTab(value as 'female' | 'male')}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="female" className="text-xs md:text-sm">
                She's not mad, she...
              </TabsTrigger>
              <TabsTrigger value="male" className="text-xs md:text-sm">
                He doesn't hate you, he...
              </TabsTrigger>
            </TabsList>

            <TabsContent value="female" className="space-y-4">
              <Select
                value={selectedFemaleBehaviorId}
                onValueChange={setSelectedFemaleBehaviorId}
              >
                <SelectTrigger className="w-full border-lavender-blue/30">
                  <SelectValue placeholder="Choose a behavior..." />
                </SelectTrigger>
                <SelectContent>
                  {femaleBehaviors.map((behavior) => (
                    <SelectItem key={behavior.id} value={behavior.id}>
                      {behavior.behavior}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedFemaleBehavior && (
                <div className="mt-6 space-y-4 bg-soft-blush/20 p-4 rounded-md">
                  <div>
                    <h4 className="text-md font-medium text-mauve-rose mb-1">What This Likely Means:</h4>
                    <p className="text-midnight-indigo/90 text-sm">
                      {selectedFemaleBehavior.meaning}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-medium text-lavender-blue mb-1">Try Saying:</h4>
                    <p className="bg-white p-3 rounded border border-lavender-blue/30 text-midnight-indigo/90">
                      "{selectedFemaleBehavior.response}"
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleStartChat} 
                    className="bg-lavender-blue hover:bg-lavender-blue/90 text-white mt-3 w-full"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Start a Chat
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="male" className="space-y-4">
              <Select
                value={selectedMaleBehaviorId}
                onValueChange={setSelectedMaleBehaviorId}
              >
                <SelectTrigger className="w-full border-lavender-blue/30">
                  <SelectValue placeholder="Choose a behavior..." />
                </SelectTrigger>
                <SelectContent>
                  {maleBehaviors.map((behavior) => (
                    <SelectItem key={behavior.id} value={behavior.id}>
                      {behavior.behavior}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedMaleBehavior && (
                <div className="mt-6 space-y-4 bg-soft-blush/20 p-4 rounded-md">
                  <div>
                    <h4 className="text-md font-medium text-mauve-rose mb-1">What This Likely Means:</h4>
                    <p className="text-midnight-indigo/90 text-sm">
                      {selectedMaleBehavior.meaning}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-medium text-lavender-blue mb-1">Try Saying:</h4>
                    <p className="bg-white p-3 rounded border border-lavender-blue/30 text-midnight-indigo/90">
                      "{selectedMaleBehavior.response}"
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleStartChat} 
                    className="bg-lavender-blue hover:bg-lavender-blue/90 text-white mt-3 w-full"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Start a Chat
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default BehaviorDecoder;
