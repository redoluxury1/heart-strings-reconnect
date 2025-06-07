
import React from 'react';
import ContentContainer from '../common/ContentContainer';
import FeatureCard from './still-us/FeatureCard';
import getCardData from './still-us/CardData';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const StillUsSection: React.FC = () => {
  const cardData = getCardData();
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-[#f8f5ef] via-[#f5f1eb] to-white">
      <ContentContainer>
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div 
            ref={ref as React.RefObject<HTMLDivElement>}
            className={`flex justify-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} mb-6 sm:mb-8 px-4`}
          >
            <img
              src="/lovable-uploads/ff773bf1-651a-49f4-8ba0-476bb21ffeec.png"
              alt="We're still us"
              className="h-auto w-full max-w-sm sm:max-w-md lg:max-w-lg"
            />
          </div>
          <p className="text-[#2C3E50]/70 max-w-2xl mx-auto px-4 text-sm sm:text-base lg:text-lg leading-relaxed">
            Every relationship has cycles. Choose where you are right now, and we'll guide you forward with simple, research-backed tools.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 px-4">
          {cardData.map((card, index) => (
            <FeatureCard 
              key={index}
              card={card}
            />
          ))}
        </div>
      </ContentContainer>
    </section>
  );
};

export default StillUsSection;
