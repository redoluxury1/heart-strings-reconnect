
import React from 'react';
import { MessageCircle, ArrowLeftRight, Heart } from 'lucide-react';
import FeatureCard from './FeatureCard';
import SayThisInsteadTool from './SayThisInsteadTool';
import BuildBridgeCard from './build-bridge/BuildBridgeCard';
import WhatsReallyGoingOn from './WhatsReallyGoingOn';
import ColorHealingMethod from '@/components/post-conflict/color-healing/ColorHealingMethod';

interface FeatureCardSectionProps {
  selectedFeature: string | null;
  toggleFeature: (featureId: string) => void;
}

const FeatureCardSection: React.FC<FeatureCardSectionProps> = ({ 
  selectedFeature,
  toggleFeature 
}) => {
  return (
    <div className="py-8 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Say This Instead Tool (Progressive Disclosure) */}
          <div 
            className={`${selectedFeature === 'say-instead' ? 'col-span-1 md:col-span-2 lg:col-span-3 order-first' : ''}`}
            id="say-instead-section"
          >
            <FeatureCard 
              feature={{
                id: 'say-instead',
                title: "Say This Instead",
                description: "Reframe heated phrases into more productive ones",
                icon: <MessageCircle className="h-8 w-8" />,
                comingSoon: false,
                alwaysVisible: false
              }}
              isSelected={selectedFeature === 'say-instead'}
              toggleFeature={toggleFeature}
              customContent={<SayThisInsteadTool />}
            />
          </div>
          
          {/* What's Going On Tool */}
          <div 
            className={`${selectedFeature === 'whats-going-on' ? 'col-span-1 md:col-span-2 lg:col-span-3 order-first' : ''}`}
            id="whats-going-on-section"
          >
            <FeatureCard 
              feature={{
                id: 'whats-going-on',
                title: "What's Really Going On",
                description: "Decode what your partner's behavior means",
                icon: <ArrowLeftRight className="h-8 w-8" />,
                comingSoon: false,
                alwaysVisible: false
              }}
              isSelected={selectedFeature === 'whats-going-on'}
              toggleFeature={toggleFeature}
              customContent={<WhatsReallyGoingOn />}
            />
          </div>
          
          {/* Build Bridge Card */}
          <div 
            className={`${selectedFeature === 'build-bridge' ? 'col-span-1 md:col-span-2 lg:col-span-3 order-first' : ''}`}
            id="build-bridge-section"
          >
            <FeatureCard 
              feature={{
                id: 'build-bridge',
                title: "Build a Bridge",
                description: "Get expert help navigating a tough conversation",
                icon: <Heart className="h-8 w-8" />,
                comingSoon: false,
                alwaysVisible: false
              }}
              isSelected={selectedFeature === 'build-bridge'}
              toggleFeature={toggleFeature}
              customContent={<BuildBridgeCard />}
            />
          </div>
        </div>
        
        {/* Color Healing Method - Added at the bottom of the page */}
        <div className="mt-16">
          <div className="max-w-3xl mx-auto">
            <ColorHealingMethod />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCardSection;
