
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import FeatureCardSection from '@/components/mid-fight/FeatureCardSection';
import BackgroundPhrases from '@/components/mid-fight/BackgroundPhrases';
import PauseTool from '@/components/mid-fight/pause-tool/PauseTool';

const MidFight = () => {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  
  // Check if animations are disabled in localStorage on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem('animations-enabled');
    if (savedPreference !== null) {
      setAnimationsEnabled(savedPreference === 'true');
    }
  }, []);

  return (
    <div className="min-h-screen bg-soft-cream/20 relative">
      <BackgroundPhrases />
      <Navbar />
      
      <main className="pb-16 relative z-10">
        {/* Let's Try That Again Section */}
        <section className="py-8 bg-soft-blush/30">
          <ContentContainer maxWidth="lg">
            {/* Unified Pause Tool */}
            <PauseTool />
          </ContentContainer>
        </section>

        {/* Feature cards including the always-visible Pause & Phrase tool */}
        <FeatureCardSection />
      </main>
      
      <Footer showCTA={false} />
    </div>
  );
};

export default MidFight;
