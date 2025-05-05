
import React from 'react';
import ContentContainer from '../common/ContentContainer';
import { useIsMobile } from '@/hooks/use-mobile';
import FeatureCard from './still-us/FeatureCard';
import getCardData from './still-us/CardData';
import { useInterface } from '../../hooks/useInterfaceContext';

const StillUsSection = () => {
  const isMobile = useIsMobile();
  const { colors } = useInterface();
  
  return (
    <section className="py-12 bg-soft-blush border-t-2 border-b-2 border-[#6A4A74]/20 relative overflow-hidden">
      
      <ContentContainer>
        <div className="text-center mb-14 relative z-10">
          {/* Replace text heading with the image */}
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/b1c8f509-f8ea-4a0a-97a9-3dce6eacb685.png" 
              alt="We're still US" 
              className="h-32 w-auto"
            />
          </div>
          <p className="text-center text-midnight-indigo font-inter font-light max-w-2xl mx-auto">
            For the hard moments, the quiet pauses, and the choice to reconnect — this space meets you wherever you are.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 relative z-10">
          {getCardData().map((card, index) => (
            <FeatureCard key={index} card={card} />
          ))}
        </div>
      </ContentContainer>
    </section>
  );
};

export default StillUsSection;
