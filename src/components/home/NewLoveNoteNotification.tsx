
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { LoveNote } from '../home/LoveNoteTimeline';
import { useInterface } from '../../hooks/useInterfaceContext';
import NotificationIcon from './notification/NotificationIcon';
import NotificationPrompt from './notification/NotificationPrompt';
import NotificationActions from './notification/NotificationActions';

interface NewLoveNoteNotificationProps {
  onClose: () => void;
  loveNote?: LoveNote;
  isOpen: boolean;
}

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
          : "bg-white border border-[#543544]/20"
      }`}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <NotificationIcon />
            <span>{isEmotional ? "New Love Note" : "New Note"}</span>
          </DialogTitle>
          <DialogDescription>
            {isEmotional ? "Your partner sent you a love note" : "Your partner sent you a note"}
          </DialogDescription>
        </DialogHeader>
        
        <NotificationPrompt loveNote={newLoveNote} />
        
        <NotificationActions 
          onClose={handleClose}
          onViewAll={viewAllNotes}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewLoveNoteNotification;
