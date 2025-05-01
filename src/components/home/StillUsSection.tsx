
import React, { useEffect, useState } from 'react';
import ContentContainer from '../common/ContentContainer';
import { useIsMobile } from '@/hooks/use-mobile';
import FeatureCard from './still-us/FeatureCard';
import { FloatingHearts } from './still-us/FloatingHearts';
import getCardData from './still-us/CardData';

const StillUsSection = () => {
  const isMobile = useIsMobile();
  const [floatingHeartsCount, setFloatingHeartsCount] = useState<number>(15);
  const cards = getCardData();
  
  // Set number of hearts based on screen size
  useEffect(() => {
    setFloatingHeartsCount(isMobile ? 8 : 15);
  }, [isMobile]);
  
  return (
    <section className="py-12 bg-soft-blush relative overflow-hidden">
      {/* Floating hearts */}
      <FloatingHearts count={floatingHeartsCount} />
      
      <ContentContainer>
        <div className="text-center mb-14 relative z-10">
          <h2 className="font-cormorant text-3xl md:text-4xl font-medium italic text-midnight-indigo mb-4">
            We're still US
          </h2>
          <p className="text-center text-midnight-indigo font-inter font-light max-w-2xl mx-auto">
            For the hard moments, the quiet pauses, and the choice to reconnect — this space meets you wherever you are.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 relative z-10">
          {cards.map((card, index) => (
            <FeatureCard key={index} card={card} />
          ))}
        </div>
      </ContentContainer>
    </section>
  );
};

export default StillUsSection;
