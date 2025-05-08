
import React from 'react';
import { Book } from 'lucide-react';
import FeatureCard, { Feature } from './FeatureCard';
import ContentContainer from '@/components/common/ContentContainer';
import PausePhraseTool from './PausePhraseTool';
import WhatsReallyGoingOn from './WhatsReallyGoingOn';
import BuildBridgeCard from './build-bridge/BuildBridgeCard';
import CodeWordTool from './code-word/CodeWordTool';

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
      {/* Timeout Timer and Code Word are side by side */}
      <section className="py-6 md:py-8 bg-soft-blush/30">
        <ContentContainer maxWidth="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column: Timeout Timer (already in TimeoutTimer component) */}
            <div className="bg-white rounded-lg shadow-md p-5 md:p-6 border border-lavender-blue/20">
              {/* The TimeoutTimer component is rendered in the MidFight page */}
            </div>
            
            {/* Right column: Code Word */}
            <div className="bg-white rounded-lg shadow-md p-5 md:p-6 border border-lavender-blue/20">
              <CodeWordTool />
            </div>
          </div>
        </ContentContainer>
      </section>
      
      {/* Pause Phrase Tool - Always visible with compact design */}
      <section className="py-6 md:py-8 bg-soft-blush/30">
        <ContentContainer maxWidth="lg">
          <div className="bg-white rounded-lg shadow-md p-5 md:p-6 border border-lavender-blue/20">
            <PausePhraseTool onClose={() => {}} />
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
      
      {/* Build a Bridge Section */}
      <section className="py-6 md:py-8 bg-soft-blush/30">
        <ContentContainer maxWidth="lg">
          <BuildBridgeCard />
        </ContentContainer>
      </section>
    </>
  );
};

export default FeatureCardSection;
