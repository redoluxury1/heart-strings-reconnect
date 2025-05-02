
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InterfaceStyle } from '../../pages/Onboarding';

interface PartnerInviteProps {
  interfaceStyle: InterfaceStyle;
  onBack: () => void;
  onComplete: () => void;
}

const PartnerInvite: React.FC<PartnerInviteProps> = ({ 
  interfaceStyle, 
  onBack,
  onComplete
}) => {
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerPhone, setPartnerPhone] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();
  const isEmotional = interfaceStyle === 'emotionally-reflective';

  const handleSendInvite = () => {
    if (!partnerEmail && !partnerPhone) {
      toast({
        title: "Contact information required",
        description: "Please enter your partner's email or phone number.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate email if provided
    if (partnerEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(partnerEmail)) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address.",
          variant: "destructive"
        });
        return;
      }
    }
    
    setIsSending(true);
    
    // Simulate sending invitation
    setTimeout(() => {
      setIsSending(false);
      
      toast({
        title: "Invitation sent!",
        description: "Your partner will receive a link to join Bridge For Couples.",
      });
      
      onComplete();
    }, 1500);
  };
  
  return (
    <div>
      <Button 
        variant="ghost" 
        onClick={onBack}
        className={`mb-6 p-0 ${isEmotional ? "text-midnight-indigo" : "text-white"}`}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <h1 className={`font-cormorant text-3xl md:text-4xl font-medium text-center mb-8 ${
        isEmotional ? 'text-midnight-indigo' : 'text-white'
      }`}>
        Invite your partner to Bridge
      </h1>
      
      <p className={`text-center mb-8 ${
        isEmotional ? 'text-midnight-indigo/80' : 'text-gray-300'
      }`}>
        Send your partner a link to download Bridge and sync with your account
      </p>
      
      <div className="space-y-6 max-w-md mx-auto">
        <div className="space-y-2">
          <Label htmlFor="partnerEmail" className={isEmotional ? "text-midnight-indigo" : "text-white"}>
            Partner's Email
          </Label>
          <Input
            id="partnerEmail"
            type="email"
            placeholder="partner@example.com"
            value={partnerEmail}
            onChange={(e) => setPartnerEmail(e.target.value)}
            className={isEmotional ? "border-lavender-blue/30" : "border-gray-700 bg-slate-800 text-white"}
          />
        </div>
        
        <div className="flex items-center">
          <div className="flex-grow h-px bg-gray-300/20"></div>
          <p className={`px-4 text-sm ${isEmotional ? "text-midnight-indigo/60" : "text-gray-400"}`}>or</p>
          <div className="flex-grow h-px bg-gray-300/20"></div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="partnerPhone" className={isEmotional ? "text-midnight-indigo" : "text-white"}>
            Partner's Phone Number
          </Label>
          <Input
            id="partnerPhone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={partnerPhone}
            onChange={(e) => setPartnerPhone(e.target.value)}
            className={isEmotional ? "border-lavender-blue/30" : "border-gray-700 bg-slate-800 text-white"}
          />
        </div>
        
        <Button
          onClick={handleSendInvite}
          disabled={isSending}
          className={`w-full mt-4 ${
            isEmotional 
              ? 'rounded-full bg-mauve-rose hover:bg-mauve-rose/90 text-white' 
              : 'rounded-md bg-[#4f6572] hover:bg-[#4f6572]/90 text-white'
          }`}
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
