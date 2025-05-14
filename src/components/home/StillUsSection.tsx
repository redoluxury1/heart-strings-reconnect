
import React from 'react';
import ContentContainer from '../common/ContentContainer';
import FeatureCard from './still-us/FeatureCard';
import getCardData from './still-us/CardData';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const StillUsSection: React.FC = () => {
  const cardData = getCardData();
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section className="py-16 bg-white">
      <ContentContainer>
        <div className="text-center mb-12">
          <div 
            ref={ref as React.RefObject<HTMLDivElement>}
            className={`flex justify-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} mb-8`}
          >
            <img
              src="/lovable-uploads/ff773bf1-651a-49f4-8ba0-476bb21ffeec.png"
              alt="We're still us"
              className="h-auto w-4/5 sm:w-3/5 md:w-2/5 max-w-md"
            />
          </div>
          <p className="text-[#2C3E50]/70 max-w-2xl mx-auto">
            Every relationship has cycles. Choose where you are right now, and we'll guide you forward with simple, research-backed tools.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
