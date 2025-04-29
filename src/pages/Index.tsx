
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import ConflictStages from '../components/home/ConflictStages';
import ContentContainer from '../components/common/ContentContainer';
import { Heart, Handshake, MessageCircle } from 'lucide-react';
import Card from '../components/common/Card';

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
        <Hero />
        <ConflictStages />
        
        <section className="py-16 bg-white">
          <ContentContainer>
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <img 
                  src="/lovable-uploads/61c36ea7-9582-4359-8fed-7603197af3d6.png" 
                  alt="Bridge For Couples Icon" 
                  className="h-16 w-auto" 
                />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Build a Healthier Relationship
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Bridge For Couples helps you develop the skills and insights needed for conflict resolution and deeper connection.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} icon={benefit.icon} title={benefit.title} className="h-full">
                  <p className="text-slate-600">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </ContentContainer>
        </section>
        
        <section className="py-16 bg-gradient-to-br from-rose-100 to-rose-50">
          <ContentContainer>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Start Healing Today
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                Every relationship faces challenges. Take the first step toward healthier conflict resolution and deeper connection.
              </p>
              <button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-md font-medium transition-colors">
                Begin Your Journey
              </button>
            </div>
          </ContentContainer>
        </section>
      </main>
      
      <footer className="bg-slate-800 text-slate-200 py-12">
        <ContentContainer>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <img 
                src="/lovable-uploads/bca4bf72-9398-4185-bfe1-a6d123aaf426.png" 
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
