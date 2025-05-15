
import React, { useState } from 'react';
import { getDailyQuote } from '../../data/hero-quotes';
import { 
  Dialog,
  DialogContent, 
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import HeroQuoteForm from './HeroQuoteForm';
import ShareMenu from './ShareMenu';

const HomeLanding = () => {
  // Get the daily quote
  const dailyQuote = getDailyQuote();
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  
  return (
    <div className="text-center pt-16 pb-4 md:py-14">
      <div 
        className="relative transition-all duration-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-medium mb-8 text-navy-800">
          {dailyQuote.headline}
        </h1>
        
        {/* Micro text that appears on hover */}
        <div 
          className={`absolute left-0 right-0 bottom-0 text-xs text-navy-800/60 italic transition-opacity duration-300 cursor-pointer ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsShareOpen(true)}
        >
          share to instagram, text, email, twitter or submit your own
        </div>
      </div>

      {/* Share Menu Dialog */}
      <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share this quote</DialogTitle>
          </DialogHeader>
          <ShareMenu 
            quote={dailyQuote.headline} 
            onSubmitOwn={() => {
              setIsShareOpen(false);
              setIsDialogOpen(true);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Submit Own Quote Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit your own hero quote</DialogTitle>
          </DialogHeader>
          <HeroQuoteForm onSubmitSuccess={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomeLanding;
