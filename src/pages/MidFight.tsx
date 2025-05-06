
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import TimeoutTimer from '@/components/mid-fight/TimeoutTimer';
import FeatureCardSection from '@/components/mid-fight/FeatureCardSection';
import BackgroundPhrases from '@/components/mid-fight/BackgroundPhrases';

const MidFight = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  
  // Toggle feature display
  const toggleFeature = (featureId: string) => {
    if (selectedFeature === featureId) {
      setSelectedFeature(null);
    } else {
      setSelectedFeature(featureId);
    }
  };

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
        {/* Timeout Timer Section */}
        <section className="py-8 bg-soft-blush/30">
          <ContentContainer maxWidth="lg">
            <TimeoutTimer animationsEnabled={animationsEnabled} />
          </ContentContainer>
        </section>

        {/* Feature cards including the always-visible Pause & Phrase tool */}
        <FeatureCardSection 
          selectedFeature={selectedFeature}
          toggleFeature={toggleFeature}
        />
      </main>
      
      <Footer showCTA={false} />
    </div>
  );
};

export default MidFight;
