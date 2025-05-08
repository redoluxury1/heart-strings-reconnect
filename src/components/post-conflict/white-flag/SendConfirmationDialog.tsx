
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface SendConfirmationDialogProps {
  message: string;
}

const SendConfirmationDialog = ({ message }: SendConfirmationDialogProps) => {
  const { toast } = useToast();
  
  const handleSend = () => {
    toast({
      title: "White flag sent",
      description: "Your message has been sent successfully.",
    });
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#2e2a63] hover:bg-[#1e1a43] text-white px-8 py-2">
          Send Message
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send this message?</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-[#1A1F2C]">{message}</p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSend}>Confirm & Send</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendConfirmationDialog;
