
import React, { useEffect, useState } from 'react';
import ContentContainer from '../common/ContentContainer';
import { useIsMobile } from '@/hooks/use-mobile';
import FeatureCard from './still-us/FeatureCard';
import { FloatingHearts } from './still-us/FloatingHearts';
import getCardData from './still-us/CardData';
import { useInterface } from '../common/InterfaceProvider';

const StillUsSection = () => {
  const isMobile = useIsMobile();
  const { isEmotional } = useInterface();
  const [floatingHeartsCount, setFloatingHeartsCount] = useState<number>(15);
  const cards = getCardData();
  
  // Set number of hearts based on screen size
  useEffect(() => {
    setFloatingHeartsCount(isMobile ? 8 : 15);
  }, [isMobile]);
  
  return (
    <section className={`py-12 ${
      isEmotional 
        ? "bg-soft-blush" 
        : "bg-white bg-gradient-to-b from-white to-[#e8edf3]"
    } relative overflow-hidden`}>
      {/* Floating hearts */}
      <FloatingHearts count={floatingHeartsCount} />
      
      <ContentContainer>
        <div className="text-center mb-14 relative z-10">
          <h2 className={`font-cormorant text-3xl md:text-4xl font-medium italic ${
            isEmotional ? "text-midnight-indigo" : "text-[#2C3E50]"
          } mb-4`}>
            We're still US
          </h2>
          <p className={`text-center ${
            isEmotional ? "text-midnight-indigo" : "text-[#2C3E50]"
          } font-inter font-light max-w-2xl mx-auto`}>
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
