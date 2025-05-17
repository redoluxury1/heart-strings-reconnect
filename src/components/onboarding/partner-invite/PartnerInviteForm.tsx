
import React from 'react';
import NameInput from './NameInput';
import EmailInput from './EmailInput';
import InviteButton from './InviteButton';

interface PartnerInviteFormProps {
  partnerName: string;
  setPartnerName: (value: string) => void;
  partnerEmail: string;
  setPartnerEmail: (value: string) => void;
  isSending: boolean;
  onSendInvite: () => void;
}

const PartnerInviteForm: React.FC<PartnerInviteFormProps> = ({
  partnerName,
  setPartnerName,
  partnerEmail,
  setPartnerEmail,
  isSending,
  onSendInvite
}) => {
  return (
    <div className="space-y-6 max-w-md mx-auto">
      <NameInput 
        partnerName={partnerName} 
        setPartnerName={setPartnerName}
        disabled={isSending}
      />
      
      <EmailInput 
        partnerEmail={partnerEmail} 
        setPartnerEmail={setPartnerEmail}
        disabled={isSending}
      />
      
      <InviteButton 
        isSending={isSending} 
        onClick={onSendInvite} 
      />
    </div>
  );
};

export default PartnerInviteForm;
