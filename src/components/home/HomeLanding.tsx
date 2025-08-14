
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    <div className="text-center px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-12 lg:pb-16">
      <div 
        className="relative transition-all duration-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h1 className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-6 sm:mb-8 lg:mb-10 text-navy-800 leading-tight">
          {dailyQuote.headline}
        </h1>
        
        {/* Micro text that appears on hover - updated text */}
        <div 
          className={`absolute left-0 right-0 bottom-[-20px] sm:bottom-[-24px] text-xs sm:text-sm text-navy-800/60 italic transition-opacity duration-300 cursor-pointer px-4 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsShareOpen(true)}
        >
          share this quote or submit your own
        </div>
      </div>

      {/* Features Link */}
      <div className="mt-8 pt-6 border-t border-navy-800/10">
        <p className="text-navy-800/70 mb-4">
          Want to learn more about how Bridge can help your relationship?
        </p>
        <Link 
          to="/features" 
          className="inline-flex items-center px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
        >
          Explore All Features
        </Link>
      </div>
      
      {/* Share Menu Dialog */}
      <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
        <DialogContent className="sm:max-w-md mx-4">
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
        <DialogContent className="mx-4">
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
