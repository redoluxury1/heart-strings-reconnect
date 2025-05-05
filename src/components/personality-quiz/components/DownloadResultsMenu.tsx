
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Mail } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';
import { QuizResult } from '@/types/personality-quiz';

interface DownloadResultsMenuProps {
  results: QuizResult;
  onDownloadPdf: () => void;
}

const DownloadResultsMenu: React.FC<DownloadResultsMenuProps> = ({ results, onDownloadPdf }) => {
  const handleSendToEmail = () => {
    // In a real implementation, this would open an email modal
    toast({
      title: "Email Feature",
      description: "This would send the results to your email.",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex-1 max-w-[200px]"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Results
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onDownloadPdf}>
          <Download className="mr-2 h-4 w-4" />
          <span>Save as PDF</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSendToEmail}>
          <Mail className="mr-2 h-4 w-4" />
          <span>Send to Email</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DownloadResultsMenu;
