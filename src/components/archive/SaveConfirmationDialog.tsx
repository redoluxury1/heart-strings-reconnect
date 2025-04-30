
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Book } from 'lucide-react';
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
            It's now saved to your Archive. Come back to it any time.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button 
            onClick={handleGoToArchive}
            className="bg-lavender-blue hover:bg-lavender-blue/90 text-white"
          >
            <Book className="h-4 w-4 mr-1" />
            Go to Archive
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveConfirmationDialog;
