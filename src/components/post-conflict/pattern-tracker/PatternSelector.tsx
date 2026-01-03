import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';
import { patternCategories, getPatternsByCategory, ConflictPattern } from './data/patterns';

interface PatternSelectorProps {
  selectedPatterns: string[];
  onSelect: (patternId: string) => void;
  onContinue: () => void;
}

const PatternSelector: React.FC<PatternSelectorProps> = ({
  selectedPatterns,
  onSelect,
  onContinue
}) => {
  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  const canContinue = selectedPatterns.length >= 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="font-cormorant text-2xl font-semibold text-midnight-indigo mb-2">
          What patterns do you notice?
        </h2>
        <p className="text-muted-foreground text-sm">
          Select any patterns that keep showing up in your conflicts
        </p>
      </div>

      <div className="space-y-6">
        {patternCategories.map((category) => {
          const patterns = getPatternsByCategory(category.id);
          
          return (
            <div key={category.id} className="space-y-3">
              <div className="flex items-center gap-2 text-midnight-indigo">
                {getIcon(category.icon)}
                <h3 className="font-medium">{category.label}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {patterns.map((pattern) => {
                  const isSelected = selectedPatterns.includes(pattern.id);
                  
                  return (
                    <motion.button
                      key={pattern.id}
                      onClick={() => onSelect(pattern.id)}
                      className={cn(
                        "px-4 py-2 rounded-full border text-sm transition-all duration-200",
                        isSelected 
                          ? "bg-midnight-indigo text-white border-midnight-indigo" 
                          : "bg-card text-midnight-indigo border-border hover:border-midnight-indigo/50"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {pattern.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center pt-4">
        <motion.button
          onClick={onContinue}
          disabled={!canContinue}
          className={cn(
            "px-8 py-3 rounded-full font-medium transition-all duration-200",
            canContinue
              ? "bg-midnight-indigo text-white hover:bg-midnight-indigo/90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
          whileHover={canContinue ? { scale: 1.02 } : {}}
          whileTap={canContinue ? { scale: 0.98 } : {}}
        >
          See Insights
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PatternSelector;