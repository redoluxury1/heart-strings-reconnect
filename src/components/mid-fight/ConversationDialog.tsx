
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { SendHorizontal, PenLine, MessageSquare } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { getPartnerResponsesForTopic } from '@/data/partner-responses';

interface ConversationDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  partnerName: string;
  onSendInvite: () => void;
  topicId?: string;
}

const ConversationDialog: React.FC<ConversationDialogProps> = ({
  isOpen,
  onOpenChange,
  partnerName,
  onSendInvite,
  topicId = 'something-else'
}) => {
  const [initialMessage, setInitialMessage] = useState('');
  const [inviteSent, setInviteSent] = useState(false);
  const [suggestedResponses, setSuggestedResponses] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (topicId) {
      setSuggestedResponses(getPartnerResponsesForTopic(topicId));
    }
  }, [topicId]);

  const handleSendInvite = () => {
    onSendInvite();
    setInviteSent(true);
  };

  const handleContinue = () => {
    setShowSuccess(true);
  };

  const handleReturnToToolkit = () => {
    setShowSuccess(false);
    setInviteSent(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {!showSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle>Send a gentle nudge to reconnect</DialogTitle>
              <DialogDescription>
                This lets your partner know you want to talk—without pressure, blame, or rehashing everything.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <p className="text-sm text-midnight-indigo/80">
                We'll suggest a softer message that opens the door, not slams it.
              </p>
              
              <div className="bg-soft-blush/20 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">How it works:</p>
                <ul className="text-xs space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="bg-lavender-blue/20 text-lavender-blue rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">1</span>
                    <span>Your partner gets a gentle notification to reconnect.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-lavender-blue/20 text-lavender-blue rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">2</span>
                    <span>You can send a message while waiting—or just open the space.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-lavender-blue/20 text-lavender-blue rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">3</span>
                    <span>The app will help you phrase things with calm and care.</span>
                  </li>
                </ul>
              </div>

              {inviteSent && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <PenLine className="h-4 w-4 text-lavender-blue" />
                    <p className="text-sm font-medium">Start typing your message</p>
                  </div>
                  <Textarea 
                    value={initialMessage}
                    onChange={(e) => setInitialMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full min-h-20 border border-lavender-blue/30 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-lavender-blue"
                  />
                  
                  {suggestedResponses.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-lavender-blue" />
                        <p className="text-sm font-medium">How {partnerName} might respond:</p>
                      </div>
                      <div className="space-y-2">
                        {suggestedResponses.map((response, index) => (
                          <div key={index} className="bg-lavender-blue/10 p-3 rounded-md text-xs text-midnight-indigo border border-lavender-blue/20">
                            {response}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <DialogFooter>
              {!inviteSent ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="border-midnight-indigo text-midnight-indigo"
                  >
                    Start Over
                  </Button>
                  <Button 
                    variant="default"
                    className="bg-lavender-blue hover:bg-lavender-blue/90"
                    onClick={handleSendInvite}
                  >
                    Begin Reconnecting
                  </Button>
                </>
              ) : (
                <Button 
                  variant="default"
                  className="bg-lavender-blue hover:bg-lavender-blue/90"
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              )}
            </DialogFooter>
          </>
        ) : (
          <div className="py-6 text-center">
            <div className="mb-6">
              <div className="bg-lavender-blue/20 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-lavender-blue" />
              </div>
              <h3 className="text-xl font-medium text-midnight-indigo">
                You said something that matters
              </h3>
              <p className="text-sm text-midnight-indigo/70 mt-2">
                That's a step forward.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
              <Button
                variant="outline"
                className="border-midnight-indigo text-midnight-indigo"
                onClick={handleReturnToToolkit}
              >
                Return to Toolkit
              </Button>
              <Button 
                variant="default"
                className="bg-lavender-blue hover:bg-lavender-blue/90"
                onClick={handleReturnToToolkit}
              >
                Keep Talking
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConversationDialog;
