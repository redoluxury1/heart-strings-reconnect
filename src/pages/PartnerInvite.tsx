
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { usePartnerInvite } from '@/components/partner-invite/hooks/usePartnerInvite';
import InvalidInvitation from '@/components/partner-invite/components/InvalidInvitation';
import ConnectingView from '@/components/partner-invite/components/ConnectingView';
import InvitationContainer from '@/components/partner-invite/components/InvitationContainer';

const PartnerInvite = () => {
  const {
    inviteToken,
    user,
    isLoading,
    inviterName,
    email,
    setEmail,
    name, 
    setName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit
  } = usePartnerInvite();
  
  return (
    <div className="min-h-screen flex flex-col bg-soft-blush">
      <Navbar />
      
      {!inviteToken ? (
        <InvalidInvitation />
      ) : user ? (
        <ConnectingView isLoading={isLoading} />
      ) : (
        <InvitationContainer
          inviterName={inviterName}
          email={email}
          setEmail={setEmail}
          name={name}
          setName={setName}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      )}
      
      <Footer showCTA={false} />
    </div>
  );
};

export default PartnerInvite;
