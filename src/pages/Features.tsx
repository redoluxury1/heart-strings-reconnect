import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';

const Features = () => {
  console.log('Features component is rendering successfully');
  
  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      
      <main className="flex-1 py-12">
        <ContentContainer>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-cormorant font-bold text-midnight-indigo mb-6">
              Features Page
            </h1>
            <p className="text-xl text-midnight-indigo/80">
              This is the features page - it's working!
            </p>
          </div>
        </ContentContainer>
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;