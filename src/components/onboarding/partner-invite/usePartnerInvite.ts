
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { invitePartner, createRelationship } from '@/services/supabase';

export const usePartnerInvite = (onComplete: () => void) => {
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();
  const { user, relationship } = useAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validatePhoneNumber = (phone: string) => {
    // Basic validation for phone numbers
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
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
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to send invitations.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSending(true);
    
    try {
      console.log("Starting invite process...");
      
      // Check if relationship exists, create one if it doesn't
      let currentRelationship = relationship;
      if (!currentRelationship) {
        console.log("No relationship found, creating one...");
        currentRelationship = await createRelationship(user.id);
        
        if (!currentRelationship) {
          throw new Error("Failed to create relationship");
        }
        console.log("Relationship created:", currentRelationship.id);
      }
      
      const success = await invitePartner(currentRelationship.id, {
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

  const handleSendTextInvite = async (phoneNumber: string) => {
    if (!phoneNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter your partner's phone number.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number.",
        variant: "destructive"
      });
      return;
    }
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to send invitations.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSending(true);
    
    try {
      // Check if relationship exists, create one if it doesn't
      let currentRelationship = relationship;
      if (!currentRelationship) {
        console.log("No relationship found, creating one...");
        currentRelationship = await createRelationship(user.id);
        
        if (!currentRelationship) {
          throw new Error("Failed to create relationship");
        }
        console.log("Relationship created:", currentRelationship.id);
      }
      
      // Here we would integrate with an SMS service
      // For now, we'll mock success since actual SMS integration would require backend services
      setTimeout(() => {
        toast({
          title: "Invitation sent via text!",
          description: "Your partner will receive a text message with a link to join.",
        });
        
        onComplete();
      }, 1500);
    } catch (error) {
      console.error("Error sending text invitation:", error);
      toast({
        title: "Failed to send text invitation",
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
    handleSendInvite,
    handleSendTextInvite
  };
};
