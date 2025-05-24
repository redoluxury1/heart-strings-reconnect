
import React from 'react';
import ContentContainer from '../common/ContentContainer';

interface OnboardingContainerProps {
  children: React.ReactNode;
}

const OnboardingContainer: React.FC<OnboardingContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F2F0]">
      <ContentContainer className="max-w-xl">
        <div className="rounded-xl p-8 bg-white shadow-lg relative">
          {children}
        </div>
      </ContentContainer>
    </div>
  );
};

export default OnboardingContainer;
