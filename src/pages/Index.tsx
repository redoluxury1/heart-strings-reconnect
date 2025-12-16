
import React from 'react';
import { usePageAnalytics } from '@/hooks/useAnalytics';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HomeLanding from '@/components/home/HomeLanding';
import Hero from '@/components/home/Hero';
import WhyBridgeSection from '@/components/home/WhyBridgeSection';
import FeatureDemoSection from '@/components/home/FeatureDemoSection';
import StillUsSection from '@/components/home/StillUsSection';
import SmallWinsSection from '@/components/home/SmallWinsSection';
import RelationshipStatsSection from '@/components/home/RelationshipStatsSection';
import BrandSection from '@/components/common/BrandSection';
import ContentContainer from '@/components/common/ContentContainer';

const Index = () => {
  usePageAnalytics('home_page');
  const { user } = useAuth();
  const { hasActiveSubscription, loading } = useSubscription();

  // Show marketing sections only for non-subscribed users
  const showMarketingSections = !user || (!loading && !hasActiveSubscription);

  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      <Hero />
      
      <main className="flex-1">
        {showMarketingSections && (
          <>
            <BrandSection className="py-6 sm:py-8 lg:py-12" showLogo={false}>
              <ContentContainer>
                <HomeLanding />
              </ContentContainer>
            </BrandSection>
            
            <WhyBridgeSection />
            <FeatureDemoSection />
          </>
        )}
        
        <StillUsSection />
        <SmallWinsSection />
        <RelationshipStatsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
