
import React from 'react';
import { Heart } from 'lucide-react';
import ContentContainer from '../common/ContentContainer';

interface OnboardingContainerProps {
  children: React.ReactNode;
}

const OnboardingContainer: React.FC<OnboardingContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F2F0]">
      <ContentContainer className="max-w-xl">
        <div className="rounded-xl p-8 bg-white shadow-lg relative">
          {/* Optional Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <Heart className="text-[#D36B4B] h-40 w-40" />
          </div>
          {children}
        </div>
      </ContentContainer>
    </div>
  );
};

export default OnboardingContainer;
