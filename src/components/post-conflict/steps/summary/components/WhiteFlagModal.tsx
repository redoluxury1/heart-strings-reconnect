
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Flag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { sendWhiteFlagMessage } from '@/services/whiteFlagService';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WhiteFlagModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const whiteFlagMessages = [
  "I'm waving the white flag. I want peace, not distance.",
  "This doesn't feel good. Can we start fresh when we're both ready?",
  "I don't want to keep fighting. I still care, even when it's hard."
];

const WhiteFlagModal: React.FC<WhiteFlagModalProps> = ({ isOpen, onClose }) => {
  const [selectedMessage, setSelectedMessage] = useState<string>('');
  const [isSending, setIsSending] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();
  const { user, relationship } = useAuth();

  const handleSendFlag = async () => {
    if (!selectedMessage || !user || !relationship) {
      toast({
        title: "Error",
        description: "Please select a message and ensure you're logged in.",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);
    
    try {
      const success = await sendWhiteFlagMessage(
        user.id,
        relationship.id,
        selectedMessage
      );

      if (success) {
        setShowConfirmation(true);
      } else {
        throw new Error("Failed to send white flag");
      }
    } catch (error) {
      console.error("Error sending white flag:", error);
      toast({
        title: "Error",
        description: "Failed to send white flag. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = () => {
    setSelectedMessage('');
    setShowConfirmation(false);
    onClose();
  };

  if (showConfirmation) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md bg-[#F9F6F2] border-[#E8DAD3]">
          <div className="text-center py-6">
            <div className="bg-[#D3876A]/10 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <Flag className="h-8 w-8 text-[#D3876A]" />
            </div>
            <h3 className="font-cormorant text-xl font-medium text-[#2C2C2C] mb-2">
              White flag sent
            </h3>
            <p className="text-[#3A3A3A] mb-6">
              No pressure. No scorekeeping. Just a step toward peace.
            </p>
            <Button 
              onClick={handleClose}
              className="bg-[#D3876A] hover:bg-[#D3876A]/90 text-white rounded-full px-6"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-[#F9F6F2] border-[#E8DAD3]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[#D3876A]/10 rounded-full h-10 w-10 flex items-center justify-center">
              <Flag className="h-5 w-5 text-[#D3876A]" />
            </div>
            <DialogTitle className="font-cormorant text-xl font-medium text-[#2C2C2C]">
              Send a White Flag
            </DialogTitle>
          </div>
          <DialogDescription className="text-[#3A3A3A] text-base">
            This doesn't mean you've solved it. It just means you're ready to stop the spiral and choose connection again.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          <p className="text-sm text-[#65595D] mb-4">Choose a message to send:</p>
          
          {whiteFlagMessages.map((message, index) => (
            <button
              key={index}
              onClick={() => setSelectedMessage(message)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                selectedMessage === message
                  ? 'border-[#D3876A] bg-[#D3876A]/5 text-[#2C2C2C]'
                  : 'border-[#E8DAD3] bg-white hover:border-[#D3876A]/50 text-[#3A3A3A]'
              }`}
            >
              <span className="text-sm font-medium">{message}</span>
            </button>
          ))}
        </div>
        
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1 border-[#E8DAD3] text-[#65595D] hover:bg-[#F9F6F2]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendFlag}
            disabled={!selectedMessage || isSending}
            className="flex-1 bg-[#D3876A] hover:bg-[#D3876A]/90 text-white"
          >
            {isSending ? "Sending..." : "Send White Flag"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhiteFlagModal;
