
import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import ContentContainer from '../components/common/ContentContainer';
import LoveNoteTimeline, { LoveNote } from '../components/home/LoveNoteTimeline';
import { toast } from "sonner";
import { useLocation } from 'react-router-dom';

const LoveNotesReceived = () => {
  const location = useLocation();
  const [notes, setNotes] = useState<LoveNote[]>([]);
  
  useEffect(() => {
    // Check if there's a new note in the location state
    if (location.state?.newNote) {
      const newNote = location.state.newNote as LoveNote;
      setNotes(prevNotes => [newNote, ...prevNotes]);
      
      toast("New love note received!", {
        description: "Your partner sent you a love note."
      });
    } else {
      // This would normally come from an API or local storage
      // For demo purposes, we'll create some sample notes
      setNotes([
        {
          id: '1',
          prompt: "What's one small way your partner made life easier this week?",
          message: "You made dinner three nights in a row when I was stressed about work. It meant the world to me.",
          timestamp: new Date(Date.now() - 86400000 * 2) // 2 days ago
        },
        {
          id: '2',
          prompt: "When did your partner make you feel seen?",
          message: "When you noticed I was quiet yesterday and asked if I was okay instead of just letting it go.",
          timestamp: new Date(Date.now() - 86400000 * 5) // 5 days ago
        },
        {
          id: '3',
          prompt: "Share a moment your partner made you smile recently.",
          message: "The silly dance you did while making breakfast just to make me laugh.",
          timestamp: new Date(Date.now() - 86400000 * 8) // 8 days ago
        }
      ]);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-soft-cream">
      <Navbar />
      
      <div className="py-10">
        <ContentContainer>
          <h1 className="font-cormorant text-3xl md:text-4xl font-bold text-midnight-indigo mb-8 text-center">
            Love Notes Received
          </h1>
          
          <p className="text-center mb-10 max-w-lg mx-auto text-midnight-indigo">
            This is your private collection of appreciation notes from your partner. 
            Take time to revisit these moments when you need a reminder of your connection.
          </p>
          
          <div className="max-w-md mx-auto">
            <LoveNoteTimeline notes={notes} />
          </div>
        </ContentContainer>
      </div>
    </div>
  );
};

export default LoveNotesReceived;
