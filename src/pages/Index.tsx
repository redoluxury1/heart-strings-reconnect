
import React, { useEffect, useState } from 'react';
import { useInterface } from '../hooks/useInterfaceContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import ContentContainer from '../components/common/ContentContainer';
import DailyLoveNote from '../components/home/DailyLoveNote';
import StillUsSection from '../components/home/StillUsSection';
import WhyItMattersSection from '../components/home/WhyItMattersSection';
import LoveCodeQuizSection from '../components/home/LoveCodeQuizSection';
import DualInterfaceLanding from '../components/home/DualInterfaceLanding';

const Index = () => {
  const { isEmotional } = useInterface();
  const [hasNewLoveNote, setHasNewLoveNote] = useState(false);
  
  // Simulate checking for new love notes when the component mounts
  useEffect(() => {
    // In a real app, this would check an API or database
    // For demo, we'll just simulate a 50% chance of having a new note
    const checkForNewNotes = () => {
      const hasNote = Math.random() > 0.5;
      setHasNewLoveNote(hasNote);
    };
    
    checkForNewNotes();
  }, []);
  
  return (
    <div className={`min-h-screen ${
      isEmotional 
        ? 'bg-slate-50' 
        : 'bg-gradient-to-b from-[#15283f] to-[#6a8cb3]'
    }`}>
      <Navbar hasNewLoveNote={hasNewLoveNote} onViewLoveNote={() => setHasNewLoveNote(false)} />
      
      <main>
        <div className="relative">
          <Hero />
          <ContentContainer>
            <DualInterfaceLanding />
          </ContentContainer>
          <DailyLoveNote />
        </div>
        
        <StillUsSection />
        
        <LoveCodeQuizSection />
        
        <WhyItMattersSection />
      </main>
      
      <Footer showCTA={true} />
    </div>
  );
};

export default Index;
