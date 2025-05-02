
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "sonner";
import { LoveNote } from '../components/home/LoveNoteTimeline';
import { useInterface } from '../components/common/InterfaceProvider';

const LoveNotesReceived = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isEmotional } = useInterface();
  
  useEffect(() => {
    // Check if there's a new note in the location state
    if (location.state?.newNote) {
      const newNote = location.state.newNote as LoveNote;
      
      toast.success(isEmotional ? "New love note received!" : "New note received!", {
        description: isEmotional 
          ? "Your partner sent you a love note."
          : "Your partner sent you a note."
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
  }, [location.state, navigate, isEmotional]);

  // This is just a loading state while redirecting
  return (
    <div className={`min-h-screen ${isEmotional ? 'bg-soft-cream' : 'bg-[#D1E5F4]'} flex items-center justify-center`}>
      <p className={isEmotional ? "text-midnight-indigo" : "text-[#2C3E50]"}>
        Redirecting to {isEmotional ? "love notes" : "notes"}...
      </p>
    </div>
  );
};

export default LoveNotesReceived;
