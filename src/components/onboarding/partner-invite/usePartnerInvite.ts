
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { invitePartner } from '@/services/supabase';

export const usePartnerInvite = (onComplete: () => void) => {
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();
  const { relationship } = useAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
    if (!validateEmail(partnerEmail)) {
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

  return {
    partnerEmail,
    setPartnerEmail,
    partnerName,
    setPartnerName,
    isSending,
    handleSendInvite
  };
};
