
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SendHorizontal, MessageSquare } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

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
  const [inviteSent, setInviteSent] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSendInvite = () => {
    onSendInvite();
    setInviteSent(true);
  };

  const handleFirstStep = () => {
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
                    <span>We will help you and your partner phrase things with calm and care.</span>
                  </li>
                </ul>
              </div>
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
                  className="w-full bg-lavender-blue hover:bg-lavender-blue/90"
                  onClick={handleFirstStep}
                >
                  You took the first step
                </Button>
              )}
            </DialogFooter>
          </>
        ) : (
          <div className="py-6 text-center">
            <DialogHeader className="absolute right-4 top-4" />
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
            
            <Button 
              variant="default"
              className="bg-lavender-blue hover:bg-lavender-blue/90"
              onClick={handleReturnToToolkit}
            >
              Return to Toolkit
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConversationDialog;
