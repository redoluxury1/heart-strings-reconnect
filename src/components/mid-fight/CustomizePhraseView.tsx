
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageCircle } from 'lucide-react';

interface CustomizePhraseViewProps {
  customPhrase: string;
  onCustomPhraseChange: (phrase: string) => void;
  onBack: () => void;
  onSave: () => void;
  onStartConversation: () => void;
}

const CustomizePhraseView: React.FC<CustomizePhraseViewProps> = ({
  customPhrase,
  onCustomPhraseChange,
  onBack,
  onSave,
  onStartConversation
}) => {
  return (
    <>
      <div className="mb-6">
        <Button
          variant="ghost"
          className="text-midnight-indigo hover:bg-midnight-indigo/5 mb-2"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to phrases
        </Button>
        <h3 className="text-xl font-cormorant font-medium text-midnight-indigo mb-2">
          Customize your phrase
        </h3>
      </div>
      
      <textarea
        value={customPhrase}
        onChange={(e) => onCustomPhraseChange(e.target.value)}
        className="w-full border border-lavender-blue/30 rounded-lg p-3 mb-6 h-32 focus:outline-none focus:ring-1 focus:ring-lavender-blue"
      />
      
      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          className="border-midnight-indigo text-midnight-indigo hover:bg-midnight-indigo/10"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          New Topic
        </Button>
        <Button
          variant="default"
          className="bg-lavender-blue hover:bg-lavender-blue/90 text-white"
          onClick={onStartConversation}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Let's Talk
        </Button>
      </div>
    </>
  );
};

export default CustomizePhraseView;
