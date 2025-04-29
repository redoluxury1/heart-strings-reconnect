
import React, { useState, useEffect } from 'react';
import ContentContainer from '../common/ContentContainer';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from '@/components/ui/carousel';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface StatSlideProps {
  statistic: string;
  explanation: string;
  punchline: string;
}

const StatSlide: React.FC<StatSlideProps> = ({ statistic, explanation, punchline }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[300px] p-6 md:p-10">
      <div className="mb-6">
        <h3 className="font-cormorant font-bold text-5xl md:text-7xl lg:text-8xl text-mauve-rose mb-2">
          {statistic}
        </h3>
        <p className="text-base md:text-lg mb-4 text-midnight-indigo max-w-lg mx-auto">
          {explanation}
        </p>
        <p className="font-semibold text-sm md:text-base tracking-wide italic text-midnight-indigo/70">
          {punchline}
        </p>
      </div>
    </div>
  );
};

const WhyItMattersSection: React.FC = () => {
  const isMobile = useIsMobile();
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  
  const statistics = [
    {
      statistic: "72%",
      explanation: "of couples say communication is the biggest reason they fight.",
      punchline: "It's not just what you say — it's how you say it."
    },
    {
      statistic: "80%",
      explanation: "of Millennials say emotional intelligence is a top priority in relationships.",
      punchline: "We're not just falling in love — we're learning how to stay in it."
    },
    {
      statistic: "65%",
      explanation: "of couples avoid hard conversations out of fear it will make things worse.",
      punchline: "But silence isn't safety — it's distance."
    },
    {
      statistic: "1 in 2",
      explanation: "couples say they don't feel truly heard by their partner.",
      punchline: "Bridge For Couples helps turn misunderstandings into moments of connection."
    },
    {
      statistic: "83%",
      explanation: "of people believe better conflict tools would improve their relationship.",
      punchline: "No one teaches us how to fight fair — until now."
    },
    {
      statistic: "71%",
      explanation: "of couples say they want to reconnect but don't know how.",
      punchline: "Bridge For Couples makes that first step easier."
    }
  ];
  
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (autoPlay) {
      timer = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % statistics.length);
      }, 5500); // Rotate every 5.5 seconds
    }
    
    return () => clearTimeout(timer);
  }, [currentSlide, autoPlay, statistics.length]);

  return (
    <section className="py-20 bg-soft-blush">
      <ContentContainer>
        <div className="text-center mb-6">
          <h2 className="font-cormorant text-3xl md:text-4xl font-medium text-midnight-indigo mb-2">
            Why It Matters
          </h2>
          <p className="text-sm md:text-base text-midnight-indigo/80 max-w-2xl mx-auto">
            Real stats. Real struggles. Let's rewrite the story- with better tools, calmer conversations and deeper connection
          </p>
        </div>

        <div className="mt-10 relative">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
            setApi={(api) => {
              if (api) {
                api.on('select', () => {
                  // Pause autoplay when manually navigating
                  setAutoPlay(false);
                  // Resume autoplay after 10 seconds of inactivity
                  setTimeout(() => setAutoPlay(true), 10000);
                });
              }
            }}
          >
            <CarouselContent>
              {statistics.map((stat, index) => (
                <CarouselItem key={index} className="basis-full">
                  <StatSlide 
                    statistic={stat.statistic}
                    explanation={stat.explanation}
                    punchline={stat.punchline}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute inset-y-0 left-4 flex items-center">
              <CarouselPrevious className={cn(
                "static relative left-0 transform-none h-8 w-8 md:h-10 md:w-10 bg-white/80 hover:bg-white",
                "border border-mauve-rose/20"
              )}>
                <span className="text-lg font-bold">&lt;</span>
              </CarouselPrevious>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center">
              <CarouselNext className={cn(
                "static relative right-0 transform-none h-8 w-8 md:h-10 md:w-10 bg-white/80 hover:bg-white",
                "border border-mauve-rose/20"
              )}>
                <span className="text-lg font-bold">&gt;</span>
              </CarouselNext>
            </div>
          </Carousel>
        </div>
      </ContentContainer>
    </section>
  );
};

export default WhyItMattersSection;
