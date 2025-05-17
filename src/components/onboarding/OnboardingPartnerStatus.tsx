
import React from 'react';
import { Button } from '../ui/button';
import { Heart, Users, User, Check } from 'lucide-react';
import { PartnerStatus } from '../../contexts/InterfaceContext';
import { cn } from '@/lib/utils';

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
}: OnboardingPartnerStatusProps) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-2">Who's using</h2>
      <h2 className="text-2xl font-semibold mb-6">Bridge for Couples?</h2>
      <p className="text-gray-600 mb-6">You can explore the app solo or invite your partner to join.</p>
      
      <div className="flex gap-4 mb-8 mx-auto max-w-sm">
        <Button
          variant="outline"
          onClick={() => setPartnerStatus('solo')}
          className={cn(
            "flex-1 h-16 transition-all hover:scale-[1.02] hover:shadow-md", 
            partnerStatus === 'solo' 
              ? "bg-[#D36B4B] text-white border-[#D36B4B]" 
              : "bg-[#E9DED9] text-[#1E2A38] border-[#E9DED9]"
          )}
        >
          <div className="flex flex-col items-center">
            <User className="h-5 w-5 mb-1" />
            <span>Individual</span>
          </div>
          {partnerStatus === 'solo' && <Check className="ml-2 h-4 w-4" />}
        </Button>
        
        <Button
          variant="outline"
          onClick={() => setPartnerStatus('couple')}
          className={cn(
            "flex-1 h-16 transition-all hover:scale-[1.02] hover:shadow-md",
            partnerStatus === 'couple' 
              ? "bg-[#1E2A38] text-white border-[#1E2A38]" 
              : "bg-[#E9DED9] text-[#1E2A38] border-[#E9DED9]"
          )}
          // Removed the disabled prop that was preventing users from changing their selection
        >
          <div className="flex flex-col items-center">
            <Users className="h-5 w-5 mb-1" />
            <span>Couple</span>
          </div>
          {partnerStatus === 'couple' && <Check className="ml-2 h-4 w-4" />}
        </Button>
      </div>
      
      {partnerStatus === 'solo' ? (
        <Button 
          onClick={onContinue} 
          className="w-full rounded-full bg-[#1E2A38] hover:bg-[#1E2A38]/90 text-white"
        >
          Continue
        </Button>
      ) : (
        <>
          {isPartnerInvited ? (
            <div className="text-sm text-[#D36B4B] mb-4 font-medium">
              Partner invited! Waiting for them to join.
            </div>
          ) : (
            <Button 
              onClick={onAddPartner} 
              className="w-full mb-4 rounded-full bg-[#1E2A38] hover:bg-[#1E2A38]/90 text-white"
            >
              Invite Partner
            </Button>
          )}
          <Button 
            variant="outline" 
            onClick={onContinue} 
            className="w-full rounded-full border-[#1E2A38] text-[#1E2A38] hover:bg-[#1E2A38]/10"
          >
            Continue
          </Button>
        </>
      )}
    </div>
  );
};

export default OnboardingPartnerStatus;
