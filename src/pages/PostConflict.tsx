
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import PhraseRewind from '@/components/post-conflict/PhraseRewind';
import FloatingTextBubbles from '@/components/post-conflict/FloatingTextBubbles';
import OkayButNowWhat from '@/components/post-conflict/OkayButNowWhat';
import LetsWorkThisOut from '@/components/post-conflict/lets-work-this-out/LetsWorkThisOut';
import BridgeTheGapCard from '@/components/post-conflict/BridgeTheGapCard';
import { SessionProvider, useSession } from '@/components/post-conflict/context/SessionContext';

// Wrapper to access session context
const PostConflictContent = () => {
  const { currentStep, sessionData } = useSession();
  
  // Only show bubbles and intro text on step 0 (ready check)
  const showIntro = currentStep === 0;

  // Check if user has completed the flow
  const userCompleted = sessionData.partner1.ready;
  const bothPartnersReady = sessionData.partner1.ready && sessionData.partner2.ready;
  
  // Only show other components if the user has not started or completed the flow
  const showOtherComponents = !userCompleted || bothPartnersReady;
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="py-0 pb-20">
        {showIntro && <FloatingTextBubbles />}
        
        <ContentContainer maxWidth="lg">
          <div className="max-w-3xl mx-auto mt-2">
            {showIntro && (
              <p className="text-center text-gray-600 mb-10 mt-2 pt-2">
                Okay, take a breath. Let's work through what happened- no judgment, just space to be honest and figure it out side by side.
              </p>
            )}
            
            {/* Add Let's Work This Out at the top, above other components */}
            <div className="mb-16">
              <LetsWorkThisOut />
            </div>
            
            {/* Only show these components if user hasn't completed the flow or both partners are ready */}
            {showOtherComponents && (
              <div className="space-y-16">
                {/* OkayButNowWhat section with Pattern Recognition and White Flag Tools */}
                <OkayButNowWhat />
                
                {/* Bridge the Gap card with more vertical layout */}
                <div className="max-w-sm mx-auto">
                  <BridgeTheGapCard />
                </div>
              </div>
            )}
          </div>
        </ContentContainer>
        
        {showOtherComponents && (
          <ContentContainer maxWidth="lg">
            <div className="max-w-3xl mx-auto mt-32">
              <PhraseRewind />
            </div>
          </ContentContainer>
        )}
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
