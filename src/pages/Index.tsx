
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import ContentContainer from '../components/common/ContentContainer';
import DailyLoveNote from '../components/home/DailyLoveNote';
import StillUsSection from '../components/home/StillUsSection';
import PersonalizedConnection from '../components/home/PersonalizedConnection';
import WhyItMattersSection from '../components/home/WhyItMattersSection';

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
        
        <WhyItMattersSection />
      </main>
      
      <Footer showCTA={true} />
    </div>
  );
};

export default Index;
