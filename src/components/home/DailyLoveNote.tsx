
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { Heart } from "lucide-react";
import { useInterface } from '../common/InterfaceProvider';

// Array of daily prompts that will rotate
const dailyPrompts = [
  "What is one thing your partner did today to make you feel special?",
  "Share a moment when your partner showed thoughtfulness this week.",
  "What small gesture from your partner meant a lot to you recently?",
  "What's something your partner does that always makes you smile?",
  "What quality do you admire most about your partner right now?",
  "How did your partner support you through a recent challenge?",
  "What's a recent conversation with your partner that you appreciated?",
  "Share a way your partner has grown that you've noticed lately.",
  "What made you feel loved by your partner recently?"
];

const DailyLoveNote = () => {
  const [loveNote, setLoveNote] = useState('');
  const { isEmotional } = useInterface();
  const [todaysPrompt, setTodaysPrompt] = useState('');
  
  // Get daily prompt based on the date
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const promptIndex = dayOfYear % dailyPrompts.length;
    setTodaysPrompt(dailyPrompts[promptIndex]);
  }, []);
  
  const handleSendNote = () => {
    if (!loveNote.trim()) {
      toast.error("Please write a note before sending");
      return;
    }
    
    // In a real app, this would send the note to the partner
    toast.success("Love note sent!", {
      description: "Your partner will be notified about your message."
    });
    
    // Clear the input
    setLoveNote('');
  };
  
  return (
    <div className="bg-soft-cream py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="text-center mb-6">
          <h2 className="font-cormorant text-4xl md:text-5xl text-[#743f4f] mb-3">
            Today's Love Note
          </h2>
          <p className="text-[#743f4f] text-lg md:text-xl font-cormorant">
            A moment of appreciation, in your own words.
          </p>
        </div>
        
        <div className="relative mt-8 mb-6">
          <Textarea
            placeholder={todaysPrompt}
            value={loveNote}
            onChange={(e) => setLoveNote(e.target.value)}
            className="min-h-[140px] md:min-h-[160px] p-6 text-[#743f4f] bg-white border-2 border-[#d3a6a6] rounded-3xl text-lg placeholder:text-[#743f4f]/70 focus-visible:ring-[#d3a6a6] focus-visible:ring-offset-0 focus-visible:border-[#d3a6a6]"
          />
          <div className="absolute top-4 right-4">
            <Heart className="h-5 w-5 text-[#d3a6a6]" fill="#d3a6a6" />
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleSendNote} 
            className="bg-[#b17f89] hover:bg-[#9c6a74] text-white font-medium text-lg px-8 py-6 rounded-full h-auto w-full max-w-md"
          >
            Send Today's Note
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DailyLoveNote;
