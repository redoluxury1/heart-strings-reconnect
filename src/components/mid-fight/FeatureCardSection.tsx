
import React from 'react';
import { Book } from 'lucide-react';
import FeatureCard, { Feature } from './FeatureCard';
import ContentContainer from '@/components/common/ContentContainer';
import TryAgainTool from './TryAgainTool';
import WhatsReallyGoingOn from './WhatsReallyGoingOn';
import BuildBridgeCard from './build-bridge/BuildBridgeCard';
import SometimesItStillHurts from './SometimesItStillHurts';

// Feature data for other features (not including "say-instead" which will be displayed directly)
const features: Feature[] = [
  {
    id: 'whats-going-on',
    title: "What's Really Going On?",
    description: "Decode what's happening when emotions are high with tools that translate intent, unpack real issues, and explain behaviors.",
    icon: null,
    comingSoon: false,
    alwaysVisible: false,
    microtext: "",
    customTitle: true
  }
];

interface FeatureCardSectionProps {
  selectedFeature: string | null;
  toggleFeature: (featureId: string) => void;
}

const FeatureCardSection: React.FC<FeatureCardSectionProps> = ({ 
  selectedFeature,
  toggleFeature
}) => {
  return (
    <>
      {/* Original TimeoutTimer and CodeWordTool section is in MidFight.tsx and does not need to be here */}
      {/* Removed duplicate section */}
      
      {/* Let's Try That Again Tool - Always visible with compact design */}
      <section className="py-6 md:py-8 bg-soft-blush/30">
        <ContentContainer maxWidth="lg">
          <div className="bg-white rounded-lg shadow-md p-5 md:p-6 border border-lavender-blue/20">
            <TryAgainTool onClose={() => {}} />
          </div>
        </ContentContainer>
      </section>
      
      {/* What's Really Going On Feature */}
      <section className="py-6 md:py-8 bg-soft-cream/30">
        <ContentContainer maxWidth="lg">
          <div className="bg-white rounded-lg shadow-md p-5 md:p-6 border border-lavender-blue/20">
            <WhatsReallyGoingOn />
          </div>
        </ContentContainer>
      </section>
      
      {/* Color Healing Method - Added above Build a Bridge */}
      <section className="py-6 md:py-8 bg-soft-blush/30">
        <ContentContainer maxWidth="lg">
          <SometimesItStillHurts />
        </ContentContainer>
      </section>
      
      {/* Build a Bridge Section */}
      <section className="py-6 md:py-8 bg-soft-cream/30">
        <ContentContainer maxWidth="lg">
          <BuildBridgeCard />
        </ContentContainer>
      </section>
    </>
  );
};

export default FeatureCardSection;
