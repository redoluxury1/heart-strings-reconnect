
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
import { useInterface } from '@/hooks/useInterfaceContext';

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
  const [showSuccess, setShowSuccess] = useState(false);
  const { isEmotional } = useInterface();

  const handleSendInvite = () => {
    onSendInvite();
    setShowSuccess(true);
  };

  const handleReturnToToolkit = () => {
    setShowSuccess(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {!showSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle>{isEmotional ? "Send a gentle nudge to reconnect" : "Request to talk"}</DialogTitle>
              <DialogDescription>
                {isEmotional 
                  ? "This lets your partner know you want to talk—without pressure, blame, or rehashing everything."
                  : "Let your partner know you'd like to discuss something important."}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <p className={`text-sm ${isEmotional ? "text-midnight-indigo/80" : "text-[#2C3E50]/80"}`}>
                {isEmotional 
                  ? "We'll suggest a softer message that opens the door, not slams it."
                  : "We'll help you craft a clear, non-confrontational message."}
              </p>
              
              <div className={`${
                isEmotional ? "bg-soft-blush/20" : "bg-[#D1E5F4]/30"
              } p-4 rounded-lg`}>
                <p className="text-sm font-medium mb-2">How it works:</p>
                <ul className="text-xs space-y-2">
                  <li className="flex items-start gap-2">
                    <span className={`${
                      isEmotional
                        ? "bg-lavender-blue/20 text-lavender-blue" 
                        : "bg-[#589391]/20 text-[#589391]"
                    } rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0`}>1</span>
                    <span>Your partner gets a {isEmotional ? "gentle" : "clear"} notification to reconnect.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={`${
                      isEmotional
                        ? "bg-lavender-blue/20 text-lavender-blue" 
                        : "bg-[#589391]/20 text-[#589391]"
                    } rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0`}>2</span>
                    <span>You can send a message while waiting—or just open the space.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={`${
                      isEmotional
                        ? "bg-lavender-blue/20 text-lavender-blue" 
                        : "bg-[#589391]/20 text-[#589391]"
                    } rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0`}>3</span>
                    <span>We will help you {isEmotional ? "and your partner phrase things with calm and care." : "communicate effectively and find solutions."}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className={isEmotional 
                  ? "border-midnight-indigo text-midnight-indigo" 
                  : "border-[#2C3E50] text-[#2C3E50]"}
              >
                Start Over
              </Button>
              <Button 
                variant="default"
                className={isEmotional
                  ? "bg-lavender-blue hover:bg-lavender-blue/90" 
                  : "bg-midnight-indigo hover:bg-midnight-indigo/90 text-white"
                }
                onClick={handleSendInvite}
              >
                Begin {isEmotional ? "Reconnecting" : "Discussion"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-6 text-center">
            <DialogHeader className="absolute right-4 top-4" />
            <div className="mb-6">
              <div className={`${
                isEmotional
                  ? "bg-lavender-blue/20" 
                  : "bg-[#589391]/20"
              } rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4`}>
                <MessageSquare className={`h-8 w-8 ${
                  isEmotional ? "text-lavender-blue" : "text-[#589391]"
                }`} />
              </div>
              <h3 className={`text-xl font-medium ${
                isEmotional ? "text-midnight-indigo" : "text-[#2C3E50]"
              }`}>
                {isEmotional ? "You said something that matters" : "Message sent successfully"}
              </h3>
              <p className={`text-sm ${
                isEmotional ? "text-midnight-indigo/70" : "text-[#2C3E50]/70"
              } mt-2`}>
                {isEmotional ? "That's a step forward." : "You've initiated the conversation."}
              </p>
              <p className={`text-xs italic ${
                isEmotional ? "text-midnight-indigo/60" : "text-[#2C3E50]/60"
              } mt-3`}>
                We notified your partner that you sent a message
              </p>
            </div>
            
            <Button 
              variant="default"
              className={isEmotional
                ? "bg-lavender-blue hover:bg-lavender-blue/90" 
                : "bg-midnight-indigo hover:bg-midnight-indigo/90 text-white"
              }
              onClick={handleReturnToToolkit}
            >
              {isEmotional ? "Take some time for yourself" : "Return to tools"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConversationDialog;
