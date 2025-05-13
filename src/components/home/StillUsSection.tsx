
import React from 'react';
import ContentContainer from '../common/ContentContainer';
import { useIsMobile } from '@/hooks/use-mobile';
import FeatureCard from './still-us/FeatureCard';
import getCardData from './still-us/CardData';
import { useInterface } from '../../hooks/useInterfaceContext';
import FloatingHearts from './still-us/FloatingHearts';

const StillUsSection = () => {
  const isMobile = useIsMobile();
  const { colors } = useInterface();
  
  return (
    <section className="py-12 bg-soft-blush border-t-2 border-b-2 border-[#6A4A74]/20 relative overflow-hidden">
      {/* Add floating hearts as decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingHearts count={20} />
      </div>
      
      <ContentContainer>
        <div className="text-center mb-14 relative z-10">
          {/* Updated to use the new image */}
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/ed843aef-2d34-4870-86bd-de0f4340f3fd.png" 
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
