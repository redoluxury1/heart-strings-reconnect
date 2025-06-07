
import React from 'react';
import { usePageAnalytics } from '@/hooks/useAnalytics';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HomeLanding from '@/components/home/HomeLanding';
import Hero from '@/components/home/Hero';
import StillUsSection from '@/components/home/StillUsSection';
import SmallWinsSection from '@/components/home/SmallWinsSection';
import RelationshipStatsSection from '@/components/home/RelationshipStatsSection';
import BrandSection from '@/components/common/BrandSection';
import ContentContainer from '@/components/common/ContentContainer';

const Index = () => {
  usePageAnalytics('home_page');

  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <div className="bg-navy-800">
        <Navbar />
        <Hero />
      </div>
      
      <main className="flex-1">
        <BrandSection className="py-6 sm:py-8 lg:py-12" showLogo={false}>
          <ContentContainer>
            <HomeLanding />
          </ContentContainer>
        </BrandSection>
        
        <StillUsSection />
        <SmallWinsSection />
        <RelationshipStatsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
