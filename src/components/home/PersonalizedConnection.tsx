
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
    <section className="py-12 bg-[#F9F4EB] relative overflow-hidden">
      {/* Decorative hearts in background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Top left hearts */}
        <div className="absolute -top-4 left-[5%] text-[#FDE1D3] opacity-20">
          <Heart size={64} />
        </div>
        <div className="absolute top-[15%] left-[15%] text-[#FFDEE2] opacity-15">
          <Heart size={48} />
        </div>
        
        {/* Right side hearts */}
        <div className="absolute top-[10%] right-[10%] text-[#F1F0FB] opacity-20">
          <Heart size={56} />
        </div>
        <div className="absolute top-[40%] right-[5%] text-[#FFDEE2] opacity-15">
          <Heart size={72} />
        </div>
        
        {/* Bottom hearts */}
        <div className="absolute bottom-[10%] left-[20%] text-[#FDE1D3] opacity-20">
          <Heart size={52} />
        </div>
        <div className="absolute bottom-[15%] right-[25%] text-[#F1F0FB] opacity-15">
          <Heart size={40} />
        </div>
      </div>
      
      <ContentContainer className="relative z-10">
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/80973c36-0222-4e2d-ab5e-3e65a0ae5aaa.png" 
            alt="Love Code + Blueprint = Your relationship playbook" 
            className="max-w-full h-auto w-[85%] md:w-[65%]"
          />
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
