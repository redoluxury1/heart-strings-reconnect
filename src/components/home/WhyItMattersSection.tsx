
import React from 'react';
import ContentContainer from '../common/ContentContainer';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from '@/components/ui/carousel';
import { useIsMobile } from '@/hooks/use-mobile';

interface StatSlideProps {
  statistic: string;
  explanation: string;
  punchline: string;
}

const StatSlide: React.FC<StatSlideProps> = ({ statistic, explanation, punchline }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[300px] p-6 md:p-10 bg-soft-blush rounded-lg shadow-sm">
      <div className="mb-6">
        <h3 className="font-cormorant font-bold text-4xl md:text-6xl text-mauve-rose mb-4">
          {statistic}
        </h3>
        <p className="text-base md:text-lg mb-8 text-midnight-indigo max-w-lg mx-auto">
          {explanation}
        </p>
        <p className="font-semibold text-sm md:text-base tracking-wide italic text-midnight-indigo">
          {punchline}
        </p>
      </div>
    </div>
  );
};

const WhyItMattersSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  const statistics = [
    {
      statistic: "72%",
      explanation: "of couples say communication is the biggest reason they fight.",
      punchline: "It's not just what you say — it's how you say it."
    },
    {
      statistic: "80%",
      explanation: "of Millennials say emotional intelligence is essential for long-term love.",
      punchline: "Clarity and empathy are the new intimacy."
    },
    {
      statistic: "65%",
      explanation: "of couples say they've had the same fight more than 5 times.",
      punchline: "What if your next conflict ended differently?"
    },
    {
      statistic: "1 in 3",
      explanation: "couples say they don't feel heard by their partner.",
      punchline: "Being right doesn't feel as good as being understood."
    },
    {
      statistic: "58%",
      explanation: "of people say they'd stay married with the right tools.",
      punchline: "You're not failing — you're just missing support."
    }
  ];

  return (
    <section className="py-20 bg-soft-cream">
      <ContentContainer>
        <div className="text-center mb-14">
          <h2 className="font-cormorant text-3xl md:text-4xl font-medium text-midnight-indigo">
            Why It Matters
          </h2>
        </div>

        <div className="mt-10">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {statistics.map((stat, index) => (
                <CarouselItem key={index} className={isMobile ? "basis-full" : "basis-full md:basis-3/4"}>
                  <StatSlide 
                    statistic={stat.statistic}
                    explanation={stat.explanation}
                    punchline={stat.punchline}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-2 mt-8">
              <CarouselPrevious className="static translate-y-0 h-10 w-10" />
              <CarouselNext className="static translate-y-0 h-10 w-10" />
            </div>
          </Carousel>
        </div>
      </ContentContainer>
    </section>
  );
};

export default WhyItMattersSection;
