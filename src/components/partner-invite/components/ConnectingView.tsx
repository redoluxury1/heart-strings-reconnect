
import React from 'react';
import { UserCheck } from "lucide-react";
import ContentContainer from '@/components/common/ContentContainer';

interface ConnectingViewProps {
  isLoading: boolean;
}

const ConnectingView: React.FC<ConnectingViewProps> = ({ isLoading }) => {
  return (
    <main className="flex-grow py-8 md:py-12">
      <ContentContainer>
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md text-center">
          <div className="text-mauve-rose mb-4">
            <UserCheck className="h-16 w-16 mx-auto" />
          </div>
          <h1 className="text-2xl font-cormorant font-medium text-midnight-indigo mb-4">
            Connecting with Partner
          </h1>
          <p className="text-midnight-indigo/80 mb-6">
            {isLoading ? "Connecting you with your partner..." : "You'll be redirected in a moment..."}
          </p>
          <div className="animate-pulse bg-lavender-blue/20 h-2 rounded-full w-full"></div>
        </div>
      </ContentContainer>
    </main>
  );
};

export default ConnectingView;
