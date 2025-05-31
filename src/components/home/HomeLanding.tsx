
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
  console.log('HomeLanding received quote:', dailyQuote);
  
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
        
        {/* Micro text that appears on hover - updated text */}
        <div 
          className={`absolute left-0 right-0 bottom-[-24px] text-xs text-navy-800/60 italic transition-opacity duration-300 cursor-pointer ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsShareOpen(true)}
        >
          share this quote or submit your own
        </div>
      </div>

      {/* Feature Row */}
      <div className="flex justify-center items-center gap-9 max-w-[600px] mx-auto mt-6 mb-16 text-base font-inter text-[#4a4a4a] border-t border-[#e4e4e4] pt-6">
        <span>Better conversations. Proven methods.</span>
        <span>Repair conflict. Build trust.</span>
        <span>Stronger relationships. Real results.</span>
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
