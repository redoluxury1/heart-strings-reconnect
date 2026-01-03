import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { reactionOptions } from './data/reactions';

interface ReactionSelectorProps {
  selectedReactions: string[];
  onSelect: (reactionId: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

const ReactionSelector: React.FC<ReactionSelectorProps> = ({
  selectedReactions,
  onSelect,
  onContinue,
  onBack
}) => {
  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className="h-4 w-4" /> : null;
  };

  const canContinue = selectedReactions.length >= 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="font-cormorant text-2xl font-semibold text-midnight-indigo mb-2">
          How did you react?
        </h2>
        <p className="text-muted-foreground text-sm">
          Select 1-2 ways you responded in the moment
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {reactionOptions.map((reaction) => {
          const isSelected = selectedReactions.includes(reaction.id);
          const isDisabled = !isSelected && selectedReactions.length >= 2;
          
          return (
            <motion.button
              key={reaction.id}
              onClick={() => !isDisabled && onSelect(reaction.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-200",
                isSelected 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-card text-foreground border-border hover:border-primary/50",
                isDisabled && "opacity-50 cursor-not-allowed"
              )}
              whileHover={!isDisabled ? { scale: 1.02 } : {}}
              whileTap={!isDisabled ? { scale: 0.98 } : {}}
            >
              {getIcon(reaction.icon)}
              <span className="text-sm font-medium">{reaction.label}</span>
            </motion.button>
          );
        })}
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
          onClick={onContinue}
          disabled={!canContinue}
          className={cn(
            "px-8 py-3 rounded-full font-medium transition-all duration-200",
            canContinue
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
          whileHover={canContinue ? { scale: 1.02 } : {}}
          whileTap={canContinue ? { scale: 0.98 } : {}}
        >
          Show Me Tips
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ReactionSelector;
