
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { toast } from "sonner";

const DailyLoveNote = () => {
  const [loveNote, setLoveNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        description: "Your partner will receive this in their private timeline."
      });
      setLoveNote('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="relative z-0 mt-[-50px] pt-[120px] bg-gradient-to-b from-white to-soft-blush px-4 pb-10">
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
        
        <p className="text-sm text-center mt-4 text-gray-500">
          Your note will be sent directly to your partner's private timeline.
        </p>
      </div>
    </div>
  );
};

export default DailyLoveNote;
