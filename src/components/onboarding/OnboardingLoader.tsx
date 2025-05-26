
import React from 'react';
import ContentContainer from '../common/ContentContainer';
import ConversationLoader from '../common/ConversationLoader';

const OnboardingLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F4EDE5' }}>
      <ContentContainer className="max-w-xl">
        <div className="rounded-xl p-8 bg-white/80 backdrop-blur-sm shadow-lg text-center">
          <ConversationLoader className="mb-6" />
          <p className="text-midnight-indigo/70 text-sm font-medium">
            Preparing your Bridge experience…
          </p>
        </div>
      </ContentContainer>
    </div>
  );
};

export default OnboardingLoader;
