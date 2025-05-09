
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

  // Sample phrases that users can quickly select
  const examplePhrases = [
    "You're trying to control everything I do",
    "This is not a big deal",
    "You never listen to me",
    "You always make it about you"
  ];

  const handleTranslate = () => {
    if (inputText.trim()) {
      const result = translateStatement(inputText);
      setTranslation(result);
    }
  };

  const handleExampleClick = (phrase: string) => {
    setInputText(phrase);
    const result = translateStatement(phrase);
    setTranslation(result);
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
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-[#22254a] mb-3">
          Say It Better
        </h3>
        <p className="text-sm text-[#22254a]/70 mb-2">
          Type what you want to say, and we'll translate how it might be received
        </p>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-6">
        {examplePhrases.map((phrase, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs bg-white border-[#536878]/30 text-[#536878] hover:bg-[#536878]/10 mb-1 py-2 px-3 h-auto"
            onClick={() => handleExampleClick(phrase)}
          >
            "{phrase}"
          </Button>
        ))}
      </div>
      
      <Textarea
        placeholder="Type what you want to say... (e.g., 'This is not a big deal.')"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="min-h-[100px] border-[#536878]/30 focus:border-[#536878]"
      />
      
      <Button 
        onClick={handleTranslate} 
        className="w-full bg-[#22254a] hover:bg-[#22254a]/90 mt-5 py-3"
        disabled={!inputText.trim()}
      >
        Translate
      </Button>
      
      {translation && (
        <div className="mt-8 space-y-5 bg-soft-blush/20 p-5 rounded-md">
          <div>
            <h4 className="text-md font-medium text-[#C7747F] mb-2">How It Might Land:</h4>
            <p className="bg-white p-4 rounded border border-[#C7747F]/20 text-[#22254a]/90">
              "{translation.heardAs}"
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-[#8A8AC9] mb-2">Try Saying Instead:</h4>
            <p className="bg-white p-4 rounded border border-[#8A8AC9]/30 text-[#22254a]/90">
              "{translation.trySaying}"
            </p>
          </div>
          
          <Button 
            onClick={handleStartChat} 
            className="bg-[#C7747F] hover:bg-[#C7747F]/90 text-white mt-5 w-full py-3"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Start a Chat
          </Button>
        </div>
      )}
    </div>
  );
};

export default HeardTranslator;
