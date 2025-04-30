
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import EmotionalHeader from '@/components/mid-fight/EmotionalHeader';
import TimeoutTimer from '@/components/mid-fight/TimeoutTimer';
import FeatureCardSection from '@/components/mid-fight/FeatureCardSection';

const MidFight = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasHapticFired, setHasHapticFired] = useState(false);
  
  // Handle visibility and haptic feedback
  useEffect(() => {
    // Set visible with a small delay for fade-in effect
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Fire haptic feedback when visible (if supported)
      if (!hasHapticFired && navigator.vibrate) {
        navigator.vibrate(100); // Subtle 100ms vibration
        setHasHapticFired(true);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [hasHapticFired]);

  // Toggle feature display
  const toggleFeature = (featureId: string) => {
    if (selectedFeature === featureId) {
      setSelectedFeature(null);
    } else {
      setSelectedFeature(featureId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="pb-16">
        {/* Emotional Header Block */}
        <EmotionalHeader isVisible={isVisible} />
        
        {/* Directly show the time out timer */}
        <section className="py-8 bg-soft-blush/30">
          <ContentContainer maxWidth="lg">
            <TimeoutTimer />
          </ContentContainer>
        </section>

        {/* Feature cards (excluding the timeout timer) */}
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
