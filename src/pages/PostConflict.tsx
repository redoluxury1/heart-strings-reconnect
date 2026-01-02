
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import FloatingTextBubbles from '@/components/post-conflict/FloatingTextBubbles';
import LetsWorkThisOut from '@/components/post-conflict/lets-work-this-out/LetsWorkThisOut';
import { SessionProvider, useSession } from '@/components/post-conflict/context/SessionContext';

// Wrapper to access session context
const PostConflictContent = () => {
  const { currentStep } = useSession();
  
  // Only show bubbles and intro text on step 0 (ready check)
  const showIntro = currentStep === 0;
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="py-0 pb-20">
        {showIntro && <FloatingTextBubbles />}
        
        <ContentContainer maxWidth="lg">
          <div className="max-w-3xl mx-auto mt-2">
            {showIntro && (
              <p className="text-center text-gray-600 mb-10 mt-2 pt-2">
                Take a breath. Let's work through what happened—no judgment, just honest reflection to help you move forward.
              </p>
            )}
            
            {/* Main reflection flow */}
            <div className="mb-16">
              <LetsWorkThisOut />
            </div>
          </div>
        </ContentContainer>
      </main>
      
      <Footer showCTA={false} />
    </div>
  );
};

// Use a single SessionProvider for the whole page
const PostConflict = () => {
  return (
    <SessionProvider>
      <PostConflictContent />
    </SessionProvider>
  );
};

export default PostConflict;
