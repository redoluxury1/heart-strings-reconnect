
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import ContentContainer from '../components/common/ContentContainer';
import { Heart, Handshake, MessageCircle } from 'lucide-react';
import Card from '../components/common/Card';
import BrandSection from '../components/common/BrandSection';
import CallToAction from '../components/home/CallToAction';
import DailyLoveNote from '../components/home/DailyLoveNote';
import StillUsSection from '../components/home/StillUsSection';

const Index = () => {
  const benefits = [
    {
      title: "Emotional Intelligence",
      description: "Learn to recognize and manage emotions during conflict to avoid escalation.",
      icon: <Heart className="h-5 w-5" />
    },
    {
      title: "Better Communication",
      description: "Develop skills to express needs and listen effectively even when tensions are high.",
      icon: <MessageCircle className="h-5 w-5" />
    },
    {
      title: "Stronger Connection",
      description: "Transform conflicts into opportunities to deepen understanding and intimacy.",
      icon: <Handshake className="h-5 w-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main>
        <div className="relative">
          <Hero />
          <DailyLoveNote />
        </div>
        
        <StillUsSection />
        
        <BrandSection
          className="bg-white"
          title="Build a Healthier Relationship"
          subtitle="Bridge For Couples helps you develop the skills and insights needed for conflict resolution and deeper connection."
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} icon={benefit.icon} title={benefit.title} className="h-full">
                <p className="text-slate-600">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </BrandSection>
        
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
