
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import LetsTalkThisOut from '@/components/post-conflict/LetsTalkThisOut';

const PostConflict = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="py-10">
        <ContentContainer maxWidth="lg">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-cormorant font-medium text-midnight-indigo text-center mb-4">
              Post-Conflict Tools
            </h1>
            
            <p className="text-center text-gray-600 mb-10">
              Tools to help process what happened and understand underlying needs and emotions.
            </p>
            
            <LetsTalkThisOut />
          </div>
        </ContentContainer>
      </main>
      
      <Footer showCTA={false} />
    </div>
  );
};

export default PostConflict;
