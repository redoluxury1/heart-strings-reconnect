
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Users } from 'lucide-react';
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
            How would you like to use Bridge for Couples?
          </h2>
          
          <p className="text-lg text-[#2e4059]/80 mb-8">
            Choose how you'd like to get started with the app.
          </p>
          
          <div className="space-y-4 max-w-sm mx-auto">
            <Button
              onClick={handleSoloChoice}
              variant="outline"
              size="lg"
              className="w-full h-16 bg-white border-2 border-[#2e4059]/20 hover:border-[#2e4059]/40 hover:bg-[#2e4059]/5 text-[#2e4059] transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <User className="w-6 h-6" />
                <span className="text-lg font-medium">I'm using this on my own</span>
              </div>
            </Button>
            
            <Button
              onClick={handlePartnerChoice}
              variant="outline"
              size="lg"
              className="w-full h-16 bg-white border-2 border-[#2e4059]/20 hover:border-[#2e4059]/40 hover:bg-[#2e4059]/5 text-[#2e4059] transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6" />
                <span className="text-lg font-medium">I'm using this with my partner</span>
              </div>
            </Button>
          </div>
        </div>
      </OnboardingContainer>
    </div>
  );
};

export default SignupChoice;
