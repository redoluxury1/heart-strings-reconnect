
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import LetsTalkThisOut from '@/components/post-conflict/LetsTalkThisOut';
import FloatingTextBubbles from '@/components/post-conflict/FloatingTextBubbles';
import { SessionProvider, useSession } from '@/components/post-conflict/context/SessionContext';

// Wrapper to access session context
const PostConflictContent = () => {
  const { currentStep } = useSession();
  
  // Only show bubbles and intro text on step 0 (ready check)
  const showIntro = currentStep === 0;
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="py-0 pb-24">
        {showIntro && <FloatingTextBubbles />}
        
        <ContentContainer maxWidth="lg">
          <div className="max-w-3xl mx-auto mt-12">
            {showIntro && (
              <p className="text-center text-gray-600 mb-10 mt-12 pt-6">
                Okay, take a breath. Let's talk about what went down- no judgment, just space to be honest and figure it out side by side.
              </p>
            )}
            
            <LetsTalkThisOut />
          </div>
        </ContentContainer>
      </main>
      
      <Footer showCTA={false} />
    </div>
  );
};

// Wrap the main component with SessionProvider
const PostConflict = () => {
  return (
    <SessionProvider>
      <PostConflictContent />
    </SessionProvider>
  );
};

export default PostConflict;
