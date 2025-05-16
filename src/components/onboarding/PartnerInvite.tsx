
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { invitePartner } from '@/services/supabase';

interface PartnerInviteProps {
  onBack: () => void;
  onComplete: () => void;
}

const PartnerInvite: React.FC<PartnerInviteProps> = ({ 
  onBack,
  onComplete
}) => {
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();
  const { relationship } = useAuth();

  const handleSendInvite = async () => {
    if (!partnerEmail) {
      toast({
        title: "Email required",
        description: "Please enter your partner's email address.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(partnerEmail)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    if (!relationship) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSending(true);
    
    try {
      const success = await invitePartner(relationship.id, {
        partnerEmail,
        partnerName: partnerName || undefined
      });
      
      if (success) {
        toast({
          title: "Invitation sent!",
          description: "Your partner will receive a link to join Bridge For Couples.",
        });
        
        onComplete();
      } else {
        throw new Error("Failed to send invitation");
      }
    } catch (error) {
      console.error("Error sending invitation:", error);
      toast({
        title: "Failed to send invitation",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <div>
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-6 p-0 text-midnight-indigo"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <h1 className="font-cormorant text-3xl md:text-4xl font-semibold text-center mb-8 text-[#6A4A74]">
        Invite your partner to join you on Bridge For Couples
      </h1>
      
      <p className="text-center mb-8 text-midnight-indigo/80">
        We will send your partner a link to download Bridge For Couples and sync with your account
      </p>
      
      <div className="space-y-6 max-w-md mx-auto">
        <div className="space-y-2">
          <Label htmlFor="partnerName" className="text-midnight-indigo font-medium">
            Partner's Name (Optional)
          </Label>
          <Input
            id="partnerName"
            type="text"
            placeholder="Their name"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            className="border-2 border-[#6A4A74]/30 focus:border-[#6A4A74] focus:ring-[#6A4A74]/20"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="partnerEmail" className="text-midnight-indigo font-medium">
            Partner's Email
          </Label>
          <Input
            id="partnerEmail"
            type="email"
            placeholder="partner@example.com"
            value={partnerEmail}
            onChange={(e) => setPartnerEmail(e.target.value)}
            className="border-2 border-[#6A4A74]/30 focus:border-[#6A4A74] focus:ring-[#6A4A74]/20"
          />
        </div>
        
        <Button
          onClick={handleSendInvite}
          disabled={isSending}
          className="w-full mt-4 rounded-full bg-[#6A4A74] hover:bg-[#6A4A74]/90 text-white font-medium"
        >
          {isSending ? (
            <>Sending...</>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Invitation
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PartnerInvite;
