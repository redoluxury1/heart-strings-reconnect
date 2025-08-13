import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import { CommunicationHub } from '@/components/communication/CommunicationHub';

const CommunicationAnalysis: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      <ContentContainer>
        <CommunicationHub />
      </ContentContainer>
      <Footer />
    </div>
  );
};

export default CommunicationAnalysis;