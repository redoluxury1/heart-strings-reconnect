import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Mail, UserPlus } from "lucide-react";
import { useInterface } from '../../hooks/useInterfaceContext';

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
  const { isEmotional } = useInterface();
  
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
      <DialogContent className={`p-6 sm:max-w-md ${
        isEmotional ? "bg-white" : "bg-white"
      }`}>
        <DialogHeader>
          <DialogTitle className={`text-2xl ${isEmotional ? "font-cormorant" : ""} ${
            isEmotional ? "text-midnight-indigo" : "text-[#2C3E50]"
          } flex items-center gap-2`}>
            <UserPlus className={`h-5 w-5 ${isEmotional ? "text-mauve-rose" : "text-[#E51D2C]"}`} />
            Invite Your Partner
          </DialogTitle>
          <DialogDescription className={isEmotional ? "text-midnight-indigo/70" : "text-[#2C3E50]/70"}>
            {isEmotional 
              ? "Share your Love Code results and invite them to discover theirs!" 
              : "Share your results and invite them to take the quiz too."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="partnerName" className={`text-sm font-medium ${
              isEmotional ? "text-midnight-indigo" : "text-[#2C3E50]"
            }`}>
              Partner's Name (Optional)
            </label>
            <Input
              id="partnerName"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              placeholder="Enter their name"
              className={isEmotional 
                ? "border-lavender-blue/30 focus:border-mauve-rose" 
                : "border-[#589391]/30 focus:border-[#E51D2C]"
              }
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="partnerEmail" className={`text-sm font-medium ${
              isEmotional ? "text-midnight-indigo" : "text-[#2C3E50]"
            }`}>
              Partner's Email <span className={isEmotional ? "text-mauve-rose" : "text-[#E51D2C]"}>*</span>
            </label>
            <Input
              id="partnerEmail"
              value={partnerEmail}
              onChange={(e) => setPartnerEmail(e.target.value)}
              type="email"
              placeholder="example@email.com"
              className={isEmotional 
                ? "border-lavender-blue/30 focus:border-mauve-rose" 
                : "border-[#589391]/30 focus:border-[#E51D2C]"
              }
              required
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
            className={isEmotional 
              ? "border-lavender-blue/30 text-midnight-indigo"
              : "border-[#589391]/30 text-[#2C3E50]"
            }
          >
            Cancel
          </Button>
          <Button 
            onClick={handleInvite}
            disabled={isSending}
            className={isEmotional
              ? "bg-mauve-rose hover:bg-mauve-rose/90 text-white"
              : "bg-[#E51D2C] hover:bg-[#E51D2C]/90 text-white"
            }
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
