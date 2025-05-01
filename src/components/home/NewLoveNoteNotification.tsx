
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { LoveNote } from '../home/LoveNoteTimeline';

interface NewLoveNoteNotificationProps {
  onClose: () => void;
}

const NewLoveNoteNotification: React.FC<NewLoveNoteNotificationProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // In a real app, this would come from an API
  // For this demo, we'll create a sample love note
  const newLoveNote: LoveNote = {
    id: Date.now().toString(),
    prompt: "What is one thing your partner did today to make you feel special?",
    message: "You took the time to listen when I needed to talk. It meant more than you know.",
    timestamp: new Date()
  };
  
  const handleClose = () => {
    setIsOpen(false);
    onClose();
    
    // Simulate saving the love note to archive
    toast({
      title: "Love note saved",
      description: "Your partner's love note was saved to your archive.",
    });
  };
  
  const viewAllNotes = () => {
    setIsOpen(false);
    onClose();
    navigate('/love-notes');
  };
  
  return (
    <>
      {/* First show a subtle notification */}
      <div 
        className="fixed top-20 right-4 bg-white shadow-lg rounded-lg p-4 z-50 animate-fade-in cursor-pointer flex items-center gap-2 border border-lavender-blue"
        onClick={() => setIsOpen(true)}
      >
        <Heart className="h-5 w-5 text-mauve-rose" />
        <span className="text-sm text-midnight-indigo">Your partner sent you a love note!</span>
      </div>
      
      {/* Show dialog with the love note content */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md bg-white border border-lavender-blue/20">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-mauve-rose" />
              <span>New Love Note</span>
            </DialogTitle>
            <DialogDescription>
              Your partner sent you a love note
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-soft-blush/30 p-4 rounded-lg my-4">
            <p className="text-sm text-rosewood-tint mb-2">{newLoveNote.prompt}</p>
            <p className="text-midnight-indigo italic">"{newLoveNote.message}"</p>
          </div>
          
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
            <Button 
              className="bg-rosewood-tint hover:bg-rosewood-tint/90 text-white"
              onClick={viewAllNotes}
            >
              View All Notes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewLoveNoteNotification;
