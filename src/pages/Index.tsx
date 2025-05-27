
import React from 'react';
import { usePageAnalytics } from '@/hooks/useAnalytics';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HomeLanding from '@/components/home/HomeLanding';
import Hero from '@/components/home/Hero';
import StillUsSection from '@/components/home/StillUsSection';
import ConflictStages from '@/components/home/ConflictStages';
import WhyItMattersSection from '@/components/home/WhyItMattersSection';
import RelationshipStatsSection from '@/components/home/RelationshipStatsSection';
import LoveCodeQuizSection from '@/components/home/LoveCodeQuizSection';
import CallToAction from '@/components/home/CallToAction';
import BrandSection from '@/components/common/BrandSection';
import ContentContainer from '@/components/common/ContentContainer';

const Index = () => {
  usePageAnalytics('home_page');

  return (
    <div className="min-h-screen flex flex-col bg-soft-cream">
      <Navbar />
      <main className="flex-1">
        <BrandSection className="py-8 md:py-12" showLogo={false}>
          <ContentContainer>
            <HomeLanding />
          </ContentContainer>
        </BrandSection>
        
        <Hero />
        <StillUsSection />
        <ConflictStages />
        <WhyItMattersSection />
        <RelationshipStatsSection />
        <LoveCodeQuizSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
