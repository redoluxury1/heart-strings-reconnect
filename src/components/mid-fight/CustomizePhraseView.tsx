
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, BookmarkPlus, RotateCcw } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface CustomizePhraseViewProps {
  customPhrase: string;
  onCustomPhraseChange: (phrase: string) => void;
  onBackToTopics: () => void;
  onStartConversation: () => void;
  onSaveToLibrary?: () => void;
  showSaveOption?: boolean;
  isFromSayThisInstead?: boolean;
}

const CustomizePhraseView: React.FC<CustomizePhraseViewProps> = ({
  customPhrase,
  onCustomPhraseChange,
  onBackToTopics,
  onStartConversation,
  onSaveToLibrary,
  showSaveOption = false,
  isFromSayThisInstead = false
}) => {
  return (
    <>
      <div className="mb-4">
        <h3 className="text-xl font-cormorant font-medium text-[#22254a] mb-2">
          {isFromSayThisInstead ? "Make it yours" : "Customize your phrase"}
        </h3>
        <p className="text-sm text-[#22254a]/70 italic">
          {isFromSayThisInstead 
            ? "You're rewriting the way you speak when it's hardest. Say it how you would—but softer."
            : "Speak in your own voice—but let it come from a calm place."}
        </p>
      </div>
      
      <Textarea
        value={customPhrase}
        onChange={(e) => onCustomPhraseChange(e.target.value)}
        className="w-full border border-[#8A8AC9]/30 rounded-lg p-3 mb-4 h-32 focus:outline-none focus:ring-1 focus:ring-[#8A8AC9]"
      />
      
      <div className="flex flex-col items-center gap-3">
        <Button
          variant="default"
          className="bg-[#C7747F] hover:bg-[#C7747F]/90 text-white"
          onClick={onStartConversation}
        >
          <MessageCircle className="h-4 w-4 mr-1" />
          Say what you mean
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="border-[#536878]/40 text-[#22254a] hover:bg-[#536878]/10 hover:text-[#536878] hover:border-[#536878]/40 h-7 px-2 py-0 text-xs"
          onClick={onBackToTopics}
        >
          <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
          Start over
        </Button>
        
        {showSaveOption && onSaveToLibrary && (
          <Button
            variant="outline"
            className="border-[#8A8AC9] text-[#8A8AC9] hover:bg-[#8A8AC9]/10 hover:text-[#8A8AC9]"
            onClick={onSaveToLibrary}
          >
            <BookmarkPlus className="h-4 w-4 mr-1" />
            Save
          </Button>
        )}
      </div>
    </>
  );
};

export default CustomizePhraseView;
