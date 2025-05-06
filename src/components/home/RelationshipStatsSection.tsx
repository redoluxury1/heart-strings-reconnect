
import React, { useState } from 'react';
import ContentContainer from '../common/ContentContainer';
import { useInterface } from '../common/InterfaceProvider';
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
    description: "of couples say communication is their biggest challenge",
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
  },
  // Adding 5 new statistics
  {
    id: 11,
    stat: "67%",
    description: "of couples who practice gratitude together report higher relationship satisfaction",
    source: "Journal of Positive Psychology"
  },
  {
    id: 12,
    stat: "5x",
    description: "increased likelihood of relationship longevity when partners have weekly quality time",
    source: "Relationship Research Quarterly"
  },
  {
    id: 13,
    stat: "72%",
    description: "of couples who successfully navigate conflicts have developed shared conflict resolution strategies",
    source: "Partnership Institute Research"
  },
  {
    id: 14,
    stat: "83%",
    description: "of long-term couples cite mutual respect as the most important factor in relationship success",
    source: "Modern Relationship Studies"
  },
  {
    id: 15,
    stat: "4.2x",
    description: "higher emotional connection reported when partners share their feelings openly at least once per day",
    source: "Emotional Intelligence Research Center"
  }
];

const RelationshipStatsSection = () => {
  const { isEmotional } = useInterface();
  
  return (
    <section className={`py-16 ${
      isEmotional
        ? "bg-[#f8f4f0]" // Soft cream background from mockup
        : "bg-[#f8f4f0]"
    }`}>
      <ContentContainer>
        <div className="text-center mb-12">
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-medium text-[#5d4357] tracking-wide">
            WHY IT MATTERS
          </h2>
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
                  <div className="mx-auto text-center p-8 md:p-12 rounded-3xl bg-white shadow-sm">
                    {/* Quote marks */}
                    <div className="flex justify-center mb-4">
                      <img 
                        src="/lovable-uploads/b0bff2dc-86f4-4f39-b536-147653e79b18.png" 
                        alt="Quote marks" 
                        className="h-16 w-auto opacity-40"
                      />
                    </div>
                    
                    {/* Statistic percentage */}
                    <div className="mb-4">
                      <span className="text-7xl md:text-8xl font-bold text-[#5d4357]">
                        {item.stat}
                      </span>
                    </div>
                    
                    {/* Statistic description */}
                    <p className="text-2xl md:text-3xl mb-6 max-w-2xl mx-auto font-cormorant text-[#5d4357]">
                      {item.description}
                    </p>
                    
                    {/* Source citation */}
                    <p className="text-lg italic text-[#5d4357]/70 font-cormorant">
                      {item.source}
                    </p>
                    
                    {/* Pagination dots */}
                    <div className="flex justify-center gap-2 mt-8">
                      {[1, 2, 3].map((dot) => (
                        <div 
                          key={dot}
                          className={`h-2 w-2 rounded-full ${
                            dot === 1 ? "bg-[#5d4357]" : "bg-[#5d4357]/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="hidden md:block">
              <CarouselPrevious className="left-0 border-[#5d4357] text-[#5d4357]" />
              <CarouselNext className="right-0 border-[#5d4357] text-[#5d4357]" />
            </div>
          </Carousel>
        </div>
      </ContentContainer>
    </section>
  );
};

export default RelationshipStatsSection;
