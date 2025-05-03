
import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import ContentContainer from '../components/common/ContentContainer';
import DailyLoveNote from '../components/home/DailyLoveNote';
import StillUsSection from '../components/home/StillUsSection';
import RelationshipStatsSection from '../components/home/RelationshipStatsSection';
import LoveCodeQuizSection from '../components/home/LoveCodeQuizSection';
import HomeLanding from '../components/home/HomeLanding';

const Index = () => {
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
    <div className="min-h-screen bg-slate-50">
      <Navbar hasNewLoveNote={hasNewLoveNote} onViewLoveNote={() => setHasNewLoveNote(false)} />
      
      <main>
        <div className="relative">
          <Hero />
          <ContentContainer>
            <HomeLanding />
          </ContentContainer>
        </div>
        
        <StillUsSection />
        
        <LoveCodeQuizSection />
        
        {/* Daily Love Note section moved below the LoveCodeQuizSection */}
        <DailyLoveNote />
        
        <RelationshipStatsSection />
      </main>
      
      <Footer showCTA={true} />
    </div>
  );
};

export default Index;
