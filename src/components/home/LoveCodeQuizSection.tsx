
import React from 'react';
import { Button } from "@/components/ui/button";
import ContentContainer from '../common/ContentContainer';
import { Link } from 'react-router-dom';
import { Heart, PieChart } from 'lucide-react';

const LoveCodeQuizSection = () => {
  return (
    <section className="py-16 bg-white">
      <ContentContainer>
        <div className="max-w-4xl mx-auto bg-soft-blush/40 p-8 md:p-10 rounded-xl shadow-sm">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Heart className="h-16 w-16 text-mauve-rose" />
              <PieChart className="h-8 w-8 text-lavender-blue absolute -bottom-1 -right-1" />
            </div>
          </div>
          
          <h2 className="font-cormorant text-3xl md:text-4xl font-medium text-midnight-indigo text-center mb-4">
            Discover Your Love Code™
          </h2>
          
          <p className="text-center text-midnight-indigo font-inter font-light max-w-2xl mx-auto mb-6">
            Understanding how you naturally give and receive love is the first step toward 
            deeper connection. Our research-based quiz reveals your unique Love Code™ and 
            gives you personalized insights to strengthen your relationship.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm w-full sm:w-auto sm:max-w-[200px]">
              <h3 className="font-medium text-midnight-indigo mb-2 text-center">25 Questions</h3>
              <p className="text-sm text-midnight-indigo/70 text-center">Thoughtfully designed scenarios</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm w-full sm:w-auto sm:max-w-[200px]">
              <h3 className="font-medium text-midnight-indigo mb-2 text-center">5-7 Minutes</h3>
              <p className="text-sm text-midnight-indigo/70 text-center">Quick but insightful experience</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm w-full sm:w-auto sm:max-w-[200px]">
              <h3 className="font-medium text-midnight-indigo mb-2 text-center">Personalized</h3>
              <p className="text-sm text-midnight-indigo/70 text-center">Custom insights for your relationship</p>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/love-code-quiz">
              <Button size="lg" className="bg-mauve-rose hover:bg-mauve-rose/90 text-white px-10">
                Take the Quiz Now
              </Button>
            </Link>
            <p className="text-sm text-midnight-indigo/60 mt-4">
              Free, insightful, and takes just a few minutes
            </p>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
};

export default LoveCodeQuizSection;
