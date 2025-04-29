
import React from 'react';
import ContentContainer from '../common/ContentContainer';
import { Heart, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

type QuizCardProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonColorClass: string;
  icon: React.ReactNode;
  bgColorClass: string;
};

const PersonalizedConnection = () => {
  const isMobile = useIsMobile();
  
  const quizCards: QuizCardProps[] = [
    {
      title: "Discover Your Love Code™",
      description: "Uncover the way you and your partner give and receive love — and start using it every day to build stronger connection.",
      buttonText: "Take the Quiz",
      buttonColorClass: "bg-midnight-indigo hover:bg-midnight-indigo/90",
      icon: <Heart className="h-5 w-5" />,
      bgColorClass: "bg-white/80"
    },
    {
      title: "Discover Your Blueprint",
      description: "Understand your emotional and relational patterns — and learn how your unique personality influences communication, conflict, and closeness.",
      buttonText: "Start Blueprint Quiz",
      buttonColorClass: "bg-rosewood-tint hover:bg-rosewood-tint/90",
      icon: <Compass className="h-5 w-5" />,
      bgColorClass: "bg-white/80"
    }
  ];

  return (
    <section className="py-20 bg-soft-cream">
      <ContentContainer>
        <div className="text-center mb-14">
          <h2 className="font-cormorant text-3xl md:text-4xl font-medium text-midnight-indigo mb-4">
            Let's personalize your experience
          </h2>
          <p className="text-center text-midnight-indigo font-inter font-light max-w-2xl mx-auto">
            Your relationship isn't one-size-fits all and Bridge For Couples is built to reflect that. 
            These in-depth quizzes help us understand how you love, how you communicate and how we can 
            support your relationship in the most meaningful way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {quizCards.map((card, index) => (
            <div key={index} className="transition-all duration-300 hover:scale-[1.02] focus-within:scale-[1.02]">
              <div className={cn(
                "h-full rounded-xl shadow-md p-6 md:p-7", 
                card.bgColorClass
              )}>
                <div className="flex items-center mb-5">
                  <div className="p-2 rounded-full bg-soft-blush flex items-center justify-center">
                    {card.icon}
                  </div>
                  <h3 className="ml-3 text-xl font-cormorant font-medium text-midnight-indigo">
                    {card.title}
                  </h3>
                </div>
                
                <p className="text-midnight-indigo/80 text-sm md:text-base mb-6">
                  {card.description}
                </p>
                
                <Link to="#" className="block mt-auto">
                  <button 
                    className={cn(
                      "w-full rounded-full py-2.5 px-4 text-white transition-colors font-inter",
                      card.buttonColorClass
                    )}
                  >
                    {card.buttonText}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </ContentContainer>
    </section>
  );
};

export default PersonalizedConnection;
