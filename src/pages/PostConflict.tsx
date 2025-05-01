
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import LetsTalkThisOut from '@/components/post-conflict/LetsTalkThisOut';
import FloatingTextBubbles from '@/components/post-conflict/FloatingTextBubbles';

const PostConflict = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="py-0 pb-16">
        <FloatingTextBubbles />
        
        <ContentContainer maxWidth="lg">
          <div className="max-w-3xl mx-auto mt-12">
            <p className="text-center text-gray-600 mb-10">
              Okay, take a breath. Let's talk about what went down- no judgment, just space to be honest and figure it out side by side.
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
