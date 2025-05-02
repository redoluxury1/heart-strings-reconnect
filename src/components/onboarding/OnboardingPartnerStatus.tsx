
import React from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { User, Users } from 'lucide-react';
import { PartnerStatus } from '../../pages/Onboarding';

interface OnboardingPartnerStatusProps {
  partnerStatus: PartnerStatus;
  setPartnerStatus: (status: PartnerStatus) => void;
  onContinue: () => void;
  onAddPartner: () => void;
  isPartnerInvited: boolean;
}

const OnboardingPartnerStatus: React.FC<OnboardingPartnerStatusProps> = ({
  partnerStatus,
  setPartnerStatus,
  onContinue,
  onAddPartner,
  isPartnerInvited,
}) => {
  return (
    <div>
      <h1 className="font-cormorant text-3xl md:text-4xl font-medium text-center mb-10 text-midnight-indigo">
        Who's using Bridge For Couples right now?
      </h1>
      
      <RadioGroup 
        value={partnerStatus}
        onValueChange={(value) => setPartnerStatus(value as PartnerStatus)}
        className="gap-6"
      >
        <label className={`flex cursor-pointer rounded-xl overflow-hidden
          border-2 border-mauve-rose bg-soft-cream/30
          ${partnerStatus === 'solo' ? 'ring-2 ring-mauve-rose' : ''}`}>
          <div className="p-6">
            <RadioGroupItem 
              value="solo" 
              id="solo"
              className="text-mauve-rose border-mauve-rose" 
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-center gap-4 mb-3">
              <User className="text-mauve-rose" />
              <h3 className="font-medium text-lg text-midnight-indigo">
                Just me for now
              </h3>
            </div>
            <p className="text-midnight-indigo/80">
              Many of our tools are designed for personal growth — not just couples. Whether your partner joins or not, you'll still get a ton out of it.
            </p>
          </div>
        </label>
        
        <label className={`flex cursor-pointer rounded-xl overflow-hidden
          border-2 border-midnight-indigo bg-soft-cream/30
          ${partnerStatus === 'couple' ? 'ring-2 ring-midnight-indigo' : ''}`}>
          <div className="p-6">
            <RadioGroupItem 
              value="couple" 
              id="couple"
              className="text-midnight-indigo border-midnight-indigo" 
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-center gap-4 mb-3">
              <Users className="text-midnight-indigo" />
              <h3 className="font-medium text-lg text-midnight-indigo">
                Me + my partner
              </h3>
            </div>
            <p className="text-midnight-indigo/80">
              Use Bridge together to improve your communication and strengthen your relationship.
            </p>
          </div>
        </label>
      </RadioGroup>
      
      <div className="flex justify-center mt-10">
        <Button
          onClick={partnerStatus === 'couple' && !isPartnerInvited ? onAddPartner : onContinue}
          className="px-8 py-2 rounded-full bg-mauve-rose hover:bg-mauve-rose/90 text-white"
          size="lg"
        >
          {partnerStatus === 'couple' && !isPartnerInvited ? 'Add Partner' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingPartnerStatus;
