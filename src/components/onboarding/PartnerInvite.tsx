
import React from 'react';
import BackButton from './partner-invite/BackButton';
import InviteHeader from './partner-invite/InviteHeader';
import PartnerInviteForm from './partner-invite/PartnerInviteForm';
import { usePartnerInvite } from './partner-invite/usePartnerInvite';

interface PartnerInviteProps {
  onBack: () => void;
  onComplete: () => void;
}

const PartnerInvite: React.FC<PartnerInviteProps> = ({ 
  onBack,
  onComplete
}) => {
  const {
    partnerEmail,
    setPartnerEmail,
    partnerName,
    setPartnerName,
    isSending,
    handleSendInvite
  } = usePartnerInvite(onComplete);
  
  return (
    <div>
      <BackButton onClick={onBack} />
      <InviteHeader />
      
      <PartnerInviteForm
        partnerName={partnerName}
        setPartnerName={setPartnerName}
        partnerEmail={partnerEmail}
        setPartnerEmail={setPartnerEmail}
        isSending={isSending}
        onSendInvite={handleSendInvite}
      />
    </div>
  );
};

export default PartnerInvite;
