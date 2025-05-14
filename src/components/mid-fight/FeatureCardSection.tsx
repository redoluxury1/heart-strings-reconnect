
import React from 'react';
import { MessageCircle, ArrowCircleRight, Heart } from 'lucide-react';
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
              title="Say This Instead"
              description="Reframe heated phrases into more productive ones"
              isExpanded={selectedFeature === 'say-instead'}
              onToggle={() => toggleFeature('say-instead')}
              icon={<MessageCircle className="h-8 w-8" />}
              expandedContent={<SayThisInsteadTool />}
              color="bg-[#7D5248]"
              textColor="text-white"
            />
          </div>
          
          {/* What's Going On Tool */}
          <div 
            className={`${selectedFeature === 'whats-going-on' ? 'col-span-1 md:col-span-2 lg:col-span-3 order-first' : ''}`}
            id="whats-going-on-section"
          >
            <FeatureCard 
              title="What's Really Going On"
              description="Decode what your partner's behavior means"
              isExpanded={selectedFeature === 'whats-going-on'}
              onToggle={() => toggleFeature('whats-going-on')}
              icon={<ArrowCircleRight className="h-8 w-8" />}
              expandedContent={<WhatsReallyGoingOn />}
              color="bg-[#2E2A63]"
              textColor="text-white"
            />
          </div>
          
          {/* Build Bridge Card */}
          <div 
            className={`${selectedFeature === 'build-bridge' ? 'col-span-1 md:col-span-2 lg:col-span-3 order-first' : ''}`}
            id="build-bridge-section"
          >
            <FeatureCard 
              title="Build a Bridge"
              description="Get expert help navigating a tough conversation"
              isExpanded={selectedFeature === 'build-bridge'}
              onToggle={() => toggleFeature('build-bridge')}
              icon={<Heart className="h-8 w-8" />}
              expandedContent={<BuildBridgeCard />}
              color="bg-[#F7ECD9]"
              textColor="text-[#1A2641]"
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
