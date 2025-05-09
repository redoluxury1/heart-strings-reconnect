
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ExpertApplicationForm from './ExpertApplicationForm';

interface ExpertApplicationDialogProps {
  trigger?: React.ReactNode;
}

const ExpertApplicationDialog: React.FC<ExpertApplicationDialogProps> = ({ 
  trigger 
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="w-full bg-[#C75F65] hover:bg-[#B54E54] text-white">
            Become a Founding Expert
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-[#F7ECD9]">
        <ExpertApplicationForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default ExpertApplicationDialog;
