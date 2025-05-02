
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

const DailyLoveNote = () => {
  const [loveNote, setLoveNote] = useState('');
  
  const handleSendNote = () => {
    if (!loveNote.trim()) {
      toast.error("Please write a note before sending");
      return;
    }
    
    // In a real app, this would send the note to the partner
    // For now, we'll just show a success message
    toast.success("Love note sent!", {
      description: "Your partner will be notified about your message."
    });
    
    // Clear the input
    setLoveNote('');
  };
  
  return (
    <div className="bg-lavender-blush py-8 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-midnight-indigo text-center mb-4">
          Daily Love Note
        </h2>
        
        <p className="text-center text-midnight-indigo/80 mb-6">
          What is one thing your partner did today to make you feel special?
        </p>
        
        <div className="max-w-md mx-auto">
          <Textarea
            placeholder="Write your love note here..."
            value={loveNote}
            onChange={(e) => setLoveNote(e.target.value)}
            className="min-h-[100px] mb-4 bg-white"
          />
          
          <div className="text-center">
            <Button 
              onClick={handleSendNote} 
              className="bg-mauve-rose hover:bg-mauve-rose/90 text-white"
            >
              Send Love Note
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyLoveNote;
