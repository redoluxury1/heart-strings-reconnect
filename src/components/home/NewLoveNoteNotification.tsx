
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, ArrowUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { LoveNote } from '../home/LoveNoteTimeline';
import { useInterface } from '../common/InterfaceProvider';

interface NewLoveNoteNotificationProps {
  onClose: () => void;
  loveNote?: LoveNote;
  isOpen: boolean;
}

// This component now only shows the dialog when clicked on the envelope
const NewLoveNoteNotification: React.FC<NewLoveNoteNotificationProps> = ({ 
  onClose, 
  loveNote,
  isOpen
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isEmotional } = useInterface();
  
  // In a real app, this would come from an API
  // For this demo, we'll create a sample love note if none was provided
  const newLoveNote: LoveNote = loveNote || {
    id: Date.now().toString(),
    prompt: "What is one thing your partner did today to make you feel special?",
    message: "You took the time to listen when I needed to talk. It meant more than you know.",
    timestamp: new Date()
  };
  
  const handleClose = () => {
    onClose();
    
    // Simulate saving the love note to archive
    toast({
      title: isEmotional ? "Love note saved" : "Note saved",
      description: isEmotional 
        ? "Your partner's love note was saved to your archive." 
        : "Your partner's note was saved to your archive.",
    });
  };
  
  const viewAllNotes = () => {
    onClose();
    navigate('/love-notes');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-md ${
        isEmotional 
          ? "bg-white border border-lavender-blue/20" 
          : "bg-white border border-[#589391]/20"
      }`}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEmotional ? (
              <Mail className="h-5 w-5 text-mauve-rose" />
            ) : (
              <Mail className="h-5 w-5 text-[#E51D2C]" />
            )}
            <span>{isEmotional ? "New Love Note" : "New Note"}</span>
          </DialogTitle>
          <DialogDescription>
            {isEmotional ? "Your partner sent you a love note" : "Your partner sent you a note"}
          </DialogDescription>
        </DialogHeader>
        
        <div className={`p-4 rounded-lg my-4 ${
          isEmotional 
            ? "bg-soft-blush/30" 
            : "bg-[#D1E5F4]/50"
        }`}>
          <p className={`text-sm mb-2 ${
            isEmotional 
              ? "text-rosewood-tint" 
              : "text-[#589391]"
          }`}>
            {newLoveNote.prompt}
          </p>
          <p className={`italic ${
            isEmotional 
              ? "text-midnight-indigo" 
              : "text-[#2C3E50]"
          }`}>
            "{newLoveNote.message}"
          </p>
        </div>
        
        <div className="flex justify-between mt-4">
          <Button 
            variant="outline" 
            onClick={handleClose}
            className={!isEmotional ? "border-[#589391] text-[#2C3E50]" : ""}
          >
            Close
          </Button>
          <Button 
            className={isEmotional
              ? "bg-rosewood-tint hover:bg-rosewood-tint/90 text-white"
              : "bg-[#E51D2C] hover:bg-[#E51D2C]/90 text-white"
            }
            onClick={viewAllNotes}
          >
            View All Notes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewLoveNoteNotification;
