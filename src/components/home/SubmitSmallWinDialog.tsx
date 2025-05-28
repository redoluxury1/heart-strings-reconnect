
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface SubmitSmallWinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SubmitSmallWinDialog = ({ open, onOpenChange }: SubmitSmallWinDialogProps) => {
  const [smallWin, setSmallWin] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!smallWin.trim()) {
      toast({
        title: "Small win required",
        description: "Please share your small win with us.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Since we don't have email sending set up yet, we'll simulate the submission
      // and store it for now (this would normally go to your backend)
      console.log('Small win submission:', {
        smallWin: smallWin.trim(),
        email: email.trim(),
        timestamp: new Date().toISOString()
      });

      toast({
        title: "Small win submitted!",
        description: "Thank you for sharing! We'll review your submission and may feature it soon.",
      });

      // Reset form
      setSmallWin('');
      setEmail('');
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting small win:', error);
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-cormorant text-2xl text-[#2e4059]">
            Share Your Small Win
          </DialogTitle>
          <DialogDescription className="text-[#2e4059]/70">
            Tell us about a relationship milestone you're proud of. We review all submissions and may feature yours!
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="smallWin" className="text-[#2e4059] font-medium">
              Your Small Win
            </Label>
            <Textarea
              id="smallWin"
              placeholder="e.g., We actually listened to each other during our disagreement..."
              value={smallWin}
              onChange={(e) => setSmallWin(e.target.value)}
              className="border-[#e5c7c1] focus:border-[#2e4059] min-h-[100px] resize-none"
              maxLength={150}
            />
            <p className="text-xs text-[#2e4059]/50 text-right">
              {smallWin.length}/150 characters
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#2e4059] font-medium">
              Email (optional)
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-[#e5c7c1] focus:border-[#2e4059]"
            />
            <p className="text-xs text-[#2e4059]/50">
              We'll only use this to let you know if we feature your win.
            </p>
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-[#e5c7c1] text-[#2e4059] hover:bg-[#f1eae8]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !smallWin.trim()}
              className="bg-[#2e4059] hover:bg-[#2e4059]/90 text-white"
            >
              {isSubmitting ? "Submitting..." : "Submit for Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitSmallWinDialog;
