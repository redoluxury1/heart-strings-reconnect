import React from 'react';
import { Book } from 'lucide-react';
import FeatureCard, { Feature } from './FeatureCard';
import ContentContainer from '@/components/common/ContentContainer';
import PausePhraseTool from './PausePhraseTool';
import WhatsReallyGoingOn from './WhatsReallyGoingOn';

// Feature data for other features (not including "say-instead" which will be displayed directly)
const features: Feature[] = [
  {
    id: 'whats-going-on',
    title: "What's Really Going On?",
    description: "Decode what's happening when emotions are high with tools that translate intent, unpack real issues, and explain behaviors.",
    icon: null, // Removed the icon
    comingSoon: false,
    alwaysVisible: false,
    microtext: "",
    customTitle: true // Add this flag to indicate it has a custom title
  },
  {
    id: 'build-bridge',
    title: 'Build a Bridge',
    description: 'Sometimes we just need a third party to help us navigate something hard. We are building our team of experts to bring this feature to life.',
    icon: <Book className="h-6 w-6 text-mauve-rose" />,
    comingSoon: true,
    alwaysVisible: false,
    microtext: "Want to get in on the ground level?"
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
      {/* Pause Phrase Tool - Always visible with compact design */}
      <section className="py-6 md:py-8 bg-soft-blush/30">
        <ContentContainer maxWidth="lg">
          <div className="bg-white rounded-lg shadow-md p-5 md:p-6 border border-lavender-blue/20">
            <PausePhraseTool onClose={() => {}} />
          </div>
        </ContentContainer>
      </section>
      
      {/* Other feature cards */}
      {features.length > 0 && (
        <section className="py-6 md:py-8 bg-soft-blush/30">
          <ContentContainer maxWidth="lg">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 md:gap-8">
              {features.map((feature) => (
                <FeatureCard 
                  key={feature.id}
                  feature={feature}
                  isSelected={selectedFeature === feature.id}
                  toggleFeature={toggleFeature}
                  customContent={
                    feature.id === 'whats-going-on' && selectedFeature === 'whats-going-on' 
                      ? <WhatsReallyGoingOn /> 
                      : null
                  }
                />
              ))}
            </div>
          </ContentContainer>
        </section>
      )}
    </>
  );
};

export default FeatureCardSection;
