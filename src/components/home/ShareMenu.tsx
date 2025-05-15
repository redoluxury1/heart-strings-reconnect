
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Twitter, Instagram } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ShareMenuProps {
  quote: string;
  onSubmitOwn: () => void;
}

const ShareMenu = ({ quote, onSubmitOwn }: ShareMenuProps) => {
  const handleShare = (platform: string) => {
    const encodedQuote = encodeURIComponent(quote);
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodedQuote}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=Check out this quote&body=${encodedQuote}`, '_blank');
        break;
      case 'instagram':
        // Instagram doesn't have a direct share API, copy to clipboard instead
        navigator.clipboard.writeText(quote).then(() => {
          toast({
            title: "Copied to clipboard",
            description: "Now you can paste it into Instagram",
            variant: "success"
          });
        });
        break;
      case 'text':
        // Copy to clipboard for text message
        navigator.clipboard.writeText(quote).then(() => {
          toast({
            title: "Copied to clipboard",
            description: "Now you can paste it into your messaging app",
            variant: "success"
          });
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          className="flex items-center justify-center gap-2" 
          onClick={() => handleShare('twitter')}
        >
          <Twitter size={18} />
          Twitter
        </Button>
        
        <Button 
          variant="outline" 
          className="flex items-center justify-center gap-2" 
          onClick={() => handleShare('instagram')}
        >
          <Instagram size={18} />
          Instagram
        </Button>
        
        <Button 
          variant="outline" 
          className="flex items-center justify-center gap-2" 
          onClick={() => handleShare('email')}
        >
          <Mail size={18} />
          Email
        </Button>
        
        <Button 
          variant="outline" 
          className="flex items-center justify-center gap-2" 
          onClick={() => handleShare('text')}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          Text
        </Button>
      </div>
      
      <div className="flex justify-center mt-2">
        <Button 
          variant="secondary" 
          onClick={onSubmitOwn}
          className="w-full"
        >
          Submit your own quote
        </Button>
      </div>
    </div>
  );
};

export default ShareMenu;
