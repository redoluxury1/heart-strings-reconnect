
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Heart } from 'lucide-react';
import OnboardingContainer from '@/components/onboarding/OnboardingContainer';

const SignupChoice = () => {
  const navigate = useNavigate();

  const handleSoloChoice = () => {
    navigate('/auth?tab=signup&mode=solo');
  };

  const handlePartnerChoice = () => {
    navigate('/auth?tab=signup&mode=partner');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dbd0e0] via-[#f5f1e8] to-[#e6c7bc] flex flex-col items-center justify-center px-4">
      <OnboardingContainer>
        <div className="text-center">
          <h2 className="font-cormorant text-3xl font-medium text-[#2e4059] mb-4">
            Let's personalize your experience.
          </h2>
          
          <p className="text-base text-[#2e4059]/80 mb-8">
            Are you here to work on things solo, or do you want to invite your partner to join you?
          </p>
          
          <div className="space-y-3 max-w-xs mx-auto">
            <Button
              onClick={handleSoloChoice}
              variant="outline"
              size="lg"
              className="w-full h-auto p-3 bg-[#f1eae8] border-2 border-[#e5c7c1] hover:border-[#2e4059]/40 hover:bg-[#e5c7c1] hover:scale-105 text-[#2e4059] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="text-base font-medium">I'm starting this on my own</span>
                </div>
                <p className="text-xs text-[#2e4059]/60 font-normal leading-relaxed">
                  Sometimes the best changes start with just one person.
                </p>
              </div>
            </Button>
            
            <Button
              onClick={handlePartnerChoice}
              variant="outline"
              size="lg"
              className="w-full h-auto p-3 bg-[#f1eae8] border-2 border-[#e5c7c1] hover:border-[#2e4059]/40 hover:bg-[#e5c7c1] hover:scale-105 text-[#2e4059] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span className="text-base font-medium">I'm doing this with my partner</span>
                </div>
                <p className="text-xs text-[#2e4059]/60 font-normal leading-relaxed">
                  We're in this together.
                </p>
              </div>
            </Button>
          </div>
          
          <p className="text-sm text-[#2e4059]/60 mt-8 font-normal">
            You can always invite your partner later if you're not ready yet.
          </p>
        </div>
      </OnboardingContainer>
    </div>
  );
};

export default SignupChoice;
