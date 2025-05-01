
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { toast } from "sonner";

const DailyLoveNote = () => {
  const [loveNote, setLoveNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Check if we navigated from the post-conflict flow with the love note hash
  useEffect(() => {
    if (window.location.hash === '#daily-love-note') {
      // Remove the hash to prevent issues with future navigation
      window.history.replaceState(null, '', window.location.pathname);
      
      // Scroll to this section
      const section = document.getElementById('daily-love-note');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loveNote.trim()) {
      toast("Please write a love note before sending", {
        description: "Share something you appreciate about your partner.",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real implementation, this would send the note to the partner's timeline
    // For this MVP, we'll simulate with a timeout and success message
    setTimeout(() => {
      toast("Love note sent!", {
        description: "Your partner will receive a notification about your love note."
      });
      setLoveNote('');
      setIsSubmitting(false);
      setHasSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setHasSubmitted(false);
    setLoveNote('');
  };

  return (
    <div id="daily-love-note" className="relative z-0 mt-[-50px] pt-[120px] bg-gradient-to-b from-white to-soft-blush px-4 pb-10">
      <div className="max-w-xl mx-auto">
        <h2 className="font-cormorant text-2xl md:text-3xl font-medium text-midnight-indigo mb-4 text-center">
          Daily Love Note
        </h2>
        
        <p className="text-center text-midnight-indigo font-inter mb-6">
          What is one thing your partner did today to make you feel special?
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={loveNote}
            onChange={(e) => setLoveNote(e.target.value)}
            placeholder="Write your love note here..."
            className="w-full border-midnight-indigo bg-white text-midnight-indigo"
          />
          
          <Button 
            type="submit" 
            className="w-full bg-rosewood-tint text-white font-semibold hover:bg-opacity-90 transition-colors"
            disabled={isSubmitting}
          >
            <Send className="mr-2 h-4 w-4" /> Send Love Note
          </Button>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500 mb-2">
            Your note will be sent directly to your partner's private timeline.
          </p>
          
          {hasSubmitted && (
            <button 
              onClick={handleReset}
              className="text-sm text-blue-600 underline cursor-pointer"
            >
              Want to send another?
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyLoveNote;
