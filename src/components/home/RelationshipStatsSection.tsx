
import React, { useState } from 'react';
import ContentContainer from '../common/ContentContainer';
import { useInterface } from '../../hooks/useInterfaceContext';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Statistics about communication in relationships
const communicationStats = [
  {
    id: 1,
    stat: "87%",
    description: "of couples say communication is their biggest challenge in their relationship",
    source: "National Marriage Project"
  },
  {
    id: 2,
    stat: "69%",
    description: "of relationship problems are perpetual and can be improved with better communication",
    source: "Gottman Institute Research"
  },
  {
    id: 3,
    stat: "3.5x",
    description: "higher satisfaction in relationships where partners practice active listening",
    source: "Journal of Family Psychology"
  },
  {
    id: 4,
    stat: "65%",
    description: "of divorces are attributed to communication problems between partners",
    source: "American Psychological Association"
  },
  {
    id: 5,
    stat: "92%",
    description: "of relationship conflicts are not about the subject being discussed, but how it's communicated",
    source: "Relationship Research Institute"
  },
  {
    id: 6,
    stat: "78%",
    description: "of couples who focus on improving communication report higher overall relationship happiness",
    source: "Journal of Couple and Relationship Therapy"
  },
  {
    id: 7,
    stat: "54%",
    description: "reduction in relationship stress reported by couples who practice weekly communication exercises",
    source: "Relationship Science Institute"
  },
  {
    id: 8,
    stat: "2.5x",
    description: "increase in emotional intimacy when couples practice vulnerability in communication",
    source: "Contemporary Family Therapy"
  },
  {
    id: 9,
    stat: "81%",
    description: "of therapists identify poor communication as the number one factor in relationship breakdown",
    source: "American Association for Marriage and Family Therapy"
  },
  {
    id: 10,
    stat: "74%",
    description: "of couples report that learning new communication skills had the biggest positive impact on their relationship",
    source: "International Journal of Communication Studies"
  }
];

const RelationshipStatsSection = () => {
  const { isEmotional, colors } = useInterface();
  
  return (
    <section className={`py-16 ${
      isEmotional
        ? "bg-[#fcfcfc]"
        : "bg-gradient-to-b from-[#e8edf3] to-[#6a8cb3]/70"
    }`}>
      <ContentContainer>
        <div className="text-center mb-12">
          <h2 className={`font-cormorant text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 ${
            isEmotional ? "text-[#6A4A74]" : "text-[#2C3E50]"
          }`}>
            Why It Matters
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isEmotional ? "text-midnight-indigo/80" : "text-[#2C3E50]/80"
          }`}>
            The science behind communication in relationships is clear.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Carousel 
            opts={{
              align: "center",
              loop: true,
            }}
            className="relative"
          >
            <CarouselContent>
              {communicationStats.map((item) => (
                <CarouselItem key={item.id} className="md:basis-3/4">
                  <div className={`mx-auto text-center p-8 rounded-xl ${
                    isEmotional 
                      ? "bg-white shadow-sm border-2 border-[#6A4A74]/10" 
                      : "bg-white/90 shadow-sm"
                  }`}>
                    <div className="mb-4">
                      <span className="text-7xl md:text-8xl font-bold text-[#6A4A74]">
                        {item.stat}
                      </span>
                    </div>
                    
                    <p className={`text-xl md:text-2xl mb-4 max-w-2xl mx-auto ${
                      isEmotional ? "text-midnight-indigo/90" : "text-[#2C3E50]"
                    }`}>
                      {item.description}
                    </p>
                    
                    <p className={`text-sm italic ${
                      isEmotional ? "text-midnight-indigo/60" : "text-[#2C3E50]/60"
                    }`}>
                      Source: {item.source}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="hidden md:block">
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </div>
          </Carousel>
        </div>
      </ContentContainer>
    </section>
  );
};

export default RelationshipStatsSection;
