
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getRealIssues } from '@/data/real-issues-data';
import { MessageCircle, Target } from 'lucide-react';
import CustomizePhraseView from '../CustomizePhraseView';
import ConversationDialog from '../ConversationDialog';

interface RealIssue {
  id: string;
  label: string;
  explanation: string;
  suggestion: string;
}

const RealFightAbout = () => {
  const [selectedIssue, setSelectedIssue] = useState<RealIssue | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [customPhrase, setCustomPhrase] = useState('');
  const [startConversationOpen, setStartConversationOpen] = useState(false);
  const realIssues = getRealIssues();
  
  const handleStartChat = () => {
    if (selectedIssue) {
      setCustomPhrase(selectedIssue.suggestion);
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
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 rounded-full bg-soft-cream/70 flex items-center justify-center">
          <Target className="h-6 w-6 text-mauve-rose" />
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-center text-midnight-indigo/90 mb-4">
          Tap what's actually bothering you underneath it all
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {realIssues.map((issue) => (
          <Button
            key={issue.id}
            variant={selectedIssue?.id === issue.id ? "default" : "outline"}
            className={`text-left justify-start h-auto py-3 px-4 w-full whitespace-normal ${
              selectedIssue?.id === issue.id 
                ? "bg-mauve-rose/90 text-white" 
                : "border-mauve-rose/30 hover:bg-mauve-rose/10 hover:text-mauve-rose text-midnight-indigo"
            }`}
            onClick={() => setSelectedIssue(issue)}
          >
            <span>{issue.label}</span>
          </Button>
        ))}
      </div>
      
      {selectedIssue && (
        <div className="mt-6 space-y-5 bg-soft-blush/20 p-5 rounded-md">
          <div>
            <h4 className="text-md font-medium text-mauve-rose mb-2">What's Really Going On:</h4>
            <p className="text-midnight-indigo text-sm">
              {selectedIssue.explanation}
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-lavender-blue mb-2">Express It This Way:</h4>
            <p className="bg-white p-4 rounded border border-lavender-blue/30 text-midnight-indigo">
              "{selectedIssue.suggestion}"
            </p>
          </div>
          
          <Button 
            onClick={handleStartChat} 
            className="bg-mauve-rose hover:bg-mauve-rose/90 text-white mt-4 w-full py-2.5"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Start a Chat
          </Button>
        </div>
      )}
    </div>
  );
};

export default RealFightAbout;
