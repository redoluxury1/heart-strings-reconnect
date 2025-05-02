
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
      <DialogContent className="sm:max-w-md bg-[#fcfbf6] border-none shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
        style={{
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmNmYmY2Ii8+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMC4yNSIgZmlsbD0iI2U3ZTVkZSIgZmlsbC1vcGFjaXR5PSIwLjA4Ii8+PC9zdmc+')"
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-center font-cormorant text-midnight-indigo text-2xl">
            You're changing the way you communicate
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            —one rephrase at a time.
            <div className="mt-4 p-3 bg-soft-blush/30 rounded-lg text-midnight-indigo">
              This phrase was saved to your Archive.
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center flex-col sm:flex-row gap-3 mt-4">
          <Button 
            onClick={handleGoToArchive}
            className="bg-lavender-blue hover:bg-lavender-blue/90 text-white rounded-full"
          >
            <Book className="h-4 w-4 mr-2" />
            View in Archive
          </Button>
          <Button 
            variant="outline"
            onClick={handleKeepGoing}
            className="border-lavender-blue text-lavender-blue hover:bg-lavender-blue/10 rounded-full"
          >
            Keep Going
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveConfirmationDialog;
