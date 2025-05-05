
import React from 'react';
import { Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DownloadOptionsMenuProps {
  handlePdfDownload: () => void;
  handleSendToEmail: () => void;
}

export const DownloadOptionsMenu: React.FC<DownloadOptionsMenuProps> = ({ 
  handlePdfDownload, 
  handleSendToEmail 
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="border-mauve-rose bg-white text-mauve-rose hover:bg-mauve-rose/10 font-medium flex items-center gap-2"
        >
          <Download size={16} />
          Download Results
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handlePdfDownload}>
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
