
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
import { MessageCircle, Heart, Eye, LinkedHands, TwoInterlockingRings, Puzzle, Lock } from 'lucide-react';

interface StatSlideProps {
  statistic: string;
  explanation: string;
  punchline: string;
  icon: React.ReactNode;
}

const StatSlide: React.FC<StatSlideProps> = ({ statistic, explanation, punchline, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[280px] p-6">
      <div>
        {/* Icon above statistic */}
        <div className="mb-3 md:mb-4">
          {icon}
        </div>
        <h3 
          className="font-inter font-bold text-7xl md:text-8xl lg:text-9xl text-mauve-rose mb-0 tracking-tight leading-none"
          aria-label={`${statistic} ${explanation}`}
        >
          {statistic}
        </h3>
        <p className="text-base md:text-lg lg:text-xl mb-2 text-midnight-indigo font-medium max-w-lg mx-auto leading-tight">
          {explanation}
        </p>
        <p className="italic text-sm md:text-base tracking-wide text-midnight-indigo/70 font-light">
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
      punchline: "It's not just what you say — it's how you say it.",
      icon: <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-mauve-rose" />
    },
    {
      statistic: "80%",
      explanation: "of Millennials say emotional intelligence is a top priority in relationships.",
      punchline: "We're not just falling in love — we're learning how to stay in it.",
      icon: <Heart className="w-8 h-8 md:w-10 md:h-10 text-midnight-indigo" />
    },
    {
      statistic: "65%",
      explanation: "of couples avoid hard conversations out of fear it will make things worse.",
      punchline: "But silence isn't safety — it's distance.",
      icon: <Eye className="w-8 h-8 md:w-10 md:h-10 text-mauve-rose" />
    },
    {
      statistic: "1 in 2",
      explanation: "couples say they don't feel truly heard by their partner.",
      punchline: "Bridge For Couples helps turn misunderstandings into moments of connection.",
      icon: <LinkedHands className="w-8 h-8 md:w-10 md:h-10 text-midnight-indigo" />
    },
    {
      statistic: "83%",
      explanation: "of people believe better conflict tools would improve their relationship.",
      punchline: "No one teaches us how to fight fair — until now.",
      icon: <TwoInterlockingRings className="w-8 h-8 md:w-10 md:h-10 text-mauve-rose" />
    },
    {
      statistic: "71%",
      explanation: "of couples say they want to reconnect but don't know how.",
      punchline: "Bridge For Couples makes that first step easier.",
      icon: <Puzzle className="w-8 h-8 md:w-10 md:h-10 text-midnight-indigo" />
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
    <section className="py-16 bg-soft-blush">
      <ContentContainer>
        <div className="text-center mb-0">
          <h2 className="font-cormorant text-3xl md:text-4xl font-medium text-midnight-indigo mb-1">
            Why It Matters
          </h2>
          <p className="text-base text-midnight-indigo/90 max-w-3xl mx-auto font-inter mb-0">
            Real stats. Real struggles. Let's rewrite the story — with better tools, calmer conversations, and deeper connection
          </p>
        </div>

        <div className="mt-1 relative">
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
                    icon={stat.icon}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Move the navigation controls up by removing the mt-2 class and adding negative margin */}
            <div className="flex justify-center -mt-4">
              <div className="flex items-center gap-3">
                <CarouselPrevious className={cn(
                  "static relative h-8 w-8 md:h-10 md:w-10 bg-transparent hover:bg-transparent border-none shadow-none"
                )}>
                  <span className="text-2xl font-bold text-midnight-indigo">&lt;</span>
                </CarouselPrevious>
                <CarouselNext className={cn(
                  "static relative h-8 w-8 md:h-10 md:w-10 bg-transparent hover:bg-transparent border-none shadow-none"
                )}>
                  <span className="text-2xl font-bold text-midnight-indigo">&gt;</span>
                </CarouselNext>
              </div>
            </div>
          </Carousel>
        </div>
      </ContentContainer>
    </section>
  );
};

export default WhyItMattersSection;
