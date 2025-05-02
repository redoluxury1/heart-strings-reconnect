
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import WouldYouRatherGame from '@/components/games/would-you-rather/WouldYouRatherGame';

const Reconnect = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="py-12">
        <ContentContainer maxWidth="lg">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-cormorant font-medium text-midnight-indigo text-center mb-4">
              Would You Rather: Couples Edition
            </h1>
            
            <p className="text-center text-gray-600 mb-8">
              Have fun discovering each other's preferences and see how well you know one another.
            </p>
            
            <WouldYouRatherGame />
          </div>
        </ContentContainer>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reconnect;
