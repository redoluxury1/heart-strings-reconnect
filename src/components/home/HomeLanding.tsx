
import React, { useState } from 'react';
import { getDailyQuote } from '../../data/hero-quotes';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Share, Facebook, Twitter, Mail, Instagram, MessageSquare } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const HomeLanding = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submissionHeadline, setSubmissionHeadline] = useState('');
  const [submissionSubtext, setSubmissionSubtext] = useState('');
  
  // Get the daily quote
  const dailyQuote = getDailyQuote();
  
  const handleShareClick = (platform: 'facebook' | 'twitter' | 'email' | 'instagram' | 'text') => {
    const text = `"${dailyQuote.headline}" - ${window.location.href}`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(dailyQuote.headline)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=Check out this relationship app&body=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'instagram':
        // Instagram doesn't have a direct web share API, but we'll show a toast with instructions
        toast("Instagram Sharing", {
          description: "Copy the link and share it on your Instagram story or post."
        });
        navigator.clipboard.writeText(window.location.href)
          .then(() => {
            toast.success("Link copied to clipboard");
          })
          .catch(() => {
            toast.error("Failed to copy link");
          });
        break;
      case 'text':
        // SMS sharing via Web Share API if available, fallback to SMS scheme
        if (navigator.share) {
          navigator.share({
            title: 'Check out this relationship app',
            text: dailyQuote.headline,
            url: window.location.href
          })
            .then(() => {
              toast.success("Shared successfully");
            })
            .catch((error) => {
              if (error.name !== 'AbortError') {
                // Only show error if not user-cancelled
                useTextMessageFallback(text);
              }
            });
        } else {
          useTextMessageFallback(text);
        }
        break;
    }
    
    toast("Thanks for sharing!", {
      description: "You're helping others build healthier relationships too."
    });
  };
  
  const useTextMessageFallback = (text: string) => {
    // Try to use the SMS scheme (works on mobile devices)
    const smsUri = `sms:?body=${encodeURIComponent(text)}`;
    
    // On mobile, this will open the messaging app
    // On desktop, this may not work, so we'll provide a backup
    window.location.href = smsUri;
    
    // For desktop users, also copy to clipboard as fallback
    navigator.clipboard.writeText(text)
      .then(() => {
        toast("Text Message", {
          description: "Text copied to clipboard for sharing via your messaging app."
        });
      })
      .catch(() => {});
  };
  
  const handleSubmitQuote = () => {
    // In a real app, this would send to a backend API
    // For now, we'll just simulate success with a toast
    toast("Quote submitted!", {
      description: "Our team will review it soon. Thank you for contributing!"
    });
    setDialogOpen(false);
    setSubmissionHeadline('');
    setSubmissionSubtext('');
  };
  
  return (
    <div className="text-center pt-24 pb-4 md:py-16">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer group">
            <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-medium mb-5 text-midnight-indigo group-hover:text-midnight-indigo/90 transition-colors">
              {dailyQuote.headline}
            </h1>
            
            <p className="text-xl max-w-2xl mx-auto text-midnight-indigo/80 group-hover:text-midnight-indigo/70 transition-colors">
              {dailyQuote.subtext}
            </p>
            
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Share className="h-5 w-5 mx-auto text-lavender-blue" />
              <span className="text-sm text-lavender-blue">Click to share or submit your own</span>
            </div>
          </div>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="center">
          <DropdownMenuItem className="flex items-center cursor-pointer" onClick={() => handleShareClick('facebook')}>
            <Facebook className="mr-2 h-4 w-4" /> Share on Facebook
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center cursor-pointer" onClick={() => handleShareClick('twitter')}>
            <Twitter className="mr-2 h-4 w-4" /> Share on Twitter
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center cursor-pointer" onClick={() => handleShareClick('email')}>
            <Mail className="mr-2 h-4 w-4" /> Share via Email
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center cursor-pointer" onClick={() => handleShareClick('text')}>
            <MessageSquare className="mr-2 h-4 w-4" /> Share via Text
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center cursor-pointer" onClick={() => handleShareClick('instagram')}>
            <Instagram className="mr-2 h-4 w-4" /> Share on Instagram
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => setDialogOpen(true)}>
            Submit your own quote
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Your Own Quote</DialogTitle>
            <DialogDescription>
              Have a creative "Finally, an app that..." quote? Submit it for our team to review.
              The best ones might be featured on our homepage!
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="headline" className="text-sm font-medium">
                Headline (starts with "Finally, an app that...")
              </label>
              <Textarea
                id="headline"
                placeholder="Finally, an app that..."
                value={submissionHeadline}
                onChange={(e) => setSubmissionHeadline(e.target.value)}
                className="min-h-[60px]"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subtext" className="text-sm font-medium">
                Subtext (witty follow-up)
              </label>
              <Textarea
                id="subtext"
                placeholder="Add your clever subtext here..."
                value={submissionSubtext}
                onChange={(e) => setSubmissionSubtext(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={handleSubmitQuote}
              disabled={!submissionHeadline.trim() || !submissionSubtext.trim()}
            >
              Submit Quote
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomeLanding;
