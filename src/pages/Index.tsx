
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import ContentContainer from '../components/common/ContentContainer';
import DailyLoveNote from '../components/home/DailyLoveNote';
import StillUsSection from '../components/home/StillUsSection';
import RelationshipStatsSection from '../components/home/RelationshipStatsSection';
import HomeLanding from '../components/home/HomeLanding';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [hasNewLoveNote, setHasNewLoveNote] = useState(false);
  const { user, loading } = useAuth();
  
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
            
            {/* Add sign-up button if user is not logged in */}
            {!loading && !user && (
              <div className="text-center mt-8 mb-12">
                <p className="text-lg mb-4">Ready to start your journey with Bridge For Couples?</p>
                <Link to="/auth">
                  <Button size="lg" className="rounded-full bg-[#D36B4B] hover:bg-[#D36B4B]/90 text-white">
                    Sign Up or Log In
                  </Button>
                </Link>
              </div>
            )}
          </ContentContainer>
        </div>
        
        <StillUsSection />
        
        {/* Redesigned DailyLoveNote section */}
        <DailyLoveNote />
        
        {/* Redesigned Why It Matters section */}
        <RelationshipStatsSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
