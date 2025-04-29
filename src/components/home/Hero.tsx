
import React from 'react';
import { Button } from "@/components/ui/button";
import ContentContainer from '../common/ContentContainer';
import { Heart } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-rose-50 to-white py-20">
      <ContentContainer>
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-sm">
              <Heart className="h-8 w-8 text-rose-500" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 max-w-3xl mb-6">
            Reconnect with your partner during difficult moments
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-8">
            HeartStrings provides emotional guidance and practical tools to help couples navigate conflict 
            and find their way back to each other.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white px-8">
              Start Now
            </Button>
            <Button size="lg" variant="outline" className="border-rose-300 text-rose-500 hover:bg-rose-50 px-8">
              Learn More
            </Button>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default Hero;
