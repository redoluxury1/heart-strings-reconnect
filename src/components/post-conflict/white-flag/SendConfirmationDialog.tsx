
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-[#2e2a63] hover:bg-[#1e1a43] text-white px-8 py-2">
          Send Message
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Send this message?</AlertDialogTitle>
          <AlertDialogDescription>
            <p className="text-[#1A1F2C]">{message}</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSend}>Confirm & Send</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SendConfirmationDialog;
