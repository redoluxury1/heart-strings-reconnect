
import React, { useState, useEffect } from 'react';
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
import { useAuth } from '@/contexts/AuthContext';
import { createConversationSession, sendConversationNotification } from '@/services/conversation';

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
  const [isLoading, setIsLoading] = useState(false);
  const { user, relationship } = useAuth();

  const handleSendInvite = async () => {
    if (!user || !relationship?.id || !relationship?.partner_id) {
      console.error("User, relationship, or partner not found");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create a conversation session
      const session = await createConversationSession(
        relationship.id,
        user.id,
        'mid-fight',
        { topicId, initiatedAt: new Date().toISOString() }
      );
      
      if (session) {
        // Send notification to partner
        await sendConversationNotification(
          relationship.partner_id,
          user.id,
          "Conversation Request",
          `Your partner wants to talk about ${topicId}`,
          session.id
        );
        
        setShowSuccess(true);
        onSendInvite();
      }
    } catch (error) {
      console.error("Error sending conversation invite:", error);
    } finally {
      setIsLoading(false);
    }
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
              <DialogTitle>Request to talk</DialogTitle>
              <DialogDescription>
                Let your partner know you'd like to discuss something important.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <p className="text-sm text-gray-600">
                We'll help you craft a clear, non-confrontational message.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">How it works:</p>
                <ul className="text-xs space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-700 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 text-xs font-medium">1</span>
                    <span>Your partner gets a clear notification to reconnect.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-700 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 text-xs font-medium">2</span>
                    <span>You can send a message while waiting—or just open the space.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-700 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 text-xs font-medium">3</span>
                    <span>We will help you communicate effectively and find solutions.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Start Over
              </Button>
              <Button 
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleSendInvite}
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Begin Discussion"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-6 text-center">
            <DialogHeader className="absolute right-4 top-4" />
            <div className="mb-6">
              <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900">
                Message sent successfully
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                You've initiated the conversation.
              </p>
              <p className="text-xs italic text-gray-500 mt-3">
                We notified your partner that you sent a message
              </p>
            </div>
            
            <Button 
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleReturnToToolkit}
            >
              Return to tools
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConversationDialog;
