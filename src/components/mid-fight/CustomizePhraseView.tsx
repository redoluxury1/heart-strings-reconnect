
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface CustomizePhraseViewProps {
  customPhrase: string;
  onCustomPhraseChange: (phrase: string) => void;
  onBackToTopics: () => void;
  onStartConversation: () => void;
}

const CustomizePhraseView: React.FC<CustomizePhraseViewProps> = ({
  customPhrase,
  onCustomPhraseChange,
  onBackToTopics,
  onStartConversation
}) => {
  return (
    <>
      <div className="mb-6">
        <h3 className="text-xl font-cormorant font-medium text-midnight-indigo mb-2">
          Customize your phrase
        </h3>
        <p className="text-sm text-midnight-indigo/70 italic">
          Speak in your own voice—but let it come from a calm place.
        </p>
      </div>
      
      <Textarea
        value={customPhrase}
        onChange={(e) => onCustomPhraseChange(e.target.value)}
        className="w-full border border-lavender-blue/30 rounded-lg p-3 mb-6 h-32 focus:outline-none focus:ring-1 focus:ring-lavender-blue"
      />
      
      <div className="flex justify-center space-x-4 px-4">
        <Button
          variant="outline"
          className="border-midnight-indigo text-midnight-indigo hover:bg-mauve-rose/10 hover:text-mauve-rose hover:border-mauve-rose/40 px-3"
          onClick={onBackToTopics}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          New Phrase
        </Button>
        <Button
          variant="default"
          className="bg-lavender-blue hover:bg-lavender-blue/90 text-white px-3"
          onClick={onStartConversation}
        >
          <MessageCircle className="h-4 w-4 mr-1" />
          Say it with care
        </Button>
      </div>
    </>
  );
};

export default CustomizePhraseView;
