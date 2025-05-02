
import React from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { User, Users } from 'lucide-react';
import { InterfaceStyle, PartnerStatus } from '../../pages/Onboarding';

interface OnboardingPartnerStatusProps {
  interfaceStyle: InterfaceStyle;
  partnerStatus: PartnerStatus;
  setPartnerStatus: (status: PartnerStatus) => void;
  onContinue: () => void;
}

const OnboardingPartnerStatus: React.FC<OnboardingPartnerStatusProps> = ({
  interfaceStyle,
  partnerStatus,
  setPartnerStatus,
  onContinue,
}) => {
  const isEmotional = interfaceStyle === 'emotionally-reflective';
  
  return (
    <div>
      <h1 className={`font-cormorant text-3xl md:text-4xl font-medium text-center mb-10 ${
        isEmotional ? 'text-midnight-indigo' : 'text-white'
      }`}>
        Who's using Bridge right now?
      </h1>
      
      <RadioGroup 
        value={partnerStatus}
        onValueChange={(value) => setPartnerStatus(value as PartnerStatus)}
        className="gap-6"
      >
        <label className={`flex cursor-pointer rounded-xl overflow-hidden ${
          isEmotional 
            ? 'border-2 border-mauve-rose bg-soft-cream/30' 
            : 'border-2 border-[#4B6D8C] bg-slate-800'
        } ${partnerStatus === 'solo' ? `ring-2 ${isEmotional ? 'ring-mauve-rose' : 'ring-[#4B6D8C]'}` : ''}`}>
          <div className="p-6">
            <RadioGroupItem 
              value="solo" 
              id="solo"
              className={isEmotional ? 'text-mauve-rose border-mauve-rose' : 'text-[#4B6D8C] border-[#4B6D8C]'} 
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-center gap-4 mb-3">
              <User className={`${isEmotional ? 'text-mauve-rose' : 'text-white'}`} />
              <h3 className={`font-medium text-lg ${isEmotional ? 'text-midnight-indigo' : 'text-white'}`}>
                Just me for now
              </h3>
            </div>
            <p className={isEmotional ? 'text-midnight-indigo/80' : 'text-gray-300'}>
              Many of our tools are designed for personal growth — not just couples. Whether your partner joins or not, you'll still get a ton out of it.
            </p>
          </div>
        </label>
        
        <label className={`flex cursor-pointer rounded-xl overflow-hidden ${
          isEmotional 
            ? 'border-2 border-midnight-indigo bg-soft-cream/30' 
            : 'border-2 border-[#4B6D8C] bg-slate-800'
        } ${partnerStatus === 'couple' ? `ring-2 ${isEmotional ? 'ring-midnight-indigo' : 'ring-[#4B6D8C]'}` : ''}`}>
          <div className="p-6">
            <RadioGroupItem 
              value="couple" 
              id="couple"
              className={isEmotional ? 'text-midnight-indigo border-midnight-indigo' : 'text-[#4B6D8C] border-[#4B6D8C]'} 
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-center gap-4 mb-3">
              <Users className={`${isEmotional ? 'text-midnight-indigo' : 'text-white'}`} />
              <h3 className={`font-medium text-lg ${isEmotional ? 'text-midnight-indigo' : 'text-white'}`}>
                Me + my partner
              </h3>
            </div>
          </div>
        </label>
      </RadioGroup>
      
      <div className="flex justify-center mt-10">
        <Button
          onClick={onContinue}
          className={`px-8 py-2 ${
            isEmotional 
              ? 'rounded-full bg-mauve-rose hover:bg-mauve-rose/90 text-white' 
              : 'rounded-md bg-[#4B6D8C] hover:bg-[#4B6D8C]/90 text-white'
          }`}
          size="lg"
        >
          Complete Setup
        </Button>
      </div>
    </div>
  );
};

export default OnboardingPartnerStatus;
