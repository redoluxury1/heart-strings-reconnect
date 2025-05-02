
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ContentContainer from '../common/ContentContainer';
import { useInterface } from '../common/InterfaceProvider';

// Import quiz card icons
import { HeartHandshake, Heart, Compass, UserPlus } from 'lucide-react';

const LoveCodeQuizSection = () => {
  const { isEmotional, colors } = useInterface();
  
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
            Discover your Love Code + Personality Blueprint
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isEmotional ? "text-midnight-indigo/80" : "text-[#2C3E50]/80"
          }`}>
            Take our quizzes to understand your unique relationship patterns and discover how you and your partner connect.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Combined Love Code card with both quiz and invite options */}
          <div className={`rounded-xl p-6 md:p-8 ${
            isEmotional 
              ? "bg-soft-blush border-2 border-[#6A4A74]/30"
              : "bg-white/80 backdrop-blur-sm"
          } shadow-md`}>
            <div className="flex flex-col md:flex-row md:items-center mb-6">
              <div className="flex-shrink-0 flex justify-center mb-4 md:mb-0 md:mr-6">
                <div className={`p-4 rounded-full ${
                  isEmotional 
                    ? "bg-[#6A4A74]/20"
                    : "bg-[#543544]/20" 
                }`}>
                  <Heart className={`h-8 w-8 ${
                    isEmotional 
                      ? "text-[#6A4A74]" 
                      : "text-[#543544]"
                  }`} />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className={`text-xl font-cormorant font-semibold mb-2 ${
                  isEmotional ? "text-[#6A4A74]" : "text-[#2C3E50]"
                }`}>
                  Love Code Quiz
                </h3>
                <p className={`mb-4 ${
                  isEmotional ? "text-midnight-indigo/80" : "text-[#2C3E50]/80"
                }`}>
                  Discover how you and your partner naturally express and prefer to receive love.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/love-code-quiz">
                    <Button 
                      variant="default" 
                      className={`${
                        isEmotional 
                          ? "bg-[#6A4A74] hover:bg-[#6A4A74]/90"
                          : "bg-[#4f6572] hover:bg-[#4f6572]/90"
                      } text-white font-medium`}
                    >
                      Take the Quiz
                    </Button>
                  </Link>
                  <Link to="/invite">
                    <Button 
                      variant="outline" 
                      className={`border-2 ${
                        isEmotional 
                          ? "border-[#6A4A74] text-[#6A4A74] hover:bg-[#6A4A74]/5"
                          : "border-[#543544] text-[#543544] hover:bg-[#543544]/5"
                      } font-medium`}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Invite Partner
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* New Personality Blueprint Card */}
          <div className={`rounded-xl p-6 md:p-8 ${
            isEmotional 
              ? "bg-soft-blush border-2 border-[#6A4A74]/30"
              : "bg-white/80 backdrop-blur-sm" 
          } shadow-md`}>
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex-shrink-0 flex justify-center mb-4 md:mb-0 md:mr-6">
                <div className={`p-4 rounded-full ${
                  isEmotional 
                    ? "bg-[#6A4A74]/20"
                    : "bg-[#543544]/20" 
                }`}>
                  <Compass className={`h-8 w-8 ${
                    isEmotional 
                      ? "text-[#6A4A74]" 
                      : "text-[#543544]"
                  }`} />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className={`text-xl font-cormorant font-semibold mb-2 ${
                  isEmotional ? "text-[#6A4A74]" : "text-[#2C3E50]"
                }`}>
                  Personality Blueprint
                </h3>
                <p className={`mb-4 ${
                  isEmotional ? "text-midnight-indigo/80" : "text-[#2C3E50]/80"
                }`}>
                  Understand your emotional patterns and learn how your unique personality influences communication and relationships.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/personality-blueprint">
                    <Button 
                      variant="default" 
                      className={`${
                        isEmotional 
                          ? "bg-[#6A4A74] hover:bg-[#6A4A74]/90"
                          : "bg-[#543544] hover:bg-[#543544]/90"
                      } text-white font-medium`}
                    >
                      Take the Quiz
                    </Button>
                  </Link>
                  <Link to="/invite">
                    <Button 
                      variant="outline" 
                      className={`border-2 ${
                        isEmotional 
                          ? "border-[#6A4A74] text-[#6A4A74] hover:bg-[#6A4A74]/5"
                          : "border-[#543544] text-[#543544] hover:bg-[#543544]/5"
                      } font-medium`}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Invite Partner
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
};

export default LoveCodeQuizSection;
