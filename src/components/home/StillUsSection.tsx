
import React from 'react';
import ContentContainer from '../common/ContentContainer';
import FeatureCard from './still-us/FeatureCard';
import getCardData from './still-us/CardData';

const StillUsSection: React.FC = () => {
  const cardData = getCardData();
  
  return (
    <section className="py-16 bg-white">
      <ContentContainer>
        <div className="text-center mb-12">
          <h2 className="font-cormorant text-3xl md:text-4xl font-medium text-[#2C3E50] mb-3">
            Start Here
          </h2>
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
