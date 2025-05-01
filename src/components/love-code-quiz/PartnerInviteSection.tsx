
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

interface PartnerInviteSectionProps {
  onOpenInvite: () => void;
}

const PartnerInviteSection: React.FC<PartnerInviteSectionProps> = ({ onOpenInvite }) => {
  return (
    <div className="bg-mauve-rose/10 rounded-lg p-6 mb-8 text-center">
      <h3 className="font-cormorant font-medium text-xl text-midnight-indigo mb-3">
        Invite Your Partner to Take the Quiz
      </h3>
      <p className="text-midnight-indigo/80 mb-4">
        When both partners understand each other's Love Codes, connection deepens and miscommunication decreases.
      </p>
      <Button 
        className="bg-mauve-rose hover:bg-mauve-rose/90 text-white"
        onClick={onOpenInvite}
      >
        <UserPlus className="mr-2 h-4 w-4" />
        Invite Partner
      </Button>
    </div>
  );
};

export default PartnerInviteSection;
