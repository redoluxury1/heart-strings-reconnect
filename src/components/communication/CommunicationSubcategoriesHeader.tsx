
import React from 'react';
import ContentContainer from '@/components/common/ContentContainer';

const CommunicationSubcategoriesHeader: React.FC = () => {
  return (
    <ContentContainer maxWidth="lg">
      <div className="text-center mb-10">
        <h1 className="font-cormorant text-3xl md:text-4xl font-semibold text-[#162137] mb-3">
          Communication
        </h1>
        <p className="text-midnight-indigo/70 text-lg max-w-2xl mx-auto">
          Pick the area where things feel hardest right now.
        </p>
      </div>
    </ContentContainer>
  );
};

export default CommunicationSubcategoriesHeader;
