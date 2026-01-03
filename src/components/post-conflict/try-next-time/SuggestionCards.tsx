import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bookmark, BookmarkCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Suggestion } from './data/suggestions';

interface SuggestionCardsProps {
  suggestions: Suggestion[];
  savedTips: string[];
  onSaveTip: (tipId: string) => void;
  onBack: () => void;
  onComplete: () => void;
}

const SuggestionCards: React.FC<SuggestionCardsProps> = ({
  suggestions,
  savedTips,
  onSaveTip,
  onBack,
  onComplete
}) => {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (suggestions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6 text-center"
      >
        <h2 className="font-cormorant text-2xl font-semibold text-midnight-indigo">
          No specific tips found
        </h2>
        <p className="text-muted-foreground">
          Try selecting different triggers or reactions to get personalized suggestions.
        </p>
        <motion.button
          onClick={onBack}
          className="px-6 py-3 rounded-full font-medium border border-border text-foreground hover:bg-muted transition-all duration-200 flex items-center gap-2 mx-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="font-cormorant text-2xl font-semibold text-midnight-indigo mb-2">
          Here's what you could try next time
        </h2>
        <p className="text-muted-foreground text-sm">
          Save the tips that resonate with you
        </p>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {suggestions.map((suggestion, index) => {
            const isSaved = savedTips.includes(suggestion.id);
            const isExpanded = expandedCards.has(suggestion.id);
            
            return (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card rounded-xl border border-border p-5 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-medium text-foreground text-lg">
                    {suggestion.tip}
                  </h3>
                  <motion.button
                    onClick={() => onSaveTip(suggestion.id)}
                    className={cn(
                      "shrink-0 p-2 rounded-full transition-colors",
                      isSaved 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted text-muted-foreground"
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="h-5 w-5" />
                    ) : (
                      <Bookmark className="h-5 w-5" />
                    )}
                  </motion.button>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
                  <p className="text-foreground italic">
                    "{suggestion.example}"
                  </p>
                </div>

                <button
                  onClick={() => toggleExpanded(suggestion.id)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Hide why this helps
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      Why this helps
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-muted-foreground text-sm pt-2 border-t border-border">
                        {suggestion.whyItHelps}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-3 pt-4">
        <motion.button
          onClick={onBack}
          className="px-6 py-3 rounded-full font-medium border border-border text-foreground hover:bg-muted transition-all duration-200 flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </motion.button>
        <motion.button
          onClick={onComplete}
          className="px-8 py-3 rounded-full font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {savedTips.length > 0 ? `Done (${savedTips.length} saved)` : 'Done'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SuggestionCards;
