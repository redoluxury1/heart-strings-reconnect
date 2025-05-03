
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getRealIssues } from '@/data/real-issues-data';
import { MessageCircle } from 'lucide-react';
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
    <div className="space-y-4">
      <div className="mb-3">
        <h3 className="text-lg font-medium text-midnight-indigo mb-2">
          Cut to the Point
        </h3>
        <p className="text-sm text-midnight-indigo/70">
          Tap what's actually bothering you underneath it all
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {realIssues.map((issue) => (
          <Button
            key={issue.id}
            variant={selectedIssue?.id === issue.id ? "default" : "outline"}
            className={`text-left justify-start h-auto py-3 w-full ${
              selectedIssue?.id === issue.id 
                ? "bg-lavender-blue text-white" 
                : "border-lavender-blue/30 hover:bg-lavender-blue/10 hover:text-mauve-rose"
            }`}
            onClick={() => setSelectedIssue(issue)}
          >
            <span className="line-clamp-2">{issue.label}</span>
          </Button>
        ))}
      </div>
      
      {selectedIssue && (
        <div className="mt-6 space-y-4 bg-soft-blush/20 p-4 rounded-md">
          <div>
            <h4 className="text-md font-medium text-mauve-rose mb-1">What's Really Going On:</h4>
            <p className="text-midnight-indigo/90 text-sm">
              {selectedIssue.explanation}
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-lavender-blue mb-1">Express It This Way:</h4>
            <p className="bg-white p-3 rounded border border-lavender-blue/30 text-midnight-indigo/90">
              "{selectedIssue.suggestion}"
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

export default RealFightAbout;
