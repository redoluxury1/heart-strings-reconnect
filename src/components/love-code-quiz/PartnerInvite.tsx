
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Mail, UserPlus } from "lucide-react";

interface PartnerInviteProps {
  isOpen: boolean;
  onClose: () => void;
}

const PartnerInvite: React.FC<PartnerInviteProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  const handleInvite = () => {
    if (!partnerEmail) {
      toast({
        title: "Email required",
        description: "Please enter your partner's email address.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(partnerEmail)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSending(true);
    
    // In a real implementation, this would connect to an API
    // For now, we'll simulate success after a short delay
    setTimeout(() => {
      setIsSending(false);
      toast({
        title: "Invitation sent!",
        description: partnerName 
          ? `We've sent an invitation to ${partnerName}.` 
          : "We've sent an invitation to your partner.",
      });
      onClose();
      
      // Reset form
      setPartnerEmail('');
      setPartnerName('');
    }, 1500);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white p-6 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-cormorant text-midnight-indigo flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-mauve-rose" />
            Invite Your Partner
          </DialogTitle>
          <DialogDescription className="text-midnight-indigo/70">
            Share your Love Code results and invite them to discover theirs!
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="partnerName" className="text-sm font-medium text-midnight-indigo">
              Partner's Name (Optional)
            </label>
            <Input
              id="partnerName"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              placeholder="Enter their name"
              className="border-lavender-blue/30 focus:border-mauve-rose"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="partnerEmail" className="text-sm font-medium text-midnight-indigo">
              Partner's Email <span className="text-mauve-rose">*</span>
            </label>
            <Input
              id="partnerEmail"
              value={partnerEmail}
              onChange={(e) => setPartnerEmail(e.target.value)}
              type="email"
              placeholder="example@email.com"
              className="border-lavender-blue/30 focus:border-mauve-rose"
              required
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-lavender-blue/30 text-midnight-indigo"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleInvite}
            disabled={isSending}
            className="bg-mauve-rose hover:bg-mauve-rose/90 text-white"
          >
            <Mail className="mr-2 h-4 w-4" />
            {isSending ? 'Sending...' : 'Send Invitation'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerInvite;
