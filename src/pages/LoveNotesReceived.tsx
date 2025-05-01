
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "sonner";
import { LoveNote } from '../components/home/LoveNoteTimeline';

const LoveNotesReceived = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if there's a new note in the location state
    if (location.state?.newNote) {
      const newNote = location.state.newNote as LoveNote;
      
      toast.success("New love note received!", {
        description: "Your partner sent you a love note."
      });

      // Redirect to the archive page with the love-notes tab selected
      // Pass the new note as state so it can be added to the archive
      navigate('/archive', { 
        state: { 
          activeTab: 'love-notes',
          newNote: newNote
        },
        replace: true  // Replace current history entry to prevent back button issues
      });
    } else {
      // If no new note, just redirect to the archive with love-notes tab
      navigate('/archive', { 
        state: { activeTab: 'love-notes' },
        replace: true
      });
    }
  }, [location.state, navigate]);

  // This is just a loading state while redirecting
  return (
    <div className="min-h-screen bg-soft-cream flex items-center justify-center">
      <p className="text-midnight-indigo">Redirecting to love notes...</p>
    </div>
  );
};

export default LoveNotesReceived;
