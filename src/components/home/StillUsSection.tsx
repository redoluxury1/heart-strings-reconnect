
import React, { useEffect, useState } from 'react';
import ContentContainer from '../common/ContentContainer';
import { useIsMobile } from '@/hooks/use-mobile';
import FeatureCard from './still-us/FeatureCard';
import getCardData from './still-us/CardData';
import { useInterface } from '../common/InterfaceProvider';

const StillUsSection = () => {
  const isMobile = useIsMobile();
  const { isEmotional, colors } = useInterface();
  
  return (
    <section className={`py-12 ${
      isEmotional 
        ? "bg-soft-blush border-t-2 border-b-2 border-[#6A4A74]/20" 
        : "bg-white bg-gradient-to-b from-white to-[#e8edf3]"
    } relative overflow-hidden`}>
      
      <ContentContainer>
        <div className="text-center mb-14 relative z-10">
          <h2 className={`font-cormorant text-3xl md:text-4xl font-semibold italic ${
            isEmotional ? "text-[#6A4A74]" : "text-[#2C3E50]"
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
          {getCardData(isEmotional).map((card, index) => (
            <FeatureCard key={index} card={card} />
          ))}
        </div>
      </ContentContainer>
    </section>
  );
};

export default StillUsSection;
