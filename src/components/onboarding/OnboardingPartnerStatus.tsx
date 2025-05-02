import React from 'react';
import { Button } from '../ui/button';
import { Check, Users, User } from 'lucide-react';
import { PartnerStatus } from '../../contexts/InterfaceContext';

interface OnboardingPartnerStatusProps {
  partnerStatus: PartnerStatus;
  setPartnerStatus: (status: PartnerStatus) => void;
  onContinue: () => void;
  onAddPartner: () => void;
  isPartnerInvited: boolean;
}

const OnboardingPartnerStatus = ({ 
  partnerStatus, 
  setPartnerStatus, 
  onContinue, 
  onAddPartner, 
  isPartnerInvited 
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Are you using Bridge as an individual or with a partner?</h2>
      
      <div className="flex space-x-4 mb-6">
        <Button
          variant={partnerStatus === 'solo' ? 'default' : 'outline'}
          onClick={() => setPartnerStatus('solo')}
          className="flex-1"
        >
          <User className="mr-2 h-4 w-4" />
          Individual
          {partnerStatus === 'solo' && <Check className="ml-2 h-4 w-4" />}
        </Button>
        
        <Button
          variant={partnerStatus === 'couple' ? 'default' : 'outline'}
          onClick={() => setPartnerStatus('couple')}
          className="flex-1"
          disabled={isPartnerInvited}
        >
          <Users className="mr-2 h-4 w-4" />
          Couple
          {partnerStatus === 'couple' && <Check className="ml-2 h-4 w-4" />}
        </Button>
      </div>
      
      {partnerStatus === 'solo' ? (
        <Button onClick={onContinue} className="w-full">Continue</Button>
      ) : (
        <>
          {isPartnerInvited ? (
            <div className="text-sm text-green-500 mb-4">
              Partner invited! Waiting for them to join.
            </div>
          ) : (
            <Button onClick={onAddPartner} className="w-full mb-4">Invite Partner</Button>
          )}
          <Button variant="secondary" onClick={onContinue} className="w-full">Continue</Button>
        </>
      )}
    </div>
  );
};

export default OnboardingPartnerStatus;
