import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import { GottmanMethodHub } from '@/components/gottman/GottmanMethodHub';

const GottmanMethod: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      <ContentContainer>
        <GottmanMethodHub />
      </ContentContainer>
      <Footer />
    </div>
  );
};

export default GottmanMethod;