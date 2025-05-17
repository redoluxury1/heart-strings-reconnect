
import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import ContentContainer from '@/components/common/ContentContainer';
import { useNavigate } from 'react-router-dom';

const InvalidInvitation: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <main className="flex-grow py-8 md:py-12">
      <ContentContainer>
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md text-center">
          <div className="text-mauve-rose mb-4">
            <Heart className="h-16 w-16 mx-auto" />
          </div>
          <h1 className="text-2xl font-cormorant font-medium text-midnight-indigo mb-4">
            Invalid Invitation
          </h1>
          <p className="text-midnight-indigo/80 mb-6">
            This invitation link appears to be invalid or has expired.
          </p>
          <Button
            onClick={() => navigate('/')}
            className="bg-mauve-rose hover:bg-mauve-rose/90 text-white"
          >
            Go to Homepage
          </Button>
        </div>
      </ContentContainer>
    </main>
  );
};

export default InvalidInvitation;
