
import React from 'react';
import { Button } from '@/components/ui/button';
import { SendHorizontal } from 'lucide-react';
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
}

const ConversationDialog: React.FC<ConversationDialogProps> = ({
  isOpen,
  onOpenChange,
  partnerName,
  onSendInvite
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Start a conversation</DialogTitle>
          <DialogDescription>
            This will send a notification to {partnerName} that you'd like to talk things through together.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-sm text-midnight-indigo/80">
            In-app conversations help both of you communicate more effectively with guidance on rephrasing difficult messages.
          </p>
          
          <div className="bg-soft-blush/20 p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">How it works:</p>
            <ul className="text-xs space-y-2">
              <li className="flex items-start gap-2">
                <span className="bg-lavender-blue/20 text-lavender-blue rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">1</span>
                <span>{partnerName} will receive a notification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-lavender-blue/20 text-lavender-blue rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">2</span>
                <span>Once they join, you can both send messages</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-lavender-blue/20 text-lavender-blue rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">3</span>
                <span>The app will suggest kinder ways to phrase difficult messages</span>
              </li>
            </ul>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-midnight-indigo text-midnight-indigo"
          >
            Cancel
          </Button>
          <Button 
            variant="default"
            className="bg-lavender-blue hover:bg-lavender-blue/90"
            onClick={onSendInvite}
          >
            Send Invitation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConversationDialog;
