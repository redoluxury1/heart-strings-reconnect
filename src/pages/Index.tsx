
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import ContentContainer from '../components/common/ContentContainer';
import DailyLoveNote from '../components/home/DailyLoveNote';
import StillUsSection from '../components/home/StillUsSection';
import PersonalizedConnection from '../components/home/PersonalizedConnection';
import CallToAction from '../components/home/CallToAction';
import RelationshipCarousel from '../components/home/RelationshipCarousel';

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main>
        <div className="relative">
          <Hero />
          <DailyLoveNote />
        </div>
        
        <StillUsSection />
        
        <PersonalizedConnection />
        
        <RelationshipCarousel />
        
        <CallToAction />
      </main>
      
      <footer className="bg-slate-800 text-slate-200 py-12">
        <ContentContainer>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <img 
                src="/lovable-uploads/d5fb821b-b9d2-40c0-b55d-31fd2af60ac4.png" 
                alt="Bridge For Couples" 
                className="h-10 w-auto" 
              />
            </div>
            
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Bridge For Couples. All rights reserved.
            </p>
          </div>
        </ContentContainer>
      </footer>
    </div>
  );
};

export default Index;
