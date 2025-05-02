
import React, { useEffect, useState } from 'react';
import { useInterface } from '../components/common/InterfaceProvider';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import ContentContainer from '../components/common/ContentContainer';
import DailyLoveNote from '../components/home/DailyLoveNote';
import StillUsSection from '../components/home/StillUsSection';
import WhyItMattersSection from '../components/home/WhyItMattersSection';
import LoveCodeQuizSection from '../components/home/LoveCodeQuizSection';
import NewLoveNoteNotification from '../components/home/NewLoveNoteNotification';
import DualInterfaceLanding from '../components/home/DualInterfaceLanding';

const Index = () => {
  const { isEmotional, colors } = useInterface();
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
    <div className={`min-h-screen ${isEmotional ? 'bg-slate-50' : 'bg-[#D1E5F4]'}`}>
      <Navbar />
      
      {/* New love note notification */}
      {hasNewLoveNote && <NewLoveNoteNotification onClose={() => setHasNewLoveNote(false)} />}
      
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
