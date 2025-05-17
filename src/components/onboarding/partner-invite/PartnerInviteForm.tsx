
import React, { useState } from 'react';
import NameInput from './NameInput';
import EmailInput from './EmailInput';
import InviteButton from './InviteButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PartnerInviteFormProps {
  partnerName: string;
  setPartnerName: (value: string) => void;
  partnerEmail: string;
  setPartnerEmail: (value: string) => void;
  isSending: boolean;
  onSendInvite: () => void;
  onSendTextInvite: (phoneNumber: string) => void;
}

const PartnerInviteForm: React.FC<PartnerInviteFormProps> = ({
  partnerName,
  setPartnerName,
  partnerEmail,
  setPartnerEmail,
  isSending,
  onSendInvite,
  onSendTextInvite
}) => {
  const [inviteMethod, setInviteMethod] = useState<'email' | 'text'>('email');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const handleSendInvite = () => {
    if (inviteMethod === 'email') {
      onSendInvite();
    } else {
      onSendTextInvite(phoneNumber);
    }
  };
  
  return (
    <div className="space-y-6 max-w-md mx-auto">
      <NameInput 
        partnerName={partnerName} 
        setPartnerName={setPartnerName}
        disabled={isSending}
      />
      
      <Tabs defaultValue="email" className="w-full" onValueChange={(value) => setInviteMethod(value as 'email' | 'text')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </TabsTrigger>
          <TabsTrigger value="text" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>Text Message</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="email" className="mt-4">
          <EmailInput 
            partnerEmail={partnerEmail} 
            setPartnerEmail={setPartnerEmail}
            disabled={isSending}
          />
        </TabsContent>
        
        <TabsContent value="text" className="mt-4">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Partner's Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={isSending}
            />
            <p className="text-xs text-muted-foreground mt-1">
              We'll send them a text with a link to join you.
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      <Button 
        onClick={handleSendInvite}
        disabled={isSending}
        className="w-full rounded-full bg-[#1E2A38] hover:bg-[#1E2A38]/90 text-white"
      >
        {isSending ? 'Sending...' : `Send Invitation via ${inviteMethod === 'email' ? 'Email' : 'Text'}`}
      </Button>
    </div>
  );
};

export default PartnerInviteForm;
