
import React from 'react';
import { Heart, MessageCircle, Puzzle } from 'lucide-react';
import FeatureCard, { Feature } from './FeatureCard';
import ContentContainer from '@/components/common/ContentContainer';

// Feature data
const features: Feature[] = [
  {
    id: 'mood-check-in',
    title: 'Mood Check-In',
    description: 'Helps you name what you\'re feeling before you say more.',
    icon: <Heart className="h-6 w-6 text-rosewood-tint" />,
    comingSoon: false,
    alwaysVisible: false,
  },
  {
    id: 'pause-phrase',
    title: 'Pause & Phrase Toolkit',
    description: 'Say what you mean—without making things worse.',
    icon: <MessageCircle className="h-6 w-6 text-midnight-indigo" />,
    comingSoon: false,
    alwaysVisible: false,
  },
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
    <section className="py-8 bg-soft-blush/30">
      <ContentContainer maxWidth="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <FeatureCard 
              key={feature.id}
              feature={feature}
              isSelected={selectedFeature === feature.id}
              toggleFeature={toggleFeature}
            />
          ))}
        </div>
      </ContentContainer>
    </section>
  );
};

export default FeatureCardSection;
