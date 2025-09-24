
import React from 'react';
import { UserCheck } from "lucide-react";
import ContentContainer from '@/components/common/ContentContainer';
import InvitationForm from './InvitationForm';

interface InvitationContainerProps {
  inviterName: string | null;
  email: string;
  setEmail: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

const InvitationContainer: React.FC<InvitationContainerProps> = ({
  inviterName,
  email,
  setEmail,
  name,
  setName,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isLoading,
  onSubmit
}) => {
  return (
    <main className="flex-grow py-8 md:py-12">
      <ContentContainer>
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
          <div className="text-center mb-8">
            <UserCheck className="h-16 w-16 text-mauve-rose mx-auto mb-4" />
            <h1 className="text-2xl font-cormorant font-medium text-midnight-indigo">
              {inviterName} invited you to Bridge
            </h1>
            <p className="text-midnight-indigo/80 mt-2">
              Create an account to connect and build a stronger relationship together
            </p>
          </div>
          
          <InvitationForm
            email={email}
            setEmail={setEmail}
            name={name}
            setName={setName}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            isLoading={isLoading}
            inviterName={inviterName}
            onSubmit={onSubmit}
          />
        </div>
      </ContentContainer>
    </main>
  );
};

export default InvitationContainer;
