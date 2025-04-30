
import React from 'react';
import { MessageCircle, Puzzle, Hand } from 'lucide-react';
import FeatureCard, { Feature } from './FeatureCard';
import ContentContainer from '@/components/common/ContentContainer';
import PausePhraseTool from './PausePhraseTool';
import SayThisInsteadTool from './SayThisInsteadTool';

// Feature data
const features: Feature[] = [
  {
    id: 'say-instead',
    title: 'Say This Instead',
    description: 'Turn common conflict phrases into calmer alternatives.',
    icon: <MessageCircle className="h-6 w-6 text-soft-cream" />,
    comingSoon: false,
    alwaysVisible: false,
  },
  {
    id: 'build-bridge',
    title: 'Build a Bridge',
    description: 'Get expert help on what to say next.',
    icon: <Puzzle className="h-6 w-6 text-mauve-rose" />,
    comingSoon: true,
    alwaysVisible: false,
  },
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
      {/* Pause Phrase Tool - Always visible without needing to click */}
      <section className="py-8 bg-soft-blush/30">
        <ContentContainer maxWidth="lg">
          <div className="bg-white rounded-lg shadow-md p-6 border border-lavender-blue/20">
            <div className="flex flex-col items-center mb-6">
              <Hand className="h-24 w-24 text-mauve-rose mb-4" />
            </div>
            <PausePhraseTool onClose={() => {}} />
          </div>
        </ContentContainer>
      </section>
      
      {/* Other feature cards */}
      <section className="py-8 bg-soft-blush/30">
        <ContentContainer maxWidth="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <FeatureCard 
                key={feature.id}
                feature={feature}
                isSelected={selectedFeature === feature.id}
                toggleFeature={toggleFeature}
                customContent={
                  feature.id === 'say-instead' && selectedFeature === 'say-instead' 
                    ? <SayThisInsteadTool /> 
                    : null
                }
              />
            ))}
          </div>
        </ContentContainer>
      </section>
    </>
  );
};

export default FeatureCardSection;
