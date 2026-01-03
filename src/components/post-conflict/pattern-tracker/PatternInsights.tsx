import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, Bookmark, BookmarkCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { conflictPatterns, getInsightsForPatterns, PatternInsight } from './data/patterns';

interface PatternInsightsProps {
  selectedPatterns: string[];
  savedInsights: string[];
  onSaveInsight: (index: number) => void;
  onBack: () => void;
  onComplete: () => void;
}

const PatternInsights: React.FC<PatternInsightsProps> = ({
  selectedPatterns,
  savedInsights,
  onSaveInsight,
  onBack,
  onComplete
}) => {
  const insights = getInsightsForPatterns(selectedPatterns);
  const selectedPatternLabels = selectedPatterns.map(id => 
    conflictPatterns.find(p => p.id === id)?.label || id
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="font-cormorant text-2xl font-semibold text-midnight-indigo mb-2">
          Patterns You're Tracking
        </h2>
        <p className="text-muted-foreground text-sm">
          Here's what you've identified and some ways to address it
        </p>
      </div>

      {/* Selected patterns summary */}
      <div className="bg-soft-cream rounded-xl p-4 border border-border">
        <h3 className="text-sm font-medium text-midnight-indigo mb-3">Your patterns:</h3>
        <div className="flex flex-wrap gap-2">
          {selectedPatternLabels.map((label, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-midnight-indigo/10 text-midnight-indigo rounded-full text-sm"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Insights */}
      {insights.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Insights for you:</h3>
          {insights.map((insight, index) => {
            const isSaved = savedInsights.includes(index.toString());
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card rounded-xl border border-border p-5 space-y-4"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-terracotta/10 shrink-0">
                    <Lightbulb className="h-5 w-5 text-terracotta" />
                  </div>
                  <div className="flex-1">
                    <p className="text-midnight-indigo font-medium">{insight.insight}</p>
                  </div>
                  <motion.button
                    onClick={() => onSaveInsight(index)}
                    className={cn(
                      "shrink-0 p-2 rounded-full transition-colors",
                      isSaved 
                        ? "bg-midnight-indigo/10 text-midnight-indigo" 
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
                
                <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-terracotta">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-midnight-indigo">Try this: </span>
                    {insight.suggestion}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border p-6 text-center">
          <p className="text-muted-foreground">
            We don't have specific insights for this combination yet, but recognizing these patterns is the first step to changing them.
          </p>
        </div>
      )}

      <div className="flex justify-center gap-3 pt-4">
        <motion.button
          onClick={onBack}
          className="px-6 py-3 rounded-full font-medium border border-border text-midnight-indigo hover:bg-muted transition-all duration-200 flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </motion.button>
        <motion.button
          onClick={onComplete}
          className="px-8 py-3 rounded-full font-medium bg-midnight-indigo text-white hover:bg-midnight-indigo/90 transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Done
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PatternInsights;