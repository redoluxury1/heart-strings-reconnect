
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import ContentContainer from '../common/ContentContainer';
import { useInterface } from '../common/InterfaceProvider';

const WhyItMattersSection = () => {
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
            Why Communication Matters
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isEmotional ? "text-midnight-indigo/80" : "text-[#2C3E50]/80"
          }`}>
            We've built tools to help you navigate emotional moments because the way we communicate
            shapes the quality of our connections.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
          <div className={`p-6 rounded-xl ${
            isEmotional
              ? "bg-white shadow-sm border-2 border-[#6A4A74]/20"
              : "bg-white/80 backdrop-blur-sm shadow-sm"
          }`}>
            <h3 className={`font-cormorant text-xl font-semibold mb-3 ${
              isEmotional ? "text-[#6A4A74]" : "text-[#2C3E50]"
            }`}>
              During Conflict
            </h3>
            <p className={`mb-4 ${
              isEmotional ? "text-midnight-indigo/80" : "text-[#2C3E50]/80"
            }`}>
              Access tools right in the heat of an argument to help you pause, rephrase, and reconnect.
            </p>
            <Link to="/during-conflict">
              <Button 
                variant="outline" 
                className={`w-full border-2 ${
                  isEmotional 
                    ? "border-[#6A4A74] text-[#6A4A74] hover:bg-[#6A4A74]/5 font-medium"
                    : "border-[#4f6572] text-[#4f6572] hover:bg-[#4f6572]/5"
                }`}
              >
                Explore Tools
              </Button>
            </Link>
          </div>
          
          <div className={`p-6 rounded-xl ${
            isEmotional
              ? "bg-white shadow-sm border-2 border-[#6A4A74]/20"
              : "bg-white/80 backdrop-blur-sm shadow-sm"
          }`}>
            <h3 className={`font-cormorant text-xl font-semibold mb-3 ${
              isEmotional ? "text-[#6A4A74]" : "text-[#2C3E50]"
            }`}>
              After Disagreements
            </h3>
            <p className={`mb-4 ${
              isEmotional ? "text-midnight-indigo/80" : "text-[#2C3E50]/80"
            }`}>
              Learn how to repair and reconnect in a meaningful way when tensions have eased.
            </p>
            <Link to="/post-conflict">
              <Button 
                variant="outline" 
                className={`w-full border-2 ${
                  isEmotional 
                    ? "border-[#6A4A74] text-[#6A4A74] hover:bg-[#6A4A74]/5 font-medium"
                    : "border-[#543544] text-[#543544] hover:bg-[#543544]/5"
                }`}
              >
                Repair & Connect
              </Button>
            </Link>
          </div>
          
          <div className={`p-6 rounded-xl ${
            isEmotional
              ? "bg-white shadow-sm border-2 border-[#6A4A74]/20"
              : "bg-white/80 backdrop-blur-sm shadow-sm"
          }`}>
            <h3 className={`font-cormorant text-xl font-semibold mb-3 ${
              isEmotional ? "text-[#6A4A74]" : "text-[#2C3E50]"
            }`}>
              Daily Connection
            </h3>
            <p className={`mb-4 ${
              isEmotional ? "text-midnight-indigo/80" : "text-[#2C3E50]/80"
            }`}>
              Small, consistent moments of connection help create a foundation of trust and intimacy.
            </p>
            <a href="#daily-love-note">
              <Button 
                variant="outline" 
                className={`w-full border-2 ${
                  isEmotional 
                    ? "border-[#6A4A74] text-[#6A4A74] hover:bg-[#6A4A74]/5 font-medium"
                    : "border-[#4f6572] text-[#4f6572] hover:bg-[#4f6572]/5"
                }`}
              >
                Send a Note
              </Button>
            </a>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
};

export default WhyItMattersSection;
