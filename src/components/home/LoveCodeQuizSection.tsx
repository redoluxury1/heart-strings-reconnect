
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ContentContainer from '../common/ContentContainer';
import { useInterface } from '../common/InterfaceProvider';

// Import quiz card icons
import { HeartHandshake, Heart } from 'lucide-react';

const LoveCodeQuizSection = () => {
  const { isEmotional } = useInterface();
  
  return (
    <section className={`py-16 ${
      isEmotional 
        ? "bg-white"
        : "bg-[#e8edf3]"
    }`}>
      <ContentContainer>
        <div className="text-center mb-12">
          <h2 className={`font-cormorant text-3xl md:text-4xl lg:text-5xl font-medium mb-4 ${
            isEmotional ? "text-midnight-indigo" : "text-[#2C3E50]"
          }`}>
            What's Your Love Code?
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isEmotional ? "text-midnight-indigo/80" : "text-[#2C3E50]/80"
          }`}>
            Discover the unique way you express and receive love. Take our quick quiz to understand what matters most in your relationship.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className={`rounded-xl p-6 md:p-8 mb-8 ${
            isEmotional 
              ? "bg-soft-blush"
              : "bg-white/80 backdrop-blur-sm"
          } shadow-sm`}>
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex-shrink-0 flex justify-center mb-4 md:mb-0 md:mr-6">
                <div className={`p-4 rounded-full ${
                  isEmotional 
                    ? "bg-rosewood-tint/20"
                    : "bg-[#543544]/20" 
                }`}>
                  <Heart className={`h-8 w-8 ${
                    isEmotional 
                      ? "text-rosewood-tint" 
                      : "text-[#543544]"
                  }`} />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className={`text-xl font-cormorant font-medium mb-2 ${
                  isEmotional ? "text-midnight-indigo" : "text-[#2C3E50]"
                }`}>
                  Understand each other better
                </h3>
                <p className={`mb-4 ${
                  isEmotional ? "text-midnight-indigo/80" : "text-[#2C3E50]/80"
                }`}>
                  The Love Code Quiz reveals how you and your partner naturally express and prefer to receive love.
                </p>
                <Link to="/love-code-quiz">
                  <Button 
                    variant="default" 
                    className={`${
                      isEmotional 
                        ? "bg-rosewood-tint hover:bg-rosewood-tint/90"
                        : "bg-[#4f6572] hover:bg-[#4f6572]/90"
                    } text-white`}
                  >
                    Take the Quiz
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className={`rounded-xl p-6 md:p-8 ${
            isEmotional 
              ? "bg-soft-blush"
              : "bg-white/80 backdrop-blur-sm" 
          } shadow-sm`}>
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex-shrink-0 flex justify-center mb-4 md:mb-0 md:mr-6">
                <div className={`p-4 rounded-full ${
                  isEmotional 
                    ? "bg-lavender-blue/20"
                    : "bg-[#543544]/20" 
                }`}>
                  <HeartHandshake className={`h-8 w-8 ${
                    isEmotional 
                      ? "text-lavender-blue" 
                      : "text-[#543544]"
                  }`} />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className={`text-xl font-cormorant font-medium mb-2 ${
                  isEmotional ? "text-midnight-indigo" : "text-[#2C3E50]"
                }`}>
                  Invite your partner to take the quiz too
                </h3>
                <p className={`mb-4 ${
                  isEmotional ? "text-midnight-indigo/80" : "text-[#2C3E50]/80"
                }`}>
                  Compare your Love Codes and get personalized tips on how to better connect with each other.
                </p>
                <Link to="/invite">
                  <Button 
                    variant="outline" 
                    className={`border ${
                      isEmotional 
                        ? "border-midnight-indigo text-midnight-indigo hover:bg-midnight-indigo/5"
                        : "border-[#543544] text-[#543544] hover:bg-[#543544]/5"
                    }`}
                  >
                    Invite Partner
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
};

export default LoveCodeQuizSection;
