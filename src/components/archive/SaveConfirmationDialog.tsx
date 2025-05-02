
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
import { useInterface } from '../common/InterfaceProvider';

interface SaveConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SaveConfirmationDialog: React.FC<SaveConfirmationDialogProps> = ({
  open,
  onOpenChange
}) => {
  const navigate = useNavigate();
  const { isEmotional } = useInterface();

  const handleGoToArchive = () => {
    onOpenChange(false);
    navigate('/archive');
  };

  const handleKeepGoing = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-md ${
        isEmotional 
          ? "bg-[#fcfbf6] border-none" 
          : "bg-white border-[#589391]/20"
        } shadow-[0_8px_20px_rgba(0,0,0,0.1)]`}
        style={{
          backgroundImage: isEmotional 
            ? "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmNmYmY2Ii8+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMC4yNSIgZmlsbD0iI2U3ZTVkZSIgZmlsbC1vcGFjaXR5PSIwLjA4Ii8+PC9zdmc+')"
            : ""
        }}
      >
        <DialogHeader>
          <DialogTitle className={`text-center ${
            isEmotional 
              ? "font-cormorant text-midnight-indigo" 
              : "text-[#2C3E50]"
            } text-2xl`}>
            {isEmotional 
              ? "You're changing the way you communicate" 
              : "Communication improvement tracked"}
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            {isEmotional 
              ? "—one rephrase at a time."
              : "Track your progress over time."}
            <div className={`mt-4 p-3 ${
              isEmotional 
                ? "bg-soft-blush/30 rounded-lg text-midnight-indigo" 
                : "bg-[#D1E5F4]/30 rounded-md text-[#2C3E50]"
              }`}>
              This phrase was saved to your Archive.
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center flex-col sm:flex-row gap-3 mt-4">
          <Button 
            onClick={handleGoToArchive}
            className={isEmotional
              ? "bg-lavender-blue hover:bg-lavender-blue/90 text-white rounded-full"
              : "bg-[#589391] hover:bg-[#589391]/90 text-white rounded-md"
            }
          >
            <Book className="h-4 w-4 mr-2" />
            View in Archive
          </Button>
          <Button 
            variant="outline"
            onClick={handleKeepGoing}
            className={isEmotional
              ? "border-lavender-blue text-lavender-blue hover:bg-lavender-blue/10 rounded-full"
              : "border-[#E51D2C] text-[#E51D2C] hover:bg-[#E51D2C]/10 rounded-md"
            }
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
