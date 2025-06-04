
import React, { useState } from 'react';
import ContentContainer from '../common/ContentContainer';
import { useInterface } from '../common/InterfaceProvider';
import { Quote } from "lucide-react";
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
    <section className={`py-12 sm:py-16 lg:py-20 ${
      isEmotional
        ? "bg-[#f8f4f0]" // Soft cream background from mockup
        : "bg-[#f8f4f0]"
    }`}>
      <ContentContainer>
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-4">
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#5d4357] tracking-wide">
            WHY IT MATTERS
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto px-4">
          <Carousel 
            opts={{
              align: "center",
              loop: true,
            }}
            className="relative"
          >
            <CarouselContent>
              {communicationStats.map((item) => (
                <CarouselItem key={item.id} className="basis-full">
                  <div className="mx-auto text-center p-6 sm:p-8 lg:p-12 rounded-3xl bg-white shadow-sm">
                    {/* Quote marks - updated with transparent styling */}
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <Quote 
                        className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-[#5d4357]/30" 
                        strokeWidth={1.5}
                      />
                    </div>
                    
                    {/* Statistic percentage - updated to use font-cormorant */}
                    <div className="mb-3 sm:mb-4">
                      <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#5d4357] font-cormorant">
                        {item.stat}
                      </span>
                    </div>
                    
                    {/* Statistic description */}
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6 max-w-2xl mx-auto font-cormorant text-[#5d4357] leading-relaxed">
                      {item.description}
                    </p>
                    
                    {/* Source citation */}
                    <p className="text-sm sm:text-base lg:text-lg italic text-[#5d4357]/70 font-cormorant">
                      {item.source}
                    </p>
                    
                    {/* Pagination dots */}
                    <div className="flex justify-center gap-2 mt-6 sm:mt-8">
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
            
            <div className="hidden lg:block">
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
