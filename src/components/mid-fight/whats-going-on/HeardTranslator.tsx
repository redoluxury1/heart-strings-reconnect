
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { translateStatement } from '@/data/translator-data';
import { MessageCircle } from 'lucide-react';
import CustomizePhraseView from '../CustomizePhraseView';
import ConversationDialog from '../ConversationDialog';

const HeardTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState<{
    heardAs: string;
    trySaying: string;
  } | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [customPhrase, setCustomPhrase] = useState('');
  const [startConversationOpen, setStartConversationOpen] = useState(false);

  const handleTranslate = () => {
    if (inputText.trim()) {
      const result = translateStatement(inputText);
      setTranslation(result);
    }
  };

  const handleStartChat = () => {
    if (translation) {
      setCustomPhrase(translation.trySaying);
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
          Say It Better
        </h3>
        <p className="text-sm text-midnight-indigo/70">
          Type what you want to say, and we'll translate how it might be received
        </p>
      </div>
      
      <Textarea
        placeholder="Type what you want to say... (e.g., 'This is not a big deal.')"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="min-h-[80px]"
      />
      
      <Button 
        onClick={handleTranslate} 
        className="w-full bg-midnight-indigo hover:bg-midnight-indigo/90"
        disabled={!inputText.trim()}
      >
        Translate
      </Button>
      
      {translation && (
        <div className="mt-6 space-y-4 bg-soft-blush/20 p-4 rounded-md">
          <div>
            <h4 className="text-md font-medium text-mauve-rose mb-1">How It Might Land:</h4>
            <p className="bg-white p-3 rounded border border-mauve-rose/20 text-midnight-indigo/90">
              "{translation.heardAs}"
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-lavender-blue mb-1">Try Saying Instead:</h4>
            <p className="bg-white p-3 rounded border border-lavender-blue/30 text-midnight-indigo/90">
              "{translation.trySaying}"
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
    </div>
  );
};

export default HeardTranslator;
