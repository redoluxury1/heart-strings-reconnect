
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Book, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SaveConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SaveConfirmationDialog: React.FC<SaveConfirmationDialogProps> = ({
  open,
  onOpenChange
}) => {
  const navigate = useNavigate();

  const handleGoToArchive = () => {
    onOpenChange(false);
    navigate('/archive');
  };

  const handleKeepGoing = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center font-cormorant text-midnight-indigo text-xl">
            You're changing the way you communicate
          </DialogTitle>
          <DialogDescription className="text-center">
            —one rephrase at a time.
            <br />
            This phrase was saved to your Archive.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center flex-col sm:flex-row gap-2">
          <Button 
            onClick={handleGoToArchive}
            className="bg-lavender-blue hover:bg-lavender-blue/90 text-white"
          >
            <Book className="h-4 w-4 mr-1" />
            View in Archive
          </Button>
          <Button 
            variant="outline"
            onClick={handleKeepGoing}
            className="border-lavender-blue text-lavender-blue hover:bg-lavender-blue/10"
          >
            Keep Going
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveConfirmationDialog;
