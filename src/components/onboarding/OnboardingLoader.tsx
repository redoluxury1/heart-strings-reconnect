
import React from 'react';
import ContentContainer from '../common/ContentContainer';

const OnboardingLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F2F0]">
      <ContentContainer className="max-w-xl">
        <div className="rounded-xl p-8 bg-white shadow-lg text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-lavender-blue/20 rounded"></div>
            <div className="h-32 bg-lavender-blue/10 rounded"></div>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default OnboardingLoader;
