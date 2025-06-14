
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import FeatureCardSection from '@/components/mid-fight/FeatureCardSection';
import BackgroundPhrases from '@/components/mid-fight/BackgroundPhrases';
import PauseTool from '@/components/mid-fight/pause-tool/PauseTool';
// Removed: import BuildBridgeCard from '@/components/mid-fight/build-bridge/BuildBridgeCard';
import MidFightColorHealing from '@/components/mid-fight/color-healing/MidFightColorHealing';
import SubscriptionGate from '@/components/subscription/SubscriptionGate';
import { FEATURE_KEYS } from '@/services/subscriptionService';

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
        <SubscriptionGate 
          featureKey={FEATURE_KEYS.MID_FIGHT_ACCESS}
          showUpgradePrompt={true}
        >
          {/* Feature cards including the always-visible tools */}
          <FeatureCardSection 
            selectedFeature={selectedFeature}
            toggleFeature={toggleFeature}
          />
          
          {/* Pause Tool Section - Moved to after What's Really Going On */}
          <section className="py-8 bg-soft-blush/30">
            <ContentContainer maxWidth="lg">
              <PauseTool />
            </ContentContainer>
          </section>
          
          {/* Color Healing Method Section */}
          <section className="py-6 md:py-8 bg-soft-blush/30">
            <ContentContainer maxWidth="lg">
              <MidFightColorHealing />
            </ContentContainer>
          </section>
          
          {/* Removed Build a Bridge Section (no more BuildBridgeCard at bottom) */}
        </SubscriptionGate>
      </main>
      
      <Footer showCTA={false} />
    </div>
  );
};

export default MidFight;
