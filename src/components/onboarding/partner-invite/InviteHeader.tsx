
import React from 'react';

const InviteHeader: React.FC = () => {
  return (
    <>
      <h1 className="font-cormorant text-3xl md:text-4xl font-semibold text-center mb-8 text-[#6A4A74]">
        Invite your partner
        <br />
        to join you on
        <br />
        Bridge For Couples
      </h1>
      
      <p className="text-center mb-8 text-midnight-indigo/80">
        We will send your partner a link to download Bridge For Couples and sync with your account
      </p>
    </>
  );
};

export default InviteHeader;
