
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { invitePartner, createRelationship } from '@/services/supabase';
import { supabase } from '@/integrations/supabase/client';

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
      let currentRelationshipId = relationship?.id;
      if (!currentRelationshipId) {
        console.log("No relationship found, creating one...");
        const newRelationship = await createRelationship(user.id);
        
        if (!newRelationship) {
          throw new Error("Failed to create relationship");
        }
        console.log("Relationship created:", newRelationship.id);
        currentRelationshipId = newRelationship.id;
      }
      
      const success = await invitePartner(currentRelationshipId, {
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
      let currentRelationshipId = relationship?.id;
      if (!currentRelationshipId) {
        console.log("No relationship found, creating one...");
        const newRelationship = await createRelationship(user.id);
        
        if (!newRelationship) {
          throw new Error("Failed to create relationship");
        }
        console.log("Relationship created:", newRelationship.id);
        currentRelationshipId = newRelationship.id;
      }

      // Get the relationship to access the invite token
      const { data: relationshipData, error: relationshipError } = await supabase
        .from('relationships')
        .select('invite_token')
        .eq('id', currentRelationshipId)
        .single();

      if (relationshipError || !relationshipData?.invite_token) {
        throw new Error("Failed to get invite token");
      }

      // Send SMS via the edge function
      const { data, error } = await supabase.functions.invoke('send-sms-invite', {
        body: {
          phoneNumber: phoneNumber,
          partnerName: partnerName || undefined,
          inviteToken: relationshipData.invite_token
        }
      });

      if (error) {
        throw new Error(error.message || "Failed to send SMS");
      }

      if (!data?.success) {
        throw new Error(data?.error || "Failed to send SMS");
      }

      console.log("SMS sent successfully:", data.messageId);

      toast({
        title: "Invitation sent via text!",
        description: "Your partner will receive a text message with a link to join.",
      });
      
      onComplete();
    } catch (error: any) {
      console.error("Error sending text invitation:", error);
      toast({
        title: "Failed to send text invitation",
        description: error.message || "Please try again later.",
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
